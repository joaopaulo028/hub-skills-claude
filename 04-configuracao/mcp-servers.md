# 🔌 MCP Servers

> 🎯 Como conectar o Claude a **ferramentas externas** (Gmail, Calendar, GitHub, banco de dados...) via Model Context Protocol.

---

## 🧠 O que é MCP?

**Model Context Protocol** é um padrão aberto que descreve como o Claude conversa com servidores externos para ler dados e executar ações.

```text
Claude  ←─ MCP ─→  Server (Gmail)
                ↘  Server (Calendar)
                ↘  Server (Postgres)
```

Cada **MCP server** expõe um conjunto de **tools** específicas.

---

## 🎯 MCPs já disponíveis na sua conta

Pelo que vejo no seu ambiente, você já tem (mas precisam ser autenticados):

| Server | Tools disponíveis | Como autenticar |
|--------|-------------------|----------------|
| 📧 **Gmail** | `authenticate`, `complete_authentication` | Pedir ao Claude para autenticar |
| 📅 **Google Calendar** | `authenticate`, `complete_authentication` | Pedir ao Claude para autenticar |

> 💡 Esses MCPs são **claude.ai-hosted** — não precisa instalar nada local.

---

## 🛠️ Adicionar um MCP local

No `settings.json`:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/dir"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_..."
      }
    }
  }
}
```

> ⚠️ Nunca commite tokens no `.claude/settings.json` versionado. Use `.claude/settings.local.json`.

---

## 🌟 MCPs úteis para começar

| Server | Uso | Pacote |
|--------|-----|--------|
| 📁 Filesystem | Ler/escrever fora do projeto | `@modelcontextprotocol/server-filesystem` |
| 🐙 GitHub | Issues, PRs, commits | `@modelcontextprotocol/server-github` |
| 🐘 Postgres | Queries em banco | `@modelcontextprotocol/server-postgres` |
| 🌐 Fetch | HTTP requests | `@modelcontextprotocol/server-fetch` |
| 📊 Memory | Knowledge graph | `@modelcontextprotocol/server-memory` |
| 🔍 Brave Search | Web search | `@modelcontextprotocol/server-brave-search` |

---

## 🧪 Como saber quais tools um MCP expõe

Depois de configurar, no Claude Code:

```text
"Quais tools de MCP estão disponíveis agora?"
```

Ele lista tudo.

---

## ⚠️ Cuidados

- 🔐 **Tokens** em variáveis de ambiente ou settings.local.json — nunca no settings versionado
- 📡 **Latência**: MCPs remotos adicionam latência
- 🐛 **Debug**: se um MCP falhar, cheque o log do Claude Code
- 🎯 **Escopo**: dê só as permissões mínimas (ex: GitHub token read-only se possível)

---

## 🆚 MCP vs Skill vs Hook

| Componente | É... | Exemplo |
|-----------|------|---------|
| **MCP** | Conexão com **dados/serviço externo** | Ler email do Gmail |
| **Skill** | Instrução reutilizável para o Claude | Como rascunhar uma resposta |
| **Hook** | Ação automática do **shell** | Tocar som ao terminar |

Combinando: você cria uma **Skill** `/responder-email` que usa o **MCP do Gmail** para ler a thread, e um **Hook** que toca um som quando o draft estiver pronto.

---

## 🧭 Próximo passo

👉 [Keybindings](./keybindings.md)
