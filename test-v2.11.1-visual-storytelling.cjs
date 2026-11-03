const assert = require("node:assert/strict");
const fs = require("node:fs");
const { execFileSync } = require("node:child_process");

const arc7 = fs.readFileSync("arc7.js", "utf8");
const arc10 = fs.readFileSync("arc10.js", "utf8");
const upgrade = fs.readFileSync("visual-storytelling.js", "utf8");
const index = fs.readFileSync("index.html", "utf8");
const game = fs.readFileSync("game.js", "utf8");
const server = fs.readFileSync("server.js", "utf8");

assert.ok(index.includes('data-release="v2.12.0"'));
assert.ok(index.includes("visual-storytelling.js?v=2.12.0"));
assert.ok(game.includes("RELEASE='v2.12.0 by Zil-el-Saif'"));
assert.ok(game.includes("KEY='detektif-bahasa-v1'"));

const education = [
  "c024-v01-bulan.webp",
  "c024-v02-kalendar.webp",
  "c024-v03-mata-membaca.webp",
  "c024-v04-mata-pertandingan.webp",
  "c024-v05-kaki-berjalan.webp",
  "c024-v06-kaki-meja.webp",
];
for (const [index, name] of education.entries()) {
  const asset = `assets/education/${name}`;
  assert.ok(fs.existsSync(asset), asset);
  assert.ok(fs.statSync(asset).size > 20_000, `${asset} is not a substantial illustration`);
  assert.ok(server.includes(asset), `${asset} is served locally`);
  assert.ok(arc10.includes(`neutral:'Gambar ${"ABCDEF"[index]}'`));
  assert.ok(arc10.includes(`image:'${asset}'`));
  const dimensions = execFileSync("ffprobe", [
    "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height",
    "-of", "csv=s=x:p=0", asset,
  ], { encoding: "utf8" }).trim();
  assert.equal(dimensions, "768x576");
}

assert.ok(arc10.includes("const caption=selectable?v.neutral"));
assert.ok(arc10.includes("`${v.neutral} · ${v.label}`"));
assert.ok(!arc10.includes('class="visual-art"'));

const resolutions = [
  "assets/locations/balai-resolusi-c022.webp",
  "assets/locations/perpustakaan-resolusi-c023.webp",
  "assets/locations/dataran-resolusi-c024.webp",
];
for (const asset of resolutions) {
  assert.ok(fs.existsSync(asset), asset);
  assert.ok(fs.statSync(asset).size > 200_000, `${asset} is not a full scene`);
  assert.ok(server.includes(asset), `${asset} is served locally`);
  assert.ok(upgrade.includes(asset));
  const dimensions = execFileSync("ffprobe", [
    "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height",
    "-of", "csv=s=x:p=0", asset,
  ], { encoding: "utf8" }).trim();
  assert.equal(dimensions, "1600x900");
}

assert.ok(upgrade.includes('class="resolution-presentation"'));
assert.ok(upgrade.includes("integratedResolutionPresentation"));
assert.ok(arc7.includes("assets/locations/taman-persiapan-c021.webp"));
assert.ok(arc7.includes("assets/characters/poses/arissa.webp"));
assert.ok(arc7.includes("assets/characters/poses/pakRahim.webp"));

console.log("PASS: v2.11.1 premium C024 visual cards, neutral pre-validation captions, descriptive completed captions, integrated C022-C024 resolutions, preserved C021 and unchanged save key.");
