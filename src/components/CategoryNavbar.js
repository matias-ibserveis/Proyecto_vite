export function CategoryNavbar() {
  const nav = document.createElement("nav");
  nav.className = "category-navbar";

  nav.innerHTML = `
    <form class="search-form" role="search">
      <input class="form-control category-search" type="search" placeholder="Buscar productos" aria-label="Search">
      <button class="btn search-btn" type="submit">Buscar</button>
      <button class="btn nav-btn ms-2" type="button" id="todosBtn">Ver todos</button>
    </form>
  `;

  const searchForm = nav.querySelector(".search-form");
  const todosBtn = nav.querySelector("#todosBtn");

  searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchTerm = nav.querySelector(".category-search").value.trim();
    console.log("Search submitted with term:", searchTerm);

    // If not on producto.html, navigate to it
    if (!window.location.pathname.includes("producto.html")) {
      window.location.href = `/producto.html?search=${encodeURIComponent(searchTerm)}`;
      return;
    }

    // On producto.html, fetch and render filtered products
    const productosSection = document.querySelector("#productos");
    if (productosSection && productosSection.fetchProductos) {
      await productosSection.fetchProductos(searchTerm);
    } else {
      console.error("Productos section or fetchProductos not found");
    }
  });

  todosBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Resetting to all products");
    const productosSection = document.querySelector("#productos");
    if (productosSection && productosSection.getDataOriginal && productosSection.paginar && productosSection.setCurrentPage) {
      const dataOriginal = productosSection.getDataOriginal();
      productosSection.setCurrentPage(1);
      productosSection.paginar(dataOriginal, 1);
      nav.querySelector(".category-search").value = "";
    } else {
      console.error("Productos section or required methods not found");
    }
  });

  // If on producto.html with a search term, pre-fill and search
  if (window.location.pathname.includes("producto.html")) {
    const urlParams = new URLSearchParams(window.location.search);
    const initialSearchTerm = urlParams.get("search") || "";
    if (initialSearchTerm) {
      nav.querySelector(".category-search").value = initialSearchTerm;
      // Initial search is handled by productos.js
    }
  }

  return nav;
}