# 📋 Frontmatter SKILL.md — Cheatsheet

> 🎯 Tudo que vai no topo do `SKILL.md`, em 1 página.

---

## 🧱 Template completo

```yaml
---
name: nome-em-kebab-case
description: O que faz + quando usar. Inclua gatilho explícito.
allowed-tools:               # opcional
  - Read
  - Edit
  - Bash(npm:*)
model: claude-haiku-4-5-20251001  # opcional, força modelo
---
```

---

## ✅ Campos

| Campo | Obrigatório | Tipo | Exemplo |
|-------|:----------:|------|---------|
| `name` | ✅ | string | `revisar-email` |
| `description` | ✅ | string | "Revisa email em PT..." |
| `allowed-tools` | ❌ | lista | `[Read, Edit]` |
| `model` | ❌ | string | `claude-haiku-4-5-20251001` |

---

## 📝 Regras do `name`

- ✅ Kebab-case: `minha-skill`
- ❌ Sem espaços: ~~`minha skill`~~
- ❌ Sem acentos: ~~`saudação`~~
- 📌 Deve bater com a **pasta**: `~/.claude/skills/minha-skill/`

---

## 🎯 Boa `description` tem 3 partes

```yaml
description: |
  [O QUÊ] Gera changelog Keep-A-Changelog dos commits desde a última tag.
  [QUANDO] Usar quando o usuário pedir "gera o changelog".
  [QUANDO NÃO] NÃO usar para release notes públicas.
```

---

## 🔐 Tools permitidas (allowed-tools)

```yaml
allowed-tools:
  - Read                    # ler qualquer arquivo
  - Edit                    # editar arquivos
  - Write                   # criar arquivos
  - Bash(npm:*)             # npm install, run, etc.
  - Bash(git status)        # comando exato
```

---

## 🤖 Modelos disponíveis

| Modelo ID | Quando usar |
|-----------|-------------|
| `claude-haiku-4-5-20251001` | Skills simples, rápidas, alto volume |
| `claude-sonnet-4-6` | Maioria das skills |
| `claude-opus-4-7` | Skills que exigem raciocínio profundo |

> 💡 Não defina `model` se você quiser que herde do usuário.

---

## 🧭 Voltar

👉 [Cheatsheets](./README.md)
