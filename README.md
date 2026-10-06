# Detektif Bahasa

Versi setempat: **v1.2.0 by Zil-el-Saif**. Keluaran ini menaik taraf enam adegan siasatan First Arc kepada ilustrasi WebP premium tanpa mengubah gameplay atau save.

Detektif Bahasa ialah permainan misteri Bahasa Melayu yang berlangsung di Bayuraya. Buka `index.html` dalam pelayar moden, atau jalankan `node server.js` dan buka http://localhost:4173. Permainan tidak memerlukan pemasangan, rangka kerja atau sambungan luar.

## Kandungan First Arc

- **KES 001 — Misteri Beg Merah:** ⭐ Jejak Awal
- **KES 002 — Misteri Label Tertukar:** ⭐⭐ Jejak Tajam
- **KES 003 — Misteri Nota Terpotong:** ⭐⭐⭐ Jejak Cermat
- **KES 004 — Misteri Jejak di Taman:** ⭐⭐⭐⭐ Jejak Teliti
- **KES 005 — Misteri Persiapan Hari Bayuraya:** ⭐⭐⭐⭐⭐ Jejak Utama

Lima kes ini membentuk First Arc, termasuk kemajuan kes berurutan, adegan siasatan interaktif, bantuan KLU tiga tahap, perbandingan maklumat, susunan cebisan, Semak Kenyataan, papan bukti, deduksi, rekod setiap kes, main semula dan penamat First Arc.

Permukaan permainan merangkumi Agensi Detektif Bahasa, Fail Kes, Peta Bayuraya, Pencapaian, Fail Penduduk Bayuraya dan Panduan Detektif. Enam lokasi pada Peta Bayuraya serta sembilan pencapaian diterbitkan daripada kemajuan dan rekod pemain.

Muka Depan menjadi pintu masuk produk dan menawarkan Masuk Agensi atau Sambung Siasatan berdasarkan run aktif. Ruang Ibu Bapa memaparkan ringkasan kemajuan terbitan, penerangan simpanan setempat, poster sokongan QR yang dibekalkan dan reset kemajuan dua langkah. Sembilan syarat Pencapaian kekal sama; hanya persembahan lencananya dinaik taraf.

Enam adegan siasatan—kelas, perpustakaan, Kedai Matematik, Sudut Bacaan, Taman Bayuraya dan Dataran Hari Bayuraya—menggunakan latar WebP 1600×900. Semua adegan masih menggunakan `renderScene()`, hotspot HTML semantik, bantuan tiga tahap, fallback berlabel dan tatal dalaman mudah alih.

## Simpanan dan kawalan

Kemajuan, pilihan bunyi dan rekod terbaik disimpan dalam `localStorage` pada peranti dan pelayar yang digunakan. Save serasi daripada versi terdahulu dinaik taraf secara automatik. Main semula menetapkan semula kes aktif tanpa memadam rekod terbaik, sejarah penyelesaian atau kemajuan kes lain.

Kawalan menyokong papan kekunci, tetikus dan sentuhan melalui elemen HTML semantik. Antara muka responsif menyokong telefon, tablet dan desktop. Bantuan visual menghormati `prefers-reduced-motion`, status tidak bergantung pada warna sahaja, dan fokus papan kekunci kekal kelihatan.

Semua bunyi, ilustrasi, potret watak dan adegan lokasi disimpan secara setempat. Peta Bayuraya menggunakan ilustrasi WebP dengan penanda HTML semantik. Adegan interaktif berkongsi enjin `renderScene()` dan menggunakan fallback berlabel jika imej lokasi gagal dimuatkan.

## Ujian

Jalankan regresi tempatan:

```text
node --check game.js
node --check server.js
node test-game.cjs
git diff --check
```

Nota QA semasa: `docs/v1.2.0-local-qa.md`. Nota keluaran dan dokumentasi QA terdahulu kekal dalam `docs/`.
