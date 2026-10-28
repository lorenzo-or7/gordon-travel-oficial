/* ===== Dados recuperados do site antigo (ver GORDON-TRAVEL-CONTENT-MASTER.md) ===== */
const PHASES=[
 {id:'planeje',no:'01',ic:'calendar',tg:'Organize cada detalhe.',n:'Planeje',h:'Planejar com calma',t:'A conversa começa meses antes. Roteiro, hospedagem e transporte ganham forma com a Marisa e a equipe.',k:'ph_plano',alt:'Mulher de costas planejando uma viagem ao pôr do sol, com mapa e notebook na mesa e fotos de parques, compras e gastronomia flutuando sobre Orlando'},
 {id:'embarque',no:'02',ic:'takeoff',tg:'Comece com tranquilidade.',n:'Embarque',h:'Primeiros passos em Orlando',t:'Recepção e orientação para sair do aeroporto sem dúvidas e começar bem.',k:'ph_malas',alt:'Malas e documentos de viagem em frente ao aeroporto, com um carro executivo de porta aberta e um avião decolando ao fundo'},
 {id:'explore',no:'03',ic:'compass',tg:'Viva cada descoberta.',n:'Explore',h:'Viver Orlando com alguém por perto',t:'Orientação para os parques, acompanhamento nas compras e passeios, conforme contratado.',k:'s_parques',alt:'Marisa ilustrada com um mapa dos parques'},
 {id:'aproveite',no:'04',ic:'sun',tg:'Curta cada momento.',n:'Aproveite',h:'Orientação quando surgir uma dúvida',t:'Ajuda remota e outras opções de viagem, para você não ficar sem resposta.',k:'familia',alt:'Família de costas olhando um grande globo de parque temático ao entardecer'}
];
const WHO={proprio:'Atendimento Gordon Travel',misto:'Atendimento + parceiro',parceiro:'Produto de parceiro'};
const SERVICES=[
 {id:'roteiros',ph:'planeje',who:'proprio',t:'Roteiros personalizados',s:'Idades, ritmo e interesses definem o plano.',d:'Cada família viaja de um jeito. O roteiro considera idades, ritmo, interesses e o tempo disponível, e pode ser ajustado até a viagem.'},
 {id:'hospedagem',ph:'planeje',who:'proprio',t:'Organização de hospedagem',s:'Hotéis, resorts e casas comparados com critério.',d:'Assistência para comparar hotéis, resorts e casas de temporada, pensando em localização, estrutura e deslocamentos.'},
 {id:'carros',ph:'planeje',who:'misto',t:'Orientação sobre aluguel de carros',s:'Quando o carro ajuda e quando não.',d:'Orientação para avaliar quando um carro alugado é mais conveniente e quando outra forma de transporte pode ser melhor. A contratação é feita pelo portal parceiro.',tk:'aluguel'},
 {id:'grupos',ph:'planeje',who:'proprio',t:'Viagens em grupo e eventos',s:'Famílias reunidas, grupos maiores e eventos.',d:'Organização de viagens para grupos maiores, incluindo famílias reunidas e eventos. Conte o que você tem em mente.'},
 {id:'cruzeiros',ph:'planeje',who:'misto',t:'Cruzeiros',s:'Opções de cruzeiro combinadas com a estadia.',d:'Orientação sobre opções de cruzeiros e como combiná-los com a estadia. Consulte a equipe sobre disponibilidade.'},
 {id:'chegada',ph:'embarque',who:'proprio',t:'Recepção e orientação na chegada',s:'Os primeiros passos em Orlando.',d:'Orientação para os primeiros passos em Orlando, com a ajuda de quem conhece o destino.'},
 {id:'transfer',ph:'embarque',who:'misto',t:'Serviços relacionados a transfer',s:'Aeroporto, hotel e parques.',d:'Orientação e soluções de transporte entre aeroportos, hotéis e parques, sujeitas a disponibilidade.'},
 {id:'parques',ph:'explore',who:'proprio',t:'Orientação para parques temáticos',s:'Quais parques, em que dias, em que ritmo.',d:'Ajuda para escolher parques, distribuir os dias e adequar o roteiro à idade, ao ritmo e aos interesses dos viajantes.'},
 {id:'presencial',ph:'explore',who:'proprio',t:'Acompanhamento presencial',s:'Quando contratado e disponível.',d:'Acompanhamento durante a viagem, quando contratado e disponível para a data e o perfil do grupo.'},
 {id:'compras',ph:'explore',who:'proprio',t:'Acompanhamento de compras',s:'Compras e passeios comerciais organizados.',d:'Orientação para organizar compras e passeios comerciais, quando contratado e disponível.'},
 {id:'passeios',ph:'explore',who:'misto',t:'Passeios e experiências',s:'Atrações complementares via parceiros.',d:'Passeios e atrações complementares, com opções disponíveis por meio de parceiros.',tk:'passeios'},
 {id:'remoto',ph:'aproveite',who:'proprio',t:'Orientação remota nos parques',s:'Ajuda para decidir o próximo passo na visita.',d:'Suporte durante as visitas para ajudar a decidir o que fazer a seguir e organizar melhor o tempo.'},
 {id:'outras',ph:'aproveite',who:'proprio',t:'Outras opções de viagem',s:'Conforme serviços confirmados pela agência.',d:'Atendimento para consultar necessidades e possibilidades adicionais, conforme serviços efetivamente confirmados pela agência. Não é uma promessa de atender qualquer destino ou solicitação.'}
];
const FAQP=[['Os valores aparecem aqui?','Não. Preços, disponibilidade e condições são exibidos apenas no portal parceiro, sempre atualizados.'],['Como compro?','Pelo portal parceiro da Gordon Travel. Se preferir, fale com a equipe pelo WhatsApp para tirar dúvidas antes.']];
const TICKETS=[
 {id:'ingressos',cat:'parques',n:'Ingressos',k:'t_ingressos',alt:'Marisa ilustrada segurando ingressos diante de um castelo com fogos de artifício',s:'Ingressos para parques e atrações de Orlando.',l:'Ingressos para os parques e atrações de Orlando, adquiridos pelo portal parceiro autorizado da Gordon Travel. As regras de cada ingresso, como validade, número de dias e inclusões, são definidas pelo parque e informadas no portal.',c:['Defina antes quantos dias de parque fazem sentido para o grupo.','Confirme no portal as regras e a validade de cada ingresso.','Dúvidas sobre qual combinação escolher? Fale com a equipe.'],f:[['Posso pedir ajuda para escolher?','Sim. A equipe orienta sobre parques e dias, de acordo com o perfil do grupo.'],...FAQP]},
 {id:'seguro',cat:'protecao',n:'Seguro viagem',k:'servicos',alt:'Escudo de proteção dourado, mala, passaporte e passagem em um saguão de aeroporto',s:'Proteção para a viagem, contratada pelo portal parceiro.',l:'Opções de seguro viagem disponíveis pelo portal parceiro. Coberturas, limites e condições variam por plano e estão descritos no portal.',c:['Leia as coberturas e exclusões do plano escolhido.','Informe corretamente idades e datas da viagem.','Em caso de dúvida sobre exigências de entrada no país, consulte fontes oficiais.'],f:[['O seguro é obrigatório?','As exigências mudam conforme o destino e o viajante. Consulte fontes oficiais e a equipe antes de decidir.'],...FAQP]},
 {id:'carros',cat:'mobilidade',n:'Aluguel de carros',k:'s_carros',alt:'Marisa ilustrada apresentando uma área de locação de veículos',s:'Orientação e acesso ao portal parceiro para alugar um carro.',l:'Aluguel de carros pelo portal parceiro. A Gordon Travel orienta sobre quando o carro é uma boa opção para o seu roteiro e quando um transfer pode ser mais prático.',c:['Pense no tamanho do grupo e na bagagem.','Verifique documentos exigidos pela locadora.','Considere estacionamento e deslocamentos do roteiro.'],f:FAQP},
 {id:'casas',cat:'hospedagem',n:'Casas de temporada',k:'casa_nova',alt:'Casa de temporada ao pôr do sol, com malas e um chapéu de palha na entrada. Imagem ilustrativa, sem relação com um imóvel específico',s:'Casas para famílias e grupos.',l:'Casas de temporada disponíveis pelo portal parceiro, conforme disponibilidade e condições informadas. Uma boa opção para grupos maiores ou estadias mais longas, com mais espaço e convivência.',c:['Compare localização, número de quartos e regras da casa.','Considere o deslocamento até os parques e ao comércio.','Converse com a equipe sobre o perfil do grupo.'],f:FAQP},
 {id:'passeios',cat:'experiencias',n:'Passeios e experiências',k:'t_passeios',alt:'Marisa ilustrada em selfie com uma família diante do castelo de um parque',s:'Passeios para completar a viagem.',l:'Passeios e experiências disponíveis pelo portal parceiro, para somar à rotina dos parques e conhecer outros lados da região.',c:['Reserve tempo de descanso entre os dias de parque.','Verifique horários, locais de encontro e regras no portal.','Peça ajuda para encaixar os passeios no roteiro.'],f:FAQP},
 {id:'brightline',cat:'mobilidade',n:'Brightline',k:'brightline',alt:'Trem de alta velocidade em uma estação, com palmeiras e o horizonte de Orlando',s:'Trem intermunicipal da Flórida.',l:'Passagens do trem Brightline pelo portal parceiro. Rotas, horários e condições estão no portal e podem mudar.',c:['Confirme rotas e horários no portal antes de montar o roteiro.','Considere o deslocamento até a estação.','Combine com a equipe se for unir trem e hospedagem.'],f:FAQP}
];
const TFILTERS=[['todos','Tudo'],['parques','Parques'],['hospedagem','Hospedagem'],['mobilidade','Mobilidade'],['experiencias','Experiências'],['protecao','Proteção']];

const CHAPTERS=[
 {y:'2013',t:'A viagem que despertou um sonho',d:'Marisa Gordon viajou aos Estados Unidos com o marido e as duas filhas para cerca de 20 dias de férias, incluindo a experiência Disney. A viagem marcou a família e despertou o desejo de viver nos Estados Unidos.',k:'m_antiga',cap:'Registro de família',lb:'2013',by:'2013'},
 {y:'Depois',t:'Uma mudança de caminho',d:'De volta ao Brasil, depois de anos no setor bancário, Marisa passou por uma mudança profissional. Fez novas viagens aos Estados Unidos, inclusive para visitar uma familiar em Miami, e começou a desenvolver atividades comerciais ligadas a elas. Gisele, antiga colega do Santander, a incentivou a explorar o turismo e a orientação de viajantes.',k:'m_familia',cap:'Marisa Gordon com familiares',lb:'Depois da viagem',by:'Depois'},
 {y:'2014',t:'O início da Gordon Travel',d:'Em outubro de 2014, Marisa acompanhou duas adolescentes em uma viagem a Orlando. A experiência marcou o início de sua atuação com a Gordon Travel.',k:'embarque',cap:'Ilustração',alt:'Cartão de embarque da Gordon Travel, ilustração',lb:'2014',by:'2014'},
 {y:'2015',t:'Um novo capítulo nos Estados Unidos',d:'No fim do ano, depois de mudanças profissionais na família, Marisa, o marido e as filhas se mudaram para os Estados Unidos. A atividade turística passou a ocupar um espaço ainda maior na vida da família.',k:'ch_aero',cap:'Ilustração conceitual',alt:'Ilustração conceitual de um balcão da Gordon Travel em um aeroporto ao pôr do sol, com avião e placa de embarque ao fundo',lb:'2015',by:'2015'},
 {y:'Depois',t:'Crescimento e novas experiências',d:'A Gordon Travel ampliou sua atuação para planejamento personalizado, viagens em grupo, orientação turística e outros serviços.',k:'ch_plan',cap:'Ilustração conceitual',alt:'Ilustração conceitual de uma mesa de planejamento de viagens, com notebook, globo, mapa-múndi, passaporte, passagens e a vista de Orlando pela janela',lb:'Anos seguintes',by:'Depois'},
 {y:'Hoje',t:'Histórias que continuam',d:'O atendimento personalizado, o conhecimento do destino e a atenção ao perfil de cada viajante continuam orientando a proposta da Gordon Travel.',k:'m_noite',cap:'Marisa Gordon em Orlando',lb:'Hoje',by:'Hoje',sig:true}
];
const VALUES=[['Atendimento humano','Uma conversa próxima, que considera quem está viajando.','users'],['Planejamento cuidadoso','Cada detalhe pensado de acordo com o ritmo da viagem.','calendar'],['Confiança','Relações construídas com atenção e responsabilidade.','check'],['Transparência','Informações claras sobre serviços e parceiros.','eye'],['Conhecimento do destino','Orientações que consideram a experiência com Orlando.','pinned'],['Personalização','Não existe um único roteiro ideal para todas as famílias.','sparkles'],['Memórias em família','Experiências que ganham significado quando são compartilhadas.','camera']];
const CERTS=[{k:'cert1',t:'Orlando Expert Certification',i:'Orlando Travel Academy / Visit Orlando',dt:'12 de maio de 2020',m:'Orlando Travel Academy / Visit Orlando · 12 de maio de 2020',alt:'Certificado de conclusão da Orlando Expert Certification em nome de Marisa Gordon, 12 de maio de 2020'},{k:'cert2',t:'Especialização em grupos',i:'SunCoastUSA Operadora',dt:'7 de maio de 2020',m:'SunCoastUSA Operadora · treinamento de 7 de maio de 2020',alt:'Certificado de participação no treinamento de especialização em grupos da SunCoastUSA Operadora, 7 de maio de 2020'}];

const STORIES=[
 ['familia','castelos','Grupo de familiares e amigos posando em frente a um castelo de parque temático, em dia claro'],
 ['familia','castelos','Família de braços abertos em frente a um castelo cor-de-rosa, sorrindo'],
 ['encontros','','Grupo de amigos posando com um personagem fantasiado diante de um painel azul'],
 ['noites','familia','Família abraçada com roupas coordenadas de fim de ano, à noite'],
 ['familia','','Família com camisetas combinando em frente a uma grande esfera prateada'],
 ['familia','','Grupo com crianças no colo, sorrindo em uma rua de parque'],
 ['encontros','','Quatro mulheres segurando juntas uma pequena luz, com cenário de floresta e arco-íris'],
 ['castelos','familia','Grupo de várias gerações reunido em frente a um castelo de torres azuis'],
 ['noites','familia','Grupo com crianças posando à noite diante de uma esfera iluminada'],
 ['castelos','','Grupo posando diante de um castelo de pedra no estilo medieval']
].map((a,i)=>({k:'v'+String(i+1).padStart(2,'0'),tags:[a[0],a[1]].filter(Boolean),alt:a[2]}));
const STORIES2=[
 ['castelos','familia','Quatro amigos sorrindo de braços dados em frente a um castelo de torres azuis, com orelhas de personagem'],
 ['familia','','Família com uma criança no colo posando diante de um grande globo azul'],
 ['encontros','','Grupo animado de meninas e acompanhantes posando de braços abertos em uma praça com construções de estilo europeu'],
 ['encontros','','Selfie de três mulheres sorrindo, segurando uma pochete azul'],
 ['castelos','encontros','Grande grupo de crianças e adultos posando em frente a um castelo de parque temático'],
 ['familia','','Família de várias gerações posando junto a carrinhos de bebê, com uma grande árvore de pedra ao fundo'],
 ['familia','','Selfie de grupo com adultos e crianças sorrindo, com pinguins ao fundo'],
 ['encontros','','Grupo posando com um personagem de camisa e capa diante de uma cortina vermelha'],
 ['noites','familia','Grupo grande reunido à noite, com um castelo iluminado de azul ao fundo'],
 ['familia','','Grupo sorrindo em uma praia, com um píer ao fundo'],
 ['castelos','familia','Família com crianças em frente a um castelo, com orelhas de personagem'],
 ['familia','','Grupo posando em frente à entrada de um parque com uma escultura de elefante'],
 ['encontros','','Grupo fazendo caretas ao lado de um urso polar de pelúcia com cachecol vermelho'],
 ['encontros','','Grupo de adultos e crianças fazendo poses divertidas junto a um urso polar de pelúcia'],
 ['familia','','Quatro pessoas sorrindo em frente a uma grande árvore esculpida, em dia de sol'],
 ['castelos','familia','Família com orelhas de personagem em frente a um castelo, em moldura comemorativa'],
 ['encontros','','Três amigos acenando e sorrindo diante de uma escultura de jardim e canteiros floridos'],
 ['castelos','familia','Grupo de amigos sorrindo em frente a um castelo decorado, em moldura comemorativa de 2017'],
 ['castelos','encontros','Grupo de meninas e acompanhantes com orelhas de personagem em frente a um castelo'],
 ['castelos','familia','Grande grupo com camisetas combinando, acenando em frente a um castelo']
].map((a,i)=>({k:'a'+String(i+1).padStart(2,'0'),tags:[a[0],a[1]].filter(Boolean),alt:a[2]}));
STORIES.push(...STORIES2);
const STAGS=[['todas','Todas'],['familia','Em família'],['castelos','Castelos'],['noites','Noites'],['encontros','Encontros']];

const OFFICIAL={visit:['Visit Orlando','https://www.visitorlando.com/'],esta:['Programa ESTA (CBP)','https://esta.cbp.dhs.gov/'],state:['Departamento de Estado dos EUA','https://travel.state.gov/'],disney:['Walt Disney World','https://disneyworld.disney.go.com/'],universal:['Universal Orlando Resort','https://www.universalorlando.com/']};
const GTOPICS=[['todos','Tudo'],['planejamento','Planejamento'],['parques','Parques'],['documentos','Documentos'],['transporte','Transporte'],['hospedagem','Hospedagem'],['familia','Em família']];
const GUIDE=[
 ['planejamento','Quando começar a planejar a viagem?','Quanto antes, melhor para comparar opções com calma. Mesmo sem datas definidas, uma conversa inicial ajuda a entender o orçamento, o número de dias e o perfil do grupo.'],
 ['planejamento','Quantos dias reservar para Orlando?','Depende dos parques escolhidos, da idade das crianças e do quanto o grupo quer descansar. Em geral, vale deixar dias mais leves entre os dias intensos de parque.'],
 ['planejamento','O que levar em uma pasta de viagem?','Reúna em um só lugar documentos de viagem, comprovantes de reservas, contatos de emergência e informações do seguro, em versão digital e impressa.','pasta'],
 ['planejamento','Como funciona o suporte da Gordon Travel?','O atendimento é humano e acontece principalmente pelo WhatsApp. Serviços como acompanhamento presencial dependem de contratação e disponibilidade.'],
 ['parques','Como montar um dia de parque tranquilo?','Escolha poucas prioridades por dia, combine horários de pausa e leve o necessário para crianças e adultos. Um roteiro realista rende mais que uma lista longa.'],
 ['parques','As regras e horários dos parques mudam?','Sim. Horários, preços, regras de entrada e atrações podem mudar. Confira sempre o site oficial do parque perto da data.','',1,['disney','universal']],
 ['parques','Posso ter orientação durante a visita?','A Gordon Travel oferece orientação remota durante as visitas e acompanhamento presencial quando contratado e disponível. Fale com a equipe para saber como funciona no seu caso.'],
 ['documentos','Que documentos preciso para entrar nos Estados Unidos?','Os requisitos dependem da nacionalidade, do tipo de viagem e podem mudar. Consulte sempre as fontes oficiais antes de comprar passagens e reservar.','',1,['state','esta']],
 ['documentos','Crianças precisam de documentos específicos?','Menores costumam ter exigências próprias, principalmente quando viajam sem um dos responsáveis. Verifique as regras vigentes com as autoridades competentes.','',1,['state']],
 ['transporte','Carro alugado ou transfer?','O carro dá liberdade, mas exige estacionamento e atenção aos custos adicionais. O transfer facilita deslocamentos fixos. A escolha depende do roteiro e do tamanho do grupo.'],
 ['transporte','Como me deslocar entre hotel e parques?','Há várias formas, como carro, transfer e transporte oferecido por alguns hotéis. Confirme a disponibilidade e os horários no momento da reserva.','',1,['visit']],
 ['hospedagem','Hotel ou casa de temporada?','Hotéis costumam facilitar serviços e deslocamentos. Casas oferecem mais espaço, o que ajuda grupos maiores. Compare localização, regras e custos extras.'],
 ['hospedagem','O que observar antes de reservar?','Localização, política de cancelamento, taxas adicionais e estrutura para o seu grupo. Guarde todos os comprovantes.'],
 ['familia','Como preparar crianças para a viagem?','Conte o roteiro com antecedência, combine regras simples e leve itens que ajudem na rotina, como lanches e atividades para filas e deslocamentos.'],
 ['familia','Viajar com várias gerações: o que considerar?','Pense em ritmos diferentes, pausas frequentes e atividades que reúnam todos. Um roteiro flexível ajuda a respeitar o tempo de cada um.']
].map((a,i)=>({id:'g'+i,topic:a[0],q:a[1],a:a[2],extra:a[3]||'',verify:!!a[4],links:a[5]||[]}));

const GKW={7:'visto passaporte esta entrada imigração',8:'menores passaporte autorização criança',9:'aluguel locadora uber',10:'ônibus uber',11:'casa aluguel resort',12:'reserva cancelamento taxas'};
/* Orlando Explorer: seis frentes de descoberta, sem mapa */
const EXPL=[
 {id:'parques',k:'castelo',alt:'Castelo de um parque temático ao pôr do sol, com orelhas de camundongo em primeiro plano',h:'Emoção sem correria',m:'Parques com organização, ritmo e menos estresse.',kw:[['castle','Roteiro personalizado'],['ticket','Parques temáticos'],['calendar','Organização dos dias'],['users','Ritmo da família'],['headphones','Orientação remota']],
  a:{t:'Roteiros de parques',attr:'data-go="services" data-svc="roteiros"',href:'#services'},
  b:{t:'Falar sobre parques',wa:'Olá, Marisa! Quero conversar sobre os parques de Orlando e como organizar os dias da viagem.'}},
 {id:'hospedagem',k:'casa_nova',alt:'Casa de temporada ao pôr do sol, com malas e um chapéu de palha na entrada. Imagem ilustrativa, sem relação com um imóvel específico',h:'Onde ficar muda o ritmo',m:'Hospedagem certa para descanso, logística e praticidade.',kw:[['hotel','Hotéis'],['bed','Resorts'],['house','Casas de temporada'],['pin','Localização'],['check','Conveniência']],
  a:{t:'Ver hospedagem',attr:'data-go="services" data-svc="hospedagem"',href:'#services'},
  b:{t:'Escolher melhor região',wa:'Olá, Marisa! Quero ajuda para escolher a melhor região para me hospedar em Orlando.'}},
 {id:'mobilidade',k:'brightline',alt:'Trem de alta velocidade em uma estação, com placas para Orlando, Miami e Tampa',h:'Hotel, parques e compras conectados',m:'Mobilidade planejada para a viagem fluir melhor.',kw:[['car','Aluguel de carros'],['bus','Transfer'],['train','Brightline'],['route','Deslocamentos'],['pinned','Logística']],
  a:{t:'Mobilidade',attr:'data-go="services" data-svc="carros"',href:'#services'},
  b:{t:'Ver opções',attr:'data-go="tickets" data-tf="mobilidade"',href:'#tickets'}},
 {id:'compras',k:'compras',k2:'gastro',alt:'Mulher com sacolas em um shopping a céu aberto ao pôr do sol',h:'Tempo para o que vale a pena',m:'Compras, passeios e gastronomia com curadoria.',kw:[['bag','Outlets'],['store','Compras'],['utensils','Restaurantes'],['camera','Passeios'],['sparkles','Experiências']],
  a:{t:'Explorar experiências',attr:'data-go="tickets" data-tk="passeios"',href:'#tickets'},
  b:{t:'Compras e passeios',attr:'data-go="services" data-svc="compras"',href:'#services'}},
 {id:'chegada',k:'s_hotel',alt:'Marisa ilustrada na recepção de um hotel',h:'Os primeiros passos',m:'Chegada mais tranquila, com recepção e orientação inicial.',kw:[['landing','Recepção'],['bell','Chegada'],['carfront','Transfer'],['compass','Orientação inicial'],['pin','Apoio local']],
  a:{t:'Recepção e chegada',attr:'data-go="services" data-svc="chegada"',href:'#services'},
  b:{t:'Montar minha viagem',attr:'data-go="journey"',href:'#journey'}}
];
const EXPL_PLAN={id:'planejamento',k:'panorama',h:'Comece pela conversa',m:'Conte quem vai, quando pretende viajar e o que quer viver. A equipe retorna com orientação.'};

/* Gordon Journey */
const JOPT={
 destino:[['orlando','Orlando','Parques, hospedagem e roteiro'],['miami','Miami','Para combinar com Orlando ou ficar só lá'],['cruzeiro','Cruzeiro','Navegação combinada com a estadia'],['outro','Outro destino','Conte qual você tem em mente'],['aberto','Ainda não sei','A equipe ajuda a decidir']],
 interesses:[['parques','Parques temáticos'],['familia','Viagem em família'],['compras','Compras'],['gastronomia','Gastronomia'],['descanso','Descanso'],['cruzeiros','Cruzeiros'],['personalizadas','Experiências personalizadas']],
 orcamento:[['ate','Até US$ 5 mil'],['5-10','De US$ 5 mil a 10 mil'],['10-20','De US$ 10 mil a 20 mil'],['20+','Acima de US$ 20 mil'],['nao','Prefiro não informar']],
 hospedagem:[['hotel','Hotel ou resort'],['casa','Casa de temporada'],['indeciso','Ainda não decidi']],
 transporte:[['carro','Carro alugado'],['transfer','Transfer'],['indeciso','Ainda não decidi']]
};
