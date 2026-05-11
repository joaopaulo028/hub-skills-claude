# 🛠️ 03 — Criando suas Skills

> 🎯 Hora de sair de **usuário** e virar **autor**. Aqui você aprende a construir suas próprias Skills do zero.

---

## 📚 Conteúdo desta pasta

| # | Documento | O que você aprende |
|---|-----------|-------------------|
| 1 | [Estrutura do SKILL.md](./estrutura-skill-md.md) | Frontmatter + corpo, campo a campo |
| 2 | [Sua primeira Skill](./primeira-skill.md) | Tutorial mão-na-massa (15 min) |
| 3 | [Boas práticas](./boas-praticas.md) | O que faz uma Skill ser excelente |
| 4 | [Padrões úteis](./padroes-uteis.md) | Receitas reaproveitáveis |

> 📝 Estes documentos serão preenchidos conforme você avançar. Por enquanto, segue um **guia rápido** abaixo para você começar a experimentar.

---

## ⚡ Guia rápido (3 minutos)

### Passo 1 — Criar a pasta

```bash
mkdir -p ~/.claude/skills/minha-primeira-skill
```

### Passo 2 — Criar o SKILL.md

Crie `~/.claude/skills/minha-primeira-skill/SKILL.md`:

```markdown
---
name: minha-primeira-skill
description: Cumprimenta o usuário em português e mostra a data atual. Usar quando o usuário pedir "bom dia" ou similar.
---

# Bom dia!

Quando esta skill for invocada:

1. Cumprimente em português com tom amigável
2. Mostre a data atual no formato extenso
3. Pergunte como pode ajudar hoje

Mantenha a resposta em **2-3 frases**.
```

### Passo 3 — Testar

No Claude Code:

```text
/minha-primeira-skill
```

🎉 Se funcionou, você criou sua primeira Skill!

---

## ✅ Pré-requisitos para esta seção

- [ ] Terminou a pasta [01-fundamentos](../01-fundamentos/README.md)
- [ ] Já testou pelo menos 3 [skills nativas](../02-skills-nativas/README.md)
- [ ] Sabe o que é frontmatter YAML

---

## 🎯 Ideias de primeiras Skills para criar

| Ideia | Dificuldade | Utilidade |
|-------|:----------:|:---------:|
| 🌅 Resumo do dia | ⭐ | ⭐⭐⭐ |
| 📊 Relatório semanal padrão | ⭐⭐ | ⭐⭐⭐⭐ |
| ✉️ Rascunhar email formal em PT | ⭐ | ⭐⭐⭐⭐ |
| 🐛 Reproduzir bug (template) | ⭐⭐ | ⭐⭐⭐ |
| 📝 Criar issue no padrão da minha empresa | ⭐⭐ | ⭐⭐⭐⭐⭐ |

> 💡 Comece pela mais simples. Não tente fazer a "Skill perfeita" de primeira.

---

## 🧭 Próximo passo

👉 [Estrutura do SKILL.md em detalhe](./estrutura-skill-md.md)
