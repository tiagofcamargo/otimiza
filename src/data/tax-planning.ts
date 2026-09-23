export const taxMessage = 'Olá, vim pela página de planejamento tributário da Otimiza e gostaria de analisar o regime tributário e a operação da minha empresa.';

export const taxCriteria = [
  { title: 'O que a empresa faz', label: 'Atividade e operação', text: 'Atividade econômica, CNAEs e particularidades fiscais precisam ser lidos junto da operação real: o que é vendido, como é entregue e a quem se destina.' },
  { title: 'Como o resultado se forma', label: 'Faturamento e margem', text: 'Receita, margem, despesas e projeções ajudam a compreender o resultado e a avaliar como diferentes cenários podem afetá-lo.' },
  { title: 'Como o negócio se organiza', label: 'Folha e estrutura', text: 'Folha de pagamento, estrutura societária e organização da empresa entram na análise das alternativas e de suas consequências.' },
  { title: 'Quais regras se aplicam', label: 'Créditos e condições', text: 'Créditos permitidos, condições de enquadramento e obrigações devem ser verificados para cada situação. Uma possibilidade teórica precisa fazer sentido na prática.' },
];

// TODO: revisão técnica da Otimiza — validar enquadramento, bases e ressalvas
// dos três regimes conforme legislação vigente antes da liberação para indexação.
export const taxRegimes = [
  { name: 'Simples Nacional', idea: 'Simplificação também exige análise.', text: 'Reúne a apuração de diferentes tributos em uma sistemática própria. A atividade, as condições de ingresso e as particularidades da empresa precisam ser consideradas.', question: 'A sistemática é compatível com a operação e com a estrutura do negócio?' },
  { name: 'Lucro Presumido', idea: 'A margem merece atenção.', text: 'Utiliza bases de presunção na apuração de determinados tributos. Por isso, a relação entre a atividade, a margem efetiva e os demais encargos importa na comparação.', question: 'Como a presunção se relaciona com o resultado que a empresa efetivamente gera?' },
  { name: 'Lucro Real', idea: 'O resultado precisa estar bem apurado.', text: 'Parte do resultado contábil, com os ajustes fiscais aplicáveis, para apurar determinados tributos. Registros consistentes e compreensão das regras são essenciais.', question: 'Como resultados, ajustes e créditos permitidos se comportam no cenário analisado?' },
];

export const taxSteps = [
  ['Entender a operação', 'Conhecer a atividade, a estrutura e a decisão que precisa ser tomada.'],
  ['Levantar dados', 'Reunir informações contábeis, fiscais, financeiras e de folha que sustentem a comparação.'],
  ['Construir cenários', 'Organizar alternativas compatíveis com os dados e com as condições aplicáveis.'],
  ['Comparar consequências', 'Avaliar carga tributária, caixa, obrigações e efeitos sobre a operação.'],
  ['Orientar a decisão', 'Explicar possibilidades, limites e cuidados para apoiar uma escolha fundamentada.'],
];

export const taxReviewSignals = [
  ['O resultado mudou', 'Crescimento do faturamento ou mudança de margem podem alterar as premissas de uma análise anterior.'],
  ['A estrutura mudou', 'Aumento ou redução da folha e uma nova composição societária pedem atenção aos efeitos da mudança.'],
  ['A operação mudou', 'Expansão, novas atividades ou outra forma de vender e entregar podem exigir uma nova leitura tributária.'],
  ['As regras mudaram', 'Alterações relevantes na legislação podem afetar as condições consideradas no planejamento.'],
];

// TODO: revisão técnica da Otimiza — respostas sobre legalidade, condições do
// Simples e momento de mudança devem ser validadas. Não publicar prazos ou
// limites sem a rodada posterior de fontes oficiais prevista no briefing.
export const taxFAQ = [
  { question: 'O que é planejamento tributário?', answer: 'É a análise da realidade da empresa e das alternativas permitidas pela legislação para compreender os efeitos tributários de suas decisões. Envolve dados, comparação de cenários e avaliação das consequências de cada caminho.' },
  { question: 'Planejamento tributário é legal?', answer: 'A proposta do planejamento é avaliar alternativas dentro da legislação, com informações verdadeiras e operações efetivas. Omissão de receitas, adulteração de documentos e descumprimento de obrigações não fazem parte desse trabalho. A validade de uma alternativa precisa ser verificada no caso concreto.' },
  { question: 'Simples Nacional é sempre mais barato?', answer: 'Não existe uma resposta universal. A comparação depende da atividade, da receita, da margem, da folha e das condições aplicáveis à empresa. A simplicidade de uma sistemática não substitui a avaliação de seu custo e de seus efeitos no negócio.' },
  { question: 'Quando devo revisar meu regime tributário?', answer: 'Mudanças de faturamento, margem, folha, atividade ou estrutura podem justificar uma revisão. Alterações na legislação também merecem atenção. O momento da análise e a possibilidade de mudança devem ser avaliados conforme a situação da empresa.' },
  { question: 'Planejamento tributário serve apenas para empresas grandes?', answer: 'O porte não é o único fator. Empresas em diferentes estágios podem precisar compreender melhor uma escolha tributária. A profundidade do trabalho deve acompanhar a complexidade da operação, os dados disponíveis e a decisão em questão.' },
  { question: 'Qual a diferença entre planejamento tributário e revisão fiscal?', answer: 'O planejamento compara caminhos e seus efeitos para orientar decisões. A revisão fiscal examina informações, apurações e procedimentos para verificar sua consistência. Os trabalhos podem se complementar, mas não têm necessariamente o mesmo objetivo ou escopo.' },
  { question: 'É possível mudar de regime a qualquer momento?', answer: 'A possibilidade e o momento da mudança dependem das regras aplicáveis, do regime e da situação da empresa. Antes de tomar uma decisão, é necessário confirmar condições, prazos e consequências com uma análise técnica atualizada.' },
];
