# 06 · Plugins

> Plugins estendem o Claude Code com **conjuntos curados de skills, comandos e hooks**. Diferente das skills nativas (já embarcadas no Claude Code), plugins vivem em **marketplaces** e você precisa instalá-los explicitamente.

## Por que plugins?

| Skill nativa | Plugin |
| --- | --- |
| Já vem com o Claude Code | Você instala via marketplace |
| Distribuída pela Anthropic | Pode ser oficial ou da comunidade |
| Atualiza junto com o CLI | Versionamento próprio (`claude plugin update`) |
| Escopo: um comando ou skill | Escopo: vários skills + comandos + hooks + agentes |

## Como instalar um plugin

```bash
# 1. Registre o marketplace (apenas uma vez)
claude plugin marketplace add anthropics/claude-plugins-official

# 2. Instale o plugin desejado
claude plugin install <nome>@claude-plugins-official

# 3. Reinicie sua sessão do Claude Code
```

Listar / atualizar / remover:

```bash
claude plugin list
claude plugin update <nome>@<marketplace>
claude plugin uninstall <nome>@<marketplace>
```

> **Limitação atual:** o comando `/plugin` (dentro do Claude Code) não funciona na extensão VSCode. Sempre use `claude plugin` no terminal externo.

## Plugins documentados neste hub

- [**Superpowers**](superpowers.md) — Metodologia completa de desenvolvimento de software: brainstorming → planning → TDD → debugging → review → merge. **14 skills** que se ativam automaticamente.

## Marketplaces oficiais

- `anthropics/claude-plugins-official` — curadoria oficial da Anthropic
- `obra/superpowers-marketplace` — marketplace do autor do Superpowers, inclui plugins relacionados
