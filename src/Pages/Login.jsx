import React, { useState } from "react";
import users from "../data/users"; // Importa el archivo JSON
import { useAuth } from "../Context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!email || !password) {
        throw new Error(
          "Por favor, ingrese su correo electrónico y contraseña."
        );
      }

      // Verifica las credenciales en el archivo JSON
      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        // Inicio de sesión exitoso
        login(user); // Actualiza el contexto de autenticación
      } else {
        setError(
          "Credenciales incorrectas. Por favor, vuelva a intentarlo."
        );
      }
    } catch (error) {
      setError(error.message || "Error en el inicio de sesión.");
    }
  };

  return (
    <div>
      <h1>Iniciar sesión</h1>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <button className="btn" type="submit">
          Iniciar sesión
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        ¿No tienes una cuenta? <a href="/register">Regístrate aquí</a>.
      </p>
    </div>
  );
};

export default Login;
