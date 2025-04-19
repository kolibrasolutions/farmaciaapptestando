"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function QuizPage() {
  // Estados
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [perguntas, setPerguntas] = useState([]);
  const [perguntaAtual, setPerguntaAtual] = useState(null);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [respostaCorreta, setRespostaCorreta] = useState(null);
  const [pontos, setPontos] = useState(0);
  const [progresso, setProgresso] = useState(0);
  const [quizIniciado, setQuizIniciado] = useState(false);
  const [quizFinalizado, setQuizFinalizado] = useState(false);
  const [resultados, setResultados] = useState({ acertos: 0, erros: 0, total: 0 });
  const [carregando, setCarregando] = useState(true);
  const [tempoRestante, setTempoRestante] = useState(30);
  const [timerAtivo, setTimerAtivo] = useState(false);

  // Carregar categorias
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

  // Carregar perguntas quando a categoria é selecionada
  useEffect(() => {
    if (categoriaSelecionada && quizIniciado) {
      setCarregando(true);
      
      // Simulação de carregamento de perguntas da categoria selecionada
      setTimeout(() => {
        let perguntasSimuladas = [];
        
        if (categoriaSelecionada === 'respiratorio') {
          perguntasSimuladas = [
            {
              id: 1,
              pergunta: "Um cliente de 45 anos relata tosse seca persistente há 5 dias, sem febre. Qual medicamento seria mais adequado para indicação farmacêutica?",
              opcoes: [
                "Amoxicilina 500mg",
                "Dexclorfeniramina 2mg",
                "Dextromethorphan (Vick 44E®)",
                "Ambroxol xarope"
              ],
              resposta_correta: 2,
              explicacao: "Para tosse seca (não-produtiva), antitussígenos como o Dextromethorphan são indicados para suprimir o reflexo da tosse. Antibióticos como Amoxicilina não são indicados para tosse viral, Dexclorfeniramina é um anti-histamínico para alergias, e Ambroxol é um mucolítico indicado para tosse produtiva com secreção."
            },
            {
              id: 2,
              pergunta: "Uma mãe procura a farmácia relatando que seu filho de 7 anos está com febre de 38,5°C. Qual medicamento e dose você recomendaria?",
              opcoes: [
                "Dipirona gotas, 1 gota/kg",
                "Paracetamol 750mg, 1 comprimido",
                "Ibuprofeno 600mg, 1 comprimido",
                "Ácido Acetilsalicílico 500mg, 1 comprimido"
              ],
              resposta_correta: 0,
              explicacao: "Para crianças com febre, a Dipirona em gotas na dosagem de 1 gota/kg é uma opção adequada. Paracetamol e Ibuprofeno também podem ser usados, mas nas doses pediátricas corretas. O Ácido Acetilsalicílico (AAS) é contraindicado para crianças e adolescentes devido ao risco de Síndrome de Reye."
            },
            {
              id: 3,
              pergunta: "Um cliente com asma controlada relata estar com sintomas de resfriado. Qual medicamento deve ser evitado na indicação farmacêutica?",
              opcoes: [
                "Paracetamol",
                "Propranolol",
                "Loratadina",
                "Vitamina C"
              ],
              resposta_correta: 1,
              explicacao: "O Propranolol (beta-bloqueador) deve ser evitado em pacientes asmáticos, pois pode desencadear broncoespasmo e piorar os sintomas da asma. Paracetamol é seguro para asmáticos, assim como Loratadina (anti-histamínico não-sedativo) e Vitamina C."
            },
            {
              id: 4,
              pergunta: "Um cliente com congestão nasal e coriza há 3 dias pergunta qual o melhor descongestionante. Qual orientação é correta?",
              opcoes: [
                "Usar descongestionante nasal por até 10 dias seguidos",
                "Usar descongestionante nasal por no máximo 3-5 dias",
                "Evitar lavagem nasal com soro fisiológico junto com descongestionantes",
                "Descongestionantes nasais não têm contraindicações importantes"
              ],
              resposta_correta: 1,
              explicacao: "Descongestionantes nasais tópicos (como a oximetazolina) não devem ser usados por mais de 3-5 dias devido ao risco de congestão rebote (rinite medicamentosa). A lavagem nasal com soro fisiológico é recomendada como adjuvante, e descongestionantes têm contraindicações importantes como hipertensão e glaucoma."
            },
            {
              id: 5,
              pergunta: "Um cliente diabético com gripe pergunta sobre medicamentos para aliviar os sintomas. Qual opção deve ser evitada?",
              opcoes: [
                "Paracetamol",
                "Xaropes para tosse com açúcar",
                "Ibuprofeno em doses baixas",
                "Pastilhas para garganta sem açúcar"
              ],
              resposta_correta: 1,
              explicacao: "Xaropes para tosse com alto teor de açúcar devem ser evitados em pacientes diabéticos, pois podem alterar os níveis glicêmicos. Deve-se preferir formulações sem açúcar ou com edulcorantes. Paracetamol é seguro para diabéticos, assim como Ibuprofeno em doses baixas (com monitoramento) e pastilhas sem açúcar."
            }
          ];
        } else if (categoriaSelecionada === 'dermatologico') {
          perguntasSimuladas = [
            {
              id: 6,
              pergunta: "Um cliente apresenta pequenas lesões avermelhadas e com coceira após contato com uma planta. Qual a melhor indicação farmacêutica?",
              opcoes: [
                "Pomada de neomicina",
                "Creme de hidrocortisona 1%",
                "Pomada de cetoconazol",
                "Gel de peróxido de benzoíla"
              ],
              resposta_correta: 1,
              explicacao: "Para dermatite de contato leve (reação alérgica a plantas), o creme de hidrocortisona 1% é indicado por suas propriedades anti-inflamatórias e antipruriginosas. Neomicina é um antibiótico tópico para infecções, cetoconazol é antifúngico, e peróxido de benzoíla é usado para acne."
            },
            {
              id: 7,
              pergunta: "Um cliente com micose entre os dedos dos pés (pé de atleta) busca orientação. Qual medicamento seria mais adequado?",
              opcoes: [
                "Creme de dexametasona",
                "Pomada de sulfadiazina de prata",
                "Creme de cetoconazol ou clotrimazol",
                "Loção de calamina"
              ],
              resposta_correta: 2,
              explicacao: "Para tinea pedis (pé de atleta), que é uma infecção fúngica, antifúngicos tópicos como cetoconazol ou clotrimazol são indicados. Dexametasona é um corticosteroide que pode piorar infecções fúngicas, sulfadiazina de prata é para queimaduras, e calamina é para alívio de coceira em dermatites."
            }
          ];
        } else if (categoriaSelecionada === 'dores') {
          perguntasSimuladas = [
            {
              id: 8,
              pergunta: "Um cliente de 65 anos com histórico de úlcera gástrica relata dor nas articulações. Qual analgésico seria mais seguro para indicação?",
              opcoes: [
                "Ibuprofeno 600mg",
                "Paracetamol 750mg",
                "Diclofenaco 50mg",
                "Ácido Acetilsalicílico 500mg"
              ],
              resposta_correta: 1,
              explicacao: "Para pacientes com histórico de úlcera gástrica, o Paracetamol é o analgésico mais seguro, pois não possui efeito irritante significativo sobre a mucosa gástrica. AINEs como Ibuprofeno, Diclofenaco e AAS podem aumentar o risco de sangramento gastrointestinal e recidiva de úlcera, sendo contraindicados ou usados com muita cautela nesses pacientes."
            }
          ];
        }
        
        // Embaralhar as perguntas
        perguntasSimuladas = embaralharArray(perguntasSimuladas);
        
        setPerguntas(perguntasSimuladas);
        if (perguntasSimuladas.length > 0) {
          setPerguntaAtual(perguntasSimuladas[0]);
          setIndiceAtual(0);
          setProgresso(0);
          setTempoRestante(30);
          setTimerAtivo(true);
        } else {
          setPerguntaAtual(null);
        }
        setRespostaSelecionada(null);
        setRespostaCorreta(null);
        setCarregando(false);
      }, 1000);
    }
  }, [categoriaSelecionada, quizIniciado]);

  // Timer para as perguntas
  useEffect(() => {
    let timer;
    if (timerAtivo && tempoRestante > 0) {
      timer = setTimeout(() => {
        setTempoRestante(tempoRestante - 1);
      }, 1000);
    } else if (timerAtivo && tempoRestante === 0) {
      // Tempo esgotado, considerar como erro
      verificarResposta(null);
    }
    
    return () => clearTimeout(timer);
  }, [timerAtivo, tempoRestante]);

  // Função para embaralhar array
  const embaralharArray = (array) => {
    const novoArray = [...array];
    for (let i = novoArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [novoArray[i], novoArray[j]] = [novoArray[j], novoArray[i]];
    }
    return novoArray;
  };

  // Função para iniciar o quiz
  const iniciarQuiz = () => {
    setQuizIniciado(true);
    setQuizFinalizado(false);
    setResultados({ acertos: 0, erros: 0, total: 0 });
    setPontos(0);
  };

  // Função para verificar resposta
  const verificarResposta = (indiceResposta) => {
    setTimerAtivo(false);
    setRespostaSelecionada(indiceResposta);
    
    const respostaEstaCorreta = indiceResposta === perguntaAtual.resposta_correta;
    setRespostaCorreta(respostaEstaCorreta);
    
    // Atualizar pontuação
    if (respostaEstaCorreta) {
      // Pontos base + bônus por tempo restante
      const pontosPorTempo = Math.floor(tempoRestante / 5);
      const pontosTotais = 10 + pontosPorTempo;
      setPontos(pontos + pontosTotais);
      
      // Atualizar resultados
      setResultados({
        ...resultados,
        acertos: resultados.acertos + 1,
        total: resultados.total + 1
      });
    } else {
      // Atualizar resultados
      setResultados({
        ...resultados,
        erros: resultados.erros + 1,
        total: resultados.total + 1
      });
    }
  };

  // Função para ir para a próxima pergunta
  const proximaPergunta = () => {
    if (indiceAtual < perguntas.length - 1) {
      setIndiceAtual(indiceAtual + 1);
      setPerguntaAtual(perguntas[indiceAtual + 1]);
      setRespostaSelecionada(null);
      setRespostaCorreta(null);
      setProgresso(((indiceAtual + 1) / perguntas.length) * 100);
      setTempoRestante(30);
      setTimerAtivo(true);
    } else {
      // Quiz finalizado
      setQuizFinalizado(true);
      setProgresso(100);
    }
  };

  // Função para reiniciar o quiz
  const reiniciarQuiz = () => {
    setQuizIniciado(false);
    setQuizFinalizado(false);
    setCategoriaSelecionada('');
    setPerguntas([]);
    setPerguntaAtual(null);
    setIndiceAtual(0);
    setRespostaSelecionada(null);
    setRespostaCorreta(null);
    setProgresso(0);
  };

  // Renderização condicional para carregamento
  if (carregando) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="ml-4 text-gray-700">Carregando quiz...</p>
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
            <h1 className="text-3xl font-bold text-gray-900">Quiz de Conhecimentos Farmacêuticos</h1>
            <p className="mt-1 text-sm text-gray-500">
              Teste seus conhecimentos sobre indicação farmacêutica
            </p>
          </div>
          <div className="flex items-center">
            {quizIniciado && !quizFinalizado && (
              <div className="mr-4 bg-blue-100 px-3 py-1 rounded-full flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-medium text-blue-800">{pontos} pontos</span>
              </div>
            )}
            <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 font-medium">
              Voltar ao Dashboard
            </Link>
          </div>
        </div>
        
        {/* Seleção de categoria e início do quiz */}
        {!quizIniciado ? (
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Selecione uma categoria para o quiz</h2>
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
              <div className="mt-8 flex justify-center">
                <button
                  onClick={iniciarQuiz}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Iniciar Quiz
                </button>
              </div>
            )}
          </div>
        ) : quizFinalizado ? (
          // Resultados do quiz
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Quiz Finalizado!</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <p className="text-sm text-green-600 font-medium">Acertos</p>
                  <p className="text-3xl font-bold text-green-700">{resultados.acertos}</p>
                </div>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                  <p className="text-sm text-red-600 font-medium">Erros</p>
                  <p className="text-3xl font-bold text-red-700">{resultados.erros}</p>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                  <p className="text-sm text-blue-600 font-medium">Pontuação Total</p>
                  <p className="text-3xl font-bold text-blue-700">{pontos}</p>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <h3 className="text-lg font-medium text-yellow-800">Análise de Desempenho</h3>
                </div>
                
                <p className="text-yellow-700">
                  {resultados.acertos === perguntas.length ? (
                    "Parabéns! Você acertou todas as perguntas. Seu conhecimento sobre esta categoria é excelente!"
                  ) : resultados.acertos >= perguntas.length * 0.7 ? (
                    "Bom trabalho! Você demonstrou um bom conhecimento sobre esta categoria. Continue estudando para aprimorar ainda mais."
                  ) : resultados.acertos >= perguntas.length * 0.5 ? (
                    "Você está no caminho certo, mas ainda há espaço para melhorias. Recomendamos revisar os tópicos desta categoria."
                  ) : (
                    "Recomendamos dedicar mais tempo ao estudo desta categoria. Revise os materiais de treinamento e tente novamente."
                  )}
                </p>
              </div>
              
              <div className="flex justify-center space-x-4">
                <button
                  onClick={reiniciarQuiz}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Novo Quiz
                </button>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Voltar ao Dashboard
                </Link>
              </div>
            </div>
          </div>
        ) : (
          // Quiz em andamento
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {/* Barra de progresso */}
            <div className="w-full bg-gray-200 h-2">
              <div className="bg-blue-600 h-2" style={{ width: `${progresso}%` }}></div>
            </div>
            
            <div className="p-6">
              {/* Timer */}
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-gray-500">
                  Pergunta {indiceAtual + 1} de {perguntas.length}
                </div>
                <div className={`px-3 py-1 rounded-full flex items-center ${
                  tempoRestante > 10 ? 'bg-green-100 text-green-800' : 
                  tempoRestante > 5 ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">{tempoRestante}s</span>
                </div>
              </div>
              
              {/* Pergunta */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{perguntaAtual.pergunta}</h2>
                
                <div className="space-y-3">
                  {perguntaAtual.opcoes.map((opcao, index) => (
                    <button
                      key={index}
                      onClick={() => respostaSelecionada === null && verificarResposta(index)}
                      disabled={respostaSelecionada !== null}
                      className={`w-full text-left p-4 rounded-lg border transition-colors ${
                        respostaSelecionada === null
                          ? 'border-gray-300 hover:bg-gray-50'
                          : respostaSelecionada === index
                            ? index === perguntaAtual.resposta_correta
                              ? 'bg-green-100 border-green-500'
                              : 'bg-red-100 border-red-500'
                            : index === perguntaAtual.resposta_correta
                              ? 'bg-green-100 border-green-500'
                              : 'border-gray-300 opacity-70'
                      }`}
                    >
                      <div className="flex items-start">
                        <div className={`flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center mr-2 ${
                          respostaSelecionada === null
                            ? 'bg-gray-200 text-gray-700'
                            : respostaSelecionada === index
                              ? index === perguntaAtual.resposta_correta
                                ? 'bg-green-500 text-white'
                                : 'bg-red-500 text-white'
                              : index === perguntaAtual.resposta_correta
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-200 text-gray-700'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className={`${
                          respostaSelecionada !== null && index === perguntaAtual.resposta_correta
                            ? 'font-medium'
                            : ''
                        }`}>
                          {opcao}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Explicação da resposta */}
              {respostaSelecionada !== null && (
                <div className={`p-4 rounded-lg mb-6 ${
                  respostaCorreta ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                }`}>
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      {respostaCorreta ? (
                        <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="ml-3">
                      <h3 className={`text-sm font-medium ${respostaCorreta ? 'text-green-800' : 'text-red-800'}`}>
                        {respostaCorreta ? 'Resposta correta!' : 'Resposta incorreta'}
                      </h3>
                      <div className={`mt-2 text-sm ${respostaCorreta ? 'text-green-700' : 'text-red-700'}`}>
                        <p>{perguntaAtual.explicacao}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Botão de próxima pergunta */}
              {respostaSelecionada !== null && (
                <div className="flex justify-center">
                  <button
                    onClick={proximaPergunta}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {indiceAtual < perguntas.length - 1 ? 'Próxima Pergunta' : 'Ver Resultados'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
