# 🔁 /loop — Repetir prompt em intervalo

![Categoria](https://img.shields.io/badge/categoria-automa%C3%A7%C3%A3o-blue) ![Dificuldade](https://img.shields.io/badge/dificuldade-f%C3%A1cil-green)

> 🎯 Roda um prompt ou slash command repetidamente em um intervalo definido — ou no ritmo que o próprio Claude decidir.

---

## 💡 Quando usar

- ✅ Checar status de algo a cada X minutos (build, deploy)
- ✅ Manter uma tarefa de "babá" rodando (`/babysit-prs`)
- ✅ Polling de mudança até uma condição acontecer

## ❌ Quando NÃO usar

- Tarefas únicas → execute direto
- Coisas que precisam persistir além da sessão → use [/schedule](./schedule.md)

## 🎬 Como invocar

```text
/loop 5m /check-deploy       # roda /check-deploy a cada 5 min
/loop 30s "tem PR novo?"     # prompt livre a cada 30s
/loop /watch-tests           # sem intervalo: Claude decide o ritmo
```

---

## ⏱️ Intervalos comuns

| Intervalo | Bom para |
|-----------|----------|
| `30s` – `2m` | Monitorar algo que muda rápido (deploy ativo) |
| `5m` – `15m` | Status de CI, novos PRs |
| `30m` – `1h` | Atualizações ocasionais |

> 💡 **Dica de cache**: ficar abaixo de `~4m30s` mantém o prompt cache quente. Acima de 5min, paga um cache miss — então só faz sentido se o intervalo for **bem** maior (ex: 20min+).

---

## 🛑 Como parar

- Use Ctrl+C / interromper
- Ou peça: *"para o loop"*

---

## 🔗 Veja também

- [/schedule](./schedule.md) — para agendamento persistente
