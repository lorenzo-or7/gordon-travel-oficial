/* ===== Home: rota dos serviços ===== */
(function(){
  $('#homeRoute').innerHTML=PHASES.map((p,i)=>{const c=SERVICES.filter(s=>s.ph===p.id).length;return `<a class="stop" href="#services" data-go="services" data-ph="${p.id}"><span class="n">${p.n}</span><h3>${p.h}</h3><p>${p.t}</p><span class="ct">${c} ${c===1?'serviço':'serviços'} →</span></a>`}).join('');
})();
/* atalhos que levam a uma seção específica */
document.addEventListener('click',e=>{
  const a=e.target.closest('[data-x],[data-ph],[data-svc],[data-tk],[data-gtopic]');if(!a)return;
  if(a.dataset.x)Expl.sel(a.dataset.x);
  if(a.dataset.ph)Svc.phase(a.dataset.ph);
  if(a.dataset.svc)Svc.open(a.dataset.svc);
  if(a.dataset.tk)setTimeout(()=>Tk.detail(a.dataset.tk,null),50);
  if(a.dataset.gtopic)Gd.topic(a.dataset.gtopic);
},true);

/* ===== Explorer: vitrine de cards ===== */
const XI={
 castle:'<path d="M22 20v-9H2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2Z"/><path d="M18 11V4H6v7M15 22v-4a3 3 0 0 0-6 0v4M22 11V9M2 11V9M6 4V2M18 4V2M10 4V2M14 4V2"/>',
 ticket:'<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2M13 17v2M13 11v2"/>',
 calendar:'<path d="M8 2v4M16 2v4M3 10h18"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/>',
 users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
 headphones:'<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',
 hotel:'<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M10 22v-6.57M14 15.43V22M15 16a5 5 0 0 0-6 0M8 7h.01M12 7h.01M16 7h.01M8 11h.01M12 11h.01M16 11h.01"/>',
 bed:'<path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4M12 4v6M2 18h20"/>',
 house:'<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
 pin:'<path d="M20 10c0 5-5.5 10.2-7.4 11.8a1 1 0 0 1-1.2 0C9.5 20.2 4 15 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
 check:'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
 car:'<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
 bus:'<path d="M8 6v6M15 6v6M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/>',
 train:'<path d="M8 3.1V7a4 4 0 0 0 8 0V3.1M9 15l-1-1M15 15l1-1"/><path d="M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z"/><path d="m8 19-2 3M16 19l2 3"/>',
 route:'<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>',
 pinned:'<path d="M18 8c0 3.6-3.9 7.4-5.4 8.8a1 1 0 0 1-1.2 0C9.9 15.4 6 11.6 6 8a6 6 0 0 1 12 0"/><circle cx="12" cy="8" r="2"/><path d="M8.7 14H5l-2.3 7h18.6L19 14h-3.7"/>',
 bag:'<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18M16 10a4 4 0 0 1-8 0"/>',
 store:'<path d="m2 7 4.4-4.4A2 2 0 0 1 7.8 2h8.4a2 2 0 0 1 1.4.6L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2 2.7 2.7 0 0 1-1.6-.6.7.7 0 0 0-.8 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.6-.6.7.7 0 0 0-.8 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.6-.6.7.7 0 0 0-.8 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.6-.6.7.7 0 0 0-.8 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7"/>',
 utensils:'<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
 camera:'<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
 sparkles:'<path d="M9.9 15.5A2 2 0 0 0 8.5 14.1l-6.1-1.6a.5.5 0 0 1 0-1l6.1-1.6A2 2 0 0 0 9.9 8.5l1.6-6.1a.5.5 0 0 1 1 0l1.6 6.1a2 2 0 0 0 1.4 1.4l6.1 1.6a.5.5 0 0 1 0 1l-6.1 1.6a2 2 0 0 0-1.4 1.4l-1.6 6.1a.5.5 0 0 1-1 0z"/><path d="M20 3v4M22 5h-4M4 17v2M5 18H3"/>',
 landing:'<path d="M2 22h20"/><path d="M3.8 10.8 2 9l2-4.5 1.1.6c.6.3.9.8.9 1.4s.4 1.2.9 1.5L8 8.5l3-6 1 .5a2 2 0 0 1 1.1 1.5l.7 5.4a2 2 0 0 0 1.1 1.5l4.4 2.2c.4.2.8.6 1 1l.6 1c.5.9-.1 2-1.1 2.1l-1.2.2c-.5.1-1 0-1.4-.2L4.3 11.2a2 2 0 0 1-.5-.4Z"/>',
 bell:'<path d="M3 20a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1Z"/><path d="M20 16a8 8 0 1 0-16 0M12 4v4M10 4h4"/>',
 carfront:'<path d="m21 8-2 2-1.5-3.7A2 2 0 0 0 15.6 5H8.4a2 2 0 0 0-1.9 1.3L5 10 3 8"/><rect x="2" y="10" width="20" height="8" rx="2"/><path d="M7 14h.01M17 14h.01M5 18v2M19 18v2"/>',
 compass:'<circle cx="12" cy="12" r="10"/><path d="m16.2 7.8-1.8 5.4a2 2 0 0 1-1.3 1.3l-5.4 1.8 1.8-5.4a2 2 0 0 1 1.3-1.3z"/>',
 ship:'<path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M19.4 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.9 5.3 2.8 7.8M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6M12 10v4M12 2v3"/>',
 takeoff:'<path d="M2 22h20"/><path d="m6.4 17.4-2.4-.4-2-4 1.1-.6a2 2 0 0 1 1.8 0l.2.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.5a2 2 0 0 1 2.1.2l4 3a2 2 0 0 0 2.1.2l4.2-2.1a2.4 2.4 0 0 1 1.7-.2L21 7a1.4 1.4 0 0 1 .9 2l-.4.8c-.2.5-.6.8-1.1 1.1L7.6 17.2a2 2 0 0 1-1.2.2Z"/>',
 sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4"/>',
 arr:'<path d="M5 12h14M13 6l6 6-6 6"/>'
};
const xi=n=>`<svg viewBox="0 0 24 24" aria-hidden="true">${XI[n]}</svg>`;
const Expl={
 act(a,cls){
  if(a.wa)return `<a class="${cls}" href="#" data-wa="${esc(a.wa)}">${a.t}${cls==='btn sm xc-p'?xi('arr').replace('<svg','<svg class="arr"'):''}</a>`;
  return `<a class="${cls}" href="${a.href}" ${a.attr}>${a.t}${cls==='btn sm xc-p'?xi('arr').replace('<svg','<svg class="arr"'):''}</a>`;
 },
 card(x){
  const sm=x.k2?`<span class="xc-sm"><img data-k="${x.k2}" alt="Mesa com hambúrguer, batatas e milkshake em um restaurante ao entardecer"></span>`:'';
  return `<article class="xc" id="xc-${x.id}" data-xc="${x.id}" aria-labelledby="xc-${x.id}-t">
   <figure class="dframe"><div class="dframe-in"><img data-k="${x.k}" alt="${esc(x.alt)}">${sm}</div></figure>
   <h3 class="xc-h" id="xc-${x.id}-t">${x.h}</h3>
   <p class="xc-m">${x.m}</p>
   <ul class="xc-chips" aria-label="Destaques">${x.kw.map(([i,t])=>`<li class="kchip">${xi(i)}${t}</li>`).join('')}</ul>
   <div class="xc-cta">${this.act(x.a,'btn sm xc-p')}${this.act(x.b,'xc-s')}</div>
  </article>`;
 },
 plan(){
  const x=EXPL_PLAN;
  return `<article class="xc xc-plan" id="xc-planejamento" aria-labelledby="xc-planejamento-t">
   <img class="bgi" data-k="${x.k}" alt="">
   <span class="eyebrow">Atendimento</span>
   <h3 class="xc-h" id="xc-planejamento-t">${x.h}</h3>
   <p class="xc-m">${x.m}</p>
   <div class="xc-cta"><a class="btn sm xc-p" href="#journey" data-go="journey">Montar minha viagem${xi('arr').replace('<svg','<svg class="arr"')}</a><a class="xc-s" href="#" data-wa="Olá, Marisa! Quero conversar sobre a minha viagem a Orlando.">Falar pelo WhatsApp</a></div>
  </article>`;
 },
 sel(id){
  /* chamado pelos atalhos da Home: rola até o card e o destaca */
  setTimeout(()=>{const c=$('#xc-'+id);if(!c)return;
   const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
   c.scrollIntoView({block:'center',behavior:rm?'auto':'smooth'});
   c.classList.remove('picked');void c.offsetWidth;c.classList.add('picked');
   setTimeout(()=>c.classList.remove('picked'),2200)},90);
 }
};
(function(){
  $('#xcGrid').innerHTML=EXPL.map(x=>Expl.card(x)).join('')+Expl.plan();
  hydrate($('#xcGrid'));
  /* atalho Tickets filtrado por categoria */
  $('#xcGrid').addEventListener('click',e=>{const a=e.target.closest('[data-tf]');if(a){Tk.f=a.dataset.tf;Tk.render()}},true);
})();

/* ===== Services ===== */
const WHOD={proprio:'Serviço prestado diretamente pela agência, conforme contratação.',misto:'Orientação da agência, com execução ou contratação envolvendo terceiros.',parceiro:'Produto comercializado ou contratado por meio do portal correspondente.'};
const SVI={roteiros:'route',hospedagem:'hotel',carros:'car',grupos:'users',cruzeiros:'ship',chegada:'landing',transfer:'bus',parques:'castle',presencial:'pin',compras:'bag',passeios:'camera',remoto:'headphones',outras:'sparkles'};
const Svc={ph:'planeje',openId:'',
 phase(id){if(!PHASES.some(p=>p.id===id))return;this.ph=id;this.openId='';this.sync(true)},
 open(id){const s=SERVICES.find(x=>x.id===id);if(!s)return;this.ph=s.ph;this.openId=id;this.sync(true);setTimeout(()=>{const b=$('#sb-'+id);if(b)b.scrollIntoView({block:'center',behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'})},120)},
 build(){
  $('#phs').innerHTML=PHASES.map(p=>`<button type="button" role="tab" id="tab-${p.id}" data-p="${p.id}" aria-selected="false" aria-controls="svp-${p.id}" tabindex="-1"><span class="ic">${xi(p.ic)}</span><span class="nm"><em>${p.no}</em>${p.n}</span><small>${p.tg}</small></button>`).join('')+'<span class="sv-ind" aria-hidden="true"></span>';
  $('#svImgs').innerHTML=PHASES.map(p=>`<img data-ph="${p.id}" src="${IMGS[p.k].u}" width="${IMGS[p.k].w}" height="${IMGS[p.k].h}" alt="${esc(p.alt)}">`).join('');
  $('#phBody').innerHTML=PHASES.map(p=>{const list=SERVICES.filter(s=>s.ph===p.id);
   return `<div class="sv-pane" role="tabpanel" id="svp-${p.id}" aria-labelledby="tab-${p.id}" data-pane="${p.id}" hidden><p class="eyebrow">${p.no} · ${p.n} · ${list.length} ${list.length===1?'serviço':'serviços'}</p><h2>${p.h}</h2><p class="muted sv-d">${p.t}</p>
   <div class="sv-list">${list.map((s,i)=>`<div class="sv-item" data-item="${s.id}" style="--i:${i}"><h3 class="sv-it"><button type="button" id="sb-${s.id}" data-sv="${s.id}" aria-expanded="false" aria-controls="sd-${s.id}"><span class="sv-ic">${xi(SVI[s.id])}</span><span class="sv-tx"><b>${s.t}</b><small>${s.s}</small></span><span class="sv-tg" aria-hidden="true"></span></button></h3>
    <div class="sv-reg" id="sd-${s.id}" role="region" aria-labelledby="sb-${s.id}"><div><div class="sv-in"><p class="sv-type"><i class="dot ${s.who}"></i><span><b>${WHO[s.who]}</b>${WHOD[s.who]}</span></p><p>${s.d}</p>
    <div class="acts"><a class="btn sm" href="#" data-wa="Olá, Marisa! Gostaria de saber mais sobre: ${s.t}.">Solicitar informações</a><a class="btn sm ghost" href="#journey" data-go="journey">Planejar a viagem</a>${s.tk?`<a class="btn sm ghost" href="#tickets" data-go="tickets" data-tk="${s.tk==='aluguel'?'carros':s.tk}">Ver em Gordon Tickets</a>`:''}</div></div></div></div></div>`).join('')}</div></div>`}).join('');
 },
 edges(){const tb=$('#phs');if(!tb)return;const m=tb.scrollWidth-tb.clientWidth;tb.classList.toggle('m-l',m>2&&tb.scrollLeft>4);tb.classList.toggle('m-r',m>2&&tb.scrollLeft<m-4)},
 ind(){const t=$('.sv-ind',$('#phs')),b=$('#phs [aria-selected="true"]');if(!t||!b||!b.offsetWidth)return;t.style.setProperty('--ix',b.offsetLeft+'px');t.style.setProperty('--iw',b.offsetWidth+'px')},
 sync(anim){
  $$('#phs [data-p]').forEach(b=>{const on=b.dataset.p===this.ph;b.setAttribute('aria-selected',on);b.tabIndex=on?0:-1});
  $$('#svImgs img').forEach(i=>{const on=i.dataset.ph===this.ph;i.classList.toggle('on',on);i.setAttribute('aria-hidden',!on)});
  $$('#phBody .sv-pane').forEach(pn=>{const on=pn.dataset.pane===this.ph;const was=!pn.hidden;pn.hidden=!on;if(on&&(anim||!was)){pn.classList.remove('in');void pn.offsetWidth;pn.classList.add('in')}});
  $$('#phBody .sv-item').forEach(it=>{const on=it.dataset.item===this.openId;it.classList.toggle('open',on);$('[data-sv]',it).setAttribute('aria-expanded',on)});
  this.ind();const tb=$('#phs'),t=$('#phs [aria-selected="true"]');if(t&&tb.scrollWidth>tb.clientWidth+1){const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;tb.scrollTo({left:Math.max(0,t.offsetLeft-(tb.clientWidth-t.offsetWidth)/2),behavior:(rm||!anim)?'auto':'smooth'})}this.edges();
 }};
PAGE_HOOKS.services=()=>Svc.sync(false);
(function(){
  Svc.build();
  const tabs=$('#phs');
  tabs.addEventListener('click',e=>{const b=e.target.closest('[data-p]');if(b)Svc.phase(b.dataset.p)});
  tabs.addEventListener('keydown',e=>{const k=e.key;if(!['ArrowLeft','ArrowRight','Home','End'].includes(k))return;e.preventDefault();
   const i=PHASES.findIndex(p=>p.id===Svc.ph);const n=k==='Home'?0:k==='End'?PHASES.length-1:(i+(k==='ArrowRight'?1:-1)+PHASES.length)%PHASES.length;
   Svc.phase(PHASES[n].id);$('#tab-'+PHASES[n].id).focus()});
  const body=$('#phBody');
  body.addEventListener('click',e=>{const b=e.target.closest('[data-sv]');if(!b)return;const id=b.dataset.sv;Svc.openId=Svc.openId===id?'':id;Svc.sync(false)});
  body.addEventListener('keydown',e=>{if(e.key!=='Escape'||!Svc.openId)return;const b=$('#sb-'+Svc.openId);Svc.openId='';Svc.sync(false);if(b)b.focus()});
  tabs.addEventListener('scroll',()=>Svc.edges(),{passive:true});
  window.addEventListener('resize',()=>{Svc.ind();Svc.edges()});
  Svc.sync(false);
})();

/* ===== Tickets ===== */
const Tk={f:'todos',
 detail(id,opener){const t=TICKETS.find(x=>x.id===id);if(!t)return;
  const cat=(TFILTERS.find(f=>f[0]===t.cat)||['',''])[1];
  const ico=p=>`<svg viewBox="0 0 24 24" aria-hidden="true">${p}</svg>`;
  Modal.open(`<article class="tkm">
  <header class="tkm-h"><p class="tkm-cat"><span>${esc(cat)}</span><span class="tag">Produto de parceiro</span></p><h3 id="mTitle" data-mt>${t.n}</h3></header>
  <p class="tkm-lede">${t.l}</p>
  <section class="tkm-blk" aria-labelledby="mConsid"><h4 id="mConsid">${ico('<path d="M12 3l2.4 5.2 5.6.7-4.1 3.9 1.1 5.6L12 15.6 7 18.4l1.1-5.6L4 8.9l5.6-.7z"/>')}O que considerar</h4>
   <ul>${t.c.map(c=>`<li>${ico('<path d="M5 12.5l4.2 4.2L19 7"/>')}<span>${c}</span></li>`).join('')}</ul></section>
  <section class="tkm-blk" aria-labelledby="mFaq"><h4 id="mFaq">${ico('<circle cx="12" cy="12" r="9"/><path d="M9.6 9.3a2.5 2.5 0 1 1 3.4 2.3c-.7.3-1 .9-1 1.6M12 17h.01"/>')}Perguntas frequentes</h4>
   <div class="tkm-faq">${t.f.map(([q,a])=>`<details><summary>${q}</summary><div class="in"><p>${a}</p></div></details>`).join('')}</div></section>
  <p class="tkm-note">${ico('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>')}<span>Preços e disponibilidade ficam apenas no portal. Este site não vende nem emite ingressos.</span></p>
  <footer class="tkm-acts"><a class="btn" href="${CONFIG.portal}" target="_blank" rel="noopener">Acessar o portal parceiro</a><a class="btn ghost" href="#" data-wa="Olá, Marisa! Tenho dúvidas sobre: ${t.n}.">Falar com a equipe</a></footer>
  </article>`,opener)},
 render(){
  let n=0;$$('#tkGrid .prod').forEach(p=>{const ok=this.f==='todos'||p.dataset.c===this.f;p.classList.toggle('hide',!ok);if(ok)n++});
  $$('#tkChips .chip').forEach(c=>c.setAttribute('aria-pressed',c.dataset.f===this.f));
  $('#tkCount').textContent=n+(n===1?' produto':' produtos')+(this.f==='todos'?'':' em '+lab(TFILTERS,this.f));
 }};
(function(){
  $('#tkChips').innerHTML=TFILTERS.map(f=>`<button type="button" class="chip" aria-pressed="${f[0]==='todos'}" data-f="${f[0]}">${f[1]}</button>`).join('');
  $('#tkGrid').innerHTML=TICKETS.map((t,i)=>`<button type="button" class="prod p${i+1}" data-c="${t.cat}" data-t="${t.id}"><span class="im"><img data-k="${t.k}" alt="${esc(t.alt)}"></span><span class="tx"><span class="tag">${lab(TFILTERS,t.cat)}</span><b>${t.n}</b><span class="s">${t.s}</span><span class="go">Ver detalhes →</span></span></button>`).join('');
  hydrate($('#tkGrid'));
  $('#tkChips').addEventListener('click',e=>{const c=e.target.closest('[data-f]');if(c){Tk.f=c.dataset.f;Tk.render()}});
  $('#tkGrid').addEventListener('click',e=>{const p=e.target.closest('[data-t]');if(p)Tk.detail(p.dataset.t,p)});
  Tk.render();
})();

/* ===== Home: avião na rota ===== */
(function(){
  const rt=$('#homeRoute');if(!rt)return;
  const plane=document.createElement('span');plane.className='plane';plane.setAttribute('aria-hidden','true');
  plane.innerHTML='<svg viewBox="0 0 24 24"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"/></svg>';
  rt.appendChild(plane);
  const stops=$$('.stop',rt);let cur=0,timer=[];
  const vertical=()=>matchMedia('(max-width:820px)').matches;
  function place(i,fly){
    const s=stops[i];if(!s||!rt.offsetWidth)return;cur=i;
    if(vertical()){rt.style.setProperty('--py',(s.offsetTop+7-14)+'px')}else{rt.style.setProperty('--px',(s.offsetLeft+7-14)+'px')}
    stops.forEach((x,k)=>x.classList.toggle('here',k===i));
    if(fly){plane.classList.remove('fly');void plane.offsetWidth;plane.classList.add('fly')}
  }
  const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  function tour(){timer.forEach(clearTimeout);timer=[];place(0,false);if(reduce)return;stops.forEach((_,i)=>{if(i>0)timer.push(setTimeout(()=>place(i,true),i*1100))})}
  stops.forEach((s,i)=>{const go=()=>{timer.forEach(clearTimeout);place(i,true)};s.addEventListener('mouseenter',go);s.addEventListener('focus',go)});
  window.addEventListener('resize',()=>place(cur,false));
  PAGE_HOOKS.home=()=>setTimeout(()=>place(cur,false),30);
  place(0,false);
  if('IntersectionObserver' in window){const io=new IntersectionObserver(en=>{if(en[0].isIntersecting){tour();io.disconnect()}},{threshold:.5});io.observe(rt)}
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>place(cur,false));
})();

/* ===== Home: Meet Marisa · credencial 3D (Lanyard, carregado sob demanda) ===== */
(function(){
  const root=$('#lny');if(!root)return;
  const cv=$('#lnyCv'),flipB=$('#lnyFlip'),flipT=$('#lnyFlipT'),hint=$('#lnyHint'),imgs=$$('#lnyFb img');
  const rm=matchMedia('(prefers-reduced-motion:reduce)');
  let inst=null,back=false,loaded=false,tried=false;
  const setBack=b=>{back=b;flipB.setAttribute('aria-pressed',b);flipT.textContent=b?'Ver a frente':'Ver o verso';imgs[0].hidden=b;imgs[1].hidden=!b};
  const fallback=()=>{root.classList.add('is-fb');hint.textContent=rm.matches?'Credencial Gordon Travel':'Credencial Gordon Travel';};
  const webgl=()=>{try{const c=document.createElement('canvas');return !!(window.WebGLRenderingContext&&(c.getContext('webgl2')||c.getContext('webgl')))}catch(e){return false}};
  const need=()=>window.GTLanyard?Promise.resolve():new Promise((res,rej)=>{
    const s=document.createElement('script'),inl=$('#lnySrc');
    if(inl){s.textContent=inl.textContent;document.head.appendChild(s);res()}
    else{s.src=window.GT_LNY_URL||'assets/lanyard.bundle.js';s.onload=res;s.onerror=rej;document.head.appendChild(s)}});
  function boot(){
    if(tried)return;tried=true;
    if(rm.matches||!webgl()){fallback();return}
    need().then(()=>{
      const K=k=>IMGS[k].u;
      inst=window.GTLanyard.mount(cv,{frontImage:K('lny_front'),backImage:K('lny_back'),strapImage:K('lny_strap'),cardColor:'#0D1D29',strapColor:'#0D1D29',finish:'glossy',metal:'gold',orientation:'portrait',size:.54,strapLength:.42,strapWidth:.62,gravity:1,damping:.5,elasticity:.5,breeze:.35,interactive:true,intro:true});
      if(!inst.ok){inst=null;fallback();return}
      loaded=true;
      const cn=cv.querySelector('canvas');if(cn)cn.setAttribute('aria-hidden','true');
    }).catch(()=>{inst=null;fallback()});
  }
  flipB.addEventListener('click',()=>{
    if(inst&&loaded){inst.flip();setBack(!back)}else setBack(!back);
  });
  setInterval(()=>{if(inst&&loaded&&!document.hidden){const b=inst.isBack();if(b!==back)setBack(b)}},300);
  /* rede de segurança: se uma notificação do IntersectionObserver se perder (rolagem suave + thread ocupada), retoma a simulação quando o palco estiver à vista */
  setInterval(()=>{if(inst&&loaded&&root.offsetParent!==null)inst.kick()},1000);
  rm.addEventListener&&rm.addEventListener('change',()=>{if(rm.matches&&inst){inst.destroy();inst=null;cv.innerHTML='';fallback()}});
  if('IntersectionObserver' in window){const io=new IntersectionObserver(en=>{if(en[0].isIntersecting){boot();io.disconnect()}},{threshold:.2});io.observe(root)}else boot();
})();
