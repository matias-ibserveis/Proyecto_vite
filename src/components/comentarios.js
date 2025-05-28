export function Comentarios() {
  const section = document.createElement('section');
  section.className = 'carousel slide carousel-bg fixed';
  section.id = 'reseñasCarousel';
  section.setAttribute('data-bs-ride', 'carousel');

  const reseñas = [
    {
      nombre: 'Jose Carbonell',
      texto: "¡Producte de molt bona qualitat fresc i molt desitjable. Les noies són molt mones i t'atenen amb molta amabilitat i molta experiència",
      imagen: 'images/reseña1.png',
      estrellas: 5
    },
    {
      nombre: 'Charles Maher',
      texto: "Compreu amb els productes de proximitat més deliciosos... Us recomano especialment la Sobressada!",
      imagen: 'images/reseña2.png',
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
      imagen: 'images/reseña4.png',
      estrellas: 5
    },
  ];

  const items = reseñas.map((r, index) => {
    const activeClass = index === 0 ? 'active' : '';
    const estrellas = '★'.repeat(r.estrellas) + '☆'.repeat(5 - r.estrellas);
    return `
      <div class="carousel-item ${activeClass}">
        <div class="reseña-item">
          <img src="${r.imagen}" alt="${r.nombre}">
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

  return section;
}