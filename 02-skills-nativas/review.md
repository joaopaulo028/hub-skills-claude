# 🔍 /review — Revisar Pull Request

![Categoria](https://img.shields.io/badge/categoria-code%20review-purple) ![Dificuldade](https://img.shields.io/badge/dificuldade-f%C3%A1cil-green)

> 🎯 Faz uma revisão estruturada de um pull request, apontando bugs, riscos e melhorias.

---

## 💡 Quando usar

- ✅ Antes de fazer merge num PR
- ✅ Quero uma segunda opinião antes de pedir review humano
- ✅ Vou abrir um PR e quero auto-revisar

## 🎬 Como invocar

```text
/review              # revisa o que está pendente na branch atual
/review 123          # revisa o PR #123 do GitHub
```

> ⚠️ Para `/review <PR#>` o `gh` CLI precisa estar autenticado.

---

## 📋 O que o review costuma cobrir

| Eixo | Exemplos |
|------|----------|
| 🐛 Bugs | Lógica errada, null/undefined, race conditions |
| 🔐 Segurança | SQL injection, XSS, secrets vazados |
| 🎯 Correção | Faz o que deveria? Testes cobrem? |
| 🧹 Qualidade | Código duplicado, nomes ruins, complexidade |
| 📐 Convenções | Aderência ao estilo do projeto |

---

## 🧪 Teste prático

1. Faça uma mudança numa branch (qualquer alteração)
2. Rode `/review`
3. Compare com o que você mesmo teria notado

---

## 🔗 Veja também

- [/security-review](./security-review.md) — foco em segurança
- [/simplify](./simplify.md) — foco em qualidade do código
