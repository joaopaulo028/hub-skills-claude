# Meu Hub de Skills do Claude

Inventário pessoal das Skills do Claude que tenho instaladas e das que quero instalar depois. Curado por João Paulo.

> Projeto pessoal sem dependências, sem build, sem servidor. HTML + CSS + JS vanilla.

## O que é

Um catálogo visual onde consulto rapidamente:

- ✅ Quais Skills já estão **instaladas** na minha máquina/Claude
- 📌 Quais Skills mapeei pra **instalar depois** (wishlist)

Não é um hub de estudos — é um centro de dados pessoal pra não perder o controle do que tenho e do que quero.

Inspirado visualmente no [SkillVault da NoCode StartUp](https://skills-nocode-startup.lovable.app/).

## Como rodar

```sh
open docs/index.html
```

Ou duplo clique no arquivo. Sem npm, sem servidor, sem build.

Para hot-reload durante desenvolvimento, use a extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) do VSCode.

## Estrutura

```
.
├── README.md                  ← este arquivo
├── CHANGELOG.md               ← histórico de mudanças
├── .editorconfig              ← convenções de editor
├── .gitignore
│
├── documentation/             ← documentação técnica do projeto
│   ├── ARCHITECTURE.md        ← como o app funciona, fluxo de dados
│   ├── DATA_MODEL.md          ← schema completo de skills.js
│   ├── CONTRIBUTING.md        ← como adicionar/editar skills
│   └── DESIGN.md              ← tokens visuais, paleta, anatomia
│
└── docs/                      ← o web app (servido pelo GitHub Pages)
    ├── index.html             ← entry point
    ├── styles/                ← CSS modular
    │   ├── tokens.css
    │   ├── base.css
    │   ├── header.css
    │   ├── cards.css
    │   ├── modal.css
    │   └── responsive.css
    ├── scripts/               ← JS modular
    │   ├── state.js
    │   ├── utils.js
    │   ├── filters.js
    │   ├── cards.js
    │   ├── modal.js
    │   └── main.js
    └── data/
        └── skills.js          ← fonte única de verdade (window.SKILLS_DATA)
```

## Documentação

| Documento | Para quem | Conteúdo |
|-----------|-----------|----------|
| [ARCHITECTURE.md](documentation/ARCHITECTURE.md) | Devs novos no projeto | Stack, fluxo de dados, ordem de carregamento, decisões de design |
| [DATA_MODEL.md](documentation/DATA_MODEL.md) | Quem vai editar dados | Schema de Skill e Repositorio, exemplos, validação |
| [CONTRIBUTING.md](documentation/CONTRIBUTING.md) | Quem vai modificar código | Workflows comuns, convenções, deploy |
| [DESIGN.md](documentation/DESIGN.md) | Quem vai mexer no visual | Tokens, paleta, tipografia, anatomia de componentes |

## Como atualizar o catálogo

### Manual

Edite `docs/data/skills.js` e recarregue o browser. Schema completo em [DATA_MODEL.md](documentation/DATA_MODEL.md).

### Pelo Claude

Peça em linguagem natural:
- "Instalei a skill X, adiciona no Hub"
- "Coloca a skill Y como 'quero instalar'"
- "Removi a skill Z do Hub"

O Claude tem instruções persistentes pra editar o `skills.js` automaticamente nesses gatilhos.

## Deploy (GitHub Pages)

A pasta `docs/` é servida nativamente:

1. **Settings → Pages** no repositório
2. **Source**: Deploy from a branch
3. **Branch**: `main` / `/docs`
4. Save

Cada push em `main` re-deploya. Detalhes em [CONTRIBUTING.md](documentation/CONTRIBUTING.md).

## Stack

- HTML5 + CSS3 + JavaScript ES2015+ (vanilla)
- Sem framework, sem build, sem dependências
- Fontes via Google Fonts (Inter)
- Compatível com `file://` e GitHub Pages

---

_Última atualização: 2026-05-11_
