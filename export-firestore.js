/**
 * export-firestore.js
 * Exporta todos os dados do Firestore para data-export.json
 *
 * Pré-requisito: npm install firebase-admin
 *
 * Uso:
 *   1. Baixe a Service Account Key no Firebase Console:
 *      Configurações do Projeto → Contas de serviço → Gerar nova chave privada
 *      Salve como serviceAccountKey.json na mesma pasta deste script
 *   2. node export-firestore.js
 *
 * O arquivo data-export.json gerado pode ser importado com import-firestore.js
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

const KEY_PATH = path.join(__dirname, 'serviceAccountKey.json');
if (!fs.existsSync(KEY_PATH)) {
  console.error('❌ Arquivo serviceAccountKey.json não encontrado.');
  console.error('   Baixe em: Firebase Console → Configurações → Contas de serviço → Gerar nova chave privada');
  process.exit(1);
}

const serviceAccount = require(KEY_PATH);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function exportFirestore() {
  console.log('🔄 Exportando dados do Firestore...');
  const exported = {};

  // Coleções a exportar
  const collections = ['state', 'users', 'notifications', 'portals'];

  for (const col of collections) {
    try {
      const snapshot = await db.collection(col).get();
      if (snapshot.empty) {
        console.log(`  ⚪ ${col}: vazia`);
        continue;
      }
      exported[col] = {};
      snapshot.forEach(doc => {
        exported[col][doc.id] = doc.data();
      });
      console.log(`  ✅ ${col}: ${snapshot.size} documento(s)`);
    } catch (e) {
      console.log(`  ⚠️  ${col}: erro — ${e.message}`);
    }
  }

  const outPath = path.join(__dirname, 'data-export.json');
  fs.writeFileSync(outPath, JSON.stringify(exported, null, 2), 'utf8');
  console.log(`\n✅ Exportado com sucesso: ${outPath}`);
  console.log('   Envie data-export.json + import-firestore.js para o Renan.');
  process.exit(0);
}

exportFirestore().catch(e => {
  console.error('❌ Erro:', e.message);
  process.exit(1);
});
