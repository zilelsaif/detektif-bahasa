# Changelog Detektif Bahasa

Dokumen ini merekodkan perubahan dari **v2.5.2** hingga binaan semasa, **v2.14.0**. v2.14.0 masih menjalani QA setempat. Kunci simpanan lama `detektif-bahasa-v1` kekal sebagai sandaran migrasi.

## Ringkasan perkembangan

| Versi | Tarikh | Fokus utama |
|---|---|---|
| v2.5.2 | 20 Oktober 2026 | Galeri potret dan pose watak |
| v2.6.0 | 20 Oktober 2026 | Audit penuh kualiti dan kandungan pendidikan |
| v2.6.1 | 25 Oktober 2026 | Penutupan Final Acceptance QA |
| v2.7.0 | 26 Oktober 2026 | Integrasi ekosistem ZilTeroka |
| v2.8.0 | 1 November 2026 | KES 021 dan permulaan Fail Kelima |
| v2.8.1 | 1 November 2026 | Corrective pass C021 |
| v2.9.0 | 2 November 2026 | KES 022 dan Padanan Objek |
| v2.10.0 | 2 November 2026 | KES 023 dan Detektif Penyunting |
| v2.10.1 | 2 November 2026 | Integrasi dan persembahan watak |
| v2.11.0 | 2 November 2026 | KES 024 dan Kanta Konteks |
| v2.11.1 | 3 November 2026 | Visual storytelling C022–C024 |
| v2.12.0 | 4 November 2026 | KES 025 dan finale Fail Kelima |
| v2.12.1 | 4 November 2026 | Emblem pencapaian premium A28–A33 |
| v2.13.0 | 13 November 2026 | Profil Detektif berbilang pengguna setempat |
| v2.14.0 | 13 November 2026 | 12 potret premium Avatar Detektif Cilik |

---

## v2.14.0 — Avatar Detektif Cilik

**Tarikh:** 13 November 2026
**Jenis:** Visual dan profile-experience release setempat

### Ditambah

- Dua belas potret pemain WebP telus 512×512 dengan ID `detektif-01` hingga `detektif-12`.
- Kategori **Watak Detektif** dan **Simbol Klasik**, pratonton avatar serta indikator pilihan yang tidak bergantung pada warna sahaja.
- Fallback kepada simbol Lensa apabila imej potret gagal dimuatkan.

### Keserasian

- Enam ID avatar v2.13.0 kekal sah dan dipaparkan tanpa migrasi.
- Perubahan nama atau avatar hanya mengemas kini metadata profil; sampul simpanan permainan kekal byte-for-byte sama.
- Galeri menggunakan lazy loading, sementara Muka Depan hanya memuat potret profil aktif.
- Jumlah aset baharu ialah 437,896 bait (kira-kira 428 KiB).

### Dikekalkan

- 25 kes, lima Fail Kes, 125 petunjuk, 24 NPC, 33 pencapaian dan 20 Lensa Bahasa.
- 109 bintang maksimum, 9,870 XP terbaik maksimum dan semua mekanik v2.13.0.

---

## v2.13.0 — Profil Detektif

**Tarikh:** 13 November 2026  
**Jenis:** Feature release setempat

### Ditambah

- Sehingga lima profil kekal pada satu pelayar, dengan nama maksimum 16 aksara dan enam avatar bertema detektif.
- Mod Tetamu berasaskan `sessionStorage`, skrin pemilihan profil, pertukaran profil, ringkasan 25 kes, kemas kini nama/avatar, pengesahan padam dan eksport JSON.
- Kunci registri `detektif-bahasa-profiles-v1` dan kunci simpanan berasingan `detektif-bahasa-profile-v1:<id>`.
- Pengesanan konflik revisi untuk menghalang dua tab menindih profil sama secara senyap.

### Keserasian dan keselamatan

- Simpanan `detektif-bahasa-v1` disalin kepada profil `Detektif Asal` melalui migrasi dua fasa dan disahkan dengan bacaan semula.
- Kunci lama tidak dipadam atau ditulis semula selepas migrasi.
- Migrasi boleh diulang selepas gangguan tanpa menghasilkan profil pendua.
- Data profil rosak tidak ditindih secara automatik.
- Struktur dalaman snapshot permainan kekal sama; KES 001–025 dan semua rekod sedia ada diteruskan tanpa perubahan gameplay.

---

## v2.12.1 — Premium Achievement Emblems

**Tarikh:** 4 November 2026  
**Jenis:** Corrective visual release

### Diubah

- Menggantikan paparan SVG rata untuk A28–A33 dengan enam medal WebP transparen 512×512.
- Menyatukan keenam-enam medal Fail Kelima dalam keluarga visual emas antik, enamel teal/navy, laurel, permata cyan dan pencahayaan dimensional yang sepadan dengan A25–A27.
- Memberikan A32 **Penyatu Makna** hierarki visual kes utama dan A33 **Fail Kelima Lengkap** reka bentuk crest finale paling berprestij.
- Mengemas kini route aset setempat dan cache query kepada v2.12.1.

### Dikekalkan

- ID, nama, penerangan dan syarat buka A28–A33.
- Tepat 33 pencapaian, 25 kes, 125 petunjuk, 20 Lensa Bahasa, 109 bintang maksimum dan 9,870 XP maksimum.
- Rekod pemain dan kunci simpanan `detektif-bahasa-v1`.

### QA

- Menguji galeri locked/unlocked pada Chrome dan Edge dalam enam viewport.
- Mengesahkan aset unik, alpha transparency, tiada request rosak, tiada overflow dan kebolehbacaan pada 256px, 128px serta saiz galeri 82px.
- Menjalankan semula regression penuh C025, finale dan Buku Jejak Makna.

## v2.12.0 — KES 025: Misteri Peta Jejak Makna

**Tarikh:** 4 November 2026  
**Jenis:** Kandungan dan finale arc

### Ditambah

- KES 025 **Misteri Peta Jejak Makna**, grand finale Fail Kelima di Dataran Bayuraya.
- Lima sumber rasmi dan tepat lapan validasi pendidikan dalam empat Stesen Peta Makna:
  - simpulan bahasa;
  - penjodoh bilangan;
  - ejaan;
  - makna mengikut konteks.
- Papan Bukti Berpandu tiga langkah, susunan peta empat slot dan dua deduksi akhir.
- Buku Jejak Makna Bayuraya lima bahagian sebagai artifak finale.
- Ilustrasi siasatan dan resolusi bersepadu bersama Aynaa, Cikgu Farah dan Emah.
- A32 **Penyatu Makna**, A33 **Fail Kelima Lengkap** dan aktiviti Lensa Bahasa ke-20.

### Perkembangan

- Menutup Fail Kelima dengan lima kes, C021–C025.
- Menaikkan jumlah permainan kepada 25 kes, 125 petunjuk, 33 pencapaian, 20 Lensa, 109 bintang maksimum dan 9,870 XP maksimum.
- C025 menawarkan maksimum 650 XP dan lima bintang.

### Keserasian

- Save v2.11.1 dimuat tanpa migrasi kunci.
- Replay C025 menetapkan semula run C025 sahaja serta mengekalkan rekod terbaik dan semua rekod C001–C024.

## v2.11.1 — Visual Storytelling Upgrade

**Tarikh:** 3 November 2026  
**Jenis:** Visual corrective release

### Diubah

- Menggantikan visual skematik Kanta Konteks C024 dengan enam imej WebP tempatan.
- Menggunakan kapsyen neutral `Gambar A` hingga `Gambar F` sebelum pengesahan dan kapsyen deskriptif selepas jawapan disahkan.
- Menghasilkan ilustrasi resolusi bersepadu untuk KES 022, KES 023 dan KES 024, dengan watak dan lokasi berkongsi perspektif, pencahayaan dan ruang yang sama.
- Mengekalkan KES 021 tanpa penggantian kerana komposisi sedia ada telah memenuhi piawai visual.

### Dikekalkan

- Semua kandungan kes, jawapan, petunjuk, skor, bintang, save dan progression v2.11.0.

## v2.11.0 — KES 024: Misteri Dua Makna Satu Kata

**Tarikh:** 2 November 2026  
**Jenis:** Kandungan kes

### Ditambah

- KES 024 di Pameran Jelajah Bahasa, Dataran Bayuraya.
- Lima sumber premium yang boleh diperiksa dalam sebarang urutan.
- Tiga stesen **Kanta Konteks** dengan enam rekod untuk kata `bulan`, `mata` dan `kaki`.
- Pengesahan tiga lapis bagi setiap rekod: petunjuk konteks, makna dan gambar.
- Xiao Feng dan Ayyash dalam briefing, siasatan dan resolusi.
- Papan Bukti Berpandu, dua deduksi, A31 **Pentafsir Konteks** dan Lensa Bahasa ke-19.

### Ganjaran dan progression

- Maksimum 580 XP dan lima bintang.
- C024 dibuka selepas C023; C025 kekal terkunci pada release ini.

## v2.10.1 — Integrasi dan Persembahan Watak

**Tarikh:** 2 November 2026  
**Jenis:** Corrective presentation release

### Dibaiki dan dipiawaikan

- Menukar label folder kepada `FAIL KELIMA` sambil mengekalkan **Jejak Makna Bayuraya** sebagai tajuk cerita arc.
- Menghubungkan Puan Suraya, Affan, Cikgu Farah dan Mei Ling kepada aset potret rasmi dalam momen siasatan terpilih.
- Menambah susun atur editorial responsif untuk resolusi KES 022 dan KES 023.
- Memisahkan latar lokasi daripada pose rasmi watak tanpa mengubah identiti kanon.

### Dikekalkan

- Kandungan, skor, petunjuk, gameplay, progression dan save C001–C023.

## v2.10.0 — KES 023: Misteri Buku Panduan Berbelit

**Tarikh:** 2 November 2026  
**Jenis:** Kandungan kes

### Ditambah

- KES 023 di Perpustakaan Bayuraya bersama Cikgu Farah dan Mei Ling.
- Lima sumber yang boleh diperiksa dalam sebarang urutan.
- Mekanik **Detektif Penyunting** dengan enam sasaran pembetulan:
  - kata majmuk `atur cara`;
  - kata sendi nama `di`;
  - awalan pasif `di-`;
  - ejaan standard.
- Perbandingan dokumen sebelum/selepas, Papan Bukti Berpandu dan dua deduksi penerbitan.
- A30 **Detektif Penyunting** dan Lensa Bahasa ke-18.

### Ganjaran dan progression

- Maksimum 560 XP dan lima bintang.
- Fail Kelima mengandungi C021–C023; C024–C025 kekal sebagai kandungan akan datang.

## v2.9.0 — KES 022: Misteri Senarai Prop Pentas

**Tarikh:** 2 November 2026  
**Jenis:** Kandungan kes

### Ditambah

- KES 022 di ruang persiapan pentas Balai Komuniti Bayuraya bersama Puan Suraya dan Affan.
- Lima sumber pentas yang boleh diperiksa dalam sebarang urutan.
- Mekanik **Padanan Objek** untuk membetulkan lima frasa penjodoh bilangan berdasarkan bentuk, kuantiti dan kegunaan objek.
- Papan Bukti Berpandu dan dua deduksi tanpa mendedahkan jawapan sebelum sumber diperiksa.
- A29 **Penyusun Prop** dan Lensa Bahasa ke-17.

### Ganjaran dan progression

- Maksimum 540 XP dan empat bintang.
- C022 dibuka selepas C021; C023–C025 kekal sebagai kandungan akan datang.

## v2.8.1 — C021 Corrective Pass

**Tarikh:** 1 November 2026  
**Jenis:** Hotfix visual, navigasi dan bukti

### Dibaiki

- Menghapuskan punca folder/kad Fail Kelima pendua melalui satu registri arc kanonik.
- Memastikan tepat lima folder Fail Kes dan satu kad C021.
- Menggantikan prototaip latar SVG skematik dengan latar premium 1600×900.
- Memperkemas Papan Bukti kepada tiga hubungan berurutan menggunakan kad bukti.
- Menambah panduan papan tanpa penalti dan bantuan KLU berperingkat.

### Dikekalkan

- Lima petunjuk, dua Kanta Kiasan, 520 XP, empat bintang, A28 dan Lensa C021.
- Save, replay dan rekod C001–C020.

## v2.8.0 — KES 021: Misteri Si Ringan Tulang

**Tarikh:** 1 November 2026  
**Jenis:** Kandungan kes dan pembukaan arc

### Ditambah

- Fail Kelima — **Jejak Makna Bayuraya**.
- KES 021 **Misteri Si Ringan Tulang** di Taman Bayuraya.
- Lima petunjuk yang boleh diperiksa dalam sebarang urutan.
- Dua cabaran **Kanta Kiasan** yang memerlukan sumber kes sebagai bukti.
- Papan bukti, dua deduksi, A28 **Pembaca Kiasan** dan Lensa Bahasa C021.

### Ganjaran dan progression

- Maksimum 520 XP dan empat bintang.
- C021 dibuka selepas C020 tanpa mengubah rekod C001–C020.

## v2.7.0 — Integrasi Ekosistem ZilTeroka

**Tarikh:** 26 Oktober 2026  
**Jenis:** Integrasi ekosistem

### Ditambah

- Intro ZilTeroka sekali bagi setiap sesi tab, dengan butang **Langkau** dan auto-dismiss.
- Lencana ZilTeroka pada Muka Depan serta pintu masuk daripada Agensi.
- Panel **Kenali ZilTeroka** dengan lima permainan ekosistem, status, pautan tab baharu dan kod QR portal rasmi.
- Aset penjenamaan ZilTeroka tempatan dan navigasi papan kekunci/touch yang sesuai.

### Privasi dan keselamatan

- Tiada akaun, analitik, tracking atau perubahan gameplay.
- Intro tidak mengubah save pemain dan menghormati sesi pelayar.

## v2.6.1 — Final Acceptance Closure

**Tarikh:** 25 Oktober 2026  
**Jenis:** Penutupan QA; tiada perubahan gameplay

### Disahkan

- 20 playthrough bebas melalui Mode B.
- Laluan jawapan salah dan retry.
- Browser Back/Forward, pemulihan save dan integriti replay/rekod.
- Chrome dan Edge merentas viewport telefon, tablet, landskap pendek dan desktop.
- Galeri watak, grid responsif dan geometri modal Lensa Bahasa.

### Ditambah untuk bukti release

- Suite acceptance, history dan Mode B.
- Manifest data QA, tangkap layar Chrome/Edge dan rekod save berterusan.
- Senarai semak peranti fizikal untuk semakan pengguna.

### Nota

- Tag v2.6.1 menutup proses penerimaan v2.6.0; perubahan commit tertumpu pada ujian dan dokumentasi QA, bukan kandungan permainan.

## v2.6.0 — Full Game Quality & Educational Content Audit

**Tarikh:** 20 Oktober 2026  
**Jenis:** Audit menyeluruh

### Disahkan

- 20 kes, 100 petunjuk rasmi, 15 Lensa Bahasa, 24 watak, 27 pencapaian dan 12 lokasi.
- Maksimum 86 bintang dan 7,020 XP terbaik.
- Progression, unlock, replay, rekod terbaik, audio, responsive layout dan keserasian save.

### Dibaiki

- Menyeragamkan istilah KES 008 daripada `temujanji`/`temu janji` kepada bentuk baku `janji temu` tanpa mengubah mekanik atau jawapan.

### Dokumentasi

- Menambah audit induk bagi kes, Bahasa Melayu, visual, UI/kebolehcapaian, prestasi dan regression.
- Menambah daftar isu, inventori sumber dan bukti browser QA.

## v2.5.2 — Character Portrait & Pose Gallery

**Tarikh:** 20 Oktober 2026  
**Jenis:** Persembahan watak

### Ditambah

- Mugshot WebP 512×512 pada kad watak.
- Pose telus berasingan dalam panel butiran dan showcase **Lihat Pose**.
- Dialog Bahasa Melayu khusus bagi setiap watak.
- Sokongan Escape, pemulangan fokus/skrol dan `prefers-reduced-motion` dalam showcase.

### Aset

- 15 mugshot digunakan semula atau dinormalkan dan sembilan mugshot baharu ditambah.
- Dua pose digunakan semula dan 22 pose dibina berasaskan rujukan watak rasmi.
- Tambahan aset WebP berjumlah 2,546,790 bait (2.43 MiB), dimuatkan mengikut keperluan.
- Semua fail sumber asal dikekalkan dan tiada dependency runtime baharu.

### QA

- Audit identiti watak, sumber mugshot/pose, pasangan visual dan galeri responsif pada Chrome serta Edge.

---

## Keadaan semasa dalam binaan setempat v2.14.0

- **Kes:** 25, dibahagikan kepada lima Fail Kes.
- **Petunjuk rasmi:** 125.
- **Lokasi:** 12 lokasi utama yang direkodkan dalam Peta Bayuraya.
- **Pencapaian:** 33.
- **Lensa Bahasa:** 20 aktiviti.
- **Bintang maksimum:** 109.
- **XP terbaik maksimum:** 9,870.
- **Simpanan:** registri `detektif-bahasa-profiles-v1`, snapshot berasingan `detektif-bahasa-profile-v1:<id>`, dan `detektif-bahasa-v1` dikekalkan sebagai sandaran legacy.
- **Kawalan:** papan kekunci, tetikus dan sentuhan.
- **Runtime:** HTML, CSS dan JavaScript tempatan tanpa rangka kerja atau dependency runtime luar.

## Rujukan

Dokumen implementasi, validasi bahasa dan QA terperinci bagi setiap release berada dalam folder [`docs/`](docs/). Sejarah terdahulu boleh disemak melalui Git; v2.14.0 masih merupakan binaan QA setempat dan belum dikomit oleh tugas ini.

