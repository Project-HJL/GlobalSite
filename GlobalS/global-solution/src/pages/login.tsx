import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { setIsLoggedIn } = useAuth();

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const emailError = validateEmail(email) ? '' : 'Email inválido.';
    const passwordError = validatePassword(password)
      ? ''
      : 'A senha deve conter ao menos 8 caracteres, uma letra maiúscula, um número e um caractere especial.';
  
    setErrors({ email: emailError, password: passwordError });
  
    if (!emailError && !passwordError) {
      try {
        const response = await fetch('http://localhost:8080/JavaGs/webapi/usuario/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, senha: password }),
        });

        if (response.ok) {
          localStorage.setItem('isLoggedIn', 'true');
          setIsLoggedIn(true);
          router.push('/');
        } else {
          const errorText = await response.text();
          try {
            const errorData = JSON.parse(errorText);
            window.alert(errorData.message || 'Erro ao realizar o login. Tente novamente.');
          } catch {
            window.alert(`Erro ao realizar o login: ${errorText}`);
          }
        }
      } catch (error) {
        console.error('Erro de conexão com o servidor:', error);
        window.alert('Erro ao conectar com o servidor.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="logo-lc">
        <Image src="/images/logo.png" alt="Logo" width={50} height={50} />
        <span>GreenVolt</span>
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? 'error-input' : ''}
            placeholder="Digite seu email"
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        {/* Senha */}
        <div className="form-group">
          <label htmlFor="senha">Senha</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? 'error-input' : ''}
              placeholder="Digite sua senha"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="toggle-password"
              aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

        <button type="submit" className="submit-button">
          Login
        </button>

        <button
          type="button"
          className="secondary-button"
          onClick={() => router.push('/')}
        >
          Voltar
        </button>

        <p className="register-link">
          Não tem uma conta?{' '}
          <Link href="/cadastro" className="register-link-text">
            Cadastre-se aqui!
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
