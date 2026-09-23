# OTIMIZA — PREPARAÇÃO FINAL PARA PRODUÇÃO

O núcleo institucional do site está concluído.

Neste primeiro momento NÃO teremos blog.

Portanto:

- não criar `/conteudos`;
- não criar artigos;
- não criar categorias;
- não criar autores;
- não criar content collections editoriais;
- não criar links para Conteúdos no Header ou Footer;
- não criar placeholders como “Em breve”.

O site inicial será estritamente institucional e comercial.

Agora quero preparar o projeto para PRODUÇÃO, sem realizar deploy ainda.

---

# 1. OBJETIVO

Quero deixar o site tecnicamente pronto para receber:

- domínio definitivo;
- WhatsApp definitivo;
- revisão técnica final;
- aprovação da Política de Privacidade;
- eventual analytics;
- deploy na Hostinger;
- posterior liberação de indexação.

---

# 2. NÃO REDESENHAR

A interface está aprovada.

Não alterar:

- direção visual;
- tipografia;
- paleta;
- estrutura das páginas;
- Header;
- Footer;
- cards;
- Hero;
- layout das páginas de serviço.

Esta etapa é técnica e de produção.

---

# 3. ROTAS FINAIS

As páginas públicas serão:

/
 /sobre
 /servicos
 /servicos/contabilidade-empresarial
 /servicos/fiscal-e-tributario
 /servicos/planejamento-tributario
 /servicos/departamento-pessoal
 /servicos/abertura-de-empresa
 /servicos/troca-de-contador
 /perguntas-frequentes
 /contato
 /politica-de-privacidade

e a página 404.

Não criar outras rotas públicas nesta etapa.

---

# 4. CONFIGURAÇÃO CENTRAL

Revisar `business.ts` ou equivalente.

Centralizar corretamente:

- business name;
- legal name;
- siteUrl;
- WhatsApp;
- telefone;
- e-mail;
- Instagram;
- cidade;
- estado;
- CNPJ;
- CRC;
- endereço;
- horário;
- canal de privacidade.

Campos desconhecidos devem permanecer opcionais.

Nenhum componente deve quebrar caso um campo esteja ausente.

---

# 5. WHATSAPP

Garantir que todos os CTAs do site utilizem uma única configuração central.

Não pode existir:

- número hardcoded;
- `wa.me` espalhado;
- telefone fictício;
- fallback para número de teste.

Quando `business.whatsapp` for preenchido, todos os CTAs devem funcionar automaticamente.

Auditar todas as páginas.

---

# 6. DOMÍNIO

Centralizar o domínio definitivo em `siteUrl`.

Canonical, Open Graph, sitemap e schema devem depender dessa configuração.

Não espalhar domínio em arquivos separados.

---

# 7. AMBIENTES

Preparar claramente:

## Development

- indexação bloqueada;
- domínio local;
- CTAs seguros;
- nenhuma URL falsa.

## Production

- domínio real;
- canonical real;
- sitemap;
- robots;
- indexação liberável por configuração explícita.

Não liberar indexação ainda.

---

# 8. INDEXAÇÃO

A liberação de indexação deve continuar sendo explícita.

Criar/confirmar uma configuração central, por exemplo:

`allowIndexing`

Enquanto estiver `false`:

- `noindex, nofollow`;
- robots coerente;
- sitemap não deve ser tratado como sinal de publicação final.

Quando futuramente ativado:

- remover noindex;
- gerar robots correto;
- manter canonical;
- manter sitemap.

Não ativar agora.

---

# 9. SEO FINAL

Auditar todas as páginas.

Verificar:

- title;
- meta description;
- canonical;
- H1;
- Open Graph;
- structured data;
- breadcrumbs;
- alt;
- links internos.

Não alterar conteúdo apenas para perseguir score.

---

# 10. STRUCTURED DATA

Revisar:

- Organization;
- AccountingService;
- Service;
- WebSite;
- BreadcrumbList.

Não criar dados faltantes.

Não utilizar:

- AggregateRating;
- Review;
- Employee;
- Founder;
- Address;
- Telephone;

quando não houver confirmação real.

---

# 11. SITEMAP

Gerar sitemap apenas com rotas públicas reais.

Não incluir:

- 404;
- drafts;
- rotas técnicas;
- rotas inexistentes.

---

# 12. ROBOTS.TXT

Preparar comportamento por ambiente.

Development/preview:

bloqueio.

Production antes de aprovação final:

bloqueio.

Production após ativação explícita:

permitir crawling normal.

Documentar como liberar.

---

# 13. OPEN GRAPH

Revisar imagem Open Graph.

Utilizar identidade visual oficial.

Gerar arquivo otimizado 1200 × 630.

Não utilizar screenshot da página.

Não criar imagem genérica de stock.

---

# 14. FAVICONS E PWA

Revisar:

- favicon;
- apple-touch-icon;
- manifest, se já existir e fizer sentido.

Não transformar o site em PWA sem necessidade.

Manifest simples é aceitável.

---

# 15. POLÍTICA DE PRIVACIDADE

A política continua pendente de aprovação humana.

Revisar para garantir que ela não declare funcionalidades inexistentes.

Neste momento não temos:

- formulário;
- login;
- checkout;
- blog;
- analytics confirmado.

A política deve refletir o estado real.

Registrar pendência de validação final.

---

# 16. ANALYTICS

Não habilitar GA4 ou GTM automaticamente.

Apenas preparar suporte opcional.

Se nenhum ID for informado:

não carregar script.

Se futuramente existir analytics:

deve ser possível ativar via configuração/environment variable.

Não criar banner de cookie sem necessidade real.

---

# 17. HOSTINGER

Preparar documentação para deploy na Hostinger Web App.

Revisar:

- Node;
- pnpm;
- build command;
- output;
- start/preview quando necessário;
- environment variables;
- pasta `dist`.

Criar instruções claras no README.

Não realizar deploy.

---

# 18. ENVIRONMENT VARIABLES

Criar ou revisar `.env.example`.

Somente variáveis realmente necessárias.

Exemplos possíveis:

PUBLIC_SITE_URL
PUBLIC_WHATSAPP_NUMBER
PUBLIC_ALLOW_INDEXING
PUBLIC_GA_ID

Não criar dezenas de variáveis sem necessidade.

Nenhum segredo deve ser versionado.

---

# 19. SEGURANÇA

Auditar:

- links externos;
- `target="_blank"`;
- `rel="noopener noreferrer"`;
- headers quando aplicável;
- dependências;
- secrets;
- sourcemaps;
- arquivos esquecidos.

Não adicionar infraestrutura complexa.

---

# 20. 404

Validar comportamento real em produção estática.

A página deve funcionar corretamente na Hostinger.

Documentar qualquer configuração necessária para fallback.

---

# 21. PERFORMANCE

Preservar os resultados atuais.

Não adicionar dependências.

Executar Lighthouse novamente após mudanças técnicas.

Objetivo:

Performance >= 95
Accessibility 100
Best Practices 100

SEO pode permanecer reduzido enquanto indexação estiver bloqueada.

---

# 22. TESTES

Executar:

pnpm build

e toda a suíte atual.

Adicionar testes para:

- sitemap;
- robots;
- allowIndexing false;
- canonical;
- business config;
- WhatsApp sem número;
- WhatsApp com número válido.

---

# 23. AUDITORIA DE PRODUÇÃO

Criar documento:

docs/qa/pre-producao/relatorio.md

Registrar:

- build;
- testes;
- Lighthouse;
- sitemap;
- robots;
- canonical;
- structured data;
- WhatsApp;
- environment config;
- pendências.

---

# 24. CHECKLIST DE GO-LIVE

Criar:

docs/deploy/checklist-go-live.md

Com checklist simples:

[ ] domínio confirmado
[ ] DNS configurado
[ ] WhatsApp confirmado
[ ] textos revisados
[ ] Política aprovada
[ ] canonical validado
[ ] sitemap validado
[ ] robots validado
[ ] analytics decidido
[ ] deploy concluído
[ ] HTTPS validado
[ ] páginas testadas em produção
[ ] allowIndexing ativado
[ ] Search Console configurado
[ ] sitemap enviado ao Google

---

# 25. README

Atualizar documentação final do projeto.

Incluir:

- instalação;
- desenvolvimento;
- build;
- preview;
- env vars;
- deploy Hostinger;
- como liberar indexação;
- onde alterar WhatsApp;
- onde alterar dados da empresa.

---

# 26. NÃO FAZER

Não:

- criar blog;
- criar artigos;
- criar CMS;
- criar painel;
- criar páginas locais;
- adicionar BPO;
- adicionar Imposto de Renda;
- liberar indexação;
- fazer deploy.

---

# 27. ENTREGA

Ao final apresentar:

1. mudanças realizadas;
2. arquivos de configuração;
3. sitemap;
4. robots;
5. env example;
6. README;
7. checklist de go-live;
8. build;
9. testes;
10. Lighthouse;
11. pendências para produção.

Depois PARE.