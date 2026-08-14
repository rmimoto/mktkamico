/**
 * import-firestore.js
 * Importa os dados de data-export.json para o Firestore
 *
 * Pré-requisito: npm install firebase-admin
 *
 * Uso:
 *   1. Coloque serviceAccountKey.json do projeto DESTINO nesta pasta
 *      (Firebase Console → Configurações → Contas de serviço → Gerar nova chave privada)
 *   2. Coloque data-export.json nesta pasta
 *   3. node import-firestore.js
 *
 * ⚠️  ATENÇÃO: sobrescreve documentos existentes com o mesmo ID.
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

const KEY_PATH = path.join(__dirname, 'serviceAccountKey.json');
const DATA_PATH = path.join(__dirname, 'data-export.json');

if (!fs.existsSync(KEY_PATH)) {
  console.error('❌ serviceAccountKey.json não encontrado.');
  process.exit(1);
}
if (!fs.existsSync(DATA_PATH)) {
  console.error('❌ data-export.json não encontrado.');
  process.exit(1);
}

const serviceAccount = require(KEY_PATH);
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

async function importFirestore() {
  const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
  console.log('🔄 Importando dados para o Firestore...\n');

  for (const [col, docs] of Object.entries(data)) {
    console.log(`📂 Coleção: ${col}`);
    for (const [docId, docData] of Object.entries(docs)) {
      await db.collection(col).doc(docId).set(docData, { merge: true });
      console.log(`  ✅ ${docId}`);
    }
  }

  console.log('\n✅ Importação concluída! O sistema já pode ser acessado com os dados.');
  process.exit(0);
}

importFirestore().catch(e => {
  console.error('❌ Erro:', e.message);
  process.exit(1);
});
