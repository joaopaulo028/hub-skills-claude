# Hub Skills — Redesign: migração para Vite + React + shadcn

- **Data**: 2026-05-11
- **Autor**: João Paulo (via brainstorming com Claude)
- **Status**: design aprovado, pronto para planejamento
- **Versão alvo**: `0.3.0`

## Contexto

O Hub Skills (v0.2.0) é hoje um catálogo pessoal de skills do Claude, implementado em HTML/CSS/JS vanilla, servido pelo GitHub Pages a partir de `docs/`. O visual foi inspirado no [SkillVault da NoCode StartUp](https://skills-nocode-startup.lovable.app/) e os tokens já estão documentados em `documentation/DESIGN.md`.

Este redesign tem dois objetivos:

1. **Migrar a stack** para Vite + React + TypeScript + Tailwind + shadcn — habilitando evolução futura (componentes reutilizáveis, type safety, ecossistema rico).
2. **Aproximar a fidelidade visual** ao SkillVault, preservando o vocabulário de design já capturado em `tokens.css` (paleta zinc, Inter, chips pretos, lift sutil no hover) e melhorando microinterações.

Adicionalmente, três features novas entram no escopo: busca textual, tags por domínio e favoritos persistidos em `localStorage`.

## Decisões fixadas no brainstorming

| Decisão | Valor |
|---|---|
| Estratégia | Migrar stack + clone visual fiel |
| Framework | Vite + React 18 + TypeScript |
| Estilização | Tailwind v4 + shadcn (preset `nova`, base `zinc`, framework `vite`, iconLibrary `lucide`) |
| Tipografia | Inter Variable via `@fontsource-variable/inter` (self-hosted) |
| Tema | Light-only |
| Hosting | Vercel (`rootDirectory: app`) |
| Migração | Greenfield em `/app/`, `docs/` intocado durante o trabalho |
| Features novas | Busca textual, tags por domínio, favoritos com `localStorage` |
| State | `useState` + custom hooks (sem Zustand/Redux) |
| Testes | Vitest para hooks e lógica de filtros; smoke tests para componentes |

## Estrutura final da repo

```
.
├── README.md                    ← atualizado para refletir o novo app
├── CHANGELOG.md                 ← entrada 0.3.0 ao final da migração
├── documentation/               ← docs do projeto (mantida)
│   ├── ARCHITECTURE.md          ← atualizada pra nova stack
│   ├── DATA_MODEL.md            ← atualizada com campo tags
│   ├── DESIGN.md                ← tokens migrados para Tailwind v4 @theme
│   └── superpowers/specs/       ← este e futuros specs
│
├── docs/                        ← LEGADO (mantido intocado durante a migração)
│
├── app/                         ← projeto Vite novo
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── components.json          ← shadcn config
│   ├── public/
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       ├── index.css            ← Tailwind directives + @theme tokens
│       ├── types.ts
│       ├── data/skills.ts
│       ├── lib/
│       │   ├── utils.ts         ← cn()
│       │   └── storage.ts
│       ├── hooks/
│       │   ├── use-filters.ts
│       │   └── use-favorites.ts
│       ├── components/
│       │   ├── ui/              ← gerado pelo shadcn CLI
│       │   ├── Header.tsx
│       │   ├── SearchBar.tsx
│       │   ├── FilterChips.tsx
│       │   ├── RepoCard.tsx
│       │   ├── SkillCard.tsx
│       │   ├── SkillModal.tsx
│       │   ├── EmptyState.tsx
│       │   └── SectionHeader.tsx
│       └── __tests__/
│
└── vercel.json
```

## Design system

### Tokens

A `tokens.css` atual é a fonte da verdade. Cada variável CSS migra para um token semântico do Tailwind v4 em `app/src/index.css` via `@theme inline`. Mapa:

| Token atual (`tokens.css`) | Token Tailwind v4 | shadcn utility |
|---|---|---|
| `--bg #fafafa` | `--color-background` | `bg-background` |
| `--surface #ffffff` | `--color-card` | `bg-card` |
| `--border #e5e7eb` | `--color-border` | `border` |
| `--text #18181b` | `--color-foreground` | `text-foreground` |
| `--text-muted #71717a` | `--color-muted-foreground` | `text-muted-foreground` |
| `--text-soft #a1a1aa` | `--color-muted-foreground` + opacity | `text-muted-foreground/70` |
| `--chip-active-bg #18181b` + `--chip-active-text #fff` | `--color-primary` + `--color-primary-foreground` | `bg-primary` (default variant do `ToggleGroup`) |
| `--shadow-card`, `--shadow-card-hover` | `--shadow-sm`, `--shadow-md` (Tailwind defaults) | `shadow-sm` / `shadow-md` |
| `--radius-md 10px` | `--radius` | shadcn `rounded-lg` |
| `--radius-pill 999px` | `--radius-full` | `rounded-full` |

Tokens semânticos custom adicionais (preservando as cores atuais para badges de tipo e status):

```
--color-badge-nativa, --color-badge-nativa-foreground
--color-badge-plugin, --color-badge-plugin-foreground
--color-badge-customizada, --color-badge-customizada-foreground
--color-status-instalada, --color-status-instalada-foreground
--color-status-wishlist, --color-status-wishlist-foreground
```

### Tipografia

- Família: **Inter Variable** via `@fontsource-variable/inter`, importada em `main.tsx`.
- Hierarquia (preservada da `DESIGN.md` atual):

| Elemento | Tamanho | Peso | Letter-spacing |
|---|---|---|---|
| Header título | 32px | 700 | -0.02em |
| Header subtítulo | 14px | 400 | normal |
| Section title | 11px UPPERCASE | 600 | 0.12em |
| Card nome | 15px | 600 | normal |
| Card descrição | 13px | 400 | normal |
| Card meta | 12px | 400 (label 600) | normal |
| Badge | 10px UPPERCASE | 700 | 0.08em |
| Modal título | 22px | 700 | normal |
| Body | 14px | 400 | normal |

### Animações e microinterações

- **Card hover**: `transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md`
- **Chip hover**: opacity stepdown via `hover:bg-primary/80` (150ms)
- **Modal**: entra/sai via animações nativas do `Dialog` do shadcn (fade + slide)
- **Focus de search**: `focus-visible:ring-2 ring-ring` (default shadcn)
- **Star de favorito**: scale leve no click (`active:scale-95`)

Sem dependências de animação externa (Framer Motion etc.) — apenas Tailwind + transições do Radix.

## Inventário de componentes

### Primitives shadcn (via CLI)

`pnpm dlx shadcn@latest add button badge card dialog input input-group toggle-group separator empty tooltip sonner`

| Primitive | Uso |
|---|---|
| `Button` | Ações secundárias (fechar modal, limpar filtros) |
| `Badge` | Tipo de skill e tags |
| `Card`, `CardHeader`, `CardContent`, `CardFooter`, `CardTitle`, `CardDescription` | Wrapper de `SkillCard` e `RepoCard` |
| `Dialog`, `DialogTitle`, `DialogDescription`, `DialogContent` | `SkillModal` |
| `Input`, `InputGroup`, `InputGroupInput`, `InputGroupAddon` | `SearchBar` com ícone de lupa |
| `ToggleGroup`, `ToggleGroupItem` | `FilterChips` (3 grupos: tipo, status, tags) |
| `Separator` | Divisão entre "Repositórios Base" e "Skills" |
| `Empty`, `EmptyTitle`, `EmptyDescription`, `EmptyMedia` | Estado vazio |
| `Tooltip` | Hint na estrela de favorito |
| `sonner` | Toast de confirmação ao favoritar |

### Componentes custom

Cada componente recebe um arquivo em `src/components/` e um teste em `src/__tests__/`. Boundaries:

- **Header** — título "Meu Hub de Skills do Claude" + subtítulo. Stateless, sem props.
- **SearchBar** — props: `{ value: string; onChange: (v: string) => void }`. Controlled. O `App.tsx` aplica `useDeferredValue` no `value` antes de derivar a lista filtrada — isso prioriza a digitação sobre o re-render do grid, sem timer de debounce.
- **FilterChips** — props: `{ filters: Filters; onChange: (next: Filters) => void; counts: FilterCounts }`. Renderiza 3 `ToggleGroup` separados (tipo, status, tags) + chip "★ Favoritas".
- **RepoCard** — props: `{ repo: Repositorio }`. Card compacto com ícone à esquerda.
- **SkillCard** — props: `{ skill: Skill; isFavorite: boolean; onFavoriteToggle: (id: string) => void; onClick: (skill: Skill) => void }`.
- **SkillModal** — props: `{ skill: Skill | null; open: boolean; onOpenChange: (open: boolean) => void }`. Renderiza descrição completa, output, casos de uso, link do repo, sub-skills (se houver).
- **EmptyState** — props: `{ onClearFilters: () => void }`. Mostrado quando `useFilteredSkills` retorna `[]`.
- **SectionHeader** — props: `{ title: string; count: number }`. Renderiza "REPOSITÓRIOS BASE" / "SKILLS (N)".

## Camada de dados

### Tipos

```ts
// src/types.ts
export type SkillType = 'nativa' | 'plugin' | 'customizada';
export type SkillStatus = 'instalada' | 'wishlist';
export type SkillDomain = 'dev' | 'design' | 'produtividade' | 'dados' | 'conteudo' | 'outro';

export interface SubSkill {
  nome: string;
  descricao: string;
}

export interface Skill {
  id: string;
  nome: string;
  tipo: SkillType;
  status: SkillStatus;
  descricao: string;
  output: string;
  cases: string[];
  tags: SkillDomain[];           // NOVO
  linkRepo?: string;
  subSkills?: SubSkill[];
}

export interface Repositorio {
  id: string;
  nome: string;
  descricao: string;
  url: string;
}

export interface SkillsDataset {
  repositorios: Repositorio[];
  skills: Skill[];
}

export interface Filters {
  types: SkillType[];
  statuses: SkillStatus[];
  tags: SkillDomain[];
  onlyFavorites: boolean;
  query: string;
}
```

### Migração de `skills.js` → `skills.ts`

O conteúdo atual de `docs/data/skills.js` (`window.SKILLS_DATA = {...}`) será portado manualmente para `app/src/data/skills.ts` como `export const skillsDataset: SkillsDataset`. Cada skill recebe um `tags` populado por inspeção manual (decisão do autor).

### Hooks

- **`useFilters()`** — retorna `{ filters, setType, setStatus, setTag, setQuery, toggleFavoritesOnly, reset }`. Estado em memória, não persistido.
- **`useFavorites()`** — retorna `{ favorites: Set<string>, toggle(id), isFavorite(id) }`. Persistido em `localStorage` chave `hub-skills:favorites`. `try/catch` em volta de cada read/write para Safari private mode (fallback: in-memory only).
- **`useFilteredSkills(skills, filters)`** — derivação pura via `useMemo`. Pipeline:
  1. Se `filters.onlyFavorites`, filtra para apenas IDs em `favorites`
  2. Filtra por `types` (vazio = passa tudo)
  3. Filtra por `statuses` (vazio = passa tudo)
  4. Filtra por `tags` (vazio = passa tudo; lógica OR — match em qualquer tag)
  5. Filtra por `query` (case-insensitive, match em `nome`, `descricao`, `output`, ou qualquer item de `cases`)

### Busca textual

- Input controlado por `useState` em `App.tsx`
- `useDeferredValue(query)` para evitar re-renders síncronos a cada tecla
- Sem fuzzy matching — `String.includes` simples após `.toLowerCase()`

### Favoritos

- Estrela no canto superior direito de cada `SkillCard`
- Toggle dispara `toast.success("Adicionado aos favoritos")` ou `toast("Removido dos favoritos")` via `sonner`
- Chip dedicado em `FilterChips` para "★ Favoritas (N)" — quando ativo, filtra apenas IDs em `favorites`

## Layout e fluxo

```
┌────────────────────────────────────────────────────────┐
│ Header                                                 │
│  ─ Título 32/700                                       │
│  ─ Subtítulo 14/400                                    │
├────────────────────────────────────────────────────────┤
│ SearchBar (input com ícone de lupa à esquerda)         │
├────────────────────────────────────────────────────────┤
│ FilterChips                                            │
│  ─ Tipo: [Nativa] [Plugin] [Customizada]               │
│  ─ Status: [Instalada] [Wishlist]                      │
│  ─ Tags: [Dev] [Design] [Produtividade] ...            │
│  ─ [★ Favoritas (N)]                                   │
├────────────────────────────────────────────────────────┤
│ SectionHeader "REPOSITÓRIOS BASE (N)"                  │
│ Grid de RepoCard (3 colunas desktop, 1 mobile)         │
├────────────────────────────────────────────────────────┤
│ Separator                                              │
├────────────────────────────────────────────────────────┤
│ SectionHeader "SKILLS (N)"                             │
│ Grid de SkillCard (3 colunas desktop, 2 tablet, 1 mob.)│
│  ou EmptyState se filtros zeram resultado              │
├────────────────────────────────────────────────────────┤
│ Footer                                                 │
└────────────────────────────────────────────────────────┘
```

Click no `SkillCard` (fora do botão de favorito) abre `SkillModal` com detalhe completo.

## Estados visuais

| Estado | Tratamento |
|---|---|
| Loading inicial | Não aplicável — dados síncronos via `import` |
| Filtros vazios | Todas as skills visíveis |
| Filtros sem match | `EmptyState` com botão "Limpar filtros" |
| Erro localStorage (private mode) | Favoritos viram in-memory only, sem toast de warning |
| Skill sem `linkRepo` | Modal omite a linha "Repositório" |
| Skill sem `subSkills` | Modal omite a seção "Sub-skills" |
| Skill sem `tags` (legado, durante migração) | Não aparece em nenhum filtro de tag, mas aparece em "todas" |

## Acessibilidade

- `DialogTitle` sempre presente (requisito do Radix). Quando o título é redundante visualmente, fica com `className="sr-only"`.
- `ToggleGroup` já vem com keyboard navigation (setas) e ARIA do Radix.
- Foco visível via `focus-visible:ring-2` (default shadcn).
- Botão de favorito tem `aria-label` dinâmico ("Adicionar X aos favoritos" / "Remover X dos favoritos").
- `Tooltip` no botão de favorito reforça a ação para mouse users.

## Sequência de migração

Cinco fases, cada uma um commit (ou PR), cada uma verificável de forma independente:

### Fase A — Bootstrap (`/app/` inicializado)

1. `pnpm create vite@latest app -- --template react-ts`
2. Tailwind v4: `pnpm add tailwindcss @tailwindcss/vite` + plugin em `vite.config.ts` + `@import "tailwindcss"` em `index.css`
3. `pnpm dlx shadcn@latest init` dentro de `/app/` — `style=nova`, `base=zinc`, `framework=vite`, `iconLibrary=lucide`
4. Traduz `tokens.css` para `@theme inline` em `app/src/index.css`
5. Adiciona `@fontsource-variable/inter` e import em `main.tsx`
6. **Verificação**: `pnpm dev` sobe; página default mostra Inter aplicada e cores corretas via Tailwind utilities (`bg-background`, `text-foreground`)

### Fase B — Dados, tipos e hooks

1. Cria `src/types.ts`
2. Migra `docs/data/skills.js` → `src/data/skills.ts` (popular `tags` manualmente para cada skill)
3. Cria `src/lib/storage.ts` (wrapper localStorage com try/catch)
4. Cria `src/hooks/use-filters.ts` e `src/hooks/use-favorites.ts`
5. Cria `src/__tests__/use-filters.test.ts` e `use-favorites.test.ts`
6. **Verificação**: `pnpm test` passa; cobertura mínima de filtros (tipo, status, tags, query, combinação) e favoritos (toggle, persistência, private mode fallback)

### Fase C — Componentes shadcn + custom

1. `pnpm dlx shadcn@latest add button badge card dialog input input-group toggle-group separator empty tooltip sonner`
2. Cria os 8 componentes custom listados na seção "Inventário"
3. Cada componente recebe um smoke test (`render`/`screen.getByText`)
4. **Verificação**: `pnpm test` passa; visualização manual no dev (`App.tsx` rendendo grid mock)

### Fase D — Integração em `App.tsx`

1. Compõe layout completo conforme o ASCII na seção "Layout e fluxo"
2. Liga `useFilters` + `useFavorites` + `useFilteredSkills`
3. Modal abre via state local em `App.tsx` (skill selecionada controla o Dialog)
4. **Verificação manual**:
   - Paridade visual lado-a-lado com `docs/index.html` (mesma paleta, tipografia, espaçamento)
   - Busca textual filtra corretamente
   - Tags filtram corretamente
   - Favoritos sobrevivem a reload
   - Modal abre e fecha em cada skill
   - `EmptyState` aparece quando filtros zeram

### Fase E — Deploy e switchover

1. Cria `vercel.json` na raiz: `{ "rootDirectory": "app", "framework": "vite", "buildCommand": "pnpm build", "outputDirectory": "dist" }`
2. Conecta repo no Vercel (passo manual — instruções no README pós-migração)
3. QA visual no domínio Vercel
4. Atualiza `README.md`, `documentation/ARCHITECTURE.md`, `documentation/DESIGN.md`, `documentation/DATA_MODEL.md`
5. Atualiza `CHANGELOG.md` com versão `0.3.0`
6. Commit final `feat(app): migra para Vite + React + shadcn`

### Cleanup pós-migração (PR separado, opcional)

Quando confiança total no novo app:
- Remove `docs/styles/`, `docs/scripts/`, `docs/data/`
- Substitui `docs/index.html` por um redirect 301 simples para o domínio Vercel
- Ou: remove `docs/` por completo e desativa GH Pages

## Critério de pronto

- Paridade visual confirmada lado a lado com `docs/index.html` (mesmos tokens, mesmo ritmo, mesmas microinterações)
- 4 features novas funcionando (busca, tags, favoritos, persistência)
- `pnpm test` verde
- `pnpm build` verde
- Deploy Vercel verde
- `documentation/*` atualizada para refletir nova stack
- `CHANGELOG.md` com entrada `0.3.0`

## Não-objetivos (explícitos)

- Dark mode (descartado nesta versão — fidelidade ao SkillVault)
- Backend / autenticação / multi-usuário
- Páginas individuais por skill (`/skills/[slug]`) — possível em futura migração para Next.js, fora deste escopo
- Internacionalização — projeto é pessoal em pt-BR
- Animações com Framer Motion ou similar — Tailwind + Radix bastam
- Skeleton loading — dados síncronos não exigem

## Riscos e mitigações

| Risco | Mitigação |
|---|---|
| Tailwind v4 ainda jovem, mudanças de API | Fixa versão exata no `package.json`; revisita ao atualizar |
| shadcn componentes diferentes do design atual | Cada componente custom é uma fina camada acima dos primitives — overrides via `className` só para layout, nunca para cor/tipografia |
| Vercel limita free tier | Projeto pessoal, tráfego baixo — sem risco real |
| Perda de fidelidade visual durante port | Fase D inclui QA visual lado a lado obrigatório antes de Fase E |
| Migração de tags manual demorada | Pode entrar como "tags vazias" inicialmente e ser populada incrementalmente — feature degrada graciosamente |
