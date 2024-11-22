import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useAuth } from "../contexts/AuthContext";

const Cadastro = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const { setIsLoggedIn } = useAuth();

  const validateName = (name: string) => /^[a-zA-Z\s]{1,40}$/.test(name);
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nameError = validateName(name) ? "" : "O nome deve conter apenas letras e ter no máximo 40 caracteres.";
    const emailError = validateEmail(email) ? "" : "Email inválido.";
    const passwordError = validatePassword(password)
      ? ""
      : "A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, um número e um caractere especial.";
    const confirmPasswordError =
      password === confirmPassword ? "" : "As senhas não correspondem.";

    setErrors({
      name: nameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });

    if (!nameError && !emailError && !passwordError && !confirmPasswordError) {
      const body = {
        nome: name,
        email,
        senha: password,
      };

      fetch("http://localhost:8080/JavaGs/webapi/usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => {
          if (response.ok) {
            localStorage.setItem("isLoggedIn", "true");
            setIsLoggedIn(true);
            router.push("/");
          } else {
            return response.text().then((errorText) => {
              try {
                const errorData = JSON.parse(errorText);
                alert(`Erro ao cadastrar: ${errorData.message || errorText}`);
              } catch {
                alert(`Erro ao cadastrar: ${errorText}`);
              }
            });
          }
        })
        .catch((error) => {
          console.error("Erro de conexão com o servidor:", error);
          alert("Erro ao conectar com o servidor.");
        });
    }
  };

  return (
    <div className="login-container">
      <div className="logo-lc">
        <Image src="/images/logo.png" alt="Logo" width={50} height={50} />
        GreenVolt
      </div>
      <form onSubmit={handleSubmit} className="login-form">
       
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={errors.name ? "error-input" : ""}
            placeholder="Digite seu nome"
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>

      
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? "error-input" : ""}
            placeholder="Digite seu email"
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

       
        <div className="form-group">
          <label htmlFor="senha">Senha</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? "error-input" : ""}
              placeholder="Digite sua senha"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="toggle-password"
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

      
        <div className="form-group">
          <label htmlFor="confirmsenha">Confirmar Senha</label>
          <div className="password-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={errors.confirmPassword ? "error-input" : ""}
              placeholder="Confirme sua senha"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="toggle-password"
              aria-label={showConfirmPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showConfirmPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="error-message">{errors.confirmPassword}</p>
          )}
        </div>

        <button type="submit" className="submit-button">
          Cadastrar
        </button>

        <button
          type="button"
          className="secondary-button"
          onClick={() => router.push("/login")}
        >
          Voltar
        </button>
      </form>
    </div>
  );
};

export default Cadastro;
