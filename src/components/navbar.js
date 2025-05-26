export function Navbar() {
  // --- Inyecta los estilos de la navbar solo una vez ---
  if (!document.getElementById('navbar-styles')) {
    const style = document.createElement('style');
    style.id = 'navbar-styles';
    style.textContent = `
      .navbar {
        background-color: #198754 !important;
        width: 100vw;
        min-width: 100%;
        border-radius: 0 !important;
        box-shadow: 0 0 32px 0 #ccc;
        margin-bottom: 1.5em;
        padding: 0;
      }
      .container-fluid, .navbar .container-fluid {
        padding-left: 3vw !important;
        padding-right: 3vw !important;
      }
      .navbar-brand {
        color: #fff !important;
        font-weight: bold;
        font-size: 1.3em;
        letter-spacing: 1px;
      }
      .nav {
        align-items: center;
        gap: 0.7em;
      }
      .navbar-link-custom,
      .navbar .nav-link {
        background: #00000023;
        border-radius: 6px;
        color: #fff !important;
        padding: 0.7em 1.7em;
        margin-right: 1.2em;
        margin-top: 0.3em;
        margin-bottom: 0.5em;
        transition: background 0.2s, filter 0.2s, transform 0.2s;
        text-decoration: none;
        font-weight: 500;
        display: inline-block;
      }
      .navbar-link-custom:last-child,
      .navbar .nav-link:last-child {
        margin-right: 0;
      }
      .navbar-link-custom:hover,
      .navbar .nav-link:hover {
        filter: brightness(2);
        transform: scale(1.13);
        background: #198754;
        color: #fff !important;
      }
    `;
    document.head.appendChild(style);
  }

  // --- Crea la navbar ---
  const nav = document.createElement("nav");
  nav.className = "navbar bg-success";

  nav.innerHTML = `
      <div class="container-fluid px-5">
          <a class="navbar-brand text-white" href="/index.html">InformaticOn</a>
          <ul class="nav" style="align-items:center;">
              <li class="nav-item">
                <a class="nav-link text-white navbar-link-custom" href="/index.html">Inicio</a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-white navbar-link-custom" href="/index.html#productos">Productos</a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-white navbar-link-custom" href="/index.html#contacto">Contacto</a>
              </li>
          </ul>
      </div>
  `;

  return nav;
}