const { chromium } = require("playwright"),
  assert = require("node:assert/strict"),
  fs = require("node:fs"),
  path = require("node:path");
const url = process.env.QA_URL || "http://127.0.0.1:4183/",
  label = process.env.QA_BROWSER_LABEL || "chrome",
  executablePath = process.env.QA_BROWSER || undefined,
  sizes = [
    [360, 640],
    [390, 844],
    [430, 932],
    [800, 450],
    [1024, 768],
    [1366, 768],
    [1600, 900],
    [1920, 1080],
  ],
  shots = path.resolve("docs/qa/v2.11.0-c024", label.toLowerCase());
const completed = (id, stars, xp) => ({
    run: {
      caseId: id,
      status: "completed",
      scene: 6,
      cluesFound: 5,
      foundClues: [0, 1, 2, 3, 4],
    },
    record: { caseId: id, status: "completed", stars, xpEarned: xp },
  }),
  seed = {
    version: 2,
    activeCase: "C023",
    muted: false,
    cases: {
      C020: completed("C020", 5, 550),
      C021: completed("C021", 4, 520),
      C022: completed("C022", 4, 540),
      C023: completed("C023", 5, 560),
    },
  };
async function setup(page) {
  await page.addInitScript((value) => {
    if (!localStorage.getItem("detektif-bahasa-v1"))
      localStorage.setItem("detektif-bahasa-v1", JSON.stringify(value));
    sessionStorage.setItem("detektif-bahasa-zilteroka-intro-v1", "seen");
  }, seed);
  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(() => {
    titleOpen = false;
    switchCase("C024");
    home = false;
    render();
  });
}
async function layout(page, w, h) {
  const result = await page.evaluate(() => ({
    overflow:
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth,
    spots: [...document.querySelectorAll(".scene-hotspot")]
      .filter((e) => e.offsetParent)
      .map((e) => {
        const r = e.getBoundingClientRect();
        return { w: r.width, h: r.height, label: e.getAttribute("aria-label") };
      }),
    clipped: [...document.querySelectorAll("button")]
      .filter(
        (e) =>
          e.offsetParent &&
          !e.closest(
            ".scene-canvas,.scene-scroll,.scene-scroll-shell,.investigation-scene",
          ),
      )
      .map((e) => {
        const r = e.getBoundingClientRect();
        return {
          left: r.left,
          right: r.right,
          text: e.textContent.trim().slice(0, 30),
        };
      })
      .filter((r) => r.left < -2 || r.right > innerWidth + 2),
  }));
  assert.ok(result.overflow <= 1, `${w}x${h} overflow ${result.overflow}`);
  assert.equal(result.spots.length, 5);
  assert.ok(result.spots.every((s) => s.w >= 44 && s.h >= 44 && s.label));
  assert.deepEqual(result.clipped, []);
}
(async () => {
  fs.mkdirSync(shots, { recursive: true });
  const browser = await chromium.launch({
      headless: true,
      ...(executablePath ? { executablePath } : {}),
    }),
    errors = [];
  for (const [w, h] of sizes) {
    const context = await browser.newContext({
        viewport: { width: w, height: h },
        hasTouch: w <= 390,
        isMobile: w <= 390,
      }),
      page = await context.newPage();
    page.on("pageerror", (e) => errors.push(`${w}x${h}: ${e.message}`));
    await setup(page);
    await page.locator('[data-action="next"]').click();
    await layout(page, w, h);
    assert.match(
      await page.locator(".scene-image").getAttribute("src"),
      /dataran-pameran-c024\.webp/,
    );
    if ([360, 800, 1920].includes(w))
      await page.screenshot({
        path: path.join(shots, `scene-${w}x${h}.png`),
        fullPage: true,
      });
    await context.close();
  }
  const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      hasTouch: true,
      isMobile: true,
    }),
    page = await context.newPage();
  page.on("pageerror", (e) => errors.push(`flow: ${e.message}`));
  await setup(page);
  await page.screenshot({
    path: path.join(shots, "briefing.png"),
    fullPage: true,
  });
  await page.locator('[data-action="next"]').tap();
  for (const id of [
    "catatan pengunjung",
    "panduan pengelola",
    "kad paparan",
    "galeri gambar",
    "panduan pameran",
  ]) {
    await page.locator(`[data-object="${id}"]`).tap();
    assert.ok(await page.locator(".context-source").isVisible());
    if (["galeri gambar", "panduan pameran"].includes(id))
      await page.screenshot({
        path: path.join(shots, `${id.replaceAll(" ", "-")}.png`),
        fullPage: true,
      });
    await page.locator('[data-c024-action="close-source"]').tap();
  }
  assert.equal(await page.evaluate(() => state.cluesFound), 5);
  await page.locator('[data-c024-action="context"]').tap();
  await page.screenshot({
    path: path.join(shots, "kanta-konteks-start.png"),
    fullPage: true,
  });
  const maps = await page.evaluate(() =>
    c024Mappings.map((m) => ({
      id: m.id,
      station: m.station,
      context: m.contexts[0],
      meaning: m.meaning,
      visual: m.visual,
    })),
  );
  for (let i = 0; i < maps.length; i++) {
    const m = maps[i];
    await page.locator(`[data-c024-station="${m.station}"]`).tap();
    await page.locator(`[data-c024-record="${m.id}"]`).tap();
    if (i === 0) {
      await page
        .locator(
          `[data-c024-context="${m.id === "A1" ? "Pertandingan bahasa" : "x"}"]`,
        )
        .tap();
      await page.locator(`[data-c024-meaning="${m.meaning}"]`).tap();
      await page.locator(`[data-c024-visual="${m.visual}"]`).tap();
      await page
        .locator(`[data-c024-action="verify-mapping"][data-map-id="${m.id}"]`)
        .tap();
      assert.ok(await page.locator(".feedback.wrong").isVisible());
    }
    await page.locator(`[data-c024-context="${m.context}"]`).tap();
    await page.locator(`[data-c024-meaning="${m.meaning}"]`).tap();
    await page.locator(`[data-c024-visual="${m.visual}"]`).tap();
    await page
      .locator(`[data-c024-action="verify-mapping"][data-map-id="${m.id}"]`)
      .tap();
    assert.equal(await page.evaluate((id) => state.mappings[id], m.id), true);
    if (i === 1) {
      await page.screenshot({
        path: path.join(shots, "kanta-konteks-partial.png"),
        fullPage: true,
      });
      await page.reload({ waitUntil: "networkidle" });
      await page.evaluate(() => {
        titleOpen = false;
        switchCase("C024");
        home = false;
        render();
      });
      assert.equal(
        await page.evaluate(
          () => Object.values(cases.C024.run.mappings).filter(Boolean).length,
        ),
        2,
      );
    }
  }
  assert.equal(await page.evaluate(() => c024AllMappings()), true);
  await page.screenshot({
    path: path.join(shots, "penerangan-disahkan.png"),
    fullPage: true,
  });
  await page.locator('[data-c024-action="board"]').tap();
  await page.locator('[data-c024-board-evidence="0"]').tap();
  await page.locator('[data-c024-action="check-board-step"]').tap();
  assert.ok(await page.locator(".feedback.wrong").isVisible());
  await page.locator('[data-c024-board-evidence="2"]').tap();
  await page.locator('[data-c024-action="check-board-step"]').tap();
  for (const n of [1, 3])
    await page.locator(`[data-c024-board-evidence="${n}"]`).tap();
  await page.locator('[data-c024-action="check-board-step"]').tap();
  for (const n of [0, 1, 4])
    await page.locator(`[data-c024-board-evidence="${n}"]`).tap();
  await page.locator('[data-c024-action="check-board-step"]').tap();
  await page.screenshot({
    path: path.join(shots, "evidence-board.png"),
    fullPage: true,
  });
  await page.locator('[data-c024-action="finish-board"]').tap();
  await page.locator('[data-c024-deduction="cause:0"]').tap();
  assert.ok(await page.locator(".feedback.wrong").isVisible());
  await page.locator('[data-c024-deduction="cause:1"]').tap();
  await page.locator('[data-c024-deduction="solution:0"]').tap();
  assert.ok(await page.locator(".feedback.wrong").isVisible());
  await page.locator('[data-c024-deduction="solution:2"]').tap();
  await page.waitForSelector("text=KES 024 SELESAI");
  assert.equal(await page.evaluate(() => state.xpEarned), 580);
  assert.equal(await page.evaluate(() => state.stars), 5);
  assert.equal(
    await page.evaluate(() =>
      achievementDefinitions.find((a) => a.id === "A31").unlocked(),
    ),
    true,
  );
  await page.screenshot({
    path: path.join(shots, "resolution.png"),
    fullPage: true,
  });
  await page.locator('[data-lensa-action="open"]').tap();
  for (const answer of ["1", "0", "2"])
    await page.locator(`[data-lensa-answer="${answer}"]`).tap();
  assert.ok(await page.locator(".lensa-success").isVisible());
  await page.screenshot({
    path: path.join(shots, "lensa.png"),
    fullPage: true,
  });
  await page.locator('[data-lensa-action="close"]').tap();
  await page
    .getByRole("button", { name: "Kembali ke Agensi", exact: true })
    .tap();
  const agency = await page.locator("body").innerText();
  assert.match(agency, /FAIL KELIMA/);
  assert.doesNotMatch(agency, /JEJAK MAKNA BAYURAYA/);
  assert.match(agency, /4\/5/);
  await page.screenshot({
    path: path.join(shots, "fail-kelima-4-of-5.png"),
    fullPage: true,
  });
  await page.evaluate(() => {
    switchCase("C024");
    home = false;
    render();
  });
  await page.locator('[data-action="replay"]').tap();
  assert.equal(await page.evaluate(() => state.cluesFound), 0);
  assert.equal(await page.evaluate(() => cases.C024.record.xpEarned), 580);
  await page.locator("#sound").tap();
  await page.reload({ waitUntil: "networkidle" });
  assert.match(await page.locator("#sound").textContent(), /Mati/);
  assert.deepEqual(errors, []);
  await context.close();
  await browser.close();
  console.log(
    `PASS: v2.11.0 C024 full real ${label} journey and eight-view responsive QA.`,
  );
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
