# MARKETING App — Documentação Técnica

> App de gestão de marketing completo. Arquivo único HTML/CSS/JS, sem dependências externas, com banco de dados Firebase e autenticação por usuário individual. Um desenvolvedor com este documento consegue recriar o app identicamente.

---

## 1. Estrutura do Arquivo

O app inteiro é um único arquivo: `pipeline-mkt.html`

```
pipeline-mkt.html
├── <head>
│   └── <style> — todo o CSS inline
└── <body>
    ├── <div id="root"> — ponto de montagem do app
    └── <script>
        ├── Constantes (ST, ST2, PROJ, CTYPES, …)
        ├── Firebase helpers (fbGet, fbSet)
        ├── Estado global (S, AUTH, AI)
        ├── Persistência (load, save1, save2, loadUsers, saveUsers)
        ├── Autenticação (hashPwd, loadSession, saveSession, doLogin, …)
        ├── Helpers (uid, esc, fdate, uavatar, filtered1, …)
        ├── Funções de render (render, html, hdr, kban1, list1, modal1, …)
        ├── Event bindings (bind, bindLogin, dnd1, dnd2)
        ├── Integração IA (AI_SYSTEM, callClaude, renderAIModal)
        └── Init (IIFE async + window focus)
```

---

## 2. CSS Completo

```css
:root{
  --bg:#463e3f;--s1:#3a3334;--s2:#2e2829;--s3:#36302f;
  --b:#5a5152;--t1:#f0eeee;--t2:#b8b0b1;--t3:#7a7273;
  --ac:#e73a57;--ac2:#c42d44;
}
*{box-sizing:border-box;margin:0;padding:0;}
html,body{height:100%;overflow:hidden;}
body{background:var(--bg);color:var(--t1);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif;font-size:13px;display:flex;flex-direction:column;}
::-webkit-scrollbar{width:4px;height:4px;}
::-webkit-scrollbar-track{background:transparent;}
::-webkit-scrollbar-thumb{background:var(--b);border-radius:2px;}
::-webkit-scrollbar-thumb:hover{background:var(--t3);}

/* HEADER */
.header{display:flex;align-items:center;gap:10px;padding:0 20px;background:var(--s1);border-bottom:1px solid var(--b);flex-shrink:0;height:50px;}
.brand{font-weight:800;font-size:15px;letter-spacing:-0.5px;white-space:nowrap;}
.brand b{color:var(--ac);}
.sep{width:1px;height:18px;background:var(--b);}
.pipe-tabs{display:flex;background:var(--s2);border-radius:8px;padding:2px;gap:1px;}
.pt-btn{display:flex;align-items:center;gap:5px;padding:5px 12px;border-radius:6px;border:none;background:none;color:var(--t3);cursor:pointer;font-size:12px;font-weight:700;letter-spacing:.3px;transition:.12s;}
.pt-btn.on{background:var(--ac);color:#fff;}
.pt-btn:not(.on):hover{color:var(--t1);background:var(--s3);}
.vtabs{display:flex;background:var(--s2);border-radius:8px;padding:2px;gap:1px;}
.vbtn{display:flex;align-items:center;gap:5px;padding:5px 12px;border-radius:6px;border:none;background:none;color:var(--t3);cursor:pointer;font-size:12px;font-weight:600;transition:.12s;}
.vbtn.on{background:var(--s3);color:var(--t1);}
.vbtn:not(.on):hover{color:var(--t1);}
.hright{margin-left:auto;display:flex;align-items:center;gap:8px;}
.btn{display:flex;align-items:center;gap:5px;padding:6px 14px;border-radius:7px;border:none;cursor:pointer;font-size:12px;font-weight:600;transition:.12s;font-family:inherit;}
.btn-p{background:var(--ac);color:#fff;}
.btn-p:hover{background:var(--ac2);}
.btn-o{background:transparent;color:var(--t2);border:1px solid var(--b);}
.btn-o:hover{background:var(--s2);color:var(--t1);}
.btn-d{background:rgba(239,68,68,.1);color:#f87171;border:1px solid rgba(239,68,68,.25);margin-right:auto;}
.btn-d:hover{background:#ef4444;color:#fff;}

/* FILTERS */
.filters{display:flex;gap:6px;align-items:center;padding:7px 20px;background:var(--s1);border-bottom:1px solid var(--b);flex-shrink:0;flex-wrap:wrap;}
.flabel{font-size:10px;color:var(--t3);font-weight:700;letter-spacing:.5px;text-transform:uppercase;white-space:nowrap;}
.fsel,.fsearch{background:var(--s2);border:1px solid var(--b);border-radius:6px;color:var(--t1);padding:5px 9px;font-size:12px;outline:none;font-family:inherit;transition:border-color .12s;}
.fsel:focus,.fsearch:focus{border-color:var(--ac);}
.fsearch{width:170px;}
.fsearch::placeholder{color:var(--t3);}
.fsel option{background:var(--s2);}
.fclr{font-size:11px;color:var(--ac);cursor:pointer;padding:4px 7px;border-radius:5px;transition:.12s;}
.fclr:hover{background:rgba(124,106,246,.15);}

/* STATS BAR */
.stats{display:flex;gap:18px;padding:5px 20px;background:var(--s1);border-bottom:1px solid var(--b);flex-shrink:0;}
.stat{display:flex;align-items:center;gap:5px;font-size:11px;color:var(--t3);}
.stat strong{color:var(--t1);font-weight:700;}
.sdot{width:6px;height:6px;border-radius:50%;}

/* MAIN */
.main{flex:1;overflow:hidden;display:flex;flex-direction:column;}

/* KANBAN */
.kanban{display:flex;gap:10px;padding:14px 20px 20px;overflow-x:auto;overflow-y:hidden;flex:1;align-items:flex-start;}
.kcol{flex-shrink:0;width:248px;background:var(--s1);border:1px solid var(--b);border-radius:12px;display:flex;flex-direction:column;max-height:100%;}
.khead{display:flex;align-items:center;gap:7px;padding:10px 12px;border-bottom:1px solid var(--b);flex-shrink:0;}
.kdot{width:7px;height:7px;border-radius:50%;flex-shrink:0;}
.ktitle{font-size:11px;font-weight:700;letter-spacing:.3px;flex:1;color:var(--t2);}
.kcount{background:var(--s2);border-radius:20px;padding:1px 7px;font-size:10px;color:var(--t3);font-weight:700;}
.kadd{background:none;border:none;color:var(--t3);cursor:pointer;width:22px;height:22px;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:17px;line-height:1;transition:.12s;flex-shrink:0;}
.kadd:hover{background:var(--ac);color:#fff;}
.kcards{padding:7px;overflow-y:auto;flex:1;display:flex;flex-direction:column;gap:5px;min-height:60px;}
.kcards.dover{background:rgba(124,106,246,.06);border-radius:8px;}
.kempty{display:flex;flex-direction:column;align-items:center;padding:18px 8px;gap:4px;opacity:.35;}
.kempty-icon{font-size:18px;}
.kempty-txt{font-size:10px;color:var(--t3);text-align:center;}

/* CARD */
.card{background:var(--s2);border:1px solid var(--b);border-left:3px solid var(--b);border-radius:8px;padding:10px 11px;cursor:pointer;transition:transform .12s,box-shadow .12s,border-color .12s;}
.card:hover{transform:translateY(-1px);box-shadow:0 4px 16px rgba(0,0,0,.5);border-left-color:var(--ac);}
.card.dragging{opacity:.35;}
.ctitle{font-size:12px;font-weight:600;line-height:1.4;margin-bottom:7px;color:var(--t1);}
.ctags{display:flex;flex-wrap:wrap;gap:3px;margin-bottom:7px;}
.tag{padding:2px 6px;border-radius:3px;font-size:10px;font-weight:700;letter-spacing:.2px;}
/* tag color classes */
.t-p{background:rgba(124,106,246,.2);color:#b4acff;}
.t-r{background:rgba(236,72,153,.18);color:#f9a8d4;}
.t-c{background:rgba(6,182,212,.18);color:#67e8f9;}
.t-s{background:rgba(99,102,241,.18);color:#a5b4fc;}
.t-v{background:rgba(245,158,11,.18);color:#fcd34d;}
.t-st{background:rgba(168,85,247,.18);color:#d8b4fe;}
.t-top{background:rgba(34,197,94,.15);color:#86efac;}
.t-mid{background:rgba(245,158,11,.15);color:#fde68a;}
.t-bot{background:rgba(239,68,68,.15);color:#fca5a5;}
.t-bu{background:rgba(124,106,246,.18);color:#c4bbff;}
.t-ot{background:rgba(6,182,212,.15);color:#7dd3fc;}
.t-via-w{background:rgba(34,197,94,.15);color:#86efac;}
.t-via-e{background:rgba(99,102,241,.15);color:#a5b4fc;}
.cdates{display:flex;gap:8px;font-size:10px;color:var(--t3);margin-bottom:7px;}
.cdate{display:flex;align-items:center;gap:3px;}
.cresps{display:flex;gap:3px;flex-wrap:wrap;}

/* LIST VIEW */
.list-wrap{flex:1;overflow:auto;padding:14px 20px;}
.ltable{width:100%;border-collapse:collapse;}
.ltable th{background:var(--s1);padding:7px 10px;font-size:10px;color:var(--t3);font-weight:700;letter-spacing:.5px;text-align:left;border-bottom:1px solid var(--b);text-transform:uppercase;cursor:pointer;white-space:nowrap;}
.ltable th:hover{color:var(--t1);}
.ltable td{padding:8px 10px;font-size:12px;border-bottom:1px solid rgba(90,81,82,.3);vertical-align:middle;}
.ltable tr:hover td{background:var(--s1);}
.ltable tr{cursor:pointer;}
.lstat{display:inline-flex;align-items:center;gap:4px;font-size:10px;font-weight:700;}

/* MODAL */
.overlay{position:fixed;inset:0;background:rgba(0,0,0,.65);backdrop-filter:blur(2px);display:flex;align-items:flex-start;justify-content:center;z-index:100;padding-top:40px;overflow-y:auto;}
.modal{background:var(--s1);border:1px solid var(--b);border-radius:14px;width:640px;max-width:calc(100vw - 40px);padding:0 0 20px;position:relative;}
.mhead{display:flex;align-items:center;gap:10px;padding:16px 20px 12px;border-bottom:1px solid var(--b);}
.mclose{background:none;border:none;color:var(--t3);cursor:pointer;font-size:20px;line-height:1;margin-left:auto;width:28px;height:28px;display:flex;align-items:center;justify-content:center;border-radius:6px;}
.mclose:hover{background:var(--s2);color:var(--t1);}
.mtabs{display:flex;gap:1px;padding:10px 20px 0;border-bottom:1px solid var(--b);}
.mtab{padding:6px 14px;font-size:12px;font-weight:600;color:var(--t3);border:none;background:none;cursor:pointer;border-bottom:2px solid transparent;transition:.12s;font-family:inherit;}
.mtab.on{color:var(--ac);border-bottom-color:var(--ac);}
.mbody{padding:18px 20px 0;}
.mrow{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;}
.mrow.full{grid-template-columns:1fr;}
.mfld{display:flex;flex-direction:column;gap:5px;}
.mlabel{font-size:10px;color:var(--t3);font-weight:700;letter-spacing:.4px;text-transform:uppercase;}
.minput,.msel,.mtarea{background:var(--s2);border:1px solid var(--b);border-radius:7px;color:var(--t1);padding:8px 10px;font-size:13px;outline:none;font-family:inherit;transition:border-color .12s;width:100%;}
.minput:focus,.msel:focus,.mtarea:focus{border-color:var(--ac);}
.mtarea{resize:vertical;min-height:80px;}
.msel option{background:var(--s2);}
.mchks{display:flex;flex-wrap:wrap;gap:6px;}
.mchk{display:flex;align-items:center;gap:5px;background:var(--s2);border:1px solid var(--b);border-radius:6px;padding:5px 9px;cursor:pointer;transition:.12s;}
.mchk:hover{border-color:var(--ac);}
.mchk input{accent-color:var(--ac);cursor:pointer;}
.mchk span{font-size:12px;color:var(--t2);}
.mfoot{display:flex;gap:8px;justify-content:flex-end;padding:14px 20px 0;border-top:1px solid var(--b);margin-top:14px;}

/* DASHBOARD */
.dash{flex:1;overflow:auto;padding:20px;}
.kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;margin-bottom:22px;}
.kpi{background:var(--s1);border:1px solid var(--b);border-radius:10px;padding:14px 16px;}
.kpi-val{font-size:28px;font-weight:800;color:var(--t1);line-height:1.1;}
.kpi-label{font-size:10px;color:var(--t3);font-weight:700;letter-spacing:.5px;text-transform:uppercase;margin-top:3px;}
.charts{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
.chart-box{background:var(--s1);border:1px solid var(--b);border-radius:10px;padding:16px;}
.chart-title{font-size:11px;font-weight:700;color:var(--t2);letter-spacing:.4px;text-transform:uppercase;margin-bottom:12px;}
.bar-row{display:flex;align-items:center;gap:8px;margin-bottom:6px;}
.bar-label{font-size:11px;color:var(--t2);width:120px;flex-shrink:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.bar-track{flex:1;height:14px;background:var(--s2);border-radius:4px;overflow:hidden;display:flex;}
.bar-seg{height:100%;transition:width .3s;}
.bar-num{font-size:10px;color:var(--t3);width:24px;text-align:right;flex-shrink:0;}

/* LOGIN */
.login-page{position:fixed;inset:0;background:var(--bg);display:flex;align-items:center;justify-content:center;}
.login-box{background:var(--s1);border:1px solid var(--b);border-radius:16px;padding:32px 32px 28px;width:360px;}
.login-brand{font-size:22px;font-weight:800;text-align:center;margin-bottom:6px;letter-spacing:-0.5px;}
.login-sub{font-size:12px;color:var(--t3);text-align:center;margin-bottom:24px;}
.login-err{background:rgba(231,58,87,.12);border:1px solid rgba(231,58,87,.3);color:#f87171;font-size:12px;padding:8px 12px;border-radius:7px;margin-bottom:14px;}
.login-lbl{font-size:11px;color:var(--t3);font-weight:700;letter-spacing:.4px;text-transform:uppercase;margin-bottom:5px;}
.login-inp{background:var(--s2);border:1px solid var(--b);border-radius:7px;color:var(--t1);padding:9px 11px;font-size:13px;outline:none;font-family:inherit;width:100%;margin-bottom:12px;transition:border-color .12s;}
.login-inp:focus{border-color:var(--ac);}
.login-remember{display:flex;align-items:center;gap:7px;font-size:12px;color:var(--t2);margin-bottom:16px;cursor:pointer;}
.login-remember input{accent-color:var(--ac);cursor:pointer;}
.login-btn{background:var(--ac);color:#fff;border:none;border-radius:8px;padding:10px;font-size:13px;font-weight:700;cursor:pointer;width:100%;font-family:inherit;transition:background .12s;}
.login-btn:hover{background:var(--ac2);}

/* AVATAR */
.avatar-wrap{position:relative;cursor:pointer;}
.avatar-wrap:hover::after{content:'✎';position:absolute;inset:0;background:rgba(0,0,0,.5);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;color:#fff;}

/* USERS MODAL */
.users-modal{background:var(--s1);border:1px solid var(--b);border-radius:14px;width:540px;max-width:calc(100vw-40px);padding:0 0 20px;}
.user-row{display:flex;align-items:center;gap:10px;padding:10px 20px;border-bottom:1px solid var(--b);}
.user-info{flex:1;}
.user-name{font-size:13px;font-weight:600;color:var(--t1);}
.user-email{font-size:11px;color:var(--t3);}
.user-badge{font-size:10px;font-weight:700;padding:2px 7px;border-radius:3px;}
.badge-admin{background:rgba(231,58,87,.18);color:var(--ac);}
.badge-user{background:rgba(90,81,82,.3);color:var(--t3);}

/* AI MODAL */
.ai-modal{background:var(--s1);border:1px solid var(--b);border-radius:14px;width:680px;max-width:calc(100vw-40px);padding:0 0 20px;}
.ai-preview-card{background:var(--s2);border:1px solid var(--b);border-radius:8px;padding:10px 14px;margin-bottom:6px;}
.ai-preview-title{font-size:13px;font-weight:600;color:var(--t1);margin-bottom:4px;}
.ai-preview-meta{display:flex;flex-wrap:wrap;gap:5px;font-size:11px;color:var(--t3);}
```

---

## 3. Constantes de Dados

```js
const ST = [
  {id:'ideas',       label:'Banco de ideias',          color:'#6366f1'},
  {id:'social-todo', label:'A Fazer Social Media',      color:'#8b5cf6'},
  {id:'av-todo',     label:'A Fazer Audiovisual',       color:'#ec4899'},
  {id:'cri-todo',    label:'A Fazer Criativo',          color:'#f43f5e'},
  {id:'progress',    label:'Em Andamento',              color:'#f59e0b'},
  {id:'review',      label:'Revisão | Aprovação',       color:'#06b6d4'},
  {id:'final-social',label:'Finalizar Social Media',    color:'#3b82f6'},
  {id:'done',        label:'Concluído',                 color:'#22c55e'},
  {id:'standby',     label:'Stand by',                  color:'#6b7280'},
];

const ST2 = [
  {id:'triage',   label:'Nova solicitação | Triagem',  color:'#6366f1'},
  {id:'cri-todo', label:'Criativo | A Fazer',           color:'#8b5cf6'},
  {id:'progress', label:'Em Andamento',                 color:'#f59e0b'},
  {id:'waiting',  label:'Aguardando informações',       color:'#f43f5e'},
  {id:'approval', label:'Enviado para aprovação',       color:'#06b6d4'},
  {id:'print',    label:'Impressão / Implementação',   color:'#3b82f6'},
  {id:'standby',  label:'Stand by',                    color:'#6b7280'},
  {id:'done',     label:'Concluído',                   color:'#22c55e'},
];

const PROJ = ['958','Balens','Cadiveu PT','KAMI CO. BR','KAMI CO. Holding','KAMI CO. PT','Pur Hair PT','The Smooth Edit','Toctus_KAMI CO.'];
const CTYPES = ['Carrossel','Estático','Reel','Storie','Vídeo'];
const FUNNELS = ['Topo','Meio','Fundo'];
const CHANNELS = ['Instagram Feed','Instagram Stories','LinkedIn','Pinterest','Threads','TikTok','WhatsApp','YouTube'];
const TEAM = [
  {id:'barbara', name:'Barbara Ciarleglio', color:'#ec4899', initials:'BC'},
  {id:'leslie',  name:'Leslie Arantes',     color:'#7c6af6', initials:'LA'},
  {id:'stefany', name:'Stéfany Dias',        color:'#06b6d4', initials:'SD'},
];
const ORDER_TYPES = ['Adesivo','Apresentações','Artes em geral','Banner / Rollup','Catálogo','Comunicados','E-mails','Lâminas comerciais — campanhas ou promoções','Outros','Papelaria','Tabela'];
const BIZ_UNITS = ['958','Balens','Cadiveu PT','KAMI CO. BR','KAMI CO. Group','KAMI CO. PT','Pur Hair PT','The Smooth','Toctus KAMI CO.'];
const DELIVERY = ['WhatsApp','E-mail'];
const SECTORS = ['Backoffice','Comercial','CX','Diretoria / Sócios','Ecommerce','Educação','Financeiro','Inside Sales','KAMI Store','Logística','Marketing','MKT Aquisição','Operações','People & Culture','Produção / Eventos','Talents','TI'];

// Storage keys
const KEY1       = 'kami-mkt-v2';
const KEY2       = 'kami-mkt-req-v1';
const KEY_USERS  = 'kami-mkt-users-v1';
const KEY_SESSION= 'kami-mkt-session-v1';
const KEY_APIKEY = 'kami-mkt-apikey-v1';

// Firebase — preencher antes do deploy
const FB_URL   = '';  // ex: https://seu-projeto-default-rtdb.firebaseio.com
const FB_TOKEN = '';  // Database Secret
```

---

## 4. Estado Global

```js
let S = {
  pipe: 'content',         // 'content' | 'requests' | 'dash'
  // pipeline 1
  cards: [],
  view: 'kanban',          // 'kanban' | 'list'
  filters: {search:'', project:'', type:'', funnel:'', channel:'', status:'', responsible:''},
  modal: {open:false, id:null, defStatus:'ideas', tab:'basic'},
  sort: {field:'publishDate', dir:'asc'},
  // pipeline 2
  requests: [],
  view2: 'kanban',
  filters2: {search:'', unit:'', orderType:'', status:''},
  modal2: {open:false, id:null, defStatus:'triage', tab:'req', attachmentName:''},
  sort2: {field:'createdAt', dir:'desc'},
};

let AUTH = {
  users: [],
  session: null,           // { id, email, name, role, avatar }
  showLogin: true,
  showUsersModal: false,
  loginError: '',
};

let AI = {open:false, loading:false, error:'', preview:[], step:'input'};
let _newUserAvatar = '';   // base64 temp durante upload de avatar
```

---

## 5. Firebase Helpers e Persistência

```js
async function fbGet(path){
  const r = await fetch(`${FB_URL}/${path}.json?auth=${FB_TOKEN}`);
  if(!r.ok) throw new Error(`Firebase ${r.status}`);
  return r.json();
}

function fbSet(path, data){
  fetch(`${FB_URL}/${path}.json?auth=${FB_TOKEN}`, {
    method: 'PUT',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(data),
  }).catch(e => console.error('Firebase save error:', e));
}

async function load(){
  try{
    if(FB_URL){
      const [d1, d2] = await Promise.all([fbGet('cards'), fbGet('requests')]);
      S.cards    = Array.isArray(d1) ? d1 : [];
      S.requests = Array.isArray(d2) ? d2 : [];
    } else {
      try{const r=localStorage.getItem(KEY1); if(r) S.cards=JSON.parse(r);}catch(e){}
      try{const r=localStorage.getItem(KEY2); if(r) S.requests=JSON.parse(r);}catch(e){}
    }
  } catch(e){ console.error('load:', e); }
}

function save1(){
  if(FB_URL) fbSet('cards', S.cards);
  else localStorage.setItem(KEY1, JSON.stringify(S.cards));
}

function save2(){
  if(FB_URL) fbSet('requests', S.requests);
  else localStorage.setItem(KEY2, JSON.stringify(S.requests));
}

async function loadUsers(){
  try{
    if(FB_URL){ const d=await fbGet('users'); if(Array.isArray(d)&&d.length){AUTH.users=d;return;} }
    else { const r=localStorage.getItem(KEY_USERS); if(r){AUTH.users=JSON.parse(r);return;} }
  } catch(e){ console.error('loadUsers:', e); }
  if(!AUTH.users.length){
    AUTH.users = [{
      id:'admin-default',
      email:'admin@marketing.com',
      name:'Administrador',
      role:'admin',
      pwd: hashPwd('Admin@123'),
      avatar:'',
    }];
    saveUsers();
  }
}

function saveUsers(){
  if(FB_URL) fbSet('users', AUTH.users);
  else localStorage.setItem(KEY_USERS, JSON.stringify(AUTH.users));
}
```

---

## 6. Autenticação

```js
function hashPwd(pwd){
  let h = 5381;
  for(let i=0; i<pwd.length; i++) h = ((h<<5)+h) ^ pwd.charCodeAt(i);
  return 'k' + (h>>>0).toString(16);
}

// ATENÇÃO: há dois blocos loadSession no arquivo — JS usa o último definido (o correto).
// Versão correta (verifica ambos os storages):
function loadSession(){
  try{
    const r = localStorage.getItem(KEY_SESSION) || sessionStorage.getItem(KEY_SESSION);
    if(r){
      const s = JSON.parse(r);
      const u = AUTH.users.find(x => x.id === s.id);
      if(u){ AUTH.session=s; AUTH.showLogin=false; return; }
    }
  } catch(e){}
  AUTH.showLogin = true;
}

function saveSession(remember){
  const data = JSON.stringify(AUTH.session);
  if(remember){
    localStorage.setItem(KEY_SESSION, data);
    sessionStorage.removeItem(KEY_SESSION);
  } else {
    sessionStorage.setItem(KEY_SESSION, data);
    localStorage.removeItem(KEY_SESSION);
  }
}

function clearSession(){
  AUTH.session = null;
  AUTH.showLogin = true;
  localStorage.removeItem(KEY_SESSION);
  sessionStorage.removeItem(KEY_SESSION);
}

function doLogin(email, pwd, remember){
  const u = AUTH.users.find(x =>
    x.email.toLowerCase() === email.toLowerCase() && x.pwd === hashPwd(pwd)
  );
  if(!u){ AUTH.loginError = 'E-mail ou senha incorretos.'; return false; }
  AUTH.session = {id:u.id, email:u.email, name:u.name, role:u.role};
  AUTH.showLogin = false;
  AUTH.loginError = '';
  saveSession(remember);
  return true;
}

function doLogout(){ clearSession(); render(); }
```

---

## 7. Helpers

```js
function uid(){ return Date.now().toString(36) + Math.random().toString(36).slice(2,6); }

function esc(s){
  if(!s) return '';
  return String(s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function fdate(d){
  if(!d) return '—';
  const [y,m,dd] = d.split('-');
  return `${dd}/${m}`;
}

function fdatefull(d){
  if(!d) return '—';
  const [y,m,dd] = d.split('-');
  return `${dd}/${m}/${y}`;
}

function gst(id){  return ST.find(s=>s.id===id)  || ST[0]; }
function gst2(id){ return ST2.find(s=>s.id===id) || ST2[0]; }

function tcls(t){
  return {Reel:'t-r', Carrossel:'t-c', 'Estático':'t-s', 'Vídeo':'t-v', Storie:'t-st'}[t] || 't-s';
}
function fcls(f){ return {Topo:'t-top', Meio:'t-mid', Fundo:'t-bot'}[f] || ''; }
function viacls(v){ return v==='WhatsApp' ? 't-via-w' : 't-via-e'; }

// Renderiza avatar: foto base64 ou iniciais coloridas
function uavatar(u, size=28){
  const initials = (u.name||'?').split(' ').map(w=>w[0]||'').join('').slice(0,2).toUpperCase() || '?';
  const palette  = ['#ec4899','#7c6af6','#06b6d4','#f59e0b','#22c55e','#e73a57','#3b82f6'];
  const ci = Math.abs((u.id||'x').split('').reduce((a,c)=>a+c.charCodeAt(0),0)) % palette.length;
  const s = `width:${size}px;height:${size}px;border-radius:50%;flex-shrink:0;`;
  if(u.avatar)
    return `<img src="${u.avatar}" style="${s}object-fit:cover;display:block;" alt="${esc(initials)}">`;
  return `<div style="${s}background:${palette[ci]};display:flex;align-items:center;justify-content:center;font-size:${Math.floor(size*.38)}px;font-weight:800;color:#fff;letter-spacing:-.5px;">${initials}</div>`;
}

// Filtros pipeline 1
function filtered1(){
  let c = S.cards;
  const f = S.filters;
  if(f.search)     { const q=f.search.toLowerCase(); c=c.filter(x=>x.title.toLowerCase().includes(q)); }
  if(f.project)      c = c.filter(x => x.project === f.project);
  if(f.type)         c = c.filter(x => x.contentType === f.type);
  if(f.funnel)       c = c.filter(x => x.funnel === f.funnel);
  if(f.status)       c = c.filter(x => x.status === f.status);
  if(f.channel)      c = c.filter(x => x.channel && x.channel.includes(f.channel));
  if(f.responsible)  c = c.filter(x => x.responsible && x.responsible.includes(f.responsible));
  return c;
}

// Filtros pipeline 2
function filtered2(){
  let c = S.requests;
  const f = S.filters2;
  if(f.search)    { const q=f.search.toLowerCase(); c=c.filter(x=>((x.requestTitle||x.nome||'')).toLowerCase().includes(q)); }
  if(f.unit)        c = c.filter(x => x.bizUnit === f.unit);
  if(f.orderType)   c = c.filter(x => x.orderType === f.orderType);
  if(f.status)      c = c.filter(x => x.status === f.status);
  return c;
}
```

---

## 8. Padrão de Render

```js
// Render principal — re-renderiza o DOM inteiro a cada mudança de estado
function render(){
  if(AUTH.showLogin){ renderLogin(); bindLogin(); return; }
  document.getElementById('root').innerHTML = html();
  bind();
}

// html() retorna a string HTML completa da view atual
function html(){
  const main =
    S.pipe === 'dash'     ? dashboard() :
    S.pipe === 'content'  ? flt1() + sts1() + (S.view==='kanban' ? kban1() : list1()) :
    /* requests */          flt2() + sts2() + (S.view2==='kanban' ? kban2() : list2());
  return hdr() + `<div class="main">${main}</div>` + modal1() + modal2() + renderUsersModal() + renderAIModal();
}
```

---

## 9. Header (hdr)

```js
function hdr(){
  const isAdmin = AUTH.session?.role === 'admin';
  const u = AUTH.users.find(x => x.id === AUTH.session?.id) || AUTH.session || {};
  return `
<div class="header">
  <div class="brand">MAR<b>K</b>ETING</div>
  <div class="sep"></div>
  <div class="pipe-tabs">
    <button class="pt-btn${S.pipe==='dash'?' on':''}" data-action="pipe" data-v="dash">Dashboard</button>
    <button class="pt-btn${S.pipe==='content'?' on':''}" data-action="pipe" data-v="content">Conteúdo</button>
    <button class="pt-btn${S.pipe==='requests'?' on':''}" data-action="pipe" data-v="requests">Solicitações</button>
  </div>
  ${S.pipe!=='dash'?`
  <div class="sep"></div>
  <div class="vtabs">
    <button class="vbtn${(S.pipe==='content'?S.view:S.view2)==='kanban'?' on':''}" data-action="view" data-v="kanban">⊞ Kanban</button>
    <button class="vbtn${(S.pipe==='content'?S.view:S.view2)==='list'?' on':''}" data-action="view" data-v="list">≡ Lista</button>
  </div>`:''}
  <div class="hright">
    ${S.pipe==='content'?`<button class="btn btn-o" data-action="ai-open">⚡ IA</button>`:''}
    ${S.pipe!=='dash'?`<button class="btn btn-p" data-action="new-card">${S.pipe==='content'?'+ Novo Card':'+ Nova Solicitação'}</button>`:''}
    <div class="sep"></div>
    <div class="avatar-wrap" data-action="my-avatar" title="Alterar foto">
      ${uavatar(u, 30)}
    </div>
    <span style="font-size:12px;color:var(--t2);white-space:nowrap;">${esc(AUTH.session?.name||'')}</span>
    ${isAdmin?`<button class="btn btn-o" data-action="users-modal" style="padding:5px 9px;" title="Gerenciar usuários">👥</button>`:''}
    <button class="btn btn-o" data-action="logout" style="padding:5px 9px;" title="Sair">⏻</button>
  </div>
</div>`;
}
```

---

## 10. Estrutura do Card — Pipeline 1 (Conteúdo)

```js
// Criado com uid() e os campos abaixo
{
  id:                  uid(),
  title:               '',       // obrigatório
  status:              'ideas',  // default
  project:             '',
  contentType:         '',
  funnel:              '',
  deliveryDate:        '',
  publishDate:         '',
  channel:             [],       // array de strings (multi-select)
  responsible:         [],       // array de ids do TEAM
  script:              '',
  briefing:            '',
  caption:             '',
  fileLink:            '',
  fileCount:           '',
  publishInstructions: '',
  createdAt:           new Date().toISOString(),
}
```

---

## 11. Estrutura do Card — Pipeline 2 (Solicitações)

```js
{
  id:               uid(),
  status:           'triage',
  nome:             '',      // obrigatório
  telefone:         '',      // obrigatório
  email:            '',      // obrigatório
  setor:            '',      // obrigatório
  bizUnit:          '',      // obrigatório
  requestTitle:     '',      // obrigatório
  orderType:        '',      // obrigatório
  desiredDate:      '',      // obrigatório
  deliveryMethod:   '',      // obrigatório
  details:          '',      // obrigatório
  attachmentName:   '',
  responsible:      [],      // array de ids — atribuído só no card, nunca no form
  createdAt:        new Date().toISOString(),
}
```

---

## 12. Salvar Card P1 — Checkbox Arrays via FormData

O `FormData` não coleta múltiplos checkboxes como array. O padrão correto:

```js
function saveCard(form, editId){
  const fd = new FormData(form);
  const d  = Object.fromEntries(fd.entries()); // coleta campos simples

  // Coleta arrays de checkboxes manualmente (excluir do fromEntries se necessário)
  d.channel     = [...form.querySelectorAll('input[name="channel"]:checked')].map(x=>x.value);
  d.responsible = [...form.querySelectorAll('input[name="responsible"]:checked')].map(x=>x.value);

  if(editId){
    const i = S.cards.findIndex(x=>x.id===editId);
    if(i!==-1) S.cards[i] = {...S.cards[i], ...d};
  } else {
    d.id = uid();
    d.createdAt = new Date().toISOString();
    S.cards.unshift(d);
  }
  save1();
  S.modal.open = false;
  render();
}
```

---

## 13. Salvar Card P2 — Preservar Responsáveis

Responsáveis são atribuídos dentro do card, não no form. Ao salvar o form de edição, preservar o array:

```js
function saveRequest(form, editId){
  const fd = new FormData(form);
  const d  = Object.fromEntries(fd.entries());

  // Preserva responsáveis que já existiam no card
  d.responsible = editId
    ? (S.requests.find(x=>x.id===editId) || {}).responsible || []
    : [];

  if(editId){
    const i = S.requests.findIndex(x=>x.id===editId);
    if(i!==-1) S.requests[i] = {...S.requests[i], ...d};
  } else {
    d.id = uid();
    d.status = 'triage';
    d.createdAt = new Date().toISOString();
    S.requests.unshift(d);
  }
  save2();
  S.modal2.open = false;
  render();
}
```

---

## 14. Toggle Responsáveis P2 (sem re-render)

No detail view do card P2, clicar no responsável atualiza o estado e persiste sem re-render completo:

```js
// No HTML do card detail, cada responsável tem:
// data-action="toggle-resp2" data-rid="<id do card>" data-tid="<id do membro>"

// No bind():
document.querySelectorAll('[data-action="toggle-resp2"]').forEach(el => {
  el.addEventListener('click', e => {
    const rid = e.currentTarget.dataset.rid;
    const tid = e.currentTarget.dataset.tid;
    const req = S.requests.find(x=>x.id===rid);
    if(!req) return;
    const idx = (req.responsible||[]).indexOf(tid);
    if(idx===-1) req.responsible = [...(req.responsible||[]), tid];
    else         req.responsible = req.responsible.filter(x=>x!==tid);
    save2();
    // Atualiza apenas o visual do botão sem re-render
    e.currentTarget.classList.toggle('resp-on', req.responsible.includes(tid));
  });
});
```

---

## 15. Drag & Drop Kanban

```js
function dnd1(){
  let dragId = null;

  document.querySelectorAll('.card[data-id]').forEach(el => {
    el.addEventListener('dragstart', e => {
      dragId = e.currentTarget.dataset.id;
      e.currentTarget.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
    });
    el.addEventListener('dragend', e => {
      e.currentTarget.classList.remove('dragging');
    });
  });

  document.querySelectorAll('.kcards[data-st]').forEach(zone => {
    zone.addEventListener('dragover', e => {
      e.preventDefault();
      zone.classList.add('dover');
    });
    zone.addEventListener('dragleave', () => zone.classList.remove('dover'));
    zone.addEventListener('drop', e => {
      e.preventDefault();
      zone.classList.remove('dover');
      const newStatus = zone.dataset.st;
      const card = S.cards.find(x => x.id === dragId);
      if(card && card.status !== newStatus){
        card.status = newStatus;
        save1();
        render();
      }
    });
  });
}

// dnd2() é idêntico mas opera em S.requests e chama save2()
```

---

## 16. Integração Claude AI

### System Prompt

```js
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
```

### callClaude

```js
async function callClaude(text, apiKey){
  const resp = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key':                              apiKey,
      'anthropic-version':                      '2023-06-01',
      'content-type':                           'application/json',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model:      'claude-opus-4-7',
      max_tokens: 8192,
      system:     AI_SYSTEM,
      messages:   [{role:'user', content:text}],
    }),
  });

  if(!resp.ok){
    let msg = `Erro ${resp.status}`;
    try{ const e=await resp.json(); msg=e.error?.message||msg; }catch(e2){}
    throw new Error(msg);
  }

  const data = await resp.json();
  const raw  = data.content[0].text.trim()
    .replace(/^```(?:json)?\n?/, '')
    .replace(/\n?```$/, '')
    .trim();
  return JSON.parse(raw);
}
```

### Fluxo de importação

1. Usuário abre modal ⚡ IA
2. Informa a `apiKey` (salva em `localStorage[KEY_APIKEY]`)
3. Cola o calendário no textarea
4. Clica **⚡ Gerar Cards** → `callClaude(text, apiKey)` → `AI.preview = resultado`
5. App mostra preview dos cards
6. Usuário confirma → `S.cards.unshift(...AI.preview.map(c=>({...c, id:uid(), createdAt:new Date().toISOString()})))` → `save1()` → `render()`

---

## 17. Inicialização Assíncrona

```js
// Tela de loading enquanto carrega Firebase
document.getElementById('root').innerHTML = `
  <div style="position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:var(--bg);">
    <div style="color:var(--t3);font-size:13px;letter-spacing:.5px;">Carregando...</div>
  </div>`;

(async () => {
  await loadUsers();   // carrega usuários do Firebase ou localStorage
  loadSession();       // verifica sessão ativa
  await load();        // carrega cards e requests
  render();            // renderiza app
})();

// Auto-sincronização ao voltar para a aba
window.addEventListener('focus', () => {
  if(!FB_URL || AUTH.showLogin) return;
  load().then(() => render());
});
```

---

## 18. Atalhos de Teclado

```js
// Registrado em bind():
document.addEventListener('keydown', e => {
  if(e.key === 'Escape'){
    if(S.modal.open)  { S.modal.open=false;  render(); }
    if(S.modal2.open) { S.modal2.open=false; render(); }
    if(AI.open)       { AI.open=false;       render(); }
    if(AUTH.showUsersModal){ AUTH.showUsersModal=false; render(); }
  }
  if(e.key === 'n' && !S.modal.open && !S.modal2.open && document.activeElement.tagName!=='INPUT' && document.activeElement.tagName!=='TEXTAREA'){
    if(S.pipe==='content')  { S.modal.open=true;  S.modal.id=null;  render(); }
    if(S.pipe==='requests') { S.modal2.open=true; S.modal2.id=null; render(); }
  }
});
```

---

## 19. Configuração Firebase

### Passo a passo

1. Criar projeto em [console.firebase.google.com](https://console.firebase.google.com)
2. Ativar **Realtime Database** (modo de teste inicialmente)
3. Ir em **Project Settings → Service Accounts → Database Secrets** → copiar o secret
4. Copiar a URL do banco (ex: `https://mkt-kami-default-rtdb.firebaseio.com`)
5. Preencher no HTML:
   ```js
   const FB_URL   = 'https://mkt-kami-default-rtdb.firebaseio.com';
   const FB_TOKEN = 'SEU_DATABASE_SECRET_AQUI';
   ```

### Regras recomendadas (Rules no console)

```json
{
  "rules": {
    ".read":  true,
    ".write": true
  }
}
```

> Para produção, restrinja as regras após configurar autenticação Firebase.

### Estrutura do banco

```
/
├── cards    → array de cards do Pipeline 1
├── requests → array de cards do Pipeline 2
└── users    → array de usuários (com avatares base64)
```

---

## 20. Deploy no Vercel

1. Preencher `FB_URL` e `FB_TOKEN` no arquivo `pipeline-mkt.html`
2. Acessar [vercel.com](https://vercel.com) → criar conta gratuita
3. **Add New Project → Upload** → arrastar `pipeline-mkt.html`
4. Vercel detecta arquivo estático e faz deploy automático
5. URL gerada: `https://nome-escolhido.vercel.app`
6. Compartilhar a URL com o time — todos acessam com suas credenciais

---

## 21. Credencial Padrão

```
E-mail:  admin@marketing.com
Senha:   Admin@123
Perfil:  Admin
```

> O Admin pode criar novos usuários, alterar fotos e remover contas pelo painel 👥.

---

## 22. Aviso sobre Código Duplicado

O arquivo atual contém **duas definições de `loadSession()`** (hoisting). JavaScript usa a última definição, que é a correta (verifica `localStorage` E `sessionStorage`). Se for recriar, use apenas a versão correta documentada na Seção 6.

---

## 23. Resumo das Funções

| Função | Descrição |
|---|---|
| `render()` | Re-renderiza o app completo |
| `html()` | Monta HTML da view atual |
| `hdr()` | Header |
| `flt1()` / `flt2()` | Barra de filtros |
| `sts1()` / `sts2()` | Barra de estatísticas |
| `kban1()` / `kban2()` | Kanban |
| `list1()` / `list2()` | Visualização em lista |
| `modal1()` / `modal2()` | Modal de criação/edição |
| `dashboard()` | Dashboard |
| `renderLogin()` | Tela de login |
| `renderUsersModal()` | Modal de gestão de usuários |
| `renderAIModal()` | Modal de importação via IA |
| `bind()` | Event listeners pós-render |
| `bindLogin()` | Event listeners da tela de login |
| `dnd1()` / `dnd2()` | Drag & drop |
| `callClaude()` | Chamada API Anthropic |
| `load()` | Carrega dados (async) |
| `save1()` / `save2()` | Persiste dados |
| `loadUsers()` | Carrega usuários (async) |
| `saveUsers()` | Persiste usuários |
| `loadSession()` | Verifica sessão ativa |
| `saveSession(remember)` | Salva sessão |
| `clearSession()` | Remove sessão |
| `doLogin()` | Autentica |
| `doLogout()` | Encerra sessão |
| `uavatar()` | Renderiza avatar |
| `hashPwd()` | Hash djb2 de senha |
| `uid()` | Gera ID único |
| `filtered1()` / `filtered2()` | Aplica filtros ativos |

---

## 24. Histórico de Versões

| Versão | Funcionalidade |
|---|---|
| v1 | Pipeline 1 — Conteúdo (kanban + lista + filtros + modal) |
| v2 | Pipeline 2 — Solicitações (formulário + kanban + modal) |
| v3 | Dashboard com KPIs e gráficos de barra |
| v4 | Autenticação individual com painel de usuários (admin) |
| v5 | "Lembrar-me" no login (localStorage vs sessionStorage) |
| v6 | Integração Claude API — importação de calendário via IA |
| v7 | Avatares de usuário (upload de foto, base64) |
| v8 | Firebase Realtime Database — dados compartilhados entre o time |

---

*Documentação gerada em 2026-05-18 — com trechos de código completos para replicação fiel do app.*
