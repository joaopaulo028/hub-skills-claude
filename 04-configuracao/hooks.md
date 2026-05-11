# 🪝 Hooks

> 🎯 Comandos do shell que disparam **automaticamente** em resposta a eventos do Claude Code.

---

## 🧠 Conceito

Diferente de Skill, hook **não é instrução para o Claude** — é um **comando do shell** que **o harness executa**.

```text
Evento acontece  →  Hook dispara  →  Comando do shell roda
```

Exemplos:

- Antes de cada `Edit` → fazer backup do arquivo
- Depois de uma tool call → tocar um som
- Quando Claude termina → enviar notificação

---

## 🎯 Tipos de hook

| Hook | Quando dispara |
|------|---------------|
| `PreToolUse` | **Antes** de uma tool ser executada |
| `PostToolUse` | **Depois** de uma tool executar |
| `UserPromptSubmit` | Quando você envia um prompt |
| `Stop` | Quando o Claude termina o turno |
| `Notification` | Em notificações do sistema |

---

## 🧱 Sintaxe

No `settings.json`:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit",
        "command": "echo 'arquivo editado' >> ~/claude.log"
      }
    ]
  }
}
```

| Campo | Função |
|-------|--------|
| `matcher` | Qual tool/evento dispara (`Edit`, `Bash`, `Read`, `*`) |
| `command` | Comando shell a rodar |

---

## 💡 Exemplos práticos

### 🔔 Som ao terminar uma tarefa (macOS)

```json
{
  "hooks": {
    "Stop": [
      { "command": "afplay /System/Library/Sounds/Glass.aiff" }
    ]
  }
}
```

### 🧹 Lint automático após editar TS

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit",
        "command": "npm run lint --silent || true"
      }
    ]
  }
}
```

### 📋 Log de toda execução de Bash

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "command": "echo \"[$(date)] Bash executed\" >> ~/.claude/audit.log"
      }
    ]
  }
}
```

### 🔒 Bloquear comandos perigosos

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "command": "grep -q 'rm -rf /' && exit 1 || exit 0"
      }
    ]
  }
}
```

---

## ⚠️ Cuidados

- 🐢 **Performance**: hook lento atrasa cada tool call
- 🔁 **Loops infinitos**: cuidado com hooks que disparam outros eventos
- 🐛 **Debug**: se hook falhar silenciosamente, use redirecionamento (`>> /tmp/hook.log 2>&1`)
- 🔐 **Segurança**: nunca coloque secrets diretamente no comando

---

## 🛠️ Forma fácil de configurar

```text
/update-config
```

Descreva: *"toda vez que o Claude terminar uma tarefa, mostra uma notificação"*.

A skill cuida do JSON correto.

---

## 🆚 Skill vs Hook (quando usar qual)

| Quero... | Use |
|----------|-----|
| Instruir o **Claude** a fazer algo | **Skill** |
| Rodar **comando do sistema** em resposta a evento | **Hook** |
| Reagir automaticamente sem o Claude pensar | **Hook** |
| Tarefa estruturada que o Claude executa | **Skill** |

---

## 🧭 Próximo passo

👉 [MCP Servers](./mcp-servers.md)
