// Gera certificado SSL autoassinado para desenvolvimento local
// Requer: npm install -g selfsigned  OU  node gerar-cert.js
const { execSync } = require('child_process');
const fs   = require('fs');
const path = require('path');

const sslDir = path.join(__dirname, 'ssl');
if (!fs.existsSync(sslDir)) fs.mkdirSync(sslDir);

try {
  require('selfsigned');
} catch {
  console.log('Instalando dependência selfsigned...');
  execSync('npm install selfsigned --no-save', { stdio: 'inherit' });
}

const selfsigned = require('selfsigned');
const attrs = [{ name: 'commonName', value: 'localhost' }];
const pems  = selfsigned.generate(attrs, {
  days: 365,
  algorithm: 'sha256',
  keySize: 2048,
  extensions: [
    { name: 'subjectAltName', altNames: [{ type: 2, value: 'localhost' }] },
  ],
});

fs.writeFileSync(path.join(sslDir, 'key.pem'),  pems.private);
fs.writeFileSync(path.join(sslDir, 'cert.pem'), pems.cert);

console.log('✅ Certificados gerados em ./ssl/');
console.log('   Reinicie o servidor: node serve.js');
console.log('   Acesse: https://localhost:8443');
console.log('');
console.log('⚠️  O navegador vai alertar "conexão não segura" pois é autoassinado.');
console.log('   Clique em "Avançado" → "Prosseguir para localhost" para aceitar.');
