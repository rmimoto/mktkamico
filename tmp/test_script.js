
// ═══════════════════════════════════════
// PIPELINE 1 — CONTEÚDO
// ═══════════════════════════════════════
const ST = [
  {id:'ideas',        label:'Banco de ideias',        color:'#6366f1'},
  {id:'social-todo',  label:'A Fazer Social Media',   color:'#8b5cf6'},
  {id:'av-todo',      label:'A Fazer Audiovisual',    color:'#ec4899'},
  {id:'cri-todo',     label:'A Fazer Criativo',       color:'#f43f5e'},
  {id:'progress',     label:'Em Andamento',           color:'#f59e0b'},
  {id:'review',       label:'Revisão | Aprovação',    color:'#06b6d4'},
  {id:'final-social', label:'Finalizar Social Media', color:'#3b82f6'},
  {id:'done',         label:'Concluído',              color:'#22c55e'},
  {id:'standby',      label:'Stand by',               color:'#6b7280'},
];
const PROJ = ['958','Balens','Cadiveu PT','KAMI CO. BR','KAMI CO. Holding','KAMI CO. PT','Pur Hair PT','The Smooth Edit','Toctus_KAMI CO.'];
const CTYPES = ['Carrossel','Estático','Reel','Storie','Vídeo'];
const POST_FORMATS = [
  {id:'feed',     label:'Feed',     icon:'📷', color:'#0369a1'},
  {id:'reels',    label:'Reels',    icon:'🎬', color:'#be185d'},
  {id:'stories',  label:'Stories',  icon:'⭕', color:'#7e22ce'},
  {id:'youtube',  label:'YouTube',  icon:'▶',  color:'#dc2626'},
  {id:'tiktok',   label:'TikTok',   icon:'♪',  color:'#111'},
  {id:'linkedin', label:'LinkedIn', icon:'in', color:'#0077b5'},
];
const POST_SUBTYPES = {
  feed:     ['Foto','Vídeo','Carrossel','Texto','Enquete','Link','Produto'],
  reels:    ['Simples','Collab','Remix','Behind the scenes'],
  stories:  ['Imagem','Vídeo','Carrossel','Enquete','Link','Countdown'],
  youtube:  ['Vídeo','Shorts','Live'],
  tiktok:   ['Vídeo','Live','Dueto'],
  linkedin: ['Post','Artigo','Documento','Enquete','Vídeo'],
};
const FUNNELS = ['Topo','Meio','Fundo'];
const CHANNELS = ['Instagram Feed','Instagram Stories','LinkedIn','Pinterest','Threads','TikTok','WhatsApp','YouTube'];
// TEAM é derivado dinamicamente dos usuários cadastrados no sistema
const _TEAM_PALETTE=['#ec4899','#7c6af6','#06b6d4','#f59e0b','#22c55e','#e73a57','#3b82f6','#8b5cf6','#ef4444','#14b8a6'];
function getTeam(){
  return (AUTH.users||[]).map(u=>{
    const parts=(u.name||'').split(' ').filter(Boolean);
    const initials=((parts[0]?.[0]||'')+(parts[parts.length-1]?.[0]||'')).toUpperCase()||'?';
    const ci=Math.abs((u.id||'x').split('').reduce((a,c)=>a+c.charCodeAt(0),0))%_TEAM_PALETTE.length;
    return {name:u.name||'',color:_TEAM_PALETTE[ci],initials,id:u.id,avatar:u.avatar||''};
  });
}

// ═══════════════════════════════════════
// PIPELINE 2 — SOLICITAÇÕES
// ═══════════════════════════════════════
const ST2 = [
  {id:'triage',   label:'Nova solicitação | Triagem', color:'#6366f1'},
  {id:'cri-todo', label:'Criativo | A Fazer',         color:'#8b5cf6'},
  {id:'progress', label:'Em Andamento',               color:'#f59e0b'},
  {id:'waiting',  label:'Aguardando informações',     color:'#f43f5e'},
  {id:'approval', label:'Enviado para aprovação',     color:'#06b6d4'},
  {id:'print',    label:'Impressão / Implementação',  color:'#3b82f6'},
  {id:'standby',  label:'Stand by',                   color:'#6b7280'},
  {id:'done',     label:'Concluído',                  color:'#22c55e'},
];
const ORDER_TYPES = [
  'Adesivo','Apresentações','Artes em geral','Banner / Rollup','Catálogo',
  'Comunicados','E-mails','Lâminas comerciais — campanhas ou promoções',
  'Outros','Papelaria','Tabela'
];
const BIZ_UNITS = [
  '958','Balens','Cadiveu PT','KAMI CO. BR','KAMI CO. Group',
  'KAMI CO. PT','Pur Hair PT','The Smooth','Toctus KAMI CO.'
];
const DELIVERY = ['WhatsApp','E-mail'];
const SECTORS = [
  'Backoffice','Comercial','CX','Diretoria / Sócios','Ecommerce',
  'Educação','Financeiro','Inside Sales','KAMI Store','Logística',
  'Marketing','MKT Aquisição','Operações','People & Culture',
  'Produção / Eventos','Talents','TI'
];

const SOCIAL_PLAT = [
  {id:'instagram',  name:'Instagram',         short:'IG',  color:'#e1306c', grad:'linear-gradient(135deg,#f9ce34,#ee2a7b,#6228d7)'},
  {id:'facebook',   name:'Facebook',           short:'FB',  color:'#1877f2', grad:'#1877f2'},
  {id:'tiktok',     name:'TikTok',             short:'TK',  color:'#010101', grad:'linear-gradient(135deg,#010101,#69c9d0)'},
  {id:'linkedin',   name:'LinkedIn',            short:'LI',  color:'#0077b5', grad:'#0077b5'},
  {id:'youtube',    name:'YouTube',            short:'YT',  color:'#ff0000', grad:'#ff0000'},
  {id:'threads',    name:'Threads',            short:'TH',  color:'#1c1c1c', grad:'#1c1c1c'},
  {id:'pinterest',  name:'Pinterest',          short:'PT',  color:'#e60023', grad:'#e60023'},
  {id:'twitter',    name:'X (Twitter)',        short:'X',   color:'#111',    grad:'#111'},
  {id:'google_biz', name:'Google Meu Negócio', short:'GMN', color:'#34a853', grad:'#34a853'},
  {id:'meta_ads',   name:'Meta Ads',           short:'MA',  color:'#0082fb', grad:'#0082fb'},
  {id:'google_ads', name:'Google Ads',         short:'GA',  color:'#4285f4', grad:'linear-gradient(135deg,#4285f4,#34a853,#ea4335)'},
];
const SOC_POST_STATUS = [
  {id:'draft',     label:'Rascunho',             bg:'#fef9c3', color:'#a16207'},
  {id:'pending',   label:'Aguardando aprovação', bg:'#f3e8ff', color:'#7e22ce'},
  {id:'approved',  label:'Aprovado',             bg:'#cffafe', color:'#0e7490'},
  {id:'scheduled', label:'Agendado',             bg:'#dcfce7', color:'#166534'},
  {id:'published', label:'Publicado',            bg:'#e0e7ff', color:'#4338ca'},
  {id:'failed',    label:'Falhou',               bg:'#fee2e2', color:'#dc2626'},
];
const SOC_CONTENT_TYPES = {
  instagram:  ['Feed','Reels','Stories','Carrossel'],
  facebook:   ['Post','Reels','Stories'],
  tiktok:     ['Vídeo'],
  linkedin:   ['Post','Artigo'],
  linkedin_p: ['Post','Artigo'],
  youtube:    ['Vídeo','Shorts'],
  threads:    ['Post'],
  twitter:    ['Tweet'],
  pinterest:  ['Pin'],
  google_biz: ['Post'],
};
const KEY_SOC_ACC  = 'kami-mkt-soc-acc-v1';
const KEY_SOC_POST = 'kami-mkt-soc-post-v1';
const KEY_SOC_COMP = 'kami-mkt-soc-comp-v1';

const KEY1 = 'kami-mkt-v2';
const KEY2 = 'kami-mkt-req-v1';
const KEY_USERS   = 'kami-mkt-users-v1';
const KEY_SESSION = 'kami-mkt-session-v1';
const KEY_APIKEY  = 'kami-mkt-apikey-v1';
const KEY_PORTAL  = 'kami-mkt-portal-v5';
const KEY_AUTO = 'kami-mkt-auto-v1';

// ── Firebase ─────────────────────────────
// Preencha após criar o projeto no Firebase Console
const FB_URL   = '';  // ex: https://seu-projeto-default-rtdb.firebaseio.com
const FB_TOKEN = '';  // Database Secret (Project Settings → Service Accounts → Database secrets)

async function fbGet(path){
  const r=await fetch(`${FB_URL}/${path}.json?auth=${FB_TOKEN}`);
  if(!r.ok)throw new Error(`Firebase ${r.status}`);
  return r.json();
}
function fbSet(path,data){
  // fire-and-forget
  fetch(`${FB_URL}/${path}.json?auth=${FB_TOKEN}`,{
    method:'PUT',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(data),
  }).catch(e=>console.error('Firebase save error:',e));
}

// ═══════════════════════════════════════
// STATE
// ═══════════════════════════════════════
let _newUserAvatar = '';
let _confirmCallback = null;

function uavatar(u, size=28){
  const initials=(u.name||'?').split(' ').map(w=>w[0]||'').join('').slice(0,2).toUpperCase()||'?';
  const palette=['#ec4899','#7c6af6','#06b6d4','#f59e0b','#22c55e','#e73a57','#3b82f6'];
  const ci=Math.abs((u.id||'x').split('').reduce((a,c)=>a+c.charCodeAt(0),0))%palette.length;
  const s=`width:${size}px;height:${size}px;border-radius:50%;flex-shrink:0;`;
  if(u.avatar)return`<img src="${u.avatar}" style="${s}object-fit:cover;display:block;" alt="${esc(initials)}">`;
  return`<div style="${s}background:${palette[ci]};display:flex;align-items:center;justify-content:center;font-size:${Math.floor(size*.38)}px;font-weight:800;color:#fff;letter-spacing:-.5px;">${initials}</div>`;
}

// ═══════════════════════════════════════
// AI IMPORT STATE
// ═══════════════════════════════════════
let AI = {open:false,loading:false,error:'',preview:[],step:'input'};

const AI_SYSTEM = `Você é um assistente especializado em estruturar calendários de conteúdo de marketing.
Receberá um texto com estratégia ou calendário de conteúdo. Extraia cada peça de conteúdo e retorne APENAS um array JSON válido, sem texto adicional, sem markdown, sem blocos de código.
Para cada peça, crie um objeto com estes campos exatos:
- "title": string (obrigatório, título da publicação)
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

async function callClaude(text, apiKey){
  const resp = await fetch('https://api.anthropic.com/v1/messages',{
    method:'POST',
    headers:{
      'x-api-key':apiKey,
      'anthropic-version':'2023-06-01',
      'content-type':'application/json',
      'anthropic-dangerous-direct-browser-access':'true',
    },
    body:JSON.stringify({
      model:'claude-opus-4-7',
      max_tokens:8192,
      system:AI_SYSTEM,
      messages:[{role:'user',content:text}],
    }),
  });
  if(!resp.ok){
    let msg=`Erro ${resp.status}`;
    try{const e=await resp.json();msg=e.error?.message||msg;}catch(e2){}
    throw new Error(msg);
  }
  const data=await resp.json();
  const raw=data.content[0].text.trim().replace(/^```(?:json)?\n?/,'').replace(/\n?```$/,'').trim();
  return JSON.parse(raw);
}

// ═══════════════════════════════════════
// AUTH STATE
// ═══════════════════════════════════════
let AUTH = {
  users: [],
  session: null,
  showLogin: true,
  showUsersModal: false,
  loginError: '',
};

function hashPwd(pwd){
  let h=5381;
  for(let i=0;i<pwd.length;i++)h=((h<<5)+h)^pwd.charCodeAt(i);
  return'k'+(h>>>0).toString(16);
}
async function loadUsers(){
  try{
    if(FB_URL){const d=await fbGet('users');if(Array.isArray(d)&&d.length){AUTH.users=d;}}
    else{const r=localStorage.getItem(KEY_USERS);if(r){AUTH.users=JSON.parse(r);}}
  }catch(e){console.error('loadUsers:',e);}
  if(!AUTH.users.length){
    AUTH.users=[{id:'admin-default',email:'admin@marketing.com',name:'Administrador',role:'admin',access:[],pwd:hashPwd('Admin@123'),avatar:'',department:'',position:'',supervisor:'',birthdate:'',workPhone:'',mobilePhone:'',city:''}];
    saveUsers();
  }
  // Migrate existing users that don't have the access field or new profile fields
  AUTH.users=AUTH.users.map(u=>{
    let updated={...u};
    if(u.access===undefined){
      let access=[];
      if(u.role==='user')access=['dash','content','requests','social'];
      else if(u.role==='portal')access=['portal-geral','portal-rep-br','portal-rep-pt'];
      else if(u.role==='rep-br')access=['portal-geral','portal-rep-br'];
      else if(u.role==='rep-pt')access=['portal-geral','portal-rep-pt'];
      const newRole=u.role==='admin'?'admin':'user';
      updated={...updated,role:newRole,access};
    }
    // Migrate new profile fields
    if(updated.department===undefined)updated.department='';
    if(updated.position===undefined)updated.position='';
    if(updated.supervisor===undefined)updated.supervisor='';
    if(updated.birthdate===undefined)updated.birthdate='';
    if(updated.workPhone===undefined)updated.workPhone='';
    if(updated.mobilePhone===undefined)updated.mobilePhone='';
    if(updated.city===undefined)updated.city='';
    return updated;
  });
}
function saveUsers(){
  if(FB_URL){fbSet('users',AUTH.users);return;}
  try{
    localStorage.setItem(KEY_USERS,JSON.stringify(AUTH.users));
  }catch(e){
    console.error('saveUsers error:',e);
    alert('Erro ao salvar usuários: '+e.message);
  }
}
function loadSession(){
  try{
    const r=localStorage.getItem(KEY_SESSION);
    if(r){const s=JSON.parse(r);const u=AUTH.users.find(x=>x.id===s.id);if(u){AUTH.session=s;AUTH.showLogin=false;return;}}
  }catch(e){}
  AUTH.showLogin=true;
}
function saveSession(remember){
  const data=JSON.stringify(AUTH.session);
  if(remember){localStorage.setItem(KEY_SESSION,data);sessionStorage.removeItem(KEY_SESSION);}
  else{sessionStorage.setItem(KEY_SESSION,data);localStorage.removeItem(KEY_SESSION);}
}
function clearSession(){
  AUTH.session=null;AUTH.showLogin=true;
  localStorage.removeItem(KEY_SESSION);sessionStorage.removeItem(KEY_SESSION);
}
function loadSession(){
  try{
    const r=localStorage.getItem(KEY_SESSION)||sessionStorage.getItem(KEY_SESSION);
    if(r){const s=JSON.parse(r);const u=AUTH.users.find(x=>x.id===s.id);if(u){AUTH.session=s;AUTH.showLogin=false;setRolePipe(s.role, s.access||[]);return;}}
  }catch(e){}
  AUTH.showLogin=true;
}
function canAccess(key){
  const u=AUTH.session;
  if(!u)return false;
  if(u.role==='admin')return true;
  return (u.access||[]).includes(key);
}
function getUserStartPipe(u){
  if(!u)return'content';
  if(u.role==='admin')return'dash';
  const a=u.access||[];
  if(a.includes('dash'))return'dash';
  if(a.includes('content'))return'content';
  if(a.includes('requests'))return'requests';
  if(a.includes('social'))return'social';
  if(a.some(x=>x.startsWith('portal-')))return'portal';
  return'content';
}
function setRolePipe(role, access){
  const fakeU={role, access:access||[]};
  S.pipe=getUserStartPipe(fakeU);
  // Restaura navegação salva antes do F5
  try{
    const saved=JSON.parse(sessionStorage.getItem('kami-nav')||'null');
    if(saved){
      const validPipes=['dash','content','requests','social','portal'];
      if(saved.pipe&&validPipes.includes(saved.pipe)){
        // verifica se o usuário tem acesso a essa pipe
        const canGo=role==='admin'||(saved.pipe==='dash'&&(access||[]).includes('dash'))||(saved.pipe==='content'&&(access||[]).includes('content'))||(saved.pipe==='requests'&&(access||[]).includes('requests'))||(saved.pipe==='social'&&(access||[]).includes('social'))||(saved.pipe==='portal');
        if(canGo){
          S.pipe=saved.pipe;
          if(saved.portal_current!==undefined)S.portal_current=saved.portal_current;
          if(saved.social_view)S.social_view=saved.social_view;
          if(saved.view)S.view=saved.view;
          if(saved.view2)S.view2=saved.view2;
        }
      }
    }
  }catch(e){}
}
function isPortalRole(role){
  // used in hdr() — replaced below, keep for compat
  return false;
}
function getPortalAccess(){
  const u=AUTH.session;
  if(!u||u.role==='admin')return null;
  const a=u.access||[];
  const allowed=[];
  if(a.includes('portal-geral'))allowed.push('geral');
  if(a.includes('portal-rep-br'))allowed.push('rep-br');
  if(a.includes('portal-rep-pt'))allowed.push('rep-pt');
  return allowed.length?allowed:[];
}
function doLogin(email,pwd,remember){
  const typed=email.toLowerCase().trim();
  const hash=hashPwd(pwd);
  // find by email only first
  const byEmail=AUTH.users.find(x=>x.email.toLowerCase().trim()===typed);
  if(!byEmail){
    AUTH.loginError=`E-mail não encontrado. (${AUTH.users.length} usuário(s) cadastrado(s))`;
    return false;
  }
  if(byEmail.pwd!==hash){
    AUTH.loginError=`Senha incorreta para ${byEmail.email}.`;
    return false;
  }
  const u=byEmail;
  AUTH.session={id:u.id,email:u.email,name:u.name,role:u.role,access:u.access||[],mustChangePassword:!!u.mustChangePassword};
  AUTH.showLogin=false;AUTH.loginError='';
  setRolePipe(u.role, u.access||[]);
  saveSession(remember);return true;
}
function togglePwd(inputId, btn){
  const el=document.getElementById(inputId);
  if(!el)return;
  const show=el.type==='password';
  el.type=show?'text':'password';
  btn.textContent=show?'🙈':'👁';
}

function genTempPwd(){
  return 'kami123';
}
function doLogout(){clearSession();render();}

let S = {
  pipe: 'content',
  // pipeline 1
  cards: [],
  view: 'kanban',
  filters: {search:'',project:'',type:'',funnel:'',channel:'',status:'',responsible:''},
  modal: {open:false,id:null,defStatus:'ideas',tab:'basic'},
  sort: {field:'publishDate',dir:'asc'},
  // pipeline 2
  requests: [],
  view2: 'kanban',
  filters2: {search:'',unit:'',orderType:'',status:'',responsible2:''},
  modal2: {open:false,id:null,defStatus:'triage',tab:'form',attachmentName:''},
  sort2: {field:'createdAt',dir:'desc'},
  startup_alert_dismissed: false,
  confirm: {open:false, title:'', message:''},
  // pipeline 3 — social
  social_view: 'dashboard',
  social_accounts: [],
  social_posts: [],
  social_competitors: [],
  social_cal_date: null,
  social_selected_acc: null,
  soc_adv_open: false,
  social_show_profiles: false,
  social_profile_search: '',
  modal_soc: {open:false, platform:null},
  schedule_form: {profiles:[], channels:[], text:'', hashtags:'', mediaName:'', date:'', time:'18:00', postStatus:'draft', contentTypes:{}, firstComment:'', tags:'', igFormat:'Feed', altText:'', location:'', shareToFacebook:false, collabUser:'', paidPartnership:'', shopTag:'', disableComments:false, peopleTags:'', shareToFeed:false, isTest:false, storyLink:''},
  portal_content: null,
  portal_current: null,
  portal_editing_id: null,
  portal_item_modal: {open:false, portalId:null, secId:null, itemIdx:null}, // null itemIdx = new
  portal_legend_modal: {open:false, portalId:null},
  portal_dup_modal: {open:false, item:null, sourcePortalId:null, sourceSecId:null},
  marcas_active_brand: null,
  _pwdChangeError: '',
  showProfileModal: false,
  editUserModal: {open:false, uid:null},
  automations: [],
  show_automations: false,
};

async function load(){
  try{
    if(FB_URL){
      const[d1,d2]=await Promise.all([fbGet('cards'),fbGet('requests')]);
      S.cards=Array.isArray(d1)?d1:[];
      S.requests=Array.isArray(d2)?d2:[];
    } else {
      try{const r=localStorage.getItem(KEY1);if(r)S.cards=JSON.parse(r);}catch(e){}
      try{const r=localStorage.getItem(KEY2);if(r)S.requests=JSON.parse(r);}catch(e){}
      try{const r=localStorage.getItem(KEY_SOC_ACC);if(r)S.social_accounts=JSON.parse(r);}catch(e){}
      try{const r=localStorage.getItem(KEY_SOC_POST);if(r)S.social_posts=JSON.parse(r);}catch(e){}
      try{const r=localStorage.getItem(KEY_SOC_COMP);if(r)S.social_competitors=JSON.parse(r);}catch(e){}
      try{const r=localStorage.getItem(KEY_PORTAL);if(r)S.portal_content=JSON.parse(r);}catch(e){}
      try{const r=localStorage.getItem(KEY_AUTO);if(r)S.automations=JSON.parse(r);}catch(e){}
      if(!S.portal_content||!Array.isArray(S.portal_content.portals))S.portal_content={portals:[
        {id:'geral',name:'Central Corporativa',description:'Todos os portais e formulários interativos das áreas de apoio da KAMI CO.',icon:'img:kami-logo.png.png',color:'#3a3434',sections:[
          {id:'start',title:'Por onde começar',items:[
            {icon:'📋',title:'Cartilha de Melhores Práticas',desc:'Conheça todos os processos do dia a dia e as principais dúvidas respondidas.',url:'',color:'#3a3434'}
          ]},
          {id:'mkt',title:'Marketing Institucional',items:[
            {icon:'📢',title:'Fluxo de Comunicação',desc:'Entenda como funciona o fluxo de comunicação da KAMI CO.',url:'',color:'#c8192b'},
            {icon:'🎨',title:'Solicitação de Artes — Comunicado',desc:'Solicite ao time Criativo comunicados internos e externos.',url:'',color:'#c8192b'},
            {icon:'📊',title:'Template Canva — Com Institucional',desc:'Template para apresentações com identidade institucional.',url:'',color:'#c8192b'},
            {icon:'📊',title:'Template Canva — Padrão',desc:'Template padrão para apresentações.',url:'',color:'#c8192b'},
            {icon:'🖥️',title:'Fundo de Tela Oficial',desc:'Fundo de tela KAMI CO. para seu computador.',url:'',color:'#c8192b'}
          ]},
          {id:'papelaria',title:'Papelaria & Assinaturas de E-mail',items:[
            {icon:'💳',title:'Cartão de Visita Digital — Holding KAMI CO. Group',desc:'',url:'',color:'#1c1c1c'},
            {icon:'💳',title:'Cartão de Visita Digital — KAMI CO. Soluções',desc:'',url:'',color:'#1c1c1c'},
            {icon:'💳',title:'Cartão de Visita Digital — HAIR PRO',desc:'',url:'',color:'#1c1c1c'},
            {icon:'💳',title:'Cartão de Visita Digital — Ondina',desc:'',url:'',color:'#1c1c1c'},
            {icon:'✉️',title:'Assinatura de E-mail — KAMI CO. Distribuição BR e PT',desc:'',url:'',color:'#3a3434'},
            {icon:'✉️',title:'Assinatura de E-mail — Hair PRO',desc:'',url:'',color:'#3a3434'},
            {icon:'✉️',title:'Assinatura de E-mail — Ondina',desc:'',url:'',color:'#3a3434'},
            {icon:'✉️',title:'Assinatura de E-mail — KAMI CO. Group',desc:'Apenas para áreas de apoio: CX, Financeiro, Operações, People & Culture.',url:'',color:'#3a3434'}
          ]},
          {id:'social',title:'Redes Sociais & Materiais Institucionais',items:[
            {icon:'📱',title:'Nossas Redes Sociais Oficiais',desc:'Todas as mídias geridas pelo time de Marketing da KAMI CO.',url:'',color:'#0369a1'},
            {icon:'▶️',title:'Vídeo Institucional — YouTube',desc:'',url:'',color:'#dc2626'},
            {icon:'📁',title:'Vídeo Institucional — Arquivo',desc:'',url:'',color:'#1c1c1c'},
            {icon:'📑',title:'Apresentação Institucional KAMI CO.',desc:'',url:'',color:'#3a3434'},
            {icon:'🔒',title:'Manual de Identidade KAMI CO.',desc:'⚠️ Apenas para uso interno. Não compartilhe externamente.',url:'',color:'#dc2626'}
          ]},
          {id:'fin',title:'Financeiro',items:[
            {icon:'💰',title:'Solicitação de Pagamento / Reembolso',desc:'',url:'',color:'#166534'},
            {icon:'🏢',title:'Cadastro de Novos Fornecedores',desc:'',url:'',color:'#166534'},
            {icon:'📖',title:'Como lançar um pedido de Pagamento',desc:'Tutorial passo a passo.',url:'',color:'#166534'}
          ]},
          {id:'fac',title:'Facilities',items:[
            {icon:'✈️',title:'Solicitação de Viagem',desc:'',url:'',color:'#7e22ce'},
            {icon:'🔧',title:'Solicitação de Compras e Manutenções',desc:'',url:'',color:'#7e22ce'}
          ]},
          {id:'ops',title:'Operações',items:[
            {icon:'📊',title:'Sugestões ou Correções — DataBeauty',desc:'',url:'',color:'#0369a1'},
            {icon:'⚙️',title:'Solicitações ou Problemas com Processos e Ferramentas',desc:'',url:'',color:'#0369a1'}
          ]},
          {id:'benefits',title:'Benefícios para Colaboradores',items:[
            {icon:'🛍️',title:'Solicitar Produtos do Portfólio',desc:'Desconto exclusivo para colaboradores KAMI CO.',url:'',color:'#c8192b'},
            {icon:'📋',title:'Tabela de Preços — Brasil',desc:'',url:'',color:'#009c3b'},
            {icon:'📋',title:'Tabela de Preços — E-com',desc:'',url:'',color:'#009c3b'}
          ]}
        ]},
        {id:'rep-br',name:'Central do Representante',description:'Recursos, formulários e canais de atendimento para representantes no Brasil.',icon:'img:https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f1e7-1f1f7.svg',color:'#009c3b',badge:'Brasil',sections:[{id:'atend',title:'Cadastro e Atendimento',items:[]},{id:'fin',title:'Financeiro',items:[]},{id:'mkt',title:'Marketing',items:[]},{id:'trade',title:'Trade Marketing',items:[]},{id:'edu',title:'Educação',items:[]},{id:'marcas',title:'Portal das Marcas',items:[{icon:'🏷️',title:'Acessar Portal das Marcas',desc:'Links de acesso a todas as marcas do portfólio KAMI CO. no Brasil.',url:'portal:marcas-br',color:'#c8192b',links:[]}]}]},
        {id:'rep-pt',name:'Central do Representante',description:'Recursos, formulários e canais de atendimento para representantes em Portugal.',icon:'img:https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f1f5-1f1f9.svg',color:'#d60000',badge:'Portugal',sections:[{id:'atend',title:'Cadastro e Atendimento',items:[]},{id:'fin',title:'Financeiro',items:[]},{id:'mkt',title:'Marketing',items:[]},{id:'trade',title:'Trade Marketing',items:[]},{id:'edu',title:'Educação',items:[]},{id:'marcas',title:'Portal das Marcas',items:[{icon:'🏷️',title:'Acessar Portal das Marcas',desc:'Links de acesso a todas as marcas do portfólio KAMI CO. em Portugal.',url:'portal:marcas-pt',color:'#d60000',links:[]}]}]},
        {id:'marcas-br',name:'Portal das Marcas',description:'Links de acesso a todas as marcas do portfólio KAMI CO. no Brasil.',icon:'🏷️',color:'#c8192b',badge:'🇧🇷 Brasil',hidden:true,sections:[]},
        {id:'marcas-pt',name:'Portal das Marcas',description:'Links de acesso a todas as marcas do portfólio KAMI CO. em Portugal.',icon:'🏷️',color:'#166534',badge:'🇵🇹 Portugal',hidden:true,sections:[]}
      ],current:null};
    }
    // Migração: renomeia portais e adiciona portais de marcas se não existirem (preserva dados existentes)
    if(S.portal_content&&Array.isArray(S.portal_content.portals)){
      const nameMap={'geral':'Central Corporativa','rep-br':'Central do Representante','rep-pt':'Central do Representante'};
      S.portal_content.portals.forEach(p=>{
        if(nameMap[p.id])p.name=nameMap[p.id];
        if(!p.legend)p.legend=[];
      });
      // Copia legenda da Central Corporativa para os Representantes se eles estiverem vazios
      const geralPortal=S.portal_content.portals.find(p=>p.id==='geral');
      if(geralPortal&&geralPortal.legend&&geralPortal.legend.length){
        ['rep-br','rep-pt','marcas-br','marcas-pt'].forEach(pid=>{
          const rep=S.portal_content.portals.find(p=>p.id===pid);
          if(rep&&(!rep.legend||!rep.legend.length)){
            rep.legend=[...geralPortal.legend.map(l=>({...l}))];
          }
        });
      }
      const ids=S.portal_content.portals.map(p=>p.id);
      const brandSections=brands=>{
        const cats=[
          {id:'catalogo',title:'Catálogo KAMI CO.'},
          {id:'tabela',title:'Tabela de Preço KAMI CO.'},
          {id:'portfolio',title:'Portfólio da Marca'},
          {id:'produtos',title:'Produtos'},
          {id:'videos',title:'Vídeos'},
          {id:'ficha',title:'Ficha Técnica'},
        ];
        return brands.map(brand=>({
          id:brand.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,''),
          title:brand,
          logo:'',
          items:cats.map(cat=>({title:cat.title,desc:'',color:'#c8192b',links:[{label:brand,url:''}],syncId:null}))
        }));
      };
      if(!ids.includes('marcas-br'))S.portal_content.portals.push({id:'marcas-br',name:'Central das Marcas',description:'Links de acesso a todas as marcas do portfólio KAMI CO. no Brasil.',icon:'🏷️',color:'#c8192b',badge:'Brasil',hidden:true,sections:brandSections(['Balens','The Smooth Edit','Toctus','Joico'])});
      if(!ids.includes('marcas-pt'))S.portal_content.portals.push({id:'marcas-pt',name:'Central das Marcas',description:'Links de acesso a todas as marcas do portfólio KAMI CO. em Portugal.',icon:'🏷️',color:'#166534',badge:'Portugal',hidden:true,sections:brandSections(['Balens','The Smooth Edit','Toctus','Joico'])});
      // Migra marcas existentes sem seções
      ['marcas-br','marcas-pt'].forEach(mid=>{
        const mp=S.portal_content.portals.find(p=>p.id===mid);
        if(mp&&(!mp.sections||!mp.sections.length)){
          const cats=[{id:'catalogo',title:'Catálogo KAMI CO.'},{id:'tabela',title:'Tabela de Preço KAMI CO.'},{id:'portfolio',title:'Portfólio da Marca'},{id:'produtos',title:'Produtos'},{id:'videos',title:'Vídeos'},{id:'ficha',title:'Ficha Técnica'}];
          mp.sections=['Balens','The Smooth Edit','Toctus','Joico'].map(brand=>({id:brand.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,''),title:brand,items:cats.map(cat=>({title:cat.title,desc:'',color:mp.color||'#c8192b',links:[{label:brand,url:''}],syncId:null}))}));
          mp.name='Central das Marcas';mp.badge=mid==='marcas-br'?'Brasil':'Portugal';
        }
      });
      // Garante que portais rep-br/rep-pt têm seção marcas com item de link interno
      ['rep-br','rep-pt'].forEach(pid=>{
        const p=S.portal_content.portals.find(x=>x.id===pid);
        if(!p)return;
        let sec=p.sections?.find(s=>s.id==='marcas');
        if(!sec){if(!p.sections)p.sections=[];sec={id:'marcas',title:'Portal das Marcas',items:[]};p.sections.push(sec);}
        const portalId=pid==='rep-br'?'marcas-br':'marcas-pt';
        const portalUrl=`portal:${portalId}`;
        const hasLink=sec.items?.some(i=>i.url===portalUrl||(i.links||[]).some(l=>l.url===portalUrl));
        // Remove duplicates — keep only the first item linking to this portal
        if(sec.items){
          let kept=false;
          sec.items=sec.items.filter(i=>{
            const isThis=i.url===portalUrl||(i.links||[]).some(l=>l.url===portalUrl);
            if(isThis){if(!kept){kept=true;return true;}return false;}
            return true;
          });
        }
        if(!hasLink){if(!sec.items)sec.items=[];sec.items.push({icon:'🏷️',title:'Acessar Portal das Marcas',desc:'Links de acesso a todas as marcas do portfólio KAMI CO.',url:portalUrl,color:p.color||'#c8192b',links:[]});}
      });
    }
  }catch(e){console.error('load:',e);}
}
function save1(){
  if(FB_URL){fbSet('cards',S.cards);return;}
  try{localStorage.setItem(KEY1,JSON.stringify(S.cards));}
  catch(e){console.error('save1 error:',e);alert('Erro ao salvar: armazenamento local indisponível ou cheio.\n\nO card foi criado na sessão atual mas não será mantido após recarregar a página.');}
}
function save2(){
  if(FB_URL){fbSet('requests',S.requests);return;}
  try{localStorage.setItem(KEY2,JSON.stringify(S.requests));}
  catch(e){console.error('save2 error:',e);alert('Erro ao salvar: armazenamento local indisponível ou cheio.\n\nA solicitação foi criada na sessão atual mas não será mantida após recarregar a página.');}
}
function save_soc_acc(){
  try{localStorage.setItem(KEY_SOC_ACC,JSON.stringify(S.social_accounts));}
  catch(e){console.error('save_soc_acc:',e);}
}
function save_soc_post(){
  try{localStorage.setItem(KEY_SOC_POST,JSON.stringify(S.social_posts));}
  catch(e){console.error('save_soc_post:',e);}
}
function save_soc_comp(){
  try{localStorage.setItem(KEY_SOC_COMP,JSON.stringify(S.social_competitors||[]));}
  catch(e){console.error('save_soc_comp:',e);}
}
function save_portal(){
  try{localStorage.setItem(KEY_PORTAL,JSON.stringify(S.portal_content));}
  catch(e){console.error('save_portal:',e);}
}
function save_auto(){
  try{localStorage.setItem(KEY_AUTO,JSON.stringify(S.automations));}
  catch(e){console.error('save_auto:',e);}
}
function runAutomations(card, trigger, pipeline='content'){
  const rules=(S.automations||[]).filter(r=>r.active&&r.pipeline===pipeline&&r.trigger===trigger);
  let changed=false;
  rules.forEach(rule=>{
    // Check ALL conditions
    const match=rule.conditions.every(cond=>{
      const val=card[cond.field];
      switch(cond.operator){
        case 'equals': return Array.isArray(val)?val.includes(cond.value):val===cond.value;
        case 'not_equals': return Array.isArray(val)?!val.includes(cond.value):val!==cond.value;
        case 'contains': return String(val||'').toLowerCase().includes(String(cond.value).toLowerCase());
        case 'is_empty': return !val||val.length===0;
        default: return true;
      }
    });
    if(!match)return;
    // Execute actions
    rule.actions.forEach(action=>{
      switch(action.type){
        case 'assign_responsible':
          if(action.value&&!(card.responsible||[]).includes(action.value)){
            if(!card.responsible)card.responsible=[];
            card.responsible.push(action.value);
            changed=true;
          }
          break;
        case 'set_status':
          if(action.value&&card.status!==action.value){
            card.status=action.value;
            changed=true;
          }
          break;
        case 'set_project':
          if(action.value&&card.project!==action.value){
            card.project=action.value;
            changed=true;
          }
          break;
      }
    });
  });
  return changed;
}
function gplat(id){return SOCIAL_PLAT.find(p=>p.id===id)||{id,name:id,short:(id||'?').slice(0,2).toUpperCase(),color:'#999',grad:'#999'};}
function gpoststat(id){return SOC_POST_STATUS.find(s=>s.id===id)||SOC_POST_STATUS[0];}

// ═══════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════
function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,6);}
function esc(s){if(!s)return'';return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function fdate(d){if(!d)return'—';const[y,m,dd]=d.split('-');return`${dd}/${m}`;}
function fdatefull(d){if(!d)return'—';const[y,m,dd]=d.split('-');return`${dd}/${m}/${y}`;}
function gst(id){return ST.find(s=>s.id===id)||ST[0];}
function gst2(id){return ST2.find(s=>s.id===id)||ST2[0];}
function tcls(t){return{Reel:'t-r',Carrossel:'t-c','Estático':'t-s','Vídeo':'t-v',Storie:'t-st'}[t]||'t-s';}
function fcls(f){return{Topo:'t-top',Meio:'t-mid',Fundo:'t-bot'}[f]||'';}
function viacls(v){return v==='WhatsApp'?'t-via-w':'t-via-e';}

function filtered1(){
  let c=S.cards;const f=S.filters;
  if(f.search){const q=f.search.toLowerCase();c=c.filter(x=>x.title.toLowerCase().includes(q));}
  if(f.project)c=c.filter(x=>x.project===f.project);
  if(f.type)c=c.filter(x=>x.contentType===f.type);
  if(f.funnel)c=c.filter(x=>x.funnel===f.funnel);
  if(f.status)c=c.filter(x=>x.status===f.status);
  if(f.channel)c=c.filter(x=>x.channel&&x.channel.includes(f.channel));
  if(f.responsible)c=c.filter(x=>x.responsible&&x.responsible.includes(f.responsible));
  return c;
}
function filtered2(){
  let c=S.requests;const f=S.filters2;
  if(f.search){const q=f.search.toLowerCase();c=c.filter(x=>((x.requestTitle||x.nome||'')).toLowerCase().includes(q));}
  if(f.status)c=c.filter(x=>x.status===f.status);
  if(f.responsible2)c=c.filter(x=>x.responsible&&x.responsible.includes(f.responsible2));
  return c;
}

// ═══════════════════════════════════════
// RENDER
// ═══════════════════════════════════════
function render(){
  if(AUTH.showLogin){
    document.getElementById('root').innerHTML=renderLogin();
    bindLogin();
    return;
  }
  if(AUTH.session&&AUTH.session.mustChangePassword){
    document.getElementById('root').innerHTML=renderForcePasswordChange();
    bindChangePwd();
    return;
  }
  // Salva estado de navegação para restaurar no F5
  if(AUTH.session){
    try{sessionStorage.setItem('kami-nav',JSON.stringify({pipe:S.pipe,portal_current:S.portal_current,social_view:S.social_view,view:S.view,view2:S.view2}));}catch(e){}
  }
  document.getElementById('root').innerHTML=html();
  bind();
  if(S.pipe==='dash') setTimeout(initDashCharts, 50);
}

function renderLogin(){
  return`<div class="login-wrap">
    <div class="login-card">
      <div class="login-brand"><img src="kami-logo.png.png" style="height:34px;width:auto;flex-shrink:0;display:block;"><span>MAR<b>K</b>ETING</span></div>
      <div class="login-sub">Acesso ao sistema</div>
      <div class="login-err${AUTH.loginError?'':' hide'}" id="loginErr">${esc(AUTH.loginError)}</div>
      <form id="loginForm" autocomplete="on">
        <div class="fg" style="margin-bottom:10px;">
          <label>E-mail</label>
          <input type="email" name="email" placeholder="seu@email.com" required autocomplete="username">
        </div>
        <div class="fg" style="margin-bottom:14px;">
          <label>Senha</label>
          <div class="pwd-wrap">
            <input type="password" name="pwd" id="login-pwd" placeholder="••••••••" required autocomplete="current-password">
            <button type="button" class="pwd-toggle" onclick="togglePwd('login-pwd',this)" tabindex="-1">👁</button>
          </div>
        </div>
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer;margin-bottom:16px;user-select:none;">
          <input type="checkbox" name="remember" style="accent-color:var(--ac);width:14px;height:14px;cursor:pointer;">
          <span style="font-size:12px;color:var(--t2);">Lembrar-me</span>
        </label>
        <button type="submit" class="btn btn-p" style="width:100%;justify-content:center;padding:9px 14px;font-size:13px;">Entrar</button>
      </form>
    </div>
  </div>`;
}

function bindLogin(){
  const form=document.getElementById('loginForm');
  if(!form)return;
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const email=form.querySelector('[name="email"]').value;
    const pwd=form.querySelector('[name="pwd"]').value;
    const remember=form.querySelector('[name="remember"]').checked;
    if(!doLogin(email,pwd,remember)){
      const errEl=document.getElementById('loginErr');
      if(errEl){errEl.textContent=AUTH.loginError;errEl.classList.remove('hide');}
    } else {render();}
  });
}
function renderForcePasswordChange(){
  const u=AUTH.session;
  return`<div class="login-wrap" style="overflow-y:auto;">
    <div class="login-card" style="max-width:520px;width:100%;">
      <div class="login-brand"><img src="kami-logo.png.png" style="height:34px;width:auto;flex-shrink:0;display:block;"><span>MAR<b>K</b>ETING</span></div>
      <div style="text-align:center;margin-bottom:12px;">
        <div style="font-size:15px;font-weight:800;color:var(--t1);margin-bottom:4px;">Bem-vinda, ${esc(u?.name?.split(' ')[0]||'')}! 👋</div>
        <div style="font-size:12px;color:var(--t3);">Complete seu cadastro para acessar o sistema.</div>
        <ul style="margin-top:10px;text-align:left;font-size:11px;color:var(--t3);padding-left:18px;display:inline-block;">
          <li>Mínimo 8 caracteres</li>
          <li>Pelo menos 1 letra maiúscula</li>
          <li>Pelo menos 1 número</li>
          <li>Pelo menos 1 caractere especial (ex: @, #, !)</li>
        </ul>
      </div>
      <div class="login-err${S._pwdChangeError?' ':' hide'}" id="pwdChangeErr">${esc(S._pwdChangeError||'')}</div>
      <form id="changePwdForm" autocomplete="off">

        <!-- Senha -->
        <div style="font-size:10px;font-weight:700;color:var(--ac);text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px;padding-bottom:6px;border-bottom:1px solid var(--b);">🔐 Crie sua senha</div>
        <div class="r2" style="margin-bottom:10px;">
          <div class="fg">
            <label>Nova senha <span class="req">*</span></label>
            <div class="pwd-wrap">
              <input type="password" name="newpwd" id="changepwd1" placeholder="Mínimo 8 caracteres" required autocomplete="new-password">
              <button type="button" class="pwd-toggle" onclick="togglePwd('changepwd1',this)" tabindex="-1">👁</button>
            </div>
            <div style="font-size:10px;color:var(--t3);margin-top:3px;">Maiúscula, número e caractere especial.</div>
          </div>
          <div class="fg">
            <label>Confirmar senha <span class="req">*</span></label>
            <div class="pwd-wrap">
              <input type="password" name="newpwd2" id="changepwd2" placeholder="Repita a senha" required autocomplete="new-password">
              <button type="button" class="pwd-toggle" onclick="togglePwd('changepwd2',this)" tabindex="-1">👁</button>
            </div>
          </div>
        </div>

        <!-- Informações pessoais -->
        <div style="font-size:10px;font-weight:700;color:var(--ac);text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px;padding-bottom:6px;border-bottom:1px solid var(--b);margin-top:16px;">👤 Informações pessoais</div>
        <div class="r2" style="margin-bottom:10px;">
          <div class="fg">
            <label>Data de nascimento <span class="req">*</span></label>
            <input type="date" name="birthdate" required>
          </div>
          <div class="fg">
            <label>Telefone de contato <span class="req">*</span></label>
            <input type="tel" name="workPhone" placeholder="(00) 00000-0000" required>
          </div>
        </div>
        <div class="r2" style="margin-bottom:16px;">
          <div class="fg">
            <label>Estado <span class="req">*</span></label>
            <input type="text" name="state" placeholder="Ex: SP" maxlength="2" style="text-transform:uppercase;" required>
          </div>
          <div class="fg">
            <label>Cidade <span class="req">*</span></label>
            <input type="text" name="city" placeholder="Sua cidade" required>
          </div>
        </div>

        <button type="submit" class="btn btn-p" style="width:100%;justify-content:center;padding:10px 14px;font-size:13px;">Concluir cadastro e entrar →</button>
      </form>
    </div>
  </div>`;
}
function bindChangePwd(){
  const form=document.getElementById('changePwdForm');
  if(!form)return;
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const pwd=form.querySelector('[name="newpwd"]').value;
    const pwd2=form.querySelector('[name="newpwd2"]').value;
    const birthdate=form.querySelector('[name="birthdate"]')?.value||'';
    const state=(form.querySelector('[name="state"]')?.value?.trim()||'').toUpperCase();
    const city=form.querySelector('[name="city"]')?.value?.trim()||'';
    const workPhone=form.querySelector('[name="workPhone"]')?.value?.trim()||'';
    // Validações senha
    if(pwd.length<8){S._pwdChangeError='A senha deve ter pelo menos 8 caracteres.';render();return;}
    if(!/[A-Z]/.test(pwd)){S._pwdChangeError='A senha deve ter pelo menos uma letra maiúscula.';render();return;}
    if(!/[0-9]/.test(pwd)){S._pwdChangeError='A senha deve ter pelo menos um número.';render();return;}
    if(!/[^A-Za-z0-9]/.test(pwd)){S._pwdChangeError='A senha deve ter pelo menos um caractere especial.';render();return;}
    if(pwd!==pwd2){S._pwdChangeError='As senhas não coincidem.';render();return;}
    // Validações perfil
    if(!birthdate){S._pwdChangeError='Data de nascimento é obrigatória.';render();return;}
    if(!workPhone){S._pwdChangeError='Telefone de contato é obrigatório.';render();return;}
    if(!state){S._pwdChangeError='Estado é obrigatório.';render();return;}
    if(!city){S._pwdChangeError='Cidade é obrigatória.';render();return;}
    // Salva tudo
    const u=AUTH.users.find(x=>x.id===AUTH.session.id);
    if(u){
      u.pwd=hashPwd(pwd);
      u.mustChangePassword=false;
      u.birthdate=birthdate;
      u.state=state;
      u.city=city;
      u.workPhone=workPhone;
      saveUsers();
    }
    AUTH.session.mustChangePassword=false;
    S._pwdChangeError='';
    saveSession(!!localStorage.getItem(KEY_SESSION));
    render();
  });
}
function html(){
  // Redirect if user tries to access a forbidden pipe
  if(AUTH.session&&AUTH.session.role!=='admin'){
    if(S.pipe==='dash'&&!canAccess('dash'))S.pipe=getUserStartPipe(AUTH.session);
    else if(S.pipe==='content'&&!canAccess('content'))S.pipe=getUserStartPipe(AUTH.session);
    else if(S.pipe==='requests'&&!canAccess('requests'))S.pipe=getUserStartPipe(AUTH.session);
    else if(S.pipe==='social'&&!canAccess('social'))S.pipe=getUserStartPipe(AUTH.session);
  }
  const isPipe1=S.pipe==='content';
  const isDash=S.pipe==='dash';
  const isSocial=S.pipe==='social'&&canAccess('social');
  const isPortal=S.pipe==='portal';
  return hdr()+renderStartupAlert()
    +(isDash?'<div class="main">'+dashboard()+'</div>'
    :isSocial?socMain()
    :isPortal?'<div class="main">'+renderPortal()+'</div>'
    :isPipe1?flt1()+sts1()+'<div class="main">'+(S.view==='kanban'?kban1():list1())+'</div>'
            :flt2()+sts2()+'<div class="main">'+(S.view2==='kanban'?kban2():list2())+'</div>')
    +modal1()+modal2()+renderUsersModal()+renderAIModal()+renderConfirmModal()+renderProfileModal()+renderEditUserModal()+renderAutomationsModal()+renderPortalItemModal()+renderPortalLegendModal()+renderPortalDupModal();
}

function renderUsersModal(){
  if(!AUTH.showUsersModal)return'';
  const rows=AUTH.users.map(u=>`<tr>
    <td style="width:44px;">
      <button class="u-av-btn" data-action="avatar-user" data-uid="${u.id}" title="Alterar foto">${uavatar(u,32)}</button>
    </td>
    <td>${esc(u.name)}</td>
    <td>${esc(u.email)}</td>
    <td>${u.role==='admin'?`<span class="role-badge role-admin">Admin</span>`:
`<div style="display:flex;flex-wrap:wrap;gap:3px;">${
  (u.access||[]).length===0?`<span class="role-badge role-user">Sem acesso</span>`:
  (u.access||[]).map(a=>{
    const labels={'dash':'Dashboard','content':'Conteúdo','requests':'Solicitações','social':'Social','portal-geral':'Central Acessos','portal-rep-br':'Rep BR','portal-rep-pt':'Rep PT'};
    const colors={'dash':'background:#e0e7ff;color:#4338ca','content':'background:#dcfce7;color:#166534','requests':'background:#fef9c3;color:#a16207','social':'background:#fce7f3;color:#be185d','portal-geral':'background:#f1f5f9;color:#475569','portal-rep-br':'background:#d1fae5;color:#065f46','portal-rep-pt':'background:#ede9fe;color:#5b21b6'};
    return`<span style="display:inline-block;padding:1px 6px;border-radius:3px;font-size:9px;font-weight:700;${colors[a]||''}">${labels[a]||a}</span>`;
  }).join('')
}</div>`}</td>
    <td style="text-align:right;white-space:nowrap;display:flex;gap:4px;justify-content:flex-end;align-items:center;padding:9px 10px;"><button class="btn btn-o" style="padding:3px 8px;font-size:10px;margin:0;" data-action="edit-user" data-uid="${u.id}">✏️</button><button style="background:#fef3c7;border:1px solid #fcd34d;color:#92400e;border-radius:6px;padding:3px 8px;font-size:10px;font-weight:700;cursor:pointer;font-family:inherit;" data-action="force-pwd" data-uid="${u.id}" title="Redefinir senha padrão">🔑 Redefinir</button><button class="btn btn-d" style="padding:3px 8px;font-size:10px;margin:0;" data-action="del-user" data-uid="${u.id}" ${AUTH.users.length<=1||u.id===AUTH.session.id?'disabled title="Não é possível remover este usuário"':''}>✕</button></td>
  </tr>`).join('');
  const avatarPreviewHtml=_newUserAvatar
    ?`<img src="${_newUserAvatar}" style="width:52px;height:52px;border-radius:50%;object-fit:cover;display:block;">`
    :`<div style="width:52px;height:52px;border-radius:50%;background:var(--b);display:flex;align-items:center;justify-content:center;font-size:20px;color:var(--t3);">&#128100;</div>`;
  return`<div class="overlay" id="usersModal" style="z-index:1100;">
    <div class="modal" style="max-width:600px;">
      <div class="mhead">
        <span class="mhead-t">Gerenciar Usuários</span>
        <button data-action="diag-users" style="background:var(--s2);border:1px solid var(--b);border-radius:6px;color:var(--t3);cursor:pointer;font-size:10px;padding:3px 8px;font-family:inherit;margin-right:6px;" title="Diagnóstico">🔍 Diagnóstico</button>
        <button class="mclose" data-action="close-users">&#10005;</button>
      </div>
      <div class="mbody">
        <table class="utbl">
          <thead><tr><th style="width:44px;"></th><th>Nome</th><th>E-mail</th><th>Perfil</th><th></th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
        <div class="add-user-form">
          <div class="form-title">Adicionar usuário</div>
          <form id="addUserForm">
            <div style="display:flex;align-items:center;gap:14px;margin-bottom:12px;">
              <button type="button" class="u-av-btn" id="new-av-btn" title="Escolher foto" style="flex-shrink:0;">
                <div id="new-av-preview">${avatarPreviewHtml}</div>
              </button>
              <input type="file" id="new-av-input" accept="image/*" style="display:none;">
              <div style="display:flex;flex-direction:column;gap:3px;">
                <span style="font-size:12px;color:var(--t1);font-weight:600;">Foto de perfil</span>
                <span style="font-size:10px;color:var(--t3);">Opcional — clique no círculo para escolher</span>
              </div>
            </div>
            <div class="r2" style="margin-bottom:10px;">
              <div class="fg"><label>Nome <span class="req">*</span></label><input name="uname" required placeholder="Nome completo"></div>
              <div class="fg"><label>E-mail <span class="req">*</span></label><input type="email" name="uemail" required placeholder="email@exemplo.com"></div>
            </div>
            <div class="fg" style="margin-bottom:10px;">
              <label>Acessos</label>
              <div style="background:var(--s1);border:1px solid var(--b);border-radius:8px;padding:12px;">
                <label style="display:flex;align-items:center;gap:8px;margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid var(--b);cursor:pointer;user-select:none;">
                  <input type="checkbox" name="isAdmin" style="accent-color:var(--ac);width:14px;height:14px;cursor:pointer;">
                  <span style="font-size:12px;font-weight:700;color:var(--ac);">Administrador — acesso total ao sistema</span>
                </label>
                <div id="access-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                  <div>
                    <div style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.4px;margin-bottom:7px;">Pipeline</div>
                    <label class="cbitem"><input type="checkbox" name="access" value="dash" style="accent-color:var(--ac);width:13px;height:13px;cursor:pointer;"> <span class="cbitem-name">Dashboard</span></label>
                    <label class="cbitem"><input type="checkbox" name="access" value="content" style="accent-color:var(--ac);width:13px;height:13px;cursor:pointer;"> <span class="cbitem-name">Conteúdo</span></label>
                    <label class="cbitem"><input type="checkbox" name="access" value="requests" style="accent-color:var(--ac);width:13px;height:13px;cursor:pointer;"> <span class="cbitem-name">Solicitações</span></label>
                    <label class="cbitem"><input type="checkbox" name="access" value="social" style="accent-color:var(--ac);width:13px;height:13px;cursor:pointer;"> <span class="cbitem-name">Social</span></label>
                  </div>
                  <div>
                    <div style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.4px;margin-bottom:7px;">Portais</div>
                    <label class="cbitem"><input type="checkbox" name="access" value="portal-geral" style="accent-color:var(--ac);width:13px;height:13px;cursor:pointer;"> <span class="cbitem-name">Central de Acessos</span></label>
                    <label class="cbitem"><input type="checkbox" name="access" value="portal-rep-br" style="accent-color:var(--ac);width:13px;height:13px;cursor:pointer;"> <span class="cbitem-name">Representante Brasil</span></label>
                    <label class="cbitem"><input type="checkbox" name="access" value="portal-rep-pt" style="accent-color:var(--ac);width:13px;height:13px;cursor:pointer;"> <span class="cbitem-name">Representante Portugal</span></label>
                  </div>
                </div>
              </div>
            </div>
            <div style="border-top:1px solid var(--b);margin:10px 0 10px;padding-top:12px;">
              <div style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.4px;margin-bottom:10px;">Informações profissionais</div>
              <div class="r3" style="margin-bottom:0;">
                <div class="fg"><label>Departamento</label><input name="udept" placeholder="Ex: Marketing"></div>
                <div class="fg"><label>Cargo</label><input name="upos" placeholder="Ex: Analista de MKT"></div>
                <div class="fg"><label>Supervisor</label><input name="usup" placeholder="Nome do supervisor"></div>
              </div>
            </div>
            <input type="hidden" name="upwd" id="new-user-temp-pwd" value="kami123">
            <div id="new-user-pwd-display" style="display:none;"></div>
            <div id="new-user-creds-copy" style="display:none;background:#dcfce7;border:1px solid #bbf7d0;border-radius:8px;padding:10px 12px;margin-bottom:10px;">
              <div style="font-size:11px;font-weight:700;color:#166534;margin-bottom:6px;">✅ Usuário criado! Copie as credenciais:</div>
              <pre id="new-user-creds-text" style="font-size:11px;color:#166534;white-space:pre-wrap;margin:0 0 8px;font-family:monospace;"></pre>
              <button type="button" id="copy-creds-btn" style="background:#166534;color:#fff;border:none;border-radius:6px;padding:5px 14px;font-size:11px;font-weight:700;cursor:pointer;font-family:inherit;">📋 Copiar</button>
            </div>
            <div style="display:flex;align-items:center;gap:10px;justify-content:flex-end;">
              <div id="addUserErr" class="login-err hide" style="margin-right:auto;font-size:11px;padding:5px 10px;"></div>
              <button type="submit" class="btn btn-p">Criar usuário</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>`;
}

function renderAIModal(){
  if(!AI.open)return'';
  const savedKey=localStorage.getItem(KEY_APIKEY)||'';

  const inputStep=`
    <div class="fg" style="margin-bottom:2px;">
      <label>Chave de API Anthropic</label>
      <input type="password" id="ai-apikey" placeholder="sk-ant-api03-..." value="${esc(savedKey)}" autocomplete="off" style="font-family:monospace;font-size:11px;">
      <span style="font-size:10px;color:var(--t3);margin-top:3px;display:block;">Salva localmente neste navegador. Obtenha em console.anthropic.com.</span>
    </div>
    <div class="fg">
      <label>Estratégia / Calendário de Conteúdo</label>
      <textarea id="ai-text" style="min-height:200px;font-size:12px;line-height:1.6;" placeholder="Cole aqui o calendário de conteúdo, estratégia ou lista de publicações. Quanto mais detalhado, melhores os cards gerados.\n\nEx:\n- Reel Balens — Lançamento linha verão | Publ: 15/06 | IG Feed + Reels | Topo de funil\n- Carrossel KAMI CO. — 5 benefícios do produto X | Publ: 20/06 | LinkedIn"></textarea>
    </div>
    ${AI.error?`<div class="login-err">${esc(AI.error)}</div>`:''}
    <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:4px;">
      <button class="btn btn-o" data-action="ai-close">Cancelar</button>
      <button class="btn btn-p" id="ai-process-btn"${AI.loading?' disabled':''}>
        ${AI.loading?'<span class="ai-spinner"></span> Processando...':'⚡ Gerar Cards'}
      </button>
    </div>`;

  const previewStep=`
    <div style="margin-bottom:10px;">
      <div style="font-size:14px;color:var(--t1);font-weight:700;margin-bottom:3px;">${AI.preview.length} card${AI.preview.length!==1?'s':''} identificado${AI.preview.length!==1?'s':''}</div>
      <div style="font-size:11px;color:var(--t3);">Confirme para criar todos na coluna "Banco de ideias". Você pode editar cada card depois.</div>
    </div>
    <div style="max-height:300px;overflow-y:auto;display:flex;flex-direction:column;gap:4px;">
      ${AI.preview.map((c,i)=>`<div class="ai-preview-item">
        <span style="font-size:10px;color:var(--t3);min-width:20px;text-align:right;flex-shrink:0;">${i+1}.</span>
        <span style="font-size:12px;color:var(--t1);flex:1;line-height:1.4;">${esc(c.title)}</span>
        <div style="display:flex;gap:4px;align-items:center;flex-shrink:0;">
          ${c.postFormat?`<span class="tag ${fmtcls(c.postFormat)}">${gfmt(c.postFormat)?.icon||''} ${c.postSubtype||gfmt(c.postFormat)?.label||''}</span>`:c.contentType?`<span class="tag ${tcls(c.contentType)}">${esc(c.contentType)}</span>`:''}
          ${c.project?`<span class="tag t-p" style="font-size:9px;">${esc(c.project)}</span>`:''}
          ${c.publishDate?`<span style="font-size:10px;color:var(--t3);">${fdate(c.publishDate)}</span>`:''}
        </div>
      </div>`).join('')}
    </div>
    <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:12px;">
      <button class="btn btn-o" data-action="ai-back">← Voltar</button>
      <button class="btn btn-p" data-action="ai-import">Importar ${AI.preview.length} card${AI.preview.length!==1?'s':''}</button>
    </div>`;

  return`<div class="overlay" id="ai-overlay" style="z-index:1100;">
    <div class="modal" style="max-width:620px;">
      <div class="mhead">
        <span class="mhead-t">⚡ Importar Calendário via IA</span>
        <button class="mclose" data-action="ai-close">&#10005;</button>
      </div>
      <div class="mbody" style="display:flex;flex-direction:column;gap:10px;">
        ${AI.step==='preview'?previewStep:inputStep}
      </div>
    </div>
  </div>`;
}

// ── PORTAL LEGEND MODAL ─────────────────
function renderPortalLegendModal(){
  const m=S.portal_legend_modal;
  if(!m.open)return'';
  const pc=S.portal_content||{portals:[]};
  const portal=pc.portals.find(p=>p.id===m.portalId);
  if(!portal)return'';
  const legend=portal.legend||[];
  return`<div class="overlay" id="portal-legend-overlay" style="z-index:1200;">
    <div class="modal" style="max-width:440px;">
      <div class="mhead">
        <div class="mhead-t">Legenda de cores — ${esc(portal.name)}</div>
        <button class="mclose" data-action="close-portal-legend">×</button>
      </div>
      <div class="mbody" style="display:flex;flex-direction:column;gap:8px;">
        <div style="font-size:11px;color:var(--t3);margin-bottom:4px;">Defina o significado de cada cor usada nos botões desta central.</div>
        <div id="legend-items" style="display:flex;flex-direction:column;gap:6px;">
          ${legend.map((l,i)=>`<div style="display:flex;gap:8px;align-items:center;">
            <input type="color" class="legend-color" value="${esc(l.color||'#000000')}" style="width:36px;height:36px;border:1px solid var(--b);border-radius:6px;cursor:pointer;background:var(--s2);flex-shrink:0;">
            <input type="text" class="legend-label" value="${esc(l.label||'')}" placeholder="Ex: Excel, Canva, Drive..." style="flex:1;background:var(--s2);border:1px solid var(--b);border-radius:6px;color:var(--t1);padding:7px 10px;font-size:12px;font-family:inherit;outline:none;">
            <button type="button" onclick="this.closest('div').remove()" style="background:none;border:1px solid var(--b);border-radius:5px;color:var(--t3);cursor:pointer;padding:5px 8px;flex-shrink:0;">✕</button>
          </div>`).join('')}
        </div>
        <button type="button" id="legend-add-btn" style="background:var(--s2);border:1px dashed var(--b);border-radius:6px;color:var(--t2);cursor:pointer;padding:7px;font-size:11px;font-weight:600;font-family:inherit;margin-top:2px;">+ Adicionar cor</button>
      </div>
      <div class="mfoot">
        <button class="btn btn-o" data-action="replicate-portal-legend" style="margin-right:auto;font-size:11px;font-family:inherit;" title="Copiar esta legenda para todas as outras centrais">↗ Replicar para todas</button>
        <button class="btn modal btn-o" data-action="close-portal-legend">Cancelar</button>
        <button class="btn btn-p" data-action="save-portal-legend">Salvar legenda</button>
      </div>
    </div>
  </div>`;
}

// ── PORTAL DUPLICATE MODAL ──────────────
function renderPortalDupModal(){
  const m=S.portal_dup_modal;
  if(!m.open||!m.item)return'';
  const pc=S.portal_content||{portals:[]};
  const others=(pc.portals||[]).filter(p=>p.id!==m.sourcePortalId&&!p.hidden);
  const links=(m.item.links||[]).filter(l=>l.url);

  if(m.isEdit){
    // SYNC MODE: title/desc/color → all selected centrals; links → per-link per-portal selection
    return`<div class="overlay" id="portal-dup-overlay" style="z-index:1300;">
      <div class="modal" style="max-width:520px;">
        <div class="mhead">
          <div style="display:flex;flex-direction:column;gap:3px;">
            <div class="mhead-t">🔄 Sincronizar — "${esc(m.item.title||'')}"</div>
            <div style="font-size:11px;color:var(--t3);">Título, descrição e cor serão iguais em todas. Selecione quais links incluir em cada central.</div>
          </div>
          <button class="mclose" data-action="close-portal-dup">×</button>
        </div>
        <div class="mbody" style="padding:0;">
          <!-- Centrais target -->
          <div style="padding:12px 18px;border-bottom:1px solid var(--b);background:var(--s2);">
            <div style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.4px;margin-bottom:8px;">Sincronizar em:</div>
            <div style="display:flex;flex-wrap:wrap;gap:8px;">
              ${others.map(p=>`<label style="display:flex;align-items:center;gap:6px;cursor:pointer;user-select:none;padding:5px 10px;background:var(--s1);border:1px solid var(--b);border-radius:6px;">
                <input type="checkbox" class="dup-portal-check" data-pid="${p.id}" checked style="accent-color:var(--ac);cursor:pointer;">
                <span style="font-size:12px;font-weight:600;color:var(--t1);">${esc(p.name)} <span style="font-size:10px;color:var(--t3);">${p.badge?esc(p.badge):''}</span></span>
              </label>`).join('')}
            </div>
          </div>
          <!-- Per-link selection -->
          <div style="padding:12px 18px;">
            <div style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.4px;margin-bottom:10px;">Links — selecione onde incluir cada um:</div>
            ${links.length?links.map((lk,li)=>`<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--b);">
              <span style="font-size:12px;font-weight:600;color:var(--t1);flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${esc(lk.label||lk.url)}</span>
              <div style="display:flex;gap:6px;flex-shrink:0;">
                ${others.map(p=>`<label style="display:flex;flex-direction:column;align-items:center;gap:2px;cursor:pointer;user-select:none;" title="${esc(p.name)}">
                  <input type="checkbox" class="dup-link-check" data-li="${li}" data-pid="${p.id}" checked style="accent-color:var(--ac);cursor:pointer;">
                  <span style="font-size:8px;color:var(--t3);max-width:32px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${p.badge?esc(p.badge):esc(p.name)}</span>
                </label>`).join('')}
              </div>
            </div>`).join(''):`<div style="font-size:12px;color:var(--t3);padding:8px 0;">Nenhum link neste item.</div>`}
          </div>
        </div>
        <div class="mfoot">
          <button class="btn modal btn-o" data-action="close-portal-dup">Cancelar</button>
          <button class="btn btn-p" data-action="confirm-portal-dup">Sincronizar →</button>
        </div>
      </div>
    </div>`;
  }

  // DUPLICATE MODE (new item)
  return`<div class="overlay" id="portal-dup-overlay" style="z-index:1300;">
    <div class="modal" style="max-width:440px;">
      <div class="mhead">
        <div style="display:flex;flex-direction:column;gap:3px;">
          <div class="mhead-t">✅ Item criado!</div>
          <div style="font-size:11px;color:var(--t3);">Deseja duplicar "<strong>${esc(m.item.title||'')}</strong>" em outras centrais?</div>
        </div>
        <button class="mclose" data-action="close-portal-dup">×</button>
      </div>
      <div class="mbody" style="display:flex;flex-direction:column;gap:10px;">
        ${others.map(p=>`<div style="background:var(--s2);border:1px solid var(--b);border-radius:8px;padding:12px;">
          <label style="display:flex;align-items:center;gap:8px;cursor:pointer;user-select:none;margin-bottom:8px;">
            <input type="checkbox" class="dup-portal-check" data-pid="${p.id}" style="accent-color:var(--ac);width:14px;height:14px;cursor:pointer;">
            <span style="font-size:13px;font-weight:700;color:var(--t1);">${esc(p.name)}${p.badge?` <span style="font-size:11px;color:var(--t3);">${esc(p.badge)}</span>`:''}</span>
          </label>
          <div class="dup-sec-sel" data-pid="${p.id}" style="display:none;">
            <label style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.4px;display:block;margin-bottom:4px;">Adicionar na seção:</label>
            <select class="dup-sec-select" data-pid="${p.id}" style="width:100%;background:var(--s1);border:1px solid var(--b);border-radius:6px;color:var(--t1);padding:6px 10px;font-size:12px;font-family:inherit;outline:none;">
              ${(p.sections||[]).map(sec=>`<option value="${esc(sec.id)}">${esc(sec.title)}</option>`).join('')}
              ${!(p.sections||[]).length?`<option value="">— sem seções —</option>`:''}
            </select>
          </div>
        </div>`).join('')}
      </div>
      <div class="mfoot">
        <button class="btn modal btn-o" data-action="close-portal-dup">Não, obrigado</button>
        <button class="btn btn-p" data-action="confirm-portal-dup">Duplicar →</button>
      </div>
    </div>
  </div>`;
}

// ── PORTAL ITEM MODAL ───────────────────
function renderPortalItemModal(){
  const m=S.portal_item_modal;
  if(!m.open)return'';
  const pc=S.portal_content||{portals:[]};
  const portal=pc.portals.find(p=>p.id===m.portalId);
  if(!portal)return'';
  const isNew=m.itemIdx===null||m.itemIdx===undefined;
  let existingItem={icon:'🔗',title:'',desc:'',color:portal.color||'#1c1c1c',links:[{label:'',url:''}]};
  if(!isNew){
    if(m.secId){
      const sec=portal.sections?.find(s=>s.id===m.secId);
      existingItem=sec?.items?.[m.itemIdx]||existingItem;
    } else {
      existingItem=portal.items?.[m.itemIdx]||existingItem;
    }
  }
  const v=existingItem;
  const links=v.links?.length?v.links:(v.url?[{label:'',url:v.url}]:[{label:'',url:''}]);
  return`<div class="overlay" id="portal-item-overlay" style="z-index:1200;">
    <div class="modal" style="max-width:480px;">
      <div class="mhead">
        <div class="mhead-t">${isNew?'Novo item':'Editar item'}</div>
        <button class="mclose" data-action="close-portal-item-modal">×</button>
      </div>
      <div class="mbody" style="display:flex;flex-direction:column;gap:10px;">
        <input type="hidden" id="pim-icon-hidden" value="${esc(v.icon||'🔗')}">
        <input type="hidden" id="pim-color" value="${esc(v.color||portal.color||'#c8192b')}">
        <div class="fg"><label>Título <span class="req">*</span></label><input type="text" id="pim-title" value="${esc(v.title||'')}" placeholder="Nome do recurso"></div>
        <div class="fg"><label>Descrição</label><input type="text" id="pim-desc" value="${esc(v.desc||'')}" placeholder="Breve descrição"></div>
        <div class="fg">
          <label>Links / Botões</label>
          <div id="pim-links" style="display:flex;flex-direction:column;gap:5px;">
            ${links.map((lk,li)=>`<div style="display:flex;gap:5px;align-items:center;" data-link-idx="${li}">
              <input class="pim-link-label" placeholder="Label" value="${esc(lk.label||'')}" style="flex:1;background:var(--s2);border:1px solid var(--b);border-radius:6px;color:var(--t1);padding:6px 10px;font-size:12px;font-family:inherit;outline:none;">
              <input class="pim-link-url" placeholder="https://... ou portal:id" value="${esc(lk.url||'')}" style="flex:2;background:var(--s2);border:1px solid var(--b);border-radius:6px;color:var(--t1);padding:6px 10px;font-size:12px;font-family:inherit;outline:none;">
              <button type="button" onclick="this.closest('div').remove()" style="background:none;border:1px solid var(--b);border-radius:5px;color:var(--t3);cursor:pointer;padding:5px 8px;flex-shrink:0;">✕</button>
            </div>`).join('')}
          </div>
          <button type="button" onclick="const c=document.getElementById('pim-links');const d=document.createElement('div');d.style.cssText='display:flex;gap:5px;align-items:center;';d.innerHTML='<input class=\\'pim-link-label\\' placeholder=\\'Label\\' style=\\'flex:1;background:var(--s2);border:1px solid var(--b);border-radius:6px;color:var(--t1);padding:6px 10px;font-size:12px;font-family:inherit;outline:none;\\'><input class=\\'pim-link-url\\' placeholder=\\'https://...\\' style=\\'flex:2;background:var(--s2);border:1px solid var(--b);border-radius:6px;color:var(--t1);padding:6px 10px;font-size:12px;font-family:inherit;outline:none;\\'><button type=\\'button\\' onclick=\\'this.closest(\\'div\\').remove()\\' style=\\'background:none;border:1px solid var(--b);border-radius:5px;color:var(--t3);cursor:pointer;padding:5px 8px;\\'>✕</button>';c.appendChild(d)" style="margin-top:4px;font-size:11px;padding:4px 12px;background:var(--s2);border:1px solid var(--b);border-radius:6px;color:var(--t2);cursor:pointer;font-family:inherit;">+ Link</button>
        </div>
        <div class="fg">
          <label>Cor do botão</label>
          ${(portal.legend&&portal.legend.length)?`<div style="display:flex;flex-wrap:wrap;gap:14px;margin-top:6px;">
            ${portal.legend.map(l=>{const sel=(v.color||portal.color||'#c8192b')===l.color;return`<label style="cursor:pointer;user-select:none;display:flex;flex-direction:column;align-items:center;gap:4px;" title="${esc(l.label)}">
              <input type="radio" name="pim-color-pick" value="${esc(l.color)}" ${sel?'checked':''} style="display:none;" onchange="document.getElementById('pim-color').value=this.value;this.closest('[style]').querySelectorAll('label>div').forEach(d=>d.style.boxShadow='none');this.closest('label').querySelector('div').style.boxShadow='0 0 0 2.5px #fff, 0 0 0 4.5px var(--ac)'">
              <div style="width:20px;height:20px;border-radius:50%;background:${esc(l.color)};box-shadow:${sel?'0 0 0 2px #fff, 0 0 0 3.5px var(--ac)':'none'};transition:.1s;"></div>
              <span style="font-size:9px;font-weight:300;color:var(--t3);text-align:center;white-space:nowrap;letter-spacing:.2px;">${esc(l.label)}</span>
            </label>`;}).join('')}
          </div>`:`<input type="color" id="pim-color-fallback" value="${esc(v.color||portal.color||'#c8192b')}" oninput="document.getElementById('pim-color').value=this.value" style="width:100%;height:36px;border:1px solid var(--b);border-radius:7px;cursor:pointer;background:var(--s2);">`}
        </div>
      </div>
      <input type="hidden" id="pim-sync" value="${v.syncId?'1':''}">
      <div class="mfoot">
        ${!isNew?`<button class="btn btn-d" data-action="portal-item-delete">Deletar</button>`:''}
        <button class="btn modal btn-o" data-action="close-portal-item-modal">Cancelar</button>
        <button class="btn btn-p" data-action="portal-item-save">Salvar</button>
      </div>
    </div>
  </div>`;
}

function renderBrandLayout(p, isAdmin){
  const activeSec=p.sections.find(s=>s.id===(S.marcas_active_brand||p.sections[0]?.id))||p.sections[0];
  if(!activeSec)return'';
  const items=activeSec.items||[];
  const itemLinks=(item)=>item.links?.length?item.links:(item.url?[{label:'',url:item.url}]:[]);

  const sidebar=`<div style="width:180px;flex-shrink:0;border-right:1px solid var(--b);padding:12px 0;background:var(--s1);">
    <div style="font-size:9px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.5px;padding:0 14px 10px;">Marcas</div>
    ${p.sections.map(sec=>{
      const active=(S.marcas_active_brand||p.sections[0]?.id)===sec.id;
      return`<button data-action="marcas-brand" data-bid="${sec.id}" style="width:100%;text-align:left;padding:10px 16px;border:none;background:${active?'rgba(200,25,43,.08)':'transparent'};color:${active?'var(--ac)':'var(--t2)'};cursor:pointer;font-size:12px;font-weight:${active?'700':'400'};font-family:inherit;border-left:3px solid ${active?'var(--ac)':'transparent'};transition:.1s;">${esc(sec.title)}</button>`;
    }).join('')}
  </div>`;

  const logo=activeSec.logo
    ?`<div style="background:#f7f5f2;border-radius:10px;overflow:hidden;margin-bottom:20px;display:flex;align-items:center;justify-content:center;height:160px;border:1px solid var(--b);position:relative;">
        <img src="${esc(activeSec.logo)}" style="max-width:50%;max-height:130px;object-fit:contain;">
        ${isAdmin?`<button data-action="sec-logo-edit" data-pid="${p.id}" data-sid="${activeSec.id}" style="position:absolute;top:8px;right:8px;background:rgba(0,0,0,.45);border:none;border-radius:5px;color:#fff;cursor:pointer;font-size:10px;padding:3px 8px;font-family:inherit;">✏️ Logo</button>`:''}
      </div>`
    :(isAdmin?`<div style="border:2px dashed var(--b);border-radius:10px;height:140px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;margin-bottom:20px;cursor:pointer;background:var(--s2);" data-action="sec-logo-edit" data-pid="${p.id}" data-sid="${activeSec.id}">
        <div style="font-size:18px;opacity:.4;">🖼</div>
        <div style="font-size:11px;color:var(--t3);">Clique para adicionar logo da marca</div>
      </div>`:'');

  const materials=items.map((item,ii)=>{
    const links=itemLinks(item).filter(l=>l.url);
    if(links.length){
      return links.map(link=>`<a href="${esc(link.url)}" target="_blank" style="display:inline-flex;align-items:center;padding:7px 16px;border-radius:20px;background:${esc(item.color||p.color||'#c8192b')};color:#fff;font-size:11px;font-weight:700;text-decoration:none;">${esc(link.label||item.title)}</a>`).join('');
    }
    return isAdmin?`<button data-action="pim-open" data-pid="${p.id}" data-sid="${activeSec.id}" data-ii="${ii}" style="display:inline-flex;align-items:center;padding:7px 16px;border-radius:20px;background:var(--s2);color:var(--t3);font-size:11px;font-weight:600;border:1px dashed var(--b);cursor:pointer;font-family:inherit;">+ ${esc(item.title)}</button>`:'';
  }).join('');

  return`<div style="display:flex;min-height:400px;">
    ${sidebar}
    <div style="flex:1;padding:20px;overflow-y:auto;">
      ${logo}
      <div style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.5px;margin-bottom:12px;">Materiais:</div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;">${materials}</div>
    </div>
  </div>`;
}

// ── PORTAL ──────────────────────────────
function renderPortal(){
  const pc=S.portal_content||{portals:[],current:null};
  const allPortals=pc.portals||[];
  const access=getPortalAccess();
  const portals=(access&&access.length)?allPortals.filter(p=>access.includes(p.id)&&!p.hidden):allPortals.filter(p=>!p.hidden);
  const isAdmin=AUTH.session&&AUTH.session.role==='admin';
  const currentId=S.portal_current;
  const editingId=S.portal_editing_id;

  // EDIT MODE — use allPortals to support hidden portals (marcas)
  if(editingId!==null&&isAdmin){
    const pidx=allPortals.findIndex(p=>p.id===editingId);
    const p=pidx>=0?allPortals[pidx]:null;
    if(!p)return`<div class="portal-wrap"><p style="color:var(--t3)">Portal não encontrado.</p></div>`;
    return`<div class="portal-wrap">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;">
        <button data-action="portal-cancel-edit" class="portal-back">← Voltar</button>
        <div style="font-size:16px;font-weight:800;color:var(--t1);">Editar: ${esc(p.name)}${p.badge?' ('+esc(p.badge)+')':''}</div>
        <button data-action="portal-save-edit" class="btn btn-p" style="margin-left:auto;font-family:inherit;">Salvar</button>
      </div>

      ${p.sections.length===0?`
        <div class="portal-section-label">Links e cards diretos</div>
        <div id="pe-direct-items" style="display:flex;flex-direction:column;gap:10px;margin-bottom:10px;">
          ${(p.items||[]).map((item,ii)=>`<div class="portal-edit-card" data-ii="${ii}">
            <button class="portal-edit-del" data-action="portal-del-item" data-ii="${ii}">✕</button>
            <div class="r2" style="margin-bottom:8px;">
              <div class="fg"><label>Ícone</label><div style="display:flex;gap:6px;align-items:center;"><button type="button" class="emoji-btn pe-emoji-btn" data-field="pe-item-icon-${ii}" onclick="openEmojiPicker(this,document.querySelector('.pe-item-icon[data-ii=\\'${ii}\\']'))">${item.icon?.startsWith('img:')?`<img src="${esc(item.icon.slice(4))}" style="width:22px;height:22px;object-fit:contain;">`:(esc(item.icon||'🔗'))}</button><input class="pe-item-icon" data-ii="${ii}" value="${esc(item.icon||'')}" style="display:none;"></div></div>
              <div class="fg"><label>Título</label><input class="pe-item-title" data-ii="${ii}" value="${esc(item.title||'')}" placeholder="Nome do recurso"></div>
            </div>
            <div class="r2" style="margin-bottom:8px;">
              <div class="fg"><label>Descrição</label><input class="pe-item-desc" data-ii="${ii}" value="${esc(item.desc||'')}" placeholder="Breve descrição"></div>
              <div class="fg" style="max-width:200px;"><label>Cor dos botões</label><input class="pe-item-color" data-ii="${ii}" value="${esc(item.color||p.color||'#1c1c1c')}" placeholder="#1c1c1c" style="max-width:120px;"></div>
            </div>
            <div style="margin-top:4px;">
              <div style="font-size:9px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.4px;margin-bottom:6px;">Links / Botões</div>
              <div id="pe-item-links-${ii}" style="display:flex;flex-direction:column;gap:5px;">
                ${(item.links?.length?item.links:(item.url?[{label:'',url:item.url}]:[{label:'',url:''}])).map((link,li)=>`
                  <div style="display:flex;gap:5px;align-items:center;" data-li="${li}">
                    <input class="pe-item-link-label" data-ii="${ii}" data-li="${li}" value="${esc(link.label||'')}" placeholder="Label (ex: Acessar)" style="flex:1;background:var(--s2);border:1px solid var(--b);border-radius:6px;color:var(--t1);padding:6px 10px;font-size:12px;font-family:inherit;outline:none;">
                    <input class="pe-item-link-url" data-ii="${ii}" data-li="${li}" value="${esc(link.url||'')}" placeholder="https://..." style="flex:2;background:var(--s2);border:1px solid var(--b);border-radius:6px;color:var(--t1);padding:6px 10px;font-size:12px;font-family:inherit;outline:none;">
                    <button type="button" onclick="this.closest('[data-li]').remove()" style="background:none;border:1px solid var(--b);border-radius:5px;color:var(--t3);cursor:pointer;padding:5px 9px;flex-shrink:0;">✕</button>
                  </div>`).join('')}
              </div>
              <button type="button" onclick="portalAddLinkRow('pe-item-links-${ii}',null,'${ii}')" style="margin-top:6px;font-size:11px;padding:4px 12px;background:var(--s2);border:1px solid var(--b);border-radius:6px;color:var(--t2);cursor:pointer;font-family:inherit;">+ Link</button>
            </div>
          </div>`).join('')}
        </div>
        <button data-action="portal-add-item" class="btn btn-o" style="font-family:inherit;">+ Adicionar item</button>
      `:`
        ${p.sections.map((sec,si)=>`<div class="portal-sec-card" data-sec-si="${si}" draggable="true" style="margin-bottom:12px;background:var(--s2);border:1px solid var(--b);border-radius:10px;padding:14px;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">
            <span class="portal-drag-handle" title="Arrastar seção">⠿</span>
            <div style="display:flex;flex-direction:column;gap:2px;flex-shrink:0;">
              <button data-action="portal-sec-up" data-si="${si}" ${si===0?'disabled':''} style="background:none;border:1px solid var(--b);border-radius:4px;color:${si===0?'var(--t3)':'var(--t2)'};cursor:${si===0?'default':'pointer'};font-size:11px;padding:1px 6px;line-height:1.4;font-family:inherit;" title="Mover para cima">↑</button>
              <button data-action="portal-sec-down" data-si="${si}" ${si===p.sections.length-1?'disabled':''} style="background:none;border:1px solid var(--b);border-radius:4px;color:${si===p.sections.length-1?'var(--t3)':'var(--t2)'};cursor:${si===p.sections.length-1?'default':'pointer'};font-size:11px;padding:1px 6px;line-height:1.4;font-family:inherit;" title="Mover para baixo">↓</button>
            </div>
            <input class="pe-sec-title" data-si="${si}" value="${esc(sec.title)}" style="flex:1;background:var(--s1);border:1px solid var(--b);border-radius:6px;color:var(--t1);padding:6px 10px;font-size:12px;font-weight:700;font-family:inherit;outline:none;">
            <button data-action="portal-del-sec" data-si="${si}" style="background:none;border:1px solid var(--b);border-radius:6px;color:var(--t3);cursor:pointer;font-size:11px;padding:4px 10px;white-space:nowrap;font-family:inherit;" title="Remover seção">✕ Remover</button>
          </div>
          <!-- Logo da marca -->
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
            ${sec.logo?`<img src="${esc(sec.logo)}" style="height:40px;max-width:120px;object-fit:contain;border-radius:4px;border:1px solid var(--b);">`:
            `<div style="width:80px;height:40px;background:var(--s2);border:1px dashed var(--b);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:9px;color:var(--t3);">sem logo</div>`}
            <input type="file" id="pe-sec-logo-${si}" class="pe-sec-logo-file" data-si="${si}" accept="image/*" style="position:absolute;opacity:0;width:0;height:0;pointer-events:none;">
            <button type="button" onclick="document.getElementById('pe-sec-logo-${si}').click()" style="display:flex;align-items:center;gap:5px;background:var(--s2);border:1px solid var(--b);border-radius:6px;padding:5px 10px;cursor:pointer;font-size:11px;color:var(--t2);font-family:inherit;">
              🖼 ${sec.logo?'Trocar logo':'Adicionar logo'}
            </button>
            ${sec.logo?`<button data-action="portal-sec-logo-del" data-si="${si}" style="background:none;border:1px solid var(--b);border-radius:5px;color:var(--t3);cursor:pointer;font-size:10px;padding:4px 8px;font-family:inherit;">✕ Remover</button>`:''}
          </div>
          <div id="pe-sec-${si}" style="display:flex;flex-direction:column;gap:8px;margin-bottom:8px;">
            ${(sec.items||[]).map((item,ii)=>`<div class="portal-edit-card" data-si="${si}" data-ii="${ii}" draggable="true">
              <button class="portal-edit-del" data-action="portal-del-sec-item" data-si="${si}" data-ii="${ii}">✕</button>
              <div style="display:flex;align-items:flex-start;">
              <div style="display:flex;flex-direction:column;gap:2px;flex-shrink:0;margin-right:2px;margin-top:10px;">
                <span class="portal-drag-handle" title="Arrastar para reordenar" style="margin-right:0;margin-top:0;">⠿</span>
                <button data-action="portal-item-up" data-si="${si}" data-ii="${ii}" ${ii===0?'disabled':''} style="background:none;border:1px solid var(--b);border-radius:4px;color:${ii===0?'var(--t3)':'var(--t2)'};cursor:${ii===0?'default':'pointer'};font-size:11px;padding:1px 6px;line-height:1.4;font-family:inherit;" title="Mover para cima">↑</button>
                <button data-action="portal-item-down" data-si="${si}" data-ii="${ii}" ${ii===(sec.items.length-1)?'disabled':''} style="background:none;border:1px solid var(--b);border-radius:4px;color:${ii===(sec.items.length-1)?'var(--t3)':'var(--t2)'};cursor:${ii===(sec.items.length-1)?'default':'pointer'};font-size:11px;padding:1px 6px;line-height:1.4;font-family:inherit;" title="Mover para baixo">↓</button>
              </div>
              <div style="flex:1;">
              <div class="r2" style="margin-bottom:8px;">
                <div class="fg"><label>Ícone</label><div style="display:flex;gap:6px;align-items:center;"><button type="button" class="emoji-btn pe-emoji-btn" onclick="openEmojiPicker(this,document.querySelector('.pe-sec-item-icon[data-si=\\'${si}\\'][data-ii=\\'${ii}\\']'))">${item.icon?.startsWith('img:')?`<img src="${esc(item.icon.slice(4))}" style="width:22px;height:22px;object-fit:contain;">`:(esc(item.icon||'🔗'))}</button><input class="pe-sec-item-icon" data-si="${si}" data-ii="${ii}" value="${esc(item.icon||'')}" style="display:none;"></div></div>
                <div class="fg"><label>Título</label><input class="pe-sec-item-title" data-si="${si}" data-ii="${ii}" value="${esc(item.title||'')}" placeholder="Nome do recurso"></div>
              </div>
              <div class="r2" style="margin-bottom:8px;">
                <div class="fg"><label>Descrição</label><input class="pe-sec-item-desc" data-si="${si}" data-ii="${ii}" value="${esc(item.desc||'')}" placeholder="Breve descrição"></div>
                <div class="fg" style="max-width:200px;"><label>Cor dos botões</label><input class="pe-sec-item-color" data-si="${si}" data-ii="${ii}" value="${esc(item.color||p.color||'#1c1c1c')}" placeholder="#1c1c1c" style="max-width:120px;"></div>
              </div>
              <div style="margin-top:4px;">
                <div style="font-size:9px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.4px;margin-bottom:6px;">Links / Botões</div>
                <div id="pe-sec-links-${si}-${ii}" style="display:flex;flex-direction:column;gap:5px;">
                  ${(item.links?.length?item.links:(item.url?[{label:'',url:item.url}]:[{label:'',url:''}])).map((link,li)=>`
                    <div style="display:flex;gap:5px;align-items:center;" data-li="${li}">
                      <input class="pe-sec-link-label" data-si="${si}" data-ii="${ii}" data-li="${li}" value="${esc(link.label||'')}" placeholder="Label (ex: Com Institucional)" style="flex:1;background:var(--s2);border:1px solid var(--b);border-radius:6px;color:var(--t1);padding:6px 10px;font-size:12px;font-family:inherit;outline:none;">
                      <input class="pe-sec-link-url" data-si="${si}" data-ii="${ii}" data-li="${li}" value="${esc(link.url||'')}" placeholder="https://..." style="flex:2;background:var(--s2);border:1px solid var(--b);border-radius:6px;color:var(--t1);padding:6px 10px;font-size:12px;font-family:inherit;outline:none;">
                      <button type="button" onclick="this.closest('[data-li]').remove()" style="background:none;border:1px solid var(--b);border-radius:5px;color:var(--t3);cursor:pointer;padding:5px 9px;flex-shrink:0;">✕</button>
                    </div>`).join('')}
                </div>
                <button type="button" onclick="portalAddLinkRow('pe-sec-links-${si}-${ii}','${si}','${ii}')" style="margin-top:6px;font-size:11px;padding:4px 12px;background:var(--s2);border:1px solid var(--b);border-radius:6px;color:var(--t2);cursor:pointer;font-family:inherit;">+ Link</button>
              </div>
              </div></div>
            </div>`).join('')}
          </div>
          <button data-action="portal-add-sec-item" data-si="${si}" class="btn btn-o" style="font-size:11px;padding:5px 12px;font-family:inherit;">+ Item nesta seção</button>
        </div>`).join('')}
        <button data-action="portal-add-sec" style="margin-top:8px;width:100%;padding:10px;border:2px dashed var(--b);border-radius:8px;background:transparent;color:var(--t3);cursor:pointer;font-size:12px;font-weight:600;font-family:inherit;transition:.12s;" onmouseover="this.style.borderColor='var(--ac)';this.style.color='var(--ac)'" onmouseout="this.style.borderColor='var(--b)';this.style.color='var(--t3)'">+ Adicionar seção</button>
      `}
    </div>`;
  }

  // PORTAL DETAIL VIEW — use allPortals to allow navigation to hidden portals (marcas)
  if(currentId){
    const p=allPortals.find(x=>x.id===currentId);
    if(!p)return`<div class="portal-wrap"><button data-action="portal-back" class="portal-back">← Voltar</button><p style="color:var(--t3)">Portal não encontrado.</p></div>`;
    return`<div class="portal-wrap">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
        <button data-action="portal-back" class="portal-back">← Central de Acessos</button>
        ${isAdmin?`<button data-action="portal-edit" data-pid="${p.id}" class="btn btn-o" style="margin-left:auto;font-size:11px;font-family:inherit;">✏️ Editar</button>`:''}
      </div>
      <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:${p.legend?.length?'12px':'24px'};">
        <div style="width:48px;height:48px;border-radius:12px;background:${p.color}18;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;">${p.icon?.startsWith('img:')?`<img src="${esc(p.icon.slice(4))}" style="width:32px;height:32px;object-fit:contain;">`:esc(p.icon||'🔗')}</div>
        <div>
          <div style="font-size:18px;font-weight:800;color:var(--t1);">${esc(p.name)}</div>
          ${p.badge?`<div style="font-size:12px;color:var(--t3);">${esc(p.badge)}</div>`:''}
        </div>
      </div>
      ${(p.legend&&p.legend.length)?`<div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:20px;padding:10px 14px;background:var(--s1);border:1px solid var(--b);border-radius:8px;align-items:center;">
        <span style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.4px;margin-right:4px;">Legenda:</span>
        ${p.legend.map(l=>`<div style="display:flex;align-items:center;gap:5px;">
          <span style="width:12px;height:12px;border-radius:50%;background:${esc(l.color)};flex-shrink:0;display:inline-block;"></span>
          <span style="font-size:12px;color:var(--t2);">${esc(l.label)}</span>
        </div>`).join('')}
        ${isAdmin?`<button data-action="portal-legend-edit" data-pid="${p.id}" style="margin-left:auto;background:none;border:1px solid var(--b);border-radius:5px;color:var(--t3);cursor:pointer;font-size:10px;padding:2px 8px;font-family:inherit;">✏️</button>`:''}
      </div>`:(isAdmin?`<div style="margin-bottom:20px;"><button data-action="portal-legend-edit" data-pid="${p.id}" style="background:none;border:1px dashed var(--b);border-radius:6px;color:var(--t3);cursor:pointer;font-size:11px;padding:5px 12px;font-family:inherit;">+ Adicionar legenda de cores</button></div>`:'')}

      ${p.sections&&p.sections.length?
        (p.id&&p.id.startsWith('marcas')?renderBrandLayout(p,isAdmin)
        :p.sections.map(sec=>{
          const items=sec.items||[];
          return`<div class="portal-section" style="--section-color:${p.color}">
            <div class="portal-section-title">${esc(sec.title)}</div>
            ${sec.logo?`<div style="background:#f7f5f2;border-radius:10px;overflow:hidden;margin-bottom:16px;display:flex;align-items:center;justify-content:center;height:140px;position:relative;border:1px solid var(--b);">
              <img src="${esc(sec.logo)}" style="max-width:55%;max-height:110px;object-fit:contain;display:block;">
              ${isAdmin?`<button data-action="sec-logo-edit" data-pid="${p.id}" data-sid="${sec.id}" style="position:absolute;top:8px;right:8px;background:rgba(0,0,0,.5);border:none;border-radius:5px;color:#fff;cursor:pointer;font-size:10px;padding:3px 8px;font-family:inherit;">✏️ Logo</button>`:''}
            </div>`:(isAdmin?`<div style="border:2px dashed var(--b);border-radius:10px;height:140px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;margin-bottom:16px;cursor:pointer;background:var(--s2);" data-action="sec-logo-edit" data-pid="${p.id}" data-sid="${sec.id}">
              <div style="font-size:20px;opacity:.4;">🖼</div>
              <div style="font-size:11px;color:var(--t3);">Clique para adicionar logo da marca</div>
            </div>`:'')}
            <div class="portal-items-grid">
              ${items.map((item,ii)=>{const itemLinks=item.links?.length?item.links:(item.url?[{label:'',url:item.url}]:[]);return`<div class="portal-item-card">
                ${isAdmin?`<button class="portal-item-dots" data-action="pim-open" data-pid="${p.id}" data-sid="${sec.id}" data-ii="${ii}" title="Editar">⋯</button>`:''}
                <div style="display:flex;align-items:center;gap:6px;justify-content:space-between;">
                  <div class="portal-item-title">${esc(item.title||'')}</div>
                  ${item.syncId?`<span style="font-size:8px;color:var(--t3);flex-shrink:0;" title="Item sincronizado">🔄</span>`:''}
                </div>
                ${item.desc?`<div class="portal-item-desc">${esc(item.desc)}</div>`:''}
                ${itemLinks.filter(l=>l.url).length?`<div style="display:flex;flex-direction:column;gap:6px;margin-top:8px;">${itemLinks.filter(l=>l.url).map(link=>{const isInternal=link.url.startsWith('portal:');const portalId=isInternal?link.url.slice(7):'';return isInternal?`<button data-action="portal-open" data-pid="${portalId}" class="portal-item-link" style="background:${esc(item.color||p.color||'#1c1c1c')};border:none;cursor:pointer;font-family:inherit;">${link.label||'Acessar'} →</button>`:`<a href="${esc(link.url)}" target="_blank" class="portal-item-link" style="background:${esc(item.color||p.color||'#1c1c1c')}">${link.label||'Acessar'} →</a>`;}).join('')}</div>`:''}
              </div>`;}).join('')}
              ${isAdmin?`<button class="portal-add-item-btn" data-action="pim-open" data-pid="${p.id}" data-sid="${sec.id}" data-ii="">＋ Adicionar item</button>`:''}
            </div>
          </div>`;
        }).join(''))
      :(p.items&&p.items.length?
        `<div class="portal-items-grid">
          ${p.items.map(item=>{const itemLinks=item.links?.length?item.links:(item.url?[{label:'',url:item.url}]:[]);return`<div class="portal-item-card">
            <div class="portal-item-title">${esc(item.title||'')}</div>
            ${item.desc?`<div class="portal-item-desc">${esc(item.desc)}</div>`:''}
            ${itemLinks.filter(l=>l.url).length?`<div style="display:flex;flex-direction:column;gap:6px;margin-top:8px;">${itemLinks.filter(l=>l.url).map(link=>`<a href="${esc(link.url)}" target="_blank" class="portal-item-link" style="background:${esc(item.color||p.color||'#1c1c1c')}">${link.label||'Acessar'} →</a>`).join('')}</div>`:''}
          </div>`}).join('')}
        </div>`)
        :`<div style="font-size:12px;color:var(--t3);padding:24px 0;text-align:center;">${isAdmin?'Nenhum item ainda. Clique em Editar para adicionar.':'Em breve.'}</div>`
      )}
    </div>`;
  }

  // PORTAL GERAL — grid of portals
  return`<div class="portal-wrap">
    <div style="margin-bottom:24px;text-align:center;">
      <div class="portal-title">CENTRAL DE ACESSOS KAMI CO.</div>
      <div class="portal-subtitle">Selecione o acesso que deseja</div>
    </div>
    <div class="portal-grid" style="max-width:960px;margin-left:auto;margin-right:auto;">
      ${portals.map(p=>`<div class="portal-entry-card" data-action="portal-open" data-pid="${p.id}" style="--card-color:${p.color};">
        <div class="portal-entry-icon">${p.icon?.startsWith('img:')?`<img src="${p.icon.slice(4)}" style="height:36px;width:auto;object-fit:contain;">`:p.icon||'🔗'}</div>
        <div class="portal-entry-name">${esc(p.name)}</div>
        ${p.badge?`<div class="portal-entry-badge">${esc(p.badge)}</div>`:''}
        <div class="portal-entry-desc" style="margin-top:8px;">${esc(p.description||'')}</div>
        ${isAdmin?`<button data-action="portal-edit" data-pid="${p.id}" style="position:absolute;top:12px;right:12px;background:none;border:1px solid var(--b);border-radius:6px;color:var(--t3);cursor:pointer;font-size:10px;padding:3px 8px;font-family:inherit;" onclick="event.stopPropagation()">✏️ Editar</button>`:''}
      </div>`).join('')}
    </div>
  </div>`;
}

// ── AUTOMATIONS MODAL ───────────────────
function renderAutomationsModal(){
  if(!S.show_automations)return'';
  const rules=S.automations||[];
  const triggerLabels={create:'Ao criar card',status_change:'Ao mudar status',any_save:'A cada salvamento'};
  const fieldLabels={project:'Projeto',postFormat:'Formato',status:'Status',channel:'Canal',responsible:'Responsável'};
  const opLabels={equals:'igual a',not_equals:'diferente de',contains:'contém',is_empty:'está vazio'};
  const actionLabels={assign_responsible:'Atribuir responsável',set_status:'Definir status',set_project:'Definir projeto'};

  return`<div class="overlay" id="auto-overlay" style="z-index:1100;">
    <div class="modal" style="max-width:680px;">
      <div class="mhead">
        <div class="mhead-t">⚡ Automações</div>
        <button class="mclose" data-action="close-auto">×</button>
      </div>
      <div class="mbody" style="max-height:70vh;overflow-y:auto;">
        ${rules.length===0?`<div style="text-align:center;padding:32px;color:var(--t3);">
          <div style="font-size:32px;margin-bottom:10px;">⚡</div>
          <div style="font-size:13px;font-weight:600;color:var(--t2);margin-bottom:4px;">Nenhuma automação criada</div>
          <div style="font-size:11px;">Crie regras para automatizar atribuições, status e projetos.</div>
        </div>`:rules.map(rule=>`<div class="auto-rule-card ${rule.active?'auto-rule-active':'auto-rule-inactive'}">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:8px;">
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
              <span style="font-size:13px;font-weight:700;color:var(--t1);">${esc(rule.name||'Sem nome')}</span>
              <span class="auto-badge auto-trigger">${triggerLabels[rule.trigger]||rule.trigger}</span>
              <span style="font-size:10px;color:var(--t3);">${rule.pipeline==='content'?'Conteúdo Redes Sociais':'Solicitações Externas'}</span>
            </div>
            <div style="display:flex;gap:6px;flex-shrink:0;">
              <label style="display:flex;align-items:center;gap:4px;cursor:pointer;font-size:11px;color:var(--t2);">
                <input type="checkbox" data-action="auto-toggle" data-id="${rule.id}" ${rule.active?'checked':''} style="accent-color:#22c55e;cursor:pointer;">
                ${rule.active?'Ativa':'Inativa'}
              </label>
              <button data-action="auto-edit" data-id="${rule.id}" style="background:var(--s2);border:1px solid var(--b);border-radius:5px;color:var(--t2);cursor:pointer;font-size:10px;padding:3px 8px;font-family:inherit;">✏️</button>
              <button data-action="auto-del" data-id="${rule.id}" style="background:none;border:1px solid var(--b);border-radius:5px;color:var(--t3);cursor:pointer;font-size:10px;padding:3px 8px;font-family:inherit;">✕</button>
            </div>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:5px;">
            ${(rule.conditions||[]).map(c=>`<span class="auto-badge auto-condition">${fieldLabels[c.field]||c.field} ${opLabels[c.operator]||c.operator} "${esc(c.value)}"</span>`).join('')}
            <span style="font-size:10px;color:var(--t3);padding:2px 4px;">→</span>
            ${(rule.actions||[]).map(a=>`<span class="auto-badge auto-action">${actionLabels[a.type]||a.type}: "${esc(a.value)}"</span>`).join('')}
          </div>
        </div>`).join('')}

        <!-- Form to add/edit rule -->
        <div style="background:var(--s2);border:1px solid var(--b);border-radius:10px;padding:16px;margin-top:8px;">
          <div style="font-size:11px;font-weight:700;color:var(--t2);text-transform:uppercase;letter-spacing:.4px;margin-bottom:12px;">Nova regra</div>
          <div class="r2" style="margin-bottom:10px;">
            <div class="fg"><label>Nome da automação</label><input type="text" id="auto-name" placeholder="Ex: Auto-atribuir Barbara no KAMI BR"></div>
            <div class="fg"><label>Pipeline</label>
              <select id="auto-pipeline">
                <option value="content">Conteúdo Redes Sociais</option>
                <option value="requests">Solicitações Externas</option>
              </select>
            </div>
          </div>
          <div class="fg" style="margin-bottom:10px;"><label>Gatilho (quando executar)</label>
            <select id="auto-trigger">
              <option value="create">Ao criar card</option>
              <option value="status_change">Ao mudar status</option>
              <option value="any_save">A cada salvamento</option>
            </select>
          </div>
          <div style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.4px;margin-bottom:6px;">Condição (SE)</div>
          <div class="r3" style="margin-bottom:10px;">
            <div class="fg"><label>Campo</label>
              <select id="auto-cond-field">
                <option value="project">Projeto</option>
                <option value="postFormat">Formato</option>
                <option value="status">Status</option>
                <option value="channel">Canal</option>
              </select>
            </div>
            <div class="fg"><label>Operador</label>
              <select id="auto-cond-op">
                <option value="equals">igual a</option>
                <option value="not_equals">diferente de</option>
                <option value="contains">contém</option>
                <option value="is_empty">está vazio</option>
              </select>
            </div>
            <div class="fg"><label>Valor</label><input type="text" id="auto-cond-val" placeholder="Ex: KAMI CO. BR"></div>
          </div>
          <div style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.4px;margin-bottom:6px;">Ação (ENTÃO)</div>
          <div class="r2" style="margin-bottom:12px;">
            <div class="fg"><label>Ação</label>
              <select id="auto-action-type">
                <option value="assign_responsible">Atribuir responsável</option>
                <option value="set_status">Definir status</option>
                <option value="set_project">Definir projeto</option>
              </select>
            </div>
            <div class="fg"><label>Valor</label><input type="text" id="auto-action-val" placeholder="Nome ou valor"></div>
          </div>
          <button data-action="auto-save" class="btn btn-p" style="font-family:inherit;">⚡ Criar automação</button>
        </div>
      </div>
      <div class="mfoot">
        <button class="btn modal btn-o" data-action="close-auto">Fechar</button>
      </div>
    </div>
  </div>`;
}

// ── CONFIRM MODAL ───────────────────────
function openConfirm(title, message, callback){
  _confirmCallback=callback;
  S.confirm={open:true,title,message};
  render();
}
function renderConfirmModal(){
  if(!S.confirm.open)return'';
  return`<div class="overlay" id="confirm-overlay" style="z-index:9998;">
    <div class="modal" style="max-width:400px;">
      <div class="mhead" style="border-bottom:none;padding-bottom:8px;">
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="width:36px;height:36px;border-radius:50%;background:#fee2e2;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M9 6V4h6v2"></path></svg>
          </div>
          <div class="mhead-t">${esc(S.confirm.title)}</div>
        </div>
        <button class="mclose" data-action="confirm-cancel">×</button>
      </div>
      <div class="mbody" style="padding-top:4px;padding-bottom:4px;">
        <p style="font-size:13px;color:var(--t2);line-height:1.6;">${esc(S.confirm.message)}</p>
      </div>
      <div class="mfoot">
        <button class="btn modal btn-o" data-action="confirm-cancel">Cancelar</button>
        <button class="btn btn-d" style="margin-right:0;" data-action="confirm-ok">Deletar</button>
      </div>
    </div>
  </div>`;
}

// ── PROFILE MODAL ───────────────────────
function renderProfileModal(){
  if(!S.showProfileModal)return'';
  const u=AUTH.users.find(x=>x.id===AUTH.session?.id)||{};
  const isAdmin=AUTH.session?.role==='admin';
  const fv=(v,placeholder='Não informado')=>v?`<span class="profile-field-value">${esc(v)}</span>`:`<span class="profile-field-value empty">${placeholder}</span>`;
  return`<div class="overlay" id="profile-overlay" style="z-index:1100;">
    <div class="modal" style="max-width:560px;">
      <div class="mhead">
        <div style="display:flex;align-items:center;gap:12px;">
          <button class="u-av-btn" data-action="avatar-self" title="Alterar foto">${uavatar(u,44)}</button>
          <div><div class="mhead-t">${esc(u.name||'')}</div><div style="font-size:11px;color:var(--t3);">${esc(u.email||'')}</div></div>
        </div>
        <button class="mclose" data-action="close-profile">×</button>
      </div>
      <div class="mtabs" style="background:var(--s2);">
        <button class="mtab on" style="color:var(--ac);border-bottom:2px solid var(--ac);">Meu Perfil</button>
      </div>
      <div class="mbody" style="display:grid;grid-template-columns:1fr 1fr;gap:0 24px;">
        <!-- Left: user editable -->
        <div>
          <div style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.4px;margin-bottom:8px;padding-bottom:6px;border-bottom:2px solid var(--b);">Informações pessoais</div>
          <form id="profile-form">
            <div class="fg" style="margin-bottom:10px;"><label>Data de nascimento</label><input type="date" name="birthdate" value="${esc(u.birthdate||'')}"></div>
            <div class="fg" style="margin-bottom:10px;"><label>Telefone de trabalho</label><input type="tel" name="workPhone" value="${esc(u.workPhone||'')}" placeholder="(00) 0000-0000"></div>
            <div class="fg" style="margin-bottom:10px;"><label>Telefone celular</label><input type="tel" name="mobilePhone" value="${esc(u.mobilePhone||'')}" placeholder="(00) 00000-0000"></div>
            <div class="fg" style="margin-bottom:10px;"><label>Cidade</label><input type="text" name="city" value="${esc(u.city||'')}" placeholder="Sua cidade"></div>
          </form>
        </div>
        <!-- Right: admin-set info -->
        <div>
          <div style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.4px;margin-bottom:8px;padding-bottom:6px;border-bottom:2px solid var(--b);">Informações profissionais</div>
          <div class="profile-field"><span class="profile-field-label">Departamento</span>${fv(u.department)}</div>
          <div class="profile-field"><span class="profile-field-label">Cargo</span>${fv(u.position)}</div>
          <div class="profile-field"><span class="profile-field-label">Supervisor</span>${fv(u.supervisor)}</div>
          ${isAdmin?`<div style="margin-top:12px;padding-top:10px;border-top:1px solid var(--b);">
            <div style="font-size:10px;font-weight:700;color:var(--ac);text-transform:uppercase;letter-spacing:.4px;margin-bottom:8px;">Editar (admin)</div>
            <div class="fg" style="margin-bottom:8px;"><label>Departamento</label><input type="text" id="prof-dept" value="${esc(u.department||'')}" placeholder="Ex: Marketing"></div>
            <div class="fg" style="margin-bottom:8px;"><label>Cargo</label><input type="text" id="prof-pos" value="${esc(u.position||'')}" placeholder="Ex: Analista de MKT"></div>
            <div class="fg"><label>Supervisor</label><input type="text" id="prof-sup" value="${esc(u.supervisor||'')}" placeholder="Nome do supervisor"></div>
          </div>`:''}
        </div>
      </div>
      <div class="mfoot">
        <button class="btn modal btn-o" data-action="close-profile">Fechar</button>
        <button class="btn btn-p" data-action="save-profile">Salvar</button>
      </div>
    </div>
  </div>`;
}

function renderEditUserModal(){
  if(!S.editUserModal.open)return'';
  const u=AUTH.users.find(x=>x.id===S.editUserModal.uid);
  if(!u)return'';
  return`<div class="overlay" id="edit-user-overlay" style="z-index:1100;">
    <div class="modal" style="max-width:500px;">
      <div class="mhead">
        <div class="mhead-t">Editar: ${esc(u.name)}</div>
        <button class="mclose" data-action="close-edit-user">×</button>
      </div>
      <div class="mbody" style="display:flex;flex-direction:column;gap:10px;">
        <div class="fg"><label>Nome</label><input type="text" id="eu-name" value="${esc(u.name||'')}"></div>
        <div class="fg"><label>Departamento</label><input type="text" id="eu-dept" value="${esc(u.department||'')}" placeholder="Ex: Marketing"></div>
        <div class="fg"><label>Cargo</label><input type="text" id="eu-pos" value="${esc(u.position||'')}" placeholder="Ex: Analista de MKT"></div>
        <div class="fg"><label>Supervisor</label><input type="text" id="eu-sup" value="${esc(u.supervisor||'')}" placeholder="Nome do supervisor"></div>
        <div style="border-top:1px solid var(--b);padding-top:12px;">
          <div style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.4px;margin-bottom:10px;">Acessos</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <div>
              <div style="font-size:10px;color:var(--t3);margin-bottom:6px;font-weight:600;">Pipeline</div>
              ${['dash','content','requests','social'].map(k=>{const labels={dash:'Dashboard',content:'Conteúdo',requests:'Solicitações',social:'Social'};return`<label class="cbitem"><input type="checkbox" class="eu-access" value="${k}" ${(u.access||[]).includes(k)?'checked':''} style="accent-color:var(--ac);width:13px;height:13px;cursor:pointer;"> <span class="cbitem-name">${labels[k]}</span></label>`;}).join('')}
            </div>
            <div>
              <div style="font-size:10px;color:var(--t3);margin-bottom:6px;font-weight:600;">Portais</div>
              ${['portal-geral','portal-rep-br','portal-rep-pt'].map(k=>{const labels={'portal-geral':'Portal Geral','portal-rep-br':'Representante BR','portal-rep-pt':'Representante PT'};return`<label class="cbitem"><input type="checkbox" class="eu-access" value="${k}" ${(u.access||[]).includes(k)?'checked':''} style="accent-color:var(--ac);width:13px;height:13px;cursor:pointer;"> <span class="cbitem-name">${labels[k]}</span></label>`;}).join('')}
            </div>
          </div>
        </div>
      </div>
      <div class="mfoot">
        <button class="btn btn-d" data-action="reset-pwd-user" data-uid="${u.id}" data-uname="${esc(u.name)}" title="Gerar nova senha temporária">🔑 Redefinir senha</button>
        <button class="btn modal btn-o" data-action="close-edit-user">Cancelar</button>
        <button class="btn btn-p" data-action="save-edit-user" data-uid="${u.id}">Salvar</button>
      </div>
    </div>
  </div>`;
}

// ── HEADER ──────────────────────────────
function hdr(){
  const v=S.pipe==='content'?S.view:S.view2;
  const isDash=S.pipe==='dash';
  const isSocial=S.pipe==='social';
  const isPortal=S.pipe==='portal';
  const isAdmin=AUTH.session&&AUTH.session.role==='admin';
  const isPortalUser=AUTH.session&&AUTH.session.role!=='admin'&&!(AUTH.session.access||[]).some(a=>['dash','content','requests','social'].includes(a));
  return`<header class="header">
    <div class="brand"><img src="kami-logo.png.png" style="height:28px;width:auto;flex-shrink:0;display:block;"><span>MAR<b>K</b>ETING</span></div>
    <div class="sep"></div>
    ${isPortalUser?'':
    `<div class="pipe-tabs">
      ${canAccess('dash')?`<button class="pt-btn ${isDash?'on':''}" data-pipe="dash">Dashboard</button>`:''}
      ${canAccess('requests')?`<button class="pt-btn ${S.pipe==='requests'?'on':''}" data-pipe="requests">Solicitações Externas</button>`:''}
      ${canAccess('content')?`<button class="pt-btn ${S.pipe==='content'?'on':''}" data-pipe="content">Conteúdo Redes Sociais</button>`:''}
      ${canAccess('social')?`<button class="pt-btn ${S.pipe==='social'?'on':''}" data-pipe="social">Programações</button>`:''}
      ${(isAdmin||canAccess('portal-geral')||canAccess('portal-rep-br')||canAccess('portal-rep-pt'))?`<button class="pt-btn ${isPortal?'on':''}" data-pipe="portal">Central de Acessos</button>`:''}
    </div>`}
    <div class="hright">
      ${(()=>{const cu=AUTH.users.find(u=>u.id===(AUTH.session||{}).id)||{id:'x',name:(AUTH.session||{name:'?'}).name,avatar:''};return`<button class="u-av-btn" data-action="avatar-self" title="Alterar foto de perfil">${uavatar(cu,30)}</button><span class="user-chip" data-action="open-profile" style="cursor:pointer;max-width:120px;" title="Ver perfil">${esc((AUTH.session||{}).name||'')}</span>`;})()}
      ${isAdmin&&S.pipe==='content'?`<button class="btn-icon" data-action="open-auto" title="Automações" style="font-size:12px;">⚡</button>`:''}
      ${isAdmin?`<button class="btn-icon" data-action="open-users" title="Gerenciar usuários">&#128101;</button>`:''}
      <button class="btn-icon" data-action="logout" title="Sair">&#9167;</button>
    </div>
  </header>`;
}

// ── STARTUP ALERT ────────────────────────
function getDeadlineAlerts(){
  const today=new Date();today.setHours(0,0,0,0);
  const check=d=>{if(!d)return null;const dt=new Date(d);dt.setHours(0,0,0,0);return Math.round((dt-today)/(1000*60*60*24));};
  const active=S.cards.filter(c=>c.status!=='done'&&c.status!=='standby');
  const overdue=active.filter(c=>{const d=[check(c.deliveryDate),check(c.publishDate)].filter(x=>x!==null);return d.length&&Math.min(...d)<0;});
  const today0=active.filter(c=>{const d=[check(c.deliveryDate),check(c.publishDate)].filter(x=>x!==null);return d.length&&Math.min(...d)===0;});
  const soon=active.filter(c=>{const d=[check(c.deliveryDate),check(c.publishDate)].filter(x=>x!==null);const m=d.length?Math.min(...d):null;return m!==null&&m>0&&m<=2;});
  return{overdue,today:today0,soon};
}
function renderStartupAlert(){
  if(S.startup_alert_dismissed)return'';
  if(S.pipe!=='content'&&S.pipe!=='dash')return'';
  const{overdue,today,soon}=getDeadlineAlerts();
  if(!overdue.length&&!today.length&&!soon.length)return'';
  return`<div style="background:${overdue.length?'#fee2e2':today.length?'#fef3c7':'#fffbeb'};border-bottom:1px solid ${overdue.length?'#fca5a5':today.length?'#fde68a':'#fcd34d'};padding:8px 20px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;flex-shrink:0;">
    <span style="font-size:13px;">${overdue.length?'⚠️':today.length?'⏰':'📅'}</span>
    <div style="flex:1;display:flex;flex-wrap:wrap;gap:8px;align-items:center;">
      ${overdue.length?`<span style="font-size:12px;font-weight:700;color:#dc2626;">${overdue.length} card${overdue.length>1?'s':''} atrasado${overdue.length>1?'s':''}</span>`:''}
      ${today.length?`<span style="font-size:12px;font-weight:700;color:#b45309;">${today.length} card${today.length>1?'s':''} vencem hoje</span>`:''}
      ${soon.length?`<span style="font-size:12px;font-weight:600;color:#92400e;">${soon.length} card${soon.length>1?'s':''} vencem em até 2 dias</span>`:''}
      ${overdue.length?`<div style="display:flex;flex-wrap:wrap;gap:4px;">${overdue.slice(0,3).map(c=>`<span style="background:#fecaca;color:#991b1b;border-radius:4px;padding:1px 7px;font-size:10px;font-weight:600;">${esc(c.title||'Sem título')}</span>`).join('')}${overdue.length>3?`<span style="font-size:10px;color:#dc2626;">+${overdue.length-3} mais</span>`:''}</div>`:''}
    </div>
    <button data-action="dismiss-startup-alert" style="background:none;border:none;color:${overdue.length?'#dc2626':'#b45309'};cursor:pointer;font-size:16px;padding:0 4px;flex-shrink:0;" title="Fechar">×</button>
  </div>`;
}

// ── PIPELINE 1: FILTERS + STATS ─────────
function flt1(){
  const f=S.filters;
  const has=f.search||f.project||f.status||f.channel||f.responsible;
  return`<div class="filters">
    <span class="flabel">Filtrar</span>
    <input class="fsearch" type="text" placeholder="Buscar título..." value="${esc(f.search)}" data-f1="search">
    <select class="fsel" data-f1="project">
      <option value="">Todos projetos</option>
      ${PROJ.map(p=>`<option value="${esc(p)}"${f.project===p?' selected':''}>${esc(p)}</option>`).join('')}
    </select>
    <select class="fsel" data-f1="status">
      <option value="">Todos status</option>
      ${ST.map(s=>`<option value="${s.id}"${f.status===s.id?' selected':''}>${esc(s.label)}</option>`).join('')}
    </select>
    <select class="fsel" data-f1="channel">
      <option value="">Todos canais</option>
      ${CHANNELS.map(ch=>`<option value="${esc(ch)}"${f.channel===ch?' selected':''}>${esc(ch)}</option>`).join('')}
    </select>
    <select class="fsel" data-f1="responsible">
      <option value="">Todos responsáveis</option>
      ${getTeam().map(t=>`<option value="${esc(t.name)}"${f.responsible===t.name?' selected':''}>${esc(t.name)}</option>`).join('')}
    </select>
    ${has?`<span class="fclr" data-action="clr1">✕ Limpar</span>`:''}
    <div style="margin-left:auto;display:flex;align-items:center;gap:6px;">
      <button class="btn btn-p" data-action="new" data-st="ideas" style="padding:5px 12px;font-size:11px;">+ Novo Card</button>
      <div style="display:flex;background:var(--s2);border:1px solid var(--b);border-radius:7px;padding:2px;gap:1px;">
        <button class="vbtn ${S.view==='kanban'?'on':''}" data-view="kanban" style="padding:4px 10px;font-size:11px;">⊞ Kanban</button>
        <button class="vbtn ${S.view==='list'?'on':''}" data-view="list" style="padding:4px 10px;font-size:11px;">☰ Lista</button>
      </div>
    </div>
  </div>`;
}
function sts1(){
  const c=filtered1();
  return`<div class="stats">
    <div class="stat"><div class="sdot" style="background:var(--ac)"></div><strong>${c.length}</strong> cards</div>
    <div class="stat"><div class="sdot" style="background:#f59e0b"></div><strong>${c.filter(x=>x.status==='progress').length}</strong> em andamento</div>
    <div class="stat"><div class="sdot" style="background:#06b6d4"></div><strong>${c.filter(x=>x.status==='review').length}</strong> em revisão</div>
    <div class="stat"><div class="sdot" style="background:#22c55e"></div><strong>${c.filter(x=>x.status==='done').length}</strong> concluídos</div>
    <div class="stat" style="margin-left:auto;font-size:10px;color:var(--t3)">N = novo card</div>
  </div>`;
}

// ── PIPELINE 1: KANBAN ──────────────────
function kban1(){
  const cards=filtered1();
  return`<div class="kanban">${ST.map(s=>{
    const cc=cards.filter(c=>c.status===s.id);
    return`<div class="kcol">
      <div class="khead">
        <div class="kdot" style="background:${s.color}"></div>
        <div class="ktitle">${esc(s.label)}</div>
        <div class="kcount">${cc.length}</div>
        <button class="kadd" data-action="new" data-st="${s.id}" title="Adicionar">+</button>
      </div>
      <div class="kcards" data-dz="${s.id}" data-pipe1>
        ${cc.length===0?`<div class="kempty"><div class="kempty-icon">○</div><div class="kempty-txt">Vazio</div></div>`:cc.map(c=>card1(c)).join('')}
      </div>
    </div>`;
  }).join('')}</div>`;
}
function card1(c){
  const hs=!!c.script?.trim(),hb=!!c.briefing?.trim(),hc=!!c.caption?.trim(),hl=!!c.fileLink?.trim();
  const proj=c.project?c.project.replace('KAMI CO. ','').replace('Toctus_KAMI CO.','Toctus'):c.project;
  const today=new Date();today.setHours(0,0,0,0);
  const checkDate=d=>{if(!d)return null;const dt=new Date(d);dt.setHours(0,0,0,0);const diff=Math.round((dt-today)/(1000*60*60*24));return diff;};
  const delivDiff=checkDate(c.deliveryDate);
  const pubDiff=checkDate(c.publishDate);
  const minDiff=[delivDiff,pubDiff].filter(x=>x!==null).reduce((a,b)=>a===null?b:Math.min(a,b),null);
  const isOverdue=c.status!=='done'&&c.status!=='standby'&&minDiff!==null&&minDiff<0;
  const isDueSoon=c.status!=='done'&&c.status!=='standby'&&minDiff!==null&&minDiff>=0&&minDiff<=2;
  return`<div class="card" draggable="true" data-cid="${c.id}" data-cpipe="1" style="${isOverdue?'border-left-color:#dc2626;background:#fff5f5;':isDueSoon?'border-left-color:#f59e0b;background:#fffbeb;':''}">
    <div class="ctitle" style="display:flex;align-items:flex-start;justify-content:space-between;gap:6px;">
      <span>${esc(c.title)||'<em style="color:var(--t3)">Sem título</em>'}</span>
      ${isOverdue?`<span style="background:#fee2e2;color:#dc2626;border-radius:4px;padding:2px 6px;font-size:9px;font-weight:800;white-space:nowrap;flex-shrink:0;">⚠️ Atrasado</span>`:isDueSoon?`<span style="background:#fef3c7;color:#b45309;border-radius:4px;padding:2px 6px;font-size:9px;font-weight:800;white-space:nowrap;flex-shrink:0;">⏰ ${minDiff===0?'Hoje':minDiff===1?'Amanhã':'2 dias'}</span>`:''}
    </div>
    <div class="ctags">
      ${c.project?`<span class="tag t-p">${esc(proj)}</span>`:''}
      ${c.postFormat?`<span class="tag ${fmtcls(c.postFormat)}">${gfmt(c.postFormat)?.icon||''} ${c.postSubtype||gfmt(c.postFormat)?.label||c.postFormat}</span>`:c.contentType?`<span class="tag ${tcls(c.contentType)}">${esc(c.contentType)}</span>`:''}
      ${c.funnel?`<span class="tag ${fcls(c.funnel)}">${esc(c.funnel)}</span>`:''}
      ${(c.channel&&c.channel.length)?c.channel.map(ch=>`<span class="tag t-ch">${esc(ch)}</span>`).join(''):''}
    </div>
    ${(c.deliveryDate||c.publishDate)?`<div class="cdates">
      ${c.deliveryDate?`<div class="cdate">📦 ${fdate(c.deliveryDate)}</div>`:''}
      ${c.publishDate?`<div class="cdate">📅 ${fdate(c.publishDate)}</div>`:''}
    </div>`:''}
    <div class="cinds">
      <div class="ind ${hs?'ind-on':'ind-off'}" title="Roteiro ${hs?'✓':'vazio'}"></div>
      <div class="ind ${hb?'ind-on':'ind-off'}" title="Briefing ${hb?'✓':'vazio'}"></div>
      <div class="ind ${hc?'ind-on':'ind-off'}" title="Legenda ${hc?'✓':'vazia'}"></div>
      ${hl?`<div class="ind ind-blue" title="Arquivo vinculado"></div>`:''}
      <span class="ind-label">R B L${hl?' A':''}</span>
    </div>
    ${(c.responsible&&c.responsible.length)?`<div class="avatars">${c.responsible.map(n=>{const m=getTeam().find(t=>t.name===n);return m?`<div class="avatar" style="background:${m.color}" title="${esc(n)}">${m.initials}</div>`:''}).join('')}</div>`:''}
  </div>`;
}

// ── PIPELINE 1: LIST ────────────────────
function list1(){
  const cards=filtered1();const s=S.sort;
  const sorted=[...cards].sort((a,b)=>{
    let av=a[s.field]||'',bv=b[s.field]||'';
    if(s.field==='createdAt'){av=Number(av);bv=Number(bv);}
    if(av<bv)return s.dir==='asc'?-1:1;if(av>bv)return s.dir==='asc'?1:-1;return 0;
  });
  const arr=f=>s.field===f?`<span class="sa">${s.dir==='asc'?'▲':'▼'}</span>`:'';
  return`<div class="listwrap"><table class="ltbl">
    <thead><tr>
      <th data-sort1="title">Título${arr('title')}</th>
      <th data-sort1="status">Status${arr('status')}</th>
      <th data-sort1="project">Projeto${arr('project')}</th>
      <th data-sort1="contentType">Tipo${arr('contentType')}</th>
      <th data-sort1="funnel">Funil${arr('funnel')}</th>
      <th data-sort1="deliveryDate">Entrega Criativo${arr('deliveryDate')}</th>
      <th data-sort1="publishDate">Publicação${arr('publishDate')}</th>
      <th>Canal</th>
      <th>Responsáveis</th>
      <th>Conteúdo</th>
    </tr></thead>
    <tbody>${sorted.length===0?`<tr><td colspan="10" style="text-align:center;padding:40px;color:var(--t3);">Nenhum card encontrado</td></tr>`:sorted.map(c=>{
      const st=gst(c.status);
      const hs=!!c.script?.trim(),hb=!!c.briefing?.trim(),hc=!!c.caption?.trim(),hl=!!c.fileLink?.trim();
      return`<tr data-cid="${c.id}" data-cpipe="1">
        <td style="font-weight:600;max-width:200px;"><div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${esc(c.title)||'—'}</div></td>
        <td><span class="sbadge" style="background:${st.color}22;color:${st.color}">${esc(st.label)}</span></td>
        <td>${c.project?`<span class="tag t-p" style="white-space:nowrap">${esc(c.project)}</span>`:'—'}</td>
        <td>${c.postFormat?`<span class="tag ${fmtcls(c.postFormat)}">${gfmt(c.postFormat)?.icon||''} ${c.postSubtype||gfmt(c.postFormat)?.label||c.postFormat}</span>`:c.contentType?`<span class="tag ${tcls(c.contentType)}">${esc(c.contentType)}</span>`:'—'}</td>
        <td>${c.funnel?`<span class="tag ${fcls(c.funnel)}">${esc(c.funnel)}</span>`:'—'}</td>
        <td style="color:var(--t2)">${fdate(c.deliveryDate)}</td>
        <td style="color:var(--t2)">${fdate(c.publishDate)}</td>
        <td><div style="display:flex;flex-wrap:wrap;gap:3px;">${(c.channel&&c.channel.length)?c.channel.map(ch=>`<span class="tag t-ch">${esc(ch)}</span>`).join(''):'<span style="color:var(--t3)">—</span>'}</div></td>
        <td><div style="display:flex;gap:3px;">${(c.responsible&&c.responsible.length)?c.responsible.map(n=>{const m=getTeam().find(t=>t.name===n);return m?`<div class="avatar" style="background:${m.color};width:22px;height:22px;font-size:9px;" title="${esc(n)}">${m.initials}</div>`:''}).join(''):'<span style="color:var(--t3)">—</span>'}</div></td>
        <td><div style="display:flex;gap:4px;">
          <div class="ind ${hs?'ind-on':'ind-off'}" title="Roteiro"></div>
          <div class="ind ${hb?'ind-on':'ind-off'}" title="Briefing"></div>
          <div class="ind ${hc?'ind-on':'ind-off'}" title="Legenda"></div>
          ${hl?`<div class="ind ind-blue" title="Arquivo"></div>`:''}
        </div></td>
      </tr>`;
    }).join('')}</tbody>
  </table></div>`;
}

// ── PIPELINE 1: MODAL ───────────────────
function modal1(){
  if(!S.modal.open)return`<div class="overlay hide" id="ov1"></div>`;
  const isNew=!S.modal.id;
  const c=S.modal.id?S.cards.find(x=>x.id===S.modal.id):null;
  const v=c||{id:'',title:'',status:S.modal.defStatus,project:'',contentType:'',funnel:'',channel:[],deliveryDate:'',publishDate:'',script:'',briefing:'',caption:'',fileLink:'',fileCount:'',publishInstructions:'',responsible:[]};
  const tab=S.modal.tab;
  return`<div class="overlay" id="ov1">
    <div class="modal">
      <div class="mhead">
        <div class="mhead-t">${isNew?'Novo Card':'Editar Card'}</div>
        <button class="mclose" data-action="cls1">×</button>
      </div>
      <div class="mtabs" style="display:flex;align-items:center;">
        <button class="mtab ${tab==='basic'?'on':''}" data-mt1="basic">📋 Informações</button>
        <button class="mtab ${tab==='content'?'on':''}" data-mt1="content">✍️ Conteúdo</button>
        <button class="mtab ${tab==='delivery'?'on':''}" data-mt1="delivery">📦 Entrega</button>
        <div style="margin-left:auto;padding-right:18px;">
          <select name="status" form="cf1" style="background:var(--s2);border:1px solid var(--b);border-radius:7px;color:var(--t1);padding:5px 10px;font-size:11px;outline:none;font-family:inherit;">${ST.map(s=>`<option value="${s.id}"${v.status===s.id?' selected':''}>${esc(s.label)}</option>`).join('')}</select>
        </div>
      </div>
      <div class="mbody">
        <form id="cf1">
          <div class="tpane ${tab==='basic'?'on':''}">
            <div class="fg"><label>Título *</label>
              <input type="text" name="title" value="${esc(v.title)}" placeholder="Ex: Post campanha verão — Balens" required>
            </div>
            <div class="r2">
              <div class="fg"><label>Projeto</label>
                <select name="project">
                  <option value="">Selecionar...</option>
                  ${PROJ.map(p=>`<option value="${esc(p)}"${v.project===p?' selected':''}>${esc(p)}</option>`).join('')}
                </select>
              </div>
            </div>
            <div class="fg">
              <label>Formato de publicação</label>
              <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:2px;">
                ${POST_FORMATS.map(f=>`<label class="fmt-pill${v.postFormat===f.id?' active':''}" id="fmtpill-${f.id}">
                  <input type="radio" name="postFormat" value="${f.id}" ${v.postFormat===f.id?'checked':''} style="display:none;" onchange="updateSubtypes('${f.id}')">
                  ${f.icon} ${f.label}
                </label>`).join('')}
                <label class="fmt-pill${!v.postFormat?' active':''}" id="fmtpill-">
                  <input type="radio" name="postFormat" value="" ${!v.postFormat?'checked':''} style="display:none;" onchange="updateSubtypes('')">
                  — Outro
                </label>
              </div>
            </div>
            <div class="r3">
              <div class="fg" id="fg-postSubtype" style="display:${v.postFormat?'flex':'none'}">
                <label>Tipo — <span id="lbl-postSubtype-fmt">${v.postFormat?POST_FORMATS.find(f=>f.id===v.postFormat)?.label:''}</span></label>
                <select name="postSubtype" id="sel-postSubtype">
                  <option value="">Selecionar...</option>
                  ${v.postFormat?(POST_SUBTYPES[v.postFormat]||[]).map(s=>`<option value="${esc(s)}"${v.postSubtype===s?' selected':''}>${esc(s)}</option>`).join(''):''}
                </select>
              </div>
              <div class="fg"><label>Funil</label>
                <select name="funnel">
                  <option value="">Selecionar...</option>
                  ${FUNNELS.map(f=>`<option value="${esc(f)}"${v.funnel===f?' selected':''}>${esc(f)}</option>`).join('')}
                </select>
              </div>
              <div class="fg"></div>
            </div>
            <div class="r2">
              <div class="fg"><label>Data de Entrega do Criativo</label>
                <input type="date" name="deliveryDate" value="${esc(v.deliveryDate)}">
              </div>
              <div class="fg"><label>Data de Publicação</label>
                <input type="date" name="publishDate" value="${esc(v.publishDate)}">
              </div>
            </div>
            <div class="fg"><label>Canal</label>
              <div class="ch-group">
                ${CHANNELS.map(ch=>`<label class="ch-item">
                  <input type="checkbox" name="channel" value="${esc(ch)}"${(v.channel&&v.channel.includes(ch))?' checked':''}>
                  <span class="ch-item-name">${esc(ch)}</span>
                </label>`).join('')}
              </div>
            </div>
            <div class="fg"><label>Responsáveis</label>
              <div style="display:none;" id="resp-hidden-checks">
                ${getTeam().map(t=>`<input type="checkbox" name="responsible" value="${esc(t.name)}"${(v.responsible&&v.responsible.includes(t.name))?' checked':''}>`).join('')}
              </div>
              <div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;padding:6px 0;" id="resp-chips-c1">
                ${getTeam().filter(t=>v.responsible&&v.responsible.includes(t.name)).map(t=>`<div class="resp-chip-c1" data-name="${esc(t.name)}" style="display:flex;align-items:center;gap:6px;padding:5px 10px;background:var(--s2);border-radius:6px;border:1px solid var(--b);">
                  <div style="width:20px;height:20px;border-radius:50%;background:${t.color};display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:800;color:#fff;">${t.initials}</div>
                  <span style="font-size:12px;color:var(--t1);">${esc(t.name)}</span>
                  <button type="button" data-resp-remove="${esc(t.name)}" style="background:none;border:none;color:var(--t3);cursor:pointer;font-size:12px;padding:0 2px;line-height:1;">×</button>
                </div>`).join('')}
                <div style="position:relative;display:inline-block;">
                  <button type="button" id="add-resp-c1-btn" style="width:28px;height:28px;border-radius:50%;border:1.5px dashed var(--b);background:none;color:var(--t3);cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;">+</button>
                  <div id="add-resp-c1-dd" style="display:none;position:absolute;top:34px;left:0;background:var(--s1);border:1px solid var(--b);border-radius:8px;box-shadow:0 4px 16px rgba(0,0,0,.12);z-index:200;min-width:200px;padding:6px;">
                    <input type="text" id="resp-search-c1-dd" placeholder="Buscar responsável..." style="width:100%;background:var(--s2);border:1px solid var(--b);border-radius:6px;color:var(--t1);padding:6px 9px;font-size:11px;outline:none;font-family:inherit;margin-bottom:4px;box-sizing:border-box;">
                    ${getTeam().map(t=>`<div class="resp-opt-c1" data-n="${esc(t.name)}" data-color="${t.color}" data-initials="${t.initials}" style="display:flex;align-items:center;gap:8px;padding:7px 10px;border-radius:6px;cursor:pointer;">
                      <div style="width:20px;height:20px;border-radius:50%;background:${t.color};display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:800;color:#fff;">${t.initials}</div>
                      <span style="font-size:12px;color:var(--t1);">${esc(t.name)}</span>
                    </div>`).join('')}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tpane ${tab==='content'?'on':''}">
            <div class="fg"><label>Roteiro Audiovisual</label>
              <textarea name="script" placeholder="Cenas, falas, transições...">${esc(v.script)}</textarea>
            </div>
            <div class="fg"><label>Briefing Criativo</label>
              <textarea name="briefing" placeholder="Referências visuais, paleta, formato, mensagem principal...">${esc(v.briefing)}</textarea>
            </div>
            <div class="fg"><label>Legenda</label>
              <textarea name="caption" placeholder="Legenda completa com emojis e hashtags...">${esc(v.caption)}</textarea>
            </div>
          </div>
          <div class="tpane ${tab==='delivery'?'on':''}">
            <div class="fg"><label>Link do Arquivo (Drive, Dropbox, Frame.io…)</label>
              <input type="url" name="fileLink" value="${esc(v.fileLink)}" placeholder="https://drive.google.com/...">
            </div>
            <div class="fg"><label>Quantidade de Arquivos Gerados</label>
              <input type="number" name="fileCount" value="${esc(String(v.fileCount||''))}" placeholder="0" min="0" style="max-width:140px;">
            </div>
            <div class="fg"><label>Instruções para Publicação</label>
              <textarea name="publishInstructions" placeholder="Horário, hashtags, perfis para marcar, configs de veiculação...">${esc(v.publishInstructions)}</textarea>
            </div>
          </div>
        </form>
      </div>
      <div class="mfoot">
        ${!isNew?`<button class="btn btn-d" data-action="del1" data-id="${v.id}">Deletar</button>`:''}
        <button class="btn btn-o" data-action="cls1">Cancelar</button>
        <button class="btn btn-p" data-action="save1" data-id="${v.id}">${isNew?'Criar Card':'Salvar'}</button>
      </div>
    </div>
  </div>`;
}

// ═══════════════════════════════════════
// PIPELINE 2 — SOLICITAÇÕES
// ═══════════════════════════════════════

function flt2(){
  const f=S.filters2;
  const has=f.search||f.status||f.responsible2;
  return`<div class="filters">
    <span class="flabel">Filtrar</span>
    <input class="fsearch" type="text" placeholder="Buscar título ou solicitante..." value="${esc(f.search)}" data-f2="search">
    <select class="fsel" data-f2="status">
      <option value="">Todos status</option>
      ${ST2.map(s=>`<option value="${s.id}"${f.status===s.id?' selected':''}>${esc(s.label)}</option>`).join('')}
    </select>
    <select class="fsel" data-f2="responsible2">
      <option value="">Todos responsáveis</option>
      ${getTeam().map(t=>`<option value="${esc(t.name)}"${f.responsible2===t.name?' selected':''}>${esc(t.name)}</option>`).join('')}
    </select>
    ${has?`<span class="fclr" data-action="clr2">✕ Limpar</span>`:''}
    <div style="margin-left:auto;display:flex;align-items:center;gap:6px;">
      <button class="btn btn-p" data-action="new" data-st2="triage" style="padding:5px 12px;font-size:11px;">+ Nova Solicitação</button>
      <div style="display:flex;background:var(--s2);border:1px solid var(--b);border-radius:7px;padding:2px;gap:1px;">
        <button class="vbtn ${S.view2==='kanban'?'on':''}" data-view="kanban" style="padding:4px 10px;font-size:11px;">⊞ Kanban</button>
        <button class="vbtn ${S.view2==='list'?'on':''}" data-view="list" style="padding:4px 10px;font-size:11px;">☰ Lista</button>
      </div>
    </div>
  </div>`;
}

function sts2(){
  const c=filtered2();
  return`<div class="stats">
    <div class="stat"><div class="sdot" style="background:var(--ac)"></div><strong>${c.length}</strong> solicitações</div>
    <div class="stat"><div class="sdot" style="background:#f59e0b"></div><strong>${c.filter(x=>x.status==='progress').length}</strong> em andamento</div>
    <div class="stat"><div class="sdot" style="background:#f43f5e"></div><strong>${c.filter(x=>x.status==='waiting').length}</strong> aguardando info</div>
    <div class="stat"><div class="sdot" style="background:#22c55e"></div><strong>${c.filter(x=>x.status==='done').length}</strong> concluídas</div>
  </div>`;
}

function kban2(){
  const reqs=filtered2();
  return`<div class="kanban">${ST2.map(s=>{
    const cc=reqs.filter(r=>r.status===s.id);
    return`<div class="kcol">
      <div class="khead">
        <div class="kdot" style="background:${s.color}"></div>
        <div class="ktitle">${esc(s.label)}</div>
        <div class="kcount">${cc.length}</div>
        <button class="kadd" data-action="new" data-st2="${s.id}" title="Adicionar">+</button>
      </div>
      <div class="kcards" data-dz2="${s.id}">
        ${cc.length===0?`<div class="kempty"><div class="kempty-icon">○</div><div class="kempty-txt">Vazio</div></div>`:cc.map(r=>card2(r)).join('')}
      </div>
    </div>`;
  }).join('')}</div>`;
}

function card2(r){
  const shortOT=r.orderType?r.orderType.replace('Lâminas comerciais — campanhas ou promoções','Lâminas comerciais'):r.orderType;
  const st=gst2(r.status);
  return`<div class="card" draggable="true" data-rid="${r.id}" data-cpipe="2" style="border-left-color:${st.color}44">
    <div class="ctitle">${esc(r.requestTitle)||'<em style="color:var(--t3)">Sem título</em>'}</div>
    <div class="ctags">
      ${r.bizUnit?`<span class="tag t-bu">${esc(r.bizUnit)}</span>`:''}
      ${r.orderType?`<span class="tag t-ot">${esc(shortOT)}</span>`:''}
      ${r.deliveryMethod?`<span class="tag ${viacls(r.deliveryMethod)}">${r.deliveryMethod==='WhatsApp'?'📱 WhatsApp':'📧 E-mail'}</span>`:''}
    </div>
    ${r.desiredDate?`<div class="cdates"><div class="cdate">📅 ${fdate(r.desiredDate)}</div></div>`:''}
    ${r.nome?`<div class="cname">👤 ${esc(r.nome)}${r.setor?` · ${esc(r.setor)}`:''}</div>`:''}
    ${r.attachmentName?`<div class="cclip">📎 ${esc(r.attachmentName)}</div>`:''}
    ${(r.responsible&&r.responsible.length)?`<div class="avatars">${r.responsible.map(n=>{const m=getTeam().find(t=>t.name===n);return m?`<div class="avatar" style="background:${m.color}" title="${esc(n)}">${m.initials}</div>`:''}).join('')}</div>`:''}
  </div>`;
}

function list2(){
  const reqs=filtered2();const s=S.sort2;
  const sorted=[...reqs].sort((a,b)=>{
    let av=a[s.field]||'',bv=b[s.field]||'';
    if(s.field==='createdAt'){av=Number(av);bv=Number(bv);}
    if(av<bv)return s.dir==='asc'?-1:1;if(av>bv)return s.dir==='asc'?1:-1;return 0;
  });
  const arr=f=>s.field===f?`<span class="sa">${s.dir==='asc'?'▲':'▼'}</span>`:'';
  return`<div class="listwrap"><table class="ltbl">
    <thead><tr>
      <th data-sort2="requestTitle">Título${arr('requestTitle')}</th>
      <th data-sort2="status">Status${arr('status')}</th>
      <th data-sort2="bizUnit">Unidade${arr('bizUnit')}</th>
      <th data-sort2="orderType">Tipo de Pedido${arr('orderType')}</th>
      <th data-sort2="nome">Solicitante${arr('nome')}</th>
      <th data-sort2="desiredDate">Data Desejada${arr('desiredDate')}</th>
      <th data-sort2="deliveryMethod">Via${arr('deliveryMethod')}</th>
      <th>Responsáveis</th>
      <th data-sort2="createdAt">Criado em${arr('createdAt')}</th>
    </tr></thead>
    <tbody>${sorted.length===0?`<tr><td colspan="8" style="text-align:center;padding:40px;color:var(--t3);">Nenhuma solicitação encontrada</td></tr>`:sorted.map(r=>{
      const st=gst2(r.status);
      return`<tr data-rid="${r.id}" data-cpipe="2">
        <td style="font-weight:600;max-width:200px;"><div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${esc(r.requestTitle)||'—'}</div></td>
        <td><span class="sbadge" style="background:${st.color}22;color:${st.color};white-space:nowrap">${esc(st.label)}</span></td>
        <td>${r.bizUnit?`<span class="tag t-bu" style="white-space:nowrap">${esc(r.bizUnit)}</span>`:'—'}</td>
        <td style="max-width:160px;"><div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--t2)">${esc(r.orderType)||'—'}</div></td>
        <td style="color:var(--t1)">${esc(r.nome)||'—'}</td>
        <td style="color:var(--t2)">${fdate(r.desiredDate)}</td>
        <td>${r.deliveryMethod?`<span class="tag ${viacls(r.deliveryMethod)}">${esc(r.deliveryMethod)}</span>`:'—'}</td>
        <td><div style="display:flex;gap:3px;">${(r.responsible&&r.responsible.length)?r.responsible.map(n=>{const m=getTeam().find(t=>t.name===n);return m?`<div class="avatar" style="background:${m.color};width:22px;height:22px;font-size:9px;" title="${esc(n)}">${m.initials}</div>`:''}).join(''):'<span style="color:var(--t3)">—</span>'}</div></td>
        <td style="color:var(--t3)">${r.createdAt?new Date(r.createdAt).toLocaleDateString('pt-BR'):'—'}</td>
      </tr>`;
    }).join('')}</tbody>
  </table></div>`;
}

function modal2(){
  if(!S.modal2.open)return`<div class="overlay hide" id="ov2"></div>`;
  const isNew=!S.modal2.id;
  const r=S.modal2.id?S.requests.find(x=>x.id===S.modal2.id):null;
  const v=r||{id:'',status:S.modal2.defStatus,nome:'',telefone:'',email:'',setor:'',requestTitle:'',orderType:'',bizUnit:'',desiredDate:'',deliveryMethod:'',details:'',attachmentName:'',responsible:[]};

  // VIEW mode (read-only) — exibe detalhes do card existente
  if(!isNew&&S.modal2.tab!=='form'&&S.modal2.tab!=='edit'){
    const st=gst2(v.status);
    return`<div class="overlay" id="ov2">
      <div class="modal">
        <div class="mhead">
          <div style="display:flex;flex-direction:column;gap:3px;">
            <div class="mhead-t">${esc(v.requestTitle)||'Solicitação'}</div>
            <span class="sbadge" style="background:${st.color}22;color:${st.color};width:fit-content">${esc(st.label)}</span>
          </div>
          <button class="mclose" data-action="cls2">×</button>
        </div>
        <div class="mtabs" style="display:flex;align-items:center;">
          <button class="mtab on" data-mt2="view">📄 Detalhes</button>
          <div style="margin-left:auto;padding-right:18px;">
            <select style="background:var(--s2);border:1px solid var(--b);border-radius:7px;color:var(--t1);padding:5px 10px;font-size:11px;outline:none;font-family:inherit;" data-action="change-status2" data-id="${v.id}">
              ${ST2.map(s=>`<option value="${s.id}"${v.status===s.id?' selected':''}>${esc(s.label)}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="mbody" style="max-height:65vh;overflow-y:auto;">
          <div class="detail-section">
            <div class="r2">
              <div class="detail-row"><div class="detail-label">Solicitante</div><div class="detail-val">${esc(v.nome)||'—'}</div></div>
              <div class="detail-row"><div class="detail-label">Setor</div><div class="detail-val">${esc(v.setor)||'—'}</div></div>
            </div>
            <div class="r2">
              <div class="detail-row"><div class="detail-label">Telefone</div><div class="detail-val">${esc(v.telefone)||'—'}</div></div>
              <div class="detail-row"><div class="detail-label">E-mail</div><div class="detail-val">${esc(v.email)||'—'}</div></div>
            </div>
            <div class="r2">
              <div class="detail-row"><div class="detail-label">Unidade de negócio</div><div class="detail-val">${esc(v.bizUnit)||'—'}</div></div>
              <div class="detail-row"><div class="detail-label">Tipo de pedido</div><div class="detail-val">${esc(v.orderType)||'—'}</div></div>
            </div>
            <div class="r2">
              <div class="detail-row"><div class="detail-label">Entrega via</div><div class="detail-val">${esc(v.deliveryMethod)||'—'}</div></div>
              <div class="detail-row"><div class="detail-label">Data desejada</div><div class="detail-val">${fdatefull(v.desiredDate)}</div></div>
            </div>
            <div class="detail-row"><div class="detail-label">Detalhes da solicitação</div><div class="detail-val" style="white-space:pre-wrap">${esc(v.details)||'—'}</div></div>
            ${v.attachmentName?`<div class="detail-row"><div class="detail-label">Anexo</div><div class="detail-val">📎 ${esc(v.attachmentName)}</div></div>`:''}
            <div class="detail-row">
              <div class="detail-label">Responsáveis</div>
              <div style="display:flex;flex-wrap:wrap;gap:6px;padding:8px 0;align-items:center;">
                ${(v.responsible&&v.responsible.length)?v.responsible.map(n=>{const t=getTeam().find(x=>x.name===n);return t?`<div style="display:flex;align-items:center;gap:6px;padding:5px 10px;background:var(--s2);border-radius:6px;border:1px solid var(--b);">
                  <div style="width:20px;height:20px;border-radius:50%;background:${t.color};display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:800;color:#fff;">${t.initials}</div>
                  <span style="font-size:12px;color:var(--t1);">${esc(n)}</span>
                  <button data-action="toggle-resp2" data-rid="${v.id}" data-name="${esc(n)}" data-remove="1" style="background:none;border:none;color:var(--t3);cursor:pointer;font-size:12px;padding:0 2px;line-height:1;" title="Remover">×</button>
                </div>`:esc(n);}).join(''):`<span style="font-size:12px;color:var(--t3);">Nenhum responsável</span>`}
                <!-- Add button with dropdown -->
                <div style="position:relative;display:inline-block;">
                  <button id="add-resp-btn-${v.id}" onclick="document.getElementById('add-resp-dd-${v.id}').style.display=document.getElementById('add-resp-dd-${v.id}').style.display==='block'?'none':'block'" style="width:28px;height:28px;border-radius:50%;border:1.5px dashed var(--b);background:none;color:var(--t3);cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;">+</button>
                  <div id="add-resp-dd-${v.id}" style="display:none;position:absolute;top:34px;left:0;background:var(--s1);border:1px solid var(--b);border-radius:8px;box-shadow:0 4px 16px rgba(0,0,0,.12);z-index:200;min-width:200px;padding:6px;">
                    <input type="text" placeholder="Buscar responsável..." oninput="this.closest('[id^=add-resp-dd]').querySelectorAll('.resp-opt').forEach(el=>el.style.display=el.dataset.n.toLowerCase().includes(this.value.toLowerCase())?'flex':'none')" style="width:100%;background:var(--s2);border:1px solid var(--b);border-radius:6px;color:var(--t1);padding:6px 9px;font-size:11px;outline:none;font-family:inherit;margin-bottom:4px;box-sizing:border-box;">
                    ${getTeam().filter(t=>!(v.responsible&&v.responsible.includes(t.name))).map(t=>`<label class="resp-opt" data-n="${esc(t.name)}" onclick="document.getElementById('add-resp-dd-${v.id}').style.display='none'" style="display:flex;align-items:center;gap:8px;padding:7px 10px;border-radius:6px;cursor:pointer;user-select:none;" onmouseover="this.style.background='var(--s2)'" onmouseout="this.style.background='none'">
                      <input type="checkbox" data-action="toggle-resp2" data-rid="${v.id}" data-name="${esc(t.name)}" style="accent-color:var(--ac);cursor:pointer;">
                      <div style="width:20px;height:20px;border-radius:50%;background:${t.color};display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:800;color:#fff;">${t.initials}</div>
                      <span style="font-size:12px;color:var(--t1);">${esc(t.name)}</span>
                    </label>`).join('')||`<div style="font-size:11px;color:var(--t3);padding:8px 10px;">Todos adicionados</div>`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mfoot">
          <button class="btn btn-d" data-action="del2" data-id="${v.id}">Deletar</button>
          <button class="btn btn-p" data-mt2="edit" style="margin-left:auto;">Editar</button>
        </div>
      </div>
    </div>`;
  }

  // CREATE / EDIT mode — formulário único, sem abas, com scroll
  return`<div class="overlay" id="ov2">
    <div class="modal">
      <div class="mhead">
        <div class="mhead-t">${isNew?'Nova Solicitação':'Editar Solicitação'}</div>
        <button class="mclose" data-action="cls2">×</button>
      </div>
      <div class="mbody" style="max-height:68vh;overflow-y:auto;padding-bottom:4px;">
        <form id="cf2">

          <!-- ── Seção: Solicitante ── -->
          <div style="font-size:10px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;color:var(--ac);margin-bottom:10px;">Solicitante</div>
          <div class="r2">
            <div class="fg"><label>Nome <span class="req">*</span></label>
              <input type="text" name="nome" value="${esc(v.nome)}" placeholder="Nome completo" required>
            </div>
            <div class="fg"><label>Telefone <span class="req">*</span></label>
              <input type="tel" name="telefone" value="${esc(v.telefone)}" placeholder="(00) 00000-0000" required>
            </div>
          </div>
          <div class="r2">
            <div class="fg"><label>E-mail <span class="req">*</span></label>
              <input type="email" name="email" value="${esc(v.email)}" placeholder="email@empresa.com" required>
            </div>
            <div class="fg"><label>Setor Solicitante <span class="req">*</span></label>
              <select name="setor" required>
                <option value="">Selecionar...</option>
                ${SECTORS.map(s=>`<option value="${esc(s)}"${v.setor===s?' selected':''}>${esc(s)}</option>`).join('')}
              </select>
            </div>
          </div>

          <!-- divisor -->
          <div style="border-top:1px solid var(--b);margin:12px 0;"></div>

          <!-- ── Seção: Pedido ── -->
          <div style="font-size:10px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;color:var(--ac);margin-bottom:10px;">Pedido</div>
          <div class="fg"><label>Título da Solicitação <span class="req">*</span></label>
            <input type="text" name="requestTitle" value="${esc(v.requestTitle)}" placeholder="Descreva brevemente o que precisa" required>
          </div>
          <div class="r2">
            <div class="fg"><label>Unidade de Negócio <span class="req">*</span></label>
              <select name="bizUnit" required>
                <option value="">Selecionar...</option>
                ${BIZ_UNITS.map(u=>`<option value="${esc(u)}"${v.bizUnit===u?' selected':''}>${esc(u)}</option>`).join('')}
              </select>
            </div>
            <div class="fg"><label>Tipo de Pedido <span class="req">*</span></label>
              <select name="orderType" required>
                <option value="">Selecionar...</option>
                ${ORDER_TYPES.map(t=>`<option value="${esc(t)}"${v.orderType===t?' selected':''}>${esc(t)}</option>`).join('')}
              </select>
            </div>
          </div>
          <div class="r2">
            <div class="fg"><label>Data desejada de recebimento <span class="req">*</span></label>
              <input type="date" name="desiredDate" value="${esc(v.desiredDate)}" required>
            </div>
            <div class="fg"><label>Entrega via <span class="req">*</span></label>
              <select name="deliveryMethod" required>
                <option value="">Selecionar...</option>
                ${DELIVERY.map(d=>`<option value="${esc(d)}"${v.deliveryMethod===d?' selected':''}>${esc(d)}</option>`).join('')}
              </select>
            </div>
          </div>
          ${!isNew?`<div class="fg"><label>Status</label>
            <select name="status">${ST2.map(s=>`<option value="${s.id}"${v.status===s.id?' selected':''}>${esc(s.label)}</option>`).join('')}</select>
          </div>`:''}

          <!-- divisor -->
          <div style="border-top:1px solid var(--b);margin:12px 0;"></div>

          <!-- ── Seção: Detalhes ── -->
          <div style="font-size:10px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;color:var(--ac);margin-bottom:10px;">Detalhes</div>
          <div class="fg"><label>Contexto e detalhes da solicitação <span class="req">*</span></label>
            <textarea name="details" style="min-height:120px;" placeholder="Descreva com o máximo de detalhes o que você precisa — formato, tamanho, objetivo, referências, textos, informações que devem constar..." required>${esc(v.details)}</textarea>
          </div>
          <div class="fg"><label>Anexo <span style="color:var(--t3);font-size:10px;text-transform:none;letter-spacing:0">(opcional)</span></label>
            <input type="file" id="req-file" accept="image/*,.pdf,.ppt,.pptx,.doc,.docx,.xls,.xlsx,.ai,.psd,.fig">
            ${v.attachmentName?`<div style="font-size:11px;color:var(--t2);margin-top:4px;">📎 Arquivo atual: ${esc(v.attachmentName)}</div>`:''}
          </div>

        </form>
      </div>
      <div class="mfoot">
        ${!isNew?`<button class="btn btn-d" data-action="del2" data-id="${v.id}">Deletar</button>`:''}
        <button class="btn btn-o" data-action="cls2">Cancelar</button>
        <button class="btn btn-p" data-action="save2" data-id="${v.id}">${isNew?'Criar Solicitação':'Salvar'}</button>
      </div>
    </div>
  </div>`;
}

// ═══════════════════════════════════════
// DASHBOARD
// ═══════════════════════════════════════
function kpi(title,num,sub,color){
  return`<div class="dash-card">
    <div class="dash-card-title">${esc(title)}</div>
    <div class="kpi-num" style="color:${color}">${num}</div>
    <div class="kpi-sub">${esc(sub)}</div>
  </div>`;
}

function barRows(items,max,color){
  if(!items.length)return`<div class="dash-empty">Sem dados</div>`;
  return items.map(x=>`<div class="bar-row">
    <div class="bar-label" title="${esc(x.label)}">${esc(x.label)}</div>
    <div class="bar-track"><div class="bar-fill" style="width:${max>0?Math.round(x.count/max*100):0}%;background:${color}"></div></div>
    <div class="bar-val">${x.count}</div>
  </div>`).join('');
}

function dashboard(){
  const c1=S.cards;
  const c2=S.requests;
  const AF=['ideas','social-todo','av-todo','cri-todo'];

  const af1=c1.filter(c=>AF.includes(c.status)).length;
  const prog1=c1.filter(c=>c.status==='progress').length;
  const rev1=c1.filter(c=>['review','final-social'].includes(c.status)).length;
  const done1=c1.filter(c=>c.status==='done').length;

  const prog2=c2.filter(r=>r.status==='progress').length;
  const done2=c2.filter(r=>r.status==='done').length;
  const wait2=c2.filter(r=>r.status==='waiting').length;
  const triage2=c2.filter(r=>r.status==='triage').length;

  const byResp=getTeam().map(m=>{
    const mc=c1.filter(c=>c.responsible&&c.responsible.includes(m.name));
    return{...m,af:mc.filter(c=>AF.includes(c.status)).length,prog:mc.filter(c=>c.status==='progress').length,rev:mc.filter(c=>['review','final-social'].includes(c.status)).length,done:mc.filter(c=>c.status==='done').length,total:mc.length};
  });

  const byProj=PROJ.map(p=>({label:p.replace('KAMI CO. ','').replace('Toctus_KAMI CO.','Toctus'),count:c1.filter(c=>c.project===p).length})).filter(x=>x.count>0).sort((a,b)=>b.count-a.count);
  const byCt=CTYPES.map(t=>({label:t,count:c1.filter(c=>c.contentType===t).length})).filter(x=>x.count>0).sort((a,b)=>b.count-a.count);
  const bySt2=ST2.map(s=>({label:s.label,color:s.color,count:c2.filter(r=>r.status===s.id).length})).filter(x=>x.count>0).sort((a,b)=>b.count-a.count);
  const byUnit=BIZ_UNITS.map(u=>({label:u,count:c2.filter(r=>r.bizUnit===u).length})).filter(x=>x.count>0).sort((a,b)=>b.count-a.count);
  const byOT=ORDER_TYPES.map(t=>({label:t.replace('Lâminas comerciais — campanhas ou promoções','Lâminas comerciais'),count:c2.filter(r=>r.orderType===t).length})).filter(x=>x.count>0).sort((a,b)=>b.count-a.count);
  const bySetor=SECTORS.map(s=>({label:s,count:c2.filter(r=>r.setor===s).length})).filter(x=>x.count>0).sort((a,b)=>b.count-a.count);

  function kpiCard(icon, bg, num, label, sub){
    return`<div class="dash-kpi-card">
      <div class="dash-kpi-icon" style="background:${bg};">${icon}</div>
      <div>
        <div class="dash-kpi-num">${num}</div>
        <div class="dash-kpi-label">${label}</div>
        ${sub?`<div class="dash-kpi-sub">${sub}</div>`:''}
      </div>
    </div>`;
  }

  return`<div class="dash-wrap">

    <!-- RESUMO GERAL -->
    <div class="dash-col-header" style="margin-bottom:14px;">Resumo Geral</div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:24px;">
      ${kpiCard('📋','#fee2e2',c1.length,'Conteúdo Redes Sociais','cards cadastrados')}
      ${kpiCard('📨','#ede9fe',c2.length,'Solicitações Externas','solicitações recebidas')}
      ${kpiCard('⚡','#fef3c7',prog1+prog2,'Em Andamento','conteúdo + solicitações')}
      ${kpiCard('✅','#dcfce7',done1+done2,'Concluídos','conteúdo + solicitações')}
    </div>

    <!-- DUAS COLUNAS -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">

      <!-- ESQUERDA: Conteúdo Redes Sociais -->
      <div style="display:flex;flex-direction:column;gap:14px;background:var(--s1);border:1px solid var(--b);border-radius:14px;padding:18px;border-top:3px solid var(--ac);">
        <div class="dash-col-header">Conteúdo Redes Sociais</div>

        <!-- KPIs conteúdo -->
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;">
          ${kpiCard('📌','#e0e7ff',af1,'A Fazer','backlog')}
          ${kpiCard('🔄','#fef3c7',prog1,'Em Andamento','em produção')}
          ${kpiCard('👁','#cffafe',rev1,'Em Revisão','aguardando aprovação')}
          ${kpiCard('🎉','#dcfce7',done1,'Concluídos','entregues')}
        </div>

        <!-- Gráfico de rosca: status -->
        <div class="dash-chart-card">
          <div class="dash-chart-title">Distribuição por Status</div>
          <div style="display:flex;align-items:center;gap:20px;">
            <div style="width:140px;height:140px;flex-shrink:0;"><canvas id="chart-content-status"></canvas></div>
            <div style="flex:1;">
              ${[{label:'A Fazer',val:af1,color:'#6366f1'},{label:'Em Andamento',val:prog1,color:'#f59e0b'},{label:'Em Revisão',val:rev1,color:'#06b6d4'},{label:'Concluído',val:done1,color:'#22c55e'}].map(x=>`<div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
                <div style="width:10px;height:10px;border-radius:2px;background:${x.color};flex-shrink:0;"></div>
                <div style="font-size:11px;color:var(--t2);flex:1;">${x.label}</div>
                <div style="font-size:12px;font-weight:700;color:var(--t1);">${x.val}</div>
              </div>`).join('')}
            </div>
          </div>
        </div>

        <!-- Gráfico de barras: por projeto -->
        <div class="dash-chart-card">
          <div class="dash-chart-title">Cards por Projeto</div>
          <canvas id="chart-content-proj" style="max-height:180px;"></canvas>
        </div>

        <!-- Por Responsável -->
        <div class="dash-chart-card">
          <div class="dash-chart-title">Por Responsável</div>
          <table class="resp-tbl">
            <thead><tr><th>Responsável</th><th>A Fazer</th><th>Andamento</th><th>Revisão</th><th>Concluído</th><th>Total</th></tr></thead>
            <tbody>
              ${byResp.filter(m=>m.total>0).map(m=>`<tr>
                <td><div style="display:flex;align-items:center;gap:6px;"><div class="avatar" style="background:${m.color};width:20px;height:20px;font-size:8px;border:none">${m.initials}</div><span style="font-size:11px;">${esc(m.name)}</span></div></td>
                <td><span class="cell-badge cell-af">${m.af||'—'}</span></td>
                <td><span class="cell-badge cell-prog">${m.prog||'—'}</span></td>
                <td><span class="cell-badge cell-rev">${m.rev||'—'}</span></td>
                <td><span class="cell-badge cell-done">${m.done||'—'}</span></td>
                <td><span class="cell-badge cell-tot">${m.total}</span></td>
              </tr>`).join('')}
              ${byResp.every(m=>m.total===0)?`<tr><td colspan="6" style="text-align:center;color:var(--t3);font-size:11px;padding:12px;">Nenhum dado ainda</td></tr>`:''}
            </tbody>
          </table>
        </div>
      </div>

      <!-- DIREITA: Solicitações Externas -->
      <div style="display:flex;flex-direction:column;gap:14px;background:var(--s1);border:1px solid var(--b);border-radius:14px;padding:18px;border-top:3px solid #8b5cf6;">
        <div class="dash-col-header">Solicitações Externas</div>

        <!-- KPIs solicitações -->
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;">
          ${kpiCard('🆕','#e0e7ff',triage2,'Triagem','aguardando análise')}
          ${kpiCard('🔄','#fef3c7',prog2,'Em Andamento','em produção')}
          ${kpiCard('⏳','#fee2e2',wait2,'Aguardando Info','pendentes')}
          ${kpiCard('🎉','#dcfce7',done2,'Concluídas','entregues')}
        </div>

        <!-- Gráfico de barras: por unidade -->
        <div class="dash-chart-card">
          <div class="dash-chart-title">Por Unidade de Negócio</div>
          <canvas id="chart-req-unit" style="max-height:180px;"></canvas>
        </div>

        <!-- Gráfico de rosca: por tipo de pedido -->
        <div class="dash-chart-card">
          <div class="dash-chart-title">Por Tipo de Pedido</div>
          <canvas id="chart-req-type" style="max-height:200px;"></canvas>
        </div>

        <!-- Por setor -->
        <div class="dash-chart-card">
          <div class="dash-chart-title">Por Setor Solicitante</div>
          <canvas id="chart-req-setor" style="max-height:180px;"></canvas>
        </div>

      </div>
    </div>
  </div>`;
}

function initDashCharts(){
  if(S.pipe!=='dash')return;
  const c1=S.cards;
  const c2=S.requests;
  const AF=['ideas','social-todo','av-todo','cri-todo'];
  const af1=c1.filter(c=>AF.includes(c.status)).length;
  const prog1=c1.filter(c=>c.status==='progress').length;
  const rev1=c1.filter(c=>['review','final-social'].includes(c.status)).length;
  const done1=c1.filter(c=>c.status==='done').length;

  const byProj=PROJ.map(p=>({label:p.replace('KAMI CO. ','').replace('Toctus_KAMI CO.','Toctus'),count:c1.filter(c=>c.project===p).length})).filter(x=>x.count>0).sort((a,b)=>b.count-a.count);
  const byUnit=BIZ_UNITS.map(u=>({label:u,count:c2.filter(r=>r.bizUnit===u).length})).filter(x=>x.count>0).sort((a,b)=>b.count-a.count);
  const byOT=ORDER_TYPES.map(t=>({label:t.replace('Lâminas comerciais — campanhas ou promoções','Lâminas'),count:c2.filter(r=>r.orderType===t).length})).filter(x=>x.count>0).sort((a,b)=>b.count-a.count);
  const bySetor=SECTORS.map(s=>({label:s,count:c2.filter(r=>r.setor===s).length})).filter(x=>x.count>0).sort((a,b)=>b.count-a.count);

  const chartDefaults={responsive:true,maintainAspectRatio:true,plugins:{legend:{display:false}},scales:{x:{grid:{display:false},ticks:{font:{size:10}}},y:{grid:{color:'rgba(0,0,0,.04)'},ticks:{font:{size:10},stepSize:1}}}};

  // Donut: status conteúdo
  const ctxStatus=document.getElementById('chart-content-status');
  if(ctxStatus&&typeof Chart!=='undefined'){
    new Chart(ctxStatus,{type:'doughnut',data:{labels:['A Fazer','Em Andamento','Em Revisão','Concluído'],datasets:[{data:[af1,prog1,rev1,done1],backgroundColor:['#6366f1','#f59e0b','#06b6d4','#22c55e'],borderWidth:0,hoverOffset:4}]},options:{responsive:true,maintainAspectRatio:true,cutout:'70%',plugins:{legend:{display:false}}}});
  }

  // Bar: por projeto
  const ctxProj=document.getElementById('chart-content-proj');
  if(ctxProj&&typeof Chart!=='undefined'&&byProj.length){
    new Chart(ctxProj,{type:'bar',data:{labels:byProj.map(x=>x.label),datasets:[{data:byProj.map(x=>x.count),backgroundColor:'#c8192b',borderRadius:6,borderSkipped:false}]},options:{...chartDefaults,indexAxis:'y',scales:{x:{...chartDefaults.scales.x,ticks:{font:{size:10},stepSize:1}},y:{grid:{display:false},ticks:{font:{size:10}}}}}});
  }

  // Bar: por unidade
  const ctxUnit=document.getElementById('chart-req-unit');
  if(ctxUnit&&typeof Chart!=='undefined'&&byUnit.length){
    new Chart(ctxUnit,{type:'bar',data:{labels:byUnit.map(x=>x.label),datasets:[{data:byUnit.map(x=>x.count),backgroundColor:'#8b5cf6',borderRadius:6,borderSkipped:false}]},options:{...chartDefaults,indexAxis:'y',scales:{x:{...chartDefaults.scales.x,ticks:{font:{size:10},stepSize:1}},y:{grid:{display:false},ticks:{font:{size:10}}}}}});
  }

  // Bar: tipo de pedido
  const ctxType=document.getElementById('chart-req-type');
  if(ctxType&&typeof Chart!=='undefined'&&byOT.length){
    new Chart(ctxType,{type:'bar',data:{labels:byOT.map(x=>x.label),datasets:[{data:byOT.map(x=>x.count),backgroundColor:'#06b6d4',borderRadius:6,borderSkipped:false}]},options:{...chartDefaults,indexAxis:'y',scales:{x:{...chartDefaults.scales.x,ticks:{font:{size:10},stepSize:1}},y:{grid:{display:false},ticks:{font:{size:10}}}}}});
  }

  // Bar: por setor
  const ctxSetor=document.getElementById('chart-req-setor');
  if(ctxSetor&&typeof Chart!=='undefined'&&bySetor.length){
    new Chart(ctxSetor,{type:'bar',data:{labels:bySetor.map(x=>x.label),datasets:[{data:bySetor.map(x=>x.count),backgroundColor:'#f59e0b',borderRadius:6,borderSkipped:false}]},options:{...chartDefaults,indexAxis:'y',scales:{x:{...chartDefaults.scales.x,ticks:{font:{size:10},stepSize:1}},y:{grid:{display:false},ticks:{font:{size:10}}}}}});
  }
}

// ═══════════════════════════════════════
// PIPELINE 3 — SOCIAL MEDIA
// ═══════════════════════════════════════

function socConnectModal(){
  const m=S.modal_soc;
  if(!m.open||!m.platform)return'';
  const p=gplat(m.platform);
  return`<div class="overlay" style="z-index:1100;">
    <div class="modal" style="max-width:420px;">
      <div class="mhead">
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="width:32px;height:32px;border-radius:50%;background:${p.grad};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:#fff;">${p.short}</div>
          <div class="mhead-t">Conectar ${esc(p.name)}</div>
        </div>
        <button class="mclose" data-action="soc-close-modal">×</button>
      </div>
      <div class="mbody" style="display:flex;flex-direction:column;gap:12px;">
        <div class="fg"><label>Nome da conta <span class="req">*</span></label><input type="text" id="soc-acc-name" placeholder="Ex: KAMI CO. BR" required></div>
        <div class="fg"><label>Handle / @usuário</label><input type="text" id="soc-acc-handle" placeholder="Ex: kamico.br (sem @)"></div>
        <div class="fg"><label>Seguidores (opcional)</label><input type="number" id="soc-acc-followers" placeholder="0" min="0"></div>
        <div class="fg"><label>Engajamento % (opcional)</label><input type="number" id="soc-acc-engagement" placeholder="0.0" step="0.1" min="0"></div>
      </div>
      <div class="mfoot">
        <button class="btn modal btn-o" data-action="soc-close-modal">Cancelar</button>
        <button class="btn btn-p" data-action="soc-save-acc" data-plat="${p.id}">Conectar</button>
      </div>
    </div>
  </div>`;
}

// ── SOCIAL PROFILES PANEL ───────────────
function renderSocialProfilesPanel(){
  if(!S.social_show_profiles)return'';
  const accounts=S.social_accounts||[];
  const q=(S.social_profile_search||'').toLowerCase();
  const filtered=accounts.filter(a=>!q||a.accountName.toLowerCase().includes(q)||a.platform.includes(q));
  return`<div class="overlay" id="soc-profiles-overlay" style="z-index:1050;align-items:stretch;justify-content:flex-end;padding:0;">
    <div style="background:var(--s1);width:420px;height:100%;display:flex;flex-direction:column;box-shadow:-8px 0 32px rgba(0,0,0,.15);">
      <!-- Header -->
      <div style="padding:18px 20px 14px;border-bottom:1px solid var(--b);flex-shrink:0;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
          <div style="font-size:15px;font-weight:800;color:var(--t1);">Gerenciar Perfis</div>
          <button data-action="soc-close-profiles" style="background:var(--s2);border:none;border-radius:6px;color:var(--t3);cursor:pointer;font-size:14px;padding:4px 9px;">×</button>
        </div>
        <!-- Search -->
        <div style="position:relative;">
          <span style="position:absolute;left:10px;top:50%;transform:translateY(-50%);color:var(--t3);font-size:13px;">🔍</span>
          <input id="soc-profile-search" type="text" placeholder="Buscar perfil..." value="${esc(S.social_profile_search||'')}" style="width:100%;background:var(--s2);border:1px solid var(--b);border-radius:8px;color:var(--t1);padding:8px 10px 8px 32px;font-size:12px;outline:none;font-family:inherit;box-sizing:border-box;">
        </div>
      </div>
      <!-- Stats bar -->
      <div style="padding:8px 20px;border-bottom:1px solid var(--b);flex-shrink:0;display:flex;align-items:center;gap:6px;">
        <span style="font-size:11px;font-weight:700;color:var(--ac);">Todos ${accounts.length}</span>
        <span style="width:1px;height:12px;background:var(--b);display:inline-block;"></span>
        <span style="font-size:11px;color:var(--t3);">Conectados ${accounts.length}</span>
      </div>
      <!-- Accounts list -->
      <div style="flex:1;overflow-y:auto;padding:8px 0;">
        ${filtered.length===0?`<div style="text-align:center;padding:40px 20px;color:var(--t3);"><div style="font-size:24px;margin-bottom:8px;">👤</div><div style="font-size:12px;">${accounts.length===0?'Nenhuma conta conectada ainda.':'Nenhuma conta encontrada.'}</div></div>`
        :filtered.map(acc=>{const p=gplat(acc.platform);const isSelected=S.social_selected_acc===acc.id;return`<div data-action="soc-sel-acc" data-acc="${acc.id}" style="display:flex;align-items:center;gap:12px;padding:12px 20px;cursor:pointer;background:${isSelected?'var(--s2)':'transparent'};border-left:3px solid ${isSelected?'var(--ac)':'transparent'};transition:.1s;">
          <div style="width:42px;height:42px;border-radius:50%;background:${p.grad};display:flex;align-items:center;justify-content:center;flex-shrink:0;">${platLogo(acc.platform,22)}</div>
          <div style="flex:1;min-width:0;">
            <div style="font-size:13px;font-weight:700;color:var(--t1);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${esc(acc.accountName)}</div>
            <div style="font-size:11px;color:var(--t3);">${esc(p.name)}${acc.handle?' · @'+esc(acc.handle):''}</div>
            ${acc.followers?`<div style="font-size:10px;color:var(--t3);margin-top:1px;">${Number(acc.followers).toLocaleString('pt-BR')} seguidores</div>`:''}
          </div>
          <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px;flex-shrink:0;">
            <span style="background:#dcfce7;color:#166534;border-radius:20px;padding:2px 8px;font-size:9px;font-weight:700;">ATIVO</span>
            <button data-action="soc-disconnect" data-aid="${acc.id}" onclick="event.stopPropagation()" style="background:none;border:1px solid var(--b);border-radius:5px;color:var(--t3);cursor:pointer;font-size:10px;padding:2px 7px;font-family:inherit;">✕</button>
          </div>
        </div>`;}).join('')}
      </div>
      <!-- Footer: add account -->
      <div style="padding:14px 20px;border-top:1px solid var(--b);flex-shrink:0;">
        <div style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.4px;margin-bottom:10px;">Adicionar conta</div>
        <div style="display:flex;flex-wrap:wrap;gap:6px;">
          ${SOCIAL_PLAT.map(plat=>`<button data-action="soc-connect" data-plat="${plat.id}" style="display:flex;align-items:center;gap:5px;padding:5px 10px;border-radius:6px;border:1px solid var(--b);background:var(--s2);cursor:pointer;font-size:10px;font-weight:600;color:var(--t2);font-family:inherit;transition:.1s;" onmouseover="this.style.borderColor='${plat.color}';this.style.color='${plat.color}'" onmouseout="this.style.borderColor='var(--b)';this.style.color='var(--t2)'">${platLogo(plat.id,14)} ${esc(plat.name)}</button>`).join('')}
        </div>
      </div>
    </div>
  </div>`;
}

// logo da plataforma via favicon
function platLogo(id,size=28){
  const domains={instagram:'instagram.com',facebook:'facebook.com',tiktok:'tiktok.com',linkedin:'linkedin.com',linkedin_p:'linkedin.com',youtube:'youtube.com',threads:'threads.net',pinterest:'pinterest.com',twitter:'x.com',google_biz:'business.google.com',meta_ads:'facebook.com',google_ads:'ads.google.com'};
  const d=domains[id];
  return d?`<img src="https://www.google.com/s2/favicons?domain=${d}&sz=64" style="width:${size}px;height:${size}px;object-fit:contain;" onerror="this.style.display='none'">`:`<span style="font-size:${size*.6}px;font-weight:800;">${(id||'').toUpperCase().slice(0,2)}</span>`;
}

function socDashboard(){
  const connected=S.social_accounts;
  const selAcc=S.social_selected_acc;

  // Profile selector bar
  const profileBar=connected.length?`<div style="display:flex;align-items:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
    <span style="font-size:11px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.4px;">Perfil:</span>
    <button data-action="soc-sel-acc" data-acc="" style="padding:5px 14px;border-radius:20px;border:1.5px solid ${!selAcc?'var(--ac)':'var(--b)'};background:${!selAcc?'var(--ac)':'var(--s1)'};color:${!selAcc?'#fff':'var(--t2)'};font-size:11px;font-weight:700;cursor:pointer;font-family:inherit;transition:.1s;">Todos</button>
    ${connected.map(acc=>{const p=gplat(acc.platform);return`<button data-action="soc-sel-acc" data-acc="${acc.id}" style="display:flex;align-items:center;gap:6px;padding:5px 12px;border-radius:20px;border:1.5px solid ${selAcc===acc.id?p.color:'var(--b)'};background:${selAcc===acc.id?p.color+'18':'var(--s1)'};color:${selAcc===acc.id?p.color:'var(--t2)'};font-size:11px;font-weight:700;cursor:pointer;font-family:inherit;transition:.1s;">${platLogo(acc.platform,14)} ${esc(acc.accountName)}</button>`;}).join('')}
  </div>`:'';

  // Filter platforms by selected account
  const filteredPlats=selAcc
    ? SOCIAL_PLAT.filter(p=>connected.find(a=>a.id===selAcc&&a.platform===p.id)||!connected.find(a=>a.platform===p.id))
    : SOCIAL_PLAT;

  return`<div style="flex:1;overflow-y:auto;padding:20px;">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:${connected.length?'8':'16'}px;">
      <div>
        <div style="font-size:15px;font-weight:700;color:var(--t1)">Contas conectadas</div>
        <div style="font-size:11px;color:var(--t3);margin-top:2px">${connected.length} de ${SOCIAL_PLAT.length} plataformas</div>
      </div>
    </div>
    ${profileBar}
    <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:14px;max-width:1100px;margin:0 auto;">
      ${filteredPlats.map(plat=>{
        const acc=connected.find(a=>a.platform===plat.id&&(!selAcc||a.id===selAcc));
        if(acc){
          return`<div style="background:${plat.grad};border-radius:12px;padding:14px;display:flex;flex-direction:column;justify-content:space-between;min-height:170px;position:relative;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
              <div style="background:rgba(255,255,255,.25);border-radius:8px;width:34px;height:34px;display:flex;align-items:center;justify-content:center;">${platLogo(plat.id,20)}</div>
              <button data-action="soc-disconnect" data-aid="${acc.id}" style="background:rgba(255,255,255,.15);border:none;border-radius:5px;color:#fff;cursor:pointer;font-size:9px;padding:3px 6px;font-weight:600;">✕</button>
            </div>
            <div>
              <div style="font-size:11px;font-weight:700;color:#fff;margin-bottom:1px;">${esc(acc.accountName)}</div>
              ${acc.handle?`<div style="font-size:9px;color:rgba(255,255,255,.7);">@${esc(acc.handle)}</div>`:''}
              ${acc.followers?`<div style="font-size:16px;font-weight:800;color:#fff;margin-top:4px;">${Number(acc.followers).toLocaleString('pt-BR')}<span style="font-size:8px;font-weight:400;margin-left:2px;opacity:.85">seg.</span></div>`:''}
              <div style="margin-top:5px;display:inline-block;background:rgba(255,255,255,.2);border-radius:4px;padding:2px 6px;font-size:8px;font-weight:700;color:#fff;">CONECTADO</div>
            </div>
          </div>`;
        }
        return`<div style="background:var(--s1);border:1px solid var(--b);border-radius:12px;padding:14px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;min-height:170px;">
          <div style="width:50px;height:50px;border-radius:12px;background:var(--s2);display:flex;align-items:center;justify-content:center;">${platLogo(plat.id,26)}</div>
          <div style="font-size:10px;color:var(--t2);font-weight:600;text-align:center;line-height:1.3;">${esc(plat.name)}</div>
          <button data-action="soc-connect" data-plat="${plat.id}" style="background:${plat.color};color:#fff;border:none;border-radius:7px;padding:5px 0;font-size:10px;font-weight:700;cursor:pointer;width:100%;">Conectar</button>
        </div>`;
      }).join('')}
    </div>
  </div>`;
}

function socSchedule(){
  const f=S.schedule_form;
  const connected=S.social_accounts;
  const previewChannels=(f.channels||[]);
  const col='border-right:1px solid var(--b);overflow-y:auto;padding:18px;display:flex;flex-direction:column;gap:14px;background:var(--s1);';
  const secLabel=(n,t,extra='')=>`<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;"><span style="font-size:12px;font-weight:700;color:var(--t1);"><span style="color:var(--ac);margin-right:5px;">${n}.</span>${t}</span>${extra}</div>`;
  return`<div style="flex:1;overflow:hidden;display:flex;justify-content:center;">
    <div style="display:flex;width:100%;max-width:1200px;">

    <!-- COLUNA 1: Perfis + Texto -->
    <div style="width:300px;flex-shrink:0;${col}">
      ${secLabel(1,'Selecione perfis')}
      ${connected.length===0
        ?`<div style="font-size:11px;color:var(--t3);padding:9px;background:var(--s2);border-radius:7px;border:1px solid var(--b);">Conecte uma conta no Dashboard primeiro.</div>`
        :`<div style="background:var(--s2);border:1px solid var(--b);border-radius:8px;padding:6px;display:flex;flex-direction:column;gap:4px;">
          ${connected.map(acc=>{const p=gplat(acc.platform);const sel=(f.profiles||[]).includes(acc.id);return`<label style="display:flex;align-items:center;gap:8px;cursor:pointer;padding:7px 10px;border-radius:6px;background:${sel?'var(--s1)':'transparent'};border:1px solid ${sel?'var(--ac)':'transparent'};transition:.1s;user-select:none;">
            <input type="checkbox" data-sf="profiles" value="${acc.id}" ${sel?'checked':''} style="accent-color:var(--ac);width:13px;height:13px;cursor:pointer;flex-shrink:0;">
            <div style="width:26px;height:26px;border-radius:50%;background:${p.grad};display:flex;align-items:center;justify-content:center;flex-shrink:0;">${platLogo(p.id,14)}</div>
            <span style="font-size:12px;font-weight:600;color:var(--t1);">${esc(acc.accountName)}</span>
          </label>`;}).join('')}
        </div>`}

      ${secLabel(3,'Texto do post')}
      <div style="background:var(--s2);border:1px solid var(--b);border-radius:8px;overflow:hidden;">
        <div style="padding:6px 10px;border-bottom:1px solid var(--b);display:flex;align-items:center;gap:8px;">
          <span style="font-size:11px;font-weight:700;color:var(--ac);border-bottom:2px solid var(--ac);padding-bottom:4px;">Todos</span>
        </div>
        <textarea id="soc-text" data-sf="text" placeholder="Digite o seu texto..." style="width:100%;min-height:130px;resize:vertical;background:transparent;border:none;color:var(--t1);padding:10px 12px;font-size:12px;font-family:inherit;outline:none;line-height:1.6;box-sizing:border-box;">${esc(f.text)}</textarea>
        <div style="border-top:1px solid var(--b);padding:6px 10px;background:var(--s1);">
          <input type="text" id="soc-hashtags" data-sf="hashtags" placeholder="Digite aqui as hashtags..." value="${esc(f.hashtags||'')}" style="width:100%;background:transparent;border:none;color:var(--t3);padding:0;font-size:11px;font-family:inherit;outline:none;">
        </div>
        <div style="border-top:1px solid var(--b);padding:5px 10px;display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:10px;color:var(--t3);">${(f.text||'').length} hashtags</span>
          <span style="font-size:10px;color:var(--t3);">2000</span>
        </div>
      </div>
    </div>

    <!-- COLUNA 2: Canais + Mídia + Data -->
    <div style="flex:1;max-width:560px;${col}">
      ${secLabel(2,'Selecione canais')}
      <div style="display:flex;flex-wrap:wrap;gap:8px;">
        ${SOCIAL_PLAT.filter(p=>['instagram','facebook','tiktok','linkedin','linkedin_p','youtube','threads','twitter','pinterest'].includes(p.id)).map(p=>{const sel=(f.channels||[]).includes(p.id);return`<label title="${p.name}" style="cursor:pointer;display:flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:50%;border:2.5px solid ${sel?p.color:'var(--b)'};background:${sel?p.color+'12':'var(--s1)'};user-select:none;transition:.15s;"><input type="checkbox" data-sf="channels" value="${p.id}" ${sel?'checked':''} style="display:none;"><span style="display:flex;${sel?'':'filter:grayscale(1) opacity(.35);'}">${platLogo(p.id,20)}</span></label>`;}).join('')}
      </div>

      ${secLabel(4,'Mídias',`<span style="font-size:10px;color:var(--t3);">0 imagens, 0 vídeos e 0 documentos</span>`)}
      <div style="border:2px dashed var(--b);border-radius:10px;padding:24px 16px;text-align:center;background:var(--s2);">
        <div style="font-size:28px;color:var(--t3);margin-bottom:8px;">⬆</div>
        <div style="font-size:12px;color:var(--t2);font-weight:600;margin-bottom:3px;">Imagens, vídeos ou documentos</div>
        <div style="font-size:11px;color:var(--t3);margin-bottom:12px;">Envie arquivos de imagem, vídeo, PDF, PPT e Word<br>clicando aqui ou arrastando na janela</div>
        <label style="display:inline-flex;align-items:center;gap:6px;background:var(--ac);color:#fff;border-radius:7px;padding:7px 18px;font-size:11px;font-weight:700;cursor:pointer;">
          <input type="file" id="soc-media-file" accept="image/*,video/*,.pdf,.ppt,.pptx,.doc,.docx" style="display:none;">
          Selecionar arquivo
        </label>
        ${f.mediaName?`<div style="font-size:10px;color:var(--ac);margin-top:8px;font-weight:600;">📎 ${esc(f.mediaName)}</div>`:''}
      </div>

      ${secLabel(5,'Data e horário das publicações')}
      <div style="background:var(--s2);border:1px solid var(--b);border-radius:8px;padding:12px;display:flex;flex-wrap:wrap;gap:10px;align-items:center;">
        <span style="font-size:11px;color:var(--t3);">Nenhum canal selecionado</span>
        <input type="date" id="soc-date" data-sf="date" value="${esc(f.date)}" style="background:var(--s1);border:1px solid var(--b);border-radius:6px;color:var(--t1);padding:6px 10px;font-size:12px;font-family:inherit;outline:none;">
        <input type="time" id="soc-time" data-sf="time" value="${esc(f.time||'18:00')}" style="background:var(--s1);border:1px solid var(--b);border-radius:6px;color:var(--t1);padding:6px 10px;font-size:12px;font-family:inherit;outline:none;">
      </div>
      <select id="soc-post-status" data-sf="postStatus" style="width:100%;background:var(--s2);border:1px solid var(--b);border-radius:7px;color:var(--t1);padding:8px 10px;font-size:12px;font-family:inherit;outline:none;">
        ${SOC_POST_STATUS.map(s=>`<option value="${s.id}"${(f.postStatus||'draft')===s.id?' selected':''}>${s.label}</option>`).join('')}
      </select>
    </div>

    <!-- COLUNA 3: Config + Preview -->
    <div style="width:300px;flex-shrink:0;${col}border-right:none;">
      <button data-action="soc-toggle-adv" style="width:100%;background:${S.soc_adv_open?'var(--ac)':'var(--ac)18'};border:1.5px solid var(--ac);border-radius:8px;color:${S.soc_adv_open?'#fff':'var(--ac)'};padding:10px;font-size:11px;font-weight:700;cursor:pointer;font-family:inherit;display:flex;align-items:center;gap:8px;justify-content:space-between;">
        <span style="display:flex;align-items:center;gap:8px;"><span style="font-size:14px;">⚙️</span> 6. Configurações avançadas</span>
        <span>${S.soc_adv_open?'▲':'▼'}</span>
      </button>

      ${S.soc_adv_open?`<div style="background:var(--s1);border:1px solid var(--b);border-radius:10px;overflow:hidden;">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:var(--s2);border-bottom:1px solid var(--b);">
          <span style="font-size:11px;font-weight:700;color:var(--t3);">Instagram</span>
          <div style="display:flex;gap:4px;">
            ${['Feed','Reels','Stories','Carrossel'].map(t=>`<button data-sf="igFormat" data-val="${t}" style="padding:3px 8px;border-radius:4px;font-size:10px;font-weight:700;border:1px solid ${(f.igFormat||'Feed')===t?'var(--ac)':'var(--b)'};background:${(f.igFormat||'Feed')===t?'var(--ac)':'transparent'};color:${(f.igFormat||'Feed')===t?'#fff':'var(--t3)'};cursor:pointer;font-family:inherit;">${t}</button>`).join('')}
          </div>
        </div>

        ${(()=>{
          const fmt=f.igFormat||'Feed';
          const byFmt={
            Feed:[
              {icon:'💬',label:'Primeiro comentário',field:'firstComment',type:'textarea',placeholder:'Hashtags ou complemento da legenda...'},
              {icon:'👥',label:'Colaborador',field:'collabUser',type:'text',placeholder:'@usuário do colaborador'},
              {icon:'📣',label:'Parceria paga',field:'paidPartnership',type:'text',placeholder:'@marca parceira'},
              {icon:'🛒',label:'Instagram shop',field:'shopTag',type:'text',placeholder:'Link ou ID do produto'},
              {icon:'📍',label:'Localização',field:'location',type:'text',placeholder:'Nome do local'},
              {icon:'🚫',label:'Desativar comentários',field:'disableComments',type:'toggle'},
              {icon:'@',label:'Marcação de pessoas',field:'peopleTags',type:'text',placeholder:'@pessoa1, @pessoa2...'},
              {icon:'ℹ️',label:'Texto alternativo',field:'altText',type:'text',placeholder:'Descreva a imagem para acessibilidade'},
            ],
            Reels:[
              {icon:'💬',label:'Primeiro comentário',field:'firstComment',type:'textarea',placeholder:'Hashtags ou complemento da legenda...'},
              {icon:'👥',label:'Colaborador',field:'collabUser',type:'text',placeholder:'@usuário do colaborador'},
              {icon:'📣',label:'Parceria paga',field:'paidPartnership',type:'text',placeholder:'@marca parceira'},
              {icon:'⊞',label:'Compartilhamento no Feed',field:'shareToFeed',type:'toggle'},
              {icon:'🛒',label:'Instagram shop',field:'shopTag',type:'text',placeholder:'Link ou ID do produto'},
              {icon:'📍',label:'Localização',field:'location',type:'text',placeholder:'Nome do local'},
              {icon:'🚫',label:'Desativar comentários',field:'disableComments',type:'toggle'},
              {icon:'🧪',label:'Teste',field:'isTest',type:'toggle'},
              {icon:'@',label:'Marcação de pessoas',field:'peopleTags',type:'text',placeholder:'@pessoa1, @pessoa2...'},
            ],
            Stories:[
              {icon:'📍',label:'Localização',field:'location',type:'text',placeholder:'Nome do local'},
              {icon:'@',label:'Marcação de pessoas',field:'peopleTags',type:'text',placeholder:'@pessoa1, @pessoa2...'},
              {icon:'🔗',label:'Link (sticker)',field:'storyLink',type:'text',placeholder:'https://...'},
              {icon:'🚫',label:'Desativar respostas',field:'disableComments',type:'toggle'},
            ],
            Carrossel:[
              {icon:'💬',label:'Primeiro comentário',field:'firstComment',type:'textarea',placeholder:'Hashtags ou complemento da legenda...'},
              {icon:'👥',label:'Colaborador',field:'collabUser',type:'text',placeholder:'@usuário do colaborador'},
              {icon:'📣',label:'Parceria paga',field:'paidPartnership',type:'text',placeholder:'@marca parceira'},
              {icon:'🛒',label:'Instagram shop',field:'shopTag',type:'text',placeholder:'Link ou ID do produto'},
              {icon:'📍',label:'Localização',field:'location',type:'text',placeholder:'Nome do local'},
              {icon:'🚫',label:'Desativar comentários',field:'disableComments',type:'toggle'},
              {icon:'@',label:'Marcação de pessoas',field:'peopleTags',type:'text',placeholder:'@pessoa1, @pessoa2...'},
              {icon:'ℹ️',label:'Texto alternativo',field:'altText',type:'text',placeholder:'Descreva a imagem para acessibilidade'},
            ],
          };
          return (byFmt[fmt]||byFmt.Feed);
        })().map((item,i,arr)=>{
          const isLast=i===arr.length-1;
          const val=f[item.field]||'';
          return`<div style="border-bottom:${isLast?'none':'1px solid var(--b)'};">
            <div id="adv-row-${i}" data-adv-idx="${i}" style="display:flex;align-items:center;gap:10px;padding:11px 14px;cursor:pointer;user-select:none;" onclick="const b=document.getElementById('adv-body-${i}');b.style.display=b.style.display==='none'?'block':'none'">
              <span style="font-size:14px;width:20px;text-align:center;">${item.icon}</span>
              <span style="font-size:12px;font-weight:600;color:var(--t1);flex:1;">${item.label}</span>
              ${item.type==='toggle'?`<label onclick="event.stopPropagation()" style="position:relative;display:inline-block;width:36px;height:20px;"><input type="checkbox" data-sf="${item.field}" ${val||f[item.field]?'checked':''} style="opacity:0;width:0;height:0;"><span style="position:absolute;inset:0;background:${f[item.field]?'var(--ac)':'var(--b)'};border-radius:20px;transition:.2s;cursor:pointer;"></span><span style="position:absolute;content:'';height:14px;width:14px;left:3px;bottom:3px;background:#fff;border-radius:50%;transition:.2s;transform:${f[item.field]?'translateX(16px)':'none'};"></span></label>`:
              `<span style="font-size:10px;color:var(--t3);">${val?'✓':''}</span>`}
              ${item.type!=='toggle'?`<span style="font-size:12px;color:var(--t3);">›</span>`:''}
            </div>
            ${item.type!=='toggle'?`<div id="adv-body-${i}" style="display:none;padding:0 14px 12px;border-top:1px solid var(--s2);">
              ${item.type==='textarea'
                ?`<textarea data-sf="${item.field}" placeholder="${item.placeholder}" style="width:100%;min-height:80px;resize:none;background:var(--s2);border:1px solid var(--b);border-radius:7px;color:var(--t1);padding:8px 10px;font-size:11px;font-family:inherit;outline:none;line-height:1.5;box-sizing:border-box;">${esc(val)}</textarea>`
                :`<input type="text" data-sf="${item.field}" placeholder="${item.placeholder}" value="${esc(val)}" style="width:100%;background:var(--s2);border:1px solid var(--b);border-radius:7px;color:var(--t1);padding:7px 10px;font-size:11px;font-family:inherit;outline:none;box-sizing:border-box;">`}
            </div>`:''}
          </div>`;
        }).join('')}

      </div>`:''}


      <div style="font-size:12px;font-weight:700;color:var(--t1);">Preview</div>
      <div style="background:var(--s1);border:1px solid var(--b);border-radius:12px;padding:14px;box-shadow:0 2px 8px rgba(0,0,0,.05);">
        ${f.text||f.mediaName?`
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
            <div style="width:32px;height:32px;border-radius:50%;background:var(--ac);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;color:#fff;">${(AUTH.session?.name||'?')[0]}</div>
            <div><div style="font-size:12px;font-weight:700;color:var(--t1);">${esc(AUTH.session?.name||'Perfil')}</div><div style="font-size:10px;color:var(--t3);">${f.date?fdatefull(f.date)+' às '+(f.time||'—'):'Sem data'}</div></div>
          </div>
          ${f.mediaName?`<div style="background:var(--s2);border-radius:8px;height:140px;display:flex;flex-direction:column;align-items:center;justify-content:center;margin-bottom:10px;border:1px solid var(--b);"><div style="font-size:22px;margin-bottom:4px;">🖼</div><div style="font-size:10px;color:var(--t3);">${esc(f.mediaName)}</div></div>`:''}
          <div id="soc-preview-text" style="font-size:12px;color:var(--t1);line-height:1.6;white-space:pre-wrap;word-break:break-word;">${f.text||''}</div>
          ${f.hashtags?`<div style="font-size:11px;color:#3b82f6;margin-top:5px;">${esc(f.hashtags)}</div>`:''}
          ${previewChannels.length?`<div style="display:flex;gap:4px;margin-top:8px;flex-wrap:wrap;">${previewChannels.map(ch=>{const p=gplat(ch);return`<span style="background:${p.color}18;color:${p.color};border-radius:3px;padding:2px 6px;font-size:9px;font-weight:700;">${p.name}</span>`;}).join('')}</div>`:''}
        `:`<div style="text-align:center;padding:30px 10px;color:var(--t3);">
          <div style="font-size:28px;margin-bottom:8px;opacity:.4;">🖼</div>
          <div style="font-size:11px;">Informe os canais e as mídias<br>desejadas para visualização.</div>
        </div>`}
      </div>

      <div style="display:flex;gap:8px;margin-top:auto;">
        <button data-action="soc-clear-form" style="flex:1;background:var(--s2);border:1px solid var(--b);border-radius:7px;color:var(--t2);padding:9px;font-size:11px;font-weight:600;cursor:pointer;font-family:inherit;">Limpar</button>
        <button data-action="soc-save-post" style="flex:2;background:var(--ac);color:#fff;border:none;border-radius:7px;padding:9px;font-size:11px;font-weight:700;cursor:pointer;font-family:inherit;">${f.postStatus==='draft'?'💾 Rascunho':f.postStatus==='pending'?'📨 Aprovação':'📅 Agendar'}</button>
      </div>
    </div>
    </div>
  </div>`;
}


function socCalendar(){
  const now=new Date();
  const ym=S.social_cal_date||{year:now.getFullYear(),month:now.getMonth()};
  const y=ym.year,m=ym.month;
  const firstDay=new Date(y,m,1).getDay();
  const daysInMonth=new Date(y,m+1,0).getDate();
  const months=['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  const days=['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
  const todayStr=new Date().toISOString().slice(0,10);
  const cells=[];
  for(let i=0;i<firstDay;i++)cells.push(null);
  for(let d=1;d<=daysInMonth;d++)cells.push(d);
  function postsForDay(d){const ds=`${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;return S.social_posts.filter(p=>p.scheduledAt&&p.scheduledAt.startsWith(ds));}
  const monthPosts=S.social_posts.filter(p=>p.scheduledAt&&p.scheduledAt.startsWith(`${y}-${String(m+1).padStart(2,'0')}`));
  return`<div style="flex:1;overflow:hidden;display:flex;flex-direction:column;">
    <div style="padding:10px 20px;background:var(--s1);border-bottom:1px solid var(--b);display:flex;align-items:center;gap:10px;flex-shrink:0;">
      <button data-action="soc-cal-prev" style="background:var(--s2);border:1px solid var(--b);border-radius:7px;color:var(--t2);width:28px;height:28px;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;">‹</button>
      <div style="font-size:13px;font-weight:700;color:var(--t1);min-width:150px;text-align:center;">${months[m]} ${y}</div>
      <button data-action="soc-cal-next" style="background:var(--s2);border:1px solid var(--b);border-radius:7px;color:var(--t2);width:28px;height:28px;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;">›</button>
      <button data-action="soc-cal-today" style="background:var(--s2);border:1px solid var(--b);border-radius:7px;color:var(--t2);padding:5px 11px;cursor:pointer;font-size:11px;font-weight:600;font-family:inherit;">Hoje</button>
      <div style="margin-left:auto;font-size:11px;color:var(--t3);">${monthPosts.length} post${monthPosts.length!==1?'s':''} em ${months[m]}</div>
    </div>
    <div style="flex:1;overflow-y:auto;padding:14px 20px;">
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:1px;background:var(--b);border-radius:10px;overflow:hidden;border:1px solid var(--b);">
        ${days.map(d=>`<div style="background:var(--s2);padding:7px;text-align:center;font-size:10px;font-weight:700;color:var(--t3);letter-spacing:.4px;text-transform:uppercase;">${d}</div>`).join('')}
        ${cells.map(d=>{
          if(!d)return`<div style="background:var(--s1);min-height:78px;"></div>`;
          const posts=postsForDay(d);
          const ds=`${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
          const isToday=ds===todayStr;
          return`<div style="background:var(--s1);min-height:78px;padding:5px;box-sizing:border-box;">
            <div style="font-size:11px;font-weight:${isToday?'800':'500'};width:20px;height:20px;border-radius:50%;background:${isToday?'var(--ac)':'transparent'};color:${isToday?'#fff':'var(--t2)'};display:flex;align-items:center;justify-content:center;margin-bottom:3px;">${d}</div>
            ${posts.slice(0,3).map(p=>{const ch=(p.channels||[])[0];const pl=ch?gplat(ch):null;return`<div style="background:${pl?pl.color+'18':'var(--s2)'};border-left:2px solid ${pl?pl.color:'var(--b)'};border-radius:3px;padding:2px 4px;margin-bottom:2px;font-size:9px;color:var(--t1);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${esc(p.text)}">${esc(p.text)||'Post'}</div>`;}).join('')}
            ${posts.length>3?`<div style="font-size:9px;color:var(--ac);font-weight:700;padding-left:2px;">+${posts.length-3}</div>`:''}
          </div>`;
        }).join('')}
      </div>
    </div>
  </div>`;
}

function socAnalytics(){
  const connected=S.social_accounts;
  if(!connected.length)return`<div style="flex:1;display:flex;align-items:center;justify-content:center;"><div style="text-align:center;color:var(--t3);"><div style="font-size:36px;margin-bottom:10px;">📊</div><div style="font-size:13px;font-weight:600;color:var(--t2);">Nenhuma conta conectada</div><div style="font-size:11px;margin-top:4px;">Conecte contas no Dashboard para ver Analytics</div></div></div>`;
  return`<div style="flex:1;overflow-y:auto;padding:20px;">
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:12px;margin-bottom:20px;">
      ${connected.map(acc=>{
        const p=gplat(acc.platform);
        const posts=S.social_posts.filter(x=>(x.profiles||[]).includes(acc.id));
        const pub=posts.filter(x=>x.status==='published').length;
        const sched=posts.filter(x=>x.status==='scheduled').length;
        return`<div style="background:var(--s1);border:1px solid var(--b);border-radius:12px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.05);">
          <div style="background:${p.grad};padding:13px;display:flex;align-items:center;gap:9px;">
            <div style="width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.22);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:#fff;">${p.short}</div>
            <div><div style="font-size:12px;font-weight:700;color:#fff;">${esc(acc.accountName)}</div><div style="font-size:10px;color:rgba(255,255,255,.75);">${esc(p.name)}</div></div>
          </div>
          <div style="padding:12px;display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            <div><div style="font-size:9px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.4px;margin-bottom:2px;">Seguidores</div><div style="font-size:19px;font-weight:800;color:var(--t1);">${acc.followers?Number(acc.followers).toLocaleString('pt-BR'):'—'}</div></div>
            <div><div style="font-size:9px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.4px;margin-bottom:2px;">Posts</div><div style="font-size:19px;font-weight:800;color:var(--t1);">${posts.length}</div></div>
            ${acc.engagement?`<div><div style="font-size:9px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.4px;margin-bottom:2px;">Engajamento</div><div style="font-size:19px;font-weight:800;color:var(--t1);">${acc.engagement}%</div></div>`:''}
            ${sched?`<div><div style="font-size:9px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.4px;margin-bottom:2px;">Agendados</div><div style="font-size:19px;font-weight:800;color:#166534;">${sched}</div></div>`:''}
          </div>
        </div>`;
      }).join('')}
    </div>
    <div style="background:var(--s1);border:1px solid var(--b);border-radius:12px;overflow:hidden;">
      <div style="padding:11px 16px;border-bottom:1px solid var(--b);font-size:11px;font-weight:700;color:var(--t2);letter-spacing:.4px;text-transform:uppercase;">Histórico de posts</div>
      ${S.social_posts.length===0
        ?`<div style="padding:28px;text-align:center;color:var(--t3);font-size:12px;">Nenhum post registrado.</div>`
        :`<table style="width:100%;border-collapse:collapse;font-size:12px;">
          <thead><tr style="background:var(--s2);">
            <th style="padding:7px 14px;text-align:left;font-size:10px;font-weight:700;color:var(--t3);letter-spacing:.4px;text-transform:uppercase;border-bottom:1px solid var(--b);">Legenda</th>
            <th style="padding:7px 14px;text-align:left;font-size:10px;font-weight:700;color:var(--t3);letter-spacing:.4px;text-transform:uppercase;border-bottom:1px solid var(--b);">Canais</th>
            <th style="padding:7px 14px;text-align:left;font-size:10px;font-weight:700;color:var(--t3);letter-spacing:.4px;text-transform:uppercase;border-bottom:1px solid var(--b);">Data</th>
            <th style="padding:7px 14px;text-align:left;font-size:10px;font-weight:700;color:var(--t3);letter-spacing:.4px;text-transform:uppercase;border-bottom:1px solid var(--b);">Status</th>
          </tr></thead>
          <tbody>${S.social_posts.slice().sort((a,b)=>a.scheduledAt<b.scheduledAt?1:-1).map(post=>`<tr style="border-bottom:1px solid var(--b);">
            <td style="padding:8px 14px;color:var(--t1);max-width:220px;"><div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${esc(post.text)||'—'}</div></td>
            <td style="padding:8px 14px;"><div style="display:flex;gap:3px;flex-wrap:wrap;">${(post.channels||[]).map(ch=>{const p=gplat(ch);return`<span style="background:${p.color}18;color:${p.color};border-radius:3px;padding:1px 5px;font-size:9px;font-weight:700;">${p.short}</span>`;}).join('')}</div></td>
            <td style="padding:8px 14px;color:var(--t3);white-space:nowrap;font-size:11px;">${post.scheduledAt||'—'}</td>
            <td style="padding:8px 14px;">${(()=>{const st=gpoststat(post.status);return`<span style="display:inline-block;padding:2px 8px;border-radius:20px;font-size:9px;font-weight:700;background:${st.bg};color:${st.color};">${st.label}</span>`;})()}</td>
          </tr>`).join('')}</tbody>
        </table>`}
    </div>
  </div>`;
}

function socCompetitors(){
  const comps=S.social_competitors||[];
  return`<div style="flex:1;overflow-y:auto;padding:20px;">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
      <div>
        <div style="font-size:15px;font-weight:700;color:var(--t1);">Análise de concorrentes</div>
        <div style="font-size:11px;color:var(--t3);margin-top:2px;">${comps.length} perfil${comps.length!==1?'s':''} monitorado${comps.length!==1?'s':''}</div>
      </div>
      <button data-action="soc-add-comp" style="background:var(--ac);color:#fff;border:none;border-radius:7px;padding:7px 16px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;">+ Adicionar</button>
    </div>
    ${comps.length===0?`<div style="background:var(--s1);border:1px solid var(--b);border-radius:12px;padding:40px;text-align:center;color:var(--t3);">
      <div style="font-size:28px;margin-bottom:10px;">🔍</div>
      <div style="font-size:13px;font-weight:600;color:var(--t2);margin-bottom:4px;">Nenhum concorrente cadastrado</div>
      <div style="font-size:11px;">Adicione perfis para monitorar métricas e comparar performance.</div>
    </div>`:`<div style="background:var(--s1);border:1px solid var(--b);border-radius:12px;overflow:hidden;">
      <table style="width:100%;border-collapse:collapse;font-size:12px;">
        <thead><tr style="background:var(--s2);">
          <th style="padding:9px 14px;text-align:left;font-size:10px;font-weight:700;color:var(--t3);letter-spacing:.4px;text-transform:uppercase;border-bottom:1px solid var(--b);">Perfil</th>
          <th style="padding:9px 14px;text-align:left;font-size:10px;font-weight:700;color:var(--t3);letter-spacing:.4px;text-transform:uppercase;border-bottom:1px solid var(--b);">Plataforma</th>
          <th style="padding:9px 14px;text-align:center;font-size:10px;font-weight:700;color:var(--t3);letter-spacing:.4px;text-transform:uppercase;border-bottom:1px solid var(--b);">Seguidores</th>
          <th style="padding:9px 14px;text-align:center;font-size:10px;font-weight:700;color:var(--t3);letter-spacing:.4px;text-transform:uppercase;border-bottom:1px solid var(--b);">Engajamento</th>
          <th style="padding:9px 14px;text-align:center;font-size:10px;font-weight:700;color:var(--t3);letter-spacing:.4px;text-transform:uppercase;border-bottom:1px solid var(--b);">Posts/sem</th>
          <th style="padding:9px 14px;text-align:left;font-size:10px;font-weight:700;color:var(--t3);letter-spacing:.4px;text-transform:uppercase;border-bottom:1px solid var(--b);">Observações</th>
          <th style="padding:9px 14px;border-bottom:1px solid var(--b);width:40px;"></th>
        </tr></thead>
        <tbody>${comps.map(c=>{const p=gplat(c.platform);return`<tr style="border-bottom:1px solid var(--b);">
          <td style="padding:9px 14px;">
            <div style="font-weight:600;color:var(--t1);">${esc(c.name)}</div>
            ${c.handle?`<div style="font-size:10px;color:var(--t3);">@${esc(c.handle)}</div>`:''}
          </td>
          <td style="padding:9px 14px;"><span style="background:${p.color}18;color:${p.color};border-radius:4px;padding:2px 7px;font-size:10px;font-weight:700;">${esc(p.name)}</span></td>
          <td style="padding:9px 14px;text-align:center;font-weight:700;color:var(--t1);">${c.followers?Number(c.followers).toLocaleString('pt-BR'):'—'}</td>
          <td style="padding:9px 14px;text-align:center;color:${c.engagement>3?'#166534':c.engagement>1?'#b45309':'var(--t2)'};">${c.engagement?c.engagement+'%':'—'}</td>
          <td style="padding:9px 14px;text-align:center;color:var(--t2);">${c.postsPerWeek||'—'}</td>
          <td style="padding:9px 14px;color:var(--t3);font-size:11px;max-width:200px;"><div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${esc(c.notes)||'—'}</div></td>
          <td style="padding:9px 14px;text-align:center;"><button data-action="soc-del-comp" data-cid="${c.id}" style="background:none;border:none;color:var(--t3);cursor:pointer;font-size:13px;padding:2px 5px;border-radius:4px;">✕</button></td>
        </tr>`;}).join('')}</tbody>
      </table>
    </div>`}
    <div id="soc-comp-form-wrap" style="display:none;margin-top:14px;">
      <div style="background:var(--s1);border:1px solid var(--b);border-radius:12px;padding:16px;">
        <div style="font-size:11px;font-weight:700;color:var(--t2);text-transform:uppercase;letter-spacing:.4px;margin-bottom:12px;">Novo concorrente</div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:10px;">
          <div class="fg"><label>Nome/Marca <span class="req">*</span></label><input type="text" id="comp-name" placeholder="Ex: Concorrente X"></div>
          <div class="fg"><label>Handle</label><input type="text" id="comp-handle" placeholder="sem @"></div>
          <div class="fg"><label>Plataforma</label><select id="comp-plat">${SOCIAL_PLAT.map(p=>`<option value="${p.id}">${p.name}</option>`).join('')}</select></div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:10px;margin-bottom:12px;">
          <div class="fg"><label>Seguidores</label><input type="number" id="comp-followers" placeholder="0" min="0"></div>
          <div class="fg"><label>Engajamento %</label><input type="number" id="comp-engagement" placeholder="0.0" step="0.1" min="0"></div>
          <div class="fg"><label>Posts/semana</label><input type="number" id="comp-ppw" placeholder="0" min="0"></div>
          <div class="fg"><label>Observações</label><input type="text" id="comp-notes" placeholder="Destaque, estratégia..."></div>
        </div>
        <div style="display:flex;gap:8px;justify-content:flex-end;">
          <button data-action="soc-cancel-comp" class="btn modal btn-o" style="font-family:inherit;">Cancelar</button>
          <button data-action="soc-save-comp" class="btn btn-p" style="font-family:inherit;">Salvar concorrente</button>
        </div>
      </div>
    </div>
  </div>`;
}

function socMain(){
  const v=S.social_view;
  const views=[{id:'dashboard',label:'Dashboard'},{id:'schedule',label:'Agendar Post'},{id:'calendar',label:'Calendário'},{id:'analytics',label:'Analytics'}];
  return`<div style="display:flex;align-items:center;padding:0 20px;background:var(--s1);border-bottom:1px solid var(--b);flex-shrink:0;height:42px;gap:0;">
    ${views.map(vi=>`<button data-soc-view="${vi.id}" style="padding:0 15px;height:100%;border:none;background:none;color:${v===vi.id?'var(--ac)':'var(--t3)'};font-size:12px;font-weight:700;cursor:pointer;border-bottom:2px solid ${v===vi.id?'var(--ac)':'transparent'};font-family:inherit;transition:.12s;">${esc(vi.label)}</button>`).join('')}
    <div style="margin-left:auto;display:flex;align-items:center;gap:10px;">
      <span style="font-size:11px;color:var(--t3);">${S.social_accounts.length} conta${S.social_accounts.length!==1?'s':''} conectada${S.social_accounts.length!==1?'s':''}</span>
      <button data-action="soc-open-profiles" style="background:var(--ac);color:#fff;border:none;border-radius:7px;padding:5px 14px;font-size:11px;font-weight:700;cursor:pointer;font-family:inherit;display:flex;align-items:center;gap:5px;">👤 Perfis</button>
    </div>
  </div>
  <div style="flex:1;overflow:hidden;display:flex;flex-direction:column;">
    ${v==='dashboard'?socDashboard():v==='schedule'?socSchedule():v==='calendar'?socCalendar():v==='competitors'?socCompetitors():socAnalytics()}
  </div>
  ${socConnectModal()}
  ${renderSocialProfilesPanel()}`;
}

// ═══════════════════════════════════════
// EMOJI PICKER
// ═══════════════════════════════════════
const EMOJI_CATS = {
  'Documentos': ['📄','📋','📑','📊','📈','📉','📁','📂','🗂️','📝','✏️','📖','📚','📎','🔖','📌','📍'],
  'Comunicação': ['📢','📣','💬','✉️','📧','📨','📩','📬','📮','🗣️','💭','📡','🔔','📞','☎️'],
  'Financeiro':  ['💰','💵','💳','💸','🏦','💹','🧾','💼','🪙','📊','💡','🎯'],
  'Operações':   ['⚙️','🔧','🔨','🛠️','🔩','💻','🖥️','📱','⌨️','🖨️','🖱️','🔌','💾'],
  'Pessoas':     ['👥','👤','🤝','👋','🎓','🏆','🌟','⭐','🎯','🏅','👑','🙌'],
  'Facilities':  ['✈️','🚗','🏢','🏠','🗺️','🔒','🔓','🚀','📍','🌐','🏗️','🛡️'],
  'Geral':       ['🔗','✅','❌','➡️','⚠️','ℹ️','🎨','🖼️','🎬','▶️','🛍️','🎁','🌿','💎','🔥','⭐'],
};
const ICON_SERVICES = [
  {label:'Canva',      val:'img:https://www.google.com/s2/favicons?domain=canva.com&sz=64'},
  {label:'Drive',      val:'img:https://www.google.com/s2/favicons?domain=drive.google.com&sz=64'},
  {label:'Docs',       val:'img:https://www.google.com/s2/favicons?domain=docs.google.com&sz=64'},
  {label:'Sheets',     val:'img:https://www.google.com/s2/favicons?domain=sheets.google.com&sz=64'},
  {label:'Slides',     val:'img:https://www.google.com/s2/favicons?domain=slides.google.com&sz=64'},
  {label:'Forms',      val:'img:https://www.google.com/s2/favicons?domain=forms.google.com&sz=64'},
  {label:'YouTube',    val:'img:https://www.google.com/s2/favicons?domain=youtube.com&sz=64'},
  {label:'Meet',       val:'img:https://www.google.com/s2/favicons?domain=meet.google.com&sz=64'},
  {label:'WhatsApp',   val:'img:https://www.google.com/s2/favicons?domain=whatsapp.com&sz=64'},
  {label:'Instagram',  val:'img:https://www.google.com/s2/favicons?domain=instagram.com&sz=64'},
  {label:'LinkedIn',   val:'img:https://www.google.com/s2/favicons?domain=linkedin.com&sz=64'},
  {label:'Facebook',   val:'img:https://www.google.com/s2/favicons?domain=facebook.com&sz=64'},
  {label:'Notion',     val:'img:https://www.google.com/s2/favicons?domain=notion.so&sz=64'},
  {label:'Trello',     val:'img:https://www.google.com/s2/favicons?domain=trello.com&sz=64'},
  {label:'Slack',      val:'img:https://www.google.com/s2/favicons?domain=slack.com&sz=64'},
  {label:'Dropbox',    val:'img:https://www.google.com/s2/favicons?domain=dropbox.com&sz=64'},
  {label:'Zoom',       val:'img:https://www.google.com/s2/favicons?domain=zoom.us&sz=64'},
  {label:'Figma',      val:'img:https://www.google.com/s2/favicons?domain=figma.com&sz=64'},
  {label:'Miro',       val:'img:https://www.google.com/s2/favicons?domain=miro.com&sz=64'},
  {label:'Monday',     val:'img:https://www.google.com/s2/favicons?domain=monday.com&sz=64'},
  {label:'Typeform',   val:'img:https://www.google.com/s2/favicons?domain=typeform.com&sz=64'},
  {label:'HubSpot',    val:'img:https://www.google.com/s2/favicons?domain=hubspot.com&sz=64'},
  {label:'Coda',       val:'img:https://www.google.com/s2/favicons?domain=coda.io&sz=64'},
  {label:'Loom',       val:'img:https://www.google.com/s2/favicons?domain=loom.com&sz=64'},
];
let _emojiPickerTarget = null;
let _emojiPickerCat = 'Documentos';

function openEmojiPicker(btn, inputEl){
  // close existing
  document.querySelectorAll('.emoji-picker').forEach(el=>el.remove());
  _emojiPickerTarget = inputEl;
  _emojiPickerCat = Object.keys(EMOJI_CATS)[0];
  const picker = document.createElement('div');
  picker.className = 'emoji-picker';
  picker.id = 'emoji-picker';
  renderEmojiPickerContent(picker);
  // position below btn
  const rect = btn.getBoundingClientRect();
  picker.style.top = (rect.bottom + 4) + 'px';
  picker.style.left = Math.min(rect.left, window.innerWidth - 320) + 'px';
  picker.style.position = 'fixed';
  picker.style.zIndex = '9999';
  document.body.appendChild(picker);
  // close on outside click — ignore clicks whose target was removed from DOM (picker re-render)
  setTimeout(()=>{
    document.addEventListener('click', function handler(e){
      if(!document.body.contains(e.target))return; // target detached = was inside picker during re-render
      if(!picker.contains(e.target)&&e.target!==btn){picker.remove();document.removeEventListener('click',handler);}
    });
  }, 10);
}

function renderEmojiPickerContent(picker){
  const cats = [...Object.keys(EMOJI_CATS), 'Serviços'];
  const isServices = _emojiPickerCat === 'Serviços';
  const emojis = isServices ? [] : (EMOJI_CATS[_emojiPickerCat] || []);
  picker.innerHTML = `
    <div class="emoji-picker-cats">
      ${cats.map(c=>`<button class="emoji-cat-btn${c===_emojiPickerCat?' on':''}" onclick="window._setEmojiCat('${c}')">${c}</button>`).join('')}
    </div>
    <div class="emoji-grid" style="${isServices?'grid-template-columns:repeat(6,1fr);gap:6px;':''}">
      ${isServices
        ? ICON_SERVICES.map(s=>`<button class="emoji-opt" style="flex-direction:column;height:44px;width:44px;gap:2px;" title="${s.label}" onclick="window._pickEmoji('${s.val}')"><img src="${s.val.slice(4)}" style="width:22px;height:22px;object-fit:contain;"><span style="font-size:8px;color:var(--t3);line-height:1;">${s.label}</span></button>`).join('')
        : emojis.map(e=>`<button class="emoji-opt" onclick="window._pickEmoji('${e}')">${e}</button>`).join('')
      }
    </div>`;
}

window._setEmojiCat = function(cat){
  _emojiPickerCat = cat;
  const picker = document.getElementById('emoji-picker');
  if(picker) renderEmojiPickerContent(picker);
};
window._pickEmoji = function(emoji){
  if(_emojiPickerTarget){
    _emojiPickerTarget.value = emoji;
    _emojiPickerTarget.dispatchEvent(new Event('input'));
    // update the visible emoji button
    const btn = _emojiPickerTarget.previousElementSibling;
    if(btn && btn.classList.contains('emoji-btn')) btn.textContent = emoji;
  }
  document.getElementById('emoji-picker')?.remove();
  _emojiPickerTarget = null;
};

// ═══════════════════════════════════════
// FORMATO HELPERS
// ═══════════════════════════════════════
function fmtcls(id){return't-fmt-'+(id||'feed');}
function gfmt(id){return POST_FORMATS.find(f=>f.id===id)||null;}

function updateSubtypes(fmtId){
  // update subtype select
  const sel=document.getElementById('sel-postSubtype');
  const fg=document.getElementById('fg-postSubtype');
  const lbl=document.getElementById('lbl-postSubtype-fmt');
  if(sel){
    sel.innerHTML='<option value="">Selecionar...</option>';
    (POST_SUBTYPES[fmtId]||[]).forEach(s=>{
      const o=document.createElement('option');o.value=s;o.textContent=s;sel.appendChild(o);
    });
  }
  if(fg)fg.style.display=fmtId?'flex':'none';
  if(lbl)lbl.textContent=fmtId?(gfmt(fmtId)?.label||''):'';
  // update pill active state
  document.querySelectorAll('.fmt-pill').forEach(el=>{
    const inp=el.querySelector('input[type="radio"]');
    if(inp){el.classList.toggle('active',inp.value===fmtId);}
  });
}

// ═══════════════════════════════════════
// EVENT BINDING
// ═══════════════════════════════════════
function bind(){
  const r=document.getElementById('root');

  // Dismiss startup alert
  const dismissAlert=r.querySelector('[data-action="dismiss-startup-alert"]');
  if(dismissAlert)dismissAlert.addEventListener('click',()=>{S.startup_alert_dismissed=true;render();});

  // Pipeline tabs — reset alert dismiss when switching to content
  r.querySelectorAll('[data-pipe]').forEach(b=>b.addEventListener('click',()=>{
    if(b.dataset.pipe==='content')S.startup_alert_dismissed=false;
    S.pipe=b.dataset.pipe;render();
  }));

  // View toggle
  r.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>{
    if(S.pipe==='content')S.view=b.dataset.view;else S.view2=b.dataset.view;render();
  }));

  // New button
  r.querySelectorAll('[data-action="new"]').forEach(b=>b.addEventListener('click',e=>{
    e.stopPropagation();
    if(S.pipe==='content'){
      S.modal={open:true,id:null,defStatus:b.dataset.st||'ideas',tab:'basic'};
    }else{
      S.modal2={open:true,id:null,defStatus:b.dataset.st2||'triage',tab:'form',attachmentName:''};
    }
    render();
  }));

  // Filters P1
  r.querySelectorAll('[data-f1]').forEach(el=>el.addEventListener('input',()=>{S.filters[el.dataset.f1]=el.value;render();}));
  const clr1=r.querySelector('[data-action="clr1"]');
  if(clr1)clr1.addEventListener('click',()=>{S.filters={search:'',project:'',type:'',funnel:'',channel:'',status:'',responsible:''};render();});

  // Filters P2
  r.querySelectorAll('[data-f2]').forEach(el=>el.addEventListener('input',()=>{S.filters2[el.dataset.f2]=el.value;render();}));
  const clr2=r.querySelector('[data-action="clr2"]');
  if(clr2)clr2.addEventListener('click',()=>{S.filters2={search:'',unit:'',orderType:'',status:'',responsible2:''};render();});

  // Sort P1
  r.querySelectorAll('[data-sort1]').forEach(th=>th.addEventListener('click',()=>{
    const f=th.dataset.sort1;
    if(S.sort.field===f)S.sort.dir=S.sort.dir==='asc'?'desc':'asc';else{S.sort.field=f;S.sort.dir='asc';}
    render();
  }));

  // Sort P2
  r.querySelectorAll('[data-sort2]').forEach(th=>th.addEventListener('click',()=>{
    const f=th.dataset.sort2;
    if(S.sort2.field===f)S.sort2.dir=S.sort2.dir==='asc'?'desc':'asc';else{S.sort2.field=f;S.sort2.dir='asc';}
    render();
  }));

  // Card / row click — P1
  r.querySelectorAll('[data-cpipe="1"]').forEach(el=>el.addEventListener('click',e=>{
    if(e.target.closest('[data-action]'))return;
    S.modal={open:true,id:el.dataset.cid,tab:'basic'};render();
  }));

  // Card / row click — P2
  r.querySelectorAll('[data-cpipe="2"]').forEach(el=>el.addEventListener('click',e=>{
    if(e.target.closest('[data-action]'))return;
    S.modal2={open:true,id:el.dataset.rid,tab:'view',attachmentName:''};render();
  }));

  // Responsible chips — content card
  const addRespBtn=r.querySelector('#add-resp-c1-btn');
  const addRespDd=r.querySelector('#add-resp-c1-dd');
  if(addRespBtn&&addRespDd){
    addRespBtn.addEventListener('click',e=>{e.stopPropagation();addRespDd.style.display=addRespDd.style.display==='block'?'none':'block';});
    document.addEventListener('click',function closeDD(e){if(!addRespDd.contains(e.target)&&e.target!==addRespBtn){addRespDd.style.display='none';}},{once:false});
    // search filter
    const ddSearch=r.querySelector('#resp-search-c1-dd');
    if(ddSearch)ddSearch.addEventListener('input',()=>{
      r.querySelectorAll('.resp-opt-c1').forEach(el=>el.style.display=el.dataset.n.toLowerCase().includes(ddSearch.value.toLowerCase())?'flex':'none');
    });
    // hover effect
    r.querySelectorAll('.resp-opt-c1').forEach(el=>{
      el.addEventListener('mouseover',()=>el.style.background='var(--s2)');
      el.addEventListener('mouseout',()=>el.style.background='none');
      el.addEventListener('click',()=>{
        const name=el.dataset.n;
        const chips=r.querySelector('#resp-chips-c1');
        if(!chips)return;
        const existing=[...chips.querySelectorAll('[data-name]')].map(x=>x.dataset.name);
        if(existing.includes(name))return;
        // check hidden checkbox
        const cb=[...r.querySelectorAll('#resp-hidden-checks input[type=checkbox]')].find(c=>c.value===name);
        if(cb)cb.checked=true;
        // build chip
        const chip=document.createElement('div');
        chip.className='resp-chip-c1';chip.dataset.name=name;
        chip.style.cssText='display:flex;align-items:center;gap:6px;padding:5px 10px;background:var(--s2);border-radius:6px;border:1px solid var(--b);';
        chip.innerHTML=`<div style="width:20px;height:20px;border-radius:50%;background:${el.dataset.color};display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:800;color:#fff;">${el.dataset.initials}</div><span style="font-size:12px;color:var(--t1);">${esc(name)}</span><button type="button" data-resp-remove="${esc(name)}" style="background:none;border:none;color:var(--t3);cursor:pointer;font-size:12px;padding:0 2px;line-height:1;">×</button>`;
        chips.insertBefore(chip,chips.lastElementChild);
        addRespDd.style.display='none';
        // bind remove on new chip
        chip.querySelector('[data-resp-remove]').addEventListener('click',()=>{
          const n=chip.dataset.name;
          chip.remove();
          const c=[...r.querySelectorAll('#resp-hidden-checks input[type=checkbox]')].find(x=>x.value===n);
          if(c)c.checked=false;
        });
      });
    });
  }
  // bind remove on existing chips
  r.querySelectorAll('.resp-chip-c1 [data-resp-remove]').forEach(btn=>btn.addEventListener('click',()=>{
    const name=btn.dataset.respRemove;
    btn.closest('[data-name]').remove();
    const cb=[...r.querySelectorAll('#resp-hidden-checks input[type=checkbox]')].find(c=>c.value===name);
    if(cb)cb.checked=false;
  }));

  // Modal 1 tabs
  r.querySelectorAll('[data-mt1]').forEach(b=>b.addEventListener('click',()=>{S.modal.tab=b.dataset.mt1;render();}));

  // Modal 2 — só aba view→edit (sem re-render com perda de dados)
  r.querySelectorAll('[data-mt2]').forEach(b=>b.addEventListener('click',()=>{
    // 'edit' abre formulário; qualquer outro vai para view
    S.modal2.tab = b.dataset.mt2 === 'edit' ? 'edit' : b.dataset.mt2;
    render();
    const fi=document.getElementById('req-file');
    if(fi)fi.addEventListener('change',e=>{if(e.target.files[0])S.modal2.attachmentName=e.target.files[0].name;});
  }));

  // File input (bind after render)
  const fi=document.getElementById('req-file');
  if(fi)fi.addEventListener('change',e=>{if(e.target.files[0])S.modal2.attachmentName=e.target.files[0].name;});

  // Close modal 1
  r.querySelectorAll('[data-action="cls1"]').forEach(b=>b.addEventListener('click',()=>{S.modal.open=false;render();}));

  // Close modal 2
  r.querySelectorAll('[data-action="cls2"]').forEach(b=>b.addEventListener('click',()=>{S.modal2.open=false;render();}));

  // Click outside modals
  ['ov1','ov2'].forEach(id=>{
    const ov=r.querySelector('#'+id);
    if(ov)ov.addEventListener('click',e=>{
      if(e.target===ov){
        if(id==='ov1')S.modal.open=false;else S.modal2.open=false;
        render();
      }
    });
  });

  // Save P1
  const sav1=r.querySelector('[data-action="save1"]');
  if(sav1)sav1.addEventListener('click',()=>{
    const form=document.getElementById('cf1');
    const d={};new FormData(form).forEach((v,k)=>{if(k!=='responsible'&&k!=='channel')d[k]=v;});
    d.channel=[...form.querySelectorAll('input[name="channel"]:checked')].map(cb=>cb.value);
    d.responsible=[...form.querySelectorAll('input[name="responsible"]:checked')].map(cb=>cb.value);
    if(!d.title?.trim()){alert('Título obrigatório.');S.modal.tab='basic';render();return;}
    const eid=sav1.dataset.id;
    if(eid){const i=S.cards.findIndex(c=>c.id===eid);if(i!==-1)S.cards[i]={...S.cards[i],...d};}
    else{
      const newCard={id:uid(),createdAt:Date.now(),status:S.modal.defStatus,...d};
      S.cards.push(newCard);
      runAutomations(newCard,'create','content');
    }
    const cardToAuto=eid?S.cards.find(c=>c.id===eid):S.cards[S.cards.length-1];
    if(cardToAuto)runAutomations(cardToAuto,'any_save','content');
    save1();S.modal.open=false;render();
  });

  // Save P2
  const sav2=r.querySelector('[data-action="save2"]');
  if(sav2)sav2.addEventListener('click',()=>{
    const form=document.getElementById('cf2');
    const d={};new FormData(form).forEach((v,k)=>{if(k!=='responsible2')d[k]=v;});
    const eidResp=sav2.dataset.id;
    d.responsible=eidResp?(S.requests.find(x=>x.id===eidResp)||{}).responsible||[]:[];
    // Required field validation
    const required=[
      {field:'nome',label:'Nome'},
      {field:'telefone',label:'Telefone'},
      {field:'email',label:'E-mail'},
      {field:'setor',label:'Setor Solicitante'},
      {field:'bizUnit',label:'Unidade de Negócio'},
      {field:'requestTitle',label:'Título da Solicitação'},
      {field:'orderType',label:'Tipo de Pedido'},
      {field:'desiredDate',label:'Data Desejada'},
      {field:'deliveryMethod',label:'Entrega Via'},
      {field:'details',label:'Detalhes'},
    ];
    for(const req of required){
      if(!d[req.field]?.trim()){
        // Mostrar erro no topo do modal sem re-renderizar
        let errEl=document.getElementById('cf2-err');
        if(!errEl){
          errEl=document.createElement('div');
          errEl.id='cf2-err';
          errEl.style.cssText='color:#f87171;font-size:12px;padding:6px 10px;background:rgba(239,68,68,.1);border-radius:6px;margin-bottom:10px;';
          form.prepend(errEl);
        }
        errEl.textContent=`Campo obrigatório não preenchido: ${req.label}`;
        // Focar o campo com problema
        const el=form.querySelector(`[name="${req.field}"]`);
        if(el){el.focus();el.scrollIntoView({behavior:'smooth',block:'center'});}
        return;
      }
    }
    // Attachment name (from state, since file inputs don't persist across re-renders)
    if(S.modal2.attachmentName)d.attachmentName=S.modal2.attachmentName;
    else if(!d.attachmentName)d.attachmentName=sav2.dataset.id?
      (S.requests.find(x=>x.id===sav2.dataset.id)||{}).attachmentName||'':'';

    const eid=sav2.dataset.id;
    if(eid){const i=S.requests.findIndex(r=>r.id===eid);if(i!==-1)S.requests[i]={...S.requests[i],...d};}
    else{S.requests.push({id:uid(),createdAt:Date.now(),status:S.modal2.defStatus,...d});}
    save2();S.modal2.open=false;render();
  });

  // Delete P1
  const del1=r.querySelector('[data-action="del1"]');
  if(del1)del1.addEventListener('click',()=>{
    openConfirm('Deletar card','Essa ação é permanente e não pode ser desfeita. Deseja continuar?',()=>{
      S.cards=S.cards.filter(c=>c.id!==del1.dataset.id);
      save1();S.modal.open=false;render();
    });
  });

  // Delete P2
  const del2=r.querySelector('[data-action="del2"]');
  if(del2)del2.addEventListener('click',()=>{
    openConfirm('Deletar solicitação','Essa ação é permanente e não pode ser desfeita. Deseja continuar?',()=>{
      S.requests=S.requests.filter(r=>r.id!==del2.dataset.id);
      save2();S.modal2.open=false;render();
    });
  });

  // Quick status change (detail view)
  const chst2=r.querySelector('[data-action="change-status2"]');
  if(chst2)chst2.addEventListener('change',()=>{
    const req=S.requests.find(x=>x.id===chst2.dataset.id);
    if(req){req.status=chst2.value;save2();}
  });

  r.querySelectorAll('[data-action="toggle-resp2"]').forEach(el=>{
    const evtName=el.tagName==='INPUT'?'change':'click';
    el.addEventListener(evtName,()=>{
      const req=S.requests.find(x=>x.id===el.dataset.rid);
      if(!req)return;
      if(!req.responsible)req.responsible=[];
      if(el.dataset.remove==='1'){
        // remove button (× chip)
        req.responsible=req.responsible.filter(n=>n!==el.dataset.name);
        save2();render();
      } else {
        // checkbox from dropdown
        if(el.checked){if(!req.responsible.includes(el.dataset.name))req.responsible.push(el.dataset.name);}
        else{req.responsible=req.responsible.filter(n=>n!==el.dataset.name);}
        save2();render();
      }
    });
  });

  // AI modal — open
  const aiOpen=r.querySelector('[data-action="ai-open"]');
  if(aiOpen)aiOpen.addEventListener('click',()=>{AI={open:true,loading:false,error:'',preview:[],step:'input'};render();});

  // AI modal — close
  r.querySelectorAll('[data-action="ai-close"]').forEach(b=>b.addEventListener('click',()=>{AI.open=false;render();}));
  const aiOverlay=r.querySelector('#ai-overlay');
  if(aiOverlay)aiOverlay.addEventListener('click',e=>{if(e.target===aiOverlay){AI.open=false;render();}});

  // AI modal — back to input
  const aiBack=r.querySelector('[data-action="ai-back"]');
  if(aiBack)aiBack.addEventListener('click',()=>{AI.step='input';AI.error='';render();});

  // AI modal — process
  const aiProcessBtn=r.querySelector('#ai-process-btn');
  if(aiProcessBtn)aiProcessBtn.addEventListener('click',async()=>{
    const keyEl=document.getElementById('ai-apikey');
    const textEl=document.getElementById('ai-text');
    const apiKey=(keyEl?.value||'').trim();
    const text=(textEl?.value||'').trim();
    if(!apiKey){AI.error='Informe a chave de API Anthropic.';render();return;}
    if(!text){AI.error='Cole o conteúdo da estratégia no campo de texto.';render();return;}
    localStorage.setItem(KEY_APIKEY,apiKey);
    AI.loading=true;AI.error='';render();
    try{
      const cards=await callClaude(text,apiKey);
      if(!Array.isArray(cards)||cards.length===0)throw new Error('Nenhum card identificado. Tente detalhar mais o conteúdo.');
      AI.preview=cards;AI.step='preview';AI.loading=false;render();
    }catch(err){
      AI.loading=false;AI.error=err.message||'Erro ao processar. Verifique a chave e tente novamente.';render();
    }
  });

  // AI modal — import cards
  const aiImport=r.querySelector('[data-action="ai-import"]');
  if(aiImport)aiImport.addEventListener('click',()=>{
    const now=Date.now();
    AI.preview.forEach((c,i)=>{
      S.cards.push({
        id:uid(),
        createdAt:now+i,
        status:'ideas',
        title:c.title||'Sem título',
        project:c.project||'',
        contentType:c.contentType||'',
        funnel:c.funnel||'',
        channel:Array.isArray(c.channel)?c.channel:[],
        briefing:c.briefing||'',
        script:c.script||'',
        caption:c.caption||'',
        publishDate:c.publishDate||'',
        deliveryDate:c.deliveryDate||'',
        fileLink:'',
        fileCount:'',
        publishInstructions:c.publishInstructions||'',
        responsible:[],
      });
    });
    save1();
    S.pipe='content';
    AI={open:false,loading:false,error:'',preview:[],step:'input'};
    render();
  });

  // Avatar — próprio usuário (header)
  const avSelf=r.querySelector('[data-action="avatar-self"]');
  if(avSelf)avSelf.addEventListener('click',()=>{
    const inp=document.createElement('input');inp.type='file';inp.accept='image/*';
    inp.onchange=e=>{
      const f=e.target.files[0];if(!f)return;
      const rd=new FileReader();
      rd.onload=ev=>{
        const u=AUTH.users.find(x=>x.id===AUTH.session.id);
        if(u){u.avatar=ev.target.result;saveUsers();}
        AUTH.session.avatar=ev.target.result;
        saveSession(!!localStorage.getItem(KEY_SESSION));
        render();
      };
      rd.readAsDataURL(f);
    };
    inp.click();
  });

  // Avatar — usuário na tabela (admin)
  r.querySelectorAll('[data-action="avatar-user"]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const inp=document.createElement('input');inp.type='file';inp.accept='image/*';
      inp.onchange=e=>{
        const f=e.target.files[0];if(!f)return;
        const rd=new FileReader();
        rd.onload=ev=>{
          const u=AUTH.users.find(x=>x.id===btn.dataset.uid);
          if(u){u.avatar=ev.target.result;saveUsers();}
          if(AUTH.session&&AUTH.session.id===btn.dataset.uid){
            AUTH.session.avatar=ev.target.result;
            saveSession(!!localStorage.getItem(KEY_SESSION));
          }
          render();
        };
        rd.readAsDataURL(f);
      };
      inp.click();
    });
  });

  // Avatar — novo usuário (form preview, sem re-render)
  const newAvBtn=document.getElementById('new-av-btn');
  const newAvInput=document.getElementById('new-av-input');
  if(newAvBtn&&newAvInput){
    newAvBtn.addEventListener('click',()=>newAvInput.click());
    newAvInput.addEventListener('change',e=>{
      const f=e.target.files[0];if(!f)return;
      const rd=new FileReader();
      rd.onload=ev=>{
        _newUserAvatar=ev.target.result;
        const prev=document.getElementById('new-av-preview');
        if(prev)prev.innerHTML=`<img src="${_newUserAvatar}" style="width:52px;height:52px;border-radius:50%;object-fit:cover;display:block;">`;
      };
      rd.readAsDataURL(f);
    });
  }

  // Auth — logout
  const logoutBtn=r.querySelector('[data-action="logout"]');
  if(logoutBtn)logoutBtn.addEventListener('click',()=>doLogout());

  // Auth — open users modal
  const openUsers=r.querySelector('[data-action="open-users"]');
  if(openUsers)openUsers.addEventListener('click',()=>{AUTH.showUsersModal=true;render();});

  // Auth — close users modal
  const closeUsers=r.querySelector('[data-action="close-users"]');
  if(closeUsers)closeUsers.addEventListener('click',()=>{AUTH.showUsersModal=false;render();});

  // Diagnóstico
  const diagBtn=r.querySelector('[data-action="diag-users"]');
  if(diagBtn)diagBtn.addEventListener('click',()=>{
    const stored=localStorage.getItem(KEY_USERS);
    const info=AUTH.users.map(u=>`📧 ${u.email}\n   hash: ${u.pwd}\n   kami123 hash: ${hashPwd('kami123')}\n   match: ${u.pwd===hashPwd('kami123')?'✅ SIM':'❌ NÃO'}\n   access: ${JSON.stringify(u.access||[])}`).join('\n\n');
    const lsInfo=stored?`✅ localStorage OK (${stored.length} chars)`:`❌ localStorage VAZIO ou inacessível`;
    alert(`DIAGNÓSTICO\n\n${lsInfo}\n\nUsuários em memória:\n\n${info}`);
  });

  // Auth — delete user
  r.querySelectorAll('[data-action="del-user"]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      if(btn.disabled)return;
      const uid_del=btn.dataset.uid;
      openConfirm('Remover usuário','Essa ação é permanente e não pode ser desfeita. Deseja continuar?',()=>{
        AUTH.users=AUTH.users.filter(u=>u.id!==uid_del);
        saveUsers();render();
      });
    });
  });

  // Auth — add user form
  const addUserForm=document.getElementById('addUserForm');
  if(addUserForm){
    const pwdInput=document.getElementById('new-user-temp-pwd');
    if(pwdInput)pwdInput.value='kami123';

    addUserForm.addEventListener('submit',e=>{
      e.preventDefault();
      const errEl=document.getElementById('addUserErr');
      const name=addUserForm.querySelector('[name="uname"]').value.trim();
      const email=addUserForm.querySelector('[name="uemail"]').value.trim();
      const isAdminCheck=addUserForm.querySelector('[name="isAdmin"]')?.checked||false;
      const accessChecks=[...addUserForm.querySelectorAll('[name="access"]:checked')].map(cb=>cb.value);
      const role=isAdminCheck?'admin':'user';
      const access=isAdminCheck?[]:accessChecks;
      const tempPwd=document.getElementById('new-user-temp-pwd')?.value||genTempPwd();
      const dept=(addUserForm.querySelector('[name="udept"]')?.value||'').trim();
      const pos=(addUserForm.querySelector('[name="upos"]')?.value||'').trim();
      const sup=(addUserForm.querySelector('[name="usup"]')?.value||'').trim();
      if(AUTH.users.find(u=>u.email.toLowerCase()===email.toLowerCase())){
        errEl.textContent='Este e-mail já está cadastrado.';errEl.classList.remove('hide');return;
      }
      const newUser={id:uid(),email,name,role,access,pwd:hashPwd(tempPwd),avatar:_newUserAvatar||'',mustChangePassword:true,department:dept,position:pos,supervisor:sup,birthdate:'',workPhone:'',mobilePhone:'',city:''};
      AUTH.users.push(newUser);
      _newUserAvatar='';
      saveUsers();
      errEl.classList.add('hide');
      const credsDiv=document.getElementById('new-user-creds-copy');
      const credsText=document.getElementById('new-user-creds-text');
      const accessLabel=isAdminCheck?'Administrador (acesso total)':accessChecks.map(a=>({'dash':'Dashboard','content':'Conteúdo','requests':'Solicitações','social':'Social','portal-geral':'Portal Geral','portal-rep-br':'Representante BR','portal-rep-pt':'Representante PT'})[a]||a).join(' · ')||'Sem acessos';
      const credsStr=`Olá, ${name}!\n\nSeu acesso à plataforma KAMI MKT foi criado.\n\n📧 E-mail: ${email}\n🔑 Senha temporária: ${tempPwd}\n🔐 Acessos: ${accessLabel}\n\nNo primeiro acesso você será solicitado a criar uma nova senha.`;
      if(credsText)credsText.textContent=credsStr;
      if(credsDiv)credsDiv.style.display='block';
      const copyBtn=document.getElementById('copy-creds-btn');
      if(copyBtn)copyBtn.addEventListener('click',()=>{
        navigator.clipboard?.writeText(credsStr).then(()=>{copyBtn.textContent='✅ Copiado!';setTimeout(()=>copyBtn.textContent='📋 Copiar',2000);});
      });
      addUserForm.reset();
      refreshTempPwd();
    });

    const adminCb=addUserForm.querySelector('[name="isAdmin"]');
    if(adminCb)adminCb.addEventListener('change',()=>{
      const grid=document.getElementById('access-grid');
      if(grid)grid.style.opacity=adminCb.checked?'.4':'1';
      addUserForm.querySelectorAll('[name="access"]').forEach(cb=>cb.disabled=adminCb.checked);
    });
  }

  // Social pipe
  r.querySelectorAll('[data-soc-view]').forEach(b=>b.addEventListener('click',()=>{S.social_view=b.dataset.socView;render();}));

  // Profile selector
  r.querySelectorAll('[data-action="soc-sel-acc"]').forEach(btn=>btn.addEventListener('click',()=>{
    S.social_selected_acc=btn.dataset.acc||null;
    S.social_show_profiles=false;
    render();
  }));

  // Open/close profiles panel
  const socOpenProfiles=r.querySelector('[data-action="soc-open-profiles"]');
  if(socOpenProfiles)socOpenProfiles.addEventListener('click',()=>{S.social_show_profiles=true;render();});
  const socCloseProfiles=r.querySelector('[data-action="soc-close-profiles"]');
  if(socCloseProfiles)socCloseProfiles.addEventListener('click',()=>{S.social_show_profiles=false;render();});
  const socProfilesOverlay=r.querySelector('#soc-profiles-overlay');
  if(socProfilesOverlay)socProfilesOverlay.addEventListener('click',e=>{if(e.target===socProfilesOverlay){S.social_show_profiles=false;render();}});

  // Profile search
  const socProfileSearch=r.querySelector('#soc-profile-search');
  if(socProfileSearch)socProfileSearch.addEventListener('input',e=>{S.social_profile_search=e.target.value;render();});

  // Connect account
  r.querySelectorAll('[data-action="soc-connect"]').forEach(btn=>btn.addEventListener('click',()=>{S.modal_soc={open:true,platform:btn.dataset.plat};render();}));

  // Disconnect account
  r.querySelectorAll('[data-action="soc-disconnect"]').forEach(btn=>btn.addEventListener('click',()=>{
    const aid=btn.dataset.aid;
    openConfirm('Desconectar conta','A conta será desvinculada da pipeline. Deseja continuar?',()=>{
      S.social_accounts=S.social_accounts.filter(a=>a.id!==aid);
      save_soc_acc();render();
    });
  }));

  // Close connect modal
  r.querySelectorAll('[data-action="soc-close-modal"]').forEach(b=>b.addEventListener('click',()=>{S.modal_soc={open:false,platform:null};render();}));

  // Save connected account
  const socSaveAcc=r.querySelector('[data-action="soc-save-acc"]');
  if(socSaveAcc)socSaveAcc.addEventListener('click',()=>{
    const name=(document.getElementById('soc-acc-name')?.value||'').trim();
    if(!name){alert('Nome da conta é obrigatório.');return;}
    const handle=(document.getElementById('soc-acc-handle')?.value||'').trim();
    const followers=document.getElementById('soc-acc-followers')?.value||'';
    const engagement=document.getElementById('soc-acc-engagement')?.value||'';
    S.social_accounts.push({id:uid(),platform:socSaveAcc.dataset.plat,accountName:name,handle,followers:followers?Number(followers):0,engagement:engagement?Number(engagement):0,connected:true});
    save_soc_acc();S.modal_soc={open:false,platform:null};render();
  });

  // Schedule form fields
  r.querySelectorAll('[data-sf]').forEach(el=>{
    const key=el.dataset.sf;
    if(el.type==='checkbox'){
      el.addEventListener('change',()=>{
        if(!Array.isArray(S.schedule_form[key]))S.schedule_form[key]=[];
        if(el.checked){if(!S.schedule_form[key].includes(el.value))S.schedule_form[key].push(el.value);}
        else{S.schedule_form[key]=S.schedule_form[key].filter(v=>v!==el.value);}
        const pvt=document.getElementById('soc-preview-text');
        if(pvt)pvt.innerHTML=S.schedule_form.text||'<span style="color:var(--t3)">Sua legenda aparecerá aqui...</span>';
      });
    } else {
      el.addEventListener('input',()=>{
        S.schedule_form[key]=el.value;
        if(key==='text'){const pvt=document.getElementById('soc-preview-text');if(pvt)pvt.innerHTML=el.value||'<span style="color:var(--t3)">Sua legenda aparecerá aqui...</span>';}
      });
    }
  });

  // Media file
  const socMediaFile=document.getElementById('soc-media-file');
  if(socMediaFile)socMediaFile.addEventListener('change',e=>{if(e.target.files[0])S.schedule_form.mediaName=e.target.files[0].name;});

  // Clear schedule form
  const socClear=r.querySelector('[data-action="soc-clear-form"]');
  if(socClear)socClear.addEventListener('click',()=>{S.schedule_form={profiles:[],channels:[],text:'',hashtags:'',mediaName:'',date:'',time:'18:00',postStatus:'draft',contentTypes:{},firstComment:'',tags:'',igFormat:'Feed',altText:'',location:'',shareToFacebook:false,collabUser:''};S.soc_adv_open=false;render();});

  // Toggle advanced settings
  const socAdvBtn=r.querySelector('[data-action="soc-toggle-adv"]');
  if(socAdvBtn)socAdvBtn.addEventListener('click',()=>{S.soc_adv_open=!S.soc_adv_open;render();});

  // igFormat buttons inside advanced panel
  r.querySelectorAll('[data-sf="igFormat"][data-val]').forEach(btn=>btn.addEventListener('click',()=>{
    S.schedule_form.igFormat=btn.dataset.val;render();
  }));

  // Advanced settings fields — generic binding
  ['firstComment','collabUser','paidPartnership','shopTag','location','peopleTags','altText','storyLink'].forEach(field=>{
    const el=r.querySelector(`[data-sf="${field}"]`);
    if(el)el.addEventListener('input',()=>S.schedule_form[field]=el.value);
  });
  ['disableComments','shareToFacebook','shareToFeed','isTest'].forEach(field=>{
    const el=r.querySelector(`[data-sf="${field}"]`);
    if(el)el.addEventListener('change',()=>{S.schedule_form[field]=el.checked;render();});
  });

  // Save post
  const socSavePost=r.querySelector('[data-action="soc-save-post"]');
  if(socSavePost)socSavePost.addEventListener('click',()=>{
    const f=S.schedule_form;
    if(!f.text?.trim()&&!f.mediaName){alert('Adicione um texto ou mídia ao post.');return;}
    if(f.postStatus==='scheduled'&&!f.date){alert('Informe a data de publicação.');return;}
    S.social_posts.push({
      id:uid(),
      profiles:[...(f.profiles||[])],
      channels:[...(f.channels||[])],
      text:f.text||'',
      hashtags:f.hashtags||'',
      mediaName:f.mediaName||'',
      scheduledAt:f.date&&f.time?`${f.date}T${f.time}`:f.date||'',
      status:f.postStatus||'draft',
      contentTypes:{...(f.contentTypes||{})},
      firstComment:f.firstComment||'',
      createdAt:Date.now(),
    });
    save_soc_post();
    S.schedule_form={profiles:[],channels:[],text:'',hashtags:'',mediaName:'',date:'',time:'18:00',postStatus:'draft',contentTypes:{},firstComment:'',tags:''};
    render();
  });

  // Competitors
  const socAddComp=r.querySelector('[data-action="soc-add-comp"]');
  if(socAddComp)socAddComp.addEventListener('click',()=>{
    const wrap=document.getElementById('soc-comp-form-wrap');
    if(wrap)wrap.style.display=wrap.style.display==='none'?'block':'none';
  });
  const socCancelComp=r.querySelector('[data-action="soc-cancel-comp"]');
  if(socCancelComp)socCancelComp.addEventListener('click',()=>{
    const wrap=document.getElementById('soc-comp-form-wrap');if(wrap)wrap.style.display='none';
  });
  const socSaveComp=r.querySelector('[data-action="soc-save-comp"]');
  if(socSaveComp)socSaveComp.addEventListener('click',()=>{
    const name=(document.getElementById('comp-name')?.value||'').trim();
    if(!name){alert('Nome é obrigatório.');return;}
    if(!S.social_competitors)S.social_competitors=[];
    S.social_competitors.push({
      id:uid(),
      name,
      handle:(document.getElementById('comp-handle')?.value||'').trim(),
      platform:document.getElementById('comp-plat')?.value||'instagram',
      followers:Number(document.getElementById('comp-followers')?.value||0),
      engagement:Number(document.getElementById('comp-engagement')?.value||0),
      postsPerWeek:Number(document.getElementById('comp-ppw')?.value||0),
      notes:(document.getElementById('comp-notes')?.value||'').trim(),
      createdAt:Date.now(),
    });
    save_soc_comp();
    const wrap=document.getElementById('soc-comp-form-wrap');if(wrap)wrap.style.display='none';
    render();
  });
  r.querySelectorAll('[data-action="soc-del-comp"]').forEach(btn=>btn.addEventListener('click',()=>{
    const cid=btn.dataset.cid;
    openConfirm('Remover concorrente','O perfil será removido da análise. Deseja continuar?',()=>{
      S.social_competitors=(S.social_competitors||[]).filter(c=>c.id!==cid);
      save_soc_comp();render();
    });
  }));

  // Content type radio buttons
  r.querySelectorAll('[data-sf-ct]').forEach(el=>{
    el.addEventListener('change',()=>{
      if(!S.schedule_form.contentTypes)S.schedule_form.contentTypes={};
      S.schedule_form.contentTypes[el.dataset.sfCt]=el.value;
    });
  });

  // Delete post
  r.querySelectorAll('[data-action="soc-del-post"]').forEach(btn=>btn.addEventListener('click',e=>{
    e.stopPropagation();
    S.social_posts=S.social_posts.filter(p=>p.id!==btn.dataset.pid);
    save_soc_post();render();
  }));

  // Calendar nav
  const calPrev=r.querySelector('[data-action="soc-cal-prev"]');
  if(calPrev)calPrev.addEventListener('click',()=>{
    const ym=S.social_cal_date||{year:new Date().getFullYear(),month:new Date().getMonth()};
    let m=ym.month-1,y=ym.year;if(m<0){m=11;y--;}
    S.social_cal_date={year:y,month:m};render();
  });
  const calNext=r.querySelector('[data-action="soc-cal-next"]');
  if(calNext)calNext.addEventListener('click',()=>{
    const ym=S.social_cal_date||{year:new Date().getFullYear(),month:new Date().getMonth()};
    let m=ym.month+1,y=ym.year;if(m>11){m=0;y++;}
    S.social_cal_date={year:y,month:m};render();
  });
  const calToday=r.querySelector('[data-action="soc-cal-today"]');
  if(calToday)calToday.addEventListener('click',()=>{S.social_cal_date=null;render();});

  // AI caption
  const socAiCaption=r.querySelector('[data-action="soc-ai-caption"]');
  if(socAiCaption)socAiCaption.addEventListener('click',()=>{
    const topic=prompt('Sobre o que é esse post? (tema, produto, objetivo)');
    if(!topic)return;
    const suggestions=[
      `✨ ${topic} — porque cada detalhe importa. Qual é o seu favorito? 👇`,
      `Tudo começa com uma boa ideia. Hoje a gente fala sobre ${topic}. 💡`,
      `${topic}: isso muda o jogo. Salva esse post! 🔖`,
    ];
    S.schedule_form.text=suggestions[Math.floor(Math.random()*suggestions.length)];
    render();
  });

  // Confirm modal
  const confirmOk=r.querySelector('[data-action="confirm-ok"]');
  if(confirmOk)confirmOk.addEventListener('click',()=>{
    S.confirm={open:false,title:'',message:''};
    const cb=_confirmCallback;_confirmCallback=null;
    if(cb)cb();
  });
  r.querySelectorAll('[data-action="confirm-cancel"]').forEach(b=>b.addEventListener('click',()=>{
    _confirmCallback=null;S.confirm={open:false,title:'',message:''};render();
  }));
  const confirmOverlay=r.querySelector('#confirm-overlay');
  if(confirmOverlay)confirmOverlay.addEventListener('click',e=>{
    if(e.target===confirmOverlay){_confirmCallback=null;S.confirm={open:false,title:'',message:''};render();}
  });

  // portalAddLinkRow — global helper for adding link rows in edit mode
  // Sync edit form values into state without saving (used before drag reorder)
function syncPortalFormToState(){
  const pc=S.portal_content||{portals:[]};
  const pidx=pc.portals.findIndex(p=>p.id===S.portal_editing_id);
  if(pidx<0)return;
  const p=pc.portals[pidx];
  if(p.sections&&p.sections.length){
    p.sections.forEach((sec,si)=>{
      const secTitleEl=document.querySelector(`.pe-sec-title[data-si="${si}"]`);
      if(secTitleEl)sec.title=secTitleEl.value;
      // logo is saved directly on file change, no DOM read needed
      (sec.items||[]).forEach((item,ii)=>{
        const iconEl=document.querySelector(`.pe-sec-item-icon[data-si="${si}"][data-ii="${ii}"]`);
        const titleEl=document.querySelector(`.pe-sec-item-title[data-si="${si}"][data-ii="${ii}"]`);
        const descEl=document.querySelector(`.pe-sec-item-desc[data-si="${si}"][data-ii="${ii}"]`);
        const colorEl=document.querySelector(`.pe-sec-item-color[data-si="${si}"][data-ii="${ii}"]`);
        if(iconEl)item.icon=iconEl.value;
        if(titleEl)item.title=titleEl.value;
        if(descEl)item.desc=descEl.value;
        if(colorEl)item.color=colorEl.value;
        const labels=document.querySelectorAll(`.pe-sec-link-label[data-si="${si}"][data-ii="${ii}"]`);
        const urls=document.querySelectorAll(`.pe-sec-link-url[data-si="${si}"][data-ii="${ii}"]`);
        item.links=[];
        labels.forEach((_,li)=>{if(urls[li]?.value)item.links.push({label:labels[li].value,url:urls[li].value});});
      });
    });
  } else {
    (p.items||[]).forEach((item,ii)=>{
      const iconEl=document.querySelector(`.pe-item-icon[data-ii="${ii}"]`);
      const titleEl=document.querySelector(`.pe-item-title[data-ii="${ii}"]`);
      const descEl=document.querySelector(`.pe-item-desc[data-ii="${ii}"]`);
      const colorEl=document.querySelector(`.pe-item-color[data-ii="${ii}"]`);
      if(iconEl)item.icon=iconEl.value;
      if(titleEl)item.title=titleEl.value;
      if(descEl)item.desc=descEl.value;
      if(colorEl)item.color=colorEl.value;
      const labels=document.querySelectorAll(`.pe-item-link-label[data-ii="${ii}"]`);
      const urls=document.querySelectorAll(`.pe-item-link-url[data-ii="${ii}"]`);
      item.links=[];
      labels.forEach((_,li)=>{if(urls[li]?.value)item.links.push({label:labels[li].value,url:urls[li].value});});
    });
  }
}

window.pimReplicateLink = function(btn){
  const row=btn.closest('[data-link-idx]');
  if(!row)return;
  const label=row.querySelector('.pim-link-label')?.value||'';
  const url=row.querySelector('.pim-link-url')?.value||'';
  if(!url){alert('Preencha a URL antes de replicar.');return;}

  // Remove any existing picker
  document.querySelectorAll('.pim-replicate-picker').forEach(el=>el.remove());

  const m=S.portal_item_modal;
  const pc=S.portal_content||{portals:[]};
  const otherPortals=(pc.portals||[]).filter(p=>p.id!==m.portalId&&!p.hidden);

  // Build picker popup
  const picker=document.createElement('div');
  picker.className='pim-replicate-picker';
  picker.style.cssText='position:absolute;background:var(--s1);border:1px solid var(--b);border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,.15);z-index:10000;min-width:220px;padding:12px;margin-top:4px;';
  picker.innerHTML=`
    <div style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.4px;margin-bottom:8px;">Replicar para:</div>
    ${otherPortals.map(p=>`<label style="display:flex;align-items:center;gap:8px;padding:6px 0;cursor:pointer;border-bottom:1px solid var(--b);">
      <input type="checkbox" class="pim-rep-check" data-pid="${p.id}" checked style="accent-color:var(--ac);cursor:pointer;">
      <span style="font-size:12px;color:var(--t1);">${esc(p.name)}${p.badge?` <span style="font-size:10px;color:var(--t3);">${esc(p.badge)}</span>`:''}</span>
    </label>`).join('')}
    <div style="display:flex;gap:6px;margin-top:10px;">
      <button onclick="this.closest('.pim-replicate-picker').remove()" style="flex:1;background:var(--s2);border:1px solid var(--b);border-radius:6px;color:var(--t2);cursor:pointer;padding:6px;font-size:11px;font-family:inherit;">Cancelar</button>
      <button id="pim-rep-confirm" style="flex:2;background:var(--ac);color:#fff;border:none;border-radius:6px;cursor:pointer;padding:6px;font-size:11px;font-weight:700;font-family:inherit;">Replicar →</button>
    </div>`;

  // Position below the button
  btn.parentElement.style.position='relative';
  btn.parentElement.appendChild(picker);

  picker.querySelector('#pim-rep-confirm').addEventListener('click',()=>{
    const selectedIds=[...picker.querySelectorAll('.pim-rep-check:checked')].map(cb=>cb.dataset.pid);
    if(!selectedIds.length){picker.remove();return;}
    const sourceItem=m.secId
      ?((pc.portals.find(p=>p.id===m.portalId)?.sections?.find(s=>s.id===m.secId)?.items||[])[m.itemIdx])
      :((pc.portals.find(p=>p.id===m.portalId)?.items||[])[m.itemIdx]);
    const syncId=sourceItem?.syncId;
    const link={label,url};
    const sourceTitle=sourceItem?.title||'';
    let count=0;
    pc.portals.filter(p=>selectedIds.includes(p.id)).forEach(p=>{
      const addLink=(items)=>{
        items.forEach(it=>{
          // match by syncId OR by title (fallback)
          const matches=(syncId&&it.syncId===syncId)||(sourceTitle&&it.title===sourceTitle);
          if(matches){
            if(!it.links)it.links=[];
            const existing=it.links.findIndex(l=>l.label===label);
            if(existing>=0)it.links[existing]=link;else it.links.push(link);
            count++;
          }
        });
      };
      (p.sections||[]).forEach(sec=>addLink(sec.items||[]));
      addLink(p.items||[]);
    });
    picker.remove();
    if(count>0){
      save_portal();
      btn.textContent='✅';btn.style.color='#166634';
      setTimeout(()=>{btn.textContent='↗';btn.style.color='';},2000);
    } else {
      alert(`Nenhum item chamado "${sourceTitle}" encontrado nas centrais selecionadas.\n\nCrie um item com o mesmo nome nas outras centrais primeiro.`);
    }
  });

  // Close on outside click
  setTimeout(()=>{
    document.addEventListener('click',function h(e){
      if(!picker.contains(e.target)&&e.target!==btn){picker.remove();document.removeEventListener('click',h);}
    });
  },10);
};

window.portalAddLinkRow = function(containerId, si, ii) {
    const container = document.getElementById(containerId);
    if(!container) return;
    const li = container.children.length;
    const div = document.createElement('div');
    div.style.cssText = 'display:flex;gap:5px;align-items:center;';
    div.setAttribute('data-li', li);
    const inputStyle = 'background:var(--s2);border:1px solid var(--b);border-radius:6px;color:var(--t1);padding:6px 10px;font-size:12px;font-family:inherit;outline:none;';
    const secClass = si !== null ? 'pe-sec-link' : 'pe-item-link';
    const siAttr = si !== null ? ` data-si="${si}"` : '';
    div.innerHTML = `
      <input class="${secClass}-label"${siAttr} data-ii="${ii}" data-li="${li}" placeholder="Label" style="flex:1;${inputStyle}">
      <input class="${secClass}-url"${siAttr} data-ii="${ii}" data-li="${li}" placeholder="https://..." style="flex:2;${inputStyle}">
      <button type="button" onclick="this.closest('[data-li]').remove()" style="background:none;border:1px solid var(--b);border-radius:5px;color:var(--t3);cursor:pointer;padding:5px 9px;flex-shrink:0;">✕</button>`;
    container.appendChild(div);
  };

  // Portal drag-and-drop reorder
  let _pdragSi=null, _pdragIi=null;
  r.querySelectorAll('.portal-edit-card[draggable]').forEach(card=>{
    card.addEventListener('dragstart',e=>{
      _pdragSi=card.dataset.si!==undefined?parseInt(card.dataset.si):null;
      _pdragIi=parseInt(card.dataset.ii);
      card.classList.add('pdragging');
      e.dataTransfer.effectAllowed='move';
      e.stopPropagation();
    });
    card.addEventListener('dragend',()=>{
      card.classList.remove('pdragging');
      r.querySelectorAll('.portal-edit-card').forEach(c=>c.classList.remove('pdrag-over'));
    });
    card.addEventListener('dragover',e=>{
      e.preventDefault();e.stopPropagation();
      card.classList.add('pdrag-over');
    });
    card.addEventListener('dragleave',()=>card.classList.remove('pdrag-over'));
    card.addEventListener('drop',e=>{
      e.preventDefault();e.stopPropagation();
      card.classList.remove('pdrag-over');
      const tSi=card.dataset.si!==undefined?parseInt(card.dataset.si):null;
      const tIi=parseInt(card.dataset.ii);
      if(_pdragIi===tIi&&_pdragSi===tSi)return;
      // sync form → state before reordering
      syncPortalFormToState();
      const p=(S.portal_content?.portals||[]).find(x=>x.id===S.portal_editing_id);
      if(!p)return;
      let arr=null;
      if(tSi!==null&&_pdragSi===tSi) arr=p.sections[tSi]?.items;
      else if(tSi===null&&_pdragSi===null) arr=p.items;
      if(arr){const[moved]=arr.splice(_pdragIi,1);arr.splice(tIi,0,moved);}
      _pdragSi=null;_pdragIi=null;
      render();
    });
  });

  // Portal duplicate modal
  r.querySelectorAll('[data-action="close-portal-dup"]').forEach(b=>b.addEventListener('click',()=>{S.portal_dup_modal={open:false,item:null,sourcePortalId:null,sourceSecId:null};render();}));
  const dupOverlay=r.querySelector('#portal-dup-overlay');
  if(dupOverlay)dupOverlay.addEventListener('click',e=>{if(e.target===dupOverlay){S.portal_dup_modal={open:false,item:null,sourcePortalId:null,sourceSecId:null};render();}});
  // Show section selector when portal is checked
  r.querySelectorAll('.dup-portal-check').forEach(cb=>cb.addEventListener('change',()=>{
    const sel=r.querySelector(`.dup-sec-sel[data-pid="${cb.dataset.pid}"]`);
    if(sel)sel.style.display=cb.checked?'block':'none';
  }));
  const dupConfirm=r.querySelector('[data-action="confirm-portal-dup"]');
  if(dupConfirm)dupConfirm.addEventListener('click',()=>{
    const dm=S.portal_dup_modal;
    const pc=S.portal_content||{portals:[]};
    const checked=[...r.querySelectorAll('.dup-portal-check:checked')];
    if(!checked.length){S.portal_dup_modal={open:false,item:null,sourcePortalId:null,sourceSecId:null};render();return;}
    if(dm.isEdit){
      // SYNC MODE: title/desc/color always synced; links selective per portal
      const allLinks=dm.item.links||[];
      checked.forEach(cb=>{
        const pid=cb.dataset.pid;
        const p=pc.portals.find(x=>x.id===pid);
        if(!p)return;
        // Build links for this portal based on per-link checkboxes
        const portalLinks=allLinks.filter((_,li)=>{
          const cb2=r.querySelector(`.dup-link-check[data-li="${li}"][data-pid="${pid}"]`);
          return !cb2||cb2.checked; // include if checked (or no checkbox found)
        });
        const syncFields={title:dm.item.title,desc:dm.item.desc,color:dm.item.color,links:portalLinks};
        let found=false;
        const updateItems=(items)=>{
          items.forEach((it,idx)=>{
            if(it.title===dm.item.title||(dm.item.syncId&&it.syncId===dm.item.syncId)){
              items[idx]={...it,...syncFields,syncId:dm.item.syncId||it.syncId};
              found=true;
            }
          });
        };
        (p.sections||[]).forEach(sec=>updateItems(sec.items||[]));
        updateItems(p.items||[]);
        if(!found){
          const newItem={...dm.item,links:portalLinks};
          (p.items=p.items||[]).push(newItem);
        }
      });
    } else {
      // DUPLICATE MODE
      checked.forEach(cb=>{
        const pid=cb.dataset.pid;
        const p=pc.portals.find(x=>x.id===pid);
        if(!p)return;
        const secId=r.querySelector(`.dup-sec-select[data-pid="${pid}"]`)?.value||null;
        const newItem={...dm.item,syncId:dm.item.syncId||null};
        if(secId){const sec=p.sections?.find(s=>s.id===secId);if(sec){if(!sec.items)sec.items=[];sec.items.push(newItem);}}
        else{if(!p.items)p.items=[];p.items.push(newItem);}
      });
    }
    save_portal();
    S.portal_dup_modal={open:false,item:null,sourcePortalId:null,sourceSecId:null};
    render();
  });

  // Portal legend modal
  r.querySelectorAll('[data-action="portal-legend-edit"]').forEach(btn=>btn.addEventListener('click',e=>{
    e.stopPropagation();
    S.portal_legend_modal={open:true,portalId:btn.dataset.pid};render();
  }));
  r.querySelectorAll('[data-action="close-portal-legend"]').forEach(b=>b.addEventListener('click',()=>{S.portal_legend_modal={open:false,portalId:null};render();}));
  const legendOverlay=r.querySelector('#portal-legend-overlay');
  if(legendOverlay)legendOverlay.addEventListener('click',e=>{if(e.target===legendOverlay){S.portal_legend_modal={open:false,portalId:null};render();}});
  const legendAddBtn=r.querySelector('#legend-add-btn');
  if(legendAddBtn)legendAddBtn.addEventListener('click',()=>{
    const container=document.getElementById('legend-items');
    if(!container)return;
    const div=document.createElement('div');
    div.style.cssText='display:flex;gap:8px;align-items:center;';
    div.innerHTML=`<input type="color" class="legend-color" value="#c8192b" style="width:36px;height:36px;border:1px solid var(--b);border-radius:6px;cursor:pointer;background:var(--s2);flex-shrink:0;"><input type="text" class="legend-label" placeholder="Ex: Excel, Canva..." style="flex:1;background:var(--s2);border:1px solid var(--b);border-radius:6px;color:var(--t1);padding:7px 10px;font-size:12px;font-family:inherit;outline:none;"><button type="button" onclick="this.closest('div').remove()" style="background:none;border:1px solid var(--b);border-radius:5px;color:var(--t3);cursor:pointer;padding:5px 8px;flex-shrink:0;">✕</button>`;
    container.appendChild(div);
  });
  function readCurrentLegend(){
    const colors=[...document.querySelectorAll('.legend-color')].map(el=>el.value);
    const labels=[...document.querySelectorAll('.legend-label')].map(el=>el.value.trim());
    return colors.map((c,i)=>({color:c,label:labels[i]||''})).filter(l=>l.label);
  }

  const saveLegend=r.querySelector('[data-action="save-portal-legend"]');
  if(saveLegend)saveLegend.addEventListener('click',()=>{
    const pc=S.portal_content||{portals:[]};
    const portal=pc.portals.find(p=>p.id===S.portal_legend_modal.portalId);
    if(!portal)return;
    portal.legend=readCurrentLegend();
    save_portal();S.portal_legend_modal={open:false,portalId:null};render();
  });

  const replicateLegend=r.querySelector('[data-action="replicate-portal-legend"]');
  if(replicateLegend)replicateLegend.addEventListener('click',()=>{
    const pc=S.portal_content||{portals:[]};
    const legend=readCurrentLegend();
    if(!legend.length){alert('Adicione pelo menos uma cor antes de replicar.');return;}
    pc.portals.forEach(p=>{p.legend=[...legend.map(l=>({...l}))];});
    save_portal();
    replicateLegend.textContent='✅ Replicado!';
    replicateLegend.style.color='#166534';
    setTimeout(()=>{replicateLegend.textContent='↗ Replicar para todas';replicateLegend.style.color='';},2000);
  });

  // Portal item inline edit modal
  r.querySelectorAll('[data-action="pim-open"]').forEach(btn=>btn.addEventListener('click',e=>{
    e.stopPropagation();
    const ii=btn.dataset.ii===''?null:parseInt(btn.dataset.ii);
    S.portal_item_modal={open:true,portalId:btn.dataset.pid,secId:btn.dataset.sid||null,itemIdx:isNaN(ii)?null:ii};
    render();
  }));
  r.querySelectorAll('[data-action="close-portal-item-modal"]').forEach(b=>b.addEventListener('click',()=>{S.portal_item_modal={open:false,portalId:null,secId:null,itemIdx:null};render();}));
  const pimOverlay=r.querySelector('#portal-item-overlay');
  if(pimOverlay)pimOverlay.addEventListener('click',e=>{if(e.target===pimOverlay){S.portal_item_modal={open:false,portalId:null,secId:null,itemIdx:null};render();}});

  const pimSave=r.querySelector('[data-action="portal-item-save"]');
  if(pimSave)pimSave.addEventListener('click',()=>{
    const m=S.portal_item_modal;
    const pc=S.portal_content||{portals:[]};
    const portal=pc.portals.find(p=>p.id===m.portalId);
    if(!portal)return;
    const title=(document.getElementById('pim-title')?.value||'').trim();
    if(!title){alert('Título é obrigatório.');return;}
    const icon=document.getElementById('pim-icon-hidden')?.value||'🔗';
    const desc=(document.getElementById('pim-desc')?.value||'').trim();
    const color=document.getElementById('pim-color')?.value||portal.color||'#c8192b';
    const labels=[...document.querySelectorAll('.pim-link-label')].map(el=>el.value);
    const urls=[...document.querySelectorAll('.pim-link-url')].map(el=>el.value);
    const links=labels.map((l,i)=>({label:l,url:urls[i]||''})).filter(lk=>lk.url);
    const wantSync=document.getElementById('pim-sync')?.checked||false;
    // Generate or keep syncId
    const existingItem=m.secId
      ?(portal.sections?.find(s=>s.id===m.secId)?.items?.[m.itemIdx])
      :(portal.items?.[m.itemIdx]);
    const syncId=wantSync?(existingItem?.syncId||uid()):null;
    const item={icon,title,desc,color,links,syncId};
    const isNew=m.itemIdx===null||m.itemIdx===undefined;
    if(m.secId){
      const sec=portal.sections?.find(s=>s.id===m.secId);
      if(sec){if(!sec.items)sec.items=[];if(isNew)sec.items.push(item);else sec.items[m.itemIdx]=item;}
    } else {
      if(!portal.items)portal.items=[];if(isNew)portal.items.push(item);else portal.items[m.itemIdx]=item;
    }
    // Sync to all other portals if syncId exists
    if(syncId){
      pc.portals.forEach(p=>{
        if(p.id===m.portalId)return; // skip source portal
        // update in sections
        (p.sections||[]).forEach(sec=>{
          (sec.items||[]).forEach((it,i)=>{
            if(it.syncId===syncId){sec.items[i]={...item,syncId};}
          });
        });
        // update in flat items
        (p.items||[]).forEach((it,i)=>{
          if(it.syncId===syncId){p.items[i]={...item,syncId};}
        });
      });
    }
    save_portal();
    S.portal_item_modal={open:false,portalId:null,secId:null,itemIdx:null};
    // Ask to duplicate (new) or sync (edit)
    S.portal_dup_modal={open:true,item:{...item},sourcePortalId:m.portalId,sourceSecId:m.secId||null,isEdit:!isNew};
    render();
  });

  const pimDelete=r.querySelector('[data-action="portal-item-delete"]');
  if(pimDelete)pimDelete.addEventListener('click',()=>{
    const m=S.portal_item_modal;
    const pc=S.portal_content||{portals:[]};
    const portal=pc.portals.find(p=>p.id===m.portalId);
    if(!portal)return;
    openConfirm('Deletar item','Este item será removido permanentemente.',()=>{
      if(m.secId){const sec=portal.sections?.find(s=>s.id===m.secId);if(sec)sec.items.splice(m.itemIdx,1);}
      else{portal.items.splice(m.itemIdx,1);}
      save_portal();S.portal_item_modal={open:false,portalId:null,secId:null,itemIdx:null};render();
    });
  });

  // Brand sidebar navigation
  r.querySelectorAll('[data-action="marcas-brand"]').forEach(btn=>btn.addEventListener('click',()=>{
    S.marcas_active_brand=btn.dataset.bid;render();
  }));

  // Portal navigation
  r.querySelectorAll('[data-action="portal-open"]').forEach(el=>el.addEventListener('click',()=>{
    S.portal_current=el.dataset.pid;S.marcas_active_brand=null;render();
  }));
  const portalBack=r.querySelector('[data-action="portal-back"]');
  if(portalBack)portalBack.addEventListener('click',()=>{S.portal_current=null;render();});

  // Portal edit
  r.querySelectorAll('[data-action="portal-edit"]').forEach(btn=>btn.addEventListener('click',(e)=>{
    e.stopPropagation();
    S.portal_editing_id=btn.dataset.pid;render();
  }));
  const portalCancelEdit=r.querySelector('[data-action="portal-cancel-edit"]');
  if(portalCancelEdit)portalCancelEdit.addEventListener('click',()=>{S.portal_editing_id=null;render();});

  // Portal save edit
  const portalSave=r.querySelector('[data-action="portal-save-edit"]');
  if(portalSave)portalSave.addEventListener('click',()=>{
    const pc=S.portal_content||{portals:[]};
    const pidx=pc.portals.findIndex(p=>p.id===S.portal_editing_id);
    if(pidx<0){S.portal_editing_id=null;render();return;}
    const p=pc.portals[pidx];
    if(p.sections&&p.sections.length){
      // read sectioned items
      p.sections.forEach((sec,si)=>{
        // read section title
        const secTitleInput=document.querySelector(`.pe-sec-title[data-si="${si}"]`);
        if(secTitleInput)sec.title=secTitleInput.value||sec.title;
        const icons=document.querySelectorAll(`.pe-sec-item-icon[data-si="${si}"]`);
        const titles=document.querySelectorAll(`.pe-sec-item-title[data-si="${si}"]`);
        const descs=document.querySelectorAll(`.pe-sec-item-desc[data-si="${si}"]`);
        const colors=document.querySelectorAll(`.pe-sec-item-color[data-si="${si}"]`);
        sec.items=[];
        icons.forEach((_,ii)=>{
          const labelInputs=document.querySelectorAll(`.pe-sec-link-label[data-si="${si}"][data-ii="${ii}"]`);
          const urlInputs=document.querySelectorAll(`.pe-sec-link-url[data-si="${si}"][data-ii="${ii}"]`);
          const links=[];
          labelInputs.forEach((_,li)=>{const u=urlInputs[li]?.value||'';if(u)links.push({label:labelInputs[li]?.value||'',url:u});});
          const item={icon:icons[ii]?.value||'',title:titles[ii]?.value||'',desc:descs[ii]?.value||'',color:colors[ii]?.value||p.color||'#1c1c1c',links};
          delete item.url;
          sec.items.push(item);
        });
      });
    } else {
      // read direct items
      const icons=document.querySelectorAll('.pe-item-icon');
      const titles=document.querySelectorAll('.pe-item-title');
      const descs=document.querySelectorAll('.pe-item-desc');
      const colors=document.querySelectorAll('.pe-item-color');
      p.items=[];
      icons.forEach((_,ii)=>{
        const labelInputs=document.querySelectorAll(`.pe-item-link-label[data-ii="${ii}"]`);
        const urlInputs=document.querySelectorAll(`.pe-item-link-url[data-ii="${ii}"]`);
        const links=[];
        labelInputs.forEach((_,li)=>{const u=urlInputs[li]?.value||'';if(u)links.push({label:labelInputs[li]?.value||'',url:u});});
        const item={icon:icons[ii]?.value||'',title:titles[ii]?.value||'',desc:descs[ii]?.value||'',color:colors[ii]?.value||p.color||'#1c1c1c',links};
        delete item.url;
        p.items.push(item);
      });
    }
    save_portal();
    S.portal_editing_id=null;
    render();
  });

  // Add/delete items
  const portalAddItem=r.querySelector('[data-action="portal-add-item"]');
  if(portalAddItem)portalAddItem.addEventListener('click',()=>{
    const p=(S.portal_content?.portals||[]).find(x=>x.id===S.portal_editing_id);
    if(p){if(!p.items)p.items=[];p.items.push({icon:'🔗',title:'Novo item',links:[{label:'',url:''}],desc:'',color:p.color||'#1c1c1c'});render();}
  });
  r.querySelectorAll('[data-action="portal-del-item"]').forEach(btn=>btn.addEventListener('click',()=>{
    const ii=parseInt(btn.dataset.ii);
    const p=(S.portal_content?.portals||[]).find(x=>x.id===S.portal_editing_id);
    if(p&&p.items&&!isNaN(ii)){p.items.splice(ii,1);render();}
  }));
  r.querySelectorAll('[data-action="portal-add-sec-item"]').forEach(btn=>btn.addEventListener('click',()=>{
    const si=parseInt(btn.dataset.si);
    const p=(S.portal_content?.portals||[]).find(x=>x.id===S.portal_editing_id);
    if(p&&p.sections&&p.sections[si]){
      if(!p.sections[si].items)p.sections[si].items=[];
      p.sections[si].items.push({icon:'🔗',title:'Novo item',links:[{label:'',url:''}],desc:'',color:p.color||'#1c1c1c'});
      render();
    }
  }));
  r.querySelectorAll('[data-action="portal-del-sec-item"]').forEach(btn=>btn.addEventListener('click',()=>{
    const si=parseInt(btn.dataset.si);const ii=parseInt(btn.dataset.ii);
    const p=(S.portal_content?.portals||[]).find(x=>x.id===S.portal_editing_id);
    if(p&&p.sections&&p.sections[si]&&!isNaN(ii)){p.sections[si].items.splice(ii,1);render();}
  }));

  // Drag-and-drop reorder SECTIONS
  let _sdragSi=null;
  r.querySelectorAll('.portal-sec-card[draggable]').forEach(sec=>{
    sec.addEventListener('dragstart',e=>{
      _sdragSi=parseInt(sec.dataset.secSi);
      sec.classList.add('pdragging');
      e.dataTransfer.effectAllowed='move';
      e.stopPropagation();
    });
    sec.addEventListener('dragend',()=>{
      sec.classList.remove('pdragging');
      r.querySelectorAll('.portal-sec-card').forEach(s=>s.classList.remove('pdrag-over'));
    });
    sec.addEventListener('dragover',e=>{
      e.preventDefault();e.stopPropagation();
      sec.classList.add('pdrag-over');
    });
    sec.addEventListener('dragleave',e=>{
      if(!sec.contains(e.relatedTarget))sec.classList.remove('pdrag-over');
    });
    sec.addEventListener('drop',e=>{
      e.preventDefault();e.stopPropagation();
      sec.classList.remove('pdrag-over');
      const tSi=parseInt(sec.dataset.secSi);
      if(_sdragSi===tSi||isNaN(_sdragSi)||isNaN(tSi))return;
      syncPortalFormToState();
      const p=(S.portal_content?.portals||[]).find(x=>x.id===S.portal_editing_id);
      if(p&&p.sections){
        const[moved]=p.sections.splice(_sdragSi,1);
        p.sections.splice(tSi,0,moved);
      }
      _sdragSi=null;
      render();
    });
  });

  // Section logo upload
  r.querySelectorAll('.pe-sec-logo-file').forEach(input=>input.addEventListener('change',e=>{
    const file=e.target.files[0];if(!file)return;
    const si=parseInt(input.dataset.si);
    const reader=new FileReader();
    reader.onload=ev=>{
      syncPortalFormToState();
      const p=(S.portal_content?.portals||[]).find(x=>x.id===S.portal_editing_id);
      if(p&&p.sections&&p.sections[si])p.sections[si].logo=ev.target.result;
      render();
    };
    reader.readAsDataURL(file);
  }));
  r.querySelectorAll('[data-action="portal-sec-logo-del"]').forEach(btn=>btn.addEventListener('click',()=>{
    const si=parseInt(btn.dataset.si);
    syncPortalFormToState();
    const p=(S.portal_content?.portals||[]).find(x=>x.id===S.portal_editing_id);
    if(p&&p.sections&&p.sections[si])p.sections[si].logo='';
    render();
  }));
  // Section logo edit from view mode
  r.querySelectorAll('[data-action="sec-logo-edit"]').forEach(el=>el.addEventListener('click',()=>{
    S.portal_editing_id=el.dataset.pid;
    S.portal_current=null;
    render();
    // scroll to section
    setTimeout(()=>{
      const secEl=document.querySelector(`.pe-sec-logo-file[data-si]`);
      if(secEl){const input=document.querySelectorAll('.pe-sec-logo-file')[parseInt(el.dataset.sid.split('-').pop())||0];input?.click();}
    },200);
  }));

  // Arrow up/down — sections
  r.querySelectorAll('[data-action="portal-sec-up"]').forEach(btn=>btn.addEventListener('click',()=>{
    if(btn.disabled)return;
    const si=parseInt(btn.dataset.si);
    syncPortalFormToState();
    const p=(S.portal_content?.portals||[]).find(x=>x.id===S.portal_editing_id);
    if(p&&p.sections&&si>0){const[m]=p.sections.splice(si,1);p.sections.splice(si-1,0,m);render();}
  }));
  r.querySelectorAll('[data-action="portal-sec-down"]').forEach(btn=>btn.addEventListener('click',()=>{
    if(btn.disabled)return;
    const si=parseInt(btn.dataset.si);
    syncPortalFormToState();
    const p=(S.portal_content?.portals||[]).find(x=>x.id===S.portal_editing_id);
    if(p&&p.sections&&si<p.sections.length-1){const[m]=p.sections.splice(si,1);p.sections.splice(si+1,0,m);render();}
  }));

  // Arrow up/down — items
  r.querySelectorAll('[data-action="portal-item-up"]').forEach(btn=>btn.addEventListener('click',()=>{
    if(btn.disabled)return;
    const si=parseInt(btn.dataset.si);const ii=parseInt(btn.dataset.ii);
    syncPortalFormToState();
    const p=(S.portal_content?.portals||[]).find(x=>x.id===S.portal_editing_id);
    const arr=isNaN(si)?p?.items:p?.sections?.[si]?.items;
    if(arr&&ii>0){const[m]=arr.splice(ii,1);arr.splice(ii-1,0,m);render();}
  }));
  r.querySelectorAll('[data-action="portal-item-down"]').forEach(btn=>btn.addEventListener('click',()=>{
    if(btn.disabled)return;
    const si=parseInt(btn.dataset.si);const ii=parseInt(btn.dataset.ii);
    syncPortalFormToState();
    const p=(S.portal_content?.portals||[]).find(x=>x.id===S.portal_editing_id);
    const arr=isNaN(si)?p?.items:p?.sections?.[si]?.items;
    if(arr&&ii<arr.length-1){const[m]=arr.splice(ii,1);arr.splice(ii+1,0,m);render();}
  }));

  // Add / remove sections
  const portalAddSec=r.querySelector('[data-action="portal-add-sec"]');
  if(portalAddSec)portalAddSec.addEventListener('click',()=>{
    syncPortalFormToState();
    const p=(S.portal_content?.portals||[]).find(x=>x.id===S.portal_editing_id);
    if(p){
      if(!p.sections)p.sections=[];
      const n=p.sections.length+1;
      p.sections.push({id:'sec'+Date.now(),title:'Nova seção '+n,items:[]});
      render();
    }
  });

  r.querySelectorAll('[data-action="portal-del-sec"]').forEach(btn=>btn.addEventListener('click',()=>{
    const si=parseInt(btn.dataset.si);
    const p=(S.portal_content?.portals||[]).find(x=>x.id===S.portal_editing_id);
    if(!p||isNaN(si))return;
    const secName=p.sections[si]?.title||'esta seção';
    openConfirm(`Remover seção`,`"${secName}" e todos os seus itens serão removidos. Deseja continuar?`,()=>{
      syncPortalFormToState();
      p.sections.splice(si,1);
      render();
    });
  }));

  // Profile modal — open via user chip
  const openProfileChip=r.querySelector('[data-action="open-profile"]');
  if(openProfileChip)openProfileChip.addEventListener('click',()=>{S.showProfileModal=true;render();});

  // Profile modal — close
  r.querySelectorAll('[data-action="close-profile"]').forEach(b=>b.addEventListener('click',()=>{S.showProfileModal=false;render();}));
  const profileOverlay=r.querySelector('#profile-overlay');
  if(profileOverlay)profileOverlay.addEventListener('click',e=>{if(e.target===profileOverlay){S.showProfileModal=false;render();}});

  // Profile modal — save
  const saveProfile=r.querySelector('[data-action="save-profile"]');
  if(saveProfile)saveProfile.addEventListener('click',()=>{
    const form=document.getElementById('profile-form');
    const u=AUTH.users.find(x=>x.id===AUTH.session?.id);
    if(!u||!form)return;
    const fd=new FormData(form);
    u.birthdate=fd.get('birthdate')||'';
    u.workPhone=fd.get('workPhone')||'';
    u.mobilePhone=fd.get('mobilePhone')||'';
    u.city=fd.get('city')||'';
    // admin fields
    const deptEl=document.getElementById('prof-dept');
    const posEl=document.getElementById('prof-pos');
    const supEl=document.getElementById('prof-sup');
    if(deptEl)u.department=deptEl.value;
    if(posEl)u.position=posEl.value;
    if(supEl)u.supervisor=supEl.value;
    saveUsers();
    S.showProfileModal=false;
    render();
  });

  // Edit user modal (admin) — open
  r.querySelectorAll('[data-action="edit-user"]').forEach(btn=>btn.addEventListener('click',()=>{
    S.editUserModal={open:true,uid:btn.dataset.uid};render();
  }));

  // Edit user modal — close
  r.querySelectorAll('[data-action="close-edit-user"]').forEach(b=>b.addEventListener('click',()=>{S.editUserModal={open:false,uid:null};render();}));
  const editUserOverlay=r.querySelector('#edit-user-overlay');
  if(editUserOverlay)editUserOverlay.addEventListener('click',e=>{if(e.target===editUserOverlay){S.editUserModal={open:false,uid:null};render();}});

  // Edit user modal — save
  const saveEditUser=r.querySelector('[data-action="save-edit-user"]');
  if(saveEditUser)saveEditUser.addEventListener('click',()=>{
    const u=AUTH.users.find(x=>x.id===saveEditUser.dataset.uid);
    if(!u)return;
    const nameEl=document.getElementById('eu-name');
    const deptEl=document.getElementById('eu-dept');
    const posEl=document.getElementById('eu-pos');
    const supEl=document.getElementById('eu-sup');
    if(nameEl)u.name=nameEl.value.trim();
    if(deptEl)u.department=deptEl.value.trim();
    if(posEl)u.position=posEl.value.trim();
    if(supEl)u.supervisor=supEl.value.trim();
    u.access=[...document.querySelectorAll('.eu-access:checked')].map(cb=>cb.value);
    saveUsers();
    S.editUserModal={open:false,uid:null};
    render();
  });

  // Force password kami123 (direct table button)
  r.querySelectorAll('[data-action="force-pwd"]').forEach(btn=>btn.addEventListener('click',()=>{
    const u=AUTH.users.find(x=>x.id===btn.dataset.uid);
    if(!u)return;
    u.pwd=hashPwd('kami123');
    u.mustChangePassword=false;
    // save and verify
    try{
      localStorage.setItem(KEY_USERS,JSON.stringify(AUTH.users));
      const verify=JSON.parse(localStorage.getItem(KEY_USERS)||'[]');
      const saved=verify.find(x=>x.id===u.id);
      if(saved&&saved.pwd===hashPwd('kami123')){
        btn.textContent='✅ Salvo!';
        btn.style.background='#dcfce7';btn.style.borderColor='#86efac';btn.style.color='#166534';
        setTimeout(()=>{btn.textContent='🔑 kami123';btn.style.background='#fef3c7';btn.style.borderColor='#fcd34d';btn.style.color='#92400e';},3000);
      } else {
        alert('❌ ERRO: não foi possível salvar no localStorage.\n\nIsso pode acontecer ao abrir o arquivo diretamente (file://). Tente hospedar em um servidor local.');
      }
    }catch(e){
      alert('❌ Erro ao salvar: '+e.message);
    }
  }));

  // Reset password (modal button)
  const resetPwdBtn=r.querySelector('[data-action="reset-pwd-user"]');
  if(resetPwdBtn)resetPwdBtn.addEventListener('click',()=>{
    const uid_r=resetPwdBtn.dataset.uid;
    const uname=resetPwdBtn.dataset.uname||'este usuário';
    const u=AUTH.users.find(x=>x.id===uid_r);
    if(!u)return;
    const newPwd=genTempPwd();
    u.pwd=hashPwd(newPwd);
    u.mustChangePassword=true;
    saveUsers();
    // Show new password
    const msg=`Nova senha temporária para ${uname}:\n\n🔑 ${newPwd}\n\nO usuário deverá criar uma nova senha no próximo acesso.`;
    alert(msg);
    try{navigator.clipboard?.writeText(newPwd);}catch(e){}
  });

  // Automations modal
  const openAuto=r.querySelector('[data-action="open-auto"]');
  if(openAuto)openAuto.addEventListener('click',()=>{S.show_automations=true;render();});
  r.querySelectorAll('[data-action="close-auto"]').forEach(b=>b.addEventListener('click',()=>{S.show_automations=false;render();}));
  const autoOverlay=r.querySelector('#auto-overlay');
  if(autoOverlay)autoOverlay.addEventListener('click',e=>{if(e.target===autoOverlay){S.show_automations=false;render();}});

  const autoSave=r.querySelector('[data-action="auto-save"]');
  if(autoSave)autoSave.addEventListener('click',()=>{
    const name=(document.getElementById('auto-name')?.value||'').trim();
    const pipeline=document.getElementById('auto-pipeline')?.value||'content';
    const trigger=document.getElementById('auto-trigger')?.value||'create';
    const condField=document.getElementById('auto-cond-field')?.value||'project';
    const condOp=document.getElementById('auto-cond-op')?.value||'equals';
    const condVal=(document.getElementById('auto-cond-val')?.value||'').trim();
    const actionType=document.getElementById('auto-action-type')?.value||'assign_responsible';
    const actionVal=(document.getElementById('auto-action-val')?.value||'').trim();
    if(!name){alert('Informe um nome para a automação.');return;}
    if(!condVal&&condOp!=='is_empty'){alert('Informe o valor da condição.');return;}
    if(!actionVal){alert('Informe o valor da ação.');return;}
    S.automations.push({
      id:uid(),name,active:true,pipeline,trigger,
      conditions:[{field:condField,operator:condOp,value:condVal}],
      actions:[{type:actionType,value:actionVal}]
    });
    save_auto();render();
  });

  r.querySelectorAll('[data-action="auto-toggle"]').forEach(cb=>cb.addEventListener('change',()=>{
    const rule=S.automations.find(r=>r.id===cb.dataset.id);
    if(rule){rule.active=cb.checked;save_auto();render();}
  }));
  r.querySelectorAll('[data-action="auto-del"]').forEach(btn=>btn.addEventListener('click',()=>{
    openConfirm('Remover automação','Esta regra será excluída permanentemente.',()=>{
      S.automations=S.automations.filter(r=>r.id!==btn.dataset.id);
      save_auto();render();
    });
  }));

  // Drag & drop
  dnd1(r);dnd2(r);

  // Keyboard shortcuts
  document.onkeydown=e=>{
    if(e.key==='Escape'){
      if(S.confirm.open){_confirmCallback=null;S.confirm={open:false,title:'',message:''};render();}
      else if(S.modal.open){S.modal.open=false;render();}
      else if(S.modal2.open){S.modal2.open=false;render();}
    }
    if(e.key==='n'&&!S.modal.open&&!S.modal2.open&&e.target.tagName!=='INPUT'&&e.target.tagName!=='TEXTAREA'&&e.target.tagName!=='SELECT'){
      if(S.pipe==='content'){S.modal={open:true,id:null,defStatus:'ideas',tab:'basic'};}
      else{S.modal2={open:true,id:null,defStatus:'triage',tab:'form',attachmentName:''};}
      render();
    }
  };
}

function dnd1(r){
  let dragId=null;
  r.querySelectorAll('.card[data-cid]').forEach(el=>{
    el.addEventListener('dragstart',e=>{dragId=el.dataset.cid;el.classList.add('dragging');e.dataTransfer.effectAllowed='move';});
    el.addEventListener('dragend',()=>{el.classList.remove('dragging');dragId=null;});
  });
  r.querySelectorAll('[data-dz]').forEach(z=>{
    z.addEventListener('dragover',e=>{e.preventDefault();e.dataTransfer.dropEffect='move';z.classList.add('dover');});
    z.addEventListener('dragleave',()=>z.classList.remove('dover'));
    z.addEventListener('drop',e=>{
      e.preventDefault();z.classList.remove('dover');
      if(!dragId)return;
      const c=S.cards.find(x=>x.id===dragId);
      if(c&&c.status!==z.dataset.dz){c.status=z.dataset.dz;save1();render();}
    });
  });
}

function dnd2(r){
  let dragId=null;
  r.querySelectorAll('.card[data-rid]').forEach(el=>{
    el.addEventListener('dragstart',e=>{dragId=el.dataset.rid;el.classList.add('dragging');e.dataTransfer.effectAllowed='move';});
    el.addEventListener('dragend',()=>{el.classList.remove('dragging');dragId=null;});
  });
  r.querySelectorAll('[data-dz2]').forEach(z=>{
    z.addEventListener('dragover',e=>{e.preventDefault();e.dataTransfer.dropEffect='move';z.classList.add('dover');});
    z.addEventListener('dragleave',()=>z.classList.remove('dover'));
    z.addEventListener('drop',e=>{
      e.preventDefault();z.classList.remove('dover');
      if(!dragId)return;
      const req=S.requests.find(x=>x.id===dragId);
      if(req&&req.status!==z.dataset.dz2){req.status=z.dataset.dz2;save2();render();}
    });
  });
}

document.getElementById('root').innerHTML=
  '<div style="position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:var(--bg);"><div style="color:var(--t3);font-size:13px;letter-spacing:.5px;">Carregando...</div></div>';

(async()=>{
  await loadUsers();
  loadSession();
  await load();
  S.startup_alert_dismissed=false; // sempre mostra o alerta ao carregar
  render();
})();

window.addEventListener('focus',()=>{
  if(!FB_URL||AUTH.showLogin)return;
  load().then(()=>render());
});

