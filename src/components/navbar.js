export function Navbar() {
  const nav = document.createElement("nav");
  nav.className = "navbar bg-success";

  nav.innerHTML = `
      <div class="container">
          <a class="navbar-brand text-white" href="#">InformaticOn</a>
          <ul class="nav">
              <li class="nav-item"><a class="nav-link text-white" href="/">Inicio</a></li>
              <li class="nav-item"><a class="nav-link text-white" href="#productos">Productos</a></li>
              <li class="nav-item"><a class="nav-link text-white" href="#contacto">Contacto</a></li>
          </ul>
      </div>
  `;

  return nav;
}