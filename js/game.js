import {createPhase3} from './phase3.js';
import {repairCases} from './phase3-content.js';
import {renderer} from './art.js';
import {definition,places,systems,pbdChecklist,pbdRubric} from './content.js';
import {freshProgress,loadProfiles,badgeNames} from './progress.js';
import {drawScience,assemblyParts,learningStages,stageIndex,drawFlowOverlay} from './science.js';
import {mountAssembly} from './assembly.js';
import {HandControl} from './hands.js';
import {AudioDirector} from './audio.js';
const $=s=>document.querySelector(s);
let profiles={kendiri:freshProgress(),kelas:freshProgress('kelas')},mode='kendiri',storageOK=true;
try{({profiles,mode}=loadProfiles(localStorage))}catch{storageOK=false}
let state=profiles[mode],hands=null,assemblyUI=null,flowCompleted=false;
let scene='home',paused=false,simTime=0,last=0,speech='',speechID='',talking=false,review=false;
const sound=new AudioDirector(()=>state,playing=>{talking=playing;$('#dialogue').classList.toggle('speaking',playing)},message=>{$('#voiceStatus').textContent=message;if($('#voicePreviewStatus'))$('#voicePreviewStatus').textContent=message});
document.addEventListener('pointerdown',()=>sound.activate(),{passive:true});
document.addEventListener('click',event=>{if(event.isTrusted&&event.target?.closest?.('button'))sound.effect('click')},true);
document.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')sound.activate()});
const art=renderer($('#world')),portrait=renderer($('#portrait'));
const phase3=createPhase3({$,btn,spot,say,save,go,modal,esc,toast,award,answerForm,state:()=>state,time:()=>simTime,missionMenu,book,effect:kind=>sound.effect(kind)});
function save(){profiles[state.mode]=state;try{localStorage.setItem('misi-bandar-v2',JSON.stringify({mode:state.mode,profiles}))}catch{storageOK=false;toast('Simpanan tidak tersedia. Eksport rekod sebelum keluar.')}}
function newGame(){const begin=()=>{const m=state.mode,previous=state;state=freshProgress(m);Object.assign(state,{vol:{...previous.vol},muted:previous.muted,autoVoice:previous.autoVoice,musicEnabled:previous.musicEnabled,voiceLanguage:previous.voiceLanguage||'id-ID',voiceId:previous.voiceId||'auto',voiceRate:previous.voiceRate||1.1});state.started=true;profiles[m]=state;review=false;save();$('#modal').close();music();go('map')};if(state.started||state.answers.length||state.badges.length){modal('<h2>Mulakan permainan baharu?</h2><p>Hanya kemajuan mod ini akan dipadam. Eksport rekod melalui Buku Misi jika perlu. Mod lain tidak berubah.</p><button id="confirmNew">Ya, mula baharu</button><button id="cancelNew">Batal</button>');$('#confirmNew').onclick=begin;$('#cancelNew').onclick=()=>$('#modal').close()}else begin()}
function toast(s){$('#toast').textContent=s;$('#toast').style.display='block';clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('#toast').style.display='none',3500)}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function btn(text,fn,parent='#controls',cls=''){const b=document.createElement('button');b.textContent=text;b.className=cls;b.onclick=fn;$(parent).append(b);return b}
function spot(text,x,y,fn){const b=btn(text,fn,'#spots','spot');b.style.left=x+'%';b.style.top=y+'%'}
function modal(html){$('#modalBody').innerHTML=html;if(!$('#modal').open)$('#modal').showModal()}
function stopVoice(){sound.stopVoice()}
function say(text,id=''){speech=text;speechID=id;$('#speech').textContent=text;sound.present(text,id)}
function collapseDialogue(){const d=$('#dialogue'),b=$('#dialogToggle');d.classList.remove('expanded');b.setAttribute('aria-expanded','false');b.textContent='Lihat lagi';b.title='Besarkan dialog Alya'}
function speak(){sound.speak(speech,speechID,true)}
function music(){sound.activate()}
function unlock(id){if(!state.notes.includes(id))state.notes.push(id);save()}
function go(next){collapseDialogue();if(next==='ending'&&![1,2,3,4,5].every(n=>state.badges.includes(n))){toast('Lengkapkan kelima-lima misi sebelum menamatkan permainan.');return}const required=/^repair[01]$/.test(next)||next==='gate4'?3:/^final[0-2]$/.test(next)?4:next==='ending'?5:0;if(required&&state.mode!=='kelas'&&!state.badges.includes(required)){toast('Selesaikan misi sebelumnya dahulu.');return}$('#assemblyBoard')?.remove();hands?.stop();hands=null;assemblyUI=null;$('#cameraPanel').hidden=true;$('#playWorkspace').classList.remove('camera-active');$('#camera').hidden=true;$('#cameraPlaceholder').hidden=false;$('#cameraControls').replaceChildren();$('#cameraIndicator').textContent='Kamera dimatikan';$('#activity').replaceChildren();stopVoice();scene=next;paused=false;simTime=0;if(next!=='home'&&!review){state.scene=next;state.started=true;save()}$('#spots').replaceChildren();$('#controls').replaceChildren();$('#title').innerHTML='';$('#objective').textContent='';$('#status').textContent=`${state.mode==='kelas'?'Mod Kelas':'Mod Kendiri'} · ${state.badges.length}/5 lencana`;
if(next==='home'){review=false;$('#title').innerHTML='<span class="eyebrow">PENGEMBARAAN RBT • TAHUN 5</span><h1>Misi Pertanian<br>Bandar</h1><p>Jelajah Sistem Penanaman Secara Takungan</p>';$('#objective').textContent='Selamat datang ke Bandar Hijau · Fasa 3';say('Hai, saya Alya! Ruang rumah kita kecil, tetapi impian kebun kita besar. Mari bantu jiran meneroka pertanian bandar.','intro');btn('Mula Permainan Baharu',newGame,'#controls','primary');btn('Sambung Permainan',()=>{music();review=false;go(state.scene||'map')}).disabled=!state.started;btn('Pilih Misi / Main Semula',missionMenu);btn('Buku Misi Pertanian',book);btn('Mod Ulang Kaji',()=>{review=true;go('lab')});btn('Tetapan',settings)}
else if(next==='map'){say('Jiran kita mahu menanam sayur, tetapi ruang rumah terhad. Terokai tiga tempat dan periksa dua objek di setiap tempat. Kemudian ceritakan penemuan kamu.','map');$('#objective').textContent=`Misi 1 · Misteri Pertanian Bandar · ${places.filter(p=>p.items.every((_,i)=>state.visited.includes(p.id+i))).length}/3 tempat diterokai`;spot('Rumah Pangsa',19,49,()=>go('pangsa'));spot('Rumah Teres',73,51,()=>go('teres'));spot('Kebun Komuniti',22,91,()=>go('kebun'));spot(state.badges.length?'Pusat Teknologi':'Pusat Teknologi · terkunci',72,91,()=>state.badges.length||state.mode==='kelas'?go('lab'):toast('Lengkapkan Misi 1 untuk membuka pusat teknologi.'));btn('Catat Penemuan',answer1,'#controls','primary');btn('Petunjuk',()=>{state.hints.push({mission:1,time:Date.now()});save();say(definition+' Contohnya, sawi ditanam dalam pasu di balkoni rumah pangsa.','definition')});btn('Pilih Misi',missionMenu)}
else if(places.some(p=>p.id===next)){const p=places.find(p=>p.id===next);say(`${p.npc}: ${p.text}`,p.id);$('#objective').textContent='Misi 1 · '+p.topic;for(let i=0;i<2;i++)spot((state.visited.includes(p.id+i)?'✓ ':'')+p.items[i][0],i?71:25,i?49:73,()=>{if(!state.visited.includes(p.id+i))state.visited.push(p.id+i);unlock(p.id);go(p.id);say(`${p.npc}: ${p.items[i][1]}`,p.id+'-'+i)});btn('Kembali ke Bandar',()=>go('map'),'#controls','primary')}
else if(next==='lab'){say('Selamat datang ke Pusat Teknologi Pertanian! Periksa komponen empat sistem takungan. Bandingkan larutan yang statik dengan larutan yang dikitar semula.','lab');$('#objective').textContent='Misi 2 · Rahsia Sistem Takungan · Empat stesen interaktif';spot('Tanpa kitaran semula',27,76,()=>go('sim0'));spot('Dengan kitaran semula',72,76,()=>go('sim1'));spot('Akuaponik',25,40,()=>go('sim2'));spot('Bekas Pengairan Kendiri',72,40,()=>go('sim3'));btn('Makmal Tani Pintar',()=>go('workshop')).disabled=review||(!state.badges.includes(2)&&state.mode!=='kelas');btn('Bandingkan Sistem',compare);btn('Jelaskan Dua Sistem',answer2);btn(review?'Kembali ke Skrin Utama':'Kembali ke Bandar',()=>go(review?'home':'map'))}
else if(/^sim[0-3]$/.test(next)){const i=Number(next.at(-1)),s=systems[i];say(s.text,'system-'+i);$('#objective').textContent=s.name;const guide=document.createElement('section');guide.id='scienceGuide';guide.className='science-guide';guide.innerHTML='<h3>Ikuti Aliran Sistem</h3><div class="science-dots">'+learningStages[i].map((_,j)=>'<span data-guide-dot="'+j+'" aria-label="Langkah '+(j+1)+'">'+(j+1)+'</span>').join('')+'</div><article data-active-stage="-1" aria-live="off"></article><p class="science-disclaimer">Rajah animasi menunjukkan arah aliran, bukan skala atau masa sebenar.</p><div class="science-navigation"><button type="button" id="sciencePrev">◀ Sebelum</button><button type="button" id="scienceNext">Seterusnya ▶</button></div>';$('#activity').append(guide);const jump=dir=>{const n=learningStages[i].length;const to=(stageIndex(i,simTime)+dir+n)%n;simTime=to*3+.05;paused=false;const pause=$('#controls button');if(pause&&pause.textContent==='Mainkan')pause.textContent='Jeda'};$('#sciencePrev').onclick=()=>jump(-1);$('#scienceNext').onclick=()=>jump(1);const coords=[[[34,58],[67,37],[49,43],[68,76]],[[39,83],[18,52],[52,30],[77,62]],[[43,75],[20,46],[28,85],[65,27]],[[28,32],[72,32],[50,45],[50,65],[50,82],[84,64]]][i];s.parts.forEach((part,j)=>{const b=btn((state.inspected[i].includes(j)?'✓ ':'')+part[0],()=>{if(!review&&!state.inspected[i].includes(j))state.inspected[i].push(j);if(!review)unlock('system'+i);save();say(part[1],`system-${i}-${j}`);b.textContent='✓ '+part[0]},'#activity');b.dataset.component=j;const h=btn(String(j+1),()=>b.click(),'#spots','spot part-hotspot');h.style.left=coords[j][0]+'%';h.style.top=coords[j][1]+'%';h.title=part[0];h.setAttribute('aria-label',part[0]);});btn('Jeda',e=>{paused=!paused;$('#controls button').textContent=paused?'Mainkan':'Jeda'});btn('Ulang Animasi',()=>{simTime=0;paused=false;$('#controls button').textContent='Jeda'});btn('Bandingkan Sistem',compare);btn('Kembali ke Pusat',()=>go('lab'))}
else if(next==='workshop')workshop();
else if(next==='flow')flowScene();
else if(next==='gate4')phase3.centre();
else if(/^repair[01]$/.test(next))phase3.repair(Number(next.at(-1)));
else if(/^final[0-2]$/.test(next))phase3.finalScene(Number(next.at(-1)));
else if(next==='ending')phase3.ending();}

function answer1(){if(state.visited.length<6){toast('Periksa dua objek di setiap tiga tempat dahulu.');return}if(!state.summarySeen){say('Kamu telah melihat pasu di balkoni, tanaman bertingkat dan kebun komuniti. Apakah persamaannya? Semuanya menghasilkan makanan dengan menggunakan ruang yang ada. '+definition,'definition');modal('<h2>Rumuskan bersama Alya</h2><p>'+definition+'</p><p>Ingat pemerhatian kamu: sawi di balkoni, susunan menegak di rumah teres, dan kebun komuniti di bandar. Bincangkan persamaan aktiviti ini sebelum menulis penerangan sendiri.</p><button id="understood">Saya sudah membuat rumusan</button>');$('#understood').onclick=()=>{state.summarySeen=true;unlock('definition');$('#modal').close();answer1()};return}answerForm('misi1','Terangkan maksud pertanian bandar dan berikan sekurang-kurangnya satu contoh yang sesuai.',()=>award(1,'lab'))}
function answerForm(id,prompt,done){const previous=state.answers.filter(a=>a.id===id).at(-1);modal(`<h2>Catatan Peneroka</h2><p>${prompt}</p>${state.mode==='kelas'?'<p>Guru: gunakan Lembaran Respons Individu. Catatan komputer ini ialah rekod perbincangan kelas sahaja.</p>':''}<label>Jawapan kamu<textarea id="answer" maxlength="5000">${esc(state.drafts[id]??previous?.text??'')}</textarea></label><p>Jawapan terbuka disimpan untuk pertimbangan guru. Lencana menunjukkan aktiviti selesai, bukan Tahap Penguasaan.</p><p id="answerError" role="alert"></p><button id="submitAnswer">Simpan Catatan</button>`);$('#answer').oninput=()=>{state.drafts[id]=$('#answer').value;save()};let submitted=false;$('#submitAnswer').onclick=()=>{if(submitted)return;const text=$('#answer').value.trim();if(!text){$('#answerError').textContent='Tulis penerangan kamu dahulu.';return}submitted=true;delete state.drafts[id];state.answers.push({id,text,time:Date.now(),mode:state.mode,attempt:state.answers.filter(a=>a.id===id).length+1});save();$('#modal').close();done()}}
function award(n,next){if(review)return;if(n===4&&!state.cases.every(c=>c.repaired&&c.explained))return;if(n===5&&state.finalDone.length!==3)return;const missing=Array.from({length:n-1},(_,i)=>i+1).filter(id=>!state.badges.includes(id));if(missing.length){if(state.mode==='kelas'){modal('<h2>Pratonton Kelas — Belum Tamat</h2><p>Aktiviti ini telah ditunjukkan, tetapi Misi '+missing.join(', ')+' belum dilengkapkan. Tiada lencana baharu diberikan dan kemajuan akhir tidak diubah.</p><button id="previewReturn">Kembali ke Senarai Misi</button>');$('#previewReturn').onclick=()=>{$('#modal').close();missionMenu()}}else toast('Selesaikan misi sebelumnya dahulu.');return;}if(!state.badges.includes(n)){state.badges.push(n);state.stamps.push({mission:n,time:Date.now()})}if(n===5&&[1,2,3,4,5].every(id=>state.badges.includes(id)))state.completedAt??=Date.now();state.scene=next;save();say(n===4?'Syabas! Kamu berjaya mengenal pasti punca masalah dan memulihkan kedua-dua sistem penanaman!':'Tahniah! Kamu memperoleh lencana '+badgeNames[n-1]+'. Catatan kamu disimpan untuk semakan guru.','congrats-'+n);modal(`<div class="celebrate"><h2>Tahniah, peneroka!</h2><canvas id="stampAlya" width="80" height="96"></canvas><div class="badge">✦</div><h3>${badgeNames[n-1]}</h3><p>${state.badges.length}/5 lencana terkumpul</p><div class="stamp final-stamp">SELESAI!</div><button id="nextMission">${n===1?'Terokai Pusat Teknologi':n===2?'Masuk Makmal Tani Pintar':n===3?'Lihat Pintu Misi 4':n===4?'Masuk Balai Bandar Hijau':'Tamat Permainan'}</button></div>`);sound.effect('reward');setTimeout(()=>{if($('#stampAlya'))sound.effect('stamp')},950);$('#nextMission').onclick=()=>{$('#modal').close();go(next)}}
function answer2(){if(review){toast('Mod ulang kaji tidak memberikan lencana. Sambung permainan untuk merekod kemajuan.');return}if(state.mode==='kelas'){modal('<h2>Perbincangan Kelas — Dua Sistem</h2><p>Guru: tunjukkan dua sistem, minta murid berbincang dan catat jawapan masing-masing pada Lembaran Respons Individu. Rekod ini bukan jawapan individu semua murid.</p><label>Catatan guru (pilihan)<textarea id="classSystemNote"></textarea></label><button id="confirmClassSystems">Perbincangan Selesai</button>');$('#confirmClassSystems').onclick=()=>{const id='misi2';state.answers.push({id,text:$('#classSystemNote').value.trim(),kind:'class_activity',individualAnswersCollected:false,time:Date.now(),mode:'kelas',attempt:state.answers.filter(a=>a.id===id).length+1});save();$('#modal').close();award(2,'workshop')};return}if(systems.some((s,i)=>state.inspected[i].length<s.parts.length)){toast('Periksa semua komponen di keempat-empat stesen dahulu.');return}modal('<h2>Jelaskan dua sistem</h2><p>Pilih dua sistem yang berbeza. Terangkan urutan pergerakan air serta fungsi komponen.</p>'+[0,1].map(n=>`<label>Sistem ${n+1}<select id="systemChoice${n}">${systems.map((s,i)=>`<option value="${i}" ${i===n?'selected':''}>${s.name}</option>`).join('')}</select></label><label>Penerangan ${n+1}<textarea id="explanation${n}"></textarea></label>`).join('')+'<p id="systemError" role="alert"></p><button id="saveSystems">Simpan Penerangan</button>');const draft=state.drafts.misi2;for(let n=0;n<2;n++){if(draft){$('#systemChoice'+n).value=draft.choices[n];$('#explanation'+n).value=draft.texts[n]}for(const id of ['systemChoice','explanation'])$('#'+id+n).oninput=()=>{state.drafts.misi2={choices:[0,1].map(i=>$('#systemChoice'+i).value),texts:[0,1].map(i=>$('#explanation'+i).value)};save()}}let submitted=false;$('#saveSystems').onclick=()=>{if(submitted)return;const choices=[0,1].map(n=>Number($('#systemChoice'+n).value)),texts=[0,1].map(n=>$('#explanation'+n).value.trim());if(choices[0]===choices[1]||texts.some(t=>!t)){$('#systemError').textContent='Pilih dua sistem berbeza dan lengkapkan kedua-dua penerangan.';return}submitted=true;delete state.drafts.misi2;state.answers.push({id:'misi2',text:choices.map((c,i)=>systems[c].name+': '+texts[i]).join('\n'),systems:choices,time:Date.now(),mode:state.mode,attempt:state.answers.filter(a=>a.id==='misi2').length+1});award(2,'workshop')}}
function compare(){modal(`<h2>Bandingkan Sistem</h2><div class="compare">${systems.map((s,i)=>`<article><h3>${s.name}</h3><p>${s.text}</p><p>${i===1||i===2?'Pam mengalirkan air dalam kitaran.':i===3?'Air naik melalui tindakan kapilari, tanpa pam.':'Larutan statik, tanpa pam kitaran.'}</p><button data-system="${i}">Lihat Animasi</button></article>`).join('')}</div><p>Bandingkan khususnya kultur air: tanpa kitaran menyimpan larutan statik, manakala dengan kitaran menggunakan pam dan salur kembali. Akuaponik melibatkan ikan dan mikroorganisma; bekas pengairan kendiri menggunakan tindakan kapilari.</p>`);document.querySelectorAll('[data-system]').forEach(b=>b.onclick=()=>{$('#modal').close();go('sim'+b.dataset.system)})}
function book(){
 modal('<section class="mission-book"><h2>Buku Misi Pertanian</h2><p>Nota interaktif, rekod kemajuan dan instrumen guru untuk SP 7.1.1 dan SP 7.1.2.</p><div class="book-tabs" role="group" aria-label="Bahagian Buku Misi"><button type="button" data-book-tab="nota">Kad Ilmu</button><button type="button" data-book-tab="lencana">Lencana & Rekod</button><button type="button" data-book-tab="pbd">Rubrik PBD</button></div><div id="bookPages"></div><div class="book-actions"><button id="viewCard">Kad Pemilihan Sistem Penanaman</button><button id="viewReport">Laporan Pembelajaran</button><button id="viewWorksheet">Lembaran Respons Individu</button><button id="export">Eksport Rekod JSON</button><button id="replay">Ulang Kaji Animasi</button></div></section>');
 const pages=$('#bookPages'), card=(name,body,icon='🌱')=>'<article class="knowledge-card"><header><span aria-hidden="true">'+icon+'</span><strong>'+esc(name)+'</strong></header><p>'+esc(body)+'</p></article>';
 const opened=state.notes;
 function notes(){
  const items=[];
  if(opened.includes('definition'))items.push(card('Maksud Pertanian Bandar · SP 7.1.1',definition,'🏘️'));
  for(const p of places)if(opened.includes(p.id))items.push(card(p.name,p.items.map(x=>x[0]+': '+x[1]).join('\n'),'🌿'));
  systems.forEach((system,i)=>{if(!opened.includes('system'+i))return;
   const parts=state.inspected[i].map(j=>system.parts[j]).filter(Boolean).map(x=>x[0]+': '+x[1]).join('\n');
   items.push(card(system.name,system.text+(parts?'\nKomponen diperhatikan:\n'+parts:''),i===2?'🐟':'💧'));
  });
  for(let i=0;i<repairCases.length;i++)if(opened.includes('repair'+i))items.push(card('Kes '+(i+1)+' · Cara Membaiki',repairCases[i].note,'🛠️'));
  pages.innerHTML='<div class="book-section-head"><h3>Kad Ilmu Pertanian</h3><p>'+items.length+' kad ilmu dibuka. Periksa objek dan stesen untuk menambah koleksi.</p></div><div class="knowledge-grid">'+(items.join('')||'<p class="book-empty">Belum ada kad ilmu. Teroka bandar dan stesen sistem terlebih dahulu.</p>')+'</div><p class="book-note">Animasi boleh diulang tanpa mengubah lencana atau jawapan asal.</p>';
 }
 function badges(){
  const tiles=badgeNames.map((name,i)=>{const n=i+1,have=state.badges.includes(n),stamp=state.stamps.find(x=>x.mission===n);
   return '<article class="badge-tile'+(have?' collected':'')+'"><span aria-hidden="true">'+(have?'✦':'◇')+'</span><strong>Misi '+n+'</strong><p>'+esc(name)+'</p><small>'+(have?(stamp?new Date(stamp.time).toLocaleString('ms-MY'):'SELESAI'):'Belum selesai')+'</small></article>';
  }).join('');
  const saved=state.answers.slice().sort((a,b)=>b.time-a.time);
  pages.innerHTML='<div class="book-section-head"><h3>Pasport Peneroka</h3><p>'+state.badges.length+'/5 lencana · '+saved.length+' catatan · '+state.hints.length+' petunjuk</p></div><div class="badge-grid">'+tiles+'</div><h3>Jejak Pembelajaran</h3><div class="book-history">'+(saved.map(a=>'<article><strong>'+esc(a.id)+' · Cubaan '+esc(a.attempt)+'</strong><small>'+new Date(a.time).toLocaleString('ms-MY')+'</small><p>'+esc(a.text||'Aktiviti perbincangan kelas — jawapan individu tidak dikumpul.')+'</p></article>').join('')||'<p>Belum ada catatan disimpan.</p>')+'</div><p class="book-note">Lencana ialah rekod penyelesaian aktiviti, bukan bukti automatik penguasaan DSKP.</p>';
 }
 function rubric(){
  const rubricTable='<div class="rubric-grid">'+pbdRubric.map(item=>'<article class="rubric-card"><h4>SP '+esc(item.sp)+' — '+esc(item.title)+'</h4>'+item.levels.map((desc,i)=>'<p><b>Skor '+(i+1)+'</b> · '+esc(desc)+'</p>').join('')+'</article>').join('')+'</div>';
  const assessment=state.mode==='kelas'
   ?'<p class="book-note"><strong>Mod Kelas:</strong> Ini hanya paparan dan borang rujukan guru. Jawapan setiap murid tidak dikumpul oleh komputer ini. Catat skor individu secara berasingan.</p>'
   :'<form id="teacherRubric" onsubmit="return false"><h3>Catatan Guru (Manual)</h3>'+pbdRubric.map(item=>'<label>SP '+esc(item.sp)+' — '+esc(item.title)+'<select data-score="'+item.sp+'"><option value="">Belum dinilai</option><option value="1">1 — Perlu bimbingan</option><option value="2">2 — Separa tepat</option><option value="3">3 — Tepat</option></select></label>').join('')+'<h3>Senarai Semak Pemerhatian</h3>'+pbdChecklist.map((item,i)=>'<label>'+esc(item)+'<select data-check="'+i+'"><option value="">Belum direkod</option><option value="ya">Ya</option><option value="belum">Belum</option></select></label>').join('')+'<label>Catatan / Tindakan Susulan<textarea id="pbdComment" maxlength="3000"></textarea></label><button type="button" id="saveRubric">Simpan Penilaian Guru</button><p id="rubricStatus" role="status"></p></form>';
  pages.innerHTML='<div class="book-section-head"><h3>Rubrik Penerangan — Lampiran 3 RPH</h3><p>Skala aktiviti 1–3, <strong>bukan Tahap Penguasaan (TP)</strong>. Guru membuat pertimbangan profesional berdasarkan jawapan murid.</p></div>'+rubricTable+assessment;
  const form=$('#teacherRubric');if(!form)return;
  form.querySelectorAll('[data-score]').forEach(el=>{el.value=state.pbd.scores[el.dataset.score]||''});
  form.querySelectorAll('[data-check]').forEach(el=>{el.value=state.pbd.checks[Number(el.dataset.check)]||''});
  $('#pbdComment').value=state.pbd.comment||'';
  $('#saveRubric').onclick=()=>{
   for(const el of form.querySelectorAll('[data-score]'))state.pbd.scores[el.dataset.score]=[1,2,3].includes(Number(el.value))&&el.value!==''?Number(el.value):null;
   for(const el of form.querySelectorAll('[data-check]'))state.pbd.checks[Number(el.dataset.check)]=el.value;
   state.pbd.comment=$('#pbdComment').value.trim();state.pbd.assessedAt=Date.now();save();
   $('#rubricStatus').textContent='Penilaian manual disimpan. Ini bukan pengiraan TP automatik.';
  };
 }
 const sections={nota:notes,lencana:badges,pbd:rubric};
 const setTab=id=>{pages.replaceChildren();sections[id]();document.querySelectorAll('[data-book-tab]').forEach(b=>{const active=b.dataset.bookTab===id;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))})};
 document.querySelectorAll('[data-book-tab]').forEach(b=>b.onclick=()=>setTab(b.dataset.bookTab));
 setTab('nota');
 $('#viewCard').onclick=phase3.card;$('#viewCard').disabled=!state.cards.length;
 $('#viewReport').onclick=phase3.report;$('#viewWorksheet').onclick=phase3.worksheet;
 $('#export').onclick=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(state,null,2)],{type:'application/json'}));a.download='rekod-misi-pertanian.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)};
 $('#replay').onclick=()=>{$('#modal').close();review=true;go('lab')};
}
function missionMenu(){modal('<h2>Pilih Misi / Main Semula</h2><p>Main semula mengekalkan lencana dan sejarah jawapan.</p><div id="missionButtons"></div><p>Lencana menunjukkan penyelesaian aktiviti, bukan Tahap Penguasaan.</p>');[['Misi 1 · Misteri Pertanian Bandar','map'],['Misi 2 · Rahsia Sistem Takungan','lab'],['Misi 3 · Makmal Tani Pintar','workshop'],['Misi 4 · Operasi Selamatkan Tanaman','gate4'],['Misi Akhir · Wira Pertanian Bandar','final0']].forEach(([label,target],i)=>{const b=btn(label,()=>{$('#modal').close();review=false;phase3.replay(target)},'#missionButtons');b.disabled=i>0&&!state.badges.includes(i)&&state.mode!=='kelas'})}
function refreshVoiceOptions(){
 const list=$('#voiceId'),language=$('#voiceLanguage');
 if(!list||!language)return;
 const previous=state.voiceId||'auto';
 list.replaceChildren();
 const add=(value,text)=>{const item=document.createElement('option');item.value=value;item.textContent=text;list.append(item)};
 add('auto','Automatik (utamakan suara Google jika ada)');
 const choices=sound.voicesFor(language.value);
 for(const v of choices)add(sound.voiceKey(v),v.name+' — '+v.lang+(v.localService?' · Peranti':' · Dalam talian / pelayar'));
 if(previous!=='auto'&&![...list.options].some(opt=>opt.value===previous)){const missing=document.createElement('option');missing.value=previous;missing.textContent='Suara pilihan tidak tersedia — pilih suara lain';missing.disabled=true;list.append(missing)}
 list.value=previous;
 if(previous!=='auto'&&list.selectedOptions[0]?.disabled){$('#voicePreviewStatus').textContent='Suara lama tidak tersedia pada peranti ini. Pilih suara lain.'}
 else $('#voicePreviewStatus').textContent=choices.length?choices.length+' suara tersedia. Pilih dan klik Uji Suara.':'Tiada suara untuk bahasa ini pada peranti ini. Cuba bahasa lain.';
}
function settings(){
 const labels={'id-ID':'Bahasa Indonesia (id-ID)','ms-MY':'Bahasa Melayu Malaysia (ms-MY)','en-US':'English (en-US)','zh-CN':'中文 (zh-CN)'};
 modal(`<h2>Tetapan</h2>
 <label>Mod permainan <select id="mode"><option value="kendiri">Mod Kendiri</option><option value="kelas">Mod Kelas</option></select></label>
 <fieldset id="voiceSettings"><legend>Suara Alya — Pilih Bahasa dan Suara</legend>
 <label>Bahasa suara / Aksen <select id="voiceLanguage">${sound.availableLanguages().map(lang=>`<option value="${esc(lang)}">${esc(labels[lang]||lang)}</option>`).join('')}</select></label>
 <label>Suara tersedia pada peranti <select id="voiceId"></select></label>
 <label>Kelajuan suara <input id="voiceRate" type="range" min="0.7" max="1.4" step="0.05" value="${state.voiceRate||1.1}"><output id="voiceRateLabel">${Number(state.voiceRate||1.1).toFixed(2)}×</output></label>
 <button type="button" id="testVoice">Uji Suara Alya</button>
 <p id="voicePreviewStatus" role="status">Sedang menyemak senarai suara peranti…</p>
 <p class="voiceHint">Pilihan bahasa mengubah suara pembaca, bukan teks pembelajaran. Semua nota dan arahan permainan kekal dalam Bahasa Melayu Malaysia. Suara Google hanya muncul jika disediakan oleh pelayar anda.</p></fieldset>
 <label><input id="mute" type="checkbox" ${state.muted?'checked':''}> Bisukan semua audio</label>
 <label><input id="autoVoice" type="checkbox" ${state.autoVoice!==false?'checked':''}> Bacaan suara Alya secara automatik</label>
 <label><input id="musicEnabled" type="checkbox" ${state.musicEnabled!==false?'checked':''}> Muzik latar</label>
 ${['voice','music','sfx'].map((x,i)=>`<label>${['Kelantangan suara','Kelantangan muzik latar','Kelantangan kesan bunyi'][i]}<input type="range" data-vol="${x}" min="0" max="1" step=".05" value="${state.vol[x]}"></label>`).join('')}
 <p>Jika tiada suara dipilih tersedia, permainan tidak menukar kepada suara lain secara senyap. Sari kata sentiasa boleh dibaca.</p>
 <p>Mod Kelas membolehkan guru terus memilih lima misi yang tersedia. Gunakan respons individu untuk PBD.</p>
 <p>Cadangan 60 minit: induksi 5 · Misi 1: 8 · Misi 2: 14 · Misi 3: 10 · Misi 4: 8 · akhir: 10 · penutup: 5.</p>
 <p>${storageOK?'Simpanan pelayar tersedia.':'Simpanan pelayar tidak tersedia; eksport rekod sebelum keluar.'}</p>`);
 const langSelect=$('#voiceLanguage');
 if(![...langSelect.options].some(x=>x.value===state.voiceLanguage)){
  const o=document.createElement('option');o.value=state.voiceLanguage;o.textContent=labels[state.voiceLanguage]||state.voiceLanguage;langSelect.append(o)
 }
 langSelect.value=state.voiceLanguage||'id-ID';
 refreshVoiceOptions();
 langSelect.onchange=()=>{state.voiceLanguage=langSelect.value;state.voiceId='auto';stopVoice();save();refreshVoiceOptions()};
 $('#voiceId').onchange=e=>{state.voiceId=e.target.value;stopVoice();save()};
 $('#voiceRate').oninput=e=>{state.voiceRate=Number(e.target.value);$('#voiceRateLabel').textContent=state.voiceRate.toFixed(2)+'×';save()};
 $('#testVoice').onclick=()=>sound.speak('Hai, saya Alya! Selamat datang ke Misi Pertanian Bandar. Mari kita belajar bersama-sama.','',true);
 $('#mode').value=state.mode;
 $('#mode').onchange=e=>{save();state=profiles[e.target.value];review=false;stopVoice();sound.sync();save();$('#modal').close();go('home')};
 $('#mute').onchange=e=>{state.muted=e.target.checked;if(state.muted)stopVoice();sound.sync();save()};
 $('#autoVoice').onchange=e=>{state.autoVoice=e.target.checked;if(!state.autoVoice){stopVoice();$('#voiceStatus').textContent='Bacaan automatik dimatikan. Tekan Dengar Semula.'}save()};
 $('#musicEnabled').onchange=e=>{state.musicEnabled=e.target.checked;sound.sync();save()};
 document.querySelectorAll('[data-vol]').forEach(el=>el.oninput=()=>{state.vol[el.dataset.vol]=Number(el.value);sound.sync();save()});
}
window.speechSynthesis?.addEventListener?.('voiceschanged',()=>{if($('#voiceLanguage'))refreshVoiceOptions()});
$('#dialogToggle').onclick=()=>{const d=$('#dialogue'),b=$('#dialogToggle');const expanded=d.classList.toggle('expanded');b.setAttribute('aria-expanded',String(expanded));b.textContent=expanded?'Ringkaskan':'Lihat lagi';b.title=expanded?'Ringkaskan dialog Alya':'Besarkan dialog Alya'};
$('#home').onclick=()=>go('home');$('#book').onclick=book;$('#settings').onclick=settings;$('#close').onclick=()=>$('#modal').close();$('#listen').onclick=speak;
function frame(t){const delta=Math.min((t-last)/1000,.1);last=t;if(!paused)simTime+=delta;if(phase3.draw(scene,simTime,$('#world'),art)){}else if(scene==='sim2')drawScience($('#world'),'aqua',simTime);else if(scene==='sim3'||scene==='flow')drawScience($('#world'),'self',simTime);else if(scene==='workshop')drawScience($('#world'),'self',0,state.assembly,true);else art.draw(scene,scene.startsWith('sim')?simTime:t/1000);if(/^sim[0-3]$/.test(scene)){
 const sys=Number(scene.at(-1));drawFlowOverlay($('#world'),sys,simTime);
 const guide=$('#scienceGuide'),ix=stageIndex(sys,simTime),card=guide?.querySelector('[data-active-stage]');
 if(card&&Number(card.dataset.activeStage)!==ix){card.dataset.activeStage=ix;card.innerHTML='<strong>Langkah '+(ix+1)+' — '+esc(learningStages[sys][ix][0])+'</strong><p>'+esc(learningStages[sys][ix][1])+'</p>';guide.querySelectorAll('[data-guide-dot]').forEach((node,n)=>node.classList.toggle('active',n===ix))}
 }else if(scene==='flow'){
   drawFlowOverlay($('#world'),3,simTime);
   const ix=stageIndex(3,simTime),g=$('#capillaryGuide'),active=g?.querySelector('[data-capillary-stage]');
   if(active&&Number(active.dataset.capillaryStage)!==ix){
    active.dataset.capillaryStage=ix;
    active.innerHTML='<strong>Langkah '+(ix+1)+' — '+esc(learningStages[3][ix][0])+'</strong><p>'+esc(learningStages[3][ix][1])+'</p>';
    g.querySelectorAll('[data-guide-dot]').forEach((el,i)=>el.classList.toggle('active',i===ix));
   }
  }
 if(scene==='flow'&&simTime>=6&&!flowCompleted){flowCompleted=true;state.simulationSeen=true;save();$('#explainLab').disabled=false;}if($('#stampAlya')){const stampArt=renderer($('#stampAlya'));stampArt.clear();stampArt.alya(40,50,t/1000,2.7,'stamp');}portrait.clear();portrait.alya(40,50,t/1000,2.7,talking?'talk':Math.floor(t/3000)%2?'wave':'idle');requestAnimationFrame(frame)}go('home');requestAnimationFrame(frame);
function workshop(){
 say('Makmal Tani Pintar: pasang tiga komponen pada bekas. A ialah penanda aras air, B ialah saluran mengisi air, C menghubungkan ruang air dengan medium. Seret komponen atau pilih komponen kemudian sentuh ruang.','workshop');
 $('#objective').textContent='Misi 3 · Pasang tiga komponen';
 $('#activity').innerHTML='<div id="assemblyBoard"></div><p id="assemblyFeedback" role="status">Pilih komponen dan letakkan pada ruang yang sesuai.</p>';
 const panel=$('#cameraPanel'),video=$('#camera'),placeholder=$('#cameraPlaceholder');
 panel.hidden=false;$('#playWorkspace').classList.add('camera-active');
 video.hidden=true;placeholder.hidden=false;$('#cameraIndicator').textContent='Kamera dimatikan';
 $('#cameraStatus').textContent='Tetikus / Sentuhan tersedia. Aktifkan Kawalan Tangan untuk melihat kamera.';
 const board=$('#assemblyBoard');$('#stage').append(board);
 assemblyUI=mountAssembly(board,state.assembly,()=>{sound.effect('correct');save();$('#runSimulation').disabled=state.assembly.length!==3},message=>{if(message.startsWith('Belum tepat'))sound.effect('error');$('#assemblyFeedback').textContent=message});
 const run=btn('Jalankan Simulasi',()=>go('flow'));run.id='runSimulation';run.disabled=state.assembly.length!==3;
 btn('Pasang Semula',()=>{state.assembly=[];save();go('workshop')});
 btn('Kembali ke Pusat',()=>go('lab'));
 const status=message=>{
   $('#cameraStatus').textContent=message;
   if(message.startsWith('Kamera tidak tersedia')||message.startsWith('Pengecaman terhenti')){
     video.hidden=true;placeholder.hidden=false;$('#cameraIndicator').textContent='Kamera tidak tersedia';
   }else if(message.includes('Sedia.')){
     $('#cameraIndicator').textContent='Tangan dikesan';
   }else if(message.includes('Kalibrasi')||message.includes('Meminta kamera')||message.includes('Memuatkan')){
     $('#cameraIndicator').textContent='Memulakan kamera…';
   }else if(message.includes('Tangan tidak dikesan')){
     $('#cameraIndicator').textContent='Cari tangan';
   }
 };
 const enableHand=()=>{
   hands?.stop();
   video.hidden=false;placeholder.hidden=true;
   $('#cameraIndicator').textContent='Memulakan kamera…';
   hands=new HandControl(video,status,(x,y,phase)=>{
     if(!assemblyUI)return;
     if(phase==='lost'){assemblyUI.hide();return}
     const box=board.getBoundingClientRect();
     assemblyUI.hand(x*box.width,y*box.height,phase)
   });
   hands.start();
 };
 btn('Kawalan Tangan',enableHand,'#cameraControls');
 btn('Tetikus / Sentuhan',()=>{
   hands?.stop();hands=null;assemblyUI?.hide();
   video.hidden=true;placeholder.hidden=false;
   $('#cameraIndicator').textContent='Kamera dimatikan';
   status('Tetikus / Sentuhan aktif. Kamera dimatikan.');
 },'#cameraControls');
 btn('Kalibrasi Semula',()=>hands?.detector?hands.calibrate():status('Aktifkan Kawalan Tangan terlebih dahulu.'),'#cameraControls');
 btn('Cuba Semula Kamera',enableHand,'#cameraControls');
}
function flowScene(){if(state.assembly.length!==3){go('workshop');return}flowCompleted=state.simulationSeen;
 $('#activity').innerHTML='<section id="capillaryGuide" class="science-guide" aria-label="Langkah tindakan kapilari"><h3>Tindakan Kapilari — Tanpa Pam</h3><div class="science-dots">'+learningStages[3].map((_,i)=>'<span data-guide-dot="'+i+'">'+(i+1)+'</span>').join('')+'</div><article data-capillary-stage="-1"></article><p class="science-disclaimer">Perhatikan air bergerak dari ruang takungan melalui bahan penyerap ke medium dan akar. Ini ialah rajah pembelajaran, bukan kelajuan sebenar.</p></section>';$('#objective').textContent='Ruang air → partikel kapilari → medium → akar';say('Bahan kapilari bersentuhan dengan air. Air naik melalui bahan ini ke medium melalui tindakan kapilari, tanpa pam. Perhatikan perjalanan air sebelum menerangkan fungsinya.','capillary-flow');const pause=btn('Jeda',()=>{paused=!paused;pause.textContent=paused?'Mainkan':'Jeda'});btn('Ulang Animasi',()=>{simTime=0;paused=false;pause.textContent='Jeda'});const explain=btn('Jelaskan Tindakan Kapilari',()=>answerForm('misi3','1. Apakah fungsi ruang partikel kapilari? 2. Bagaimanakah air bergerak dari takungan ke medium tanaman?',()=>award(3,'gate4')));explain.id='explainLab';explain.disabled=!flowCompleted;btn('Periksa Semula Komponen',()=>go('workshop'))}
