# 📝 Estrutura do SKILL.md

> 🎯 Tudo que vai dentro de um `SKILL.md`, campo a campo, com exemplos.

---

## 🧱 Esqueleto completo

````markdown
---
name: nome-da-skill
description: Descrição curta + quando usar
---

# Título humano da skill

Breve introdução (1-2 frases).

## Quando usar
- ✅ Caso 1
- ✅ Caso 2

## Quando NÃO usar
- ❌ Caso A

## Passos

1. Passo um
2. Passo dois
3. Passo três

## Saída esperada
Descrição/exemplo do que entregar.
````

---

## 🏷️ Frontmatter — cada campo

### `name` (obrigatório)

- 📌 **Deve bater com o nome da pasta**
- 📌 Use **kebab-case**: `minha-skill`, não `MinhaSkill`
- 📌 Não use espaços nem acentos

```yaml
name: revisar-email
```

### `description` (obrigatório)

O campo mais importante. É com base nele que o Claude decide **se** invocar a skill.

✅ **Boa descrição** (específica, com gatilho):
```yaml
description: Revisa rascunho de email em português buscando tom, clareza e erros. Usar quando o usuário disser "revisa esse email" ou colar um draft de email.
```

❌ **Descrição ruim** (vaga):
```yaml
description: Ajuda com emails
```

### `allowed-tools` (opcional)

Restringe quais ferramentas a skill pode usar:

```yaml
allowed-tools:
  - Read
  - Edit
  - Bash(npm:*)
```

> 💡 Útil para skills "seguras" que você quer rodar com permissões mínimas.

### `model` (opcional)

Força um modelo específico:

```yaml
model: claude-haiku-4-5-20251001
```

> 💡 Use Haiku para skills simples e rápidas (mais barato). Use Opus para skills que exigem raciocínio profundo.

---

## 📖 Corpo — boas práticas

### ✅ Estrutura recomendada

1. **Título** humano (`# Bom dia!`)
2. **Quando usar / não usar**
3. **Passos numerados** ou **listas claras**
4. **Exemplos** (entrada → saída)
5. **Restrições** (limites, cuidados)

### 💡 Escreva como uma receita

- Curto e direto
- Use **listas** em vez de parágrafos
- **Numere** quando a ordem importa
- Inclua **um exemplo** completo

### 🚫 Evite

- Parágrafos longos sem estrutura
- Instruções ambíguas ("se possível, considere...")
- Misturar várias tarefas numa skill só
- Repetir o que já está no CLAUDE.md global

---

## 🎯 Exemplo completo e bem feito

````markdown
---
name: traduzir-en-pt
description: Traduz texto em inglês para português brasileiro mantendo tom e formatação. Usar quando o usuário pedir "traduz isso" e o texto estiver em inglês.
---

# Tradução EN → PT (brasileiro)

## Quando usar
- ✅ Usuário pede tradução de inglês para português
- ✅ Texto técnico, casual ou formal — qualquer registro

## Quando NÃO usar
- ❌ Outro par de idiomas (use uma skill específica)
- ❌ Tradução simultânea de conversação

## Passos
1. Identifique o **registro** do texto original (técnico, casual, formal)
2. Traduza preservando o **mesmo tom** em PT-BR
3. Mantenha **formatação** (markdown, listas, code blocks intactos)
4. Não traduza **identificadores de código** ou nomes próprios

## Saída esperada
Apenas o texto traduzido. Sem explicações ou notas, salvo se o usuário pedir.

## Exemplo
**Entrada**: "Hello, please review this PR when you have a moment."
**Saída**: "Olá, revise este PR quando tiver um momento, por favor."
````

---

## ✅ Checklist final

Antes de salvar uma skill, confira:

- [ ] `name` está em kebab-case e bate com a pasta
- [ ] `description` tem **o quê + quando usar**
- [ ] Corpo tem **passos** ou estrutura clara
- [ ] Tem pelo menos **1 exemplo**
- [ ] Você sabe explicar em 1 frase **o que ela faz**

---

## 🧭 Próximo passo

👉 [Sua primeira Skill (tutorial)](./primeira-skill.md)
