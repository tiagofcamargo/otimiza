# Home Otimiza — entrega para revisão

Validação realizada em 20/09/2026. Escopo: Home completa, estrutura global e 404 básica. Sem páginas de serviços, Sobre, Contato, blog, analytics ou deploy.

## Implementação e decisões visuais

Astro estático, TypeScript strict e CSS próprio. A narrativa segue a ordem aprovada: Hero, faixa institucional, decisões, seis serviços, método, planejamento tributário, troca de contador, FAQ e convite final.

Barlow Condensed 600/700 nos títulos e Exo 2 400–600 no corpo/interface, em WOFF2 local. Fundo claro, divisórias, listas editoriais e espaço negativo; planejamento tributário e encerramento escuros. Laranja oficial com texto preto nos botões; amarelo pontual. Nenhuma grade de seis cards, carrossel ou biblioteca de interface.

Assinatura horizontal preta no desktop, símbolo oficial no mobile e assinatura horizontal branca no footer. O teste de redução mostrou o slogan pequeno demais no header de 360–390 px; o símbolo preserva a identidade sem reconstruir a assinatura. [Comparação em tamanhos pequenos](brand-size-check.png). Os nove originais foram comparados por SHA-256 com o inventário: 9/9 intactos.

Uma ilustração editorial conceitual no Hero, produzida com `image_gen`, exportada em AVIF/WebP 360/560/800 px. Não representa pessoas, sede ou equipe real. [Proveniência e licenças](../assets/proveniencia.md) e [prompt utilizado](../assets/ilustracao-prompt.txt).

## Arquivos principais

- [Home](../../src/pages/index.astro): conteúdo e composição das seções.
- [Layout global](../../src/layouts/BaseLayout.astro): fontes, metadados e dados estruturados.
- [Estilos](../../src/styles/global.css) e [tokens](../../src/styles/tokens.css): composição e identidade visual.
- [Configuração da empresa](../../src/data/business.ts), [serviços](../../src/data/services.ts) e [WhatsApp](../../src/utils/whatsapp.ts).
- [Barra mobile](../../src/components/MobileWhatsAppCTA.astro) e [header/menu](../../src/components/Header.astro).
- [README](../../README.md): instalação, comandos, configuração e preparação para hospedagem.

## Build e testes

- `pnpm build`: concluído; Astro/TypeScript verificaram 17 arquivos com 0 erros, 0 avisos e 0 sugestões. Saída estática em `dist/`.
- `pnpm test`: 3 testes aprovados — número ausente, formatos inválidos e mensagem codificada para número válido.
- `pnpm test:browser`: 20 testes aprovados no Chromium, em 7,5 s.
- `pnpm peers check`: nenhuma incompatibilidade de peer dependencies.
- Axe: nenhuma violação nas regras WCAG automatizadas executadas em 390 e 1440 px, incluindo navegação/FAQ expandidos. Isso não equivale a certificação integral de acessibilidade.

Cobertura: nove viewports, fontes e imagens carregadas, console, ausência de overflow, links locais/404, um H1, metadados, foco/teclado/Escape, FAQ, comportamento da barra móvel e uso sem JavaScript. Também foram verificados texto ampliado a 200% em 320 px e salto por âncora em uma tela de apenas 400 px de altura.

Os tamanhos registrados são 360×800, 375×812, 390×844, 430×932, 768×1024, 1024×900, 1280×900, 1440×900 e 1920×1080. Houve inspeção visual das cinco dimensões prioritárias do briefing, além de recortes das seções e dos estados móveis.

## Lighthouse

Lighthouse 13.5.0 sobre o build estático servido localmente, no Chromium headless. Três execuções mobile e uma desktop, sem testes de navegador concorrentes.

- **Mobile, nas três amostras:** Performance 100, Accessibility 100, Best Practices 100, SEO 66. LCP entre 1,802 e 1,804 s (mediana 1,803 s); CLS 0; TBT 0 ms.
- **Desktop:** Performance 100, Accessibility 100, Best Practices 100, SEO 66. LCP 0,382 s; CLS 0; TBT 0 ms.
- **SEO 66:** a auditoria de indexação reprova porque `noindex` e `robots.txt` bloqueiam rastreamento enquanto o domínio definitivo está ausente. Não foi inventado domínio para aumentar a nota. A meta de SEO 100 precisa ser revalidada após configurar o domínio real.
- O LCP mobile atende ao limite de 2,5 s e fica aproximadamente em 1,8 s; o valor bruto excede em 0,003 s o alvo ideal de até 1,8 s. Nenhum INP real foi declarado: faltam dados de campo, e TBT não substitui INP.
- O relatório de rede registra somente a origem local; fontes e ilustração são servidas pelo próprio site.

Relatórios locais: [mobile 1](lighthouse-mobile-1.report.html), [mobile 2](lighthouse-mobile-2.report.html), [mobile 3](lighthouse-mobile-3.report.html) e [desktop](lighthouse-desktop.report.html). Cada HTML possui JSON correspondente. Os arquivos sem numeração `lighthouse-mobile.report.*` pertencem a uma medição anterior e não são os resultados finais.

## Problemas encontrados e corrigidos

- A barra móvel podia não aparecer após um salto por âncora quando o CTA do Hero começava abaixo de uma tela baixa. A detecção passou a considerar a posição atual no scroll, resize e retorno à página; o cenário tem teste de regressão.
- A ilustração se aproximava dos botões no tablet. A largura da área de texto/ações foi ajustada e a ausência de sobreposição foi verificada.
- O link do aviso provisório de contato tinha alvo inferior a 44 px. O alvo foi ampliado e testado.
- Texto ampliado a 200% provocava overflow em telas estreitas. Quebra de palavras e limites dos elementos flexíveis corrigiram o problema.
- A troca tardia das fontes deslocava a composição. O preload dos três arquivos efetivamente usados no primeiro trecho da Home e a reserva de espaço da ilustração estabilizaram o layout.

Não houve falha nos testes finais executados. Safari, Firefox, aparelhos físicos e leitores de tela dedicados não foram testados nesta etapa.

## Pendências reais e revisão

- **WhatsApp definitivo:** preencher `PUBLIC_WHATSAPP` apenas após confirmar número e titularidade. Enquanto ausente, os CTAs levam ao contato da Home, com aviso explícito e Instagram oficial. Não existe link `wa.me` inválido ou telefone fictício.
- **Domínio definitivo:** preencher `PUBLIC_SITE_URL` e refazer o build. Hoje canonical/URLs dependentes do domínio são omitidos e a indexação permanece bloqueada. A configuração válida ativa canonical, URLs sociais/schema e indexação.
- **Revisão da empresa:** validar o texto técnico e aprovar Home mobile/desktop, direção visual, tipografia, ilustração, UX e conversão antes de usar esta Home como referência das próximas páginas.
- **Publicação futura:** confirmar o modo de hospedagem contratado e a configuração da 404. Nenhum deploy foi realizado.

Endereço, CNPJ, CRC, equipe, avaliações e tempo de mercado não foram inventados. A Home não depende desses dados para a revisão atual.

## Screenshots

- [Home completa — 390×844](screenshots/home-390x844.png) e [Hero mobile](screenshots/hero-390x844.png).
- [Home completa — 1440×900](screenshots/home-1440x900.png) e [Hero desktop](screenshots/hero-1440x900.png).
- [360×800](screenshots/home-360x800.png), [430×932](screenshots/home-430x932.png) e [768×1024](screenshots/home-768x1024.png).
- [Menu mobile aberto](screenshots/mobile-menu-390x844.png) e [barra móvel](screenshots/mobile-bar-390x844.png).

Os demais tamanhos estão na pasta `screenshots/`. A implementação para nesta Home, aguardando a revisão solicitada.
