# Kanon Visual Watak Bayuraya

## Persembahan galeri v2.5.2

Fail Penduduk membezakan mugshot kepala/bahu (`assets/characters/mugshots/{id}.webp`) daripada pose berasingan (`assets/characters/poses/{id}.webp`). KLU terus menggunakan `assets/klu.svg` untuk pose. Potret asal di bawah kekal sebagai rujukan identiti dan untuk paparan kes; salinan galeri tidak menggantikan fail asal.

24 padanan, sumber dan pakaian dicatat dalam [audit aset v2.5.2](v2.5.2-character-asset-audit.md). Pose mesti mengekalkan identiti wajah, warna kulit, umur anggaran dan pakaian rujukan. Aynaa kekal bertudung biru, Ivy kekal Ivy, Affan berbaju hijau, Arissa bertudung kuning, Emah sedikit berisi tanpa hijab, Jagjit lelaki Punjabi muda sekitar 18 dengan misai nipis, dan hijab Farah menutup rambut serta leher. Lambang jersi Ammar, reben Sofia dan poket Affan turut dikekalkan.

Dialog showcase ialah teks HTML individu, bukan teks dalam gambar dan bukan kandungan kes baharu. Rujuk [kanon dialog](v2.5.2-character-dialogue-canon.md). Penemuan, biodata dan kaitan kes tidak berubah.

Potret dalam Fail Penduduk ialah sumber identiti visual untuk watak bernama. Adegan boleh menggunakan skala atau rendering berbeza, tetapi wajah, umur anggaran, rambut atau tudung, aksesori dan pakaian utama perlu kekal mudah dikenali.

| Nama kanon | Peranan | Potret kanon | Adegan diketahui | Status |
|---|---|---|---|---|
| KLU | Rakan detektif | `assets/klu.svg` | UI seluruh permainan | PASS |
| Aynaa | Penduduk Bayuraya | `assets/characters/aynaa.webp` | Tiada penampilan jelas dalam latar lokasi | PASS |
| Cikgu Farah | Guru | `assets/characters/cikgu-farah.webp` | `perpustakaan-sudut-hebahan.webp` | PASS selepas pembetulan v2.4.4 |
| Hakim | Murid | `assets/characters/hakim.webp` | Tiada | PASS |
| Mei Ling | Saksi | `assets/characters/mei-ling.webp` | Tiada | PASS |
| Pustakawan Bayuraya | Pustakawan | `assets/characters/pustakawan.webp` | `library-bayuraya.webp` | PASS selepas pembetulan v1.4.0 |
| Ayyash | Penduduk Bayuraya | `assets/characters/ayyash.webp` | Tidak dibakar dalam latar | Diperkenalkan dalam C011; aset rasmi Kedai Matematik |
| Affan | Pelawat galeri | `assets/characters/affan.webp` | Tidak dibakar dalam latar | Diperkenalkan dalam C012; aset rasmi Kedai Matematik |
| Ammar | Pelanggan Kedai Matematik | `assets/characters/ammar.webp` | Tiada | PASS |
| Sofia | Pelanggan Kedai Matematik | `assets/characters/sofia.webp` | Tiada | PASS |
| Pekerja Kedai Matematik | Pekerja kedai | `assets/characters/shop-worker.webp` | `kedai-matematik-bayuraya.webp` | MINOR DIFFERENCE — pakaian dan peranan masih mudah dikenal |
| Ivy | Penduduk Bayuraya | `assets/characters/ivy.webp` | Tiada | PASS |
| Kumar | Penduduk Bayuraya | `assets/characters/kumar.webp` | Tiada | PASS |
| Maria | Saksi taman | `assets/characters/maria.webp` | Tiada | PASS |
| Azzam | Penduduk Bayuraya | `assets/characters/azzam.webp` | Tiada | PASS |
| Pak Rahim | Penjaga taman | `assets/characters/pak-rahim.webp` | Tiada | PASS |
| Kak Suri | Pemilik Kedai Roti | `assets/characters/kak-suri.webp` | `kedai-roti-bayuraya.webp` | MINOR DIFFERENCE — tudung dan apron mengekalkan identiti peranan |
| Encik Hafiz | Peniaga pasar | `assets/characters/encik-hafiz.webp` | `pasar-bayuraya.webp` | MINOR DIFFERENCE — pakaian peniaga dan rupa umur konsisten |
| Dr. Hana | Doktor veterinar | `assets/characters/dr-hana.webp` | `klinik-haiwan-bayuraya.webp` | MINOR DIFFERENCE — tudung, kot dan isyarat veterinar konsisten |
| Puan Suraya | Penyelaras komuniti | `assets/characters/puan-suraya.webp` | `balai-komuniti-bayuraya.webp` · `balai-komuniti-bilik-persediaan.webp` | MINOR DIFFERENCE — tudung dan identiti penyelaras konsisten |
| Xiao Feng | Pemerhati corak | `assets/characters/xiao-feng.webp` | `balai-komuniti-bilik-persediaan.webp` | PASS — rambut hitam berlapis, uniform teal/krim, reben amber dan kad simbol |

## Pembetulan Pustakawan

Adegan perpustakaan sebelum v1.4.0 menampilkan wanita bertudung yang jelas tidak sepadan dengan potret kanon. Figur di belakang kaunter kini berambut perang gelap separas bahu, berkaca mata teal, berbaju krim dan berjaket tanpa lengan hijau sage. Komposisi, kaunter, beg merah dan objek hotspot dikekalkan.

## Kanon Cikgu Farah

**Cikgu Farah: hijab fully covers hair and neck in all canonical and scene depictions.**

Potret `assets/characters/cikgu-farah.webp` ialah sumber identiti utama. Hijab teal menutup semua rambut dan bersambung melepasi rahang hingga ke bahagian dada tanpa jurang kulit pada leher. Adegan `assets/locations/perpustakaan-sudut-hebahan.webp` mesti mengekalkan wajah, kaca mata navy, ekspresi mesra, warna hijab dan pakaian biru muda yang sama. Aset SVG lama `assets/cikgu-farah.svg` tidak digunakan oleh paparan watak atau dialog runtime.

## Shared-Universe Candidates

Audit dibuat terus pada `C:\Users\HP\Documents\GitHub\kedai-matematik\assets\customers`.

Watak rasmi yang sudah mempunyai padanan dalam Detektif Bahasa: Aynaa, Ammar, Sofia, Mei Ling, Ivy, Kumar, Maria dan Azzam. Nama paparan Detektif Bahasa kekal `Aynaa` dan `Ivy`.

| Nama paparan kanon | Aset sumber Kedai Matematik | Pengenal visual | Status Detektif Bahasa |
|---|---|---|---|
| Ayyash | `assets/customers/Ayyash.webp` | Kanak-kanak lelaki berbaju biru dan bersongkok hitam | INTRODUCED IN C011 |
| Affan | `assets/customers/Affan.webp` | Kanak-kanak lelaki berambut hitam dan berbaju hijau terang | INTRODUCED IN C012 |

Aset rasmi ini disalin terus ke runtime tanpa penjanaan semula dan penemuannya diterbitkan daripada kemajuan kes masing-masing.

## v1.9.0 — Arissa

- **Nama kanonik:** Arissa
- **Umur visual:** murid sekolah rendah, Darjah 4
- **Siluet utama:** hijab kuning, pakaian teal-kuning ringkas, pin bintang
- **Peranan:** peserta/pembantu Jejak Rahsia yang mengingati tanda bintang kuning pada kad arahan akhir
- **Aset kanonik:** `assets/characters/arissa.webp` (512×512, latar telus)

Arissa perlu kekal jelas berbeza daripada Aynaa dan Maria melalui tema kuning, pin bintang dan bingkai potret yang sama dengan keluarga watak Bayuraya. Namanya tidak didedahkan sebelum C015 bermula.
