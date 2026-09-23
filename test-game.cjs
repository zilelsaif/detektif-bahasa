const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
let store={};
function boot(){const nodes={};const ctx={document:{querySelector:s=>nodes[s]??=({innerHTML:'',textContent:'',setAttribute(){},addEventListener(t,fn){const prior=this[t];this[t]=e=>{if(prior)prior(e);fn(e)}}})},localStorage:{getItem:k=>store[k],setItem:(k,v)=>store[k]=v},window:{scrollTo(){}},console};vm.createContext(ctx);vm.runInContext(fs.readFileSync('game.js','utf8'),ctx);return{run:c=>vm.runInContext(c,ctx),click:data=>nodes['#app'].click({target:{closest:()=>({dataset:data})}}),nodes}}
function validateScene(g,name,ids){const data=JSON.parse(g.run(`JSON.stringify(scenes.${name}.hotspots)`));assert.deepEqual(data.map(h=>h.id),ids);assert.equal(new Set(data.map(h=>h.id)).size,ids.length);assert.ok(data.every(h=>h.x>=0&&h.y>=0&&h.x+h.w<=100&&h.y+h.h<=100));for(let i=0;i<data.length;i++)for(let j=i+1;j<data.length;j++){const a=data[i],b=data[j],overlap=a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;assert.equal(overlap,false,`${name}: ${a.id} bertindih dengan ${b.id}`)}}
let g=boot();
assert.equal(g.run('unlocked2()'),false);assert.equal(g.run(`homeView().includes('KES 002, terkunci')`),true);
validateScene(g,'classroom',['kertas kecil','kerusi','buku','kotak pensel','botol air','beg','meja']);
validateScene(g,'library',['rak buku','kotak pemulangan','papan kenyataan','meja membaca','pustakawan','kaunter','beg perpustakaan']);
validateScene(g,'mathShop',['papan kenyataan kedai','rak produk','bakul','rak pengambilan','resit ammar','beg biru ammar','beg merah jambu sofia','pekerja kedai','kaunter kedai']);
assert.equal(g.run(`renderScene(null,'beg biru ammar').includes('data-object="beg biru ammar"')`),true);
assert.equal(g.run(`scenes.mathShop.alt.includes('pelekat roket')&&scenes.mathShop.alt.includes('reben putih')`),true);

const a=x=>g.click({action:x}),answer=x=>g.click({answer:x}),obj=x=>g.click({object:x});
// KES 001 regression and unlock
a('start');a('next');a('next');obj('beg');obj('kerusi');a('next');a('note');a('next');answer('Aynaa');a('next');answer('membawa');a('next');answer('perpustakaan');a('next');a('library');obj('beg perpustakaan');obj('pustakawan');answer('menyerahkan');a('next');g.run("state.links=['memiliki','membawa','dibawa ke']");a('check');a('next');g.click({theory:'1'});a('next');
assert.equal(g.run('state.status'),'completed');assert.equal(g.run('state.cluesFound'),5);assert.equal(g.run('unlocked2()'),true);assert.equal(g.run(`homeView().includes('Misteri Label Tertukar')`),true);
const case1Best=g.run('record.xpEarned');

// Select and complete KES 002
g.click({case:'C002'});assert.equal(g.run('activeCase'),'C002');assert.equal(g.run('state.cluesFound'),0);assert.equal(g.run(`homeView().includes('⭐⭐ Jejak Tajam')`),true);
a('start');a('next');assert.equal(g.run('state.scene'),1);obj('bakul');assert.equal(g.run('kluMode()'),'thinking');a('hint');a('hint');a('hint');assert.equal(g.run(`state.hintLevels['1:resit ammar']`),3);obj('resit ammar');assert.equal(g.run('state.cluesFound'),1);a('next');answer('biru');assert.equal(g.run('!!state.solved[2]'),false);answer('kecil');a('next');answer('merah jambu');assert.equal(g.run('state.cluesFound'),2);a('next');obj('beg merah jambu sofia');assert.equal(g.run('!!state.solved[4]'),false);obj('beg biru ammar');assert.equal(g.run('state.cluesFound'),3);a('next');obj('beg merah jambu sofia');assert.equal(g.run('state.cluesFound'),4);a('next');answer('memeriksa');assert.equal(g.run('state.cluesFound'),5);a('next');
a('check2');assert.equal(g.run('!!state.solved[7]'),false);g.run("state.links=['memiliki','memiliki','berlabel','berlabel']");a('check2');a('next');g.click({theory2:'0'});assert.equal(g.run('state.status'),'in_progress');g.click({theory2:'1'});assert.equal(g.run('state.status'),'completed');assert.equal(g.run('state.cluesFound'),5);assert.equal(g.run(`clues[2].includes('SOFIA')&&clues[3].includes('AMMAR')`),true);a('next');assert.equal(g.run('state.scene'),10);
const case2Best=g.run('record.xpEarned');assert.ok(case2Best>=140);

// Per-case state, switching and replay
g.click({case:'C001'});assert.equal(g.run('activeCase'),'C001');assert.equal(g.run('state.status'),'completed');assert.equal(g.run('record.xpEarned'),case1Best);a('start');a('replay');assert.equal(g.run('state.cluesFound'),0);assert.equal(g.run('record.xpEarned'),case1Best);assert.equal(g.run('unlocked2()'),true);
g.click({case:'C002'});assert.equal(g.run('state.status'),'completed');assert.equal(g.run('record.xpEarned'),case2Best);a('start');a('replay');assert.equal(g.run('state.cluesFound'),0);assert.equal(g.run('record.xpEarned'),case2Best);assert.equal(g.run(`cases.C001.record.status`),'completed');
g.nodes['#sound'].onclick();g=boot();assert.equal(g.run('muted'),true);assert.equal(g.run('activeCase'),'C002');

// Legacy v0.3 KES 001 save migration
store={'detektif-bahasa-v1':JSON.stringify({run:{caseId:'Y2-C001',scene:8,cluesFound:4,objects:['beg','kerusi'],solved:{2:true,3:true,4:true,5:true,6:true},hintLevels:{},errors:{},links:['','',''],libraryEntered:true},record:{caseId:'Y2-C001',status:'completed',xpEarned:150,stars:3},muted:false})};
g=boot();assert.equal(g.run('activeCase'),'C001');assert.equal(g.run('state.caseId'),'C001');assert.equal(g.run('state.cluesFound'),4);assert.equal(g.run('unlocked2()'),true);assert.equal(g.run(`cases.C002.run.cluesFound`),0);
console.log('PASS: KES 001 regression, KES 002 unlock/full flow, three shared scenes, five clues, adjectives, labels, board, deduction, per-case saves, replay, sound and legacy migration.');
