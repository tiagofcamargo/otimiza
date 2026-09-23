# Otimiza — Home unificada

Entrega em 21/09/2026, conforme briefing de continuação. A direção aprovada de Header e Hero foi propagada ao restante da Home. Nenhuma página interna ou publicação foi realizada.

## Visual e preservação

- **Header e Hero:** marca, composição, imagem, escala, cores e comportamento preservados. Comparação das capturas 390×844 e 1440×900 com a versão aprovada: nenhuma diferença de pixels. O markup de ambos também foi comparado por SHA-256 e permaneceu idêntico.
- **Valores:** uma composição contínua, com dois blocos amplos e um par central no desktop. No mobile, segurança e dedicação envolvem o par qualidade/agilidade. Conceitos, heading e paleta preservados.
- **Decisões:** heading amplo e quatro temas em 2×2 no desktop, com números discretos e superfícies distintas; uma coluna no mobile.
- **Serviços:** seis cards em 3 colunas no desktop, 2 no tablet e 1 no mobile. Descrições e links contextuais preservados; fundos claros com acentos suaves em dois cards.
- **Método:** números grandes, três blocos conectados por direção e deslocamento; sequência vertical no mobile.
- **Planejamento tributário:** fundo escuro, headline com amarelo, declaração em laranja e quatro critérios em composição modular.
- **Troca de contador:** superfície suave, CTA primário e processo em três blocos.
- **FAQ:** perguntas de 20–22 px, título maior e mais espaço, mantendo `details`/`summary`.
- **Encerramento/footer:** headline de maior presença, símbolo oficial em bloco laranja, assinatura branca maior e Instagram mais visível.

Manrope 400–700 é a única família carregada. Não há biblioteca visual, novo JavaScript ou nova imagem de IA. A ilustração aprovada permanece a única imagem conceitual. Os nove PNGs oficiais continuam intactos, verificados por hash.

Novos derivados da marca: `public/brand/logo-horizontal-branca-960.png` e `public/brand/simbolo-preto-320.png`, com recorte apenas da transparência excedente e redução proporcional. Nenhum redesenho, recoloração, remoção de slogan ou filtro.

## Validação

- **Build:** `pnpm build` concluído; Astro/TypeScript verificaram 18 arquivos, com 0 erros, 0 avisos e 0 sugestões.
- **Unitários:** `pnpm test`, 3 aprovados.
- **Navegador:** `pnpm test:browser`, 21 aprovados em 9,9 s. Nove viewports de 360 a 1920 px, imagens/fontes, console, links, menu, teclado/foco, FAQ, WhatsApp, ausência de JavaScript e reflow com texto a 200% em 320 px.
- **Acessibilidade:** nenhuma violação nas regras axe WCAG automatizadas executadas em mobile e desktop, incluindo menu e FAQ abertos. Não constitui certificação integral de WCAG.
- **Inspeção visual:** todas as nove áreas redesenhadas foram inspecionadas individualmente em 390 e 1440 px. Capturas integrais cobrem os demais tamanhos.
- **Marca:** 9/9 originais preservados. Header/Hero aprovados sem alteração visual nos dois tamanhos de referência.

Ao reorganizar o CSS, uma remoção de seletores de valores atingiu o bloco compartilhado de Header/Hero e foi detectada pelo build. O bloco foi restaurado antes da validação final; parser, build, testes e comparação visual passaram. Não há falha pendente nos testes executados.

## Performance

Lighthouse 13.5.0 sobre o build estático local, uma execução mobile e uma desktop:

- **Mobile:** Performance 100, Accessibility 100, Best Practices 100. LCP 1,9 s; CLS 0; TBT 0 ms.
- **Desktop:** Performance 100, Accessibility 100, Best Practices 100. LCP 0,4 s; CLS 0; TBT 0 ms.
- **SEO 66:** bloqueio intencional de indexação enquanto falta o domínio definitivo. Os metadados e a configuração existentes foram preservados.

Relatórios: [mobile](lighthouse-mobile.report.html) e [desktop](lighthouse-desktop.report.html), com JSONs correspondentes. São dados de laboratório; nenhum INP de campo foi declarado.

JavaScript do navegador: 1.314 bytes antes de compressão (767 bytes gzip), limitado ao menu e à barra mobile. CSS final: 25.546 bytes (5.476 bytes gzip). Manrope: 27.736 bytes. Nenhuma biblioteca foi adicionada.

## Screenshots para revisão

- [Home inteira — mobile 390×844](screenshots/home-390x844.png).
- [Home inteira — desktop 1440×900](screenshots/home-1440x900.png).
- [Valores — mobile](screenshots/valores-390.png) e [desktop](screenshots/valores-1440.png).
- [Decisões — mobile](screenshots/decisoes-390.png) e [desktop](screenshots/decisoes-1440.png).
- [Serviços — mobile](screenshots/servicos-390.png) e [desktop](screenshots/servicos-1440.png).
- [Método — mobile](screenshots/metodo-390.png) e [desktop](screenshots/metodo-1440.png).
- [Planejamento — mobile](screenshots/tributario-390.png) e [desktop](screenshots/tributario-1440.png).
- [Troca de contador — mobile](screenshots/transicao-390.png) e [desktop](screenshots/transicao-1440.png).
- [FAQ — mobile](screenshots/faq-390.png) e [desktop](screenshots/faq-1440.png).
- [CTA final — mobile](screenshots/encerramento-390.png) e [desktop](screenshots/encerramento-1440.png).
- [Footer — mobile](screenshots/footer-390.png) e [desktop](screenshots/footer-1440.png).

## Arquivos principais

- [Home](../../../src/pages/index.astro).
- [Estilos das seções](../../../src/styles/home-sections.css), [tokens](../../../src/styles/tokens.css) e [tipografia](../../../src/styles/typography.css).
- [Footer](../../../src/components/Footer.astro).
- [Testes de navegador](../../../tests/browser/home.spec.ts).

Número WhatsApp e domínio continuam pendentes. Os CTAs mantêm o fallback para contato/Instagram; não há dados empresariais inventados. A Home está pronta para revisão, e o trabalho para nesta etapa conforme solicitado.
