document.addEventListener("DOMContentLoaded", async () => {
  const appContenedor = document.getElementById("app");
  await productos_gestion(appContenedor);
});

export async function productos_gestion(appContenedor) {
  let currentPage = 1;
  const itemsPerPage = 6;
  let totalPages = 1;
  let productos = [];

  async function renderInicio() {
    appContenedor.innerHTML = `
      <h3 class="titulo my-4">Gestión de productos</h3>
      <div class="mb-4">
        <input type="text" id="busquedaInput" class="form-control" placeholder="Buscar productos ...">
        <button id="buscarBtn" class="btn btn-secondary mt-2">Buscar</button>
        <button id="todosBtn" class="btn btn-secondary mt-2 ms-2">Ver todos</button>
      </div>

      <div class="mb-4 p-3">
        <h5>Crear nuevo producto</h5>
        <input type="text" id="nuevoTitulo" class="form-control mb-2" placeholder="Título">
        <input type="text" id="nuevaDescripcion" class="form-control mb-2" placeholder="Descripción">
        <input type="text" id="nuevoPrecio" class="form-control mb-2" placeholder="Precio">
        <input type="text" id="nuevaImagen" class="form-control mb-2" placeholder="URL imagen de Google Drive">
        <button id="crearBtn" class="btn btn-success">Crear producto</button>
      </div>

      <div class="row" id="productos-lista" style="margin-top:3rem"></div>
      <div id="paginacion" class="text-center my-3"></div>
    `;
  }

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
          <p class="card-text">${resumen}</p>
          <button class="btn btn-warning me-2" data-id="${producto.id}" data-action="editar">Editar</button>
          <button class="btn btn-danger" data-id="${producto.id}" data-action="eliminar">Eliminar</button>
        </div>
      </div>
    `;

    col.querySelector('[data-action="eliminar"]').onclick = async () => {
      if (confirm("¿Eliminar este producto?")) {
        await fetch(`https://proyectorailway-production-9739.up.railway.app/producto/${producto.id}`, {
          method: 'DELETE'
        });
        await cargarDatos();
      }
    };


    col.querySelector('[data-action="editar"]').onclick = async () => {
      const nuevoTitulo = prompt("Nuevo título:", producto.titulo);
      const nuevaDescripcion = prompt("Nueva descripción:", producto.descripcion);
      const nuevoPrecio = prompt("Nuevo precio:", producto.precio);
      const nuevaImagen = prompt("Nueva imagen (URL Google Drive):", producto.imagen1);

      if (nuevoTitulo && nuevaDescripcion && nuevoPrecio && nuevaImagen) {
        try {
          const res = await fetch(`http://localhost:3000/api/producto/${producto.id}`, {
          //const res = await fetch(`https://proyectorailway-production-9739.up.railway.app/producto/${producto.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              titulo: nuevoTitulo,
              descripcion: nuevaDescripcion,
              precio: parseFloat(nuevoPrecio),
              imagen1: nuevaImagen
            })
          });

          if (!res.ok) throw new Error('Error al actualizar');
          await cargarDatos();
        } catch (error) {
          console.error("Error al editar producto:", error);
          alert("No se pudo editar el producto.");
        }
      }
    };


    return col;
  }

  function mostrarPagina(lista, pagina) {
    const inicio = (pagina - 1) * itemsPerPage;
    const paginaItems = lista.slice(inicio, inicio + itemsPerPage);

    const contenedor = appContenedor.querySelector("#productos-lista");
    contenedor.innerHTML = "";
    paginaItems.forEach(p => contenedor.appendChild(crearFicha(p)));

    totalPages = Math.ceil(lista.length / itemsPerPage);
    renderFlechas(lista);
  }

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

  function configurarEventos() {
    const input = appContenedor.querySelector("#busquedaInput");
    const btnBuscar = appContenedor.querySelector("#buscarBtn");
    const btnTodos = appContenedor.querySelector("#todosBtn");
    const crearBtn = appContenedor.querySelector("#crearBtn");

    btnBuscar.onclick = () => {
      const consulta = input.value.trim();
      if (consulta) buscarProductos(consulta);
    };

    btnTodos.onclick = () => {
      input.value = "";
      mostrarPagina(productos, currentPage = 1);
    };

    crearBtn.onclick = async () => {
      const titulo = appContenedor.querySelector("#nuevoTitulo").value.trim();
      const descripcion = appContenedor.querySelector("#nuevaDescripcion").value.trim();
      const precio = parseFloat(appContenedor.querySelector("#nuevoPrecio").value);
      const imagen1 = appContenedor.querySelector("#nuevaImagen").value.trim();

      if (titulo && descripcion && !isNaN(precio) && imagen1) {
        await fetch('https://proyectorailway-production-9739.up.railway.app/producto', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ titulo, descripcion, precio, imagen1 })
        });
        await cargarDatos();
      } else {
        alert("Rellena todos los campos correctamente");
      }
    };
  }

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
          margin-bottom: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          min-height: 100px;
        }

        .card-img-top {
          width: 120px;
          height: 100px;
        }

        .card-body {
          /* flex: 1; */
          padding: 0.5rem;
        }

        .card-title {
          font-size: 1rem;
          margin-bottom: 0.25rem;
        }

        .card-text {
          font-size: 0.85rem;
          margin-bottom: 0.5rem;
        }

        .btn + .btn {
          margin-left: 0.4rem;
        }
        `
    document.head.appendChild(style);
  }




  insertarEstilos();
  await renderInicio();
  await cargarDatos();
  configurarEventos();
}
