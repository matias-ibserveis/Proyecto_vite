export function CestaNavbar() {
  const navbar = document.createElement('nav');
  navbar.className = 'cesta-navbar navbar navbar-expand-lg';

  const currentPath = window.location.pathname;

  navbar.innerHTML = `
    <div class="container-fluid">
      <a class="navbar-brand" href="/index.html">LURÁ</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#cestaNavbar" aria-controls="cestaNavbar" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="cestaNavbar">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link ${currentPath === '/quien-somos.html' ? 'active' : ''}" href="/quien-somos.html">¿QUIÉN SOMOS?</a>
          </li>
          <li class="nav-item">
            <a class="nav-link ${currentPath === '/cesta.html' ? 'active' : ''}" href="/cesta.html">CESTA</a>
          </li>
          <li class="nav-item">
            <a class="nav-link ${currentPath === '/producto.html' ? 'active' : ''}" href="/producto.html">PRODUCTOS</a>
          </li>
          <li class="nav-item">
            <a class="nav-link ${currentPath === '/contacto.html' ? 'active' : ''}" href="/contacto.html">CONTACTO</a>
          </li>
          <li class="nav-item">
            <a class="nav-link ${currentPath === '/checkout.html' ? 'active' : ''}" href="/checkout.html">CHECKOUT</a>
          </li>
        </ul>
      </div>
    </div>
  `;

  return navbar;
}