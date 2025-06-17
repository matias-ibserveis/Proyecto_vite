export function CartComponent() {
  const cartContainer = document.createElement('div');
  cartContainer.classList.add('cart-container');

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

  function renderCart() {
    cartContainer.innerHTML = '';

    // --- TUS DATOS Y LÓGICA ORIGINALES ---
    const cestaData = {
      image: '/images/logo.png',
      name: 'Cesta de la SEMANA',
      description: 'Incluye productos frescos de temporada seleccionados para ti.',
      ingredients: [
        { name: 'Huevos', quantity: '6x' },
        { name: 'Leche', quantity: '1L' },
        { name: 'Pan', quantity: '1 barra' },
        { name: 'Queso', quantity: '200g' },
        { name: 'Tomates', quantity: '500g' },
        { name: 'Tomates', quantity: '500g' },
        { name: 'Tomates', quantity: '500g' },
        { name: 'Tomates', quantity: '500g' },
        { name: 'Tomates', quantity: '500g' },
        { name: 'Tomates', quantity: '500g' },
        { name: 'Tomates', quantity: '500g' },
        { name: 'Tomates', quantity: '500g' },
        { name: 'Tomates', quantity: '500g' },
        
      ],
      price: 25
    };

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

    const ingredientsList = document.createElement('ul');
    ingredientsList.classList.add('ingredients-list');

    cestaData.ingredients.forEach(ing => {
      const li = document.createElement('li');
      li.classList.add('ingredient-item');

      const nameSpan = document.createElement('span');
      nameSpan.classList.add('ingredient-name');
      nameSpan.textContent = ing.name;

      const qtySpan = document.createElement('span');
      qtySpan.classList.add('ingredient-qty');
      qtySpan.textContent = ing.quantity;

      li.appendChild(nameSpan);
      li.appendChild(qtySpan);
      ingredientsList.appendChild(li);
    });

    rightPanel.appendChild(ingredientsList);

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
  justify-content: space-between;
  align-items: center;
  padding: 13px 0;
  border-bottom: 1.5px solid #f0e6d2;
  font-size: 1.35rem; /* 1/3 más grande */
}






.ingredient-name {
  color: #a05d36;
  font-size: 1.6rem; /* 1/3 más grande */
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
}
.ingredient-qty {
  background: #d2ab74;
  color: #fff;
  border-radius: 8px;
  padding: 6px 18px;
  font-size: 1.2rem; /* 1/3 más grande */
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
  background: #d2ab74;
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
      `;
      document.head.appendChild(style);
    }
  }

  renderCart();
  return cartContainer;
}