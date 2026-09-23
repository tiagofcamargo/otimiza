# Revisão editorial e técnica — páginas internas

Conteúdo conceitual produzido conforme o briefing, sem pesquisa externa nesta etapa. Estes registros são internos e não são renderizados nas páginas.

## Antes de liberar indexação

- **Regimes tributários:** validar os resumos de Simples Nacional, Lucro Presumido e Lucro Real, incluindo a distinção entre sistemática de arrecadação e bases de determinados tributos. Confirmar ressalvas sobre ingresso, limitações, ajustes fiscais e créditos. Arquivo: `src/data/tax-planning.ts`, `taxRegimes`.
- **Legalidade:** revisar o texto sobre planejamento, omissão, adulteração e descumprimento, mantendo o caráter informativo. Não há definição penal, citação de lei ou recomendação de operação específica. Arquivos: página de planejamento, seção `legalidade`, e `taxFAQ`.
- **Mudança de regime:** validar a resposta sobre condições e momento da mudança. A página não afirma prazos nem permite concluir que a mudança pode ocorrer a qualquer tempo. Arquivo: `taxFAQ`, última pergunta.
- **Critérios de comparação:** confirmar a formulação sobre CNAEs, atividade efetiva, faturamento, margem, folha, despesas, créditos permitidos, estrutura societária e projeções. A página não apresenta fórmula universal ou indicação de regime.
- **Revisão fiscal:** confirmar a distinção editorial entre examinar apurações/procedimentos e comparar alternativas para decisões. O escopo contratado não é presumido.
- **Modelo de análise:** validar a pertinência das cinco etapas conceituais. Elas estão explicitamente apresentadas como modelo didático, sem afirmar que representam o processo interno atual da Otimiza.
- **Escopo comercial:** confirmar com a Otimiza as descrições e situações dos seis serviços e a redação institucional sobre acompanhamento online. Nenhum SLA, prazo de atendimento ou disponibilidade contínua foi prometido.

## O que foi deliberadamente evitado

Sem alíquotas, limites monetários, datas legais, percentuais de economia, simulações numéricas, promessas de redução, recuperação de créditos ou ausência de risco. O exemplo com duas operações é expressamente didático e não indica o regime adequado para cada uma. Não há novos dados de endereço, equipe, certificações, história empresarial ou resultados de clientes.

## Dados ainda necessários

Domínio público e número confirmado de WhatsApp. Equipe permanece em `src/data/team.ts` como lista vazia; o componente só renderiza profissionais com nome, cargo e biografia preenchidos a partir de dados reais. Nenhum `Person` foi criado no schema.

Depois da revisão da Otimiza, a rodada própria de SEO/técnica poderá acrescentar fontes oficiais e atualizar a redação. Enquanto não houver domínio configurado, canonical e `og:url` são omitidos e a indexação continua bloqueada.
