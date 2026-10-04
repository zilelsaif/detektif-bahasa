# ZilTeroka

Portal rasmi ringan untuk permainan pendidikan ZilTeroka. Projek ini dibina dengan HTML5, CSS3 dan JavaScript vanilla, tanpa framework, tracking, akaun, pangkalan data atau storan pelayar.

## Struktur

```text
zilteroka/
├── index.html
├── README.md
├── css/
│   └── style.css
├── js/
│   └── main.js
└── assets/
    ├── brand/
    ├── games/
    ├── icons/
    └── ui/
```

## Menukar URL game

Semua URL game berada dalam objek `games` di `js/main.js`. Isi nilai `url` bagi setiap game. Jika nilainya kosong, butang “Main Sekarang” kekal dipaparkan tetapi tidak akan meninggalkan halaman.

```js
const games = {
  kedaiMatematik: {
    url: "https://...",
    artworkUrl: "assets/games/kedai-matematik.webp",
    logoUrl: "assets/games/kedai-matematik-logo.webp"
  }
};
```

`artworkUrl` dan `logoUrl` ialah slot untuk aset rasmi. Biarkan nilainya kosong untuk menggunakan placeholder sedia ada. Jika fail tidak dapat dimuatkan, kad kembali kepada simbol dan label placeholder secara automatik. Nisbah visual kad dan seni bina kad tidak perlu diubah apabila aset dimasukkan.

Versi semasa menggunakan aset rasmi tempatan untuk Kedai Matematik, Makmal Cilik dan Detektif Bahasa. Salinan produksi yang dioptimumkan disimpan dalam `assets/games/`; fail sumber asal kekal di projek game masing-masing.

Alamat e-mel footer masih menggunakan placeholder `hello@example.com` dan perlu diganti sebelum penerbitan.

## Jalankan secara tempatan

Fail boleh dibuka terus dalam pelayar. Untuk server tempatan, jalankan mana-mana static server dari folder ini, contohnya:

```powershell
npx serve .
```

## Aset

Kad game menggunakan placeholder abstrak tempatan. Gantikan dengan aset rasmi WebP atau AVIF apabila tersedia. Elakkan hotlink aset pihak ketiga.

## Deploy ke Cloudflare Pages

1. Push folder projek ini ke repository GitHub `zilteroka`.
2. Di Cloudflare Pages, pilih **Create a project** dan sambungkan repository.
3. Tetapkan production branch kepada `main`.
4. Framework preset: `None`.
5. Build command: kosong.
6. Build output directory: `/`.
7. Deploy. Setiap push seterusnya ke `main` akan mencetuskan deployment automatik.

Cadangan URL produksi: `https://zilteroka.pages.dev`.

## Privasi

Versi ini tidak mengandungi analytics, pixel, iklan, borang pendaftaran, cookies tracking atau `localStorage`.
