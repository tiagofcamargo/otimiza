# Revisão humana do núcleo institucional

Consolidação em 22/09/2026. Registrar somente decisões que dependem da Otimiza, sem reabrir o sistema visual aprovado. As doze páginas foram percorridas; não há dados empresariais fictícios, formulários ou ferramentas de medição ativos.

## Conteúdo técnico

A FAQ geral resume os conceitos das páginas de serviço. Validar os temas já organizados na [revisão dos serviços](revisao-tecnica-servicos.md) e na [revisão das internas](revisao-tecnica-internas.md): exigências profissionais, distribuição de lucros, enquadramento/transição tributária, vínculos de trabalho, CNAE/licenciamento e responsabilidades na troca. As respostas permanecem conceituais, sem prazos ou percentuais universais. Nenhuma marcação interna aparece no HTML.

## Atendimento e escopo comercial

Confirmar se a descrição da primeira conversa e os serviços apresentados correspondem ao escopo efetivamente oferecido. O fluxo de transição e de análise tributária continua identificado como conceitual; não foi apresentado como processo contratual confirmado.

O público exato atendido ainda não foi informado. A pergunta sobre tipos de clientes foi omitida. Operação online e Instagram oficial são os dados confirmados usados nas novas páginas. Horário e e-mail comercial não são exibidos enquanto seus campos em `business.ts` estiverem vazios.

## Privacidade — validação antes da publicação

**Política de Privacidade precisa de validação final da empresa antes da publicação.**

O texto descreve o código real: sem formulário, login, checkout, cookies gravados pela aplicação, local/session storage ou analytics. Links simples para Instagram e WhatsApp não incorporam esses serviços na página. A mensagem sugerida do WhatsApp não é enviada automaticamente.

A empresa deve confirmar, junto da futura hospedagem, quais logs serão mantidos, suas finalidades, retenção, operadores e demais condições de tratamento. A política menciona registros técnicos de forma condicional; essa passagem precisa ser reconciliada com a configuração efetiva antes do deploy.

Confirmar identificação e canal para atender solicitações dos titulares. `business.privacyEmail` permanece vazio e centraliza a configuração pendente; enquanto isso, a política aponta aos canais oficiais de Contato, sem atribuir um e-mail ou encarregado fictício. A empresa deve validar se esse encaminhamento é adequado à operação real.

Os direitos gerais foram conferidos na [orientação da ANPD](https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados-1/direito-dos-titulares) e na [LGPD, texto compilado oficial](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm). A conferência fundamenta a redação introdutória; não equivale a aprovação jurídica ou à validação das práticas futuras da empresa.

## Configuração e publicação futura

- Confirmar domínio e WhatsApp. O número fica em `business.whatsapp`, hoje alimentado por `PUBLIC_WHATSAPP`; não existe telefone nos componentes.
- Confirmar e-mail, horário e canal de privacidade somente se forem utilizados. Campos opcionais não produzem conteúdo vazio.
- Manter `PUBLIC_INDEXING_ENABLED=false`. Configurar o domínio passa a gerar canonical e URLs absolutas, mas não libera indexação sozinho. A liberação explícita depende de conteúdo, revisão técnica e deploy aprovados.

## Resultado editorial

Revisadas as doze páginas em busca de repetição literal, excesso de vocabulário e construções genéricas. As seis descrições compartilhadas de serviços entre Home e hub foram preservadas por consistência. Não houve reescrita artificial por sinônimos. O apoio do Hero de Contato foi ajustado para evitar repetir imediatamente “o que sua empresa precisa”. Os textos institucionais anteriormente aprovados permaneceram intactos.

Não há nova pendência visual aberta nesta etapa. Blog, artigos, estratégia editorial, analytics e deploy permanecem fora deste escopo.
