import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccount = JSON.parse(fs.readFileSync(path.join(__dirname, 'serviceAccountKey.json'), 'utf8'));
console.log(serviceAccount.project_id);
console.log(serviceAccount.client_email);
initializeApp({
    credential: cert(serviceAccount)
});
console.log("Proyecto:", serviceAccount.project_id);
console.log("Email:", serviceAccount.client_email);
console.log("Clave privada existe:", !!serviceAccount.private_key);
console.log("Firebase Admin inicializado")

const db = getFirestore();

export default db;