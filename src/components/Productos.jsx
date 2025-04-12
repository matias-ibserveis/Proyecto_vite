import { useEffect, useState } from 'react';
import './productos.css'; 

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProductos() {
      try {
        const response = await fetch('/data/datos_productos.json');
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error('Error cargando productos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProductos();
  }, []);

  const addToCart = (id) => {
    console.log(`Producto con ID ${id} agregado al carrito.`);
    // Aquí podrías integrar lógica de carrito con estado, contexto, etc.
  };

  if (loading) {
    return <p className="text-center py-5">Cargando productos...</p>;
  }

  return (
    <section className="container py-5" id="productos">
      <h2 className="text-center">Nuestros Productos</h2>
      <div className="row">
        {productos.map((producto) => (
          <div className="col-md-4 mb-4" key={producto.id}>
            <div className="card h-100">
              <img src={producto.imagen} className="card-img-top" alt={producto.nombre} />
              <div className="card-body">
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text">{producto.descripcion}</p>
                <button className="btn btn-success" onClick={() => addToCart(producto.id)}>
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
