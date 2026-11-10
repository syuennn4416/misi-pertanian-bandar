export const repairCases=[{
 name:'Kes 1 — Pam Tidak Dihidupkan',question:'Mengapakah larutan nutrien tidak dapat mengalir dalam sistem ini?',
 clues:[['Pam','Suis pam berada pada kedudukan MATI. Pam tidak menolak larutan nutrien.'],['Tangki nutrien','Tangki masih mengandungi larutan nutrien. Kekurangan larutan bukan punca masalah ini.'],['Salur air masuk','Salur tersambung, tetapi tiada aliran dipam ke atas.'],['Palung tanaman','Akar tidak menerima bekalan larutan yang beredar dari tangki.'],['Salur air keluar','Salur kembali tersambung ke tangki. Kitaran terhenti apabila pam mati.']],
 causes:['Tangki kosong','Pam tidak dihidupkan','Penutup takung berwarna gelap'],correct:1,
 hint:'Periksa suis pam. Tangki masih mempunyai larutan, tetapi apakah yang menolak larutan ke atas?',
 repair:'Hidupkan Pam',explain:'Jelaskan fungsi pam dalam sistem Kultur Air Dalam (Dengan Kitaran Semula).',
 note:'Pam menolak larutan nutrien dari tangki melalui salur air masuk ke palung tanaman. Larutan kembali melalui salur air keluar ke tangki. Tanpa pam hidup, kitaran tidak berjalan.'
},{name:'Kes 2 — Bahan Kapilari Tidak Bersentuhan dengan Air',question:'Air masih terdapat di dalam takungan. Mengapakah medium tanaman tidak menerima air?',
 clues:[['Penanda aras air','Penanda menunjukkan air masih ada di bawah bekas.'],['Ruang air','Bekalan air belum habis. Perhatikan jarak antara air dan bahan kapilari.'],['Bahan kapilari','Hujung bahan kapilari terangkat dan tidak menyentuh air. Terdapat ruang udara di antaranya.'],['Ruang medium','Medium kering kerana bahan kapilari tidak dapat menyerap air daripada takungan.']],
 causes:['Sistem ini memerlukan pam','Bahan kapilari tidak menyentuh air','Semua air sudah habis'],correct:1,
 hint:'Air masih ada. Adakah bahan penyerap benar-benar bersentuhan dengan permukaan air?',
 repair:'Turunkan Bahan Kapilari ke Dalam Air',explain:'Bagaimanakah air bergerak dari takungan ke medium tanaman?',
 note:'Bahan kapilari mesti bersentuhan dengan air. Tindakan kapilari membawa air dari ruang air melalui bahan penyerap ke medium tanaman dan akar, tanpa menggunakan pam.'
}];
export const finalPrompts=[
 'Terangkan maksud pertanian bandar dan berikan satu contoh yang sesuai.',
 'Jelaskan cara berfungsi kedua-dua sistem penanaman ini dalam membekalkan air atau nutrien kepada tanaman. Terangkan pam dan kitaran larutan, serta bahan kapilari dan tindakan kapilari.',
 'Seorang penduduk rumah pangsa mempunyai balkoni yang kecil dan ingin menanam sayur-sayuran. Pilih satu sistem penanaman secara takungan yang sesuai dan berikan satu alasan bagi pilihan kamu.'
];
export const finalTitles=['Cabaran 1 — Apa Itu Pertanian Bandar?','Cabaran 2 — Bagaimanakah Sistem Berfungsi?','Cabaran 3 — Pilih Sistem yang Sesuai'];
