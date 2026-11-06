(()=>{
 const hero=document.getElementById('hero');const title=hero?.querySelector('.copy h1');
 if(!hero||!title)return;
 const layer=document.createElement('div');layer.className='dz-back-title';
 hero.insertBefore(layer,hero.querySelector('.model-wrap'));
 layer.appendChild(title);
})();
