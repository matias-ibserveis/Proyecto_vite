export function CartComponent() {
  const cartContainer = document.createElement('div');
  cartContainer.classList.add('cart-container');

  function renderCart() {
    cartContainer.innerHTML = ''; // Clear previous content

    // Get cart data from localStorage
    const cesta = JSON.parse(localStorage.getItem('cesta') || '{}');
    const ids = Object.keys(cesta);
    let total = 0;

    // Left Panel: Cart Items
    const leftPanel = document.createElement('div');
    leftPanel.classList.add('left-panel');

    const cartHeader = document.createElement('h3');
    cartHeader.textContent = 'MI CARRITO';
    leftPanel.appendChild(cartHeader);

    const cartItemsDiv = document.createElement('div');
    cartItemsDiv.classList.add('cart-items');

    if (ids.length === 0) {
      cartItemsDiv.innerHTML = '<p>Tu cesta está vacía</p>';
    } else {
      ids.forEach(id => {
        const item = cesta[id];
        const itemTotal = item.cantidad * (item.precio || 0);
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
          <img src="${item.image || 'https://via.placeholder.com/50'}" alt="${item.titulo}">
          <span>${item.titulo}</span>
          <span>$${itemTotal.toFixed(2)}</span>
          <button class="remove-btn" data-id="${id}">🗑️</button>
        `;
        cartItemsDiv.appendChild(cartItem);
      });
    }

    const totalDiv = document.createElement('div');
    totalDiv.classList.add('total-price');
    totalDiv.innerHTML = `<span>Total: $${total.toFixed(2)}</span>`;
    leftPanel.appendChild(cartItemsDiv);
    leftPanel.appendChild(totalDiv);

    // Right Panel: Client Information
    const rightPanel = document.createElement('div');
    rightPanel.classList.add('right-panel');

    const clientHeader = document.createElement('h4');
    clientHeader.textContent = 'Client Information';
    rightPanel.appendChild(clientHeader);

    const form = document.createElement('form');
    form.innerHTML = `
      <input type="text" placeholder="Name" required>
      <input type="text" placeholder="Address" required>
    `;
    rightPanel.appendChild(form);

    const payBtn = document.createElement('button');
    payBtn.classList.add('pay-btn');
    payBtn.textContent = 'Pay';
    payBtn.addEventListener('click', () => {
      alert('Payment processed!');
      localStorage.removeItem('cesta');
      renderCart();
    });
    rightPanel.appendChild(payBtn);

    // Append panels
    cartContainer.appendChild(leftPanel);
    cartContainer.appendChild(rightPanel);

    // Remove button functionality
    const removeButtons = cartItemsDiv.querySelectorAll('.remove-btn');
    removeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        delete cesta[id];
        localStorage.setItem('cesta', JSON.stringify(cesta));
        renderCart();
      });
    });
  }

  renderCart();
  return cartContainer;
}