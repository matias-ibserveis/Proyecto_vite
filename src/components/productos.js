import { crearModalIA, mostrarRespuestaIA } from "./iaModal.js";
import { crearEstructuraHTML, aplicarEstilos } from './estructuraProductos.js';
import { getBusqueda } from "./store.js";

if (!document.getElementById('animaciones-cards-style')) {
  const animStyle = document.createElement('style');
  animStyle.id = 'animaciones-cards-style';
  animStyle.textContent = `
.aparecer-desde-abajo {
  animation: slideUpFadeIn 0.7s ease;
}
@keyframes slideUpFadeIn {
  from { opacity: 0; transform: translateY(40px);}
  to   { opacity: 1; transform: translateY(0);}
}
.salida-hacia-abajo {
  animation: slideDownFadeOut 0.5s ease;
}
@keyframes slideDownFadeOut {
  from { opacity: 1; transform: translateY(0);}
  to   { opacity: 0; transform: translateY(60px);}
}
  çç


  `;
  document.head.appendChild(animStyle);
}

export async function Productos() {
  crearModalIA();

  // Estado
  let currentPage = 1;
  let itemsPerPage = 9;
  let totalPages = 1;
  let dataOriginal = [];
  let paginacionActiva = true;

  // Crear estructura HTML
  const productos = crearEstructuraHTML(buscarProductos, null);
  const contenedor = productos.querySelector("#productos-lista");

  // Crear contenedor para paginación arriba
  const paginacionArriba = document.createElement("div");
  paginacionArriba.id = "paginacion-arriba";
  paginacionArriba.className = "text-center my-3";
  contenedor.parentNode.insertBefore(paginacionArriba, contenedor);

  const buscarBtn = productos.querySelector("#buscarBtn");

  // --- LIGHTBOX GLOBAL PARA FOTOS ---
  let lightbox = document.getElementById('lightbox-producto');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'lightbox-producto';
    lightbox.className = 'lightbox-servicio';
    lightbox.innerHTML = `<img id="lightbox-img-producto" src="" alt="Imagen ampliada">`;
    document.body.appendChild(lightbox);
    lightbox.addEventListener('click', () => {
      lightbox.classList.remove('active');
      document.getElementById('lightbox-img-producto').src = '';
    });
  }

  // --- ESTILOS LIGHTBOX (si no existen) ---
  if (!document.getElementById('lightbox-servicio-style')) {
    const style = document.createElement('style');
    style.id = 'lightbox-servicio-style';
    style.textContent = `
.lightbox-servicio {
  display: none;
  position: fixed;
  z-index: 9999;
  left: 0; top: 0;
  width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.7);
  align-items: center;
  justify-content: center;
}
.lightbox-servicio.active {
  display: flex;
}
.lightbox-servicio img {
  max-width: 80vw;
  max-height: 80vh;
  width: auto;
  height: auto;
  border-radius: 18px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.4);
  background: rgba(0, 0, 0, 0.33);
  padding: 12px;
  display: block;
  margin: auto;
}



    `;
    document.head.appendChild(style);
  }

  // Cargar productos al inicio
  await cargarProductosIniciales();
  aplicarEstilos();

  // Escucha cambios en la búsqueda global
  document.addEventListener("busquedaCambiada", () => {
    const input = productos.querySelector("#busquedaInput");
    if (input) {
      input.value = getBusqueda();
      buscarProductos();
      productos.scrollIntoView({ behavior: "smooth" });
    }
  });

  return productos;

  // ==========================
  // Renderizado de productos
  // ==========================

  function renderizarProducto(producto) {
    const col = document.createElement("div");
    col.className = "col-md-4 col-sm-6 mb-4 aparecer-desde-abajo";

    // Imagen de Google Drive o local
// Imagen robusta de Google Drive o local
  let imageUrl = "/images/logo1.png";
  if (
    producto.imagen1 &&
    producto.imagen1 !== "null" &&
    producto.imagen1 !== "(Null)" &&
    producto.imagen1 !== null
  ) {
    if (producto.imagen1.includes("drive.google.com")) {
      const imageId = producto.imagen1.split('/d/')[1]?.split('/')[0];
      if (imageId) {
        imageUrl = `https://drive.google.com/thumbnail?id=${imageId}&sz=w800-h600`;
      }
    } else {
      imageUrl = producto.imagen1;
    }
  }

    // Descripción resumida
    const resumen = producto.descripcion
      ? producto.descripcion.split(/[.!?]\s/).slice(0, 2).join('. ') + '.'
      : "Sin descripción.";

    // Cantidad y unidad
    const valorMedido = producto.valor_medido ?? "";
    const unidadMedido = producto.unidad_medido ?? "";

    // Card HTML
    col.innerHTML = `
      <div class="card h-100 shadow-sm position-relative">
        <div class="product-card-content">
          <div class="product-image-wrapper">
            <img src="${imageUrl}" class="card-img-top product-image" alt="${producto.titulo || 'Producto'}" style="cursor:zoom-in;" loading="lazy" onerror="this.src='/images/logo1.png'">
          </div>
          <div class="product-details">
            <h3 class="card-title">${producto.titulo || 'Sin título'}</h3>
            <p class="product-description">${resumen}</p>
            <p class="card-text text-muted">Precio: €<span class="precio-unitario">${(producto.precio || 0).toFixed(2)}</span></p>
            <p class="card-text text-muted" style="margin-bottom:0.2em;">
              Cantidad: <span class="cantidad">${valorMedido}${unidadMedido}</span>
            </p>
          </div>
        </div>
        <div class="card-footer d-flex flex-wrap justify-content-between align-items-center">
          <div class="quantity-control">
            <button type="button" class="btn quantity-btn btn-outline-secondary" data-action="minus">-</button>
            <span class="quantity-display">1</span>
            <button type="button" class="btn quantity-btn btn-outline-secondary" data-action="plus">+</button>
          </div>
          <button type="button" class="btn add-btn btn-success ms-2">Añadir</button>
        </div>
      </div>
    `;

    // --- ABRIR LIGHTBOX AL HACER CLICK EN LA FOTO ---
    const img = col.querySelector('.card-img-top');
    img.addEventListener('click', (e) => {
      e.stopPropagation();
      document.getElementById('lightbox-img-producto').src = imageUrl;
      lightbox.classList.add('active');
    });

    // Eventos de cantidad y añadir
    const minusBtn = col.querySelector('[data-action="minus"]');
    const plusBtn = col.querySelector('[data-action="plus"]');
    const quantityDisplay = col.querySelector('.quantity-display');
    const addBtn = col.querySelector('.add-btn');
    const priceText = col.querySelector('.card-text .precio-unitario');

    let basePrice = producto.precio || 0;

    function updatePrice() {
      const qty = parseInt(quantityDisplay.textContent);
      priceText.textContent = (basePrice * qty).toFixed(2);
    }

    minusBtn.addEventListener('click', () => {
      let qty = parseInt(quantityDisplay.textContent);
      if (qty > 1) {
        quantityDisplay.textContent = qty - 1;
        updatePrice();
      }
    });

    plusBtn.addEventListener('click', () => {
      let qty = parseInt(quantityDisplay.textContent);
      quantityDisplay.textContent = qty + 1;
      updatePrice();
    });

    addBtn.addEventListener("click", () => {
      const quantity = parseInt(quantityDisplay.textContent);
      if (quantity > 0) {
        const cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
        const existingItem = cart.find(item => item.id === producto.id && item.type === 'product');
        let imageUrl = "/images/logo1.png";
        if (producto.imagen1) {
          if (producto.imagen1.includes("drive.google.com")) {
            const driveRegex = /\/d\/([a-zA-Z0-9_-]+)|id=([a-zA-Z0-9_-]+)/;
            const match = producto.imagen1.match(driveRegex);
            if (match && (match[1] || match[2])) {
              imageUrl = `https://drive.google.com/thumbnail?id=${match[1] || match[2]}&sz=w800-h600`;
            } else {
              imageUrl = producto.imagen1;
            }
          } else if (producto.imagen1.startsWith("/images/")) {
            imageUrl = producto.imagen1;
          } else {
            imageUrl = producto.imagen1;
          }
        }
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          cart.push({
            id: producto.id,
            name: producto.titulo,
            quantity: quantity,
            price: producto.precio,
            type: 'product',
            imagen1: imageUrl
          });
        }
        sessionStorage.setItem('cart', JSON.stringify(cart));
        quantityDisplay.textContent = '1';
        updateQuantity();

        // --- Animación verde ---
        addBtn.classList.remove('added-success');
        void addBtn.offsetWidth; // Fuerza reflow para reiniciar animación
        addBtn.classList.add('added-success');
      }
    });

    // IA Información (ver más)
    const verMas = document.createElement("span");
    verMas.className = "ver_mas";
    verMas.textContent = "IA Información";
    verMas.style.display = "inline-block";
    verMas.style.marginTop = "0.5em";
    verMas.style.color = "#2a5db0";
    verMas.style.cursor = "pointer";
    verMas.style.textDecoration = "underline";
    verMas.onclick = async () => {
      verMas.textContent = "Espera unos segundos...";
      verMas.classList.add("text-dark");
      await mostrarRespuestaIA(producto);
      verMas.textContent = "IA Información";
      verMas.classList.remove("text-dark");
    };
    col.querySelector(".product-details").appendChild(verMas);

    contenedor.appendChild(col);
  }

function renderizarProductos(lista) {
  // 1. Animar salida de las cards actuales
  const cards = contenedor.querySelectorAll('.col-md-4, .col-sm-6, .mb-4');
  cards.forEach(card => {
    card.classList.add('salida-hacia-abajo');
  });

  // 2. Espera la animación de salida antes de limpiar y mostrar las nuevas
  setTimeout(() => {
    contenedor.innerHTML = "";
    if (!lista || lista.length === 0) {
      contenedor.innerHTML = `
        <div class="no-result-container" style="text-align:center; margin: 2em 0;">
          <img src="/images/Sorry.png" alt="Sin resultados" style="width:200px;margin-bottom:1em;">
          <div class="no-result-text">No se encontró el producto que usted deseaba<br> ya que no lo Tenemos en Lista de Venta en estos momentos...<br><br><br> Si desea agregarlo puede mandarnos un escrito por Whatsapp.😊😊</div>
        </div>
      `;
      return;
    }
    lista.forEach(renderizarProducto);
  }, 500); // Debe coincidir con la duración de .salida-hacia-abajo
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
    paginacionArriba.innerHTML = `
      <button type="button" class="btn btn-outline-primary me-2" id="anterior" ${currentPage === 1 ? "disabled" : ""}>⬅ Anterior</button>
      <span>pág ${currentPage} de ${totalPages}</span>
      <button type="button" class="btn btn-outline-primary ms-2" id="siguiente" ${currentPage === totalPages ? "disabled" : ""}>Siguiente ➡</button>
    `;

    paginacionArriba.querySelector("#anterior").onclick = () => {
      if (currentPage > 1) {
        currentPage--;
        paginar(lista, currentPage);
      }
    };
    paginacionArriba.querySelector("#siguiente").onclick = () => {
      if (currentPage < totalPages) {
        currentPage++;
        paginar(lista, currentPage);
      }
    };
  }

  // ==========================
  // Carga y búsqueda
  // ==========================

  async function cargarProductosIniciales() {
    toggleBotones(true);
    try {
      // Aumenta el timeout para evitar que se cancele la petición
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000); // 15 segundos

      const res = await fetch('https://proyectorailway-production-9739.up.railway.app/datos', {
        signal: controller.signal
      });
      clearTimeout(timeout);

      dataOriginal = await res.json();

      // Mostrar los primeros 9 productos y activar paginación
      currentPage = 1;
      itemsPerPage = 9;
      paginacionActiva = true;
      paginar(dataOriginal, currentPage);

    } catch (error) {
      contenedor.innerHTML = `<p class="text-danger text-center">NO se puede cargar productos</p>`;
      console.error("No se pudo cargar productos:", error);
    } finally {
      toggleBotones(false);
    }
  }

async function buscarProductos() {
  const consulta = productos.querySelector("#busquedaInput").value.trim();

  // Si el input está vacío, muestra todos los productos (página 1)
  if (!consulta) {
    currentPage = 1;
    itemsPerPage = 9;
    paginacionActiva = true;
    paginar(dataOriginal, currentPage);
    return;
  }

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
  }


}