const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 for(const test of [{name:'desktop',width:1440,height:900},{name:'tablet',width:820,height:1100},{name:'phone',width:390,height:844}]){
  const page=await browser.newPage({viewport:{width:test.width,height:test.height},hasTouch:test.name!=='desktop'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:8080');
  await page.locator('#settings').click();
  await page.locator('#mode').selectOption('kelas');
  await page.getByRole('button',{name:'Pilih Misi / Main Semula'}).click();
  await page.getByRole('button',{name:'Misi 3 · Makmal Tani Pintar'}).click();
  assert.equal(await page.locator('#cameraPanel').isVisible(),true);
  assert.equal(await page.locator('#camera').isVisible(),false);
  const stage=await page.locator('#stage').boundingBox();
  const panel=await page.locator('#cameraPanel').boundingBox();
  const camera=await page.locator('#cameraViewport').boundingBox();
  assert.ok(stage&&panel&&camera);
  assert.ok(Math.abs(camera.width/camera.height-4/3)<0.03,'Camera stays at 4:3');
  if(test.width>1000)assert.ok(panel.x>stage.x+stage.width-2,'Wide screen: preview beside game');
  else assert.ok(panel.y>=stage.y+stage.height-2,'Narrow screen: preview below game');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  assert.equal(await page.locator('#cameraControls button').count(),4);
  for(const [part,target] of [['Penanda aras air','Ruang A'],['Saluran air','Ruang B'],['Bahan kapilari','Ruang C']]){
   await page.locator('[data-part]').filter({hasText:part}).click();
   await page.locator('[data-target][aria-label="'+target+'"]').click();
  }
  assert.equal(await page.getByRole('button',{name:'Jalankan Simulasi'}).isEnabled(),true);
  await page.getByRole('button',{name:'Tetikus / Sentuhan'}).click();
  assert.equal(await page.locator('#camera').isVisible(),false);
  await page.getByRole('button',{name:'Jalankan Simulasi'}).click();
  assert.equal(await page.locator('#cameraPanel').isVisible(),false);
  assert.deepEqual(errors,[]);
  await page.close();
 }
 await browser.close();
 console.log('PASS: camera preview 4:3, desktop/tablet/phone layout, assembly, touch fallback, cleanup');
})().catch(e=>{console.error(e);process.exit(1)});
