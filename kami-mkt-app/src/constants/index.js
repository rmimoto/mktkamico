export const ST = [
  { id: 'ideas',        label: 'Banco de ideias',         color: '#6366f1' },
  { id: 'social-todo',  label: 'A Fazer Social Media',     color: '#8b5cf6' },
  { id: 'av-todo',      label: 'A Fazer Audiovisual',      color: '#ec4899' },
  { id: 'cri-todo',     label: 'A Fazer Criativo',         color: '#f43f5e' },
  { id: 'progress',     label: 'Em Andamento',             color: '#f59e0b' },
  { id: 'review',       label: 'Revisão | Aprovação',      color: '#06b6d4' },
  { id: 'final-social', label: 'Finalizar Social Media',   color: '#3b82f6' },
  { id: 'done',         label: 'Concluído',                color: '#22c55e' },
  { id: 'standby',      label: 'Stand by',                 color: '#6b7280' },
];

export const ST2 = [
  { id: 'triage',   label: 'Nova solicitação | Triagem', color: '#6366f1' },
  { id: 'cri-todo', label: 'Criativo | A Fazer',          color: '#8b5cf6' },
  { id: 'progress', label: 'Em Andamento',                color: '#f59e0b' },
  { id: 'waiting',  label: 'Aguardando informações',      color: '#f43f5e' },
  { id: 'approval', label: 'Enviado para aprovação',      color: '#06b6d4' },
  { id: 'print',    label: 'Impressão / Implementação',  color: '#3b82f6' },
  { id: 'standby',  label: 'Stand by',                   color: '#6b7280' },
  { id: 'done',     label: 'Concluído',                  color: '#22c55e' },
];

export const PROJ = [
  '958', 'Balens', 'Cadiveu PT', 'KAMI CO. BR', 'KAMI CO. Holding',
  'KAMI CO. PT', 'Pur Hair PT', 'The Smooth Edit', 'Toctus_KAMI CO.',
];

export const CTYPES = ['Carrossel', 'Estático', 'Reel', 'Storie', 'Vídeo'];
export const FUNNELS = ['Topo', 'Meio', 'Fundo'];
export const CHANNELS = [
  'Instagram Feed', 'Instagram Stories', 'LinkedIn', 'Pinterest',
  'Threads', 'TikTok', 'WhatsApp', 'YouTube',
];

export const TEAM = [
  { id: 'barbara', name: 'Barbara Ciarleglio', color: '#ec4899', initials: 'BC' },
  { id: 'leslie',  name: 'Leslie Arantes',     color: '#7c6af6', initials: 'LA' },
  { id: 'stefany', name: 'Stéfany Dias',        color: '#06b6d4', initials: 'SD' },
];

export const ORDER_TYPES = [
  'Adesivo', 'Apresentações', 'Artes em geral', 'Banner / Rollup', 'Catálogo',
  'Comunicados', 'E-mails', 'Lâminas comerciais — campanhas ou promoções',
  'Outros', 'Papelaria', 'Tabela',
];

export const BIZ_UNITS = [
  '958', 'Balens', 'Cadiveu PT', 'KAMI CO. BR', 'KAMI CO. Group',
  'KAMI CO. PT', 'Pur Hair PT', 'The Smooth', 'Toctus KAMI CO.',
];

export const DELIVERY = ['WhatsApp', 'E-mail'];

export const SECTORS = [
  'Backoffice', 'Comercial', 'CX', 'Diretoria / Sócios', 'Ecommerce',
  'Educação', 'Financeiro', 'Inside Sales', 'KAMI Store', 'Logística',
  'Marketing', 'MKT Aquisição', 'Operações', 'People & Culture',
  'Produção / Eventos', 'Talents', 'TI',
];

export const ROLES = [
  { id: 'admin',   label: 'Admin' },
  { id: 'manager', label: 'Manager' },
  { id: 'member',  label: 'Member' },
];

export const AI_SYSTEM = `Você é um assistente especializado em estruturar calendários de conteúdo de marketing.
Receberá um texto com estratégia ou calendário de conteúdo. Extraia cada peça de conteúdo e retorne APENAS um array JSON válido, sem texto adicional, sem markdown, sem blocos de código.
Para cada peça, crie um objeto com estes campos exatos:
- "title": string (obrigatório)
- "publishDate": string YYYY-MM-DD (ou "")
- "deliveryDate": string YYYY-MM-DD (ou "")
- "project": um de: 958, Balens, Cadiveu PT, KAMI CO. BR, KAMI CO. Holding, KAMI CO. PT, Pur Hair PT, The Smooth Edit, Toctus_KAMI CO. (ou "")
- "contentType": um de: Carrossel, Estático, Reel, Storie, Vídeo (ou "")
- "funnel": um de: Topo, Meio, Fundo (ou "")
- "channel": array, subconjunto de: Instagram Feed, Instagram Stories, LinkedIn, Pinterest, Threads, TikTok, WhatsApp, YouTube
- "briefing": string (ou "")
- "script": string (ou "")
- "caption": string (ou "")
- "publishInstructions": string (ou "")
- "responsible": sempre []
- "status": sempre "ideas"
Retorne APENAS o JSON array. Nada mais.`;
