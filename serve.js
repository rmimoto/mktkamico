const http  = require('http');
const https = require('https');
const fs    = require('fs');
const path  = require('path');

const HTTP_PORT  = 8080;
const HTTPS_PORT = 8443;
const DIR        = __dirname;

const MIME = {
  '.html': 'text/html',
  '.js':   'text/javascript',
  '.css':  'text/css',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
};

const SECURITY_HEADERS = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options':    'nosniff',
  'X-Frame-Options':           'SAMEORIGIN',
  'Referrer-Policy':           'strict-origin-when-cross-origin',
  'Permissions-Policy':        'camera=(), microphone=(), geolocation=()',
};

function handler(req, res) {
  // Redireciona HTTP → HTTPS
  if (!req.socket.encrypted) {
    const host = (req.headers.host || `localhost:${HTTPS_PORT}`).replace(`:${HTTP_PORT}`, `:${HTTPS_PORT}`);
    res.writeHead(301, { Location: `https://${host}${req.url}` });
    res.end();
    return;
  }

  let filePath = path.join(DIR, req.url === '/' ? '/pipeline-mkt.html' : req.url);

  // Impede path traversal fora do diretório raiz
  if (!filePath.startsWith(DIR)) {
    res.writeHead(403); res.end('Forbidden'); return;
  }

  const ext = path.extname(filePath);
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'text/plain',
      ...SECURITY_HEADERS,
    });
    res.end(data);
  });
}

// Tenta carregar certificados TLS
const certKey  = path.join(DIR, 'ssl', 'key.pem');
const certFile = path.join(DIR, 'ssl', 'cert.pem');

if (fs.existsSync(certKey) && fs.existsSync(certFile)) {
  const sslOptions = {
    key:  fs.readFileSync(certKey),
    cert: fs.readFileSync(certFile),
    minVersion: 'TLSv1.2',
  };

  // Servidor HTTPS principal
  https.createServer(sslOptions, handler).listen(HTTPS_PORT, () => {
    console.log(`✅ HTTPS ativo em https://localhost:${HTTPS_PORT}`);
  });

  // Servidor HTTP apenas para redirecionar → HTTPS
  http.createServer(handler).listen(HTTP_PORT, () => {
    console.log(`↪  HTTP :${HTTP_PORT} redirecionando para HTTPS :${HTTPS_PORT}`);
  });

} else {
  // Sem certificados — avisa e sobe HTTP (apenas para desenvolvimento local)
  console.warn('⚠️  Certificados SSL não encontrados em ./ssl/key.pem e ./ssl/cert.pem');
  console.warn('   Rodando em HTTP. Para gerar certificados locais, execute: node gerar-cert.js');
  http.createServer(handler).listen(HTTP_PORT, () => {
    console.log(`🚧 DEV (HTTP) em http://localhost:${HTTP_PORT}`);
  });
}
