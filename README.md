# Otimiza Assessoria Contábil

Site institucional estático em Astro, TypeScript strict e CSS próprio. O núcleo contém 12 páginas: Home, Sobre, hub de Serviços, seis serviços, Perguntas Frequentes, Contato e Política de Privacidade, além de 404, `robots.txt` e `sitemap.xml`. Sem formulário ou blog; analytics desativado e nenhum deploy realizado.

**Estado atual — revisão técnica e proposta de privacidade preparadas; aprovação profissional e canal de privacidade pendentes antes da publicação.** Consulte o [relatório final](docs/qa/revisao-final/relatorio.md), a [revisão técnica](docs/planejamento/revisao-tecnica-final.md), o [guia Hostinger](docs/deploy/hostinger.md) e o [checklist de go-live](docs/deploy/checklist-go-live.md).

## Executar

Use Node.js 22.x e pnpm 12.5.1. Se necessário, habilite o pnpm com `corepack enable`.

```bash
pnpm install --frozen-lockfile
pnpm dev
pnpm build
pnpm preview
```

O build executa `astro check` antes de gerar o HTML estático em `dist/`. Desenvolvimento e preview usam a porta 4321 por padrão. Em ambientes de agentes, Astro 7 pode iniciar esses servidores em segundo plano; use `pnpm exec astro preview stop` ou `pnpm exec astro dev stop` para encerrar. O preview é apenas para revisão local e recusa um build com robots liberado. Para revisão, mantenha `PUBLIC_INDEXING_ENABLED=false` e refaça o build. `pnpm start` executa o servidor estático de produção em `0.0.0.0`, porta `PORT` ou 3000, com 404 real; requer `dist/` já gerado.

## Configuração da empresa

Os dados estão em `src/data/business.ts`. O domínio confirmado é `https://otimizacontabil.com.br/`, o WhatsApp confirmado é `5511971774720` e o Instagram é `https://www.instagram.com/otimiza_assessoria/`. E-mail, razão social, telefone adicional, endereço, CNPJ, CRC, horário e canal específico de privacidade continuam ausentes até confirmação.

Copie `.env.example` para `.env` e preencha somente dados confirmados:

- `PUBLIC_WHATSAPP`: número brasileiro completo, incluindo 55 e DDD. O valor confirmado é `5511971774720`; a utility aceita pontuação de apresentação e valida o formato antes de montar o destino.
- `PUBLIC_SITE_URL`: origem HTTPS do domínio definitivo. O valor confirmado é `https://otimizacontabil.com.br/`; a configuração central normaliza a barra final. O build gera canonical, OG, schema e sitemap absolutos com essa origem. Isso não libera indexação sozinho.

- `PUBLIC_INDEXING_ENABLED`: manter `false`. Somente `true` junto de um domínio válido libera indexação; ativar apenas após aprovação de conteúdo, revisão técnica e deploy. A página 404 permanece `noindex`.

- `PUBLIC_GA_ID`: opcional, vazio por padrão. Um ID GA4 válido, em build de produção com domínio, prepara o suporte; a tag só carrega após consentimento explícito da integração futura. Veja a seção Analytics.

`business.whatsapp` e `business.siteUrl` são a fonte central. Os defaults confirmados ficam em `src/data/business.ts`; `PUBLIC_WHATSAPP` e `PUBLIC_SITE_URL`, quando definidos, sobrescrevem esses defaults no build. Refazer o build após qualquer mudança atualiza todos os CTAs, metadados e endpoints. `business.email`, `phone`, `openingHours` e `privacyEmail` são opcionais e permanecem ausentes até confirmação. A Política não designa o WhatsApp como canal jurídico de privacidade.

Estas variáveis são públicas e incorporadas no build. Refaça o build após alterações. Não colocar segredos nelas.

Com o WhatsApp confirmado, `buildWhatsAppUrl(message)` gera `https://wa.me/5511971774720?text=...` com encoding da mensagem, e todos os CTAs gerais/contextuais apontam para esse canal. Sem número válido, a utility retorna `null` e mantém o fallback seguro de contato. Nenhum CTA gera número de exemplo ou URL inválida.

Os seis serviços estão em `src/data/services.ts`. `enabled` controla a lista; `pagePublished` é verdadeiro para os seis serviços. O hub usa necessidades e situações específicas para orientar a navegação e oferece links para todas as páginas. Somente Planejamento Tributário mantém o destaque visual do grid. Cada serviço tem mensagem contextual para Hero, CTA final e barra mobile.

O conteúdo técnico conceitual fica nas páginas e em `src/data/tax-planning.ts` e `src/data/remaining-service-faq.ts`. As [pendências dos cinco serviços](docs/planejamento/revisao-tecnica-servicos.md) e a [revisão das internas anteriores](docs/planejamento/revisao-tecnica-internas.md) são internas e não aparecem no HTML publicado. Ideias futuras estão em [pautas SEO](docs/planejamento/pautas-seo.md), sem artigos implementados. `src/data/team.ts` permanece vazio; `TeamSection` não renderiza seção nem cards enquanto não houver profissionais reais com nome, cargo e biografia.

## Organização

- `src/pages/index.astro`: narrativa e conteúdo da Home.
- `src/pages/sobre.astro` e `src/pages/servicos/`: Sobre, hub e seis páginas de serviço.
- `src/pages/perguntas-frequentes.astro`: seis categorias, 29 perguntas e índice por âncoras, sem filtros JS.
- `src/pages/contato.astro`: canais oficiais, operação online e dados opcionais, sem formulário.
- `src/pages/politica-de-privacidade.astro`: recursos reais e canais externos; depende de validação final da empresa.
- `src/data/navigation.ts`: destinos compartilhados de Header/Footer.
- `src/data/general-faq.ts`: perguntas gerais e links de aprofundamento.
- `src/layouts/BaseLayout.astro`: documento HTML, fontes críticas, SEO e estrutura global.
- `src/components/`: header, footer, links comerciais, menu e barra mobile.
- `src/styles/`: tokens, reset, tipografia e estilos responsivos.
- `src/styles/internal-pages.css`: composições exclusivas das internas, sem alterar o CSS aprovado da Home.
- `src/utils/seo.ts`: breadcrumbs e schema de AboutPage, ContactPage, CollectionPage/ItemList e Service/WebPage.
- `src/data/business.ts` e `src/utils/whatsapp.ts`: configuração e geração centralizada de links.
- `public/brand/`: derivados dos PNGs oficiais, incluindo favicon 16/32/48/180/192/512.
- `public/fonts/`: Manrope variável 400–700 em WOFF2, com licença OFL. Os arquivos antigos estão preservados, mas não são usados nem carregados pela página.
- `public/illustrations/`: retrato conceitual aprovado em três resoluções AVIF/WebP. A imagem da versão inicial não é usada.
- `tests/`: testes unitários e de navegador.
- `docs/qa/`: screenshots e relatório de validação.

Os documentos de descoberta e das primeiras entregas são históricos. A direção atual aprovada usa Manrope em toda a página; o Instagram antigo não é usado no site; não existe escritório físico apresentado como real.

## Decisões de interface

Tipografia ampla, valores em composição integrada, decisões em 2×2, serviços em 3/2/1 colunas e método com números grandes. Superfícies claras, quentes e escuras criam ritmo. Planejamento tributário e encerramento usam carvão com laranja/amarelo. O botão usa laranja oficial com texto `#111111`. Sem React, Tailwind, biblioteca de UI ou recursos remotos em runtime na configuração atual; o hover discreto em CSS respeita movimento reduzido.

O header desktop usa a assinatura preta horizontal; o mobile usa o símbolo oficial porque a assinatura completa contém slogan pequeno demais em 360–390 px. Nenhum elemento da assinatura foi removido ou recomposto. O footer usa a assinatura branca horizontal. Os nove arquivos originais na raiz estão intactos.

O menu e o FAQ usam `details`/`summary`. JavaScript acrescenta fechamento com Escape/foco e a barra mobile. A barra só surge após o CTA inicial, desaparece com o menu aberto e ao alcançar o convite final/footer. As internas reutilizam esse comportamento; cada serviço usa sua mensagem de WhatsApp contextual. Sem JavaScript, a barra fica ausente e os links, menu e FAQ continuam úteis. Não há analytics nem cookies gravados pelo código do site; nenhum banner foi adicionado. A configuração real da hospedagem e eventuais logs devem ser conferidos antes da publicação.

Cada interna tem title, description, Open Graph e breadcrumbs próprios. Canonical e `og:url` só são emitidos com `PUBLIC_SITE_URL`; as referências relativas do schema se tornam absolutas com essa configuração. As rotas funcionam com e sem barra final, com canonical único sem barra nas internas. Nenhum domínio de exemplo é usado no build de revisão.

## Testes

Resultados e limitações da etapa atual estão no [relatório de pré-produção](docs/qa/pre-producao/relatorio.md); screenshots e auditorias visuais anteriores permanecem em `docs/qa/`.

```bash
pnpm test
pnpm check
pnpm build
pnpm exec playwright install chromium
pnpm test:browser
```

`test:browser` usa o build em `dist/`, inicia preview quando necessário, verifica nove larguras e salva screenshots em `docs/qa/polimento-final/screenshots/`. Inclui menu por teclado, Escape/foco, FAQ, links/404, fallback, barra móvel, texto ampliado, ausência de JavaScript, palavras inteiras nos critérios tributários em tablet e auditoria axe WCAG. Captura também cada seção em 360, 375, 390, 430, 768, 1024 e 1440 px. Após alterar código, execute novamente `pnpm build` antes do teste de navegador.

`tests/browser/internal.spec.ts` valida Sobre, Serviços e Planejamento em 360, 390, 430, 768 e 1440 px; grava capturas em `docs/qa/paginas-internas/screenshots/`, incluindo seções individuais em 390/1440. Verifica metadata, breadcrumbs, links, axe, ausência de placeholders, equipe não renderizada, FAQ, reflow a 200%, números das etapas e barra mobile. Os unitários incluem schema com e sem domínio, além do WhatsApp existente.

`tests/browser/services.spec.ts` acrescenta 43 testes das cinco novas rotas, incluindo os mesmos cinco viewports, dez auditorias axe, links contextuais, metadata/schema por serviço, FAQ, CTAs, reflow e ausência de JavaScript. As capturas completas e por seção ficam em `docs/qa/servicos-completos/screenshots/`. A suíte institucional acrescenta 28 testes. O conjunto atual tem 121 testes de navegador e 13 unitários, incluindo os testes de preparação de produção.

`tests/browser/institutional.spec.ts` audita as doze páginas, links/âncoras, metadata, CTAs, jornadas, navegação ativa, header em 1200/1280/1440, FAQ sem JS e acessibilidade das três novas rotas. Capturas ficam em `docs/qa/auditoria-institucional/screenshots/`.

`node --experimental-strip-types scripts/qa/audit-institutional-config.mjs` executa builds temporários e valida domínio sem liberação, domínio com liberação e liberação sem domínio. Confere todos os números/mensagens de WhatsApp configurados sem alterar `dist/` e remove o artefato temporário. Requer build atual e Corepack/pnpm disponíveis.

Para Lighthouse, inicie `pnpm preview` e execute:

```bash
pnpm exec lighthouse http://localhost:4321 --output=html --output-path=docs/qa/lighthouse-mobile.html
```

É necessário Chrome/Chromium disponível. Se não estiver no PATH, configure `CHROME_PATH` com o executável instalado. Lighthouse mede laboratório; não constitui declaração de INP de campo nem comprovação integral de WCAG.

## Sitemap, robots e liberação de indexação

`src/data/routes.ts` contém somente as 12 rotas de conteúdo. `src/utils/production.ts` valida a origem HTTPS e gera sitemap/robots. Sem domínio, o sitemap é um XML vazio e canonical/OG absolutos são omitidos. Com domínio confirmado, contém 12 URLs; a 404, arquivos e rotas técnicas ficam fora. A existência do sitemap não indica aprovação de publicação.

Desenvolvimento fica bloqueado mesmo se a flag for `true`. Build de revisão e produção anterior à aprovação usam `PUBLIC_INDEXING_ENABLED=false`: `noindex, nofollow` e `Disallow: /`, sem anúncio do sitemap no robots. Preview recusa artefatos com crawling liberado.

Após concluir o checklist de go-live, definir `PUBLIC_INDEXING_ENABLED=true` **junto do domínio real**, refazer o build e publicar o novo artefato. Isso remove o noindex das 12 páginas e gera `Allow: /` e o endereço do sitemap no robots. A 404 continua noindex. Conferir HTML, canonical, robots e sitemap no domínio antes de enviar ao Search Console. Para bloquear novamente, voltar a `false`, refazer o build e republicar. Nada foi liberado nesta etapa.

## Analytics opcional

Sem `PUBLIC_GA_ID`, nenhum código ou script de analytics é emitido. Desenvolvimento também o desativa. Com domínio e ID GA4 válido em build de produção, `OptionalAnalytics.astro` aguarda o evento `otimiza:analytics-consent`; apenas `{ granted: true }` carrega a tag. Recusa não faz requisição, consentimento repetido não duplica a tag e revogação desabilita medição e atualiza o consentimento.

A futura interface de consentimento deve disparar, após a escolha do visitante:

```js
window.dispatchEvent(new CustomEvent('otimiza:analytics-consent', {
  detail: { granted: true } // false para recusa/revogação
}));
```

Esse exemplo não deve ser disparado automaticamente. Antes de ativar, decidir finalidade e configuração do analytics, aprovar a atualização da Política e implementar a experiência de escolha/revogação e sua persistência. Não existe CMP, banner ou persistência de consentimento nesta entrega. Inserir somente o ID não começa a coleta. Não há GTM ou publicidade implementados. O teste usa uma tag simulada e intercepta o tráfego externo, sem enviar dados reais.

## Hostinger Web App

Guia completo: [deploy na Hostinger](docs/deploy/hostinger.md). Configuração recomendada: **Astro estático**, **Node 22.x**, **pnpm 12.5.1**, instalação `pnpm install --frozen-lockfile`, build `pnpm build`, saída `dist/`, sem entry file ou start command. Manter dependências de desenvolvimento durante o build. `pnpm start` permanece apenas como fallback se a modalidade contratada exigir processo Node.

O servidor opcional usa apenas módulos nativos, preserva o site estático e retorna `404.html` com status 404 para caminhos inexistentes. Não publicar a raiz do repositório. A configuração de HTTPS, DNS, headers e página de erro precisa ser confirmada no produto contratado; a borda Hostinger só poderá ser validada no futuro deploy.

A auditoria de configuração completa pode ser repetida com:

```bash
node --experimental-strip-types scripts/qa/audit-production.mjs
```

Ela executa builds temporários, testa os três cenários de domínio/indexação em todas as páginas, os CTAs com número configurado, o servidor real e o suporte de consentimento. Preserva `dist/`, remove fixtures e salva evidências em `docs/qa/pre-producao/`. Requer pnpm/Corepack e Chromium do Playwright disponíveis.

Nenhum deploy foi feito. Domínio e WhatsApp estão configurados; DNS, aprovação profissional dos textos, aprovação da Política, práticas de hospedagem/logs, retenção e canal dos titulares continuam pendentes. Seguir o [checklist de go-live](docs/deploy/checklist-go-live.md). Não há blog, CMS, novas páginas ou indexação liberada.
