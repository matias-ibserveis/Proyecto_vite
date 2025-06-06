export function Navbar() {
  const nav = document.createElement("nav");
  nav.className = "navbar navbar-custom fixed-top";

  nav.innerHTML = `
    <div class="container-fluid">
      <a class="navbar-brand" href="/index.html" style="display: flex; align-items: center; gap: 10px;">
        <img src="/images/Lura_Icon.png" alt="LURA Logo">
      </a>
      <div class="navbar-links" style="display: none;">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item"><a class="nav-link" href="/index.html#sobre-nosotras">Sobre Nosotras</a></li>
          <li class="nav-item"><a class="nav-link" href="/index.html#nuestrafilosofia">Nuestra Filosofía</a></li>
          <li class="nav-item"><a class="nav-link nav-link-cestas" href="/index.html#Info_Cestas">Cestas Semanales</a></li>
          <li class="nav-item"><a class="nav-link" href="/index.html#Servicios">Servicios</a></li>
          <li class="nav-item"><a class="nav-link" href="/index.html#Zona_de_Trabajo">Zona de Trabajo</a></li>
          <li class="nav-item"><a class="nav-link" href="/index.html#Talleres">Talleres</a></li>
          <li class="nav-item"><a class="nav-link" href="/index.html#reseñasCarousel">Reseñas</a></li>
          <li class="nav-item"><a class="nav-link" href="/index.html#contacto">Contacto</a></li>
        </ul>
      </div>
      <button class="navbar-toggler" type="button" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
  `;

  const toggler = nav.querySelector('.navbar-toggler');
  const links = nav.querySelector('.navbar-links');

  let animating = false;

  toggler.addEventListener('click', function () {
    if (animating) return;

    const isDesktop = window.innerWidth >= 1201;

    if (links.classList.contains('show')) {
      links.classList.remove('show');
      links.classList.add('hiding');
      links.style.display = isDesktop ? 'flex' : '';
      animating = true;
      setTimeout(() => {
        links.classList.remove('hiding');
        links.style.display = 'none';
        animating = false;
      }, 1100);
    } else {
      links.style.display = isDesktop ? 'flex' : '';
      void links.offsetWidth;
      links.classList.add('show');
    }
    this.classList.toggle('active');
  });

  // Cerrar menú al hacer click fuera
  document.addEventListener('click', function (e) {
    const isDesktop = window.innerWidth >= 1201;
    if (
      links.classList.contains('show') &&
      !links.contains(e.target) &&
      !toggler.contains(e.target)
    ) {
      // Cierra igual que desde el botón
      links.classList.remove('show');
      links.classList.add('hiding');
      links.style.display = isDesktop ? 'flex' : '';
      toggler.classList.remove('active');
      setTimeout(() => {
        links.classList.remove('hiding');
        links.style.display = 'none';
      }, 1100);
    }
  });

  return nav;
}