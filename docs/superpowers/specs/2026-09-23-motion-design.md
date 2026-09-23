# Motion sutil e microinterações — Otimiza

Status: desenho aprovado em conversa; aguarda revisão do documento antes do plano de implementação.

## Objetivo

Dar mais vida ao site institucional sem redesenhar a interface nem competir com a leitura. O movimento deve parecer sutil e premium, reforçar hierarquia e resposta tátil, e funcionar bem em desktop, mobile, teclado, leitores de tela e configurações de movimento reduzido.

## Arquitetura

- Manter Astro em geração estática e o HTML do conteúdo disponível sem depender de JavaScript.
- Adicionar GSAP como dependência local e um controlador compartilhado no layout base.
- Marcar opt-in os elementos animáveis em componentes e páginas Astro. O controlador só carrega GSAP quando há elementos marcados e `prefers-reduced-motion` não está ativo.
- Usar `IntersectionObserver` para iniciar cada grupo ao entrar na área visível. Cada grupo anima uma vez; a rolagem permanece nativa e não é controlada pelo script.
- Manter transições de hover, toque e foco em CSS. Não usar ScrollTrigger, efeitos de cursor, parallax ou animações contínuas.

Se JavaScript, o carregamento de GSAP ou o observador falhar, o conteúdo permanece visível e utilizável.

## Catálogo de movimento

### Entrada

- Home: texto do hero surge em sequência breve; a ilustração faz um ajuste discreto de posição e escala, uma única vez.
- Páginas internas: eyebrow, título e chamada seguem a mesma linguagem visual.
- Durante a rolagem: títulos de seção e grupos de cards podem surgir com deslocamento curto e opacidade. Animar grupos, não cada parágrafo; não repetir ao rolar para cima e para baixo.

### Microinterações

- Botões: remover o sublinhado atual no hover. Com movimento habilitado, aplicar mudança sutil de tom, elevação aproximada de 2 px e sombra leve; ao pressionar, retornar à posição com pequena compressão. Transição curta, por volta de 180 ms.
- Movimento reduzido: manter feedback de cor/contraste dos botões, sem elevação ou compressão.
- Links de texto: manter affordance atual e deslocar a seta alguns pixels quando houver seta.
- Cards: elevação pequena no hover em dispositivos com hover, sem alterar o fluxo do layout.
- Menu mobile e indicador da FAQ: transições breves de rotação/forma, preservando o `<details>`, a navegação por teclado e a semântica existentes.

O contorno `:focus-visible` permanece claramente visível e não depende da animação.

## Acessibilidade e desempenho

- Respeitar `prefers-reduced-motion` tanto em GSAP quanto em CSS; dispensar as entradas e transformações posicionais nessa configuração.
- A página continua completa quando JavaScript está desativado. Elementos não começam escondidos por CSS esperando uma animação.
- Carregar o pacote GSAP de forma dinâmica e apenas em páginas com marcadores de animação, quando o movimento não estiver reduzido.
- Usar animações curtas, de execução única e sem listeners contínuos de rolagem.
- Preservar comportamento responsivo, alvos de toque, âncoras, ordem de foco e funções atuais do menu e da FAQ.

## Fora de escopo

- Redesenho, mudança de conteúdo ou de hierarquia visual.
- Parallax, rolagem controlada, contadores animados, vídeo, animações em loop ou efeitos de cursor.
- Dependência de serviços externos para carregar animações.

## Critérios de aceitação

- A Home e os heros internos usam uma entrada consistente e discreta; títulos e grupos de cards entram uma vez quando apropriado.
- O hover de botão produz a leve mudança de tom e elevação aprovadas, sem sublinhar o rótulo; toque produz retorno visual breve.
- `prefers-reduced-motion` dispensa entradas e deslocamentos, mantendo estados de foco e feedback não animado.
- Sem JavaScript ou se o bundle de GSAP não carregar, todas as páginas continuam visíveis, navegáveis e utilizáveis.
- O movimento não causa rolagem horizontal, colisões, saltos de layout ou bloqueio de interação em telas pequenas e grandes.
- Menu mobile, FAQ, links e CTAs mantêm a semântica e as interações atuais.

## Revisão visual prevista

Conferir manualmente em viewport pequeno e desktop, com movimento normal e reduzido, incluindo a Home, uma página interna com cards, FAQ e navegação mobile. A mudança deverá preservar a estética atual e parecer mais responsiva, sem distrair da leitura.
