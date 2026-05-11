# ✨ Boas Práticas

> 🎯 O que separa uma Skill **amadora** de uma **profissional**.

---

## 🎯 1. Uma Skill = Uma responsabilidade

✅ **Bom**: `revisar-pr`, `formatar-changelog`, `escrever-commit`
❌ **Ruim**: `dev-tools` (faz mil coisas)

> Se você não consegue descrever em **uma frase**, divida em duas Skills.

---

## 📝 2. Description é o "porteiro"

A `description` é lida toda hora pelo Claude para decidir se invoca. Inclua:

- **O que faz** (verbo + objeto)
- **Quando usar** (gatilho explícito)
- **Quando NÃO** (se houver confusão comum)

```yaml
description: |
  Gera changelog em formato Keep-A-Changelog a partir dos commits desde
  a última tag. Usar quando o usuário pedir "gera o changelog" ou
  "atualiza o changelog". NÃO usar para release notes públicas.
```

---

## 🔢 3. Use listas numeradas para passos

O Claude segue listas numeradas com mais precisão que parágrafos.

✅ **Bom**:
```markdown
1. Leia o package.json
2. Identifique a versão atual
3. Sugira a próxima usando semver
```

❌ **Ruim**:
```markdown
Você deve ler o package.json e olhar a versão para sugerir a próxima
usando semver, lembrando de considerar breaking changes.
```

---

## 🎁 4. Inclua exemplos

Pelo menos **um exemplo** de entrada e saída. Vale mais que 10 linhas de instrução.

```markdown
## Exemplo
**Entrada**: feat(auth): add OAuth2 login
**Saída**: ## [Unreleased]\n### Added\n- OAuth2 login support
```

---

## 🚫 5. Diga o que NÃO fazer

Limites explícitos > limites implícitos.

```markdown
## NÃO faça
- ❌ Não modifique arquivos fora de `src/`
- ❌ Não rode `git push`
- ❌ Não invente APIs que não estão na documentação
```

---

## 🌍 6. Idioma consistente

Se o uso é em PT, escreva o `SKILL.md` em PT. Se em EN, em EN. Misturar gera respostas misturadas.

---

## 📏 7. Curto > Longo

Skill com 2000 palavras = sinal de problema. Considere:

- Dividir em sub-skills
- Mover detalhes para arquivos referenciados
- Confiar mais no Claude e instruir menos

> 💡 Regra prática: **se cabe em 1 tela, está no tamanho certo**.

---

## 🔁 8. Itere com uso real

Versão 1 nunca é a final. Use a skill por uma semana, anote o que incomoda, edite. Repita.

```text
v1 → testa → anota fricção → edita → v2 → ...
```

---

## 🔐 9. Permissões mínimas

Se a skill **não precisa** mexer no shell, use `allowed-tools` para restringir. Reduz superfície de risco.

```yaml
allowed-tools:
  - Read
  - Edit
```

---

## 📋 10. Documente para você mesmo do futuro

3 meses depois você vai esquecer por que criou a skill. Inclua no corpo:

```markdown
## Por que existe
Criei depois de gastar 30 min toda sexta escrevendo o mesmo email de
status. Agora `/status-sexta` resolve em 1 min.
```

---

## ✅ Checklist final

Antes de "publicar" uma Skill nos seus exemplos:

- [ ] Faz **uma** coisa só
- [ ] `description` tem o gatilho explícito
- [ ] Tem passos numerados
- [ ] Tem pelo menos 1 exemplo
- [ ] Lista o que NÃO fazer
- [ ] Cabe numa tela
- [ ] Você usou ela pelo menos 3 vezes na prática

---

## 🧭 Próximo passo

👉 [04 — Configuração do harness](../04-configuracao/README.md)
