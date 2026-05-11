# 🧩 Anatomia de uma Skill

> 🎯 Vamos abrir o capô. Quando você terminar este doc, vai entender exatamente o que tem dentro de uma Skill e o papel de cada parte.

---

## 📁 Estrutura de pastas

A unidade básica de uma Skill é uma **pasta com o nome da skill**:

```text
minha-skill/                 ← nome da skill (kebab-case)
├── SKILL.md                 ← OBRIGATÓRIO: instruções + metadados
├── scripts/                 ← (opcional) scripts auxiliares
│   └── helper.sh
├── templates/               ← (opcional) templates reutilizáveis
│   └── output.md
└── assets/                  ← (opcional) imagens, dados de exemplo
    └── exemplo.json
```

> ⚠️ O nome da pasta vira o **slash command**: `minha-skill/` → `/minha-skill`.

---

## 📝 O arquivo SKILL.md

É o coração da skill. Tem duas partes:

### 1️⃣ Frontmatter (YAML) — metadados

```yaml
---
name: minha-skill
description: O que ela faz e quando o Claude deve invocá-la
---
```

| Campo | Obrigatório | Função |
|-------|:----------:|--------|
| `name` | ✅ | Nome da skill (deve bater com o nome da pasta) |
| `description` | ✅ | Frase que o Claude lê para decidir **quando** invocar |
| `allowed-tools` | ❌ | Restringe quais tools a skill pode usar |
| `model` | ❌ | Força um modelo específico |

> 💡 A `description` é **crítica**: é com base nela que o Claude (e você) sabe quando usar a skill. Escreva como se fosse o "elevator pitch" da skill.

### 2️⃣ Corpo (Markdown) — as instruções

Tudo abaixo do segundo `---` é **markdown livre**. É o que o Claude vai ler e seguir quando a skill for invocada.

Exemplo mínimo completo:

````markdown
---
name: bom-dia
description: Cumprimenta o usuário em português com data do dia
---

# Bom dia!

Quando esta skill for invocada:

1. Cumprimente o usuário com "Bom dia!"
2. Informe a data atual em formato extenso (ex: "Hoje é segunda, 10 de maio de 2026")
3. Pergunte como pode ajudar hoje

Mantenha o tom amigável e curto.
````

---

## 🧠 Como o Claude "lê" uma Skill

Existem dois momentos:

### 🔍 No início da conversa
O Claude **só vê** as `name + description` de cada skill disponível. É como olhar um menu.

### 🎬 Quando você invoca
Aí sim o Claude **carrega o corpo completo** do `SKILL.md` no contexto e segue as instruções.

> 💡 Isso é por **eficiência de contexto**: imagine se ele tivesse que ler todas as skills inteiras o tempo todo. O contexto encheria rápido.

**Implicação prática**: a `description` precisa ser excelente, porque é o que ativa (ou não) a skill.

---

## 🛠️ Scripts e arquivos auxiliares

Skills mais complexas podem chamar scripts externos. Exemplo:

```text
backup-db/
├── SKILL.md
└── scripts/
    └── dump.sh
```

No `SKILL.md`:

```markdown
Execute o script de backup com:
\`\`\`bash
bash ./scripts/dump.sh
\`\`\`
```

> ⚠️ **Permissões**: para o Claude rodar scripts da skill, eles precisam estar liberados em `settings.json` (ou você confirma na hora).

---

## 📍 Onde a pasta da skill fica?

| Escopo | Caminho | Visibilidade |
|--------|---------|--------------|
| Global | `~/.claude/skills/minha-skill/` | Funciona em **qualquer** projeto |
| Projeto | `.claude/skills/minha-skill/` | Só funciona neste projeto (versionável no git) |

---

## ✅ Checklist de uma boa SKILL.md

- [ ] `name` bate com o nome da pasta
- [ ] `description` é específica e diz **quando** usar (não só o quê)
- [ ] Instruções no corpo são em **passos numerados** ou listas claras
- [ ] Inclui **exemplos** de uso esperado
- [ ] Define **quando NÃO usar** (se aplicável)
- [ ] Está em **português** (se for para você) ou no idioma da sua equipe

---

## 🧭 Próximo passo

👉 [Como invocar Skills](./como-invocar.md)
