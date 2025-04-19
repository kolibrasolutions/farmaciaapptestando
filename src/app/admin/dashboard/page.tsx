import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '../../components/AdminLayout';

// Tipos
interface Farmacia {
  id: number;
  nome: string;
  cnpj: string;
  email: string;
  telefone: string;
  plano: string;
  status: string;
  data_cadastro: string;
}

// Componente principal
export default function AdminDashboard() {
  // Estados
  const [farmacias, setFarmacias] = useState<Farmacia[]>([]);
  const [totalUsuarios, setTotalUsuarios] = useState<number>(0);
  const [usuariosAtivos, setUsuariosAtivos] = useState<number>(0);
  const [carregando, setCarregando] = useState<boolean>(true);

  // Carregar dados
  useEffect(() => {
    // Simular carregamento de dados do banco
    setTimeout(() => {
      const farmaciasMock: Farmacia[] = [
        {
          id: 1,
          nome: 'Farmácia Demonstração',
          cnpj: '12.345.678/0001-90',
          email: 'demo@farmatreinamento.com.br',
          telefone: '(11) 1234-5678',
          plano: 'premium',
          status: 'ativo',
          data_cadastro: '2025-04-18'
        },
        {
          id: 2,
          nome: 'Farmácia Saúde Total',
          cnpj: '98.765.432/0001-10',
          email: 'contato@saudetotal.com.br',
          telefone: '(21) 9876-5432',
          plano: 'intermediario',
          status: 'ativo',
          data_cadastro: '2025-03-15'
        },
        {
          id: 3,
          nome: 'Drogaria Bem Estar',
          cnpj: '45.678.901/0001-23',
          email: 'atendimento@drogariabemestar.com.br',
          telefone: '(31) 4567-8901',
          plano: 'basico',
          status: 'pendente',
          data_cadastro: '2025-04-10'
        }
      ];
      
      setFarmacias(farmaciasMock);
      setTotalUsuarios(27);
      setUsuariosAtivos(22);
      setCarregando(false);
    }, 1000);
  }, []);

  // Renderização condicional para carregamento
  if (carregando) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="ml-4 text-gray-700">Carregando dados...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="px-4 py-5 sm:px-6">
        <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Visão geral do sistema e estatísticas
        </p>
      </div>
      
      {/* Cards de estatísticas */}
      <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Card de farmácias */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total de Farmácias
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {farmacias.length}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6">
            <div className="text-sm">
              <Link href="/admin/farmacias" className="font-medium text-blue-600 hover:text-blue-500">
                Ver todas as farmácias
              </Link>
            </div>
          </div>
        </div>

        {/* Card de usuários */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total de Usuários
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {totalUsuarios}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6">
            <div className="text-sm">
              <Link href="/admin/usuarios" className="font-medium text-blue-600 hover:text-blue-500">
                Ver todos os usuários
              </Link>
            </div>
          </div>
        </div>

        {/* Card de usuários ativos */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Usuários Ativos
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {usuariosAtivos} ({Math.round((usuariosAtivos / totalUsuarios) * 100)}%)
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6">
            <div className="text-sm">
              <Link href="/admin/relatorios" className="font-medium text-blue-600 hover:text-blue-500">
                Ver relatórios de atividade
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de farmácias recentes */}
      <div className="mt-8">
        <div className="pb-5 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Farmácias Recentes
          </h3>
        </div>
        <div className="mt-4 flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Farmácia
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Plano
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Data de Cadastro
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Ações</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {farmacias.map((farmacia) => (
                      <tr key={farmacia.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-800 font-medium">{farmacia.nome.charAt(0)}</span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {farmacia.nome}
                              </div>
                              <div className="text-sm text-gray-500">
                                {farmacia.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {farmacia.plano === 'premium' && 'Premium'}
                            {farmacia.plano === 'intermediario' && 'Intermediário'}
                            {farmacia.plano === 'basico' && 'Básico'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            farmacia.status === 'ativo' 
                              ? 'bg-green-100 text-green-800' 
                              : farmacia.status === 'pendente'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {farmacia.status === 'ativo' && 'Ativo'}
                            {farmacia.status === 'pendente' && 'Pendente'}
                            {farmacia.status === 'inativo' && 'Inativo'}
                            {farmacia.status === 'cancelado' && 'Cancelado'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(farmacia.data_cadastro).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link href={`/admin/farmacias/${farmacia.id}`} className="text-blue-600 hover:text-blue-900 mr-4">
                            Detalhes
                          </Link>
                          <Link href={`/admin/farmacias/${farmacia.id}/editar`} className="text-indigo-600 hover:text-indigo-900">
                            Editar
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 text-right">
          <Link href="/admin/farmacias/nova" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Adicionar Nova Farmácia
          </Link>
        </div>
      </div>

      {/* Ações rápidas */}
      <div className="mt-8">
        <div className="pb-5 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Ações Rápidas
          </h3>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Gerenciar Conteúdo
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>
                  Adicione ou edite flashcards, perguntas de quiz e informações sobre medicamentos.
                </p>
              </div>
              <div className="mt-5">
                <Link href="/admin/conteudo" className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Ir para Gerenciamento de Conteúdo
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Relatórios de Desempenho
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>
                  Visualize relatórios de desempenho dos balconistas e estatísticas de uso do sistema.
                </p>
              </div>
              <div className="mt-5">
                <Link href="/admin/relatorios" className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Ver Relatórios
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
