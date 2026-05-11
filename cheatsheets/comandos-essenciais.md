# 📋 Comandos Essenciais

> 🎯 Os slash commands e atalhos que você vai usar mais.

---

## ⚡ Slash commands nativos

| Comando | O que faz |
|---------|-----------|
| `/help` | Ver ajuda e lista de comandos |
| `/clear` | Limpar contexto (economiza tokens) |
| `/init` | Criar CLAUDE.md |
| `/review` | Revisar PR |
| `/simplify` | Limpar código mudado |
| `/security-review` | Análise de segurança |
| `/schedule` | Agendar agente remoto |
| `/loop <interval> <prompt>` | Repetir prompt |
| `/update-config` | Editar settings.json |
| `/keybindings-help` | Customizar atalhos |
| `/fewer-permission-prompts` | Reduzir prompts |
| `/config` | UI de config (tema, modelo) |
| `/fast` | Toggle modo Fast (Opus 4.6 mais rápido) |

---

## ⌨️ Atalhos padrão

| Atalho | Ação |
|--------|------|
| `Cmd+Enter` | Submit |
| `Cmd+L` | Novo turno |
| `Cmd+.` | Cancelar tool |
| `Cmd+Shift+P` | Plan mode toggle |
| `Esc` | Interromper geração |

---

## 🔧 Operações comuns no chat

| Diga... | E o Claude... |
|---------|--------------|
| "leia X" | Usa Read tool |
| "encontre Y" | Usa grep/find |
| "rode `comando`" | Usa Bash tool |
| "delegue isso pra um subagent" | Usa Agent tool |
| "planeje antes" | Usa Plan agent |
| "explore o codebase" | Usa Explore agent |

---

## 📂 Arquivos importantes (caminhos)

| Arquivo | Caminho |
|---------|---------|
| Settings global | `~/.claude/settings.json` |
| Settings projeto | `.claude/settings.json` |
| Settings local | `.claude/settings.local.json` |
| Skills globais | `~/.claude/skills/` |
| Skills projeto | `.claude/skills/` |
| Keybindings | `~/.claude/keybindings.json` |
| Memória | `~/.claude/projects/<projeto>/memory/` |
| CLAUDE.md | Raiz do projeto |

---

## 🧭 Voltar

👉 [Cheatsheets](./README.md)
