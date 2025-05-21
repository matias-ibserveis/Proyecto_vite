export function Navbar() {
  const nav = document.createElement("nav");
  nav.className = "navbar bg-success";

  nav.innerHTML = `
    <nav class="navbar navbar-custom">
    <div class="container-fluid">
        <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#">LUŔA</a>
        </div>
        <div class="collapse navbar-collapse" id="myNavbar">
        <ul class="nav navbar-nav">
            <li class="active"><a href="#">Inicio</a></li>
            <li><a href="#">Productos</a></li>
            <li><a href="#">Más Información</a></li>
            <li><a href="#">Aviso Legal</a></li>
        </ul>
        </div>
    </div>
    </nav>
  `;

  return nav;
}