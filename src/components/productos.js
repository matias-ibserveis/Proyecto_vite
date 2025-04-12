export async function Productos() {
  const productos = document.createElement("section");
  productos.className = "container py-5";
  productos.id = "productos";

  productos.innerHTML = `<h2 class="text-center">Nuestros Productos</h2><div class="row" id="productos-lista"></div>`;

  try {
    const res = await fetch('/data/datos_productos.json');
    const data = await res.json();

    // Ordenar los productos por fecha (más reciente primero)
    const productosOrdenados = data.sort((a, b) => {
      const fechaA = new Date(a.fecha.split("/").reverse().join("-"));
      const fechaB = new Date(b.fecha.split("/").reverse().join("-"));
      return fechaB - fechaA; // Ordena de más reciente a más antiguo
    });

    // Seleccionar solo los 6 primeros productos
    const productosRecientes = productosOrdenados.slice(0, 6);

    const contenedor = productos.querySelector("#productos-lista");

    productosRecientes.forEach(producto => {
      const col = document.createElement("div");
      col.className = "col-md-4";

      col.innerHTML = `
        <div class="card mb-4">
          <img src="${producto.imagenes[0]}" class="card-img-top" alt="${producto.titulo}">
          <div class="card-body">
              <h5 class="card-title">${producto.titulo}</h5>
              <p class="card-text">${producto.descripcion}</p>
              <button class="btn btn-success" onclick="addToCart('${producto.id}')">Agregar al carrito</button>
          </div>
        </div>
      `;

      contenedor.appendChild(col);
    });

  } catch (error) {
    productos.innerHTML += `<p class="text-danger text-center">Error al cargar productos</p>`;
    console.error("Error cargando productos:", error);
  }

  // Crear y añadir los estilos al head del documento
  const style = document.createElement("style");
  style.innerHTML = `
      .card-img-top {
        height: 200px;
        object-fit: cover;
        border-radius: 8px;
      }
      .card-body {
        padding: 1.5rem;
      }
      .card-title {
        font-size: 1.2rem;
        font-weight: bold;
      }
      .card-text {
        font-size: 1rem;
        color: #6c757d;
      }
      .btn-success {
        width: 100%;
        font-size: 1.1rem;
      }
      .container {
        max-width: 1200px;
      }
    `;
  document.head.appendChild(style);



  return productos;
}
