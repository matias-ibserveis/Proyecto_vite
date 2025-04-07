export function Header() {
  const header = document.createElement("header");
  header.className = "carousel slide";
  header.id = "headerCarousel";
  header.setAttribute("data-bs-ride", "carousel");
  header.innerHTML = `
      <div class="carousel-inner">
          <div class="carousel-item active">
              <img src="public/images/carousel1.jpeg" class="d-block w-100" alt="Informatica">
              <div class="carousel-caption d-none d-md-block">
                  <h5>Bienvenido a InformaticON</h5>
                  <p>Tu tienda de confianza para productos informaticos</p>
              </div>
          </div>
          <div class="carousel-item">
              <img src="public/images/carousel2.jpeg" class="d-block w-100" alt="Componentes">
          </div>
          <div class="carousel-item">
              <img src="public/images/carousel3.jpeg" class="d-block w-100" alt="Herramientas">
          </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#headerCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#headerCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
      </button>
  
  <style>
    .carousel-inner img {
      height: 50vh;
      object-fit: cover;
      width: 100%;
      border: 5px solid green;
    }
  </style>

  `;
  return header;
}