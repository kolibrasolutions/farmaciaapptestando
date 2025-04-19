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
                  observacoes: 'Seguro para diabéticos. Não afeta significativamente a glicemia.'
                },
                {
                  nome: 'Ibuprofeno 400mg',
                  posologia: '400mg a cada 8 horas, após as refeições.',
                  observacoes: 'Usar com cautela em diabéticos com complicações renais.'
                }
              ],
              naoFarmacologicas: [
                'Verificar níveis de glicemia, pois hipo ou hiperglicemia podem causar dor de cabeça',
                'Hidratação adequada',
                'Repouso em ambiente calmo',
                'Compressas frias',
                'Técnicas de relaxamento'
              ],
              sinaisAlerta: [
                'Dor de cabeça associada a alterações significativas na glicemia',
                'Dor intensa de início súbito',
                'Dor acompanhada de alterações visuais (possível retinopatia)',
                'Dor que não responde a analgésicos',
                'Dor em paciente com histórico de hipertensão não controlada'
              ]
            }
          }
        },
        {
          id: 4,
          sintoma: 'Alergia cutânea',
          categoria: 'dermatologico',
          descricao: 'Reação alérgica manifestada na pele, podendo incluir vermelhidão, coceira, inchaço ou erupções.',
          publicos: ['adultos', 'criancas', 'idosos', 'diabeticos'],
          recomendacoes: {
            adultos: {
              medicamentos: [
                {
                  nome: 'Loratadina 10mg',
                  posologia: '10mg uma vez ao dia.',
                  observacoes: 'Anti-histamínico não sedativo, ideal para uso diurno.'
                },
                {
                  nome: 'Dexclorfeniramina 2mg',
                  posologia: '2mg a cada 6-8 horas.',
                  observacoes: 'Anti-histamínico com efeito sedativo, melhor para uso noturno ou quando a coceira interfere no sono.'
                },
                {
                  nome: 'Hidrocortisona creme 1%',
                  posologia: 'Aplicar uma fina camada nas áreas afetadas 2-3 vezes ao dia por até 7 dias.',
                  observacoes: 'Corticosteroide tópico de baixa potência para alívio da inflamação e coceira.'
                }
              ],
              naoFarmacologicas: [
                'Evitar coçar as lesões',
                'Identificar e evitar o agente causador',
                'Usar roupas de algodão, soltas e frescas',
                'Banhos mornos com aveia coloidal',
                'Manter a pele hidratada com loções sem perfume'
              ],
              sinaisAlerta: [
                'Inchaço dos lábios, língua ou garganta',
                'Dificuldade para respirar',
                'Tontura ou desmaio',
                'Lesões que pioram rapidamente ou se espalham',
                'Febre ou mal-estar significativo'
              ]
            },
            criancas: {
              medicamentos: [
                {
                  nome: 'Loratadina xarope',
                  posologia: 'Crianças acima de 2 anos com menos de 30kg: 5mg (5ml) uma vez ao dia. Crianças com mais de 30kg: 10mg (10ml) uma vez ao dia.',
                  observacoes: 'Anti-histamínico não sedativo, seguro para uso pediátrico acima de 2 anos.'
                },
                {
                  nome: 'Dexclorfeniramina xarope',
                  posologia: 'Crianças 2-6 anos: 0,5mg (2ml) a cada 6-8 horas. Crianças 6-12 anos: 1mg (4ml) a cada 6-8 horas.',
                  observacoes: 'Pode causar sonolência. Útil para uso noturno.'
                },
                {
                  nome: 'Hidrocortisona creme 0,5%',
                  posologia: 'Aplicar uma fina camada nas áreas afetadas 1-2 vezes ao dia por até 5 dias.',
                  observacoes: 'Usar a menor concentração eficaz pelo menor tempo possível.'
                }
              ],
              naoFarmacologicas: [
                'Evitar que a criança coce as lesões (cortar as unhas, usar luvas de algodão à noite)',
                'Banhos mornos com aveia coloidal',
                'Roupas de algodão',
                'Identificar e remover possíveis alérgenos',
                'Manter o ambiente fresco'
              ],
              sinaisAlerta: [
                'Qualquer sinal de dificuldade respiratória',
                'Inchaço facial',
                'Lesões que pioram rapidamente',
                'Febre',
                'Letargia ou irritabilidade excessiva'
              ]
            },
            idosos: {
              medicamentos: [
                {
                  nome: 'Loratadina 10mg',
                  posologia: '10mg uma vez ao dia.',
                  observacoes: 'Preferível por ter menos efeitos anticolinérgicos e sedativos.'
                },
                {
                  nome: 'Hidrocortisona creme 1%',
                  posologia: 'Aplicar uma fina camada nas áreas afetadas 1-2 vezes ao dia por até 7 dias.',
                  observacoes: 'Usar com cautela em pele fina ou atrófica. Evitar uso prolongado.'
                }
              ],
              naoFarmacologicas: [
                'Hidratação intensa da pele com emolientes',
                'Banhos mornos (não quentes) com produtos suaves',
                'Evitar sabonetes com perfume',
                'Roupas de algodão',
                'Ambiente com umidade adequada'
              ],
              sinaisAlerta: [
                'Qualquer sinal de dificuldade respiratória',
                'Lesões extensas ou que pioram rapidamente',
                'Sinais de infecção secundária',
                'Alteração do estado mental',
                'Desidratação'
              ]
            },
            diabeticos: {
              medicamentos: [
                {
                  nome: 'Loratadina 10mg',
                  posologia: '10mg uma vez ao dia.',
                  observacoes: 'Não afeta significativamente a glicemia.'
                },
                {
                  nome: 'Hidrocortisona creme 1%',
                  posologia: 'Aplicar uma fina camada nas áreas afetadas 1-2 vezes ao dia por até 5 dias.',
                  observacoes: 'Uso por áreas limitadas e curto período não afeta significativamente a glicemia, mas monitorar em caso de uso mais extenso.'
                }
              ],
              naoFarmacologicas: [
                'Cuidado especial com a hidratação da pele, especialmente nas extremidades',
                'Inspecionar a pele diariamente',
                'Controle adequado da glicemia',
                'Evitar coçar para prevenir lesões que podem cicatrizar mal',
                'Manter boa hidratação oral'
              ],
              sinaisAlerta: [
                'Lesões em áreas de baixa circulação (pés, pernas)',
                'Sinais de infecção secundária',
                'Lesões que não melhoram em poucos dias',
                'Alterações significativas na glicemia',
                'Qualquer sinal de dificuldade respiratória'
              ]
            }
          }
        },
        {
          id: 5,
          sintoma: 'Azia e má digestão',
          categoria: 'digestivo',
          descricao: 'Sensação de queimação no peito ou garganta, frequentemente acompanhada de desconforto abdominal, eructação ou sensação de plenitude.',
          publicos: ['adultos', 'idosos', 'diabeticos'],
          recomendacoes: {
            adultos: {
              medicamentos: [
                {
                  nome: 'Omeprazol 20mg',
                  posologia: '20mg uma vez ao dia, 30 minutos antes do café da manhã, por até 14 dias.',
                  observacoes: 'Inibidor da bomba de prótons. Mais eficaz quando tomado em jejum.'
                },
                {
                  nome: 'Hidróxido de alumínio + hidróxido de magnésio suspensão',
                  posologia: '10-15ml após as refeições e ao deitar, ou quando necessário para alívio dos sintomas.',
                  observacoes: 'Antiácido de ação rápida para alívio sintomático. Não usar por mais de 14 dias consecutivos.'
                },
                {
                  nome: 'Simeticona 40mg',
                  posologia: '40mg após as refeições e ao deitar, até 4 vezes ao dia.',
                  observacoes: 'Útil quando há distensão abdominal e gases associados.'
                }
              ],
              naoFarmacologicas: [
                'Evitar alimentos gordurosos, picantes, cítricos, café, álcool e chocolate',
                'Comer porções menores e mais frequentes',
                'Não deitar logo após as refeições (aguardar pelo menos 2 horas)',
                'Elevar a cabeceira da cama 15-20cm',
                'Evitar roupas apertadas na região abdominal'
              ],
              sinaisAlerta: [
                'Dor torácica intensa que pode irradiar para o braço, pescoço ou mandíbula',
                'Dificuldade para engolir ou dor ao engolir',
                'Vômitos persistentes ou com sangue',
                'Fezes escuras ou com sangue',
                'Perda de peso não intencional'
              ]
            },
            idosos: {
              medicamentos: [
                {
                  nome: 'Hidróxido de alumínio + hidróxido de magnésio suspensão',
                  posologia: '5-10ml após as refeições e ao deitar.',
                  observacoes: 'Preferível iniciar com antiácidos antes de medicamentos sistêmicos. Monitorar função renal em uso prolongado.'
                },
                {
                  nome: 'Omeprazol 20mg',
                  posologia: '20mg uma vez ao dia, por até 14 dias.',
                  observacoes: 'Usar com cautela devido ao maior risco de infecções, fraturas e deficiência de vitamina B12 em uso prolongado.'
                }
              ],
              naoFarmacologicas: [
                'Modificações dietéticas (evitar alimentos desencadeantes)',
                'Refeições pequenas e frequentes',
                'Elevação da cabeceira da cama',
                'Evitar deitar-se nas 2-3 horas após as refeições',
                'Verificar se medicamentos em uso podem causar ou agravar a azia'
              ],
              sinaisAlerta: [
                'Qualquer dor torácica, mesmo que típica de azia',
                'Dificuldade para engolir',
                'Vômitos persistentes',
                'Perda de peso não intencional',
                'Anemia (palidez, fadiga)'
              ]
            },
            diabeticos: {
              medicamentos: [
                {
                  nome: 'Omeprazol 20mg',
                  posologia: '20mg uma vez ao dia, por até 14 dias.',
                  observacoes: 'Monitorar glicemia, pois pode alterar a absorção de alguns hipoglicemiantes orais.'
                },
                {
                  nome: 'Hidróxido de alumínio + hidróxido de magnésio suspensão sem açúcar',
                  posologia: '10ml após as refeições e ao deitar.',
                  observacoes: 'Verificar se a formulação é livre de açúcar.'
                }
              ],
              naoFarmacologicas: [
                'Controle adequado da glicemia (hiperglicemia pode retardar o esvaziamento gástrico)',
                'Refeições pequenas e frequentes conforme plano alimentar para diabetes',
                'Elevação da cabeceira da cama',
                'Manter peso adequado',
                'Evitar alimentos desencadeantes'
              ],
              sinaisAlerta: [
                'Dor torácica',
                'Alterações significativas na glicemia',
                'Náuseas e vômitos que impedem alimentação adequada',
                'Sinais de desidratação',
                'Sintomas que não melhoram após 7 dias de tratamento'
              ]
            }
          }
        }
      ];
      
      // Filtrar por termo de busca e/ou categoria
      if (termoBusca) {
        const termoBuscaLower = termoBusca.toLowerCase();
        resultadosSimulados = sintomasDB.filter(item => 
          item.sintoma.toLowerCase().includes(termoBuscaLower) || 
          item.descricao.toLowerCase().includes(termoBuscaLower)
        );
      } else if (categoriaSelecionada) {
        resultadosSimulados = sintomasDB.filter(item => item.categoria === categoriaSelecionada);
      }
      
      // Filtrar por público
      resultadosSimulados = resultadosSimulados.filter(item => 
        item.publicos.includes(filtroPublico)
      );
      
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
            <h1 className="text-3xl font-bold text-gray-900">Consulta por Sintomas</h1>
            <p className="mt-1 text-sm text-gray-500">
              Pesquise recomendações farmacêuticas para sintomas e condições comuns
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
                Buscar por sintoma ou condição
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  name="termo-busca"
                  id="termo-busca"
                  value={termoBusca}
                  onChange={(e) => setTermoBusca(e.target.value)}
                  className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                  placeholder="Ex: Tosse, dor de cabeça, alergia..."
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
                  if (e.target.value) {
                    setTimeout(() => buscarSintomas(), 100);
                  }
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
            </div>
          </div>
          
          {/* Filtro de público */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Público-alvo
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setFiltroPublico('adultos');
                  if (buscaRealizada) buscarSintomas();
                }}
                className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                  filtroPublico === 'adultos' 
                    ? 'bg-blue-100 text-blue-800 border border-blue-300' 
                    : 'bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                Adultos
              </button>
              <button
                onClick={() => {
                  setFiltroPublico('criancas');
                  if (buscaRealizada) buscarSintomas();
                }}
                className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                  filtroPublico === 'criancas' 
                    ? 'bg-green-100 text-green-800 border border-green-300' 
                    : 'bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                Crianças
              </button>
              <button
                onClick={() => {
                  setFiltroPublico('idosos');
                  if (buscaRealizada) buscarSintomas();
                }}
                className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                  filtroPublico === 'idosos' 
                    ? 'bg-purple-100 text-purple-800 border border-purple-300' 
                    : 'bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                Idosos
              </button>
              <button
                onClick={() => {
                  setFiltroPublico('diabeticos');
                  if (buscaRealizada) buscarSintomas();
                }}
                className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                  filtroPublico === 'diabeticos' 
                    ? 'bg-orange-100 text-orange-800 border border-orange-300' 
                    : 'bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                Diabéticos
              </button>
            </div>
          </div>
        </div>
        
        {/* Detalhes do sintoma selecionado */}
        {sintomaSelecionado && (
          <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center bg-blue-50 border-b border-blue-100">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{sintomaSelecionado.sintoma}</h2>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {sintomaSelecionado.descricao}
                </p>
              </div>
              <button
                onClick={limparSelecao}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Voltar aos resultados
              </button>
            </div>
            
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:px-6">
                  <dt className="text-lg font-medium text-gray-900 mb-2">
                    Medicamentos Recomendados
                  </dt>
                  <dd className="mt-1">
                    <ul className="divide-y divide-gray-200 border border-gray-200 rounded-md">
                      {sintomaSelecionado.recomendacoes[filtroPublico].medicamentos.map((medicamento, index) => (
                        <li key={index} className="px-4 py-3">
                          <div className="font-medium text-blue-600">{medicamento.nome}</div>
                          <div className="text-sm text-gray-700 mt-1">
                            <span className="font-medium">Posologia:</span> {medicamento.posologia}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            <span className="font-medium">Observações:</span> {medicamento.observacoes}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
                
                <div className="bg-white px-4 py-5 sm:px-6">
                  <dt className="text-lg font-medium text-gray-900 mb-2">
                    Orientações Não Farmacológicas
                  </dt>
                  <dd className="mt-1">
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      {sintomaSelecionado.recomendacoes[filtroPublico].naoFarmacologicas.map((orientacao, index) => (
                        <li key={index}>{orientacao}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
                
                <div className="bg-red-50 px-4 py-5 sm:px-6">
                  <dt className="text-lg font-medium text-red-800 mb-2">
                    Sinais de Alerta (Encaminhar ao Médico)
                  </dt>
                  <dd className="mt-1">
                    <ul className="list-disc pl-5 space-y-1 text-red-700">
                      {sintomaSelecionado.recomendacoes[filtroPublico].sinaisAlerta.map((sinal, index) => (
                        <li key={index}>{sinal}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        )}
        
        {/* Resultados da busca */}
        {!sintomaSelecionado && (
          <>
            {carregando ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <p className="ml-4 text-gray-700">Buscando sintomas...</p>
              </div>
            ) : buscaRealizada ? (
              resultados.length > 0 ? (
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                  <ul className="divide-y divide-gray-200">
                    {resultados.map((sintoma) => (
                      <li key={sintoma.id}>
                        <button
                          onClick={() => selecionarSintoma(sintoma)}
                          className="block hover:bg-gray-50 w-full text-left"
                        >
                          <div className="px-4 py-4 sm:px-6">
                            <div className="flex items-center justify-between">
                              <p className="text-lg font-medium text-blue-600 truncate">
                                {sintoma.sintoma}
                              </p>
                              <div className="ml-2 flex-shrink-0 flex">
                                <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                  {categorias.find(cat => cat.id === sintoma.categoria)?.nome || sintoma.categoria}
                                </p>
                              </div>
                            </div>
                            <div className="mt-2">
                              <p className="text-sm text-gray-500">
                                {sintoma.descricao}
                              </p>
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                              <p>
                                {sintoma.recomendacoes[filtroPublico].medicamentos.length} medicamentos recomendados
                              </p>
                            </div>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="bg-white shadow rounded-lg p-8 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum resultado encontrado</h3>
                  <p className="text-gray-500 mb-6">
                    Tente buscar com outros termos, selecionar uma categoria diferente ou mudar o público-alvo.
                  </p>
                </div>
              )
            ) : (
              <div className="bg-white shadow rounded-lg p-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Busque por sintomas ou condições</h3>
                <p className="text-gray-500 mb-6">
                  Digite o sintoma ou condição, ou selecione uma categoria para começar. Você também pode filtrar por público-alvo.
                </p>
              </div>
            )}
          </>
        )}
        
        {/* Informações adicionais */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-800 mb-2">Informações importantes</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• As informações disponíveis nesta consulta são apenas para referência e não substituem a orientação profissional</li>
            <li>• Sempre avalie cada caso individualmente, considerando o histórico completo do paciente</li>
            <li>• Verifique contraindicações, interações medicamentosas e condições pré-existentes</li>
            <li>• Esteja atento aos sinais de alerta que exigem encaminhamento médico</li>
            <li>• Em caso de dúvida, consulte o farmacêutico responsável ou encaminhe o paciente ao médico</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
