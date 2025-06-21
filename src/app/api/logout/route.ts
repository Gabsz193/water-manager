// src/app/api/logout/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
  // Criar resposta com cookie de sessão expirado
  const response = NextResponse.json({ success: true });

  // Remover o cookie de sessão
  response.cookies.set({
    name: 'session',
    value: '',
    maxAge: 0,
    path: '/',
  });

  return response;
}
