# Subtarefa: páginas de Contabilidade Empresarial e Fiscal e Tributário

Leia `docs/planejamento/servicos-restantes-briefing.md`, especialmente seções 1–13, 23–29 e 31–33. Implemente somente:

- `src/pages/servicos/contabilidade-empresarial.astro`
- `src/pages/servicos/fiscal-e-tributario.astro`

Pode criar `src/data/accounting-fiscal.ts` para arrays/FAQ se necessário. Não altere outros arquivos. Não use outros agentes, Git, browser, build ou dependências. A raiz cuida de testes, CSS compartilhado, schema, cadastro e relatório central.

Referência visual/arquitetural: `src/pages/servicos/planejamento-tributario.astro`, `src/styles/internal-pages.css` e os componentes existentes. Conteúdo em português brasileiro, útil, conceitual, sem pesquisa externa nesta rodada editorial, regras/prazos/percentuais ou dados empresariais inventados. Marcar em comentários de código temas para REVISÃO TÉCNICA OTIMIZA. Não renderizar marcações.

Narrativas distintas; não repetir a ordem do piloto. Contabilidade deve cobrir escrituração/conciliações/demonstrações, lucro versus caixa, pró-labore versus distribuição e informação para decisões. Fiscal: origem de documentos, alinhamento da apuração, ICMS/ISS/PIS/Cofins/IRPJ/CSLL de forma conceitual e condicional, regime, obrigações acessórias e diagnóstico de pendências. Seis perguntas sugeridas no briefing por página, respostas curtas e específicas. Não afirmar regra legal específica.

Contratos existentes:

- `BaseLayout` com title/description/breadcrumbs/pageKind="Service"/mobileContact/contactMessage.
- `InternalHero` com eyebrow/lead/breadcrumbs/cta/message/secondary={label,href}; título em slot com span de destaque.
- `FAQ` com title/description/items de question/answer.
- `CTASection` com title/description/label/message.
- `RelatedServices` será criado pela raiz em `src/components/RelatedServices.astro`; recebe slugs: string[], no máximo 3.
- Importar `../../styles/internal-pages.css`; reaproveitar internal-split/internal-prose/internal-panel/internal-card-grid/legal-comparison/tax-analysis-grid/regime-grid/review-signals/conceptual-example/analysis-steps sem alterar os estilos. É permitido CSS scoped local mínimo apenas se necessário para uma composição própria, usando tokens.

Contabilidade deve ter links dentro dos parágrafos para `/servicos/fiscal-e-tributario` e `/servicos/planejamento-tributario`; Fiscal para `/servicos/planejamento-tributario` e `/servicos/contabilidade-empresarial`. Além disso, RelatedServices ao final, antes do CTA final. Todos os blocos de página com ids e aria-labelledby, um H1. Sem novas imagens.

Mensagens do WhatsApp centralizadas em services.ts existente; obtenha pelo slug, sem duplicar utility. O cadastro será publicado pela raiz. Titles/descriptions exclusivos. Para schema basta pageKind e rota; a raiz corrigirá o helper genérico.

Auto-revise cobertura, redação, heading hierarchy e mobile 360 (grids não forçados), e entregue relatório em `/tmp/otimiza-contabilidade-fiscal-report.md` com arquivos criados, seções, temas a revisar tecnicamente e fontes oficiais futuras sugeridas (instituições, sem URLs inventadas). Não rode testes de navegador ou build; a raiz os executará depois da integração.
