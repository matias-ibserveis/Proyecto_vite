export function CestaNavbar() {
  const nav = document.createElement("nav");
  nav.className = "navbar navbar-expand-lg cesta-navbar";

  nav.innerHTML = `
    <div class="container-fluid">
      <a class="navbar-brand" href="index.html">LURA</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#cestaNavbar" aria-controls="cestaNavbar" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="cestaNavbar">
        <ul class="navbar-nav mb-2 mb-lg-0 nav-links-container">
          <li class="nav-item"><a class="nav-link active" href="#">CESTA</a></li>
          <span class="nav-separator">|</span>
          <li class="nav-item"><a class="nav-link" href="#">PRODUCTOS</a></li>
          <span class="nav-separator">|</span>
          <li class="nav-item"><a class="nav-link" href="#">CONTACT</a></li>
          <span class="nav-separator">|</span>
          <li class="nav-item"><a class="nav-link" href="#">CHECKOUT</a></li>
        </ul>
      </div>
    </div>
  `;

  return nav;
}