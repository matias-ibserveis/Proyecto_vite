export function CategoryNavbar() {
  const nav = document.createElement("nav");
  nav.className = "category-navbar";

  nav.innerHTML = `
    <div class="titulo-busqueda-wrapper">
      <h3 class="titulo_arriba_buscar my-4">Productos en LURA</h3>
    </div>
    <div class="search-form-wrapper">
      <form class="search-form" role="search">
        <input class="form-control category-search" type="search" placeholder="Buscar productos" aria-label="Search">
        <button class="btn search-btn" type="submit">Buscar</button>
      </form>
    </div>
  `;

  const searchForm = nav.querySelector(".search-form");
  const todosBtn = nav.querySelector("#todosBtn");

  searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchTerm = nav.querySelector(".category-search").value.trim();
    console.log("Search submitted with term:", searchTerm);

    if (!window.location.pathname.includes("producto.html")) {
      window.location.href = `/producto.html?search=${encodeURIComponent(searchTerm)}`;
      return;
    }

    const productosSection = document.querySelector("#productos");
    if (productosSection && productosSection.fetchProductos) {
      await productosSection.fetchProductos(searchTerm);
    } else {
      console.error("Productos section or fetchProductos method not found");
    }
  });



  if (window.location.pathname.includes("producto.html")) {
    const urlParams = new URLSearchParams(window.location.search);
    const initialSearchTerm = urlParams.get("search") || "";
    if (initialSearchTerm) {
      nav.querySelector(".category-search").value = initialSearchTerm;
    }
  }

  return nav;
}