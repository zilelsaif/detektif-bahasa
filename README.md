# Detektif Bahasa — KES 001

Versi setempat: **v0.4.0 by Zil-el-Saif**. Format kredit setiap keluaran: `vX.X.X by Zil-el-Saif`.

Permainan misteri Bahasa Melayu di Bayuraya. Buka `index.html` dalam pelayar moden, atau jalankan `node server.js` dan buka http://localhost:4173. Tiada pemasangan atau sambungan luar diperlukan.

Kemajuan, pilihan bunyi dan rekod terbaik disimpan berasingan bagi setiap kes dalam localStorage pelayar. Save KES 001 lama dinaik taraf secara automatik. Main semula memulakan kes aktif tanpa memadam rekod atau kemajuan kes lain. KES 002 dibuka selepas KES 001 selesai.

Kawalan menggunakan elemen HTML asli untuk papan kekunci, tetikus dan sentuhan. Bunyi dijana secara setempat. Fon menggunakan Segoe UI/Arial sistem. KLU, watak, Bayuraya dan ketiga-tiga lokasi ialah SVG setempat. Kelas, perpustakaan dan Kedai Matematik berkongsi `renderScene()` serta butang hotspot semantik dengan koordinat peratusan dan bantuan tiga tahap yang menghormati `prefers-reduced-motion`.

Jalankan ujian regresi: `node test-game.cjs`.

Rujukan visual: `docs/detektif-bahasa-north-star.png` (dokumentasi sahaja, tidak dimuatkan oleh permainan). Nota QA terdahulu kekal dalam `docs/`; nota semasa: `docs/v0.4.0-local-qa.md`.
