import { crearModalIA, mostrarRespuestaIA } from "./iaModal.js"; // Ajusta ruta según tu estructura


export async function Productos() {

  crearModalIA();

  const productos = document.createElement("section");
  productos.className = "container py-5";
  productos.id = "productos";

  productos.innerHTML = `
    <h2 class="text-center">Nuestros Productos</h2>
    <div class="mb-4">
      <input type="text" id="busquedaInput" class="form-control" placeholder="Buscar productos ...">
      <button id="buscarBtn" class="btn btn-primary mt-2">Buscar</button>
    </div>
    <div class="row" id="productos-lista"></div>
  `;

  const contenedor = productos.querySelector("#productos-lista");


  const renderizarProductos = (lista) => {
    //contenedor.innerHTML = ""; // limpiar
    lista.forEach(producto => {
      const col = document.createElement("div");
      col.className = "col-md-4";

      const frases = producto.descripcion.split(/[.!?]\s/);
      const primerasFrases = frases.slice(0, 2).join('. ') + '.';
      const descripcionCompleta = producto.descripcion;

      const imageId = producto.imagen1.split('/d/')[1]?.split('/')[0];
      const imageUrl = `https://drive.google.com/thumbnail?id=${imageId}&sz=w800-h600`;

      col.innerHTML = `
        <div class="card mb-4">
          <img src="${imageUrl}" class="card-img-top" alt="${producto.titulo}">
          <div class="card-body">
              <h5 class="card-title">
                  ${producto.titulo}
              </h5>
              <p class="card-text" id="desc-${producto.id}">
                ${primerasFrases}
                <button class="btn-vermas" data-id="${producto.id}">ver +</button>
              </p>
              <button class="btn btn-secondary mt-2 btn-ia" data-id="${producto.id}">+información IA</button>
              <p></p>
              <button class="btn btn-secondary mt-2 btn-a-cesta" data-id="${producto.id}">a la cesta</button>
          </div>
        </div>
      `;

      contenedor.appendChild(col);

      // Evento "a la cesta"
      const botonCesta = col.querySelector(".btn-a-cesta");
      botonCesta.addEventListener("click", () => {
        irACestaConProducto(producto.id);
      });

      // Evento "ver más"
      const botonvermas = col.querySelector(".btn-vermas");
      botonvermas.addEventListener("click", () => {
        irAsoloProducto(producto.id);
      });

      // Evento "Info IA"
      const botonia = col.querySelector(".btn-ia");
      botonia.addEventListener("click", () => {
        // Cambiar estilo y texto del botón mientras espera
        botonia.textContent = "Espera un momento ";
        botonia.classList.remove("btn-secondary");
        botonia.classList.add("btn-warning", "text-dark");

        mostrarRespuestaIA(producto).finally(() => {
          // Opcional: restaurar botón después de recibir respuesta
          botonia.textContent = "Información IA";
          botonia.classList.remove("btn-warning", "text-dark");
          botonia.classList.add("btn-secondary");
        });
      });


      // Ir a POS Y
      const y = sessionStorage.getItem("prevScrollY");
      if (y !== null) {
        const intentarScroll = () => {
          if (document.querySelector("#productos")) {
            setTimeout(() => {
              window.scrollTo(0, parseInt(y));
              sessionStorage.removeItem("prevScrollY");
            }, 100);
          } else {
            requestAnimationFrame(intentarScroll);
          }
        };
        intentarScroll();
      }


    });
  };



  function irACestaConProducto(id) {
    sessionStorage.setItem("prevScrollY", window.scrollY);
    sessionStorage.setItem("prevURL", window.location.href);
    window.location.href = `/cesta.html?id=${id}`;
  }

   function irAsoloProducto(id) {
    sessionStorage.setItem("prevScrollY", window.scrollY);
    sessionStorage.setItem("prevURL", window.location.href);
    window.location.href = `/producto.html?id=${id}`;
  }



  // fetch inicial y búsqueda
  try {
    const res = await fetch('https://proyectorailway-production-9739.up.railway.app/datos');
    //const res = await fetch('http://localhost:3000/datos');
    const data = await res.json();


    const productosOrdenados = data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    const productosRecientes = productosOrdenados.slice(0, 10);
    renderizarProductos(productosRecientes);

    const buscarBtn = productos.querySelector("#buscarBtn");
    buscarBtn.addEventListener("click", async () => {
      const consulta = productos.querySelector("#busquedaInput").value.trim();
      if (!consulta) return;

      try {
        const resp = await fetch('https://proyectorailway-production-9739.up.railway.app/buscar', {
          //const resp = await fetch('http://localhost:3000/buscar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ consulta })
        });

        const resultados = await resp.json();
        renderizarProductos(resultados);

      } catch (err) {
        console.error("Error en búsqueda:", err);
        contenedor.innerHTML = `<p class="text-danger">Error al buscar productos</p>`;
      }
    });

  } catch (error) {
    productos.innerHTML += `<p class="text-danger text-center">Error al cargar productos</p>`;
    console.error("Error cargando productos:", error);
  }





  // Estilos
  const style = document.createElement("style");
  style.innerHTML = `
    .card-img-top {
      height: 200px;
      object-fit: cover;
      border-radius: 8px;
    }
    .card-body {
      padding: 1.5rem;
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
    .container {
      max-width: 1200px;
    }
  `;
  document.head.appendChild(style);

  return productos;
}
