(()=>{
const card=document.querySelector('.right-card'),art=document.getElementById('featureArt');
if(!card||!art)return;
const title=document.getElementById('dzCardTitle'),desc=document.getElementById('dzCardDescription'),count=document.getElementById('dzCardCount');
const male=art.querySelector('img');
const female=document.querySelector('#hero .dz-female-model');
const jumper=document.querySelector('#hero .dz-jumper-model');
const models=[male,female,jumper];
const config=[
 {title:'Blue Hour',desc:'Campus casual · Navy & black<br>Thư giãn, tối giản và hiện đại.',cls:''},
 {title:'Soft Street',desc:'Korean streetwear · Navy & grey<br>Thoải mái, cá tính và trẻ trung.',cls:'dz-card-female'},
 {title:'Urban Motion',desc:'Active streetwear · Black & denim<br>Năng động, tự do và nổi bật.',cls:'dz-card-motion'}
];
let current=-1;
function update(index){
 if(index===current||index<0||index>2)return;
 current=index;const item=config[index];
 art.classList.remove('dz-card-female','dz-card-motion');if(item.cls)art.classList.add(item.cls);
 art.dataset.look=String(index+1).padStart(2,'0');
 models.forEach((img,i)=>{
  if(!img)return;
  if(i!==0&&img.parentElement!==art)art.appendChild(img.cloneNode(true));
 });
 const images=[...art.querySelectorAll('img')];
 images.forEach((img,i)=>{img.style.opacity=i===index?'1':'0';img.style.visibility=i===index?'visible':'hidden';});
 title.textContent=item.title;desc.innerHTML=item.desc;count.textContent=`LOOK 0${index+1} / 03`;
}
window.addEventListener('dz:modelchange',e=>update(e.detail.index));
update(typeof window.dzActiveModel==='function'?window.dzActiveModel():0);
})();
