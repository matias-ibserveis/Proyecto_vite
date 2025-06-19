import { crearModalIA, mostrarRespuestaIA } from "./iaModal.js";
import { crearEstructuraHTML, aplicarEstilos } from './estructuraProductos.js';
import { getBusqueda } from "./store.js";


export async function Productos() {
  crearModalIA();

  // Variables de estado
  let currentPage = 1;
  let itemsPerPage = 3;
  let totalPages = 1;
  let dataOriginal = [];
  let paginacionActiva = false;


  // Crear estructura HTML
  const productos = crearEstructuraHTML(buscarProductos, () => {
    currentPage = 1;
    paginar(dataOriginal, currentPage);
    productos.querySelector("#busquedaInput").value = "";
    console.log("boton todos")
  });
  const contenedor = productos.querySelector("#productos-lista");
  const buscarBtn = productos.querySelector("#buscarBtn");
  const todosBtn = productos.querySelector("#todosBtn");

  function verMasProductos() {
    const btnVerMas = document.createElement("button");
    btnVerMas.id = "btnVerMas";
    btnVerMas.textContent = "Ver más productos";
    btnVerMas.className = "btn btn-primary mt-1 px-5 py-3 fs-6 rounded-pill";
    btnVerMas.style.minWidth = "280px";
    btnVerMas.style.boxShadow = "0 0.5rem 1rem rgba(0,0,0,0.3)";
    btnVerMas.onclick = () => {
      paginacionActiva = true;
      itemsPerPage = 9;
      currentPage = 1;
      paginar(dataOriginal, currentPage);
      btnVerMas.remove(); // oculta el botón
    };
    productos.appendChild(btnVerMas);

  }

  // Función principal: cargar al inicio
  await cargarProductosIniciales();
  verMasProductos();
  restaurarScrollPrevio();
  aplicarEstilos();

  // 🔽 escucha cambios en la búsqueda global
  document.addEventListener("busquedaCambiada", () => {
    const input = productos.querySelector("#busquedaInput");
    if (input) {
      input.value = getBusqueda();
      buscarProductos();
      // Scroll suave al contenedor productos
      productos.scrollIntoView({ behavior: "smooth" });
    }
  });


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
          <button class="btn btn-secondary mt-2 btn-ia" data-id="${producto.id}">+info chatGPT</button>
          <button class="btn btn-secondary mt-2 btn-a-cesta" data-id="${producto.id}">a mi cesta</button>
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
    if (paginacionActiva) renderizarControlesPaginacion(lista);
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
    sessionStorage.setItem("palabraBusqueda", productos.querySelector("#busquedaInput").value);
  }

  function restaurarScrollPrevio() {
    const y = parseInt(sessionStorage.getItem("prevScrollY"), 10);  // Paginación guardada
    sessionStorage.removeItem("prevScrollY");

    if (isNaN(y)) return;

    if (sessionStorage.getItem("palabraBusqueda")) {
      productos.querySelector("#busquedaInput").value = sessionStorage.getItem("palabraBusqueda")
      buscarProductos()
      console.log("busqueda")
    }

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

      const aleatorios = [...dataOriginal]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      renderizarProductos(aleatorios); // Mostrar solo esos 3

    } catch (error) {
      contenedor.innerHTML = `<p class="text-danger text-center">NO se puede cargar productos</p>`;
      console.error("No se pudo cargar productos:", error);
    } finally {
      toggleBotones(false);
    }
  }

  async function buscarProductos() {

    const consulta = productos.querySelector("#busquedaInput").value.trim();
    if (!consulta) return;

    currentPage = 1;
    itemsPerPage = 9;
    paginacionActiva = true;
    paginar(dataOriginal, currentPage);

    toggleBotones(true);
    try {
      const resp = await fetch('https://proyectorailway-production-9739.up.railway.app/buscar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ consulta })
      });

      const resultados = await resp.json();
      resultados.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

      currentPage = 1;
      paginar(resultados, currentPage);
    } catch (err) {
      contenedor.innerHTML = `<p class="text-danger">No puedo buscar productos</p>`;
      console.error("No se pudo búscar:", err);
    } finally {
      toggleBotones(false);
      document.querySelector("#btnVerMas")?.remove();
    }
  }

  function toggleBotones(desactivar) {
    buscarBtn.disabled = desactivar;
    todosBtn.disabled = desactivar;
  }


}
