export const definition='Pertanian bandar ialah aktiviti bercucuk tanam di kawasan bandar dengan memanfaatkan ruang yang ada, seperti balkoni, halaman rumah, tanah lot dan kebun komuniti, untuk menghasilkan tanaman makanan. Penanaman boleh dijalankan secara konvensional atau menggunakan teknologi moden.';
export const places=[
{id:'pangsa',name:'Rumah Pangsa',npc:'Kak Mira',topic:'Balkoni yang menghijau',text:'Saya menanam sawi dalam pasu di balkoni. Ruang kecil pun boleh menghasilkan makanan sendiri. Pilih bekas tanaman di balkoni untuk melihat tanaman kami.',items:[['Pasu sawi','Sawi ditanam dalam pasu berisi tanah. Ini contoh kaedah konvensional yang sesuai untuk ruang terhad.'],['Botol guna semula','Botol terpakai yang sesuai boleh dijadikan bekas tanaman. Penggunaan semula bahan membantu memelihara alam sekitar.']]},
{id:'teres',name:'Rumah Teres',npc:'Pak Azman',topic:'Kebun tumbuh ke atas',text:'Halaman saya sempit. Saya menyusun tanaman secara bertingkat pada dinding dan menggantung pasu. Mari periksa kedua-dua susunan itu.',items:[['Rak bertingkat','Susunan bertingkat dan menegak menjimatkan ruang. Sayur dan herba boleh ditanam di sekitar rumah.'],['Pasu gantung','Pasu gantung menggunakan ruang yang ada secara kreatif. Susunan yang kemas mencantikkan kawasan rumah.']]},
{id:'kebun',name:'Kebun Komuniti',npc:'Mak Cik Siti',topic:'Sedikit ruang, banyak manfaat',text:'Kami bekerjasama menanam sayur di kawasan tanah lot dalam bandar. Ada batas tanah dan sistem moden. Mari lihat hasil kebun komuniti.',items:[['Batas sayur','Penanaman di atas batas ialah kaedah konvensional. Hasil tanaman menjadi makanan sendiri dan boleh dijual untuk pendapatan sampingan.'],['Sudut kompos & takungan','Sisa dapur yang sesuai boleh dijadikan baja kompos. Hidroponik ialah contoh teknologi moden: akar mendapat nutrien daripada larutan nutrien tanpa menggunakan tanah.']]}
];
export const systems=[{name:'Kultur Air Dalam (Tanpa Kitaran Semula)',text:'Larutan nutrien berada dalam takungan dalam keadaan statik, tidak dikitar semula. Akar terendam dalam larutan untuk menyerap nutrien. Tiada pam untuk mengitar larutan nutrien.',parts:[['Akar tanaman','Akar terendam dalam larutan nutrien dan menyerap air serta nutrien.'],['Raga tanaman','Raga memegang pokok yang ditanam.'],['Penutup takung','Penutup memegang raga tanaman dan mengelakkan larutan nutrien terdedah kepada cahaya matahari.'],['Larutan nutrien','Larutan disimpan dalam takungan. Larutan tidak dipam atau dikitar semula.']]},{name:'Kultur Air Dalam (Dengan Kitaran Semula)',text:'Pam menolak larutan nutrien dari tangki melalui salur air masuk ke palung tanaman. Larutan kemudian mengalir melalui salur air keluar kembali ke tangki nutrien. Kitaran ini membekalkan air dan nutrien kepada akar.',parts:[['Pam','Pam menolak larutan nutrien dari tangki ke palung tanaman.'],['Salur air masuk','Salur ini membawa larutan nutrien yang dipam ke palung tanaman.'],['Palung & akar','Raga memegang tanaman. Akar bersentuhan dengan larutan nutrien di dalam palung.'],['Salur air keluar','Larutan mengalir kembali dari palung ke tangki nutrien untuk dikitar semula.']]}];
systems.push({name:'Akuaponik',text:'Akuaponik menggabungkan ternakan ikan dengan tanaman. Bahan buangan ikan diuraikan; mikroorganisma menukarkan ammonia kepada nitrit dan kemudian nitrat yang boleh diserap tanaman. Pam membawa air bernutrien ke tanaman dan air kembali ke tangki ikan.',parts:[['Tangki ikan','Ikan menghasilkan bahan buangan. Air tangki membawa bahan ini ke bahagian penapisan dan mikroorganisma.'],['Mikroorganisma','Mikroorganisma bermanfaat menukar ammonia kepada nitrit, kemudian nitrat, iaitu nutrien yang boleh diserap oleh akar.'],['Pam akuaponik','Pam mengalirkan air dari tangki melalui bahagian mikroorganisma ke tanaman.'],['Akar & salur kembali','Akar menyerap nutrien. Air mengalir kembali ke tangki ikan; ikan, mikroorganisma dan tanaman saling berkaitan.']]},
{name:'Bekas Pengairan Kendiri',text:'Air dari ruang air naik melalui bahan penyerap dalam ruang partikel kapilari ke medium tanaman melalui tindakan kapilari. Akar menyerap air daripada medium. Sistem ini tidak memerlukan pam.',parts:[['Penanda aras air','Menunjukkan aras air dalam takungan supaya kita tahu bila air perlu ditambah.'],['Saluran air','Laluan mengisi air ke dalam takungan di bahagian bawah.'],['Ruang medium','Ruang medium tanaman menyokong akar dan menerima air daripada bahan kapilari.'],['Ruang partikel kapilari','Bahan penyerap yang bersentuhan dengan air membawa air ke medium melalui tindakan kapilari.'],['Ruang air','Takungan menyimpan bekalan air di bahagian bawah bekas.'],['Lubang limpah air','Air berlebihan keluar melalui lubang ini supaya aras air tidak meningkat sehingga membanjiri ruang medium.']]});

/* RPH Lampiran 2 & 3: these are TEACHER-AWARDED activity marks, NOT official DSKP TP.
   Keep all five observations; class-mode discussion is not individual PBD evidence. */
export const pbdChecklist=[
 'Murid menerangkan maksud pertanian bandar dengan tepat.',
 'Murid memberikan sekurang-kurangnya satu contoh pertanian bandar yang sesuai.',
 'Murid menerangkan fungsi komponen utama bagi sistem penanaman.',
 'Murid menjelaskan cara air/larutan nutrien dibekalkan dalam dua sistem.',
 'Murid menggunakan maklumat pemerhatian untuk menjelaskan punca gangguan sistem.'
];
export const pbdRubric=[
 {sp:'7.1.1',title:'Maksud pertanian bandar',levels:[
  'Belum dapat menerangkan maksud dengan tepat atau contoh tidak sesuai.',
  'Menerangkan sebahagian konsep dengan contoh sesuai tetapi penerangan belum lengkap.',
  'Menerangkan konsep bercucuk tanam di kawasan bandar/ruang terhad dengan jelas dan memberikan contoh sesuai.'
 ]},
 {sp:'7.1.2',title:'Cara sistem berfungsi',levels:[
  'Belum dapat menjelaskan operasi dua sistem dengan tepat walaupun selepas bimbingan.',
  'Menjelaskan dua sistem tetapi ada komponen atau langkah aliran yang belum lengkap/sedikit tidak tepat.',
  'Menjelaskan dua sistem, komponen berkaitan dan aliran air/nutrien dengan tepat dan jelas.'
 ]}
];
