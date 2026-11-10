const assert=require('node:assert/strict');
(async()=>{
 const {learningStages,stageIndex,drawFlowOverlay}=await import('../js/science.js');
 const {pbdChecklist,pbdRubric,systems}=await import('../js/content.js');
 const {freshProgress,normalizeProgress}=await import('../js/progress.js');
 assert.equal(learningStages.length,4);
 assert.deepEqual(learningStages.map(x=>x.length),[3,3,3,4]);
 assert.equal(stageIndex(0,0),0);assert.equal(stageIndex(0,3),1);
 assert.equal(stageIndex(1,6),2);assert.equal(stageIndex(3,9),3);
 assert.equal(stageIndex(3,12),0);
 for(let i=0;i<4;i++){
  assert.ok(learningStages[i].every(step=>step.length===2&&step.every(x=>x.length>10)));
  assert.ok(systems[i].parts.length>=4);
 }
 assert.match(learningStages[0].map(x=>x[1]).join(' '),/statik/);
 assert.match(learningStages[1].map(x=>x[1]).join(' '),/pam/i);
 assert.match(learningStages[2].map(x=>x[1]).join(' '),/ammonia.*nitrit.*nitrat/i);
 assert.match(learningStages[3].map(x=>x[1]).join(' '),/tanpa.*pam/i);
 const ctx={fillStyle:'',font:'',fillRect(x,y,w,h){assert.ok([x,y,w,h].every(Number.isFinite));},fillText(x,y,z){assert.ok(x)},beginPath(){},stroke(){}};
 for(let i=0;i<4;i++)drawFlowOverlay({getContext:()=>ctx},i,5.2);
 assert.equal(pbdChecklist.length,5);
 assert.deepEqual(pbdRubric.map(x=>x.sp),['7.1.1','7.1.2']);
 assert.ok(pbdRubric.every(r=>r.levels.length===3));
 const newProfile=freshProgress();assert.equal(newProfile.pbd.scores['7.1.1'],null);
 assert.equal(newProfile.pbd.assessedAt,null);
 const old={mode:'kendiri',badges:[1,2],answers:[{id:'misi1',text:'Ada contoh',time:20}]};
 const migrated=normalizeProgress(old,'kendiri');
 assert.deepEqual(migrated.badges,[1,2]);assert.equal(migrated.pbd.scores['7.1.2'],null);
 const marked=normalizeProgress({...old,pbd:{scores:{'7.1.1':3,'7.1.2':2},checks:['ya','belum','x'],comment:'Semakan guru',assessedAt:15}},'kendiri');
 assert.equal(marked.pbd.scores['7.1.1'],3);assert.equal(marked.pbd.scores['7.1.2'],2);
 assert.deepEqual(marked.pbd.checks.slice(0,3),['ya','belum','']);
 assert.equal(marked.pbd.comment,'Semakan guru');
 const unsafe=normalizeProgress({pbd:{scores:{'7.1.1':5,'7.1.2':'3'},checks:['salah']}},'kelas');
 assert.equal(unsafe.pbd.scores['7.1.1'],null);assert.equal(unsafe.pbd.scores['7.1.2'],null);
 assert.equal(unsafe.pbd.checks[0],'');
 assert.equal(unsafe.badges.length,0,'No rubric entry may invent a badge');
 console.log('PASS: four science-stage diagrams, RPH PBD checklist/rubric, safe save migration and manual-only scores');
})().catch(e=>{console.error(e);process.exit(1)});
