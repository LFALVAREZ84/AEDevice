import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const login = (user) => {
    console.log('Usuario autenticado:', user);
    setAuthenticated(true);
    setCurrentUser(user);
  };

  const logout = () => {
    setAuthenticated(false);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ authenticated, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log('Contexto de autenticación en useAuth:', context);
  return context;
};

