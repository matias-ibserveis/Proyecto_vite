export function CartComponent() {
  const cartContainer = document.createElement('div');
  cartContainer.classList.add('cart-container');

  function renderCart() {
    cartContainer.innerHTML = '';

    const cestaData = {
      image: '/images/logo.png',
      name: 'Cesta Especial'
    };

    const leftPanel = document.createElement('div');
    leftPanel.classList.add('left-panel');

    const cestaImage = document.createElement('img');
    cestaImage.src = cestaData.image;
    cestaImage.alt = cestaData.name;
    cestaImage.classList.add('cesta-image');
    leftPanel.appendChild(cestaImage);

    const cestaName = document.createElement('h3');
    cestaName.textContent = cestaData.name;
    cestaName.classList.add('cesta-name');
    leftPanel.appendChild(cestaName);

    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'Añadir Carro';
    addToCartButton.classList.add('add-to-cart-btn');
    addToCartButton.addEventListener('click', () => {
      const cesta = JSON.parse(localStorage.getItem('cesta') || '{}');
      const uniqueId = `cesta_${Date.now()}`;
      cesta[uniqueId] = {
        id: uniqueId,
        titulo: cestaData.name,
        cantidad: 1,
        ingredients: ingredientsData.map(ingredient => ({
          name: ingredient.name,
          selected: ingredient.selected
        })),
        origen: 'manual'
      };
      localStorage.setItem('cesta', JSON.stringify(cesta));
      window.location.href = '/producto.html';
    });
    leftPanel.appendChild(addToCartButton);

    const rightPanel = document.createElement('div');
    rightPanel.classList.add('right-panel');

    const ingredientsHeader = document.createElement('h3');
    ingredientsHeader.textContent = 'Contenido';
    ingredientsHeader.classList.add('ingredients-header');
    rightPanel.appendChild(ingredientsHeader);

    const ingredientsData = [
      { name: 'Eggs', quantities: ['6x', '12x'], selected: '6x' },
      { name: 'Milk', quantities: ['1L', '2L'], selected: '1L' },
      { name: 'Bread', quantities: ['1 loaf', '2 loaves'], selected: '1 loaf' },
      { name: 'Cheese', quantities: ['200g', '500g'], selected: '200g' },
      { name: 'Butter', quantities: ['250g', '500g'], selected: '250g' },
      { name: 'Tomatoes', quantities: ['500g', '1kg'], selected: '500g' },
      { name: 'Lettuce', quantities: ['1 head', '2 heads'], selected: '1 head' },
      { name: 'Chicken Breast', quantities: ['500g', '1kg'], selected: '500g' },
      { name: 'Rice', quantities: ['1kg', '2kg'], selected: '1kg' },
      { name: 'Pasta', quantities: ['500g', '1kg'], selected: '500g' }
    ];

    const ingredientsList = document.createElement('div');
    ingredientsList.classList.add('ingredients-list');

    ingredientsData.forEach((ingredient) => {
      const ingredientRow = document.createElement('div');
      ingredientRow.classList.add('ingredient-row');

      const ingredientName = document.createElement('span');
      ingredientName.textContent = ingredient.name;
      ingredientName.classList.add('ingredient-name');
      ingredientRow.appendChild(ingredientName);

      const quantityWrapper = document.createElement('div');
      quantityWrapper.classList.add('quantity-wrapper');

      const quantityButton = document.createElement('button');
      quantityButton.textContent = ingredient.selected;
      quantityButton.classList.add('quantity-btn');

      const customDropdown = document.createElement('div');
      customDropdown.classList.add('custom-dropdown');

      const tempSpan = document.createElement('span');
      tempSpan.style.visibility = 'hidden';
      tempSpan.style.position = 'absolute';
      tempSpan.style.fontFamily = '"Aloja Extended", Arial, sans-serif';
      tempSpan.style.fontSize = '0.9rem';
      tempSpan.style.padding = '0.5rem 1rem';
      tempSpan.style.whiteSpace = 'nowrap';
      document.body.appendChild(tempSpan);

      let maxWidth = 60;
      ingredient.quantities.forEach(qty => {
        tempSpan.textContent = qty;
        const textWidth = tempSpan.offsetWidth;
        maxWidth = Math.max(maxWidth, textWidth);
      });
      document.body.removeChild(tempSpan);
      customDropdown.style.width = `${Math.min(maxWidth + 20, 150)}px`;

      ingredient.quantities.forEach(qty => {
        const option = document.createElement('span');
        option.textContent = qty;
        option.classList.add('dropdown-option');
        option.addEventListener('click', () => {
          ingredient.selected = qty;
          quantityButton.textContent = ingredient.selected;
          customDropdown.style.display = 'none';
        });
        customDropdown.appendChild(option);
      });

      quantityButton.addEventListener('click', (e) => {
        e.stopPropagation();
        document.querySelectorAll('.custom-dropdown').forEach(dropdown => {
          if (dropdown !== customDropdown) {
            dropdown.style.display = 'none';
          }
        });
        customDropdown.style.display = customDropdown.style.display === 'block' ? 'none' : 'block';
      });

      quantityWrapper.appendChild(quantityButton);
      quantityWrapper.appendChild(customDropdown);
      ingredientRow.appendChild(quantityWrapper);
      ingredientsList.appendChild(ingredientRow);
    });

    document.addEventListener('click', (event) => {
      if (!event.target.closest('.quantity-wrapper')) {
        document.querySelectorAll('.custom-dropdown').forEach(dropdown => {
          dropdown.style.display = 'none';
        });
      }
    }, { once: true });

    rightPanel.appendChild(ingredientsList);
    cartContainer.appendChild(leftPanel);
    cartContainer.appendChild(rightPanel);
  }

  renderCart();
  return cartContainer;
}