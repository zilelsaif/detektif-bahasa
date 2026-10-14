# Detektif Bahasa

Versi setempat: **v2.2.1 by Zil-el-Saif**. Keluaran ini menyatukan semua empat fail kes dalam satu accordion boleh tatal tanpa mengubah permainan atau rekod kemajuan.

Detektif Bahasa ialah permainan misteri Bahasa Melayu berlatar Bayuraya. Buka `index.html` dalam pelayar moden atau jalankan `node server.js` dan buka http://localhost:4173. Permainan berjalan tanpa rangka kerja atau sambungan luar.

## Kandungan

Permainan mempunyai 15 kes dalam tiga fail:

- **Fail Pertama:** KES 001–005, Misteri Beg Merah hingga Misteri Persiapan Hari Bayuraya.
- **Fail Kedua:** KES 006–010, Kedai Roti, Pasar, Klinik Haiwan, Balai Komuniti dan finale Kotak Kenangan.
- **Fail Ketiga — Jejak Rahsia Bayuraya:** KES 011–015, Stesen Bas, Galeri Warisan, Kedai Matematik, Bilik Persediaan dan finale Peti Jejak.

Jumlah maksimum yang ditetapkan ialah 12 lokasi, 22 watak, 21 pencapaian, 63 bintang dan 4500 XP terbaik. Kes dibuka mengikut urutan; kemajuan setiap kes dan rekod terbaik disimpan berasingan.

Permainan menggunakan adegan siasatan, dialog saksi, susunan, Semak Kenyataan, teka-teki, trivia, padanan, kod simbol, papan bukti dan deduksi. Setiap kes mempunyai lima petunjuk rasmi dan bantuan KLU tiga tahap. Alat Siasatan membolehkan pemain menyemak petunjuk yang telah ditemui atau memulakan semula run semasa.

## Kemajuan dan kawalan

Kemajuan, bunyi dan rekod disimpan secara setempat menggunakan kunci `detektif-bahasa-v1`; save lama dimuat tanpa menukar kunci. Mulakan semula kes hanya mengosongkan run kes itu. Tetapan, rekod terbaik dan kes lain kekal.

Kawalan HTML semantik menyokong papan kekunci, tetikus dan sentuhan. Fokus papan kekunci kelihatan, dialog Alat Siasatan kini mengekalkan Tab di dalam dialog, dan animasi bantuan menghormati `prefers-reduced-motion`. Ilustrasi disimpan secara setempat; kesan bunyi dijana dalam pelayar. Aplikasi tiada dependensi runtime luaran.

## Ujian setempat

```text
node --check game.js
node --check arc2.js
node --check arc3.js
node --check arc4.js
node --check mechanics.js
node --check server.js
node test-game.cjs
git diff --check
```

Laporan audit dan QA berada dalam `docs/v2.1.0-full-audit.md`, `docs/v2.1.0-local-qa.md` dan `docs/v2.1.0-changelog.md`.

## v2.1.0
Fail Keempat diperkenalkan melalui KES 016 — Misteri Pesanan Yang Terputus. C016 menggunakan Susun Mesej, lima petunjuk, Emah dan syarat buka selepas C015.

## v2.1.1

C016 kini menggunakan potret WebP canonical Emah dan scene WebP 1600×900. Hotspot dipadankan dengan objek sebenar, cebisan mesej dipersembahkan dalam susunan rawak dengan label neutral A–E, dan keadaan selesai menyediakan satu tindakan jelas untuk mencari bekas bahan.

## v2.2.0

Fail Keempat diteruskan dengan **KES 017 — Misteri Nota Pekerja Baharu**. Jagjit menyiasat dua masa penghantaran KB-17 menggunakan tag kotak, semakan stok, log penghantaran dan resit Balai Komuniti. Mekanik Cari Percanggahan membezakan maklumat yang disokong, bercanggah dan belum cukup dibuktikan.

## v2.2.1

Panel **Fail Kes** kini menggunakan satu kawasan tatal dengan empat kumpulan accordion. Arc kes aktif dibuka secara automatik apabila pemain menukar kes, sementara pilihan manual dikekalkan sepanjang paparan semula kes yang sama. Kiraan arc menggunakan rekod sejarah, termasuk 2/5 untuk Fail Keempat apabila C016 dan C017 telah selesai.
