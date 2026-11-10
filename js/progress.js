export function freshCase(){return {observed:[],choices:[],diagnosed:false,predicted:false,repaired:false,explained:false};}
export const badgeNames=['Peneroka Pertanian Bandar','Pakar Sistem Takungan','Pakar Makmal','Penyelamat Sistem Penanaman','Wira Pertanian Bandar'];
export function freshProgress(mode='kendiri'){return {version:3,started:false,scene:'map',visited:[],notes:[],badges:[],stamps:[],answers:[],drafts:{},hints:[],inspected:[[],[],[],[]],summarySeen:false,assembly:[],simulationSeen:false,cases:[freshCase(),freshCase()],repairLog:[],finalDone:[],cards:[],completedAt:null,mode,vol:{voice:.8,music:.22,sfx:.5},muted:false,autoVoice:true,musicEnabled:true,voiceLanguage:'id-ID',voiceId:'auto',voiceRate:1.1,voicePitch:1,pbd:{scores:{'7.1.1':null,'7.1.2':null},checks:['','','','',''],comment:'',studentName:'',assessedAt:null}};}
export function normalizeProgress(raw,mode='kendiri'){
 const base=freshProgress(mode);if(!raw||typeof raw!=='object')return base;
 for(const k of ['visited','notes','badges','stamps','answers','hints','assembly'])if(Array.isArray(raw[k]))base[k]=raw[k];
 base.badges=[...new Set(base.badges.filter(n=>[1,2,3,4,5].includes(n)))];
 base.assembly=[...new Set(base.assembly.filter(n=>['level','inlet','capillary'].includes(n)))];
 base.inspected=base.inspected.map((_,i)=>Array.isArray(raw.inspected?.[i])?[...new Set(raw.inspected[i])]:[]);
 base.scene=['map','pangsa','teres','kebun','lab','sim0','sim1','sim2','sim3','workshop','flow','gate4','repair0','repair1','final0','final1','final2','ending'].includes(raw.scene)?raw.scene:'map';
 base.cases=base.cases.map((c,i)=>{const old=raw.cases?.[i];if(!old)return c;for(const k of ['observed','choices'])if(Array.isArray(old[k]))c[k]=old[k];for(const k of ['diagnosed','predicted','repaired','explained'])c[k]=old[k]===true;return c});base.repairLog=Array.isArray(raw.repairLog)?raw.repairLog:[];base.finalDone=Array.isArray(raw.finalDone)?[...new Set(raw.finalDone.filter(n=>[0,1,2].includes(n)))]:[];base.cards=Array.isArray(raw.cards)?raw.cards:[];base.completedAt=Number.isFinite(raw.completedAt)&&[1,2,3,4,5].every(id=>base.badges.includes(id))?raw.completedAt:null;if(base.scene==='ending'&&!base.completedAt)base.scene='map';
 base.started=!!(raw.started||base.visited.length||base.answers.length||base.badges.length);base.summarySeen=!!raw.summarySeen;base.simulationSeen=!!raw.simulationSeen;
 base.drafts=raw.drafts&&typeof raw.drafts==='object'?raw.drafts:{};base.muted=!!raw.muted;base.autoVoice=raw.autoVoice!==false;base.musicEnabled=raw.musicEnabled!==false;base.voiceLanguage=typeof raw.voiceLanguage==='string'&&/^[a-z]{2,3}([-_][a-zA-Z]{2,4})?$/.test(raw.voiceLanguage)?raw.voiceLanguage:'id-ID';base.voiceId=typeof raw.voiceId==='string'&&raw.voiceId.length<250?raw.voiceId:'auto';base.voiceRate=Number.isFinite(raw.voiceRate)?Math.max(.65,Math.min(1.5,raw.voiceRate)):1.1;base.voicePitch=Number.isFinite(raw.voicePitch)?Math.max(.8,Math.min(1.3,raw.voicePitch)):1;
 for(const k of Object.keys(base.vol))if(Number.isFinite(raw.vol?.[k]))base.vol[k]=Math.max(0,Math.min(1,raw.vol[k]));
 // Teacher-only manual activity rubric, never official TP and never inferred from badge counts.
 if(raw.pbd&&typeof raw.pbd==='object'){
  for(const sp of ['7.1.1','7.1.2'])if([1,2,3].includes(raw.pbd.scores?.[sp]))base.pbd.scores[sp]=raw.pbd.scores[sp];
  if(Array.isArray(raw.pbd.checks))base.pbd.checks=base.pbd.checks.map((_,i)=>['ya','belum'].includes(raw.pbd.checks[i])?raw.pbd.checks[i]:'');
  if(typeof raw.pbd.comment==='string')base.pbd.comment=raw.pbd.comment.slice(0,3000);
  if(typeof raw.pbd.studentName==='string')base.pbd.studentName=raw.pbd.studentName.slice(0,120);
  if(Number.isFinite(raw.pbd.assessedAt))base.pbd.assessedAt=raw.pbd.assessedAt;
 }
 return base;
}
export function loadProfiles(storage){
 let profiles={kendiri:freshProgress(),kelas:freshProgress('kelas')},mode='kendiri',warning='';
 const read=key=>{
  let encoded;
  try{encoded=storage.getItem(key)}catch{warning='Simpanan pelayar tidak tersedia. Eksport rekod selepas bermain.';return null}
  if(!encoded)return null;
  try{
   const value=JSON.parse(encoded);
   if(!value||typeof value!=='object'||Array.isArray(value))throw Error('Rekod bukan objek');
   return value;
  }catch{
   // Never silently delete malformed save data. Keep original bytes in a recovery key.
   try{
    const recoveryKey=key+'-recovery';
    if(!storage.getItem(recoveryKey))storage.setItem(recoveryKey,encoded);
   }catch{}
   warning='Rekod lama tidak dapat dibaca. Salinan pemulihan disimpan jika ruang pelayar mencukupi. Gunakan Import Sandaran sebelum memulakan semula.';
   return null;
  }
 };
 const current=read('misi-bandar-v2');
 if(current&&current.profiles&&typeof current.profiles==='object'){
  mode=current.mode==='kelas'?'kelas':'kendiri';
  for(const m of ['kendiri','kelas'])profiles[m]=normalizeProgress(current.profiles[m],m);
 }else{
  const old=read('misi-bandar-v1');
  if(old){mode=old.mode==='kelas'?'kelas':'kendiri';profiles[mode]=normalizeProgress(old,mode)}
 }
 return {profiles,mode,warning};
}
