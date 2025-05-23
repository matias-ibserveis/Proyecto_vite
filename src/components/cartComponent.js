export function CartComponent() {
  const cartContainer = document.createElement('div'); // New container for the entire component
  const cartDiv = document.createElement('div');
  cartDiv.classList.add('cart-section');

  // Create and append the header first
  const cartHeader = document.createElement('h3');
  cartHeader.textContent = 'MI CARRITO';
  cartHeader.classList.add('cart-header');
  cartDiv.appendChild(cartHeader);

  // Create the popup for product selection
  const popupOverlay = document.createElement('div');
  popupOverlay.classList.add('popup-overlay', 'hidden');
  const popupContent = document.createElement('div');
  popupContent.classList.add('popup-content');
  const popupHeader = document.createElement('div');
  popupHeader.classList.add('popup-header');
  const popupTitle = document.createElement('h4');
  popupTitle.textContent = 'Seleccionar Productos';
  const closePopupBtn = document.createElement('button');
  closePopupBtn.classList.add('close-popup-btn');
  closePopupBtn.textContent = 'X';
  popupHeader.appendChild(popupTitle);
  popupHeader.appendChild(closePopupBtn);
  const popupBody = document.createElement('div');
  popupBody.classList.add('popup-body');
  popupContent.appendChild(popupHeader);
  popupContent.appendChild(popupBody);
  popupOverlay.appendChild(popupContent);
  cartContainer.appendChild(popupOverlay);

  // Create the confirmation popup for "COMPRAR"
  const confirmOverlay = document.createElement('div');
  confirmOverlay.classList.add('popup-overlay', 'hidden');
  const confirmContent = document.createElement('div');
  confirmContent.classList.add('popup-content');
  const confirmHeader = document.createElement('div');
  confirmHeader.classList.add('popup-header');
  const confirmCloseBtn = document.createElement('button');
  confirmCloseBtn.classList.add('close-popup-btn');
  confirmCloseBtn.textContent = 'X';
  confirmHeader.appendChild(confirmCloseBtn);
  const confirmTitle = document.createElement('h4');
  confirmTitle.textContent = '';
  confirmHeader.appendChild(confirmTitle);
  const confirmBody = document.createElement('div');
  confirmBody.classList.add('popup-body');
  const confirmMessage = document.createElement('p');
  confirmMessage.textContent = '¿Estás seguro quieres comprar ahora?';
  const comprarAhoraBtn = document.createElement('button');
  comprarAhoraBtn.classList.add('comprar-ahora-btn');
  comprarAhoraBtn.textContent = '¡Compra Ya!';
  confirmBody.appendChild(confirmMessage);
  confirmBody.appendChild(comprarAhoraBtn);
  confirmContent.appendChild(confirmHeader);
  confirmContent.appendChild(confirmBody);
  confirmOverlay.appendChild(confirmContent);
  cartContainer.appendChild(confirmOverlay);

  function renderCart() {
    // Clear previous content except the header and popups
    while (cartDiv.children.length > 1) {
      cartDiv.removeChild(cartDiv.lastChild);
    }
    while (cartContainer.children.length > 2) {
      cartContainer.removeChild(cartContainer.children[1]);
    }

    const cesta = JSON.parse(localStorage.getItem('cesta') || '{}');
    const ids = Object.keys(cesta);
    let total = 0;

    const table = document.createElement('table');
    table.classList.add('cart-table');

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    ['Producto', 'Precio', 'Cantidad'].forEach(headerText => {
      const th = document.createElement('th');
      th.textContent = headerText;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    if (ids.length === 0) {
      const emptyRow = document.createElement('tr');
      emptyRow.innerHTML = `<td colspan="3" class="text-center">Tu cesta está vacía</td>`;
      tbody.appendChild(emptyRow);
    } else {
      ids.forEach(id => {
        const item = cesta[id];
        const totalItem = item.cantidad * (item.precio || 0);
        total += totalItem;

        const row = document.createElement('tr');
        // Product Cell
        const productCell = document.createElement('td');
        const productContainer = document.createElement('div');
        productContainer.classList.add('product-container');
        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-sm', 'btn-outline-danger', 'cart-btn', 'remove-btn');
        removeBtn.setAttribute('data-id', id);
        removeBtn.textContent = 'X';
        productContainer.appendChild(removeBtn);
        const productText = document.createElement('span');
        productText.textContent = item.titulo;
        productContainer.appendChild(productText);
        productCell.appendChild(productContainer);
        row.appendChild(productCell);

        // Price Cell
        const priceCell = document.createElement('td');
        priceCell.classList.add('price-cell');
        priceCell.textContent = `€${totalItem.toFixed(2)}`;
        row.appendChild(priceCell);

        // Quantity Cell
        const quantityCell = document.createElement('td');
        quantityCell.classList.add('quantity-cell');
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
          <span class="quantity-text">${item.cantidad}</span>
          <button class="btn btn-sm btn-outline-secondary cart-btn minus-btn" data-id="${id}">-</button>
          <button class="btn btn-sm btn-outline-secondary cart-btn plus-btn" data-id="${id}">+</button>
        `;
        quantityCell.appendChild(buttonContainer);
        row.appendChild(quantityCell);

        tbody.appendChild(row);
      });
    }
    table.appendChild(tbody);

    const tfoot = document.createElement('tfoot');
    const totalRow = document.createElement('tr');
    const totalLabel = document.createElement('td');
    totalLabel.textContent = 'Precio Total';
    totalRow.appendChild(totalLabel);
    const totalValue = document.createElement('td');
    totalValue.setAttribute('colspan', '2');
    totalValue.textContent = `€${total.toFixed(2)}`;
    totalRow.appendChild(totalValue);
    tfoot.appendChild(totalRow);
    table.appendChild(tfoot);

    cartDiv.appendChild(table);

    // Add the "+" button to the top right, aligned with the header
    const addProductBtn = document.createElement('button');
    addProductBtn.classList.add('add-product-btn');
    addProductBtn.textContent = '+';
    cartDiv.insertBefore(addProductBtn, cartDiv.firstChild.nextSibling); // Insert after header

    // Add the "COMPRAR" button below the table
    const comprarBtn = document.createElement('button');
    comprarBtn.classList.add('comprar-btn');
    comprarBtn.textContent = 'COMPRAR';
    cartDiv.appendChild(comprarBtn);

    cartContainer.appendChild(cartDiv);

    // Event listeners for cart buttons
    const buttons = cartDiv.querySelectorAll('.cart-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        console.log('Cart button clicked:', btn.classList, btn.dataset.id);
        const id = btn.dataset.id;
        const cesta = JSON.parse(localStorage.getItem('cesta') || '{}');
        if (!cesta[id]) {
          console.log('Item not found in cesta:', id);
          return;
        }

        if (btn.classList.contains('plus-btn')) {
          cesta[id].cantidad += 1;
        } else if (btn.classList.contains('minus-btn')) {
          cesta[id].cantidad -= 1;
          if (cesta[id].cantidad <= 0) {
            delete cesta[id];
          }
        } else if (btn.classList.contains('remove-btn')) {
          delete cesta[id];
        }

        localStorage.setItem('cesta', JSON.stringify(cesta));
        renderCart();
      });
    });

    // Event listener for the "+" button to open the product selection popup
    addProductBtn.addEventListener('click', async () => {
      console.log('Add product button clicked');
      popupOverlay.classList.remove('hidden');
      await renderProductList();
    });

    // Event listener to close the product selection popup
    closePopupBtn.addEventListener('click', () => {
      console.log('Closing product selection popup');
      popupOverlay.classList.add('hidden');
    });

    // Close product selection popup when clicking outside
    popupOverlay.addEventListener('click', (e) => {
      if (e.target === popupOverlay) {
        console.log('Closing popup by clicking outside');
        popupOverlay.classList.add('hidden');
      }
    });

    // Event listener for the "COMPRAR" button to show the confirmation popup
    comprarBtn.addEventListener('click', () => {
      console.log('COMPRAR button clicked'); // Debug log
      if (confirmOverlay) {
        console.log('Showing confirmation popup');
        confirmOverlay.classList.remove('hidden');
      } else {
        console.error('confirmOverlay is not defined');
      }
    });

    // Event listener to close the confirmation popup
    confirmCloseBtn.addEventListener('click', () => {
      console.log('Closing confirmation popup');
      confirmOverlay.classList.add('hidden');
    });

    // Close confirmation popup when clicking outside
    confirmOverlay.addEventListener('click', (e) => {
      if (e.target === confirmOverlay) {
        console.log('Closing confirmation popup by clicking outside');
        confirmOverlay.classList.add('hidden');
      }
    });

    // Event listener for "¡Compra Ya!" button (placeholder for purchase logic)
    comprarAhoraBtn.addEventListener('click', () => {
      console.log('Compra Ya button clicked');
      confirmOverlay.classList.add('hidden');
      // Add purchase logic here in the future
    });
  }

  // Function to fetch and render the product list in the popup
  async function renderProductList() {
    const popupBody = popupOverlay.querySelector('.popup-body');
    popupBody.innerHTML = ''; // Clear previous content

    try {
      const products = [
        { titulo: "Producto 1", precio: 10.99, stock: 50 },
        { titulo: "Producto 2", precio: 20.50, stock: 30 },
        { titulo: "Producto 3", precio: 15.75, stock: 20 }
      ];

      if (products.length === 0) {
        popupBody.innerHTML = '<p>No hay productos disponibles.</p>';
        return;
      }

      const productList = document.createElement('ul');
      productList.classList.add('product-list');
      products.forEach((product, index) => {
        const li = document.createElement('li');
        li.classList.add('product-item');
        li.innerHTML = `
          <span>${product.titulo} - €${product.precio.toFixed(2)} (Stock: ${product.stock})</span>
          <button class="add-to-cart-btn" data-id="${index}" ${product.stock <= 0 ? 'disabled' : ''}>
            ${product.stock <= 0 ? 'Sin Stock' : 'Añadir al Carrito'}
          </button>
        `;
        productList.appendChild(li);
      });
      popupBody.appendChild(productList);

      const addToCartButtons = popupBody.querySelectorAll('.add-to-cart-btn');
      addToCartButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.id;
          const product = products[id];
          if (product.stock <= 0) return;

          const cesta = JSON.parse(localStorage.getItem('cesta') || '{}');
          const productId = `prod_${id}`;
          if (cesta[productId]) {
            cesta[productId].cantidad += 1;
          } else {
            cesta[productId] = {
              titulo: product.titulo,
              precio: product.precio,
              cantidad: 1
            };
          }
          localStorage.setItem('cesta', JSON.stringify(cesta));
          renderCart();
          popupOverlay.classList.add('hidden');
        });
      });
    } catch (error) {
      console.error('Error loading products:', error);
      popupBody.innerHTML = '<p>Error al cargar los productos.</p>';
    }
  }

  renderCart();
  return cartContainer;
}