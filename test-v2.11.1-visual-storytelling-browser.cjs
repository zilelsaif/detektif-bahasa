const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const url = process.env.QA_URL || "http://127.0.0.1:4184/";
const label = (process.env.QA_BROWSER_LABEL || "chrome").toLowerCase();
const executablePath = process.env.QA_BROWSER || undefined;
const sizes = [[360,640],[390,844],[430,932],[800,450],[1024,768],[1366,768],[1600,900],[1920,1080]];
const shots = path.resolve(process.env.QA_SHOTS_DIR || "docs/qa/v2.11.1-visual-storytelling", label);
const complete = (id, stars, xp, scene = 6) => ({
  run: { caseId:id, status:"completed", scene, cluesFound:5, foundClues:[0,1,2,3,4], stars, xpEarned:xp },
  record: { caseId:id, status:"completed", scene, cluesFound:5, foundClues:[0,1,2,3,4], stars, xpEarned:xp },
});
const seed = { version:2, activeCase:"C024", muted:false, cases:{
  C020:complete("C020",5,550), C021:complete("C021",4,520,7),
  C022:complete("C022",4,540), C023:complete("C023",5,560), C024:complete("C024",5,580),
}};

async function setup(page) {
  await page.addInitScript(value => {
    localStorage.setItem("detektif-bahasa-v1", JSON.stringify(value));
    sessionStorage.setItem("detektif-bahasa-zilteroka-intro-v1", "seen");
  }, seed);
  await page.goto(url, { waitUntil:"networkidle" });
}
async function showResolution(page, id) {
  await page.evaluate(id => {
    titleOpen=false; switchCase(id); home=false; file=false;
    state.status="completed"; state.scene=id==="C021"?7:6;
    state.stars=id==="C022"||id==="C021"?4:5;
    state.xpEarned={C021:520,C022:540,C023:560,C024:580}[id]; render();
  }, id);
}
async function assertLayout(page, label) {
  const result = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth-document.documentElement.clientWidth,
    clipped: [...document.querySelectorAll("button")].filter(e=>e.offsetParent).map(e=>e.getBoundingClientRect()).filter(r=>r.left<-2||r.right>innerWidth+2).length,
  }));
  assert.ok(result.overflow<=1, `${label}: page overflow ${result.overflow}`);
  assert.equal(result.clipped,0,`${label}: clipped buttons`);
}

(async()=>{
  fs.mkdirSync(shots,{recursive:true});
  const browser=await chromium.launch({headless:true,...(executablePath?{executablePath}:{})});
  const errors=[];
  for(const [width,height] of sizes){
    const context=await browser.newContext({viewport:{width,height},hasTouch:width<=430,isMobile:width<=430});
    const page=await context.newPage();
    page.on("pageerror",error=>errors.push(`${width}x${height}: ${error.message}`));
    await setup(page);
    for(const id of ["C022","C023","C024"]){
      await showResolution(page,id);
      await assertLayout(page,`${id} ${width}x${height}`);
      await page.waitForFunction(()=>document.querySelector(".integrated-resolution img")?.naturalWidth===1600);
      const visual=await page.locator(".integrated-resolution img").evaluate(img=>({src:img.getAttribute("src"),naturalWidth:img.naturalWidth,naturalHeight:img.naturalHeight,width:img.getBoundingClientRect().width}));
      assert.match(visual.src,new RegExp(`${id.toLowerCase().replace("c0", "c0")}|resolusi-c0${id.slice(2)}`));
      assert.equal(visual.naturalWidth,1600); assert.equal(visual.naturalHeight,900); assert.ok(visual.width>250);
      assert.equal(await page.locator(".resolution-pose-card").count(),0);
      if((width===360&&height===640)||(width===800&&height===450)||(width===1920&&height===1080))
        await page.screenshot({path:path.join(shots,`${id.toLowerCase()}-${width}x${height}.png`),fullPage:true});
    }
    await showResolution(page,"C021");
    assert.equal(await page.locator(".resolution-scene").count(),1);
    assert.equal(await page.locator(".resolution-scene .resolution-character").count(),2);
    await assertLayout(page,`C021 ${width}x${height}`);
    await context.close();
  }
  const context=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true});
  const page=await context.newPage(); await setup(page);
  await page.evaluate(()=>{titleOpen=false;switchCase("C024");home=false;file=false;state=normalizeC024(fresh24());cases.C024.run=state;state.scene=2;state.foundClues=[0,1,2,3,4];state.cluesFound=5;render()});
  const captions=await page.locator(".context-visual-grid.selectable .context-visual>span:last-child").allTextContents();
  assert.deepEqual(captions.map(s=>s.trim()),["Gambar A","Gambar B","Gambar C","Gambar D","Gambar E","Gambar F"]);
  await page.waitForFunction(()=>[...document.querySelectorAll(".context-visual-grid.selectable .context-visual img")].every(img=>img.complete&&img.naturalWidth===768));
  const alts=await page.locator(".context-visual-grid.selectable .context-visual img").evaluateAll(images=>images.map(img=>({alt:img.alt,loaded:img.complete&&img.naturalWidth===768})));
  assert.ok(alts.every(item=>item.alt.length>8&&item.loaded));
  assert.equal((await page.locator("body").innerText()).includes("Bulan di langit malam"),false);
  await page.screenshot({path:path.join(shots,"c024-neutral-grid-mobile.png"),fullPage:true});
  await page.evaluate(()=>{for(const m of c024Mappings){state.mappings[m.id]=true;state.mappingSelections[m.id]={context:m.contexts[0],meaning:m.meaning,visual:m.visual}}render()});
  const completed=await page.locator(".validated-grid .context-visual figcaption").allTextContents();
  assert.ok(completed.some(text=>text.includes("Bulan di langit malam")));
  await page.screenshot({path:path.join(shots,"c024-completed-grid-mobile.png"),fullPage:true});
  await assertLayout(page,"C024 mobile grid");
  assert.deepEqual(errors,[]);
  await context.close(); await browser.close();
  console.log(`PASS: v2.11.1 ${label} eight-viewport integrated resolutions, preserved C021, neutral C024 pre-validation grid and descriptive completed grid.`);
})().catch(error=>{console.error(error);process.exitCode=1});
