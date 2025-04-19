import { useState, useEffect } from 'react';
import Link from 'next/link';

// Componente para a página de redirecionamento após login
export default function RedirectPage() {
  const [countdown, setCountdown] = useState(3);
  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Em uma implementação real, obteríamos essas informações de um token ou cookie
    // Para demonstração, vamos simular com base na URL
    const urlParams = new URLSearchParams(window.location.search);
    const role = urlParams.get('role') || 'balconista';
    const name = urlParams.get('name') || 'Usuário';
    
    setUserRole(role);
    setUserName(name);

    // Iniciar contagem regressiva
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer);
          // Redirecionar com base no papel do usuário
          if (role === 'admin') {
            window.location.href = '/admin/dashboard';
          } else if (role === 'gerente') {
            window.location.href = '/gerente/dashboard';
          } else {
            window.location.href = '/treinamento/flashcards';
          }
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Determinar destino com base no papel
  const getDestination = () => {
    switch (userRole) {
      case 'admin':
        return 'o painel administrativo';
      case 'gerente':
        return 'o painel de gerenciamento';
      default:
        return 'a área de treinamento';
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login realizado com sucesso!
          </h2>
          <div className="mt-8 bg-green-50 border-l-4 border-green-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">
                  Bem-vindo(a), <span className="font-semibold">{userName}</span>!
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <p className="text-gray-600">
            Você será redirecionado para {getDestination()} em <span className="font-bold text-blue-600">{countdown}</span> segundos...
          </p>
          <div className="mt-4 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
        
        <div className="mt-8">
          <p className="text-gray-500 text-sm">
            Se não for redirecionado automaticamente, clique no botão abaixo:
          </p>
          <div className="mt-4">
            {userRole === 'admin' && (
              <Link href="/admin/dashboard" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Ir para o Painel Administrativo
              </Link>
            )}
            {userRole === 'gerente' && (
              <Link href="/gerente/dashboard" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Ir para o Painel de Gerenciamento
              </Link>
            )}
            {userRole === 'balconista' && (
              <Link href="/treinamento/flashcards" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Ir para a Área de Treinamento
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
