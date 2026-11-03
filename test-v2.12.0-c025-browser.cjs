const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const URL = process.env.QA_URL || "http://127.0.0.1:4176/";
const executablePath = process.env.QA_BROWSER || undefined;
const label = (process.env.QA_BROWSER_LABEL || "chromium").toLowerCase();
const shots = path.resolve(
  process.env.QA_SHOTS_DIR || "docs/qa/v2.12.0-c025",
  label,
);
fs.mkdirSync(shots, { recursive: true });
const KEY = "detektif-bahasa-v1",
  INTRO = "detektif-bahasa-zilteroka-intro-v1";
const maxima = {
  C021: [4, 520],
  C022: [4, 540],
  C023: [5, 560],
  C024: [5, 580],
};
function complete(id) {
  const [stars, xp] = maxima[id] || [5, 300],
    run = {
      caseId: id,
      status: "completed",
      scene: 7,
      foundClues: [0, 1, 2, 3, 4],
      cluesFound: 5,
      stars,
      xpEarned: xp,
    };
  return { run, record: { ...run } };
}
function seed(completed25 = false) {
  const cases = {};
  for (let i = 1; i <= 24; i++) {
    const id = "C" + String(i).padStart(3, "0");
    cases[id] = complete(id);
  }
  if (completed25) {
    const run = {
      caseId: "C025",
      status: "completed",
      scene: 7,
      foundClues: [0, 1, 2, 3, 4],
      cluesFound: 5,
      validations: {
        A1: true,
        B1: true,
        B2: true,
        C1: true,
        C2: true,
        C3: true,
        D1: true,
        D2: true,
      },
      evidenceLinks: ["draft", "language", "ready"],
      evidenceSelections: [
        [0, 1, 4],
        [2, 3, 4],
        [0, 1, 2, 3, 4],
      ],
      mapSlots: ["A", "B", "C", "D"],
      mapVerified: true,
      deductions: { cause: true, publish: true },
      stars: 5,
      xpEarned: 650,
      resolutionSeen: true,
    };
    cases.C025 = { run, record: { ...run } };
  } else
    cases.C025 = {
      run: { caseId: "C025", status: "in_progress", scene: 0 },
      record: null,
    };
  return { version: 2, activeCase: "C025", muted: false, cases };
}
async function context(
  browser,
  value,
  viewport = { width: 1366, height: 768 },
) {
  const c = await browser.newContext({ viewport, reducedMotion: "reduce" });
  await c.addInitScript(
    ({ key, intro, data }) => {
      sessionStorage.setItem(intro, "seen");
      if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify(data));
    },
    { key: KEY, intro: INTRO, data: value },
  );
  return c;
}
async function enterCase(page) {
  await page.goto(URL, { waitUntil: "domcontentloaded" });
  await page.evaluate(() => {
    titleOpen = false;
    parentOpen = false;
    mapOpen = false;
    achievementsOpen = false;
    charactersOpen = false;
    guideOpen = false;
    home = true;
    render();
  });
  await page.getByRole("button", { name: /Mula Siasatan/ }).click();
  await page.locator('[data-action="next"]').click();
}
async function shot(page, name) {
  await page.screenshot({
    path: path.join(shots, name + ".png"),
    fullPage: true,
  });
}
async function selectContext(page, id, key, value) {
  await page
    .locator(`[data-c025-context="${id}:${key}"]`)
    .selectOption({ label: value });
}
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath });
  const c = await context(browser, seed());
  const page = await c.newPage(),
    errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("response", (r) => {
    if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`);
  });
  page.on("console", (m) => {
    if (m.type() === "error" && !m.text().startsWith("Failed to load resource"))
      errors.push(m.text());
  });
  await enterCase(page);
  await page.locator(".investigation-scene").waitFor();
  await shot(page, "01-investigation");
  for (const id of [
    "ringkasan sukarelawan",
    "senarai prop disahkan",
    "panduan ejaan rasmi",
    "legenda pameran makna",
    "draf peta jelajah",
  ])
    await page.locator(`[data-object="${id}"]`).click();
  assert.match(
    await page.locator(".topline .tag").innerText(),
    /5\/5 PETUNJUK/,
  );
  await page.locator('[data-c025-action="stations"]').click();
  await shot(page, "02-peta-makna");
  await page.locator('[data-c025-select="A-meaning:1"]').click();
  await page.locator('[data-c025-proof="A:P1"]').click();
  await page.locator('[data-c025-proof="A:P5"]').click();
  await page.locator('[data-c025-verify="A1"]').click();
  assert(await page.locator(".verified-output").isVisible());
  await page.locator('[data-c025-station="B"]').click();
  await page.locator('[data-c025-select="B1:0"]').click();
  await page.locator('[data-c025-verify="B1"]').click();
  assert.match(await page.locator('[role="status"]').innerText(), /Pensel/);
  await page.locator('[data-c025-select="B1:1"]').click();
  await page.locator('[data-c025-verify="B1"]').click();
  await page.locator('[data-c025-select="B2:2"]').click();
  await page.locator('[data-c025-verify="B2"]').click();
  await page.locator('[data-c025-station="C"]').click();
  for (const [id, index] of [
    ["C1", 2],
    ["C2", 1],
    ["C3", 2],
  ]) {
    await page.locator(`[data-c025-select="${id}:${index}"]`).click();
    await page.locator(`[data-c025-verify="${id}"]`).click();
  }
  await page.locator('[data-c025-station="D"]').click();
  await selectContext(page, "D1", "clue", "Disember");
  await selectContext(page, "D1", "meaning", "Unit masa dalam kalendar.");
  await selectContext(page, "D1", "visual", "📅 Kalendar");
  await page.locator('[data-c025-verify="D1"]').click();
  await selectContext(page, "D2", "clue", "Enam mata dalam kuiz bahasa");
  await selectContext(page, "D2", "meaning", "Markah pertandingan.");
  await selectContext(page, "D2", "visual", "🏆 Papan markah");
  await page.locator('[data-c025-verify="D2"]').click();
  assert.equal(
    await page.locator(".verified-station-grid article.verified").count(),
    4,
  );
  await shot(page, "03-four-stations");
  await page.locator('[data-c025-action="board"]').click();
  for (const n of [0, 1, 4])
    await page.locator(`[data-c025-board-evidence="${n}"]`).click();
  await page.locator('[data-c025-action="check-board"]').click();
  for (const n of [2, 3, 4])
    await page.locator(`[data-c025-board-evidence="${n}"]`).click();
  await page.locator('[data-c025-action="check-board"]').click();
  for (const n of [0, 1, 2, 3, 4])
    await page.locator(`[data-c025-board-evidence="${n}"]`).click();
  await page.locator('[data-c025-action="check-board"]').click();
  assert.equal(await page.locator(".board-result").count(), 3);
  await shot(page, "04-evidence-board");
  await page.locator('[data-c025-action="assembly"]').click();
  for (const id of ["A", "B", "C", "D"])
    await page.locator(`[data-c025-map-card="${id}"]`).click();
  await shot(page, "05-map-assembly");
  await page.locator('[data-c025-action="verify-map"]').click();
  await page.locator('[data-c025-deduction="cause:0"]').click();
  assert.match(await page.locator('[role="status"]').innerText(), /Bandingkan/);
  await page.locator('[data-c025-deduction="cause:1"]').click();
  await page.locator('[data-c025-deduction="publish:2"]').click();
  await page.locator(".integrated-resolution img").waitFor();
  await page.waitForFunction(
    () =>
      document.querySelector(".integrated-resolution img")?.naturalWidth ===
      1600,
  );
  assert.match(
    await page.locator(".topline .tag").innerText(),
    /5\/5 PETUNJUK/,
  );
  assert.match(
    await page.locator(".result-screen").innerText(),
    /FAIL KELIMA LENGKAP/,
  );
  assert.match(await page.locator(".result-screen").innerText(), /650/);
  await shot(page, "06-finale");
  await page.locator('[data-c025-action="open-booklet"]').click();
  assert.equal(await page.locator(".booklet-pages article").count(), 5);
  await shot(page, "07-booklet");
  await page.locator('[data-c025-action="close-booklet"]').last().click();
  await page.locator('[data-lensa-action="open"]').click();
  for (const index of [0, 1, 1, 2])
    await page.locator(`[data-lensa-answer="${index}"]`).click();
  assert.match(
    await page.locator(".lensa-success").innerText(),
    /Aktiviti selesai/,
  );
  await page.locator('[data-lensa-action="close"]').click();
  const saved = await page.evaluate(
    (key) => JSON.parse(localStorage.getItem(key)),
    KEY,
  );
  assert.equal(saved.cases.C025.record.xpEarned, 650);
  assert.equal(saved.cases.C025.run.status, "completed");
  assert.equal(saved.lensaBahasa.C025.completed, true);
  assert.equal(saved.cases.C024.record.xpEarned, 580);
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.evaluate(() => {
    titleOpen = false;
    home = false;
    file = false;
    activeCase = "C025";
    state = cases.C025.run;
    record = cases.C025.record;
    render();
  });
  if (!(await page.locator(".integrated-resolution").isVisible())) {
    const debug = await page.evaluate(() => ({
      activeCase,
      status: state?.status,
      scene: state?.scene,
      home,
      file,
      titleOpen,
      body: app.innerHTML.slice(0, 180),
    }));
    throw new Error(`Reload state: ${JSON.stringify(debug)}`);
  }
  assert.deepEqual(errors, []);
  await c.close();
  const sizes = [
    [360, 640],
    [390, 844],
    [430, 932],
    [800, 450],
    [1024, 768],
    [1366, 768],
    [1600, 900],
    [1920, 1080],
  ];
  for (const [width, height] of sizes) {
    const rc = await context(browser, seed(true), { width, height }),
      p = await rc.newPage(),
      issues = [];
    p.on("pageerror", (e) => issues.push(e.message));
    await p.goto(URL, { waitUntil: "domcontentloaded" });
    await p.evaluate(() => {
      titleOpen = false;
      home = false;
      render();
    });
    await p.locator(".integrated-resolution img").waitFor();
    await p.waitForFunction(
      () =>
        document.querySelector(".integrated-resolution img")?.naturalWidth ===
        1600,
    );
    const geometry = await p.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth,
      buttons: [...document.querySelectorAll(".result-screen button")].map(
        (b) => {
          const r = b.getBoundingClientRect();
          return { w: r.width, h: r.height };
        },
      ),
    }));
    assert(
      geometry.scrollWidth <= geometry.innerWidth + 1,
      `${width}x${height} page overflow`,
    );
    assert(
      geometry.buttons.every((b) => b.w >= 44 && b.h >= 44),
      `${width}x${height} touch target`,
    );
    await p.locator('[data-c025-action="open-booklet"]').click();
    assert(await p.locator(".c025-booklet").isVisible());
    await p.screenshot({
      path: path.join(shots, `responsive-${width}x${height}.png`),
      fullPage: true,
    });
    assert.deepEqual(issues, []);
    await rc.close();
  }
  await browser.close();
  console.log(
    `PASS: v2.12.0 ${label} full C025 journey, error recovery, booklet, Lensa, save restore and eight responsive viewports.`,
  );
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
