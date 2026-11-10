# Phase 4 — Peranti Sebenar & Semakan Bilik Darjah (Sebelum Terbit)

**Skop:** RBT Tahun 5, SP 7.1.1 / SP 7.1.2, permainan 16:9, 5 misi. C (Alya Voice/Dialogue) dikekalkan dalam kemas kini ini.

## Ujian perangkat sebenar (belum dilaksanakan oleh CI)
- [ ] Windows + Chrome/Edge: buka fail HTML tempatan; bunyi boleh dikawal, gerak peta, lima misi dan buku misi berfungsi.
- [ ] Android + Chrome: potret/landskap; ketuk setiap hotspot dan butang Misi 3; pastikan tiada objek melindungi label.
- [ ] iPhone + Safari: potret/landskap; ulang ujian sentuh dan ruang selamat (notch).
- [ ] iPad/tablet + Safari/Chrome: landscape kelas dan portrait individu; semak kedudukan panel kamera, teks dan dialog.
- [ ] Skrin projektor 16:9: semak butang, subtitle, papan ilmu dan akses tanpa sentuhan.
- [ ] Rangkaian: `Periksa Peranti & Kamera`; beri izin kamera pada laman HTTPS / localhost; model MediaPipe mesti berjaya dimuatkan.
- [ ] Uji cubit dengan kedua-dua tangan berasingan, alih komponen ke A/B/C, lepaskan dan batalkan; uji kehilangan tangan beberapa bingkai.
- [ ] Kamera ditutup apabila tab tersembunyi / pengguna keluar Misi 3; butang tetikus / sentuhan masih boleh digunakan.
- [ ] Semak pilihan suara pada Chrome dan Safari; senarai Google id-ID mungkin tiada dan mestilah tidak ditipu.
- [ ] Internet terputus: teks, peta, penilaian, dan MIDI asli berjalan dari HTML; **kawalan tangan memerlukan CDN/model dalam sambungan selamat**.

## Ujian kemajuan F / bukti E
- [ ] Mod Kendiri: jawab Misi 1–5 dalam turutan; tidak boleh melangkau sekatan.
- [ ] Mod Kelas: pratonton tanpa pemberian lencana palsu atau markah PBD murid.
- [ ] Uji jawapan salah / drop salah / batal seret; gunakan retry.
- [ ] Tutup tab, buka semula pelayar sama; semak rekod jawapan, lencana dan draf.
- [ ] `Buku Misi → Panduan PdP`: semak objektif SP, glosari dan jumlah jadual 60 minit.
- [ ] Guru: simpan nama, skor 1–3, semakan pemerhatian; cetak laporan dan eksport CSV.
- [ ] Eksport sandaran kedua-dua mod sebelum `Mula Baharu`; import sandaran dengan pengesahan, semak rekod semula.
- [ ] Cuba import fail rosak / bukan JSON: maklumat lama tidak ditulis ganti.
- [ ] Bukti PBD ialah pertimbangan guru; **lencana bukan TP DSKP**.

## Panduan PdP (60 minit)
| Fasa | Minit | Bukti utama |
|---|---:|---|
| Set Induksi | 5 | Pengenalan ruang bandar |
| Misi 1 | 8 | Maksud pertanian bandar + contoh (SP 7.1.1) |
| Misi 2 | 14 | Jenis dan komponen sistem takungan (SP 7.1.2) |
| Misi 3 | 10 | Komponen pengairan kendiri dan tindakan kapilari |
| Misi 4 | 8 | Punca gangguan pam atau kapilari |
| Misi 5 | 10 | Jelaskan dua sistem dan beri alasan |
| Penutup | 5 | Rumusan, semakan jawapan dan tindakan susulan |

**Nota:** GitHub Actions menguji logik/Chromium secara automatik; ia tidak boleh menggantikan pengalaman murid dan ujian kamera sebenar pada peranti mereka. PR ini sebaiknya kekal Draft sehingga pemeriksaan di atas dibuat.
