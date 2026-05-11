# 📘 O que são Skills?

> 💡 **TL;DR** — Uma Skill é um **pacote de instruções + ferramentas reutilizáveis** que você (ou a Anthropic, ou a comunidade) escreve uma vez e o Claude pode invocar sempre que precisar fazer aquela tarefa.

---

## 🎬 Analogia rápida

Imagine que o Claude é um colega de trabalho super competente, mas que **esquece** o jeito específico que **você** gosta de fazer as coisas a cada nova conversa.

- Sem Skills: você reexplica toda vez "antes de revisar PR, olhe X, Y, Z, depois Z'..."
- Com Skills: você cria uma Skill `review` uma vez, e dali pra frente é só digitar `/review`.

🎯 **Skill = receita reutilizável de uma tarefa especializada.**

---

## 🧱 Anatomia mínima

Toda Skill é uma **pasta** com pelo menos um arquivo:

```text
minha-skill/
└── SKILL.md       ← metadados + instruções
```

Skills mais robustas podem incluir:

```text
review/
├── SKILL.md
├── scripts/
│   └── check-tests.sh
└── templates/
    └── pr-comment.md
```

> 📖 Detalhes completos em [Anatomia de uma Skill](./anatomia-de-uma-skill.md).

---

## 🆚 Skill nativa vs Skill customizada

| Tipo | Quem fez | Onde fica | Exemplo |
|------|----------|-----------|---------|
| 🏛️ **Nativa** | Anthropic / Claude Code | Embutida no Claude Code | `init`, `review`, `simplify` |
| 🛠️ **Customizada (suas)** | Você | `~/.claude/skills/` ou `.claude/skills/` no projeto | A que você criar |
| 🌐 **Compartilhada** | Comunidade / plugins | Plugin instalado | Varia |

---

## 💪 Por que usar Skills?

| Benefício | Exemplo prático |
|-----------|----------------|
| ✅ **Consistência** | Toda revisão de PR segue o mesmo roteiro |
| 💰 **Redução de custo** | Instrução clara = menos tentativas erradas do Claude |
| ⏱️ **Velocidade** | `/review` é mais rápido que reescrever o roteiro |
| 🔁 **Reuso entre projetos** | Skills globais funcionam em qualquer pasta |
| 🤝 **Compartilhamento** | Pode versionar no git e usar em equipe |

---

## 🚦 Quando NÃO usar uma Skill

Skills brilham para **tarefas recorrentes e estruturadas**. Para coisas que você faz **uma vez só** ou que mudam a cada vez, vale mais escrever direto no chat.

> ⚠️ Não transforme tudo em Skill. Skills demais viram um zoológico difícil de manter.

---

## 🌍 Onde Skills moram no seu sistema

| Escopo | Caminho | Quando usar |
|--------|---------|-------------|
| 👤 **Usuário** (global) | `~/.claude/skills/` | Skills que você quer em todos os projetos |
| 📁 **Projeto** | `.claude/skills/` | Skills específicas do projeto (compartilháveis via git) |
| 🔌 **Plugin** | Depende do plugin | Skills de terceiros |

---

## 🎯 Exemplo real

A skill nativa `init` (que cria um `CLAUDE.md` documentando o codebase) é exatamente isso:

1. Você digita `/init`
2. O Claude lê a `SKILL.md` da `init`
3. Segue as instruções padronizadas para inspecionar o projeto
4. Gera um `CLAUDE.md` no mesmo formato sempre

Sem a skill, você teria que explicar manualmente "olhe a estrutura, identifique linguagem, documente comandos comuns..." toda vez.

---

## 🧭 Próximo passo

👉 [Anatomia de uma Skill](./anatomia-de-uma-skill.md) — abrir o capô e ver como é por dentro
