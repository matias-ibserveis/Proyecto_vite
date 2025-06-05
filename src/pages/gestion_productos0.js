// Espera a que el DOM esté completamente cargado antes de iniciar la app
document.addEventListener("DOMContentLoaded", async () => {
  const appContenedor = document.getElementById("app");
  await productos_gestion(appContenedor);
});

// Función principal que gestiona la aplicación de productos
export async function productos_gestion(appContenedor) {
  // Variables de estado
  let currentPage = 1;
  const itemsPerPage = 6;
  let totalPages = 1;
  let productos = [];

  // ----- VISTA INICIAL -----
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
        ${crearFormularioProducto()}
        <button id="crearBtn" class="btn btn-success">Crear producto</button>
      </div>

      <div class="row" id="productos-lista" style="margin-top:3rem"></div>
      <div id="paginacion" class="text-center my-3"></div>
    `;
  }

  // ----- FORMULARIO NUEVO PRODUCTO -----
  function crearFormularioProducto() {
    const campos = [
      ["nuevoTitulo", "Título"],
      ["nuevaDescripcion", "Descripción"],
      ["nuevoPrecio", "Precio"],
      ["nuevoPortada", "Portada (número)"],
      ["nuevaImagen", "URL imagen de Google Drive"],
      ["nuevaFecha", "Fecha"],
      ["nuevaCategoria", "Categoría"],
      ["nuevoValorMedido", "Valor medido"],
      ["nuevaUnidadMedido", "Unidad de medida"],
      ["nuevoProveedor", "Proveedor"]
    ];
    return campos.map(([id, placeholder]) =>
      `<input type="text" id="${id}" class="form-control mb-2" placeholder="${placeholder}">`
    ).join('');
  }

  // ----- RENDER DE PRODUCTOS -----
  function mostrarPagina(lista, pagina) {
    const inicio = (pagina - 1) * itemsPerPage;
    const paginaItems = lista.slice(inicio, inicio + itemsPerPage);
    const contenedor = appContenedor.querySelector("#productos-lista");

    contenedor.innerHTML = "";
    paginaItems.forEach(p => contenedor.appendChild(crearFicha(p)));

    totalPages = Math.ceil(lista.length / itemsPerPage);
    renderFlechas(lista);
  }

  // ----- PAGINACIÓN -----
  function renderFlechas(lista) {
    const zona = appContenedor.querySelector("#paginacion");
    zona.innerHTML = `
      <button class="btn btn-outline-primary me-2" id="anterior" ${currentPage === 1 ? "disabled" : ""}>⬅ Anterior</button>
      <span>pág ${currentPage} de ${totalPages}</span>
      <button class="btn btn-outline-primary ms-2" id="siguiente" ${currentPage === totalPages ? "disabled" : ""}>Siguiente ➡</button>
    `;
    zona.querySelector("#anterior").onclick = () => currentPage > 1 && mostrarPagina(lista, --currentPage);
    zona.querySelector("#siguiente").onclick = () => currentPage < totalPages && mostrarPagina(lista, ++currentPage);
  }

  // ----- FICHA DE PRODUCTO -----
  function crearFicha(producto) {
    const col = document.createElement("div");
    col.className = "col-12";
    const resumen = producto.descripcion.split(/[.!?]\s/).slice(0, 2).join('. ') + '.';
    const idImg = producto.imagen1.split('/d/')[1]?.split('/')[0];
    const imageUrl = `https://drive.google.com/thumbnail?id=${idImg}&sz=w800-h600`;

    col.innerHTML = `
      <div class="card mb-4">
        <img src="${imageUrl}" class="card-img-top" alt="${producto.titulo}">
        <div class="card-body">
          <h5 class="card-title">${producto.titulo}</h5>
          <p class="card-text"><strong>Resumen:</strong> ${resumen}</p>
          <p class="card-text"><strong>Precio:</strong> ${producto.precio} €</p>
          <p class="card-text"><strong>Fecha:</strong> ${producto.fecha}</p>
          <p class="card-text"><strong>Categoría:</strong> ${producto.categoria}</p>
          <p class="card-text"><strong>Valor medido:</strong> ${producto.valor_medido} ${producto.unidad_medido}</p>
          <p class="card-text"><strong>Portada:</strong> ${producto.portada}</p>
          <p class="card-text"><strong>Proveedor:</strong> ${producto.proveedor}</p>
          <button class="btn btn-warning me-2" data-id="${producto.id}" data-action="editar">Editar</button>
          <button class="btn btn-danger" data-id="${producto.id}" data-action="eliminar">Eliminar</button>
        </div>
      </div>
    `;

    col.querySelector('[data-action="eliminar"]').onclick = async () => {
      if (confirm("¿Eliminar este producto?")) {
        await fetch(`https://proyectorailway-production-9739.up.railway.app/api/producto/${producto.id}`, { method: 'DELETE' });
        await cargarDatos();
      }
    };

    col.querySelector('[data-action="editar"]').onclick = async () => {
      const campos = ["fecha", "titulo", "descripcion", "categoria", "precio", "valor_medido", "unidad_medido", "portada", "proveedor", "imagen1"];
      const datos = {};
      for (const campo of campos) {
        datos[campo] = prompt(`${campo.charAt(0).toUpperCase() + campo.slice(1)}:`, producto[campo]);
      }
      try {
        const res = await fetch(`https://proyectorailway-production-9739.up.railway.app/api/producto/${producto.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...datos,
            precio: parseFloat(datos.precio),
            valor_medido: parseFloat(datos.valor_medido),
            portada: parseFloat(datos.portada)
          })
        });
        if (!res.ok) throw new Error("Error al actualizar");
        await cargarDatos();
      } catch (err) {
        console.error("Error al editar producto:", err);
        alert("No se pudo editar el producto.");
      }
    };

    return col;
  }

  // ----- CARGAR TODOS LOS PRODUCTOS -----
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

  // ----- BÚSQUEDA -----
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

  // ----- EVENTOS -----
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
      const valores = {
        titulo: appContenedor.querySelector("#nuevoTitulo").value.trim(),
        descripcion: appContenedor.querySelector("#nuevaDescripcion").value.trim(),
        precio: parseFloat(appContenedor.querySelector("#nuevoPrecio").value),
        imagen1: appContenedor.querySelector("#nuevaImagen").value.trim(),
        fecha: appContenedor.querySelector("#nuevaFecha").value.trim(),
        categoria: appContenedor.querySelector("#nuevaCategoria").value.trim(),
        valor_medido: parseFloat(appContenedor.querySelector("#nuevoValorMedido").value),
        unidad_medido: appContenedor.querySelector("#nuevaUnidadMedido").value.trim(),
        portada: parseFloat(appContenedor.querySelector("#nuevoPortada").value),
        proveedor: appContenedor.querySelector("#nuevoProveedor").value.trim()
      };

      const camposValidos = Object.values(valores).every(v => v !== "" && !isNaN(v) !== typeof v === "string");
      if (camposValidos) {
        await fetch('https://proyectorailway-production-9739.up.railway.app/api/producto', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(valores)
        });
        await cargarDatos();
      } else {
        alert("Rellena todos los campos correctamente");
      }
    };
  }

  // ----- ESTILOS CSS -----
  function insertarEstilos() {
    const style = document.createElement("style");
    style.innerHTML = `
      body { padding: 1rem; background-color: #f9f9f9; }
      .card { display: flex; flex-direction: row; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
      .card-img-top { width: 120px; height: 100px; }
      .card-body { padding: 0.5rem; }
      .card-title { font-size: 1rem; margin-bottom: 0.25rem; }
      .card-text { font-size: 0.85rem; margin-bottom: 0.5rem; }
      .btn + .btn { margin-left: 0.4rem; }
    `;
    document.head.appendChild(style);
  }

  // ----- INICIO -----
  insertarEstilos();
  await renderInicio();
  await cargarDatos();
  configurarEventos();
}
