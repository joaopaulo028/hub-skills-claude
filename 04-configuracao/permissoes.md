# 🔐 Permissões

> 🎯 Controlar o que o Claude pode rodar sem te perguntar — sem perder segurança.

---

## 🧠 Conceito

Cada ferramenta (Bash, Edit, Read...) gera um pedido de **confirmação** por padrão. Você pode:

- ✅ **Allow**: roda sem perguntar
- ❌ **Deny**: bloqueia totalmente
- ⏸️ Sem regra: pede confirmação (default)

---

## 🧱 Sintaxe

```json
{
  "permissions": {
    "allow": [
      "Bash(git status)",        // comando exato
      "Bash(npm:*)",             // qualquer subcomando npm
      "Bash(git:*)",             // qualquer comando git
      "Read(*)",                 // ler qualquer arquivo
      "Edit(src/**)"             // editar dentro de src/
    ],
    "deny": [
      "Bash(rm -rf:*)",
      "Bash(git push --force:*)"
    ]
  }
}
```

---

## 🎯 Padrões úteis (copia e cola)

### 📦 Para dev JavaScript/TypeScript

```json
{
  "permissions": {
    "allow": [
      "Bash(npm:*)",
      "Bash(npx:*)",
      "Bash(yarn:*)",
      "Bash(pnpm:*)",
      "Bash(node:*)",
      "Bash(git status)",
      "Bash(git diff:*)",
      "Bash(git log:*)",
      "Read(*)"
    ]
  }
}
```

### 🐍 Para dev Python

```json
{
  "permissions": {
    "allow": [
      "Bash(python:*)",
      "Bash(python3:*)",
      "Bash(pip:*)",
      "Bash(pytest:*)",
      "Bash(uv:*)",
      "Read(*)"
    ]
  }
}
```

### 🧪 Read-only seguro (qualquer projeto)

```json
{
  "permissions": {
    "allow": [
      "Read(*)",
      "Bash(ls:*)",
      "Bash(cat:*)",
      "Bash(grep:*)",
      "Bash(find:*)",
      "Bash(git status)",
      "Bash(git diff:*)",
      "Bash(git log:*)"
    ],
    "deny": [
      "Bash(rm:*)",
      "Bash(git push:*)"
    ]
  }
}
```

---

## ⚠️ NÃO faça

- ❌ `"Bash(*:*)"` — libera tudo, perde proteção
- ❌ Liberar comandos destrutivos (`rm`, `git push --force`, `dropdb`)
- ❌ Liberar comandos com input dinâmico (`Bash(curl:*)` → SSRF risk)

---

## 🔀 Onde colocar?

| Permissão | Escopo recomendado |
|-----------|-------------------|
| Comandos que você usa em **todo projeto** (ls, git status) | 🌍 Global |
| Comandos específicos do **stack do projeto** (npm, pytest) | 📁 Projeto |
| Liberações temporárias / sensíveis | 🔒 Local |

---

## 🛠️ Forma fácil de adicionar

Use a skill nativa:

```text
/fewer-permission-prompts
```

Ela analisa o que você confirma muito e sugere uma allowlist priorizada.

Ou:

```text
/update-config
```

E descreva em PT: *"libera todos os npm em settings global"*.

---

## 🔍 Como ver o que está liberado agora

```bash
cat ~/.claude/settings.json | grep -A 20 permissions
```

Ou peça ao Claude: *"o que tenho liberado nas permissões?"*

---

## 🧭 Próximo passo

👉 [Hooks](./hooks.md)
