export function Productos() {
  const products = [
    {
      id: 1,
      name: "Empanada de Queso",
      category: "Tradicional",
      price: 2.5,
      description: "Deliciosa empanada rellena de queso fresco, perfecta para un snack rápido.",
      image: "/images/Empanada.png"
    },
    {
      id: 2,
      name: "Teclado MIDI 49",
      category: "Teclados",
      price: 120,
      description: "Teclado MIDI de 49 teclas con sensibilidad a la velocidad, ideal para producción musical.",
      image: "/images/producto1_1.jpeg"
    },
    {
      id: 3,
      name: "Micrófono Condensador",
      category: "Micros",
      price: 85,
      description: "Micrófono condensador de alta calidad para grabaciones de estudio y streaming.",
      image: "/images/producto1_2.jpeg"
    },        
    {
      id: 4,
      name: "Micrófono Condensador1",
      category: "Micros",
      price: 85,
      description: "Micrófono condensador versátil para grabaciones vocales e instrumentales.",
      image: "/images/producto1_2.jpeg"
    },
    {
      id: 5,
      name: "Micrófono Condensador2",
      category: "Micros",
      price: 85,
      description: "Micrófono condensador con patrón cardioide para un sonido claro y nítido.",
      image: "/images/producto1_2.jpeg"
    }
  ];

  const container = document.createElement("div");
  container.className = "row product-list";

  products.forEach((product) => {
    const col = document.createElement("div");
    col.className = "col-md-4 col-sm-6 mb-4";

    const card = document.createElement("div");
    card.className = "card h-100 shadow-sm position-relative";

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;
    img.className = "card-img-top product-image";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body d-flex flex-column";

    const description = document.createElement("p");
    description.className = "card-text product-description";
    description.textContent = product.description;

    const title = document.createElement("h5");
    title.className = "card-title";
    title.textContent = product.name;

    const price = document.createElement("p");
    price.className = "card-text text-muted";
    price.textContent = `Precio: €${product.price}`;

    const cardFooter = document.createElement("div");
    cardFooter.className = "card-footer d-flex justify-content-between align-items-center mt-auto";

    const quantityControl = document.createElement("div");
    quantityControl.className = "d-flex align-items-center";

    const minusBtn = document.createElement("button");
    minusBtn.className = "btn btn-outline-secondary btn-sm quantity-btn";
    minusBtn.textContent = "-";

    const quantityDisplay = document.createElement("span");
    quantityDisplay.className = "mx-2 quantity-display";
    quantityDisplay.textContent = "0";

    const plusBtn = document.createElement("button");
    plusBtn.className = "btn btn-outline-secondary btn-sm quantity-btn";
    plusBtn.textContent = "+";

    // Quantity control logic
    function updateQuantity() {
      const current = parseInt(quantityDisplay.textContent);
      minusBtn.style.visibility = current <= 0 ? "hidden" : "visible"; // Hide "-" when 0
    }

    minusBtn.addEventListener("click", () => {
      const current = parseInt(quantityDisplay.textContent);
      if (current > 0) quantityDisplay.textContent = current - 1;
      updateQuantity();
    });

    plusBtn.addEventListener("click", () => {
      const current = parseInt(quantityDisplay.textContent);
      quantityDisplay.textContent = current + 1;
      updateQuantity();
    });

    quantityControl.appendChild(minusBtn);
    quantityControl.appendChild(quantityDisplay);
    quantityControl.appendChild(plusBtn);

    const addBtn = document.createElement("button");
    addBtn.className = "btn btn-success btn-sm add-btn";
    addBtn.textContent = "Añadir";

    addBtn.addEventListener("click", () => {
      const quantity = parseInt(quantityDisplay.textContent);
      if (quantity > 0) {
        console.log(`Added ${quantity} x ${product.name} to cart`);
        // Future cart logic can go here
      }
    });

    cardFooter.appendChild(quantityControl);
    cardFooter.appendChild(addBtn);

    cardBody.appendChild(description);
    cardBody.appendChild(title);
    cardBody.appendChild(price);
    cardBody.appendChild(cardFooter);

    card.appendChild(img);
    card.appendChild(cardBody);
    col.appendChild(card);
    container.appendChild(col);

    // Initialize quantity visibility
    updateQuantity();
  });

  return container;
}