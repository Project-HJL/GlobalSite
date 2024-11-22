import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth(); 
  const router = useRouter();

  
  useEffect(() => {
    const handleRouteChange = () => setMenuOpen(false);
    router.events.on('routeChangeStart', handleRouteChange);
    return () => router.events.off('routeChangeStart', handleRouteChange);
  }, [router.events]);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout(); 
    router.push('/'); 
  };

  return (
    <header>
      <nav>
       
        <div className="mobile-menu-icon">
          <button onClick={toggleMenu}>☰</button>
        </div>

        <div className="logo">
          <Link href="/">
            <Image src="/images/logo.png" alt="Logo" width={50} height={50} />
            GreenVolt
          </Link>
        </div>

      
        <div className="links">
          <ul>
            <li><Link href="/" className="hover1">Home</Link></li>

           
            <li>
              <Link href={isLoggedIn ? '/mapa' : '/login'} className="hover1">
                Mapa
              </Link>
            </li>
            <li>
              <Link href={isLoggedIn ? '/calculadora' : '/login'} className="hover1">
                Simulador
              </Link>
            </li>

           
            {!isLoggedIn ? (
              <li className="links1">
                <button onClick={() => router.push('/login')}>
                  Entrar
                </button>
              </li>
            ) : (
              <li className="links1">
                <button onClick={handleLogout}>
                  Sair
                </button>
              </li>
            )}
          </ul>
        </div>

    
        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          <button className="close-menu" onClick={toggleMenu}>✖</button>
          <ul>
            <li><Link href="/">Home</Link></li>

        
            <li>
              <Link href={isLoggedIn ? '/mapa' : '/login'}>
                Mapa
              </Link>
            </li>
            <li>
              <Link href={isLoggedIn ? '/calculadora' : '/login'}>
                Simulador
              </Link>
            </li>


            {!isLoggedIn ? (
              <li className='links1'>
                <button onClick={() => router.push('/login')}>Entrar</button>
              </li>
            ) : (
              <li className='links1'>
                <button onClick={handleLogout}>Sair</button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
