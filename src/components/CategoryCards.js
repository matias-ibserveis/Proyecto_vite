export function CategoryCards() {
  const categories = [
    { name: "Teclados" },
    { name: "Estudio" },
    { name: "Software" },
    { name: "PA" },
    { name: "Luces" },
    { name: "DJ" },
    { name: "Video" },
    { name: "Micros" },
    { name: "Efectos" },
    { name: "Vientos" },
    { name: "Tradicional" },
    { name: "Partit" },
    { name: "Estuches" },
    { name: "Cables" },
    { name: "Acces." },
  ];

  const container = document.createElement("div");
  container.className = "category-cards-grid";

  categories.forEach((category) => {
    const card = document.createElement("div");
    card.className = "category-card";
    card.dataset.category = category.name;

    const image = document.createElement("img");
    image.src = "/images/logo.png"; // Placeholder image
    image.alt = `${category.name} category`;
    image.className = "category-card-image";

    const name = document.createElement("p");
    name.className = "category-card-name";
    name.textContent = category.name;

    card.appendChild(image);
    card.appendChild(name);
    container.appendChild(card);
  });

  return container;
}