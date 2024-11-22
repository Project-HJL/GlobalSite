import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

const imageUrl4 = '/images/logo.png';

const Footer: React.FC = () => {
  const { isLoggedIn } = useAuth(); // Obtemos o estado de autenticação do contexto

  return (
    <footer>
      <div className="footer-padding">
        <div id="logo">
          <Image src={imageUrl4} alt="logo-de-um-raio" width={40} height={40}/>
          <a href="">GreenVolt</a>
        </div>
        <div className="contact">
          <h3>Contatos</h3>
          <div className="contact-contact">
            <div className="contact-1">
              <Image
                src="/images/email.svg"
                alt="simbolo-de-uma-carta"
                className="footer-image"
                width={40}
                height={40}
              />
              <p>exemplo@gmail.com</p>
            </div>
            <div className="contact-2">
              <Image
                src="/images/telephone.svg"
                alt="simbolo-de-um-telefone"
                className="footer-image"
                width={40}
                height={40}
              />
              <p>+55 11 987654321</p>
            </div>
          </div>
        </div>
        <div className="social-medias">
          <h3>Redes Sociais</h3>
          <div className="social-medias-icons">
            <a href="">
              <Image
                src="/images/twitter.svg"
                alt="logo-do-twitter"
                className="footer-image"
                width={50}
                height={50}
              />
            </a>
            <a href="">
              <Image
                src="/images/instagram.svg"
                alt="logo-do-instagram"
                className="footer-image"
                width={50}
                height={50}
              />
            </a>
            <a href="">
              <Image
                src="/images/youtube.svg"
                alt="logo-do-youtube"
                className="footer-image"
                width={50}
                height={50}
              />
            </a>
          </div>
        </div>
        <div className="quick-links">
          <h3>Links</h3>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href={isLoggedIn ? '/mapa' : '/login'}>Mapa</Link>
            </li>
            <li>
              <Link href={isLoggedIn ? '/calculadora' : '/login'}>Simulador</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bar">
        <p>© 2024 GreenVolt. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
