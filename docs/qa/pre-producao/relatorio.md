# Preparação final para produção — Otimiza

Data: 22/09/2026. **Preparação técnica local concluída. Sem deploy, sem liberação de indexação e sem analytics ativo.** Domínio, WhatsApp e aprovação humana do conteúdo/Política permanecem pendentes.

## Escopo preservado

Doze páginas de conteúdo: Home, Sobre, hub de Serviços, seis serviços, Perguntas Frequentes, Contato e Política de Privacidade, além da 404. `robots.txt` e `sitemap.xml` são endpoints técnicos. Não foram criadas páginas de Conteúdos, artigos, CMS, painel ou novos serviços.

A interface aprovada foi preservada. Comparação SHA-256 confirmou os mesmos bytes nos 33 arquivos existentes de estilos, páginas e componentes visuais registrados no início da etapa. Header, Footer, Hero, cards, tipografia e composição não foram alterados. BaseLayout recebeu apenas ajustes de metadados e a integração opcional, inerte na configuração atual. [Evidência do artefato e hashes](seguranca-artefato.json).

## Implementação

- `src/data/business.ts`: configuração única da empresa, domínio, WhatsApp e flags. Dados não confirmados continuam opcionais: razão social, telefone, e-mail, cidade/estado/endereço, CNPJ, CRC, horário e canal de privacidade. Instagram oficial preservado.
- `src/utils/production.ts`: valida a origem HTTPS, mantém desenvolvimento bloqueado, calcula a liberação explícita e gera robots/sitemap. Rejeita URLs com credenciais, caminho, query, fragmento, porta não padrão e endereços locais/IP.
- `src/data/routes.ts`: relação das 12 rotas válidas; sitemap exclui 404, assets e rotas técnicas.
- `src/pages/sitemap.xml.ts` e `src/pages/robots.txt.ts`: geração estática dependente da configuração central.
- `src/layouts/BaseLayout.astro`: canonical, OG e schema compartilham o domínio; corrigida propriedade `@id` redundante do objeto de organização. Sem domínio inventado.
- `src/components/OptionalAnalytics.astro`: sem ID não emite código; com ID válido e domínio em build de produção aguarda consentimento explícito. Sem banner ou coleta automática.
- `scripts/serve.mjs`: servidor opcional de arquivos estáticos para Web App que exige processo Node. Usa somente módulos nativos, preserva 404 real e confina arquivos à pasta de build.
- `scripts/assert-preview.mjs`: impede iniciar preview de um build com robots liberado; reconstruir com flag `false` para revisão.
- `package.json`, `.nvmrc`, `.env.example` e `.gitignore`: Node 24, start de produção, quatro variáveis públicas e exclusão de fixtures/ZIP locais. Nenhuma dependência adicionada.

## Configuração, sitemap e robots

A configuração entregue permanece com domínio e WhatsApp confirmados, GA vazio e `PUBLIC_INDEXING_ENABLED=false`. Este é o equivalente central de `allowIndexing`; os nomes existentes foram preservados para evitar migração desnecessária.

Sem domínio, canonical/OG absolutos são omitidos, referências de página do schema permanecem relativas e o sitemap é um XML vazio. Com domínio confirmado, o sitemap contém as 12 URLs, mesmo antes da liberação; sua presença não representa publicação aprovada. Enquanto bloqueado, robots contém `User-agent: *` e `Disallow: /`, sem anúncio do sitemap, e todas as páginas usam `noindex, nofollow`.

A liberação exige simultaneamente build fora de desenvolvimento, domínio válido e flag literalmente `true`. Nesse cenário, as páginas usam `index, follow`, robots permite crawling e anuncia o sitemap. A 404 mantém noindex. Preview bloqueia o artefato liberado. Alterar variáveis exige novo build, pois o site é estático.

Três builds isolados, com **12 páginas por cenário**, validaram domínio sem liberação, domínio com liberação explícita e liberação sem domínio. Conferidos canonical, OG, Organization/AccountingService, WebSite, Service e BreadcrumbList quando aplicáveis, posições e URLs dos breadcrumbs e integridade do build principal. Sem ratings, reviews, pessoas, endereço ou telefone inventados. Domínio e número de teste usados só nas fixtures, removidas ao final; não aparecem em `dist/`. [Configuração validada](configuracao-validada.json).

## WhatsApp e SEO das páginas

Os **76 CTAs** inventariados usam a configuração central e mantêm suas mensagens gerais/contextuais. O build isolado com número válido confirmou todos os destinos; a suíte cobre número ausente/inválido sem gerar link WhatsApp. O build entregue preserva o fallback seguro de contato, sem número de teste. `wa.me` é gerado pela utility central.

A suíte global verificou nas 12 páginas: title e description próprios, um H1, metadados OG, links internos/âncoras, breadcrumbs, schema, noindex atual, atributos alt e `noopener noreferrer` nos links que abrem outra aba. Nenhum texto foi alterado para perseguir score.

## Open Graph e favicons

Criada [imagem OG oficial](../../../public/brand/og-otimiza.png) de **1200 × 630**, PNG com **115.060 bytes (112,4 KiB)**, utilizando a assinatura oficial branca, Manrope e cores da marca. Não é screenshot do site nem imagem de stock. Gerador reproduzível: `scripts/generate-og.mjs`, usando o Playwright já instalado. Imagem inspecionada visualmente.

OG/Twitter recebem imagem absoluta somente quando há domínio válido, com dimensões e texto alternativo. Favicons 16, 32, 48, 192 e 512 e apple-touch-icon 180 mantidos e conferidos. Nenhum manifest, service worker ou infraestrutura PWA foi adicionado. [Dimensões e tamanhos dos assets](assets-validados.json).

## Build, testes e acessibilidade

A validação final desta retomada encontrou e corrigiu um erro de tipagem na fronteira do ambiente Astro, além de duas expectativas obsoletas da suíte sobre fallback de WhatsApp e URLs relativas. O build e a interface permaneceram sem alteração visual.

- `pnpm build`: **aprovado**, 58 arquivos analisados, **0 erros, 0 warnings e 0 hints**; 13 páginas HTML e os dois endpoints técnicos gerados.
- `pnpm test`: **14/14 aprovados**, incluindo domínio, ambiente, robots, sitemap, schema, WhatsApp e confinamento/404 do servidor. O teste da 404 com symlink externo reproduziu a falha antes da correção e passou depois.
- `pnpm test:browser`: **121/121 aprovados** na execução completa desta etapa. Inclui **24 verificações axe** nas 12 páginas em mobile/desktop, sem violações detectadas, além de navegação, responsividade, keyboard/foco, FAQ, links, conteúdo ampliado e ausência de JavaScript. Screenshots foram atualizados pela suíte nos diretórios históricos de cada conjunto.
- `node --experimental-strip-types scripts/qa/audit-production.mjs`: aprovado após a correção final do servidor; cenários de configuração, 12 rotas com 200, URLs inexistentes com 404 e teste de analytics interceptado. O build principal permaneceu intacto.

A correção anterior afetou somente o servidor opcional e seu teste unitário. Nesta retomada foram repetidos unitários, build, suíte de navegador e auditoria do runtime; a interface permaneceu sem alteração visual. Nenhuma alteração visual posterior à suíte de navegador. Testes automatizados não equivalem a certificação integral de acessibilidade.

## Lighthouse no runtime estático final

Lighthouse 13.5.0, Chromium local, `scripts/serve.mjs` em `127.0.0.1:4322`, configurações mobile padrão e desktop. Seis execuções sequenciais após o build final, sem builds ou testes de navegador concorrentes.

- **Home:** Performance **99 mobile / 100 desktop**, Accessibility **100/100**, Best Practices **100/100**. LCP **2,18 s / 0,46 s**. [Mobile](lighthouse-home-mobile.report.html) · [desktop](lighthouse-home-desktop.report.html).
- **Perguntas Frequentes:** **100/100/100** nas três categorias, mobile e desktop. LCP **1,73 s / 0,40 s**. [Mobile](lighthouse-perguntas-frequentes-mobile.report.html) · [desktop](lighthouse-perguntas-frequentes-desktop.report.html).
- **Contato:** **100/100/100** nas três categorias, mobile e desktop. LCP **1,65 s / 0,38 s**. [Mobile](lighthouse-contato-mobile.report.html) · [desktop](lighthouse-contato-desktop.report.html).

CLS **0** e TBT **0 ms** nas seis medições. SEO **66**, limitado pelo bloqueio intencional de indexação. Meta de Performance ≥95 / Accessibility 100 / Best Practices 100 atingida. Resultados de laboratório local; latência, cache e configuração da Hostinger ainda precisam ser medidos após deploy. [Resumo JSON](lighthouse-resumo.json).

## Segurança e 404

`pnpm audit --json` não reportou vulnerabilidades conhecidas no conjunto atual: zero em todas as severidades. [Auditoria de dependências](dependencias.json). Isso registra os avisos disponíveis na execução, não garante ausência de vulnerabilidades futuras.

O artefato contém 49 arquivos, sem sourcemaps, fontes TypeScript, documentos internos, ZIPs, lockfile, package.json ou arquivos ocultos. Varredura por padrões conhecidos de credenciais no código/artefato não encontrou ocorrências. Não foi auditado histórico remoto nem infraestrutura ainda não configurada. [Evidência](seguranca-artefato.json).

Servidor testado com GET/HEAD, método não permitido, URL malformada, traversal codificado, arquivos ocultos, sourcemaps e symlink externo. A revisão identificou que o fallback 404 precisava passar pela mesma verificação de confinamento; a correção resolve o caminho real, confirma que está dentro de `dist` e que é arquivo regular antes de ler. Regressão coberta por teste vermelho/verde. Erros não expõem caminhos internos.

O runtime retorna **404 real** com a página personalizada; não reescreve URLs desconhecidas para Home/200. Headers `nosniff`, `DENY`, política de referência e restrições de câmera/microfone/geolocalização conferidos. HTML usa revalidação e assets usam uma hora de cache. [Runtime validado](runtime-validado.json).

A resposta da Hostinger ainda não foi validada, pois não houve deploy. O [guia](../../deploy/hostinger.md) documenta tanto o servidor Node opcional quanto a configuração da 404 no modo estático, além da conferência dos headers após o proxy. CSP/HSTS não foram presumidos antes da definição de domínio/HTTPS.

## Privacidade e analytics

A Política foi conferida contra o estado atual: não declara formulário, cadastro, login, checkout ou analytics ativos; descreve canais externos e a futura necessidade de atualização. Seu texto aprovado visualmente foi preservado. **A aprovação de conteúdo pela empresa continua pendente**, incluindo hospedagem/logs, retenção e canal dos titulares.

Sem ID, nenhum código de analytics está no build. A fixture com ID simulou recusa, consentimento, consentimento repetido e revogação: nenhuma tag antes da escolha ou na recusa, uma tag após consentimento e desativação na revogação. Requisição externa interceptada com resposta simulada; **nenhum dado enviado ao Google**. O teste valida a integração local, não o comportamento real da plataforma externa.

A futura ativação depende de decisão humana, atualização/aprovação da Política e implementação de uma experiência de consentimento/revogação. O ID sozinho não inicia coleta. Nenhum banner, CMP ou persistência de consentimento foi criado agora.

## Entrega e pendências externas

Documentação: [README](../../../README.md), [ambiente de exemplo](../../../.env.example), [guia Hostinger](../../deploy/hostinger.md) e [checklist de go-live](../../deploy/checklist-go-live.md).

Pendências: domínio definitivo e DNS, WhatsApp confirmado, revisão técnica dos textos, aprovação da Política/canal de privacidade, decisão de analytics, configuração do plano Hostinger, deploy futuro, HTTPS, teste das páginas/404/headers no domínio real, liberação explícita posterior, Search Console e envio do sitemap.

Esta etapa termina na preparação local. Não foram realizados deploy, conexão de publicação automática, alteração de DNS, ativação de analytics ou liberação de indexação.
