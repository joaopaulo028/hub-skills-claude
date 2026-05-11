# 📖 Glossário

> 🎯 Termos que você vai encontrar o tempo todo. Volte aqui sempre que algo soar estranho.

---

## 🤖 Claude Code
A **CLI/extensão oficial** da Anthropic para usar o Claude no terminal, VSCode ou JetBrains. É o ambiente onde Skills, hooks e MCP rodam.

## 🧩 Skill
Um **pacote de instruções + (opcionalmente) ferramentas** que ensina o Claude a fazer uma tarefa específica de forma consistente. Cada skill mora em uma pasta com um arquivo `SKILL.md`.

Exemplo: a skill `review` ensina o Claude a revisar um pull request seguindo um roteiro padrão.

## 📝 SKILL.md
Arquivo principal de uma skill. Contém o **frontmatter YAML** (metadados) e o **corpo em markdown** (instruções).

```markdown
---
name: minha-skill
description: O que ela faz e quando usar
---

# Instruções para o Claude...
```

## 🏷️ Frontmatter
O bloco YAML no topo do `SKILL.md`, delimitado por `---`. Define o nome, descrição e outras propriedades da skill.

## ⚡ Slash command
Forma de invocar uma skill digitando `/nome-da-skill` no chat. Ex: `/review`, `/init`.

## 🪝 Hook
Comando do **shell** que o Claude Code executa automaticamente em resposta a eventos (antes/depois de uma tool call, ao finalizar uma tarefa, etc.). Configurado em `settings.json`.

> Diferença chave: **Skill** = instrução para o Claude. **Hook** = comando para o sistema operacional.

## 🔌 MCP (Model Context Protocol)
Protocolo que conecta o Claude a **ferramentas e dados externos** (Gmail, Calendar, banco de dados, APIs...). Cada conexão é um **MCP server**.

## ⚙️ settings.json
Arquivo de configuração do Claude Code. Define hooks, permissões, variáveis de ambiente, MCP servers, etc. Existe em três níveis:
- 🌍 **Global**: `~/.claude/settings.json`
- 📁 **Projeto**: `.claude/settings.json` (compartilhado)
- 🔒 **Local**: `.claude/settings.local.json` (privado, gitignored)

## 🔐 Permissão
Regra que define se uma tool/comando roda automaticamente ou pede confirmação. Ex: `Bash(npm:*)` permite todos os comandos `npm` sem perguntar.

## 🧠 Memory (auto-memory)
Sistema de arquivos onde o Claude salva informações sobre você, o projeto e suas preferências para usar em **conversas futuras**. Diferente do contexto da conversa atual.

## 🧑‍🚀 Subagent / Agent
Um Claude "filho" especializado, invocado para uma tarefa isolada (ex: pesquisar código, revisar segurança). Roda em paralelo sem poluir seu contexto principal.

## 🌳 Worktree
Cópia isolada do repositório em uma branch separada. Usado quando um subagente precisa modificar arquivos sem afetar seu working tree atual.

## 📊 Context window
A quantidade de informação (em tokens) que o Claude consegue "ver" de uma vez. O Opus 4.7 que você está usando tem **1 milhão de tokens** de contexto.

## 💾 Prompt caching
Mecanismo do Claude que reaproveita partes da conversa já processadas, reduzindo custo e latência. TTL padrão: 5 minutos.

---

## 🆚 Confusões comuns

| Termo A | Termo B | Diferença |
|---------|---------|-----------|
| **Skill** | **Hook** | Skill é instrução pro Claude; Hook é comando pro shell |
| **Skill** | **Subagent** | Skill é o "como fazer"; Subagent é um "Claude separado" rodando |
| **Slash command** | **Skill** | Slash command é a *forma de invocar*; Skill é o conteúdo invocado |
| **settings.json** | **CLAUDE.md** | settings = config técnica; CLAUDE.md = instruções de comportamento |
| **MCP server** | **Tool** | MCP server expõe várias tools; Tool é uma operação específica |

---

## 🧭 Próximo passo

👉 [O que são Skills (detalhado)](../01-fundamentos/o-que-sao-skills.md)
