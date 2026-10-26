/* ===== Journey + cartão de embarque ===== */
const J0=()=>({step:0,destino:'',destinoOutro:'',interesses:[],adultos:2,criancas:0,idades:[],datasModo:'nao',ini:'',fim:'',mes:'',dias:'',orcamento:'',hospedagem:'',transporte:'',experiencias:'',obs:'',nome:'',msg:'',msgEdited:false,confirmReset:false});
let J=J0();
const lab=(list,id)=>{const r=list.find(x=>x[0]===id);return r?r[1]:''};
const fdate=s=>s?s.split('-').reverse().join('/'):'';
const MESES=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
const mlabel=m=>{if(!m)return '';const p=m.split('-');return MESES[+p[1]-1]+' de '+p[0]};
const todayStr=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
function jDest(){return J.destino==='outro'?(J.destinoOutro.trim()?'Outro: '+J.destinoOutro.trim():'Outro destino'):lab(JOPT.destino,J.destino)}
function jTrav(){let v=J.adultos+(J.adultos===1?' adulto':' adultos');if(J.criancas)v+=' e '+J.criancas+(J.criancas===1?' criança':' crianças');const ag=J.idades.slice(0,J.criancas).filter(x=>x!==''&&x!=null).join(', ');if(ag)v+=' (idades: '+ag+')';return v}
function jDates(){
  if(J.datasModo==='definidas')return (J.ini&&J.fim)?fdate(J.ini)+' a '+fdate(J.fim):(J.ini?'A partir de '+fdate(J.ini):'Datas a definir');
  if(J.datasModo==='flexiveis')return 'Datas flexíveis'+(J.mes?', por volta de '+mlabel(J.mes):'')+(J.dias?', cerca de '+J.dias+' dias':'');
  return 'Ainda não sei';
}
function jPrefs(){const p=[];if(J.hospedagem)p.push('Hospedagem: '+lab(JOPT.hospedagem,J.hospedagem));if(J.transporte)p.push('Transporte: '+lab(JOPT.transporte,J.transporte));if(J.experiencias.trim())p.push('Experiências: '+J.experiencias.trim());if(J.obs.trim())p.push('Observações: '+J.obs.trim());return p}
function jRows(){return [
  ['Destino',jDest()||'Em aberto',0],
  ['Interesses',J.interesses.length?J.interesses.map(i=>lab(JOPT.interesses,i)).join(', '):'Ainda não escolhi',1],
  ['Viajantes',jTrav(),2],
  ['Datas',jDates(),3],
  ['Orçamento',J.orcamento?lab(JOPT.orcamento,J.orcamento):'Não informado',4],
  ['Preferências',jPrefs().join(' · ')||'Sem preferências por enquanto',5]]}
function jMsg(){
  const L=['Olá, Marisa! Vim pelo site da Gordon Travel e gostaria de planejar uma viagem.',''];
  L.push('Destino: '+(jDest()||'Em aberto'));
  L.push('Interesses: '+(J.interesses.length?J.interesses.map(i=>lab(JOPT.interesses,i)).join(', '):'Ainda não escolhi'));
  L.push('Viajantes: '+jTrav());L.push('Datas: '+jDates());
  L.push('Orçamento (referência, em dólares): '+(J.orcamento?lab(JOPT.orcamento,J.orcamento):'Não informado'));
  if(J.hospedagem)L.push('Hospedagem: '+lab(JOPT.hospedagem,J.hospedagem));
  if(J.transporte)L.push('Transporte: '+lab(JOPT.transporte,J.transporte));
  if(J.experiencias.trim())L.push('Experiências desejadas: '+J.experiencias.trim());
  if(J.obs.trim())L.push('Observações: '+J.obs.trim());
  if(J.nome.trim())L.push('Nome: '+J.nome.trim());
  L.push('','Aguardo seu retorno. Obrigada!');return L.join('\n');
}

/* boarding pass */
const DSHORT={orlando:'Orlando',miami:'Miami',cruzeiro:'Cruzeiro',outro:'Outro',aberto:'A definir'};
function bpFields(){const has=!!J.destino;return {
  pax:J.nome.trim()||'',dest:has?(J.destino==='outro'&&J.destinoOutro.trim()?J.destinoOutro.trim():DSHORT[J.destino]):'',
  trav:jTrav(),dates:J.datasModo==='nao'?'':jDates(),
  int:J.interesses.length?J.interesses.map(i=>lab(JOPT.interesses,i)).join(' · '):'',
  bud:J.orcamento?lab(JOPT.orcamento,J.orcamento):'',pref:jPrefs().map(x=>x.split(': ')[1]).join(' · ')}}
function bpHTML(mode,prev,cur){
  const f=(k,l,v,cls)=>`<div class="bp-f ${cls||''} ${prev&&prev[k]!==cur[k]&&cur[k]?'bump':''}" data-f="${k}"><small>${l}</small><span class="${v?'':'ph'}">${esc(v||'A preencher')}</span></div>`;
  const full=mode==='full';
  return `<div class="bp" role="img" aria-label="Cartão de embarque com o resumo da viagem">
   <div class="bp-main"><div class="bp-head"><strong>Gordon Travel</strong><span>Cartão de embarque</span></div>
   <div class="bp-route"><img class="bp-logo" src="${IMGS.mono.u}" alt="GT, Experiências Exclusivas"><i></i><b>${esc(cur.dest||'Destino')}</b></div>
   <div class="bp-grid">${f('pax','Passageiro',cur.pax||'')}${f('trav','Viajantes',cur.trav)}${f('dates','Datas',cur.dates)}${full?f('bud','Orçamento',cur.bud):''}${full?f('int','Interesses',cur.int,'wide'):''}${full?f('pref','Preferências',cur.pref,'wide'):''}</div></div>
   <div class="bp-stub"><small>Demo</small><div class="bars"></div><small>Gordon Travel</small></div></div>`;
}
const bpPrev=new WeakMap();
function updatePasses(){
  const cur=bpFields();
  $$('.bp-host').forEach(h=>{const prev=bpPrev.get(h);h.innerHTML=bpHTML(h.dataset.bp,prev,cur);bpPrev.set(h,cur)});
}

/* home preview */
(function(){
  const d=$('#jpD'),k=$('#jpK');
  d.innerHTML=JOPT.destino.map(o=>`<button type="button" class="chip" aria-pressed="${J.destino===o[0]}" data-d="${o[0]}">${o[1]}</button>`).join('');
  k.innerHTML=[0,1,2,3].map(n=>`<button type="button" class="chip" aria-pressed="${J.criancas===n}" data-k="${n}">${n===0?'Sem crianças':n+(n===1?' criança':' crianças')}</button>`).join('');
  d.addEventListener('click',e=>{const b=e.target.closest('[data-d]');if(!b)return;J.destino=b.dataset.d;J.msgEdited=false;$$('[data-d]',d).forEach(x=>x.setAttribute('aria-pressed',x===b));updatePasses()});
  k.addEventListener('click',e=>{const b=e.target.closest('[data-k]');if(!b)return;J.criancas=+b.dataset.k;J.msgEdited=false;$$('[data-k]',k).forEach(x=>x.setAttribute('aria-pressed',x===b));updatePasses()});
})();

/* journey form */
const JTITLES=['Destino','Interesses','Viajantes','Datas','Orçamento','Preferências','Resumo'];
function radios(name,list,val){return `<div class="radio" role="group" aria-label="${name}">`+list.map(o=>`<button type="button" class="chip" aria-pressed="${val===o[0]}" data-r="${name}" data-v="${o[0]}">${o[1]}</button>`).join('')+'</div>'}
function jStepHTML(){
  const s=J.step;
  if(s===0)return `<h2 id="jh" tabindex="-1">Para onde você quer ir?</h2><div class="opts">`+JOPT.destino.map(o=>`<button type="button" class="opt plain" aria-pressed="${J.destino===o[0]}" data-dest="${o[0]}"><span class="t"><strong>${o[1]}</strong><span>${o[2]}</span></span></button>`).join('')+`</div>
   ${J.destino==='outro'?`<div class="field"><label for="jOut">Qual destino?</label><input type="text" id="jOut" value="${esc(J.destinoOutro)}" placeholder="Cidade ou região" autocomplete="off"></div>`:''}`;
  if(s===1)return `<h2 id="jh" tabindex="-1">O que você quer viver?</h2><p class="muted">Escolha quantos quiser. Opcional.</p><div class="chips">`+JOPT.interesses.map(o=>`<button type="button" class="chip" aria-pressed="${J.interesses.includes(o[0])}" data-int="${o[0]}">${o[1]}</button>`).join('')+`</div>`;
  if(s===2)return `<h2 id="jh" tabindex="-1">Quem vai viajar?</h2><div>
   <div class="counter"><div class="lab"><strong>Adultos</strong><span>18 anos ou mais</span></div><div class="stepper"><button type="button" data-cnt="adultos" data-d="-1" aria-label="Menos um adulto">−</button><output aria-live="polite">${J.adultos}</output><button type="button" data-cnt="adultos" data-d="1" aria-label="Mais um adulto">+</button></div></div>
   <div class="counter"><div class="lab"><strong>Crianças</strong><span>Até 17 anos</span></div><div class="stepper"><button type="button" data-cnt="criancas" data-d="-1" aria-label="Menos uma criança">−</button><output aria-live="polite">${J.criancas}</output><button type="button" data-cnt="criancas" data-d="1" aria-label="Mais uma criança">+</button></div></div></div>
   ${J.criancas?`<div class="field"><span class="lbl">Idade de cada criança (opcional)</span><div class="ages">`+Array.from({length:J.criancas},(_,i)=>`<input type="number" min="0" max="17" inputmode="numeric" aria-label="Idade da criança ${i+1}" data-age="${i}" value="${esc(J.idades[i]??'')}" style="width:96px" placeholder="Idade">`).join('')+`</div></div>`:''}`;
  if(s===3)return `<h2 id="jh" tabindex="-1">Quando você pensa em ir?</h2>
   ${radios('datasModo',[['definidas','Tenho datas definidas'],['flexiveis','Minhas datas são flexíveis'],['nao','Ainda não sei']],J.datasModo)}
   ${J.datasModo==='definidas'?`<div class="row2"><div class="field"><label for="dS">Ida</label><input type="date" id="dS" min="${todayStr()}" value="${J.ini}"></div><div class="field"><label for="dE">Volta</label><input type="date" id="dE" min="${J.ini||todayStr()}" value="${J.fim}"></div></div>`:''}
   ${J.datasModo==='flexiveis'?`<div class="row2"><div class="field"><label for="dM">Mês aproximado</label><input type="month" id="dM" min="${todayStr().slice(0,7)}" value="${J.mes}"></div><div class="field"><label for="dD">Duração estimada (dias)</label><input type="number" id="dD" min="1" max="90" inputmode="numeric" value="${esc(J.dias)}" placeholder="Ex.: 10"></div></div>`:''}`;
  if(s===4)return `<h2 id="jh" tabindex="-1">Qual faixa de orçamento?</h2><p class="muted">Faixas em dólares, só como referência para a conversa. Não é orçamento comercial. Opcional.</p><div class="opts">`+JOPT.orcamento.map(o=>`<button type="button" class="opt plain" aria-pressed="${J.orcamento===o[0]}" data-bud="${o[0]}"><span class="t"><strong>${o[1]}</strong></span></button>`).join('')+`</div>`;
  if(s===5)return `<h2 id="jh" tabindex="-1">Preferências</h2><p class="muted">Tudo opcional.</p>
   <div class="subq"><span class="lbl">Hospedagem</span>${radios('hospedagem',JOPT.hospedagem,J.hospedagem)}</div>
   <div class="subq"><span class="lbl">Transporte</span>${radios('transporte',JOPT.transporte,J.transporte)}</div>
   <div class="field"><label for="pE">Experiências desejadas</label><input type="text" id="pE" value="${esc(J.experiencias)}" placeholder="Ex.: ver os fogos, conhecer um parque específico"></div>
   <div class="field"><label for="pO">Observações</label><textarea id="pO" placeholder="Aniversário, mobilidade reduzida, primeira viagem internacional...">${esc(J.obs)}</textarea></div>
   <div class="field"><label for="pN">Seu nome (opcional)</label><input type="text" id="pN" value="${esc(J.nome)}" autocomplete="name"></div>`;
  if(!J.msgEdited)J.msg=jMsg();
  return `<h2 id="jh" tabindex="-1">Tudo certo?</h2><dl class="sum">`+jRows().map(([t,v,i])=>`<div><dt>${t}</dt><dd>${esc(v)}</dd><button type="button" data-edit="${i}" aria-label="Editar ${t}">Editar</button></div>`).join('')+`</dl>
   <div class="field"><label for="jm">Mensagem para o WhatsApp (você pode editar)</label><textarea id="jm" style="min-height:240px">${esc(J.msg)}</textarea></div>
   <p class="disc">Isto abre uma conversa no WhatsApp. Não é reserva, pagamento nem orçamento oficial. Os dados ficam só neste navegador.</p>
   <div class="reset">${J.confirmReset?`<span>Apagar todas as respostas?</span><button class="btn sm" type="button" data-reset-yes>Sim, reiniciar</button><button class="btn sm ghost" type="button" data-reset-no>Cancelar</button>`:`<button class="btn text" type="button" data-reset>Reiniciar planejamento</button>`}</div>`;
}
function renderJourney(focus){
  const s=J.step,last=s===6,el=$('#jcard');
  const prog='<div class="prog" aria-hidden="true">'+JTITLES.map((_,i)=>`<i class="${i<=s?'done':''}"></i>`).join('')+'</div>';
  const meta=`<div class="jmeta"><span>${last?'Revise':'Passo '+(s+1)+' de 6'}</span><span>${JTITLES[s]}</span></div>`;
  const optional=[1,3,4,5].includes(s);
  const nav=last?`<div class="jnav"><button class="btn ghost" type="button" data-back>Voltar</button><div class="r"><button class="btn ghost" type="button" id="jcopy">Copiar mensagem</button><a class="btn" id="jwa" href="#" target="_blank" rel="noopener">Abrir no WhatsApp</a></div></div>`:
  `<div class="jnav">${s>0?'<button class="btn ghost" type="button" data-back>Voltar</button>':'<span></span>'}<div class="r">${optional?'<button class="btn text" type="button" data-skip>Pular</button>':''}<button class="btn" type="button" data-next>${s===5?'Ver resumo':'Continuar'}</button></div></div>`;
  el.innerHTML=prog+`<div class="jstep">${meta}${jStepHTML()}<div class="err" id="jerr" role="alert"></div>${nav}</div>`;
  if(focus){const h=$('#jh');if(h)h.focus({preventScroll:true})}
}
function jvalid(){
  if(J.step===0&&!J.destino)return 'Escolha uma opção para continuar.';
  if(J.step===0&&J.destino==='outro'&&!J.destinoOutro.trim())return 'Informe qual é o outro destino.';
  if(J.step===2&&J.adultos<1)return 'Informe pelo menos um adulto.';
  if(J.step===3&&J.datasModo==='definidas'){
    if(!J.ini)return 'Informe a data de ida.';
    if(J.ini<todayStr())return 'A data de ida não pode estar no passado.';
    if(J.fim&&J.fim<J.ini)return 'A volta precisa ser depois da ida.'}
  if(J.step===3&&J.datasModo==='flexiveis'&&J.dias&&(+J.dias<1||+J.dias>90))return 'Informe uma duração entre 1 e 90 dias.';
  return '';
}
function jgo(n,focus=true){J.step=Math.max(0,Math.min(6,n));renderJourney(focus);$('#jcard').scrollIntoView({block:'start',behavior:'smooth'})}
(function(){
  const card=$('#jcard');
  const keep=sel=>{const e=$(sel,card);if(e)e.focus()};
  card.addEventListener('click',e=>{
    const t=e.target;let b;
    if(b=t.closest('[data-dest]')){J.destino=b.dataset.dest;J.msgEdited=false;renderJourney();updatePasses();keep(`[data-dest="${J.destino}"]`);return}
    if(b=t.closest('[data-int]')){const v=b.dataset.int;J.interesses=J.interesses.includes(v)?J.interesses.filter(x=>x!==v):[...J.interesses,v];J.msgEdited=false;b.setAttribute('aria-pressed',J.interesses.includes(v));updatePasses();return}
    if(b=t.closest('[data-bud]')){J.orcamento=J.orcamento===b.dataset.bud?'':b.dataset.bud;J.msgEdited=false;renderJourney();updatePasses();keep(`[data-bud="${b.dataset.bud}"]`);return}
    if(b=t.closest('[data-r]')){const k=b.dataset.r,v=b.dataset.v;J[k]=(J[k]===v&&k!=='datasModo')?'':v;J.msgEdited=false;renderJourney();updatePasses();keep(`[data-r="${k}"][data-v="${v}"]`);return}
    if(b=t.closest('[data-cnt]')){const k=b.dataset.cnt,d=+b.dataset.d,nv=J[k]+d;if(nv<(k==='adultos'?1:0)||nv>(k==='adultos'?12:8))return;J[k]=nv;J.msgEdited=false;renderJourney();updatePasses();keep(`[data-cnt="${k}"][data-d="${d}"]`);return}
    if(b=t.closest('[data-edit]')){jgo(+b.dataset.edit);return}
    if(t.closest('[data-back]')){jgo(J.step-1);return}
    if(t.closest('[data-skip]')){jgo(J.step+1);return}
    if(t.closest('[data-next]')){const er=jvalid();if(er){$('#jerr').textContent=er;return}jgo(J.step+1);return}
    if(t.closest('#jcopy')){copy($('#jm').value,'Mensagem copiada.');return}
    if(t.closest('[data-reset]')){J.confirmReset=true;renderJourney();keep('[data-reset-yes]');return}
    if(t.closest('[data-reset-no]')){J.confirmReset=false;renderJourney();keep('[data-reset]');return}
    if(t.closest('[data-reset-yes]')){J=J0();updatePasses();$$('#jpD .chip,#jpK .chip').forEach(c=>c.setAttribute('aria-pressed',c.dataset.k==='0'));jgo(0);toast('Planejamento reiniciado.');return}
  });
  card.addEventListener('input',e=>{
    const t=e.target;
    if(t.id==='jOut')J.destinoOutro=t.value;
    else if(t.id==='dS'){J.ini=t.value;const dE=$('#dE');if(dE){dE.min=J.ini||todayStr();if(J.fim&&J.fim<J.ini){J.fim='';dE.value=''}}}
    else if(t.id==='dE')J.fim=t.value;
    else if(t.id==='dM')J.mes=t.value;
    else if(t.id==='dD')J.dias=t.value;
    else if(t.id==='pE')J.experiencias=t.value;
    else if(t.id==='pO')J.obs=t.value;
    else if(t.id==='pN')J.nome=t.value;
    else if(t.dataset.age!==undefined)J.idades[+t.dataset.age]=t.value;
    else if(t.id==='jm'){J.msg=t.value;J.msgEdited=true;return}
    else return;
    J.msgEdited=false;updatePasses();
  });
  card.addEventListener('click',e=>{const a=e.target.closest('#jwa');if(a)a.href=wa($('#jm').value)},true);
})();
PAGE_HOOKS.journey=()=>{renderJourney();updatePasses()};
updatePasses();
