function injectEmpanadasStyles() {
  if (document.getElementById('empanadas-styles')) return;
  const style = document.createElement('style');
  style.id = 'empanadas-styles';
  style.textContent = `
    .empanadas-btn-flotante {
      position: fixed;
      bottom: 70px;
      right: 24px;
      background: #222;
      color: #fff;
      border: none;
      padding: 12px 20px;
      border-radius: 8px;
      cursor: pointer;
      z-index: 1100;
      opacity: 0.7;
      transition: filter 0.2s, transform 0.2s, opacity 0.2s;
    }
    .empanadas-btn-flotante:hover {
      opacity: 1;
      filter: brightness(2);
      transform: scale(1.13);
    }
    .cart-popup {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 350px;
      background: #fff;
      color: #000;
      padding: 15px;
      border-radius: 12px;
      box-shadow: 0 4px 16px rgb(0, 0, 0);
      z-index: 1200;
      display: none;
    }
    .cart-popup.active {
      display: block;
    }
    .cart-popup h3 {
      text-align: center;
      margin-bottom: 10px;
    }
    .cart-popup ul {
      list-style: none;
      padding: 0;
    }
    .cart-popup li {
      padding: 5px 0;
      border-bottom: 1px solid #ccc;
    }
    .cart-popup .cesta-details {
      margin-left: 10px;
      font-size: 0.9rem;
    }
    .cart-popup .cesta-details li {
      border: none;
      padding: 2px 0;
    }
    .cart-popup .close-btn {
      background: #c0392b;
      color: #fff;
      border: none;
      padding: 5px 10px;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 10px;
      display: block;
      margin-left: auto;
    }
    .cart-popup .close-btn:hover {
      opacity: 1;
      filter: brightness(1.3);
      transform: scale(1.13);
    }
    .cart-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1100;
      display: none;
    }
    .cart-overlay.active {
      display: block;
    }
  `;
  document.head.appendChild(style);
}

injectEmpanadasStyles();

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
      
      let imageUrl = "/images/logo1.png";
      if (producto.imagen1) {
        console.log("Raw imagen1 for", producto.titulo, ":", producto.imagen1);
        if (producto.imagen1.includes("drive.google.com")) {
          const driveRegex = /\/d\/([a-zA-Z0-9_-]+)|id=([a-zA-Z0-9_-]+)/;
          const match = producto.imagen1.match(driveRegex);
          if (match && (match[1] || match[2])) {
            imageUrl = `https://drive.google.com/thumbnail?id=${match[1] || match[2]}&sz=w800-h600`;
          } else {
            imageUrl = producto.imagen1;
            console.warn("Failed to parse Google Drive ID for", producto.titulo, "using raw URL:", imageUrl);
          }
        } else if (producto.imagen1.startsWith("/images/")) {
          imageUrl = producto.imagen1;
        } else {
          imageUrl = producto.imagen1;
        }
        console.log("Constructed image URL for", producto.titulo, ":", imageUrl);
      }

      const card = document.createElement("div");
      card.className = "card h-100 shadow-sm position-relative";

      const cardContent = document.createElement("div");
      cardContent.className = "product-card-content";

      const imageWrapper = document.createElement("div");
      imageWrapper.className = "product-image-wrapper";

      const img = document.createElement("img");
      img.className = "card-img-top product-image";
      img.src = imageUrl;
      img.alt = producto.titulo || 'Producto';
      img.onerror = () => {
        console.error(`Failed to load image for ${producto.titulo}: ${imageUrl}, using fallback`);
        img.src = "/images/logo1.png";
      };

      imageWrapper.appendChild(img);

      const details = document.createElement("div");
      details.className = "product-details";

      const title = document.createElement("h3");
      title.className = "card-title";
      title.textContent = producto.titulo || 'Sin título';

      const descriptionWrapper = document.createElement("p");
      descriptionWrapper.className = "product-description";
      descriptionWrapper.id = `desc-${producto.id || Math.random().toString(36).substr(2, 9)}`;

      const descriptionText = document.createElement("span");
      descriptionText.className = "description-text";
      descriptionText.textContent = frases;

      const verMasLink = document.createElement("span");
      verMasLink.className = "ver-mas-link";
      verMasLink.innerHTML = `<a href="/producto.html?id=${producto.id || Math.random().toString(36).substr(2, 9)}" class="ver_mas">ver +</a>`;

      descriptionWrapper.appendChild(descriptionText);
      descriptionWrapper.appendChild(verMasLink);

      const price = document.createElement("p");
      price.className = "card-text text-muted";
      price.textContent = `Precio: €${producto.precio || 'N/A'}`;

      details.appendChild(title);
      details.appendChild(descriptionWrapper);
      details.appendChild(price);

      const cardFooter = document.createElement("div");
      cardFooter.className = "card-footer d-flex flex-wrap justify-content-between align-items-center";

      const quantityControl = document.createElement("div");
      quantityControl.className = "quantity-control";

      const minusBtn = document.createElement("button");
      minusBtn.className = "btn quantity-btn";
      minusBtn.textContent = '-';

      const quantityDisplay = document.createElement("span");
      quantityDisplay.className = "quantity-display";
      quantityDisplay.textContent = '0';

      const plusBtn = document.createElement("button");
      plusBtn.className = "btn quantity-btn";
      plusBtn.textContent = '+';

      quantityControl.appendChild(minusBtn);
      quantityControl.appendChild(quantityDisplay);
      quantityControl.appendChild(plusBtn);

      const addBtnContainer = document.createElement("div");
      addBtnContainer.className = "add-btn-container";

      const addBtn = document.createElement("button");
      addBtn.className = "btn add-btn";
      addBtn.textContent = "Añadir";

      addBtnContainer.appendChild(addBtn);
      cardFooter.appendChild(quantityControl);
      cardFooter.appendChild(addBtnContainer);

      cardContent.appendChild(imageWrapper);
      cardContent.appendChild(details);
      card.appendChild(cardContent);
      card.appendChild(cardFooter);

      col.appendChild(card);
      contenedor.appendChild(col);

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

      addBtn.addEventListener("click", () => {
        const quantity = parseInt(quantityDisplay.textContent);
        if (quantity > 0) {
          const cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
          const existingItem = cart.find(item => item.id === producto.id && !item.type);
          if (existingItem) {
            existingItem.quantity += quantity;
          } else {
            cart.push({ id: producto.id, name: producto.titulo, quantity: quantity, price: producto.precio, type: 'product' });
          }
          sessionStorage.setItem('cart', JSON.stringify(cart));
          console.log(`Added ${quantity} x ${producto.titulo} to cart`);
          sessionStorage.setItem("prevScrollY", window.scrollY);
          sessionStorage.setItem("prevURL", window.location.href);
          window.location.href = `/cesta_cliente.html?id=${producto.id}&quantity=${quantity}`;
        }
      });

      verMasLink.querySelector(".ver_mas").addEventListener("click", (e) => {
        e.preventDefault();
        sessionStorage.setItem("prevScrollY", window.scrollY);
        sessionStorage.setItem("prevURL", window.location.href);
        window.location.href = `/producto.html?id=${producto.id}`;
      });
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
    console.log(`Paginando: page ${pagina}, total items: ${lista.length}`);
    totalPages = Math.ceil(lista.length / itemsPerPage);
    const inicio = (pagina - 1) * itemsPerPage;
    const fin = inicio + itemsPerPage;
    renderizarProductos(lista.slice(inicio, fin));
    renderizarFlechas(lista);
    console.log(`Rendered page ${pagina} of ${totalPages}`);
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
        ? data.map((item) => {
            console.log("Processing API item:", item);
            let imagen1 = item.imagen1 || item.image || "/images/logo1.png";
            if (imagen1 && imagen1.includes("drive.google.com")) {
              const driveRegex = /\/d\/([a-zA-Z0-9_-]+)|id=([a-zA-Z0-9_-]+)/;
              const match = imagen1.match(driveRegex);
              if (match && (match[1] || match[2])) {
                imagen1 = `https://drive.google.com/thumbnail?id=${match[1] || match[2]}&sz=w800-h600`;
                console.log("Converted Google Drive imagen1 to:", imagen1);
              } else {
                console.warn("Failed to parse Google Drive ID for", item.titulo || item.name, "using raw URL:", imagen1);
              }
            } else if (imagen1 && !imagen1.startsWith("/images/") && !imagen1.startsWith("http")) {
              console.warn("Invalid imagen1 format for", item.titulo || item.name, ":", imagen1, "using fallback");
              imagen1 = "/images/logo1.png";
            }
            return {
              id: item.id || Math.random().toString(36).substr(2, 9),
              titulo: item.titulo || item.name || "Sin título",
              precio: item.precio || item.price || 0,
              descripcion: item.descripcion || item.description || "Sin descripción",
              imagen1: imagen1,
              category: item.category || "Otros"
            };
          })
        : [];
      if (dataOriginal.length === 0) throw new Error("No products in API response");
      console.log("Products fetched successfully:", dataOriginal);
      paginar(dataOriginal, currentPage);
    } catch (error) {
      console.error("Error loading products:", error);
      dataOriginal = fallbackProducts;
      paginar(dataOriginal, currentPage);
      contenedor.innerHTML += `<p class="text-danger text-center">Usando datos de respaldo debido a un error: ${error.message}</p>`;
    }
  }

  function crearBotonVerCarro() {
    if (document.getElementById('btn-flotante-ver-carro')) return;
    const btnVerCarro = document.createElement('button');
    btnVerCarro.id = 'btn-flotante-ver-carro';
    btnVerCarro.textContent = "🛒";
    btnVerCarro.className = "empanadas-btn-flotante";
    btnVerCarro.style.bottom = "120px";
    btnVerCarro.style.padding = "10px";
    btnVerCarro.style.fontSize = "24px";
    btnVerCarro.title = "Ver Carro";

    const overlay = document.createElement('div');
    overlay.className = 'cart-overlay';
    const popup = document.createElement('div');
    popup.className = 'cart-popup';
    popup.innerHTML = `
      <h3>Carrito</h3>
      <ul id="cart-items"></ul>
      <button class="close-btn">Cerrar</button>
    `;
    document.body.appendChild(overlay);
    document.body.appendChild(popup);

    btnVerCarro.addEventListener('click', () => {
      const cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
      const cartItems = popup.querySelector('#cart-items');
      if (cart.length === 0) {
        cartItems.innerHTML = '<li>El carrito está vacío</li>';
      } else {
        cartItems.innerHTML = cart.map(item => {
          if (item.type === 'cesta') {
            // Display cesta item with ingredients
            return `
              <li>
                ${item.name} - ${item.quantity} x €${item.price} = €${item.quantity * item.price}
                <ul class="cesta-details">
                  ${item.ingredients.map(ing => `
                    <li>${ing.name}: ${ing.selected} (de ${ing.place}, por ${ing.supplier})</li>
                  `).join('')}
                </ul>
              </li>
            `;
          } else {
            // Display regular product
            return `<li>${item.name} - ${item.quantity} x €${item.price} = €${item.quantity * item.price}</li>`;
          }
        }).join('');
      }
      popup.classList.add('active');
      overlay.classList.add('active');
    });

    overlay.addEventListener('click', () => {
      popup.classList.remove('active');
      overlay.classList.remove('active');
    });

    popup.querySelector('.close-btn').addEventListener('click', () => {
      popup.classList.remove('active');
      overlay.classList.remove('active');
    });

    document.body.appendChild(btnVerCarro);
  }

  crearBotonVerCarro();

  productos.fetchProductos = fetchProductos;
  productos.getDataOriginal = () => dataOriginal;
  productos.paginar = paginar;
  productos.setCurrentPage = (page) => { 
    console.log(`Setting current page to ${page}`);
    currentPage = page; 
  };

  await fetchProductos(initialSearchTerm);

  console.log("Productos component returning:", productos.nodeType);
  return productos;
}