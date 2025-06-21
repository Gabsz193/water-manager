// src/app/api/login/route.ts
import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase';

export async function POST(request: Request) {
  try {
    const { idToken } = await request.json();

    // Definir a duração da sessão (em segundos)
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 dias

    // Criar cookie de sessão
    const sessionCookie = await adminAuth().createSessionCookie(idToken, {
      expiresIn,
    });

    // Definir opções do cookie
    const options = {
      name: 'session',
      value: sessionCookie,
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    };

    // Retornar resposta com cookie
    const response = NextResponse.json({ success: true }, { status: 200 });
    response.cookies.set(options);

    return response;
  } catch (error) {
    console.error('Erro ao autenticar:', error);
    return NextResponse.json(
      { error: 'Falha na autenticação' },
      { status: 401 }
    );
  }
}
