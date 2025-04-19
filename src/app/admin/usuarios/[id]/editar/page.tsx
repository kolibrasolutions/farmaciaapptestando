import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '../../../../components/AdminLayout';

// Tipos
interface Usuario {
  id: number;
  nome: string;
  email: string;
  cargo: string;
  role: string;
  status: string;
  ultimo_acesso: string;
}

export default function EditarUsuarioPage() {
  // Estados para o formulário
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cargo, setCargo] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [alterarSenha, setAlterarSenha] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);
  const [carregando, setCarregando] = useState(true);

  // Carregar dados do usuário
  useEffect(() => {
    // Simulação de carregamento de dados do banco
    setTimeout(() => {
      const usuarioSimulado: Usuario = {
        id: 2,
        nome: 'Balconista Demo',
        email: 'balconista@farmatreinamento.com.br',
        cargo: 'Balconista',
        role: 'balconista',
        status: 'ativo',
        ultimo_acesso: '2025-04-18T09:15:00'
      };
      
      setUsuario(usuarioSimulado);
      setNome(usuarioSimulado.nome);
      setEmail(usuarioSimulado.email);
      setCargo(usuarioSimulado.cargo);
      setRole(usuarioSimulado.role);
      setStatus(usuarioSimulado.status);
      setCarregando(false);
    }, 1000);
  }, []);

  // Função para validar o formulário
  const validarFormulario = () => {
    if (!nome) {
      setErro('O nome do usuário é obrigatório');
      return false;
    }
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setErro('Email inválido');
      return false;
    }
    
    if (!cargo) {
      setErro('O cargo é obrigatório');
      return false;
    }
    
    if (alterarSenha) {
      if (!senha || senha.length < 6) {
        setErro('A nova senha deve ter pelo menos 6 caracteres');
        return false;
      }
      
      if (senha !== confirmarSenha) {
        setErro('As senhas não coincidem');
        return false;
      }
    }
    
    return true;
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    setErro('');
    
    if (!validarFormulario()) {
      return;
    }
    
    setEnviando(true);
    
    // Simulação de envio para o servidor
    setTimeout(() => {
      setEnviando(false);
      setSucesso(true);
      
      // Redirecionar após alguns segundos
      setTimeout(() => {
        window.location.href = '/admin/farmacias/1'; // Substituir pelo ID real da farmácia
      }, 3000);
    }, 1500);
  };

  // Renderização condicional para carregamento
  if (carregando) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="ml-4 text-gray-700">Carregando dados do usuário...</p>
        </div>
      </AdminLayout>
    );
  }

  // Renderização condicional se o usuário não for encontrado
  if (!usuario) {
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
                Usuário não encontrado. <Link href="/admin/farmacias/1" className="font-medium underline text-yellow-700 hover:text-yellow-600">Voltar para a farmácia</Link>
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
          <h1 className="text-2xl font-bold text-gray-900">Editar Usuário</h1>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Editar informações de {usuario.nome}
          </p>
        </div>
        <Link 
          href="/admin/farmacias/1" 
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Voltar para farmácia
        </Link>
      </div>
      
      {/* Formulário de edição */}
      <div className="mt-6 bg-white shadow rounded-lg p-6">
        {sucesso ? (
          <div className="rounded-md bg-green-50 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">Usuário atualizado com sucesso!</h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>Você será redirecionado para a página da farmácia em instantes.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {erro && (
              <div className="rounded-md bg-red-50 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{erro}</h3>
                  </div>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                  Nome completo *
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="nome"
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email *
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="cargo" className="block text-sm font-medium text-gray-700">
                  Cargo na farmácia *
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="cargo"
                    id="cargo"
                    value={cargo}
                    onChange={(e) => setCargo(e.target.value)}
                    placeholder="Ex: Balconista, Farmacêutico, Gerente"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Função no sistema *
                </label>
                <div className="mt-1">
                  <select
                    id="role"
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    required
                  >
                    <option value="balconista">Balconista</option>
                    <option value="gerente">Gerente</option>
                  </select>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Gerentes podem adicionar/remover balconistas e ver relatórios
                </p>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Status *
                </label>
                <div className="mt-1">
                  <select
                    id="status"
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    required
                  >
                    <option value="ativo">Ativo</option>
                    <option value="pendente">Pendente</option>
                    <option value="inativo">Inativo</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-6">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="alterar-senha"
                      name="alterar-senha"
                      type="checkbox"
                      checked={alterarSenha}
                      onChange={(e) => setAlterarSenha(e.target.checked)}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="alterar-senha" className="font-medium text-gray-700">
                      Alterar senha
                    </label>
                    <p className="text-gray-500">Marque esta opção para definir uma nova senha para o usuário</p>
                  </div>
                </div>
              </div>

              {alterarSenha && (
                <>
                  <div className="sm:col-span-3">
                    <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
                      Nova senha *
                    </label>
                    <div className="mt-1">
                      <input
                        type="password"
                        name="senha"
                        id="senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        required={alterarSenha}
                        minLength={6}
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Mínimo de 6 caracteres
                    </p>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="confirmar-senha" className="block text-sm font-medium text-gray-700">
                      Confirmar nova senha *
                    </label>
                    <div className="mt-1">
                      <input
                        type="password"
                        name="confirmar-senha"
                        id="confirmar-senha"
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        required={alterarSenha}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={() => window.location.href = '/admin/farmacias/1'} // Substituir pelo ID real da farmácia
                className="mr-3 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={enviando}
                className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                  enviando ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                {enviando ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Salvando...
                  </>
                ) : (
                  'Salvar Alterações'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
      
      {/* Informações adicionais */}
      <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Informações adicionais
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Detalhes e estatísticas do usuário
          </p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                ID do usuário
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {usuario.id}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Último acesso
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {new Date(usuario.ultimo_acesso).toLocaleString('pt-BR')}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Flashcards visualizados
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                127
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Quizzes completados
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                18
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Taxa de acertos
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                76%
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </AdminLayout>
  );
}
