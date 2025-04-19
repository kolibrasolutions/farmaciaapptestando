import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FlashcardsPage() {
  // Estados
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  const [flashcardAtual, setFlashcardAtual] = useState(null);
  const [mostrarResposta, setMostrarResposta] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [pontos, setPontos] = useState(0);
  const [progresso, setProgresso] = useState(0);
  const [modoEstudo, setModoEstudo] = useState('todos'); // todos, nao_vistos, dificeis

  // Carregar categorias e flashcards
  useEffect(() => {
    // Simulação de carregamento de dados do banco
    setTimeout(() => {
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
      setCarregando(false);
    }, 1000);
  }, []);

  // Carregar flashcards quando a categoria é selecionada
  useEffect(() => {
    if (categoriaSelecionada) {
      setCarregando(true);
      
      // Simulação de carregamento de flashcards da categoria selecionada
      setTimeout(() => {
        let flashcardsSimulados = [];
        
        if (categoriaSelecionada === 'respiratorio') {
          flashcardsSimulados = [
            {
              id: 1,
              frente: "Estou com tosse seca que não para, o que posso tomar?",
              verso: "Para sua tosse seca persistente, posso recomendar um antitussígeno como o Dextromethorphan (Vick 44E®) 15mg/5ml, tome 10ml a cada 6-8 horas. Evite usar por mais de 7 dias. Também é importante manter-se bem hidratado, umidificar o ambiente e evitar irritantes como fumaça. Se a tosse persistir por mais de 10 dias, estiver acompanhada de febre alta, falta de ar ou dor no peito, é necessário procurar um médico urgentemente.\n\nOutras opções: Levodropropizina (Levotuss®) ou pastilhas com ação emoliente como Benalet®.",
              dificuldade: 'facil',
              visto: true,
              ultima_revisao: '2025-04-15'
            },
            {
              id: 2,
              frente: "Estou com nariz entupido e dor de cabeça há dois dias, o que você me indica?",
              verso: "Para seu congestionamento nasal e dor de cabeça, recomendo um descongestionante combinado com analgésico como Paracetamol + Pseudoefedrina (Resfriol®), 1 comprimido a cada 6 horas. Não use por mais de 5 dias para evitar congestão rebote. Complementarmente, você pode usar soro fisiológico nasal várias vezes ao dia e manter a cabeceira elevada ao dormir. Se os sintomas piorarem ou aparecer febre alta, secreção nasal esverdeada ou dor facial intensa, consulte um médico.\n\nOutras opções: Ibuprofeno 400mg + lavagem nasal com soro ou spray nasal de água do mar.",
              dificuldade: 'media',
              visto: true,
              ultima_revisao: '2025-04-16'
            },
            {
              id: 3,
              frente: "Minha garganta está muito inflamada e dolorida, o que posso usar?",
              verso: "Para sua garganta inflamada e dolorida, recomendo pastilhas de Benzocaína + Cetilpiridínio (Benalet®), dissolva uma pastilha lentamente na boca a cada 2-3 horas. Para alívio da dor, pode tomar Ibuprofeno 400mg a cada 8 horas após as refeições. Gargarejos com água morna e sal (1/2 colher de chá em um copo de água) várias vezes ao dia também ajudam a reduzir a inflamação. Mantenha-se bem hidratado e evite alimentos irritantes. Se aparecer placas brancas na garganta, febre alta ou dificuldade para engolir, procure atendimento médico.\n\nOutras opções: Spray de Propolis ou pastilhas de própolis com mel.",
              dificuldade: 'facil',
              visto: false,
              ultima_revisao: null
            },
            {
              id: 4,
              frente: "Estou com febre de 38,5°C, dor no corpo e cansaço. O que devo tomar?",
              verso: "Para sua febre, dor no corpo e cansaço, recomendo Paracetamol 750mg, 1 comprimido a cada 6 horas, não ultrapassando 4 comprimidos por dia. Outra opção é Dipirona 1g a cada 6 horas. Mantenha-se bem hidratado bebendo bastante água e descanse adequadamente. Compressas mornas podem ajudar no conforto. Se a febre persistir por mais de 3 dias, ultrapassar 39,5°C ou surgirem sintomas como falta de ar, confusão mental ou manchas na pele, procure atendimento médico imediatamente.\n\nOutras opções: Ibuprofeno 400mg a cada 8 horas (com alimento) ou Paracetamol + Vitamina C efervescente.",
              dificuldade: 'dificil',
              visto: true,
              ultima_revisao: '2025-04-10'
            },
            {
              id: 5,
              frente: "Tenho asma e estou com uma crise leve de falta de ar, o que posso usar?",
              verso: "Para uma crise leve de asma, você deve usar seu broncodilatador de resgate como Salbutamol (Aerolin®) spray, 2 jatos a cada 20 minutos na primeira hora se necessário. Use com espaçador se disponível para melhor eficácia. É importante ressaltar que você deve seguir o tratamento de manutenção prescrito pelo seu médico regularmente. Evite desencadeantes como poeira, fumaça e ar frio. Se não houver melhora após o uso do broncodilatador, se a falta de ar piorar, ou se você precisar usar o broncodilatador mais de 3 vezes por semana, procure atendimento médico urgente.\n\nObservação importante: Crises de asma podem ser graves e potencialmente fatais. Este é um caso onde a indicação farmacêutica tem limitações e o acompanhamento médico é essencial.",
              dificuldade: 'dificil',
              visto: false,
              ultima_revisao: null
            }
          ];
        } else if (categoriaSelecionada === 'dermatologico') {
          flashcardsSimulados = [
            {
              id: 6,
              frente: "Estou com uma alergia na pele, está vermelha e coçando muito. O que posso passar?",
              verso: "Para sua alergia cutânea com vermelhidão e coceira, recomendo um creme de Dexametasona 0,1% (Dexadermil®), aplique uma fina camada nas áreas afetadas 2-3 vezes ao dia por até 7 dias. Para alívio da coceira, pode tomar um anti-histamínico como Loratadina 10mg, 1 comprimido por dia. Evite coçar a área, use roupas folgadas de algodão e tome banhos frescos. Se a área afetada aumentar, formar bolhas ou apresentar secreção, procure atendimento médico.\n\nOutras opções: Creme de Hidrocortisona 1% ou loção de Calamina para alívio da coceira.",
              dificuldade: 'media',
              visto: true,
              ultima_revisao: '2025-04-17'
            },
            {
              id: 7,
              frente: "Fui picado por vários mosquitos e está coçando muito, o que posso usar?",
              verso: "Para as picadas de mosquito com coceira intensa, recomendo aplicar gel de Caladryl® (Difenidramina + Calamina) nas áreas afetadas 3-4 vezes ao dia. Para alívio sistêmico da coceira, pode tomar Fexofenadina (Allegra®) 180mg, 1 comprimido por dia. Compressas frias também ajudam a reduzir o inchaço e a coceira. Evite coçar para não infeccionar. Se aparecer vermelhidão que se espalha, inchaço excessivo ou sintomas como febre e mal-estar, procure atendimento médico.\n\nOutras opções: Gel de Fenistil® (Dimetindeno) ou creme de Andantol® (Prometazina).",
              dificuldade: 'facil',
              visto: true,
              ultima_revisao: '2025-04-12'
            }
          ];
        } else if (categoriaSelecionada === 'dores') {
          flashcardsSimulados = [
            {
              id: 8,
              frente: "Estou com uma dor de cabeça forte há algumas horas, o que posso tomar?",
              verso: "Para sua dor de cabeça forte, recomendo Ibuprofeno 400mg, 1 comprimido a cada 8 horas com alimento. Alternativas incluem Paracetamol 750mg a cada 6 horas ou Dipirona 1g a cada 6 horas. Além da medicação, descanse em um ambiente calmo e escuro, aplique compressas frias na testa e mantenha-se hidratado. Se a dor for extremamente intensa e repentina, vier acompanhada de febre alta, rigidez no pescoço, confusão mental, fraqueza nos membros ou após uma pancada na cabeça, procure atendimento médico de emergência.\n\nOutras opções: Combinações como Paracetamol + Cafeína ou analgésicos específicos para enxaqueca se for recorrente.",
              dificuldade: 'facil',
              visto: true,
              ultima_revisao: '2025-04-18'
            }
          ];
        }
        
        setFlashcards(flashcardsSimulados);
        if (flashcardsSimulados.length > 0) {
          setFlashcardAtual(flashcardsSimulados[0]);
        } else {
          setFlashcardAtual(null);
        }
        setMostrarResposta(false);
        setCarregando(false);
        setProgresso(0);
      }, 1000);
    }
  }, [categoriaSelecionada]);

  // Função para ir para o próximo flashcard
  const proximoFlashcard = () => {
    const indiceAtual = flashcards.findIndex(f => f.id === flashcardAtual.id);
    if (indiceAtual < flashcards.length - 1) {
      setFlashcardAtual(flashcards[indiceAtual + 1]);
      setMostrarResposta(false);
      setProgresso(((indiceAtual + 1) / flashcards.length) * 100);
    } else {
      // Completou todos os flashcards da categoria
      setPontos(pontos + 10); // Bônus por completar a categoria
      setProgresso(100);
    }
  };

  // Função para ir para o flashcard anterior
  const flashcardAnterior = () => {
    const indiceAtual = flashcards.findIndex(f => f.id === flashcardAtual.id);
    if (indiceAtual > 0) {
      setFlashcardAtual(flashcards[indiceAtual - 1]);
      setMostrarResposta(false);
      setProgresso(((indiceAtual - 1) / flashcards.length) * 100);
    }
  };

  // Função para marcar dificuldade do flashcard
  const marcarDificuldade = (dificuldade) => {
    // Atualizar a dificuldade do flashcard atual
    const flashcardsAtualizados = flashcards.map(f => {
      if (f.id === flashcardAtual.id) {
        return { ...f, dificuldade, visto: true, ultima_revisao: new Date().toISOString().split('T')[0] };
      }
      return f;
    });
    
    setFlashcards(flashcardsAtualizados);
    
    // Adicionar pontos com base na dificuldade
    if (dificuldade === 'facil') {
      setPontos(pontos + 1);
    } else if (dificuldade === 'media') {
      setPontos(pontos + 2);
    } else {
      setPontos(pontos + 3);
    }
    
    // Ir para o próximo flashcard
    proximoFlashcard();
  };

  // Filtrar flashcards com base no modo de estudo
  const filtrarFlashcards = () => {
    if (!categoriaSelecionada) return;
    
    setCarregando(true);
    
    setTimeout(() => {
      let flashcardsFiltrados = [...flashcards];
      
      if (modoEstudo === 'nao_vistos') {
        flashcardsFiltrados = flashcards.filter(f => !f.visto);
      } else if (modoEstudo === 'dificeis') {
        flashcardsFiltrados = flashcards.filter(f => f.dificuldade === 'dificil');
      }
      
      setFlashcards(flashcardsFiltrados);
      if (flashcardsFiltrados.length > 0) {
        setFlashcardAtual(flashcardsFiltrados[0]);
      } else {
        setFlashcardAtual(null);
      }
      setMostrarResposta(false);
      setProgresso(0);
      setCarregando(false);
    }, 500);
  };

  // Renderização condicional para carregamento
  if (carregando) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="ml-4 text-gray-700">Carregando flashcards...</p>
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
            <h1 className="text-3xl font-bold text-gray-900">Flashcards de Treinamento</h1>
            <p className="mt-1 text-sm text-gray-500">
              Estude as recomendações farmacêuticas para diferentes queixas
            </p>
          </div>
          <div className="flex items-center">
            <div className="mr-4 bg-blue-100 px-3 py-1 rounded-full flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-medium text-blue-800">{pontos} pontos</span>
            </div>
            <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 font-medium">
              Voltar ao Dashboard
            </Link>
          </div>
        </div>
        
        {/* Seleção de categoria */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Selecione uma categoria</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categorias.map((categoria) => (
              <button
                key={categoria.id}
                onClick={() => setCategoriaSelecionada(categoria.id)}
                className={`p-4 rounded-lg border text-center transition-colors ${
                  categoriaSelecionada === categoria.id
                    ? 'bg-blue-100 border-blue-500 text-blue-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {categoria.nome}
              </button>
            ))}
          </div>
          
          {categoriaSelecionada && (
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="modo-estudo" className="block text-sm font-medium text-gray-700">
                    Modo de estudo
                  </label>
                  <select
                    id="modo-estudo"
                    value={modoEstudo}
                    onChange={(e) => setModoEstudo(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="todos">Todos os flashcards</option>
                    <option value="nao_vistos">Apenas não vistos</option>
                    <option value="dificeis">Apenas difíceis</option>
                  </select>
                </div>
                <button
                  onClick={filtrarFlashcards}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Aplicar filtro
                </button>
              </div>
              
              {flashcards.length > 0 && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Progresso</span>
                    <span>{Math.round(progresso)}%</span>
                  </div>
                  <div className="mt-1 w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progresso}%` }}></div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Área de flashcards */}
        {categoriaSelecionada ? (
          flashcardAtual ? (
            <div className="bg-white shadow rounded-lg overflow-hidden">
              {/* Flashcard */}
              <div className="min-h-[400px] p-6 flex flex-col">
                <div className="flex-1">
                  {!mostrarResposta ? (
                    <div className="h-full flex flex-col justify-center items-center">
                      <h3 className="text-xl font-medium text-gray-900 mb-6">Queixa do paciente:</h3>
                      <div className="text-center max-w-2xl mx-auto">
                        <p className="text-2xl text-gray-700">{flashcardAtual.frente}</p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-xl font-medium text-gray-900 mb-4">Recomendação farmacêutica:</h3>
                      <div className="prose max-w-none">
                        <p className="whitespace-pre-line">{flashcardAtual.verso}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {!mostrarResposta ? (
                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={() => setMostrarResposta(true)}
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Mostrar Recomendação
                    </button>
                  </div>
                ) : (
                  <div className="mt-6">
                    <p className="text-sm text-gray-500 mb-2">Como foi sua resposta?</p>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => marcarDificuldade('facil')}
                        className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Fácil
                      </button>
                      <button
                        onClick={() => marcarDificuldade('media')}
                        className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                      >
                        Médio
                      </button>
                      <button
                        onClick={() => marcarDificuldade('dificil')}
                        className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Difícil
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Navegação entre flashcards */}
              <div className="bg-gray-50 px-6 py-3 flex justify-between">
                <button
                  onClick={flashcardAnterior}
                  disabled={flashcards.findIndex(f => f.id === flashcardAtual.id) === 0}
                  className={`inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md ${
                    flashcards.findIndex(f => f.id === flashcardAtual.id) === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                >
                  Anterior
                </button>
                <div className="text-sm text-gray-500">
                  {flashcards.findIndex(f => f.id === flashcardAtual.id) + 1} de {flashcards.length}
                </div>
                <button
                  onClick={proximoFlashcard}
                  disabled={flashcards.findIndex(f => f.id === flashcardAtual.id) === flashcards.length - 1 && mostrarResposta === false}
                  className={`inline-flex items-center px-4 py-2 border shadow-sm text-sm font-medium rounded-md ${
                    flashcards.findIndex(f => f.id === flashcardAtual.id) === flashcards.length - 1 && mostrarResposta === false
                      ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'border-transparent bg-blue-600 text-white hover:bg-blue-700'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                >
                  {mostrarResposta ? 'Pular' : 'Próximo'}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum flashcard encontrado</h3>
              <p className="text-gray-500 mb-6">
                Não há flashcards disponíveis para os filtros selecionados.
              </p>
              <button
                onClick={() => {
                  setModoEstudo('todos');
                  filtrarFlashcards();
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Ver todos os flashcards
              </button>
            </div>
          )
        ) : (
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Selecione uma categoria para começar</h3>
            <p className="text-gray-500">
              Escolha uma categoria de flashcards acima para iniciar seu estudo.
            </p>
          </div>
        )}
        
        {/* Dicas de estudo */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-800 mb-2">Dicas para um estudo eficiente</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Estude regularmente por períodos curtos em vez de sessões longas e esporádicas</li>
            <li>• Classifique os flashcards por dificuldade para revisar com mais frequência os mais difíceis</li>
            <li>• Tente responder em voz alta antes de ver a resposta para melhorar a memorização</li>
            <li>• Relacione as informações com casos reais que você já atendeu na farmácia</li>
            <li>• Use o sistema de gamificação para se manter motivado e acompanhar seu progresso</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
