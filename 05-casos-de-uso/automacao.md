# 🤖 Automação

> 🎯 Combinando Skills + Hooks + Schedule + Loop para automatizar tarefas.

---

## 🧰 As 4 ferramentas

| Ferramenta | Latência | Persistência | Bom para |
|-----------|---------|--------------|----------|
| 🪝 **Hook** | Instantânea | Enquanto rodando | Reação a eventos |
| 🔁 **Loop** | Segundos a min | Só na sessão | Polling curto |
| ⏰ **Schedule** | Min a dias | Persistente (cron) | Rotinas recorrentes |
| 🧩 **Skill custom** | Sob demanda | Sempre disponível | Tarefa repetível |

---

## 💡 Receitas

### 🔔 Notificação ao terminar tarefa longa

**Hook (Stop)**:

```json
{
  "hooks": {
    "Stop": [
      { "command": "osascript -e 'display notification \"Claude terminou\" with title \"Pronto!\"'" }
    ]
  }
}
```

> 💡 No macOS, `osascript` cria notificação nativa.

---

### 📅 Briefing diário automático

**Schedule**: toda segunda 9h.

```text
/schedule
> "Toda segunda às 9h, rode /resumo-semana e me envie por email"
```

---

### 🚨 Watcher de deploy

**Loop**: enquanto deploy roda.

```text
/loop 2m "verifica o status do deploy do PR #123 e me avisa quando mudar"
```

Quando terminar, hook `Stop` toca som.

---

### 🧹 Auto-format ao editar

**Hook (PostToolUse)**:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit",
        "command": "prettier --write \"$CLAUDE_FILE\" 2>/dev/null || true"
      }
    ]
  }
}
```

> ⚠️ Use `|| true` para não bloquear o Claude se o comando falhar.

---

### 📝 Log de auditoria

**Hook (PreToolUse) para todas as Bash**:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "command": "echo \"[$(date -Iseconds)] Bash invoked\" >> ~/.claude/audit.log"
      }
    ]
  }
}
```

Útil para revisar depois o que o Claude fez.

---

## 🛡️ Princípios

1. ⏱️ **Não automatize o que você só faz uma vez**
2. 🔁 **Idempotência**: rodar 2× não deve estragar nada
3. 🔇 **Falhe em silêncio quando apropriado** (`|| true`)
4. 🐌 **Não bloqueie**: hooks devem ser rápidos
5. 📊 **Logue tudo**: facilita debug depois

---

## 🧭 Próximo passo

👉 [Dev workflows](./dev-workflows.md)
