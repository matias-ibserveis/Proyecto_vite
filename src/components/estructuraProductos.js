// estructuraProductos.js

export function crearEstructuraHTML(buscarProductosCallback, mostrarTodosCallback) {
  const seccion = document.createElement("section");
  seccion.className = "container py-5";
  seccion.id = "productos";
  seccion.innerHTML = `
    <h2 class="titulo">Nuestros Productos</h2>
    <div class="mb-4" style="padding-left:1rem">
      <input type="text" id="busquedaInput" class="form-control" placeholder="Buscar productos ...">
      <button id="buscarBtn" class="btn btn-primary mt-2">Buscar</button>
      <button id="todosBtn" class="btn btn-secondary mt-2 ms-2">ver todos</button>
    </div>
    <div class="row" id="productos-lista"></div>
    <div id="paginacion" class="text-center my-3"></div>
  `;

  const buscarBtn = seccion.querySelector("#buscarBtn");
  const todosBtn = seccion.querySelector("#todosBtn");

  buscarBtn.addEventListener("click", buscarProductosCallback);
  todosBtn.addEventListener("click", mostrarTodosCallback);

  return seccion;
}

export function aplicarEstilos() {
  const style = document.createElement("style");
  style.innerHTML = `
    .card-img-top {
      height: 200px;
      object-fit: cover;
      border-radius: 8px;
    }
    .card-body {
      padding: .5rem;
      text-align:left;
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
    .ver_mas {
      color: var(--secondary-color); 
      text-decoration: underline;
      cursor: pointer;
      font-size: 1.1rem; 
      font-weight: 500;
      font-family: inherit;
    }
    .container {
      max-width: 1280px;
      margin: 1rem 0;
    }
  `;
  document.head.appendChild(style);
}
