export function CartComponent() {
  const cartDiv = document.createElement('div');
  cartDiv.classList.add('cart-section');

  // Create and append the header first
  const cartHeader = document.createElement('h3');
  cartHeader.textContent = 'MI CARRITO';
  cartHeader.classList.add('cart-header');
  cartDiv.appendChild(cartHeader);

  function renderCart() {
    // Clear previous content except the header
    while (cartDiv.children.length > 1) {
      cartDiv.removeChild(cartDiv.lastChild);
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

    const buttons = cartDiv.querySelectorAll('.cart-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        console.log('Button clicked:', btn.classList, btn.dataset.id, 'Class contains plus:', btn.classList.contains('plus-btn'));
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
  }

  renderCart();
  return cartDiv;
}