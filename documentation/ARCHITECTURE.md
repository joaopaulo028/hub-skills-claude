# Arquitetura

Como o web app está estruturado, qual o fluxo de dados e por que algumas decisões foram tomadas. Leitura recomendada para qualquer dev que vá modificar o código.

> **v0.3.0**: o app migrou de HTML/CSS/JS vanilla (em `docs/`) para uma SPA em Vite + React + TS + shadcn (em `app/`). A pasta `docs/` permanece preservada até o switchover final.

## Stack

- **Vite 8** + **React 19** + **TypeScript 6**
- **Tailwind v4** + **shadcn/ui** (preset `radix-nova`, base `zinc`, iconLibrary `lucide`)
- **State**: `useState` + custom hooks (`useFilters`, `useFavorites`, `useFilteredSkills`)
- **Tipografia**: `@fontsource-variable/inter` self-hosted
- **Toast**: `sonner` (wrapper shadcn)
- **Testes**: Vitest 4 + `@testing-library/react` + jsdom
- **Package manager**: `pnpm` 11
- **Hosting**: Vercel apontando para `app/dist/`

## Estrutura de pastas

```
app/                              ← raiz do projeto Vite
├── index.html                    ← entry HTML
├── package.json
├── pnpm-lock.yaml
├── vite.config.ts                ← plugin Tailwind v4 + alias @/*
├── vitest.config.ts              ← config separada de testes
├── tsconfig.json                 ← path alias + ignoreDeprecations
├── tsconfig.app.json
├── tsconfig.node.json
├── components.json               ← config shadcn (style, base, framework)
├── public/                       ← assets estáticos (vazia por enquanto)
└── src/
    ├── main.tsx                  ← bootstrap React + Inter + TooltipProvider + Toaster
    ├── App.tsx                   ← composição: Header + SearchBar + FilterChips + grids + modal + footer
    ├── index.css                 ← @import tailwindcss + @theme tokens + tw-animate-css
    ├── setup-tests.ts            ← jest-dom matchers para Vitest
    ├── types.ts                  ← Skill, Repositorio, Filters, FilterCounts
    ├── data/
    │   └── skills.ts             ← dataset tipado, exportado como skillsDataset
    ├── lib/
    │   ├── utils.ts              ← cn() do shadcn
    │   └── storage.ts            ← readJSON/writeJSON com try/catch
    ├── hooks/
    │   ├── use-filters.ts        ← state dos filtros (memory only)
    │   ├── use-favorites.ts      ← Set<string> persistido em localStorage
    │   └── use-filtered-skills.ts← derivação pura via useMemo
    ├── components/
    │   ├── ui/                   ← gerado pelo shadcn CLI (button, badge, card, dialog, input, input-group, toggle-group, separator, empty, tooltip, sonner, skeleton, textarea, toggle)
    │   ├── Header.tsx
    │   ├── SearchBar.tsx
    │   ├── FilterChips.tsx
    │   ├── SectionHeader.tsx
    │   ├── RepoCard.tsx
    │   ├── SkillCard.tsx
    │   ├── SkillModal.tsx
    │   └── EmptyState.tsx
    └── __tests__/
        ├── storage.test.ts
        ├── use-favorites.test.ts
        ├── use-filters.test.ts
        └── use-filtered-skills.test.ts
```

## Fluxo de dados

```
                  user interaction
                        │
                        ▼
        ┌───────────────────────────────┐
        │  Hooks expostos em App.tsx    │
        │   ├─ useFilters               │
        │   ├─ useFavorites             │
        │   └─ useFilteredSkills        │
        └──────────────┬────────────────┘
                       │
                       ▼  useDeferredValue(query)
        ┌───────────────────────────────┐
        │  Filter pipeline (useMemo)    │
        │   1. onlyFavorites?           │
        │   2. types includes tipo?     │
        │   3. statuses includes status?│
        │   4. tags overlap (OR)?       │
        │   5. matchesQuery?            │
        └──────────────┬────────────────┘
                       │
                       ▼
        ┌───────────────────────────────┐
        │  Grid de SkillCard renderiza  │
        │   (ou EmptyState se vazio)    │
        └───────────────────────────────┘
```

- `skillsDataset` é importado uma vez no boot e nunca mutado.
- `useFavorites` lê/escreve `localStorage` chave `hub-skills:favorites` com `try/catch` (private mode safe).
- Toggle de favorito dispara `toast()` do sonner.

## Acessibilidade

- `DialogTitle` sempre presente (requisito Radix)
- `ToggleGroup` herda navegação por setas do Radix
- `focus-visible:ring-2 ring-ring` em todos os elementos focáveis
- `aria-label` dinâmico no botão de favorito
- `role="button"` + `onKeyDown` no `SkillCard` para suporte teclado completo

## Onde editar para mudar X

| Quero mudar... | Edito... |
|----------------|----------|
| Tokens visuais (paleta, raios, fontes) | `app/src/index.css` (bloco `@theme inline`) |
| Esquema de dados | `app/src/types.ts` |
| Lista de skills | `app/src/data/skills.ts` |
| Lógica de filtro/busca | `app/src/hooks/use-filtered-skills.ts` |
| Persistência de favoritos | `app/src/hooks/use-favorites.ts` + `app/src/lib/storage.ts` |
| Layout do card | `app/src/components/SkillCard.tsx` |
| Estrutura do modal | `app/src/components/SkillModal.tsx` |
| Composição geral da página | `app/src/App.tsx` |
| Adicionar primitive shadcn | `cd app && pnpm dlx shadcn@latest add <nome>` |

## Decisões de design

- **Greenfield em `/app/`**: a pasta `docs/` (legado HTML/CSS/JS) ficou intocada durante a migração. Risco zero de quebrar o site atual.
- **shadcn `base: radix`**: dá comportamento Radix completo (foco/teclado/ARIA) em troca da dependência.
- **Tokens custom via `@theme inline`**: badges e status colors expostos diretamente como `--color-badge-*` para que o Tailwind v4 gere utility classes automaticamente. Onde isso não funciona em algumas versões, aplicamos via `style={{ ... }}` inline com `var(--color-*)`.
- **`useDeferredValue` em vez de debounce**: prioriza digitação no input sobre re-render do grid sem timer.
- **`useState` + custom hooks**: nada de Zustand/Redux. App pequeno o suficiente.
- **Vercel em vez de GitHub Pages**: deploy automático + preview por PR + edge global.
- **TypeScript 6 com `ignoreDeprecations: "6.0"`**: shadcn ainda usa `baseUrl` em tsconfig — silencia o warning sem perder o path alias.
