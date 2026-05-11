# 🎯 05 — Casos de Uso Práticos

> 💡 Workflows reais para aplicar Skills no dia a dia — produtividade, automação e redução de custo.

---

## 📚 Conteúdo

| # | Documento | Foco |
|---|-----------|------|
| 1 | [Produtividade pessoal](./produtividade.md) | Skills para organizar seu dia |
| 2 | [Redução de custo](./reducao-custo.md) | Como gastar menos com Claude |
| 3 | [Automação](./automacao.md) | Hooks + schedule + loop |
| 4 | [Dev workflows](./dev-workflows.md) | PR review, commits, refactor |

---

## ⚡ Workflows prontos para copiar

### 🌅 Workflow: "Comece o dia bem"

**Objetivo**: ritual matinal de 5 min para focar.

```text
1. /resumo-do-dia               (skill custom — define prioridades)
2. /loop 30m "tem PR novo?"     (monitora durante o dia)
3. À noite: /diario-noite       (skill custom — registra o que rolou)
```

### 🔍 Workflow: "Antes de mergear"

```text
1. /simplify                    (limpa o código)
2. /review                      (revisão geral)
3. /security-review             (foco em segurança)
4. Só então: git push & open PR
```

### 📨 Workflow: "Triagem de emails"

```text
1. MCP do Gmail autenticado
2. /triagem-emails              (skill custom que lê inbox e classifica)
3. /rascunho-resposta <id>      (skill custom que rascunha respostas)
```

### ⏰ Workflow: "Babá de deploy"

```text
1. /loop 2m "como está o deploy do PR #123?"
2. Quando terminar, hook toca som
3. Próximo passo automático
```

---

## 🎯 Por categoria

### 🧘 Produtividade

- Resumo do dia / semana
- Triagem de inbox
- Rascunho de emails
- Anotações de reunião
- Planejamento de prioridades

### 💰 Redução de custo

- Forçar Haiku em skills simples
- Prompt caching
- Subagents para isolar contexto
- Schedule em vez de loops apertados

### 🤖 Automação

- Hooks para tarefas repetitivas
- Schedule para monitoramento periódico
- Loops para polling de curto prazo

### 👨‍💻 Dev

- Pre-commit cleanup
- PR review estruturado
- Geração de changelog
- Bug triage

---

## 🧭 Próximo passo

👉 [Produtividade pessoal](./produtividade.md)
