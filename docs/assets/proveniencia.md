# Proveniência dos assets da Home

## Marca

Os nove PNGs da raiz são oficiais. O inventário original com SHA-256 está em `../planejamento/assets/inventario-logos.json`.

- Header: `LOGO FINAL__logo branca variação.png` — apesar do nome, é a assinatura horizontal preta.
- Footer: `LOGO FINAL_-09.png` — assinatura horizontal branca.
- Ícones: `LOGO FINAL__ícone preto.png` e `LOGO FINAL__ícone branco.png`.

Derivação: recorte pelo bounding box do canal alfa completo, redução proporcional com Lanczos e gravação PNG otimizada. Símbolos receberam margem em canvas quadrado; favicon usa fundo claro oficial. Não houve recoloração, redesenho, retirada de slogan ou mudança de opacidade. Os arquivos servidos têm até 640 px; os originais de cerca de 8000 px não são publicados.

## Fontes

Obtidas do repositório oficial Google Fonts em 20/09/2026:

- [Barlow Condensed SemiBold](https://github.com/google/fonts/blob/main/ofl/barlowcondensed/BarlowCondensed-SemiBold.ttf).
- [Barlow Condensed Bold](https://github.com/google/fonts/blob/main/ofl/barlowcondensed/BarlowCondensed-Bold.ttf).
- [Exo 2 variável](https://github.com/google/fonts/tree/main/ofl/exo2).

Licenças [Barlow Condensed OFL](../../public/fonts/BarlowCondensed-OFL.txt) e [Exo 2 OFL](../../public/fonts/Exo2-OFL.txt) preservadas. Conversão local para WOFF2 e subset latino/acentos/pontuação com FontTools; Exo 2 limitada ao eixo de peso 400–600. Barlow Condensed tem arquivos 600 e 700. Nenhuma chamada de fonte externa acontece no navegador.

## Ilustração

Uma única ilustração conceitual, produzida com a ferramenta integrada `image_gen`, não fotografia da empresa. O [prompt exato](ilustracao-prompt.txt) foi preservado. Representa planos e documentos conectados; não retrata pessoas, escritório, sede, dados financeiros ou resultados.

Arquivos usados: `public/illustrations/contexto-{360,560,800}.avif` e `.webp`. Fonte raster gerada com 1254×1254 px; exportação proporcional e compressão para web. O Hero usa imagem decorativa com `alt=""` e dimensões reservadas. A seção tributária utiliza composição tipográfica, sem segunda imagem.

## Referências editoriais

As respostas de FAQ são introdutórias e evitam regras, datas ou promessas universais. A revisão profissional da Otimiza permanece necessária antes da publicação.

- Abertura: [Redesim — consulta de viabilidade](https://www.gov.br/empresas-e-negocios/pt-br/redesim/abrir-cnpj/viabilidade) e [DREI — processo de registro](https://www.gov.br/empresas-e-negocios/pt-br/drei/orientacoes-de-abertura/quero-registrar-minha-empresa).
- Transição: [Resolução CFC 1.590/2020, cópia publicada pelo CRC-MS](https://crcms.org.br/wp-content/uploads/2020/05/Res.-CFC-1590_Contratos_Definitivo-18-03.pdf), sobre contratos e responsabilidades. A Home não prescreve prazo de aviso ou transfere automaticamente responsabilidades.
- Identidade e valores: `Otimiza.pdf` e briefing aprovado. Instagram atual confirmado diretamente pelo usuário: `@otimiza_assessoria`; não foi possível consultar o perfil público durante a implementação, e nenhum dado adicional foi inferido dele.
