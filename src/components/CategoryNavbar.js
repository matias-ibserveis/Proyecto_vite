export function CategoryNavbar() {
  const nav = document.createElement("nav");
  nav.className = "category-navbar";

  nav.innerHTML = `
    <div class="search-form" role="search">
      <input class="form-control category-search" type="search" placeholder="Buscar productos" aria-label="Search">
      <button class="btn search-btn" type="submit">Buscar</button>
    </div>
  `;

  const searchForm = nav.querySelector(".search-form");
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = nav.querySelector(".category-search").value.trim();
    console.log("Search term:", searchTerm);
  });

  return nav;
}