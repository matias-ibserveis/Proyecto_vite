export function Navbar() {
  const nav = document.createElement("nav");
  nav.className = "navbar navbar-expand-lg navbar-custom fixed-top";

  nav.innerHTML = `
    <div class="container-fluid">
      <a class="navbar-brand" href="/index.html" style="display: flex; align-items: center; gap: 10px;">
        <img src="/images/Lura_Icon.png" alt="LURA Logo">
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#myNavbar" aria-controls="myNavbar" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="myNavbar">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item"><a class="nav-link" href="/index.html#sobre-nosotras">Sobre Nosotras</a></li>
          <li class="nav-item"><a class="nav-link" href="/index.html#nuestra-filosofia">Nuestra Filosofía</a></li>
          <li class="nav-item"><a class="nav-link" href="/index.html#productos">Productos</a></li>
          <li class="nav-item"><a class="nav-link" href="/index.html#reseñasCarousel">Reseñas</a></li>
          <li class="nav-item"><a class="nav-link" href="/index.html#contacto">Contacto</a></li>
        </ul>
      </div>
    </div>
  `;

  // Scroll suave asegurado aunque el contenido sea dinámico
  nav.addEventListener('click', function(e) {
    const link = e.target.closest('a[data-scrollto]');
    if (link) {
      e.preventDefault();
      const id = link.getAttribute('data-scrollto');
      let intentos = 0;
      function scrollToSection() {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else if (++intentos < 20) {
          setTimeout(scrollToSection, 100);
        }
      }
      scrollToSection();
    }
  });

  return nav;
}