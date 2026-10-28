
const IMGS=/*IMGS_JSON*/null;
/* Contatos recuperados do site antigo. RECONFIRMAR com a agência antes da publicação. */
const CONFIG={whatsapp:'13213109481',whatsappLabel:'+1 (321) 310-9481',email:'marisa@gordontravel.com.br',instagram:'https://www.instagram.com/gordontravelusa/',facebook:'https://www.facebook.com/gordontravel/',instagramHandle:'@gordontravelusa',youtube:'https://www.youtube.com/@gordontravel6806',site:'gordontravel.com.br',
portal:'https://gordontravel.suncoastusa.com.br/?chave=74794711-9C21-4E37-9003-563EB1C08EF1'};
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const store={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};

/* images */
function hydrate(root=document){$$('img[data-k]',root).forEach(i=>{const d=IMGS[i.dataset.k];if(!d)return;i.src=d.u;i.width=d.w;i.height=d.h;})}
hydrate();

/* toast, whatsapp, copy */
let tt;function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('on'),2600)}
function wa(msg){return 'https://wa.me/'+(CONFIG.whatsapp||'')+'?text='+encodeURIComponent(msg)}
function copy(text,okMsg){
  const fb=()=>{const ta=document.createElement('textarea');ta.value=text;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();let ok=false;try{ok=document.execCommand('copy')}catch(e){}ta.remove();toast(ok?okMsg:'Não foi possível copiar. Selecione o texto manualmente.')};
  if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(text).then(()=>toast(okMsg),fb)}else fb();
}
document.addEventListener('click',e=>{
  const a=e.target.closest('[data-wa]');
  if(a){a.href=wa(a.dataset.wa);a.target='_blank';a.rel='noopener'}
},true);

/* theme */
(function(){
  const root=document.documentElement;
  const saved=store.get('gt-theme');
  if(saved==='light'||saved==='dark')root.setAttribute('data-theme',saved);
  $('#themeBtn').addEventListener('click',()=>{
    const cur=root.getAttribute('data-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
    const nx=cur==='dark'?'light':'dark';
    root.classList.add('theme-fx');clearTimeout(window.__fx);window.__fx=setTimeout(()=>root.classList.remove('theme-fx'),340);
    root.setAttribute('data-theme',nx);store.set('gt-theme',nx);
  });
})();

/* router */
const PAGES=['home','explorer','journey','services','tickets','historia','stories','guide','contato'];
const TITLES={home:'Início',explorer:'Orlando Explorer',journey:'Gordon Journey',services:'Gordon Services',tickets:'Gordon Tickets',historia:'Nossa História',stories:'Gordon Stories',guide:'Travel Guide',contato:'Contato'};
function show(p,push){
  if(!PAGES.includes(p))p='home';
  $$('.page').forEach(s=>s.classList.toggle('on',s.dataset.page===p));
  $$('[data-go]').forEach(a=>{if(a.closest('.nav,.menu nav')){a.toggleAttribute('aria-current',a.dataset.go===p);if(a.dataset.go===p)a.setAttribute('aria-current','page')}});
  document.title=(p==='home'?'':TITLES[p]+' · ')+'Gordon Travel';
  if(push){try{history.replaceState(null,'','#'+p)}catch(e){}}
  closeMenu();window.scrollTo({top:0,behavior:'instant'});
  (window.PAGE_HOOKS&&PAGE_HOOKS[p]&&PAGE_HOOKS[p]());
}
document.addEventListener('click',e=>{
  const a=e.target.closest('[data-go]');if(!a)return;
  e.preventDefault();show(a.dataset.go,true);
});
window.addEventListener('hashchange',()=>show(location.hash.slice(1)));

/* mobile menu */
const menu=$('#menu'),burger=$('#burger');
function openMenu(){menu.hidden=false;burger.setAttribute('aria-expanded','true');document.body.style.overflow='hidden';$('#menuClose').focus()}
function closeMenu(){if(menu.hidden)return;menu.hidden=true;burger.setAttribute('aria-expanded','false');document.body.style.overflow='';burger.focus({preventScroll:true})}
burger.addEventListener('click',openMenu);$('#menuClose').addEventListener('click',closeMenu);
menu.addEventListener('keydown',e=>{
  if(e.key==='Escape')closeMenu();
  if(e.key==='Tab'){const f=$$('a,button',menu);const first=f[0],last=f[f.length-1];
    if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}
});
matchMedia('(min-width:1181px)').addEventListener('change',e=>{if(e.matches)closeMenu()});

/* hooks de página, registrados pelos módulos */
window.PAGE_HOOKS={};
/* modal genérico (detalhes de produto) */
const Modal={el:null,opener:null,
  open(html,opener){this.opener=opener||document.activeElement;const m=this.el;$('.mbody',m).innerHTML=html;const mt=$('[data-mt]',m);if(mt)$('.mbox',m).setAttribute('aria-labelledby',mt.id);m.hidden=false;$('.mbox',m).scrollTop=0;document.body.style.overflow='hidden';hydrate(m);$('.mclose',m).focus()},
  close(){this.el.hidden=true;document.body.style.overflow='';if(this.opener&&this.opener.focus)this.opener.focus({preventScroll:true})}};
Modal.el=$('#modal');
$('.mclose',Modal.el).addEventListener('click',()=>Modal.close());
Modal.el.addEventListener('click',e=>{if(e.target===Modal.el)Modal.close()});
Modal.el.addEventListener('keydown',e=>{if(e.key==='Escape')Modal.close();if(e.key==='Tab'){const f=$$('a[href],button,summary',Modal.el).filter(x=>!x.hidden);const a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}});
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
