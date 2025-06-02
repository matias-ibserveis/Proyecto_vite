import { renderizaListaCesta } from "./crear_cesta_lista.js";


export async function productos_crear_cesta(appContenedor) {

  let currentPage = 1;
  const itemsPerPage = 6;
  let totalPages = 1;
  let productos = [];

  // 1. INTERFAZ INICIAL
 async function renderInicio() {
  appContenedor.innerHTML = `
    <div id="cesta-contenido" class="mt-4 p-3 border rounded bg-light">
      <h4>Creación de cesta</h4>
      <ul id="lista-cesta" class="list-group"></ul>
    </div>
    <h3 class="titulo"></br></br>Añadir a cesta</h3>
    <div class="mb-4" >
      <input type="text" id="busquedaInput" class="form-control" placeholder="Buscar productos ...">
      <button id="buscarBtn" class="btn btn-secondary mt-2">Buscar</button>
      <button id="todosBtn" class="btn btn-secondary mt-2 ms-2">ver todos</button>
    </div>
    <div class="row" id="productos-lista" style="margin-top:3rem"></div>
    <div id="paginacion" class="text-center my-3"></div>

  `;

  renderizaListaCesta(appContenedor);
}


  // 2. RENDERIZA UNA FICHA
  function crearFicha(producto) {
    const col = document.createElement("div");
    col.className = "col-12";

    const frases = producto.descripcion.split(/[.!?]\s/);
    const resumen = frases.slice(0, 2).join('. ') + '.';

    const idImg = producto.imagen1.split('/d/')[1]?.split('/')[0];
    const imageUrl = `https://drive.google.com/thumbnail?id=${idImg}&sz=w800-h600`;

    col.innerHTML = `
      <div class="card mb-4">
        <img src="${imageUrl}" class="card-img-top" alt="${producto.titulo}">
        <div class="card-body">
          <h5 class="card-title">${producto.titulo}</h5>
          <p class="card-text" id="desc-${producto.id}">
            ${resumen}
            <span class="ver_mas" data-id="${producto.id}">ver +</span>
          </p>
          <button class="btn btn-primary">añadir</button>
        </div>
      </div>
    `;

    col.querySelector("button").onclick = () => añadirACesta(producto);
    return col;
  }


  // 3. AÑADIR A CESTA
  function añadirACesta(producto) {
    const cesta = JSON.parse(localStorage.getItem("nuevaCesta") || "{}");

    cesta[producto.id] = cesta[producto.id] || {
      titulo: producto.titulo,
      precio: producto.precio,
      unidad_medido: producto.unidad_medido,
      cantidad: 0,
      imagen1: producto.imagen1,
      origen: "manual"
    };

    cesta[producto.id].cantidad += 1;

    localStorage.setItem("nuevaCesta", JSON.stringify(cesta));
    renderizaListaCesta(appContenedor);
    window.scrollTo({ top: 0, behavior: "smooth" });


  }


  // 4. RENDERIZA PÁGINA ACTUAL
  function mostrarPagina(lista, pagina) {
    const inicio = (pagina - 1) * itemsPerPage;
    const paginaItems = lista.slice(inicio, inicio + itemsPerPage);

    const contenedor = appContenedor.querySelector("#productos-lista");
    contenedor.innerHTML = "";
    paginaItems.forEach(p => contenedor.appendChild(crearFicha(p)));

    totalPages = Math.ceil(lista.length / itemsPerPage);
    renderFlechas(lista);
  }

  // 5. PAGINACIÓN
  function renderFlechas(lista) {
    const zona = appContenedor.querySelector("#paginacion");
    zona.innerHTML = `
      <button class="btn btn-outline-primary me-2" id="anterior" ${currentPage === 1 ? "disabled" : ""}>⬅ Anterior</button>
      <span>pág ${currentPage} de ${totalPages}</span>
      <button class="btn btn-outline-primary ms-2" id="siguiente" ${currentPage === totalPages ? "disabled" : ""}>Siguiente ➡</button>
    `;

    zona.querySelector("#anterior").onclick = () => {
      if (currentPage > 1) mostrarPagina(lista, --currentPage);
    };
    zona.querySelector("#siguiente").onclick = () => {
      if (currentPage < totalPages) mostrarPagina(lista, ++currentPage);
    };
  }


  // 6. CARGA DATOS
  async function cargarDatos() {
    try {
      const res = await fetch('https://proyectorailway-production-9739.up.railway.app/datos');
      productos = await res.json();
      currentPage = 1;
      mostrarPagina(productos, currentPage);
    } catch {
      appContenedor.innerHTML = `<p class="text-danger text-center">Error al cargar productos</p>`;
    }
  }

  // 7. BUSCAR
  async function buscarProductos(consulta) {
    try {
      const res = await fetch('https://proyectorailway-production-9739.up.railway.app/buscar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ consulta })
      });
      const resultados = await res.json();
      currentPage = 1;
      mostrarPagina(resultados, currentPage);
    } catch {
      appContenedor.querySelector("#productos-lista").innerHTML = `<p class="text-danger">Error al buscar productos</p>`;
    }
  }

  // 8. EVENTOS
  function configurarEventos() {
    const input = appContenedor.querySelector("#busquedaInput");
    const btnBuscar = appContenedor.querySelector("#buscarBtn");
    const btnTodos = appContenedor.querySelector("#todosBtn");

    btnBuscar.onclick = () => {
      const consulta = input.value.trim();
      if (consulta) buscarProductos(consulta);
    };

    btnTodos.onclick = () => {
      input.value = "";
      mostrarPagina(productos, currentPage = 1);
    };
  }

  // 9. ESTILOS
  function insertarEstilos() {
    const style = document.createElement("style");
    style.innerHTML = `
      body {
        padding: 1rem;
        background-color: #f9f9f9;
      }

      .card {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        margin-bottom: 1rem;
        border: 1px solid #ddd;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      }

      .card-img-top {
        width: 40%;
        max-width: 150px;
        height: auto;
        object-fit: cover;
      }

      .card-body {
        flex: 1;
        padding: 0.5rem 1rem;
      }

      @media (min-width: 768px) {
        .card { flex-direction: column; }
        .card-img-top { width: 100%; height: 200px; }
        .card-body { padding: 1rem; }
      }

      .ver_mas {
        color: var(--secondary-color);
        cursor: pointer;
        font-weight: 500;
        text-decoration: underline;
      }
    `;
    document.head.appendChild(style);
  }

  // EJECUCIÓN
  insertarEstilos();
  renderInicio();
  configurarEventos();
  await cargarDatos();
}
