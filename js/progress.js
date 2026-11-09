export const badgeNames=['Peneroka Pertanian Bandar','Pakar Sistem Takungan','Pakar Makmal'];
export function freshProgress(mode='kendiri'){return {version:2,started:false,scene:'map',visited:[],notes:[],badges:[],stamps:[],answers:[],drafts:{},hints:[],inspected:[[],[],[],[]],summarySeen:false,assembly:[],simulationSeen:false,mode,vol:{voice:.8,music:.15,sfx:.5},muted:false};}
export function normalizeProgress(raw,mode='kendiri'){
 const base=freshProgress(mode);if(!raw||typeof raw!=='object')return base;
 for(const k of ['visited','notes','badges','stamps','answers','hints','assembly'])if(Array.isArray(raw[k]))base[k]=raw[k];
 base.badges=[...new Set(base.badges.filter(n=>[1,2,3].includes(n)))];
 base.assembly=[...new Set(base.assembly.filter(n=>['level','inlet','capillary'].includes(n)))];
 base.inspected=base.inspected.map((_,i)=>Array.isArray(raw.inspected?.[i])?[...new Set(raw.inspected[i])]:[]);
 base.scene=['map','pangsa','teres','kebun','lab','sim0','sim1','sim2','sim3','workshop','flow','gate4'].includes(raw.scene)?raw.scene:'map';
 base.started=!!(raw.started||base.visited.length||base.answers.length||base.badges.length);base.summarySeen=!!raw.summarySeen;base.simulationSeen=!!raw.simulationSeen;
 base.drafts=raw.drafts&&typeof raw.drafts==='object'?raw.drafts:{};base.muted=!!raw.muted;
 for(const k of Object.keys(base.vol))if(Number.isFinite(raw.vol?.[k]))base.vol[k]=Math.max(0,Math.min(1,raw.vol[k]));return base;
}
export function loadProfiles(storage){let profiles={kendiri:freshProgress(),kelas:freshProgress('kelas')},mode='kendiri';const raw=JSON.parse(storage.getItem('misi-bandar-v2')||'null');if(raw){mode=raw.mode==='kelas'?'kelas':'kendiri';for(const m of ['kendiri','kelas'])profiles[m]=normalizeProgress(raw.profiles?.[m],m)}else{const old=JSON.parse(storage.getItem('misi-bandar-v1')||'null');if(old){mode=old.mode==='kelas'?'kelas':'kendiri';profiles[mode]=normalizeProgress(old,mode)}}return {profiles,mode};}
