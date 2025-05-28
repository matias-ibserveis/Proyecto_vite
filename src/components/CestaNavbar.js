export function CestaNavbar() {
  const nav = document.createElement("nav");
  nav.className = "navbar navbar-expand-lg cesta-navbar";

  const currentPath = window.location.pathname;

  nav.innerHTML = `
    <div class="container-fluid">
      <a class="navbar-brand" href="/index.html">LURÁ</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#cestaNavbar" aria-controls="cestaNavbar" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="cestaNavbar">
        <ul class="navbar-nav mb-2 mb-lg-0 nav-links-container">
          <li class="nav-item">
            <a class="nav-link ${currentPath === '/index.html' ? 'active' : ''}" href="/index.html">¿QUIÉN SOMOS?</a>
          </li>
          <span class="nav-separator">|</span>
          <li class="nav-item">
            <a class="nav-link ${currentPath === '/cesta.html' ? 'active' : ''}" href="/cesta.html">CESTA</a>
          </li>
          <span class="nav-separator">|</span>
          <li class="nav-item">
            <a class="nav-link ${currentPath === '/producto.html' ? 'active' : ''}" href="/producto.html">PRODUCTOS</a>
          </li>
          <span class="nav-separator">|</span>
          <li class="nav-item">
            <a class="nav-link ${currentPath === '/contacto.html' ? 'active' : ''}" href="/contacto.html">CONTACTO</a>
          </li>
          <span class="nav-separator">|</span>
          <li class="nav-item">
            <a class="nav-link ${currentPath === '/checkout.html' ? 'active' : ''}" href="/checkout.html">CHECKOUT</a>
          </li>
        </ul>
      </div>
    </div>
  `;

  return nav;
}