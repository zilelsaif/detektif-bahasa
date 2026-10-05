# Detektif Bahasa

Versi setempat: **v0.15.0 by Zil-el-Saif**. Format kredit setiap keluaran: `vX.X.X by Zil-el-Saif`.

Permainan misteri Bahasa Melayu di Bayuraya. Buka `index.html` dalam pelayar moden, atau jalankan `node server.js` dan buka http://localhost:4173. Tiada pemasangan atau sambungan luar diperlukan.

Kemajuan, pilihan bunyi dan rekod terbaik disimpan berasingan bagi setiap kes dalam localStorage pelayar. Save lama dinaik taraf secara automatik. Main semula memulakan kes aktif tanpa memadam rekod, status sejarah atau kemajuan kes lain. KES 002–005 dibuka secara berurutan selepas kes sebelumnya selesai.

Kawalan menggunakan elemen HTML asli untuk papan kekunci, tetikus dan sentuhan. Bunyi dijana secara setempat. Fon menggunakan Segoe UI/Arial sistem. KLU, watak, Bayuraya dan semua lokasi ialah SVG setempat. Kelas, perpustakaan, Kedai Matematik, Sudut Bacaan dan Taman Bayuraya berkongsi `renderScene()` serta butang hotspot semantik dengan koordinat peratusan dan bantuan tiga tahap yang menghormati `prefers-reduced-motion`. KES 004 menambah `Semak Kenyataan`, tugasan perbandingan berasaskan pilihan yang menekankan masa dan tempat.

Jalankan ujian regresi: `node test-game.cjs`.

KES 005, **Misteri Persiapan Hari Bayuraya**, ialah mini-finale pertama. Kes ini menggabungkan perbandingan penerangan objek, susunan cebisan, Semak Kenyataan, papan bukti dan deduksi melalui adegan interaktif Dataran Bayuraya.

v0.8.0 menyelaraskan status Fail Kes, butang mula/sambung, paparan keputusan, notis kes baharu dan pengiktirafan **Fail Pertama Lengkap** tanpa menambah kes atau mekanik utama.

v0.9.0 membuka **Peta Bayuraya** melalui navigasi bawah. Enam lokasi penting memaparkan status Belum ditemui, Ditemui atau Disiasat berdasarkan save dan rekod C001–C005 yang sedia ada. Peta tidak mengubah skema save dan tidak melancarkan kes secara terus.

v0.10.0 membuka **Pencapaian** dengan sembilan lencana, lima kemahiran detektif, rekod bintang dan XP terbaik. Semua keadaan diterbitkan daripada rekod kes dan Peta Bayuraya tanpa menambah data pencapaian pada save.

v0.11.0 membuka **Fail Penduduk Bayuraya** dengan 14 watak pertama, hubungan kes dan lokasi serta penemuan yang diterbitkan daripada progres sedia ada.

v0.12.0 membuka **Panduan Detektif**, rujukan mesra kanak-kanak bagi cara bermain, siasatan lokasi, bantuan KLU, mekanik siasatan, dunia Bayuraya, simpanan dan kawalan. Panduan tidak mendedahkan penyelesaian kes dan tidak mengubah save.

v0.13.0 ialah calon keluaran pra-v1.0.0. Versi ini mengaudit regresi lima kes, progres, save dan replay, permukaan dunia, aksesibiliti, bahasa, aset dan susun atur responsif tanpa menambah kandungan gameplay.

v0.14.0 menyatukan potret watak dengan karya rasmi Kedai Matematik dan potret baharu yang sepadan untuk watak khusus Detektif Bahasa. Semua potret runtime menggunakan WebP telus setempat dengan bingkai yang konsisten; logik permainan dan save kekal sama.

v0.15.0 menggantikan hero Peta Bayuraya dengan satu ilustrasi bandar WebP 16:9 yang kohesif. Enam lokasi kekal sebagai butang HTML semantik dengan status terbitan, panel maklumat dan logik penemuan yang sama; latar neutral memastikan penanda masih boleh digunakan jika imej gagal dimuatkan.

Rujukan visual: `docs/detektif-bahasa-north-star.png` (dokumentasi sahaja, tidak dimuatkan oleh permainan). Nota QA terdahulu kekal dalam `docs/`; nota semasa: `docs/v0.15.0-map-redesign-qa.md`.
