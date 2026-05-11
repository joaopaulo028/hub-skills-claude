# ⌨️ Keybindings

> 🎯 Customizar atalhos do Claude Code em `~/.claude/keybindings.json`.

---

## 📂 Onde mora

```text
~/.claude/keybindings.json
```

---

## 🧱 Sintaxe básica

```json
[
  {
    "key": "cmd+enter",
    "command": "submit"
  },
  {
    "key": "cmd+k cmd+s",
    "command": "skill.run",
    "args": { "name": "resumo-do-dia" }
  }
]
```

| Campo | Função |
|-------|--------|
| `key` | Combinação de teclas (use `cmd`, `ctrl`, `shift`, `alt`) |
| `command` | Nome do comando |
| `args` | Argumentos opcionais |

---

## 🎯 Atalhos úteis

| Ação | Atalho sugerido |
|------|----------------|
| Submit | `cmd+enter` (default) |
| Novo turno | `cmd+l` |
| Toggle plan mode | `cmd+shift+p` |
| Cancelar tool | `cmd+.` |

---

## 🎼 Chords (sequências)

Permitem criar atalhos compostos como em VSCode.

```json
{
  "key": "cmd+k cmd+r",
  "command": "skill.run",
  "args": { "name": "review" }
}
```

> 💡 Útil quando você fica sem combinações de 1 tecla.

---

## 🛠️ Forma fácil de editar

```text
/keybindings-help
```

E descreva: *"rebinda Ctrl+S pra submit"*.

---

## ⚠️ Conflitos com VSCode

Se o atalho conflitar com VSCode:

1. Mude o atalho do Claude **ou**
2. Desabilite o atalho no VSCode (`Cmd+K Cmd+S` → buscar → remover binding)

---

## 🧭 Próximo passo

👉 [05 — Casos de Uso](../05-casos-de-uso/README.md)
