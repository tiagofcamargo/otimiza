# Otimiza — conjunto completo de serviços

Entrega de implementação e QA em 21/09/2026. Somente as cinco páginas autorizadas foram adicionadas. Home, Sobre, hub e Planejamento Tributário continuam como base visual aprovada. Nenhum deploy realizado.

## Páginas e narrativas

- **`/servicos/contabilidade-empresarial`:** qualidade dos registros; lucro versus caixa; escrituração, conciliação e demonstrações; pró-labore e distribuição; informação para decisões; seis FAQs.
- **`/servicos/fiscal-e-tributario`:** origem da apuração; conexão entre operações, documentos e informações; famílias de tributos; regime e obrigações acessórias; diagnóstico de pendências; seis FAQs.
- **`/servicos/departamento-pessoal`:** ciclo do vínculo em seis momentos; comunicação de eventos; eSocial, FGTS, INSS e obrigações; sócios e pró-labore; seis FAQs.
- **`/servicos/abertura-de-empresa`:** decisões antes do CNPJ; atividade, estrutura e condições; seção sobre CNAE; sociedade; tributação; registros e emissão de nota; rotina após a abertura; sete FAQs.
- **`/servicos/troca-de-contador`:** possibilidade de mudança; quando considerar; documentos, acessos, obrigações e pendências; fluxo conceitual em cinco etapas; diagnóstico; transferência profissional e neutra; sete FAQs.

As páginas têm intenção, conteúdo e sequência próprios. Não foram inseridas leis, alíquotas, datas universais, resultados financeiros ou dados empresariais não confirmados. O fluxo da troca é identificado como modelo conceitual, sem afirmar um processo contratual da Otimiza.

## Componentes e preservação

Reutilizados `BaseLayout`, `InternalHero`, `Breadcrumbs`, `FAQ`, `CTASection`, `WhatsAppLink`, `MobileWhatsAppCTA`, Header e Footer. Criado somente `RelatedServices`, com dois ou três destinos reais. Os poucos estilos locais de Abertura e Departamento Pessoal usam os tokens existentes. Nenhuma biblioteca, fonte, imagem ou script de navegador foi acrescentado.

Os sete arquivos CSS compartilhados, Header, Footer, Sobre e Planejamento Tributário permanecem idênticos por SHA-256. As capturas completas de Sobre e Planejamento em 390×844 e 1440×900 são idênticas pixel a pixel à baseline anterior à implementação. Header/Hero da Home também permanecem idênticos nesses dois tamanhos. Evidência: [preservacao.json](preservacao.json).

O cadastro agora publica as seis rotas de serviços. O hub ganhou links de detalhe específicos; somente Planejamento conserva o destaque visual. Nenhuma reorganização do grid ou dos estilos aprovados. JavaScript executável permanece em 1.314 bytes por página, restrito aos comportamentos já existentes de menu e barra mobile.

## Links, CTAs e SEO

Links contextuais no corpo, além da área de relacionados:

- Contabilidade → Fiscal e Planejamento.
- Fiscal → Planejamento e Contabilidade.
- Departamento Pessoal → Contabilidade e Abertura.
- Abertura → Planejamento, Contabilidade, Fiscal e Departamento Pessoal.
- Troca → Contabilidade e Fiscal.

Cada serviço usa a utility existente com sua mensagem no Hero, convite final e barra mobile. Sem número confirmado, os CTAs apontam para o contato local com Instagram oficial. Um build isolado verificou os três CTAs contextuais de cada página com configuração de teste; esse build foi removido e não alterou o `dist/` de revisão.

Titles e descriptions exclusivos, Open Graph, um H1 por página, hierarquia de headings, breadcrumbs visíveis e `BreadcrumbList`. O schema `Service` deriva nome e URL do serviço efetivamente exibido, acompanhado de `WebPage`. Canonical e `og:url` usam o domínio configurado; o teste isolado confirmou as cinco rotas, referências absolutas e indexação configurável. Evidência: [seo-contato-configuravel.json](seo-contato-configuravel.json).

Sem domínio confirmado, o build de revisão permanece com `noindex, nofollow`, sem canonical fictício e com referências relativas no schema. Não foi adicionado schema FAQ desconectado das respostas visíveis.

## Build, testes e acessibilidade

- **`pnpm build`:** aprovado. Astro verificou 40 arquivos: 0 erros, 0 avisos e 0 sugestões. Dez páginas HTML geradas, incluindo a 404, mais `robots.txt`.
- **`pnpm test`:** sete testes aprovados; schema com/sem domínio, coleção e identidade dos seis serviços, além da utility de WhatsApp.
- **`pnpm test:browser`:** 91 testes aprovados em 48,3 s. São os 48 testes anteriores mais 43 desta etapa.
- **axe:** zero violações nas dez auditorias novas, em 390 e 1440 px, com menu mobile e FAQs expandidos. As verificações anteriores também passaram.
- **Responsivo:** cinco novas rotas verificadas em 360×800, 390×844, 430×932, 768×1024 e 1440×900. Sem overflow horizontal; reflow com texto a 200% em 360 px aprovado.
- **Interações:** FAQ por teclado e sem JavaScript, fallback de contato, comportamento da barra mobile, links e âncoras locais, metadados e assets sem erros de console.
- **Inspeção visual:** Heroes das cinco páginas em 390 e 1440; lucro/caixa, tributos, ciclo do vínculo, definições/CNAE, levantamento/transição, FAQ, relacionados e encerramento. Conferência adicional de tablet e footer em 360 px. Capturas mantêm texto legível, grids sem compressão e superfícies do sistema aprovado.

Revisão independente de código e briefing concluída sem achados concretos; cobertura, links, CTAs e registro de revisão técnica conferidos.

Os testes iniciais detectaram a ausência das cinco rotas e o nome fixo de Planejamento no schema; os testes finais confirmam os contratos implementados. Testes realizados em Chromium; Safari, Firefox e dispositivos físicos não foram verificados. Axe cobre regras automatizadas e não equivale a certificação integral de acessibilidade.

## Lighthouse

Lighthouse 13.5.0 sobre build estático local, uma execução mobile e uma desktop por página:

- **Contabilidade Empresarial:** Performance 100, Accessibility 100, Best Practices 100, em ambos. Relatórios [mobile](lighthouse-contabilidade-empresarial-mobile.report.html) / [desktop](lighthouse-contabilidade-empresarial-desktop.report.html).
- **Abertura de Empresa:** Performance 100, Accessibility 100, Best Practices 100, em ambos. Relatórios [mobile](lighthouse-abertura-de-empresa-mobile.report.html) / [desktop](lighthouse-abertura-de-empresa-desktop.report.html).
- **Troca de Contador:** Performance 100, Accessibility 100, Best Practices 100, em ambos. Relatórios [mobile](lighthouse-troca-de-contador-mobile.report.html) / [desktop](lighthouse-troca-de-contador-desktop.report.html).

Nas seis medições: LCP mobile 1,4 s e desktop 0,3 s; CLS 0; TBT 0 ms. SEO 66 pelo bloqueio intencional de indexação. [Resumo JSON](lighthouse-resumo.json). São resultados de laboratório, sem declaração de métricas de campo. Fiscal e Departamento Pessoal compartilham a arquitetura e passaram por build, testes e axe; não receberam execução individual de Lighthouse, conforme o escopo solicitado.

## Revisão explícita de conteúdo

A comparação de parágrafos de `main` com pelo menos 12 palavras encontrou **zero repetições literais entre as cinco páginas**. O conteúdo de `main`, incluindo headings/FAQ/CTAs, contém aproximadamente 938 palavras em Contabilidade, 1.040 em Fiscal, 805 em Departamento Pessoal, 1.037 em Abertura e 957 em Troca. Não houve meta de volume. Evidência e sequência dos headings: [revisao-copy.json](revisao-copy.json).

A revisão editorial complementar conferiu foco, vocabulário e ordem das seções. Contabilidade parte da leitura econômica; Fiscal acompanha o caminho da operação; Departamento Pessoal organiza eventos do vínculo; Abertura trabalha decisões anteriores aos registros; Troca trata da continuidade. Repetições funcionais de navegação, rótulos e componentes são intencionais.

Temas dependentes de norma, período, localidade e escopo estão no [documento central de revisão técnica](../../planejamento/revisao-tecnica-servicos.md), com motivo, impacto e instituição oficial para futura consulta. Nenhuma marcação interna é exibida ao visitante. As [pautas futuras](../../planejamento/pautas-seo.md) contêm apenas ideias, sem artigos ou novas rotas.

## Screenshots

Capturas completas com viewport de 390×844 e 1440×900, incluindo footer:

- **Contabilidade Empresarial:** [mobile](screenshots/contabilidade-empresarial-390x844.png) / [desktop](screenshots/contabilidade-empresarial-1440x900.png).
- **Fiscal e Tributário:** [mobile](screenshots/fiscal-e-tributario-390x844.png) / [desktop](screenshots/fiscal-e-tributario-1440x900.png).
- **Departamento Pessoal:** [mobile](screenshots/departamento-pessoal-390x844.png) / [desktop](screenshots/departamento-pessoal-1440x900.png).
- **Abertura de Empresa:** [mobile](screenshots/abertura-de-empresa-390x844.png) / [desktop](screenshots/abertura-de-empresa-1440x900.png).
- **Troca de Contador:** [mobile](screenshots/troca-de-contador-390x844.png) / [desktop](screenshots/troca-de-contador-1440x900.png).

A pasta também contém outros três viewports e capturas por seção em 390/1440 para inspeção legível.

## Pendências e encerramento

Confirmar domínio e WhatsApp. A Otimiza deve revisar o conteúdo técnico e o escopo comercial antes de publicação; as pendências estão organizadas por página no documento central. A implementação das cinco rotas está encerrada para revisão do conjunto. Não foram criados blog, artigos, páginas locais, novos serviços, analytics ou deploy.
