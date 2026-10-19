// Gallery presentation only: discovery and progression remain derived by the game.
const characterDialogue={
 klu:'Detektif hebat membaca petunjuk sebelum membuat kesimpulan!',
 aynaa:'Saya suka meneliti petunjuk satu demi satu.',
 farah:'Baca dengan teliti. Satu perkataan pun boleh mengubah maksud ayat.',
 hakim:'Saya ceritakan apa yang saya nampak supaya kamu boleh menyemaknya.',
 meiLing:'Mari perhatikan tempat dan benda yang disebut dalam cerita.',
 librarian:'Buku dan maklumat lebih mudah dicari apabila disusun dengan baik.',
 ammar:'Warna, saiz dan tanda khas membantu saya menerangkan pesanan.',
 sofia:'Saya baca label dengan teliti sebelum memilih pesanan.',
 shopWorker:'Mari kita semak catatan pesanan bersama-sama.',
 ivy:'Cebisan kecil pun patut dibaca dengan teliti.',
 kumar:'Di sudut bacaan, saya perhatikan juga benda di sekeliling.',
 maria:'Saya cuba ingat bila sesuatu itu berlaku.',
 azzam:'Saya terangkan apa yang saya lihat mengikut masanya.',
 pakRahim:'Di taman pun, setiap perubahan ada ceritanya.',
 kakSuri:'Kad pesanan membantu saya menyusun kerja di kedai roti.',
 encikHafiz:'Senarai belian memudahkan kita menyemak barang satu demi satu.',
 drHana:'Rekod yang jelas membantu kita menjaga haiwan dengan selamat.',
 puanSuraya:'Maklumat yang dikemas kini memudahkan urusan semua penduduk.',
 ayyash:'Tanda tempat membantu saya mengingati arah perjalanan.',
 affan:'Saya suka membandingkan fakta pameran dengan foto arkib.',
 xiaoFeng:'Cuba perhatikan corak yang berulang sebelum meneka.',
 arissa:'Saya teliti tanda pada kad sebelum mengikuti arahan.',
 emah:'Saya simpan cebisan mesej supaya mudah disusun semula.',
 jagjit:'Rekod yang tepat membantu kita memahami apa yang berlaku.'
};
for(const character of Object.values(characters)){
 character.mugshot=`assets/characters/mugshots/${character.id}.webp`;
 character.pose=character.id==='klu'?'assets/klu.svg':`assets/characters/poses/${character.id}.webp`;
 character.galleryDialogue=characterDialogue[character.id];
}
const characterCardBefore252=characterCard;
characterCard=function(character){
 let html=characterCardBefore252(character);if(!isCharacterDiscovered(character.id))return html;
 return html.replace(`src="${characterPortraitSrc(character)}"`,`src="${character.mugshot}" width="96" height="96" loading="lazy"`).replace('class="character-card discovered',`aria-pressed="${selectedCharacter===character.id}" class="character-card discovered${selectedCharacter===character.id?' character-selected':''}`);
};
const characterDetailBefore252=characterDetail;
characterDetail=function(id){
 const html=characterDetailBefore252(id);if(!id||!characters[id]||!isCharacterDiscovered(id))return html;
 const c=characters[id];return html.replace(/<span class="character-detail-portrait">[\s\S]*?<\/span>/,`<button type="button" class="character-pose-preview" data-character-pose="${id}" aria-label="Lihat ilustrasi besar ${c.name}"><img src="${c.pose}" alt="Pose ${c.name}" width="768" height="1024"><span aria-hidden="true">⌕</span></button>`).replace('<button data-character-back>',`<button type="button" class="primary character-pose-action" data-character-pose="${id}">LIHAT POSE</button><button data-character-back>`);
};
let characterPoseDialog=null,characterPoseOrigin=null,characterPoseScroll=0,characterPoseOverflow=null;
function closeCharacterPose(){if(characterPoseDialog?.open)characterPoseDialog.close()}
function openCharacterPose(id,origin){
 if(!charactersOpen||!characters[id]||!isCharacterDiscovered(id)||characterPoseDialog||(typeof lensaView!=='undefined'&&lensaView))return;
 const c=characters[id];characterPoseOrigin=origin;characterPoseScroll=window.scrollY;
 characterPoseOverflow=[document.documentElement.style.overflow,document.body.style.overflow];
 const dialog=document.createElement('dialog');characterPoseDialog=dialog;dialog.className='character-showcase';dialog.setAttribute('aria-labelledby','character-showcase-title');dialog.setAttribute('aria-modal','true');
 dialog.innerHTML=`<div class="character-showcase-scroll"><button type="button" class="character-showcase-close" aria-label="Tutup ilustrasi ${c.name}">Tutup ✕</button><h2 id="character-showcase-title">${c.name}</h2><div class="character-showcase-content"><img src="${c.pose}" alt="Ilustrasi ${c.name}" width="768" height="1024"><div class="character-speech"><span class="eyebrow">${c.role}</span><p>“${c.galleryDialogue}”</p></div></div></div>`;
 dialog.querySelector('button').addEventListener('click',closeCharacterPose);
 // The close button is the only interactive control; keep Tab in the showcase.
 dialog.addEventListener('keydown',event=>{if(event.key==='Tab'){event.preventDefault();dialog.querySelector('button').focus({preventScroll:true})}});
 dialog.addEventListener('close',()=>{
  const target=characterPoseOrigin,y=characterPoseScroll;document.documentElement.style.overflow=characterPoseOverflow[0];document.body.style.overflow=characterPoseOverflow[1];dialog.remove();characterPoseDialog=null;characterPoseOrigin=null;characterPoseOverflow=null;target?.focus?.({preventScroll:true});window.scrollTo(0,y);
 },{once:true});
 document.body.append(dialog);dialog.showModal();document.documentElement.style.overflow='hidden';document.body.style.overflow='hidden';
}
app.addEventListener('click',event=>{if(!charactersOpen)return;const button=event.target.closest?.('[data-character-pose]');if(button)openCharacterPose(button.dataset.characterPose,button)});
