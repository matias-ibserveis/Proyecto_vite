export async function Productos() {
  console.log("Productos component initialized");

  const fallbackProducts = [
    { id: 1, titulo: "Empanada de Queso", category: "Tradicional", precio: 2.5, descripcion: "Deliciosa empanada rellena de queso fresco...", imagen1: "/images/Empanada.png" },
    { id: 2, titulo: "Teclado MIDI 49", category: "Teclados", precio: 120, descripcion: "Teclado MIDI de 49 teclas...", imagen1: "/images/producto1_2.jpeg" },
    { id: 3, titulo: "Micrófono Condensador", category: "Micros", precio: 85, descripcion: "Micrófono condensador de alta calidad...", imagen1: "/images/producto1_2.jpeg" }
  ];

  const productos = document.createElement("section");
  productos.className = "product-container py-5";
  productos.id = "productos";
  console.log("Productos container created");

  productos.innerHTML = `
    <div class="row product-list" id="productos-lista"></div>
    <div id="paginacion" class="category-pagination my-3"></div>
  `;

  const contenedor = productos.querySelector("#productos-lista");

  let currentPage = 1;
  const itemsPerPage = 9;
  let totalPages = 1;
  let dataOriginal = [];

  const urlParams = new URLSearchParams(window.location.search);
  const initialSearchTerm = urlParams.get("search") || "";
  console.log("Initial search term:", initialSearchTerm);

  const renderizarProductos = (lista) => {
    console.log("Rendering products:", lista.length, "items");
    contenedor.innerHTML = "";
    if (lista.length === 0) {
      contenedor.innerHTML = `<p class="text-danger text-center">No se encontraron productos.</p>`;
      return;
    }
    lista.forEach((producto) => {
      console.log("Processing product:", producto.titulo);
      const col = document.createElement("div");
      col.className = "col-md-4 col-sm-6 mb-4";

      const frases = producto.descripcion?.split(/[.!?]\s/).slice(0, 2).join(". ") + "." || "Sin descripción.";
      const imageId = producto.imagen1?.includes("/d/") ? producto.imagen1.split("/d/")[1]?.split("/")[0] : producto.imagen1;
      const imageUrl = producto.imagen1?.includes("/d/")
        ? `https://drive.google.com/thumbnail?id=${imageId}&sz=w800-h600`
        : producto.imagen1 || "/images/placeholder.png";

      const card = document.createElement("div");
      card.className = "card h-100 shadow-sm position-relative";
      card.innerHTML = `
        <div class="product-card-content">
          <div class="product-image-wrapper">
            <img src="${imageUrl}" class="card-img-top product-image" alt="${producto.titulo || 'Producto'}">
          </div>
          <div class="product-details">
            <h5 class="card-title">${producto.titulo || 'Sin título'}</h5>
            <p class="card-text product-description" id="desc-${producto.id || Math.random().toString(36).substr(2, 9)}">
              ${frases}
              <span class="ver_mas" data-id="${producto.id || Math.random().toString(36).substr(2, 9)}">ver +</span>
            </p>
            <p class="card-text text-muted">Precio: €${producto.precio || 'N/A'}</p>
          </div>
        </div>
        <div class="card-footer">
          <div class="quantity-control">
            <button class="btn quantity-btn">-</button>
            <span class="quantity-display">0</span>
            <button class="btn quantity-btn">+</button>
          </div>
          <div class="add-btn-container">
            <button class="btn add-btn">Añadir</button>
          </div>
        </div>
      `;

      const quantityDisplay = card.querySelector(".quantity-display");
      const minusBtn = card.querySelector(".quantity-btn:first-child");
      const plusBtn = card.querySelector(".quantity-btn:last-child");

      function updateQuantity() {
        const current = parseInt(quantityDisplay.textContent);
        minusBtn.style.visibility = current <= 0 ? "hidden" : "visible";
      }

      minusBtn.addEventListener("click", () => {
        const current = parseInt(quantityDisplay.textContent);
        if (current > 0) quantityDisplay.textContent = current - 1;
        updateQuantity();
      });

      plusBtn.addEventListener("click", () => {
        const current = parseInt(quantityDisplay.textContent);
        quantityDisplay.textContent = current + 1;
        updateQuantity();
      });

      updateQuantity();

      const addBtn = card.querySelector(".add-btn");
      addBtn.addEventListener("click", () => {
        const quantity = parseInt(quantityDisplay.textContent);
        if (quantity > 0) {
          const addToCartEvent = new CustomEvent("addToCart", {
            detail: {
              id: producto.id,
              name: producto.titulo,
              quantity: quantity,
              price: producto.precio
            }
          });
          document.dispatchEvent(addToCartEvent);
          console.log(`Added ${quantity} x ${producto.titulo} to cart`);
          sessionStorage.setItem("prevScrollY", window.scrollY);
          sessionStorage.setItem("prevURL", window.location.href);
          window.location.href = `/cesta_cliente.html?id=${producto.id}&quantity=${quantity}`;
        }
      });

      card.querySelector(".ver_mas").addEventListener("click", () => {
        sessionStorage.setItem("prevScrollY", window.scrollY);
        sessionStorage.setItem("prevURL", window.location.href);
        window.location.href = `/producto.html?id=${producto.id}`;
      });

      col.appendChild(card);
      contenedor.appendChild(col);
    });
  };

  function renderizarFlechas(lista) {
    const paginacion = productos.querySelector("#paginacion");
    paginacion.innerHTML = `
      <button class="category-pagination-btn prev-btn" ${currentPage === 1 ? "disabled" : ""}>⬅ Anterior</button>
      <span>pág ${currentPage} de ${totalPages}</span>
      <button class="category-pagination-btn next-btn" ${currentPage === totalPages ? "disabled" : ""}>Siguiente ➡</button>
    `;

    paginacion.querySelector(".prev-btn").onclick = () => {
      if (currentPage > 1) {
        currentPage--;
        paginar(lista, currentPage);
      }
    };

    paginacion.querySelector(".next-btn").onclick = () => {
      if (currentPage < totalPages) {
        currentPage++;
        paginar(lista, currentPage);
      }
    };
  }

  function paginar(lista, pagina) {
    totalPages = Math.ceil(lista.length / itemsPerPage);
    const inicio = (pagina - 1) * itemsPerPage;
    const fin = inicio + itemsPerPage;
    renderizarProductos(lista.slice(inicio, fin));
    renderizarFlechas(lista);
  }

  async function fetchProductos(searchTerm = "") {
    console.log("Fetching products with search term:", searchTerm);
    try {
      const res = searchTerm
        ? await fetch("https://proyectorailway-production-9739.up.railway.app/buscar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ consulta: searchTerm })
          })
        : await fetch("https://proyectorailway-production-9739.up.railway.app/datos");
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      console.log("API response:", data);
      dataOriginal = Array.isArray(data)
        ? data.map((item) => ({
            id: item.id || Math.random().toString(36).substr(2, 9),
            titulo: item.titulo || item.name || "Sin título",
            precio: item.precio || item.price || 0,
            descripcion: item.descripcion || item.description || "Sin descripción",
            imagen1: item.imagen1 || item.image || "/images/placeholder.png",
            category: item.category || "Otros"
          }))
        : [];
      if (dataOriginal.length === 0) throw new Error("No products in API response");
      paginar(dataOriginal, currentPage);
    } catch (error) {
      console.error("Error loading products:", error);
      dataOriginal = fallbackProducts;
      paginar(dataOriginal, currentPage);
      contenedor.innerHTML += `<p class="text-danger text-center">Usando datos de respaldo debido a un error: ${error.message}</p>`;
    }
  }

  // Expose fetchProductos for use by CategoryNavbar.js
  productos.fetchProductos = fetchProductos;
  productos.getDataOriginal = () => dataOriginal;
  productos.paginar = paginar;
  productos.setCurrentPage = (page) => { currentPage = page; };

  await fetchProductos(initialSearchTerm);

  console.log("Productos component returning:", productos.nodeType);
  return productos;
}