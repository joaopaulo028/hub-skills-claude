# 🧘 Produtividade Pessoal

> 🎯 Skills e workflows para organizar a sua rotina.

---

## 🌅 1. Ritual matinal

**Skill**: `/resumo-do-dia` (criada no [tutorial](../03-criando-skills/primeira-skill.md))

**O que faz**: pergunta o que foi feito ontem + define 3 prioridades para hoje.

**Como usar**: digite `/resumo-do-dia` ao iniciar o dia. Salve o resultado no [diário](../diario/README.md).

---

## 🌙 2. Fechamento do dia

**Skill custom**: `/diario-noite`

````yaml
---
name: diario-noite
description: Fecha o dia registrando conquistas e pendências. Usar à noite antes de encerrar.
---

# Diário noturno

1. Pergunte: "Quais 3 conquistas de hoje?"
2. Pergunte: "Que pendência fica para amanhã?"
3. Salve no formato:

```
📅 [DATA]
✅ Conquistas: ...
⏭️ Para amanhã: ...
```
````

---

## 📧 3. Triagem de inbox

**Pré-requisito**: MCP do Gmail autenticado.

**Skill custom**: `/triagem-emails`

````yaml
---
name: triagem-emails
description: Lê emails não lidos e classifica em urgente/responder/arquivar.
---

# Triagem

1. Liste emails não lidos das últimas 24h via MCP Gmail
2. Para cada um, classifique:
   - 🔴 **Urgente**: precisa resposta hoje
   - 🟡 **Responder**: pode esperar 2-3 dias
   - 🟢 **Informativo**: só ler
   - ⚫ **Arquivar**: não precisa ação
3. Devolva tabela com remetente, assunto e classificação
````

---

## 📝 4. Anotações de reunião

**Skill custom**: `/ata`

````yaml
---
name: ata
description: Estrutura ata de reunião. Usar quando o usuário colar transcript ou pedir "gera ata".
---

# Ata de reunião

Formato padrão:

```
📅 Data: [data]
👥 Presentes: [lista]
🎯 Pauta: [tópicos]

## Decisões
- ...

## Próximos passos
- [ ] [responsável] — [ação] — [prazo]

## Notas
- ...
```
````

---

## 🎯 5. Planejamento semanal

**Workflow**:

```text
Segunda 9h (via /schedule):
  /planejamento-semana
```

Skill custom que:
1. Lista entregas da semana anterior
2. Pergunta as prioridades dessa semana
3. Sugere distribuição por dia

---

## 💡 Dicas gerais

- 🗓️ Use `/schedule` para rituais recorrentes
- 📁 Salve outputs no [diário](../diario/README.md) para histórico
- 🔁 Não tenha vergonha de iterar a skill — versão 5 é melhor que versão 1
- ⏱️ Skill rápida + Haiku = ritual em segundos

---

## 🧭 Próximo passo

👉 [Redução de custo](./reducao-custo.md)
