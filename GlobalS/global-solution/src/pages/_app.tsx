// pages/_app.tsx
import { AppProps } from 'next/app';  // Tipo para as propriedades do App
import Navbar from '../components/Navbar';  // Importando o Navbar
import Footer from '../components/Footer';  // Importando o Footer
import '../styles/style.css';
import { AuthProvider } from '../contexts/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    
    <AuthProvider>
      <div>
        <Navbar />  {/* Navbar será exibido em todas as páginas */}
        <Component {...pageProps} />  {/* O conteúdo de cada página será renderizado aqui */}
        <Footer />  {/* Footer será exibido em todas as páginas */}
      </div>
    </AuthProvider>

  );
}

export default MyApp;
