# Modelo de Dados

Schema completo de `docs/data/skills.js` — a fonte única de verdade do catálogo.

## Estrutura raiz

```js
window.SKILLS_DATA = {
  repositorios: Repositorio[],   // array de repositórios base (pode ser vazio)
  skills: Skill[]                // array de skills (instaladas + wishlist)
};
```

## `Skill`

Representa uma skill no catálogo. Pode ser uma skill nativa, um plugin (que agrupa várias sub-skills) ou uma skill customizada.

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `id` | string | sim | Identificador único, kebab-case (`init`, `superpowers`, `gsd-help`). Usado pra referenciar no DOM. |
| `nome` | string | sim | Nome exibido no card e no modal. Geralmente igual ao `id`. |
| `tipo` | enum | sim | Um de: `nativa`, `plugin`, `customizada`. Define a cor do badge. |
| `status` | enum | sim | Um de: `instalada`, `wishlist`. Define o status dot e visual do card. |
| `descricao` | string | sim | Descrição curta (1-2 frases) exibida no card e como intro do modal. |
| `output` | string | sim | "O que a skill faz/produz" — 1 frase. Renderizada como `Output:` no card. |
| `cases` | string | sim | "Quando usar" — 1 frase com cenários típicos. Renderizada como `Cases:` no card. |
| `comoUsar` | string | não | Comando ou instrução de uso (ex.: `/init`). Renderizado em code block no modal. |
| `fonte` | string | não | Origem da skill (ex.: `Claude Code (nativa)`, `claude-plugins-official (Anthropic)`). |
| `linkRepo` | string \| null | não | URL do repositório oficial. Se presente, vira link no modal. |
| `subskills` | string[] | não | Lista de sub-skills (apenas pra plugins/conjuntos). Renderizadas como tags no modal. |
| `versao` | string | não | Versão instalada (ex.: `5.1.0`). Exibida ao lado da fonte no modal. |

### Enums permitidos

```ts
type Tipo   = 'nativa' | 'plugin' | 'customizada';
type Status = 'instalada' | 'wishlist';
```

Adicionar um novo valor de `tipo` requer:
1. Acrescentar em `scripts/state.js` → `TYPE_LABEL`
2. Acrescentar classe `.badge-<novo>` em `styles/cards.css` com cores
3. Acrescentar chip correspondente em `scripts/filters.js` → array `groups`

### Exemplo: skill nativa

```js
{
  id: "init",
  nome: "init",
  tipo: "nativa",
  status: "instalada",
  descricao: "Inicializa um arquivo CLAUDE.md com a documentação automática do seu codebase.",
  output: "Cria CLAUDE.md com convenções, estrutura e contexto do projeto.",
  cases: "Repos novos, onboarding de projeto, alinhar Claude com o código existente.",
  comoUsar: "Digite /init no Claude Code.",
  fonte: "Claude Code (nativa)",
  linkRepo: null
}
```

### Exemplo: plugin (com sub-skills)

```js
{
  id: "superpowers",
  nome: "superpowers",
  tipo: "plugin",
  status: "instalada",
  descricao: "Plugin que traz 14 skills de metodologia.",
  output: "Workflow brainstorming → plano → TDD → debug → review → merge.",
  cases: "Trabalho de desenvolvimento sério com disciplina e qualidade.",
  comoUsar: "Use /superpowers:brainstorming, /superpowers:writing-plans, etc.",
  fonte: "claude-plugins-official (Anthropic)",
  linkRepo: "https://github.com/anthropics/claude-plugins-official",
  subskills: [
    "using-superpowers",
    "brainstorming",
    "writing-plans"
  ],
  versao: "5.1.0"
}
```

### Exemplo: skill na wishlist

```js
{
  id: "future-skill",
  nome: "future-skill",
  tipo: "customizada",
  status: "wishlist",
  descricao: "Skill que ainda não testei mas quero conhecer.",
  output: "Faz X.",
  cases: "Quando preciso de Y.",
  linkRepo: "https://github.com/algum/repo"
}
```

## `Repositorio`

Cards exibidos na seção `REPOSITÓRIOS BASE` no topo da página.

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `nome` | string | sim | Nome do repositório (ex.: `Anthropic Skills`). |
| `descricao` | string | não | Descrição curta exibida abaixo do nome. |
| `link` | string | sim | URL externa (abre em nova aba). |
| `icone` | string | não | Emoji ou caractere usado como ícone. Default: `📦`. |

### Exemplo

```js
{
  nome: "Anthropic Skills",
  descricao: "Repositório oficial",
  link: "https://github.com/anthropics/claude-plugins-official",
  icone: "🤖"
}
```

## Validação

Não há validação automática. Convenções recomendadas:

- `id` único entre todas as skills
- `descricao` em português, 1-2 frases curtas
- `output` e `cases` sempre preenchidos (são o coração do card)
- `linkRepo` sempre `https://` quando preenchido
- Arrays vazios são `[]`, não `null`

## Onde os campos aparecem na UI

```
┌──────── CARD ────────┐         ┌──────── MODAL ────────┐
│ [tipo]      [status] │         │ [tipo]      [status]  │
│ nome                 │  click  │ nome                  │
│ descricao            │ ──────► │ fonte · vversao       │
│ ─────────────────    │         │                       │
│ Output: output       │         │ descricao             │
│ Cases:  cases        │         │                       │
└──────────────────────┘         │ Output                │
                                 │ output                │
                                 │                       │
                                 │ Cases                 │
                                 │ cases                 │
                                 │                       │
                                 │ Como usar             │
                                 │ comoUsar (code block) │
                                 │                       │
                                 │ Inclui (N)            │
                                 │ [subskill] [subskill] │
                                 │                       │
                                 │ Repositório           │
                                 │ linkRepo (link)       │
                                 └───────────────────────┘
```
