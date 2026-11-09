// Original, royalty-free procedural music and game SFX; no third-party audio assets required.
// User chooses language, a browser-installed voice, and speaking rate. No forced voice fallback.
export class AudioDirector {
 constructor(getPrefs, onSpeaking, onStatus) {
  this.getPrefs=getPrefs; this.onSpeaking=onSpeaking; this.onStatus=onStatus;
  this.activated=false; this.ctx=null; this.musicBus=null; this.fxBus=null;
  this.musicTimer=null; this.nextStepAt=0; this.step=0; this.ducked=false;
  this.voiceToken=0; this.currentAudio=null; this.utterance=null; this.speaking=false;
  this.missingRecordings=new Set(); this.lastText=''; this.lastId='';
 }
 activate() {
  this.activated=true;
  if(!this.ctx) {
   try {
    const C=window.AudioContext||window.webkitAudioContext;
    if(C){this.ctx=new C();this.musicBus=this.ctx.createGain();this.fxBus=this.ctx.createGain();this.musicBus.connect(this.ctx.destination);this.fxBus.connect(this.ctx.destination)}
   }catch{ /* Voice and captions remain usable without Web Audio. */ }
  }
  if(this.ctx){this.ctx.resume().catch(()=>{});if(!this.musicTimer){this.nextStepAt=this.ctx.currentTime+.1;this.musicTimer=setInterval(()=>this.schedule(),140)}}
  this.sync();
 }
 sync(){
  const p=this.getPrefs();
  if(this.ctx){
   const t=this.ctx.currentTime;
   this.musicBus?.gain.setTargetAtTime(!p.muted&&p.musicEnabled!==false?(p.vol?.music??.15)*(this.ducked?.23:.7):0,t,.09);
   this.fxBus?.gain.setTargetAtTime(!p.muted?(p.vol?.sfx??.5)*.7:0,t,.03);
  }
  if(this.currentAudio)this.currentAudio.volume=p.muted?0:(p.vol?.voice??.8);
  if(p.muted&&this.speaking)this.stopVoice();
 }
 // Gentle original 32-step garden melody; musical beats are synthesized locally.
 schedule(){
  if(!this.ctx||this.ctx.state!=='running')return;
  if(typeof document!=='undefined'&&document.hidden){this.nextStepAt=this.ctx.currentTime+.15;return}
  const ctx=this.ctx;
  if(this.nextStepAt<ctx.currentTime-.5)this.nextStepAt=ctx.currentTime+.08;
  const eighth=60/94/2;
  while(this.nextStepAt<ctx.currentTime+.35){
   const i=this.step%32;
   const melody=[72,null,76,74,72,null,69,71,72,76,79,null,76,74,72,null,69,null,72,74,76,null,74,72,71,null,69,67,69,71,72,null];
   const bass=[48,48,53,53,57,57,55,55][Math.floor(i/4)];
   if(i%4===0)this.note(this.midi(bass),this.nextStepAt,1.1,.13,'triangle',this.musicBus);
   if(melody[i]!=null)this.note(this.midi(melody[i]),this.nextStepAt,.24,.12,'sine',this.musicBus);
   if(i%8===4)this.note(this.midi(bass+12),this.nextStepAt,.55,.055,'sine',this.musicBus);
   this.step++;this.nextStepAt+=eighth;
  }
 }
 midi(n){return 440*Math.pow(2,(n-69)/12)}
 note(freq,at,duration,level,type='sine',bus=this.fxBus){
  if(!this.ctx||!bus)return;
  const o=this.ctx.createOscillator(),a=this.ctx.createGain();
  o.type=type;o.frequency.setValueAtTime(freq,at);
  a.gain.setValueAtTime(.0001,at);
  a.gain.exponentialRampToValueAtTime(Math.max(.001,level),at+.025);
  a.gain.exponentialRampToValueAtTime(.0001,at+duration);
  o.connect(a).connect(bus);o.start(at);o.stop(at+duration+.03);
 }
 effect(kind='click'){
  if(this.getPrefs().muted||!this.ctx)return;
  const now=this.ctx.currentTime+.012;
  if(kind==='click'){this.note(620,now,.075,.12,'sine');this.note(830,now+.04,.1,.075,'triangle')}
  if(kind==='correct'){this.note(660,now,.11,.17);this.note(880,now+.095,.19,.15)}
  if(kind==='error'){this.note(392,now,.13,.1,'triangle');this.note(349,now+.1,.2,.08,'sine')}
  if(kind==='reward'||kind==='success'){[660,830,990,1320].forEach((f,i)=>this.note(f,now+i*.11,.26,.22,'sine'))}
  if(kind==='stamp'){
   this.note(125,now,.20,.55,'triangle');
   this.note(71,now+.025,.27,.45,'sawtooth');
   this.note(260,now+.04,.09,.15,'square');
   this.note(880,now+.19,.26,.13,'sine');
  }
 }
 _isCurrent(token){return token===this.voiceToken}
 _markSpeaking(v){this.speaking=v;this.ducked=v;this.onSpeaking(v);this.sync()}
 stopVoice(){
  this.voiceToken++;
  try{window.speechSynthesis?.cancel()}catch{}
  if(this.currentAudio){this.currentAudio.onended=null;this.currentAudio.onerror=null;this.currentAudio.pause();this.currentAudio=null}
  this.utterance=null;
  this._markSpeaking(false);
 }
 present(text,id){
  this.lastText=String(text||'');this.lastId=id||'';
  this.stopVoice();
  if(this.getPrefs().muted){this.onStatus('Audio dibisukan. Sari kata masih dipaparkan.');return}
  if(this.getPrefs().autoVoice===false){this.onStatus('Bacaan automatik dimatikan. Tekan Dengar Semula.');return}
  if(!this.activated){this.onStatus('Tekan Mula untuk mengaktifkan suara dan muzik.');return}
  this.speak(this.lastText,this.lastId,false);
 }
 // The list comes from the visitor's actual browser; Google voices cannot be invented or downloaded here.
 availableVoices(){
  try { return [...(window.speechSynthesis?.getVoices?.()||[])].filter(v=>v&&v.lang&&v.name); }
  catch { return [] }
 }
 availableLanguages(){
  const preferred=['id-ID','ms-MY','en-US','zh-CN'];
  const byLang=new Map(preferred.map(x=>[x.toLowerCase(),x]));
  for(const v of this.availableVoices())byLang.set(v.lang.replace('_','-').toLowerCase(),v.lang.replace('_','-'));
  return [...byLang.values()].sort((a,b)=>{
   const ia=preferred.indexOf(a),ib=preferred.indexOf(b);
   return (ia<0?100:ia)-(ib<0?100:ib)||a.localeCompare(b);
  });
 }
 voicesFor(lang){
  const all=this.availableVoices(),l=(lang||'id-ID').replace('_','-').toLowerCase();
  const exact=all.filter(v=>v.lang.replace('_','-').toLowerCase()===l);
  return exact.length?exact:all.filter(v=>v.lang.replace('_','-').toLowerCase().split('-')[0]===l.split('-')[0]);
 }
 voiceKey(v){return [v.lang,v.voiceURI||'',v.name].join('::')}
 selectedVoice(){
  const p=this.getPrefs(),lang=p.voiceLanguage||'id-ID',voices=this.voicesFor(lang);
  if(!voices.length)return null;
  if(p.voiceId&&p.voiceId!=='auto')return voices.find(v=>this.voiceKey(v)===p.voiceId)||null;
  const google=voices.find(v=>/google/i.test(v.name)&&/female|woman|wanita|perempuan|siti|nur|amira|yasmin|putri|indonesia/i.test(v.name));
  return google||voices.find(v=>/google/i.test(v.name))||voices.find(v=>/female|woman|wanita|perempuan|siti|nur|amira|yasmin|putri/i.test(v.name))||voices[0];
 }
 voiceSummary(){
  const p=this.getPrefs(),voice=this.selectedVoice();
  return voice?voice.name+' ('+voice.lang+')':('Tiada suara tersedia untuk '+(p.voiceLanguage||'id-ID'));
 }
 speak(text=this.lastText,id=this.lastId,manual=true){
  if(manual)this.activate();
  this.stopVoice();
  if(this.getPrefs().muted){this.onStatus('Audio dibisukan dalam Tetapan.');return}
  if(!text){this.onStatus('Tiada dialog untuk dibaca.');return}
  const voice=this.selectedVoice();
  if(!voice){
   this.onStatus('Suara pilihan tidak tersedia pada peranti ini. Buka Tetapan untuk memilih bahasa dan suara lain. Sari kata masih tersedia.');
   return
  }
  this.nativeSpeech(text,this.voiceToken,voice);
 }
 nativeSpeech(text,token,voice){
  const synth=window.speechSynthesis;
  if(!synth||typeof window.SpeechSynthesisUtterance!=='function'){
   this._markSpeaking(false);this.onStatus('Pelayar ini tidak menyokong pembacaan suara. Sari kata masih tersedia.');return
  }
  try{
   const p=this.getPrefs(),u=new window.SpeechSynthesisUtterance(text);
   u.voice=voice;u.lang=voice.lang||p.voiceLanguage||'id-ID';
   u.rate=Math.min(1.5,Math.max(.65,Number(p.voiceRate)||1.1));
   u.pitch=1;u.volume=p.vol?.voice??.8;
   this.utterance=u;
   u.onstart=()=>{if(this._isCurrent(token)){this._markSpeaking(true);this.onStatus('Alya sedang bercakap menggunakan '+voice.name+' ('+u.lang+').')}}
   u.onend=()=>{if(this._isCurrent(token)){this.utterance=null;this._markSpeaking(false);this.onStatus('Bacaan selesai. Tekan Dengar Semula untuk ulang.')}}
   u.onerror=()=>{if(this._isCurrent(token)){this.utterance=null;this._markSpeaking(false);this.onStatus('Suara pilihan tidak dapat dimainkan. Cuba pilih suara lain dalam Tetapan.')}}
   synth.speak(u);
   this.onStatus('Memulakan '+voice.name+' ('+u.lang+')…');
  }catch{
   this._markSpeaking(false);this.onStatus('Suara tidak tersedia. Cuba suara lain dalam Tetapan.');
  }
 }

}
