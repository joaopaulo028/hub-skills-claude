# Changelog

Histórico de mudanças relevantes do projeto. Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/).

## [Não publicado]

### Adicionado
- Estrutura profissional com separação `docs/` (app) + `documentation/` (docs do projeto)
- CSS modular: `tokens.css`, `base.css`, `header.css`, `cards.css`, `modal.css`, `responsive.css`
- JS modular: `state.js`, `utils.js`, `filters.js`, `cards.js`, `modal.js`, `main.js`
- Documentação técnica: `ARCHITECTURE.md`, `DATA_MODEL.md`, `CONTRIBUTING.md`, `DESIGN.md`
- `.editorconfig` para uniformizar indentação entre editores
- `CHANGELOG.md`

### Mudado
- `docs/data/skills.json` → `docs/data/skills.js` (envolvido em `window.SKILLS_DATA`) para funcionar com `file://`
- README reescrito refletindo a nova estrutura

### Removido
- `docs/styles.css` monolítico (substituído pela pasta `styles/`)
- `docs/app.js` monolítico (substituído pela pasta `scripts/`)

## [0.2.0] — 2026-05-11

### Mudado
- **Pivot completo**: deixou de ser hub de estudos e virou inventário pessoal de Skills (instaladas + wishlist)
- Visual redesenhado fiel ao [SkillVault](https://skills-nocode-startup.lovable.app/): catálogo branco, chips de filtro, grid de cards
- Filtros agora por tipo (Nativa/Plugin/Customizada) e status (Instalada/Wishlist)
- Card mostra `Output:` e `Cases:` em vez de descrição genérica
- Modal de detalhe ao clicar no card

### Removido
- Tema "SkillFlix" (Netflix-like com hero gigante e linhas horizontais)
- Seção "Trilhas recomendadas"
- Seção "Meu progresso" com tracker em localStorage
- Pastas de conteúdo de estudo (`00-comece-aqui` até `06-plugins`, `cheatsheets`, `exemplos`, `diario`)

## [0.1.0] — 2026-05-10

### Adicionado
- Estrutura inicial do hub de estudos sobre Skills do Claude
- Pastas numeradas (00-comece-aqui, 01-fundamentos, 02-skills-nativas, etc.)
- Web app "SkillFlix" com hero, trilhas, catálogo, progresso
- Documentação de skills nativas e plugins (superpowers, gsd)
