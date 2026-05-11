# Arquitetura

Este documento descreve como o web app está estruturado, qual o fluxo de dados e por que algumas decisões foram tomadas. Leitura recomendada para qualquer dev que vá modificar o código.

## Stack

- **HTML5 + CSS3 + JavaScript ES2015+ (vanilla)**
- **Sem build step**, sem dependências, sem npm
- **Sem framework** (React/Vue/etc.) — projeto pequeno demais pra justificar
- **Sem bundler** — arquivos servidos diretamente pelo browser
- **Compatível com `file://`** (abre por duplo-clique) e **GitHub Pages** (publica `/docs`)

## Por que vanilla?

O catálogo tem ~12 cards e renderiza em milissegundos. Adicionar React + Vite + npm install custaria mais que o app inteiro. A regra é: **se o app cabe em < 500 linhas de JS, use vanilla**.

## Estrutura de pastas

```
docs/                        ← raiz servida pelo GitHub Pages
├── index.html               ← entry point (carrega CSS e JS na ordem)
├── styles/                  ← CSS modular
│   ├── tokens.css           ← variáveis (cores, fontes, raios, sombras)
│   ├── base.css             ← reset, body, container, sections, footer
│   ├── header.css           ← título, search, chips de filtro
│   ├── cards.css            ← repo-card, skill-card, badges, status dots
│   ├── modal.css            ← modal de detalhes
│   └── responsive.css       ← media queries (tablet, mobile)
├── scripts/                 ← JS modular (vanilla, sem ES modules)
│   ├── state.js             ← state global + constantes (TYPE_LABEL, etc.)
│   ├── utils.js             ← escapeHTML
│   ├── filters.js           ← chips + lógica de filtros e busca
│   ├── cards.js             ← render do grid de skills e repos
│   ├── modal.js             ← abrir/fechar modal de detalhes
│   └── main.js              ← bootstrap + bindings globais
└── data/
    └── skills.js            ← fonte única de verdade (window.SKILLS_DATA)
```

## Ordem de carregamento (importante)

`index.html` carrega arquivos nesta ordem específica — alterar a ordem **quebra o app**:

### CSS
```
tokens.css   →  base.css  →  header.css  →  cards.css  →  modal.css  →  responsive.css
```
- `tokens.css` define variáveis usadas por todos os outros
- `responsive.css` por último pra sobrescrever os defaults via media queries

### JavaScript
```
data/skills.js  →  state.js  →  utils.js  →  filters.js  →  cards.js  →  modal.js  →  main.js
```
- `skills.js` define `window.SKILLS_DATA` (consumido por `main.js`)
- `state.js` define o objeto `state` global usado por todos
- `utils.js` define `escapeHTML` usado por todos os render functions
- `filters.js`, `cards.js`, `modal.js` definem funções consumidas por `main.js`
- `main.js` é IIFE que dispara o bootstrap

## Por que não ES modules (`import`/`export`)?

ES modules não funcionam com `file://` no Chrome (CORS). Como um dos requisitos é abrir o app por duplo-clique, mantemos JS clássico com `<script>` tags ordenadas e funções em escopo global.

Trade-off aceito: menos isolamento de escopo. Mitigado por: cada arquivo tem responsabilidade única e nomes prefixados quando ambíguos.

## Fluxo de dados

```
                    user click chip / type search
                              │
                              ▼
                  filters.js: onChipClick / main.js: input handler
                              │   updates state
                              ▼
                  ┌─────── state ───────┐
                  │  filterType         │
                  │  filterStatus       │
                  │  query              │
                  │  skills (immutable) │
                  └─────────────────────┘
                              │
                              ▼
                  filters.js: applyFilters()
                              │ returns filtered subset
                              ▼
                  cards.js: renderSkills()
                              │
                              ▼
                       DOM updated
```

`state.skills` é carregado uma vez (no boot) e nunca mutado. Filtros e busca **derivam** o subconjunto a renderizar — não modificam o array original.

## Modal

Click no card → `cards.js` chama `openModal(id)` → `modal.js` busca a skill no state, monta HTML e remove `hidden`.

Fechamento por: botão `×`, click no backdrop (`data-close`), ou tecla `ESC`. Todos os 3 atalhos chamam `closeModal()`.

## Segurança

Todo conteúdo dinâmico injetado via `innerHTML` passa por `escapeHTML()`. Isso previne XSS caso o `skills.js` seja editado com strings que contenham `<script>` ou aspas que quebrem o HTML.

Convenção: **nunca** interpolar string vinda de `state.skills` no `innerHTML` sem passar por `escapeHTML()` primeiro.

## Onde editar para mudar X

| Quero mudar... | Edito... |
|----------------|----------|
| Cores, fontes, raios | `styles/tokens.css` |
| Layout do card de skill | `styles/cards.css` (visual) + `scripts/cards.js` (HTML) |
| Lógica de filtros | `scripts/filters.js` |
| Estrutura do modal | `styles/modal.css` (visual) + `scripts/modal.js` (HTML) |
| Adicionar/remover skill | `data/skills.js` (ver `CONTRIBUTING.md`) |
| Adicionar nova categoria de filtro | `scripts/filters.js` (array `groups`) + `scripts/state.js` (constantes) |
| Mudar título da página | `docs/index.html` (`<h1 class="header-title">`) |
| Adicionar nova media query | `styles/responsive.css` |

## Decisões de design

- **`docs/` em vez de `src/`**: GitHub Pages serve nativamente de `/docs` na branch main. Zero config de deploy.
- **`data/skills.js` em vez de `.json`**: `fetch('data/skills.json')` falha em `file://` por CORS. Wrapping em `window.SKILLS_DATA = {...}` permite `<script>` direto.
- **Documentação em `documentation/`**: nome explícito pra não conflitar com `docs/` (que é o app).
- **Sem `package.json`**: não há dependências, scripts ou build. Adicionar custaria > beneficiaria.
