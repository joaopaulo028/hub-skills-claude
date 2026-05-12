# Modelo de Dados

Schema completo de `app/src/data/skills.ts` — a fonte única de verdade do catálogo.

> **v0.3.0**: o dataset migrou de `docs/data/skills.js` (`window.SKILLS_DATA`) para `app/src/data/skills.ts` (módulo TS exportando `skillsDataset`). Tipos centralizados em `app/src/types.ts`.

## Estrutura raiz

```ts
import type { SkillsDataset } from '@/types';

export const skillsDataset: SkillsDataset = {
  repositorios: Repositorio[],   // pode ser vazio
  skills: Skill[]                // instaladas + wishlist
};
```

## `Skill`

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `id` | string | sim | Identificador único kebab-case (`init`, `superpowers`, `gsd`). |
| `nome` | string | sim | Nome exibido no card e modal. |
| `tipo` | `SkillType` | sim | `'nativa' \| 'plugin' \| 'customizada'`. Define cor do badge. |
| `status` | `SkillStatus` | sim | `'instalada' \| 'wishlist'`. Define cor do status dot. |
| `descricao` | string | sim | 1-2 frases curtas (card + modal intro). |
| `output` | string | sim | O que a skill faz/produz — 1 frase. |
| `cases` | string[] | sim | Cenários de uso — array de strings curtas. |
| `tags` | `SkillDomain[]` | sim | Domínios para filtro: `'dev'`, `'design'`, `'produtividade'`, `'dados'`, `'conteudo'`, `'outro'`. Pelo menos 1, máx ~3. |
| `linkRepo` | string | não | URL https. Se presente, vira link no modal. |
| `subSkills` | `SubSkill[]` | não | Sub-skills (plugins/conjuntos). `{ nome: string, descricao?: string }`. |
| `comoUsar` | string | não | Comando ou instrução. Renderizado no modal. |
| `fonte` | string | não | Origem (ex.: `Claude Code (nativa)`). |
| `versao` | string | não | Versão instalada. |

## Enums

```ts
export type SkillType = 'nativa' | 'plugin' | 'customizada';
export type SkillStatus = 'instalada' | 'wishlist';
export type SkillDomain = 'dev' | 'design' | 'produtividade' | 'dados' | 'conteudo' | 'outro';
```

Adicionar um novo valor a qualquer enum exige:
1. Atualizar o tipo em `app/src/types.ts`
2. Adicionar label/cor em `FilterChips.tsx` (e em `SkillCard.tsx`/`SkillModal.tsx` se for tipo/status)
3. Se for tipo/status: adicionar token em `app/src/index.css` (`@theme inline`)

## Exemplo — skill nativa

```ts
{
  id: 'init',
  nome: 'init',
  tipo: 'nativa',
  status: 'instalada',
  descricao: 'Inicializa um arquivo CLAUDE.md com a documentação automática do seu codebase.',
  output: 'Cria CLAUDE.md com convenções, estrutura e contexto do projeto.',
  cases: ['Repos novos', 'onboarding de projeto', 'alinhar Claude com o código existente'],
  tags: ['dev', 'produtividade'],
  comoUsar: 'Digite /init no Claude Code.',
  fonte: 'Claude Code (nativa)',
}
```

## Exemplo — plugin com sub-skills

```ts
{
  id: 'superpowers',
  nome: 'superpowers',
  tipo: 'plugin',
  status: 'instalada',
  descricao: 'Plugin que traz skills de metodologia.',
  output: 'Workflow brainstorming → plano → TDD → debug → review → merge.',
  cases: ['Trabalho de desenvolvimento sério com disciplina e qualidade'],
  tags: ['dev', 'produtividade'],
  comoUsar: 'Use /superpowers:brainstorming, /superpowers:writing-plans, etc.',
  fonte: 'claude-plugins-official (Anthropic)',
  linkRepo: 'https://github.com/anthropics/claude-plugins-official',
  versao: '5.1.0',
  subSkills: [
    { nome: 'brainstorming' },
    { nome: 'writing-plans' },
    { nome: 'test-driven-development' },
  ],
}
```

## Exemplo — wishlist

```ts
{
  id: 'future-skill',
  nome: 'future-skill',
  tipo: 'customizada',
  status: 'wishlist',
  descricao: 'Skill que ainda não testei mas quero conhecer.',
  output: 'Faz X.',
  cases: ['Quando preciso de Y'],
  tags: ['outro'],
  linkRepo: 'https://github.com/algum/repo',
}
```

## `Repositorio`

Cards exibidos na seção "Repositórios base" no topo da página.

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `id` | string | sim | Slug kebab-case único. |
| `nome` | string | sim | Nome do repositório. |
| `descricao` | string | sim | Descrição curta abaixo do nome. |
| `url` | string | sim | URL externa (abre em nova aba). |

### Exemplo

```ts
{
  id: 'anthropic',
  nome: 'Anthropic',
  descricao: 'Buscar padrões oficiais e exemplos confiáveis',
  url: 'https://github.com/anthropics',
}
```

## Filtros e busca

```ts
export interface Filters {
  types: SkillType[];          // OR dentro, AND com outras dimensões
  statuses: SkillStatus[];     // OR dentro, AND com outras dimensões
  tags: SkillDomain[];         // OR dentro (skill match se qualquer tag bate)
  onlyFavorites: boolean;      // filtra por IDs no Set de favoritos
  query: string;               // case-insensitive sobre nome/descricao/output/cases
}
```

Pipeline em `useFilteredSkills`:

1. Se `onlyFavorites`, mantém só skills cujos IDs estão no `Set<string>` de favoritos
2. Se `types.length > 0`, mantém skills com `tipo` em `types`
3. Se `statuses.length > 0`, mantém skills com `status` em `statuses`
4. Se `tags.length > 0`, mantém skills com pelo menos uma `tag` em `tags`
5. Se `query` não vazia, mantém skills cujo `nome`, `descricao`, `output` ou qualquer item de `cases` contém a query (case-insensitive)

## Validação

Não há validação runtime — TypeScript valida em compile time. Convenções:

- `id` único entre skills
- `descricao` em português, 1-2 frases curtas
- `output` e `cases` sempre preenchidos
- `linkRepo` sempre `https://` quando preenchido
- Arrays vazios são `[]`, nunca `undefined`/`null`
- `tags` com pelo menos um valor

## Persistência de favoritos

Favoritos vivem em `localStorage` chave `hub-skills:favorites` como array JSON de IDs:

```json
["init", "superpowers", "gsd"]
```

Hidratado no boot via `readJSON()` do `lib/storage.ts`. Escreve a cada toggle via `writeJSON()`. Ambos com `try/catch` para Safari private mode — se localStorage falhar, favoritos viram in-memory only.
