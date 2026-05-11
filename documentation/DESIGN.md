# Design

Referência visual e tokens do sistema de design.

## Inspiração

O layout é uma réplica fiel do **SkillVault** da NoCode StartUp:

🔗 https://skills-nocode-startup.lovable.app/

Diferenças intencionais do original:
- Filtros por **tipo** (Nativa/Plugin/Customizada) e **status** (Instalada/Wishlist) em vez de domínios
- Cards abrem **modal de detalhe** em vez de link externo
- Busca por nome no header (SkillVault não tem)

## Tokens

Todos os valores estão em [`docs/styles/tokens.css`](../docs/styles/tokens.css). Use sempre `var(--token)`, nunca hardcode.

### Paleta — superfícies e texto

| Token | Valor | Uso |
|-------|-------|-----|
| `--bg` | `#fafafa` | background da página |
| `--surface` | `#ffffff` | cards, modal, inputs |
| `--border` | `#e5e7eb` | borda padrão de cards e inputs |
| `--border-strong` | `#d4d4d8` | borda em hover |
| `--text` | `#18181b` | texto principal |
| `--text-muted` | `#71717a` | texto secundário (descrições) |
| `--text-soft` | `#a1a1aa` | texto terciário (placeholders, contadores) |

### Paleta — chips de filtro

| Token | Valor | Uso |
|-------|-------|-----|
| `--chip-bg` | `#ffffff` | chip inativo |
| `--chip-active-bg` | `#18181b` | chip ativo (preto) |
| `--chip-active-text` | `#ffffff` | texto do chip ativo |
| `--chip-count-bg` | `#f4f4f5` | badge de contagem inativo |
| `--chip-active-count-bg` | `#3f3f46` | badge de contagem ativo |

### Paleta — badges por tipo de skill

| Tipo | Background | Texto | Cor (hex) |
|------|-----------|-------|-----------|
| Nativa | `--badge-nativa-bg` | `--badge-nativa-text` | azul (`#dbeafe` / `#1e40af`) |
| Plugin | `--badge-plugin-bg` | `--badge-plugin-text` | roxo (`#ede9fe` / `#5b21b6`) |
| Customizada | `--badge-customizada-bg` | `--badge-customizada-text` | laranja (`#ffedd5` / `#9a3412`) |

### Paleta — status

| Status | Background | Texto | Cor |
|--------|-----------|-------|-----|
| Instalada | `--status-instalada-bg` | `--status-instalada-text` | verde (`#dcfce7` / `#166534`) |
| Wishlist | `--status-wishlist-bg` | `--status-wishlist-text` | amarelo (`#fef3c7` / `#854d0e`) |

### Tipografia

| Token | Valor |
|-------|-------|
| `--font-sans` | `Inter, system-ui, sans-serif` |
| `--font-mono` | `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace` |

Inter é carregada do Google Fonts (pesos 400/500/600/700) em `index.html`.

### Raios

| Token | Valor | Uso |
|-------|-------|-----|
| `--radius-sm` | `6px` | badges, blocos de código, sub-skill tags |
| `--radius-md` | `10px` | cards |
| `--radius-lg` | `14px` | modal |
| `--radius-pill` | `999px` | chips, search input, status dots |

### Sombras

| Token | Valor | Uso |
|-------|-------|-----|
| `--shadow-card` | `0 1px 2px rgba(0,0,0,0.04)` | cards em repouso (sutil) |
| `--shadow-card-hover` | `0 4px 12px rgba(0,0,0,0.08)` | cards em hover |
| `--shadow-modal` | `0 20px 60px rgba(0,0,0,0.25)` | modal |

### Layout

| Token | Valor | Uso |
|-------|-------|-----|
| `--container` | `1120px` | largura máxima do conteúdo central |

## Tipografia hierárquica

| Elemento | Tamanho | Peso | Letter-spacing |
|----------|---------|------|----------------|
| Header título | 32px | 700 | -0.02em |
| Header subtítulo | 14px | 400 | normal |
| Section title | 11px UPPERCASE | 600 | 0.12em |
| Card nome | 15px | 600 | normal |
| Card descrição | 13px | 400 | normal |
| Card meta (Output/Cases) | 12px | 400 (label 600) | normal |
| Badge | 10px UPPERCASE | 700 | 0.08em |
| Status dot | 10px | 600 | normal |
| Modal título | 22px | 700 | normal |
| Body padrão | 14px | 400 | normal |

## Espaçamento

Não há escala formal — usa valores múltiplos de 4 e 8 pixels:

- Gap entre cards: `16px`
- Gap entre repos: `12px`
- Padding interno do card: `18px`
- Padding interno do modal: `32px`
- Padding do header: `64px 24px 32px`
- Margin entre seções: `40px`

## Estados

### Hover de card de skill
- Border: `--border-strong`
- Box-shadow: `--shadow-card-hover`
- Translate Y: `-1px` (leve elevação)

### Hover de chip
- Border: `--border-strong`

### Focus do search
- Border: `--text` (preto)
- Box-shadow: anel sutil (`0 0 0 3px rgba(24,24,27,0.08)`)

### Card wishlist
- Background levemente off-white (`#fdfdfd`)
- Texto com `opacity: 0.85`

## Responsividade

Breakpoints definidos em `styles/responsive.css`:

| Breakpoint | Skills grid | Repos grid | Header título |
|------------|-------------|-----------|---------------|
| Default (>900px) | 3 colunas | 4 colunas | 32px |
| Tablet (≤900px) | 2 colunas | 2 colunas | 26px |
| Mobile (≤560px) | 1 coluna | 1 coluna | 26px |

## Anatomia do card de skill

```
┌─────────────────────────────────┐
│ [BADGE-TIPO]    [✓ STATUS-DOT] │  ← .skill-card-top
│                                 │
│ skill-name                      │  ← .skill-name (15px/600)
│ descrição em 2 linhas máximo    │  ← .skill-desc (13px/400, muted)
│ ─────────────────────────────   │  ← .skill-divider
│ Output: o que faz               │  ← .skill-meta-row
│ Cases:  quando usar             │  ← .skill-meta-row
└─────────────────────────────────┘
   border 1px / radius 10px
   padding 18px
   background white
```

## Anatomia do modal

```
┌──────────────────────────── × ─┐
│ [BADGE]  [✓ STATUS]            │
│                                 │
│ Skill Name                      │  22px/700
│ Fonte · v1.0.0                  │  12px muted
│                                 │
│ Descrição completa.             │
│                                 │
│ OUTPUT                          │  label uppercase soft
│ O que a skill faz.              │
│                                 │
│ CASES                           │
│ Quando usar.                    │
│                                 │
│ COMO USAR                       │
│ ┌──────────────────────────┐   │
│ │ /command code block      │   │  mono, fundo escuro
│ └──────────────────────────┘   │
│                                 │
│ INCLUI (14)                     │
│ [tag] [tag] [tag] [tag]        │
│                                 │
│ REPOSITÓRIO                     │
│ https://github.com/...          │  link sublinhado
└─────────────────────────────────┘
   max-width 560px
   max-height 85vh (scroll vertical)
   backdrop blur 2px + black 45%
```
