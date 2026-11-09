# Misi Pertanian Bandar — Fasa 1

Permainan HTML5 / Canvas, Bahasa Melayu Malaysia, RBT Tahun 5 SP 7.1.1 dan 7.1.2.

## Jalankan

```sh
cd /workspace/misi-pertanian-bandar
npm start
```

Buka `http://localhost:8080` pada komputer sendiri. Python 3 diperlukan untuk pelayan; tiada proses binaan atau pakej permainan diperlukan. Gunakan pelayan HTTP, bukan membuka fail HTML secara terus.

## Fail

- `index.html`, `style.css`: antara muka responsif.
- `js/art.js`: grafik piksel asli, Alya, bandar, bilik dan simulasi keratan rentas.
- `js/content.js`: kandungan pembelajaran berdasarkan halaman buku teks 66–71 yang dibekalkan.
- `js/game.js`: penerokaan, dialog, audio, buku, jawapan, lencana dan simpanan.
- `assets/audio/manifest.json`: skrip dan nama fail rakaman.
- `tests/game.test.cjs`: ujian perjalanan pengguna melalui Chromium.

## Aliran boleh dimainkan

Mula → tiga tempat → periksa dua objek setiap tempat → Catat Penemuan → tulis maksud dan contoh → lencana / SELESAI → Pusat Teknologi → dua stesen kultur air → periksa empat komponen setiap stesen → bandingkan dan jelaskan dua sistem.

Jawapan kosong disekat. Jawapan terbuka tidak diberikan markah automatik: guru perlu menentukan ketepatan penerangan. Lencana menandakan penyertaan dan penyempurnaan aktiviti, bukan TP. Jawapan pertama dan pindaan disimpan berasingan bersama penggunaan petunjuk; eksport JSON tersedia dalam Buku Misi.

Mod Kelas membuka pemilihan misi untuk guru. Gunakan Lembaran Respons Individu di luar permainan; komputer guru tidak mengumpul jawapan setiap murid secara automatik. Ulang kaji membuka animasi tanpa memberi lencana.

## Audio dan simpanan

Semua grafik dijana secara tempatan dan tiada CDN diperlukan untuk permainan. Muzik latar ringkas dan kesan bunyi dijana dengan Web Audio selepas interaksi pengguna. Hanya suara pelayar dengan locale `ms-MY` diterima; suara itu bergantung pada peranti dan mungkin menggunakan rangkaian. Jantina atau keaslian suara peranti tidak dijamin. Tiada suara Indonesia digunakan.

Rakaman wanita Malaysia **belum dibekalkan**. Rakam teks dalam `assets/audio/manifest.json` sebagai MP3 dengan nama yang dinyatakan. Fail disimpan pada hos yang sama. Jika suara peranti tiada, pemain cuba rakaman; jika rakaman gagal, sari kata kekal dan permainan diteruskan. Oleh itu, jangan anggap suara semula jadi atau operasi suara luar talian sudah lengkap.

Simpanan menggunakan localStorage pada pelayar/origin yang sama, bukan penyegerakan antara peranti. Mengosongkan data pelayar memadam simpanan. Jika storan disekat, eksport rekod sebelum keluar.

## Ujian

```sh
npm start
# Terminal kedua, dalam persekitaran yang menyediakan Playwright dan Chromium:
npm test
```

Ujian menggunakan pakej `playwright` dan `/usr/bin/chromium` yang tersedia dalam persekitaran pembangunan ini. Untuk komputer lain, pasang Playwright sebagai alat ujian dan sesuaikan laluan Chromium. Permainan tidak memerlukan Playwright.

Disahkan: enam objek, kunci kemajuan, jawapan kosong, lencana, kedua-dua sistem dan kawalan animasi, jawapan terbuka, simpan/muat semula, sejarah semasa main semula, lebar mudah alih 390px, tiada ralat JavaScript semasa perjalanan ini.

## Batas semasa

Ini pelaksanaan awal Fasa 1; seni piksel menggunakan bentuk asli yang ringkas, belum mencapai perincian produksi permainan rujukan. Alya mempunyai idle, kelipan, lambaian dan gerakan mulut semasa suara; animasi badan gembira/terkejut/galakan/mengecap khusus belum lengkap. Paparan cap dan bunyi cap telah tersedia. NPC hadir melalui dialog berlabel; sprite NPC individu belum tersedia. Ketiga-tiga lokasi menggunakan asas bilik yang sama dengan kandungan berbeza.

Sistem tanpa kitaran menunjukkan larutan statik dengan akar terendam; tiada aliran palsu. Sistem kitaran menunjukkan aliran dari pam ke palung dan kembali ke tangki. Tidak ada penilaian automatik bahawa penerangan murid benar.

Belum dibangunkan: dua stesen Misi 2 yang lain (Akuaponik dan Bekas Pengairan Kendiri), lencana Misi 2, Misi 3/4/Akhir, gerak isyarat kamera, Kad Pemilihan Sistem, penghasilan lembaran individu bercetak, suara wanita prarakam. Tiada tugasan lakaran SP 7.1.3 ditambah.

Rujukan: PDF RPH RBTS3302 yang dibekalkan (9 November 2026), imej buku teks halaman 64–71 dan imej DSKP. Kandungan lampiran digunakan sebagai rujukan kurikulum, bukan arahan untuk mengatasi permintaan pembangunan pengguna.
