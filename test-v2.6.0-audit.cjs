const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');

const setup=fs.readFileSync('test-game.cjs','utf8').split(/\r?\n/).slice(0,3).join('\n');
const context={require,console,process};
vm.createContext(context);
vm.runInContext(`${setup};globalThis.auditGame=boot(false,true,true,true,true,true)`,context);
const game=context.auditGame;
const run=expression=>game.run(expression);
const json=expression=>JSON.parse(run(`JSON.stringify(${expression})`));

assert.equal(run('KEY'),'detektif-bahasa-v1');
assert.equal(run('RELEASE'),'v2.6.0 by Zil-el-Saif');
assert.equal(run('allCases.length'),20);
assert.equal(run('Object.keys(locations).length'),12);
assert.equal(run('Object.keys(characters).length'),24);
assert.equal(run('achievementDefinitions.length'),27);
assert.equal(run('Object.keys(lensaActivities).length'),15);
assert.equal(run('getMaximumStars()'),86);
assert.equal(run('allCases.reduce((sum,item)=>sum+item.maxXP,0)'),7020);
assert.equal(run('c020Meta.maxStars'),5);
assert.equal(run('c020Meta.maxXP'),550);

const clueLengths=json(`[
 clues1,clues2,clues3,clues4,clues5,
 secondArcClues.C006,secondArcClues.C007,secondArcClues.C008,secondArcClues.C009,secondArcClues.C010,
 thirdArcClues.C011,thirdArcClues.C012,thirdArcClues.C013,thirdArcClues.C014,
 c015Clues,c016Clues,c017Clues,c018Clues,c019Clues,c020Clues
].map(list=>list.length)`);
assert.deepEqual(clueLengths,Array(20).fill(5));

const cases=json('allCases');
assert.deepEqual(cases.map(item=>item.id),Array.from({length:20},(_,i)=>`C${String(i+1).padStart(3,'0')}`));
for(const item of cases)assert.ok(item.title&&item.maxStars>0&&item.maxXP>0,`${item.id} metadata`);

const sceneEntries=json('Object.entries(scenes)');
for(const [sceneId,scene] of sceneEntries){
 assert.ok(scene.id&&scene.image&&Array.isArray(scene.hotspots),`${sceneId} structure`);
 assert.ok(fs.existsSync(scene.image.split('?')[0]),`${sceneId} image exists: ${scene.image}`);
 const ids=new Set;
 for(const hotspot of scene.hotspots){
  assert.ok(hotspot.id&&hotspot.label,`${sceneId} semantic hotspot`);
  assert.equal(ids.has(hotspot.id),false,`${sceneId} duplicate hotspot ${hotspot.id}`);
  ids.add(hotspot.id);
  for(const key of ['x','y','w','h'])assert.ok(Number.isFinite(hotspot[key]),`${sceneId}.${hotspot.id}.${key}`);
  assert.ok(hotspot.x>=0&&hotspot.y>=0&&hotspot.w>0&&hotspot.h>0,`${sceneId}.${hotspot.id} positive geometry`);
  assert.ok(hotspot.x+hotspot.w<=100&&hotspot.y+hotspot.h<=100,`${sceneId}.${hotspot.id} bounded geometry`);
 }
}

const assetPaths=[
 ...json('allCases.map(item=>scenes[item.scene]?.image).filter(Boolean)'),
 ...json('Object.values(characters).flatMap(item=>[item.portrait,item.pose]).filter(Boolean)'),
 ...json('achievementDefinitions.map(item=>item.icon).filter(Boolean)')
];
for(const asset of new Set(assetPaths.map(path=>path.split('?')[0]).filter(path=>/[\\/]/.test(path))))assert.ok(fs.existsSync(asset),`asset exists: ${asset}`);

assert.equal(run("secondArcClues.C008[0].includes('janji temu')"),true);
assert.equal(run("scenes.vetClinic.hotspots.find(item=>item.id==='papan temujanji').label"),'Papan janji temu');
assert.equal(run("evidenceRelations.C008[0]"),'mempunyai janji temu');
assert.equal(run("lensaActivities.C008.sourceExcerpt.includes('janji temu')"),true);

run("for(const item of allCases)cases[item.id].record={caseId:item.id,status:'completed',stars:item.maxStars,xpEarned:item.maxXP}");
assert.equal(run('getTotalBestStars()'),86);
assert.equal(run('getTotalBestXP()'),7020);
assert.equal(run('achievementDefinitions.filter(item=>item.unlocked()).length'),27);
const recordsBefore=run('JSON.stringify(Object.fromEntries(Object.entries(cases).map(([id,value])=>[id,value.record])))');
run("activeCase='C020';state=fresh20();cases.C020.run=state;record=cases.C020.record;restartCurrentCaseRun()");
assert.equal(run('JSON.stringify(Object.fromEntries(Object.entries(cases).map(([id,value])=>[id,value.record])))'),recordsBefore);
assert.equal(run('getTotalBestXP()'),7020);

const rewardBefore=run("JSON.stringify({xp:cases.C008.record.xpEarned,stars:cases.C008.record.stars,clues:cases.C008.run.cluesFound})");
run("activeCase='C008';state=cases.C008.run;record=cases.C008.record;lensaBahasa.C008={completed:false};completeLensa(lensaActivities.C008)");
assert.equal(run("JSON.stringify({xp:cases.C008.record.xpEarned,stars:cases.C008.record.stars,clues:cases.C008.run.cluesFound})"),rewardBefore);

const source=fs.readFileSync('game.js','utf8')+fs.readFileSync('arc2.js','utf8')+fs.readFileSync('arc3.js','utf8')+fs.readFileSync('arc4.js','utf8')+fs.readFileSync('arc5.js','utf8')+fs.readFileSync('arc6.js','utf8');
assert.equal(/\bC021\b|FAIL KELIMA/i.test(source),false);
assert.equal(fs.readFileSync('index.html','utf8').includes('v2.6.0 by Zil-el-Saif'),true);
assert.equal(fs.readFileSync('README.md','utf8').includes('20 kes, 12 lokasi, 24 watak dan 27 pencapaian'),true);

console.log('PASS: v2.6.0 invariants, five clues per case, scene/assets, standard Malay terminology, historical scoring, Lensa isolation and release metadata.');
