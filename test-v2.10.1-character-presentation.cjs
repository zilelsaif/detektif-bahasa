const assert = require("node:assert/strict"),
  fs = require("node:fs");
const arc7 = fs.readFileSync("arc7.js", "utf8"),
  arc8 = fs.readFileSync("arc8.js", "utf8"),
  arc9 = fs.readFileSync("arc9.js", "utf8"),
  presentation = fs.readFileSync("character-presentation.js", "utf8"),
  html = fs.readFileSync("index.html", "utf8");
assert.match(arc7, /name:\s*["']FAIL KELIMA["']/);
assert.match(arc7, /storyTitle:\s*["']Jejak Makna Bayuraya["']/);
assert.doesNotMatch(arc7, /FAIL KELIMA — JEJAK MAKNA BAYURAYA/);
for (const [id, name] of [
  ["puanSuraya", "Puan Suraya"],
  ["affan", "Affan"],
  ["farah", "Cikgu Farah"],
  ["meiLing", "Mei Ling"],
  ["klu", "KLU"],
]) {
  assert.match(
    presentation,
    new RegExp(`${id}:\\s*\\{[\\s\\S]*?name:\\s*["']${name}`),
  );
  const mug = `assets/characters/mugshots/${id}.webp`;
  assert.ok(
    presentation.includes(mug) && fs.existsSync(mug),
    `${name} mugshot exists`,
  );
}
assert.match(arc8, /caseCharacterDialogue\(["']puanSuraya["']/);
assert.match(arc8, /caseCharacterDialogue\(["']affan["']/);
assert.match(
  arc8,
  /resolutionPresentation\(["']assets\/locations\/balai-persiapan-c022\.webp/,
);
assert.match(arc9, /caseCharacterDialogue\(\s*["']meiLing["']/);
assert.match(arc9, /caseCharacterDialogue\(\s*["']farah["']/);
assert.match(
  arc9,
  /resolutionPresentation\(["']assets\/locations\/perpustakaan-penyunting-c023\.webp/,
);
assert.match(presentation, /class="resolution-pose-card"/);
assert.match(html, /character-presentation\.js\?v=2\.12\.0/);
assert.match(html, /v2\.12\.0 by Zil-el-Saif/);
assert.match(fs.readFileSync("game.js", "utf8"), /KEY='detektif-bahasa-v1'/);
assert.equal((arc8.match(/maxXP:\s*540/g) || []).length > 0, true);
assert.equal((arc9.match(/maxXP:\s*560/g) || []).length > 0, true);
console.log(
  "PASS: v2.10.1 folder naming, canonical character mapping, investigation portraits, editorial resolutions, reward and save-key invariants.",
);
