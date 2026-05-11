# ⏰ /schedule — Agendar agentes remotos (cron)

![Categoria](https://img.shields.io/badge/categoria-automa%C3%A7%C3%A3o-blue) ![Dificuldade](https://img.shields.io/badge/dificuldade-m%C3%A9dio-yellow)

> 🎯 Cria, edita, lista e roda **agentes agendados** (routines) que executam por cron — recorrentes ou pontuais.

---

## 💡 Quando usar

- ✅ Quero que algo rode automaticamente todo dia/hora
- ✅ Preciso de um "lembre-me às 15h amanhã"
- ✅ Monitoramento periódico (status de deploy, PRs abertos, etc.)

## ❌ Quando NÃO usar

- Tarefa única e imediata → use direto sem agendar
- Polling a cada poucos segundos → use [/loop](./loop.md)

## 🎬 Como invocar

```text
/schedule
```

Depois converse: *"toda segunda às 9h, liste PRs abertos no repo X"*.

Operações comuns:

- 📝 **Criar** rotina nova
- ✏️ **Editar** rotina existente
- 📋 **Listar** todas
- ▶️ **Rodar manualmente** uma rotina já agendada
- 🗑️ **Deletar**

---

## 💡 Exemplos práticos

| Frequência | Tarefa |
|------------|--------|
| 🌅 Todo dia 9h | Resumo dos PRs abertos no time |
| 📅 Toda segunda | Relatório semanal de atividades |
| 🔁 De 4 em 4 horas | Verificar se algum servidor caiu |
| ⏱️ Uma vez | "Me lembre amanhã às 14h de fazer X" |

---

## ⚠️ Atenção

- Rotinas **consomem créditos/cota** — não agende coisas desnecessárias
- Confirme o **timezone** das rotinas
- Mantenha rotinas **idempotentes** (rodar 2× não estraga nada)

---

## 🆚 Schedule vs Loop

| Critério | `/schedule` | `/loop` |
|----------|------------|---------|
| Onde roda | Remoto (cron) | Localmente, na sua sessão |
| Frequência típica | minutos a dias | segundos a minutos |
| Persiste se VSCode fechar | ✅ | ❌ |

---

## 🔗 Veja também

- [/loop](./loop.md)
