"use client"; 
import React, { useState } from 'react';
import OpcoesEnergia from './OpcoesEnergia';

type Resultado = {
  economiaMensal: number;
  economiaAnual: number;
  retornoInvestimento: number;
};

const Simulador: React.FC = () => {
  const [sistemaSelecionado, setSistemaSelecionado] = useState<string | null>(null);
  const [contaEnergia, setContaEnergia] = useState<number | null>(null);
  const [consumoMensal, setConsumoMensal] = useState<number | null>(null);
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  const calcular = async () => {
    // Limpa mensagens de erro e resultados anteriores
    setErro(null);
    setResultado(null);

    if (!sistemaSelecionado) {
      setErro("Por favor, selecione um sistema.");
      return;
    }
    if (!contaEnergia) {
      setErro("Por favor, insira o valor da conta de energia.");
      return;
    }
    if (!consumoMensal) {
      setErro("Por favor, insira o consumo mensal em kWh.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/JavaGs/webapi/calculadora", {   
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sistema: sistemaSelecionado, contaEnergia, consumoMensal }),
      });

      if (response.ok) {
        const data = await response.json();
        setResultado(data);
      } else {
        console.error("Erro ao calcular:", await response.text());
      }
    } catch (error) {
      console.error("Erro na comunicação com o backend:", error);
    }
  };

  return (
    <div className="simulador-simulador">
      <h1>Simulador de Economia com Energias Renováveis</h1>
      <OpcoesEnergia setSelectedSystem={setSistemaSelecionado} />

      <div className="result-conta">
        <label>
          Valor da Conta de Energia (R$):
          <input
            type="number"
            value={contaEnergia ?? ''}
            onChange={(e) => setContaEnergia(parseFloat(e.target.value))}
          />
        </label>
        <label>
          Consumo Mensal em kWh:
          <input
            type="number"
            value={consumoMensal ?? ''}
            onChange={(e) => setConsumoMensal(parseFloat(e.target.value))}
          />
        </label>
        <button onClick={calcular}>Calcular</button>
      </div>

      {erro && <p className="error-message-conta">{erro}</p>}

      {resultado && (
        <div className="result">
          <h2>Resultados:</h2>
          <p>Economia Mensal Estimada: R$ {resultado.economiaMensal.toFixed(2)}</p>
          <p>Economia Anual Estimada: R$ {resultado.economiaAnual.toFixed(2)}</p>
          <p>Retorno sobre o Investimento: {resultado.retornoInvestimento.toFixed(2)} anos</p>
        </div>
      )}
    </div>
  );
};

export default Simulador;
