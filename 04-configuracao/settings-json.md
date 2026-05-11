# ⚙️ settings.json

> 🎯 O arquivo central de configuração do Claude Code. Estrutura, escopos e campos principais.

---

## 📂 Onde mora

| Escopo | Caminho | Visibilidade |
|--------|---------|--------------|
| 🌍 Global | `~/.claude/settings.json` | Você, em qualquer projeto |
| 📁 Projeto | `.claude/settings.json` | Você + time (via git) |
| 🔒 Local | `.claude/settings.local.json` | Só você, neste projeto (gitignored) |

**Precedência** (do mais alto para o mais baixo): **Local** → **Projeto** → **Global**.

> 💡 Use Local para overrides temporários sem afetar o time.

---

## 🧱 Estrutura mínima

```json
{
  "permissions": {
    "allow": [],
    "deny": []
  },
  "env": {},
  "hooks": {}
}
```

---

## 🗝️ Campos principais

### `permissions`

Controla o que roda sem prompt de confirmação.

```json
{
  "permissions": {
    "allow": [
      "Bash(git status)",
      "Bash(npm:*)",
      "Read(*)"
    ],
    "deny": [
      "Bash(rm -rf:*)"
    ]
  }
}
```

> 📖 Detalhes em [permissoes.md](./permissoes.md).

### `env`

Variáveis de ambiente para a sessão do Claude.

```json
{
  "env": {
    "DEBUG": "true",
    "NODE_ENV": "development"
  }
}
```

### `hooks`

Comandos shell disparados em eventos.

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit",
        "command": "npm run lint"
      }
    ]
  }
}
```

> 📖 Detalhes em [hooks.md](./hooks.md).

### `mcpServers`

Conexões com servidores MCP.

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"]
    }
  }
}
```

> 📖 Detalhes em [mcp-servers.md](./mcp-servers.md).

---

## 🛠️ Como editar

### Opção 1 — Skill nativa (recomendado)

```text
/update-config
```

Aí descreve em PT o que quer. A skill cuida do JSON correto.

### Opção 2 — Manualmente

```bash
code ~/.claude/settings.json
```

> ⚠️ JSON é estrito: vírgula a mais e quebra tudo. Use o `/update-config` se tiver dúvida.

### Opção 3 — `/config`

Para configs visuais (tema, modelo): `/config`.

---

## 🔎 Como ver o que está ativo agora

No Claude Code: pergunte *"o que tenho no meu settings.json global?"* — ele lê e te mostra.

Ou no terminal:

```bash
cat ~/.claude/settings.json
```

---

## ⚠️ Erros comuns

| Erro | Causa | Solução |
|------|-------|---------|
| Config não aplica | Editou o escopo errado | Confira qual settings.json está sendo lido |
| JSON inválido | Vírgula extra/faltando | Use um linter ou `/update-config` |
| Permissão "vazou" para outro projeto | Está no global mas devia ser de projeto | Mova para `.claude/settings.json` |

---

## 🧭 Próximo passo

👉 [Permissões em detalhe](./permissoes.md)
