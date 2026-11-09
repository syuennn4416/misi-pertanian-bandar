export function freshCase(){return {observed:[],choices:[],diagnosed:false,predicted:false,repaired:false,explained:false};}
export const badgeNames=['Peneroka Pertanian Bandar','Pakar Sistem Takungan','Pakar Makmal','Penyelamat Sistem Penanaman','Wira Pertanian Bandar'];
export function freshProgress(mode='kendiri'){return {version:3,started:false,scene:'map',visited:[],notes:[],badges:[],stamps:[],answers:[],drafts:{},hints:[],inspected:[[],[],[],[]],summarySeen:false,assembly:[],simulationSeen:false,cases:[freshCase(),freshCase()],repairLog:[],finalDone:[],cards:[],completedAt:null,mode,vol:{voice:.8,music:.15,sfx:.5},muted:false};}
export function normalizeProgress(raw,mode='kendiri'){
 const base=freshProgress(mode);if(!raw||typeof raw!=='object')return base;
 for(const k of ['visited','notes','badges','stamps','answers','hints','assembly'])if(Array.isArray(raw[k]))base[k]=raw[k];
 base.badges=[...new Set(base.badges.filter(n=>[1,2,3,4,5].includes(n)))];
 base.assembly=[...new Set(base.assembly.filter(n=>['level','inlet','capillary'].includes(n)))];
 base.inspected=base.inspected.map((_,i)=>Array.isArray(raw.inspected?.[i])?[...new Set(raw.inspected[i])]:[]);
 base.scene=['map','pangsa','teres','kebun','lab','sim0','sim1','sim2','sim3','workshop','flow','gate4','repair0','repair1','final0','final1','final2','ending'].includes(raw.scene)?raw.scene:'map';
 base.cases=base.cases.map((c,i)=>{const old=raw.cases?.[i];if(!old)return c;for(const k of ['observed','choices'])if(Array.isArray(old[k]))c[k]=old[k];for(const k of ['diagnosed','predicted','repaired','explained'])c[k]=old[k]===true;return c});base.repairLog=Array.isArray(raw.repairLog)?raw.repairLog:[];base.finalDone=Array.isArray(raw.finalDone)?[...new Set(raw.finalDone.filter(n=>[0,1,2].includes(n)))]:[];base.cards=Array.isArray(raw.cards)?raw.cards:[];base.completedAt=Number.isFinite(raw.completedAt)&&[1,2,3,4,5].every(id=>base.badges.includes(id))?raw.completedAt:null;if(base.scene==='ending'&&!base.completedAt)base.scene='map';
 base.started=!!(raw.started||base.visited.length||base.answers.length||base.badges.length);base.summarySeen=!!raw.summarySeen;base.simulationSeen=!!raw.simulationSeen;
 base.drafts=raw.drafts&&typeof raw.drafts==='object'?raw.drafts:{};base.muted=!!raw.muted;
 for(const k of Object.keys(base.vol))if(Number.isFinite(raw.vol?.[k]))base.vol[k]=Math.max(0,Math.min(1,raw.vol[k]));return base;
}
export function loadProfiles(storage){let profiles={kendiri:freshProgress(),kelas:freshProgress('kelas')},mode='kendiri';const raw=JSON.parse(storage.getItem('misi-bandar-v2')||'null');if(raw){mode=raw.mode==='kelas'?'kelas':'kendiri';for(const m of ['kendiri','kelas'])profiles[m]=normalizeProgress(raw.profiles?.[m],m)}else{const old=JSON.parse(storage.getItem('misi-bandar-v1')||'null');if(old){mode=old.mode==='kelas'?'kelas':'kendiri';profiles[mode]=normalizeProgress(old,mode)}}return {profiles,mode};}
