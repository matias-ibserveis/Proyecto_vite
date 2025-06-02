import { crearModalIA, mostrarRespuestaIA } from "./iaModal.js";

export async function Productos() {
  crearModalIA();
  const productos = crearEstructuraHTML();
  const contenedor = productos.querySelector("#productos-lista");
  const buscarBtn = productos.querySelector("#buscarBtn");
  const todosBtn = productos.querySelector("#todosBtn");

  let currentPage = 1;
  const itemsPerPage = 10;
  let totalPages = 1;
  let dataOriginal = [];

  function crearEstructuraHTML() {
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

    buscarBtn.addEventListener("click", buscarProductos);
    todosBtn.addEventListener("click", () => {
      currentPage = 1;
      paginar(dataOriginal, currentPage);
      seccion.querySelector("#busquedaInput").value = "";
    });

    return seccion;
  }


  function renderizarProducto(producto) {
    const col = document.createElement("div");
    col.className = "col-md-4";

    const frases = producto.descripcion.split(/[.!?]\s/);
    const resumen = frases.slice(0, 2).join('. ') + '.';
    const imageId = producto.imagen1.split('/d/')[1]?.split('/')[0];
    const imageUrl = `https://drive.google.com/thumbnail?id=${imageId}&sz=w800-h600`;

    col.innerHTML = `
      <div class="card mb-4">
        <img src="${imageUrl}" class="card-img-top" alt="${producto.titulo}">
        <div class="card-body">
            <h5 class="card-title">${producto.titulo}</h5>
            <p class="card-text">
              ${resumen}
              <span class="ver_mas" data-id="${producto.id}">ver +</span>
            </p>
            <button class="btn btn-secondary mt-2 btn-ia" data-id="${producto.id}">+información IA</button>
            <button class="btn btn-secondary mt-2 btn-a-cesta" data-id="${producto.id}">a la cesta</button>
        </div>
      </div>
    `;
    configurarEventosProducto(col, producto);
    contenedor.appendChild(col);
  }


  function configurarEventosProducto(col, producto) {
    col.querySelector(".btn-a-cesta").onclick = () => irACestaConProducto(producto.id);
    col.querySelector(".ver_mas").onclick = () => irAsoloProducto(producto.id);

    const botonIA = col.querySelector(".btn-ia");
    botonIA.onclick = async () => {
      botonIA.textContent = "Espera un momento";
      botonIA.classList.replace("btn-secondary", "btn-warning");
      botonIA.classList.add("text-dark");

      await mostrarRespuestaIA(producto);

      botonIA.textContent = "+información IA";
      botonIA.classList.replace("btn-warning", "btn-secondary");
      botonIA.classList.remove("text-dark");
    };
  }



  function guardarScrollY() {
    sessionStorage.setItem("prevScrollY", window.scrollY);
    sessionStorage.setItem("prevURL", window.location.href);
  }

  function irACestaConProducto(id) {
    guardarScrollY();
    window.location.href = `/cesta_cliente.html?id=${id}`;
  }

  function irAsoloProducto(id) {
    guardarScrollY();
    window.location.href = `/producto.html?id=${id}`;
  }


  function renderizarProductos(lista) {
    contenedor.innerHTML = "";
    lista.forEach(renderizarProducto);
  }


  function paginar(lista, pagina) {
    totalPages = Math.ceil(lista.length / itemsPerPage);
    const inicio = (pagina - 1) * itemsPerPage;
    const fin = inicio + itemsPerPage;
    renderizarProductos(lista.slice(inicio, fin));
    renderizarControlesPaginacion(lista);
  }

  function renderizarControlesPaginacion(lista) {
    const paginacion = productos.querySelector("#paginacion");
    paginacion.innerHTML = `
      <button class="btn btn-outline-primary me-2" id="anterior" ${currentPage === 1 ? "disabled" : ""}>⬅ Anterior</button>
      <span>pág ${currentPage} de ${totalPages}</span>
      <button class="btn btn-outline-primary ms-2" id="siguiente" ${currentPage === totalPages ? "disabled" : ""}>Siguiente ➡</button>
    `;

   
  const scrollToTitulo = () => {
    const titulo = document.querySelector(".titulo");
    titulo ? titulo.scrollIntoView({ behavior: "smooth", block: "start" }) : false
  };

  paginacion.querySelector("#anterior").onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      paginar(lista, currentPage);
      scrollToTitulo();
    }
  };

  paginacion.querySelector("#siguiente").onclick = () => {
    if (currentPage < totalPages) {
      currentPage++;
      paginar(lista, currentPage);
      scrollToTitulo();
    }
  };
  }


  async function cargarProductosIniciales() {
    toggleBotones(true);
    try {
      const res = await fetch('https://proyectorailway-production-9739.up.railway.app/datos');
      dataOriginal = await res.json();
      currentPage = 1;
      paginar(dataOriginal, currentPage);
    } catch (error) {
      contenedor.innerHTML = `<p class="text-danger text-center">Error al cargar productos</p>`;
      console.error("Error cargando productos:", error);
    } finally {
      toggleBotones(false);
    }
  }


  async function buscarProductos() {
    const consulta = productos.querySelector("#busquedaInput").value.trim();
    if (!consulta) return;

    toggleBotones(true);
    try {
      const resp = await fetch('https://proyectorailway-production-9739.up.railway.app/buscar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ consulta })
      });

      const resultados = await resp.json();
      currentPage = 1;
      paginar(resultados, currentPage);
    } catch (err) {
      contenedor.innerHTML = `<p class="text-danger">Error al buscar productos</p>`;
      console.error("Error en búsqueda:", err);
    } finally {
      toggleBotones(false);
    }
  }


  function toggleBotones(desactivar) {
    buscarBtn.disabled = desactivar;
    todosBtn.disabled = desactivar;
  }

  function scrollToPreviousPosition() {
    const prevY = parseInt(sessionStorage.getItem("prevScrollY"), 10);
    if (isNaN(prevY)) return;
    function tryScroll() {
      if (document.body.scrollHeight > prevY + window.innerHeight) {
        window.scrollTo({ top: prevY, behavior: "smooth" });
      } else {
        requestAnimationFrame(tryScroll);
      }
    }
    requestAnimationFrame(tryScroll);
  }


  function aplicarEstilos() {
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


  // PROgrama Principal
  await cargarProductosIniciales();
  scrollToPreviousPosition();
  aplicarEstilos();

  return productos;
}
