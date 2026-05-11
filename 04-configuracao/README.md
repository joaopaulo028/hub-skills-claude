# ⚙️ 04 — Configuração & Harness

> 🎯 O ecossistema **ao redor** das Skills: `settings.json`, hooks, permissões, MCP servers, keybindings.

---

## 📚 Conteúdo desta pasta

| # | Documento | O que você aprende |
|---|-----------|-------------------|
| 1 | [settings.json](./settings-json.md) | Estrutura, escopos, campos principais |
| 2 | [Permissões](./permissoes.md) | Allow/deny, escopo, padrões úteis |
| 3 | [Hooks](./hooks.md) | Reagir a eventos com comandos do shell |
| 4 | [MCP servers](./mcp-servers.md) | Conectar ferramentas externas (Gmail, Calendar...) |
| 5 | [Keybindings](./keybindings.md) | Customizar atalhos |

---

## 🗺️ Visão geral

```text
                    ┌─────────────────────────┐
                    │     Claude Code         │
                    │  (CLI / VSCode / etc.)  │
                    └────────────┬────────────┘
                                 │
        ┌────────────────────────┼────────────────────────┐
        ▼                        ▼                        ▼
  ┌──────────┐            ┌──────────┐            ┌──────────┐
  │ Skills   │            │ Hooks    │            │ MCP      │
  │ /minha   │            │ pré/pós  │            │ Gmail,   │
  │ /init    │            │ tool     │            │ etc.     │
  └──────────┘            └──────────┘            └──────────┘
        │                        │                        │
        └────────────────────────┴────────────────────────┘
                                 │
                       ┌─────────▼──────────┐
                       │   settings.json    │
                       │ (permissões, env)  │
                       └────────────────────┘
```

| Componente | Função |
|-----------|--------|
| 🧩 **Skills** | Instruções reutilizáveis para o Claude |
| 🪝 **Hooks** | Comandos shell que disparam em eventos |
| 🔌 **MCP** | Conexão com ferramentas/dados externos |
| ⚙️ **settings.json** | Configuração central (permissões, env, hooks, MCP) |

---

## 🗂️ Arquivos importantes

| Arquivo | Caminho | Função |
|---------|---------|--------|
| Settings global | `~/.claude/settings.json` | Config pessoal |
| Settings projeto | `.claude/settings.json` | Padrões compartilhados |
| Settings local | `.claude/settings.local.json` | Overrides privados (gitignored) |
| Keybindings | `~/.claude/keybindings.json` | Atalhos |
| Memory | `~/.claude/projects/.../memory/` | Memórias por projeto |
| Skills globais | `~/.claude/skills/` | Suas Skills pessoais |
| Skills do projeto | `.claude/skills/` | Skills do projeto |

---

## 🎯 Trilha sugerida

1. Leia **[settings.json](./settings-json.md)** — base
2. Configure **[permissões](./permissoes.md)** — produtividade imediata
3. Quando precisar reagir a eventos → **[hooks](./hooks.md)**
4. Quando quiser conectar Gmail/Calendar → **[MCP](./mcp-servers.md)**
5. Quando atalhos te incomodarem → **[keybindings](./keybindings.md)**

---

## 🧭 Próximo passo

👉 [settings.json](./settings-json.md)
