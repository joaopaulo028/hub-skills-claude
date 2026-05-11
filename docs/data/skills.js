// Fonte de verdade do Hub. Editar este arquivo para adicionar/remover/atualizar skills.
// Carregado via <script> no index.html (não usar fetch, pra funcionar em file://).
window.SKILLS_DATA = {
  "repositorios": [
    {
      "nome": "Anthropic",
      "descricao": "Buscar padrões oficiais e exemplos confiáveis",
      "link": "https://github.com/anthropics"
    },
    {
      "nome": "Skills Directory",
      "descricao": "Explorar e descobrir novas skills",
      "link": "https://skills.sh/"
    },
    {
      "nome": "SkillsMP",
      "descricao": "Comparar opções de skills em marketplace",
      "link": "https://skillsmp.com/"
    },
    {
      "nome": "LobeHub",
      "descricao": "Exploração visual de skills",
      "link": "https://lobehub.com/skills"
    }
  ],
  "skills": [
    {
      "id": "init",
      "nome": "init",
      "tipo": "nativa",
      "status": "instalada",
      "descricao": "Inicializa um arquivo CLAUDE.md com a documentação automática do seu codebase.",
      "output": "Cria CLAUDE.md com convenções, estrutura e contexto do projeto.",
      "cases": "Repos novos, onboarding de projeto, alinhar Claude com o código existente.",
      "comoUsar": "Digite /init no Claude Code. Ele explora o repo e propõe o conteúdo do CLAUDE.md.",
      "fonte": "Claude Code (nativa)",
      "linkRepo": null
    },
    {
      "id": "review",
      "nome": "review",
      "tipo": "nativa",
      "status": "instalada",
      "descricao": "Revisa um pull request com análise crítica do diff e sugestões de melhoria.",
      "output": "Análise estruturada do PR com pontos fortes, problemas e sugestões.",
      "cases": "Antes de aprovar/mergear PRs, revisar código de outros desenvolvedores.",
      "comoUsar": "Digite /review no Claude Code dentro do branch do PR.",
      "fonte": "Claude Code (nativa)",
      "linkRepo": null
    },
    {
      "id": "simplify",
      "nome": "simplify",
      "tipo": "nativa",
      "status": "instalada",
      "descricao": "Revisa código alterado buscando reuso, qualidade e eficiência, e aplica correções.",
      "output": "Refatoração do código com simplificações aplicadas.",
      "cases": "Após escrever código novo, antes de commitar, reduzir complexidade.",
      "comoUsar": "Digite /simplify no Claude Code com o código que quer simplificar.",
      "fonte": "Claude Code (nativa)",
      "linkRepo": null
    },
    {
      "id": "schedule",
      "nome": "schedule",
      "tipo": "nativa",
      "status": "instalada",
      "descricao": "Cria, edita e gerencia agentes remotos que rodam em cron schedule.",
      "output": "Routine agendada que executa em horários definidos.",
      "cases": "Tarefas recorrentes (relatórios diários, monitoramento, lembretes).",
      "comoUsar": "Digite /schedule e descreva a tarefa + frequência.",
      "fonte": "Claude Code (nativa)",
      "linkRepo": null
    },
    {
      "id": "loop",
      "nome": "loop",
      "tipo": "nativa",
      "status": "instalada",
      "descricao": "Roda um prompt ou slash command em intervalo recorrente até você parar.",
      "output": "Execução contínua de uma tarefa em loop.",
      "cases": "Polling de status, monitorar deploys, watch de PRs.",
      "comoUsar": "Digite /loop 5m /seu-comando (ou só /loop pra modo dinâmico).",
      "fonte": "Claude Code (nativa)",
      "linkRepo": null
    },
    {
      "id": "security-review",
      "nome": "security-review",
      "tipo": "nativa",
      "status": "instalada",
      "descricao": "Faz uma revisão de segurança completa nas mudanças do branch atual.",
      "output": "Relatório de vulnerabilidades, riscos e recomendações.",
      "cases": "Antes de mergear código sensível, auditar features de auth/dados.",
      "comoUsar": "Digite /security-review no branch que quer revisar.",
      "fonte": "Claude Code (nativa)",
      "linkRepo": null
    },
    {
      "id": "fewer-permission-prompts",
      "nome": "fewer-permission-prompts",
      "tipo": "nativa",
      "status": "instalada",
      "descricao": "Escaneia transcripts e adiciona allowlist no settings.json para reduzir permission prompts.",
      "output": "settings.json atualizado com permissões priorizadas.",
      "cases": "Reduzir interrupções durante o uso diário do Claude Code.",
      "comoUsar": "Digite /fewer-permission-prompts e revise as sugestões.",
      "fonte": "Claude Code (nativa)",
      "linkRepo": null
    },
    {
      "id": "claude-api",
      "nome": "claude-api",
      "tipo": "nativa",
      "status": "instalada",
      "descricao": "Auxilia em apps que usam Claude API / Anthropic SDK — caching, tool use, migrations.",
      "output": "Código integrado com Claude API e melhores práticas aplicadas.",
      "cases": "Construir apps com Claude, migrar entre versões de modelo, otimizar caching.",
      "comoUsar": "Use no contexto de projetos que importam anthropic / @anthropic-ai/sdk.",
      "fonte": "Claude Code (nativa)",
      "linkRepo": null
    },
    {
      "id": "update-config",
      "nome": "update-config",
      "tipo": "nativa",
      "status": "instalada",
      "descricao": "Configura o Claude Code via settings.json (hooks, permissões, env vars).",
      "output": "settings.json atualizado conforme o pedido.",
      "cases": "Adicionar hooks automáticos, configurar permissões, ajustar env vars.",
      "comoUsar": "Peça em linguagem natural ('allow npm commands', 'when claude stops show X').",
      "fonte": "Claude Code (nativa)",
      "linkRepo": null
    },
    {
      "id": "keybindings-help",
      "nome": "keybindings-help",
      "tipo": "nativa",
      "status": "instalada",
      "descricao": "Customiza atalhos de teclado e modifica ~/.claude/keybindings.json.",
      "output": "keybindings.json atualizado com atalhos personalizados.",
      "cases": "Rebind de teclas, criar chord shortcuts, mudar tecla de submit.",
      "comoUsar": "Peça em linguagem natural ('rebind ctrl+s', 'change submit key').",
      "fonte": "Claude Code (nativa)",
      "linkRepo": null
    },
    {
      "id": "superpowers",
      "nome": "superpowers",
      "tipo": "plugin",
      "status": "instalada",
      "descricao": "Plugin que traz 14 skills de metodologia: brainstorming, TDD, debugging sistemático, plan/execute, code review.",
      "output": "Workflow completo brainstorming → plano → TDD → debug → review → merge.",
      "cases": "Qualquer trabalho de desenvolvimento sério; quer disciplina e qualidade.",
      "comoUsar": "Já instalado. Use /superpowers:brainstorming, /superpowers:writing-plans, etc.",
      "fonte": "claude-plugins-official (Anthropic)",
      "linkRepo": "https://github.com/anthropics/claude-plugins-official",
      "subskills": [
        "using-superpowers",
        "brainstorming",
        "writing-plans",
        "writing-skills",
        "test-driven-development",
        "systematic-debugging",
        "subagent-driven-development",
        "verification-before-completion",
        "requesting-code-review",
        "receiving-code-review",
        "executing-plans",
        "dispatching-parallel-agents",
        "finishing-a-development-branch",
        "using-git-worktrees"
      ],
      "versao": "5.1.0"
    },
    {
      "id": "gsd",
      "nome": "GSD (Get Shit Done)",
      "tipo": "customizada",
      "status": "instalada",
      "descricao": "Conjunto de 65 skills para gerenciamento de projetos, fases, planos e execução em ciclo rígido.",
      "output": "Workflow estruturado: roadmap → milestones → phases → plans → execute → verify → ship.",
      "cases": "Projetos longos com múltiplas fases, quer atomic commits e rastreamento granular.",
      "comoUsar": "Já instalado. Use /gsd-help pra ver todos os comandos disponíveis.",
      "fonte": "Custom (~/.claude/skills/gsd-*)",
      "linkRepo": null,
      "subskills": [
        "gsd-help",
        "gsd-new-project",
        "gsd-new-milestone",
        "gsd-discuss-phase",
        "gsd-plan-phase",
        "gsd-execute-phase",
        "gsd-verify-work",
        "gsd-ship",
        "gsd-debug",
        "gsd-code-review"
      ],
      "subskillsMore": 55
    }
  ]
}
;
