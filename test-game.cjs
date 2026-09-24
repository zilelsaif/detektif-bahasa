const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
let store={};
function boot(){const nodes={};const ctx={document:{querySelector:s=>nodes[s]??=({innerHTML:'',textContent:'',setAttribute(){},addEventListener(t,fn){const prior=this[t];this[t]=e=>{if(prior)prior(e);fn(e)}}})},localStorage:{getItem:k=>store[k],setItem:(k,v)=>store[k]=v},window:{scrollTo(){}},console};vm.createContext(ctx);vm.runInContext(fs.readFileSync('game.js','utf8'),ctx);return{run:c=>vm.runInContext(c,ctx),click:data=>nodes['#app'].click({target:{closest:()=>({dataset:data})}}),nodes}}
function validateScene(g,name,ids){const data=JSON.parse(g.run(`JSON.stringify(scenes.${name}.hotspots)`));assert.deepEqual(data.map(h=>h.id),ids);assert.equal(new Set(data.map(h=>h.id)).size,ids.length);assert.ok(data.every(h=>h.x>=0&&h.y>=0&&h.x+h.w<=100&&h.y+h.h<=100));for(let i=0;i<data.length;i++)for(let j=i+1;j<data.length;j++){const a=data[i],b=data[j],overlap=a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;assert.equal(overlap,false,`${name}: ${a.id} bertindih dengan ${b.id}`)}}
let g=boot();
assert.equal(g.run('unlocked2()'),false);assert.equal(g.run(`homeView().includes('KES 002, terkunci')`),true);
validateScene(g,'classroom',['kertas kecil','kerusi','buku','kotak pensel','botol air','beg','meja']);
validateScene(g,'library',['rak buku','kotak pemulangan','papan kenyataan','meja membaca','pustakawan','kaunter','beg perpustakaan']);
validateScene(g,'mathShop',['papan kenyataan kedai','rak produk','bakul','rak pengambilan','resit ammar','beg biru ammar','beg merah jambu sofia','pekerja kedai','kaunter kedai']);
validateScene(g,'readingCorner',['rak biru','cebisan a','kotak kad cerita','meja kecil','cebisan b','meja membaca','cebisan c','troli buku','cebisan d','kotak pemulangan bacaan']);
assert.deepEqual(JSON.parse(g.run('JSON.stringify(fragments)')),['Letakkan kotak kad cerita','di atas meja kecil','di belakang rak biru','selepas waktu rehat.']);
assert.equal(g.run('unlocked3()'),false);assert.equal(g.run(`homeView().includes('KES 003, terkunci')`),true);
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

// KES 003 unlock, fallback, full flow, hints, five-clue boundary and replay
assert.equal(g.run('unlocked3()'),true);g.run("switchCase('C003')");assert.equal(g.run('activeCase'),'C003');assert.equal(g.run('state.cluesFound'),0);assert.equal(g.run(`homeView().includes('⭐⭐⭐ Jejak Cermat')`),true);assert.equal(g.run(`renderScene(null,'cebisan a').includes('data-object="cebisan a"')`),true);
const c3=data=>g.run(`handleCase3Click({dataset:${JSON.stringify(data)}})`);
c3({action:'start'});c3({action:'next'});c3({object:'rak biru'});assert.equal(g.run('state.cluesFound'),0);assert.equal(g.run('wrong'),true);c3({object:'cebisan a'});assert.equal(g.run('state.cluesFound'),0);c3({answer:'kotak kad cerita'});assert.equal(g.run('state.cluesFound'),1);c3({action:'next'});c3({object:'cebisan b'});assert.equal(g.run('state.cluesFound'),2);c3({action:'next'});c3({answer:'meja kecil'});assert.equal(g.run('state.cluesFound'),2);c3({answer:'di belakang rak biru'});assert.equal(g.run('state.cluesFound'),3);c3({action:'next'});c3({answer:'selepas waktu rehat'});assert.equal(g.run('state.cluesFound'),4);c3({action:'next'});
c3({fragment:'2'});assert.equal(g.run('state.sequence.length'),0);c3({action:'hint'});c3({action:'hint'});c3({action:'hint'});assert.equal(g.run(`state.hintLevels['5']`),3);assert.equal(g.run(`feedback.includes('Letakkan kotak kad cerita')`),true);for(const i of [0,1,2,3])c3({fragment:String(i)});assert.equal(g.run('state.sequence.join()'),'0,1,2,3');assert.equal(g.run('state.cluesFound'),4);c3({action:'next'});c3({answer:'selepas'});assert.equal(g.run('state.cluesFound'),4);c3({answer:'di belakang'});c3({action:'next'});c3({object:'meja kecil'});assert.equal(g.run('state.cluesFound'),4);c3({action:'next'});c3({answer:'Ya, satu arahan'});assert.equal(g.run('state.cluesFound'),5);c3({action:'next'});
c3({action:'check3'});assert.equal(g.run('!!state.solved[9]'),false);g.run("state.links=['diikuti oleh','diikuti oleh','diikuti oleh','lokasi']");c3({action:'check3'});c3({action:'next'});c3({theory3:'0'});assert.equal(g.run('state.status'),'in_progress');c3({theory3:'1'});assert.equal(g.run('state.status'),'completed');assert.equal(g.run('state.cluesFound'),5);c3({action:'next'});const case3Best=g.run('record.xpEarned');assert.ok(case3Best>=160);
g.run("switchCase('C001')");assert.equal(g.run(`cases.C003.run.status`),'completed');g.run("switchCase('C003')");c3({action:'start'});c3({action:'replay'});assert.equal(g.run('state.cluesFound'),0);assert.equal(g.run('record.xpEarned'),case3Best);assert.equal(g.run(`cases.C001.record.status`),'completed');assert.equal(g.run(`cases.C002.record.status`),'completed');

// Legacy v0.3 KES 001 save migration
store={'detektif-bahasa-v1':JSON.stringify({run:{caseId:'Y2-C001',scene:8,cluesFound:4,objects:['beg','kerusi'],solved:{2:true,3:true,4:true,5:true,6:true},hintLevels:{},errors:{},links:['','',''],libraryEntered:true},record:{caseId:'Y2-C001',status:'completed',xpEarned:150,stars:3},muted:false})};
g=boot();assert.equal(g.run('activeCase'),'C001');assert.equal(g.run('state.caseId'),'C001');assert.equal(g.run('state.cluesFound'),4);assert.equal(g.run('unlocked2()'),true);assert.equal(g.run(`cases.C002.run.cluesFound`),0);
console.log('PASS: KES 001/002 regression, KES 003 unlock/full flow, four shared scenes, exact fragments, five clues, sequence hints/order, board, deduction, per-case saves, replay, sound, fallback and legacy migration.');
