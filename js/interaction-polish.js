(()=>{
 /* Adapts navbar contrast to the current screen. Does not change routing. */
 const nav=document.getElementById('siteNav');
 const hero=document.getElementById('hero');
 const galleryData={
  'Blue Hour Campus':()=>document.querySelector('#hero .model-wrap > img.model:not(.dz-female-model):not(.dz-jumper-model)')?.src,
  'Soft Street City Girl':()=>document.querySelector('#hero .model-wrap > img.dz-female-model')?.src,
  'Urban Motion':()=>document.querySelector('#hero .model-wrap > img.dz-jumper-model')?.src
 };
 const currentMode=()=>{
  const active=nav?.querySelector('a.active[data-page]');
  document.body.classList.toggle('dz-collection-view',!!active&&active.dataset.page!=='home');
 };
 currentMode();
 const navObserver=new MutationObserver(currentMode);
 if(nav)navObserver.observe(nav,{attributes:true,attributeFilter:['class'],subtree:true});
 /* Replace generic demo art with authentic model photographs already embedded in the page.
    When a product has its own anh, preserve it untouched. */
 const enhanceCard=tile=>{
  if(tile.dataset.premiumDone)return;
  const name=tile.querySelector('h3')?.textContent?.trim();
  if(!galleryData[name])return;
  const art=tile.querySelector('.look-art');
  if(!art)return;
  const source=galleryData[name]();
  if(!source)return;
  const photo=document.createElement('img');
  photo.className='dz-editorial-portrait';
  photo.src=source;
  photo.alt='Người mẫu trình diễn '+name;
  photo.loading='lazy';
  photo.decoding='async';
  art.replaceWith(photo);
  tile.dataset.premiumDone='1';
 };
 const enhanceGallery=()=>{
  document.querySelectorAll('.next .look-tile').forEach(enhanceCard);
 };
 const observer=new MutationObserver(enhanceGallery);
 observer.observe(document.body,{childList:true,subtree:true});
 enhanceGallery();
 /* Keyboard and pointer controls are deliberately unchanged; reduced-motion is respected. */
})();
