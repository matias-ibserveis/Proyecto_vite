export function CartButtonComponent() {
  // Main cart button
  const cartButton = document.createElement('button');
  cartButton.id = 'cart-button';
  cartButton.className = 'btn-verde btn-aloja cart-button';
  cartButton.textContent = '🛒 Ver Carro';
  cartButton.style.position = 'fixed';
  cartButton.style.left = '20px'; // Changed to left side
  cartButton.style.bottom = '20px';
  cartButton.style.zIndex = '1000';
  cartButton.style.backgroundColor = '#28a745';
  cartButton.style.color = 'white';
  cartButton.style.padding = '10px 20px';
  cartButton.style.border = 'none';
  cartButton.style.borderRadius = '5px';
  cartButton.style.fontSize = '16px';
  cartButton.style.cursor = 'pointer';
  cartButton.style.fontFamily = "'Aloja Extended', sans-serif";
  cartButton.style.transition = 'transform 0.3s, opacity 0.3s';
  cartButton.onmouseover = () => cartButton.style.backgroundColor = '#218838';
  cartButton.onmouseout = () => cartButton.style.backgroundColor = '#28a745';

  // Toggle button
  const toggleBtn = document.createElement('button');
  toggleBtn.innerHTML = '<img src="/images/cart-icon.png" alt="Mostrar/Ocultar" style="width: 25px; height: 25px;">';
  toggleBtn.title = 'Ocultar botón Carro';
  toggleBtn.style.position = 'fixed';
  toggleBtn.style.left = '285px'; // Adjusted for left side
  toggleBtn.style.bottom = '25px';
  toggleBtn.style.zIndex = '1001';
  toggleBtn.style.backgroundColor = '#cccccc';
  toggleBtn.style.color = '#333';
  toggleBtn.style.border = 'none';
  toggleBtn.style.borderRadius = '50%';
  toggleBtn.style.width = '32px';
  toggleBtn.style.height = '32px';
  toggleBtn.style.fontSize = '18px';
  toggleBtn.style.cursor = 'pointer';
  toggleBtn.style.fontFamily = "'Aloja Extended', sans-serif";
  toggleBtn.style.display = 'flex';
  toggleBtn.style.alignItems = 'center';
  toggleBtn.style.justifyContent = 'center';
  toggleBtn.style.transition = 'left 0.3s';

  let visible = true;
  cartButton.style.transform = 'translateX(0)';
  cartButton.style.opacity = '1';

  toggleBtn.onclick = () => {
    visible = !visible;
    toggleBtn.title = visible ? 'Ocultar botón Carro' : 'Mostrar botón Carro';
    toggleBtn.innerHTML = '<img src="/images/cart-icon.png" alt="Mostrar/Ocultar" style="width: 25px; height: 25px;">';
    toggleBtn.style.left = visible ? '285px' : '20px';

    if (visible) {
      cartButton.style.transform = 'translateX(0)';
      cartButton.style.opacity = '1';
      cartButton.style.pointerEvents = 'auto';
    } else {
      cartButton.style.transform = 'translateX(-120%)';
      cartButton.style.opacity = '0';
      cartButton.style.pointerEvents = 'none';
    }
  };

  // Create the popup modal
  const modal = document.createElement('div');
  modal.id = 'cart-modal';
  modal.className = 'cart-modal';
  modal.style.display = 'none';

  const modalContent = document.createElement('div');
  modalContent.className = 'cart-modal-content';

  const closeButton = document.createElement('span');
  closeButton.className = 'cart-modal-close';
  closeButton.innerHTML = '×';
  closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  const cartItemsContainer = document.createElement('div');
  cartItemsContainer.id = 'cart-modal-items';
  cartItemsContainer.className = 'cart-modal-items';

  modalContent.appendChild(closeButton);
  modalContent.appendChild(cartItemsContainer);
  modal.appendChild(modalContent);

  // Add event listener to the cart button to show the modal
  cartButton.addEventListener('click', async () => {
    modal.style.display = 'block';
    await renderCartModal(cartItemsContainer);
  });

  // Close modal when clicking outside of it
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Append the buttons and modal to the body
  document.body.appendChild(cartButton);
  document.body.appendChild(toggleBtn);
  document.body.appendChild(modal);

  return document.createElement('div'); // Placeholder for compatibility
}

// Render the cart items in the modal
async function renderCartModal(container) {
  const { initializeCesta, mostrarCesta } = await import('../modules/cestaLogic.js');
  await initializeCesta();
  container.innerHTML = '';

  const tempContainer = document.createElement('div');
  tempContainer.innerHTML = `
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Unidad</th>
          <th>Precio</th>
          <th>Total</th>
          <th></th>
        </tr>
      </thead>
      <tbody id="cesta-body"></tbody>
      <tfoot>
        <tr><td colspan="5" class="text-end">Total general:</td><td id="total-general">0 €</td></tr>
      </tfoot>
    </table>
  `;
  container.appendChild(tempContainer);

  await mostrarCesta();
}