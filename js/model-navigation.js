(()=>{
 const hero=document.getElementById('hero');
 if(!hero)return;
 const observer=new MutationObserver(()=>{
   // Không can thiệp animation của các màn hình; chỉ ngăn model lộ ra ở tab khác.
   const rect=hero.getBoundingClientRect();
   hero.classList.toggle('dz-away',rect.right<=0||rect.left>=innerWidth);
 });
 observer.observe(hero,{attributes:true,attributeFilter:['class','style']});
 window.addEventListener('resize',()=>hero.classList.remove('dz-away'));
})();
