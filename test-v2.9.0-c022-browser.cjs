const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const url = process.env.QA_URL || "http://127.0.0.1:4180/";
const browserLabel = process.env.QA_BROWSER_LABEL || "Chromium";
const executablePath = process.env.QA_BROWSER || undefined;
const screenshots = path.resolve("docs/qa/v2.9.0-c022", browserLabel.toLowerCase().replace(/\W+/g, "-"));
const sizes = [[360, 640], [390, 844], [430, 932], [800, 450], [1024, 768], [1366, 768], [1600, 900], [1920, 1080]];
const seed = {
  version: 2,
  activeCase: "C022",
  muted: false,
  cases: {
    C020: {
      run: { caseId: "C020", status: "completed", scene: 10, cluesFound: 5 },
      record: { caseId: "C020", status: "completed", stars: 5, xpEarned: 550 },
    },
    C021: {
      run: { caseId: "C021", status: "completed", scene: 7, cluesFound: 5 },
      record: { caseId: "C021", status: "completed", stars: 4, xpEarned: 520 },
    },
  },
};

async function openCase(page) {
  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(() => {
    titleOpen = false;
    switchCase("C022");
    home = false;
    render();
  });
}

async function assertLayout(page, width, height) {
  const result = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    hotspots: [...document.querySelectorAll(".scene-hotspot")].filter((e) => e.offsetParent).map((e) => {
      const r = e.getBoundingClientRect();
      return { width: r.width, height: r.height, label: e.getAttribute("aria-label") };
    }),
    clipped: [...document.querySelectorAll("button")].filter((e) => e.offsetParent && !e.closest(".scene-canvas,.scene-scroll,.scene-scroll-shell,.investigation-scene")).map((e) => {
      const r = e.getBoundingClientRect();
      return { left: r.left, right: r.right, text: e.textContent.trim().slice(0, 40) };
    }).filter((r) => r.left < -2 || r.right > innerWidth + 2),
  }));
  assert.ok(result.overflow <= 1, `${width}x${height}: page overflow ${result.overflow}`);
  assert.equal(result.hotspots.length, 5, `${width}x${height}: five hotspots`);
  assert.ok(result.hotspots.every((h) => h.width >= 44 && h.height >= 44 && h.label), `${width}x${height}: accessible hotspot targets`);
  assert.equal(result.clipped.length, 0, `${width}x${height}: clipped controls ${JSON.stringify(result.clipped)}`);
}

(async () => {
  fs.mkdirSync(screenshots, { recursive: true });
  const browser = await chromium.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });
  const errors = [];

  for (const [width, height] of sizes) {
    const context = await browser.newContext({ viewport: { width, height }, hasTouch: width <= 390, isMobile: width <= 390 });
    const page = await context.newPage();
    page.on("pageerror", (error) => errors.push(`${width}x${height}: ${error.message}`));
    await page.addInitScript((value) => {
      if (!localStorage.getItem("detektif-bahasa-v1")) localStorage.setItem("detektif-bahasa-v1", JSON.stringify(value));
    }, seed);
    await openCase(page);
    await page.locator('[data-action="next"]').click();
    await assertLayout(page, width, height);
    assert.match(await page.locator(".scene-image").getAttribute("src"), /balai-persiapan-c022\.webp/);
    await page.locator("body").click({ position: { x: 2, y: 2 } });
    await page.keyboard.press("Tab");
    assert.equal(await page.evaluate(() => document.activeElement?.matches(":focus-visible") === true), true);
    await page.screenshot({ path: path.join(screenshots, `scene-${width}x${height}.png`), fullPage: true });
    await context.close();
  }

  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  const page = await context.newPage();
  page.on("pageerror", (error) => errors.push(`flow: ${error.message}`));
  await page.addInitScript((value) => {
    if (!localStorage.getItem("detektif-bahasa-v1")) localStorage.setItem("detektif-bahasa-v1", JSON.stringify(value));
  }, seed);
  await openCase(page);
  await page.screenshot({ path: path.join(screenshots, "briefing.png"), fullPage: true });
  await page.locator('[data-action="next"]').tap();
  for (const id of ["senarai prop asal", "rak peralatan", "buku inventori", "catatan persiapan", "senarai semakan akhir"]) {
    await page.locator(`[data-object="${id}"]`).tap();
    await page.locator('[data-c022-action="close-source"]').tap();
  }
  assert.equal(await page.evaluate(() => state.cluesFound), 5);
  await page.screenshot({ path: path.join(screenshots, "five-sources.png"), fullPage: true });
  await page.reload({ waitUntil: "networkidle" });
  await page.evaluate(() => { titleOpen = false; home = false; render(); });
  assert.equal(await page.evaluate(() => state.cluesFound), 5);
  await page.locator('[data-c022-action="matches"]').tap();
  const stations = [["pensel", "batang", "keping"], ["kain", "helai", "batang"], ["kad", "keping", "pasang"], ["tali", "utas", "biji"], ["kasut", "pasang", "helai"]];
  for (const [id, answer, wrong] of stations) {
    await page.locator(`[data-c022-station="${id}"]`).tap();
    await page.locator(`[data-c022-classifier="${wrong}"][data-object-id="${id}"]`).tap();
    await page.locator(`[data-c022-action="verify-match"][data-object-id="${id}"]`).tap();
    assert.ok(await page.locator(".feedback.wrong").isVisible());
    await page.locator(`[data-c022-classifier="${answer}"][data-object-id="${id}"]`).tap();
    await page.locator(`[data-c022-action="verify-match"][data-object-id="${id}"]`).tap();
    if (id === "pensel") {
      await page.reload({ waitUntil: "networkidle" });
      await page.evaluate(() => { titleOpen = false; home = false; render(); });
      assert.equal(await page.evaluate(() => state.matches.pensel), true);
    }
  }
  assert.equal(await page.evaluate(() => c022AllMatches()), true);
  await page.screenshot({ path: path.join(screenshots, "object-matching.png"), fullPage: true });
  await page.locator('[data-c022-action="board"]').tap();
  await page.locator('[data-c022-board-evidence="0"]').tap();
  await page.locator('[data-c022-action="check-board-step"]').tap();
  assert.ok(await page.locator(".feedback.wrong").isVisible());
  await page.locator('[data-c022-board-evidence="1"]').tap();
  await page.locator('[data-c022-action="check-board-step"]').tap();
  for (const id of ["1", "2"]) await page.locator(`[data-c022-board-evidence="${id}"]`).tap();
  await page.locator('[data-c022-action="check-board-step"]').tap();
  for (const id of ["2", "3", "4"]) await page.locator(`[data-c022-board-evidence="${id}"]`).tap();
  await page.locator('[data-c022-action="check-board-step"]').tap();
  assert.equal(await page.locator(".board-result").count(), 3);
  await page.screenshot({ path: path.join(screenshots, "evidence-board.png"), fullPage: true });
  await page.locator('[data-c022-action="finish-board"]').tap();
  await page.screenshot({ path: path.join(screenshots, "deduction-cause.png"), fullPage: true });
  await page.locator('[data-c022-deduction="cause:0"]').tap();
  assert.ok(await page.locator(".feedback.wrong").isVisible());
  await page.locator('[data-c022-deduction="cause:1"]').tap();
  await page.screenshot({ path: path.join(screenshots, "deduction-final.png"), fullPage: true });
  await page.locator('[data-c022-deduction="complete:2"]').tap();
  assert.ok(await page.locator(".feedback.wrong").isVisible());
  await page.locator('[data-c022-deduction="complete:0"]').tap();
  await page.waitForSelector("text=KES 022 SELESAI");
  assert.ok((await page.locator("body").innerText()).includes("+540"));
  await page.screenshot({ path: path.join(screenshots, "resolution.png"), fullPage: true });
  await page.locator('[data-lensa-action="open"]').tap();
  for (const answer of ["0", "1", "2"]) await page.locator(`[data-lensa-answer="${answer}"]`).tap();
  assert.ok(await page.locator(".lensa-success").isVisible());
  await page.screenshot({ path: path.join(screenshots, "lensa.png"), fullPage: true });
  await page.locator('[data-lensa-action="close"]').tap();
  await page.getByRole("button", { name: "Kembali ke Agensi", exact: true }).tap();
  assert.ok((await page.locator("body").innerText()).includes("2/5"));
  assert.equal(await page.locator('[data-case="C021"]').count(), 1);
  assert.equal(await page.locator('[data-case="C022"]').count(), 1);
  assert.equal(await page.evaluate(() => achievementDefinitions.find((a) => a.id === "A29").unlocked()), true);
  await page.screenshot({ path: path.join(screenshots, "fail-kelima.png"), fullPage: true });
  await page.locator("#sound").tap();
  await page.reload({ waitUntil: "networkidle" });
  assert.match(await page.locator("#sound").textContent(), /Mati/);
  await page.evaluate(() => { titleOpen = false; switchCase("C022"); home = false; render(); });
  await page.locator('[data-action="replay"]').tap();
  assert.equal(await page.evaluate(() => state.cluesFound), 0);
  assert.equal(await page.evaluate(() => cases.C022.record.xpEarned), 540);
  assert.deepEqual(errors, []);
  await context.close();
  await browser.close();
  console.log(`PASS: v2.9.0 C022 real ${browserLabel} QA at eight required viewports, full flow, wrong feedback, refresh, Lensa, sound and replay.`);
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
