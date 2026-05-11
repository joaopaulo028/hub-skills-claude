# 🧹 /simplify — Simplificar código mudado

![Categoria](https://img.shields.io/badge/categoria-refactor-orange) ![Dificuldade](https://img.shields.io/badge/dificuldade-f%C3%A1cil-green)

> 🎯 Revisa o **código que você acabou de mudar** procurando oportunidades de reuso, simplificação e qualidade — e aplica os fixes.

---

## 💡 Quando usar

- ✅ Acabei de implementar uma feature, antes de commitar
- ✅ Suspeito que estou reinventando algo que já existe no codebase
- ✅ Código funciona mas parece complicado demais

## ❌ Quando NÃO usar

- Em código que você não acabou de tocar (vira refactor sem fim)
- Em mudanças triviais (1 linha)

## 🎬 Como invocar

```text
/simplify
```

---

## 🔍 O que ela costuma sugerir

- 🔁 **Reuso** de funções/utils existentes no projeto
- 🧬 **Extração** de lógica duplicada
- 🪶 **Remoção** de código morto / try/catch desnecessários
- 📛 **Renomeações** para nomes mais claros
- 🧯 **Simplificação** de condicionais aninhadas

---

## ⚠️ Cuidado

- Ela **aplica** os fixes diretamente. Sempre revise o diff antes de commitar.
- Pode ser agressiva — se discordar, peça para reverter ou apenas listar sugestões.

---

## 🔗 Veja também

- [/review](./review.md)
