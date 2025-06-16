// src/components/ParteCheckoutPage/CheckoutPopup.js
export function CheckoutPopup() {
  const popup = document.createElement('div');
  popup.id = 'checkout-popup';
  popup.className = 'checkout-popup';
  popup.style.display = 'none'; // Initially hidden

  popup.innerHTML = `
    <div class="checkout-popup-content">
      <span class="checkout-popup-close">×</span>
      <h2 class="checkout-popup-title">Contacto</h2>
      <label for="client-name" class="client-name-label">Nombre</label>
      <input type="text" id="client-name" class="client-name-input" placeholder="Enter your name" />
    </div>
  `;

  // Load saved client name from sessionStorage
  const nameInput = popup.querySelector('#client-name');
  if (nameInput) {
    const savedName = sessionStorage.getItem('clientName') || '';
    nameInput.value = savedName;

    // Save client name to sessionStorage on input
    nameInput.addEventListener('input', () => {
      const name = nameInput.value.trim();
      if (name) {
        sessionStorage.setItem('clientName', name);
      } else {
        sessionStorage.removeItem('clientName');
      }
    });
  }

  // Close button functionality
  const closeButton = popup.querySelector('.checkout-popup-close');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      popup.style.display = 'none';
    });
  }

  // Close popup when clicking outside
  popup.addEventListener('click', (event) => {
    if (event.target === popup) {
      popup.style.display = 'none';
    }
  });

  return popup;
}

