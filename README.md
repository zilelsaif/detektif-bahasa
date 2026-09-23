# Detektif Bahasa — KES 001

Versi setempat: **v0.3.0 by Zil-el-Saif**. Format kredit setiap keluaran: `vX.X.X by Zil-el-Saif`.

Permainan misteri Bahasa Melayu di Bayuraya. Buka `index.html` dalam pelayar moden, atau jalankan `node server.js` dan buka http://localhost:4173. Tiada pemasangan atau sambungan luar diperlukan.

Kemajuan, pilihan bunyi dan rekod terbaik disimpan dalam localStorage pelayar. Gunakan pelayar dan alamat yang sama untuk menyambung. Main semula memulakan sesi baharu tanpa memadam rekod terbaik. Bantuan dikira setiap tahap yang didedahkan; selepas dua jawapan salah, tahap bantuan seterusnya muncul. Tiada penalti masa. XP ialah 120, dengan bonus 30 hanya jika tiada bantuan.

Kawalan menggunakan elemen HTML asli untuk papan kekunci, tetikus dan sentuhan. Bunyi dijana secara setempat. Fon menggunakan Segoe UI/Arial sistem. KLU, Aynaa, Bayuraya, perincian agensi, kelas Sekolah Bayuraya dan Perpustakaan Bayuraya ialah SVG setempat. Penyiasatan kelas dan perpustakaan berkongsi `renderScene()` serta butang hotspot semantik dengan koordinat peratusan, sokongan tetikus, sentuhan dan papan kekunci, serta penekanan bantuan yang menghormati `prefers-reduced-motion`.

Jalankan ujian regresi: `node test-game.cjs`.

Rujukan visual: `docs/detektif-bahasa-north-star.png` (dokumentasi sahaja, tidak dimuatkan oleh permainan). Nota QA terdahulu kekal dalam `docs/`; nota semasa: `docs/v0.3.0-local-qa.md`.
