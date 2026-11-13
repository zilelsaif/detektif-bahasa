const assert=require('node:assert/strict');
class MemoryStorage{constructor(seed={}){this.data=new Map(Object.entries(seed));this.failSet=false}getItem(k){return this.data.has(k)?this.data.get(k):null}setItem(k,v){if(this.failSet)throw new Error('QuotaExceededError');this.data.set(k,String(v))}removeItem(k){this.data.delete(k)}clear(){this.data.clear()}}
const fresh=(legacy=null)=>{global.localStorage=new MemoryStorage(legacy?{'detektif-bahasa-v1':JSON.stringify(legacy)}:{});global.sessionStorage=new MemoryStorage();delete require.cache[require.resolve('./profile-store.js')];return require('./profile-store.js')};
const legacy={version:2,activeCase:'C025',cases:{C001:{run:{status:'completed'},record:{status:'completed',stars:3,xpEarned:150}},C025:{run:{status:'in_progress',scene:4},record:null}},muted:true,lensaBahasa:{seen:['C001']},futureField:{kept:true}};
{
 const store=fresh(legacy),reg=store.bootstrap();
 assert.equal(reg.profiles.length,1);assert.equal(reg.profiles[0].name,'Detektif Asal');assert.equal(reg.migration.status,'complete');
 assert.deepEqual(JSON.parse(localStorage.getItem(store.LEGACY_KEY)),legacy,'legacy backup must remain byte-equivalent as data');
 store.bootstrap();assert.equal(store.registry().profiles.length,1,'migration must be idempotent');
 store.select(reg.profiles[0].id);assert.deepEqual(store.loadActiveSnapshot(),legacy,'all known and unknown snapshot fields migrate');
 const before=store.readEnvelope(reg.profiles[0].id).revision;assert.equal(store.saveActive({...legacy,activeCase:'C001'}).ok,true);assert.equal(store.readEnvelope(reg.profiles[0].id).revision,before+1);
 sessionStorage.setItem(store.TAB_KEY,JSON.stringify({id:reg.profiles[0].id,revision:before}));
 assert.equal(store.saveActive(legacy).reason,'conflict','stale tab must not overwrite newer profile');
}
{
 const store=fresh();store.bootstrap();
 for(let i=0;i<5;i++)assert.equal(store.create(`Detektif ${i+1}`,store.AVATARS[i],{version:2,cases:{}}).ok,true);
 assert.equal(store.create('Keenam','peta',{version:2,cases:{}}).ok,false);assert.equal(store.registry().profiles.length,5);
 assert.equal(store.create('', 'lensa',{}).ok,false);assert.equal(store.create('12345678901234567','lensa',{}).ok,false);
 const first=store.registry().profiles[0];assert.equal(store.update(first.id,{name:'  Nama   Baharu ',avatar:'peta'}).profile.name,'Nama Baharu');
 store.select(first.id);store.saveActive({version:2,cases:{C001:{record:{status:'completed',stars:3,xpEarned:100}}}});
 assert.deepEqual(store.summary(first.id),{completed:1,stars:3,xp:100,activeCase:'C001'});
 assert.equal(store.exportProfile(first.id).format,'detektif-bahasa-profile-backup');
 assert.equal(store.remove(first.id),true);assert.equal(store.registry().profiles.length,4);
}
{
 const store=fresh();store.bootstrap();store.select('guest');assert.equal(store.saveActive({version:2,activeCase:'C003',cases:{}}).ok,true);
 assert.equal(localStorage.getItem(store.SAVE_PREFIX+'guest'),null);assert.ok(sessionStorage.getItem(store.GUEST_KEY));
 sessionStorage.clear();assert.equal(store.loadActiveSnapshot(),null,'guest progress ends with the tab session');
}
{
 const store=fresh(legacy);localStorage.failSet=true;store.bootstrap();assert.match(store.getError(),/QuotaExceededError/);localStorage.failSet=false;
 const reg=store.bootstrap();assert.equal(reg.profiles.length,1,'migration can recover after interrupted storage failure');
}
{
 const store=fresh(),created=store.create('Rosak','nota',{version:2,cases:{}});store.select(created.profile.id);localStorage.setItem(store.SAVE_PREFIX+created.profile.id,'{"schemaVersion":1,"snapshot":');
 assert.equal(store.loadActiveSnapshot(),null);assert.equal(store.saveActive({version:2,cases:{}}).reason,'damaged');assert.match(localStorage.getItem(store.SAVE_PREFIX+created.profile.id),/"snapshot":$/,'damaged source must not be overwritten');
}
{
 const store=fresh(),a={version:2,activeCase:'C025',cases:{C001:{run:{status:'completed'},record:{status:'completed',stars:3,xpEarned:150}},C025:{run:{status:'in_progress',scene:7,foundClues:[0,1,2]},record:{status:'completed',stars:5,xpEarned:620}}},lensaBahasa:{completed:['C001','C025'],progress:{C025:2}},muted:false},b={version:2,activeCase:'C001',cases:{},lensaBahasa:{completed:[]}},c={version:2,activeCase:'C014',cases:{C014:{run:{status:'in_progress',scene:3},record:null}},lensaBahasa:{completed:['C001'],progress:{C014:1}}};
 const pa=store.create('Player A','bintang',a).profile,pb=store.create('Player B','nota',b).profile,pc=store.create('Player C','kompas',c).profile;
 for(const [profile,snapshot] of[[pa,a],[pb,b],[pc,c]]){store.select(profile.id);assert.deepEqual(store.loadActiveSnapshot(),snapshot)}
 store.select(pb.id);assert.equal(store.saveActive({...b,cases:{C001:{run:{status:'in_progress',scene:2},record:null}}}).ok,true);store.select(pa.id);assert.deepEqual(store.loadActiveSnapshot(),a,'advanced profile must remain byte-for-byte unchanged');store.select(pc.id);assert.deepEqual(store.loadActiveSnapshot(),c,'partial case and learning activity must restore');
 assert.deepEqual(store.exportProfile(pa.id).save.snapshot,a,'backup must contain the complete snapshot');
}
console.log('v2.13.0 profile storage: PASS');
