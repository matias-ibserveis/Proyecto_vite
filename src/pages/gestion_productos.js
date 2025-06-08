import { validarCamposFormulario } from "../modules/validar_nuevo_producto.js";


// Espera a que el DOM esté listo
document.addEventListener("DOMContentLoaded", async () => {
  const appContenedor = document.getElementById("app");
  await productos_gestion(appContenedor);
  validarCamposFormulario(document);
});

// Función principal que controla toda la gestión de productos
export async function productos_gestion(appContenedor) {
  let currentPage = 1;
  const itemsPerPage = 6;
  let totalPages = 1;
  let productos = [];

  // Renderiza la vista principal con formulario y contenedor
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


  // Muestra los productos de una página
  function mostrarPagina(lista, pagina) {
    const inicio = (pagina - 1) * itemsPerPage;
    const paginaItems = lista.slice(inicio, inicio + itemsPerPage);
    const contenedor = appContenedor.querySelector("#productos-lista");

    contenedor.innerHTML = "";
    paginaItems.forEach(p => contenedor.appendChild(crearFicha(p)));

    totalPages = Math.ceil(lista.length / itemsPerPage);
    renderFlechas(lista);
  }

  // Muestra botones para cambiar de página
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

  // Crea el HTML de una ficha de producto
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

    // Eliminar producto
    col.querySelector('[data-action="eliminar"]').onclick = async () => {
      if (confirm("¿Eliminar este producto?")) {
        await fetch(`https://proyectorailway-production-9739.up.railway.app/api/producto/${producto.id}`, { method: 'DELETE' });
        await cargarDatos();
      }
    };

    // Editar producto (con prompts)
    col.querySelector('[data-action="editar"]').onclick = async () => {
      const campos = ["fecha", "titulo", "descripcion", "categoria", "precio", "valor_medido", "unidad_medido", "portada", "proveedor", "imagen1"];
      const datos = {};
      for (const campo of campos) {
        datos[campo] = prompt(`${campo}:`, producto[campo]);
      }
      try {
        //const res = await fetch(`http://localhost:3000/api/producto/${producto.id}`, {
        const res = await fetch(`https://proyectorailway-production-9739.up.railway.app/api/producto/${producto.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...datos,
            precio: parseFloat(datos.precio.replace(',', '.')),
            valor_medido: parseFloat(datos.valor_medido),
            portada: parseFloat(datos.portada)
          })
        });
        if (!res.ok) throw new Error("Error al actualizar");
        await cargarDatos();
      } catch (err) {
        alert("Error al editar producto");
      }
    };

    return col;
  }

  function crearFormularioProducto() {
    const hoy = new Date().toISOString().split("T")[0];
    return `
      <label for="nuevoTitulo">Título</label>
      <input type="text" id="nuevoTitulo" class="form-control mb-2" placeholder="nombre producto" >
      <small class="mensaje-error"></small> 

      <label for="nuevaDescripcion">Descripción</label>
      <input type="text" id="nuevaDescripcion" class="form-control mb-2" placeholder="texto " >
      <small class="mensaje-error"></small> 

      <label for="nuevoPrecio">Precio</label>
      <input type="number" id="nuevoPrecio" class="form-control mb-2" placeholder="€" >
      <small class="mensaje-error"></small> 

      <label for="nuevoPortada">Portada (0  o del 1 al 5)</label>
      <input type="number" id="nuevoPortada" class="form-control mb-2" placeholder="Portada (número)" value="0">
      <small class="mensaje-error"></small> 

      <label for="nuevaImagen">URL imagen de Google Drive</label>
      <input type="text" id="nuevaImagen" class="form-control mb-2" placeholder="">
      <small class="mensaje-error"></small> 

      <label for="nuevaFecha">Fecha</label>
      <input type="date" id="nuevaFecha" class="form-control mb-2" value="${hoy}">
      <small class="mensaje-error"></small> 

      <label for="nuevaCategoria">Categoría</label>
      <input type="text" id="nuevaCategoria" class="form-control mb-2" placeholder="Categoría" value="no" >
      <small class="mensaje-error"></small> 

      <label for="nuevoValorMedido">Cantidad</label>
      <input type="number" id="nuevoValorMedido" class="form-control mb-2" placeholder="numero" >
      <small class="mensaje-error"></small> 

      <label for="nuevaUnidadMedido">Unidad de medida</label>
      <input type="text" id="nuevaUnidadMedido" class="form-control mb-2" placeholder="kg, unidad, docena..." >
      <small class="mensaje-error"></small> 

      <label for="nuevoProveedor">Proveedor</label>
      <input type="text" id="nuevoProveedor" class="form-control mb-2" placeholder="Proveedor" >
      <small class="mensaje-error"></small> 

    `;
  }


  // Carga todos los productos desde la API
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

  // Envía una consulta al endpoint de búsqueda
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

  // Comprueba campos vacios del form
  function camposVaciosAntesDePost() {
    const campos = [
      { id: "nuevoTitulo", nombre: "Título" },
      { id: "nuevaDescripcion", nombre: "Descripción" },
      { id: "nuevoPrecio", nombre: "Precio" },
      { id: "nuevoPortada", nombre: "Portada" },
      { id: "nuevaImagen", nombre: "Imagen" },
      { id: "nuevaFecha", nombre: "Fecha" },
      { id: "nuevaCategoria", nombre: "Categoría" },
      { id: "nuevoValorMedido", nombre: "Cantidad" },
      { id: "nuevaUnidadMedido", nombre: "Unidad de medida" },
      { id: "nuevoProveedor", nombre: "Proveedor" },
    ];
    const vacios = campos
      .filter(c => document.querySelector(`#${c.id}`).value.trim() === "")
      .map(c => c.nombre);

    if (vacios.length > 0) {
      alert("Faltan campos por rellenar:\n" + vacios.join("\n"));
      return false; // evita hacer el POST
    }
    return true; // permite hacer el POST
  }


  // Configura eventos de búsqueda, ver todos y crear
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

      if (!camposVaciosAntesDePost()) return;

      //await fetch('http://localhost:3000/api/producto', {
      await fetch('https://proyectorailway-production-9739.up.railway.app/api/producto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(valores)
      });
      await renderInicio(); // Restablece formulario
      await cargarDatos();  // Refresca productos
      configurarEventos();  // Reconecta eventos

    };
  }

  // Inserta estilos CSS básicos para la vista
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
            input {
          border: 2px solid #ccc;
          padding: 5px;
          width: 100%;
          box-sizing: border-box;
        }

        input.valido {
          border-color: green;
          background-color: #e6ffe6;
        }

        input.invalido {
          border-color: red;
          background-color: #ffe6e6;
        }

        .mensaje-error {
          color: red;
          font-size: 0.8rem;
          margin: 0 0 4px 0;
          display: block;
        }

    `;
    document.head.appendChild(style);
  }

  // Ejecuta el flujo principal
  insertarEstilos();
  await renderInicio();
  await cargarDatos();
  configurarEventos();
}


//validarCamposFormulario(contexto)
