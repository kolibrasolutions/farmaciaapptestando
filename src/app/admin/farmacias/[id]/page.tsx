"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '../../../components/AdminLayout';

// Tipos
interface Farmacia {
  id: number;
  nome: string;
  cnpj: string;
  email: string;
  telefone: string;
  endereco: string;
  plano: string;
  status: string;
  data_cadastro: string;
}

interface Usuario {
  id: number;
  nome: string;
  email: string;
  cargo: string;
  role: string;
  status: string;
  ultimo_acesso: string;
}

export default function DetalheFarmaciaPage() {
  // Estados
  const [farmacia, setFarmacia] = useState<Farmacia | null>(null);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [abaSelecionada, setAbaSelecionada] = useState<string>('detalhes');

  // Simular carregamento de dados do banco
  useEffect(() => {
    setTimeout(() => {
      // Dados simulados de uma farmácia
      const farmaciaSimulada: Farmacia = {
        id: 1,
        nome: 'Farmácia Demonstração',
        cnpj: '12.345.678/0001-90',
        email: 'demo@farmatreinamento.com.br',
        telefone: '(11) 1234-5678',
        endereco: 'Av. Exemplo, 123 - Centro, São Paulo - SP, 01234-567',
        plano: 'premium',
        status: 'ativo',
        data_cadastro: '2025-04-18'
      };
      
      // Dados simulados de usuários da farmácia
      const usuariosSimulados: Usuario[] = [
        {
          id: 1,
          nome: 'Gerente Demo',
          email: 'gerente@farmatreinamento.com.br',
          cargo: 'Gerente',
          role: 'gerente',
          status: 'ativo',
          ultimo_acesso: '2025-04-18T10:30:00'
        },
        {
          id: 2,
          nome: 'Balconista Demo',
          email: 'balconista@farmatreinamento.com.br',
          cargo: 'Balconista',
          role: 'balconista',
          status: 'ativo',
          ultimo_acesso: '2025-04-18T09:15:00'
        },
        {
          id: 3,
          nome: 'Maria Silva',
          email: 'maria@farmatreinamento.com.br',
          cargo: 'Balconista',
          role: 'balconista',
          status: 'ativo',
          ultimo_acesso: '2025-04-17T16:45:00'
        }
      ];
      
      setFarmacia(farmaciaSimulada);
      setUsuarios(usuariosSimulados);
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

  // Renderização condicional se a farmácia não for encontrada
  if (!farmacia) {
    return (
      <AdminLayout>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Farmácia não encontrada. <Link href="/admin/farmacias" className="font-medium underline text-yellow-700 hover:text-yellow-600">Voltar para a lista de farmácias</Link>
              </p>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{farmacia.nome}</h1>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Detalhes e gerenciamento da farmácia
          </p>
        </div>
        <div className="flex space-x-3">
          <Link 
            href={`/admin/farmacias/${farmacia.id}/editar`} 
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Editar
          </Link>
          <Link 
            href="/admin/farmacias" 
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Voltar para lista
          </Link>
        </div>
      </div>
      
      {/* Status da farmácia */}
      <div className="mt-4 flex items-center">
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
        <span className="ml-2 text-sm text-gray-500">
          Plano: <span className="font-medium">
            {farmacia.plano === 'premium' && 'Premium'}
            {farmacia.plano === 'intermediario' && 'Intermediário'}
            {farmacia.plano === 'basico' && 'Básico'}
          </span>
        </span>
        <span className="ml-2 text-sm text-gray-500">
          Cadastrado em: <span className="font-medium">{new Date(farmacia.data_cadastro).toLocaleDateString('pt-BR')}</span>
        </span>
      </div>
      
      {/* Abas de navegação */}
      <div className="mt-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setAbaSelecionada('detalhes')}
            className={`${
              abaSelecionada === 'detalhes'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Detalhes
          </button>
          <button
            onClick={() => setAbaSelecionada('usuarios')}
            className={`${
              abaSelecionada === 'usuarios'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Usuários ({usuarios.length})
          </button>
          <button
            onClick={() => setAbaSelecionada('assinatura')}
            className={`${
              abaSelecionada === 'assinatura'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Assinatura
          </button>
          <button
            onClick={() => setAbaSelecionada('relatorios')}
            className={`${
              abaSelecionada === 'relatorios'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Relatórios
          </button>
        </nav>
      </div>
      
      {/* Conteúdo da aba selecionada */}
      <div className="mt-6">
        {/* Aba de Detalhes */}
        {abaSelecionada === 'detalhes' && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Informações da Farmácia
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Detalhes e informações de contato
              </p>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Nome da farmácia
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {farmacia.nome}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    CNPJ
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {farmacia.cnpj}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Email
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {farmacia.email}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Telefone
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {farmacia.telefone}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Endereço
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {farmacia.endereco}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Plano
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {farmacia.plano === 'premium' && 'Premium'}
                    {farmacia.plano === 'intermediario' && 'Intermediário'}
                    {farmacia.plano === 'basico' && 'Básico'}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Status
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
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
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Data de cadastro
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {new Date(farmacia.data_cadastro).toLocaleDateString('pt-BR')}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        )}
        
        {/* Aba de Usuários */}
        {abaSelecionada === 'usuarios' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Usuários da Farmácia
              </h3>
              <Link 
                href={`/admin/farmacias/${farmacia.id}/usuarios/novo`} 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Adicionar Usuário
              </Link>
            </div>
            
            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Usuário
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Cargo
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Função
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Último acesso
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Ações</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {usuarios.map((usuario) => (
                          <tr key={usuario.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                  <span className="text-blue-800 font-medium">{usuario.nome.charAt(0)}</span>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {usuario.nome}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {usuario.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{usuario.cargo}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {usuario.role === 'gerente' && 'Gerente'}
                                {usuario.role === 'balconista' && 'Balconista'}
                                {usuario.role === 'admin' && 'Administrador'}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                usuario.status === 'ativo' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {usuario.status === 'ativo' ? 'Ativo' : 'Inativo'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(usuario.ultimo_acesso).toLocaleString('pt-BR')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Link href={`/admin/usuarios/${usuario.id}/editar`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                Editar
                              </Link>
                              <button className="text-red-600 hover:text-red-900">
                                {usuario.status === 'ativo' ? 'Desativar' : 'Ativar'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Aba de Assinatura */}
        {abaSelecionada === 'assinatura' && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Informações de Assinatura
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Detalhes do plano e pagamentos
              </p>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Plano atual
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {farmacia.plano === 'premium' && 'Premium'}
                    {farmacia.plano === 'intermediario' && 'Intermediário'}
                    {farmacia.plano === 'basico' && 'Básico'}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Valor mensal
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {farmacia.plano === 'premium' && 'R$ 299,90'}
                    {farmacia.plano === 'intermediario' && 'R$ 199,90'}
                    {farmacia.plano === 'basico' && 'R$ 99,90'}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Status da assinatura
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Ativa
                    </span>
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Próxima cobrança
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    18/05/2025
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Método de pagamento
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    Cartão de crédito final 4567
                  </dd>
                </div>
              </dl>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="button"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
              >
                Alterar plano
              </button>
              <button
                type="button"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Atualizar método de pagamento
              </button>
            </div>
          </div>
        )}
        
        {/* Aba de Relatórios */}
        {abaSelecionada === 'relatorios' && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Relatórios de Desempenho
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Estatísticas de uso e desempenho
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total de acessos (último mês)
                      </dt>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900">
                        247
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Quizzes completados
                      </dt>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900">
                        89
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Consultas realizadas
                      </dt>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900">
                        156
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Relatórios disponíveis</h4>
                <ul className="divide-y divide-gray-200">
                  <li className="py-4 flex justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Relatório de atividade de usuários</p>
                      <p className="text-sm text-gray-500">Detalhes de acesso e uso por usuário</p>
                    </div>
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Baixar
                    </button>
                  </li>
                  <li className="py-4 flex justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Relatório de desempenho em treinamentos</p>
                      <p className="text-sm text-gray-500">Resultados de quizzes e simulados</p>
                    </div>
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Baixar
                    </button>
                  </li>
                  <li className="py-4 flex justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Relatório de consultas</p>
                      <p className="text-sm text-gray-500">Histórico de consultas de medicamentos e sintomas</p>
                    </div>
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Baixar
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
