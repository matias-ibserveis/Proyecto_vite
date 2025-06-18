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
      box-shadow: 0 2px 8px rgba(0,0,0,0.12);
    }
    .empanadas-btn-flotante:hover {
      opacity: 1;
      filter: brightness(1.3);
      transform: scale(1.09);
    }
    .cart-popup {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 540px;
      max-width: 99vw;
      max-height: 88vh;
      background: #fff;
      color: #222;
      padding: 28px 22px 18px 22px;
      border-radius: 20px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.18);
      z-index: 1200;
      display: none;
      overflow: visible;
      font-family: inherit;
    }
    .cart-popup.active {
      display: block;
      animation: cartPopupIn 0.18s;
    }
    @keyframes cartPopupIn {
      from { opacity: 0; transform: translate(-50%, -60%) scale(0.98);}
      to { opacity: 1; transform: translate(-50%, -50%) scale(1);}
    }
    .cart-popup h3 {
      text-align: center;
      margin-bottom: 14px;
      font-size: 1.35rem;
      font-weight: 600;
      letter-spacing: 0.5px;
      color: #1a1a1a;
    }
    .cart-popup ul {
      list-style: none;
      padding: 0;
      margin: 0;
      max-height: 54vh;
      overflow-y: auto;
    }
    .cart-popup li {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 12px 12px 12px 0;
      border-bottom: 1px solid #ececec;
      min-height: 72px;
      font-size: 1.08rem;
      background: none;
      position: relative;
      transition: background 0.15s;
    }
    .cart-popup li:last-child {
      border-bottom: none;
    }
    .cart-popup li:hover {
      background: #f8f8f8;
    }
    .cart-popup .cart-img {
      width: 64px;
      height: 64px;
      object-fit: cover;
      border-radius: 10px;
      flex-shrink: 0;
      background: #f2f2f2;
      margin-right: 2px;
      border: 1px solid #eee;
      display: block;
    }
    .cart-popup .cart-item-content {
      flex: 1 1 auto;
      min-width: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      overflow: hidden;
    }
    .cart-popup .cart-item-title {
      font-weight: 500;
      font-size: 1.08em;
      color: #222;
      margin-bottom: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 220px;
    }
    .cart-popup .cart-item-price {
      font-size: 1em;
      color: #444;
      margin-top: 1px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 220px;
    }
    .cart-popup .remove-cart-item {
      position: absolute;
      top: 10px;
      right: 10px;
      background: none;
      border: none;
      color: #e74c3c;
      font-size: 1.25em;
      cursor: pointer;
      padding: 2px 8px;
      border-radius: 50%;
      transition: background 0.15s, color 0.15s;
      line-height: 1;
      z-index: 2;
    }
    .cart-popup .remove-cart-item:hover {
      background: #ffeaea;
      color: #b71c1c;
    }
    .cart-popup .cesta-details {
      margin-left: 0;
      font-size: 0.93rem;
      color: #666;
      margin-top: 2px;
    }
    .cart-popup .cesta-details li {
      border: none;
      padding: 2px 0;
    }
    .cart-popup .close-btn {
      background: #c0392b;
      color: #fff;
      border: none;
      padding: 10px 24px;
      border-radius: 6px;
      cursor: pointer;
      margin-top: 18px;
      display: block;
      margin-left: auto;
      font-size: 1.12rem;
      font-weight: 500;
      box-shadow: 0 1px 4px rgba(0,0,0,0.07);
      transition: background 0.18s;
    }
    .cart-popup .close-btn:hover {
      background: #a93226;
    }
    .cart-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.35);
      z-index: 1100;
      display: none;
    }
    .cart-overlay.active {
      display: block;
    }
    .cart-popup .cart-nav {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1.2rem;
      margin: 14px 0 0 0;
    }
    .cart-popup .cart-nav-btn {
      background: #f2f2f2;
      border: none;
      color: #333;
      font-size: 1.18rem;
      border-radius: 5px;
      padding: 7px 18px;
      cursor: pointer;
      transition: background 0.18s, color 0.18s;
      font-weight: 500;
    }
    .cart-popup .cart-nav-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      color: #aaa;
    }
    .cart-popup #cart-page {
      font-size: 1.04rem;
      color: #444;
      font-weight: 500;
      letter-spacing: 0.2px;
    }
    @media (max-width: 700px) {
      .cart-popup {
        width: 99vw;
        min-width: 0;
        padding: 8px 2vw 8px 2vw;
        border-radius: 12px;
      }
      .cart-popup h3 {
        font-size: 1.1rem;
      }
      .cart-popup li {
        font-size: 0.97rem;
        min-height: 48px;
        padding-right: 6vw;
      }
      .cart-popup .cart-img {
        width: 44px;
        height: 44px;
      }
      .cart-popup .cart-item-title,
      .cart-popup .cart-item-price {
        max-width: 60vw;
      }
      .cart-popup .close-btn {
        font-size: 0.97rem;
        padding: 7px 12px;
      }
      .cart-popup .cart-nav {
        gap: 0.7rem;
      }
    }
    @media (max-width: 400px) {
      .cart-popup {
        padding: 4px 1vw 4px 1vw;
      }
      .cart-popup .cart-img {
        width: 32px;
        height: 32px;
      }
      .cart-popup .cart-item-title,
      .cart-popup .cart-item-price {
        max-width: 40vw;
      }
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

  function createProductPopup(producto) {
    const overlay = document.createElement('div');
    overlay.className = 'product-overlay';

    const popup = document.createElement('div');
    popup.className = 'product-popup';
    
    // Construct image URL (consistent with existing logic)
    let imageUrl = producto.imagen1 || '/images/logo1.png';
    if (imageUrl.includes('drive.google.com')) {
      const driveRegex = /\/d\/([a-zA-Z0-9_-]+)|id=([a-zA-Z0-9_-]+)/;
      const match = imageUrl.match(driveRegex);
      if (match && (match[1] || match[2])) {
        imageUrl = `https://drive.google.com/thumbnail?id=${match[1] || match[2]}&sz=w300-h300`;
      }
    }

    popup.innerHTML = `
      <div class="product-popup-content">
        <span class="product-popup-close">×</span>
        <img class="product-popup-image" src="${imageUrl}" alt="${producto.titulo || 'Producto'}" />
        <h3 class="product-popup-title">${producto.titulo || 'Sin título'}</h3>
        <p class="product-popup-description">${producto.descripcion || 'Sin descripción.'}</p>
        <p class="product-popup-price">Precio: €${producto.precio || 'N/A'}</p>
        <div class="quantity-control">
          <button class="btn quantity-btn" data-action="minus">-</button>
          <span class="quantity-display">1</span>
          <button class="btn quantity-btn" data-action="plus">+</button>
        </div>
        <div class="add-btn-container">
          <button class="btn add-btn">Añadir</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(popup);

    // Handle close button
    const closeBtn = popup.querySelector('.product-popup-close');
    closeBtn.addEventListener('click', () => {
      popup.remove();
      overlay.remove();
    });

    // Handle overlay click to close
    overlay.addEventListener('click', () => {
      popup.remove();
      overlay.remove();
    });

    // Quantity controls and price update
    const quantityDisplay = popup.querySelector('.quantity-display');
    const minusBtn = popup.querySelector('[data-action="minus"]');
    const plusBtn = popup.querySelector('[data-action="plus"]');
    const priceElement = popup.querySelector('.product-popup-price');
    const basePrice = producto.precio || 0;

    function updateQuantity() {
      const current = parseInt(quantityDisplay.textContent);
      minusBtn.style.visibility = current <= 1 ? 'hidden' : 'visible'; // Hide at 1
      // Update price display based on quantity
      const totalPrice = basePrice * current;
      priceElement.textContent = `Precio: €${totalPrice.toFixed(2)}`;
    }

    minusBtn.addEventListener('click', () => {
      const current = parseInt(quantityDisplay.textContent);
      if (current > 1) quantityDisplay.textContent = current - 1; // Prevent going below 1
      updateQuantity();
    });

    plusBtn.addEventListener('click', () => {
      const current = parseInt(quantityDisplay.textContent);
      quantityDisplay.textContent = current + 1;
      updateQuantity();
    });

    updateQuantity();

    // Add to cart
addBtn.addEventListener("click", () => {
  const quantity = parseInt(quantityDisplay.textContent);
  if (quantity > 0) {
    const cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === producto.id && item.type === 'product');
    // Usa la misma lógica de imageUrl que usas para mostrar la imagen
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
        imagen1: imageUrl // <-- Aquí la ruta correcta
      });
    }
    sessionStorage.setItem('cart', JSON.stringify(cart));
    quantityDisplay.textContent = '1'; // Reset to 1
    updateQuantity();
  }
});
  }

  function renderizarProductos(lista) {
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

      const verMasBtn = document.createElement("button");
      verMasBtn.className = "ver-mas-btn";
      verMasBtn.textContent = "Ver +";

      // Store base price and initialize price display
      const basePrice = producto.precio || 0;
      const price = document.createElement("p");
      price.className = "card-text text-muted";
      price.textContent = `Precio: €${basePrice.toFixed(2)}`;

      descriptionWrapper.appendChild(descriptionText);
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
      quantityDisplay.textContent = '1'; // Start at 1

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
        minusBtn.style.visibility = current <= 1 ? "hidden" : "visible"; // Hide at 1
        // Update price display based on quantity
        const totalPrice = basePrice * current;
        price.textContent = `Precio: €${totalPrice.toFixed(2)}`;
      }

      minusBtn.addEventListener("click", () => {
        const current = parseInt(quantityDisplay.textContent);
        if (current > 1) quantityDisplay.textContent = current - 1; // Prevent going below 1
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
    const existingItem = cart.find(item => item.id === producto.id && item.type === 'product');
    // Usa la misma lógica de imageUrl que usas para mostrar la imagen
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
        imagen1: imageUrl // <-- Aquí la ruta correcta
      });
    }
    sessionStorage.setItem('cart', JSON.stringify(cart));
    quantityDisplay.textContent = '1'; // Reset to 1
    updateQuantity();
  }
});

      verMasBtn.addEventListener("click", () => {
        createProductPopup(producto);
      });
    });
  }

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
  contenedor.innerHTML = `
    <div class="no-result-container" style="text-align:center; margin: 2em 0;">
      <img src="/images/Sorry.png" alt="Sin resultados" style="width:200px;margin-bottom:1em;">
      <div class="no-result-text">No se encontró el producto que usted deseaba<br> ya que no lo Tenemos en Lista de Venta en estos momentos...<br><br><br> Si desea agregarlo puede mandarnos un escrito por Whatsapp.😊😊</div>
    </div>
  `;
  productos.querySelector("#paginacion").innerHTML = "";
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
      <div class="cart-nav" style="display:none;">
        <button class="cart-nav-btn" id="cart-prev">⬅</button>
        <span id="cart-page"></span>
        <button class="cart-nav-btn" id="cart-next">➡</button>
      </div>
      <button class="close-btn">Cerrar</button>
    `;
    document.body.appendChild(overlay);
    document.body.appendChild(popup);

    // Navigation logic
    const ITEMS_PER_PAGE = 6;
    let cartPage = 1;

    function getProductImage(item) {
      if (item.imagen1) return item.imagen1;
      if (window.dataOriginal && Array.isArray(window.dataOriginal)) {
        const found = window.dataOriginal.find(p => p.id === item.id);
        if (found && found.imagen1) return found.imagen1;
      }
      return "/images/logo1.png";
    }

    function renderCartPopup() {
      const cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
      const cartItems = popup.querySelector('#cart-items');
      const nav = popup.querySelector('.cart-nav');
      const prevBtn = popup.querySelector('#cart-prev');
      const nextBtn = popup.querySelector('#cart-next');
      const pageSpan = popup.querySelector('#cart-page');

      // Expose dataOriginal for image lookup
      window.dataOriginal = window.dataOriginal || (typeof dataOriginal !== "undefined" ? dataOriginal : []);

      if (cart.length === 0) {
        cartItems.innerHTML = '<li>El carrito está vacío</li>';
        nav.style.display = "none";
      } else {
        const totalPages = Math.ceil(cart.length / ITEMS_PER_PAGE);
        cartPage = Math.max(1, Math.min(cartPage, totalPages));
        const start = (cartPage - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        const pageItems = cart.slice(start, end);

        cartItems.innerHTML = pageItems.map((item, idx) => {
          const realIdx = start + idx;
          let imgSrc = getProductImage(item);
          // If Google Drive, convert to thumbnail
          if (imgSrc && imgSrc.includes("drive.google.com")) {
            const driveRegex = /\/d\/([a-zA-Z0-9_-]+)|id=([a-zA-Z0-9_-]+)/;
            const match = imgSrc.match(driveRegex);
            if (match && (match[1] || match[2])) {
              imgSrc = `https://drive.google.com/thumbnail?id=${match[1] || match[2]}&sz=w300-h300`;
            }
          }
          if (item.type === 'cesta') {
            return `
              <li>
                <img class="cart-img" src="${imgSrc}" alt="${item.name}" />
                <div class="cart-item-content">
                  <span class="cart-item-title">${item.name}</span>
                  <span class="cart-item-price">€${item.price}</span>
                  <ul class="cesta-details">
                    ${item.ingredients.map(ing => `
                      <li>${ing.name}: ${ing.selected} (de ${ing.place}, por ${ing.supplier})</li>
                    `).join('')}
                  </ul>
                </div>
                <button class="remove-cart-item" data-idx="${realIdx}">✕</button>
              </li>
            `;
          } else {
            return `<li>
              <img class="cart-img" src="${imgSrc}" alt="${item.name}" />
              <div class="cart-item-content">
                <span class="cart-item-title">${item.name}</span>
                <span class="cart-item-price">${item.quantity} x €${item.price} = €${(item.quantity * item.price).toFixed(2)}</span>
              </div>
              <button class="remove-cart-item" data-idx="${realIdx}">✕</button>
            </li>`;
          }
        }).join('');

        // Navigation controls
        if (totalPages > 1) {
          nav.style.display = "flex";
          pageSpan.textContent = `Página ${cartPage} de ${totalPages}`;
          prevBtn.disabled = cartPage === 1;
          nextBtn.disabled = cartPage === totalPages;
        } else {
          nav.style.display = "none";
        }

        // Remove buttons
        cartItems.querySelectorAll('.remove-cart-item').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const idx = parseInt(btn.getAttribute('data-idx'));
            cart.splice(idx, 1);
            sessionStorage.setItem('cart', JSON.stringify(cart));
            // If removing last item on page, go to previous page if needed
            if ((cartPage - 1) * ITEMS_PER_PAGE >= cart.length && cartPage > 1) {
              cartPage--;
            }
            renderCartPopup();
            e.stopPropagation();
          });
        });

        prevBtn.onclick = () => {
          if (cartPage > 1) {
            cartPage--;
            renderCartPopup();
          }
        };
        nextBtn.onclick = () => {
          const totalPages = Math.ceil(cart.length / ITEMS_PER_PAGE);
          if (cartPage < totalPages) {
            cartPage++;
            renderCartPopup();
          }
        };
      }
    }

    btnVerCarro.addEventListener('click', () => {
      cartPage = 1;
      renderCartPopup();
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