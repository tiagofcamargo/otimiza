# Hostinger Web App — publicação futura

Revisado em 23/09/2026 a partir do projeto e da documentação pública da Hostinger. Nenhum deploy foi realizado. `astro.config.mjs` mantém `output: 'static'` e o build gera `dist/`.

## Configuração recomendada no hPanel

Selecionar **Deploy Web App** com integração GitHub somente quando a publicação for autorizada. No build:

- Framework: **Astro**, modalidade frontend estático.
- Rendering: **Static**.
- Node version: **22.x**; o projeto foi validado localmente em **22.23.2**.
- Package manager: **pnpm 12.5.1**, conforme `package.json` e lockfile.
- Raiz: diretório com `package.json` e `pnpm-lock.yaml`.
- Install command: `pnpm install --frozen-lockfile`, quando o painel permitir personalizar a instalação. Manter devDependencies durante o build.
- Build command: `pnpm build`.
- Output directory: `dist`.
- Entry file: **não aplicável**.
- Start command: **nenhum** para o frontend estático.
- Environment variables: `PUBLIC_SITE_URL=https://otimizacontabil.com.br/`, `PUBLIC_WHATSAPP=5511971774720`, `PUBLIC_INDEXING_ENABLED=false`; `PUBLIC_GA_ID` vazio.

A [Hostinger lista Astro como frontend estático e oferece Node 22](https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/). O campo Entry file só é necessário para aplicações com processo. A [Hostinger documenta pnpm](https://www.hostinger.com/support/fix-failed-to-build-application-error-hostinger-node-js/). Plano, campos e comportamento real da conta ainda precisam ser conferidos no hPanel.

Os scripts locais `dev`, `build` e `preview` foram preservados: o build inclui `astro check`, e o preview impede abrir um artefato com indexação liberada. O `start` e `scripts/serve.mjs` já existiam como fallback para um produto que exija processo Node; não fazem parte da configuração estática recomendada.


## Fallback Node opcional

Se o produto contratado exigir processo, avaliar a configuração manual/Other com `pnpm start`, entrada `scripts/serve.mjs` e porta `PORT` fornecida pelo host. Esse script serve somente `dist/` com módulos nativos do Node e exige a estrutura relativa de `scripts/` e `dist/`. Confirmar a exigência concreta no hPanel; `astro preview` não é runtime de produção.

## Variáveis e dados

Copiar os nomes de `.env.example` para o ambiente de build do painel:

- `PUBLIC_SITE_URL`: `https://otimizacontabil.com.br/` (a utility normaliza a barra final para a origem). O mesmo valor alimenta canonical, OG, schema e sitemap.
- `PUBLIC_WHATSAPP`: `5511971774720` (com 55 e DDD; apenas dígitos nas URLs).
- `PUBLIC_INDEXING_ENABLED=false`: manter bloqueado até a etapa explícita de liberação.
- `PUBLIC_GA_ID`: deixar vazio; futura ativação exige política atualizada e integração de consentimento.

São valores públicos, incorporados ao HTML no build. Não cadastrar segredos em variáveis `PUBLIC_*`. Mudar variáveis apenas no processo já iniciado não altera HTML: refazer o build e publicar. Demais dados opcionais da empresa ficam em `src/data/business.ts`; preencher somente informações confirmadas. A Hostinger permite revisar configurações e variáveis em um novo deploy. [Redeploy](https://www.hostinger.com/support/how-to-redeploy-a-node-js-application/).

## Artefatos e publicação

Na integração GitHub, push/merge na branch conectada pode iniciar build e publicação automática. Preparar repositório, branch, raiz, build e variáveis antes de conectar; aguardar autorização de deploy para estabelecer a integração. `node_modules/` e `dist/` permanecem ignorados pelo Git. O workspace atual contém apenas um diretório `.git` vazio, sem repositório funcional; criar/conectar o repositório é etapa futura de publicação.

Se usar upload de código para build, incluir fontes, `public`, configurações, scripts necessários, `package.json` e lockfile; excluir `.env`, `.git`, `node_modules`, fixtures `.qa-*`, resultados de testes e arquivos locais. Não colocar repositório, documentos internos, testes ou arquivos de ambiente em uma pasta pública. No modo estático, publicar somente o conteúdo de `dist/` como raiz pública.

Para verificar a saída estática localmente:

```bash
pnpm install --frozen-lockfile
pnpm build
test -f dist/index.html
test -f dist/404.html
test -f dist/robots.txt
test -f dist/sitemap.xml
```

O fallback Node pode ser testado separadamente com `pnpm start` e `curl -I http://localhost:3000/caminho-inexistente`. Isso não comprova o comportamento do hPanel ou do proxy Hostinger.

## 404 e headers

No runtime `scripts/serve.mjs`, rotas inexistentes recebem `dist/404.html` com status **404**, incluindo `/conteudos`. Não existe fallback de SPA para `index.html`. Arquivos ocultos, sourcemaps e caminhos fora de `dist/` não são servidos. O arquivo 404 também precisa permanecer dentro dessa pasta; um symlink externo impede a inicialização.

No modo estático, associar a página de erro a `/404.html` se o hPanel oferecer a opção e confirmar o status com `curl -I` em URL inexistente após o deploy. Não adicionar rewrite universal para Home com status 200. Se o frontend não oferecer 404 correto, avaliar o fallback Node na etapa de publicação. Em hospedagem Apache/LiteSpeed tradicional, quando `.htaccess` for suportado, a diretiva equivalente é `ErrorDocument 404 /404.html`; isso não pressupõe suporte no Web App. [Páginas de erro Hostinger](https://www.hostinger.com/support/1583295-how-to-customize-your-website-s-error-pages-in-hostinger/).

O servidor inclui `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin` e `Permissions-Policy: camera=(), microphone=(), geolocation=()`. HTML usa `Cache-Control: no-cache`; outros assets usam cache público de uma hora. No modo puramente estático, configurar equivalentes no host quando disponível. Conferir os headers após o proxy. CSP/HSTS não foram presumidos sem domínio/HTTPS e configuração de hospedagem confirmados.

## Domínio e DNS

O domínio canônico escolhido é `otimizacontabil.com.br`, sem `www`. No painel, apontar o apex para a aplicação conforme os registros fornecidos pela Hostinger e validar também o comportamento de `www.otimizacontabil.com.br`. Se o `www` for configurado, redirecioná-lo para `https://otimizacontabil.com.br/` e manter uma única origem canônica. Confirmar certificado TLS, redirecionamento HTTPS e ausência de conteúdo misto após o DNS propagar. Nenhuma alteração de DNS foi feita nesta etapa.

## Liberação posterior

Primeiro publicar com indexação bloqueada, concluir o [checklist de go-live](checklist-go-live.md), validar domínio/HTTPS, páginas, WhatsApp, 404 e Política. Só após aprovação definir `PUBLIC_INDEXING_ENABLED=true`, refazer build e publicar. Conferir remoção de noindex das 12 páginas, manutenção na 404, canonical, sitemap e robots. Depois configurar Search Console e enviar o sitemap.

Este guia prepara o procedimento. DNS, certificado, painel, proxy e resposta pública real ainda não foram testados porque não houve deploy.
