# 📋 Skills Nativas — Resumo

> 🎯 Todas as Skills nativas em uma única tabela. Para consulta rápida.

---

## 🧰 Tabela completa

| Skill | 🎯 Pra que serve | 💡 Quando usar | 📄 Doc |
|-------|------------------|---------------|--------|
| `/init` | Gera `CLAUDE.md` do projeto | Projeto novo sem CLAUDE.md | [init](../02-skills-nativas/init.md) |
| `/review` | Revisa PR | Antes de mergear | [review](../02-skills-nativas/review.md) |
| `/security-review` | Análise de segurança | Mudou auth/dados sensíveis | [security-review](../02-skills-nativas/security-review.md) |
| `/simplify` | Limpa código mudado | Pré-commit | [simplify](../02-skills-nativas/simplify.md) |
| `/schedule` | Cron de agentes | Rotinas recorrentes | [schedule](../02-skills-nativas/schedule.md) |
| `/loop` | Polling repetido | Monitorar algo curto prazo | [loop](../02-skills-nativas/loop.md) |
| `/update-config` | Edita settings.json | Permissões, hooks, env, MCP | [update-config](../02-skills-nativas/update-config.md) |
| `/keybindings-help` | Customiza atalhos | Rebindar teclas | [keybindings-help](../02-skills-nativas/keybindings-help.md) |
| `/fewer-permission-prompts` | Reduz prompts de confirm | Cansei de confirmar `git status` | [fewer-permission-prompts](../02-skills-nativas/fewer-permission-prompts.md) |
| `/claude-api` | Apps com Anthropic SDK | Código que importa anthropic | [claude-api](../02-skills-nativas/claude-api.md) |

---

## 🎯 Por situação

| Quero... | Use |
|----------|-----|
| Começar projeto novo | `/init` |
| Revisar antes de merge | `/review` + `/security-review` |
| Limpar código | `/simplify` |
| Agendar tarefa diária | `/schedule` |
| Monitorar a cada 5 min | `/loop 5m ...` |
| Liberar comando sem prompt | `/update-config` ou `/fewer-permission-prompts` |
| Mudar atalho | `/keybindings-help` |
| Construir app com API | `/claude-api` |

---

## 💲 Custo aproximado

| Skill | Custo típico |
|-------|--------------|
| `/init` | 💲💲 (lê várias coisas) |
| `/review` | 💲💲 (lê diff e contexto) |
| `/security-review` | 💲💲💲 (análise profunda) |
| `/simplify` | 💲💲 (lê e edita) |
| `/schedule`, `/loop`, `/update-config` | 💲 (curtos) |

---

## 🧭 Voltar

👉 [Cheatsheets](./README.md)
