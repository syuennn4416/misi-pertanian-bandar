const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 for(const [name,width,height] of [['desktop',1440,900],['phone',390,844]]){
  const page=await browser.newPage({viewport:{width,height},hasTouch:name==='phone'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:8080');
  await page.locator('#book').click();
  await page.getByRole('button',{name:'Kad Ilmu'}).click();
  assert.match(await page.locator('#bookPages').innerText(),/Kad Ilmu Pertanian/);
  await page.getByRole('button',{name:'Rubrik PBD'}).click();
  assert.match(await page.locator('#bookPages').innerText(),/bukan Tahap Penguasaan/);
  await page.locator('[data-score="7.1.1"]').selectOption('3');
  await page.locator('[data-score="7.1.2"]').selectOption('2');
  await page.locator('[data-check="0"]').selectOption('ya');
  await page.locator('#pbdComment').fill('Perlu mengulang kaji fungsi pam.');
  await page.getByRole('button',{name:'Simpan Penilaian Guru'}).click();
  assert.match(await page.locator('#rubricStatus').innerText(),/manual disimpan/);
  await page.locator('#close').click();
  await page.reload();
  await page.locator('#book').click();
  await page.getByRole('button',{name:'Rubrik PBD'}).click();
  assert.equal(await page.locator('[data-score="7.1.1"]').inputValue(),'3');
  assert.equal(await page.locator('[data-score="7.1.2"]').inputValue(),'2');
  await page.getByRole('button',{name:'Laporan Pembelajaran'}).click();
  assert.match(await page.locator('#printContent').innerText(),/Skala 1–3|Skala 1-3/);
  await page.getByRole('button',{name:'Tutup ×'}).click();
  await page.locator('#book').click();
  await page.getByRole('button',{name:'Lembaran Respons Individu'}).click();
  assert.match(await page.locator('#printContent').innerText(),/Kultur Air Dalam/);
  await page.getByRole('button',{name:'Tutup ×'}).click();
  await page.locator('#settings').click();
  await page.locator('#mode').selectOption('kelas');
  await page.locator('#book').click();
  await page.getByRole('button',{name:'Rubrik PBD'}).click();
  assert.equal(await page.locator('#teacherRubric').count(),0,'Class discussion cannot invent individual scores');
  await page.locator('#close').click();
  await page.getByRole('button',{name:'Pilih Misi / Main Semula'}).click();
  await page.getByRole('button',{name:'Misi 2 · Rahsia Sistem Takungan'}).click();
  for(let i=0;i<4;i++){
   const stations=['Tanpa kitaran semula','Dengan kitaran semula','Akuaponik','Bekas Pengairan Kendiri'];
   await page.getByRole('button',{name:stations[i],exact:true}).click();
   assert.equal(await page.locator('#scienceGuide').count(),1);
   assert.equal(await page.locator('[data-guide-dot]').count(),[3,3,3,4][i]);
   const initial=await page.locator('[data-active-stage]').getAttribute('data-active-stage');
   await page.locator('#scienceNext').click();
   await page.waitForTimeout(120);
   const current=await page.locator('[data-active-stage]').getAttribute('data-active-stage');
   assert.notEqual(current,initial,'Science stage navigation changes the explanation');
   await page.getByRole('button',{name:'Kembali ke Pusat'}).click();
  }
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  assert.deepEqual(errors,[],'No page runtime errors');
  await page.close();
 }
 await browser.close();
 console.log('PASS: interactive science stages, unlockable notebook, teacher-only rubric, persistent scores, printable worksheet, phone/desktop');
})().catch(e=>{console.error(e);process.exit(1)});
