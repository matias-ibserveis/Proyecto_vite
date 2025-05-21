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
          <li class="nav-item active"><a class="nav-link" href="#">Inicio</a></li>
          <li class="nav-item"><a class="nav-link" href="#">Productos</a></li>
          <li class="nav-item"><a class="nav-link" href="#">Más Información</a></li>
          <li class="nav-item"><a class="nav-link" href="#">Aviso Legal</a></li>
        </ul>
      </div>
    </div>
  `;

  return nav;
}