"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ConsultaSintomasPage() {
  // Estados
  const [termoBusca, setTermoBusca] = useState('');
  const [resultados, setResultados] = useState([]);
  const [sintomaSelecionado, setSintomaSelecionado] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [historicoBuscas, setHistoricoBuscas] = useState([]);
  const [buscaRealizada, setBuscaRealizada] = useState(false);
  const [filtroPublico, setFiltroPublico] = useState('adultos');

  // Carregar categorias
  useEffect(() => {
    const categoriasSimuladas = [
      { id: 'respiratorio', nome: 'Problemas Respiratórios' },
      { id: 'dermatologico', nome: 'Problemas Dermatológicos' },
      { id: 'dores', nome: 'Dores' },
      { id: 'digestivo', nome: 'Problemas Digestivos' },
      { id: 'oftalmico', nome: 'Problemas Oftálmicos' },
      { id: 'bucal', nome: 'Problemas Bucais' },
      { id: 'musculoesqueletico', nome: 'Problemas Musculoesqueléticos' }
    ];
    
    setCategorias(categoriasSimuladas);
  }, []);

  // Função para buscar sintomas
  const buscarSintomas = () => {
    if (!termoBusca && !categoriaSelecionada) return;
    
    setCarregando(true);
    setBuscaRealizada(true);
    
    // Simulação de busca no banco de dados
    setTimeout(() => {
      let resultadosSimulados = [];
      
      // Banco de dados simulado de sintomas e condições
      const sintomasDB = [
        {
          id: 1,
          sintoma: 'Tosse seca',
          categoria: 'respiratorio',
          descricao: 'Tosse sem produção de catarro, geralmente irritativa e persistente.',
          publicos: ['adultos', 'criancas', 'idosos', 'diabeticos'],
          recomendacoes: {
            adultos: {
              medicamentos: [
                {
                  nome: 'Dextromethorphan (Vick 44E®)',
                  posologia: 'Adultos: 10-30mg a cada 4-8 horas, não excedendo 120mg por dia.',
                  observacoes: 'Antitussígeno que atua no centro da tosse. Não usar em caso de asma aguda ou com inibidores da MAO.'
                },
                {
                  nome: 'Levodropropizina',
                  posologia: 'Adultos: 60mg a cada 6-8 horas.',
                  observacoes: 'Antitussígeno periférico com menos efeitos sedativos que o dextromethorphan.'
                }
              ],
              naoFarmacologicas: [
                'Aumentar a ingestão de líquidos para hidratar as vias aéreas',
                'Umidificar o ambiente, especialmente durante o sono',
                'Evitar irritantes como fumaça, poeira e produtos químicos com odor forte',
                'Usar mel (1-2 colheres) para aliviar a irritação (exceto para diabéticos)'
              ],
              sinaisAlerta: [
                'Tosse persistente por mais de 2 semanas',
                'Febre alta (acima de 38,5°C) por mais de 3 dias',
                'Dificuldade para respirar ou falta de ar',
                'Dor no peito',
                'Expectoração com sangue'
              ]
            },
            criancas: {
              medicamentos: [
                {
                  nome: 'Dextromethorphan xarope',
                  posologia: 'Crianças 6-12 anos: 5-10mg a cada 4 horas, não excedendo 60mg por dia. Crianças 2-6 anos: 2,5-5mg a cada 4 horas, não excedendo 30mg por dia.',
                  observacoes: 'Não recomendado para crianças menores de 2 anos. Usar formulações pediátricas.'
                }
              ],
              naoFarmacologicas: [
                'Aumentar a ingestão de líquidos',
                'Umidificar o ambiente, especialmente durante o sono',
                'Mel (apenas para crianças maiores de 1 ano) - 1/2 colher de chá para 1-5 anos, 1 colher de chá para 6-11 anos',
                'Elevação da cabeceira da cama'
              ],
              sinaisAlerta: [
                'Dificuldade para respirar ou respiração rápida',
                'Febre alta persistente',
                'Sonolência excessiva ou irritabilidade',
                'Recusa de líquidos',
                'Piora dos sintomas após melhora inicial'
              ]
            },
            idosos: {
              medicamentos: [
                {
                  nome: 'Dextromethorphan (dose reduzida)',
                  posologia: 'Iniciar com 10mg a cada 6-8 horas, ajustando conforme necessidade e tolerância.',
                  observacoes: 'Usar com cautela devido ao maior risco de efeitos adversos. Verificar interações com outros medicamentos em uso.'
                },
                {
                  nome: 'Levodropropizina (dose reduzida)',
                  posologia: 'Iniciar com 30mg a cada 8 horas.',
                  observacoes: 'Alternativa com menor efeito sedativo.'
                }
              ],
              naoFarmacologicas: [
                'Hidratação adequada, mas cuidado com sobrecarga hídrica em cardiopatas',
                'Umidificação do ambiente',
                'Elevação da cabeceira da cama',
                'Evitar mudanças bruscas de temperatura'
              ],
              sinaisAlerta: [
                'Qualquer dificuldade respiratória',
                'Confusão mental ou alteração do estado de consciência',
                'Febre mesmo que baixa',
                'Tosse persistente que interfere no sono ou atividades diárias',
                'Piora de condições crônicas pré-existentes'
              ]
            },
            diabeticos: {
              medicamentos: [
                {
                  nome: 'Dextromethorphan sem açúcar',
                  posologia: 'Adultos: 10-30mg a cada 6-8 horas.',
                  observacoes: 'Verificar se a formulação é livre de açúcar. Monitorar glicemia durante o tratamento.'
                }
              ],
              naoFarmacologicas: [
                'Hidratação adequada com água (evitar sucos)',
                'Monitorar a glicemia com maior frequência durante o período de doença',
                'Umidificação do ambiente',
                'Não usar mel ou preparações com açúcar'
              ],
              sinaisAlerta: [
                'Alterações significativas na glicemia',
                'Sinais de desidratação',
                'Dificuldade respiratória',
                'Febre persistente',
                'Incapacidade de manter hidratação adequada'
              ]
            }
          }
        },
        {
          id: 2,
          sintoma: 'Tosse produtiva',
          categoria: 'respiratorio',
          descricao: 'Tosse com produção de catarro ou secreção, geralmente associada a infecções respiratórias.',
          publicos: ['adultos', 'criancas', 'idosos', 'diabeticos'],
          recomendacoes: {
            adultos: {
              medicamentos: [
                {
                  nome: 'Ambroxol xarope',
                  posologia: 'Adultos: 30mg 3 vezes ao dia.',
                  observacoes: 'Mucolítico que reduz a viscosidade do muco, facilitando sua expectoração.'
                },
                {
                  nome: 'Acetilcisteína 600mg',
                  posologia: 'Adultos: 600mg uma vez ao dia ou 200mg 3 vezes ao dia.',
                  observacoes: 'Mucolítico potente. Tomar com bastante água e longe das refeições.'
                }
              ],
              naoFarmacologicas: [
                'Aumentar significativamente a ingestão de líquidos',
                'Umidificar o ambiente',
                'Evitar produtos lácteos que podem aumentar a viscosidade do muco',
                'Inalação com vapor de água (com cuidado para evitar queimaduras)'
              ],
              sinaisAlerta: [
                'Expectoração amarelada, esverdeada ou com sangue',
                'Febre alta persistente',
                'Dor no peito ao respirar ou tossir',
                'Falta de ar',
                'Piora progressiva dos sintomas'
              ]
            },
            criancas: {
              medicamentos: [
                {
                  nome: 'Ambroxol xarope pediátrico',
                  posologia: 'Crianças 6-12 anos: 15mg 2-3 vezes ao dia. Crianças 2-6 anos: 7,5mg 3 vezes ao dia.',
                  observacoes: 'Usar formulações pediátricas. Não recomendado para crianças menores de 2 anos sem orientação médica.'
                }
              ],
              naoFarmacologicas: [
                'Hidratação abundante',
                'Umidificação do ambiente',
                'Inalação com vapor (supervisão de adulto)',
                'Elevação da cabeceira da cama'
              ],
              sinaisAlerta: [
                'Dificuldade respiratória',
                'Respiração rápida',
                'Febre alta persistente',
                'Recusa de líquidos',
                'Letargia ou irritabilidade excessiva'
              ]
            },
            idosos: {
              medicamentos: [
                {
                  nome: 'Ambroxol xarope',
                  posologia: 'Iniciar com 15mg 3 vezes ao dia, aumentando conforme necessidade e tolerância.',
                  observacoes: 'Monitorar função renal. Usar com cautela em pacientes com clearance de creatinina reduzido.'
                },
                {
                  nome: 'Acetilcisteína 200mg',
                  posologia: '200mg 2 vezes ao dia.',
                  observacoes: 'Dose reduzida para minimizar efeitos adversos. Garantir hidratação adequada.'
                }
              ],
              naoFarmacologicas: [
                'Hidratação adequada, mas cuidado com sobrecarga hídrica em cardiopatas',
                'Umidificação do ambiente',
                'Fisioterapia respiratória quando possível',
                'Posicionamento adequado para facilitar a drenagem de secreções'
              ],
              sinaisAlerta: [
                'Qualquer dificuldade respiratória',
                'Alteração do estado mental',
                'Febre',
                'Desidratação',
                'Expectoração com sangue ou mudança significativa na coloração'
              ]
            },
            diabeticos: {
              medicamentos: [
                {
                  nome: 'Ambroxol sem açúcar',
                  posologia: 'Adultos: 30mg 3 vezes ao dia.',
                  observacoes: 'Verificar se a formulação é livre de açúcar. Monitorar glicemia durante o tratamento.'
                },
                {
                  nome: 'Acetilcisteína 600mg',
                  posologia: 'Adultos: 600mg uma vez ao dia.',
                  observacoes: 'Não contém açúcar. Tomar com bastante água.'
                }
              ],
              naoFarmacologicas: [
                'Hidratação adequada com água (evitar sucos)',
                'Monitorar a glicemia com maior frequência',
                'Umidificação do ambiente',
                'Atenção à alimentação durante o período de doença'
              ],
              sinaisAlerta: [
                'Alterações significativas na glicemia',
                'Sinais de desidratação',
                'Dificuldade respiratória',
                'Febre persistente',
                'Expectoração com sangue'
              ]
            }
          }
        },
        {
          id: 3,
          sintoma: 'Dor de cabeça',
          categoria: 'dores',
          descricao: 'Dor ou desconforto na região da cabeça, podendo variar de leve a intensa, e ser localizada ou generalizada.',
          publicos: ['adultos', 'criancas', 'idosos', 'diabeticos'],
          recomendacoes: {
            adultos: {
              medicamentos: [
                {
                  nome: 'Paracetamol 500-750mg',
                  posologia: '500-750mg a cada 4-6 horas, não excedendo 4g por dia.',
                  observacoes: 'Analgésico e antitérmico com boa tolerabilidade. Evitar em pacientes com doença hepática.'
                },
                {
                  nome: 'Ibuprofeno 400mg',
                  posologia: '400mg a cada 6-8 horas, preferencialmente após as refeições.',
                  observacoes: 'Anti-inflamatório eficaz para dores de cabeça, especialmente as associadas à inflamação ou tensão muscular.'
                },
                {
                  nome: 'Dipirona 500-1000mg',
                  posologia: '500-1000mg a cada 6-8 horas, não excedendo 4g por dia.',
                  observacoes: 'Analgésico potente. Contraindicado em caso de alergia conhecida ou discrasias sanguíneas.'
                }
              ],
              naoFarmacologicas: [
                'Repouso em ambiente calmo e com pouca luz',
                'Compressas frias na testa e nuca',
                'Massagem suave nas têmporas e nuca',
                'Hidratação adequada',
                'Técnicas de relaxamento e respiração'
              ],
              sinaisAlerta: [
                'Dor de cabeça súbita e extremamente intensa ("a pior dor de cabeça da vida")',
                'Dor acompanhada de febre alta, rigidez no pescoço, confusão mental',
                'Dor que piora progressivamente e não responde a analgésicos',
                'Dor acompanhada de alterações visuais, fraqueza ou dormência nos membros',
                'Dor após trauma craniano'
              ]
            },
            criancas: {
              medicamentos: [
                {
                  nome: 'Paracetamol gotas',
                  posologia: '10-15mg/kg a cada 4-6 horas, não excedendo 5 doses em 24 horas.',
                  observacoes: 'Primeira escolha para crianças. Usar a concentração pediátrica e dosador adequado.'
                },
                {
                  nome: 'Ibuprofeno suspensão',
                  posologia: '5-10mg/kg a cada 6-8 horas.',
                  observacoes: 'Alternativa eficaz, especialmente se houver componente inflamatório.'
                }
              ],
              naoFarmacologicas: [
                'Repouso em ambiente tranquilo',
                'Compressas frias',
                'Hidratação adequada',
                'Verificar se há fatores desencadeantes como fome, cansaço ou estresse'
              ],
              sinaisAlerta: [
                'Dor de cabeça que acorda a criança do sono',
                'Dor associada a vômitos persistentes',
                'Alteração do comportamento ou nível de consciência',
                'Dor que piora progressivamente',
                'Dor após trauma craniano'
              ]
            },
            idosos: {
              medicamentos: [
                {
                  nome: 'Paracetamol 500mg',
                  posologia: '500mg a cada 6 horas, não excedendo 3g por dia.',
                  observacoes: 'Dose reduzida devido ao metabolismo mais lento. Mais seguro para idosos com comorbidades.'
                },
                {
                  nome: 'Dipirona 500mg',
                  posologia: '500mg a cada 8 horas.',
                  observacoes: 'Alternativa eficaz. Monitorar função renal.'
                }
              ],
              naoFarmacologicas: [
                'Repouso em ambiente calmo',
                'Compressas frias',
                'Hidratação adequada',
                'Verificar pressão arterial',
                'Técnicas de relaxamento'
              ],
              sinaisAlerta: [
                'Dor de cabeça de início súbito',
                'Alteração do estado mental',
                'Dor associada a alterações na pressão arterial',
                'Dor que não responde a analgésicos',
                'Dor em paciente com histórico de hipertensão não controlada'
              ]
            },
            diabeticos: {
              medicamentos: [
                {
                  nome: 'Paracetamol 500mg',
                  posologia: '500mg a cada 6 horas, não excedendo 3g por dia.',
                  observacoes: 'Não afeta a glicemia. Seguro para uso em diabéticos.'
                },
                {
                  nome: 'Ibuprofeno 400mg',
                  posologia: '400mg a cada 8 horas, após as refeições.',
                  observacoes: 'Monitorar função renal, especialmente em diabéticos com nefropatia.'
                }
              ],
              naoFarmacologicas: [
                'Repouso em ambiente calmo',
                'Compressas frias',
                'Hidratação adequada (água)',
                'Monitorar glicemia',
                'Verificar pressão arterial'
              ],
              sinaisAlerta: [
                'Alterações significativas na glicemia',
                'Dor de cabeça associada a hipertensão',
                'Sinais de desidratação',
                'Dor que não responde a analgésicos',
                'Alterações visuais (podem estar relacionadas a complicações da diabetes)'
              ]
            }
          }
        }
      ];
      
      // Filtrar por termo de busca e/ou categoria
      if (termoBusca) {
        const termoBuscaLower = termoBusca.toLowerCase();
        resultadosSimulados = sintomasDB.filter(sintoma => 
          sintoma.sintoma.toLowerCase().includes(termoBuscaLower) || 
          sintoma.descricao.toLowerCase().includes(termoBuscaLower)
        );
      } else if (categoriaSelecionada) {
        resultadosSimulados = sintomasDB.filter(sintoma => sintoma.categoria === categoriaSelecionada);
      }
      
      // Adicionar ao histórico de buscas
      if (termoBusca && !historicoBuscas.includes(termoBusca)) {
        setHistoricoBuscas([termoBusca, ...historicoBuscas].slice(0, 5));
      }
      
      setResultados(resultadosSimulados);
      setCarregando(false);
    }, 800);
  };

  // Selecionar sintoma para visualizar detalhes
  const selecionarSintoma = (sintoma) => {
    setSintomaSelecionado(sintoma);
    window.scrollTo(0, 0);
  };

  // Limpar seleção
  const limparSelecao = () => {
    setSintomaSelecionado(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Consulta de Sintomas</h1>
            <p className="mt-1 text-sm text-gray-500">
              Pesquise recomendações para sintomas comuns
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
                Buscar por sintoma ou descrição
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  name="termo-busca"
                  id="termo-busca"
                  value={termoBusca}
                  onChange={(e) => setTermoBusca(e.target.value)}
                  className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                  placeholder="Ex: Tosse, dor de cabeça, febre..."
                />
                <button
                  onClick={buscarSintomas}
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
                          setTimeout(() => buscarSintomas(), 100);
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
                onClick={buscarSintomas}
                className="mt-3 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Filtrar
              </button>
            </div>
          </div>
        </div>
        
        {/* Detalhes do sintoma selecionado */}
        {sintomaSelecionado && (
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{sintomaSelecionado.sintoma}</h2>
                <p className="text-sm text-gray-500">
                  {categorias.find(c => c.id === sintomaSelecionado.categoria)?.nome}
                </p>
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
            
            <p className="text-gray-700 mb-6">{sintomaSelecionado.descricao}</p>
            
            {/* Seleção de público */}
            <div className="mb-6">
              <label htmlFor="filtro-publico" className="block text-sm font-medium text-gray-700 mb-2">
                Selecione o público para recomendações específicas:
              </label>
              <div className="flex flex-wrap gap-2">
                {sintomaSelecionado.publicos.map((publico) => (
                  <button
                    key={publico}
                    onClick={() => setFiltroPublico(publico)}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      filtroPublico === publico
                        ? 'bg-blue-100 text-blue-700 border border-blue-300'
                        : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    {publico === 'adultos' && 'Adultos'}
                    {publico === 'criancas' && 'Crianças'}
                    {publico === 'idosos' && 'Idosos'}
                    {publico === 'diabeticos' && 'Diabéticos'}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Recomendações para o público selecionado */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Recomendações para {filtroPublico === 'adultos' ? 'Adultos' : 
                                   filtroPublico === 'criancas' ? 'Crianças' : 
                                   filtroPublico === 'idosos' ? 'Idosos' : 'Diabéticos'}
              </h3>
              
              {/* Medicamentos */}
              <div className="mb-6">
                <h4 className="text-md font-medium text-gray-800 mb-2">Medicamentos recomendados:</h4>
                <div className="bg-blue-50 rounded-lg p-4">
                  {sintomaSelecionado.recomendacoes[filtroPublico].medicamentos.map((med, index) => (
                    <div key={index} className={index > 0 ? 'mt-4 pt-4 border-t border-blue-200' : ''}>
                      <p className="font-medium text-blue-800">{med.nome}</p>
                      <p className="text-sm text-blue-700 mt-1"><span className="font-medium">Posologia:</span> {med.posologia}</p>
                      <p className="text-sm text-blue-700 mt-1"><span className="font-medium">Observações:</span> {med.observacoes}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Medidas não farmacológicas */}
              <div className="mb-6">
                <h4 className="text-md font-medium text-gray-800 mb-2">Medidas não farmacológicas:</h4>
                <div className="bg-green-50 rounded-lg p-4">
                  <ul className="list-disc pl-5 space-y-1 text-green-800">
                    {sintomaSelecionado.recomendacoes[filtroPublico].naoFarmacologicas.map((medida, index) => (
                      <li key={index}>{medida}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Sinais de alerta */}
              <div>
                <h4 className="text-md font-medium text-gray-800 mb-2">Sinais de alerta (buscar atendimento médico):</h4>
                <div className="bg-red-50 rounded-lg p-4">
                  <ul className="list-disc pl-5 space-y-1 text-red-800">
                    {sintomaSelecionado.recomendacoes[filtroPublico].sinaisAlerta.map((sinal, index) => (
                      <li key={index}>{sinal}</li>
                    ))}
                  </ul>
                </div>
              </div>
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
        {!sintomaSelecionado && (
          <>
            {carregando ? (
              <div className="bg-white shadow rounded-lg p-6 flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <p className="ml-4 text-gray-700">Buscando sintomas...</p>
              </div>
            ) : buscaRealizada ? (
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Resultados da busca
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    {resultados.length} sintomas encontrados
                  </p>
                </div>
                
                {resultados.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {resultados.map((sintoma) => (
                      <li key={sintoma.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-lg font-medium text-blue-600">{sintoma.sintoma}</h4>
                            <p className="mt-1 text-sm text-gray-600">
                              {sintoma.descricao}
                            </p>
                            <p className="mt-2 text-sm text-gray-500">
                              <span className="font-medium">Categoria:</span> {categorias.find(c => c.id === sintoma.categoria)?.nome}
                            </p>
                            <div className="mt-2 flex flex-wrap gap-1">
                              {sintoma.publicos.map((publico) => (
                                <span 
                                  key={publico}
                                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                >
                                  {publico === 'adultos' && 'Adultos'}
                                  {publico === 'criancas' && 'Crianças'}
                                  {publico === 'idosos' && 'Idosos'}
                                  {publico === 'diabeticos' && 'Diabéticos'}
                                </span>
                              ))}
                            </div>
                          </div>
                          <button
                            onClick={() => selecionarSintoma(sintoma)}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Ver recomendações
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
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Nenhum sintoma encontrado</h3>
                    <p className="text-gray-500 mb-4">Tente buscar com outros termos ou selecione uma categoria diferente.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white shadow rounded-lg p-6 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-1">Busque um sintoma</h3>
                <p className="text-gray-500 mb-4">Digite o sintoma ou selecione uma categoria para começar.</p>
              </div>
            )}
          </>
        )}
        
        {/* Informações adicionais */}
        <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-2">Informações importantes</h3>
          <ul className="text-blue-800 space-y-2">
            <li>• As recomendações disponibilizadas são apenas para referência e não substituem a orientação de um profissional de saúde.</li>
            <li>• Em caso de sintomas graves ou persistentes, procure atendimento médico imediatamente.</li>
            <li>• As recomendações são para condições leves e autolimitadas.</li>
            <li>• Sempre verifique a bula dos medicamentos para informações completas e atualizadas.</li>
            <li>• Em caso de dúvidas ou reações adversas, consulte um farmacêutico ou médico.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
