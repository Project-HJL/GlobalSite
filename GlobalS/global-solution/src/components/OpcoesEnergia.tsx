type PropsOpcoesEnergia = {
  setSelectedSystem: (sistema: string) => void;
};

const OpcoesEnergia: React.FC<PropsOpcoesEnergia> = ({ setSelectedSystem }) => {
  const opcoesSolares = [
    { nome: 'Solar Baixo Custo', custo: 5000, manutencao: 500, producao: 200 },
    { nome: 'Solar Médio Custo', custo: 15000, manutencao: 700, producao: 500 },
    { nome: 'Solar Alto Custo', custo: 30000, manutencao: 900, producao: 800 },
  ];

  const opcoesEolicas = [
    { nome: 'Eólico Baixo Custo', custo: 6000, manutencao: 600, producao: 250 },
    { nome: 'Eólico Médio Custo', custo: 20000, manutencao: 800, producao: 600 },
    { nome: 'Eólico Alto Custo', custo: 40000, manutencao: 1000, producao: 1000 },
  ];

  return (
    <div className='simulador-opcoes'>
      <h2>Escolha um sistema:</h2>

      <div className="sis">
        <div className="sis-solar">
          <h3>Sistemas Solares</h3>
          {opcoesSolares.map((opcao) => (
            <button key={opcao.nome} onClick={() => setSelectedSystem(opcao.nome)}>
              {opcao.nome} - Instalação: R$ {opcao.custo} - Produção: {opcao.producao} kWh
            </button>
          ))}
        </div>
        <div className="sis-eolico">
          <h3>Sistemas Eólicos</h3>
          {opcoesEolicas.map((opcao) => (
            <button key={opcao.nome} onClick={() => setSelectedSystem(opcao.nome)}>
              {opcao.nome} - Instalação: R$ {opcao.custo} - Produção: {opcao.producao} kWh
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OpcoesEnergia;
