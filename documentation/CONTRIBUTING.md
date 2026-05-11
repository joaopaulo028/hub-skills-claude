# Contribuindo

Guia prático pra fazer alterações comuns no projeto.

## Setup

Não há setup. Sem npm, sem build, sem dependências.

```sh
git clone <repo>
cd "2. Skills Claude"
open docs/index.html       # abre no browser padrão
```

Pra desenvolvimento, recomendo extensão "Live Server" do VSCode pra ter hot-reload — mas funciona sem.

## Workflows comuns

### Adicionar uma skill nova

1. Abra `docs/data/skills.js`
2. Adicione um objeto no array `skills` (schema completo em [DATA_MODEL.md](DATA_MODEL.md))
3. Recarregue o browser (`Cmd+Shift+R`)

Exemplo mínimo:
```js
{
  id: "minha-skill",
  nome: "minha-skill",
  tipo: "nativa",
  status: "instalada",
  descricao: "O que ela faz, em 1-2 frases.",
  output: "O resultado concreto.",
  cases: "Quando faz sentido usar."
}
```

### Mover uma skill de wishlist pra instalada (ou vice-versa)

1. Em `docs/data/skills.js`, troque o valor de `status`
2. Recarregue o browser

### Adicionar repositório base

1. Em `docs/data/skills.js`, adicione objeto no array `repositorios`:
   ```js
   {
     nome: "Skills Directory",
     descricao: "Catálogo da comunidade",
     link: "https://skills-directory.example.com",
     icone: "📚"
   }
   ```
2. Recarregue o browser

Quando o array `repositorios` deixa de estar vazio, o empty-state desaparece automaticamente e os cards aparecem no lugar.

### Mudar uma cor / fonte / espaçamento

Tudo está em `docs/styles/tokens.css` como variável CSS. Não edite cores hardcoded em outros arquivos — sempre use `var(--token)`.

### Adicionar um novo tipo de skill (ex: `experimental`)

1. Em `docs/scripts/state.js`, adicione no `TYPE_LABEL`:
   ```js
   const TYPE_LABEL = {
     nativa: 'Nativa',
     plugin: 'Plugin',
     customizada: 'Customizada',
     experimental: 'Experimental',  // novo
   };
   ```
2. Em `docs/styles/tokens.css`, adicione tokens de cor:
   ```css
   --badge-experimental-bg: #fce7f3;
   --badge-experimental-text: #9d174d;
   ```
3. Em `docs/styles/cards.css`, adicione a classe:
   ```css
   .badge-experimental { background: var(--badge-experimental-bg); color: var(--badge-experimental-text); }
   ```
4. Em `docs/scripts/filters.js`, adicione um chip no array `groups`:
   ```js
   { label: 'Experimental', count: byType('experimental'), cat: 'type', val: 'experimental' }
   ```

### Mudar o título / subtítulo / footer

Strings hardcoded em `docs/index.html`:
- `<h1 class="header-title">` — título principal
- `<p class="header-subtitle">` — subtítulo
- `<footer>` — texto do rodapé

## Convenções de código

### CSS
- Sempre use variáveis de `tokens.css` em vez de valores hardcoded
- Cada arquivo em `styles/` tem responsabilidade única — não misture
- Seletores de classe em `kebab-case` (`.skill-card`, `.modal-section-label`)
- Estados modificadores como classe extra (`.is-wishlist`, `.active`, `.hidden`)

### JavaScript
- Sem `import`/`export` (incompatível com `file://`)
- Funções globais minúsculas em `camelCase` (`renderSkills`, `openModal`)
- Constantes globais em `UPPER_SNAKE_CASE` (`TYPE_LABEL`, `STATUS_LABEL`)
- **Sempre** `escapeHTML()` em valores dinâmicos antes de `innerHTML`
- 2 espaços de indentação (forçado por `.editorconfig`)

### Commits
Mensagens em português, presente do indicativo, prefixadas:
- `feat:` nova funcionalidade
- `fix:` correção
- `docs:` mudança em documentação
- `style:` mudança visual sem alterar comportamento
- `refactor:` reorganização sem mudança de comportamento
- `chore:` configuração, dependências, infra

Exemplo:
```
feat: adiciona filtro por categoria de skill
fix: corrige escape de caracteres em nomes de skills
```

## Deploy (GitHub Pages)

A pasta `docs/` é servida nativamente pelo GitHub Pages.

1. **Settings → Pages** no repositório
2. **Source**: Deploy from a branch
3. **Branch**: `main` / `/docs`
4. Save

Cada push em `main` re-deploya automaticamente. URL padrão: `https://<user>.github.io/<repo>/`.

Não esqueça que o app é **estático** — não funciona com paths absolutos do filesystem. Se publicar em subpath (ex.: `/2-Skills-Claude/`), todos os paths em `index.html` continuam relativos e funcionam.

## Testando antes de commitar

Não há suite de testes (projeto pequeno). Checklist manual:

- [ ] Abre sem erros no console (`Cmd+Option+I` no Chrome)
- [ ] Todos os 12 cards (ou N atuais) aparecem
- [ ] Contadores nos chips batem com a contagem real
- [ ] Click em chip filtra corretamente
- [ ] Click em chip ativo desfaz o filtro
- [ ] Busca por nome funciona
- [ ] Click em card abre modal
- [ ] ESC, click no `×`, click no backdrop fecham o modal
- [ ] Responsivo: redimensiona pra ≤900px (2 colunas) e ≤560px (1 coluna)
