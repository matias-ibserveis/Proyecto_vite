export async function productos_crear_cesta(appContenedor) {

  let currentPage = 1;
  const itemsPerPage = 10;
  let totalPages = 1;
  let dataOriginal = [];

  async function renderizaInicio() {
    appContenedor.innerHTML = `
      <h2 class="titulo">Añadir a cesta</h2>
      <div class="mb-4" style="padding-left:1rem">
        <input type="text" id="busquedaInput" class="form-control" placeholder="Buscar productos ...">
        <button id="buscarBtn" class="btn btn-primary mt-2">Buscar</button>
        <button id="todosBtn" class="btn btn-secondary mt-2 ms-2">ver todos</button>
      </div>
      <div class="row" id="productos-lista"></div>
      <div id="paginacion" class="text-center my-3"></div>
    `;
  }

  const renderizarProductos = (lista) => {
    const contenedor = appContenedor.querySelector("#productos-lista");
    contenedor.innerHTML = "";

    lista.forEach(producto => {
      const col = document.createElement("div");
      col.className = "col-md-4";

      const frases = producto.descripcion.split(/[.!?]\s/);
      const primerasFrases = frases.slice(0, 2).join('. ') + '.';

      const imageId = producto.imagen1.split('/d/')[1]?.split('/')[0];
      const imageUrl = `https://drive.google.com/thumbnail?id=${imageId}&sz=w800-h600`;

      col.className = "col-12"; // Antes estaba col-md-4
      col.innerHTML = `
        <div id="contenedor" class="card mb-4">
          <img src="${imageUrl}" class="card-img-top" alt="${producto.titulo}">
          <div class="card-body">
            <h5 class="card-title">${producto.titulo}</h5>
            <p class="card-text" id="desc-${producto.id}">
              ${primerasFrases}
              <span class="ver_mas" data-id="${producto.id}">ver +</span>
            </p>
            <button class="btn btn-primary">Añadir a LISTA de nueva cesta</button>
          </div>
        </div>
      `;

      col.querySelector("button").addEventListener("click", () => {
        const nuevaCesta = JSON.parse(localStorage.getItem("nuevaCesta") || "{}");

        if (nuevaCesta[producto.id]) {
          nuevaCesta[producto.id].cantidad += 1;
        } else {
          nuevaCesta[producto.id] = {
            titulo: producto.titulo,
            precio: producto.precio,
            unidad_medido: producto.unidad_medido,
            cantidad: 1,
            imagen1: producto.imagen1,
            origen: "manual"
          };
        }

        localStorage.setItem("nuevaCesta", JSON.stringify(nuevaCesta));
      });
      contenedor.appendChild(col);
    });
  };



  function paginar(lista, pagina) {
    totalPages = Math.ceil(lista.length / itemsPerPage);
    const inicio = (pagina - 1) * itemsPerPage;
    const fin = inicio + itemsPerPage;
    renderizarProductos(lista.slice(inicio, fin));
    renderizarFlechas(lista);
  }


  function renderizarFlechas(lista) {
    const paginacion = appContenedor.querySelector("#paginacion");
    paginacion.innerHTML = `
      <button class="btn btn-outline-primary me-2" id="anterior" ${currentPage === 1 ? "disabled" : ""}>⬅ Anterior</button>
      <span>pág ${currentPage} de ${totalPages}</span>
      <button class="btn btn-outline-primary ms-2" id="siguiente" ${currentPage === totalPages ? "disabled" : ""}>Siguiente ➡</button>
    `;

    paginacion.querySelector("#anterior").onclick = () => {
      if (currentPage > 1) {
        currentPage--;
        paginar(lista, currentPage);
      }
    };

    paginacion.querySelector("#siguiente").onclick = () => {
      if (currentPage < totalPages) {
        currentPage++;
        paginar(lista, currentPage);
      }
    };
  }



  async function cargarDatos() {
    try {
      const res = await fetch('https://proyectorailway-production-9739.up.railway.app/datos');
      dataOriginal = await res.json();
      currentPage = 1;
      paginar(dataOriginal, currentPage);
    } catch (error) {
      appContenedor.innerHTML = `<p class="text-danger text-center">Error al cargar productos</p>`;
      console.error("Error cargando productos:", error);
    }
  }


  function configurarEventos() {
    const buscarBtn = appContenedor.querySelector("#buscarBtn");
    const todosBtn = appContenedor.querySelector("#todosBtn");

    buscarBtn.addEventListener("click", async () => {
      const consulta = appContenedor.querySelector("#busquedaInput").value.trim();
      if (!consulta) return;

      buscarBtn.disabled = true;
      todosBtn.disabled = true;

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
        appContenedor.querySelector("#productos-lista").innerHTML = `<p class="text-danger">Error al buscar productos</p>`;
        console.error("Error en búsqueda:", err);
      } finally {
        buscarBtn.disabled = false;
        todosBtn.disabled = false;
      }
    });

    todosBtn.addEventListener("click", () => {
      currentPage = 1;
      paginar(dataOriginal, currentPage);
      appContenedor.querySelector("#busquedaInput").value = "";
    });
  }



  const style = document.createElement("style");
  style.id = 'custom-product-style';
  style.innerHTML = `
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
      border-radius: 0;
    }

    .card-body {
      padding: 0.5rem 1rem;
      flex: 1;
      text-align: left;
    }

    .card-title {
      font-size: 1.1rem;
      font-weight: bold;
      margin-bottom: 0.25rem;
    }

    .card-text {
      font-size: 0.95rem;
      color: #6c757d;
      margin-bottom: 0.5rem;
    }

    .btn {
      font-size: 0.95rem;
      padding: 0.4rem 0.8rem;
    }

    .btn-success {
      width: 100%;
    }

    .ver_mas {
      color: var(--secondary-color);
      text-decoration: underline;
      cursor: pointer;
      font-size: 0.95rem;
      font-weight: 500;
    }

    #contenedor {
      max-width: 1280px;
      margin: 1rem;
      padding: 1rem;
    }

    /* Para pantallas más grandes, vuelve la card a vertical */
    @media (min-width: 768px) {
      .card {
        flex-direction: column;
      }

      .card-img-top {
        width: 100%;
        max-width: 100%;
        height: 200px;
      }

      .card-body {
        padding: 1rem;
      }

    }

  `;
  document.head.appendChild(style);



  // Programa principal
  await renderizaInicio();
  configurarEventos();
  await cargarDatos();



  return appContenedor;
}

