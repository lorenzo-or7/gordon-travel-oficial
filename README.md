# Gordon Travel ✈️

**Website institucional da Gordon Travel — Experiências Exclusivas.**

Uma experiência digital desenvolvida para apresentar a agência, orientar viajantes com destino a Orlando e aproximar cada visitante do atendimento personalizado de **Marisa Gordon**.

**Projeto desenvolvido por [Or7](https://github.com/lorenzo-or7).**

## Visão geral

A Gordon Travel reúne informações, serviços e recursos interativos para quem está planejando uma viagem. A proposta visual combina direção de arte editorial, tons navy e champagne, fotografia real e navegação fluida no desktop e no celular.

## Funcionalidades

| Área | Experiência |
| --- | --- |
| **Home** | Apresentação da agência, destaques e credencial 3D interativa da fundadora |
| **Orlando Explorer** | Informações e caminhos para explorar Orlando |
| **Gordon Services** | Serviços apresentados conforme as etapas da viagem |
| **Gordon Tickets** | Informações sobre ingressos e acesso aos canais parceiros |
| **Gordon Journey** | Jornada interativa para iniciar o planejamento da viagem |
| **Nossa História** | História da agência organizada em capítulos e registros fotográficos |
| **Gordon Stories** | Galeria de viagens e experiências reais |
| **Travel Guide** | Orientações, perguntas frequentes e checklist interativo |
| **Contato** | Acesso ao WhatsApp, redes sociais e mensagens personalizadas |

### Experiência e interface

- Layout responsivo para desktop, tablet e smartphone.
- Alternância entre os modos claro e escuro.
- Identidade visual própria, com estética editorial.
- Animações e microinterações pontuais.
- Galeria com visualização ampliada.
- Credencial **Lanyard 3D** com interação por ponteiro e toque.
- Interface de preferências de cookies.

## Tecnologias

- **HTML5, CSS3 e JavaScript** — interface e navegação.
- **Three.js** — credencial tridimensional Lanyard integrada ao site, sem exigir React em tempo de execução.
- **Python** — script de composição do site a partir dos arquivos-fonte.
- **GitHub Pages** — publicação da versão hospedada no GitHub.

## Estrutura do projeto

```text
├── index.html                 # Site compilado, ponto de entrada
├── assets/
│   └── lanyard.bundle.js      # Bundle 3D utilizado na Home
├── favicon.ico
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png
├── source/
│   ├── build.py               # Processo de composição
│   └── v3/                    # Fontes HTML, CSS e JavaScript
└── lanyard-source/            # Código-fonte da experiência 3D
```

O arquivo `index.html` é a versão preparada para hospedagem estática. Para alterar funcionalidades, prefira editar os fontes correspondentes e atualizar a saída compilada de forma consistente.

## Acessar o projeto

**Versão no GitHub Pages:** https://lorenzo-or7.github.io/gordon-travel-v2/

A hospedagem no domínio comercial será configurada separadamente; o endereço do GitHub Pages poderá mudar caso o repositório seja renomeado.

## Publicação e cuidados

O website funciona em hospedagem estática compatível com HTML, CSS e JavaScript. Antes de cada publicação comercial, confira os caminhos de arquivos, imagens, responsividade, links e navegação. Autorizações de uso das fotografias, informações legais e dados de contato devem ser validados com a agência.

## Créditos

**Gordon Travel — Experiências Exclusivas**  
**Idealizado e desenvolvido por Or7 · Lorenzo Orsetti**

---

*Um projeto digital desenvolvido para transformar planejamento em experiências memoráveis.*
