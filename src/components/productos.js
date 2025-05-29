// src/components/productos.js

export function Productos() {
  const products = [
    {
      id: 1,
      name: "Empanada de Queso",
      category: "Tradicional",
      price: 2.5,
      image: "/images/Empanada.png"
    },
    {
      id: 2,
      name: "Teclado MIDI 49",
      category: "Teclados",
      price: 120,
      image: "/images/producto1_1.jpeg"
    },
    {
      id: 3,
      name: "Micrófono Condensador",
      category: "Micros",
      price: 85,
      image: "/images/producto1_2.jpeg"
    },        
    {
      id: 4,
      name: "Micrófono Condensador1",
      category: "Micros",
      price: 85,
      image: "/images/producto1_2.jpeg"
    },
    {
      id: 5,
      name: "Micrófono Condensador2",
      category: "Micros",
      price: 85,
      image: "/images/producto1_2.jpeg"
    }

  ];

  const container = document.createElement("div");
  container.className = "row product-list";

  products.forEach((product) => {
    const col = document.createElement("div");
    col.className = "col-md-4 mb-4";

    const card = document.createElement("div");
    card.className = "card h-100 shadow-sm";

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;
    img.className = "card-img-top product-image";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const title = document.createElement("h5");
    title.className = "card-title";
    title.textContent = product.name;

    const price = document.createElement("p");
    price.className = "card-text text-muted";
    price.textContent = `Precio: €${product.price}`;

    const quantityControl = document.createElement("div");
    quantityControl.className = "d-flex justify-content-between align-items-center";

    const minusBtn = document.createElement("button");
    minusBtn.className = "btn btn-outline-secondary btn-sm";
    minusBtn.textContent = "-";

    const quantityDisplay = document.createElement("span");
    quantityDisplay.className = "mx-2";
    quantityDisplay.textContent = "0";

    const plusBtn = document.createElement("button");
    plusBtn.className = "btn btn-outline-secondary btn-sm";
    plusBtn.textContent = "+";

    minusBtn.addEventListener("click", () => {
      const current = parseInt(quantityDisplay.textContent);
      if (current > 0) quantityDisplay.textContent = current - 1;
    });

    plusBtn.addEventListener("click", () => {
      const current = parseInt(quantityDisplay.textContent);
      quantityDisplay.textContent = current + 1;
    });

    quantityControl.appendChild(minusBtn);
    quantityControl.appendChild(quantityDisplay);
    quantityControl.appendChild(plusBtn);

    const removeBtn = document.createElement("button");
    removeBtn.className = "btn btn-danger btn-sm mt-3 w-100";
    removeBtn.textContent = "Eliminar producto";

    removeBtn.addEventListener("click", () => {
      col.remove();
    });

    cardBody.appendChild(title);
    cardBody.appendChild(price);
    cardBody.appendChild(quantityControl);
    cardBody.appendChild(removeBtn);

    card.appendChild(img);
    card.appendChild(cardBody);
    col.appendChild(card);
    container.appendChild(col);
  });

  return container;
}
