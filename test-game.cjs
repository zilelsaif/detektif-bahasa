const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
let store={};
function boot(){
 const nodes={};
 const ctx={document:{querySelector:s=>nodes[s]??=({innerHTML:'',textContent:'',setAttribute(){},addEventListener(t,fn){const prior=this[t];this[t]=e=>{if(prior)prior(e);fn(e)}}})},localStorage:{getItem:k=>store[k],setItem:(k,v)=>store[k]=v},window:{scrollTo(){}},console};
 vm.createContext(ctx);vm.runInContext(fs.readFileSync('game.js','utf8'),ctx);
 return{run:c=>vm.runInContext(c,ctx),click:data=>nodes['#app'].click({target:{closest:()=>({dataset:data})}}),nodes};
}
function validateScene(g,name,ids){
 const data=JSON.parse(g.run(`JSON.stringify(scenes.${name}.hotspots)`));
 assert.deepEqual(data.map(h=>h.id),ids);assert.equal(new Set(data.map(h=>h.id)).size,ids.length);
 assert.ok(data.every(h=>h.x>=0&&h.y>=0&&h.x+h.w<=100&&h.y+h.h<=100));
 for(let i=0;i<data.length;i++)for(let j=i+1;j<data.length;j++){const a=data[i],b=data[j],overlap=a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;assert.equal(overlap,false,`${name}: ${a.id} bertindih dengan ${b.id}`)}
}
let g=boot();
validateScene(g,'classroom',['kertas kecil','kerusi','buku','kotak pensel','botol air','beg','meja']);
validateScene(g,'library',['rak buku','kotak pemulangan','papan kenyataan','meja membaca','pustakawan','kaunter','beg perpustakaan']);
assert.equal(g.run(`renderScene(scenes.classroom,'beg').includes('data-object="beg"')`),true);
assert.equal(g.run(`renderScene(scenes.library,'beg perpustakaan').includes('aria-label="Beg merah"')`),true);
assert.equal(g.run(`renderScene(null,'beg perpustakaan').includes('data-object="beg perpustakaan"')`),true);
const a=x=>g.click({action:x}),answer=x=>g.click({answer:x}),obj=x=>g.click({object:x});
a('start');a('next');a('next');a('next');assert.equal(g.run('state.scene'),2);
obj('buku');assert.equal(g.run('kluMode()'),'thinking');obj('beg');assert.equal(g.run('kluMode()'),'excited');obj('kerusi');
a('next');a('note');a('next');answer('Aynaa');a('next');answer('membawa');a('next');answer('perpustakaan');a('next');a('library');
assert.equal(g.run('state.scene'),8);assert.equal(g.run('state.cluesFound'),4);
obj('rak buku');assert.equal(g.run('kluMode()'),'thinking');a('hint');a('hint');a('hint');assert.equal(g.run(`state.hintLevels['8:beg perpustakaan']`),3);assert.equal(g.run(`renderScene(scenes.library,'beg perpustakaan').includes('hint-target')`),true);
obj('beg perpustakaan');assert.equal(g.run('state.cluesFound'),4);assert.equal(g.run(`activeSceneTask().target`),'pustakawan');a('hint');a('hint');a('hint');assert.equal(g.run(`state.hintLevels['8:pustakawan']`),3);
g=boot();assert.equal(g.run(`state.sceneProgress.library.includes('beg perpustakaan')`),true);assert.equal(g.run(`activeSceneTask().target`),'pustakawan');
let click=x=>g.click(x);click({object:'kaunter'});assert.equal(g.run('kluMode()'),'thinking');click({object:'pustakawan'});assert.equal(g.run('state.libraryEntered'),true);assert.equal(g.run('state.cluesFound'),4);
g=boot();click=x=>g.click(x);assert.equal(g.run('state.libraryEntered'),true);click({answer:'membaca'});assert.equal(g.run('state.cluesFound'),4);click({answer:'menyerahkan'});assert.equal(g.run('state.cluesFound'),5);assert.equal(g.run('!!state.solved[8]'),true);
click({action:'next'});click({action:'check'});assert.equal(g.run('!!state.solved[9]'),false);g.run("state.links=['memiliki','membawa','dibawa ke']");click({action:'check'});click({action:'next'});click({theory:'2'});assert.equal(g.run('state.status'),'in_progress');click({theory:'1'});assert.equal(g.run('state.cluesFound'),5);assert.equal(g.run('kluMode()'),'celebrate');click({action:'next'});assert.equal(g.run('state.scene'),12);
g=boot();assert.equal(g.run('state.status'),'completed');const best=g.run('state.xpEarned');g.click({action:'start'});g.click({action:'replay'});assert.equal(g.run('state.cluesFound'),0);assert.equal(g.run('record.xpEarned'),best);assert.deepEqual(JSON.parse(g.run('JSON.stringify(state.sceneProgress)')),{});
g.click({action:'next'});g.click({action:'next'});g.click({action:'hint'});g.click({action:'hint'});g.click({action:'hint'});g.click({action:'hint'});assert.equal(g.run('state.hintsUsed'),3);g=boot();assert.equal(g.run('state.hintLevels[2]'),3);g.nodes['#sound'].onclick();g=boot();assert.equal(g.run('muted'),true);
store={'detektif-bahasa-v1':JSON.stringify({run:{caseId:'Y2-C001',scene:8,cluesFound:4,objects:['beg','kerusi'],solved:{2:true,3:true,4:true,5:true,6:true},hintLevels:{},errors:{},links:['','',''],libraryEntered:true},muted:false})};
g=boot();assert.equal(g.run('state.libraryEntered'),true);assert.equal(g.run('state.cluesFound'),4);assert.deepEqual(JSON.parse(g.run('JSON.stringify(state.sceneProgress)')),{});g.click({action:'start'});assert.equal(g.run(`document.querySelector('#app').innerHTML.includes('menyerahkan')`),true);
console.log('PASS: shared scenes, library targets/hints/fallback/save, classroom regression, 5 clues, board, deduction, replay and audio.');
