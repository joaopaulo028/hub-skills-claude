# Changelog

Histórico de mudanças relevantes do projeto. Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/).

## [0.3.0] — 2026-05-11

### Adicionado
- Migração completa para Vite 8 + React 19 + TypeScript 6 + Tailwind v4 + shadcn/ui (preset `radix-nova`, base `zinc`)
- Projeto novo em `/app/` (greenfield, mantendo `/docs/` legado intacto)
- Busca textual case-insensitive sobre nome, descrição, output e cases
- Filtro por tags de domínio (`dev`, `design`, `produtividade`, `dados`, `conteudo`, `outro`)
- Sistema de favoritos persistidos em `localStorage` (chave `hub-skills:favorites`)
- Toast de feedback ao favoritar/desfavoritar via `sonner`
- 14 primitives shadcn (button, badge, card, dialog, input, input-group, toggle-group, separator, empty, tooltip, sonner, skeleton, textarea, toggle)
- 8 componentes custom (Header, SearchBar, FilterChips, SectionHeader, RepoCard, SkillCard, SkillModal, EmptyState)
- Suíte de testes Vitest: 26 testes cobrindo `storage`, `useFavorites`, `useFilters`, `useFilteredSkills`
- Hospedagem na Vercel via `vercel.json` na raiz
- `@fontsource-variable/inter` self-hosted (sem CDN Google Fonts)
- `documentation/superpowers/specs/` e `documentation/superpowers/plans/` com spec + plano da migração

### Mudado
- Stack: HTML/CSS/JS vanilla → Vite + React + TypeScript
- Estilização: CSS modular em `docs/styles/` → Tailwind v4 + shadcn primitives em `app/src/`
- Dataset: `docs/data/skills.js` (`window.SKILLS_DATA`) → `app/src/data/skills.ts` (módulo TS tipado)
- Schema: campo novo `tags: SkillDomain[]` em cada skill; `cases` agora é `string[]` (não mais string única); `subskills: string[]` virou `subSkills: SubSkill[]`
- Repositórios: campo `link` → `url`, adicionado `id` obrigatório
- Hospedagem: GitHub Pages → Vercel (deploy automático em push)
- README reescrito para refletir a nova stack e workflow `pnpm`

### Mantido
- `docs/` (versão anterior preservada como histórico durante a transição — switchover/remoção em PR futuro)
- Design language: paleta zinc, Inter, chips pretos quando ativos, lift sutil no hover
- Documentação em `documentation/` (atualizada para a nova stack)

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
