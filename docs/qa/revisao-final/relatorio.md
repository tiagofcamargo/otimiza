# Relatório final — revisão técnica, privacidade e Hostinger

Data: 23/09/2026. Estado: preparação local revisada; conteúdo profissional e Política ainda dependem das aprovações indicadas abaixo. Não houve deploy, DNS, conexão GitHub, liberação de indexação ou ativação de analytics.

## Revisão técnica

Foram revisadas as 11 páginas de conteúdo indicadas no briefing, as cinco perguntas da Home, as 29 perguntas da FAQ geral e as perguntas das páginas de serviço. O registro item a item está em [revisao-tecnica-final.md](../../planejamento/revisao-tecnica-final.md), com página, trecho, problema, criticidade, proposta e fonte oficial a validar.

Correções aplicadas ao site:

- Em planejamento tributário, “Buscar pagar menos impostos legalmente” foi substituído por “Buscar eficiência tributária dentro das possibilidades previstas na legislação”, com ressalva de que resultado não pode ser prometido antes da análise.
- Na FAQ geral, a resposta sobre canais passou a informar que WhatsApp e Instagram estão disponíveis, em coerência com o número confirmado e a página de contato.

Pendências profissionais prioritárias:

- ALTA: confirmar com a Otimiza/CRC os dados e a identificação exigível para publicidade digital de organização contábil. O site ainda não possui CNPJ nem número de registro da organização confirmados. [Orientação do CFC](https://cfc.org.br/fiscalizacao-etica-e-disciplina/perguntas-frequentes/assinatura-de-pecas-contabeis/).
- ALTA: aprovar a apresentação dos regimes e a suficiência das ressalvas sobre opção do Simples Nacional e transição de CBS/IBS para 2027. A Receita Federal divulgou mudança do calendário de opção em 2026; nenhuma data foi acrescentada à página pública. [Orientação oficial para 2027](https://www.gov.br/fazenda/pt-br/assuntos/noticias/2026/setembro/comecou-nesta-terca-1o-09-o-prazo-para-opcao-pelo-simples-nacional-e-para-a-escolha-do-modelo-de-recolhimento-do-ibs-e-da-cbs-em-2027/).
- MÉDIA: validar descrições de pró-labore e distribuição de lucros, ICMS/ISS/PIS/Cofins/retenções, escopo de eSocial/FGTS/INSS, procedimentos de abertura e transição contratual de contador. O conteúdo atual contém ressalvas e não apresenta prazos ou alíquotas universais.
- BAIXA: confirmar se orientação sobre certificado digital integra o serviço de abertura antes de adicioná-la ao site.

Não foram encontrados percentuais de economia garantida, promessa de benefício fiscal, equivalência entre lucro e caixa ou afirmação de que o regime pode ser trocado a qualquer momento.

## Privacidade

A [página da Política de Privacidade](../../../src/pages/politica-de-privacidade.astro) foi atualizada como proposta para o lançamento. O build atual publica as seguintes seções e redações:

### Sobre esta política

Esta política descreve o tratamento de dados relacionado ao site institucional da Otimiza Assessoria Contábil e aos contatos iniciados pelos canais indicados nele. O site apresenta a empresa e seus serviços. Não possui formulário, cadastro, login, checkout, newsletter ou blog.

### Dados técnicos de navegação

Você pode consultar as páginas sem informar nome, e-mail ou documentos ao site. Não há cadastro de visitantes. A infraestrutura de hospedagem da Hostinger pode processar dados técnicos necessários para entregar, proteger e diagnosticar o serviço, como endereço IP, data e horário da requisição, URL solicitada, navegador, dispositivo e informações de conexão. O site não utiliza esses dados para criar perfis comerciais.

### WhatsApp e Instagram

Os botões de WhatsApp direcionam ao serviço WhatsApp/Meta, pelo número informado no site, com uma sugestão de mensagem revisável antes do envio; o clique não envia a mensagem automaticamente. Informações enviadas voluntariamente podem ser usadas pela Otimiza para responder ao contato, compreender a solicitação, prestar atendimento, elaborar proposta quando solicitada e dar continuidade à relação comercial. A plataforma aplica também suas políticas e termos.

Os links para o perfil oficial levam ao Instagram/Meta. Mensagens enviadas nessa plataforma podem ser usadas pela Otimiza para responder e seguir o atendimento solicitado. O site apenas vincula o perfil, sem incorporar feed ou rastreamento do Instagram.

### Cookies, compartilhamento e conservação

O site não possui analytics ou publicidade ativa e o código atual não grava cookies para essas finalidades. Cookies estritamente necessários ou mecanismos técnicos da infraestrutura podem existir quando indispensáveis ao funcionamento e à segurança. Antes de ativar ferramentas futuras de analytics ou marketing, a Política e os mecanismos de consentimento necessários deverão ser atualizados.

Fornecedores de hospedagem e plataformas externas podem tratar dados na medida necessária à prestação de seus serviços. Dados de atendimento serão mantidos pelo período necessário às finalidades aplicáveis e, quando couber, a obrigações legais/regulatórias ou à defesa de direitos. Critérios concretos de retenção e descarte ainda precisam de aprovação interna; nenhum prazo numérico foi inventado.

### Direitos, canal e atualização

A Política resume os direitos da LGPD: confirmação, acesso, correção e, nas condições legais, anonimização, bloqueio, eliminação, informações sobre compartilhamento, portabilidade, oposição e revogação do consentimento quando aplicável. Há link para a [ANPD](https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados-1/direito-dos-titulares).

O canal específico para solicitações de privacidade **ainda não foi definido**. A página informa a pendência e não designa o WhatsApp comercial como canal LGPD. A data fixa exibida é “Última atualização: 23 de setembro de 2026”. Mudanças legais, operacionais, tecnológicas ou inclusão de ferramentas motivarão nova revisão.

Aprovação humana necessária antes do go-live definitivo: identificar corretamente o controlador/organização, confirmar práticas de logs e fornecedores da Hostinger, definir critérios de retenção e descarte, **definir canal para solicitações relacionadas a privacidade antes do go-live definitivo** e aprovar a redação jurídica. A [LGPD](https://planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm) e as [orientações da ANPD](https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados-1/direito-dos-titulares) são as referências gerais; a aplicação à operação da Otimiza precisa de validação própria.

## Hostinger

### Configuração exata recomendada no hPanel

- Produto: Deploy Web App, frontend estático.
- Framework: Astro.
- Rendering: Static; astro.config.mjs mantém output static.
- Node: 22.x (teste local em v22.23.2).
- Package manager: pnpm 12.5.1 (packageManager já fixado; pnpm-lock.yaml preservado).
- Install: pnpm install --frozen-lockfile, quando o painel expuser campo de instalação.
- Build: pnpm build. O script atual executa astro check e astro build.
- Output directory: dist.
- Entry file: não aplicável.
- Start command: nenhum na modalidade estática.
- Raiz: diretório com package.json e pnpm-lock.yaml.
- Variáveis de build: PUBLIC_SITE_URL=https://otimizacontabil.com.br/; PUBLIC_WHATSAPP=5511971774720; PUBLIC_INDEXING_ENABLED=false; PUBLIC_GA_ID vazio.
- Domínio canônico: https://otimizacontabil.com.br/, sem www. Se www for configurado, redirecionar para a origem canônica após a etapa autorizada de DNS/deploy.
- Deploy futuro preferencial: integração GitHub. Push/merge na branch conectada pode disparar build e publicação automática.

Os nomes PUBLIC_WHATSAPP_NUMBER e PUBLIC_ALLOW_INDEXING aparecem no briefing, mas **não são usados pelo código**. Seus equivalentes reais são PUBLIC_WHATSAPP e PUBLIC_INDEXING_ENABLED; renomeá-los agora sem migração quebraria CTAs e a proteção de indexação. O servidor Node existente (pnpm start, scripts/serve.mjs) é fallback para uma exigência concreta do produto, não parte da configuração recomendada. Nenhum adapter Astro Node ou SSR foi adicionado. Os scripts dev, build e preview existentes foram preservados; preview contém guarda contra artefato com indexação liberada.

A [Hostinger lista Astro como frontend e Node 22 como versão suportada](https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/), e [documenta pnpm](https://www.hostinger.com/support/fix-failed-to-build-application-error-hostinger-node-js/). Não foi possível inspecionar a conta/hPanel nesta sessão. O workspace tem um diretório .git vazio: git status falha, portanto a integração GitHub requer um repositório e branch funcionais antes da publicação. Plano contratado, campos reais, 404 estático, headers, HTTPS e resposta do domínio ainda dependem de verificação na Hostinger. O [guia de deploy](../../deploy/hostinger.md) detalha esse procedimento futuro.

## Build e testes

Todos os comandos foram executados sob Node v22.23.2 e pnpm 12.5.1:

- pnpm install --frozen-lockfile: lockfile aceito, sem alteração.
- pnpm build: Astro static em dist, 13 páginas HTML mais robots.txt e sitemap.xml; astro check analisou 58 arquivos com 0 erros, 0 warnings e 0 hints.
- pnpm test: 14/14.
- pnpm test:browser: 121/121, incluindo responsividade, navegação, FAQ e verificações axe em mobile/desktop. Após o último ajuste editorial da Política, o build foi reexecutado sem erros e a suíte institucional de navegador passou novamente: 28/28.
- Auditoria adicional scripts/qa/audit-production.mjs: três cenários × 12 páginas aprovados, 76 CTAs inventariados; servidor/404 e consentimento simulado aprovados, tráfego externo interceptado.

Dist contém index.html, 12 rotas de conteúdo, 404.html, CSS, imagens, fontes, robots.txt, sitemap.xml, favicons e imagem OG 1200×630. O artefato contém 12 locais no sitemap; robots.txt ainda responde “Disallow: /”, e Home/Política mostram “noindex, nofollow”. Nenhum ID de analytics foi configurado.

## Próximos bloqueios antes da publicação

O [checklist de go-live](../../deploy/checklist-go-live.md) mantém pendentes a aprovação profissional do conteúdo, a identificação CFC/CRC aplicável, a aprovação da Política e o canal dos titulares, a configuração real do hPanel/GitHub e os testes no domínio depois do deploy autorizado. Esta revisão não autoriza publicação nem liberação de indexação.
