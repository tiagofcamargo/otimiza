# Cinco serviços restantes — Implementation Plan

> Executar com superpowers:subagent-driven-development, aproveitando agentes existentes quando o limite de threads impedir novas sessões. O workspace é o projeto autorizado, sem Git utilizável; não criar branch, commit ou deploy.

**Goal:** concluir apenas Contabilidade Empresarial, Fiscal e Tributário, Departamento Pessoal, Abertura e Troca de Contador.

**Architecture:** páginas Astro próprias, reutilizando BaseLayout, InternalHero, FAQ, CTASection e os estilos internos aprovados. Um componente pequeno de serviços relacionados, sem page builder. O schema Service e os links do hub passam a atender os seis serviços.

**Tech Stack:** Astro, TypeScript strict, CSS existente, Playwright, axe, Lighthouse. Nenhuma dependência nova.

**Spec:** `docs/planejamento/servicos-restantes-briefing.md`.

## Restrições globais

Preservar Manrope, paleta, containers, Header/Footer, tokens, superfícies e comportamento mobile. Não inventar dados empresariais, resultados, legislação, prazos ou processos internos. Conteúdo conceitual com revisão técnica interna; marcações não renderizadas. Somente cinco rotas novas, sem artigos, analytics ou publicação.

## Tarefas

- [x] **1. Contratos e testes.** Criar `tests/browser/services.spec.ts`, cobrindo as cinco rotas, 360/390/430/768/1440, status, metadata, schema com nome correto, breadcrumbs, links contextuais, FAQ, CTAs, overflow e axe. Executar teste inicial antes das páginas: deve falhar por 404. Ampliar `tests/seo.test.ts` para todos os serviços e manter cobertura de página não publicada.
- [x] **2. Base compartilhada.** Generalizar `src/utils/seo.ts` para derivar nome/type do serviço da rota. Atualizar `src/data/services.ts` com páginas publicadas e labels de detalhe; corrigir `ServiceCard` para não tornar todos os cards destacados. Criar `RelatedServices.astro` (2–3 slugs, links reais) usando tokens. Não alterar os estilos aprovados.
- [x] **3. Contabilidade e Fiscal.** Páginas próprias e dados editoriais locais. Contabilidade alterna rotina, lucro/caixa, sócios e leitura de demonstrações. Fiscal organiza origem dos documentos, apuração, famílias de tributos, obrigações e diagnóstico. Links dentro do conteúdo além de relacionados; seis FAQs por página.
- [x] **4. Departamento Pessoal, Abertura e Troca.** DP enfatiza ciclo do vínculo e comunicação; Abertura estrutura as decisões anteriores e posteriores ao CNPJ; Troca responde diretamente à viabilidade e organiza a passagem de informações. Conteúdo e ordem próprios, sem clone do piloto. FAQs de 6/7/7 itens; mensagens específicas nos CTAs e barra mobile.
- [x] **5. Revisão e verificação.** Revisar requisitos e código, build, unitários, testes completos e axe. Inspecionar screenshots 390/1440 de todas as páginas e tablet/mobile menores. Lighthouse mobile/desktop em Contabilidade, Abertura e Troca. Conferir preservação por hash/pixels das páginas aprovadas.
- [x] **6. Entrega.** Documento central `docs/planejamento/revisao-tecnica-servicos.md`, com tema/motivo/impacto/fonte oficial futura; pautas sem artigos; análise explícita de duplicação; relatório QA e README. Parar nas cinco páginas.

## Interfaces

`RelatedServices` recebe `slugs: string[]` e usa o cadastro existente para renderizar no máximo três destinos publicados, sob “Você também pode precisar de”. Cada página mantém `BaseLayout pageKind="Service" mobileContact contactMessage={message}` e breadcrumbs Início → Serviços → nome. InternalHero recebe a mesma mensagem; CTASection também. FAQ recebe objetos `{question, answer}`.

## Registro de execução

Base compartilhada e páginas usam arquivos separados; apenas a raiz altera cadastro, schema e testes. O agente de conteúdo trabalha em Contabilidade/Fiscal, sem modificar arquivos comuns. A raiz implementa os outros três serviços. Revisão independente após integração. Não há conflito de arquivos entre as tarefas.

## Conclusão verificada

21/09/2026: build limpo (40 arquivos), 7 unitários e 91 testes de navegador aprovados. Dez auditorias axe novas sem violações. Lighthouse 100/100/100 nas três rotas solicitadas, mobile e desktop. Capturas, revisão de copy, preservação por hashes/pixels e fixture de SEO/CTAs concluídas. Revisão independente sem achados concretos. Entrega em `docs/qa/servicos-completos/relatorio.md`. Etapa encerrada sem deploy ou expansão de escopo.
