// Checkout.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../Context/ProductContext';

const Checkout = () => {
  const { product } = useContext(ProductContext);

  if (!product) {
    return <div>No hay productos en el carrito.</div>;
  }

  const handleConfirmPurchase = () => {
    alert('Gracias por su compra');
    // Aquí puedes agregar la lógica adicional para procesar la compra
  };

  return (
    <div>
      <h1>Checkout</h1>
      <h3>Detalles del producto:</h3>
      <p>Nombre: {product.name}</p>
      <p>Descripción: {product.description}</p>
      <p>Precio: ${product.price}</p>
      <p>SKU: {product.sku}</p>
      <h3>Precio final de compra: ${product.price}</h3>
      <button onClick={handleConfirmPurchase}>Confirmar Compra</button>
      <Link to={`/product/${product.id}`}>
        <button>Cancelar</button>
      </Link>
    </div>
  );
};

export default Checkout;



