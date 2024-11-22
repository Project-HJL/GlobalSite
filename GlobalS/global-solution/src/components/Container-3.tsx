import Image from 'next/image';

const Section3: React.FC = () => {
  const imageUrl1 = '/images/moinho.jpg';
  const imageUrl2 = '/images/solar.jpg';
  const imageUrl3 = '/images/usina.jpg';

  return (
    <section>
      <div className="container-3">
        <h2>Fontes de energia renováveis</h2>
        {/* Energia Eólica */}
        <div className="siis-eolico">
          <div className="img-siis-eolico">
            <Image src={imageUrl1} alt="Imagem de um campo de usina eólica" width={1000} height={1000} />
          </div>
          <div className="siis">
            <div className="content-siis-eolico">
              <h3>Energia Eólica</h3>
              <p>
                A energia eólica é gerada pela conversão da energia cinética
                do vento em eletricidade por meio de turbinas eólicas. É uma
                das fontes de energia renovável que mais cresce, especialmente
                em regiões com ventos constantes, como o Nordeste do Brasil.
              </p>
              <div className="dados-siis-eolico">
                <div className="dado-1">
                  <h4>% Global</h4>
                  <p>10%</p>
                </div>
                <div className="dado-2">
                  <h4>% no Brasil</h4>
                  <p>10,8%</p>
                </div>
                <div className="dado-3">
                  <h4>Usuários (Mundo)</h4>
                  <p>200 milhões</p>
                </div>
                <div className="dado-4">
                  <h4>Usuários (Brasil)</h4>
                  <p>40 milhões</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Energia Solar */}
        <div className="siis-solar">
          <div className="img-siis-solar">
            <Image src={imageUrl2} alt="Imagem de um campo de painéis solares"  width={1000} height={1000}/>
          </div>
          <div className="siis">
            <div className="content-siis-solar">
              <h3>Energia Solar</h3>
              <p>
                A energia solar converte a radiação solar em eletricidade através
                de painéis fotovoltaicos. É uma das fontes renováveis com maior
                potencial de crescimento, tanto em grandes usinas quanto em
                instalações residenciais e comerciais.
              </p>
              <div className="dados-siis-solar">
                <div className="dado-1">
                  <h4>% Global</h4>
                  <p>4%</p>
                </div>
                <div className="dado-2">
                  <h4>% no Brasil</h4>
                  <p>2,8%</p>
                </div>
                <div className="dado-3">
                  <h4>Usuários (Mundo)</h4>
                  <p>800 milhões</p>
                </div>
                <div className="dado-4">
                  <h4>Usuários (Brasil)</h4>
                  <p>15 milhões</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Energia Hidrelétrica */}
        <div className="siis-hidrico">
          <div className="img-siis-hidrico">
            <Image src={imageUrl3} alt="Imagem de uma usina hidrelétrica" width={1000} height={1000} />
          </div>
          <div className="siis">
            <div className="content-siis-hidrico">
              <h3>Hidrelétricas</h3>
              <p>
                As hidrelétricas geram energia a partir da força da água represada,
                geralmente em grandes barragens. Embora causam impactos ambientais,
                são a principal fonte de eletricidade no Brasil devido à alta capacidade
                de geração.
              </p>
              <div className="dados-siis-hidrico">
                <div className="dado-1">
                  <h4>% Global</h4>
                  <p>16%</p>
                </div>
                <div className="dado-2">
                  <h4>% no Brasil</h4>
                  <p>60%</p>
                </div>
                <div className="dado-3">
                  <h4>Usuários (Mundo)</h4>
                  <p>2 bilhões</p>
                </div>
                <div className="dado-4">
                  <h4>Usuários (Brasil)</h4>
                  <p>200 milhões</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section3;
