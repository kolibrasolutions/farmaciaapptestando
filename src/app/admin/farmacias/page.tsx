"use client";

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
  usuarios: number;
}

export default function AdminFarmacias() {
  // Estados
  const [farmacias, setFarmacias] = useState<Farmacia[]>([]);
  const [filtroStatus, setFiltroStatus] = useState<string>('todos');
  const [filtroPlano, setFiltroPlano] = useState<string>('todos');
  const [termoBusca, setTermoBusca] = useState<string>('');
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
          data_cadastro: '2025-04-18',
          usuarios: 10
        },
        {
          id: 2,
          nome: 'Farmácia Saúde Total',
          cnpj: '98.765.432/0001-10',
          email: 'contato@saudetotal.com.br',
          telefone: '(21) 9876-5432',
          plano: 'intermediario',
          status: 'ativo',
          data_cadastro: '2025-03-15',
          usuarios: 8
        },
        {
          id: 3,
          nome: 'Drogaria Bem Estar',
          cnpj: '45.678.901/0001-23',
          email: 'atendimento@drogariabemestar.com.br',
          telefone: '(31) 4567-8901',
          plano: 'basico',
          status: 'pendente',
          data_cadastro: '2025-04-10',
          usuarios: 5
        },
        {
          id: 4,
          nome: 'Farmácia Popular',
          cnpj: '56.789.012/0001-34',
          email: 'contato@farmaciapopular.com.br',
          telefone: '(41) 5678-9012',
          plano: 'intermediario',
          status: 'ativo',
          data_cadastro: '2025-02-20',
          usuarios: 7
        },
        {
          id: 5,
          nome: 'Drogaria Vida',
          cnpj: '67.890.123/0001-45',
          email: 'atendimento@drogariavida.com.br',
          telefone: '(51) 6789-0123',
          plano: 'premium',
          status: 'ativo',
          data_cadastro: '2025-01-05',
          usuarios: 12
        },
        {
          id: 6,
          nome: 'Farmácia Central',
          cnpj: '78.901.234/0001-56',
          email: 'central@farmaciacentral.com.br',
          telefone: '(61) 7890-1234',
          plano: 'basico',
          status: 'inativo',
          data_cadastro: '2024-12-10',
          usuarios: 3
        },
        {
          id: 7,
          nome: 'Drogaria Saúde',
          cnpj: '89.012.345/0001-67',
          email: 'contato@drogariasaude.com.br',
          telefone: '(71) 8901-2345',
          plano: 'basico',
          status: 'cancelado',
          data_cadastro: '2024-11-15',
          usuarios: 0
        }
      ];
      
      setFarmacias(farmaciasMock);
      setCarregando(false);
    }, 1000);
  }, []);

  // Filtrar farmácias
  const farmaciasFiltradas = farmacias.filter((farmacia) => {
    // Filtro por status
    if (filtroStatus !== 'todos' && farmacia.status !== filtroStatus) {
      return false;
    }
    
    // Filtro por plano
    if (filtroPlano !== 'todos' && farmacia.plano !== filtroPlano) {
      return false;
    }
    
    // Filtro por termo de busca
    if (termoBusca && !farmacia.nome.toLowerCase().includes(termoBusca.toLowerCase()) && 
        !farmacia.email.toLowerCase().includes(termoBusca.toLowerCase()) &&
        !farmacia.cnpj.includes(termoBusca)) {
      return false;
    }
    
    return true;
  });

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
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gerenciamento de Farmácias</h1>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Gerencie as farmácias cadastradas no sistema
          </p>
        </div>
        <Link 
          href="/admin/farmacias/nova" 
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Nova Farmácia
        </Link>
      </div>
      
      {/* Filtros e busca */}
      <div className="mt-4 bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <label htmlFor="filtro-status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="filtro-status"
              name="filtro-status"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
            >
              <option value="todos">Todos</option>
              <option value="ativo">Ativo</option>
              <option value="pendente">Pendente</option>
              <option value="inativo">Inativo</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="filtro-plano" className="block text-sm font-medium text-gray-700">
              Plano
            </label>
            <select
              id="filtro-plano"
              name="filtro-plano"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={filtroPlano}
              onChange={(e) => setFiltroPlano(e.target.value)}
            >
              <option value="todos">Todos</option>
              <option value="premium">Premium</option>
              <option value="intermediario">Intermediário</option>
              <option value="basico">Básico</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="termo-busca" className="block text-sm font-medium text-gray-700">
              Buscar
            </label>
            <input
              type="text"
              name="termo-busca"
              id="termo-busca"
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              placeholder="Nome, email ou CNPJ"
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Lista de farmácias */}
      <div className="mt-8">
        <div className="flex flex-col">
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
                        Usuários
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
                    {farmaciasFiltradas.length > 0 ? (
                      farmaciasFiltradas.map((farmacia) => (
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
                                : farmacia.status === 'inativo'
                                ? 'bg-gray-100 text-gray-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {farmacia.status === 'ativo' && 'Ativo'}
                              {farmacia.status === 'pendente' && 'Pendente'}
                              {farmacia.status === 'inativo' && 'Inativo'}
                              {farmacia.status === 'cancelado' && 'Cancelado'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {farmacia.usuarios}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(farmacia.data_cadastro).toLocaleDateString('pt-BR')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link href={`/admin/farmacias/${farmacia.id}`} className="text-blue-600 hover:text-blue-900 mr-4">
                              Detalhes
                            </Link>
                            <Link href={`/admin/farmacias/${farmacia.id}/editar`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                              Editar
                            </Link>
                            <button className="text-red-600 hover:text-red-900">
                              {farmacia.status === 'ativo' ? 'Desativar' : 'Ativar'}
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                          Nenhuma farmácia encontrada com os filtros selecionados.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resumo */}
      <div className="mt-8 bg-white shadow rounded-lg p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
          Resumo
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-gray-500">Total de Farmácias</p>
            <p className="mt-1 text-3xl font-semibold text-gray-900">{farmacias.length}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-gray-500">Farmácias Ativas</p>
            <p className="mt-1 text-3xl font-semibold text-green-600">
              {farmacias.filter(f => f.status === 'ativo').length}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-gray-500">Farmácias Pendentes</p>
            <p className="mt-1 text-3xl font-semibold text-yellow-600">
              {farmacias.filter(f => f.status === 'pendente').length}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-gray-500">Total de Usuários</p>
            <p className="mt-1 text-3xl font-semibold text-blue-600">
              {farmacias.reduce((total, farmacia) => total + farmacia.usuarios, 0)}
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
