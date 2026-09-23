interface FAQCategory {
  id: string;
  title: string;
  description: string;
  items: { question: string; answer: string; link?: { label: string; href: string } }[];
}

// REVISÃO TÉCNICA OTIMIZA: as respostas resumem conceitos das páginas de serviço.
// Confirmar exigências profissionais, distribuição de lucros, enquadramento fiscal,
// vínculos de trabalho, licenciamento e condições contratuais antes da publicação.
// Perfil de clientes e etapas comerciais não confirmados permanecem omitidos.
export const generalFAQ: FAQCategory[] = [
  {
    id: 'faq-otimiza',
    title: 'Sobre a Otimiza',
    description: 'Atendimento e canais para a primeira conversa.',
    items: [
      {
        question: 'Como funciona o atendimento da Otimiza?',
        answer: 'O atendimento é online. No primeiro contato, conte brevemente o que sua empresa faz e qual questão deseja tratar. Os serviços e o escopo precisam ser conversados a partir dessa necessidade.',
        link: { label: 'Conhecer a Otimiza', href: '/sobre' },
      },
      {
        question: 'O atendimento é online?',
        answer: 'Sim. A Otimiza opera online, e você pode iniciar a conversa pelos canais apresentados na página de contato.',
      },
      {
        question: 'Como faço para conversar com a Otimiza?',
        answer: 'A página de contato reúne o WhatsApp e o Instagram oficiais da Otimiza. Escolha o canal mais conveniente para iniciar a conversa.',
        link: { label: 'Ver canais de contato', href: '/contato' },
      },
    ],
  },
  {
    id: 'faq-contabilidade',
    title: 'Contabilidade',
    description: 'Registros, demonstrações e leitura dos resultados.',
    items: [
      {
        question: 'Toda empresa precisa de contador?',
        answer: 'As exigências de escrituração, demonstrações e participação profissional precisam ser verificadas conforme a natureza, o porte e o enquadramento. Um regime simplificado, sozinho, não permite concluir quais obrigações se aplicam.',
        link: { label: 'Entender a contabilidade empresarial', href: '/servicos/contabilidade-empresarial' },
      },
      {
        question: 'Qual a diferença entre contabilidade e financeiro?',
        answer: 'A contabilidade registra os fatos econômicos e patrimoniais e apresenta demonstrações. A rotina financeira acompanha recebimentos, pagamentos e recursos disponíveis. As informações se complementam, mas respondem a perguntas diferentes.',
      },
      {
        question: 'O que é DRE?',
        answer: 'A Demonstração do Resultado do Exercício organiza receitas, custos e despesas para apresentar o lucro ou prejuízo de um período. Ela ajuda a compreender como o resultado foi formado.',
      },
      {
        question: 'Qual a diferença entre lucro e caixa?',
        answer: 'Lucro é o resultado da relação entre receitas, custos e despesas. Caixa se refere aos recursos financeiros e à sua movimentação. Uma venda a prazo pode compor o resultado antes do recebimento.',
        link: { label: 'Aprofundar a diferença entre lucro e caixa', href: '/servicos/contabilidade-empresarial#lucro-e-caixa' },
      },
      {
        question: 'Como funciona a distribuição de lucros?',
        answer: 'A distribuição se relaciona à destinação de lucros aos sócios. Registros, demonstrações, condições da empresa e regras aplicáveis precisam sustentar essa análise. O saldo bancário, isoladamente, não informa se há lucro disponível para distribuir.',
        link: { label: 'Entender pró-labore e distribuição', href: '/servicos/contabilidade-empresarial#socios-e-resultados' },
      },
    ],
  },
  {
    id: 'faq-tributario-fiscal',
    title: 'Tributário e fiscal',
    description: 'Regimes, operações e obrigações que precisam ser avaliados em conjunto.',
    items: [
      {
        question: 'O que é planejamento tributário?',
        answer: 'É a análise da operação e das alternativas permitidas pela legislação para compreender seus efeitos tributários. O trabalho compara cenários e consequências com base em dados da empresa.',
        link: { label: 'Conhecer o planejamento tributário', href: '/servicos/planejamento-tributario' },
      },
      {
        question: 'Planejamento tributário é legal?',
        answer: 'O planejamento avalia alternativas dentro da legislação, com informações verdadeiras e operações efetivas. Omissão de receitas e adulteração de documentos não fazem parte desse trabalho. A validade de cada alternativa precisa ser verificada.',
      },
      {
        question: 'Simples Nacional é sempre mais barato?',
        answer: 'Não existe uma resposta universal. Atividade, receita, margem, folha e condições de enquadramento influenciam a comparação. A simplicidade da sistemática não substitui a avaliação de seus custos e efeitos.',
        link: { label: 'Entender a comparação entre regimes', href: '/servicos/planejamento-tributario#regimes' },
      },
      {
        question: 'Quando devo revisar meu regime tributário?',
        answer: 'Mudanças de atividade, faturamento, margem, folha ou estrutura podem justificar uma revisão, assim como alterações nas regras. O momento da análise e a possibilidade de mudança precisam ser verificados para a situação da empresa.',
      },
      {
        question: 'Toda empresa paga os mesmos impostos?',
        answer: 'Não. Atividade, operação, localidade, regime e período influenciam os tributos e seu tratamento. Uma comparação exige conhecer o que é realizado e as regras aplicáveis.',
        link: { label: 'Entender a rotina fiscal e tributária', href: '/servicos/fiscal-e-tributario' },
      },
      {
        question: 'O que são obrigações acessórias?',
        answer: 'São deveres de informação e registro ligados à fiscalização e ao controle tributário, como documentos e declarações quando exigidos. Sua verificação faz parte da rotina, além do pagamento dos tributos.',
      },
    ],
  },
  {
    id: 'faq-departamento-pessoal',
    title: 'Departamento pessoal',
    description: 'Informações e cuidados relacionados aos vínculos de trabalho.',
    items: [
      {
        question: 'Qual a diferença entre departamento pessoal e RH?',
        answer: 'O departamento pessoal se concentra nos registros, cálculos e obrigações dos vínculos de trabalho. Recursos Humanos costuma abranger seleção, desenvolvimento e gestão de pessoas. As áreas se relacionam, mas têm escopos distintos.',
        link: { label: 'Conhecer o departamento pessoal', href: '/servicos/departamento-pessoal' },
      },
      {
        question: 'Quando uma admissão precisa ser informada?',
        answer: 'Com antecedência suficiente para conferir os dados e atender às exigências aplicáveis antes do início do trabalho. A comunicação deve ser alinhada conforme a contratação e as obrigações envolvidas.',
      },
      {
        question: 'Como funcionam férias e desligamentos?',
        answer: 'Cada situação exige dados do vínculo, conferência dos eventos e verificação de cálculos, comunicações e registros. O encaminhamento depende das condições do caso e das regras aplicáveis; por isso, a informação precisa chegar em tempo para essa análise.',
      },
      {
        question: 'O que é pró-labore?',
        answer: 'É a remuneração relacionada ao trabalho exercido por sócios na empresa. Seu tratamento depende da atuação e das regras aplicáveis. Pró-labore e distribuição de lucros são conceitos distintos.',
        link: { label: 'Entender a remuneração dos sócios', href: '/servicos/contabilidade-empresarial#socios-e-resultados' },
      },
    ],
  },
  {
    id: 'faq-abertura-empresa',
    title: 'Abertura de empresa',
    description: 'Escolhas iniciais que influenciam os registros e a operação.',
    items: [
      {
        question: 'O que preciso definir antes de abrir empresa?',
        answer: 'Atividade, CNAE, natureza jurídica, participação dos sócios quando houver, capital, endereço e regime tributário precisam ser considerados. Essas escolhas devem refletir a operação pretendida e suas exigências.',
        link: { label: 'Entender a abertura de empresa', href: '/servicos/abertura-de-empresa' },
      },
      {
        question: 'Como escolher CNAE?',
        answer: 'A classificação precisa representar a atividade efetivamente exercida. É necessário analisar sua descrição e notas explicativas, além das consequências cadastrais e fiscais. Um nome parecido com a atividade não basta para decidir.',
      },
      {
        question: 'Preciso ter sócio?',
        answer: 'A estrutura pode variar conforme a forma jurídica e as características do negócio. A escolha deve considerar quem participa da empresa e as condições aplicáveis, sem incluir alguém apenas para preencher o cadastro.',
      },
      {
        question: 'Qual regime tributário devo escolher?',
        answer: 'Compare as alternativas permitidas considerando atividade, receita projetada, margem, folha e despesas. O enquadramento precisa ser compatível com a operação e com as condições vigentes, sem escolher apenas pela alíquota aparente.',
        link: { label: 'Conhecer os critérios da análise tributária', href: '/servicos/planejamento-tributario' },
      },
      {
        question: 'Posso utilizar endereço residencial?',
        answer: 'Essa possibilidade depende da atividade, das condições do imóvel e das regras de uso e licenciamento da localidade. O endereço precisa ser verificado antes de ser adotado nos registros.',
      },
      {
        question: 'Quanto tempo leva para abrir empresa?',
        answer: 'Depende da atividade, da documentação, da localidade e dos registros, licenças ou autorizações necessários. Uma estimativa exige conhecer essas condições; não há um número de dias que sirva para toda abertura.',
      },
    ],
  },
  {
    id: 'faq-troca-contador',
    title: 'Troca de contador',
    description: 'Documentos, responsabilidades e continuidade durante a transição.',
    items: [
      {
        question: 'Posso trocar de contador?',
        answer: 'A mudança pode ser planejada. É preciso verificar o contrato atual, eventuais avisos e as obrigações em andamento para alinhar a passagem de responsabilidades e a continuidade da rotina.',
        link: { label: 'Entender a troca de contador', href: '/servicos/troca-de-contador' },
      },
      {
        question: 'O contador anterior pode impedir a mudança?',
        answer: 'A mudança envolve direitos, deveres profissionais e condições contratuais que precisam ser verificados. Se houver divergência, é necessário examinar documentos e regras aplicáveis e alinhar a transferência das informações.',
      },
      {
        question: 'Quais informações precisam ser transferidas?',
        answer: 'O levantamento pode incluir demonstrações, saldos, arquivos contábeis e fiscais, recibos de obrigações, informações de folha, acessos e procurações. A relação depende da empresa e dos períodos de responsabilidade envolvidos.',
      },
      {
        question: 'Posso trocar se minha empresa tiver pendências?',
        answer: 'As pendências precisam entrar no diagnóstico da transição. É necessário identificar sua origem, os períodos e os encaminhamentos possíveis. A troca, por si só, não resolve nem apaga situações anteriores.',
      },
      {
        question: 'Quanto tempo leva uma transição?',
        answer: 'Depende da disponibilidade dos arquivos, do volume de informações e das obrigações em andamento. A estimativa precisa considerar esses elementos e o alinhamento entre as partes, sem pressupor um prazo único.',
      },
    ],
  },
];
