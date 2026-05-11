# 🏗️ /init — Inicializar projeto com CLAUDE.md

![Categoria](https://img.shields.io/badge/categoria-setup-blue) ![Dificuldade](https://img.shields.io/badge/dificuldade-f%C3%A1cil-green)

> 🎯 Cria um arquivo `CLAUDE.md` na raiz do projeto, documentando o codebase para o Claude usar como contexto em conversas futuras.

---

## 💡 Quando usar

- ✅ Acabei de abrir um projeto e o Claude não conhece a base
- ✅ Quero formalizar comandos comuns (build, test, lint) num único lugar
- ✅ Vou colaborar com outras pessoas e quero alinhar o "manual" do projeto

## ❌ Quando NÃO usar

- O projeto já tem um `CLAUDE.md` bom (use edição manual em vez de regenerar)
- É um projeto trivial (1-2 arquivos) — overhead desnecessário

---

## 🎬 Como invocar

```text
/init
```

Sem argumentos. O Claude vai:

1. Inspecionar a estrutura do projeto
2. Identificar linguagens, frameworks, ferramentas
3. Procurar `package.json`, `Cargo.toml`, `requirements.txt`, etc.
4. Gerar o `CLAUDE.md` com seções padrão

---

## 📋 Estrutura típica do CLAUDE.md gerado

```markdown
# Project Name

## Overview
Breve descrição do que o projeto faz.

## Tech Stack
- Linguagem(ns)
- Framework(s)
- Banco de dados

## Common Commands
- `npm run dev` — start dev server
- `npm test` — run tests

## Project Structure
src/
  components/
  ...

## Conventions
Padrões de código identificados.
```

---

## 🧪 Teste prático

1. Vá num projeto que você tem (qualquer um)
2. Digite `/init`
3. Confira o `CLAUDE.md` gerado
4. Ajuste o que faltou

> 📝 Registre suas impressões no [diário](../../diario/).

---

## ⚠️ Cuidados

- Se o projeto for **muito grande**, a primeira passagem pode levar tempo
- O `CLAUDE.md` é um ponto de **partida** — você deve editar e melhorar
- Não commite informações sensíveis (chaves, senhas) no arquivo

---

## 🔗 Veja também

- [O que é CLAUDE.md](../00-comece-aqui/glossario.md#-settingsjson)
- [Configuração geral](../04-configuracao/README.md)
