const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');

const base=process.env.QA_URL||'http://127.0.0.1:4173/';
const browsers={Chrome:'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',Edge:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'};
const viewports=[[360,640],[390,844],[430,932],[800,450],[1024,768],[1366,768],[1600,900],[1920,1080]];
const finals={
 C001:{fresh:'fresh1()',scene:10,solved:9,selector:'[data-theory="1"]'},
 C002:{fresh:'fresh2()',scene:8,solved:7,selector:'[data-theory2="1"]'},
 C003:{fresh:'fresh3()',scene:10,solved:9,selector:'[data-theory3="1"]'},
 C004:{fresh:'fresh4()',scene:11,solved:10,selector:'[data-theory4="1"]'},
 C005:{fresh:'fresh5()',scene:11,solved:10,selector:'[data-theory5="2"]'},
 C006:{fresh:'fresh6()',scene:7,solved:6,selector:'[data-second-theory="2"]'},
 C007:{fresh:'fresh7()',scene:7,solved:6,selector:'[data-second-theory="2"]'},
 C008:{fresh:'fresh8()',scene:7,solved:6,selector:'[data-second-theory="2"]'},
 C009:{fresh:'fresh9()',scene:7,solved:6,selector:'[data-second-theory="2"]'},
 C010:{fresh:'fresh10()',scene:7,solved:6,selector:'[data-second-theory="2"]'},
 C011:{fresh:'fresh11()',scene:7,solved:6,selector:'[data-third-theory="2"]'},
 C012:{fresh:'fresh12()',scene:7,solved:6,selector:'[data-c012-theory="0"]'},
 C013:{fresh:'fresh13()',scene:7,solved:6,selector:'[data-c013-theory="2"]'},
 C014:{fresh:'fresh14()',scene:9,solved:8,selector:'[data-c014-theory="2"]'},
 C015:{fresh:'fresh15()',scene:8,solved:7,selector:'[data-c015-theory="2"]'},
 C016:{fresh:'fresh16()',scene:7,solved:6,selector:'[data-c016-theory="2"]'},
 C017:{fresh:'fresh17()',scene:9,solved:8,selector:'[data-c017-theory="2"]'},
 C018:{fresh:'fresh18()',scene:13,solved:12,selector:'[data-c018-theory="2"]'},
 C019:{fresh:'fresh19()',scene:10,solved:9,selector:'[data-c019-theory="2"]'},
 C020:{fresh:'fresh20()',scene:11,solved:10,selector:'[data-c020-theory="2"]'}
};

async function noOverflow(page,label){
 const geometry=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,buttons:[...document.querySelectorAll('button:not([hidden])')].filter(button=>button.offsetParent&&!function(){for(let p=button.parentElement;p;p=p.parentElement){const style=getComputedStyle(p);if(p.scrollWidth>p.clientWidth+1&&/auto|scroll/.test(style.overflowX))return true}return false}()).map(button=>{const r=button.getBoundingClientRect();return{x:r.x,right:r.right,width:r.width,height:r.height,text:button.textContent.trim().slice(0,30)}})}));
 assert.ok(geometry.scroll<=geometry.width+1,`${label}: page overflow ${geometry.scroll}/${geometry.width}`);
 for(const button of geometry.buttons)assert.ok(button.x>=-1&&button.right<=geometry.width+1,`${label}: button outside viewport ${button.text} (${button.x}..${button.right}/${geometry.width})`);
}

(async()=>{
 const report={generatedAt:new Date().toISOString(),browsers:{},casePaths:{}};
 for(const [browserName,executablePath] of Object.entries(browsers)){
  const browser=await chromium.launch({headless:true,executablePath});
  const context=await browser.newContext({viewport:{width:1366,height:768},hasTouch:true,reducedMotion:'reduce'});
  const page=await context.newPage(),errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto(base);
  assert.ok((await page.locator('footer').textContent()).includes('v2.6.0 by Zil-el-Saif'));
  await page.getByRole('button',{name:/MASUK AGENSI/}).click();
  await page.evaluate(()=>{for(const item of allCases)cases[item.id].record={caseId:item.id,status:'completed',stars:item.maxStars,xpEarned:item.maxXP};persist();render()});
  for(const [id,config] of Object.entries(finals)){
   await page.evaluate(({id,config})=>{
    switchCase(id);home=false;file=false;feedback='';wrong=false;
    state=window.eval(config.fresh);state.scene=config.scene;state.cluesFound=5;state.solved[config.solved]=true;
    cases[id].run=state;record=cases[id].record;render();
   },{id,config});
   const button=page.locator(config.selector);
   await button.waitFor({state:'visible'});
   await button.click();
   const completed=await page.evaluate(()=>state.status==='completed'&&state.cluesFound===5);
   assert.equal(completed,true,`${browserName} ${id} rendered completion`);
   report.casePaths[id]??={};report.casePaths[id][browserName]={renderedDeduction:true,completed:true};
  }
  report.browsers[browserName]={viewports:{}};
  for(const [width,height] of viewports){
   await page.setViewportSize({width,height});
   await page.goto(base);
   await page.getByRole('button',{name:/MASUK AGENSI/}).click();
   await page.evaluate(()=>{for(const item of allCases)cases[item.id].record={caseId:item.id,status:'completed',stars:item.maxStars,xpEarned:item.maxXP};titleOpen=false;parentOpen=false;mapOpen=false;achievementsOpen=false;charactersOpen=false;guideOpen=false;home=true;render();scrollTo(0,0)});
   await noOverflow(page,`${browserName} agency ${width}x${height}`);
   for(const [selector,name] of [['#map-nav','map'],['#achievements-nav','achievements'],['#characters-nav','characters'],['#guide-nav','guide']]){
    await page.locator(selector).click();await noOverflow(page,`${browserName} ${name} ${width}x${height}`);
    await page.locator('#title-nav').click();await page.locator('[data-title-navigation-action="agency"]').click();
   }
   if((width===390&&height===844)||(width===1366&&height===768))await page.screenshot({path:`docs/v2.6.0-${browserName.toLowerCase()}-${width}x${height}.png`,fullPage:true});
   report.browsers[browserName].viewports[`${width}x${height}`]={noPageOverflow:true,majorViews:true};
  }
  assert.deepEqual(errors,[],`${browserName} page errors`);
  report.browsers[browserName].pageErrors=errors;
  await browser.close();
 }
 fs.writeFileSync('docs/v2.6.0-browser-qa.json',JSON.stringify(report,null,2));
 console.log('PASS: Chrome/Edge rendered completion for C001-C020 and eight-viewport major-screen geometry.');
})().catch(error=>{console.error(error);process.exit(1)});
