# Otimiza — fechamento institucional e auditoria global

Concluído em 22/09/2026, para revisão do usuário. Núcleo institucional com doze páginas de conteúdo, mais 404. Sem blog, artigos, analytics, banner de cookies ou deploy.

## Páginas criadas

- **`/perguntas-frequentes`:** 29 perguntas em seis categorias, índice por âncoras, accordions nativos `details`/`summary` e 13 links para páginas/âncoras de aprofundamento. Funciona sem JavaScript; não inclui FAQPage schema nem promessa de rich result.
- **`/contato`:** prioridade de WhatsApp, Instagram oficial, atendimento online e links para Serviços/FAQ/Privacidade. Sem formulário, mapa, endereço ou horário presumido. E-mail, telefone e horário só aparecem se confirmados na configuração.
- **`/politica-de-privacidade`:** texto coerente com os recursos existentes, canais externos, cookies/analytics ausentes no código, direitos gerais, contato e atualizações. Registros de hospedagem são descritos condicionalmente; validação final da empresa permanece pendente.

Reutilizados BaseLayout, InternalHero, Breadcrumbs, FAQ, CTASection e a utility de WhatsApp. FAQ recebeu IDs configuráveis e link opcional por resposta; os usos anteriores mantêm o mesmo conteúdo e aparência. Navegação compartilhada centralizada em `src/data/navigation.ts`.

## Escopo auditado

`/`, `/sobre`, `/servicos`, `/servicos/contabilidade-empresarial`, `/servicos/fiscal-e-tributario`, `/servicos/planejamento-tributario`, `/servicos/departamento-pessoal`, `/servicos/abertura-de-empresa`, `/servicos/troca-de-contador`, `/perguntas-frequentes`, `/contato` e `/politica-de-privacidade`.

O crawler verificou todos os links dessas páginas, incluindo **62 destinos locais distintos com suas âncoras**. Nenhum destino interno resultou em 404; nenhum `href` vazio ou igual a `#`; nenhum ID duplicado. Links externos foram conferidos quanto a destino e configuração, sem envio de mensagens.

Evidência por página: [inventario-global.json](inventario-global.json), com title, description, headings, tipos de schema, links e CTAs.

## Problemas encontrados e ajustes

- **Navegação incompleta para o novo núcleo:** o Header agora oferece Sobre, Serviços, Perguntas frequentes e Contato. A marca abre Início; o menu mobile também contém esse destino explicitamente. “Dúvidas” antes apontava à FAQ da Home; agora a navegação global aponta à nova página. “Como trabalhamos” foi simplificado para “Sobre”.
- **Rodapé sem destinos institucionais:** adicionados Sobre, Serviços, FAQ, Contato e Política de Privacidade, preservando marca, Instagram e contato. Não foi transformado em mega-footer.
- **Ausência de estado ativo:** links do Header indicam página atual; Serviços indica a seção nas páginas específicas. Foco/Escape preservados. Menu em viewport curto ganhou área rolável; o breakpoint desktop permanece em 1200 px. Entre 1200–1399 px, assinatura e gap foram ajustados para acomodar os destinos sem colisão.
- **CTA genérico inconsistente:** Header passou de “Vamos conversar” para “Falar com um especialista”. Mensagens e labels dos serviços permanecem contextuais.
- **404 pouco útil:** H1 agora é “Esta página não foi encontrada.” e há links para Início, Serviços e Contato. O status HTTP segue 404 e a indexação continua bloqueada.
- **Domínio liberava indexação sozinho:** corrigido. Agora `business.indexingEnabled` deve ser verdadeiro, além de existir domínio válido. `PUBLIC_INDEXING_ENABLED=false` é o padrão documentado; robots e metadados obedecem à mesma condição.
- **Referências de organização:** schemas de serviços passaram a referenciar o mesmo `@id` da organização, inclusive sem domínio. A entidade principal mantém seus dois tipos (`Organization`/`AccountingService`), sem entidades contraditórias ou dados inventados.
- **Copy de Contato:** removida a repetição imediata de “o que sua empresa precisa” no apoio do Hero. Não houve reescrita das páginas aprovadas apenas para variar palavras.

A verificação de configuração inicialmente assumiu a mensagem curta do cadastro para Planejamento. A inspeção confirmou que essa página já usa `taxMessage`, uma mensagem específica aprovada; o teste passou a respeitar esse contrato, sem alterar a copy da página.

## Jornadas e CTAs

As seis jornadas solicitadas passaram: Home → Planejamento → contato; Home → Serviços → Abertura → contato; Home → Troca → FAQ relacionada → contato; Sobre → Serviços → serviço; FAQ → serviço relacionado; todas as doze páginas → Contato.

Sem número, os CTAs mantêm o fallback local de contato com o Instagram oficial, sem gerar `wa.me`. Com número configurado, todos usam `business.whatsapp` por meio da utility existente; nenhum componente contém telefone fixo.

O inventário do build de revisão inclui **63 ocorrências de CTAs** com texto, posição e destino. O [inventário de configuração](configuracao-validada.json) registra **76 links de WhatsApp** no build temporário, com label, posição, mensagem e destino: a diferença inclui os links condicionais dos doze rodapés e o card de Contato. Cada serviço mantém seus três pontos contextuais — Hero, encerramento e barra mobile — incluindo a mensagem própria de Planejamento. Header e pontos genéricos usam a mensagem geral. Nenhuma mensagem foi enviada.

Relacionados continuam limitados a dois ou três serviços, com pertinência por tema. Os links do corpo complementam esses blocos; Departamento Pessoal e Troca não apontam automaticamente todos para Planejamento.

## SEO on-page e configuração

- Doze titles e doze descriptions exclusivos, coerentes com o conteúdo.
- Um H1 por página; hierarquia sem saltos e landmarks principais únicos.
- Breadcrumbs nas internas, `BreadcrumbList` correspondente, Open Graph e referências por rota.
- `ContactPage` em Contato, `WebPage` em FAQ/Privacidade; schemas existentes de Sobre/hub/serviços preservados. Sem ratings, reviews, endereço, telefone, fundador, priceRange ou equipe fictícios.
- Canonical/OG URL configuráveis, sem domínio fictício no build de revisão. O domínio não basta para liberar indexação.

O script reproduzível `scripts/qa/audit-institutional-config.mjs` executou **três cenários × doze páginas**: domínio com bloqueio, domínio com liberação explícita e liberação solicitada sem domínio. Validou canonical, robots, identidade da organização, mensagens e número único. A 404 permanece `noindex` em todos os cenários. Os builds temporários foram removidos; SHA-256 confirmou que `dist/` não foi alterado por esses testes. Evidência: [configuracao-validada.json](configuracao-validada.json).

## Consistência visual e editorial

Os sete arquivos CSS compartilhados e todas as páginas antes aprovadas permanecem idênticos por hash. As alterações de navegação e CSS local de Header/Footer são as autorizadas nesta etapa; os componentes novos usam Manrope, tokens e superfícies existentes. [Preservação por arquivo](preservacao.json).

Inspeção das capturas verificou Heroes, índice/categorias da FAQ, canais de Contato, leitura da Política e rodapé em mobile/desktop. Os testes cobriram 360×800, 390×844, 430×932, 768×1024 e 1440×900 nas novas páginas e em todas as internas anteriores; a Home manteve seus nove viewports. Sem overflow. Header adicionalmente medido em 1200, 1280 e 1440 px, sem colisões. Reflow com texto a 200% passou.

A revisão global contou o vocabulário indicado e buscou construções genéricas. Nenhuma ocorrência dos padrões “não se trata apenas”, “mais do que”, “em um cenário”, “é fundamental” ou “papel fundamental” foi identificada no texto principal. Repetições literais de parágrafos com pelo menos 12 palavras se restringem às seis descrições de serviços entre Home e hub. Foram preservadas por consistência do cadastro, sem substituir palavras técnicas por sinônimos artificiais. [Evidência editorial](revisao-copy.json).

A revisão independente de código e briefing terminou sem achados concretos. As questões que dependem de decisão humana estão no [registro global de conteúdo](../../planejamento/revisao-conteudo-global.md), sem lista de observações cosméticas irrelevantes.

## Build, testes e acessibilidade

- **`pnpm build`: aprovado**, 46 arquivos verificados, zero erros, avisos ou sugestões. Treze páginas HTML geradas: doze de conteúdo e 404, além de robots.
- **Unitários:** sete aprovados, cobrindo schemas e WhatsApp.
- **Navegador:** **119 testes distintos validados**. Rodada completa inicial: 118 aprovados; após o ajuste pontual de copy e inclusão do teste de colisão do Header, os 28 testes institucionais passaram novamente (27 já existentes + um novo). A suíte atual soma 91 anteriores + 28 institucionais.
- **axe:** zero violações nas seis auditorias novas e nas 18 auditorias de regressão, cobrindo Home, Sobre, hub e seis serviços em mobile/desktop. FAQ expandida e menu mobile aberto fazem parte dos checks.
- **Interações:** teclado, Escape/foco, estado ativo, menu curto rolável, FAQ sem JS, âncoras, CTAs, seis jornadas, fallback e 404 aprovados.
- **Recursos:** sem dependências ou JavaScript adicionais. JS executável: 1.314 bytes na Home/FAQ e 516 bytes em Contato/Privacidade. Sem formulário, iframe ou armazenamento persistente da aplicação nas novas páginas.

O teste inicial das novas rotas falhou com 404 antes da implementação. Todos os testes posteriores descritos passaram. A execução local de subprocessos exigiu permissão de ambiente; após essa permissão, o script de configuração concluiu normalmente.

Validação em Chromium. Safari, Firefox e dispositivos físicos não foram testados. Axe não equivale a uma certificação integral de acessibilidade.

## Lighthouse

Lighthouse 13.5.0, sobre o build estático local, mobile e desktop:

- **Home:** Performance **100**, Accessibility **100**, Best Practices **100** em ambos. LCP 1,9 s mobile / 0,4 s desktop. [Mobile](lighthouse-home-mobile.report.html) · [desktop](lighthouse-home-desktop.report.html).
- **FAQ:** **100 / 100 / 100** em ambos. LCP 1,4 s / 0,3 s. [Mobile](lighthouse-perguntas-frequentes-mobile.report.html) · [desktop](lighthouse-perguntas-frequentes-desktop.report.html).
- **Contato:** **100 / 100 / 100** em ambos. LCP 1,5 s / 0,3 s. [Mobile](lighthouse-contato-mobile.report.html) · [desktop](lighthouse-contato-desktop.report.html).

CLS 0 e TBT 0 ms nas seis medições. **SEO 66**, pelo bloqueio intencional de indexação, preservado. [Resumo JSON](lighthouse-resumo.json). Resultados de laboratório, sem alegação de métricas de campo.

## Screenshots de entrega

Capturas completas, incluindo rodapé, nos viewports solicitados:

- **FAQ:** [390×844](screenshots/perguntas-frequentes-390x844.png) · [1440×900](screenshots/perguntas-frequentes-1440x900.png).
- **Contato:** [390×844](screenshots/contato-390x844.png) · [1440×900](screenshots/contato-1440x900.png).
- **Privacidade:** [390×844](screenshots/politica-de-privacidade-390x844.png) · [1440×900](screenshots/politica-de-privacidade-1440x900.png).

A pasta também contém 360, 430, 768 px e primeira dobra em 390/1440. Capturas de regressão das páginas anteriores estão nas respectivas pastas históricas, atualizadas pela suíte.

## Pendências reais e limite da entrega

- **Conteúdo:** validação técnica dos serviços/FAQ e validação final da Política de Privacidade pela empresa.
- **Comercial:** confirmar WhatsApp, domínio, escopo e público atendido. E-mail/horário só serão exibidos se fornecidos.
- **Técnico/privacidade antes de publicação:** confirmar hospedagem, logs/retenção e canal dos titulares; manter indexação bloqueada até a liberação explícita. `business.privacyEmail` centraliza o canal específico pendente.

O núcleo institucional está implementado e auditado. Não houve avanço para blog, artigos, páginas locais, novos serviços, GA4/GTM, Search Console, cookie banner ou deploy.
