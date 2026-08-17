// ═══════════════════════════════════════════════════════════════════
// DASHBOARD UPDATER — Google Apps Script
// Lê as duas planilhas, atualiza o Drive e publica no GitHub Pages
// ═══════════════════════════════════════════════════════════════════

// ── 1. CONFIGURAÇÃO ─────────────────────────────────────────────────
const SURVEY_ID   = '1kwoYFnYB3nAH0pktwTabr3i6XplS4qyvYzij4WzZzTk';
const ENROLL_ID   = '1I6amIV9LMAI_NZe-W96CmcSLngBs1zxpoXnF2ZrgJhI';
const FOLLOWUP_ID = '1MXnrf3xs2PVmvQ0xbxWhHKnNS2k2kt1oJuVSHOtljkM';
const HTML_NAME  = 'dashboard_cursos.html';
const FOLDER_ID  = '';

// ── GITHUB ──────────────────────────────────────────────────────────
const GITHUB_TOKEN = '';
const GITHUB_USER  = 'mktkamico';
const GITHUB_REPO  = 'dashboard_kamiforeducation_mkt';
const GITHUB_FILE  = 'dashboard_cursos.html';

// Índices corretos das colunas (verificados na planilha real)
const C_ESTADO    = 5;   // "Selecione o seu estado"
const C_PERFIL    = 6;   // "Você é..."
const C_CURSO     = 8;   // "Qual curso está participando hoje?"
const C_NPS       = 9;   // "De 0 a 10..."
const C_RETORNO   = 10;  // "Já participou de outros cursos..."
const C_INTERESSE = 11;  // "Teria interesse em participar..."
const C_NIVEL     = 14;  // "Qual o seu nível com a Terapia Capilar"

// Mapa de estado (nome completo → abreviação)
const ESTADO_MAP = {
  'São Paulo':         'SP',
  'Rio de Janeiro':    'RJ',
  'Rio Grande do Sul': 'RS',
};

// Mapa: texto exato da coluna "Qual curso" → dados do dashboard
const CURSO_MAP = {
  '09/03 | São Paulo':                                                                                  { e:'SP', m:'Março', c:'09/03 · SP' },
  '16/03 | Online':                                                                                     { e:'SP', m:'Março', c:'16/03 · Online' },
  '23/03 | Rio de Janeiro - Adriano':                                                                   { e:'RJ', m:'Março', c:'23/03 · RJ — Adriano' },
  '23/03 | Rio Grande do Sul - Anderson':                                                               { e:'RS', m:'Março', c:'23/03 · RS — Anderson' },
  '23/03 | São Paulo - Beto':                                                                           { e:'SP', m:'Março', c:'23/03 · SP — Beto' },
  '30/03 | Rio de Janeiro - Michele Souza':                                                             { e:'RJ', m:'Março', c:'30/03 · RJ — Michele Souza' },
  '30/03 | Rio Grande do Sul - Mariana Compagnoni':                                                     { e:'RS', m:'Março', c:'30/03 · RS — Mariana Compagnoni' },
  '30/03 | São Paulo - Ana Paula Soares':                                                               { e:'SP', m:'Março', c:'30/03 · SP — Ana Paula Soares' },
  '27/04 | Rio de Janeiro - Virginia Nascimento':                                                       { e:'RJ', m:'Abril', c:'27/04 · RJ — Virginia Nascimento' },
  '27/04 | Rio Grande do Sul - Anderson Claro':                                                         { e:'RS', m:'Abril', c:'27/04 · RS — Anderson Claro' },
  '27/04 | São Paulo - Beto, Dani, Luiza e Paula':                                                      { e:'SP', m:'Abril', c:'27/04 · SP — Beto, Dani, Luiza e Paula' },
  '04/05 | São Paulo - Encontro Toctus com Hellen Anício':                                              { e:'SP', m:'Maio',  c:'04/05 · SP — Encontro Toctus c/ Hellen Anício' },
  '11/05 | São Paulo - Terapia Capilar - com Ana Soares':                                               { e:'SP', m:'Maio',  c:'11/05 · SP — Terapia Capilar c/ Ana Soares' },
  '11/05 | Rio de Janeiro - Terapia Capilar - Como transformar suas práticas profissionais - com Gheuri Zangelmi': { e:'RJ', m:'Maio', c:'11/05 · RJ — Terapia Capilar c/ Gheuri Zangelmi' },
};

// Array de mapeamento: cada entrada lê uma aba e, opcionalmente, filtra por estado
// estadoFiltro: quando definido, filtra as linhas pelo valor da coluna "Estado"
const SHEET_MAP = [
  { sheet:'Balens Art of Colors - 27/04', estadoFiltro:'SP', c:'27/04 · SP — Beto, Dani, Luiza e Paula',          e:'SP', m:'Abril', lbl:'27/04 SP — Beto+' },
  { sheet:'Balens Art of Colors - 27/04', estadoFiltro:'RJ', c:'27/04 · RJ — Virginia Nascimento',                e:'RJ', m:'Abril', lbl:'27/04 RJ — Virginia' },
  { sheet:'Balens Art of Colors - 27/04', estadoFiltro:'RS', c:'27/04 · RS — Anderson Claro',                     e:'RS', m:'Abril', lbl:'27/04 RS — Anderson' },
  { sheet:'Encontro Toctus - 04/05 (SP)',      c:'04/05 · SP — Encontro Toctus c/ Hellen Anício',   e:'SP', m:'Maio',  lbl:'04/05 SP — Encontro' },
  { sheet:'Terapia Capilar (RJ) 11/05',        c:'11/05 · RJ — Terapia Capilar c/ Gheuri Zangelmi', e:'RJ', m:'Maio',  lbl:'11/05 RJ — Gheuri' },
  { sheet:'Protocol & Profit (SP) 11/05',      c:'11/05 · SP — Terapia Capilar c/ Ana Soares',      e:'SP', m:'Maio',  lbl:'11/05 SP — Protocol&Profit' },
  { sheet:'Terapia Capilar (RS) - 18/05',      c:'18/05 · RS — Terapia Capilar',                    e:'RS', m:'Maio',  lbl:'18/05 RS — Terapia Capilar' },
];


// ── 2. FUNÇÃO PRINCIPAL ─────────────────────────────────────────────
function updateDashboard() {
  const allJs      = buildAllArray();
  const enrollJs   = buildEnrollmentArray();
  const followupJs = buildFollowupArray();
  const hoje       = Utilities.formatDate(new Date(), 'America/Sao_Paulo', 'dd/MM/yyyy');

  let html = lerHtmlDoDrive();

  html = html.replace(/const ALL\s*=\s*\[[\s\S]*?\];/,         'const ALL = [\n' + allJs + '\n];');
  html = html.replace(/const ENROLLMENT\s*=\s*\[[\s\S]*?\];/,  'const ENROLLMENT = [\n' + enrollJs + '\n];');
  html = html.replace(/const FOLLOWUP\s*=\s*\[[\s\S]*?\];/,    'const FOLLOWUP = [\n' + followupJs + '\n];');
  html = html.replace(/Atualizado: \d{2}\/\d{2}\/\d{4}/,       'Atualizado: ' + hoje);

  salvarHtmlNoDrive(html);
  Logger.log('✅ Dashboard atualizado em ' + hoje);
}


// ── 3. MONTA O ARRAY ALL ────────────────────────────────────────────
function buildAllArray() {
  const ss    = SpreadsheetApp.openById(SURVEY_ID);
  const sheet = ss.getSheets()[0];
  const rows  = sheet.getDataRange().getValues();
  const lines = [];

  for (let i = 1; i < rows.length; i++) {
    const row      = rows[i];
    const cursoRaw = String(row[C_CURSO]).trim();
    const map      = CURSO_MAP[cursoRaw];

    if (!map) {
      Logger.log('⚠️ Linha ' + (i + 1) + ' — curso não mapeado: "' + cursoRaw + '"');
      continue;
    }

    // Estado da planilha → abreviação
    const estadoRaw = String(row[C_ESTADO]).trim();
    const e = ESTADO_MAP[estadoRaw] || map.e;

    const nps     = parseInt(row[C_NPS]) || 10;
    const ret     = String(row[C_RETORNO]).trim().toUpperCase().startsWith('S') ? 'Sim' : 'Não';
    const intRaw  = String(row[C_INTERESSE]).trim().toLowerCase();
    const int     = intRaw.startsWith('s') ? 'Sim'
                  : intRaw.startsWith('n') ? 'Não'
                  : 'Prefiro não opinar';
    const niv     = String(row[C_NIVEL] || '').trim();
    const p       = String(row[C_PERFIL]).trim();

    lines.push(
      `  {e:${j(e)},m:${j(map.m)},c:${j(map.c)},p:${j(p)},nps:${nps},ret:${j(ret)},int:${j(int)},niv:${j(niv)}}`
    );
  }

  Logger.log('✅ ALL: ' + lines.length + ' registros lidos.');
  return lines.join(',\n');
}


// ── 4. MONTA O ARRAY ENROLLMENT ─────────────────────────────────────
function buildEnrollmentArray() {
  const ss    = SpreadsheetApp.openById(ENROLL_ID);
  const lines = [];

  // Cache de abas por nome para não reler a mesma aba mais de uma vez
  const sheetCache = {};
  ss.getSheets().forEach(s => { sheetCache[s.getName().trim()] = s; });

  SHEET_MAP.forEach(meta => {
    const sheet = sheetCache[meta.sheet];
    if (!sheet) {
      Logger.log('⚠️ Aba não encontrada: ' + meta.sheet);
      return;
    }

    const rows   = sheet.getDataRange().getValues();
    const header = rows[0].map(h => String(h).toUpperCase().trim());
    const pCol   = header.findIndex(h => h.includes('PRESEN'));
    const eCol   = meta.estadoFiltro ? header.findIndex(h => h.includes('ESTADO')) : -1;

    if (pCol === -1) {
      Logger.log('⚠️ Coluna PRESENÇA não encontrada na aba: ' + meta.sheet);
      return;
    }

    let inscritos = 0, presentes = 0, faltaram = 0;

    for (let i = 1; i < rows.length; i++) {
      const val = String(rows[i][pCol]).toUpperCase().trim();
      if (!val) continue;

      // Filtra por estado quando a aba é compartilhada entre estados
      if (meta.estadoFiltro && eCol !== -1) {
        const estadoRaw  = String(rows[i][eCol]).trim();
        const estadoAbrev = ESTADO_MAP[estadoRaw] || estadoRaw.toUpperCase();
        if (estadoAbrev !== meta.estadoFiltro) continue;
      }

      inscritos++;
      if (val === 'SIM' || val === 'NOVO INSCRITO') presentes++;
      else faltaram++;
    }

    lines.push(
      `  {c:${j(meta.c)},e:${j(meta.e)},m:${j(meta.m)},lbl:${j(meta.lbl)},inscritos:${inscritos},presentes:${presentes},faltaram:${faltaram}}`
    );
    Logger.log('✅ ' + meta.lbl + ': ' + inscritos + ' inscritos, ' + presentes + ' presentes, ' + faltaram + ' faltaram');
  });

  return lines.join(',\n');
}


// ── 5. MONTA O ARRAY FOLLOWUP (pesquisa pós-curso) ──────────────────
function buildFollowupArray() {
  const ss     = SpreadsheetApp.openById(FOLLOWUP_ID);
  const sheets = ss.getSheets();
  const lines  = [];

  sheets.forEach(sheet => {
    const rows = sheet.getDataRange().getValues();
    if (rows.length < 2) return;

    // Detecta o índice do cabeçalho (linha com "ESTADO" ou "Estado")
    let hIdx = 0;
    for (let i = 0; i < Math.min(5, rows.length); i++) {
      if (String(rows[i][0]).toUpperCase().includes('ESTADO')) { hIdx = i; break; }
    }

    // Detecta colunas pelo conteúdo do cabeçalho
    const header = rows[hIdx].map(h => String(h).toUpperCase().trim());
    const findCol = (...keys) => header.findIndex(h => keys.every(k => h.includes(k)));

    const COL = {
      presente: findCol('PRESENTE'),
      motivo:   findCol('IMPEDIU'),
      ret:      header.findIndex((h, i) => h.includes('INTERESSE') && !h.includes('EVOLUIR') && i < 12),
      dor_nc:   header.findIndex((h, i) => h.includes('DOR') && i < 12),
      evol_nc:  header.findIndex((h, i) => (h.includes('EVOLUIR') || (h.includes('INTERESSE') && h.includes('EVOLUI'))) && i < 12),
      aplicou:  findCol('APLICAR'),
      dor_c:    header.findIndex((h, i) => h.includes('DOR') && i >= 12),
      evol_c:   header.findIndex((h, i) => h.includes('EVOLUIR') && i >= 12),
    };

    const get = (row, col) => col > -1 ? String(row[col] || '').trim() : '';

    for (let i = hIdx + 2; i < rows.length; i++) {
      const row     = rows[i];
      const estado  = String(row[0] || '').trim().toUpperCase();
      if (!estado || estado.length > 3) continue;

      const presRaw  = String(row[COL.presente] || '').trim().toUpperCase();
      const presente = presRaw === 'OK' || presRaw === 'SIM';

      const motivo  = get(row, COL.motivo);
      const ret     = get(row, COL.ret);
      const dor     = presente ? get(row, COL.dor_c)  : get(row, COL.dor_nc);
      const evoluir = presente ? get(row, COL.evol_c) : get(row, COL.evol_nc);
      const aplicou = get(row, COL.aplicou);

      if (!motivo && !ret && !dor && !evoluir && !aplicou) continue;

      lines.push(
        `  {e:${j(estado)},p:${presente},motivo:${j(motivo)},ret:${j(ret)},dor:${j(dor)},evoluir:${j(evoluir)},aplicou:${j(aplicou)}}`
      );
    }
    Logger.log('✅ Followup "' + sheet.getName() + '": processado');
  });

  Logger.log('✅ FOLLOWUP: ' + lines.length + ' registros.');
  return lines.join(',\n');
}


// ── 6. DRIVE: LÊ O HTML ─────────────────────────────────────────────
function lerHtmlDoDrive() {
  const iter = FOLDER_ID
    ? DriveApp.getFolderById(FOLDER_ID).getFilesByName(HTML_NAME)
    : DriveApp.getFilesByName(HTML_NAME);
  if (!iter.hasNext()) throw new Error('Arquivo "' + HTML_NAME + '" não encontrado no Drive.');
  return iter.next().getBlob().getDataAsString('UTF-8');
}


// ── 6. SALVA NO DRIVE + PUBLICA NO GITHUB ───────────────────────────
function salvarHtmlNoDrive(content) {
  // — Salva no Drive —
  const iter = FOLDER_ID
    ? DriveApp.getFolderById(FOLDER_ID).getFilesByName(HTML_NAME)
    : DriveApp.getFilesByName(HTML_NAME);

  if (iter.hasNext()) {
    iter.next().setContent(content);
  } else {
    const blob = Utilities.newBlob(content, 'text/html', HTML_NAME);
    FOLDER_ID
      ? DriveApp.getFolderById(FOLDER_ID).createFile(blob)
      : DriveApp.createFile(blob);
  }
  Logger.log('✅ Drive atualizado.');

  // — Publica no GitHub Pages —
  try {
    const apiUrl = 'https://api.github.com/repos/' + GITHUB_USER + '/' + GITHUB_REPO + '/contents/' + GITHUB_FILE;

    // 1. Busca o SHA atual do arquivo (obrigatório para atualizar)
    const getResp = UrlFetchApp.fetch(apiUrl, {
      method: 'get',
      headers: { Authorization: 'token ' + GITHUB_TOKEN },
      muteHttpExceptions: true
    });
    const fileMeta = JSON.parse(getResp.getContentText());
    const sha = fileMeta.sha || '';

    // 2. Codifica o HTML em Base64
    const encoded = Utilities.base64Encode(
      Utilities.newBlob(content, 'text/html').getBytes()
    );

    // 3. Faz o PUT para atualizar o arquivo no repositório
    const putResp = UrlFetchApp.fetch(apiUrl, {
      method: 'put',
      headers: {
        Authorization: 'token ' + GITHUB_TOKEN,
        'Content-Type': 'application/json'
      },
      payload: JSON.stringify({
        message: 'Dashboard atualizado automaticamente — ' +
                 Utilities.formatDate(new Date(), 'America/Sao_Paulo', 'dd/MM/yyyy HH:mm'),
        content: encoded,
        sha: sha
      }),
      muteHttpExceptions: true
    });

    const status = putResp.getResponseCode();
    if (status === 200 || status === 201) {
      Logger.log('✅ GitHub Pages atualizado! Status: ' + status);
    } else {
      Logger.log('⚠️ GitHub respondeu com status ' + status + ': ' + putResp.getContentText());
    }

  } catch (err) {
    Logger.log('❌ Erro ao publicar no GitHub: ' + err.message);
  }
}


// ── 7. GATILHO SEMANAL (execute apenas uma vez) ─────────────────────
function criarGatilhoSemanal() {
  // Remove gatilhos anteriores de updateDashboard
  ScriptApp.getProjectTriggers().forEach(t => {
    if (t.getHandlerFunction() === 'updateDashboard') ScriptApp.deleteTrigger(t);
  });

  // Gatilho 1: toda segunda-feira às 12h
  ScriptApp.newTrigger('updateDashboard')
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.MONDAY)
    .atHour(12)
    .create();

  // Gatilho 2: toda segunda-feira às 18h
  ScriptApp.newTrigger('updateDashboard')
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.MONDAY)
    .atHour(18)
    .create();

  Logger.log('✅ Gatilhos criados: toda segunda-feira às 12h e às 18h.');
}


// ── 8. DIAGNÓSTICO ──────────────────────────────────────────────────
function debugColunas() {
  const rows = SpreadsheetApp.openById(SURVEY_ID).getSheets()[0].getRange(1, 1, 2, 20).getValues();
  Logger.log('CABEÇALHO: ' + JSON.stringify(rows[0]));
  Logger.log('LINHA 2:   ' + JSON.stringify(rows[1]));
}

function debugAbas() {
  SpreadsheetApp.openById(ENROLL_ID).getSheets()
    .forEach(s => Logger.log('ABA: "' + s.getName() + '"'));
}

function testarGitHub() {
  const apiUrl = 'https://api.github.com/repos/' + GITHUB_USER + '/' + GITHUB_REPO + '/contents/' + GITHUB_FILE;
  const resp = UrlFetchApp.fetch(apiUrl, {
    headers: { Authorization: 'token ' + GITHUB_TOKEN },
    muteHttpExceptions: true
  });
  Logger.log('Status: ' + resp.getResponseCode());
  const meta = JSON.parse(resp.getContentText());
  Logger.log('SHA: ' + meta.sha);
  Logger.log('Tamanho: ' + meta.size + ' bytes');
}


// ── UTILITÁRIO ──────────────────────────────────────────────────────
function j(s) { return JSON.stringify(String(s)); }
