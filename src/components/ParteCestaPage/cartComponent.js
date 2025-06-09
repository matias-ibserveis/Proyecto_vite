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

    const rightPanel = document.createElement('div');
    rightPanel.classList.add('right-panel');

    const ingredientsHeader = document.createElement('h3');
    ingredientsHeader.textContent = 'Contenido';
    ingredientsHeader.classList.add('ingredients-header');
    rightPanel.appendChild(ingredientsHeader);

    const ingredientsData = [
      { name: 'Eggs', quantities: ['6x', '12x'], selected: '6x', place: 'Inca', supplier: 'Manel Ortiz' },
      { name: 'Milk', quantities: ['1L', '2L'], selected: '1L', place: 'Manacor', supplier: 'Ana Pérez' },
      { name: 'Bread', quantities: ['1 loaf', '2 loaves'], selected: '1 loaf', place: 'Palma', supplier: 'Jaume Nadal' },
      { name: 'Bread', quantities: ['1 loaf', '2 loaves'], selected: '1 loaf', place: 'Palma', supplier: 'Jaume Nadal' },
      { name: 'Cheese', quantities: ['200g', '500g'], selected: '200g', place: 'Sóller', supplier: 'Maria Serra' },
      { name: 'Tomatoes', quantities: ['500g', '1kg'], selected: '500g', place: 'Algaida', supplier: 'Pere Torres' }, 
    ];

    const ingredientsList = document.createElement('div');
    ingredientsList.classList.add('ingredients-list');

    ingredientsData.forEach((ingredient) => {
      const ingredientRow = document.createElement('div');
      ingredientRow.classList.add('ingredient-row');

      const sourceInfo = document.createElement('div');
      sourceInfo.classList.add('source-info');

      const supplierSpan = document.createElement('span');
      supplierSpan.classList.add('supplier-text');
      supplierSpan.textContent = `quién: ${ingredient.supplier}`;
      sourceInfo.appendChild(supplierSpan);

      const placeSpan = document.createElement('span');
      placeSpan.classList.add('place-text');
      placeSpan.textContent = `lugar: ${ingredient.place}`;
      sourceInfo.appendChild(placeSpan);

      const ingredientDetails = document.createElement('div');
      ingredientDetails.classList.add('ingredient-details');

      const ingredientName = document.createElement('span');
      ingredientName.textContent = ingredient.name;
      ingredientName.classList.add('ingredient-name');

      const quantityWrapper = document.createElement('div');
      quantityWrapper.classList.add('quantity-wrapper');

      const quantityButton = document.createElement('button');
      quantityButton.textContent = ingredient.selected;
      quantityButton.classList.add('quantity-btn');

      const customDropdown = document.createElement('div');
      customDropdown.classList.add('custom-dropdown');

      const setDropdownWidth = (selectedQty) => {
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

        tempSpan.textContent = selectedQty;
        const selectedWidth = tempSpan.offsetWidth;
        maxWidth = Math.max(maxWidth, selectedWidth);

        document.body.removeChild(tempSpan);
        customDropdown.style.width = `${Math.min(maxWidth + 20, 150)}px`;
        quantityButton.style.width = `${Math.min(selectedWidth + 20, 150)}px`;
      };

      setDropdownWidth(ingredient.selected);

      ingredient.quantities.forEach(qty => {
        const option = document.createElement('span');
        option.textContent = qty;
        option.classList.add('dropdown-option');
        option.addEventListener('click', () => {
          ingredient.selected = qty;
          quantityButton.textContent = ingredient.selected;
          customDropdown.style.display = 'none';
          setDropdownWidth(qty);
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

      ingredientDetails.appendChild(ingredientName);
      ingredientDetails.appendChild(quantityWrapper);

      ingredientRow.appendChild(sourceInfo);
      ingredientRow.appendChild(ingredientDetails);
      ingredientsList.appendChild(ingredientRow);
    });

    document.addEventListener('click', (event) => {
      if (!event.target.closest('.quantity-wrapper')) {
        document.querySelectorAll('.custom-dropdown').forEach(dropdown => {
          dropdown.style.display = 'none';
        });
      }
    });

    rightPanel.appendChild(ingredientsList);

    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'Añadir Carro';
    addToCartButton.classList.add('add-to-cart-btn');
    addToCartButton.addEventListener('click', () => {
      // Retrieve existing cart from sessionStorage
      const cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
      
      // Create new cesta entry
      const uniqueId = `cesta_${Date.now()}`;
      const newCesta = {
        id: uniqueId,
        name: cestaData.name,
        quantity: 1,
        price: 0, // Price could be calculated if needed
        type: 'cesta', // Flag to identify this as a cesta item
        ingredients: ingredientsData.map(ingredient => ({
          name: ingredient.name,
          selected: ingredient.selected,
          place: ingredient.place,
          supplier: ingredient.supplier
        }))
      };

      // Add the cesta to the cart
      cart.push(newCesta);
      sessionStorage.setItem('cart', JSON.stringify(cart));

      // Redirect to producto.html
      window.location.href = '/producto.html';
    });
    rightPanel.appendChild(addToCartButton);

    cartContainer.appendChild(leftPanel);
    cartContainer.appendChild(rightPanel);
  }

  renderCart();
  return cartContainer;
}