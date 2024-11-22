type Sistema = {
  nome: string;
  custo: number;
  manutencao: number;
  producao: number;
};

type PropsCalculadoraResultado = {
  sistema: string;
  contaEnergia: number;
  consumoMensal: number;
};

const sistemas: { [key: string]: Sistema } = {
  'Solar Baixo Custo': { nome: 'Solar Baixo Custo', custo: 5.000, manutencao: 500, producao: 200 },
  'Solar Médio Custo': { nome: 'Solar Médio Custo', custo: 15.000, manutencao: 700, producao: 500 },
  'Solar Alto Custo': { nome: 'Solar Alto Custo', custo: 30.000, manutencao: 900, producao: 800 },
  'Eólico Baixo Custo': { nome: 'Eólico Baixo Custo', custo: 6.000, manutencao: 600, producao: 250 },
  'Eólico Médio Custo': { nome: 'Eólico Médio Custo', custo: 20.000, manutencao: 800, producao: 600 },
  'Eólico Alto Custo': { nome: 'Eólico Alto Custo', custo: 40.000, manutencao: 1.000, producao: 1.000 },
};

const CalculadoraResultado: React.FC<PropsCalculadoraResultado> = ({ sistema, contaEnergia, consumoMensal }) => {
  const sistemaSelecionado = sistemas[sistema];

  const economiaPotencial = Math.min(sistemaSelecionado.producao, consumoMensal) * (contaEnergia / consumoMensal);
  const economiaAnual = economiaPotencial * 12;
  const retornoInvestimento = sistemaSelecionado.custo / economiaAnual;

  return (
    <div className='result'>
      <h2>Resultados:</h2>
      <p>Sistema escolhido: {sistemaSelecionado.nome}</p>
      <p>Economia Mensal Estimada: R$ {economiaPotencial.toFixed(2)}</p>
      <p>Economia Anual Estimada: R$ {economiaAnual.toFixed(2)}</p>
      <p>Retorno sobre o Investimento: {retornoInvestimento.toFixed(2)} anos</p>
    </div>
  );
};

export default CalculadoraResultado;
