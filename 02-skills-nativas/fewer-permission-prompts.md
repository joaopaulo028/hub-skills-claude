# 🔓 /fewer-permission-prompts — Reduzir prompts de permissão

![Categoria](https://img.shields.io/badge/categoria-produtividade-cyan) ![Dificuldade](https://img.shields.io/badge/dificuldade-f%C3%A1cil-green)

> 🎯 Analisa seus transcripts recentes, identifica comandos **read-only** que você confirma com frequência, e propõe uma allowlist priorizada em `.claude/settings.json`.

---

## 💡 Quando usar

- ✅ Você confirma `git status`, `ls`, `cat` toda hora e está cansado disso
- ✅ Quer um setup mais "fluído" sem perder segurança em comandos destrutivos

## 🎬 Como invocar

```text
/fewer-permission-prompts
```

A skill:

1. Escaneia transcripts recentes
2. Lista os comandos mais repetidos
3. Sugere quais adicionar à allowlist
4. Aplica no `.claude/settings.json` se você aceitar

---

## ⚠️ Cuidado

- **Só libera read-only** por padrão (boas práticas)
- Revise a lista antes de aplicar
- Não libera `rm`, `git push`, etc.

---

## 🔗 Veja também

- [/update-config](./update-config.md)
- [Permissões](../04-configuracao/README.md)
