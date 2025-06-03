import { crearModalIA, mostrarRespuestaIA } from "./iaModal.js";
import { crearEstructuraHTML, aplicarEstilos } from './estructuraProductos.js';


export async function Productos() {
  crearModalIA();

  // Variables de estado
  let currentPage = 1;
  const itemsPerPage = 10;
  let totalPages = 1;
  let dataOriginal = [];

  // Crear estructura HTML
  const productos = crearEstructuraHTML(buscarProductos, () => {
    currentPage = 1;
    paginar(dataOriginal, currentPage);
    productos.querySelector("#busquedaInput").value = "";
  });
  const contenedor = productos.querySelector("#productos-lista");
  const buscarBtn = productos.querySelector("#buscarBtn");
  const todosBtn = productos.querySelector("#todosBtn");

  // Función principal: cargar al inicio
  await cargarProductosIniciales();
  restaurarScrollPrevio();
  aplicarEstilos();

  return productos;


  // ==========================
  // Renderizado de productos
  // ==========================

  function renderizarProducto(producto) {
    const col = document.createElement("div");
    col.className = "col-md-4";

    const resumen = producto.descripcion.split(/[.!?]\s/).slice(0, 2).join('. ') + '.';
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

  function renderizarProductos(lista) {
    contenedor.innerHTML = "";
    lista.forEach(renderizarProducto);
  }

  // ==========================
  // Paginación
  // ==========================

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
      document.querySelector(".titulo")?.scrollIntoView({ behavior: "smooth", block: "start" });
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

  // ==========================
  // Eventos de producto
  // ==========================

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

  // ==========================
  // Navegación con scroll
  // ==========================

  function guardarScrollY() {
    sessionStorage.setItem("prevScrollY", window.scrollY);
    sessionStorage.setItem("prevURL", window.location.href);
    sessionStorage.setItem("prevPage", currentPage);
  }

  function restaurarScrollPrevio() {
    const y = parseInt(sessionStorage.getItem("prevScrollY"), 10);  // Paginación guardada
    sessionStorage.removeItem("prevScrollY");

    if (isNaN(y)) return;

    const intentarScroll = () => {
      if (document.body.scrollHeight > y + window.innerHeight) {
        window.scrollTo({ top: y, behavior: "smooth" });
      } else {
        requestAnimationFrame(intentarScroll);
      }
    };

    requestAnimationFrame(intentarScroll);
  }


  function irACestaConProducto(id) {
    guardarScrollY();
    window.location.href = `/cesta_cliente.html?id=${id}`;
  }

  function irAsoloProducto(id) {
    guardarScrollY();
    window.location.href = `/producto.html?id=${id}`;
  }

  // ==========================
  // Carga y búsqueda
  // ==========================

  async function cargarProductosIniciales() {
    toggleBotones(true);
    try {
      const res = await fetch('https://proyectorailway-production-9739.up.railway.app/datos');
      dataOriginal = await res.json();

      const storedPage = sessionStorage.getItem("prevPage");
      currentPage = storedPage ? parseInt(storedPage, 10) : 1;
      sessionStorage.removeItem("prevPage");

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
}
