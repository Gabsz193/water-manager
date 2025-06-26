import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware para proteção de rotas do Next.js
 * 
 * Este middleware verifica se o usuário está autenticado (possui o cookie auth_token)
 * para acessar rotas protegidas. Se não estiver autenticado, redireciona para o login.
 * 
 * O gerenciamento do token é feito pelo AuthContext.tsx no cliente, que:
 * 1. Cria o cookie auth_token ao fazer login
 * 2. Atualiza o token a cada 55 minutos
 * 3. Remove o cookie ao fazer logout
 */

// Rotas públicas que não exigem autenticação
const publicRoutes = [
  '/login',
  '/cadastro',
  '/recuperar-senha',
  // Recursos estáticos e APIs
  '/_next',
  '/favicon.ico',
  '/api/auth',
  '/images',
  '/assets'
];

export async function middleware(request: NextRequest) {
  // Verificar se a rota atual é pública
  const isPublicRoute = publicRoutes.some(route => 
    request.nextUrl.pathname === route || request.nextUrl.pathname.startsWith(`${route}/`)
  );

  // Se for uma rota pública, permitir acesso
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Verificar se o usuário tem um token de autenticação
  const authToken = request.cookies.get('auth_token')?.value;

  // Se não houver token, redirecionar para login
  if (!authToken) {
    // Armazenar a URL original para redirecionar após o login
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirectTo', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Se houver token, permitir acesso
  // A validação do token ocorre no cliente via Firebase SDK
  return NextResponse.next();
}

// Configurar para executar o middleware apenas em rotas específicas
export const config = {
  matcher: [
    /*
     * Corresponde a todas as rotas exceto:
     * 1. Arquivos estáticos (_next/static, _next/image, favicon.ico)
     * 2. Rotas da API (/api/)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
