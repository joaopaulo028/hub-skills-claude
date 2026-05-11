# 🔐 /security-review — Análise de Segurança

![Categoria](https://img.shields.io/badge/categoria-seguran%C3%A7a-red) ![Dificuldade](https://img.shields.io/badge/dificuldade-f%C3%A1cil-green)

> 🎯 Revisa as mudanças pendentes da branch atual buscando especificamente **vulnerabilidades de segurança**.

---

## 💡 Quando usar

- ✅ Antes de mergear código que toca em **autenticação, autorização, dados sensíveis**
- ✅ Mudanças em endpoints públicos da API
- ✅ Adicionou nova dependência e quer auditar o impacto

## 🎬 Como invocar

```text
/security-review
```

---

## 🛡️ Cobertura típica (OWASP Top 10 e além)

- 💉 **Injection** (SQL, NoSQL, command, LDAP)
- 🔓 **Broken access control**
- 🆔 **Identification/auth failures**
- 🔑 **Secrets vazados** (chaves, tokens, senhas)
- 🌐 **SSRF, XSS, CSRF**
- 📦 **Dependências vulneráveis**
- 🗝️ **Criptografia mal usada**

---

## ⚠️ Limitações

- É **estática**: olha o código, não roda exploits
- Não substitui **pentest** profissional
- Pode ter falsos positivos — sempre valide

---

## 🔗 Veja também

- [/review](./review.md) — revisão geral
