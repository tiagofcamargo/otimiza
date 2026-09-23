export const services = [
  {
    slug: 'contabilidade-empresarial',
    title: 'Contabilidade empresarial',
    description: 'Escrituração, conciliações e demonstrações contábeis para compreender o resultado e a situação patrimonial da sua empresa.',
    linkLabel: 'Conversar sobre contabilidade',
    detailLabel: 'Entender a contabilidade empresarial',
    message: 'Olá, vim pelo site da Otimiza e gostaria de conversar sobre contabilidade empresarial.',
  },
  {
    slug: 'fiscal-e-tributario',
    title: 'Fiscal e tributário',
    description: 'Análise de documentos fiscais, apuração de tributos e acompanhamento de obrigações, considerando a atividade e o regime da empresa.',
    linkLabel: 'Conversar sobre a rotina fiscal',
    detailLabel: 'Entender a área fiscal e tributária',
    message: 'Olá, vim pelo site da Otimiza e gostaria de conversar sobre a área fiscal e tributária.',
  },
  {
    slug: 'planejamento-tributario',
    title: 'Planejamento tributário',
    description: 'Avaliação da operação, faturamento, margem e folha para comparar regimes e compreender os impactos de cada cenário tributário.',
    linkLabel: 'Conversar sobre planejamento',
    detailLabel: 'Entender o planejamento tributário',
    message: 'Olá, vim pelo site da Otimiza e gostaria de conversar sobre planejamento tributário.',
  },
  {
    slug: 'departamento-pessoal',
    title: 'Departamento pessoal',
    description: 'Admissões, folha, férias e desligamentos tratados com atenção às informações, aos prazos e às obrigações de cada vínculo.',
    linkLabel: 'Conversar sobre departamento pessoal',
    detailLabel: 'Entender o departamento pessoal',
    message: 'Olá, vim pelo site da Otimiza e gostaria de conversar sobre departamento pessoal.',
  },
  {
    slug: 'abertura-de-empresa',
    title: 'Abertura de empresa',
    description: 'Orientação sobre atividade, natureza jurídica, estrutura societária e regime tributário antes dos registros e do início da operação.',
    linkLabel: 'Conversar sobre abertura',
    detailLabel: 'Entender a abertura de empresa',
    message: 'Olá, vim pelo site da Otimiza e gostaria de conversar sobre abertura de empresa.',
  },
  {
    slug: 'troca-de-contador',
    title: 'Troca de contador',
    description: 'Levantamento de documentos, obrigações e saldos para organizar a transição e dar continuidade à rotina contábil da empresa.',
    linkLabel: 'Conversar sobre a transição',
    detailLabel: 'Entender a troca de contador',
    message: 'Olá, vim pelo site da Otimiza e gostaria de entender como funciona a troca de contador.',
  },
].map((service) => ({ ...service, enabled: true, pagePublished: true }));

export const enabledServices = services.filter((service) => service.enabled);

export const serviceNeeds: Record<string, { need: string; situation: string }> = {
  'contabilidade-empresarial': { need: 'Quero organizar a rotina contábil', situation: 'Quando os registros precisam acompanhar a operação e oferecer uma visão mais clara do patrimônio e do resultado.' },
  'fiscal-e-tributario': { need: 'Tenho dúvidas fiscais ou tributárias', situation: 'Quando documentos, apurações e obrigações exigem atenção para refletir corretamente as atividades da empresa.' },
  'planejamento-tributario': { need: 'Quero analisar meu regime tributário', situation: 'Quando uma escolha ou mudança no negócio pede comparação entre cenários e seus efeitos tributários.' },
  'departamento-pessoal': { need: 'Preciso estruturar admissões, folha e obrigações', situation: 'Quando a gestão dos vínculos de trabalho precisa de informações organizadas para dar suporte à rotina.' },
  'abertura-de-empresa': { need: 'Quero abrir uma empresa', situation: 'Quando a ideia de negócio precisa se traduzir em escolhas de atividade, estrutura societária e registros.' },
  'troca-de-contador': { need: 'Quero mudar de contador', situation: 'Quando é preciso organizar documentos, saldos e responsabilidades para uma transição com continuidade.' },
};
