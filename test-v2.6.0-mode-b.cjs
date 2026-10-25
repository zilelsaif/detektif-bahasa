const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const A=require('./test-v2.6.0-acceptance.cjs');

const viewport={width:1366,height:768};
const evidence={generatedAt:new Date().toISOString(),mode:'B',browser:'Google Chrome',viewport:'1366x768',cases:[],errors:[]};

async function stageIndependentCase(page,target){
  await page.goto(A.URL,{waitUntil:'domcontentloaded'});
  await page.evaluate(()=>localStorage.removeItem('detektif-bahasa-v1'));
  await page.reload({waitUntil:'domcontentloaded'});
  await page.getByRole('button',{name:/MASUK AGENSI/}).click();
  return page.evaluate(target=>{
    const targetIndex=allCases.findIndex(item=>item.id===target);
    if(targetIndex<0)throw new Error(`Unknown case ${target}`);
    for(let index=0;index<allCases.length;index++){
      const meta=allCases[index];
      const maker=eval(`fresh${index+1}`);
      const run=maker();
      cases[meta.id]={run,record:index<targetIndex?{...run,status:'completed',cluesFound:5,stars:meta.maxStars,xpEarned:meta.maxXP,completedAt:'2026-10-24T00:00:00.000Z'}:null};
    }
    activeCase=target;state=cases[target].run;record=null;home=true;file=false;feedback='';wrong=false;
    closeWorldViews();persist();render();
    return {target,predecessors:allCases.slice(0,targetIndex).map(item=>item.id),targetRun:{scene:state.scene,clues:state.cluesFound,status:state.status},targetRecord:cases[target].record};
  },target);
}

async function openTarget(page,id){
  const n=Number(id.slice(1))-1,arc=Math.floor(n/5);
  const toggle=page.locator(`[data-case-arc="${arc}"]`);
  if(await toggle.count()&&await toggle.getAttribute('aria-expanded')!=='true')await toggle.click();
  const card=page.locator(`[data-case="${id}"]`);
  await card.waitFor({state:'visible'});
  assert.equal(await card.isEnabled(),true,`${id}: case unavailable under valid predecessor fixture`);
  await card.click();
  const opening=await page.locator('main').innerText();
  assert.match(opening,new RegExp(id.replace('C','KES 0*')),`${id}: opening/briefing missing`);
  // C001's established player helper includes its letter-opening start click.
  if(id!=='C001')await A.action(page,'start');
}

async function runCase(browser,id){
  const context=await browser.newContext({viewport,reducedMotion:'reduce'});
  const page=await context.newPage();
  const jsErrors=[];
  page.on('pageerror',error=>jsErrors.push(error.message));
  const fixture=await stageIndependentCase(page,id);
  assert.deepEqual(fixture.targetRun,{scene:0,clues:0,status:'in_progress'});
  assert.equal(fixture.targetRecord,null,`${id}: target record must be empty`);
  await openTarget(page,id);
  await A.players[id](page);
  const result=await page.evaluate(id=>{
    const meta=allCases.find(item=>item.id===id),index=allCases.findIndex(item=>item.id===id);
    const next=index<allCases.length-1?allCases[index+1]:null;
    return {
      status:state.status,scene:state.scene,clues:state.cluesFound,stars:state.stars,xp:state.xpEarned,
      bestStatus:cases[id].record?.status,bestStars:cases[id].record?.stars,bestXP:cases[id].record?.xpEarned,
      expectedStars:meta.maxStars,expectedXP:meta.maxXP,nextId:next?.id||null,nextUnlocked:next?isCaseUnlocked(index+1):null,
      stored:JSON.parse(localStorage.getItem('detektif-bahasa-v1'))?.cases?.[id]?.record?.status
    };
  },id);
  assert.equal(result.status,'completed',`${id}: current run not completed`);
  assert.equal(result.clues,5,`${id}: expected five clues`);
  assert.equal(result.stars,result.expectedStars,`${id}: stars`);
  assert.equal(result.xp,result.expectedXP,`${id}: XP`);
  assert.equal(result.bestStatus,'completed',`${id}: historical record`);
  assert.equal(result.bestStars,result.expectedStars,`${id}: best stars`);
  assert.equal(result.bestXP,result.expectedXP,`${id}: best XP`);
  assert.equal(result.stored,'completed',`${id}: persisted record`);
  assert(await page.getByText(new RegExp(`${id.replace('C','KES ')} SELESAI`)).count(),`${id}: genuine completion screen`);
  if(result.nextId)assert.equal(result.nextUnlocked,true,`${id}: ${result.nextId} did not unlock`);
  assert.deepEqual(jsErrors,[],`${id}: page errors`);
  evidence.cases.push({id,startingFixture:`Completed historical records for ${fixture.predecessors.length} required predecessor case(s); target fresh and unsolved`,browser:'Google Chrome',viewport:'1366x768',realUI:true,opening:true,investigation:true,clues:'5/5',sources:true,puzzles:true,evidence:true,deduction:true,completion:true,score:`${result.stars} stars / ${result.xp} XP`,historicalSave:true,nextUnlock:result.nextId?result.nextUnlocked:'N/A',javascriptErrors:0,result:'PASS'});
  await context.close();
}

(async()=>{
  const browser=await chromium.launch({headless:true,executablePath:A.chrome});
  try{for(const id of A.ids){await runCase(browser,id);console.log(`PASS ${id}`)}}finally{await browser.close()}
  evidence.negativePaths=A.report.negative;
  fs.writeFileSync('docs/v2.6.0-mode-b-qa.json',JSON.stringify(evidence,null,2));
  console.log('PASS: Mode B completed 20/20 independent rendered UI playthroughs.');
})().catch(error=>{
  evidence.failure=String(error.stack||error);
  fs.writeFileSync('docs/v2.6.0-mode-b-qa.json',JSON.stringify(evidence,null,2));
  console.error(error);process.exit(1);
});
