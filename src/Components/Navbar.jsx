import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { authenticated, currentUser, logout } = useAuth();
  const navigate = useNavigate(); // Obtén la función de navegación desde react-router-dom

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirige a la página de inicio después de cerrar sesión
  };

  

  return (
    <nav className="navbar fixed-top">
      <div className="letras">
        <Link to="/" className="letrasnavbar">
          INICIO
        </Link>
      </div>
      {authenticated ? (
        <div className="letras">
          <p>Bienvenido, {currentUser.name}!</p>
          <button onClick={handleLogout} className="letrasnavbar">
            CERRAR SESIÓN
          </button>
        </div>
      ) : (
        <>
          <div className="letras">
            <Link to="/login" className="letrasnavbar">
              INICIAR SESIÓN
            </Link>
          </div>
          <div className="letras">
            <Link to="/register" className="letrasnavbar">
              REGISTRO
            </Link>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
