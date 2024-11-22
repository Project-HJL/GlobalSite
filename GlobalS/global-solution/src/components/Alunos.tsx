import Image from 'next/image';
const imageUrl1 = '/images/joao.jpg';
const imageUrl2 = '/images/hassan.jpg';
const imageUrl3 = '/images/luccas.jpg';

const Alunos: React.FC = () => {
    const cardData = [
        {
            imgSrc: imageUrl2 ,
            name: 'Hassan Chahine',
            rm: '556715',
            desc: 'ADS',
            githubLink: 'https://github.com/Dskaaf',
            linkedinLink: 'https://www.linkedin.com/in/hassan-chahine-2b60ba245/',
        },
        {
            imgSrc: imageUrl1,
            name: 'João Victor dos Santos Barbosa',
            rm: '555446',
            desc: 'ADS',
            githubLink: 'https://github.com/joaovictorsbade',
            linkedinLink: 'https://www.linkedin.com/in/jo%C3%A3o-victor-santos-barbosa-514011286/',
        },
        {
            imgSrc: imageUrl3,
            name: 'Luccas de Alencar Rufino',
            rm: '558253',
            desc: 'ADS',
            githubLink: 'https://github.com/LuccasAlencar',
            linkedinLink: 'https://www.linkedin.com/in/luccas-alencar-38093a25b/',
        },
    ];

    return (
        <div className="container-4">
            <div className="title-4">
                    <h2>Desenvolvedores </h2>
                </div>
            <div className="grupo">
            
                <div className="container-4-inside">
                    {cardData.map((card, index) => (
                        <div key={index} className="card">
                            <Image src={card.imgSrc} alt={`perfil de ${card.name}`} className="profile-img" width={150} height={150} />
                            <div className="dados-grupo">
                                <h1 className="name">{card.name}</h1>
                                <h3 className="desc">
                                    Estudante FIAP - 
                                    {card.desc}
                                    <br />
                                    RM {card.rm}
                                    
                                </h3>
                                <div className="social">
                                    <a href={card.githubLink} target="_blank" rel="noopener noreferrer">GitHub  |</a>
                                    <a href={card.linkedinLink} target="_blank" rel="noopener noreferrer"> Linkedin</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Alunos;
