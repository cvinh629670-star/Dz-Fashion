/* Built-in garment illustrations. SVG shapes are inline vectors, not network assets. */
window.DzLookArtwork = function(kind){
 const common = 'xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 300" width="100%" height="100%" fill="none"';
 const arts={
  knit:`<path d="M119 57 101 70 56 95 27 172 70 188 91 145 87 248Q162 267 236 248L230 146 250 188 293 172 263 94 219 70 201 57Q164 78 119 57Z" fill="#345f9a" stroke="#244779" stroke-width="4"/><path d="M119 57Q160 98 201 57" stroke="#182f53" stroke-width="16" stroke-linecap="round"/><path d="M111 68Q160 106 210 68" stroke="#a5c6e9" stroke-width="4"/><path d="M89 247Q162 260 235 247" stroke="#193e71" stroke-width="15"/><path d="M37 173 68 184M253 184 284 173" stroke="#234c81" stroke-width="9"/><path d="M103 120V239M120 128V246M140 130V248M160 131V249M180 130V248M200 128V246M218 120V239" stroke="#c5d7ee" stroke-opacity=".18" stroke-width="2"/><path d="M89 109 99 132 224 132 233 109" stroke="#cee8ff" stroke-width="4" stroke-opacity=".75"/>`,
  coat:`<path d="M119 43 98 61 54 92 21 205 63 219 90 148 92 270 228 270 231 148 259 218 299 204 267 93 224 60 202 43Q160 72 119 43Z" fill="#243451" stroke="#172b45" stroke-width="4"/><path d="M119 43 158 89 141 132 102 70Z" fill="#526b8a"/><path d="M201 43 161 89 179 132 222 70Z" fill="#637a93"/><path d="M160 85 159 268" stroke="#b4c1d0" stroke-width="3"/><path d="M94 175 120 189 117 214 91 199M203 190 228 175 229 200 205 214" fill="#334c6c" stroke="#7290b0" stroke-width="3"/><circle cx="172" cy="143" r="4" fill="#bdcbe0"/><circle cx="172" cy="181" r="4" fill="#bdcbe0"/><circle cx="172" cy="220" r="4" fill="#bdcbe0"/>`,
  jacket:`<path d="M123 59 99 69 61 90 27 174 70 194 92 150 91 260Q160 276 229 260L227 150 252 194 291 174 259 90 221 69 196 59Q160 83 123 59Z" fill="#1d3358" stroke="#132948" stroke-width="4"/><path d="M123 59 143 93 159 81 175 92 196 59" fill="#466da5"/><path d="M159 82 159 263" stroke="#a6bbd8" stroke-width="3"/><path d="M89 249Q160 257 229 249" stroke="#345c8f" stroke-width="17"/><path d="M35 166 72 183M249 183 283 166" stroke="#6bb2f3" stroke-width="6"/><path d="M35 179 70 194M251 194 283 179" stroke="#386db2" stroke-width="5"/><path d="M107 169 132 184M188 185 212 169" stroke="#527299" stroke-width="5"/><circle cx="174" cy="141" r="3" fill="#d5e2ef"/>`,
  shoe:`<path d="M38 174Q64 177 95 166L126 126 163 138Q177 163 201 171L275 190Q288 198 282 226L258 243 67 241Q37 238 24 215Q17 198 38 174Z" fill="#e7eef7" stroke="#354e70" stroke-width="5"/><path d="M44 184Q76 194 111 173L135 147 160 158Q176 184 197 190L270 205" stroke="#679bd0" stroke-width="13"/><path d="M26 212Q94 227 284 223L278 239Q167 260 58 240Q28 235 26 212Z" fill="#203d66"/><path d="M114 174 177 192M110 187 169 202M107 200 155 212" stroke="#fff" stroke-width="8" stroke-linecap="round"/><path d="M205 195 250 206" stroke="#35577f" stroke-width="5"/><path d="M39 175 70 185" stroke="#b6cee6" stroke-width="5"/>`,
  cardigan:`<path d="M122 59 103 66 56 96 32 190 75 207 94 150 94 256Q159 269 225 256L224 150 246 207 287 190 263 97 215 66 197 59 161 84Z" fill="#efeeed" stroke="#969eae" stroke-width="4"/><path d="M122 58 151 96 150 259M197 58 169 97 170 261" stroke="#b8c8df" stroke-width="10"/><path d="M156 111 164 111M157 151 164 151M157 191 164 191M157 230 164 230" stroke="#6b86ad" stroke-width="5" stroke-linecap="round"/><path d="M95 246 224 246" stroke="#b0bdd0" stroke-width="13"/><path d="M42 189 72 202M252 202 279 189" stroke="#c3c6c8" stroke-width="9"/><path d="M112 180 132 191M187 192 210 181" stroke="#c5cad2" stroke-width="3"/>`,
  skirt:`<path d="M101 47 216 47 215 93Q231 149 269 241Q161 267 49 240Q90 152 103 93Z" fill="#5d7198" stroke="#394d6e" stroke-width="5"/><path d="M101 50 217 50 213 86 104 86Z" fill="#314f83"/><path d="M122 97 92 236M145 97 135 250M172 97 186 251M202 97 232 242" stroke="#b3c4da" stroke-width="5" stroke-opacity=".65"/><path d="M66 239Q158 264 252 239" stroke="#334767" stroke-width="4"/>`,
  bag:`<rect x="65" y="99" width="194" height="160" rx="24" fill="#b4c3d1" stroke="#617b92" stroke-width="5"/><path d="M119 110V79Q119 39 162 39Q205 39 205 79V110" stroke="#415c78" stroke-width="16" stroke-linecap="round"/><path d="M72 146Q165 181 252 146" stroke="#e3e9ed" stroke-width="6"/><rect x="102" y="174" width="121" height="51" rx="12" fill="#91a7bf" stroke="#6e88a0" stroke-width="3"/><circle cx="162" cy="198" r="6" fill="#e9eff4"/>`,
  palette:`<circle cx="112" cy="105" r="64" fill="#1d3c6e"/><circle cx="211" cy="116" r="66" fill="#5586c9"/><circle cx="145" cy="197" r="64" fill="#d2e3f5"/><circle cx="214" cy="208" r="43" fill="#f8fbff"/><circle cx="75" cy="190" r="24" fill="#8cb1cf"/><path d="M74 255H253" stroke="#ffffff" stroke-width="2" stroke-dasharray="6 8"/>`
 };
 return `<svg ${common} aria-hidden="true"><g>${arts[kind]||arts.jacket}</g></svg>`;
};
(function(){
 const model = document.querySelector('.hero .model');
 const area = document.getElementById('featureArt');
 if (model && area){const image = document.createElement('img');image.alt='';image.src=model.src;area.append(image)}
 const hero = document.getElementById('hero');
 if(hero){
   for(let i=0;i<9;i++){
     const point=document.createElement('span');point.className='dz-glint';point.setAttribute('aria-hidden','true');
     point.style.left=(9+i*9.4)+'%';point.style.top=(20+((i*23)%62))+'%';point.style.animationDelay=(-(i*0.94))+'s';
     hero.append(point);
   }
 }
})();
