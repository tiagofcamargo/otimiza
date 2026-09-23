# Otimiza — polimento final da Home

Concluído em 21/09/2026. Rodada limitada ao acabamento da direção visual aprovada. A Home está finalizada nesta etapa; páginas internas e publicação não foram iniciadas.

## Ajustes realizados

- **Hero:** mais 16 px de respiro superior a partir de 1200 px. Composição, imagem, crop, textos e card de contexto preservados. O CTA principal continua visível na primeira dobra de 1440×900.
- **Header:** assinatura horizontal de 376 para 416 px (+10,6%); símbolo mobile de 56 para 62 px (+10,7%). Alturas mantidas em 80 px no mobile e 88 px a partir de 768 px. Navegação também conferida no limite de 1200 px.
- **Valores:** padding interno de 24 px no tablet, retornando à composição ampla a partir de 1000 px. Segurança, Qualidade, Agilidade e Dedicação preservadas.
- **Serviços:** conteúdo principal mantido em 18 px, line-height de 29,7 px; links em 16 px/24 px. Acrescentado sublinhado no hover/foco dos CTAs para reforçar sua identificação.
- **Método:** distância do heading para os cards de 48 para 40 px, altura mínima de 416 para 384 px e deslocamentos de 24/48 px no desktop. Mantidos Entender, Analisar e Orientar.
- **Planejamento tributário:** em 768–999 px, declaração laranja ocupa a largura disponível acima dos quatro critérios. Corrige palavras cortadas sem reduzir fonte; composição desktop e destaque cromático preservados.
- **Troca de contador:** superfície rosada suavizada de `#fce8e3` para `#fcf1ee`, mantendo cards brancos, conteúdo e CTA.
- **CTA final:** elemento gráfico desktop de 304 para 272 px (−10,5%), preservando a prioridade da headline.
- **Consistência:** botões de Header/Hero passam a usar os tokens existentes de altura, raio e fonte. Reserva de espaço da barra mobile acompanha sua altura real de 77 px, acrescida da safe area.

Decisões, FAQ e footer foram revisados e mantidos. Perguntas usam 20 px no mobile/tablet e 22 px no desktop; `details`/`summary`, foco visível e abertura sem animação preservados. Links, Instagram e copyright conferidos. Manrope, arte do Hero, ordem das seções e mensagens aprovadas permanecem. Nenhuma biblioteca, imagem ou JavaScript foi acrescentado. Os nove PNGs oficiais foram conferidos por SHA-256: 9/9 intactos.

## Validação final

- **`pnpm build`:** concluído; 18 arquivos verificados, 0 erros, 0 avisos e 0 sugestões.
- **`pnpm test`:** 3 testes unitários aprovados.
- **`pnpm test:browser`:** 22 testes aprovados em 12,6 s. Inclui assets/fontes, console, links, teclado, menu/Escape/foco, FAQ, barra mobile, fallback de contato, ausência de JavaScript e reflow com texto a 200% em 320 px.
- **Regressão do tablet:** o teste de palavras inteiras reproduziu a quebra antes do ajuste e passou após a correção em 768 e 1024 px.
- **axe:** nenhuma violação nas regras WCAG automatizadas executadas em 390 e 1440 px, incluindo navegação e FAQ abertos.
- **Responsividade:** sem overflow horizontal em 360×800, 375×812, 390×844, 430×932, 768×1024, 1024×900, 1280×900, 1440×900 e 1920×1080. Inspeção adicional do header em 1200×900.
- **Inspeção visual:** prioridade em 390×844; Hero, crop/card, valores, decisões, serviços, método, planejamento, transição, FAQ, encerramento e footer conferidos. Capturas adicionais cobrem as outras larguras solicitadas, menu aberto, foco do FAQ e barra fixa.

As [medidas registradas](medidas.json) documentam a tipografia, as alturas do header e a ausência de overflow. Validação em Chromium; não foram realizados testes em dispositivos físicos, Safari ou Firefox. A auditoria automatizada não constitui certificação integral de WCAG.

## Lighthouse

Lighthouse 13.5.0, build estático local, uma execução mobile e uma desktop, em 21/09/2026:

- **Mobile:** Performance **100**, Accessibility **100**, Best Practices **100**. LCP **1,9 s**, CLS **0**, TBT **0 ms**.
- **Desktop:** Performance **100**, Accessibility **100**, Best Practices **100**. LCP **0,4 s**, CLS **0**, TBT **0 ms**.
- **SEO: 66** em ambos, com indexação intencionalmente bloqueada enquanto o domínio definitivo está pendente.

Relatórios completos: [mobile](lighthouse-mobile.report.html), [desktop](lighthouse-desktop.report.html), [JSON mobile](lighthouse-mobile.report.json) e [JSON desktop](lighthouse-desktop.report.json). Metas de performance e acessibilidade de laboratório atingidas; nenhum INP de campo foi declarado.

## Capturas finais

- **[Home completa — 390×844](screenshots/home-390x844.png)** e **[1440×900](screenshots/home-1440x900.png)**.
- [Primeira dobra mobile](screenshots/hero-390x844.png) e [desktop](screenshots/hero-1440x900.png).
- [Imagem e card do Hero — mobile](screenshots/imagem-hero-390.png).
- [Serviços — mobile](screenshots/servicos-390.png) e [tablet](screenshots/servicos-768.png).
- [Planejamento — tablet 768 px](screenshots/tributario-768.png) e [1024 px](screenshots/tributario-1024.png).
- [Menu aberto](screenshots/menu-aberto-390.png), [FAQ aberto com foco](screenshots/faq-foco-aberto-390.png) e [barra fixa](screenshots/barra-fixa-390.png).
- [Header no breakpoint de 1200 px](screenshots/header-1200.png).

A pasta `screenshots/` contém também as capturas integrais dos nove viewports e todas as seções em 360, 375, 390, 430, 768, 1024 e 1440 px.

WhatsApp e domínio continuam pendentes. Os CTAs mantêm o fallback existente para contato/Instagram. O trabalho encerra nesta Home, conforme solicitado.
