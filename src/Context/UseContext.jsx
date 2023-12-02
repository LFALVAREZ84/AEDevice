//UseContext.jsx
import { useContext } from "react";
import { ProductContext } from "./ProductContext";

const ProductDetails = () => {
  const { product } = useContext(ProductContext);

  // Manejar el caso en el que product es null
  if (!product) {
    return <div>No hay detalles disponibles.</div>;
  }

  return (
    <div>
      <h1>Detalles del producto</h1>
      <img src={product.image} alt={product.name} />
      <h3>Nombre: {product.name}</h3>
      <h3>Precio: {product.price}</h3>
    </div>
  );
};

// Agregar validación de tipos utilizando PropTypes si es necesario
ProductDetails.propTypes = {};

export default ProductDetails;
