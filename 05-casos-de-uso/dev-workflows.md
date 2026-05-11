# 👨‍💻 Dev Workflows

> 🎯 Skills e fluxos para o desenvolvimento de software no dia a dia.

---

## 🔍 Workflow: PR Review estruturado

```text
1. /simplify       → limpa código mudado
2. /review         → revisão geral
3. /security-review → análise de segurança
4. git push & gh pr create
```

---

## ✍️ Workflow: Commit perfeito

**Skill custom**: `/commit-msg`

````yaml
---
name: commit-msg
description: Gera mensagem de commit no padrão Conventional Commits a partir do diff stageado.
---

# Conventional commit

1. Rode `git diff --staged`
2. Identifique o tipo: feat | fix | refactor | docs | test | chore
3. Identifique o escopo (módulo/área)
4. Escreva mensagem no formato:

```
<tipo>(<escopo>): <descrição curta em PT>

<corpo opcional explicando o "porquê">
```

5. Pergunte ao usuário se aprova antes de commitar
````

---

## 🐛 Workflow: Triagem de bug

**Skill custom**: `/bug-triagem`

````yaml
---
name: bug-triagem
description: Estrutura informações de um bug reportado para investigação. Usar quando o usuário relatar um bug.
---

# Triagem de bug

Capture do usuário:
1. **Descrição**: o que acontece?
2. **Esperado**: o que deveria acontecer?
3. **Passos pra reproduzir**
4. **Ambiente**: SO, versão, browser
5. **Logs/screenshots** (se houver)

Devolva em formato issue:

```
## Bug: [título]

**Comportamento**: ...
**Esperado**: ...

### Reprodução
1. ...
2. ...

### Ambiente
- ...
```
````

---

## 📋 Workflow: Changelog

**Skill custom**: `/changelog`

````yaml
---
name: changelog
description: Gera entrada de changelog (Keep a Changelog) a partir dos commits desde a última tag.
---

1. Rode `git log $(git describe --tags --abbrev=0)..HEAD --pretty=format:"%s"`
2. Agrupe commits por tipo (Added/Fixed/Changed/Removed)
3. Devolva no formato Keep a Changelog
4. Sugira a próxima versão (semver)
````

---

## 🧪 Workflow: TDD assistido

```text
1. Descreva a feature em 1 frase
2. Peça: "escreva testes para essa feature, sem implementar"
3. Veja os testes falharem (red)
4. Peça: "implemente para esses testes passarem"
5. /simplify para limpar
6. /review antes do PR
```

---

## 🔄 Workflow: Refactor seguro

```text
1. Garanta que testes existem e passam
2. /simplify no módulo alvo (sugestões)
3. Aplique 1 mudança por vez
4. Rode testes após cada
5. Commit pequeno por mudança
```

---

## 📚 Workflow: Onboarding em codebase novo

```text
1. /init                                (gera CLAUDE.md)
2. "explique a arquitetura desse projeto"
3. "quais são os 5 arquivos mais importantes?"
4. "qual o fluxo principal de dados?"
5. Salve descobertas no CLAUDE.md
```

---

## 🧭 Onde aplicar primeiro

Se você nunca usou nenhum desses workflows, comece pelo **PR Review estruturado** — é o de maior ROI imediato.

---

## 🧭 Próximo passo

👉 Volte ao [hub principal](../README.md) ou explore os [cheatsheets](../cheatsheets/README.md)
