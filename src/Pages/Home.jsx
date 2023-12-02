import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';



const Home = () => {
  const [products, setProducts] = useState([]); // Declare state variable

  const loadProducts = async () => {
    try {
      const response = await fetch('/src/data/products.json');
      const data = await response.json();
      setProducts(data); // Update state with loaded products
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  useEffect(() => {
    loadProducts(); // Load products in useEffect hook
  }, []);

  return (
    <div>
      <h1>Inicio</h1>
      <ul>
        {products &&
          products.map((product) => (
            <li key={product.id}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>Precio: ${product.price}</p>
              {/* Use Link to navigate to product details page */}
              <Link to={`/product/${product.id}`}>
                <button>Ver detalles</button>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Home;

