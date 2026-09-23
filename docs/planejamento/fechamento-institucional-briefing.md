# OTIMIZA — FECHAMENTO DO SITE INSTITUCIONAL + AUDITORIA GLOBAL

A Home, Sobre, Hub de Serviços e as seis páginas de serviços estão concluídas e aprovadas como sistema visual e estrutural.

Agora quero fechar o núcleo institucional do website antes de iniciar blog, artigos ou deploy.

Nesta etapa implemente SOMENTE:

1. `/perguntas-frequentes`
2. `/contato`
3. `/politica-de-privacidade`
4. auditoria global do site existente
5. revisão de navegação
6. revisão de links internos
7. revisão de CTAs
8. revisão SEO on-page
9. revisão de consistência visual e de conteúdo

Não implementar blog ainda.

Não criar artigos ainda.

Não fazer deploy ainda.

---

# 1. OBJETIVO DESTA ETAPA

Ao terminar esta rodada, quero que o website institucional esteja estruturalmente completo.

O visitante deve conseguir:

* entender quem é a Otimiza;
* compreender os serviços;
* aprofundar-se em cada frente;
* esclarecer dúvidas;
* encontrar canais de contato;
* iniciar conversa via WhatsApp quando o número for configurado;
* acessar política de privacidade;
* navegar entre conteúdos relacionados sem becos sem saída.

---

# 2. PRESERVAR O SISTEMA ATUAL

Não redesenhe novamente o projeto.

Preserve:

* Manrope;
* paleta;
* Header;
* Footer;
* breadcrumbs;
* buttons;
* containers;
* cards;
* linguagem visual;
* breakpoints;
* comportamento mobile;
* componentes existentes.

Pode realizar pequenos ajustes de consistência quando realmente necessários.

Não iniciar nova direção de arte.

---

# 3. PÁGINA `/PERGUNTAS-FREQUENTES`

Objetivo:

Concentrar dúvidas comerciais, contábeis e relacionadas ao funcionamento geral da contratação.

Não transformar em enorme base de conhecimento.

Não tentar responder legislação complexa em accordion.

Para assuntos que precisam de explicação extensa, apontar para a página de serviço correspondente.

---

# 4. HERO — FAQ

Eyebrow:

**Perguntas frequentes**

H1 sugerido:

**Informação clara antes da primeira conversa.**

Texto de apoio:

Reunimos algumas das dúvidas mais comuns sobre serviços contábeis, abertura de empresa, planejamento tributário, departamento pessoal e troca de contador.

Pode melhorar a redação mantendo essa intenção.

---

# 5. ORGANIZAÇÃO DA FAQ

Agrupar perguntas por assunto.

Sugestão:

## Sobre a Otimiza

* Como funciona o atendimento da Otimiza?
* O atendimento é online?
* Como faço para conversar com a Otimiza?
* Quais tipos de empresa vocês atendem?

IMPORTANTE:

Se o perfil exato de clientes ainda não estiver confirmado, não inventar resposta para “quais tipos de empresa atendem”.

Pode omitir essa pergunta até confirmação.

---

## Contabilidade

* Toda empresa precisa de contador?
* Qual a diferença entre contabilidade e financeiro?
* O que é DRE?
* Qual a diferença entre lucro e caixa?
* Como funciona a distribuição de lucros?

---

## Tributário e Fiscal

* O que é planejamento tributário?
* Planejamento tributário é legal?
* Simples Nacional é sempre mais barato?
* Quando devo revisar meu regime tributário?
* Toda empresa paga os mesmos impostos?
* O que são obrigações acessórias?

---

## Departamento Pessoal

* Qual a diferença entre departamento pessoal e RH?
* Quando uma admissão precisa ser informada?
* Como funcionam férias e desligamentos?
* O que é pró-labore?

Não colocar prazos legais específicos sem revisão técnica.

---

## Abertura de Empresa

* O que preciso definir antes de abrir empresa?
* Como escolher CNAE?
* Preciso ter sócio?
* Qual regime tributário devo escolher?
* Posso utilizar endereço residencial?
* Quanto tempo leva para abrir empresa?

Na pergunta sobre prazo, explicar que depende de atividade, localidade, registros e licenças.

Não prometer número de dias.

---

## Troca de Contador

* Posso trocar de contador?
* O contador anterior pode impedir a mudança?
* Quais informações precisam ser transferidas?
* Posso trocar se minha empresa tiver pendências?
* Quanto tempo leva uma transição?

Sem prazo universal.

---

# 6. FAQ — UX

Utilizar o componente já existente.

Manter:

`details` / `summary`

Mas criar melhor navegação para uma página extensa.

Pode utilizar:

* índice por categoria;
* links de âncora;
* agrupamentos visuais.

Não criar filtro complexo em JavaScript.

A página precisa funcionar integralmente sem JS.

---

# 7. FAQ — SEO

Criar:

* title próprio;
* description;
* canonical;
* breadcrumbs;
* OG.

FAQPage schema somente se estiver tecnicamente coerente com as perguntas realmente visíveis.

Não tratar schema como garantia de rich result.

---

# 8. PÁGINA `/CONTATO`

A página não terá formulário.

Isso é decisão de produto.

O principal objetivo é iniciar conversa rapidamente.

Prioridade:

1. WhatsApp
2. Instagram
3. outros contatos reais quando fornecidos

Não criar formulário de:

* nome;
* e-mail;
* mensagem.

---

# 9. HERO — CONTATO

Eyebrow:

**Contato**

H1 sugerido:

**Vamos entender o que sua empresa precisa.**

Texto:

Conte brevemente o contexto e fale diretamente com a Otimiza pelo canal mais conveniente.

Pode ajustar mantendo o tom.

---

# 10. WHATSAPP

O WhatsApp será o CTA principal.

Enquanto o número real não estiver configurado:

* não utilizar número fictício;
* não utilizar `wa.me` inválido;
* não inventar telefone;
* manter fallback atual seguro.

Quando configurado em `business.ts`, todos os CTAs devem passar a utilizar o mesmo número automaticamente.

---

# 11. INSTAGRAM

Instagram oficial:

`@otimiza_assessoria`

URL:

https://www.instagram.com/otimiza_assessoria/

Apresentar como canal secundário.

Pode haver CTA:

**Acompanhar no Instagram**

---

# 12. OPERAÇÃO ONLINE

A Otimiza atualmente opera online.

A página de contato pode comunicar isso positivamente.

Direção:

**Atendimento digital, com proximidade em cada conversa.**

Não mencionar falta de sede.

Não criar endereço fictício.

Não exibir mapa.

Não inserir Google Maps enquanto não houver endereço real que faça sentido publicar.

---

# 13. HORÁRIO

Não inventar horário comercial.

Se `openingHours` ainda estiver vazio:

não renderizar.

---

# 14. E-MAIL

Se não houver e-mail comercial confirmado:

não inventar.

Não usar endereço genérico como:

`contato@otimiza...`

até existir de fato.

---

# 15. PÁGINA `/POLITICA-DE-PRIVACIDADE`

Criar uma política coerente com o website REAL.

Não copiar política genérica enorme.

Atualmente o site:

* não possui formulário;
* não possui login;
* não possui checkout;
* ainda não possui analytics ativo confirmado;
* direciona usuários para serviços externos como Instagram e futuramente WhatsApp.

A política precisa refletir isso.

---

# 16. ESTRUTURA DA PRIVACIDADE

Criar seções como:

## Sobre esta política

## Dados que o site pode tratar

Explicar apenas o que realmente acontece.

Por exemplo:

* dados técnicos de acesso quando aplicável à hospedagem;
* cookies essenciais, se existirem;
* dados coletados futuramente por analytics somente quando configurados.

## WhatsApp

Explicar que ao seguir para WhatsApp o usuário passa a interagir com serviço externo e suas próprias políticas.

## Instagram

Mesma lógica.

## Cookies e analytics

Enquanto GA/GTM não estiver ativo:

não afirmar que utilizamos Google Analytics.

Pode indicar:

“Caso ferramentas de medição sejam adotadas futuramente, esta política será atualizada e os mecanismos de consentimento necessários serão implementados.”

## Direitos do titular

Tratar de maneira geral, respeitando LGPD.

## Contato sobre privacidade

Não inventar canal.

Se ainda não houver:

centralizar como campo de configuração pendente.

---

# 17. NÃO DAR A POLÍTICA COMO REVISÃO JURÍDICA

Adicionar no código/documentação uma pendência:

**Política de Privacidade precisa de validação final da empresa antes da publicação.**

Não colocar aviso do tipo “isto não é aconselhamento jurídico” visível na página se não for necessário.

A pendência deve existir na documentação interna.

---

# 18. AUDITORIA DO HEADER

Depois de criar as novas páginas, revisar a navegação global.

Desktop deve ter uma estrutura simples.

Sugestão:

* Início
* Sobre
* Serviços
* Perguntas frequentes
* Contato

Conteúdos não deve aparecer ainda porque blog ainda não foi publicado.

CTA:

**Falar com um especialista**

Não criar mega-menu complexo.

Se já existir dropdown de Serviços e estiver bom, preservar.

---

# 19. AUDITORIA DO MENU MOBILE

Revisar:

* ordem;
* labels;
* foco;
* Escape;
* área clicável;
* scroll;
* estado ativo.

Garantir acesso fácil a:

* Sobre
* Serviços
* FAQ
* Contato

---

# 20. AUDITORIA DE LINKS INTERNOS

Percorrer todas as páginas existentes:

```text
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
```

Verificar:

* links quebrados;
* links sem destino;
* links redundantes;
* âncoras inválidas;
* serviços relacionados;
* breadcrumbs;
* footer;
* header.

Nenhum link interno deve resultar em 404.

---

# 21. AUDITORIA DE JORNADAS

Validar pelo menos estas jornadas:

## Jornada 1

Home
→ Planejamento Tributário
→ WhatsApp

## Jornada 2

Home
→ Serviços
→ Abertura de Empresa
→ WhatsApp

## Jornada 3

Home
→ Troca de Contador
→ FAQ relacionada
→ WhatsApp

## Jornada 4

Sobre
→ Serviços
→ Serviço específico

## Jornada 5

FAQ
→ página de serviço relevante

## Jornada 6

Qualquer página
→ Contato

---

# 22. AUDITORIA DOS CTAs

Criar inventário dos CTAs atuais.

Verificar:

* texto;
* destino;
* contexto;
* mensagem de WhatsApp;
* posição.

Evitar que tudo diga:

**Falar com um especialista**

quando existir CTA mais contextual.

Exemplos:

Planejamento:

**Conversar sobre planejamento tributário**

Abertura:

**Quero abrir minha empresa**

Troca:

**Quero conversar sobre a troca de contador**

Departamento Pessoal:

**Conversar sobre departamento pessoal**

Mas não exagerar criando dezenas de variações.

---

# 23. CTA PRINCIPAL GLOBAL

No Header e pontos genéricos:

**Falar com um especialista**

permanece aprovado.

---

# 24. AUDITORIA DE COPY

Revisar todo o site procurando repetição excessiva.

Especialmente palavras como:

* contexto;
* decisão;
* segurança;
* análise;
* orientação;
* empresa.

Essas palavras fazem parte da linguagem da marca, mas não podem aparecer mecanicamente em todo parágrafo.

Não alterar por sinônimos artificiais apenas por SEO.

Reescrever somente quando houver repetição perceptível.

---

# 25. PROCURAR PADRÕES DE TEXTO DE IA

Revisar o conteúdo buscando construções como:

* “não se trata apenas de X, mas de Y”;
* “mais do que X” repetidamente;
* “em um cenário...”;
* “é fundamental...”;
* “desempenha um papel fundamental”;
* frases muito simétricas;
* excesso de listas de três itens;
* conclusões genéricas.

Corrigir quando necessário.

A escrita deve parecer humana e especializada.

---

# 26. AUDITORIA SEO ON-PAGE

Para TODAS as páginas verificar:

* title;
* meta description;
* H1;
* canonical;
* Open Graph;
* breadcrumbs;
* schema;
* internal links;
* semantic HTML.

Criar relatório de problemas encontrados.

---

# 27. TITLES

Cada title deve:

* ser exclusivo;
* descrever a página;
* ter Otimiza quando apropriado;
* não repetir texto desnecessariamente.

Exemplo conceitual:

`Planejamento Tributário para Empresas | Otimiza`

Não aplicar exatamente esse padrão se houver opção melhor.

---

# 28. META DESCRIPTIONS

Cada description deve ser realmente específica.

Não criar:

“Conheça os serviços da Otimiza...”

em todas.

Evitar duplicação.

---

# 29. CANONICAL

Continuar configurável por `siteUrl`.

Enquanto domínio real estiver ausente:

não inventar domínio definitivo.

---

# 30. INDEXAÇÃO

Preservar bloqueio atual enquanto:

* domínio;
* conteúdo;
* revisão técnica;
* deploy

não estiverem fechados.

Não buscar SEO 100 artificialmente removendo o bloqueio prematuramente.

---

# 31. SCHEMA

Auditar schemas existentes.

Evitar duplicação contraditória entre:

* Organization;
* AccountingService;
* WebSite;
* Service.

Dados desconhecidos continuam omitidos.

Nunca inventar:

* address;
* telephone;
* rating;
* reviews;
* priceRange;
* employee count;
* founder.

---

# 32. SERVIÇOS RELACIONADOS

Auditar o componente atual.

Regras:

* no máximo 3;
* sempre relevante;
* evitar apontar todos para Planejamento Tributário;
* evitar links circulares sem propósito.

---

# 33. FOOTER

Atualizar links para incluir:

* Sobre;
* Serviços;
* FAQ;
* Contato;
* Instagram;
* Política de Privacidade.

Não mostrar Conteúdos enquanto não existir blog publicado.

---

# 34. 404

Revisar a página 404 existente.

Ela deve conter:

H1:

**Esta página não foi encontrada.**

Links úteis:

* Ir para o início
* Conhecer os serviços
* Falar com a Otimiza

Não precisa virar uma página elaborada.

---

# 35. TESTE DE CONTEÚDO SEM WHATSAPP

Como ainda falta o número:

garantir que nenhum CTA:

* gere erro;
* navegue para `#`;
* aponte para número falso;
* gere URL quebrada.

Fallback atual deve continuar coerente.

---

# 36. PREPARAÇÃO PARA WHATSAPP REAL

Quando o número for fornecido futuramente, quero conseguir alterar apenas:

```ts
business.whatsapp
```

e fazer o site inteiro funcionar.

Auditar para garantir que não exista telefone hardcoded em nenhum componente.

---

# 37. PERFORMANCE

Não introduzir dependências.

Preservar:

* Astro;
* CSS;
* pouco JS;
* desempenho atual.

---

# 38. RESPONSIVIDADE

Validar as três páginas novas + amostra do site existente em:

```text
360 × 800
390 × 844
430 × 932
768 × 1024
1440 × 900
```

Nenhum overflow.

---

# 39. ACESSIBILIDADE

Rodar axe nas três páginas novas.

Também fazer regressão em:

* Home;
* Serviços;
* um serviço.

Validar:

* teclado;
* headings;
* landmarks;
* focus;
* accordion;
* menu;
* CTAs.

---

# 40. TESTES

Adicionar cobertura para:

* FAQ;
* Contato;
* Política;
* links do header;
* links do footer;
* navegação entre páginas;
* ausência de links quebrados.

Executar:

```bash
pnpm build
```

e toda a suíte existente.

---

# 41. LIGHTHOUSE

Executar mobile e desktop pelo menos em:

* Home
* FAQ
* Contato

Meta continua:

Performance >= 95
Accessibility 100
Best Practices 100

SEO pode continuar abaixo de 100 por causa do bloqueio de indexação.

Documentar isso claramente.

---

# 42. RELATÓRIO DE AUDITORIA

Criar:

```text
docs/qa/auditoria-institucional/relatorio.md
```

Incluir:

* páginas auditadas;
* links corrigidos;
* metadata;
* problemas encontrados;
* problemas corrigidos;
* pendências;
* testes;
* Lighthouse;
* acessibilidade.

---

# 43. RELATÓRIO DE CONTEÚDO

Criar:

```text
docs/planejamento/revisao-conteudo-global.md
```

Registrar apenas questões que realmente mereçam validação humana.

Exemplos:

* processo comercial;
* público atendido;
* afirmação técnica;
* regra fiscal;
* texto institucional;
* política de privacidade.

Não gerar lista enorme de observações irrelevantes.

---

# 44. SCREENSHOTS

Gerar:

FAQ:

* 390 × 844
* 1440 × 900

Contato:

* 390 × 844
* 1440 × 900

Privacidade:

* 390 × 844
* 1440 × 900

---

# 45. NÃO IMPLEMENTAR AINDA

Não criar:

* blog;
* artigos;
* categorias;
* autores;
* páginas locais;
* BPO Financeiro;
* Imposto de Renda;
* GA4;
* GTM;
* cookie banner;
* Search Console;
* deploy.

Essas serão etapas posteriores.

---

# 46. ENTREGA

Ao finalizar apresentar:

1. três páginas criadas;
2. resultado da auditoria global;
3. links corrigidos;
4. CTAs revisados;
5. ajustes de copy;
6. SEO revisado;
7. build;
8. número total de testes;
9. axe;
10. Lighthouse;
11. screenshots;
12. pendências de conteúdo;
13. pendências comerciais;
14. pendências técnicas.

---

# 47. PARE

Quando o núcleo institucional estiver completo e auditado:

PARE.

Não avance automaticamente para blog ou deploy.

A próxima etapa será definir:

* domínio;
* WhatsApp;
* revisão técnica dos conteúdos;
* estratégia editorial/SEO;
* primeiros artigos.
