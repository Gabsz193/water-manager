// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { adminAuth } from './lib/firebase';

// Rotas públicas que não precisam de autenticação
const publicRoutes = [
  '/login',
  '/cadastro',
  '/recuperar-senha',
  '/_next',
  '/api',
  '/favicon.ico',
];

export async function middleware(request: NextRequest) {
  // Verificar se a rota é pública
  const isPublicRoute = publicRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Verificar o token de autenticação
  const sessionCookie = request.cookies.get('session')?.value;

  if (!sessionCookie) {
    // Redirecionar para login se não tiver cookie de sessão
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // Inicializar o Firebase Admin e verificar o cookie de sessão
    try {
      const auth = adminAuth();
      await auth.verifySessionCookie(sessionCookie, true);
      return NextResponse.next();
    } catch (adminError) {
      console.error('Erro ao verificar cookie de sessão:', adminError);
      // Tratamento específico para erros do Firebase Admin
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } catch (error) {
    console.error('Erro no middleware:', error);
    // Tratamento genérico de erros
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// Configurar o middleware para executar em todas as rotas exceto assets estáticos
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon\.ico).*)',
  ],
};
