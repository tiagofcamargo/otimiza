# Páginas internas — Implementation Plan

> **For agentic workers:** executar com superpowers:executing-plans, em sequência neste workspace existente, sem alterações de Git ou deploy.

**Goal:** implementar somente Sobre, Serviços e Planejamento Tributário, mantendo a Home aprovada.

**Architecture:** três rotas Astro estáticas com CSS exclusivo para páginas internas. Compartilhar Breadcrumbs, InternalHero, CTASection, FAQ e ServiceCard; manter Header/Footer e tokens. Dados editoriais em TypeScript, equipe vazia não renderizada. SEO estende o layout existente e usa o domínio configurável.

**Tech Stack:** Astro 7, TypeScript strict, CSS, Playwright, axe e Lighthouse existentes; nenhuma dependência nova.

**Spec:** `docs/planejamento/paginas-internas-briefing.md` (briefing autorizado pelo usuário).

## Global Constraints

- Home é a referência oficial: não alterar seus estilos, fonte, imagens ou componentes visuais.
- Somente três novas rotas; os cinco serviços restantes continuam sem página.
- Conteúdo conceitual, sem pesquisa externa nesta rodada; afirmações dependentes de regras são registradas para revisão técnica interna.
- Nenhum dado empresarial inventado. Atendimento online. Equipe sem dados reais não é renderizada.
- Validação em 360, 390, 430, 768 e 1440 px; screenshots 390 e 1440.

## Entregáveis e sequência

- [x] **1. Contratos e testes.** Criar `tests/browser/internal.spec.ts` para HTTP 200, H1, metadados únicos, breadcrumbs, links internos sem 404, ausência de dados fictícios/rascunhos, FAQ, teclado, reflow e axe. Antes das rotas, executar `pnpm exec playwright test internal.spec.ts --grep 'routes render'` e confirmar 404. Criar `tests/seo.test.ts` para URLs/schema com e sem domínio.
- [x] **2. Base interna.** Criar `src/utils/seo.ts` com `buildInternalSchema({kind, path, title, description, breadcrumbs, siteUrl})`; tipos `BreadcrumbItem` e `InternalPageKind`. Estender `BaseLayout` com `breadcrumbs`/`pageKind`. Criar `Breadcrumbs.astro`, `InternalHero.astro`, `CTASection.astro`, `FAQ.astro`, `ServiceCard.astro`, `TeamSection.astro`, `src/data/team.ts` e `src/styles/internal-pages.css`. CSS carregado apenas nas internas. Botões, raios e cores vêm dos tokens atuais.
- [x] **3. Narrativas.** Criar `src/pages/sobre.astro`, `src/pages/servicos/index.astro` e `src/pages/servicos/planejamento-tributario.astro`. Sobre usa manifesto, princípios, texto aplicado e proximidade digital; hub usa seleção por necessidade, seis serviços e relação entre frentes; piloto usa tese, critérios agrupados, regimes, modelo de análise, revisão, exemplo e FAQ. Dados compartilhados ficam em `src/data/services.ts` e conteúdo técnico em `src/data/tax-planning.ts`.
- [x] **4. Navegação.** Header mantém apresentação e labels, encaminha Serviços ao hub e Como trabalhamos ao Sobre. Link secundário do Hero leva ao hub. Título do card de planejamento na Home passa a ter link mantendo aparência. Nenhum link para serviços não publicados. Ajustar teste de menu da Home para navegação entre rotas.
- [x] **5. Verificação.** `pnpm build`, `pnpm test`, `pnpm test:browser`. Inspecionar screenshots das três rotas e Home, corrigir problemas observados; auditar axe nas três páginas em 390/1440. Lighthouse mobile nas três rotas e desktop, sem processos concorrentes de browser durante medições.
- [x] **6. Entrega.** Atualizar README e criar `docs/qa/paginas-internas/relatorio.md`, com resultados reais, screenshots, limitações e registro de revisão técnica. Comparar hashes dos estilos oficiais e pixels da Home. Parar antes de demais serviços/deploy.

## Interfaces mínimas

```ts
type BreadcrumbItem = { name: string; href?: string };
type InternalPageKind = 'AboutPage' | 'CollectionPage' | 'Service';
type FAQItem = { question: string; answer: string };
type TeamMember = { name: string; role: string; bio: string };
```

`InternalHero` recebe eyebrow, breadcrumbs, lead, message e CTA, com título em slot. `CTASection` recebe title, description, label e message. `ServiceCard` recebe o serviço existente enriquecido com need/situation e número; página publicada usa link de detalhe, demais usam WhatsAppLink. `FAQ` recebe items e título. `TeamSection` recebe membros confirmados e só produz HTML quando há conteúdo.

## Testes de aceitação centrais

```ts
expect((await page.goto(route))?.status()).toBe(200);
await expect(page.locator('h1')).toHaveCount(1);
await expect(page.locator('nav[aria-label="Você está aqui"] [aria-current="page"]')).toHaveCount(1);
expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
expect((await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations).toEqual([]);
```
