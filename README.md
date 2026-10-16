# Detektif Bahasa

Versi setempat: **v2.4.4 by Zil-el-Saif**. C018 kini memberikan paparan poster siap yang boleh dibuka semula, sementara potret dan adegan Cikgu Farah menggunakan kanon hijab yang menutup rambut serta leher sepenuhnya. Semua kemajuan, ganjaran dan pembaikan navigasi v2.4.3 dikekalkan.

Detektif Bahasa ialah permainan misteri Bahasa Melayu berlatar Bayuraya. Buka `index.html` dalam pelayar moden atau jalankan `node server.js` dan buka http://localhost:4173. Permainan berjalan tanpa rangka kerja atau sambungan luar.

## Kandungan

Permainan mempunyai 19 kes yang boleh dimainkan dalam empat fail:

- **Fail Pertama:** KES 001–005, Misteri Beg Merah hingga Misteri Persiapan Hari Bayuraya.
- **Fail Kedua:** KES 006–010, Kedai Roti, Pasar, Klinik Haiwan, Balai Komuniti dan finale Kotak Kenangan.
- **Fail Ketiga — Jejak Rahsia Bayuraya:** KES 011–015, Stesen Bas, Galeri Warisan, Kedai Matematik, Bilik Persediaan dan finale Peti Jejak.
- **Fail Keempat — Jejak Mesej Bayuraya:** KES 016–019, daripada pesanan terputus hingga dua pemerhatian yang kelihatan berbeza.

Jumlah semasa ialah 19 kes, 12 lokasi, 24 watak dan 25 pencapaian, dengan maksimum 81 bintang dan 6470 XP terbaik. Kes dibuka mengikut urutan; kemajuan setiap kes dan rekod terbaik disimpan berasingan.

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

## v2.3.0

**KES 018 — Misteri Poster Tanpa Tajuk** membawa pemain ke Sudut Hebahan Perpustakaan Bayuraya untuk membaca poster, mengenal pasti inti mesej, memilih tajuk yang sesuai dan menyokong pilihan dengan bukti. C001–C005 kini menggunakan thumbnail WebP yang dipotong daripada scene premium masing-masing.


## v2.4.0

**KES 019 — Misteri Dua Cerita** membawa Xiao Feng dan Ayyash ke Pondok Aktiviti Taman Bayuraya. Mekanik **Banding Perspektif** membandingkan masa, tempat dan had pemerhatian melalui pelan kawasan serta garis masa rasmi. C018 kini menggunakan tajuk sumber neutral **Maklumat Aktiviti Komuniti** sebelum pemain memilih tajuk sebenar poster.

## v2.4.1

Skrin tajuk kini memeriksa semula run aktif sebelum menyambung, pulih dengan selamat daripada bentuk localStorage yang tidak sah dan dirender semula selepas pemulihan back-forward cache. URL CSS dan JavaScript menggunakan versi keluaran supaya HTML baharu tidak bercampur dengan aset runtime lama dalam cache pelayar.

## v2.4.2

Butang **Sambung Siasatan** dan **Masuk Agensi** kini berada dalam panel `title-navigation` baharu di bawah pengenalan permainan. Kedua-duanya menggunakan butang semantik, listener delegasi khusus dan pengesahan semula destinasi; Masuk Agensi sentiasa tersedia tanpa memadam siasatan aktif.


## v2.4.3

Listener capture KES 003–005 kini berhenti ketika Muka Depan atau Ruang Ibu Bapa aktif. Ini membolehkan **Masuk Agensi** dan **Sambung Siasatan** menerima klik bagi save replay lama tanpa menukar `activeCase`, rekod sejarah atau run separa kes lain.

## v2.4.4

C018 kini mendedahkan poster WebP **Jom Bertukar Buku Cerita!** selepas tajuk dipasang, dengan animasi lembut, sokongan reduced motion dan akses semakan semula daripada deduksi atau rekod selesai. Potret canonical serta adegan Sudut Hebahan Cikgu Farah kini menutup rambut dan leher sepenuhnya tanpa mengubah identiti atau gameplay.
