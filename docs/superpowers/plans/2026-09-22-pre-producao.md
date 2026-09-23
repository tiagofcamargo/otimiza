# Preparação de produção — Implementation Plan

> Execução local e revisão independente final, conforme superpowers:executing-plans. Workspace autorizado existente, sem Git utilizável. Briefing autoriza implementação técnica; não há deploy nesta etapa.

**Goal:** preparar configuração, SEO técnico, artefato social, runtime estático e documentação de publicação sem alterar a interface ou liberar indexação.
**Architecture:** Astro estático preservado. Funções puras validam ambiente/domínio e produzem robots/sitemap. Lista explícita das doze rotas. Servidor Node nativo opcional serve somente dist com 404 real, para a modalidade Web App que exige start. Analytics opcional fica inerte sem ID e só carrega após evento de consentimento futuro.
**Tech Stack:** Node 24, pnpm 12.5.1, Astro e ferramentas de QA existentes; zero novas dependências.
**Spec:** docs/planejamento/pre-producao-briefing.md

## Restrições

Nenhuma alteração visual em Header/Footer/Hero/cards/páginas aprovadas. Somente as doze rotas de conteúdo, 404 e endpoints técnicos robots/sitemap. Sem blog, CMS, novas páginas, dados empresariais fictícios, analytics ativo ou deploy. Domínio e WhatsApp vazios e indexação false.

## Tarefas

- [x] 1. Configuração/SEO: escrever testes de domínio, ambientes, sitemap e robots; executar vermelho; adicionar funções puras e sitemap.xml. Manter envs existentes; uma nova variável opcional PUBLIC_GA_ID. Desenvolvimento sempre bloqueado, build de preview com flag false; sitemap vazio sem domínio e doze URLs quando há domínio, mesmo bloqueado, sem divulgação no robots antes da liberação.
- [x] 2. OG: compor arte oficial 1200×630 com logo existente, exportar PNG otimizado; metadados OG/Twitter absolutos só com domínio. Favicons mantidos. Sem PWA/manifest desnecessário.
- [x] 3. Analytics e distribuição: componente só emitido com ID válido em build de produção e domínio. Carregamento externo somente por evento explícito de consentimento; sem CMP/banner nesta etapa. Servidor nativo opcional: GET/HEAD, MIME, 404 real, proteção de arquivos e headers básicos. Testar erros, traversal, métodos e arquivos ausentes.
- [x] 4. Segurança/QA: audit de dependências, artefatos, links externos, segredos por padrões sem imprimir valores, sourcemaps; build e suíte inteira; configuração em builds isolados, indexação e analytics sem tráfego real. Lighthouse Home/FAQ/Contato mobile/desktop; revisão independente e hashes da interface.
- [x] 5. Documentar: README, Hostinger Web App, checklist de go-live, relatório pre-producao com resultados e pendências. Parar sem deploy.

## Review Focus

- Domínio vazio, credenciais, porta, caminho e URL malformada: não emitir URLs fictícias ou sitemap inválido; testes puros.
- Flag true em dev: continuar noindex e robots bloqueado; produção sem domínio também bloqueada.
- Número ausente/inválido: fallback atual; número confirmado atualiza todas as páginas, teste de configuração existente.
- URL com encoding malformado/traversal, arquivo oculto ou symlink: servidor não sai de dist e não publica arquivos técnicos.
- ID GA malformado ou falta de consentimento: nenhum carregamento externo; teste com rota externa interceptada e fixture, sem enviar dados.

## Decisões

Ruling: manter nomes PUBLIC_WHATSAPP e PUBLIC_INDEXING_ENABLED para evitar migração desnecessária; indexingEnabled é o equivalente já existente a allowIndexing.
Ruling: suporte GA será preparado com gatilho de consentimento, não com carga automática de tags. A interface futura de consentimento e atualização da política são pendências antes de ativação; não criar banner agora.
Ruling: Hostinger documenta Astro/Other, pnpm e Node24. Servidor estático nativo pequeno torna o comportamento 404 verificável localmente e oferece start sem usar astro preview em produção; validação da borda Hostinger continua no go-live.

## Fechamento

Concluído em 22/09/2026. Build limpo (58 arquivos), 14 unitários e 121 testes de navegador aprovados; 24 verificações axe sem violações. Auditoria isolada validou 3 cenários em 12 páginas e 76 CTAs. Revisão independente identificou confinamento ausente no carregamento inicial da 404; corrigido com regressão vermelho/verde e runtime revalidado. O revisor não concluiu uma segunda rodada por limite de uso; não se presume aprovação integral dele. Revisão local, testes e verificação final concluídos. Lighthouse em seis medições: Performance 99–100, Accessibility 100, Best Practices 100. Documentação e evidências em docs/qa/pre-producao/relatorio.md. Sem deploy, indexação ou analytics ativo.
