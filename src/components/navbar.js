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
    if (animating) return; // Evita doble click durante la animación

    if (links.classList.contains('show')) {
      // Cerrar: animación de salida
      links.classList.remove('show');
      links.classList.add('hiding');
      links.style.display = ''; // Mantener visible
      animating = true;
      setTimeout(() => {
        links.classList.remove('hiding');
        links.style.display = 'none';
        animating = false;
      }, 940); // igual que la duración de fadeOutMenuLink
    } else {
      // Abrir: animación de entrada
      links.style.display = '';
      void links.offsetWidth; // Forzar reflow
      links.classList.add('show');
    }
    this.classList.toggle('active');
  });

  return nav;
}