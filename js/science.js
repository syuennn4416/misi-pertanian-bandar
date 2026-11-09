// Side-view models; coordinates shared with assembly targets.
export const assemblyParts=[{id:'level',name:'Penanda aras air',x:28,y:48},{id:'inlet',name:'Saluran air',x:72,y:48},{id:'capillary',name:'Bahan kapilari',x:50,y:70}];
export function drawScience(canvas,type,time,installed=['level','inlet','capillary'],greenhouse=false){
 const c=canvas.getContext('2d'),r=(x,y,w,h,col)=>{c.fillStyle=col;c.fillRect(x,y,w,h)},text=(s,x,y)=>{c.fillStyle='#294e47';c.font='12px sans-serif';c.fillText(s,x,y)};
 r(0,0,640,360,'#f2eed9');for(let x=0;x<640;x+=20)r(x,0,1,360,'#e3e5cf');
 if(greenhouse){r(0,0,640,14,'#608e78');r(0,14,15,346,'#87ac8a');r(625,14,15,346,'#87ac8a');for(let x=20;x<640;x+=100)r(x,14,3,64,'#87ac8a');r(0,350,640,10,'#8c6c46');}const plant=(x,y)=>{r(x,y-35,4,38,'#438246');r(x-16,y-29,18,9,'#61a751');r(x+3,y-41,17,12,'#398f4d');for(let j=0;j<4;j++)r(x-9+j*7,y,2,30,'#f9db9e')};
 const flow=(points,t,color='#d8ffff')=>{const lengths=points.slice(1).map((p,i)=>Math.hypot(p[0]-points[i][0],p[1]-points[i][1]));const total=lengths.reduce((a,b)=>a+b,0);for(let n=0;n<12;n++){let d=(t*45+n*total/12)%total;for(let i=0;i<lengths.length;i++){if(d<=lengths[i]){const f=d/lengths[i];r(points[i][0]+(points[i+1][0]-points[i][0])*f,points[i][1]+(points[i+1][1]-points[i][1])*f,4,4,color);break}d-=lengths[i]}}};
 if(type==='aqua'){
 r(140,210,350,110,'#48796f');r(148,220,334,92,'#68b9cd');r(240,80,270,65,'#537d6c');r(247,90,256,48,'#8cbdc2');[285,365,445].forEach(x=>plant(x,91));
 r(90,145,95,42,'#c1a378');for(let i=0;i<20;i++)r(97+i%8*10,153+Math.floor(i/8)*10,4,4,'#9a7941');
 r(169,270,24,24,'#35536c');r(113,180,10,100,'#528e9b');r(113,270,60,10,'#528e9b');r(113,110,10,35,'#528e9b');r(113,110,130,10,'#528e9b');r(500,140,10,145,'#528e9b');r(479,277,30,10,'#528e9b');
 flow([[180,275],[118,275],[118,165]],time,'#d3a663');flow([[118,165],[118,115],[250,115],[500,115],[505,282],[480,282]],time,'#deffff');
 for(let n=0;n<3;n++){const x=250+Math.sin(time*.6+n*2)*60,y=245+n*21;r(x,y,24,10,'#eab253');r(x+24,y+2,8,6,'#dc8a43');r(x+3,y+2,2,2,'#283c44')}
 text('Ammonia → nitrit → nitrat',55,139);text('Air bernutrien → akar → air kembali ke tangki',160,342);
 }else{
 // Fixed reservoir, medium and overflow. Three removable functional parts.
 r(180,130,280,190,'#638c7b');r(188,138,264,174,'#e6e4cd');r(190,247,260,62,'#6db9ce');r(205,140,230,74,'#a27c50');r(205,208,230,8,'#729a75');
 plant(320,139);r(450,242,25,8,'#5f8d9c');r(475,244,13,4,'#6db9ce');text('Lubang limpah air',470,236);
 text('Ruang medium',255,172);text('Ruang air',285,299);
 if(installed.includes('capillary')){r(302,208,36,67,'#b5a470');for(let i=0;i<15;i++)r(307+i%3*10,213+Math.floor(i/3)*12,5,5,'#e5cf92');if(time>0){flow([[318,270],[318,214],[318,183],[320,150]],time,'#c1f9ff');r(210,190,220,14,'#6b9a8b60')}}
 if(installed.includes('level')){r(183,93,7,199,'#e7d7a0');r(183,232,7,18,'#efaa48');text('Aras air',135,90)}
 if(installed.includes('inlet')){r(444,103,12,194,'#85a9ac');r(447,107,5,187,'#dceced')}
 text('Ruang partikel kapilari',249,231);text('Air → bahan kapilari → medium → akar',170,344);
 }
}


/* Educational animations: four distinct systems, synchronised with a readable guide.
   These symbols illustrate the direction of water/nutrient movement; they are not to scale. */
export const learningStages=[
 [
  ['Larutan statik','Larutan nutrien disimpan dalam takungan, tanpa pam kitaran.'],
  ['Akar menyerap','Akar yang bersentuhan dengan larutan mengambil air dan nutrien.'],
  ['Tiada aliran kembali','Tiada salur air keluar untuk mengitar larutan. Pantau aras dan keadaan larutan.']
 ],
 [
  ['Pam mengalirkan larutan','Pam menolak larutan dari tangki nutrien ke palung tanaman.'],
  ['Akar mendapat nutrien','Akar tanaman bersentuhan dengan larutan di dalam palung.'],
  ['Larutan kembali','Larutan mengalir melalui salur keluar ke tangki untuk dikitar semula.']
 ],
 [
  ['Bahan buangan ikan','Ikan menghasilkan bahan buangan yang menyumbang ammonia kepada air.'],
  ['Mikroorganisma nitrifikasi','Mikroorganisma bermanfaat menukarkan ammonia kepada nitrit, kemudian nitrat.'],
  ['Akar menyerap nitrat','Tanaman menggunakan nitrat sebagai nutrien; air kemudian kembali ke tangki ikan.']
 ],
 [
  ['Takungan air','Air disimpan di ruang air di bawah medium tanaman.'],
  ['Sentuhan bahan kapilari','Bahagian bawah bahan kapilari mesti menyentuh air dalam takungan.'],
  ['Air naik ke medium','Tindakan kapilari mengalirkan air melalui bahan penyerap ke medium.'],
  ['Akar menyerap air','Akar menyerap air daripada medium tanpa memerlukan pam.']
 ]
];
export function stageIndex(system,time){
 const steps=learningStages[system]||[];
 return steps.length?Math.floor(Math.max(0,Number.isFinite(time)?time:0)/3)%steps.length:0;
}
export function drawFlowOverlay(canvas,system,time){
 const c=canvas.getContext('2d'),step=stageIndex(system,time);
 const dot=(x,y,colour,size=7)=>{c.fillStyle='#194744';c.fillRect(Math.round(x)-1,Math.round(y)-1,size+2,size+2);c.fillStyle=colour;c.fillRect(Math.round(x),Math.round(y),size,size)};
 const moving=(points,colour,speed=55,count=10)=>{
  const lens=points.slice(1).map((p,i)=>Math.hypot(p[0]-points[i][0],p[1]-points[i][1]));
  const total=lens.reduce((a,b)=>a+b,0);if(!total)return;
  for(let n=0;n<count;n++){let d=((Math.max(0,time)*speed+n*total/count)%total+total)%total;
   for(let i=0;i<lens.length;i++){if(d<=lens[i]){const u=lens[i]?d/lens[i]:0;dot(points[i][0]+(points[i+1][0]-points[i][0])*u,points[i][1]+(points[i+1][1]-points[i][1])*u,colour,4);break}d-=lens[i]}}
 };
 if(system===0){
  // Static deep-water culture: particles stay in the reservoir; uptake goes into roots, not round a loop.
  for(let n=0;n<8;n++)dot(170+n*41,253+Math.sin(time*.7+n)*3,'#ecf9b0',3);
  if(step===1){for(let x of [210,320,430])moving([[x,250],[x,210],[x,181]],'#e9fb9a',22,3)}
 }else if(system===1){
  // Circulating deep-water culture, exactly follows the existing pump–inlet–trough–return route.
  moving([[250,286],[119,286],[119,127],[166,127],[174,160],[486,160],[486,264],[450,264],[250,286]],'#ffe48c',50,13);
 }else if(system===2){
  // Aquaponics: distinguish waste -> nitrification -> root uptake, without suggesting plants eat ammonia.
  if(step===0)moving([[265,260],[194,260],[180,188],[130,188]],'#f2b861',35,8);
  if(step===1){
   for(let n=0;n<5;n++){dot(126+n*13,164+Math.sin(time*2+n)*6,n%2?'#f7de88':'#95dd87',5)}
  }
  if(step===2)moving([[190,115],[250,115],[350,112],[455,112]],'#a5e58d',45,8);
 }else if(system===3){
  // Self-watering system: reservoir -> wick -> medium -> roots, NO pump or return circulation.
  moving([[320,280],[320,247],[320,215],[320,185],[320,150]],'#f5ffad',25,7);
 }
 // Small stage counter on the upper right; the full explanation stays in the separate task rail.
 const label=(step+1)+'/'+learningStages[system].length;
 c.fillStyle='#173d34d9';c.fillRect(557,12,69,27);
 c.fillStyle='#f9f1c7';c.font='bold 15px sans-serif';c.fillText(label,573,30);
}
