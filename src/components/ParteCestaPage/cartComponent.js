export function CartComponent() {
  const cartContainer = document.createElement('div');
  cartContainer.classList.add('cart-container');

  // --- INYECTA CSS DE ANIMACIÓN SOLO UNA VEZ ---
  if (!document.getElementById('cart-panel-anim-style')) {
    const style = document.createElement('style');
    style.id = 'cart-panel-anim-style';
    style.textContent = `
.left-panel {
  animation: leftPanelIn 0.8s cubic-bezier(.4,0,.2,1) both;
}
@keyframes leftPanelIn {
  from { opacity: 0; transform: translateX(-60px);}
  to   { opacity: 1; transform: translateX(0);}
}
.right-panel {
  animation: rightPanelIn 0.8s cubic-bezier(.4,0,.2,1) both;
}
@keyframes rightPanelIn {
  from { opacity: 0; transform: translateX(60px);}
  to   { opacity: 1; transform: translateX(0);}
}
    `;
    document.head.appendChild(style);
  }

  // --- LIGHTBOX SOLO UNA VEZ ---
  if (!document.getElementById('cesta-lightbox')) {
    const lightbox = document.createElement('div');
    lightbox.id = 'cesta-lightbox';
    lightbox.style.position = 'fixed';
    lightbox.style.top = '0';
    lightbox.style.left = '0';
    lightbox.style.width = '100vw';
    lightbox.style.height = '100vh';
    lightbox.style.background = 'rgba(0,0,0,0.7)';
    lightbox.style.display = 'none';
    lightbox.style.alignItems = 'center';
    lightbox.style.justifyContent = 'center';
    lightbox.style.zIndex = '9999';

    const img = document.createElement('img');
    img.id = 'cesta-lightbox-img';
    img.style.maxWidth = '90vw';
    img.style.maxHeight = '90vh';
    img.style.borderRadius = '16px';
    img.style.boxShadow = '0 4px 32px rgba(0,0,0,0.3)';
    lightbox.appendChild(img);

    lightbox.addEventListener('click', () => {
      lightbox.style.display = 'none';
    });

    document.body.appendChild(lightbox);
  }

  // --- POPUP SOLO UNA VEZ ---
  if (!document.getElementById('cart-popup')) {
    const popup = document.createElement('div');
    popup.id = 'cart-popup';
    popup.className = 'cart-popup';
    popup.style.display = 'none';
    popup.innerHTML = `
      <div class="cart-popup-content">
        <button class="cart-popup-close" title="Cerrar">&times;</button>
        <img class="cart-popup-image" src="" alt="Cesta" style="width:120px;height:120px;object-fit:cover;border-radius:12px;margin-bottom:12px;">
        <h3 class="cart-popup-name" style="margin:0 0 12px 0;"></h3>
        <div class="cart-popup-ingredients" style="max-height:180px;overflow-y:auto;width:100%;margin-bottom:18px;"></div>
        <button class="comprar-btn">Comprar</button>
        <button class="continue-productos-link" style="margin-top:8px;">Seguir comprando</button>
      </div>
    `;
    document.body.appendChild(popup);
  }

  // --- FUNCION PARA TRANSFORMAR URL DE GOOGLE DRIVE ---
function getDriveDirectUrl(url) {
  const match = url.match(/\/d\/([^/]+)(?:\/|$)/);
  if (match) {
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w800-h600`;
  }
  return url;
}

  // --- SIMPLE: OBTENER FOTO DE LA API ---
  async function getFotoAPI() {
    try {
      const res = await fetch('https://api-proyecto-lura-enviar-cesta-production.up.railway.app/api/cestas_productos');
      const data = await res.json();
      console.log('API Response:', data); // Para debug
      if (data.length > 0 && data[0].foto) {
        console.log('URL original de la API:', data[0].foto);
        // Convertir URL de Google Drive si es necesario
        const fotoConvertida = getDriveDirectUrl(data[0].foto);
        console.log('URL convertida para mostrar:', fotoConvertida);
        return fotoConvertida; // SIEMPRE usar la foto de la API convertida
      }
      console.log('No foto found in API');
      return null; // No hay foto, devolver null
    } catch (err) {
      console.error('Error fetching foto from API:', err);
      return null; // Error, devolver null
    }
  }

  // --- NUEVO: CARGA INGREDIENTES DESDE LA API ACTUALIZADA ---
  async function getCestaData() {
    try {
      const res = await fetch('https://corsproxy.io/?https://cooperative-unity-production.up.railway.app/api/crear_cesta');
      
      const data = await res.json();
      const fotoAPI = await getFotoAPI();
      return {
        image: fotoAPI || data.image || 'https://via.placeholder.com/250x250?text=Sin+Imagen',
        name: data.name || 'Cesta de la SEMANA',
        description: data.description || 'Incluye productos frescos de temporada seleccionados para ti.',
        price: data.price || 25
      };
    } catch (err) {
      console.error('Error en getCestaData:', err);
      const fotoAPI = await getFotoAPI();
      return {
        image: fotoAPI || 'https://via.placeholder.com/250x250?text=Sin+Imagen',
        name: 'Cesta de la SEMANA',
        description: 'Incluye productos frescos de temporada seleccionados para ti.',
        price: 25
      };
    }
  }

  // --- NUEVO: CARGA PRODUCTOS DE LA CESTA DESDE LA API /api/cestas ---
  async function getProductosCesta() {
    try {
      const res = await fetch('https://corsproxy.io/?https://cooperative-unity-production.up.railway.app/api/cestas');
      const data = await res.json();
      console.log('Datos de la API cestas:', data); // Para ver qué datos llegan
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.error('Error en getProductosCesta:', err);
      return [];
    }
  }

  async function renderCart() {
    cartContainer.innerHTML = '';

    // --- DATOS DE LA CESTA DESDE LA API ---
    const cestaData = await getCestaData();
    const productosCesta = await getProductosCesta();

    // Panel izquierdo
    const leftPanel = document.createElement('div');
    leftPanel.classList.add('left-panel');

    const cestaImage = document.createElement('img');
    cestaImage.src = cestaData.image;
    cestaImage.alt = cestaData.name;
    cestaImage.classList.add('cesta-image');
    cestaImage.style.cursor = 'zoom-in';
    leftPanel.appendChild(cestaImage);

    // --- LIGHTBOX EVENTO ---
    cestaImage.addEventListener('click', () => {
      const lightbox = document.getElementById('cesta-lightbox');
      const img = document.getElementById('cesta-lightbox-img');
      img.src = cestaImage.src;
      lightbox.style.display = 'flex';
    });

    const cestaName = document.createElement('h3');
    cestaName.textContent = cestaData.name;
    cestaName.classList.add('cesta-name');
    leftPanel.appendChild(cestaName);

    const cestaDesc = document.createElement('p');
    cestaDesc.textContent = cestaData.description;
    cestaDesc.classList.add('cesta-description');
    leftPanel.appendChild(cestaDesc);

    // Panel derecho
    const rightPanel = document.createElement('div');
    rightPanel.classList.add('right-panel');

    const ingredientsHeader = document.createElement('h3');
    ingredientsHeader.textContent = 'Contenido';
    ingredientsHeader.classList.add('ingredients-header');
    rightPanel.appendChild(ingredientsHeader);

    // --- LISTA DE PRODUCTOS DE LA CESTA (de la API /api/cestas) ---
    const productosList = document.createElement('ul');
    productosList.classList.add('ingredients-list');

    productosCesta.forEach(prod => {
      const li = document.createElement('li');
      li.classList.add('ingredient-item');

      // Imagen del producto CON ZOOM ⬅️ AQUÍ ESTÁN LOS CAMBIOS
      if (prod.imagen1) {
        const img = document.createElement('img');
        img.src = getDriveDirectUrl(prod.imagen1);
        img.alt = prod.titulo;
        img.style.width = '48px';
        img.style.height = '48px';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '8px';
        img.style.marginRight = '12px';
        img.style.cursor = 'zoom-in'; // ⬅️ AGREGAR CURSOR DE ZOOM
        
        // ⬅️ AGREGAR EVENTO CLICK PARA ZOOM
        img.addEventListener('click', (e) => {
          e.stopPropagation();
          const lightbox = document.getElementById('cesta-lightbox');
          const lightboxImg = document.getElementById('cesta-lightbox-img');
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          lightbox.style.display = 'flex';
        });
        
        li.appendChild(img);
      }

      // Nombre del producto
      const nameSpan = document.createElement('span');
      nameSpan.classList.add('ingredient-name');
      nameSpan.textContent = prod.titulo || '';
      nameSpan.style.flex = '1';
      li.appendChild(nameSpan);

      // Cantidad con unidad
      const qtySpan = document.createElement('span');
      qtySpan.classList.add('ingredient-qty');
      // Intentar obtener la unidad de medida del producto
      const unidad = prod.unidad_medida || prod.unidad_medido || '';
      const cantidad = prod.cantidad_producto || '';
      const textoCompleto = unidad ? `${cantidad} ${unidad}` : cantidad;
      qtySpan.textContent = textoCompleto;
      li.appendChild(qtySpan);

      productosList.appendChild(li);
    });

    rightPanel.appendChild(productosList);

    // Precio y botón
    const priceDiv = document.createElement('div');
    priceDiv.classList.add('cesta-price-div');
    priceDiv.innerHTML = `<span class="cesta-price">Precio: €${cestaData.price.toFixed(2)}</span>`;
    rightPanel.appendChild(priceDiv);

    const addToCartBtn = document.createElement('button');
    addToCartBtn.classList.add('add-to-cart-btn');
    addToCartBtn.textContent = 'Añadir al Carro';
    rightPanel.appendChild(addToCartBtn);

    // Estructura final
    cartContainer.appendChild(leftPanel);
    cartContainer.appendChild(rightPanel);

    // --- EVENTO AÑADIR AL CARRO ---
    addToCartBtn.addEventListener('click', () => {
      addCestaToCart(cestaData, productosCesta);

      // Muestra el popup
      const popup = document.getElementById('cart-popup');
      const popupImage = popup.querySelector('.cart-popup-image');
      const popupName = popup.querySelector('.cart-popup-name');
      const popupIngredients = popup.querySelector('.cart-popup-ingredients');

      popupImage.src = cestaData.image;
      popupName.textContent = cestaData.name;
      popupIngredients.innerHTML = '';

      // Leer el carrito real del sessionStorage
      const cart = JSON.parse(sessionStorage.getItem('cart') || '[]');

      // Mostrar solo los ingredientes de la última cesta añadida
      if (cart.length > 0) {
        const lastCesta = cart[cart.length - 1];
        (lastCesta.ingredients || []).forEach(ingredient => {
          if (ingredient && ingredient.titulo && ingredient.cantidad_producto) {
            const div = document.createElement('div');
            div.style.display = 'flex';
            div.style.justifyContent = 'space-between';
            div.style.alignItems = 'center';
            div.style.marginBottom = '8px';
            div.style.padding = '3px 0';
            div.style.borderRadius = '8px';
            div.style.background = '#fafbfc';

            // Imagen CON ZOOM
            if (ingredient.imagen1) {
              const img = document.createElement('img');
              img.src = getDriveDirectUrl(ingredient.imagen1);
              img.alt = ingredient.titulo;
              img.style.width = '32px';
              img.style.height = '32px';
              img.style.objectFit = 'cover';
              img.style.borderRadius = '6px';
              img.style.marginRight = '10px';
              img.style.cursor = 'zoom-in'; // ⬅️ CURSOR DE ZOOM
              
              // ⬅️ EVENTO CLICK PARA ZOOM
              img.addEventListener('click', (e) => {
                e.stopPropagation();
                const lightbox = document.getElementById('cesta-lightbox');
                const lightboxImg = document.getElementById('cesta-lightbox-img');
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightbox.style.display = 'flex';
              });
              
              div.appendChild(img);
            }

            // Nombre
            const nameSpan = document.createElement('span');
            nameSpan.textContent = ingredient.titulo;
            nameSpan.style.marginLeft = '8px';

            // Cantidad con unidad
            const qtySpan = document.createElement('span');
            const unidad = ingredient.unidad_medida || ingredient.unidad_medido || '';
            const cantidad = ingredient.cantidad_producto || '';
            const textoCompleto = unidad ? `${cantidad} ${unidad}` : cantidad;
            qtySpan.textContent = textoCompleto;
            qtySpan.style.fontWeight = 'bold';
            qtySpan.style.color = '#a05d36';
            qtySpan.style.marginRight = '8px';

            div.appendChild(nameSpan);
            div.appendChild(qtySpan);
            popupIngredients.appendChild(div);
          }
        });
      } else {
        popupIngredients.innerHTML = '<div>No hay productos en la cesta.</div>';
      }

      popup.style.display = 'flex';
    });
  }

  // --- FUNCION GUARDAR EN CARRITO ---
  function addCestaToCart(cestaData, productosCesta) {
    const cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
    const uniqueId = `cesta_${Date.now()}`;
    const newCesta = {
      id: uniqueId,
      name: cestaData.name,
      quantity: 1,
      price: cestaData.price,
      type: 'cesta',
      image: cestaData.image,
      ingredients: productosCesta.map(prod => ({
        titulo: prod.titulo,
        cantidad_producto: prod.cantidad_producto,
        imagen1: prod.imagen1,
        unidad_medida: prod.unidad_medida || prod.unidad_medido || 'kg'
      }))
    };
    cart.push(newCesta);
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }

  // --- EVENTOS POPUP ---
  document.body.addEventListener('click', function (e) {
    // Cerrar popup
    if (e.target.classList.contains('cart-popup-close')) {
      document.getElementById('cart-popup').style.display = 'none';
    }
    // Comprar
    if (e.target.classList.contains('comprar-btn')) {
      document.getElementById('cart-popup').style.display = 'none';
      window.location.href = '/checkout.html';
    }
    // Seguir comprando
    if (e.target.classList.contains('continue-productos-link')) {
      document.getElementById('cart-popup').style.display = 'none';
      window.location.href = '/producto.html';
    }
  });

  // --- CSS mínimo para que se vea bien (puedes moverlo a tu CSS global) ---
  if (!document.getElementById('cart-component-style')) {
    const style = document.createElement('style');
    style.id = 'cart-component-style';
    style.textContent = `
.cart-container {
  display: flex;
  gap: 42px;
  padding: 42px;
  justify-content: center;
  align-items: flex-start;
  max-width: 1050px;
  margin: 55px auto;
}
.left-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 290px;
  height: 658px
}
.right-panel {
  flex: 1 1 0;
  background: #fff;
  border-radius: 16px;
  padding: 32px 36px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-width: 290px;
  background: #f8f9fa;;
  border-radius: 20px;
}
.cesta-image {
  width: 250px;
  height: 250px;
  object-fit: cover;
  border-radius: 18px;
  background: #d2ab74;
  box-shadow: 0 3px 16px rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;
}
.cesta-name {
  font-size: 2rem;
  color: #a05d36;
  font-family: 'Aloja Extended', Arial, sans-serif;
  margin-top: 10px;
  margin-bottom: 0;
  font-weight: 600;
  text-align: center;
}
.cesta-description {
  font-size: 1.2rem;
  color: #7a653a;
  margin: 16px 0 0 0;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.02);
  border-radius: 10px;
  padding: 10px
}
.ingredients-header {
  font-size: 2.3rem;
  color: #a05d36;
  margin-bottom: 40px;
  font-family: 'Aloja Extended', Arial, sans-serif;
  background-color: rgba(0, 0, 0, 0.02);
  padding: 10px 0;
  border-radius: 10px;
}
.ingredients-list {
  list-style: none;
  padding: 0;
  margin: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0px 14px;
  border-radius: 10px;
}
.ingredient-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 13px 0;
  border-bottom: 1.5px solid #f0e6d2;
  font-size: 1.35rem;
  gap: 10px;
}
.comprar-btn,
.continue-productos-link {
  font-size: 1.7rem;
  text-align: center;
  font-weight: bold;
}
.comprar-btn {
  background: #d2ab74;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 28px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 4px;
  margin-top: 16px;
}
.comprar-btn:hover {
  background: #b8935b;
}
.continue-productos-link {
  background:rgb(211, 126, 92);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 28px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 4px;
}
.continue-btn:hover {
  background: #b8935b;
}
.cart-popup-ingredients {
  scrollbar-width: thin;
  scrollbar-color: #b8935b #f5f5f5;
}
.cart-popup-ingredients::-webkit-scrollbar {
  width: 8px;
  background: #f5f5f5;
  border-radius: 8px;
}
.cart-popup-ingredients::-webkit-scrollbar-thumb {
  background: #b8935b;
  border-radius: 8px;
}
.cart-popup-ingredients::-webkit-scrollbar-thumb:hover {
  background: #a07c3b;
}
.ingredient-name {
  color: #a05d36;
  font-size: 1.6rem;
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
}
.ingredient-qty {
  background: #d2ab74;
  color: #fff;
  border-radius: 8px;
  padding: 6px 18px;
  font-size: 1.2rem;
  font-weight: bold;
}
.cesta-price-div {
  margin-top: 32px;
  margin-bottom: 16px;
  text-align: right;
}
.cesta-price {
  font-size: 1.5rem;
  color: #a05d36;
  font-weight: bold;
}
.add-to-cart-btn {
  background:rgb(211, 126, 92);
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 16px 36px;
  font-size: 2.0rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
  box-shadow: 0 3px 10px rgba(210, 171, 116, 0.15);
  text-align: center;
  line-height: 1.2;
  width: 100%;
  letter-spacing: 1.2px;
}
.add-to-cart-btn:hover {
  background: #b8935b;
}
@media (max-width: 900px) {
  .right-panel {
    width: 100%;
  }
  .cart-container {
    gap: 18px;
    padding: 18px;
    max-width: 98vw;
  }
  .left-panel, .right-panel {
    min-width: 0;
  }
  .cesta-image {
    width: 200px;
    height: 200px;
    border-radius: 10px;
    margin-bottom: 10px;
  }
  .cesta-name {
    font-size: 1.1rem;
  }
  .cesta-description {
    font-size: 0.9rem;
  }
  .right-panel {
    padding: 12px 8px;
    border-radius: 8px;
  }
  .ingredients-header {
    font-size: 2rem;
    margin-bottom: 10px;
  }
  .ingredient-item,
  .ingredient-name {
    font-size: 0.95rem;
  }
  .ingredient-qty {
    font-size: 0.95rem;
    padding: 3px 10px;
    border-radius: 5px;
  }
  .cesta-price-div {
    margin-top: 10px;
    margin-bottom: 6px;
  }
  .cesta-price {
    font-size: 1rem;
  }
  .add-to-cart-btn {
    font-size: 2rem;
    padding: 8px 0;
    border-radius: 7px;
    width: 100%;
  }
}
.cart-popup {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.cart-popup-content {
  background: #fff;
  border-radius: 16px;
  padding: 32px 24px;
  max-width: 400px;
  width: 90vw;
  box-shadow: 0 4px 32px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.cart-popup-close {
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
}
@media (max-width: 580px) {
  .cart-popup-ingredients div {
    margin-bottom: 8px !important;
    padding: 3px 0 !important;
    border-radius: 8px !important;
    background: #fafbfc !important;
    width: 250px !important;
  }
  .cart-popup-ingredients span:first-child {
    margin-left: 8px !important;
  }
  .cart-popup-ingredients span:last-child {
    margin-right: 8px !important;
  }
}
    `;
    document.head.appendChild(style);
  }

  (async () => {
    await renderCart();
  })();

  return cartContainer;
}