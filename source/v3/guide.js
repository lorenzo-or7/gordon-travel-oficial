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
