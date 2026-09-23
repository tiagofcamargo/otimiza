# Redesign Otimiza — primeira amostra visual

Data: 21/09/2026. Escopo entregue para aprovação: Header, Hero e primeira seção após o Hero (valores). O restante da Home não foi redesenhado. O conteúdo a partir da seção de decisões foi comparado com a versão anterior e permanece idêntico.

## Previews

- [Trecho completo em 390 px](screenshots/preview-390.png), capturado no viewport 390×844.
- [Trecho completo em 1440 px](screenshots/preview-1440.png), capturado no viewport 1440×900.
- [Primeira tela mobile](screenshots/hero-390x844.png) e [primeira tela desktop](screenshots/hero-1440x900.png).

O preview local está em http://localhost:4321. Os arquivos `home-*` mostram a página inteira para testes de regressão; somente o trecho até os valores representa a nova direção em revisão.

## Direção aplicada

- Manrope 400–700 no Header, Hero e valores. H1 de aproximadamente 45 px em 390 px e 80 px em 1440 px, com destaque no laranja oficial.
- Header de 80 px no mobile e 88 px no desktop; assinatura oficial desktop com 376 px de largura, símbolo oficial de 56 px no mobile, CTA de maior presença.
- Hero com proporção assimétrica, retrato conceitual recortado, cor de marca e bloco de contexto sobreposto. A ilustração isométrica anterior deixou de ser usada.
- Valores em quatro blocos com alternância de superfícies, cores e deslocamentos. No mobile, composição em duas colunas; em telas muito estreitas, uma coluna para preservar leitura.
- As fontes antigas continuam apenas nas seções ainda não redesenhadas. Não foi introduzida segunda família no novo recorte; a extensão de Manrope ao restante depende da aprovação solicitada.

## Assets e fontes

Manrope foi obtida do [repositório oficial Google Fonts](https://github.com/google/fonts/tree/main/ofl/manrope), reduzida ao eixo 400–700 e aos caracteres latinos/acentos/pontuação, com `font-display: swap`. Arquivo local: [`manrope-400-700.woff2`](../../../public/fonts/manrope-400-700.woff2), 27.736 bytes. [Licença OFL](../../../public/fonts/Manrope-OFL.txt) preservada. Nenhuma fonte é solicitada remotamente em runtime.

Imagem gerada com a ferramenta integrada `image_gen`: personagem fictícia analisando documentos, em colagem abstrata. Não representa integrante da Otimiza nem local de trabalho da empresa. O [prompt exato](../../assets/redesign-hero-prompt.txt) está preservado.

Assets finais em `public/illustrations/decisao-{480,800,1120}.{avif,webp}`. A [versão AVIF de 800 px](../../../public/illustrations/decisao-800.avif) tem 60.112 bytes; as variantes AVIF vão de 26.867 a 101.710 bytes. Alpha preservado, proporção 4:5, dimensões reservadas e imagem decorativa com alt vazio. Há legenda visível esclarecendo sua natureza conceitual. Os nove PNGs oficiais continuam intactos, verificados por SHA-256.

## Verificação

- `pnpm build`: Astro/TypeScript sem erros, avisos ou sugestões em 18 arquivos.
- `pnpm test`: 3 testes aprovados.
- `pnpm test:browser`: 21 testes aprovados, incluindo nove viewports, teclado, menu, WhatsApp, FAQ, texto ampliado a 200%, links, assets, metadados e uso sem JavaScript.
- Axe: nenhuma violação nas verificações WCAG automatizadas executadas em mobile/desktop.
- Revisão visual do trecho em 390 e 1440 px, além de verificação dos tamanhos intermediários.

Foram corrigidos dois problemas encontrados na revisão: o estilo genérico de botão tornava visível o CTA de desktop no mobile; e o bloco de contexto encobria a legenda da imagem. O primeiro agora tem uma verificação no teste do menu; o segundo foi reproduzido por teste antes da correção e validado em quatro larguras.

Lighthouse 13.5.0 sobre o build estático local, uma execução mobile e uma desktop:

- **Mobile:** Performance 99, Accessibility 100, Best Practices 100; LCP 2,2 s, CLS 0 e TBT 0 ms.
- **Desktop:** Performance 100, Accessibility 100, Best Practices 100; LCP 0,5 s, CLS 0 e TBT 0 ms.
- **SEO 66 em ambos:** a indexação permanece intencionalmente bloqueada até a configuração do domínio definitivo, como na versão anterior.
- A meta mobile de Performance ≥95 foi atendida. Estas são medições de laboratório; não há declaração de INP de campo nem certificação integral de WCAG.

Relatórios: [mobile](lighthouse-mobile.report.html) e [desktop](lighthouse-desktop.report.html), com JSONs correspondentes na mesma pasta.

## Arquivos alterados

- `src/components/HomeIntro.astro`: novo Hero e valores.
- `src/styles/home-intro.css`: linguagem visual do recorte e Header.
- `src/styles/global.css`: remoção dos estilos substituídos, preservando o restante.
- `src/pages/index.astro`: inclusão do novo recorte.
- `src/layouts/BaseLayout.astro`: preload de Manrope.
- `public/fonts/`, `public/illustrations/`, `tests/browser/home.spec.ts` e documentação.

Astro, utilities, configuração da empresa, SEO, JavaScript de menu/WhatsApp e assets oficiais foram preservados. WhatsApp e domínio definitivos continuam pendentes; o fallback de contato e o bloqueio de indexação permanecem ativos.

O próximo passo depende da aprovação do recorte visual pelo usuário. Nenhuma das demais seções foi redesenhada, nenhuma página interna foi criada e nenhum deploy foi realizado.
