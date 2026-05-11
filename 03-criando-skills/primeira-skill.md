# 🎓 Tutorial: Sua primeira Skill

> 🎯 Em 15 minutos você vai ter uma Skill funcional rodando. Vamos criar uma **`/resumo-do-dia`** que te dá um briefing rápido.

---

## 📦 O que vamos construir

Uma skill que, quando invocada, gera um **mini-briefing**:

- 📅 Data de hoje
- ✅ Pergunta o que você fez ontem
- 🎯 Te ajuda a definir 3 prioridades para hoje

---

## 🛠️ Passo a passo

### 1️⃣ Criar a pasta

No terminal:

```bash
mkdir -p ~/.claude/skills/resumo-do-dia
```

### 2️⃣ Criar o SKILL.md

Crie o arquivo `~/.claude/skills/resumo-do-dia/SKILL.md` com este conteúdo:

````markdown
---
name: resumo-do-dia
description: Gera um briefing matinal pessoal. Pergunta ao usuário o que foi feito ontem e ajuda a definir 3 prioridades para hoje. Usar quando o usuário digitar /resumo-do-dia ou pedir "me ajuda a planejar o dia".
---

# 🌅 Resumo do Dia

Quando esta skill for invocada:

## Passos

1. **Cumprimente** o usuário pelo nome (se souber) ou só "Bom dia!"
2. **Informe a data** no formato extenso (ex: "Segunda, 11 de maio de 2026")
3. **Pergunte**: "O que você concluiu ontem?" — espere a resposta
4. **Reflita brevemente** sobre o que foi dito (1 frase)
5. **Pergunte**: "Quais são as 3 prioridades para hoje?"
6. **Anote** as prioridades numa lista numerada
7. **Devolva** um resumo final no formato:

```
📅 [Data]
✅ Ontem: [resumo curto]
🎯 Hoje:
  1. [prioridade 1]
  2. [prioridade 2]
  3. [prioridade 3]
```

## Estilo

- Tom **amigável**, **curto** e **direto**
- Português brasileiro
- Sem floreio motivacional excessivo
````

### 3️⃣ Testar

No Claude Code, digite:

```text
/resumo-do-dia
```

A skill deve aparecer no autocomplete e executar.

### 4️⃣ Iterar

Se o resultado não te agradou:

- **Resposta muito longa?** → adicione "Resposta total: máximo 5 linhas" no corpo
- **Tom errado?** → reescreva a seção `## Estilo`
- **Faltou algo?** → adicione passo na lista

Edite o `SKILL.md`, salve, e rode `/resumo-do-dia` de novo. Mudanças são **imediatas**.

---

## 🎓 O que você aprendeu

- ✅ Criar a pasta de uma skill
- ✅ Escrever frontmatter com `name` e `description`
- ✅ Estruturar o corpo com passos numerados
- ✅ Iterar e refinar baseado no comportamento real

---

## 🎁 Bônus: salve no hub

Copie esta skill que você criou para a pasta de exemplos:

```bash
cp -r ~/.claude/skills/resumo-do-dia "/Users/joaopaulo/Documents/1. Meus Projetos/2. Skills Claude/exemplos/"
```

Assim você tem um registro versionado das suas Skills.

---

## 🧭 Próximo passo

👉 [Boas práticas](./boas-praticas.md) — para deixar suas Skills profissionais
