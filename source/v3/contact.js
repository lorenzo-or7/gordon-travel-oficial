/* ===== Contato 2.0 · Personal Concierge ===== */
(function(){
  const c=CONFIG;
  const I={
   route:'<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>',
   ticket:'<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/><path d="M13 5v2M13 17v2M13 11v2"/>',
   bed:'<path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4M12 4v6M2 18h20"/>',
   msg:'<path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-6.2A8 8 0 1 1 21 12z"/>',
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
