"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SimuladorAtendimentoPage() {
  // Estados
  const [cenarios, setCenarios] = useState([]);
  const [cenarioAtual, setCenarioAtual] = useState(null);
  const [etapaAtual, setEtapaAtual] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [pontos, setPontos] = useState(0);
  const [simulacaoIniciada, setSimulacaoIniciada] = useState(false);
  const [simulacaoConcluida, setSimulacaoConcluida] = useState(false);
  const [resultados, setResultados] = useState({ acertos: 0, erros: 0, total: 0 });
  const [carregando, setCarregando] = useState(true);
  const [historico, setHistorico] = useState([]);

  // Carregar cenários
  useEffect(() => {
    // Simulação de carregamento de dados do banco
    setTimeout(() => {
      const cenariosSimulados = [
        {
          id: 1,
          titulo: "Cliente com sintomas de gripe",
          descricao: "Uma mulher de 35 anos entra na farmácia relatando que está com febre baixa, dor de garganta, coriza e mal-estar há dois dias. Ela pergunta o que você recomenda para aliviar os sintomas.",
          imagem: "/imagens/cliente_gripe.jpg",
          etapas: [
            {
              tipo: "pergunta",
              texto: "Qual seria sua primeira ação?",
              opcoes: [
                {
                  texto: "Recomendar imediatamente um antibiótico para prevenir complicações",
                  feedback: "Incorreto. Antibióticos não são indicados para gripes, que são causadas por vírus. Além disso, é importante coletar mais informações antes de fazer qualquer recomendação.",
                  pontos: -5
                },
                {
                  texto: "Fazer perguntas adicionais para entender melhor o quadro da cliente",
                  feedback: "Correto! É fundamental coletar mais informações antes de fazer qualquer recomendação. Você precisa saber sobre alergias, condições pré-existentes, medicamentos em uso e detalhes dos sintomas.",
                  pontos: 10,
                  correta: true
                },
                {
                  texto: "Recomendar que ela procure um médico imediatamente",
                  feedback: "Parcialmente correto. Embora em alguns casos seja necessário encaminhar ao médico, os sintomas descritos são típicos de gripe comum e podem ser tratados com medicamentos isentos de prescrição, após uma avaliação adequada.",
                  pontos: 3
                },
                {
                  texto: "Sugerir um medicamento para dor e febre e um antialérgico",
                  feedback: "Incorreto. Antes de recomendar qualquer medicamento, é necessário coletar mais informações sobre a cliente, como alergias, condições pré-existentes e medicamentos em uso.",
                  pontos: -2
                }
              ]
            },
            {
              tipo: "informacao",
              texto: "Você pergunta à cliente sobre alergias, condições pré-existentes e medicamentos em uso. Ela informa que não tem alergias conhecidas, é hipertensa controlada e toma Losartana 50mg diariamente. A febre está em torno de 38°C, a dor de garganta é moderada e ela está com congestão nasal e tosse seca ocasional."
            },
            {
              tipo: "pergunta",
              texto: "Com base nessas informações, qual seria a recomendação mais adequada?",
              opcoes: [
                {
                  texto: "Paracetamol 750mg para febre e dor, pastilhas de própolis para garganta e lavagem nasal com soro fisiológico",
                  feedback: "Correto! O Paracetamol é seguro para hipertensos, as pastilhas de própolis têm ação anti-inflamatória local para a garganta, e a lavagem nasal ajuda na congestão. Esta combinação trata os sintomas sem interagir com a Losartana.",
                  pontos: 15,
                  correta: true
                },
                {
                  texto: "Ibuprofeno 600mg para febre e dor, spray de benzocaína para garganta e descongestionante nasal com pseudoefedrina",
                  feedback: "Incorreto. Ibuprofeno deve ser usado com cautela em hipertensos, pois pode reduzir o efeito de anti-hipertensivos. A pseudoefedrina é contraindicada para hipertensos, pois pode elevar a pressão arterial.",
                  pontos: -10
                },
                {
                  texto: "Dipirona 1g para febre e dor, pastilhas de menta para garganta e anti-histamínico com pseudoefedrina",
                  feedback: "Incorreto. Embora a Dipirona seja uma opção para febre e dor, a pseudoefedrina presente no anti-histamínico é contraindicada para hipertensos. As pastilhas de menta têm efeito limitado para inflamação de garganta.",
                  pontos: -5
                },
                {
                  texto: "Ácido Acetilsalicílico 500mg, spray de fenol para garganta e descongestionante nasal tópico",
                  feedback: "Parcialmente correto. O descongestionante nasal tópico pode ser usado com cautela em hipertensos, mas o Ácido Acetilsalicílico pode interagir com anti-hipertensivos e reduzir seu efeito. Além disso, não é a primeira escolha para sintomas gripais.",
                  pontos: 0
                }
              ]
            },
            {
              tipo: "pergunta",
              texto: "Quais orientações não farmacológicas você daria à cliente?",
              opcoes: [
                {
                  texto: "Apenas tomar os medicamentos conforme indicado é suficiente para uma recuperação rápida",
                  feedback: "Incorreto. As medidas não farmacológicas são fundamentais para complementar o tratamento medicamentoso e acelerar a recuperação.",
                  pontos: -5
                },
                {
                  texto: "Repouso, hidratação adequada, alimentação leve e umidificação do ambiente",
                  feedback: "Correto! Estas medidas são essenciais para complementar o tratamento medicamentoso. O repouso ajuda o corpo a se recuperar, a hidratação fluidifica as secreções, a alimentação leve fornece nutrientes sem sobrecarregar o organismo, e a umidificação alivia os sintomas respiratórios.",
                  pontos: 10,
                  correta: true
                },
                {
                  texto: "Exercícios físicos leves para estimular a circulação e banhos quentes prolongados",
                  feedback: "Incorreto. Durante um quadro gripal, é recomendado repouso, não exercícios. Banhos muito quentes e prolongados podem causar vasodilatação e piorar a congestão nasal, além de potencialmente aumentar a pressão arterial em hipertensos.",
                  pontos: -10
                },
                {
                  texto: "Dieta rica em laticínios e alimentos condimentados para estimular o sistema imunológico",
                  feedback: "Incorreto. Laticínios podem aumentar a produção de muco e piorar a congestão, enquanto alimentos condimentados podem irritar a garganta já inflamada. Uma dieta leve e rica em líquidos é mais adequada.",
                  pontos: -5
                }
              ]
            },
            {
              tipo: "pergunta",
              texto: "Quando a cliente deveria procurar atendimento médico?",
              opcoes: [
                {
                  texto: "Apenas se os sintomas não melhorarem após uma semana completa de tratamento",
                  feedback: "Incorreto. Esperar uma semana completa pode ser perigoso se houver sinais de agravamento que exigem atenção médica imediata.",
                  pontos: -5
                },
                {
                  texto: "Se apresentar febre acima de 38,5°C por mais de 3 dias, falta de ar ou dor no peito",
                  feedback: "Correto! Estes são sinais de alerta que podem indicar complicações e necessitam de avaliação médica. A falta de ar e dor no peito, em particular, podem indicar pneumonia ou outras complicações graves.",
                  pontos: 15,
                  correta: true
                },
                {
                  texto: "Não é necessário procurar um médico, pois gripes são autolimitadas e sempre melhoram sozinhas",
                  feedback: "Incorreto. Embora muitas gripes sejam autolimitadas, algumas podem evoluir para complicações graves, especialmente em pessoas com comorbidades como hipertensão.",
                  pontos: -15
                },
                {
                  texto: "Apenas se desenvolver erupções cutâneas ou reações alérgicas aos medicamentos",
                  feedback: "Parcialmente correto, mas incompleto. Reações alérgicas são motivo para buscar atendimento, mas existem outros sinais de alerta importantes relacionados ao agravamento da gripe que também exigem avaliação médica.",
                  pontos: 0
                }
              ]
            }
          ]
        },
        {
          id: 2,
          titulo: "Cliente com dor de cabeça intensa",
          descricao: "Um homem de 42 anos entra na farmácia relatando que está com uma dor de cabeça intensa há cerca de 4 horas. Ele descreve a dor como pulsátil, localizada em um lado da cabeça, e menciona que a luz e o barulho pioram o desconforto. Ele pergunta se você pode recomendar algo para aliviar a dor rapidamente.",
          imagem: "/imagens/cliente_dor_cabeca.jpg",
          etapas: [
            {
              tipo: "pergunta",
              texto: "Qual seria sua primeira ação?",
              opcoes: [
                {
                  texto: "Recomendar imediatamente um analgésico potente como Torsilax® (associação de relaxante muscular com analgésicos)",
                  feedback: "Incorreto. Antes de recomendar qualquer medicamento, é necessário coletar mais informações sobre o cliente e seu histórico.",
                  pontos: -10
                },
                {
                  texto: "Fazer perguntas adicionais para entender melhor o quadro do cliente",
                  feedback: "Correto! É fundamental coletar mais informações antes de fazer qualquer recomendação. Você precisa saber sobre a frequência dessas dores, histórico médico, alergias, medicamentos em uso e se já tentou algum tratamento.",
                  pontos: 10,
                  correta: true
                },
                {
                  texto: "Recomendar que ele procure um pronto-socorro imediatamente",
                  feedback: "Parcialmente correto. Embora algumas dores de cabeça possam indicar condições graves que necessitam de atendimento de emergência, é necessário coletar mais informações antes de decidir se o encaminhamento é necessário.",
                  pontos: 0
                },
                {
                  texto: "Sugerir um comprimido de paracetamol 750mg e um café forte",
                  feedback: "Incorreto. Antes de recomendar qualquer medicamento, é necessário coletar mais informações sobre o cliente e seu histórico. Além disso, cafeína pode piorar alguns tipos de dor de cabeça.",
                  pontos: -5
                }
              ]
            },
            {
              tipo: "informacao",
              texto: "Você pergunta ao cliente sobre seu histórico. Ele informa que tem episódios semelhantes cerca de 2-3 vezes por mês, geralmente relacionados a períodos de estresse ou quando pula refeições. Não tem alergias conhecidas, não toma medicamentos de uso contínuo e não tem diagnóstico de enxaqueca, embora suspeite que seja o caso. Já tomou paracetamol há 2 horas, mas não obteve alívio significativo."
            },
            {
              tipo: "pergunta",
              texto: "Com base nessas informações, qual seria a recomendação mais adequada?",
              opcoes: [
                {
                  texto: "Ibuprofeno 400mg, com orientação para tomar após alimentação e não exceder 3 comprimidos em 24 horas",
                  feedback: "Correto! O Ibuprofeno é eficaz para dores de cabeça, incluindo enxaqueca, e pode ser mais efetivo que o paracetamol que o cliente já tentou sem sucesso. A orientação sobre tomar após alimentação é importante para reduzir o risco de irritação gástrica.",
                  pontos: 15,
                  correta: true
                },
                {
                  texto: "Outro comprimido de paracetamol 750mg, já que o intervalo de 2 horas é suficiente para uma nova dose",
                  feedback: "Incorreto. O intervalo mínimo entre doses de paracetamol é de 4-6 horas. Além disso, se a primeira dose não foi eficaz, é preferível tentar uma classe diferente de analgésico.",
                  pontos: -10
                },
                {
                  texto: "Dipirona 1g combinada com um anti-histamínico para potencializar o efeito",
                  feedback: "Parcialmente correto. A Dipirona pode ser eficaz para dor de cabeça, mas não há evidência de que anti-histamínicos potencializem seu efeito para dores de cabeça comuns ou enxaqueca. Essa combinação pode causar sonolência desnecessária.",
                  pontos: 0
                },
                {
                  texto: "Ácido Acetilsalicílico 500mg combinado com cafeína",
                  feedback: "Parcialmente correto. Esta combinação pode ser eficaz para alguns tipos de dor de cabeça, mas a cafeína pode piorar certos tipos de enxaqueca, e o AAS tem maior risco de efeitos adversos gastrointestinais comparado ao ibuprofeno.",
                  pontos: 5
                }
              ]
            },
            {
              tipo: "pergunta",
              texto: "Quais orientações não farmacológicas você daria ao cliente?",
              opcoes: [
                {
                  texto: "Continuar normalmente suas atividades, pois o movimento ajuda a distrair da dor",
                  feedback: "Incorreto. Durante uma crise de dor de cabeça intensa, especialmente com características de enxaqueca, o repouso em ambiente calmo e escuro é recomendado.",
                  pontos: -5
                },
                {
                  texto: "Repousar em ambiente escuro e silencioso, aplicar compressa fria na testa e nuca, e alimentar-se assim que possível",
                  feedback: "Correto! Estas medidas ajudam a reduzir os estímulos que podem piorar a dor (luz e som), a compressa fria pode aliviar a dor por vasoconstrição local, e a alimentação é importante já que o cliente mencionou que pular refeições pode desencadear as crises.",
                  pontos: 10,
                  correta: true
                },
                {
                  texto: "Tomar um banho muito quente e demorado para relaxar os músculos da cabeça e pescoço",
                  feedback: "Incorreto. Banhos muito quentes podem causar vasodilatação e potencialmente piorar dores de cabeça, especialmente enxaquecas. Uma compressa fria é geralmente mais eficaz.",
                  pontos: -5
                },
                {
                  texto: "Consumir uma bebida cafeinada forte para constrição dos vasos sanguíneos",
                  feedback: "Parcialmente correto. Embora a cafeína possa ajudar em alguns casos por seu efeito vasoconstritor, ela também pode piorar certos tipos de dor de cabeça e causar rebote quando o efeito passa. Não é recomendada como primeira linha de tratamento não farmacológico.",
                  pontos: 0
                }
              ]
            },
            {
              tipo: "pergunta",
              texto: "Quando o cliente deveria procurar atendimento médico?",
              opcoes: [
                {
                  texto: "Apenas se tiver mais de 3 episódios por mês, pois isso já caracteriza enxaqueca crônica",
                  feedback: "Parcialmente correto. A frequência é um fator importante, mas não é o único critério para buscar atendimento médico.",
                  pontos: 5
                },
                {
                  texto: "Se a dor for muito intensa, não responder aos analgésicos comuns, ou estiver associada a sintomas como confusão, febre ou rigidez no pescoço",
                  feedback: "Correto! Estes são sinais de alerta que podem indicar condições graves como meningite, hemorragia subaracnóidea ou outras emergências neurológicas que requerem avaliação médica imediata.",
                  pontos: 15,
                  correta: true
                },
                {
                  texto: "Não é necessário procurar um médico para dores de cabeça, pois são sempre benignas",
                  feedback: "Incorreto. Embora muitas dores de cabeça sejam benignas, algumas podem ser sintomas de condições graves que requerem atenção médica.",
                  pontos: -15
                },
                {
                  texto: "Apenas se desenvolver efeitos colaterais aos medicamentos recomendados",
                  feedback: "Incorreto. Embora os efeitos colaterais sejam motivo para buscar atendimento, existem outros sinais de alerta relacionados à própria dor de cabeça que também exigem avaliação médica.",
                  pontos: -5
                }
              ]
            }
          ]
        }
      ];
      
      setCenarios(cenariosSimulados);
      setCarregando(false);
    }, 1000);
  }, []);

  // Função para iniciar simulação
  const iniciarSimulacao = (cenario) => {
    setCenarioAtual(cenario);
    setEtapaAtual(0);
    setRespostaSelecionada(null);
    setFeedback(null);
    setPontos(0);
    setSimulacaoIniciada(true);
    setSimulacaoConcluida(false);
    setResultados({ acertos: 0, erros: 0, total: 0 });
    setHistorico([]);
  };

  // Função para selecionar resposta
  const selecionarResposta = (opcao, index) => {
    setRespostaSelecionada(index);
    setFeedback(opcao.feedback);
    
    // Atualizar pontuação
    setPontos(pontos + opcao.pontos);
    
    // Atualizar resultados
    if (opcao.correta) {
      setResultados({
        ...resultados,
        acertos: resultados.acertos + 1,
        total: resultados.total + 1
      });
    } else {
      setResultados({
        ...resultados,
        erros: resultados.erros + 1,
        total: resultados.total + 1
      });
    }
    
    // Adicionar ao histórico
    setHistorico([
      ...historico,
      {
        etapa: cenarioAtual.etapas[etapaAtual].texto,
        resposta: opcao.texto,
        feedback: opcao.feedback,
        pontos: opcao.pontos,
        correta: opcao.correta || false
      }
    ]);
  };

  // Função para avançar para próxima etapa
  const proximaEtapa = () => {
    // Se for uma etapa de informação, não há resposta para selecionar
    if (cenarioAtual.etapas[etapaAtual].tipo === "informacao") {
      setEtapaAtual(etapaAtual + 1);
      return;
    }
    
    // Se já selecionou uma resposta, avança para próxima etapa
    if (respostaSelecionada !== null) {
      if (etapaAtual < cenarioAtual.etapas.length - 1) {
        setEtapaAtual(etapaAtual + 1);
        setRespostaSelecionada(null);
        setFeedback(null);
        
        // Se a próxima etapa for de informação, avança automaticamente
        if (etapaAtual + 1 < cenarioAtual.etapas.length && 
            cenarioAtual.etapas[etapaAtual + 1].tipo === "informacao") {
          setTimeout(() => {
            setEtapaAtual(etapaAtual + 2);
          }, 3000);
        }
      } else {
        // Simulação concluída
        setSimulacaoConcluida(true);
      }
    }
  };

  // Função para reiniciar simulação
  const reiniciarSimulacao = () => {
    setSimulacaoIniciada(false);
    setSimulacaoConcluida(false);
    setCenarioAtual(null);
    setEtapaAtual(0);
    setRespostaSelecionada(null);
    setFeedback(null);
    setPontos(0);
  };

  // Renderização condicional para carregamento
  if (carregando) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="ml-4 text-gray-700">Carregando simulador...</p>
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
            <h1 className="text-3xl font-bold text-gray-900">Simulador de Atendimento Farmacêutico</h1>
            <p className="mt-1 text-sm text-gray-500">
              Pratique suas habilidades de atendimento em situações realistas
            </p>
          </div>
          <div className="flex items-center">
            {simulacaoIniciada && !simulacaoConcluida && (
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
        
        {/* Seleção de cenário */}
        {!simulacaoIniciada ? (
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Selecione um cenário para iniciar a simulação</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cenarios.map((cenario) => (
                <div
                  key={cenario.id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{cenario.titulo}</h3>
                    <p className="text-gray-600 mb-4">{cenario.descricao}</p>
                    <button
                      onClick={() => iniciarSimulacao(cenario)}
                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Iniciar Simulação
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : simulacaoConcluida ? (
          // Resultados da simulação
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Simulação Concluída!</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <p className="text-sm text-green-600 font-medium">Decisões Corretas</p>
                  <p className="text-3xl font-bold text-green-700">{resultados.acertos}</p>
                </div>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                  <p className="text-sm text-red-600 font-medium">Decisões Incorretas</p>
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
                  {pontos >= 40 ? (
                    "Excelente trabalho! Suas decisões demonstram um ótimo conhecimento sobre atendimento farmacêutico e indicação de medicamentos. Continue aprimorando suas habilidades!"
                  ) : pontos >= 20 ? (
                    "Bom trabalho! Você tomou várias decisões corretas, mas ainda há espaço para melhorias. Revise os feedbacks para aprimorar seu conhecimento."
                  ) : pontos >= 0 ? (
                    "Você está no caminho certo, mas precisa revisar alguns conceitos importantes sobre atendimento farmacêutico e indicação de medicamentos. Preste atenção aos feedbacks recebidos."
                  ) : (
                    "Recomendamos revisar os materiais de treinamento sobre atendimento farmacêutico e indicação de medicamentos. Algumas decisões tomadas podem representar riscos aos pacientes."
                  )}
                </p>
              </div>
              
              {/* Histórico de decisões */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Histórico de Decisões</h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Situação
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Sua Decisão
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Resultado
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Pontos
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {historico.map((item, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {item.etapa}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {item.resposta}
                            </td>
                            <td className="px-6 py-4 text-sm">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                item.correta
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {item.correta ? 'Correto' : 'Incorreto'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <span className={`font-medium ${
                                item.pontos > 0
                                  ? 'text-green-600'
                                  : item.pontos < 0
                                  ? 'text-red-600'
                                  : 'text-gray-600'
                              }`}>
                                {item.pontos > 0 ? '+' : ''}{item.pontos}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center space-x-4">
                <button
                  onClick={reiniciarSimulacao}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Nova Simulação
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
          // Simulação em andamento
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {/* Cabeçalho do cenário */}
            <div className="px-4 py-5 sm:px-6 bg-blue-50 border-b border-blue-100">
              <h2 className="text-xl font-bold text-gray-900">{cenarioAtual.titulo}</h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {cenarioAtual.descricao}
              </p>
            </div>
            
            <div className="p-6">
              {/* Etapa atual */}
              <div className="mb-6">
                {cenarioAtual.etapas[etapaAtual].tipo === "pergunta" ? (
                  <>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">{cenarioAtual.etapas[etapaAtual].texto}</h3>
                    
                    <div className="space-y-3">
                      {cenarioAtual.etapas[etapaAtual].opcoes.map((opcao, index) => (
                        <button
                          key={index}
                          onClick={() => respostaSelecionada === null && selecionarResposta(opcao, index)}
                          disabled={respostaSelecionada !== null}
                          className={`w-full text-left p-4 rounded-lg border transition-colors ${
                            respostaSelecionada === null
                              ? 'border-gray-300 hover:bg-gray-50'
                              : respostaSelecionada === index
                                ? opcao.correta
                                  ? 'bg-green-100 border-green-500'
                                  : 'bg-red-100 border-red-500'
                                : opcao.correta
                                  ? 'bg-green-100 border-green-500'
                                  : 'border-gray-300 opacity-70'
                          }`}
                        >
                          {opcao.texto}
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          {cenarioAtual.etapas[etapaAtual].texto}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Feedback */}
              {feedback && (
                <div className={`p-4 rounded-lg mb-6 ${
                  respostaSelecionada !== null && cenarioAtual.etapas[etapaAtual].opcoes[respostaSelecionada].correta
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-red-50 border border-red-200'
                }`}>
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      {respostaSelecionada !== null && cenarioAtual.etapas[etapaAtual].opcoes[respostaSelecionada].correta ? (
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
                      <h3 className={`text-sm font-medium ${
                        respostaSelecionada !== null && cenarioAtual.etapas[etapaAtual].opcoes[respostaSelecionada].correta
                          ? 'text-green-800'
                          : 'text-red-800'
                      }`}>
                        {respostaSelecionada !== null && cenarioAtual.etapas[etapaAtual].opcoes[respostaSelecionada].correta
                          ? 'Decisão correta!'
                          : 'Decisão incorreta'
                        }
                      </h3>
                      <div className={`mt-2 text-sm ${
                        respostaSelecionada !== null && cenarioAtual.etapas[etapaAtual].opcoes[respostaSelecionada].correta
                          ? 'text-green-700'
                          : 'text-red-700'
                      }`}>
                        <p>{feedback}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Botão de próxima etapa */}
              <div className="flex justify-center">
                <button
                  onClick={proximaEtapa}
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    cenarioAtual.etapas[etapaAtual].tipo === "informacao" || respostaSelecionada !== null
                      ? ''
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                  disabled={cenarioAtual.etapas[etapaAtual].tipo === "pergunta" && respostaSelecionada === null}
                >
                  {etapaAtual < cenarioAtual.etapas.length - 1 ? 'Continuar' : 'Finalizar Simulação'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
