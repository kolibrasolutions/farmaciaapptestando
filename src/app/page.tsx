"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Farmácia Training App
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Plataforma de treinamento para profissionais de farmácia
          </p>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">Área de Treinamento</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Acesse flashcards, quizzes e simulações para aprimorar seus conhecimentos.
                </p>
                <div className="mt-4">
                  <Link href="/treinamento/flashcards" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                    Acessar treinamentos <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">Consulta Rápida</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Consulte informações sobre medicamentos e sintomas para atendimento.
                </p>
                <div className="mt-4">
                  <Link href="/consulta/medicamentos" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                    Fazer consulta <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">Área Administrativa</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Gerencie farmácias, usuários e acompanhe o progresso dos treinamentos.
                </p>
                <div className="mt-4">
                  <Link href="/login" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                    Fazer login <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
