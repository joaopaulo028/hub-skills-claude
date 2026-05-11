# 📋 Permissões — Padrões prontos

> 🎯 Cole no seu `settings.json` e ajuste.

---

## 🟢 Pacote: Read-only universal

```json
{
  "permissions": {
    "allow": [
      "Read(*)",
      "Bash(ls:*)",
      "Bash(cat:*)",
      "Bash(grep:*)",
      "Bash(find:*)",
      "Bash(pwd)",
      "Bash(which:*)"
    ]
  }
}
```

---

## 🟢 Pacote: Git read-only

```json
{
  "permissions": {
    "allow": [
      "Bash(git status)",
      "Bash(git diff:*)",
      "Bash(git log:*)",
      "Bash(git branch:*)",
      "Bash(git show:*)",
      "Bash(gh pr view:*)",
      "Bash(gh issue view:*)"
    ]
  }
}
```

---

## 🟢 Pacote: Node/TS dev

```json
{
  "permissions": {
    "allow": [
      "Bash(npm:*)",
      "Bash(npx:*)",
      "Bash(yarn:*)",
      "Bash(pnpm:*)",
      "Bash(node:*)",
      "Bash(tsc:*)"
    ]
  }
}
```

---

## 🟢 Pacote: Python dev

```json
{
  "permissions": {
    "allow": [
      "Bash(python:*)",
      "Bash(python3:*)",
      "Bash(pip:*)",
      "Bash(pytest:*)",
      "Bash(uv:*)",
      "Bash(ruff:*)",
      "Bash(black:*)"
    ]
  }
}
```

---

## 🔴 Sempre negar (qualquer projeto)

```json
{
  "permissions": {
    "deny": [
      "Bash(rm -rf:*)",
      "Bash(git push --force:*)",
      "Bash(git reset --hard:*)",
      "Bash(:(){:|:&};:)"
    ]
  }
}
```

---

## 📌 Sintaxe rápida

| Padrão | Significa |
|--------|-----------|
| `Bash(comando)` | Apenas esse comando exato |
| `Bash(comando:*)` | Esse comando + qualquer argumento |
| `Bash(comando arg:*)` | Esse comando com esse prefixo de arg + qualquer continuação |
| `Read(*)` | Ler qualquer arquivo |
| `Edit(src/**)` | Editar dentro de src/ |

---

## 🧭 Voltar

👉 [Cheatsheets](./README.md)
