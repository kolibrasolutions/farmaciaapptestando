import { useRef, useState } from 'react';
import { PDFExporter } from '../components/PDFExporter';

export default function RelatorioPDFPage() {
  const contentRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  
  const { exportToPDF } = PDFExporter({
    contentRef,
    fileName: 'relatorio-desempenho',
    onExportStart: () => {
      setIsExporting(true);
      setExportSuccess(false);
    },
    onExportEnd: () => {
      setIsExporting(false);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Exportação de Relatórios</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Exporte relatórios de desempenho em formato PDF
            </p>
          </div>
          <div>
            <button
              onClick={exportToPDF}
              disabled={isExporting}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              {isExporting ? (
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
          </div>
        </div>
        
        {/* Mensagem de sucesso */}
        {exportSuccess && (
          <div className="mb-8 bg-green-100 dark:bg-green-900/30 border-l-4 border-green-500 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-800 dark:text-green-200">
                  Relatório exportado com sucesso! O download do arquivo PDF foi iniciado.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Conteúdo a ser exportado */}
        <div ref={contentRef} className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          {/* Cabeçalho do relatório */}
          <div className="px-4 py-5 sm:px-6 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-800">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Relatório de Desempenho</h2>
                <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                  Período: Últimos 30 dias
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">FarmaTreinamento</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Data: {new Date().toLocaleDateString('pt-BR')}</p>
              </div>
            </div>
          </div>
          
          {/* Dados do usuário */}
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/20">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Ana Silva</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Balconista • Farmácia Central
                </p>
              </div>
            </div>
          </div>
          
          {/* Resumo */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Resumo de Desempenho</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
                <p className="text-sm font-medium text-blue-800 dark:text-blue-300">Sessões de Estudo</p>
                <p className="text-3xl font-bold text-blue-900 dark:text-blue-200">87</p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center">
                <p className="text-sm font-medium text-green-800 dark:text-green-300">Taxa de Acerto</p>
                <p className="text-3xl font-bold text-green-900 dark:text-green-200">76.1%</p>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 text-center">
                <p className="text-sm font-medium text-purple-800 dark:text-purple-300">Tempo Total</p>
                <p className="text-3xl font-bold text-purple-900 dark:text-purple-200">39h</p>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 text-center">
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Pontuação Total</p>
                <p className="text-3xl font-bold text-yellow-900 dark:text-yellow-200">4250</p>
              </div>
            </div>
          </div>
          
          {/* Progresso por Categoria */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Progresso por Categoria</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Problemas Respiratórios</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">85%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="h-2.5 rounded-full bg-green-600 dark:bg-green-500" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Problemas Dermatológicos</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">72%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="h-2.5 rounded-full bg-green-600 dark:bg-green-500" style={{ width: '72%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Dores</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">90%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="h-2.5 rounded-full bg-green-600 dark:bg-green-500" style={{ width: '90%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Problemas Digestivos</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">65%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="h-2.5 rounded-full bg-yellow-500 dark:bg-yellow-600" style={{ width: '65%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Problemas Oftálmicos</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">45%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="h-2.5 rounded-full bg-red-500 dark:bg-red-600" style={{ width: '45%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Problemas Bucais</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">60%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="h-2.5 rounded-full bg-yellow-500 dark:bg-yellow-600" style={{ width: '60%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Problemas Musculoesqueléticos</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">50%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="h-2.5 rounded-full bg-red-500 dark:bg-red-600" style={{ width: '50%' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Últimas Sessões */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Últimas Sessões de Estudo</h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900/50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Data
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Tipo
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Categoria
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Pontuação
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Acertos/Erros
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      18/04/2025
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300">
                        Flashcards
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      Problemas Respiratórios
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                      120 pts
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <span className="text-green-600 dark:text-green-400 font-medium">18</span>
                      {' / '}
                      <span className="text-red-600 dark:text-red-400 font-medium">3</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      17/04/2025
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300">
                        Quiz
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      Dores
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                      85 pts
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <span className="text-green-600 dark:text-green-400 font-medium">12</span>
                      {' / '}
                      <span className="text-red-600 dark:text-red-400 font-medium">3</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      16/04/2025
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300">
                        Simulador
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      Problemas Dermatológicos
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                      150 pts
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <span className="text-green-600 dark:text-green-400 font-medium">8</span>
                      {' / '}
                      <span className="text-red-600 dark:text-red-400 font-medium">2</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Recomendações */}
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Recomendações Personalizadas</h3>
            
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h4 className="text-md font-medium text-blue-800 dark:text-blue-300 mb-2">Foco em Áreas de Melhoria</h4>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  Recomendamos focar o estudo nas categorias com menor desempenho: 
                  <strong> Problemas Oftálmicos</strong>, 
                  <strong> Problemas Musculoesqueléticos</strong> e 
                  <strong> Problemas Bucais</strong>. 
                  Dedique pelo menos 30 minutos diários a estas áreas.
                </p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <h4 className="text-md font-medium text-green-800 dark:text-green-300 mb-2">Revisão Espaçada</h4>
                <p className="text-sm text-green-700 dark:text-green-400">
                  Para consolidar o conhecimento nas áreas fortes (Dores, Problemas Respiratórios e Dermatológicos), 
                  recomendamos revisões semanais usando o modo de estudo espaçado. 
                  Isso ajudará a manter o alto desempenho nestas categorias.
                </p>
              </div>
            </div>
          </div>
          
          {/* Rodapé do relatório */}
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/20 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
            <p>Este relatório foi gerado automaticamente pelo sistema FarmaTreinamento.</p>
            <p>© 2025 FarmaTreinamento. Todos os direitos reservados.</p>
          </div>
        </div>
        
        {/* Instruções */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300 mb-2">Como usar a exportação de relatórios</h3>
          <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
            <li>• Clique no botão "Exportar PDF" para gerar um relatório em formato PDF</li>
            <li>• O relatório será baixado automaticamente para o seu dispositivo</li>
            <li>• Você pode imprimir o PDF ou compartilhá-lo com outras pessoas</li>
            <li>• Os relatórios incluem dados de desempenho, progresso por categoria e recomendações personalizadas</li>
            <li>• Para relatórios mais detalhados ou personalizados, acesse a página de Relatórios completa</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
