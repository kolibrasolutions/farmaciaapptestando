import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">Treinamento para Balconistas de Farmácia</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">Módulo de Treinamento</h2>
            <p className="mb-6 text-gray-700">
              Aprenda e pratique o atendimento farmacêutico com flashcards interativos e 
              perguntas de múltipla escolha baseadas em situações reais.
            </p>
            <div className="flex flex-col space-y-4">
              <Link 
                href="/treinamento/flashcards" 
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors text-center"
              >
                Flashcards Interativos
              </Link>
              <Link 
                href="/treinamento/quiz" 
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors text-center"
              >
                Quiz de Múltipla Escolha
              </Link>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-4 text-purple-600">Módulo de Consulta</h2>
            <p className="mb-6 text-gray-700">
              Pesquise rapidamente qual medicamento indicar para determinados sintomas ou condições,
              com informações sobre posologia, contraindicações e alternativas.
            </p>
            <Link 
              href="/consulta" 
              className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition-colors block text-center"
            >
              Consultar Medicamentos
            </Link>
          </div>
        </div>
        
        <div className="mt-16 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Sobre o Aplicativo</h2>
          <p className="text-gray-700">
            Este aplicativo foi desenvolvido para auxiliar no treinamento de balconistas de farmácia,
            fornecendo uma ferramenta prática para aprendizado e consulta rápida durante o atendimento.
            Utilize os flashcards para memorizar as recomendações farmacêuticas e o quiz para testar
            seus conhecimentos. O módulo de consulta permite encontrar rapidamente informações sobre
            medicamentos para diferentes sintomas e condições.
          </p>
        </div>
      </div>
    </main>
  )
}
