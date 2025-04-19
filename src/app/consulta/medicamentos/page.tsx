"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ConsultaMedicamentosPage() {
  // Estados
  const [termoBusca, setTermoBusca] = useState('');
  const [resultados, setResultados] = useState([]);
  const [medicamentoSelecionado, setMedicamentoSelecionado] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [historicoBuscas, setHistoricoBuscas] = useState([]);
  const [buscaRealizada, setBuscaRealizada] = useState(false);

  // Carregar categorias
  useEffect(() => {
    const categoriasSimuladas = [
      { id: 'analgesicos', nome: 'Analgésicos e Antitérmicos' },
      { id: 'antialergicos', nome: 'Antialérgicos' },
      { id: 'antiinflamatorios', nome: 'Anti-inflamatórios' },
      { id: 'antigripais', nome: 'Antigripais e Descongestionantes' },
      { id: 'antitussigenos', nome: 'Antitussígenos e Expectorantes' },
      { id: 'digestivos', nome: 'Medicamentos para Sistema Digestivo' },
      { id: 'dermatologicos', nome: 'Medicamentos Dermatológicos' },
      { id: 'oftalmicos', nome: 'Medicamentos Oftálmicos' }
    ];
    
    setCategorias(categoriasSimuladas);
  }, []);

  // Função para buscar medicamentos
  const buscarMedicamentos = () => {
    if (!termoBusca && !categoriaSelecionada) return;
    
    setCarregando(true);
    setBuscaRealizada(true);
    
    // Simulação de busca no banco de dados
    setTimeout(() => {
      let resultadosSimulados = [];
      
      // Banco de dados simulado de medicamentos
      const medicamentosDB = [
        {
          id: 1,
          nome: 'Paracetamol',
          categoria: 'analgesicos',
          principioAtivo: 'Paracetamol',
          apresentacoes: ['Comprimido 500mg', 'Comprimido 750mg', 'Gotas 200mg/ml'],
          indicacoes: ['Dor leve a moderada', 'Febre'],
          contraindicacoes: ['Hipersensibilidade ao paracetamol', 'Doença hepática grave'],
          posologia: 'Adultos: 500-1000mg a cada 4-6 horas, não excedendo 4g por dia. Crianças: 10-15mg/kg a cada 4-6 horas.',
          efeitosAdversos: ['Reações alérgicas cutâneas', 'Alterações hepáticas (em doses altas)', 'Alterações hematológicas (raras)'],
          interacoes: ['Varfarina (potencialização do efeito anticoagulante)', 'Metoclopramida (aumento da absorção do paracetamol)', 'Álcool (aumento do risco de hepatotoxicidade)'],
          observacoes: 'Mais seguro que AINEs para pacientes com problemas gástricos, hipertensão ou insuficiência renal.'
        },
        {
          id: 2,
          nome: 'Ibuprofeno',
          categoria: 'antiinflamatorios',
          principioAtivo: 'Ibuprofeno',
          apresentacoes: ['Comprimido 200mg', 'Comprimido 400mg', 'Comprimido 600mg', 'Suspensão oral 100mg/5ml'],
          indicacoes: ['Dor leve a moderada', 'Febre', 'Inflamação', 'Dismenorreia'],
          contraindicacoes: ['Hipersensibilidade aos AINEs', 'Úlcera péptica ativa', 'Insuficiência renal grave', 'Último trimestre de gravidez'],
          posologia: 'Adultos: 200-400mg a cada 4-6 horas, não excedendo 2400mg por dia. Crianças: 5-10mg/kg a cada 6-8 horas.',
          efeitosAdversos: ['Distúrbios gastrointestinais', 'Reações alérgicas', 'Retenção de líquidos', 'Aumento do risco cardiovascular em uso prolongado'],
          interacoes: ['Anti-hipertensivos (redução do efeito)', 'Anticoagulantes (aumento do risco de sangramento)', 'Lítio (aumento dos níveis séricos)', 'Diuréticos (redução do efeito)'],
          observacoes: 'Tomar após as refeições para reduzir irritação gástrica. Usar a menor dose eficaz pelo menor tempo possível.'
        },
        {
          id: 3,
          nome: 'Loratadina',
          categoria: 'antialergicos',
          principioAtivo: 'Loratadina',
          apresentacoes: ['Comprimido 10mg', 'Xarope 1mg/ml'],
          indicacoes: ['Rinite alérgica', 'Urticária', 'Reações alérgicas cutâneas'],
          contraindicacoes: ['Hipersensibilidade à loratadina'],
          posologia: 'Adultos e crianças acima de 12 anos: 10mg uma vez ao dia. Crianças de 2-12 anos: 5mg uma vez ao dia.',
          efeitosAdversos: ['Sonolência (menos frequente que outros anti-histamínicos)', 'Boca seca', 'Cefaleia', 'Fadiga'],
          interacoes: ['Cetoconazol, eritromicina (aumento dos níveis de loratadina)', 'Depressores do SNC (potencialização dos efeitos)'],
          observacoes: 'Anti-histamínico de segunda geração com menor efeito sedativo. Pode ser tomado com ou sem alimentos.'
        },
        {
          id: 4,
          nome: 'Dexclorfeniramina',
          categoria: 'antialergicos',
          principioAtivo: 'Maleato de dexclorfeniramina',
          apresentacoes: ['Comprimido 2mg', 'Xarope 0,4mg/ml'],
          indicacoes: ['Rinite alérgica', 'Urticária', 'Reações alérgicas cutâneas', 'Prurido'],
          contraindicacoes: ['Hipersensibilidade à dexclorfeniramina', 'Glaucoma de ângulo fechado', 'Retenção urinária', 'Uso concomitante com inibidores da MAO'],
          posologia: 'Adultos: 2mg a cada 4-6 horas. Crianças de 6-12 anos: 1mg a cada 4-6 horas. Crianças de 2-6 anos: 0,5mg a cada 4-6 horas.',
          efeitosAdversos: ['Sonolência', 'Boca seca', 'Visão turva', 'Retenção urinária', 'Constipação'],
          interacoes: ['Depressores do SNC (potencialização dos efeitos)', 'Inibidores da MAO (potencialização dos efeitos anticolinérgicos)'],
          observacoes: 'Anti-histamínico de primeira geração com efeito sedativo pronunciado. Evitar dirigir ou operar máquinas após o uso.'
        },
        {
          id: 5,
          nome: 'Dipirona',
          categoria: 'analgesicos',
          principioAtivo: 'Dipirona sódica',
          apresentacoes: ['Comprimido 500mg', 'Comprimido 1g', 'Solução oral 500mg/ml', 'Solução injetável 500mg/ml'],
          indicacoes: ['Dor aguda', 'Febre alta'],
          contraindicacoes: ['Hipersensibilidade à dipirona', 'Discrasias sanguíneas', 'Porfiria hepática', 'Deficiência de G6PD'],
          posologia: 'Adultos: 500-1000mg a cada 6-8 horas, não excedendo 4g por dia. Crianças: 10-15mg/kg a cada 6-8 horas.',
          efeitosAdversos: ['Reações alérgicas', 'Agranulocitose (rara, mas grave)', 'Hipotensão (especialmente na forma injetável)', 'Reações cutâneas'],
          interacoes: ['Ciclosporina (redução dos níveis séricos)', 'Clorpromazina (hipotermia grave)'],
          observacoes: 'Proibido em alguns países devido ao risco de agranulocitose. No Brasil, é amplamente utilizado, mas deve-se estar atento aos sinais de reações adversas graves.'
        },
        {
          id: 6,
          nome: 'Dextromethorphan',
          categoria: 'antitussigenos',
          principioAtivo: 'Dextrometorfano',
          apresentacoes: ['Xarope 15mg/5ml', 'Pastilhas 5mg'],
          indicacoes: ['Tosse seca', 'Tosse irritativa não produtiva'],
          contraindicacoes: ['Hipersensibilidade ao dextrometorfano', 'Uso concomitante com inibidores da MAO', 'Asma brônquica aguda'],
          posologia: 'Adultos: 10-30mg a cada 4-8 horas, não excedendo 120mg por dia. Crianças de 6-12 anos: 5-10mg a cada 4 horas, não excedendo 60mg por dia.',
          efeitosAdversos: ['Sonolência', 'Tontura', 'Náusea', 'Confusão mental (em doses altas)'],
          interacoes: ['Inibidores da MAO (síndrome serotoninérgica)', 'ISRS (aumento do risco de síndrome serotoninérgica)', 'Quinidina (aumento dos níveis de dextrometorfano)'],
          observacoes: 'Antitussígeno não opioide que atua no centro da tosse. Não causa dependência, mas pode ser abusado em doses altas por seus efeitos psicoativos.'
        },
        {
          id: 7,
          nome: 'Ambroxol',
          categoria: 'antitussigenos',
          principioAtivo: 'Cloridrato de ambroxol',
          apresentacoes: ['Xarope 30mg/5ml', 'Solução oral 7,5mg/ml', 'Pastilhas 30mg'],
          indicacoes: ['Tosse produtiva', 'Doenças broncopulmonares com secreção mucosa viscosa'],
          contraindicacoes: ['Hipersensibilidade ao ambroxol', 'Primeiro trimestre de gravidez'],
          posologia: 'Adultos: 30mg 3 vezes ao dia. Crianças de 6-12 anos: 15mg 2-3 vezes ao dia. Crianças de 2-6 anos: 7,5mg 3 vezes ao dia.',
          efeitosAdversos: ['Distúrbios gastrointestinais leves', 'Reações cutâneas (raras)', 'Reações alérgicas'],
          interacoes: ['Antibióticos (aumento da concentração pulmonar de antibióticos)'],
          observacoes: 'Mucolítico que reduz a viscosidade do muco, facilitando sua expectoração. Pode ser usado em conjunto com antibióticos para infecções respiratórias.'
        },
        {
          id: 8,
          nome: 'Omeprazol',
          categoria: 'digestivos',
          principioAtivo: 'Omeprazol',
          apresentacoes: ['Cápsula 10mg', 'Cápsula 20mg', 'Cápsula 40mg'],
          indicacoes: ['Úlcera péptica', 'Doença do refluxo gastroesofágico', 'Síndrome de Zollinger-Ellison', 'Prevenção de úlceras por AINEs'],
          contraindicacoes: ['Hipersensibilidade ao omeprazol'],
          posologia: 'Adultos: 20-40mg uma vez ao dia, preferencialmente antes do café da manhã, por 4-8 semanas.',
          efeitosAdversos: ['Cefaleia', 'Diarreia', 'Náusea', 'Rash cutâneo', 'Deficiência de vitamina B12 (uso prolongado)'],
          interacoes: ['Diazepam, fenitoína (redução do metabolismo)', 'Clopidogrel (redução da ativação)', 'Atazanavir (redução da absorção)'],
          observacoes: 'Inibidor da bomba de prótons que reduz significativamente a secreção ácida gástrica. Tomar 30-60 minutos antes da primeira refeição do dia.'
        },
        {
          id: 9,
          nome: 'Hidrocortisona Creme',
          categoria: 'dermatologicos',
          principioAtivo: 'Acetato de hidrocortisona',
          apresentacoes: ['Creme 1%', 'Pomada 1%'],
          indicacoes: ['Dermatites', 'Eczemas', 'Prurido', 'Reações alérgicas cutâneas leves'],
          contraindicacoes: ['Hipersensibilidade à hidrocortisona', 'Infecções cutâneas não tratadas', 'Rosácea', 'Acne'],
          posologia: 'Aplicar uma fina camada na área afetada 2-3 vezes ao dia por até 7 dias.',
          efeitosAdversos: ['Atrofia cutânea (uso prolongado)', 'Telangiectasias', 'Dermatite de contato', 'Hipopigmentação'],
          interacoes: ['Não há interações significativas com uso tópico em áreas limitadas'],
          observacoes: 'Corticosteroide tópico de baixa potência, adequado para uso em áreas sensíveis e em crianças. Não usar em áreas extensas por períodos prolongados.'
        },
        {
          id: 10,
          nome: 'Cetoconazol Shampoo',
          categoria: 'dermatologicos',
          principioAtivo: 'Cetoconazol',
          apresentacoes: ['Shampoo 2%'],
          indicacoes: ['Dermatite seborreica do couro cabeludo', 'Caspa', 'Pitiríase versicolor'],
          contraindicacoes: ['Hipersensibilidade ao cetoconazol'],
          posologia: 'Aplicar no couro cabeludo, massagear e deixar agir por 3-5 minutos antes de enxaguar. Usar 2 vezes por semana por 2-4 semanas, depois uma vez por semana para manutenção.',
          efeitosAdversos: ['Irritação local', 'Ressecamento do cabelo e couro cabeludo', 'Aumento da oleosidade (rebote inicial)'],
          interacoes: ['Não há interações significativas com uso tópico'],
          observacoes: 'Antifúngico tópico eficaz contra Malassezia, fungo associado à dermatite seborreica e caspa. Pode ser usado preventivamente uma vez por semana após controle inicial.'
        }
      ];
      
      // Filtrar por termo de busca e/ou categoria
      if (termoBusca) {
        const termoBuscaLower = termoBusca.toLowerCase();
        resultadosSimulados = medicamentosDB.filter(med => 
          med.nome.toLowerCase().includes(termoBuscaLower) || 
          med.principioAtivo.toLowerCase().includes(termoBuscaLower)
        );
      } else if (categoriaSelecionada) {
        resultadosSimulados = medicamentosDB.filter(med => med.categoria === categoriaSelecionada);
      }
      
      // Adicionar ao histórico de buscas
      if (termoBusca && !historicoBuscas.includes(termoBusca)) {
        setHistoricoBuscas([termoBusca, ...historicoBuscas].slice(0, 5));
      }
      
      setResultados(resultadosSimulados);
      setCarregando(false);
    }, 800);
  };

  // Selecionar medicamento para visualizar detalhes
  const selecionarMedicamento = (medicamento) => {
    setMedicamentoSelecionado(medicamento);
    window.scrollTo(0, 0);
  };

  // Limpar seleção
  const limparSelecao = () => {
    setMedicamentoSelecionado(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Consulta de Medicamentos</h1>
            <p className="mt-1 text-sm text-gray-500">
              Pesquise informações sobre medicamentos isentos de prescrição
            </p>
          </div>
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 font-medium">
            Voltar ao Dashboard
          </Link>
        </div>
        
        {/* Área de busca */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <label htmlFor="termo-busca" className="block text-sm font-medium text-gray-700 mb-1">
                Buscar por nome ou princípio ativo
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  name="termo-busca"
                  id="termo-busca"
                  value={termoBusca}
                  onChange={(e) => setTermoBusca(e.target.value)}
                  className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                  placeholder="Ex: Paracetamol, Ibuprofeno, Loratadina..."
                />
                <button
                  onClick={buscarMedicamentos}
                  className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Buscar
                </button>
              </div>
              
              {/* Histórico de buscas */}
              {historicoBuscas.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs text-gray-500 mb-1">Buscas recentes:</p>
                  <div className="flex flex-wrap gap-2">
                    {historicoBuscas.map((termo, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setTermoBusca(termo);
                          setCategoriaSelecionada('');
                          setTimeout(() => buscarMedicamentos(), 100);
                        }}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200"
                      >
                        {termo}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-1">
                Filtrar por categoria
              </label>
              <select
                id="categoria"
                name="categoria"
                value={categoriaSelecionada}
                onChange={(e) => {
                  setCategoriaSelecionada(e.target.value);
                  setTermoBusca('');
                }}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="">Todas as categorias</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nome}
                  </option>
                ))}
              </select>
              
              <button
                onClick={buscarMedicamentos}
                className="mt-3 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Filtrar
              </button>
            </div>
          </div>
        </div>
        
        {/* Detalhes do medicamento selecionado */}
        {medicamentoSelecionado && (
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{medicamentoSelecionado.nome}</h2>
                <p className="text-sm text-gray-500">{medicamentoSelecionado.principioAtivo}</p>
              </div>
              <button
                onClick={limparSelecao}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Categoria</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {categorias.find(c => c.id === medicamentoSelecionado.categoria)?.nome || medicamentoSelecionado.categoria}
                  </dd>
                </div>
                
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Apresentações</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <ul className="list-disc pl-5 space-y-1">
                      {medicamentoSelecionado.apresentacoes.map((apresentacao, index) => (
                        <li key={index}>{apresentacao}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
                
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Indicações</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <ul className="list-disc pl-5 space-y-1">
                      {medicamentoSelecionado.indicacoes.map((indicacao, index) => (
                        <li key={index}>{indicacao}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
                
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Contraindicações</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <ul className="list-disc pl-5 space-y-1">
                      {medicamentoSelecionado.contraindicacoes.map((contraindicacao, index) => (
                        <li key={index}>{contraindicacao}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
                
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Posologia</dt>
                  <dd className="mt-1 text-sm text-gray-900">{medicamentoSelecionado.posologia}</dd>
                </div>
                
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Efeitos Adversos</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <ul className="list-disc pl-5 space-y-1">
                      {medicamentoSelecionado.efeitosAdversos.map((efeito, index) => (
                        <li key={index}>{efeito}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
                
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Interações Medicamentosas</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <ul className="list-disc pl-5 space-y-1">
                      {medicamentoSelecionado.interacoes.map((interacao, index) => (
                        <li key={index}>{interacao}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
                
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Observações Importantes</dt>
                  <dd className="mt-1 text-sm text-gray-900">{medicamentoSelecionado.observacoes}</dd>
                </div>
              </dl>
            </div>
            
            <div className="mt-6 flex justify-center">
              <button
                onClick={limparSelecao}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Voltar para resultados
              </button>
            </div>
          </div>
        )}
        
        {/* Resultados da busca */}
        {!medicamentoSelecionado && (
          <>
            {carregando ? (
              <div className="bg-white shadow rounded-lg p-6 flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <p className="ml-4 text-gray-700">Buscando medicamentos...</p>
              </div>
            ) : buscaRealizada ? (
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Resultados da busca
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    {resultados.length} medicamentos encontrados
                  </p>
                </div>
                
                {resultados.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {resultados.map((medicamento) => (
                      <li key={medicamento.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-lg font-medium text-blue-600">{medicamento.nome}</h4>
                            <p className="text-sm text-gray-500">{medicamento.principioAtivo}</p>
                            <p className="mt-1 text-sm text-gray-600">
                              {categorias.find(c => c.id === medicamento.categoria)?.nome}
                            </p>
                            <p className="mt-2 text-sm text-gray-600">
                              <span className="font-medium">Indicações:</span> {medicamento.indicacoes.join(', ')}
                            </p>
                          </div>
                          <button
                            onClick={() => selecionarMedicamento(medicamento)}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Ver detalhes
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-4 py-12 sm:px-6 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Nenhum medicamento encontrado</h3>
                    <p className="text-gray-500 mb-4">Tente buscar com outros termos ou selecione uma categoria diferente.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white shadow rounded-lg p-6 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-1">Busque um medicamento</h3>
                <p className="text-gray-500 mb-4">Digite o nome ou princípio ativo do medicamento, ou selecione uma categoria para começar.</p>
              </div>
            )}
          </>
        )}
        
        {/* Informações adicionais */}
        <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-2">Informações importantes</h3>
          <ul className="text-blue-800 space-y-2">
            <li>• As informações disponibilizadas são apenas para referência e não substituem a orientação de um profissional de saúde.</li>
            <li>• Sempre verifique a bula do medicamento para informações completas e atualizadas.</li>
            <li>• Em caso de dúvidas ou reações adversas, consulte um farmacêutico ou médico.</li>
            <li>• Medicamentos isentos de prescrição ainda podem causar efeitos colaterais e interações medicamentosas.</li>
            <li>• Siga sempre a posologia recomendada e não ultrapasse a dose máxima diária.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
