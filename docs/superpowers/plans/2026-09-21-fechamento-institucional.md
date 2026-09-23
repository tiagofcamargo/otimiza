# Fechamento institucional — Implementation Plan

> Execução com superpowers:subagent-driven-development; workspace existente autorizado, sem Git utilizável. Não criar commit ou deploy. O briefing do usuário autoriza diretamente esta extensão do sistema existente.

**Goal:** completar FAQ, Contato e Privacidade, auditar as doze páginas e parar.
**Architecture:** Astro estático e componentes atuais. FAQ ganha ids configuráveis e link opcional por resposta, preservando defaults. Navegação compartilhada simples, sem scripts novos. Indexação passa a exigir liberação explícita além do domínio.
**Tech Stack:** Astro, TypeScript, CSS, Playwright/axe e Lighthouse existentes.
**Spec:** docs/planejamento/fechamento-institucional-briefing.md

## Restrições

Preservar Manrope, tokens, linguagem visual e páginas aprovadas. Alterar Header/Footer apenas para navegação e consistência autorizadas. Sem dados empresariais presumidos, formulário, analytics, banners, blog ou deploy. Privacidade curta, baseada na implementação, com validação empresarial pendente.

## Tarefas

- [x] 1. Contratos: testes para três rotas, navegação, crawling das doze páginas, jornadas, metadados, indexação, FAQ nativa, CTAs, viewport/axe. Rodar primeiro teste ausente.
- [x] 2. FAQ: extensão compatível do componente, seis categorias com âncoras e respostas curtas, links contextuais para serviços. Executor isolado nesses arquivos; nenhum arquivo compartilhado além de FAQ.
- [x] 3. Núcleo: Contato sem formulário e Privacidade sem alegações sobre recursos ausentes. Campos opcionais de contato/horário/privacidade. Schema WebPage/ContactPage; indexação explícita; Header/Footer e 404.
- [x] 4. Auditoria: percorrer doze rotas, inventariar CTAs/metadata/links, revisar copy e jornadas; ajustar somente problemas reais. Revisão independente.
- [x] 5. QA: build, suíte inteira, axe, reflow e capturas das três novas páginas; regressão Home/hub/serviço; Lighthouse Home/FAQ/Contato mobile/desktop. Fixture com domínio/WhatsApp sem contaminar dist.
- [x] 6. Documentar: relatório global, questões humanas relevantes, README e capturas. Encerrar sem próximas etapas.

## Interfaces e decisões

FAQ aceita `id` opcional (default perguntas-frequentes), `eyebrow` opcional e item `link?: {label,href}`; heading id deriva do id. BaseLayout pageKind aceita ContactPage/WebPage além dos existentes. Não adicionar FAQPage schema nesta rodada: HTML semântico e respostas visíveis são suficientes, sem inferir rich results.

Ruling: manter o fallback local de WhatsApp já testado; Contato oferece canal real secundário e link local para essa informação. Header contém Sobre, Serviços, Perguntas frequentes e Contato; logo dá acesso ao Início e menu mobile inclui Início. Evita apertar desktop e preserva breakpoints.
Ruling: `business.indexingEnabled` false por padrão, env PUBLIC_INDEXING_ENABLED=true apenas após liberação futura; domínio sozinho não libera robots.
Ruling: usar agentes existentes devido ao limite de threads da sessão. Raiz implementa integração/Contato/Privacidade; agente implementa apenas FAQ. Não há disputa por arquivos. Revisão final por outro agente.

## Verificação prévia de interfaces

- Tarefas 1/2: teste exige ids únicos e links; FAQ preserva os defaults usados pelas páginas antigas.
- Tarefas 2/3: FAQ depende de WebPage em BaseLayout; raiz acrescenta união sem alterar layout.
- Tarefas 3/4: Header/Footer compartilham lista de navegação; auditor percorre destino real das doze páginas.
- Tarefas 4/5: inventário de CTAs distingue fallback de destino final configurado; fixture verifica mensagens.
- Tarefas 5/6: relatório usa somente números reais; perguntas de negócio ficam como pendências internas.

## Registro final

22/09/2026: seis tarefas concluídas. Build: 46 arquivos sem diagnósticos; 7 unitários e 119 testes de navegador distintos aprovados (118 da suíte + 28 institucionais, sendo 27 repetidos). Axe: 24 auditorias sem violações; Lighthouse: 6 execuções com 100/100/100. Três cenários de configuração × 12 rotas e 76 CTAs validaram número, mensagens e indexação. Revisão independente sem achados. Relatório em docs/qa/auditoria-institucional/relatorio.md. Sem deploy ou expansão.
