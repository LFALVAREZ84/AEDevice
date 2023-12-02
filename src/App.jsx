// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import ProductDetails from './Pages/ProductDetails';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Checkout from './Pages/Checkout';
import ProductProvider from './Context/ProductProvider';
import Navbar from './Components/Navbar';
import './App.css';
import { AuthProvider } from './Context/AuthContext';

const App = () => {
  const isAuthenticated = false; // Agrega lógica de autenticación según tus necesidades

  return (
    <AuthProvider>
      <BrowserRouter>
        <>
          <Navbar />
          <ProductProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/product/:id"
                element={
                  <ProductDetails authenticated={isAuthenticated} />
                }
              />
              <Route path="/register" element={<Register />} />
              <Route
                path="/login"
                element={isAuthenticated ? <Navigate to="/" /> : <Login />}
              />
              <Route
                path="/checkout/:productId"
                element={
                  isAuthenticated ? <Checkout /> : <Navigate to="/login" />
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </ProductProvider>
        </>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
