export function Navbar() {
  const nav = document.createElement("nav");
  nav.className = "navbar navbar-expand-lg navbar-custom";

  nav.innerHTML = `
    <div class="container-fluid">
      <a class="navbar-brand" href="#">LUŔA</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#myNavbar" aria-controls="myNavbar" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="myNavbar">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item active"><a class="nav-link" href="#inicio">Inicio</a></li>
          <li class="nav-item"><a class="nav-link" href="#productos">Productos</a></li>
          <li class="nav-item"><a class="nav-link" href="#listas_cestas">Cestas</a></li>
          <li class="nav-item"><a class="nav-link" href="#nuestra-filosofia">Nuestra filosofia</a></li>
          <li class="nav-item"><a class="nav-link" href="#contacto">Más Información</a></li>
          <li class="nav-item"><a class="nav-link" href="Avisos-Legales.html">Aviso Legal</a></li>
        </ul>
      </div>
    </div>
  `;

  const style = document.createElement("style");
    style.innerHTML = `
    .navbar-custom {
      background-color: #d1ab72;
      border: none;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      border-radius: 10px 10px 10px 10px;
      padding: 10px 20px;
      font-size: 15px;
      font-family: 'Aloja Extended', sans-serif;
      letter-spacing: normal;
      margin-bottom: 5px;
    }

    /* Marca (nombre/logo) */
    .navbar-custom .navbar-brand {
      color: white !important;
      font-family: 'Aloja Extended', sans-serif !important;
      font-size: 25px;
    }

    /* Enlaces de navegación */
    .navbar-custom .navbar-nav .nav-link {
      color: #6d5839 !important;
      font-family: 'Aloja Extended', sans-serif;
      font-size: 18px;
      transition: background 0.2s, color 0.2s;
    }

    /* Hover en enlaces */
    .navbar-custom .navbar-nav .nav-link:hover,
    .navbar-custom .navbar-nav .nav-link.active {
      color: #000000 !important;
      background-color: #ffffff !important;
    }

    /* Botón hamburguesa */
    .navbar-custom .navbar-toggler {
      border-color: #ffffff;
      background-color: #d1ab72;
    }
    .navbar-custom .navbar-toggler-icon {
      background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(0,0,0,0.7)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
    }

    /* Enlace activo */
    .navbar-custom .navbar-nav .nav-link.active {
      color: #443723 !important;
      background-color: #fff !important;
    }
    `;
document.head.appendChild(style);


  return nav;
}