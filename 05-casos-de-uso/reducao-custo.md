# 💰 Redução de Custo

> 🎯 Estratégias para usar o Claude **sem queimar dinheiro à toa**.

---

## 🎯 As 5 alavancas

### 1️⃣ Escolha do modelo

Cada modelo tem custo/capacidade diferente:

| Modelo | Quando usar | Custo relativo |
|--------|-------------|---------------|
| 🟢 **Haiku 4.5** | Tarefas simples, alto volume | 💲 (mais barato) |
| 🟡 **Sonnet 4.6** | Maioria das tarefas | 💲💲 |
| 🔴 **Opus 4.7** | Raciocínio profundo, decisões críticas | 💲💲💲 (mais caro) |

**Aplicação em Skills**:

```yaml
---
name: contar-palavras
model: claude-haiku-4-5-20251001  # força Haiku
---
```

> 💡 Se a skill é simples (formatar, classificar, traduzir), **Haiku** entrega 80% do resultado por uma fração do custo.

---

### 2️⃣ Prompt caching

O Claude reaproveita partes da conversa já processadas (TTL 5 min).

**Como aproveitar**:

- ✅ Continue na **mesma conversa** em vez de abrir nova toda hora
- ✅ Estruture prompts com **partes estáveis no início** (instruções, CLAUDE.md) e **variáveis no fim** (sua pergunta)
- ❌ Evite mudar o início do contexto frequentemente

> 📊 Cache hit reduz custo drasticamente em prompts longos.

---

### 3️⃣ Subagents para isolar contexto

Quando precisar de **pesquisa pesada** que não cabe (ou polui) sua conversa principal, delegue:

- 🎯 **Exploração de codebase** → Agent `Explore`
- 🧠 **Planejamento** → Agent `Plan`
- 🔍 **Pesquisa geral** → Agent `general-purpose`

**Benefício**: o subagent gasta tokens dele, sua conversa principal fica limpa.

---

### 4️⃣ Schedule > Loop apertado

```text
❌ /loop 30s "tem PR novo?"          → 120 invocações/hora 🔥
✅ /schedule "a cada 15min, ver PRs"  → 4 invocações/hora 💰
```

Loops muito apertados desperdiçam tokens. Para coisas que mudam devagar, use **schedule**.

---

### 5️⃣ Skills bem feitas reduzem retrabalho

Skill ruim = Claude tenta 3 vezes até acertar = 3× o custo.

**Investir 30 min escrevendo uma boa skill** economiza horas de custo depois.

> 📖 Ver [boas práticas](../03-criando-skills/boas-praticas.md).

---

## 📊 Hábitos do dia a dia

| Hábito | Economia |
|--------|----------|
| Usar `/clear` quando contexto não importa mais | 💰 grande |
| Forçar Haiku em skills simples | 💰💰 |
| Aproveitar cache (mesma conversa) | 💰💰 |
| Não rodar `/loop 30s` desnecessário | 💰💰💰 |
| Skill bem escrita evita retrabalho | 💰💰 |

---

## 🚨 Sinais de gasto excessivo

- ⚠️ Conversas que se arrastam por horas com contexto enorme
- ⚠️ Pedir refactor genérico em codebase grande sem escopo
- ⚠️ Loops apertados rodando esquecidos
- ⚠️ Subagents disparados de forma duplicada (você + o subagent fazendo a mesma busca)

---

## 🧭 Próximo passo

👉 [Automação](./automacao.md)
