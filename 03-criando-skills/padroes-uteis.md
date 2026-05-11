# 🧩 Padrões Úteis

> 🎯 Receitas reaproveitáveis para problemas comuns ao escrever Skills.

---

## 🎬 Padrão: Skill com argumentos

Aceitar parâmetros depois do nome.

```markdown
---
name: lembrar
description: Salva um lembrete. Usar quando o usuário digitar /lembrar <texto>.
---

# Lembrar

Os argumentos vêm logo após `/lembrar`.

1. Capture o texto após `/lembrar`
2. Salve em `~/lembretes.md` com data de hoje
3. Confirme: "✅ Lembrete salvo: [texto]"
```

Uso: `/lembrar comprar pão`

---

## 🤔 Padrão: Skill com pergunta de clarificação

Quando faltar informação, pergunte antes de agir.

```markdown
## Passos
1. Verifique se o usuário forneceu o nome do projeto
2. Se NÃO forneceu, pergunte: "Qual projeto?"
3. Só depois siga.
```

---

## 🧪 Padrão: Skill que executa script

```markdown
## Passos

1. Rode o script auxiliar:
   ```bash
   bash ./scripts/check.sh
   ```
2. Interprete a saída
3. Reporte ao usuário em PT
```

> ⚠️ Coloque o script em `~/.claude/skills/sua-skill/scripts/check.sh` e garanta `chmod +x`.

---

## 🎨 Padrão: Skill com template de saída

Use blocos de código markdown como template.

```markdown
## Formato de saída

Sempre devolva neste formato exato:

\`\`\`
📅 Data: [DATA]
📌 Status: [STATUS]
🔗 Link: [URL]
\`\`\`
```

---

## 🔁 Padrão: Skill idempotente

Skills que podem rodar 2× sem estragar.

```markdown
## Antes de criar
1. Verifique se já existe `CHANGELOG.md`
2. Se existir, APENDE ao topo. Não sobrescreva.
3. Se não existir, crie.
```

---

## ⚡ Padrão: Skill rápida (com Haiku)

Para tarefas simples, force Haiku para reduzir custo/latência.

```yaml
---
name: contar-palavras
description: Conta palavras no texto fornecido
model: claude-haiku-4-5-20251001
---
```

---

## 🎯 Padrão: Skill com checklist final

Garanta que o Claude valide antes de entregar.

```markdown
## Antes de entregar, confirme

- [ ] Output em português
- [ ] Sem markdown quebrado
- [ ] Inclui data atual
- [ ] Máximo 200 palavras

Se algum item falhar, refaça antes de mostrar.
```

---

## 🚦 Padrão: Skill com modos

Uma skill, vários comportamentos.

```markdown
## Modos

- **Modo curto** (padrão): resumo de 3 linhas
- **Modo detalhado** (se usuário disser "completo" ou "detalhado"): inclui justificativas

Identifique o modo na mensagem do usuário antes de começar.
```

---

## 📚 Mais padrões virão

Conforme você criar Skills, anote padrões que se repetem e adicione aqui.

---

## 🧭 Próximo passo

👉 Veja Skills reais funcionando em [exemplos/](../exemplos/README.md)
