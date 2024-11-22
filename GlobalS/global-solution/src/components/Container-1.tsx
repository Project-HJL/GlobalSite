import Image from 'next/image';

const Section: React.FC = () => {
  const imageUrl4 = '/images/logo.png';
  return (
      <section>
        <div className="video-background">
          <video autoPlay muted loop id="background-video">
            <source src="images/1080p 16.9.mp4" type="video/mp4" />
            Seu navegador não suporta vídeos HTML5.
          </video>
        </div>
        <div className="filter">
          <div className="icon"><Image src={imageUrl4} alt="logo-de-um-raio"  width={100} height={100}/><p>GreenVolt</p></div>
        </div>
      </section>
  );
};

export default Section;
