/* ===== Lightbox genérico ===== */
const SETS={stories:STORIES.map(s=>({k:s.k,alt:s.alt})),certs:CERTS.map(c=>({k:c.k,alt:c.alt,cap:c.t+' · '+c.m}))};
const lb={el:$('#lb'),set:null,list:null,i:0,opener:null};
function lbShow(){const it=lb.list[lb.i];const d=IMGS[it.k];const im=$('#lbImg');im.style.animation='none';void im.offsetWidth;im.style.animation='';im.src=d.u;im.alt=it.alt;
  $('#lbCap').textContent=it.cap||it.alt;$('#lbCount').textContent=(lb.set==='certs'?'Certificado ':'Foto ')+(lb.i+1)+' de '+lb.list.length;lbZoom(false);$('#lbZoom').hidden=lb.set!=='certs';
  $('#lbDots').innerHTML=lb.list.length>1?lb.list.map((_,i)=>`<i class="${i===lb.i?'on':''}"></i>`).join(''):'';
  const one=lb.list.length<2;$('#lbPrev').hidden=one;$('#lbNext').hidden=one}
function lbOpen(set,i,opener,list){lb.set=set;lb.list=list||SETS[set];lb.i=i;lb.opener=opener;lb.el.classList.add('on');document.body.style.overflow='hidden';lbShow();$('#lbClose').focus()}
function lbZoom(on){lb.el.classList.toggle('zoomed',on);const z=$('#lbZoom');z.setAttribute('aria-pressed',on);z.setAttribute('aria-label',on?'Reduzir certificado':'Ampliar certificado')}
$('#lbZoom').addEventListener('click',()=>lbZoom(!lb.el.classList.contains('zoomed')));
function lbClose(){lbZoom(false);lb.el.classList.remove('on');document.body.style.overflow='';if(lb.opener)lb.opener.focus({preventScroll:true})}
function lbMove(d){const n=lb.list.length;lb.i=(lb.i+d+n)%n;lbShow()}
$('#lbClose').addEventListener('click',lbClose);$('#lbPrev').addEventListener('click',()=>lbMove(-1));$('#lbNext').addEventListener('click',()=>lbMove(1));
lb.el.addEventListener('click',e=>{if(e.target===lb.el||e.target.classList.contains('lb-stage'))lbClose()});
lb.el.addEventListener('keydown',e=>{
  if(e.key==='Escape')lbClose();else if(e.key==='ArrowLeft')lbMove(-1);else if(e.key==='ArrowRight')lbMove(1);
  else if(e.key==='Tab'){const f=$$('button',lb.el).filter(b=>!b.hidden);const a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}
});
let tx=null;lb.el.addEventListener('touchstart',e=>{tx=e.touches[0].clientX},{passive:true});
lb.el.addEventListener('touchend',e=>{if(tx==null)return;const dx=e.changedTouches[0].clientX-tx;if(Math.abs(dx)>50&&lb.list.length>1)lbMove(dx<0?1:-1);tx=null});

/* ===== Stories ===== */
const St={f:'todas',items:[],
 render(){
  const vis=STORIES.filter(s=>this.f==='todas'||s.tags.includes(this.f));
  $('#sgrid').innerHTML=STORIES.map((s,i)=>`<button type="button" data-i="${i}" class="${i===0||i===5?'big':''} ${vis.includes(s)?'':'hide'}" aria-label="Ampliar: ${esc(s.alt)}"><img data-k="${s.k}" alt="${esc(s.alt)}"></button>`).join('');
  hydrate($('#sgrid'));
  $$('#stChips .chip').forEach(c=>c.setAttribute('aria-pressed',c.dataset.f===this.f));
  $('#stCount').textContent=vis.length+(vis.length===1?' foto':' fotos')+(this.f==='todas'?'':' em '+lab(STAGS,this.f));
  this.items=vis;this.layout();
 },
 layout(){
  const g=$('#sgrid');if(!g||!g.offsetWidth)return;
  const cs=getComputedStyle(g),cols=cs.gridTemplateColumns.split(' ').length,gap=parseFloat(cs.columnGap)||0;
  const cw=(g.clientWidth-gap*(cols-1))/cols;
  $$('button',g).forEach(b=>{const im=b.firstChild;const d=IMGS[STORIES[+b.dataset.i].k];const w=b.classList.contains('big')&&cols>1?cw*2+gap:cw;const h=w*d.h/d.w;b.style.gridRowEnd='span '+Math.ceil((h+gap)/8)});
 }};
(function(){
  $('#stChips').innerHTML=STAGS.map(f=>`<button type="button" class="chip" aria-pressed="${f[0]==='todas'}" data-f="${f[0]}">${f[1]}</button>`).join('');
  $('#stChips').addEventListener('click',e=>{const c=e.target.closest('[data-f]');if(c){St.f=c.dataset.f;St.render()}});
  $('#sgrid').addEventListener('click',e=>{const b=e.target.closest('[data-i]');if(!b)return;const list=St.items.map(s=>({k:s.k,alt:s.alt}));lbOpen('stories',St.items.indexOf(STORIES[+b.dataset.i]),b,list)});
  window.addEventListener('resize',()=>St.layout());
  PAGE_HOOKS.stories=()=>setTimeout(()=>St.layout(),30);
  St.render();
})();

/* ===== Nossa História: The Gordon Memories ===== */
const RM=()=>matchMedia('(prefers-reduced-motion:reduce)').matches;
const Ch={i:0,busy:false,
 build(){
  const n=CHAPTERS.length;
  $('#chl').innerHTML=CHAPTERS.map((c,i)=>`<button type="button" role="tab" id="ch-t${i}" data-c="${i}" aria-selected="false" aria-controls="chBody" tabindex="-1"><span class="y">${String(i+1).padStart(2,'0')} · ${c.lb}</span><span class="t">${c.t}</span></button>`).join('')+'<span class="hs-ind" aria-hidden="true"></span>';
  $('#chBody').innerHTML=`<div class="hs-pa"><div class="hs-fig" id="chFig"></div><div class="hs-tx"><p class="hs-cap" id="chCap"></p><div class="hs-by" id="chBy" aria-hidden="true"></div><h3 id="chT"></h3><p id="chD"></p>
   <div class="hs-nav"><button class="btn sm ghost" type="button" data-cp aria-label="Capítulo anterior">Anterior</button><span class="hs-count" id="chCount" aria-hidden="true"></span><button class="btn sm" type="button" data-cn aria-label="Próximo capítulo">Próximo</button></div></div></div>`;
 },
 fig(c){
  if(c.k){const ill=c.cap==='Ilustração';const d=IMGS[c.k];return `<div class="hs-print ${ill?'ill':''}" style="--ar:${d.w}/${d.h}"><div class="dframe"><div class="dframe-in"><img src="${IMGS[c.k].u}" alt="${esc(ill?'Cartão de embarque da Gordon Travel, ilustração':c.cap)}"></div></div><span class="hs-pcap">${c.cap}</span></div>`}
  return `<div class="hs-stub" role="img" aria-label="${esc(c.stub[0]+': '+c.stub[1])}"><span class="s1">${c.stub[0]}</span><span class="s2">${c.stub[1]}</span><i></i><span class="s3">Gordon Travel</span></div>`;
 },
 fill(){
  const c=CHAPTERS[this.i];
  $('#chFig').innerHTML=this.fig(c);
  $('#chCap').textContent='Capítulo '+String(this.i+1).padStart(2,'0')+' · '+c.lb;
  $('#chBy').textContent=c.by;$('#chT').textContent=c.t;$('#chD').textContent=c.d;
  $('#chCount').textContent=String(this.i+1).padStart(2,'0')+' / '+String(CHAPTERS.length).padStart(2,'0');
  $('#chBody').setAttribute('aria-labelledby','ch-t'+this.i);
  $('[data-cp]').disabled=this.i===0;$('[data-cn]').disabled=this.i===CHAPTERS.length-1;
  $$('#chl [data-c]').forEach((b,j)=>{const on=j===this.i;b.setAttribute('aria-selected',on);b.tabIndex=on?0:-1});
  this.ind();
 },
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
PAGE_HOOKS.historia=()=>{Ch.ind();Ch.fill()};
(function(){
  Ch.build();Ch.fill();
  const l=$('#chl');
  l.addEventListener('click',e=>{const b=e.target.closest('[data-c]');if(b)Ch.go(+b.dataset.c,true)});
  l.addEventListener('keydown',e=>{const k=e.key;if(!['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Home','End'].includes(k))return;e.preventDefault();
   const n=CHAPTERS.length;const i=k==='Home'?0:k==='End'?n-1:Math.max(0,Math.min(n-1,Ch.i+((k==='ArrowDown'||k==='ArrowRight')?1:-1)));Ch.go(i);$('#ch-t'+i).focus()});
  $('#chBody').addEventListener('click',e=>{if(e.target.closest('[data-cn]'))Ch.go(Ch.i+1);if(e.target.closest('[data-cp]'))Ch.go(Ch.i-1)});
  window.addEventListener('resize',()=>Ch.ind());
  /* capa: rolar até o álbum */
  document.addEventListener('click',e=>{const a=e.target.closest('[data-scroll]');if(!a)return;e.preventDefault();const t=$('#'+a.dataset.scroll);if(t)t.scrollIntoView({behavior:RM()?'auto':'smooth',block:'start'})});
  /* ponte: revelação ao entrar na tela */
  const br=$('.hs-bridge');if(br&&'IntersectionObserver' in window){br.classList.add('rv');new IntersectionObserver((es,o)=>{es.forEach(x=>{if(x.isIntersecting){br.classList.add('seen');o.disconnect()}})},{threshold:.25}).observe(br)}
  /* valores */
  const vg=$('#vgrid'),vh=$('#vhl');
  const V={i:0,fill(anim){const v=VALUES[this.i];
   vh.innerHTML=`<span class="vn" aria-hidden="true">${String(this.i+1).padStart(2,'0')}</span><span class="vi">${xi(v[2])}</span><h3>${v[0]}</h3><p>${v[1]}</p>`;
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

/* ===== Travel Guide ===== */
const Gd={f:'todos',q:'',topic(id){this.f=id;this.q='';const i=$('#gq');if(i)i.value='';this.render()},
 render(){
  const q=this.q.trim().toLowerCase();
  const hi=t=>{if(!q)return esc(t);const e=esc(t);const re=new RegExp('('+q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')','ig');return e.replace(re,'<mark>$1</mark>')};
  const list=GUIDE.filter(g=>(this.f==='todos'||g.topic===this.f)&&(!q||(g.q+' '+g.a+' '+(GKW[+g.id.slice(1)]||'')).toLowerCase().includes(q)));
  $$('#gChips .chip').forEach(c=>c.setAttribute('aria-pressed',c.dataset.f===this.f));
  $('#gCount').textContent=list.length+(list.length===1?' pergunta':' perguntas')+(q?' para "'+this.q.trim()+'"':'');
  $('#gList').innerHTML=list.length?list.map((g,i)=>`<details class="gq" ${q&&list.length<4?'open':''}><summary><span><span class="tg">${lab(GTOPICS,g.topic)}</span>${hi(g.q)}</span></summary><div class="in">${g.verify?'<span class="badge">Sujeito a alteração</span>':''}<p>${hi(g.a)}</p>${g.extra==='pasta'?'<div class="pasta" id="pasta"></div>':''}${g.links.length?`<div class="links">${g.links.map(k=>`<a class="pill" href="${OFFICIAL[k][1]}" target="_blank" rel="noopener">${OFFICIAL[k][0]} ↗</a>`).join('')}</div>`:''}</div></details>`).join(''):'<p class="note">Nenhuma pergunta encontrada. Tente outra palavra ou fale com a equipe.</p>';
  Gd.pasta();
 },
 pasta(){const el=$('#pasta');if(!el)return;const items=['Documentos de viagem','Comprovantes de reservas','Contatos de emergência','Informações do seguro','Versão digital e impressa'];
  let sv={};try{sv=JSON.parse(store.get('gt-pasta')||'{}')}catch(e){}
  el.innerHTML='<span class="lbl">Minha pasta de viagem</span><ul class="checklist" style="margin-top:.5rem">'+items.map((t,i)=>`<li><label><input type="checkbox" data-pi="${i}" ${sv[i]?'checked':''}><span>${t}</span></label></li>`).join('')+'</ul>';
  el.addEventListener('change',()=>{const o={};$$('[data-pi]',el).forEach((x,i)=>{if(x.checked)o[i]=1});store.set('gt-pasta',JSON.stringify(o))});
 }};
(function(){
  $('#gChips').innerHTML=GTOPICS.map(f=>`<button type="button" class="chip" aria-pressed="${f[0]==='todos'}" data-f="${f[0]}">${f[1]}</button>`).join('');
  $('#gChips').addEventListener('click',e=>{const c=e.target.closest('[data-f]');if(c){Gd.f=c.dataset.f;Gd.render()}});
  $('#gq').addEventListener('input',e=>{Gd.q=e.target.value;Gd.render()});
  Gd.render();
})();

/* ===== Contato ===== */
(function(){
  const c=CONFIG;
  $('#chan').innerHTML=`<div class="ch main"><span class="tag">Caminho mais rápido</span><b>WhatsApp</b><span class="val">${c.whatsappLabel}</span><div class="acts"><a class="btn" href="#" data-wa="Olá! Gostaria de falar com a Gordon Travel.">Abrir conversa</a><button class="btn ghost" type="button" data-cp="${c.whatsappLabel}">Copiar número</button></div></div>
   <div class="ch"><span class="tag">Fotos e novidades</span><b>Instagram</b><span class="val">${c.instagramHandle}</span><div class="acts"><a class="btn sm ghost" href="${c.instagram}" target="_blank" rel="noopener">Abrir perfil ↗</a></div></div>
   <div class="ch"><span class="tag">Assuntos mais longos</span><b>E-mail</b><span class="val">${c.email}</span><div class="acts"><button class="btn sm ghost" type="button" data-cp="${c.email}">Copiar e-mail</button></div></div>
   <div class="ch"><span class="tag">Vídeos</span><b>YouTube</b><span class="val">@gordontravel6806</span><div class="acts"><a class="btn sm ghost" href="${c.youtube}" target="_blank" rel="noopener">Abrir canal ↗</a></div></div>
   <div class="ch"><span class="tag">Site</span><b>${c.site}</b><span class="val">Domínio indicado no projeto anterior</span></div>`;
  $('#chan').addEventListener('click',e=>{const b=e.target.closest('[data-cp]');if(b)copy(b.dataset.cp,'Copiado.')});
  const msg=()=>{const n=$('#cname').value.trim(),m=$('#cmsg').value.trim();return n?m+'\n\n'+n:m};
  $('#cform').addEventListener('submit',e=>{e.preventDefault();if(!$('#cmsg').value.trim()){$('#cerr').textContent='Escreva uma mensagem para continuar.';$('#cmsg').focus();return}$('#cerr').textContent='';const a=document.createElement('a');a.href=wa(msg());a.target='_blank';a.rel='noopener';document.body.appendChild(a);a.click();a.remove()});
  $('#ccopy').addEventListener('click',()=>{if(!$('#cmsg').value.trim()){$('#cerr').textContent='Escreva uma mensagem para continuar.';return}$('#cerr').textContent='';copy(msg(),'Mensagem copiada.')});
})();
show(location.hash.slice(1)||'home');
