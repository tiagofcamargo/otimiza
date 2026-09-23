# Checklist de go-live

Estado: preparação local concluída; publicação e indexação ainda não autorizadas/executadas. Seguir o [guia Hostinger](hostinger.md) e conferir o [relatório de pré-produção](../qa/pre-producao/relatorio.md).

- [x] Domínio confirmado e definido em `PUBLIC_SITE_URL`: `https://otimizacontabil.com.br/`.
- [ ] DNS configurado, incluindo decisão de domínio principal e redirecionamento www/apex.
- [x] WhatsApp confirmado, definido em `PUBLIC_WHATSAPP` como `5511971774720` e CTAs testados localmente.
- [ ] Revisão técnica aprovada pela Otimiza, com atenção às regras tributárias de 2027, pró-labore, distribuição de lucros e escopo dos serviços.
- [ ] Identificação profissional exigível para publicidade digital conferida com o CRC/CFC; inserir CNPJ e registro da organização contábil somente após confirmação.
- [ ] Política de Privacidade aprovada, incluindo práticas de hospedagem/logs, retenção e fornecedores.
- [ ] Definir canal para solicitações relacionadas a privacidade antes do go-live definitivo; divulgar o canal na Política, sem presumir que o WhatsApp comercial cumpra essa função.
- [x] Canonical e URLs do schema/OG validados com o domínio real no build local.
- [x] Sitemap validado: somente as 12 rotas públicas, sem 404 ou rotas técnicas.
- [x] Robots validado e bloqueado antes da aprovação; `Allow: /` e sitemap permanecem condicionais à liberação.
- [ ] Analytics decidido: manter vazio ou aprovar política, configuração e integração de consentimento antes de ativar.
- [ ] Deploy concluído na Hostinger com Node 22, build `pnpm build`, saída `dist` e indexação inicialmente bloqueada.
- [ ] HTTPS validado, sem conteúdo misto, e redirecionamentos de domínio conferidos.
- [ ] Páginas testadas em produção: 12 rotas, links, WhatsApp, mobile, headers e URL inexistente com status 404 real.
- [ ] `allowIndexing` ativado por `PUBLIC_INDEXING_ENABLED=true` **após aprovação**; novo build/deploy feito e HTML/robots conferidos. 404 continua noindex.
- [ ] Search Console configurado e propriedade verificada.
- [ ] Sitemap enviado ao Google após a liberação.

Alterações de variáveis públicas exigem novo build. `pnpm preview` recusa um build com crawling liberado; para revisão local, reconstruir com a flag `false`. Nada deste checklist externo foi marcado como concluído apenas por testes locais.
