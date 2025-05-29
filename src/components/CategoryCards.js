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

  const wrapper = document.createElement("div");
  wrapper.className = "category-cards-wrapper";

  const container = document.createElement("div");
  container.className = "category-cards-grid";

  let currentPage = 1;

  function getItemsPerPage() {
    return window.innerWidth <= 768 ? 4 : 8;
  }

  function updateCategories() {
    const itemsPerPage = getItemsPerPage();
    container.innerHTML = "";
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedCategories = categories.slice(start, end);

    paginatedCategories.forEach((category) => {
      const card = document.createElement("div");
      card.className = "category-card";
      card.dataset.category = category.name;

      const image = document.createElement("img");
      image.src = "/images/logo.png";
      image.alt = `${category.name} category`;
      image.className = "category-card-image";

      const name = document.createElement("p");
      name.className = "category-card-name";
      name.textContent = category.name;

      card.appendChild(image);
      card.appendChild(name);
      container.appendChild(card);
    });

    updatePagination();
  }

  function updatePagination() {
    let pagination = wrapper.querySelector(".category-pagination");
    if (!pagination) {
      pagination = createPagination();
      wrapper.appendChild(pagination);
    }
    const itemsPerPage = getItemsPerPage();
    const totalPages = Math.ceil(categories.length / itemsPerPage);
    const prevBtn = pagination.querySelector(".prev-btn");
    const nextBtn = pagination.querySelector(".next-btn");

    if (currentPage === 1) {
      prevBtn.style.visibility = "hidden"; // Invisible but keeps space
      nextBtn.style.visibility = "visible";
    } else if (currentPage === totalPages) {
      prevBtn.style.visibility = "visible";
      nextBtn.style.visibility = "hidden"; // Invisible but keeps space
    } else {
      prevBtn.style.visibility = "visible";
      nextBtn.style.visibility = "visible";
    }
  }

  function createPagination() {
    const pagination = document.createElement("div");
    pagination.className = "category-pagination";

    const prevBtn = document.createElement("button");
    prevBtn.className = "category-pagination-btn prev-btn";
    prevBtn.textContent = "<";
    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        updateCategories();
      }
    });

    const nextBtn = document.createElement("button");
    nextBtn.className = "category-pagination-btn next-btn";
    nextBtn.textContent = ">";
    nextBtn.addEventListener("click", () => {
      const itemsPerPage = getItemsPerPage();
      const totalPages = Math.ceil(categories.length / itemsPerPage);
      if (currentPage < totalPages) {
        currentPage++;
        updateCategories();
      }
    });

    pagination.appendChild(prevBtn);
    pagination.appendChild(nextBtn);

    return pagination;
  }

  wrapper.appendChild(container);
  updateCategories();

  window.addEventListener("resize", () => {
    const newItemsPerPage = getItemsPerPage();
    const totalPages = Math.ceil(categories.length / newItemsPerPage);
    if (currentPage > totalPages) {
      currentPage = totalPages || 1;
    }
    updateCategories();
  });

  return wrapper;
}