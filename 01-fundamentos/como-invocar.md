# 🎬 Como invocar Skills

> 🎯 Três formas: **explícita**, **automática** e **via instrução natural**. Vamos ver as três.

---

## 1️⃣ Invocação explícita (slash command)

A forma mais direta. Você digita no chat:

```text
/nome-da-skill
```

Exemplos:

```text
/init
/review
/simplify
```

Pode passar **argumentos** depois:

```text
/review 123
/loop 5m /check-deploy
```

> 💡 No VSCode, ao digitar `/` aparece o autocomplete com todas as skills disponíveis.

---

## 2️⃣ Invocação automática (decisão do Claude)

O Claude pode invocar uma skill **sem você pedir**, quando:

- A `description` da skill bate com o que você está pedindo
- O contexto torna o uso da skill claramente útil

Exemplo: você escreve *"revisa esse PR aí pra mim"* — o Claude pode decidir invocar a skill `review` automaticamente.

> ⚠️ Só skills marcadas como "use proactively" na descrição costumam ser auto-invocadas. Para skills pessoais, a chamada explícita é o caminho mais previsível.

---

## 3️⃣ Invocação via linguagem natural

Você pode pedir explicitamente sem usar a barra:

```text
"Use a skill review nesse PR"
"Roda o /init no projeto"
```

O Claude entende e invoca normalmente.

---

## 🎁 Argumentos: como passar dados

No `SKILL.md` você pode esperar argumentos. O Claude recebe o que veio depois do nome da skill como **contexto adicional**.

Exemplo: skill `/saudacao`:

```text
/saudacao João
```

No corpo, você instrui: *"Cumprimente a pessoa cujo nome está nos argumentos."*

---

## 🚫 Quando a invocação **não** funciona

| Sintoma | Causa provável | Solução |
|---------|---------------|---------|
| `/minha-skill` não aparece no autocomplete | Pasta no lugar errado | Confira se está em `~/.claude/skills/` ou `.claude/skills/` |
| Skill aparece mas não executa | `SKILL.md` sem frontmatter válido | Valide o YAML (3 traços, campos obrigatórios) |
| Claude ignora a skill | `description` vaga ou faltando | Reescreva a descrição com gatilhos claros |
| Erro de permissão ao rodar script | Permissão bloqueada em `settings.json` | Adicione regra em [04-configuracao/](../04-configuracao/README.md) |

---

## 🧪 Teste rápido

Para confirmar que invocação funciona:

1. Digite `/` no chat
2. Procure uma skill que você conhece (ex: `init`)
3. Selecione e dê Enter
4. Veja o Claude executar

> ✅ Se aparecer e executar, sua configuração está OK.

---

## 🆚 Skill vs Bash vs Subagent

| Quero... | Use |
|----------|-----|
| Rodar uma tarefa recorrente bem definida | **Skill** |
| Executar um comando rápido do shell | **Bash tool** direto |
| Delegar pesquisa pesada sem encher contexto | **Subagent** (Agent tool) |
| Reagir automaticamente a eventos | **Hook** (não é skill) |

---

## 🧭 Próximo passo

👉 Hora de praticar com skills reais: [02 — Skills Nativas](../02-skills-nativas/README.md)
