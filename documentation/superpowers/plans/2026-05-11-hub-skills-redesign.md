# Hub Skills Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrar o Hub Skills do HTML/CSS/JS vanilla atual (em `docs/`) para uma SPA em Vite + React + TypeScript + Tailwind v4 + shadcn (em `/app/`), preservando o design language e adicionando busca textual, tags por domínio e favoritos persistidos em localStorage.

**Architecture:** Greenfield em `/app/` — não toca em `docs/` durante a migração. Camada de dados é um módulo TS tipado importado direto (sem fetch). State via `useState` + custom hooks (`useFilters`, `useFavorites`); derivação via `useMemo` + `useDeferredValue`. UI composta sobre primitives do shadcn (preset `nova`, base `zinc`). Deploy em Vercel apontando para `app/` como root directory.

**Tech Stack:** Vite 5, React 18, TypeScript 5, Tailwind v4, shadcn/ui (nova/zinc), `@fontsource-variable/inter`, `lucide-react`, `sonner`, Vitest 1.x + `@testing-library/react`, jsdom.

**Spec de referência:** [documentation/superpowers/specs/2026-05-11-hub-skills-redesign-vite-shadcn-design.md](../specs/2026-05-11-hub-skills-redesign-vite-shadcn-design.md)

---

## File Structure

Arquivos criados durante este plano (todos em `/app/`, exceto onde indicado):

```
app/
├── index.html                          ← entry HTML (Vite default + ajustes)
├── package.json                        ← deps
├── pnpm-lock.yaml
├── tsconfig.json                       ← path alias @/* → src/*
├── tsconfig.node.json
├── vite.config.ts                      ← plugin Tailwind v4 + alias
├── vitest.config.ts                    ← config separada de testes
├── components.json                     ← gerado pelo shadcn init
├── public/
│   └── favicon.svg
└── src/
    ├── main.tsx                        ← bootstrap React + import Inter + sonner
    ├── App.tsx                         ← layout + composição final
    ├── index.css                       ← @import tailwindcss + @theme tokens
    ├── setup-tests.ts                  ← jest-dom matchers
    ├── types.ts                        ← Skill, Repositorio, Filters
    ├── data/
    │   └── skills.ts                   ← migração de docs/data/skills.js
    ├── lib/
    │   ├── utils.ts                    ← cn() — gerado pelo shadcn
    │   └── storage.ts                  ← wrapper localStorage com try/catch
    ├── hooks/
    │   ├── use-favorites.ts
    │   ├── use-filters.ts
    │   └── use-filtered-skills.ts
    ├── components/
    │   ├── ui/                         ← gerado pelo shadcn (button, badge, card, dialog, input, input-group, toggle-group, separator, empty, tooltip, sonner, skeleton)
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
        ├── use-filtered-skills.test.ts
        ├── SkillCard.test.tsx
        ├── FilterChips.test.tsx
        ├── SearchBar.test.tsx
        └── SkillModal.test.tsx

vercel.json                             ← na raiz da repo
documentation/ARCHITECTURE.md           ← atualização
documentation/DESIGN.md                 ← atualização
documentation/DATA_MODEL.md             ← atualização (campo tags)
README.md                               ← atualização
CHANGELOG.md                            ← entrada 0.3.0
```

`docs/` permanece intocado durante todas as fases A-D. Decisão sobre redirect/remoção fica na Fase E.

---

## Phase A — Bootstrap do `/app/`

### Task A1: Inicializar projeto Vite

**Files:**
- Create: `app/` (estrutura inteira via scaffold)

- [ ] **Step 1: Criar projeto Vite**

```bash
pnpm create vite@latest app -- --template react-ts
```

- [ ] **Step 2: Instalar dependências**

```bash
cd app
pnpm install
```

- [ ] **Step 3: Verificar que o dev server sobe**

```bash
pnpm dev
```

Expected: server inicia em `http://localhost:5173`, exibe a página default do Vite + React.

Pare o servidor com Ctrl+C.

- [ ] **Step 4: Commit**

```bash
cd ..
git add app/
git commit -m "feat(app): scaffold projeto Vite + React + TypeScript"
```

---

### Task A2: Configurar Tailwind v4 + path alias

**Files:**
- Modify: `app/package.json` (deps)
- Modify: `app/vite.config.ts`
- Modify: `app/tsconfig.json`
- Modify: `app/tsconfig.node.json`
- Modify: `app/src/index.css`

- [ ] **Step 1: Instalar Tailwind v4 + tipos de node**

```bash
cd app
pnpm add tailwindcss @tailwindcss/vite
pnpm add -D @types/node
```

- [ ] **Step 2: Configurar `vite.config.ts` com plugin Tailwind e alias `@/*`**

Substituir o conteúdo de `app/vite.config.ts` por:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

- [ ] **Step 3: Adicionar path alias em `tsconfig.json`**

Substituir o conteúdo de `app/tsconfig.json` por:

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

- [ ] **Step 4: Adicionar path alias em `tsconfig.app.json` (criar se Vite gerou só tsconfig.json)**

Verificar se existe `app/tsconfig.app.json`. Se sim, garantir que tem dentro de `compilerOptions`:

```json
"baseUrl": ".",
"paths": {
  "@/*": ["./src/*"]
}
```

- [ ] **Step 5: Substituir `app/src/index.css` por import Tailwind**

```css
@import "tailwindcss";
```

(Os tokens semânticos completos virão depois do shadcn init no Task A4.)

- [ ] **Step 6: Verificar que ainda compila**

```bash
pnpm dev
```

Expected: server sobe, `App.tsx` default ainda renderiza (sem estilos Tailwind aplicados ainda — isso vem nos próximos tasks).

- [ ] **Step 7: Commit**

```bash
cd ..
git add app/
git commit -m "feat(app): configura Tailwind v4 e path alias @/*"
```

---

### Task A3: Rodar `shadcn init` (preset nova, base zinc)

**Files:**
- Create: `app/components.json`
- Create: `app/src/lib/utils.ts`
- Modify: `app/src/index.css` (adiciona variáveis shadcn)

- [ ] **Step 1: Rodar shadcn init**

```bash
cd app
pnpm dlx shadcn@latest init
```

Responder o prompt interativo com:
- Style: `nova` (ou aceitar default se for "new-york" — o shadcn pode pedir explicitamente)
- Base color: `zinc`
- Framework: `vite`
- TypeScript: `yes`
- CSS file: `src/index.css`
- Server components: `no` (Vite SPA não tem RSC)
- Icon library: `lucide`
- Path alias: `@/*` (default)
- Tailwind version: `v4`

- [ ] **Step 2: Verificar artefatos criados**

```bash
ls src/lib/
cat components.json
```

Expected: `src/lib/utils.ts` existe com função `cn()`. `components.json` declara `style: nova`, `tailwind.cssVariables: true`, `tailwind.baseColor: zinc`, `framework: vite`, `aliases.ui: @/components/ui`.

- [ ] **Step 3: Verificar que `index.css` ganhou tokens shadcn**

`src/index.css` agora deve conter blocos `:root { --background: ... }` e `.dark { ... }` ou `@theme inline { ... }`. Mantém como o init gerou — vamos só adicionar tokens custom no próximo task.

- [ ] **Step 4: Commit**

```bash
cd ..
git add app/
git commit -m "feat(app): inicializa shadcn (nova/zinc) com Tailwind v4"
```

---

### Task A4: Adicionar tokens semânticos custom (badges, status)

**Files:**
- Modify: `app/src/index.css`

- [ ] **Step 1: Adicionar tokens custom ao `index.css`**

Localizar o bloco `@theme inline` (ou `:root`) que o shadcn gerou no `app/src/index.css`. **Logo após** as variáveis base do shadcn, adicionar (mantendo as variáveis existentes do shadcn intocadas):

```css
@theme inline {
  /* Badges por tipo de skill */
  --color-badge-nativa: #dbeafe;
  --color-badge-nativa-foreground: #1e40af;
  --color-badge-plugin: #ede9fe;
  --color-badge-plugin-foreground: #5b21b6;
  --color-badge-customizada: #ffedd5;
  --color-badge-customizada-foreground: #9a3412;

  /* Status (instalada / wishlist) */
  --color-status-instalada: #dcfce7;
  --color-status-instalada-foreground: #166534;
  --color-status-wishlist: #fef3c7;
  --color-status-wishlist-foreground: #854d0e;

  /* Ícone de card de repositório */
  --color-repo-icon: #eff6ff;
  --color-repo-icon-foreground: #2563eb;
}
```

**Importante:** Se o shadcn já criou um `@theme inline`, mesclar dentro desse bloco em vez de criar um novo. Se criou apenas `:root`, adicionar como um novo `@theme inline` no fim do arquivo.

- [ ] **Step 2: Verificar que Tailwind reconhece os tokens**

Abrir `src/App.tsx` e substituir conteúdo por um teste rápido:

```tsx
function App() {
  return (
    <div className="p-8 space-y-2 bg-background text-foreground">
      <h1 className="text-3xl font-bold">Hub Skills (em construção)</h1>
      <p className="text-muted-foreground">Tokens base do shadcn funcionando.</p>
      <div className="flex gap-2">
        <span className="bg-badge-nativa text-badge-nativa-foreground px-2 py-1 rounded text-xs uppercase tracking-wide font-bold">Nativa</span>
        <span className="bg-badge-plugin text-badge-plugin-foreground px-2 py-1 rounded text-xs uppercase tracking-wide font-bold">Plugin</span>
        <span className="bg-badge-customizada text-badge-customizada-foreground px-2 py-1 rounded text-xs uppercase tracking-wide font-bold">Customizada</span>
      </div>
    </div>
  );
}

export default App;
```

- [ ] **Step 3: Rodar dev e verificar visualmente**

```bash
cd app
pnpm dev
```

Expected: badges aparecem com as cores corretas (azul claro, roxo, laranja) e texto contrastante. Fundo `bg-background` (`#fafafa` aproximado, vindo do shadcn zinc).

- [ ] **Step 4: Commit**

```bash
cd ..
git add app/src/index.css app/src/App.tsx
git commit -m "feat(app): adiciona tokens semânticos custom (badges, status)"
```

---

### Task A5: Adicionar fonte Inter Variable

**Files:**
- Modify: `app/package.json`
- Modify: `app/src/main.tsx`
- Modify: `app/src/index.css`

- [ ] **Step 1: Instalar `@fontsource-variable/inter`**

```bash
cd app
pnpm add @fontsource-variable/inter
```

- [ ] **Step 2: Importar a fonte em `src/main.tsx`**

Adicionar a linha de import no topo (após os imports React existentes):

```ts
import '@fontsource-variable/inter';
```

- [ ] **Step 3: Aplicar a família como base no `index.css`**

Dentro do mesmo `@theme inline` que tem as variáveis custom, adicionar:

```css
--font-sans: "Inter Variable", system-ui, sans-serif;
```

E garantir que o body usa essa fonte. Se o shadcn ainda não aplicou, adicionar no fim do `index.css`:

```css
html, body {
  font-family: var(--font-sans);
}
```

- [ ] **Step 4: Verificar visualmente**

```bash
pnpm dev
```

Expected: o título "Hub Skills (em construção)" agora aparece em Inter (visualmente mais geométrica que a system font default).

- [ ] **Step 5: Commit**

```bash
cd ..
git add app/
git commit -m "feat(app): adiciona Inter Variable como fonte base"
```

---

## Phase B — Dados, tipos, testes e hooks

### Task B1: Configurar Vitest + Testing Library

**Files:**
- Modify: `app/package.json`
- Create: `app/vitest.config.ts`
- Create: `app/src/setup-tests.ts`

- [ ] **Step 1: Instalar deps de teste**

```bash
cd app
pnpm add -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @vitest/ui
```

- [ ] **Step 2: Criar `app/vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setup-tests.ts'],
    css: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

- [ ] **Step 3: Criar `app/src/setup-tests.ts`**

```ts
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 4: Adicionar scripts no `package.json`**

Em `app/package.json`, dentro de `"scripts"`, garantir:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 5: Verificar que a config carrega sem erro**

```bash
pnpm test
```

Expected: vitest roda mas reporta "No test files found, exiting with code 0". Sem erros de config.

- [ ] **Step 6: Commit**

```bash
cd ..
git add app/
git commit -m "test(app): configura Vitest + Testing Library + jsdom"
```

---

### Task B2: Criar `src/types.ts`

**Files:**
- Create: `app/src/types.ts`

- [ ] **Step 1: Criar arquivo de tipos**

```ts
// app/src/types.ts
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
  tags: SkillDomain[];
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

export interface FilterCounts {
  types: Record<SkillType, number>;
  statuses: Record<SkillStatus, number>;
  tags: Record<SkillDomain, number>;
  favorites: number;
}
```

- [ ] **Step 2: Verificar que compila**

```bash
cd app
pnpm tsc --noEmit
```

Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
cd ..
git add app/src/types.ts
git commit -m "feat(app): adiciona tipos Skill, Repositorio, Filters"
```

---

### Task B3: Migrar dados de `docs/data/skills.js` para `app/src/data/skills.ts`

**Files:**
- Read: `docs/data/skills.js`
- Create: `app/src/data/skills.ts`

- [ ] **Step 1: Ler `docs/data/skills.js` para entender estrutura atual**

```bash
cat docs/data/skills.js
```

Expected: um arquivo definindo `window.SKILLS_DATA = { repositorios: [...], skills: [...] }`.

- [ ] **Step 2: Criar `app/src/data/skills.ts`**

Estrutura do arquivo (preencher os arrays com o conteúdo lido no Step 1, removendo o wrapper `window.SKILLS_DATA = ` e convertendo para `export const`):

```ts
import type { SkillsDataset } from '@/types';

export const skillsDataset: SkillsDataset = {
  repositorios: [
    // ... conteúdo migrado de docs/data/skills.js, propriedade repositorios
  ],
  skills: [
    // ... conteúdo migrado de docs/data/skills.js, propriedade skills
    // Para CADA skill, adicionar o campo tags: SkillDomain[] populando manualmente.
    // Heurística:
    //   - skill que envolve código/CLI/repo → 'dev'
    //   - skill que envolve UI/visual/design → 'design'
    //   - skill que envolve organização/escrita/agenda → 'produtividade'
    //   - skill que envolve dados/análise/SQL → 'dados'
    //   - skill que envolve geração de mídia/texto → 'conteudo'
    //   - fallback → 'outro'
  ],
};
```

**Importante:** Cada skill no array deve ter:
- Todos os campos originais (id, nome, tipo, status, descricao, output, cases, linkRepo?, subSkills?)
- Novo campo `tags: SkillDomain[]` — pelo menos uma tag, máximo três, populado por inspeção manual.

- [ ] **Step 3: Verificar tipagem**

```bash
cd app
pnpm tsc --noEmit
```

Expected: sem erros. Se algum tipo não bate, ajustar até passar.

- [ ] **Step 4: Commit**

```bash
cd ..
git add app/src/data/skills.ts
git commit -m "feat(app): migra dataset de skills para módulo TS tipado com tags"
```

---

### Task B4: Storage wrapper + `useFavorites`

**Files:**
- Create: `app/src/lib/storage.ts`
- Create: `app/src/__tests__/storage.test.ts`
- Create: `app/src/hooks/use-favorites.ts`
- Create: `app/src/__tests__/use-favorites.test.ts`

- [ ] **Step 1: Escrever testes de `storage.ts` primeiro**

Criar `app/src/__tests__/storage.test.ts`:

```ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { readJSON, writeJSON } from '@/lib/storage';

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('readJSON retorna fallback quando chave não existe', () => {
    expect(readJSON('missing', ['fallback'])).toEqual(['fallback']);
  });

  it('writeJSON e readJSON roundtrip', () => {
    writeJSON('test', { a: 1, b: [2, 3] });
    expect(readJSON('test', null)).toEqual({ a: 1, b: [2, 3] });
  });

  it('readJSON retorna fallback quando JSON está corrompido', () => {
    localStorage.setItem('broken', '{not json');
    expect(readJSON('broken', 'fallback')).toBe('fallback');
  });

  it('writeJSON não lança quando localStorage falha (private mode)', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });
    expect(() => writeJSON('any', { x: 1 })).not.toThrow();
  });

  it('readJSON não lança quando localStorage falha', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('SecurityError');
    });
    expect(readJSON('any', 'safe')).toBe('safe');
  });
});
```

- [ ] **Step 2: Rodar teste e confirmar que falha**

```bash
cd app
pnpm test
```

Expected: FAIL — `@/lib/storage` não existe.

- [ ] **Step 3: Implementar `app/src/lib/storage.ts`**

```ts
export function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeJSON(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // private mode, quota, etc. — silenciosamente ignora
  }
}
```

- [ ] **Step 4: Rodar testes e confirmar PASS**

```bash
pnpm test
```

Expected: PASS — 5 testes verdes.

- [ ] **Step 5: Escrever testes de `useFavorites`**

Criar `app/src/__tests__/use-favorites.test.ts`:

```ts
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFavorites } from '@/hooks/use-favorites';

describe('useFavorites', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('começa vazio quando localStorage está vazio', () => {
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites.size).toBe(0);
    expect(result.current.isFavorite('any')).toBe(false);
  });

  it('toggle adiciona quando ausente', () => {
    const { result } = renderHook(() => useFavorites());
    act(() => result.current.toggle('skill-1'));
    expect(result.current.isFavorite('skill-1')).toBe(true);
    expect(result.current.favorites.size).toBe(1);
  });

  it('toggle remove quando presente', () => {
    const { result } = renderHook(() => useFavorites());
    act(() => result.current.toggle('skill-1'));
    act(() => result.current.toggle('skill-1'));
    expect(result.current.isFavorite('skill-1')).toBe(false);
    expect(result.current.favorites.size).toBe(0);
  });

  it('persiste em localStorage', () => {
    const { result } = renderHook(() => useFavorites());
    act(() => result.current.toggle('skill-a'));
    act(() => result.current.toggle('skill-b'));
    const raw = localStorage.getItem('hub-skills:favorites');
    expect(raw).not.toBeNull();
    const parsed = JSON.parse(raw!);
    expect(parsed).toEqual(expect.arrayContaining(['skill-a', 'skill-b']));
  });

  it('hidrata a partir de localStorage', () => {
    localStorage.setItem('hub-skills:favorites', JSON.stringify(['x', 'y']));
    const { result } = renderHook(() => useFavorites());
    expect(result.current.isFavorite('x')).toBe(true);
    expect(result.current.isFavorite('y')).toBe(true);
    expect(result.current.favorites.size).toBe(2);
  });
});
```

- [ ] **Step 6: Rodar e confirmar FAIL**

```bash
pnpm test
```

Expected: FAIL — `@/hooks/use-favorites` não existe.

- [ ] **Step 7: Implementar `app/src/hooks/use-favorites.ts`**

```ts
import { useCallback, useEffect, useState } from 'react';
import { readJSON, writeJSON } from '@/lib/storage';

const STORAGE_KEY = 'hub-skills:favorites';

export interface UseFavoritesResult {
  favorites: Set<string>;
  toggle: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export function useFavorites(): UseFavoritesResult {
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    const initial = readJSON<string[]>(STORAGE_KEY, []);
    return new Set(initial);
  });

  useEffect(() => {
    writeJSON(STORAGE_KEY, Array.from(favorites));
  }, [favorites]);

  const toggle = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (id: string) => favorites.has(id),
    [favorites]
  );

  return { favorites, toggle, isFavorite };
}
```

- [ ] **Step 8: Rodar e confirmar PASS**

```bash
pnpm test
```

Expected: PASS — todos os testes (storage + favorites) verdes.

- [ ] **Step 9: Commit**

```bash
cd ..
git add app/src/lib/storage.ts app/src/hooks/use-favorites.ts app/src/__tests__/storage.test.ts app/src/__tests__/use-favorites.test.ts
git commit -m "feat(app): adiciona storage wrapper e useFavorites com persistência"
```

---

### Task B5: `useFilters` e `useFilteredSkills`

**Files:**
- Create: `app/src/hooks/use-filters.ts`
- Create: `app/src/hooks/use-filtered-skills.ts`
- Create: `app/src/__tests__/use-filters.test.ts`
- Create: `app/src/__tests__/use-filtered-skills.test.ts`

- [ ] **Step 1: Escrever testes de `useFilters`**

Criar `app/src/__tests__/use-filters.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFilters } from '@/hooks/use-filters';

describe('useFilters', () => {
  it('estado inicial é vazio', () => {
    const { result } = renderHook(() => useFilters());
    expect(result.current.filters).toEqual({
      types: [],
      statuses: [],
      tags: [],
      onlyFavorites: false,
      query: '',
    });
  });

  it('setType alterna inclusão/remoção', () => {
    const { result } = renderHook(() => useFilters());
    act(() => result.current.setType('nativa'));
    expect(result.current.filters.types).toEqual(['nativa']);
    act(() => result.current.setType('plugin'));
    expect(result.current.filters.types).toEqual(['nativa', 'plugin']);
    act(() => result.current.setType('nativa'));
    expect(result.current.filters.types).toEqual(['plugin']);
  });

  it('setStatus alterna corretamente', () => {
    const { result } = renderHook(() => useFilters());
    act(() => result.current.setStatus('instalada'));
    expect(result.current.filters.statuses).toEqual(['instalada']);
  });

  it('setTag alterna corretamente', () => {
    const { result } = renderHook(() => useFilters());
    act(() => result.current.setTag('dev'));
    expect(result.current.filters.tags).toEqual(['dev']);
  });

  it('setQuery atualiza string', () => {
    const { result } = renderHook(() => useFilters());
    act(() => result.current.setQuery('teste'));
    expect(result.current.filters.query).toBe('teste');
  });

  it('toggleFavoritesOnly inverte boolean', () => {
    const { result } = renderHook(() => useFilters());
    act(() => result.current.toggleFavoritesOnly());
    expect(result.current.filters.onlyFavorites).toBe(true);
    act(() => result.current.toggleFavoritesOnly());
    expect(result.current.filters.onlyFavorites).toBe(false);
  });

  it('reset zera tudo', () => {
    const { result } = renderHook(() => useFilters());
    act(() => {
      result.current.setType('nativa');
      result.current.setQuery('teste');
      result.current.toggleFavoritesOnly();
    });
    act(() => result.current.reset());
    expect(result.current.filters).toEqual({
      types: [],
      statuses: [],
      tags: [],
      onlyFavorites: false,
      query: '',
    });
  });
});
```

- [ ] **Step 2: Rodar e confirmar FAIL**

```bash
cd app
pnpm test
```

Expected: FAIL — `@/hooks/use-filters` não existe.

- [ ] **Step 3: Implementar `app/src/hooks/use-filters.ts`**

```ts
import { useCallback, useState } from 'react';
import type { Filters, SkillDomain, SkillStatus, SkillType } from '@/types';

const initialFilters: Filters = {
  types: [],
  statuses: [],
  tags: [],
  onlyFavorites: false,
  query: '',
};

function toggle<T>(arr: T[], value: T): T[] {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
}

export interface UseFiltersResult {
  filters: Filters;
  setType: (t: SkillType) => void;
  setStatus: (s: SkillStatus) => void;
  setTag: (t: SkillDomain) => void;
  setQuery: (q: string) => void;
  toggleFavoritesOnly: () => void;
  reset: () => void;
}

export function useFilters(): UseFiltersResult {
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const setType = useCallback((t: SkillType) => {
    setFilters((f) => ({ ...f, types: toggle(f.types, t) }));
  }, []);

  const setStatus = useCallback((s: SkillStatus) => {
    setFilters((f) => ({ ...f, statuses: toggle(f.statuses, s) }));
  }, []);

  const setTag = useCallback((t: SkillDomain) => {
    setFilters((f) => ({ ...f, tags: toggle(f.tags, t) }));
  }, []);

  const setQuery = useCallback((q: string) => {
    setFilters((f) => ({ ...f, query: q }));
  }, []);

  const toggleFavoritesOnly = useCallback(() => {
    setFilters((f) => ({ ...f, onlyFavorites: !f.onlyFavorites }));
  }, []);

  const reset = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  return { filters, setType, setStatus, setTag, setQuery, toggleFavoritesOnly, reset };
}
```

- [ ] **Step 4: Rodar e confirmar PASS**

```bash
pnpm test
```

Expected: PASS.

- [ ] **Step 5: Escrever testes de `useFilteredSkills`**

Criar `app/src/__tests__/use-filtered-skills.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useFilteredSkills } from '@/hooks/use-filtered-skills';
import type { Filters, Skill } from '@/types';

const skill = (overrides: Partial<Skill>): Skill => ({
  id: 'x',
  nome: 'Skill X',
  tipo: 'nativa',
  status: 'instalada',
  descricao: 'descrição',
  output: 'output',
  cases: ['caso 1'],
  tags: ['dev'],
  ...overrides,
});

const filters = (overrides: Partial<Filters> = {}): Filters => ({
  types: [],
  statuses: [],
  tags: [],
  onlyFavorites: false,
  query: '',
  ...overrides,
});

describe('useFilteredSkills', () => {
  const skills: Skill[] = [
    skill({ id: '1', nome: 'Alpha', tipo: 'nativa', status: 'instalada', tags: ['dev'] }),
    skill({ id: '2', nome: 'Beta', tipo: 'plugin', status: 'wishlist', tags: ['design'] }),
    skill({ id: '3', nome: 'Gamma', tipo: 'customizada', status: 'instalada', tags: ['dev', 'produtividade'] }),
    skill({ id: '4', nome: 'Delta', tipo: 'nativa', status: 'wishlist', tags: ['conteudo'] }),
  ];

  it('sem filtros retorna tudo', () => {
    const { result } = renderHook(() => useFilteredSkills(skills, filters(), new Set()));
    expect(result.current.map((s) => s.id)).toEqual(['1', '2', '3', '4']);
  });

  it('filtra por type (OR entre selecionados)', () => {
    const { result } = renderHook(() => useFilteredSkills(skills, filters({ types: ['nativa', 'plugin'] }), new Set()));
    expect(result.current.map((s) => s.id)).toEqual(['1', '2', '4']);
  });

  it('filtra por status', () => {
    const { result } = renderHook(() => useFilteredSkills(skills, filters({ statuses: ['wishlist'] }), new Set()));
    expect(result.current.map((s) => s.id)).toEqual(['2', '4']);
  });

  it('filtra por tag (OR entre selecionadas)', () => {
    const { result } = renderHook(() => useFilteredSkills(skills, filters({ tags: ['design'] }), new Set()));
    expect(result.current.map((s) => s.id)).toEqual(['2']);
  });

  it('combina filtros (AND entre dimensões)', () => {
    const { result } = renderHook(() => useFilteredSkills(skills, filters({ types: ['nativa'], statuses: ['wishlist'] }), new Set()));
    expect(result.current.map((s) => s.id)).toEqual(['4']);
  });

  it('busca por query no nome (case-insensitive)', () => {
    const { result } = renderHook(() => useFilteredSkills(skills, filters({ query: 'ALPHA' }), new Set()));
    expect(result.current.map((s) => s.id)).toEqual(['1']);
  });

  it('busca por query em cases', () => {
    const custom = skill({ id: '99', nome: 'Tau', cases: ['unique-case-string'], tags: ['outro'] });
    const { result } = renderHook(() => useFilteredSkills([...skills, custom], filters({ query: 'unique-case' }), new Set()));
    expect(result.current.map((s) => s.id)).toEqual(['99']);
  });

  it('onlyFavorites filtra pelo Set de IDs favoritados', () => {
    const { result } = renderHook(() => useFilteredSkills(skills, filters({ onlyFavorites: true }), new Set(['2', '4'])));
    expect(result.current.map((s) => s.id)).toEqual(['2', '4']);
  });

  it('retorna array vazio quando nada bate', () => {
    const { result } = renderHook(() => useFilteredSkills(skills, filters({ types: ['plugin'], statuses: ['instalada'] }), new Set()));
    expect(result.current).toEqual([]);
  });
});
```

- [ ] **Step 6: Rodar e confirmar FAIL**

```bash
pnpm test
```

Expected: FAIL — `@/hooks/use-filtered-skills` não existe.

- [ ] **Step 7: Implementar `app/src/hooks/use-filtered-skills.ts`**

```ts
import { useMemo } from 'react';
import type { Filters, Skill } from '@/types';

function matchesQuery(skill: Skill, query: string): boolean {
  if (!query) return true;
  const q = query.toLowerCase();
  if (skill.nome.toLowerCase().includes(q)) return true;
  if (skill.descricao.toLowerCase().includes(q)) return true;
  if (skill.output.toLowerCase().includes(q)) return true;
  if (skill.cases.some((c) => c.toLowerCase().includes(q))) return true;
  return false;
}

export function useFilteredSkills(
  skills: Skill[],
  filters: Filters,
  favorites: Set<string>,
): Skill[] {
  return useMemo(() => {
    return skills.filter((skill) => {
      if (filters.onlyFavorites && !favorites.has(skill.id)) return false;
      if (filters.types.length > 0 && !filters.types.includes(skill.tipo)) return false;
      if (filters.statuses.length > 0 && !filters.statuses.includes(skill.status)) return false;
      if (filters.tags.length > 0 && !skill.tags.some((t) => filters.tags.includes(t))) return false;
      if (!matchesQuery(skill, filters.query)) return false;
      return true;
    });
  }, [skills, filters, favorites]);
}
```

- [ ] **Step 8: Rodar e confirmar PASS**

```bash
pnpm test
```

Expected: PASS — todos os testes (storage + favorites + filters + filtered-skills) verdes.

- [ ] **Step 9: Commit**

```bash
cd ..
git add app/src/hooks/ app/src/__tests__/use-filters.test.ts app/src/__tests__/use-filtered-skills.test.ts
git commit -m "feat(app): adiciona useFilters e useFilteredSkills com cobertura completa"
```

---

## Phase C — Componentes shadcn + custom

### Task C1: Instalar primitives shadcn via CLI

**Files:**
- Create: `app/src/components/ui/*` (vários, gerados pelo CLI)

- [ ] **Step 1: Instalar primitives**

```bash
cd app
pnpm dlx shadcn@latest add button badge card dialog input input-group toggle-group separator empty tooltip sonner skeleton
```

Aceitar overwrite se perguntar. Se algum nome de primitive não existir (ex.: `input-group` em versões antigas), confirmar via `pnpm dlx shadcn@latest search` e ajustar.

- [ ] **Step 2: Verificar arquivos gerados**

```bash
ls src/components/ui/
```

Expected: arquivos `button.tsx`, `badge.tsx`, `card.tsx`, `dialog.tsx`, `input.tsx`, `input-group.tsx`, `toggle-group.tsx`, `separator.tsx`, `empty.tsx`, `tooltip.tsx`, `sonner.tsx`, `skeleton.tsx`.

- [ ] **Step 3: Verificar que ainda compila**

```bash
pnpm tsc --noEmit
pnpm test
```

Expected: sem erros de tipo. Testes ainda verdes.

- [ ] **Step 4: Adicionar `<Toaster />` em `main.tsx`**

Modificar `app/src/main.tsx` para envolver `App` com o Toaster:

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/inter';
import './index.css';
import App from './App.tsx';
import { Toaster } from '@/components/ui/sonner';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster position="bottom-right" />
  </StrictMode>,
);
```

- [ ] **Step 5: Commit**

```bash
cd ..
git add app/
git commit -m "feat(app): instala primitives shadcn (12 componentes) e configura Toaster"
```

---

### Task C2: Componente `Header`

**Files:**
- Create: `app/src/components/Header.tsx`

- [ ] **Step 1: Implementar `Header.tsx`**

```tsx
// app/src/components/Header.tsx
export function Header() {
  return (
    <header className="pt-12 pb-8">
      <h1 className="text-[32px] font-bold tracking-[-0.02em] text-foreground">
        Meu Hub de Skills do Claude
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Inventário pessoal das Skills que tenho instaladas e das que quero instalar depois.
      </p>
    </header>
  );
}
```

- [ ] **Step 2: Verificar tipagem**

```bash
cd app
pnpm tsc --noEmit
```

Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
cd ..
git add app/src/components/Header.tsx
git commit -m "feat(app): adiciona componente Header"
```

---

### Task C3: Componente `SearchBar` + teste

**Files:**
- Create: `app/src/components/SearchBar.tsx`
- Create: `app/src/__tests__/SearchBar.test.tsx`

- [ ] **Step 1: Escrever teste**

```tsx
// app/src/__tests__/SearchBar.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from '@/components/SearchBar';

describe('SearchBar', () => {
  it('renderiza com placeholder', () => {
    render(<SearchBar value="" onChange={() => {}} />);
    expect(screen.getByPlaceholderText(/buscar/i)).toBeInTheDocument();
  });

  it('chama onChange a cada tecla', async () => {
    const onChange = vi.fn();
    render(<SearchBar value="" onChange={onChange} />);
    await userEvent.type(screen.getByPlaceholderText(/buscar/i), 'abc');
    expect(onChange).toHaveBeenCalledTimes(3);
    expect(onChange).toHaveBeenLastCalledWith('c');
  });
});
```

- [ ] **Step 2: Rodar e confirmar FAIL**

```bash
cd app
pnpm test
```

Expected: FAIL.

- [ ] **Step 3: Implementar `SearchBar.tsx`**

```tsx
// app/src/components/SearchBar.tsx
import { SearchIcon } from 'lucide-react';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <InputGroup>
      <InputGroupAddon>
        <SearchIcon data-icon="inline-start" />
      </InputGroupAddon>
      <InputGroupInput
        placeholder="Buscar skills por nome, output ou caso de uso"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Buscar skills"
      />
    </InputGroup>
  );
}
```

**Nota:** se a versão instalada do shadcn não tem `InputGroup`, fallback para `Input` direto com ícone absoluto. Conferir API real via `pnpm dlx shadcn@latest docs input-group` e ajustar.

- [ ] **Step 4: Rodar e confirmar PASS**

```bash
pnpm test
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
cd ..
git add app/src/components/SearchBar.tsx app/src/__tests__/SearchBar.test.tsx
git commit -m "feat(app): adiciona SearchBar com InputGroup"
```

---

### Task C4: Componente `FilterChips` + teste

**Files:**
- Create: `app/src/components/FilterChips.tsx`
- Create: `app/src/__tests__/FilterChips.test.tsx`

- [ ] **Step 1: Escrever teste de smoke + interação**

```tsx
// app/src/__tests__/FilterChips.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FilterChips } from '@/components/FilterChips';
import type { Filters, FilterCounts } from '@/types';

const emptyFilters: Filters = {
  types: [],
  statuses: [],
  tags: [],
  onlyFavorites: false,
  query: '',
};

const counts: FilterCounts = {
  types: { nativa: 3, plugin: 2, customizada: 1 },
  statuses: { instalada: 4, wishlist: 2 },
  tags: { dev: 3, design: 1, produtividade: 1, dados: 0, conteudo: 1, outro: 0 },
  favorites: 1,
};

describe('FilterChips', () => {
  it('renderiza chips de cada tipo, status e tag', () => {
    render(
      <FilterChips
        filters={emptyFilters}
        counts={counts}
        onTypeToggle={() => {}}
        onStatusToggle={() => {}}
        onTagToggle={() => {}}
        onFavoritesToggle={() => {}}
      />
    );
    expect(screen.getByRole('button', { name: /Nativa/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Instalada/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Dev/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Favoritas/i })).toBeInTheDocument();
  });

  it('clicar em chip de tipo dispara onTypeToggle com o tipo correto', async () => {
    const onTypeToggle = vi.fn();
    render(
      <FilterChips
        filters={emptyFilters}
        counts={counts}
        onTypeToggle={onTypeToggle}
        onStatusToggle={() => {}}
        onTagToggle={() => {}}
        onFavoritesToggle={() => {}}
      />
    );
    await userEvent.click(screen.getByRole('button', { name: /Nativa/i }));
    expect(onTypeToggle).toHaveBeenCalledWith('nativa');
  });
});
```

- [ ] **Step 2: Rodar e confirmar FAIL**

```bash
cd app
pnpm test
```

Expected: FAIL.

- [ ] **Step 3: Implementar `FilterChips.tsx`**

```tsx
// app/src/components/FilterChips.tsx
import { Star } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Badge } from '@/components/ui/badge';
import type { Filters, FilterCounts, SkillType, SkillStatus, SkillDomain } from '@/types';

const TYPE_LABELS: Record<SkillType, string> = {
  nativa: 'Nativa',
  plugin: 'Plugin',
  customizada: 'Customizada',
};

const STATUS_LABELS: Record<SkillStatus, string> = {
  instalada: 'Instalada',
  wishlist: 'Wishlist',
};

const TAG_LABELS: Record<SkillDomain, string> = {
  dev: 'Dev',
  design: 'Design',
  produtividade: 'Produtividade',
  dados: 'Dados',
  conteudo: 'Conteúdo',
  outro: 'Outro',
};

export interface FilterChipsProps {
  filters: Filters;
  counts: FilterCounts;
  onTypeToggle: (t: SkillType) => void;
  onStatusToggle: (s: SkillStatus) => void;
  onTagToggle: (t: SkillDomain) => void;
  onFavoritesToggle: () => void;
}

export function FilterChips({
  filters,
  counts,
  onTypeToggle,
  onStatusToggle,
  onTagToggle,
  onFavoritesToggle,
}: FilterChipsProps) {
  return (
    <div className="space-y-3">
      <ToggleGroup
        type="multiple"
        value={filters.types}
        aria-label="Filtrar por tipo"
        className="flex-wrap gap-2 justify-start"
      >
        {(Object.keys(TYPE_LABELS) as SkillType[]).map((t) => (
          <ToggleGroupItem key={t} value={t} onClick={() => onTypeToggle(t)} className="gap-2">
            {TYPE_LABELS[t]}
            <Badge variant="secondary" className="ml-1">{counts.types[t]}</Badge>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <ToggleGroup
        type="multiple"
        value={filters.statuses}
        aria-label="Filtrar por status"
        className="flex-wrap gap-2 justify-start"
      >
        {(Object.keys(STATUS_LABELS) as SkillStatus[]).map((s) => (
          <ToggleGroupItem key={s} value={s} onClick={() => onStatusToggle(s)} className="gap-2">
            {STATUS_LABELS[s]}
            <Badge variant="secondary" className="ml-1">{counts.statuses[s]}</Badge>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <ToggleGroup
        type="multiple"
        value={filters.tags}
        aria-label="Filtrar por domínio"
        className="flex-wrap gap-2 justify-start"
      >
        {(Object.keys(TAG_LABELS) as SkillDomain[]).map((t) => (
          <ToggleGroupItem key={t} value={t} onClick={() => onTagToggle(t)} className="gap-2">
            {TAG_LABELS[t]}
            <Badge variant="secondary" className="ml-1">{counts.tags[t]}</Badge>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <ToggleGroup
        type="single"
        value={filters.onlyFavorites ? 'on' : ''}
        aria-label="Filtrar favoritas"
      >
        <ToggleGroupItem value="on" onClick={onFavoritesToggle} className="gap-2">
          <Star data-icon="inline-start" />
          Favoritas
          <Badge variant="secondary" className="ml-1">{counts.favorites}</Badge>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
```

- [ ] **Step 4: Rodar e confirmar PASS**

```bash
pnpm test
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
cd ..
git add app/src/components/FilterChips.tsx app/src/__tests__/FilterChips.test.tsx
git commit -m "feat(app): adiciona FilterChips (tipo, status, tags, favoritas)"
```

---

### Task C5: Componente `SectionHeader`

**Files:**
- Create: `app/src/components/SectionHeader.tsx`

- [ ] **Step 1: Implementar**

```tsx
// app/src/components/SectionHeader.tsx
export interface SectionHeaderProps {
  title: string;
  count: number;
}

export function SectionHeader({ title, count }: SectionHeaderProps) {
  return (
    <h2 className="flex items-baseline gap-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mt-10 mb-4">
      {title}
      <span className="text-muted-foreground/70 font-medium tracking-[0.04em]">
        {count}
      </span>
    </h2>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd ..
git add app/src/components/SectionHeader.tsx
git commit -m "feat(app): adiciona SectionHeader"
```

---

### Task C6: Componente `RepoCard`

**Files:**
- Create: `app/src/components/RepoCard.tsx`

- [ ] **Step 1: Implementar**

```tsx
// app/src/components/RepoCard.tsx
import { GitBranch, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { Repositorio } from '@/types';

export interface RepoCardProps {
  repo: Repositorio;
}

export function RepoCard({ repo }: RepoCardProps) {
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Abrir ${repo.nome} em nova aba`}
      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
    >
      <Card className="transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
        <CardContent className="flex items-start gap-4 p-4">
          <div className="flex size-10 items-center justify-center rounded-lg bg-repo-icon text-repo-icon-foreground shrink-0">
            <GitBranch />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-[15px] truncate">{repo.nome}</h3>
              <ExternalLink className="size-3.5 text-muted-foreground/70 shrink-0" />
            </div>
            <p className="mt-1 text-[13px] text-muted-foreground line-clamp-2">{repo.descricao}</p>
          </div>
        </CardContent>
      </Card>
    </a>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd ..
git add app/src/components/RepoCard.tsx
git commit -m "feat(app): adiciona RepoCard"
```

---

### Task C7: Componente `SkillCard` + teste

**Files:**
- Create: `app/src/components/SkillCard.tsx`
- Create: `app/src/__tests__/SkillCard.test.tsx`

- [ ] **Step 1: Escrever teste**

```tsx
// app/src/__tests__/SkillCard.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SkillCard } from '@/components/SkillCard';
import type { Skill } from '@/types';

const skill: Skill = {
  id: 'test-1',
  nome: 'Skill de Teste',
  tipo: 'nativa',
  status: 'instalada',
  descricao: 'Descrição',
  output: 'Output produzido',
  cases: ['caso A', 'caso B'],
  tags: ['dev'],
};

describe('SkillCard', () => {
  it('renderiza nome, badge de tipo e descrição', () => {
    render(<SkillCard skill={skill} isFavorite={false} onFavoriteToggle={() => {}} onClick={() => {}} />);
    expect(screen.getByText('Skill de Teste')).toBeInTheDocument();
    expect(screen.getByText(/Nativa/i)).toBeInTheDocument();
    expect(screen.getByText('Descrição')).toBeInTheDocument();
  });

  it('chama onFavoriteToggle ao clicar na estrela sem propagar', async () => {
    const onClick = vi.fn();
    const onFavoriteToggle = vi.fn();
    render(<SkillCard skill={skill} isFavorite={false} onFavoriteToggle={onFavoriteToggle} onClick={onClick} />);
    await userEvent.click(screen.getByRole('button', { name: /Adicionar.*favorita/i }));
    expect(onFavoriteToggle).toHaveBeenCalledWith('test-1');
    expect(onClick).not.toHaveBeenCalled();
  });

  it('chama onClick ao clicar fora da estrela', async () => {
    const onClick = vi.fn();
    render(<SkillCard skill={skill} isFavorite={false} onFavoriteToggle={() => {}} onClick={onClick} />);
    await userEvent.click(screen.getByText('Skill de Teste'));
    expect(onClick).toHaveBeenCalledWith(skill);
  });
});
```

- [ ] **Step 2: Rodar e confirmar FAIL**

```bash
cd app
pnpm test
```

Expected: FAIL.

- [ ] **Step 3: Implementar `SkillCard.tsx`**

```tsx
// app/src/components/SkillCard.tsx
import { Star } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import type { Skill, SkillType, SkillStatus } from '@/types';

const TYPE_LABEL: Record<SkillType, string> = {
  nativa: 'Nativa',
  plugin: 'Plugin',
  customizada: 'Customizada',
};

const TYPE_BADGE_CLASS: Record<SkillType, string> = {
  nativa: 'bg-badge-nativa text-badge-nativa-foreground',
  plugin: 'bg-badge-plugin text-badge-plugin-foreground',
  customizada: 'bg-badge-customizada text-badge-customizada-foreground',
};

const STATUS_LABEL: Record<SkillStatus, string> = {
  instalada: 'Instalada',
  wishlist: 'Wishlist',
};

const STATUS_CLASS: Record<SkillStatus, string> = {
  instalada: 'bg-status-instalada text-status-instalada-foreground',
  wishlist: 'bg-status-wishlist text-status-wishlist-foreground',
};

export interface SkillCardProps {
  skill: Skill;
  isFavorite: boolean;
  onFavoriteToggle: (id: string) => void;
  onClick: (skill: Skill) => void;
}

export function SkillCard({ skill, isFavorite, onFavoriteToggle, onClick }: SkillCardProps) {
  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={() => onClick(skill)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(skill);
        }
      }}
      aria-label={`Abrir detalhes de ${skill.nome}`}
      className="transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <CardHeader className="flex flex-row items-start justify-between gap-2 pb-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className={cn(TYPE_BADGE_CLASS[skill.tipo], 'uppercase tracking-[0.08em] font-bold text-[10px]')}>
              {TYPE_LABEL[skill.tipo]}
            </Badge>
          </div>
          <h3 className="mt-2 text-[15px] font-semibold truncate">{skill.nome}</h3>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onFavoriteToggle(skill.id);
              }}
              aria-label={isFavorite ? `Remover ${skill.nome} das favoritas` : `Adicionar ${skill.nome} às favoritas`}
              className="rounded p-1 text-muted-foreground/70 hover:text-foreground active:scale-95 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Star className={cn('size-4', isFavorite && 'fill-current text-amber-500')} />
            </button>
          </TooltipTrigger>
          <TooltipContent>{isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}</TooltipContent>
        </Tooltip>
      </CardHeader>

      <CardContent className="pb-3 space-y-2">
        <p className="text-[13px] text-muted-foreground line-clamp-2">{skill.descricao}</p>
        {skill.output && (
          <p className="text-[12px]">
            <span className="font-semibold">Output:</span>{' '}
            <span className="text-muted-foreground">{skill.output}</span>
          </p>
        )}
        {skill.cases.length > 0 && (
          <p className="text-[12px]">
            <span className="font-semibold">Cases:</span>{' '}
            <span className="text-muted-foreground">{skill.cases.join(', ')}</span>
          </p>
        )}
      </CardContent>

      <CardFooter className="pt-0">
        <span
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
            STATUS_CLASS[skill.status],
          )}
        >
          <span className="size-1.5 rounded-full bg-current" />
          {STATUS_LABEL[skill.status]}
        </span>
      </CardFooter>
    </Card>
  );
}
```

- [ ] **Step 4: Rodar e confirmar PASS**

```bash
pnpm test
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
cd ..
git add app/src/components/SkillCard.tsx app/src/__tests__/SkillCard.test.tsx
git commit -m "feat(app): adiciona SkillCard com favorite toggle e badges semânticos"
```

---

### Task C8: Componente `SkillModal` + teste

**Files:**
- Create: `app/src/components/SkillModal.tsx`
- Create: `app/src/__tests__/SkillModal.test.tsx`

- [ ] **Step 1: Escrever teste**

```tsx
// app/src/__tests__/SkillModal.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SkillModal } from '@/components/SkillModal';
import type { Skill } from '@/types';

const skill: Skill = {
  id: 'test-1',
  nome: 'Test Skill',
  tipo: 'plugin',
  status: 'wishlist',
  descricao: 'Descrição completa.',
  output: 'Saída esperada',
  cases: ['caso 1', 'caso 2'],
  tags: ['dev'],
  linkRepo: 'https://example.com/repo',
};

describe('SkillModal', () => {
  it('renderiza skill quando aberto', () => {
    render(<SkillModal skill={skill} open={true} onOpenChange={() => {}} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Test Skill')).toBeInTheDocument();
    expect(screen.getByText('Descrição completa.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /repositório/i })).toHaveAttribute('href', 'https://example.com/repo');
  });

  it('não renderiza dialog quando open=false', () => {
    render(<SkillModal skill={skill} open={false} onOpenChange={() => {}} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('dispara onOpenChange ao fechar via ESC', async () => {
    const onOpenChange = vi.fn();
    render(<SkillModal skill={skill} open={true} onOpenChange={onOpenChange} />);
    await userEvent.keyboard('{Escape}');
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
```

- [ ] **Step 2: Rodar e confirmar FAIL**

```bash
cd app
pnpm test
```

Expected: FAIL.

- [ ] **Step 3: Implementar `SkillModal.tsx`**

```tsx
// app/src/components/SkillModal.tsx
import { ExternalLink } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import type { Skill, SkillType } from '@/types';

const TYPE_LABEL: Record<SkillType, string> = {
  nativa: 'Nativa',
  plugin: 'Plugin',
  customizada: 'Customizada',
};

const TYPE_BADGE_CLASS: Record<SkillType, string> = {
  nativa: 'bg-badge-nativa text-badge-nativa-foreground',
  plugin: 'bg-badge-plugin text-badge-plugin-foreground',
  customizada: 'bg-badge-customizada text-badge-customizada-foreground',
};

export interface SkillModalProps {
  skill: Skill | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SkillModal({ skill, open, onOpenChange }: SkillModalProps) {
  if (!skill) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className={cn(TYPE_BADGE_CLASS[skill.tipo], 'uppercase tracking-[0.08em] font-bold text-[10px]')}>
              {TYPE_LABEL[skill.tipo]}
            </Badge>
          </div>
          <DialogTitle className="text-[22px] font-bold">{skill.nome}</DialogTitle>
          <DialogDescription>{skill.descricao}</DialogDescription>
        </DialogHeader>

        <Separator />

        <div className="space-y-4 text-sm">
          {skill.output && (
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground font-semibold mb-1">
                Output
              </h4>
              <p>{skill.output}</p>
            </div>
          )}

          {skill.cases.length > 0 && (
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground font-semibold mb-1">
                Casos de uso
              </h4>
              <ul className="list-disc list-inside space-y-1">
                {skill.cases.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          )}

          {skill.subSkills && skill.subSkills.length > 0 && (
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground font-semibold mb-1">
                Sub-skills
              </h4>
              <ul className="space-y-2">
                {skill.subSkills.map((s, i) => (
                  <li key={i}>
                    <span className="font-semibold">{s.nome}</span>
                    <span className="text-muted-foreground"> — {s.descricao}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {skill.linkRepo && (
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground font-semibold mb-1">
                Repositório
              </h4>
              <a
                href={skill.linkRepo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir repositório em nova aba"
                className="inline-flex items-center gap-1.5 text-primary hover:underline"
              >
                {skill.linkRepo}
                <ExternalLink className="size-3.5" />
              </a>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

- [ ] **Step 4: Rodar e confirmar PASS**

```bash
pnpm test
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
cd ..
git add app/src/components/SkillModal.tsx app/src/__tests__/SkillModal.test.tsx
git commit -m "feat(app): adiciona SkillModal com seções de output, cases, sub-skills e repo"
```

---

### Task C9: Componente `EmptyState`

**Files:**
- Create: `app/src/components/EmptyState.tsx`

- [ ] **Step 1: Implementar**

```tsx
// app/src/components/EmptyState.tsx
import { SearchX } from 'lucide-react';
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { Button } from '@/components/ui/button';

export interface EmptyStateProps {
  onClearFilters: () => void;
}

export function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <Empty className="my-8">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchX />
        </EmptyMedia>
        <EmptyTitle>Nenhuma skill encontrada</EmptyTitle>
        <EmptyDescription>
          Tente ajustar os filtros ou a busca para ver mais resultados.
        </EmptyDescription>
      </EmptyHeader>
      <Button variant="outline" onClick={onClearFilters}>
        Limpar filtros
      </Button>
    </Empty>
  );
}
```

**Nota:** A API exata do `Empty` pode variar por versão. Se `EmptyMedia variant="icon"` não existir, ajustar conforme `pnpm dlx shadcn@latest docs empty`.

- [ ] **Step 2: Commit**

```bash
cd ..
git add app/src/components/EmptyState.tsx
git commit -m "feat(app): adiciona EmptyState com botão de limpar filtros"
```

---

## Phase D — Integração final

### Task D1: Compor `App.tsx` com todos os componentes

**Files:**
- Modify: `app/src/App.tsx`

- [ ] **Step 1: Substituir `App.tsx` por composição completa**

```tsx
// app/src/App.tsx
import { useDeferredValue, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { skillsDataset } from '@/data/skills';
import { useFilters } from '@/hooks/use-filters';
import { useFavorites } from '@/hooks/use-favorites';
import { useFilteredSkills } from '@/hooks/use-filtered-skills';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { FilterChips } from '@/components/FilterChips';
import { SectionHeader } from '@/components/SectionHeader';
import { RepoCard } from '@/components/RepoCard';
import { SkillCard } from '@/components/SkillCard';
import { SkillModal } from '@/components/SkillModal';
import { EmptyState } from '@/components/EmptyState';
import { Separator } from '@/components/ui/separator';
import type { FilterCounts, Skill, SkillDomain, SkillStatus, SkillType } from '@/types';

const ALL_TYPES: SkillType[] = ['nativa', 'plugin', 'customizada'];
const ALL_STATUSES: SkillStatus[] = ['instalada', 'wishlist'];
const ALL_TAGS: SkillDomain[] = ['dev', 'design', 'produtividade', 'dados', 'conteudo', 'outro'];

function App() {
  const { filters, setType, setStatus, setTag, setQuery, toggleFavoritesOnly, reset } = useFilters();
  const { favorites, toggle, isFavorite } = useFavorites();
  const [selected, setSelected] = useState<Skill | null>(null);

  const deferredQuery = useDeferredValue(filters.query);
  const deferredFilters = useMemo(
    () => ({ ...filters, query: deferredQuery }),
    [filters, deferredQuery],
  );

  const filteredSkills = useFilteredSkills(skillsDataset.skills, deferredFilters, favorites);

  const counts: FilterCounts = useMemo(() => {
    const types = Object.fromEntries(ALL_TYPES.map((t) => [t, 0])) as Record<SkillType, number>;
    const statuses = Object.fromEntries(ALL_STATUSES.map((s) => [s, 0])) as Record<SkillStatus, number>;
    const tags = Object.fromEntries(ALL_TAGS.map((t) => [t, 0])) as Record<SkillDomain, number>;
    for (const s of skillsDataset.skills) {
      types[s.tipo]++;
      statuses[s.status]++;
      for (const t of s.tags) tags[t]++;
    }
    return { types, statuses, tags, favorites: favorites.size };
  }, [favorites]);

  const handleFavoriteToggle = (id: string) => {
    const wasFavorite = isFavorite(id);
    toggle(id);
    toast(wasFavorite ? 'Removido dos favoritos' : 'Adicionado aos favoritos');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto max-w-[1120px] px-6 pb-16">
        <Header />

        <div className="space-y-6">
          <SearchBar value={filters.query} onChange={setQuery} />
          <FilterChips
            filters={filters}
            counts={counts}
            onTypeToggle={setType}
            onStatusToggle={setStatus}
            onTagToggle={setTag}
            onFavoritesToggle={toggleFavoritesOnly}
          />
        </div>

        {skillsDataset.repositorios.length > 0 && (
          <>
            <SectionHeader title="Repositórios base" count={skillsDataset.repositorios.length} />
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {skillsDataset.repositorios.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </div>
            <Separator className="mt-10" />
          </>
        )}

        <SectionHeader title="Skills" count={filteredSkills.length} />
        {filteredSkills.length === 0 ? (
          <EmptyState onClearFilters={reset} />
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSkills.map((skill) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                isFavorite={isFavorite(skill.id)}
                onFavoriteToggle={handleFavoriteToggle}
                onClick={setSelected}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-border mt-10 py-8 text-center text-xs text-muted-foreground/70">
        <p>Hub de Skills do Claude — curado por João Paulo</p>
      </footer>

      <SkillModal
        skill={selected}
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      />
    </div>
  );
}

export default App;
```

- [ ] **Step 2: Rodar dev server e fazer QA manual**

```bash
cd app
pnpm dev
```

Checklist manual no navegador (anotar problemas em um arquivo `qa-notes.md` temporário se houver):

1. **Visual**: paleta zinc, Inter, ritmo de espaçamento equivalente ao `docs/index.html` atual (abrir os dois lado a lado em duas janelas)
2. **Busca**: digitar no input filtra em tempo real, sem lag
3. **Chips de tipo**: clicar em "Nativa" filtra; combinar "Nativa" + "Plugin" mostra ambos
4. **Chips de status**: clicar em "Instalada" filtra
5. **Chips de tags**: clicar em "Dev" filtra
6. **Favoritas**: clicar na estrela em um card adiciona; chip "Favoritas" filtra para esse card; toast aparece
7. **Persistência**: dar reload na página — estrelas permanecem marcadas
8. **Modal**: clicar em um card abre modal com nome, descrição, output, cases, link (se houver), sub-skills (se houver)
9. **Empty state**: digitar uma query absurda → aparece o EmptyState; clicar "Limpar filtros" volta tudo
10. **Teclado**: tab navega entre cards, Enter abre modal, Esc fecha modal
11. **Responsividade**: redimensionar para mobile — grid colapsa para 1 coluna

- [ ] **Step 3: Rodar `tsc` e `test` antes do commit**

```bash
pnpm tsc --noEmit
pnpm test
pnpm build
```

Expected: tudo verde. Build gera `app/dist/`.

- [ ] **Step 4: Commit**

```bash
cd ..
git add app/src/App.tsx
git commit -m "feat(app): integra todos os componentes em App.tsx com features completas"
```

---

## Phase E — Deploy e finalização

### Task E1: Configurar Vercel

**Files:**
- Create: `vercel.json`

- [ ] **Step 1: Criar `vercel.json` na raiz da repo**

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "cd app && pnpm install && pnpm build",
  "outputDirectory": "app/dist",
  "framework": "vite",
  "installCommand": "echo 'install handled in buildCommand'"
}
```

- [ ] **Step 2: Commit**

```bash
git add vercel.json
git commit -m "chore: adiciona vercel.json apontando para app/dist"
```

- [ ] **Step 3: Push e conectar manualmente no dashboard Vercel**

```bash
git push origin main
```

Depois, manualmente no [vercel.com](https://vercel.com):
1. New Project → importar a repo `Hub-Skills`
2. Framework preset: `Vite` (deve ser detectado automaticamente)
3. Root directory: deixar raiz (vercel.json cuida do resto)
4. Deploy

Após deploy concluído, acessar o domínio fornecido (ex.: `hub-skills.vercel.app`) e validar visualmente.

---

### Task E2: Atualizar documentação técnica

**Files:**
- Modify: `documentation/ARCHITECTURE.md`
- Modify: `documentation/DESIGN.md`
- Modify: `documentation/DATA_MODEL.md`
- Modify: `README.md`

- [ ] **Step 1: Atualizar `documentation/ARCHITECTURE.md`**

Substituir as seções "Stack" e "Estrutura de pastas" para refletir Vite + React + TS + Tailwind v4 + shadcn em `/app/`. Manter o histórico — o `docs/` legado fica mencionado como "versão anterior, mantida para histórico" enquanto não removido.

Trechos chave a inserir/modificar (substituir o que existe):

```markdown
## Stack

- **Vite 5** + React 18 + TypeScript 5
- **Tailwind v4** + shadcn/ui (preset nova, base zinc)
- **State**: useState + custom hooks (sem Zustand/Redux)
- **Testes**: Vitest + @testing-library/react + jsdom
- **Hosting**: Vercel (rootDirectory: app)

## Estrutura de pastas

A pasta `/app/` contém o web app. A `/docs/` é a versão anterior (HTML/CSS/JS vanilla), mantida temporariamente para histórico — deve ser removida ou convertida em redirect após o switchover.

Ver layout completo em [documentation/superpowers/specs/2026-05-11-hub-skills-redesign-vite-shadcn-design.md](./superpowers/specs/2026-05-11-hub-skills-redesign-vite-shadcn-design.md).
```

- [ ] **Step 2: Atualizar `documentation/DESIGN.md`**

Adicionar nota no topo apontando para os novos tokens em `app/src/index.css`:

```markdown
> **Nota (v0.3.0):** Os tokens agora vivem em `app/src/index.css` como variáveis Tailwind v4 (`@theme inline`). Esta página descreve o vocabulário conceitual; a implementação concreta está em CSS.
```

Adicionar tabela de mapeamento token-atual → utility-Tailwind:

```markdown
## Mapeamento para Tailwind utilities

| Conceito | Utility shadcn/Tailwind |
|---|---|
| Background base | `bg-background` |
| Surface (card) | `bg-card` |
| Texto principal | `text-foreground` |
| Texto secundário | `text-muted-foreground` |
| Borda | `border` |
| Chip ativo (primary) | `bg-primary text-primary-foreground` |
| Badge nativa | `bg-badge-nativa text-badge-nativa-foreground` |
| Badge plugin | `bg-badge-plugin text-badge-plugin-foreground` |
| Badge customizada | `bg-badge-customizada text-badge-customizada-foreground` |
| Status instalada | `bg-status-instalada text-status-instalada-foreground` |
| Status wishlist | `bg-status-wishlist text-status-wishlist-foreground` |
| Sombra de card | `shadow-sm` em repouso, `shadow-md` em hover |
| Lift de card | `-translate-y-0.5` em hover |
```

- [ ] **Step 3: Atualizar `documentation/DATA_MODEL.md`**

Adicionar campo `tags` no schema de `Skill`:

```markdown
| `tags` | `SkillDomain[]` | sim | domínios da skill, alimentam o filtro por tags. Valores: `'dev'`, `'design'`, `'produtividade'`, `'dados'`, `'conteudo'`, `'outro'` |
```

E atualizar o exemplo de skill com `tags: ['dev']`.

Adicionar nota: "Migração 0.3.0: o dataset agora vive em `app/src/data/skills.ts` como módulo TypeScript tipado, exportado como `skillsDataset`."

- [ ] **Step 4: Atualizar `README.md`**

Substituir a seção "Como rodar" por:

```markdown
## Como rodar

### Desenvolvimento

```bash
cd app
pnpm install
pnpm dev
```

Abre em `http://localhost:5173`.

### Build de produção

```bash
cd app
pnpm build
pnpm preview
```

### Deploy

Push para `main` — Vercel publica automaticamente.

### Testes

```bash
cd app
pnpm test
```
```

E atualizar "Estrutura" para refletir a nova organização.

- [ ] **Step 5: Commit**

```bash
git add documentation/ README.md
git commit -m "docs: atualiza ARCHITECTURE, DESIGN, DATA_MODEL e README para v0.3.0"
```

---

### Task E3: Atualizar CHANGELOG

**Files:**
- Modify: `CHANGELOG.md`

- [ ] **Step 1: Adicionar entrada `0.3.0` no `CHANGELOG.md`**

Inserir logo após o header e antes da entrada "Não publicado" (ou consolidar a "Não publicado" nessa nova versão):

```markdown
## [0.3.0] — 2026-05-11

### Adicionado
- Migração completa para Vite + React 18 + TypeScript + Tailwind v4 + shadcn/ui
- Projeto novo em `/app/` (greenfield, mantendo `/docs/` legado)
- Busca textual sobre nome, descrição, output e cases
- Filtro por tags de domínio (`dev`, `design`, `produtividade`, `dados`, `conteudo`, `outro`)
- Sistema de favoritos persistidos em `localStorage` (chave `hub-skills:favorites`)
- Toast feedback ao favoritar/desfavoritar (sonner)
- Hospedagem na Vercel (deploy automático em push)
- Suíte de testes Vitest com cobertura de hooks e smoke tests de componentes

### Mudado
- Stack: HTML/CSS/JS vanilla → Vite + React + TypeScript
- Estilização: CSS modular → Tailwind v4 + shadcn primitives
- Dataset: `docs/data/skills.js` (window.SKILLS_DATA) → `app/src/data/skills.ts` (módulo tipado)
- Schema: campo novo `tags: SkillDomain[]` em cada skill

### Mantido
- `docs/` (versão anterior preservada como histórico durante a transição)
- Design language: paleta zinc, Inter, chips pretos quando ativos, lift sutil no hover
```

- [ ] **Step 2: Commit**

```bash
git add CHANGELOG.md
git commit -m "docs: changelog 0.3.0"
```

---

### Task E4: Tag de versão e push final

**Files:**
- Nenhum

- [ ] **Step 1: Tag local**

```bash
git tag -a v0.3.0 -m "Hub Skills v0.3.0 — migração para Vite + React + shadcn"
```

- [ ] **Step 2: Push com tags**

```bash
git push origin main --tags
```

- [ ] **Step 3: Verificar deploy Vercel**

Acessar o dashboard Vercel, confirmar que o build da nova tag passou verde. Visitar o domínio de produção e validar:
- Página carrega
- Skills aparecem
- Filtros funcionam
- Favoritos sobrevivem a reload
- Modal abre

---

## Cleanup (PR separado, opcional — fazer quando confiança total)

### Task X1: Remover `docs/` ou converter em redirect

Quando o domínio Vercel estiver estável e validado:

**Opção A: Redirect**

Substituir `docs/index.html` por:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0; url=https://hub-skills.vercel.app/">
  <link rel="canonical" href="https://hub-skills.vercel.app/">
  <title>Hub Skills — redirecionando</title>
</head>
<body>
  <p>Redirecionando para <a href="https://hub-skills.vercel.app/">hub-skills.vercel.app</a>…</p>
</body>
</html>
```

Remover todo o resto: `docs/styles/`, `docs/scripts/`, `docs/data/`.

**Opção B: Remover completamente**

```bash
git rm -r docs/
```

E desativar GitHub Pages nas settings da repo.

Commit:

```bash
git add docs/
git commit -m "chore: substitui docs/ por redirect para domínio Vercel"
# OU
git commit -m "chore: remove docs/ legado após migração v0.3.0"
```

---

## Self-Review

### Spec coverage

| Spec section | Coberto por |
|---|---|
| Stack (Vite + React + TS + Tailwind v4 + shadcn) | Task A1, A2, A3 |
| Light-only | Task A3 (shadcn init sem dark), A4 (tokens custom só light) |
| Inter Variable | Task A5 |
| Tokens semânticos (badges, status) | Task A4 |
| Tipos `Skill`, `Repositorio`, `Filters` | Task B2 |
| Migração de `skills.js` | Task B3 |
| `useFavorites` com localStorage | Task B4 |
| `useFilters` | Task B5 |
| `useFilteredSkills` | Task B5 |
| Busca textual case-insensitive em nome/descricao/output/cases | Task B5 (lógica) + Task C3 (SearchBar) + Task D1 (`useDeferredValue`) |
| Primitives shadcn | Task C1 |
| `Header`, `SearchBar`, `FilterChips`, `SectionHeader`, `RepoCard`, `SkillCard`, `SkillModal`, `EmptyState` | Tasks C2–C9 |
| Layout final | Task D1 |
| Toast feedback | Task C1 (Toaster) + Task D1 (`toast()` em `handleFavoriteToggle`) |
| Deploy Vercel | Task E1 |
| Docs atualizadas | Task E2 |
| CHANGELOG 0.3.0 | Task E3 |
| Cleanup `docs/` legado | Task X1 (opcional, fora do plano principal) |

Sem gaps detectados.

### Type consistency

- `Filters` definido em B2, usado em B5 (hooks), C4 (FilterChips), D1 (App). Mesmo formato.
- `FilterCounts` definido em B2, usado em C4 e D1. Mesmo formato.
- `Skill.tags: SkillDomain[]` consistente em todos os usos.
- `UseFavoritesResult.toggle(id: string)` consistente entre B4 e D1.
- `useFilteredSkills(skills, filters, favorites)` consistente entre B5 e D1.

### Placeholder scan

- Nenhum "TBD" ou "TODO"
- Toda task com código TS/TSX tem o código completo
- Comandos têm output esperado descrito
- Uma exceção declarada: Task C9 menciona que a API do `Empty` pode variar — fallback via `shadcn docs empty`. Idem Task C3 para `InputGroup`. Isso é honesto sobre incerteza de versão, não um placeholder.

---

## Plan complete

Plano salvo em [documentation/superpowers/plans/2026-05-11-hub-skills-redesign.md](../plans/2026-05-11-hub-skills-redesign.md). Duas opções de execução:

1. **Subagent-Driven (recomendado)** — dispatch de subagent fresco por task, review entre tasks, iteração rápida
2. **Inline Execution** — execução das tasks nesta sessão com checkpoints

Qual abordagem prefere?
