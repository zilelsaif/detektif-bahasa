// v2.7.0 — ZilTeroka ecosystem presentation and discovery panel.
(()=>{
 const INTRO_KEY='detektif-bahasa-zilteroka-intro-v1';
 const intro=document.querySelector('#zilteroka-intro');
 const skip=document.querySelector('#zilteroka-intro-skip');
 const dialog=document.querySelector('#zilteroka-dialog');
 const agencyTrigger=document.querySelector('#zilteroka-nav');
 let introTimer=0,introClosing=false,returnFocus=null;
 const focusable='a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])';
 const sessionSeen=()=>{try{return sessionStorage.getItem(INTRO_KEY)==='seen'}catch{return false}};
 const markSession=()=>{try{sessionStorage.setItem(INTRO_KEY,'seen')}catch{}};
 function dismissIntro(){
  if(!intro||introClosing)return;
  introClosing=true;clearTimeout(introTimer);intro.classList.add('is-leaving');
  const finish=()=>{intro.remove();document.querySelector('[data-title-navigation-action]')?.focus({preventScroll:true})};
  matchMedia?.('(prefers-reduced-motion: reduce)')?.matches?finish():setTimeout(finish,280);
 }
 if(intro){
  if(sessionSeen())intro.remove();
  else{
   markSession();
   skip?.addEventListener('click',dismissIntro,{once:true});
   intro.querySelector('img')?.addEventListener('error',dismissIntro,{once:true});
   introTimer=setTimeout(dismissIntro,3200);
   requestAnimationFrame(()=>skip?.focus({preventScroll:true}));
  }
 }
 function closeConflictingModal(){
  return [...document.querySelectorAll('.lensa-dialog,.character-pose-dialog,.character-pose-modal,.character-showcase,.poster-reveal,.support-qr-lightbox')]
   .some(element=>!element.hidden&&element.getClientRects().length>0);
 }
 function openPanel(trigger){
  if(!dialog||!dialog.hidden||closeConflictingModal())return;
  returnFocus=trigger||document.activeElement;
  dialog.hidden=false;
  document.body.classList.add('zilteroka-modal-open');
  dialog.querySelector('[data-zilteroka-close]')?.focus({preventScroll:true});
 }
 function closePanel(){
  if(!dialog||dialog.hidden)return;
  dialog.hidden=true;
  document.body.classList.remove('zilteroka-modal-open');
  if(returnFocus?.isConnected)returnFocus.focus({preventScroll:true});
  returnFocus=null;
 }
 agencyTrigger?.addEventListener('click',event=>openPanel(event.currentTarget));
 document.addEventListener('click',event=>{
  const trigger=event.target.closest?.('[data-zilteroka-open]');
  if(trigger){event.preventDefault();openPanel(trigger);return}
  if(event.target.closest?.('[data-zilteroka-close]'))closePanel();
 });
 dialog?.addEventListener('click',event=>{if(event.target===dialog)closePanel()});
 dialog?.addEventListener('keydown',event=>{
  if(event.key==='Escape'){event.preventDefault();closePanel();return}
  if(event.key!=='Tab')return;
  const items=[...dialog.querySelectorAll(focusable)].filter(item=>!item.hidden&&item.getClientRects().length);
  if(!items.length)return;
  const first=items[0],last=items.at(-1);
  if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
  else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
 });
 window.addEventListener('pageshow',event=>{if(event.persisted&&sessionSeen()&&intro?.isConnected)intro.remove()});
})();
