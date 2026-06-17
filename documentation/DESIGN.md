# Design

Referência visual e sistema de tokens do Hub Skills.

> **v0.3.0**: tokens migraram de `docs/styles/tokens.css` (vanilla CSS vars) para `app/src/index.css` (Tailwind v4 `@theme inline` + tokens shadcn). Esta página descreve o vocabulário conceitual e mapeia para as utility classes correspondentes.

## Inspiração

Layout inspirado no **SkillVault** da NoCode StartUp: https://skills-nocode-startup.lovable.app/

Adaptações:
- Filtros multi-seleção em 3 grupos (tipo, status, domínio) + chip "Favoritas"
- Cards abrem modal de detalhe em vez de link externo
- Busca textual sobre nome/descrição/output/cases
- Favoritos persistidos com toast feedback

## Sistema de tokens

Os tokens vivem em `app/src/index.css` em duas zonas:

1. **`:root`**: variáveis OKLCH base do shadcn (background, foreground, primary, etc.)
2. **`@theme inline`**: aliases que o Tailwind v4 expõe como utility classes (ex: `--color-background` → `bg-background`)

## Paleta — shadcn base (zinc)

| Token | Utility | Uso |
|-------|---------|-----|
| `--background` | `bg-background` | Background da página (zinc-50 OKLCH) |
| `--foreground` | `text-foreground` | Texto principal (zinc-950 OKLCH) |
| `--card` | `bg-card` | Background do `Card` shadcn |
| `--card-foreground` | `text-card-foreground` | Texto dentro do card |
| `--muted` | `bg-muted` | Background secundário (chips, badges) |
| `--muted-foreground` | `text-muted-foreground` | Texto secundário |
| `--border` | `border` | Borda padrão |
| `--primary` | `bg-primary` | Chip ativo (zinc-900) |
| `--primary-foreground` | `text-primary-foreground` | Texto sobre primary |
| `--ring` | `ring-ring` | Foco visível |

## Paleta — tokens semânticos custom

Tokens custom adicionados em `@theme inline` para badges e status. Aplicados via `style={{ backgroundColor: 'var(--color-badge-nativa)' }}` por compatibilidade com algumas versões do Tailwind v4.

| Token | Cor | Uso |
|-------|-----|-----|
| `--color-badge-nativa` / `-foreground` | azul claro / azul escuro | Badge tipo "Nativa" |
| `--color-badge-plugin` / `-foreground` | roxo claro / roxo escuro | Badge tipo "Plugin" |
| `--color-badge-customizada` / `-foreground` | laranja claro / laranja escuro | Badge tipo "Customizada" |
| `--color-status-instalada` / `-foreground` | verde claro / verde escuro | Status dot "Instalada" |
| `--color-status-wishlist` / `-foreground` | âmbar claro / âmbar escuro | Status dot "Wishlist" |
| `--color-repo-icon` / `-foreground` | azul muito claro / azul forte | Ícone do RepoCard |

## Tipografia

| Token | Valor |
|-------|-------|
| `--font-sans` | `"Inter Variable", system-ui, sans-serif` |

Inter Variable carregada via `@fontsource-variable/inter/index.css` em `main.tsx` (self-hosted, sem CDN externo).

## Hierarquia tipográfica

| Elemento | Tamanho | Peso | Letter-spacing | Componente |
|----------|---------|------|----------------|------------|
| Header título | 32px | 700 | -0.02em | `Header.tsx` |
| Header subtítulo | 14px | 400 | normal | `Header.tsx` |
| Section title | 11px UPPERCASE | 600 | 0.12em | `SectionHeader.tsx` |
| Card nome | 15px | 600 | normal | `SkillCard.tsx`, `RepoCard.tsx` |
| Card descrição | 13px | 400 | normal | `SkillCard.tsx` |
| Card meta (Output/Cases) | 12px | 400 (label 600) | normal | `SkillCard.tsx` |
| Badge | 10px UPPERCASE | 700 | 0.08em | `SkillCard.tsx`, `SkillModal.tsx` |
| Modal título | 22px | 700 | normal | `SkillModal.tsx` |
| Body padrão | 14px | 400 | normal | base shadcn |

Valores aplicados via Tailwind: `text-[32px] font-bold tracking-[-0.02em]`, etc.

## Raios e sombras

shadcn calcula raios a partir de `--radius` (0.625rem ≈ 10px):

| Utility | Valor | Uso |
|---------|-------|-----|
| `rounded-sm` | `calc(--radius - 4px)` | Badges |
| `rounded-md` | `calc(--radius - 2px)` | Inputs, blocos pequenos |
| `rounded-lg` | `--radius` | Cards |
| `rounded-xl` | `calc(--radius + 4px)` | Modal |
| `rounded-full` | `9999px` | Status dots, chips |

Sombras nativas Tailwind:

| Utility | Uso |
|---------|-----|
| `shadow-sm` | Card em repouso |
| `shadow-md` | Card em hover |
| `shadow-xl` | Modal (via Dialog primitive) |

## Animações e microinterações

| Estado | Implementação |
|--------|---------------|
| Hover de card | `transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md` |
| Hover de chip | herdado do `ToggleGroup` shadcn |
| Modal abrir/fechar | nativo do `Dialog` Radix (fade + slide) |
| Focus visível | `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring` |
| Star de favorito click | `active:scale-95 transition-transform` |
| Toast | sonner default (slide do bottom-right) |

Sem dependência externa de animação (sem Framer Motion).

## Layout e grid

| Valor | Aplicação |
|-------|-----------|
| `max-w-[1120px]` | Container central |
| `px-6 pb-16` | Padding lateral e inferior do `<main>` |
| Skills grid | `grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` |
| Repos grid | `grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` |

Breakpoints Tailwind v4:
- `sm`: ≥ 640px
- `lg`: ≥ 1024px

## Anatomia do `SkillCard`

```
┌─────────────────────────────────┐
│ [BADGE-TIPO]            [★]     │  ← CardHeader (badge + favorite)
│ skill-name                      │  ← h3 (15px/600)
│ descrição em 2 linhas (muted)   │  ← CardContent
│ Output: o que faz               │
│ Cases: cenário-1, cenário-2     │
│                                 │
│ • Instalada                     │  ← CardFooter (status dot pill)
└─────────────────────────────────┘
   rounded-lg shadow-sm
   hover:shadow-md hover:-translate-y-0.5
```

## Anatomia do `SkillModal`

```
┌─────────────────────────────── × ─┐
│ [BADGE-TIPO]                       │
│ Skill Name (22px/700)              │
│ Descrição                          │
│ ───────────────────────            │
│ OUTPUT                             │  ← h4 uppercase 11px tracking-wide
│ o que a skill faz                  │
│                                    │
│ CASOS DE USO                       │
│ • caso 1                           │
│ • caso 2                           │
│                                    │
│ COMO USAR                          │
│ /command                           │
│                                    │
│ SUB-SKILLS                         │
│ • brainstorming                    │
│ • writing-plans                    │
│ • ...                              │
│                                    │
│ REPOSITÓRIO                        │
│ https://...  [↗]                   │
│                                    │
│ Fonte: X · Versão: Y               │
└────────────────────────────────────┘
   max-w-2xl
   Dialog primitive (Radix)
```

## Acessibilidade

- `DialogTitle` sempre presente (requisito Radix)
- `ToggleGroup` com navegação por setas
- `Tooltip` no botão de favorito reforça ação para mouse users
- `aria-label` dinâmico em botões (estado dependente)
- `role="button"` + `onKeyDown` (Enter/Space) no `SkillCard`
- Foco visível em todos os interativos

## Onde editar para mudar X

| Quero mudar... | Edito... |
|----------------|----------|
| Cor base (zinc → outro) | `app/components.json` `baseColor` + re-run `shadcn init --force` |
| Cor de badge ou status | `app/src/index.css` (`@theme inline` custom block) |
| Família de fonte | `app/src/main.tsx` (import) + `app/src/index.css` (`--font-sans`) |
| Raio padrão | `app/src/index.css` (`:root --radius`) |
| Largura do container | `app/src/App.tsx` (`max-w-[...]`) |
| Animação de hover | `app/src/components/SkillCard.tsx` (Tailwind utilities) |
