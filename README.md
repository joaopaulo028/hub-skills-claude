# Meu Hub de Skills do Claude

Inventário pessoal das Skills do Claude que tenho instaladas e das que quero instalar depois. Curado por João Paulo.

> v0.3.0: SPA em Vite + React + TypeScript + Tailwind v4 + shadcn/ui. Inspirado visualmente no [SkillVault da NoCode StartUp](https://skills-nocode-startup.lovable.app/).

## O que é

Um catálogo visual onde consulto rapidamente:

- Quais Skills já estão **instaladas** na minha máquina/Claude
- Quais Skills mapeei pra **instalar depois** (wishlist)
- Quais marquei como **favoritas** (persistido em `localStorage`)

## Como rodar

### Desenvolvimento

```sh
cd app
pnpm install
pnpm dev
```

Abre em `http://localhost:5173`.

### Build de produção

```sh
cd app
pnpm build
pnpm preview
```

### Testes

```sh
cd app
pnpm test
```

26 testes cobrindo `storage`, `useFavorites`, `useFilters`, `useFilteredSkills`.

## Deploy

Hospedado na Vercel apontando para `app/dist/`. Deploy automático em push para `main`. Config em `vercel.json` na raiz.

## Estrutura

```
.
├── README.md
├── CHANGELOG.md
├── vercel.json
│
├── app/                          ← SPA (Vite + React + TS + shadcn)
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── components.json           ← config shadcn (style=nova, base=zinc)
│   └── src/
│       ├── main.tsx              ← bootstrap + TooltipProvider + Toaster
│       ├── App.tsx               ← composição final
│       ├── index.css             ← Tailwind v4 + @theme tokens
│       ├── types.ts
│       ├── data/skills.ts        ← dataset tipado
│       ├── lib/storage.ts        ← wrapper localStorage
│       ├── hooks/                ← useFilters, useFavorites, useFilteredSkills
│       ├── components/
│       │   ├── ui/               ← 14 primitives shadcn
│       │   └── *.tsx             ← 8 componentes custom
│       └── __tests__/
│
├── docs/                         ← LEGADO (HTML/CSS/JS vanilla) — preservado durante transição
│
└── documentation/
    ├── ARCHITECTURE.md
    ├── DATA_MODEL.md
    ├── CONTRIBUTING.md
    ├── DESIGN.md
    └── superpowers/              ← specs + plans de redesign
```

## Features

- Catálogo de skills com cards (badge de tipo, status dot, hover lift)
- Filtros multi-seleção por tipo (nativa/plugin/customizada), status (instalada/wishlist) e domínio (dev/design/produtividade/dados/conteudo/outro)
- Busca textual case-insensitive sobre nome, descrição, output e cases
- Favoritos persistidos em `localStorage` com toast de confirmação
- Modal de detalhes com sub-skills, link de repositório, fonte e versão
- Empty state com botão limpar filtros
- Acessibilidade: navegação por teclado, ARIA labels, foco visível

## Como atualizar o catálogo

Edite `app/src/data/skills.ts`. Schema em [DATA_MODEL.md](documentation/DATA_MODEL.md). Após editar, o Vite faz hot reload automaticamente.

## Documentação

| Documento | Para quem | Conteúdo |
|-----------|-----------|----------|
| [ARCHITECTURE.md](documentation/ARCHITECTURE.md) | Devs novos | Stack, fluxo de dados, decisões de design |
| [DATA_MODEL.md](documentation/DATA_MODEL.md) | Editores de dados | Schema de Skill e Repositorio |
| [CONTRIBUTING.md](documentation/CONTRIBUTING.md) | Contribuidores | Workflows, convenções |
| [DESIGN.md](documentation/DESIGN.md) | Designers | Tokens, paleta, tipografia, anatomia |
| [superpowers/specs/](documentation/superpowers/specs/) | Histórico | Specs de redesign |
| [superpowers/plans/](documentation/superpowers/plans/) | Histórico | Planos de implementação |

## Stack

- Vite 8 + React 19 + TypeScript 6
- Tailwind v4 + shadcn/ui (preset `radix-nova`, base `zinc`)
- `@fontsource-variable/inter` (self-hosted)
- `lucide-react` para ícones
- `sonner` para toast
- Vitest + `@testing-library/react` + jsdom para testes
- `pnpm` como package manager
- Vercel para hosting

---

_Última atualização: 2026-05-11 (v0.3.0)_
