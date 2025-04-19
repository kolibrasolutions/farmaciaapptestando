"use client";

import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Verificar se a solicitação já está autenticada
  const isAuthenticated = request.cookies.get('auth');
  
  if (isAuthenticated) {
    return NextResponse.next();
  }

  // Verificar cabeçalho de autenticação básica
  const authHeader = request.headers.get('authorization');
  
  if (authHeader) {
    const encodedCredentials = authHeader.split(' ')[1];
    const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString();
    const [username, password] = decodedCredentials.split(':');
    
    // Substitua por suas próprias credenciais
    if (username === 'admin' && password === 'farmacia123') {
      const response = NextResponse.next();
      
      // Definir cookie de autenticação
      response.cookies.set('auth', 'true', {
        httpOnly: true,
        maxAge: 60 * 60 * 24, // 1 dia
        path: '/',
      });
      
      return response;
    }
  }
  
  // Se não estiver autenticado, solicitar autenticação
  return new NextResponse('Autenticação necessária', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Acesso Protegido"',
    },
  });
}

export const config = {
  matcher: [
    /*
     * Corresponde a todas as rotas exceto:
     * 1. /api (rotas API)
     * 2. /_next (arquivos Next.js)
     * 3. /_static (se você armazenar arquivos estáticos neste caminho)
     * 4. /favicon.ico, /sitemap.xml (arquivos comuns)
     */
    '/((?!api|_next|_static|favicon.ico|sitemap.xml).*)',
  ],
};
