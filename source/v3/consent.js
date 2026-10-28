/* ===== Privacidade e cookies ===== */
const GTConsent=(function(){
  const KEY='gt-consent',FONTS='https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Manrope:wght@400;500;600;700&display=swap';
  const read=()=>{try{const v=JSON.parse(store.get(KEY)||'null');return v&&v.v===1?v:null}catch(e){return null}};
  let cur=read();
  const loadFonts=()=>{if(document.getElementById('gt-fonts'))return;const l=document.createElement('link');l.id='gt-fonts';l.rel='stylesheet';l.href=FONTS;document.head.appendChild(l)};
  const api={
    get:()=>cur,
    has:k=>!!(cur&&cur[k]),
    save(o){cur={v:1,fonts:!!o.fonts,t:new Date().toISOString().slice(0,10)};store.set(KEY,JSON.stringify(cur));if(cur.fonts)loadFonts();else{const l=document.getElementById('gt-fonts');if(l)l.remove()}document.dispatchEvent(new CustomEvent('gt-consent',{detail:cur}));banner(false)}
  };
  const ck=$('#ck');
  function banner(on){ck.hidden=!on}
  /* painéis */
  const pv=$('#pv'),box=$('.pv-box',pv),body=$('#pvBody');let opener=null;
  const FOC='a[href],button:not([disabled]),input:not([disabled]),summary,[tabindex]:not([tabindex="-1"])';
  function openPv(html,from){opener=from||document.activeElement;body.innerHTML=html;pv.hidden=false;document.body.style.overflow='hidden';box.scrollTop=0;(body.querySelector('[data-first]')||$('.pv-x',pv)).focus()}
  function closePv(){pv.hidden=true;document.body.style.overflow='';if(opener&&opener.focus&&document.contains(opener))opener.focus({preventScroll:true});else if(!cur)$('#ckAll').focus()}
  const tick='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.2 4.2L19 7"/></svg>';
  function prefs(from){
    const f=!!(cur&&cur.fonts);
    openPv(`<h2 id="pvT">Preferências de cookies</h2>
    <p class="pv-lede">Escolha quais recursos opcionais podem ser usados. Você pode mudar de ideia a qualquer momento pelo rodapé.</p>
    <section class="pv-cat"><div class="pv-row"><div><h3>Necessários</h3><p>Guardam apenas o que o site precisa para funcionar e lembrar suas escolhas neste navegador: tema claro ou escuro, itens marcados em “Minha Pasta de Viagem” e esta preferência de cookies. Não são enviados a ninguém.</p></div><span class="pv-on">Sempre ativos</span></div></section>
    <section class="pv-cat"><div class="pv-row"><div><h3 id="pvFh">Fontes externas (Google Fonts)</h3><p id="pvFd">Carrega as tipografias do site a partir dos servidores do Google. Ao carregar, seu endereço IP e dados básicos do navegador são enviados ao Google. Sem essa autorização, o site usa fontes do seu próprio sistema, com aparência um pouco diferente.</p></div>
      <label class="pv-sw"><input type="checkbox" role="switch" id="pvFonts" data-first aria-labelledby="pvFh" aria-describedby="pvFd" ${f?'checked':''}><span class="pv-tr" aria-hidden="true"></span></label></div></section>
    <section class="pv-cat"><div class="pv-row"><div><h3>Análise e marketing</h3><p>Este site não utiliza ferramentas de análise, publicidade, pixels ou rastreamento. Se isso mudar, esta janela será atualizada e o consentimento será solicitado antes.</p></div><span class="pv-on pv-off">Não utilizado</span></div></section>
    <div class="pv-acts"><button type="button" class="btn sm" id="pvSave">Salvar preferências</button><button type="button" class="btn sm ghost" id="pvAll">Aceitar todos</button><button type="button" class="btn sm ghost" id="pvNone">Recusar opcionais</button></div>
    <p class="pv-foot"><button type="button" class="link" data-priv="policy">Política de Privacidade e Cookies</button></p>`,from)}
  function policy(from){
    const li=a=>a.map(x=>`<li>${tick}<span>${x}</span></li>`).join('');
    openPv(`<h2 id="pvT" data-first tabindex="-1">Política de Privacidade e Cookies</h2>
    <p class="pv-pend"><b>Versão 1 · outubro de 2026.</b> Este texto descreve as tecnologias efetivamente presentes neste site nesta data. Ele ainda depende de revisão jurídica e da confirmação dos dados da empresa pela Gordon Travel; os itens marcados como pendentes não foram preenchidos de propósito.</p>
    <h3>1. Quem é o responsável</h3>
    <p>Gordon Travel — Experiências Exclusivas. <span class="pv-tbd">Pendente de confirmação pela agência: razão social, CNPJ ou identificação legal e endereço do responsável pelo tratamento de dados.</span></p>
    <h3>2. O que o site guarda no seu navegador</h3>
    <p>O site não define cookies HTTP próprios. Ele usa o armazenamento local do navegador (localStorage) apenas para estes itens necessários, que ficam somente no seu dispositivo:</p>
    <ul class="pv-ul">${li(['<b>gt-theme</b>: o tema claro ou escuro que você escolheu.','<b>gt-pasta</b>: os itens marcados em “Minha Pasta de Viagem”, no Travel Guide. Nenhum documento ou dado pessoal é pedido ou enviado.','<b>gt-consent</b>: a sua escolha nesta janela de cookies.'])}</ul>
    <h3>3. Recursos opcionais</h3>
    <p><b>Google Fonts.</b> Somente com a sua autorização, o site carrega as tipografias a partir do Google. Isso envia ao Google seu endereço IP e dados do navegador, tratados segundo a <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">política de privacidade do Google</a>. Se você recusar, o site continua funcionando com fontes do sistema.</p>
    <h3>4. Análise e marketing</h3>
    <p>Não utilizamos Google Analytics, pixels de anúncios, remarketing ou ferramentas semelhantes. Caso venham a ser adotados, esta política será atualizada e o consentimento será pedido antes de qualquer uso.</p>
    <h3>5. Mensagens, contato e links externos</h3>
    <p>O compositor de mensagens da página Contato monta o texto no seu navegador. Nenhuma mensagem é enviada automaticamente e o nome e os detalhes digitados não são gravados: você confirma o envio no WhatsApp. Ao abrir WhatsApp, Instagram, Facebook, YouTube, e-mail ou o portal parceiro, você sai deste site e passa a seguir as regras de cada serviço.</p>
    <h3>6. Hospedagem</h3>
    <p>Como em qualquer site, o provedor de hospedagem pode registrar dados técnicos de acesso, como endereço IP, conforme as próprias políticas. <span class="pv-tbd">Pendente: confirmar o provedor de hospedagem da versão final.</span></p>
    <h3>7. Seus direitos</h3>
    <p>Nos termos da LGPD, você pode solicitar confirmação de tratamento, acesso, correção e eliminação de dados, entre outros direitos. Para dúvidas sobre privacidade, escreva para <a href="mailto:${CONFIG.email}">${CONFIG.email}</a>. <span class="pv-tbd">Pendente: confirmar o canal oficial de privacidade e o encarregado (DPO), se houver.</span></p>
    <h3>8. Como alterar suas escolhas</h3>
    <p>Use “Preferências de cookies”, no rodapé, a qualquer momento. Você também pode limpar os dados do site nas configurações do navegador.</p>
    <div class="pv-acts"><button type="button" class="btn sm" data-priv="prefs">Preferências de cookies</button></div>`,from)}
  document.addEventListener('click',e=>{
    const b=e.target.closest('[data-priv]');
    if(b){e.preventDefault();const w=b.dataset.priv;if(w==='prefs'){if(!pv.hidden){const o=opener;prefs(o)}else prefs(b)}else{const o=pv.hidden?b:opener;policy(o)}return}
    const id=e.target.closest('button')&&e.target.closest('button').id;
    if(id==='ckAll'||id==='pvAll'){api.save({fonts:true});if(!pv.hidden)closePv();toast('Preferências salvas: todos os recursos opcionais ativados.')}
    else if(id==='ckNone'||id==='pvNone'){api.save({fonts:false});if(!pv.hidden)closePv();toast('Preferências salvas: apenas os recursos necessários.')}
    else if(id==='pvSave'){api.save({fonts:$('#pvFonts').checked});closePv();toast('Preferências salvas.')}
    else if(id==='ckCfg'){prefs(e.target.closest('button'))}
    else if(e.target===pv||e.target.closest('.pv-x'))closePv();
  });
  pv.addEventListener('keydown',e=>{
    if(e.key==='Escape'){e.stopPropagation();closePv();return}
    if(e.key==='Tab'){const f=[...pv.querySelectorAll(FOC)].filter(x=>x.offsetParent!==null);if(!f.length)return;const a=f[0],z=f[f.length-1];
      if(e.shiftKey&&(document.activeElement===a||document.activeElement===box)){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}
  });
  if(cur){if(cur.fonts)loadFonts();banner(false)}else banner(true);
  return api;
})();
