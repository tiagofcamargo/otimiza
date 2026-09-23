# Otimiza — Sobre, Serviços e Planejamento Tributário

Entrega para revisão em 21/09/2026. Implementadas somente as três páginas autorizadas, mantendo a Home como referência visual oficial. Nenhuma publicação ou outra página de serviço foi criada.

## Páginas e conteúdo

- **`/sobre`:** posicionamento institucional, princípios em composição editorial, conhecimento aplicado ao negócio, proximidade e operação online. Sem história empresarial, estrutura física ou profissionais inventados.
- **`/servicos`:** navegação por seis necessidades, explicação de cada serviço com situação de uso e conexão entre as áreas. Planejamento abre sua página; os demais serviços mantêm conversa contextual, sem links para páginas inexistentes.
- **`/servicos/planejamento-tributario`:** critérios agrupados, legalidade, introdução aos três regimes, modelo conceitual de cinco etapas, sinais de revisão, consequências, exemplo sem números e sete respostas de FAQ. Sem promessa de economia, prazos legais, alíquotas ou regime universalmente recomendado.

Conteúdo conceitual, sem pesquisa externa nesta etapa, conforme solicitado. Comentários de revisão técnica ficam no código e no [registro editorial interno](../../planejamento/revisao-tecnica-internas.md), fora do HTML renderizado. O fluxo de análise é explicitamente um modelo didático, sem afirmar que representa o processo operacional atual da Otimiza.

## Sistema visual e componentes

Componentes novos: `InternalHero`, `Breadcrumbs`, `ServiceCard`, `CTASection`, `FAQ` e `TeamSection`. Usam os tokens, Manrope, raios, botões e superfícies existentes. O CSS das composições internas é carregado pelas novas páginas. Nenhuma imagem nova, dependência ou lógica adicional de navegador foi introduzida.

`TeamSection` recebe `src/data/team.ts`, atualmente vazio. Não existe seção, título ou card de equipe no HTML. Nenhum schema `Person` foi criado.

Header, Footer e barra mobile são reutilizados. A barra mantém a regra de aparecer após o CTA inicial e desaparecer junto ao menu ou ao alcançar o encerramento. Planejamento usa mensagem contextual. Sem WhatsApp confirmado, as internas levam ao próprio footer com Instagram oficial.

## Preservação da Home

- Todos os seis arquivos CSS anteriores permanecem idênticos por SHA-256, incluindo tokens, tipografia, Header/Hero e demais seções.
- Footer idêntico por hash; nove PNGs oficiais intactos.
- Capturas do Header/Hero em 390×844 e 1440×900 comparadas com a baseline anterior: nenhuma diferença de pixels.
- Alterações de navegação: Serviços no Header e no link secundário do Hero abre o hub; Como trabalhamos no Header abre Sobre; o título de Planejamento Tributário no card da Home passa a ser um link mantendo a aparência. Os CTAs comerciais existentes permanecem.

Evidência: [preservacao-home.json](preservacao-home.json).

## SEO e navegação

Titles e descriptions únicos, Open Graph, um H1 por página, hierarquia de headings e breadcrumbs visíveis. Schema inclui `AboutPage`, `CollectionPage` com `ItemList`, `WebPage`/`Service` para planejamento e `BreadcrumbList` nas três internas, além da organização existente. A coleção só atribui URL de detalhe ao serviço efetivamente publicado.

Canonical e `og:url` dependem de `PUBLIC_SITE_URL`. Sem domínio, são omitidos e as referências do schema permanecem relativas; `noindex, nofollow` continua ativo. Com domínio, referências se tornam absolutas e a indexação é liberada pela configuração existente. Um build isolado com origem reservada de teste confirmou canonical, OG e indexação nas três páginas, sem alterar `dist/`; o artefato temporário foi removido. Veja [seo-configuravel.json](seo-configuravel.json).

As URLs funcionam com e sem barra final. Canonical das internas é normalizado sem barra. Links e âncoras foram verificados em todas as quatro páginas, sem destinos locais inexistentes.

## Build, testes e acessibilidade

- **`pnpm build`:** 32 arquivos verificados, 0 erros, 0 avisos e 0 sugestões. Cinco páginas HTML: quatro de conteúdo e 404, além de `robots.txt`.
- **`pnpm test`:** 6 testes aprovados, incluindo schema com/sem domínio e WhatsApp.
- **`pnpm test:browser`:** 48 testes aprovados em 26,0 s: 22 da Home e 26 das internas.
- **axe:** nenhuma violação nas regras WCAG automatizadas executadas em 390 e 1440 px nas três páginas, incluindo navegação/FAQ abertos. Home mantém suas verificações.
- **Responsivo:** 360×800, 390×844, 430×932, 768×1024 e 1440×900 nas internas, sem overflow horizontal. Reflow a 200% em 360 px passou. A Home mantém nove viewports.
- **Interações:** teclado/Escape/foco, FAQ nativo sem JavaScript, navegação por necessidade, breadcrumbs, fallback local, barra mobile e assets sem erros de console.
- **Revisão independente:** concluída. Apontamentos de foco no card laranja e quebra dos números foram corrigidos e conferidos; nenhum achado pendente nessa revisão.

O teste inicial detectou rotas ausentes. Durante QA, a restrição antiga de barra final foi ajustada, um texto no fundo escuro recebeu a cor correta e os números 01–05 ganharam proteção contra quebra, com teste de regressão. O foco no card laranja de Sobre usa o tom escuro aprovado. Todas as correções passaram pela rodada final de testes e capturas.

A [inspeção interativa](inspecao-interativa.json) registra HTTP 200 com barra final e foco visível de 2 px no card laranja. Testes em Chromium; dispositivos físicos, Safari e Firefox não foram validados. Axe não constitui certificação integral de WCAG.

## Lighthouse

Lighthouse 13.5.0 sobre o build estático local, uma execução mobile e uma desktop por página:

- **Sobre:** Performance **100**, Accessibility **100**, Best Practices **100**, em ambos. LCP mobile **1,4 s**, desktop **0,3 s**; CLS **0**, TBT **0 ms**.
- **Serviços:** Performance **100**, Accessibility **100**, Best Practices **100**, em ambos. LCP mobile **1,4 s**, desktop **0,3 s**; CLS **0**, TBT **0 ms**.
- **Planejamento Tributário:** Performance **100**, Accessibility **100**, Best Practices **100**, em ambos. LCP mobile **1,4 s**, desktop **0,3 s**; CLS **0**, TBT **0 ms**.
- **SEO: 66** nas seis medições, devido ao bloqueio intencional de indexação enquanto o domínio está pendente.

Relatórios: Sobre [mobile](lighthouse-sobre-mobile.report.html) / [desktop](lighthouse-sobre-desktop.report.html); Serviços [mobile](lighthouse-servicos-mobile.report.html) / [desktop](lighthouse-servicos-desktop.report.html); Planejamento [mobile](lighthouse-planejamento-tributario-mobile.report.html) / [desktop](lighthouse-planejamento-tributario-desktop.report.html). JSONs correspondentes na mesma pasta. São medições de laboratório, sem declaração de INP de campo.

JavaScript executável: 1.314 bytes, restrito ao menu e à barra mobile. Sem biblioteca de UI, framework de hidratação ou recurso remoto em runtime.

## Screenshots de entrega

- **Sobre:** [390×844](screenshots/sobre-390x844.png) e [1440×900](screenshots/sobre-1440x900.png).
- **Serviços:** [390×844](screenshots/servicos-390x844.png) e [1440×900](screenshots/servicos-1440x900.png).
- **Planejamento Tributário:** [390×844](screenshots/planejamento-tributario-390x844.png) e [1440×900](screenshots/planejamento-tributario-1440x900.png).

Capturas completas incluem footer. A pasta contém também primeira dobra, seções individuais, outros viewports e estados de foco/FAQ para inspeção em escala legível.

## Pendências e limite desta etapa

Confirmar domínio e WhatsApp. Validar tecnicamente resumos dos regimes, condições/créditos, legalidade, mudança de regime e distinção entre planejamento e revisão fiscal. Confirmar a redação de escopo comercial e a adequação do modelo conceitual com a Otimiza. Detalhes no [registro de revisão técnica](../../planejamento/revisao-tecnica-internas.md).

As três páginas estão prontas para revisão do usuário. A página piloto depende dessa aprovação antes de orientar os demais serviços. Nenhum dos outros cinco serviços, blog ou artigo foi implementado. Nenhum deploy realizado.
