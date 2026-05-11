# 🧰 02 — Skills Nativas

> 🎯 Skills que **já vêm prontas** no Claude Code. Você pode usar agora mesmo, sem configurar nada.

---

## 📋 Índice completo

| Skill | Categoria | O que faz | Doc |
|-------|-----------|-----------|-----|
| `/init` | 🏗️ Setup | Cria `CLAUDE.md` documentando o codebase | [init.md](./init.md) |
| `/review` | 🔍 Code review | Revisa um pull request | [review.md](./review.md) |
| `/security-review` | 🔐 Segurança | Análise de segurança nas mudanças da branch | [security-review.md](./security-review.md) |
| `/simplify` | 🧹 Refactor | Revisa código mudado para reuso e qualidade | [simplify.md](./simplify.md) |
| `/schedule` | ⏰ Automação | Cria, edita e lista agentes agendados (cron) | [schedule.md](./schedule.md) |
| `/loop` | 🔁 Automação | Roda um prompt em intervalo recorrente | [loop.md](./loop.md) |
| `/update-config` | ⚙️ Config | Configura hooks, permissões, env em `settings.json` | [update-config.md](./update-config.md) |
| `/keybindings-help` | ⌨️ UX | Ajuda a customizar atalhos de teclado | [keybindings-help.md](./keybindings-help.md) |
| `/fewer-permission-prompts` | 🔓 Produtividade | Adiciona allowlist para reduzir prompts de permissão | [fewer-permission-prompts.md](./fewer-permission-prompts.md) |
| `/claude-api` | 🔧 Dev | Ajuda a construir apps com a Anthropic SDK | [claude-api.md](./claude-api.md) |

> 📝 As fichas individuais vão sendo preenchidas conforme você (e eu) for testando cada skill. Comece pelas mais úteis: `/init`, `/review`, `/simplify`.

---

## 🚦 Roteiro de prática (iniciante)

1. **🏗️ `/init`** — entre em um projeto qualquer e rode. Veja o `CLAUDE.md` gerado.
2. **🧹 `/simplify`** — faça uma mudança bobinha em um projeto, depois rode para ver a sugestão.
3. **⏰ `/schedule`** — agende algo simples (ex: "todo dia 9h, me lembre de revisar PRs abertos").
4. **⚙️ `/update-config`** — peça para adicionar uma permissão. Veja o `settings.json` mudar.

> ✍️ Registre cada teste no [diário](../diario/README.md) com data + impressões.

---

## 💡 Dica de descoberta

Para ver **todas** as skills disponíveis na sua instância no momento:

```text
/help
```

Ou digite `/` no chat e role a lista do autocomplete.

> ⚠️ Skills podem variar conforme **plugins instalados**. Algumas (como `/ultrareview`) podem requerer billing/conta específica.

---

## 🆚 Comparação rápida

| Tarefa | Skill recomendada |
|--------|-------------------|
| Começar a usar um projeto novo | `/init` |
| Pediram revisão de um PR | `/review` |
| Acabei de mudar código, será que dá pra simplificar? | `/simplify` |
| Preciso de uma análise de segurança | `/security-review` |
| Quero algo rodando automaticamente todo dia | `/schedule` |
| Quero verificar status de algo a cada X minutos | `/loop` |
| Sempre confirmando o mesmo comando, irritado | `/fewer-permission-prompts` |

---

## 🧭 Próximo passo

👉 [03 — Criando suas Skills](../03-criando-skills/README.md) (quando dominar pelo menos 3 nativas)
