import { useState } from "react";
import './Register.css';
import { Link } from 'react-router-dom';
import usersData from '../data/users';

const Register = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validar la entrada antes de enviarla al servidor
      if (!name || !surname || !email || !password) {
        throw new Error("Por favor, complete todos los campos.");
      }

      // Verificar si el correo electrónico ya está registrado
      const existingUser = usersData.find(user => user.email === email);
      if (existingUser) {
        throw new Error("Este correo electrónico ya está registrado.");
      }

      // Agregar el nuevo usuario al archivo JSON
      const newUser = {
        id: usersData.length + 1,
        name,
        surname,
        email,
        password,
      };
      usersData.push(newUser);

      // Mostrar mensaje de éxito
      setSuccessMessage("Registro exitoso. Ahora puedes iniciar sesión.");

      // Limpiar los campos del formulario después de un registro exitoso
      setName("");
      setSurname("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setError(error.message || "Error en el registro.");
    }
  };

  return (
    <div>
      <h1>Registro</h1>
      {successMessage ? (
        <p style={{ color: "green" }}>{successMessage}</p>
      ) : (
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Apellido"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
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
          />
          <button type="submit">Registrar</button>
        </form>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>.</p>
    </div>
  );
};

export default Register;


