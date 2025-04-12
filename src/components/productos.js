export async function Productos() {
  const productos = document.createElement("section");
  productos.className = "container py-5";
  productos.id = "productos";

  productos.innerHTML = `<h2 class="text-center">Nuestros Productos</h2><div class="row" id="productos-lista"></div>`;

  try {
    const res = await fetch('/data/datos_productos.json')
    const data = await res.json();

    const contenedor = productos.querySelector("#productos-lista");

    data.forEach(producto => {
      const col = document.createElement("div");
      col.className = "col-md-4";

      col.innerHTML = `
        <div class="card mb-4">
          <img src="${producto.imagen}" class="card-img-top" alt="${producto.titulo}">
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

  return productos;
}
