export function Comentarios() {
  const section = document.createElement('section');
  section.className = 'carousel slide carousel-bg fixed';
  section.id = 'reseñasCarousel';
  section.setAttribute('data-bs-ride', 'carousel');

  const reseñas = [
    {
      nombre: 'Jose Carbonell',
      texto: "¡Producte de molt bona qualitat fresc i molt desitjable. Les noies són molt mones i t'atenen amb molta amabilitat i molta experiència",
      imagen: 'images/reseña1.jpg',
      estrellas: 5
    },
    {
      nombre: 'Charles Maher',
      texto: "Compreu amb els productes de proximitat més deliciosos... Us recomano especialment la Sobressada!",
      imagen: 'images/reseña2.jpg',
      estrellas: 5
    },
    {
      nombre: 'Jorge Aleix',
      texto: "Molt contents amb aquesta botiga d'aliments de productes ecològics i locals. L´atenció és de 10!!! Tot i que ens queda lluny de casa, val la pena anar-hi. Ho recomano 100%.",
      imagen: 'images/reseña3.png',
      estrellas: 5
    },
    {
      nombre: 'Dione Butler',
      texto: 'Encantada! Excel·lent qualitat, la fruita i verdura deliciosa amb molt de sabor, ecològic i local, i molt bon preu, no es pot demanar més! Enhorabona Lura!',
      imagen: 'images/reseña4.jpg',
      estrellas: 5
    },
  ];

  const items = reseñas.map((r, index) => {
    const activeClass = index === 0 ? 'active' : '';
    const estrellas = '★'.repeat(r.estrellas) + '☆'.repeat(5 - r.estrellas);
    // Aplica la clase especial solo a la imagen deseada
    const extraImgClass = r.nombre === 'Jorge Aleix' ? 'reseña-img-sin-borde' : '';
    return `
    <div class="carousel-item ${activeClass}">
      <div class="reseña-item">
        <img src="${r.imagen}" alt="${r.nombre}" class="${extraImgClass}">
        <h3 class="reseña-nombre">${r.nombre}</h3>
        <p class="reseña-texto">"${r.texto}"</p>
        <div class="stars">${estrellas}</div>
      </div>
    </div>
  `;
  }).join('');

  section.innerHTML = `
    <h2 class="titulo">Reseñas de nuestros clientes</h2>
    <div class="carousel-inner">
      ${items}
    </div>
    <button class="carousel-control-prev fixed" type="button" data-bs-target="#reseñasCarousel" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next fixed" type="button" data-bs-target="#reseñasCarousel" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  `;



  /* Estilos reseñas */

  const style = document.createElement("style");
  style.innerHTML = `
      .reseña-item img {
      width: 75px !important;
      height: 75px !important;
      border-radius: 100% !important;
      margin-bottom: 0.5rem !important;
    }
    .reseña-item img.reseña-img-sin-borde {
      border-radius: 0 !important;
    }
    .reseña-item h3 {
      margin: 0.5rem 0;
    }
    .reseña-item p {
      font-style: italic;
      font-size: 0.95rem;
    }

    .stars {
      color: gold;
      font-size: 1.2rem;
      margin-top: 0.5rem;
    }

    .carousel-control-prev {
      left: 3%;
    }
    .carousel-control-next {
      right: 3%;
    }

    .carousel-bg {
      background-color: var(--terciary-color);
      padding: 50px;
    }
    @media (max-width: 600px) {
      .carousel-bg {
        min-height: 495px;
      }
    }

    .reseña-nombre {
      font-family: 'Aloja Extended', sans-serif;
      font-weight: 700;
      color: black;
      text-align: center;
    }

    .reseña-texto {
      font-family: "Hanken Grotesk", sans-serif;
      font-weight: 400;
      color: #333;
      text-align: center;
    }

    .carrusel-marquee {
      overflow: hidden;
      width: 100%;
      height: 340px; /* Corregido typo: xpx → px */
      background: var(--terciary-color);
      padding: 20px;
      position: relative;
      margin-bottom: 20px;
    }

    .carrusel-marquee-inner {
      display: flex;
      gap: 5px;
      animation: marquee 36s linear infinite;
      will-change: transform;
      backface-visibility: hidden;
    }

    .carrusel-marquee-inner img {
      height: 300px;
      width: 300px;
      display: block;
      object-fit: cover;
      flex-shrink: 0;
    }

    @keyframes marquee {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-50%);
      }
    }

    @media (max-width: 900px) {
      .carrusel-marquee-inner img {
        height: 150px;
        width: 150px;
      }
      .carrusel-marquee {
        min-height: 200px;
        max-height: 200px;
      }
    }

   `;
  
   document.head.appendChild(style);

  return section;
}
