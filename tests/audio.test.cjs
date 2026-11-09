const assert=require('node:assert/strict');
(async()=>{
 const {AudioDirector}=await import('../js/audio.js');
 let cancelCount=0, spoken=[], statuses=[], speaking=[], toneCount=0;
 const prefs={muted:false,autoVoice:true,musicEnabled:true,vol:{voice:.8,music:.2,sfx:.5}};
 const fakeGain=()=>({gain:{setTargetAtTime(){},setValueAtTime(){},exponentialRampToValueAtTime(){}},connect(){return this}});
 class FakeContext{
  constructor(){this.currentTime=2;this.state='running';this.destination={};}
  createGain(){return fakeGain()}
  createOscillator(){return {type:'sine',frequency:{setValueAtTime(){}},connect(){return this},start(){toneCount++},stop(){}}}
  resume(){return Promise.resolve()}
 }
 global.window={
  AudioContext:FakeContext,
  speechSynthesis:{getVoices:()=>[{lang:'ms-MY',name:'Suara Malaysia'}],cancel(){cancelCount++},speak(u){spoken.push(u);u.onstart?.()}},
  SpeechSynthesisUtterance:class{constructor(text){this.text=text}}
 };
 global.document={hidden:false};global.location={protocol:'file:'};
 const a=new AudioDirector(()=>prefs,v=>speaking.push(v),s=>statuses.push(s));
 a.present('Hai, saya Alya!','intro');
 assert.equal(spoken.length,0,'Audio does not auto-play before a user gesture');
 assert.match(statuses.at(-1),/Tekan Mula/);
 a.activate();a.present('Hai, saya Alya!','intro');
 assert.equal(spoken.length,1);
 assert.equal(spoken[0].lang,'ms-MY');
 assert.equal(spoken[0].volume,.8);
 assert.equal(a.speaking,true);
 a.effect('click');a.effect('reward');a.effect('stamp');
 assert.ok(toneCount>3,'Original sound effects create multiple distinct notes');
 a.speak('Ulang semula','intro',true);
 assert.equal(spoken.length,2,'Replay replaces existing dialogue');
 assert.ok(cancelCount>0);
 prefs.muted=true;a.sync();assert.equal(a.speaking,false,'Mute stops active narration');
 a.present('Dialog senyap','map');assert.equal(spoken.length,2,'Muted dialogues are caption-only');
 prefs.muted=false;prefs.autoVoice=false;
 a.present('Tanpa bacaan automatik','map');
 assert.equal(spoken.length,2);
 a.speak('Dengar Semula','map',true);
 assert.equal(spoken.length,3,'Manual replay works with auto narration disabled');
 prefs.musicEnabled=false;a.sync();
 assert.ok(a.musicBus&&a.fxBus);
 a.stopVoice();clearInterval(a.musicTimer);
 console.log('PASS: activation policy, Malay voice selection, automatic reading, manual replay, mute, music and sound effects');
})().catch(e=>{console.error(e);process.exit(1)});
