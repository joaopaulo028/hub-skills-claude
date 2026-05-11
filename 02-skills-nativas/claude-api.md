# 🔧 /claude-api — Construir apps com Anthropic SDK

![Categoria](https://img.shields.io/badge/categoria-dev-darkgreen) ![Dificuldade](https://img.shields.io/badge/dificuldade-m%C3%A9dio-yellow)

> 🎯 Ajuda a construir, debugar e otimizar apps que usam a Anthropic SDK (API do Claude) — sempre incluindo **prompt caching** e usando o modelo certo.

---

## 💡 Quando usar

- ✅ Estou escrevendo código que importa `anthropic` ou `@anthropic-ai/sdk`
- ✅ Preciso migrar entre versões de modelo (ex: 4.6 → 4.7)
- ✅ Quero ativar/otimizar prompt caching
- ✅ Vou implementar tool use, batch, citations, etc.

## ❌ Quando NÃO usar

- App que usa OpenAI ou outro provider
- Código provider-agnóstico
- Perguntas gerais de ML/programação

## 🎬 Como invocar

```text
/claude-api
```

Ou simplesmente abra um arquivo com `import anthropic` — a skill é triggerada automaticamente.

---

## 🧰 O que ela domina

- 🎯 Escolha de modelo (Opus 4.7 vs Sonnet 4.6 vs Haiku 4.5)
- 💾 **Prompt caching** (cache_control, TTL, hit rate)
- 🛠️ Tool use (function calling)
- 🧠 Extended thinking
- 📦 Batch API
- 📄 Files API
- 📚 Citations
- 🔄 Migração entre modelos

---

## 🔗 Veja também

- [Documentação oficial](https://docs.anthropic.com)
