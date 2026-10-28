/* ===== Lightbox ===== */
const SETS={
  stories:Array.from({length:10},(_,i)=>({k:'v'+String(i+1).padStart(2,'0'),alt:['Grupo grande de família diante do castelo de um parque, em dia de céu aberto','Casal e criança de braços abertos diante de um castelo','Grupo posando com um personagem de pelúcia em um estúdio com fundo azul','Família em camisetas natalinas temáticas, abraçada à noite','Família de camisetas azuis diante de uma grande esfera prateada','Duas famílias com crianças pequenas posando ao ar livre','Grupo de mulheres reunido diante de um cenário colorido com arco-íris','Grupo grande de amigos e familiares diante de um castelo','Famílias reunidas à noite diante de uma grande esfera iluminada','Grupo diante de um castelo de pedra em um parque temático'][i]})),
  certs:[{k:'cert1',alt:'Certificado de conclusão Orlando Expert em nome de Marisa Gordon, 12 de maio de 2020'},{k:'cert2',alt:'Certificado de participação SunCoastUSA em grupos em nome de Marisa Gordon, 7 de maio de 2020'}]
};
const lb={el:$('#lb'),set:null,i:0,opener:null};
function lbShow(){const it=SETS[lb.set][lb.i];const d=IMGS[it.k];$('#lbImg').src=d.u;$('#lbImg').alt=it.alt;$('#lbCap').textContent=it.alt;$('#lbCount').textContent=(lb.i+1)+' de '+SETS[lb.set].length;
  const one=SETS[lb.set].length<2;$('#lbPrev').hidden=one;$('#lbNext').hidden=one}
function lbOpen(set,i,opener){lb.set=set;lb.i=i;lb.opener=opener;lb.el.classList.add('on');document.body.style.overflow='hidden';lbShow();$('#lbClose').focus()}
function lbClose(){lb.el.classList.remove('on');document.body.style.overflow='';if(lb.opener)lb.opener.focus({preventScroll:true})}
function lbMove(d){const n=SETS[lb.set].length;lb.i=(lb.i+d+n)%n;lbShow()}
$('#lbClose').addEventListener('click',lbClose);$('#lbPrev').addEventListener('click',()=>lbMove(-1));$('#lbNext').addEventListener('click',()=>lbMove(1));
lb.el.addEventListener('click',e=>{if(e.target===lb.el||e.target.classList.contains('lb-stage'))lbClose()});
lb.el.addEventListener('keydown',e=>{
  if(e.key==='Escape')lbClose();else if(e.key==='ArrowLeft')lbMove(-1);else if(e.key==='ArrowRight')lbMove(1);
  else if(e.key==='Tab'){const f=$$('button',lb.el).filter(b=>!b.hidden);const a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}
});
let tx=null;lb.el.addEventListener('touchstart',e=>{tx=e.touches[0].clientX},{passive:true});
lb.el.addEventListener('touchend',e=>{if(tx==null)return;const dx=e.changedTouches[0].clientX-tx;if(Math.abs(dx)>50&&SETS[lb.set].length>1)lbMove(dx<0?1:-1);tx=null});
$('#mason').innerHTML=SETS.stories.map((s,i)=>`<button type="button" data-lb="stories" data-i="${i}" aria-label="Ampliar foto ${i+1}: ${s.alt}"><img data-k="${s.k}" alt="${s.alt}"></button>`).join('');
hydrate($('#mason'));
document.addEventListener('click',e=>{const b=e.target.closest('[data-lb]');if(b)lbOpen(b.dataset.lb,+b.dataset.i,b)});
