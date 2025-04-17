export async function Productos() {
  const productos = document.createElement("section");
  productos.className = "container py-5";
  productos.id = "productos";

  productos.innerHTML = `
    <h2 class="text-center">Nuestros Productos</h2>
    <div class="mb-4">
      <input type="text" id="busquedaInput" class="form-control" placeholder="Buscar productos con IA...">
      <button id="buscarBtn" class="btn btn-primary mt-2">Buscar</button>
    </div>
    <div class="row" id="productos-lista"></div>
  `;

  const contenedor = productos.querySelector("#productos-lista");

  // Función para renderizar productos
  const renderizarProductos = (lista) => {
    contenedor.innerHTML = ""; // limpiar
    lista.forEach(producto => {
      const col = document.createElement("div");
      col.className = "col-md-4";

      col.innerHTML = `
        <div class="card mb-4">
          <img src="${producto.imagen1}" class="card-img-top" alt="${producto.titulo}">
          <div class="card-body">
              <h5 class="card-title">${producto.titulo}</h5>
              <p class="card-text">${producto.descripcion}</p>
              <button class="btn btn-success" onclick="addToCart('${producto.id}')">a la cesta!</button>
          </div>
        </div>
      `;
      contenedor.appendChild(col);
    });
  };

  try {
    const res = await fetch('http://localhost:3000/datos');
    const data = await res.json();

    // Ordenar por fecha (más reciente primero)
    const productosOrdenados = data.sort((a, b) => {
      const fechaA = new Date(a.fecha.split("/").reverse().join("-"));
      const fechaB = new Date(b.fecha.split("/").reverse().join("-"));
      return fechaB - fechaA;
    });

    // Mostrar los primeros 6
    const productosRecientes = productosOrdenados.slice(0, 6);
    renderizarProductos(productosRecientes);

    // Evento de búsqueda
    const buscarBtn = productos.querySelector("#buscarBtn");
    buscarBtn.addEventListener("click", async () => {
      const consulta = productos.querySelector("#busquedaInput").value.trim();
      if (!consulta) return;

      try {
        const resp = await fetch('http://localhost:3000/buscar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ consulta })
        });

        const resultados = await resp.json();
        renderizarProductos(resultados);

      } catch (err) {
        console.error("Error en búsqueda:", err);
        contenedor.innerHTML = `<p class="text-danger">Error al buscar productos</p>`;
      }
    });

  } catch (error) {
    productos.innerHTML += `<p class="text-danger text-center">Error al cargar productos</p>`;
    console.error("Error cargando productos:", error);
  }

  // Estilos
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
