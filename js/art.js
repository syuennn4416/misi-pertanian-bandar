const colors={grass:'#9dbd75',dark:'#335e48',leaf:'#54885a'};
export function renderer(canvas){const c=canvas.getContext('2d');c.imageSmoothingEnabled=false;const rect=(x,y,w,h,col)=>{c.fillStyle=col;c.fillRect(Math.round(x),Math.round(y),w,h)};const poly=(pts,col)=>{c.fillStyle=col;c.beginPath();pts.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fill()};
function tree(x,y,s=1){c.save();c.translate(x,y);c.scale(s,s);rect(-13,9,34,8,'#12974f');rect(-3,-4,7,23,'#8d5137');rect(-17,-26,33,27,'#22583d');rect(-23,-20,42,16,'#078c47');rect(-15,-32,26,26,'#20ad50');rect(-12,-29,14,5,'#68c651');rect(5,-16,9,4,'#a0d65c');c.restore()}
function plant(x,y,s=1){c.save();c.translate(x,y);c.scale(s,s);rect(-7,0,15,5,'#aa6d4c');rect(-5,5,11,9,'#c88961');rect(-3,6,3,6,'#e5a47b');rect(0,-12,2,14,'#396a48');rect(-7,-10,7,5,'#578c53');rect(2,-16,7,7,'#5d9957');rect(-5,-17,5,5,'#83ad64');c.restore()}
function house(x,y,w,h,col,roof){rect(x+6,y+h+5,w+13,9,'#12974f');rect(x-2,y-2,w+4,h+4,'#654232');rect(x,y,w,h,col);for(let z=6;z<h;z+=9)rect(x,y+z,w,1,'#95644140');rect(x+w,y-7,13,h+7,'#ac7b53');poly([[x-7,y],[x+12,y-30],[x+w+8,y-30],[x+w+17,y]],roof);rect(x-7,y,w+24,5,'#533d32');for(let k=12;k<w;k+=13)rect(x+k,y-22,2,22,'#243d4935');for(let z=0;z<3;z++)rect(x+7,y-24+z*8,w,2,'#ffffff20');for(let i=12;i<w-10;i+=27){rect(x+i,y+14,17,23,'#f3e5bb');rect(x+i+3,y+17,11,15,'#719b9c');rect(x+i+8,y+17,2,15,'#d1e4cf');rect(x+i,y+34,18,3,'#86745b')}rect(x+w/2-8,y+h-27,16,27,'#795e49');rect(x+w/2+3,y+h-14,2,2,'#e6cc7e')}
function alya(x,y,t,scale=1,pose='idle'){
c.save();c.translate(x,y+Math.sin(t*2.5)*.45);c.scale(scale,scale);
// Original pixel reconstruction of the user's latest character reference.
const palette={h:'#271b19',H:'#51332d',b:'#75483d',l:'#a56d59',s:'#f5c99a',r:'#ef8d81',y:'#f5cc56',Y:'#ad7832',d:'#243958',B:'#385cab',u:'#6687df',v:'#94a5ef',p:'#663297',P:'#302344',g:'#208b3b',w:'#fff8de',f:'#dceacb',o:'#f4b948'};
const rows=[
'        hhhh        ',
'      hhbbbbhh      ',
'     hHbbbllbbHh     ',
'    hHbbllllbbHHh    ',
'    hbbllllbbbHHh    ',
'   fffbllbbbbbbHHh   ',
'   fofbbbbbbllbHHh   ',
'   fffHHhsshhllHHh   ',
'    HHswgssgwsHHh   ',
'    HHswgssgwsHHh   ',
'    HsrrssssrrsHh   ',
'     HssssssssHHh   ',
'      HHssssHHbHh   ',
'     YYBrrssBYYHh   ',
'     YyBssssByYbHh  ',
'    YyyByyyyByyHlh  ',
'    YyyuyyyyuyyHbh  ',
'    ssyuyyyyuyyHh   ',
'    ssyBuuuuByss    ',
'    ssduuvvuudss    ',
'   rssduuuuuudssr   ',
'   sssduuuuuudsss   ',
'    rrduuduudrr     ',
'      duuduud       ',
'      duuduud       ',
'      duPduud       ',
'      dpPdpPd       ',
'      dpPdpPd       ',
'     PppPPppPP      ',
'     PPP  PPPP      '];
rect(-9,13,19,3,'#153e4530');
rows.forEach((row,j)=>[...row].forEach((pixel,i)=>{if(palette[pixel])rect(i-10,j-16,1,1,palette[pixel])}));
if(Math.floor(t*2)%11===0){rect(-3,-8,2,2,palette.s);rect(1,-8,2,2,palette.s);rect(-3,-7,2,1,palette.h);rect(1,-7,2,1,palette.h)}
rect(-1,-4,2,pose==='talk'&&Math.floor(t*5)%2?2:1,pose==='talk'?'#9d4d42':'#d98070');
if(pose==='wave'){rect(-7,0,2,5,palette.y);rect(-9,-3,2,6,palette.s);rect(-9,-4,3,2,palette.s)}
c.restore()}
function city(t){rect(0,0,640,360,'#68bfd0');for(let i=0;i<12;i++){let x=i*61;rect(x,12+(i%3)*10,48,65,'#458ca2');for(let j=0;j<4;j++)rect(x+8+j*9,30,4,12,'#a4d4ca')}rect(0,80,640,280,'#16bd60');rect(0,202,640,43,'#efb34f');rect(290,100,43,260,'#efb34f');rect(0,205,640,3,'#f9cb70');rect(294,100,3,260,'#f9cb70');for(let i=0;i<125;i++){let x=(i*173)%640,y=90+(i*97)%270;if((y<198||y>248)&&(x<285||x>336)){rect(x,y,3,2,i%4?'#0eac57':'#e9d496');if(i%7===0)rect(x+2,y-2,2,3,'#f6e6ab')}}house(70,115,100,70,'#d6ad76','#377dab');for(let i=0;i<3;i++){rect(77+i*29,146,23,3,'#8b8a67');plant(87+i*29,138,.6)}house(375,135,91,55,'#e8bd79','#258e94');house(480,138,72,52,'#c79570','#b64f39');house(395,282,133,62,'#e5bb77','#3a80ad');rect(410,280,103,19,'#a3d6d0');rect(460,276,3,25,'#f6edc8');for(let row=0;row<3;row++){rect(75,273+row*22,125,16,'#945431');for(let k=0;k<7;k++)plant(85+k*17,272+row*22,.6)}for(const [x,y,s] of [[35,130,1.4],[220,142,1.2],[590,170,1.5],[238,304,1],[30,321,1.3],[567,313,1.3],[347,85,.8],[180,85,.8]])tree(x,y,s);for(let x=30;x<640;x+=120){rect(x,231,14,3,'#bfac88')}alya(312,222,t,1.1,'wave');rect(265,257,25,6,'#957956');rect(268,263,3,10,'#795e48');rect(284,263,3,10,'#795e48');for(let i=0;i<5;i++){let x=(t*9+i*133)%640;rect(x,65+Math.sin(t+i)*4,3,2,'#fff4c9')}}
function interior(id,t){rect(0,0,640,360,'#e8b76d');rect(0,0,640,225,'#f0e5c2');for(let x=0;x<640;x+=32)rect(x,225,1,135,'#c28a4c');for(let y=240;y<360;y+=24)rect(0,y,640,1,'#c28a4c');rect(45,35,240,145,'#81aaa1');rect(52,42,226,130,'#b6d7be');for(let i=0;i<5;i++)house(60+i*44,110,33,60,'#a7c2ae','#86aa9d');rect(160,40,7,140,'#f9f0cf');rect(45,120,240,6,'#f9f0cf');rect(0,213,640,10,'#8d9570');if(id==='lab'){rect(340,40,220,100,'#567b65');rect(350,50,200,80,'#74967b');rect(80,235,185,30,'#b2956b');rect(360,235,185,30,'#b2956b');for(let x of [100,380]){rect(x,180,140,54,'#709e9b');rect(x+4,190,132,40,'#8fcbd1');for(let a=0;a<3;a++)plant(x+25+a*40,179,1)}}else{for(let j=0;j<2;j++){rect(350,135+j*70,200,8,'#9d7955');for(let i=0;i<4;i++)plant(375+i*48,113+j*70,1.7)}rect(70,250,180,30,'#a88a62');for(let i=0;i<4;i++)plant(94+i*43,228,1.8)}alya(310,300,t,2,'talk');tree(585,290,1.7)}
function simulation(id,t){rect(0,0,640,360,'#f3edd5');for(let x=0;x<640;x+=20)rect(x,0,1,360,'#e7e3ca');for(let y=0;y<360;y+=20)rect(0,y,640,1,'#e7e3ca');if(id===0){rect(135,150,370,155,'#628d85');rect(144,161,352,135,'#bfded6');rect(144,192,352,104,'#6ebacb');rect(128,148,384,10,'#57786b');for(let x of [210,320,430]){plant(x,132,1.8);rect(x-15,148,30,24,'#96775b');for(let k=0;k<5;k++){rect(x-10+k*5,172,2,40+k%2*16,'#f2e1ad');rect(x-9+k*5,198+k%2*16,8,2,'#f2e1ad')}}}else{rect(160,130,340,58,'#628c83');rect(168,139,324,41,'#73bace');rect(215,252,250,63,'#61887f');rect(223,260,234,48,'#70b8ca');rect(240,280,32,24,'#496e68');rect(112,120,14,172,'#7caaa4');rect(112,120,57,14,'#7caaa4');rect(112,280,140,12,'#7caaa4');rect(480,180,13,90,'#7caaa4');rect(450,258,43,12,'#7caaa4');for(let x of [225,330,435]){plant(x,115,1.7);rect(x-13,130,26,18,'#947355');for(let k=0;k<4;k++)rect(x-8+k*5,148,2,22,'#eee0b0')}const pts=[[250,286],[119,286],[119,127],[166,127],[174,160],[486,160],[486,264],[450,264],[250,286]];let lens=[],total=0;for(let i=1;i<pts.length;i++){let d=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);lens.push(d);total+=d}for(let n=0;n<15;n++){let d=(t*55+n*total/15)%total;for(let i=0;i<lens.length;i++){if(d<lens[i]){let a=pts[i],b=pts[i+1],f=d/lens[i];rect(a[0]+(b[0]-a[0])*f-2,a[1]+(b[1]-a[1])*f-2,5,5,'#e4ffff');break}d-=lens[i]}}}c.fillStyle='#41624e';c.font='12px sans-serif';c.fillText(id?'Pam → palung tanaman → tangki nutrien':'Larutan statik • akar menyerap air dan nutrien',165,335)}
return {draw(scene,t){if(scene==='home'||scene==='map')city(t);else if(scene.startsWith('sim'))simulation(Number(scene.at(-1)),t);else interior(scene,t)},alya,clear(){c.clearRect(0,0,canvas.width,canvas.height)}}}
