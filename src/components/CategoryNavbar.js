// src/components/CategoryNavbar.js
export function CategoryNavbar() {
  console.log("CategoryNavbar component initialized");

  const nav = document.createElement("nav");
  nav.className = "category-navbar";

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

  let currentIndex = 0;
  const itemsPerPage = 5;
  const itemWidth = nav.querySelector(".category-item")?.offsetWidth || 160;

  const renderCategories = () => {
    return categories
      .map(
        (category, index) => `
        <li class="category-item">
          <a class="category-link ${index === 0 ? "active" : ""}" href="#" data-category="${category.name}">${category.name}</a>
          ${index < categories.length - 1 ? '<span class="category-separator"></span>' : ""}
        </li>
      `
      )
      .join("");
  };

  nav.innerHTML = `
    <div class="category-nav-container">
      <div class="category-container">
        <button class="nav-btn nav-btn-left" id="nav-left" style="display: none;"><</button>
        <div class="category-scroll-wrapper">
          <ul class="category-list" id="category-list">
            ${renderCategories()}
          </ul>
        </div>
        <button class="nav-btn nav-btn-right" id="nav-right">></button>
        <form class="search-form" role="search">
          <input class="form-control category-search" type="search" placeholder="Buscar productos" aria-label="Search">
          <button class="btn search-btn" type="submit">Buscar</button>
        </form>
      </div>
    </div>
  `;

  const isMobile = () => window.innerWidth < 768;

  const updateActiveLink = () => {
    const links = nav.querySelectorAll(".category-link");
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        links.forEach((l) => l.classList.remove("active"));
        e.target.classList.add("active");
      });
    });
  };
  updateActiveLink();

  const searchForm = nav.querySelector("form");
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = nav.querySelector(".category-search").value.trim();
    console.log("Search term:", searchTerm);
  });

  const navLeftBtn = nav.querySelector("#nav-left");
  const navRightBtn = nav.querySelector("#nav-right");
  const categoryList = nav.querySelector("#category-list");

  const updateButtonVisibility = () => {
    if (isMobile()) {
      navLeftBtn.style.display = "none";
      navRightBtn.style.display = "none";
      return;
    }

    navLeftBtn.style.display = currentIndex > 0 ? "block" : "none";
    navRightBtn.style.display = currentIndex + itemsPerPage < categories.length ? "block" : "none";
  };

  const animateSlide = (direction) => {
    if (isMobile()) return;

    if (direction === "left" && currentIndex > 0) {
      currentIndex -= itemsPerPage;
    }
    if (direction === "right" && currentIndex + itemsPerPage < categories.length) {
      currentIndex += itemsPerPage;
    }

    const offset = currentIndex * itemWidth;
    categoryList.style.transition = "transform 0.5s ease";
    categoryList.style.transform = `translateX(-${offset}px)`;

    updateButtonVisibility();
  };

  navLeftBtn.addEventListener("click", () => animateSlide("left"));
  navRightBtn.addEventListener("click", () => animateSlide("right"));

  updateButtonVisibility();

  window.addEventListener("resize", () => {
    currentIndex = 0;
    categoryList.style.transition = "none";
    categoryList.style.transform = isMobile() ? "none" : "translateX(0)";
    updateButtonVisibility();
  });

  console.log("CategoryNavbar component fully constructed:", nav);
  return nav;
}
