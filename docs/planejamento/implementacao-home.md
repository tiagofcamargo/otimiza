# Plano de implementação — Home Otimiza

Direção aprovada pelo briefing de implementação recebido em 20/09/2026. Este plano organiza a execução já autorizada, sem nova rodada conceitual.

Objetivo: Home estática em Astro/TypeScript strict, CSS próprio, Barlow Condensed 600/700 e Exo 2 400/500/600 locais. Apenas Home e 404; sem páginas internas, analytics ou publicação.

## Entregas

- [x] Base e dados: `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/data/business.ts`, `src/data/services.ts`, `src/utils/whatsapp.ts`. Testar primeiro número ausente, inválido e encoding; nenhum destino fictício. `buildWhatsAppUrl(message): string | null` lê a configuração central.
- [x] Assets: derivados proporcionais das marcas oficiais, ícones 16/32/48/180/192/512, WOFF2 licenciados e uma ilustração editorial conceitual. Preservar hashes dos nove originais; guardar proveniência e licenças.
- [x] UI: tokens, reset, typography, global; `BaseLayout`, `Header`, `WhatsAppLink`, `MobileWhatsAppCTA`, `Footer`; seções da Home com copy aprovada. Menus e links funcionam sem páginas vazias; destinos futuros ficam nos dados sem serem renderizados.
- [x] Interação: navegação mobile nativa com `details`/`summary`, Escape/fechamento e foco; barra móvel aparece após passar CTA inicial e desaparece em menu/CTA final/footer. Sem JS: links e FAQ continuam úteis, barra permanece ausente.
- [x] SEO: metadados, idioma, canonical somente com domínio válido, schema com dados conhecidos, robots não indexável enquanto falta domínio. Ausência de WhatsApp leva a seção explícita de contato disponível, com Instagram oficial.
- [x] Verificação: `pnpm check`, `pnpm test`, `pnpm build`; Playwright para links, imagens/fontes, navegação, FAQ, barra, sem-JS, console, overflow e screenshots; axe; Lighthouse quando disponível. Documentar métricas reais e pendências.

## Validação visual

390×844 é a referência inicial. Capturar também 360×800, 375×812, 430×932, 768×1024, 1024×900, 1280×900, 1440×900 e 1920×1080. Inspecionar screenshots; não inferir responsividade só a partir do CSS. Alvos de 44 px, texto 18 px, H1 mobile 40–44 px, sem sobreposição de foco/conteúdo pela barra.

## Limites e entrega

Não há repositório Git utilizável neste ambiente; trabalhar na pasta compartilhada sem inicializar Git ou criar branch. Registrar comandos/testes no relatório de entrega. O número WhatsApp e o domínio continuam ausentes; não inventar. Instagram correto: `https://www.instagram.com/otimiza_assessoria/`. A proposta anterior é histórica e a especificação atual prevalece, especialmente tipografia, serviços e ausência de blog.
