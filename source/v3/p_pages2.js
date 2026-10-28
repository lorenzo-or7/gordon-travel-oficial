/* ===== Lightbox genérico ===== */
const SETS={stories:STORIES.map(s=>({k:s.k,alt:s.alt})),certs:CERTS.map(c=>({k:c.k,alt:c.alt,cap:c.t+' · '+c.m}))};
const lb={el:$('#lb'),set:null,list:null,i:0,opener:null};
const pad2=n=>String(n).padStart(2,'0');
function lbShow(dir){const it=lb.list[lb.i];const d=IMGS[it.k];const im=$('#lbImg');const st=lb.set==='stories';
  im.style.setProperty('--lbx',dir?(dir*28)+'px':'0px');im.style.animation='none';void im.offsetWidth;im.style.animation='';im.src=d.u;im.alt=it.alt;
  lb.el.toggleAttribute('data-stories',st);
  $('#lbCap').textContent=st?'':(it.cap||it.alt);
  $('#lbCount').textContent=st?pad2(lb.i+1)+' / '+pad2(lb.list.length):(lb.set==='certs'?'Certificado ':'Foto ')+(lb.i+1)+' de '+lb.list.length;
  lbZoom(false);$('#lbZoom').hidden=lb.set!=='certs';lb.el.toggleAttribute('data-cert',lb.set==='certs');
  $('#lbDots').innerHTML=(!st&&lb.list.length>1)?lb.list.map((_,i)=>`<i class="${i===lb.i?'on':''}"></i>`).join(''):'';
  const one=lb.list.length<2;$('#lbPrev').hidden=one;$('#lbNext').hidden=one;
  if(st)[1,-1].forEach(o=>{const n=lb.list[(lb.i+o+lb.list.length)%lb.list.length];const p=new Image();p.src=IMGS[n.k].u})}
function lbOpen(set,i,opener,list){lb.set=set;lb.list=list||SETS[set];lb.i=i;lb.opener=opener;lb.el.classList.add('on');document.body.style.overflow='hidden';lbShow();$('#lbClose').focus()}
function lbZoom(on){lb.el.classList.toggle('zoomed',on);const z=$('#lbZoom');z.setAttribute('aria-pressed',on);z.setAttribute('aria-label',on?'Reduzir certificado':'Ampliar certificado')}
$('#lbZoom').addEventListener('click',()=>lbZoom(!lb.el.classList.contains('zoomed')));
function lbClose(){lbZoom(false);lb.el.classList.remove('on');document.body.style.overflow='';if(lb.opener)lb.opener.focus({preventScroll:true})}
function lbMove(d){const n=lb.list.length;lb.i=(lb.i+d+n)%n;lbShow(d)}
$('#lbClose').addEventListener('click',lbClose);$('#lbPrev').addEventListener('click',()=>lbMove(-1));$('#lbNext').addEventListener('click',()=>lbMove(1));
lb.el.addEventListener('click',e=>{if(e.target===lb.el||e.target.classList.contains('lb-stage'))lbClose();else if(e.target.id==='lbImg'&&lb.set==='certs'){lbZoom(!lb.el.classList.contains('zoomed'));$('#lbZoom').focus()}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&lb.el.classList.contains('on')&&!lb.el.contains(document.activeElement))lbClose()});
lb.el.addEventListener('keydown',e=>{
  if(e.key==='Escape')lbClose();else if(e.key==='ArrowLeft')lbMove(-1);else if(e.key==='ArrowRight')lbMove(1);
  else if(e.key==='Tab'){const f=$$('button',lb.el).filter(b=>!b.hidden);const a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}
});
let tx=null,ty=null;lb.el.addEventListener('touchstart',e=>{if(e.touches.length>1||lb.el.classList.contains('zoomed')){tx=null;return}tx=e.touches[0].clientX;ty=e.touches[0].clientY},{passive:true});
lb.el.addEventListener('touchend',e=>{if(tx==null)return;const dx=e.changedTouches[0].clientX-tx,dy=e.changedTouches[0].clientY-ty;tx=null;if(Math.abs(dx)>56&&Math.abs(dx)>Math.abs(dy)*1.4&&lb.list.length>1)lbMove(dx<0?1:-1)})

/* ===== Stories 3.0 · The Living Gallery ===== */
/* Ordem editorial (única sequência): linhas com proporções somadas (fr = razão da foto); 'sl'/'sr' = coluna de duas fotos 3:2 à esquerda/direita de um quadrado.
   Chaves por linha: k = fotos na ordem; t = tipo; m = vão (span) no mobile. */
const ST_ROWS=[
 {t:'f', k:['v02','a01','v10']},
 {t:'r', k:['v04','a03','a02']},
 {t:'r', k:['n01','n02','n03']},
 {t:'r', k:['a04','a06','a10','a11']},
 {t:'sr',k:['a08','v05','v06']},
 {t:'r', k:['n04','n05','n06','n07']},
 {t:'r', k:['v09','a09','a12']},
 {t:'sl',k:['v01','v08','a13']},
 {t:'r', k:['n08','n09','n10']},
 {t:'r', k:['a14','a15','a16','a17']},
 {t:'sr',k:['a05','v03','v07']},
 {t:'r', k:['a07','a18','a19','a20']}
];
const ST_M2=new Set(['v02','v04','a08','v05','v06','v09','v01','v08','a17','a05','v03','v07','n02','n05','n08','n10']); // ocupam a largura toda no mobile
const ST_ORDER=ST_ROWS.flatMap(r=>r.k);
const St={
 by:Object.fromEntries(STORIES.map(s=>[s.k,s])),
 build(){
  const ar=k=>{const d=IMGS[k];return (d.w/d.h).toFixed(3)};
  let n=0;
  const cell=(k,feat)=>{const s=this.by[k],i=n++;const d=IMGS[k];
   return `<button type="button" role="listitem" class="st-c${ST_M2.has(k)?' m2':''}${feat?' '+feat:''}" data-i="${i}" style="--ar:${ar(k)}${k==='a01'||k==='v10'?';--mar:.87':''}" aria-label="Ampliar foto ${i+1} de ${ST_ORDER.length}: ${esc(s.alt)}"><img data-k="${k}" alt="${esc(s.alt)}" width="${d.w}" height="${d.h}" loading="lazy" decoding="async"><span class="st-ex" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7"/></svg></span></button>`};
  $('#sgrid').innerHTML=ST_ROWS.map(r=>{
   const k=r.k;
   if(r.t==='f'){const f=['dom','mid','sm'];return `<div class="st-row st-feat" style="--d:${ar(k[0])}fr ${ar(k[1])}fr ${ar(k[2])}fr">${k.map((x,j)=>cell(x,f[j])).join('')}</div>`}
   if(r.t==='r')return `<div class="st-row" style="--d:${k.map(x=>ar(x)+'fr').join(' ')}">${k.map(x=>cell(x)).join('')}</div>`;
   if(r.t==='sr')return `<div class="st-row st-comp" style="--d:1.333fr 1fr">${cell(k[0])}<div class="st-stk">${cell(k[1])}${cell(k[2])}</div></div>`;
   return `<div class="st-row st-comp" style="--d:1fr 1.333fr"><div class="st-stk">${cell(k[0])}${cell(k[1])}</div>${cell(k[2])}</div>`;
  }).join('');
  hydrate($('#sgrid'));
 },
 reveal(){
  const cs=$$('#sgrid .st-row');
  if(!('IntersectionObserver' in window))return;
  const io=new IntersectionObserver((es,o)=>{es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('seen');o.unobserve(x.target)}})},{rootMargin:'0px 0px -6% 0px',threshold:.06});
  cs.forEach(r=>{r.classList.add('rv');io.observe(r)});
  const e=$('.st-endin');if(e)io.observe(e);
 }};
(function(){
  St.build();
  $('#sgrid').addEventListener('click',e=>{const b=e.target.closest('[data-i]');if(!b)return;
    const list=ST_ORDER.map(k=>({k,alt:St.by[k].alt}));lbOpen('stories',+b.dataset.i,b,list)});
  St.reveal();
})();

/* ===== Nossa História: The Gordon Memories ===== */
const RM=()=>matchMedia('(prefers-reduced-motion:reduce)').matches;
const Ch={i:0,busy:false,
 build(){
  const n=CHAPTERS.length;
  $('#chl').innerHTML=CHAPTERS.map((c,i)=>`<button type="button" role="tab" id="ch-t${i}" data-c="${i}" aria-selected="false" aria-controls="chBody" tabindex="-1"><span class="n" aria-hidden="true">${String(i+1).padStart(2,'0')}</span><span class="x"><span class="y">${c.lb}</span><span class="t">${c.t}</span></span></button>`).join('')+'<span class="hs-ind" aria-hidden="true"></span>';
  $('#chBody').innerHTML=`<div class="hs-pa"><div class="hs-fig" id="chFig"></div><div class="hs-tx"><p class="hs-cap" id="chCap"></p><div class="hs-by" id="chBy" aria-hidden="true"></div><h3 id="chT"></h3><p id="chD"></p><p class="hs-sig" id="chSig" hidden><span class="sg">Marisa Gordon</span><span class="sr">Fundadora da Gordon Travel</span><span class="sm">A Gordon Travel segue sendo construída por pessoas, viagem a viagem.</span></p>
   <div class="hs-nav"><button class="btn sm ghost" type="button" data-cp aria-label="Capítulo anterior">Anterior</button><span class="hs-count" id="chCount" aria-hidden="true"></span><button class="btn sm" type="button" data-cn aria-label="Próximo capítulo">Próximo</button></div></div></div>`;
 },
 fig(c){
  const d=IMGS[c.k];const r=d.w/d.h;
  return `<div class="hs-print ${/Ilustra/.test(c.cap)?'ill':''} ${r<1?'port':''}" style="--arn:${r.toFixed(3)}"><div class="dframe"><div class="dframe-in"><img src="${d.u}" width="${d.w}" height="${d.h}" alt="${esc(c.alt||c.cap)}"></div></div><span class="hs-pcap">${c.cap}</span></div>`;
 },
 fill(){
  const c=CHAPTERS[this.i];
  $('#chFig').innerHTML=this.fig(c);
  $('#chCap').textContent='Capítulo '+String(this.i+1).padStart(2,'0')+' · '+c.lb;
  $('#chBy').textContent=c.by;$('#chT').textContent=c.t;$('#chD').textContent=c.d;$('#chSig').hidden=!c.sig;
  $('#chCount').textContent=String(this.i+1).padStart(2,'0')+' / '+String(CHAPTERS.length).padStart(2,'0');
  $('#chBody').setAttribute('aria-labelledby','ch-t'+this.i);
  $('[data-cp]').disabled=this.i===0;$('[data-cn]').disabled=this.i===CHAPTERS.length-1;
  $$('#chl [data-c]').forEach((b,j)=>{const on=j===this.i;b.setAttribute('aria-selected',on);b.tabIndex=on?0:-1});
  this.ind();
 },
 measure(){
  const st=$('#chBody');if(!st||!st.offsetWidth)return;const keep=this.i;st.style.minHeight='';let m=0;
  CHAPTERS.forEach((_,i)=>{this.i=i;this.fill();m=Math.max(m,st.offsetHeight)});
  this.i=keep;this.fill();st.style.minHeight=m+'px'},
 ind(){const t=$('.hs-ind',$('#chl')),b=$('#chl [aria-selected="true"]');if(!t||!b||!b.offsetWidth)return;t.style.setProperty('--iy',b.offsetTop+'px');t.style.setProperty('--ih',b.offsetHeight+'px');t.style.setProperty('--ix',b.offsetLeft+'px');t.style.setProperty('--iw',b.offsetWidth+'px')},
 go(i,scroll){
  i=Math.max(0,Math.min(CHAPTERS.length-1,i));if(i===this.i&&$('#chFig').innerHTML)return;
  this.i=i;const st=$('#chBody');
  $$('#chl [data-c]').forEach((b,j)=>{const on=j===i;b.setAttribute('aria-selected',on);b.tabIndex=on?0:-1});this.ind();
  if(RM()){this.fill();return}
  st.classList.add('out');clearTimeout(this.tm);
  this.tm=setTimeout(()=>{this.fill();st.classList.remove('out');st.classList.remove('in');void st.offsetWidth;st.classList.add('in')},170);
  if(scroll&&window.innerWidth<=900){const r=st.getBoundingClientRect();if(r.top<70)window.scrollBy({top:r.top-90,behavior:'smooth'})}
 }};
PAGE_HOOKS.historia=()=>{Ch.measure();Ch.ind()};
(function(){
  Ch.build();Ch.fill();
  const l=$('#chl');
  l.addEventListener('click',e=>{const b=e.target.closest('[data-c]');if(b)Ch.go(+b.dataset.c,true)});
  l.addEventListener('keydown',e=>{const k=e.key;if(!['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Home','End'].includes(k))return;e.preventDefault();
   const n=CHAPTERS.length;const i=k==='Home'?0:k==='End'?n-1:Math.max(0,Math.min(n-1,Ch.i+((k==='ArrowDown'||k==='ArrowRight')?1:-1)));Ch.go(i);$('#ch-t'+i).focus()});
  $('#chBody').addEventListener('click',e=>{if(e.target.closest('[data-cn]'))Ch.go(Ch.i+1);if(e.target.closest('[data-cp]'))Ch.go(Ch.i-1)});
  let rz;window.addEventListener('resize',()=>{Ch.ind();clearTimeout(rz);rz=setTimeout(()=>Ch.measure(),150)});
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>{Ch.measure();Ch.ind()});
  /* capa: rolar até o álbum */
  document.addEventListener('click',e=>{const a=e.target.closest('[data-scroll]');if(!a)return;e.preventDefault();const t=$('#'+a.dataset.scroll);if(t)t.scrollIntoView({behavior:RM()?'auto':'smooth',block:'start'})});
  /* ponte: revelação ao entrar na tela */
  $$('.hs-bridge,.hs-end').forEach(el=>{if('IntersectionObserver' in window){el.classList.add('rv');new IntersectionObserver((es,o)=>{es.forEach(x=>{if(x.isIntersecting){el.classList.add('seen');o.disconnect()}})},{threshold:.3}).observe(el)}});
  /* valores */
  const vg=$('#vgrid'),vh=$('#vhl');
  const V={i:0,fill(anim){const v=VALUES[this.i];
   vh.innerHTML=`<span class="vn" aria-hidden="true">${String(this.i+1).padStart(2,'0')}</span><h3><span class="vi" aria-hidden="true">${xi(v[2])}</span>${v[0]}</h3><p>${v[1]}</p>`;
   vh.setAttribute('aria-labelledby','vt'+this.i);
   $$('[data-v]',vg).forEach((b,j)=>{b.setAttribute('aria-selected',j===this.i);b.tabIndex=j===this.i?0:-1});
   if(anim&&!RM()){vh.classList.remove('in');void vh.offsetWidth;vh.classList.add('in')}}};
  vg.innerHTML=VALUES.map((v,i)=>`<button type="button" role="tab" id="vt${i}" data-v="${i}" aria-selected="false" aria-controls="vhl"><i>${String(i+1).padStart(2,'0')}</i>${v[0]}</button>`).join('');
  V.fill(false);
  vg.addEventListener('click',e=>{const b=e.target.closest('[data-v]');if(!b)return;V.i=+b.dataset.v;V.fill(true)});
  vg.addEventListener('keydown',e=>{const k=e.key;if(!['ArrowRight','ArrowLeft','ArrowUp','ArrowDown','Home','End'].includes(k))return;e.preventDefault();const n=VALUES.length;V.i=k==='Home'?0:k==='End'?n-1:(V.i+((k==='ArrowRight'||k==='ArrowDown')?1:-1)+n)%n;V.fill(true);$('#vt'+V.i).focus()});
  /* certificados */
  $('#certs').innerHTML=CERTS.map((c,i)=>`<button type="button" class="hs-cert" data-ci="${i}" aria-label="Visualizar certificado: ${esc(c.t)}"><span class="ct"><img data-k="${c.k}" alt="" loading="lazy"></span><span class="cx"><b>${c.t}</b><span>${c.i}</span><span class="dt">${c.dt}</span><em>Visualizar certificado<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></em></span></button>`).join('');
  hydrate($('#certs'));
  $('#certs').addEventListener('click',e=>{const b=e.target.closest('[data-ci]');if(b)lbOpen('certs',+b.dataset.ci,b)});

})();

/* ===== Travel Guide 2.0 ===== */
const GI={
 search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
 calendar:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>',
 ticket:'<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/><path d="M13 5v2M13 17v2M13 11v2"/>',
 idcard:'<rect x="2" y="4" width="20" height="16" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M15 9h3M15 13h3M5.5 17a3.5 3.5 0 0 1 7 0"/>',
 car:'<path d="M21 8l-2-4H5L3 8"/><rect x="3" y="8" width="18" height="8" rx="2"/><path d="M7 16v2M17 16v2M7 12h.01M17 12h.01"/>',
 bed:'<path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4M12 4v6M2 18h20"/>',
 users:'<circle cx="9" cy="7" r="4"/><path d="M2 21v-1a6 6 0 0 1 12 0v1M16 3.2a4 4 0 0 1 0 7.6M22 21v-1a6 6 0 0 0-4-5.6"/>',
 info:'<circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/>',
 ext:'<path d="M15 3h6v6M10 14L21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
 doc:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
 receipt:'<path d="M4 2v20l3-2 3 2 3-2 3 2 3-2V2l-3 2-3-2-3 2-3-2-3 2z"/><path d="M8 8h8M8 12h8"/>',
 phone:'<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
 shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>',
 layers:'<path d="M12 2l10 5-10 5L2 7z"/><path d="M2 12l10 5 10-5M2 17l10 5 10-5"/>',
 check:'<path d="M5 12l5 5 9-10"/>'
};
const gi=n=>`<svg viewBox="0 0 24 24" aria-hidden="true">${GI[n]}</svg>`;
const GCATS=[['planejamento','Planejamento','calendar','Organize cada detalhe.'],['parques','Parques','ticket','Aproveite melhor os dias.'],['documentos','Documentos','idcard','Prepare o embarque.'],['transporte','Transporte','car','Planeje deslocamentos.'],['hospedagem','Hospedagem','bed','Escolha onde ficar.'],['familia','Em família','users','Viaje com tranquilidade.']];
const GSUGG=['Preciso de visto?','Hotel ou casa?','Carro ou transfer?','Quantos dias de parque?','Documentos para crianças?'];
/* Dicionário local: só termos que existem no conteúdo do guia */
const GSYN=[['visto','documento','documentos','entrada','imigracao','passaporte','esta'],['carro','aluguel','alugado','transporte','transfer','locadora','deslocamento','deslocar','uber','onibus'],['hotel','hospedagem','resort','casa','temporada'],['crianca','criancas','menor','menores','familia','filho','filhos'],['disney','universal','parque','parques','ingresso','ingressos'],['seguro','protecao','documentos','pasta']];
const GSTOP=new Set('de da do das dos para por pra com sem em no na nos nas um uma o a os as e ou que qual quais quanto quantos quantas como preciso posso pode devo ha ter ir'.split(' '));
const PITEMS=[['Documentos de viagem','doc'],['Comprovantes de reservas','receipt'],['Contatos de emergência','phone'],['Informações do seguro','shield'],['Versão digital e impressa','layers']];
const gnorm=s=>{let o='';for(let i=0;i<s.length;i++)o+=(s[i].normalize('NFD')[0]||s[i]).toLowerCase();return o};
const gwords=s=>gnorm(s).split(/[^a-z0-9]+/).filter(Boolean);
const GREL={3:['contato','Falar com a equipe'],6:['contato','Falar com a equipe']};
GUIDE.forEach(g=>{const n=+g.id.slice(1);g.q_=gwords(g.q);g.a_=gwords(g.a);g.k_=gwords((GKW[n]||'')+' '+lab(GTOPICS,g.topic))});
const Gd={cat:'planejamento',q:'',toks:[],sv:{},cf:null,
 topic(id){this.q='';$('#gq').value='';this.cat=id==='todos'?'todos':id;this.sync()},
 parse(q){return gwords(q).filter(t=>!GSTOP.has(t))},
 expand(t){const s=new Set([t]);GSYN.forEach(gr=>{if(gr.some(w=>w===t||(t.length>=4&&w.startsWith(t))))gr.forEach(w=>s.add(w))});return[...s]},
 has(ws,t){return ws.some(w=>w.startsWith(t))},
 score(g,toks){let tot=0,hit=0;for(const t of toks){const ex=this.has(g.q_,t)?6:this.has(g.k_,t)?5:this.has(g.a_,t)?4:0;let b=ex;if(!b){for(const e of this.expand(t)){b=Math.max(b,this.has(g.q_,e)?3:this.has(g.k_,e)?2.5:0)}}if(b){hit++;tot+=b}}return{hit,tot}},
 search(q){const toks=this.parse(q);this.toks=toks;if(!toks.length)return{list:[],partial:false};
  const sc=GUIDE.map((g,i)=>({g,i,...this.score(g,toks)}));
  let full=sc.filter(x=>x.hit===toks.length);let partial=false;
  if(!full.length&&toks.length>1){full=sc.filter(x=>x.hit>0);partial=full.length>0}
  full.sort((a,b)=>b.hit-a.hit||b.tot-a.tot||a.i-b.i);return{list:full.map(x=>x.g),partial}},
 hl(t){const toks=this.toks;if(!toks||!toks.length)return esc(t);const n=gnorm(t);const r=[];
  for(const k of toks){let i=0;while((i=n.indexOf(k,i))>-1){if(i===0||!/[a-z0-9]/.test(n[i-1]))r.push([i,i+k.length]);i+=k.length}}
  if(!r.length)return esc(t);r.sort((a,b)=>a[0]-b[0]);const m=[];r.forEach(x=>{const l=m[m.length-1];if(l&&x[0]<=l[1])l[1]=Math.max(l[1],x[1]);else m.push([...x])});
  let o='',p=0;m.forEach(([a,b])=>{o+=esc(t.slice(p,a))+'<mark>'+esc(t.slice(a,b))+'</mark>';p=b});return o+esc(t.slice(p))},
 acc(list,pre){return list.map(g=>{const id=pre+g.id;const rel=GREL[+g.id.slice(1)];
  const links=g.links.length?`<span class="gd-links">${g.links.map(k=>`<a class="gd-lk" href="${OFFICIAL[k][1]}" target="_blank" rel="noopener noreferrer">${OFFICIAL[k][0]}${gi('ext')}<span class="gd-sr"> (abre em nova aba)</span></a>`).join('')}</span>`:'';
  const warn=g.verify?`<div class="gd-warn">${gi('info')}<div><strong>Informação sujeita a alteração</strong><span>Regras e requisitos podem mudar. Consulte a fonte oficial antes de viajar.</span>${links}</div></div>`:(links?`<div class="gd-src">${links}</div>`:'');
  const acts=(g.extra==='pasta'?'<button type="button" class="gd-rel" data-act="pasta">Abrir Minha Pasta de Viagem</button>':'')+(rel?`<a class="gd-rel" href="#${rel[0]}" data-go="${rel[0]}">${rel[1]}</a>`:'');
  return `<article class="gd-q"><h3 class="gd-qh"><button type="button" class="gd-qb" id="${id}b" aria-expanded="false" aria-controls="${id}p"><span class="gd-qt"><span class="gd-qk">${lab(GTOPICS,g.topic)}</span><span class="gd-qq">${this.hl(g.q)}</span></span><span class="gd-pm" aria-hidden="true"></span></button></h3><div class="gd-qp" id="${id}p" role="region" aria-labelledby="${id}b"><div class="gd-qpi"><div class="gd-qc"><p>${this.hl(g.a)}</p>${warn}${acts?`<div class="gd-racts">${acts}</div>`:''}</div></div></div></article>`}).join('')},
 toggle(btn,force){const open=force!==undefined?force:btn.getAttribute('aria-expanded')!=='true';
  if(open)$$('.gd-qb[aria-expanded="true"]',btn.closest('.gd-list')).forEach(b=>{if(b!==btn)b.setAttribute('aria-expanded','false')});
  btn.setAttribute('aria-expanded',open)},
 sync(){
  const searching=!!this.q.trim();
  $('#gBrowse').hidden=searching;$('#gRes').hidden=!searching;$('#gClear').hidden=!this.q;
  if(searching){const r=this.search(this.q);const n=r.list.length;
   $('#gResT').textContent='Resultados para “'+this.q.trim()+'”';
   $('#gStatus').textContent=n?n+(n===1?' resultado':' resultados')+(r.partial?' parciais':''):'Nenhum resultado';
   $('#gResC').textContent=r.partial?'Nenhuma pergunta contém todos os termos. Estas respostas combinam com parte deles.':'';$('#gResC').hidden=!r.partial;
   $('#gResL').innerHTML=this.acc(r.list,'s');$('#gResL').hidden=!n;
   const em=$('#gEmpty');em.hidden=!!n;if(!n)em.innerHTML='<p><strong>Não encontramos uma resposta para esse termo.</strong> Tente outra palavra, navegue pelos assuntos ou fale com a equipe.</p><div class="gd-racts"><button type="button" class="gd-rel" data-act="clear">Ver assuntos</button><a class="gd-rel" href="#contato" data-go="contato">Falar com a equipe</a></div>';
   if(n===1)this.toggle($('#gResL .gd-qb'),true);
   return}
  $('#gStatus').textContent='';this.toks=[];
  const all=this.cat==='todos';const c=GCATS.find(x=>x[0]===this.cat);
  const list=all?GUIDE:GUIDE.filter(g=>g.topic===this.cat);
  $('#gCats').innerHTML=GCATS.map(x=>{const n=GUIDE.filter(g=>g.topic===x[0]).length;return `<button type="button" class="gd-cat" data-cat="${x[0]}" aria-pressed="${x[0]===this.cat}">${gi(x[2])}<span class="gd-cn">${x[1]}</span><span class="gd-cd">${x[3]}</span><span class="gd-cc">${n} ${n===1?'pergunta':'perguntas'}</span></button>`}).join('');
  $('#gCenK').textContent=all?'Todos os assuntos':c[3];$('#gCenT').textContent=all?'Todas as perguntas':c[1];
  $('#gCenC').textContent=list.length+(list.length===1?' pergunta':' perguntas');
  $('#gAll').textContent=all?'Ver por assunto':'Ver todas as '+GUIDE.length+' perguntas';
  $('#gList').innerHTML=this.acc(list,'c');
 },
 setQ(v,focus){this.q=v;const i=$('#gq');if(i.value!==v)i.value=v;this.sync();if(focus)i.focus()},
 rm(){return matchMedia('(prefers-reduced-motion:reduce)').matches},
 goPasta(){if(this.q)this.setQ('');requestAnimationFrame(()=>{const el=$('#pasta');const y=el.getBoundingClientRect().top+scrollY-84;scrollTo({top:y,behavior:this.rm()?'auto':'smooth'});el.focus({preventScroll:true})})},
 goSearch(){const i=$('#gq');const y=i.getBoundingClientRect().top+scrollY-140;scrollTo({top:Math.max(0,y),behavior:this.rm()?'auto':'smooth'});i.focus({preventScroll:true})},
 /* ---- Minha Pasta de Viagem ---- */
 load(){try{this.sv=JSON.parse(store.get('gt-pasta')||'{}')||{}}catch(e){this.sv={}}},
 save(){store.set('gt-pasta',JSON.stringify(this.sv))},
 count(){return PITEMS.filter((_,i)=>this.sv[i]).length},
 paint(){const n=this.count(),t=PITEMS.length;
  $$('#pItems input').forEach((x,i)=>x.checked=!!this.sv[i]);
  $('#pTxt').textContent=n+' de '+t+' itens concluídos';
  $('#pFill').style.transform='scaleX('+(n/t)+')';
  const b=$('#pBar');b.setAttribute('aria-valuenow',n);b.setAttribute('aria-valuetext',n+' de '+t+' itens concluídos');
  $('#pDone').hidden=n<t;$('#pReset').disabled=n===0;if(n===0)this.cancelReset()},
 cancelReset(){clearTimeout(this.cf);this.cf=null;const b=$('#pReset');if(!b)return;b.classList.remove('confirm');b.querySelector('span').textContent='Reiniciar';$('#pCancel')&&$('#pCancel').remove()},
 reset(){const b=$('#pReset');if(this.count()===0)return;
  if(!this.cf){b.classList.add('confirm');b.querySelector('span').textContent='Confirmar: apagar marcações';
   const c=document.createElement('button');c.type='button';c.id='pCancel';c.className='gd-act';c.innerHTML='<span>Cancelar</span>';b.after(c);
   this.cf=setTimeout(()=>this.cancelReset(),6000);return}
  this.sv={};this.save();this.cancelReset();this.paint();toast('Marcações apagadas.')},
 text(){const n=this.count();return 'Minha Pasta de Viagem · Gordon Travel\n'+n+' de '+PITEMS.length+' itens concluídos\n\n'+PITEMS.map((t,i)=>(this.sv[i]?'[x] ':'[ ] ')+t[0]).join('\n')+'\n\nLista de apoio à organização. Confira os requisitos nas fontes oficiais.'},
 async copy(){const t=this.text();let ok=false;
  try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(t);ok=true}}catch(e){}
  if(!ok){try{const a=document.createElement('textarea');a.value=t;a.setAttribute('readonly','');a.style.cssText='position:fixed;left:-999px;top:0';document.body.appendChild(a);a.select();ok=document.execCommand('copy');a.remove()}catch(e){ok=false}}
  toast(ok?'Lista copiada.':'Não foi possível copiar. Selecione o texto manualmente.')},
 print(){const n=this.count();
  const rows=PITEMS.map((t,i)=>`<li><span class="b">${this.sv[i]?'&#9745;':'&#9744;'}</span>${esc(t[0])}</li>`).join('');
  const html=`<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Minha Pasta de Viagem</title><style>body{font:16px/1.5 Georgia,serif;color:#111;margin:40px}h1{font-weight:500;font-size:30px;margin:.2em 0}.k{font:700 11px/1 Arial,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#7A5F1F;margin:0}.p{font:14px Arial,sans-serif;color:#444}ul{list-style:none;padding:0;margin:24px 0;border-top:1px solid #999}li{padding:12px 0;border-bottom:1px solid #ccc;font-size:18px}.b{display:inline-block;width:32px;font-size:22px}.n{font:12px/1.5 Arial,sans-serif;color:#555;border-top:1px solid #999;padding-top:12px}</style></head><body><p class="k">Gordon Travel · Travel Guide</p><h1>Minha Pasta de Viagem</h1><p class="p">${n} de ${PITEMS.length} itens concluídos</p><ul>${rows}</ul><p class="n">Esta lista apoia sua organização e não valida requisitos legais. Regras, horários e requisitos podem mudar: confira as fontes oficiais antes de viajar.</p></body></html>`;
  const f=document.createElement('iframe');f.setAttribute('aria-hidden','true');f.tabIndex=-1;f.style.cssText='position:fixed;right:0;bottom:0;width:0;height:0;border:0';document.body.appendChild(f);
  const d=f.contentWindow.document;d.open();d.write(html);d.close();
  setTimeout(()=>{try{f.contentWindow.focus();f.contentWindow.print()}catch(e){toast('Não foi possível abrir a impressão.')}setTimeout(()=>f.remove(),2000)},150)}
};
(function(){
  $('#gSug').innerHTML=GSUGG.map(s=>`<button type="button" class="gd-chip" data-sug="${esc(s)}">${esc(s)}</button>`).join('');
  $('#pItems').innerHTML=PITEMS.map((t,i)=>`<li><label class="gd-it"><input type="checkbox" data-pi="${i}"><span class="gd-box" aria-hidden="true">${gi('check')}</span><span class="gd-ico" aria-hidden="true">${gi(t[1])}</span><span class="gd-itt">${t[0]}</span></label></li>`).join('');
  Gd.load();Gd.paint();Gd.sync();
  const inp=$('#gq');
  inp.addEventListener('input',()=>Gd.setQ(inp.value));
  $('#gForm').addEventListener('submit',e=>e.preventDefault());
  inp.addEventListener('keydown',e=>{if(e.key==='Escape'&&Gd.q){e.preventDefault();Gd.setQ('')}});
  $('#gClear').addEventListener('click',()=>Gd.setQ('',true));
  $('#gSug').addEventListener('click',e=>{const b=e.target.closest('[data-sug]');if(b)Gd.setQ(b.dataset.sug,true)});
  $('#gCats').addEventListener('click',e=>{const b=e.target.closest('[data-cat]');if(b){Gd.cat=b.dataset.cat;Gd.sync();const x=$(`#gCats [data-cat="${b.dataset.cat}"]`);x&&x.focus({preventScroll:true})}});
  $('#gAll').addEventListener('click',()=>{Gd.cat=Gd.cat==='todos'?'planejamento':'todos';Gd.sync()});
  const acc=e=>{const b=e.target.closest('.gd-qb');if(b){Gd.toggle(b);return}
    const a=e.target.closest('[data-act]');if(!a)return;
    if(a.dataset.act==='pasta')Gd.goPasta();else if(a.dataset.act==='clear')Gd.setQ('',true)};
  ['#gList','#gResL','#gEmpty'].forEach(s=>$(s).addEventListener('click',acc));
  ['#gList','#gResL'].forEach(s=>$(s).addEventListener('keydown',e=>{const b=e.target.closest('.gd-qb');if(!b||!['ArrowDown','ArrowUp','Home','End'].includes(e.key))return;
    const all=$$('.gd-qb',e.currentTarget);let i=all.indexOf(b);i=e.key==='ArrowDown'?(i+1)%all.length:e.key==='ArrowUp'?(i-1+all.length)%all.length:e.key==='Home'?0:all.length-1;e.preventDefault();all[i].focus()}));
  $('#gShort').addEventListener('click',e=>{const a=e.target.closest('[data-act]');if(!a)return;if(a.dataset.act==='search')Gd.goSearch();else Gd.goPasta()});
  $('#pItems').addEventListener('change',e=>{const x=e.target.closest('[data-pi]');if(!x)return;if(x.checked)Gd.sv[x.dataset.pi]=1;else delete Gd.sv[x.dataset.pi];Gd.save();Gd.paint()});
  $('#pReset').addEventListener('click',()=>Gd.reset());
  $('#pPrint').addEventListener('click',()=>Gd.print());
  $('#pCopy').addEventListener('click',()=>Gd.copy());
  document.addEventListener('click',e=>{if(e.target.closest('#pCancel'))Gd.cancelReset()});
  PAGE_HOOKS.guide=()=>{Gd.load();Gd.paint()};
})();

/* ===== Contato 2.0 · Personal Concierge ===== */
(function(){
  const c=CONFIG;
  const I={
   route:'<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>',
   ticket:'<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/><path d="M13 5v2M13 17v2M13 11v2"/>',
   bed:'<path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4M12 4v6M2 18h20"/>',
   msg:'<path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-6.2A8 8 0 1 1 21 12z"/>',
   fb:'<path d="M14 8.5V7a1 1 0 0 1 1-1h2V3h-2.5A4.5 4.5 0 0 0 10 7.5v1H8v3h2V21h3.5v-9.5h2.5l.5-3z"/>',
   ig:'<rect x="2.5" y="2.5" width="19" height="19" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
   mail:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 6L2 7"/>',
   yt:'<rect x="2" y="5" width="20" height="14" rx="4"/><path d="M10 9l5 3-5 3z"/>',
   ext:'<path d="M15 3h6v6M10 14L21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
   copy:'<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
   chk:'<path d="M5 12l5 5 9-10"/>'};
  const ic=n=>`<svg viewBox="0 0 24 24" aria-hidden="true">${I[n]}</svg>`;
  const SUBJ=[
   ['planejar','Planejar uma viagem','route','Olá, Marisa! Gostaria de conversar sobre o planejamento de uma viagem.'],
   ['parques','Parques e ingressos','ticket','Olá, Marisa! Gostaria de informações sobre parques e ingressos.'],
   ['hospedagem','Hospedagem e transporte','bed','Olá, Marisa! Gostaria de informações sobre hospedagem e transporte.'],
   ['outros','Outros assuntos','msg','Olá, Marisa! Gostaria de conversar com você sobre uma viagem.']];
  $('#ctNum').textContent=c.whatsappLabel;
  $('#ctOpts').innerHTML=SUBJ.map((s,i)=>`<label class="ct-opt"><input type="radio" name="ctSubj" value="${s[0]}" ${i===0?'checked':''}><span class="ct-oc">${ic(s[2])}<span class="ct-on">${s[1]}</span><span class="ct-ok" aria-hidden="true">${ic('chk')}</span></span></label>`).join('');
  $('#ctList').innerHTML=`
   <li><span class="ct-li">${ic('ig')}</span><div class="ct-lt"><b>Instagram</b><span>${c.instagramHandle}</span></div><div class="ct-la"><a class="ct-ln" href="${c.instagram}" target="_blank" rel="noopener noreferrer">Abrir perfil${ic('ext')}<span class="ct-sr"> (abre em nova aba)</span></a></div></li>
   <li><span class="ct-li">${ic('fb')}</span><div class="ct-lt"><b>Facebook</b><span>facebook.com/gordontravel</span></div><div class="ct-la"><a class="ct-ln" href="${c.facebook}" target="_blank" rel="noopener noreferrer">Abrir página${ic('ext')}<span class="ct-sr"> (abre em nova aba)</span></a></div></li>
   <li><span class="ct-li">${ic('mail')}</span><div class="ct-lt"><b>E-mail</b><span>${c.email}</span></div><div class="ct-la"><a class="ct-ln" href="mailto:${c.email}">Escrever e-mail${ic('ext')}</a><button type="button" class="ct-ln" data-cp="${c.email}">Copiar endereço${ic('copy')}</button></div></li>
   <li><span class="ct-li">${ic('yt')}</span><div class="ct-lt"><b>YouTube</b><span>@gordontravel6806</span></div><div class="ct-la"><a class="ct-ln" href="${c.youtube}" target="_blank" rel="noopener noreferrer">Abrir canal${ic('ext')}<span class="ct-sr"> (abre em nova aba)</span></a></div></li>`;
  /* mensagem: sempre texto, nunca HTML */
  const GREET=/^\s*(ol[aá]|oi|bom dia|boa tarde|boa noite)(?![a-zà-ú])[\s,!.:;-]*(marisa(?![a-zà-ú]))?[\s,!.:;-]*/i;
  const clean=t=>t.replace(/\r/g,'').split('\n').map(l=>l.replace(/[ \t ]+/g,' ').trim()).filter(Boolean).join('\n');
  function compose(){
    const s=SUBJ.find(x=>x[0]===($('input[name=ctSubj]:checked')||{}).value)||SUBJ[0];
    let name=clean($('#ctName').value).replace(/\n/g,' ').replace(/[.!?,;:\s]+$/,'');
    let det=clean($('#ctDet').value);
    if(det)det=det.replace(GREET,'').replace(/^[a-zà-ú]/,m=>m.toUpperCase());
    let m=s[3];
    if(name)m+=' Meu nome é '+name+'.';
    if(det){if(!/[.!?…]$/.test(det))det+='.';m+=(det.includes('\n')?'\n':' ')+det}
    return m;
  }
  let last='';
  function render(){const m=compose();if(m===last)return;last=m;$('#ctPrev').textContent=m;$('#ctGo').href=wa(m)}
  $('#ctForm').addEventListener('input',render);$('#ctForm').addEventListener('change',render);
  $('#ctForm').addEventListener('submit',e=>e.preventDefault());
  render();
  /* cópia com fallback honesto */
  let st;const say=(m,ok)=>{const e=$('#ctStatus');e.textContent=m;e.classList.toggle('ok',!!ok);clearTimeout(st);st=setTimeout(()=>{e.textContent='';e.classList.remove('ok')},3200)};
  async function tryCopy(t){
    try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(t);return true}}catch(e){}
    try{const a=document.createElement('textarea');a.value=t;a.setAttribute('readonly','');a.style.cssText='position:fixed;left:-999px;top:0';document.body.appendChild(a);a.select();const ok=document.execCommand('copy');a.remove();return !!ok}catch(e){return false}}
  $('#ctCopy').addEventListener('click',async()=>{const t=compose();const ok=await tryCopy(t);const fb=$('#ctFb');
    if(ok){fb.hidden=true;say('Mensagem copiada.',true)}
    else{fb.hidden=false;const x=$('#ctFbT');x.value=t;x.focus();x.select();say('Não foi possível copiar automaticamente. Selecione o texto abaixo.',false)}});
  $('#ctCopyNum').addEventListener('click',async()=>{const ok=await tryCopy(c.whatsappLabel);toast(ok?'Número copiado.':'Não foi possível copiar. Selecione o número manualmente.')});
  $('#ctList').addEventListener('click',async e=>{const b=e.target.closest('[data-cp]');if(!b)return;const ok=await tryCopy(b.dataset.cp);toast(ok?'Endereço copiado.':'Não foi possível copiar. Selecione o endereço manualmente.')});
  /* entrada editorial da ilustração (uma vez) */
  const fig=$('#ctSide');if('IntersectionObserver' in window){fig.classList.add('rv');new IntersectionObserver((es,o)=>{es.forEach(x=>{if(x.isIntersecting){fig.classList.add('seen');o.disconnect()}})},{threshold:.15}).observe(fig)}
})();
show(location.hash.slice(1)||'home');
