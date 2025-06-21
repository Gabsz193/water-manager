// src/lib/firebase.ts
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

// Inicializar o Firebase Admin se ainda não estiver inicializado
export function initializeFirebaseAdmin() {
  if (!getApps().length) {
    // Verificar se as variáveis de ambiente estão definidas
    if (!process.env.FIREBASE_PROJECT_ID ||
        !process.env.FIREBASE_CLIENT_EMAIL ||
        !process.env.FIREBASE_PRIVATE_KEY) {
      console.error('Credenciais do Firebase Admin não configuradas corretamente');
      return;
    }

    try {
      initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          // Garantir que as quebras de linha sejam processadas corretamente
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
      });
    } catch (error) {
      console.error('Erro ao inicializar Firebase Admin:', error);
    }
  }
}

// Exportar a instância do Auth
export const adminAuth = () => {
  initializeFirebaseAdmin();
  return getAuth();
};
