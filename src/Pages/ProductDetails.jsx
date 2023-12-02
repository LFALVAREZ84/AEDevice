import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../Context/AuthContext';

const ProductDetails = () => {
  const { id } = useParams();
  const productId = parseInt(id, 10);

  const [product, setProduct] = useState(null);
  const { authenticated } = useAuth(); // Obtén el estado de autenticación desde el contexto

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/src/data/products.json');
        const data = await response.json();
        const productDetails = data.find((product) => product.id === productId);
        setProduct(productDetails);
      } catch (error) {
        console.error('Error al obtener los detalles del producto:', error);
      }
    };

    fetchData();
  }, [productId]);

  if (!product) {
    return <div>Cargando detalles del producto...</div>;
  }

  const handleBuyClick = () => {
    // Verifica si el usuario está autenticado antes de mostrar el cuadro de diálogo de compra
    if (authenticated) {
      Swal.fire({
        title: '¿Seguro que desea comprar este producto?',
        text: '¡No podrá revertir esta acción!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, ¡comprar!',
        cancelButtonText: 'No, cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: '¡Compra confirmada!',
            text: '¡Tu compra fue realizada exitosamente!',
            icon: 'success',
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            title: '¡Compra cancelada!',
            text: '¡Tu compra ha sido cancelada!',
            icon: 'error',
          });
        }
      });
    } else {
      // Muestra un mensaje si el usuario no está autenticado
      Swal.fire({
        title: 'Iniciar sesión requerido',
        text: 'Debes iniciar sesión para realizar una compra.',
        icon: 'info',
      });
    }
  };

  return (
    <div>
      <h1>Detalles del producto</h1>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} />
      <p>Precio: ${product.price}</p>
      <p>Descripción: {product.description}</p>
      <button onClick={handleBuyClick}>Comprar</button>
    </div>
  );
};

export default ProductDetails;
