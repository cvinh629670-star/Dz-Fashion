(()=>{
const details=[
 {kicker:'01 / KOREAN CAMPUS',title:'Blue Hour — Campus Casual',
  description:'Phối đồ Hàn Quốc trẻ trung, sạch sẽ, cân bằng giữa sự lịch lãm và thoải mái. Tông xanh navy và đen làm điểm nhấn.',
  pieces:[['🧥','Áo khoác navy','Form rộng vừa, đường kẻ xanh'],['🧶','Áo len xanh','Layer cùng áo thun đen'],['👖','Quần ống suông','Đen, dáng thả tự nhiên'],['👟','Sneaker','Trắng phối xanh navy']],
  tip:'Mẹo phối: giữ 2 màu chính xanh navy – đen, thêm giày sáng để outfit không quá tối.'},
 {kicker:'02 / KOREAN STREET',title:'Soft Street — City Girl',
  description:'Phong cách nữ streetwear Hàn Quốc thoải mái, năng động nhưng vẫn mềm mại và tinh tế.',
  pieces:[['🧥','Hoodie navy','Oversized, sọc trắng nổi bật'],['👚','Áo tank trắng','Lớp trong gọn và sáng'],['👖','Quần cargo xám','Ống rộng, nhiều túi'],['👟','Sneaker trắng','Dáng chunky, dễ phối']],
  tip:'Mẹo phối: áo trong ôm gọn giúp cân bằng hoodie và quần cargo rộng. Thêm dây chuyền bạc để hoàn thiện.'},
 {kicker:'03 / URBAN MOTION',title:'Motion Fit — Urban Energy',
  description:'Streetwear dành cho chuyển động: phóng khoáng, đậm chất đường phố và nổi bật khi hoạt động.',
  pieces:[['👕','Áo thun graphic','Đen oversized, họa tiết trắng'],['🩳','Quần denim lửng','Xanh, ống rộng, dễ vận động'],['🧦','Tất thể thao','Đen – đỏ tạo điểm nhấn'],['🥾','Giày high-top','Đen, đế chắc, phong cách skate']],
  tip:'Mẹo phối: tập trung vào độ rộng của áo và quần; đôi tất đỏ là điểm nhấn nhỏ nhưng tạo cá tính.'}
];
const dialog=document.getElementById('lookDialog'),button=document.getElementById('lookButton');
if(!dialog||!button)return;
const q=id=>document.getElementById(id);
function update(){
 const index=typeof window.dzActiveModel==='function'?window.dzActiveModel():0;
 const v=details[index]||details[0];
 q('dzLookKicker').textContent=v.kicker;
 q('lookDialogTitle').textContent=v.title;
 q('dzLookDescription').textContent=v.description;
 q('dzLookPieces').innerHTML=v.pieces.map(([icon,name,desc])=>`<div class="dz-look-piece"><span class="emoji">${icon}</span><b>${name}</b><small>${desc}</small></div>`).join('');
 q('dzLookTip').textContent=v.tip;
}
button.addEventListener('click',update,{capture:true});
window.addEventListener('dz:modelchange',()=>{if(!dialog.hidden)update()});
update();
})();
