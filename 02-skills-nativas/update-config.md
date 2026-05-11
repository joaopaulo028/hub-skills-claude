# ⚙️ /update-config — Configurar settings.json

![Categoria](https://img.shields.io/badge/categoria-config-grey) ![Dificuldade](https://img.shields.io/badge/dificuldade-m%C3%A9dio-yellow)

> 🎯 Configura o harness do Claude Code via `settings.json`: permissões, hooks, variáveis de ambiente, MCP servers.

---

## 💡 Quando usar

- ✅ Quero **liberar** um comando para rodar sem confirmar (ex: `npm install`)
- ✅ Quero adicionar um **hook** que dispara após cada edit
- ✅ Quero definir uma **variável de ambiente** persistente
- ✅ Quero mover permissão entre escopos (global ↔ projeto)

## ❌ Quando NÃO usar

- Para alterar tema/modelo → use `/config` (UI nativa)
- Para keybindings → use [/keybindings-help](./keybindings-help.md)

## 🎬 Como invocar

```text
/update-config
```

Em seguida fale o que quer: *"libera todos os comandos `npm`"*, *"quando eu salvar arquivo .ts, roda o linter"*, etc.

---

## 🎯 Casos comuns

| Pedido | O que acontece |
|--------|---------------|
| "libera comandos npm" | Adiciona `Bash(npm:*)` em `permissions.allow` |
| "set DEBUG=true" | Adiciona em `env` |
| "antes de cada Bash, log o comando" | Adiciona PreToolUse hook |
| "quando o Claude terminar, toca um som" | Adiciona Stop hook |
| "move essa permissão pro global" | Migra entre `~/.claude/settings.json` e projeto |

---

## 📂 Escopos

| Arquivo | Quem vê | Quando usar |
|---------|---------|-------------|
| `~/.claude/settings.json` | Você, em qualquer projeto | Configs pessoais globais |
| `.claude/settings.json` | Você + time (via git) | Padrões do projeto |
| `.claude/settings.local.json` | Só você, neste projeto | Overrides privados (gitignored) |

---

## ⚠️ Cuidados

- Permissões muito amplas (`Bash(*:*)`) = perigoso, perde a proteção
- Hooks rodam comandos do **shell** — teste antes de salvar
- Sempre revise o diff que `/update-config` propõe

---

## 🔗 Veja também

- [04 — Configuração](../04-configuracao/README.md) — guia completo
