import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function RelatoriosPage() {
  // Estados
  const [carregando, setCarregando] = useState(true);
  const [periodoSelecionado, setPeriodoSelecionado] = useState('ultimos_30_dias');
  const [usuarioSelecionado, setUsuarioSelecionado] = useState('todos');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('todas');
  const [usuarios, setUsuarios] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [dadosDesempenho, setDadosDesempenho] = useState(null);
  const [formatoPDF, setFormatoPDF] = useState(false);
  const [gerandoPDF, setGerandoPDF] = useState(false);

  // Carregar dados iniciais
  useEffect(() => {
    // Simulação de carregamento de dados
    setTimeout(() => {
      // Usuários simulados
      const usuariosSimulados = [
        { id: 1, nome: 'Ana Silva', cargo: 'Balconista', foto: '/imagens/usuarios/ana.jpg' },
        { id: 2, nome: 'Carlos Oliveira', cargo: 'Balconista', foto: '/imagens/usuarios/carlos.jpg' },
        { id: 3, nome: 'Mariana Santos', cargo: 'Balconista', foto: '/imagens/usuarios/mariana.jpg' },
        { id: 4, nome: 'Roberto Almeida', cargo: 'Balconista', foto: '/imagens/usuarios/roberto.jpg' },
        { id: 5, nome: 'Juliana Costa', cargo: 'Balconista', foto: '/imagens/usuarios/juliana.jpg' }
      ];
      
      // Categorias simuladas
      const categoriasSimuladas = [
        { id: 'respiratorio', nome: 'Problemas Respiratórios' },
        { id: 'dermatologico', nome: 'Problemas Dermatológicos' },
        { id: 'dores', nome: 'Dores' },
        { id: 'digestivo', nome: 'Problemas Digestivos' },
        { id: 'oftalmico', nome: 'Problemas Oftálmicos' },
        { id: 'bucal', nome: 'Problemas Bucais' },
        { id: 'musculoesqueletico', nome: 'Problemas Musculoesqueléticos' }
      ];
      
      setUsuarios(usuariosSimulados);
      setCategorias(categoriasSimuladas);
      
      // Carregar dados de desempenho iniciais
      carregarDadosDesempenho('ultimos_30_dias', 'todos', 'todas');
    }, 1000);
  }, []);

  // Função para carregar dados de desempenho
  const carregarDadosDesempenho = (periodo, usuario, categoria) => {
    setCarregando(true);
    
    // Simulação de carregamento de dados do banco
    setTimeout(() => {
      // Dados simulados de desempenho
      const dadosSimulados = {
        resumo: {
          totalSessoes: 87,
          tempoTotal: 2340, // em minutos
          pontuacaoTotal: 4250,
          acertos: 312,
          erros: 98,
          taxaAcerto: 76.1,
          flashcardsRevisados: 430,
          quizCompletos: 23,
          simulacoesCompletas: 12
        },
        progresso: {
          respiratorio: 85,
          dermatologico: 72,
          dores: 90,
          digestivo: 65,
          oftalmico: 45,
          bucal: 60,
          musculoesqueletico: 50
        },
        desempenhoTempo: {
          labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
          pontuacao: [850, 1200, 950, 1250],
          tempo: [480, 720, 540, 600]
        },
        desempenhoCategoria: {
          labels: ['Respiratório', 'Dermatológico', 'Dores', 'Digestivo', 'Oftálmico', 'Bucal', 'Musculoesquelético'],
          acertos: [85, 72, 90, 65, 45, 60, 50],
          erros: [15, 28, 10, 35, 55, 40, 50]
        },
        ultimasSessoes: [
          { id: 1, data: '18/04/2025', tipo: 'Flashcards', categoria: 'Problemas Respiratórios', pontuacao: 120, tempo: 25, acertos: 18, erros: 3 },
          { id: 2, data: '17/04/2025', tipo: 'Quiz', categoria: 'Dores', pontuacao: 85, tempo: 15, acertos: 12, erros: 3 },
          { id: 3, data: '16/04/2025', tipo: 'Simulador', categoria: 'Problemas Dermatológicos', pontuacao: 150, tempo: 30, acertos: 8, erros: 2 },
          { id: 4, data: '15/04/2025', tipo: 'Flashcards', categoria: 'Problemas Digestivos', pontuacao: 95, tempo: 20, acertos: 14, erros: 6 },
          { id: 5, data: '14/04/2025', tipo: 'Quiz', categoria: 'Problemas Respiratórios', pontuacao: 110, tempo: 18, acertos: 16, erros: 4 }
        ],
        areasFortes: [
          { categoria: 'Dores', taxaAcerto: 90 },
          { categoria: 'Problemas Respiratórios', taxaAcerto: 85 },
          { categoria: 'Problemas Dermatológicos', taxaAcerto: 72 }
        ],
        areasMelhoria: [
          { categoria: 'Problemas Oftálmicos', taxaAcerto: 45 },
          { categoria: 'Problemas Musculoesqueléticos', taxaAcerto: 50 },
          { categoria: 'Problemas Bucais', taxaAcerto: 60 }
        ]
      };
      
      // Filtrar dados com base nos parâmetros
      // (Em uma implementação real, isso seria feito no backend)
      
      setDadosDesempenho(dadosSimulados);
      setCarregando(false);
    }, 800);
  };

  // Função para atualizar filtros
  const atualizarFiltros = () => {
    carregarDadosDesempenho(periodoSelecionado, usuarioSelecionado, categoriaSelecionada);
  };

  // Função para gerar PDF
  const gerarPDF = () => {
    setGerandoPDF(true);
    setFormatoPDF(true);
    
    // Simulação de geração de PDF
    setTimeout(() => {
      // Em uma implementação real, aqui seria chamada uma biblioteca como jsPDF
      // ou um endpoint do servidor para gerar o PDF
      
      alert('Relatório em PDF gerado com sucesso! Em uma implementação real, o arquivo seria baixado automaticamente.');
      
      setGerandoPDF(false);
      setFormatoPDF(false);
    }, 2000);
  };

  // Função para formatar tempo (minutos para horas e minutos)
  const formatarTempo = (minutos) => {
    const horas = Math.floor(minutos / 60);
    const min = minutos % 60;
    return `${horas}h ${min}min`;
  };

  // Renderização condicional para carregamento
  if (carregando) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="ml-4 text-gray-700">Carregando relatórios...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Relatórios de Progresso e Desempenho</h1>
            <p className="mt-1 text-sm text-gray-500">
              Acompanhe o progresso e desempenho dos balconistas no treinamento
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={gerarPDF}
              disabled={gerandoPDF}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {gerandoPDF ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Gerando PDF...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Exportar PDF
                </>
              )}
            </button>
            <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 font-medium">
              Voltar ao Dashboard
            </Link>
          </div>
        </div>
        
        {/* Filtros */}
        {!formatoPDF && (
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <label htmlFor="periodo" className="block text-sm font-medium text-gray-700 mb-1">
                  Período
                </label>
                <select
                  id="periodo"
                  name="periodo"
                  value={periodoSelecionado}
                  onChange={(e) => setPeriodoSelecionado(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="ultimos_7_dias">Últimos 7 dias</option>
                  <option value="ultimos_30_dias">Últimos 30 dias</option>
                  <option value="ultimos_90_dias">Últimos 90 dias</option>
                  <option value="ano_atual">Ano atual</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="usuario" className="block text-sm font-medium text-gray-700 mb-1">
                  Balconista
                </label>
                <select
                  id="usuario"
                  name="usuario"
                  value={usuarioSelecionado}
                  onChange={(e) => setUsuarioSelecionado(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="todos">Todos os balconistas</option>
                  {usuarios.map((usuario) => (
                    <option key={usuario.id} value={usuario.id}>
                      {usuario.nome}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-1">
                  Categoria
                </label>
                <select
                  id="categoria"
                  name="categoria"
                  value={categoriaSelecionada}
                  onChange={(e) => setCategoriaSelecionada(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="todas">Todas as categorias</option>
                  {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                onClick={atualizarFiltros}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Atualizar Relatório
              </button>
            </div>
          </div>
        )}
        
        {/* Resumo */}
        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          <div className="px-4 py-5 sm:px-6 bg-blue-50 border-b border-blue-100">
            <h2 className="text-xl font-bold text-gray-900">Resumo de Desempenho</h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Visão geral do desempenho no período selecionado
            </p>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <p className="text-sm font-medium text-blue-800">Sessões de Estudo</p>
                <p className="text-3xl font-bold text-blue-900">{dadosDesempenho.resumo.totalSessoes}</p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <p className="text-sm font-medium text-green-800">Taxa de Acerto</p>
                <p className="text-3xl font-bold text-green-900">{dadosDesempenho.resumo.taxaAcerto}%</p>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <p className="text-sm font-medium text-purple-800">Tempo Total</p>
                <p className="text-3xl font-bold text-purple-900">{formatarTempo(dadosDesempenho.resumo.tempoTotal)}</p>
              </div>
              
              <div className="bg-yellow-50 rounded-lg p-4 text-center">
                <p className="text-sm font-medium text-yellow-800">Pontuação Total</p>
                <p className="text-3xl font-bold text-yellow-900">{dadosDesempenho.resumo.pontuacaoTotal}</p>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Atividades Concluídas</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Flashcards revisados:</span>
                    <span className="font-medium">{dadosDesempenho.resumo.flashcardsRevisados}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Quiz completos:</span>
                    <span className="font-medium">{dadosDesempenho.resumo.quizCompletos}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Simulações completas:</span>
                    <span className="font-medium">{dadosDesempenho.resumo.simulacoesCompletas}</span>
                  </li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Áreas Fortes</h3>
                <ul className="space-y-2">
                  {dadosDesempenho.areasFortes.map((area, index) => (
                    <li key={index} className="flex justify-between">
                      <span className="text-gray-600">{area.categoria}:</span>
                      <span className="font-medium text-green-600">{area.taxaAcerto}% de acerto</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Áreas para Melhoria</h3>
                <ul className="space-y-2">
                  {dadosDesempenho.areasMelhoria.map((area, index) => (
                    <li key={index} className="flex justify-between">
                      <span className="text-gray-600">{area.categoria}:</span>
                      <span className="font-medium text-red-600">{area.taxaAcerto}% de acerto</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Progresso por Categoria */}
        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          <div className="px-4 py-5 sm:px-6 bg-green-50 border-b border-green-100">
            <h2 className="text-xl font-bold text-gray-900">Progresso por Categoria</h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Percentual de domínio em cada categoria de conhecimento
            </p>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {Object.entries(dadosDesempenho.progresso).map(([categoria, valor]) => (
                <div key={categoria}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      {categorias.find(cat => cat.id === categoria)?.nome || categoria}
                    </span>
                    <span className="text-sm font-medium text-gray-700">{valor}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        valor >= 80 ? 'bg-green-600' : 
                        valor >= 60 ? 'bg-yellow-500' : 
                        'bg-red-500'
                      }`} 
                      style={{ width: `${valor}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Gráfico de barras para desempenho por categoria */}
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Acertos vs. Erros por Categoria</h3>
              <div className="h-80 relative">
                {/* Em uma implementação real, aqui seria renderizado um gráfico de barras usando uma biblioteca como Chart.js ou Recharts */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-gray-500 text-center">
                    Gráfico de barras mostrando acertos vs. erros por categoria.<br />
                    Em uma implementação real, este seria um gráfico interativo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Desempenho ao Longo do Tempo */}
        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          <div className="px-4 py-5 sm:px-6 bg-purple-50 border-b border-purple-100">
            <h2 className="text-xl font-bold text-gray-900">Desempenho ao Longo do Tempo</h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Evolução da pontuação e tempo de estudo
            </p>
          </div>
          
          <div className="p-6">
            <div className="h-80 relative">
              {/* Em uma implementação real, aqui seria renderizado um gráfico de linha usando uma biblioteca como Chart.js ou Recharts */}
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-500 text-center">
                  Gráfico de linha mostrando a evolução da pontuação e tempo de estudo ao longo do período.<br />
                  Em uma implementação real, este seria um gráfico interativo.
                </p>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Últimas Sessões de Estudo</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Data
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tipo
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Categoria
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pontuação
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tempo
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acertos/Erros
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dadosDesempenho.ultimasSessoes.map((sessao) => (
                      <tr key={sessao.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {sessao.data}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            sessao.tipo === 'Flashcards' ? 'bg-blue-100 text-blue-800' :
                            sessao.tipo === 'Quiz' ? 'bg-green-100 text-green-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {sessao.tipo}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {sessao.categoria}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {sessao.pontuacao} pts
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {sessao.tempo} min
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="text-green-600 font-medium">{sessao.acertos}</span>
                          {' / '}
                          <span className="text-red-600 font-medium">{sessao.erros}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recomendações */}
        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          <div className="px-4 py-5 sm:px-6 bg-yellow-50 border-b border-yellow-100">
            <h2 className="text-xl font-bold text-gray-900">Recomendações Personalizadas</h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Sugestões para melhorar o desempenho com base nos dados analisados
            </p>
          </div>
          
          <div className="p-6">
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-md font-medium text-blue-800 mb-2">Foco em Áreas de Melhoria</h3>
                <p className="text-sm text-blue-700">
                  Recomendamos focar o estudo nas categorias com menor desempenho: 
                  <strong> Problemas Oftálmicos</strong>, 
                  <strong> Problemas Musculoesqueléticos</strong> e 
                  <strong> Problemas Bucais</strong>. 
                  Dedique pelo menos 30 minutos diários a estas áreas.
                </p>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-md font-medium text-green-800 mb-2">Revisão Espaçada</h3>
                <p className="text-sm text-green-700">
                  Para consolidar o conhecimento nas áreas fortes (Dores, Problemas Respiratórios e Dermatológicos), 
                  recomendamos revisões semanais usando o modo de estudo espaçado. 
                  Isso ajudará a manter o alto desempenho nestas categorias.
                </p>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="text-md font-medium text-purple-800 mb-2">Prática com Simulador</h3>
                <p className="text-sm text-purple-700">
                  Observamos que seu desempenho melhora significativamente após sessões no simulador de atendimento. 
                  Recomendamos realizar pelo menos 2 simulações por semana, focando nas categorias de melhoria.
                </p>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="text-md font-medium text-yellow-800 mb-2">Consistência de Estudo</h3>
                <p className="text-sm text-yellow-700">
                  Notamos que sessões mais curtas e frequentes (15-20 minutos) produzem melhores resultados 
                  do que sessões longas e esporádicas. Recomendamos manter um cronograma regular de estudo 
                  com sessões diárias mais curtas.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Informações adicionais */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-800 mb-2">Informações sobre o Relatório</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Os dados apresentados neste relatório são baseados nas atividades realizadas no período selecionado</li>
            <li>• O progresso por categoria é calculado com base na taxa de acerto e na quantidade de conteúdo estudado</li>
            <li>• As recomendações são geradas automaticamente com base nos padrões de estudo e desempenho</li>
            <li>• Para obter relatórios mais detalhados ou personalizados, entre em contato com o administrador do sistema</li>
            <li>• Você pode exportar este relatório em formato PDF para compartilhar ou arquivar</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
