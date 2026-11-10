const assert=require('node:assert/strict');
(async()=>{
 const {AudioDirector}=await import('../js/audio.js');
 let cancelCount=0,spoken=[],statuses=[],speaking=[],toneCount=0;
 const voices=[
  {lang:'ms-MY',name:'Suara Malaysia',voiceURI:'malay-device',localService:true},
  {lang:'id-ID',name:'Google Bahasa Indonesia',voiceURI:'google-id',localService:false},
  {lang:'en-US',name:'English Voice',voiceURI:'english-device',localService:true}
 ];
 const prefs={muted:false,autoVoice:true,musicEnabled:true,voiceLanguage:'id-ID',voiceId:'auto',voiceRate:1.1,vol:{voice:.8,music:.2,sfx:.5}};
 const fakeGain=()=>({gain:{setTargetAtTime(){},setValueAtTime(){},exponentialRampToValueAtTime(){}},connect(){return this}});
 class FakeContext{
  constructor(){this.currentTime=2;this.state='running';this.destination={}}
  createGain(){return fakeGain()}
  createOscillator(){return {type:'sine',frequency:{setValueAtTime(){}},connect(){return this},start(){toneCount++},stop(){}}}
  resume(){return Promise.resolve()}
 }
 global.window={
  AudioContext:FakeContext,
  speechSynthesis:{getVoices:()=>voices,cancel(){cancelCount++},speak(u){spoken.push(u);u.onstart?.()}},
  SpeechSynthesisUtterance:class{constructor(text){this.text=text}}
 };
 global.document={hidden:false};global.location={protocol:'file:'};
 const a=new AudioDirector(()=>prefs,v=>speaking.push(v),s=>statuses.push(s));
 assert.ok(a.availableLanguages().includes('id-ID'));
 assert.ok(a.voicesFor('id-ID').some(v=>/Google/.test(v.name)));
 a.present('Hai, saya Alya!','intro');
 assert.equal(spoken.length,0,'Autoplay requires initial gesture');
 a.activate();a.present('Hai, saya Alya!','intro');
 assert.equal(spoken.length,1);
 assert.equal(spoken[0].lang,'id-ID','Default now prefers user-selected id-ID');
 assert.equal(spoken[0].voice.name,'Google Bahasa Indonesia');
 assert.equal(spoken[0].rate,1.1,'Selected rate matches Chef Cilik preference');
 a.effect('click');a.effect('reward');a.effect('stamp');
 assert.ok(toneCount>3);
 prefs.voiceLanguage='ms-MY';prefs.voiceId='auto';prefs.voiceRate=.9;
 a.speak('Bahasa Melayu','intro',true);
 assert.equal(spoken[1].lang,'ms-MY');
 assert.equal(spoken[1].rate,.9);
 prefs.voiceLanguage='en-US';prefs.voiceId=a.voiceKey(voices[2]);
 a.speak('Test English','intro',true);
 assert.equal(spoken[2].voice.name,'English Voice','Explicit voice choice respected');
 assert.ok(cancelCount>0);
 prefs.voiceLanguage='zh-CN';prefs.voiceId='auto';
 a.speak('No voice here','intro',true);
 assert.equal(spoken.length,3,'No silent fallback to wrong voice when chosen language missing');
 assert.match(statuses.at(-1),/tidak tersedia/);
 prefs.voiceLanguage='id-ID';prefs.voiceId='auto';
 prefs.muted=true;a.sync();assert.equal(a.speaking,false,'Mute stops narration');
 a.present('Dialog senyap','map');assert.equal(spoken.length,3);
 prefs.muted=false;prefs.autoVoice=false;
 a.present('Tanpa bacaan automatik','map');assert.equal(spoken.length,3);
 a.speak('Dengar Semula','map',true);assert.equal(spoken.length,4);
 prefs.musicEnabled=false;a.sync();
 assert.ok(a.musicBus&&a.fxBus);
 a.stopVoice();clearInterval(a.musicTimer);
 console.log('PASS: selectable Indonesian Google, Malay and English voices; rate; unavailable voice warning; activation, replay, mute, music and effects');
})().catch(e=>{console.error(e);process.exit(1)});
