import { setBusqueda } from "./store.js";

export async function Header() {
  const header = document.createElement('header');
  header.className = 'carousel slide';
  header.id = 'headerCarousel';
  header.setAttribute('data-bs-ride', 'carousel');

  try {
    const res = await fetch('https://proyectorailway-production-9739.up.railway.app/productos_portada');
    const productos = await res.json();

    const carouselInner = document.createElement('div');
    carouselInner.className = 'carousel-inner';

    const items = productos.slice(0, 4).map((producto, index) => {
      return crearCarouselItem(producto, index === 0);
    });

    items.forEach(item => carouselInner.appendChild(item));
    header.appendChild(carouselInner);

    // Botones prev y next creados con DOM para evitar innerHTML +=
    const btnPrev = document.createElement('button');
    btnPrev.className = 'carousel-control-prev';
    btnPrev.type = 'button';
    btnPrev.setAttribute('data-bs-target', '#headerCarousel');
    btnPrev.setAttribute('data-bs-slide', 'prev');
    btnPrev.innerHTML = `
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    `;

    const btnNext = document.createElement('button');
    btnNext.className = 'carousel-control-next';
    btnNext.type = 'button';
    btnNext.setAttribute('data-bs-target', '#headerCarousel');
    btnNext.setAttribute('data-bs-slide', 'next');
    btnNext.innerHTML = `
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    `;

    header.appendChild(btnPrev);
    header.appendChild(btnNext);

    header.appendChild(style);
    agregarEventos(items);

  } catch (error) {
    console.error('Error cargando los productos:', error);
  }

  return header;
}

function crearTooltip(texto) {
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip-recomendacion';
  tooltip.textContent = `Recomendación: ${texto}`;
  return tooltip;
}

function crearCarouselItem(producto, isActive) {
  const primeraPalabraDesc = producto.descripcion.split(' ')[0] || '';
  const imageId = producto.imagen1.split('/d/')[1]?.split('/')[0];
  const imageUrl = `https://drive.google.com/thumbnail?id=${imageId}&sz=w800-h600`;

  const item = document.createElement('div');
  item.className = `carousel-item${isActive ? ' active' : ''}`;
  item.dataset.nombre = primeraPalabraDesc;
  item.style.position = 'relative';

  const img = document.createElement('img');
  img.src = imageUrl;
  img.alt = `Producto: ${primeraPalabraDesc}`;
  img.className = 'd-block w-100';
  img.style.cursor = 'pointer';
  img.style.height = '50vh';
  img.style.objectFit = 'cover';
  img.style.borderRadius = '10px';
  img.style.width = '100%';

  const tooltip = crearTooltip(primeraPalabraDesc);

  item.appendChild(img);
  item.appendChild(tooltip);

  return item;
}

function agregarEventos(items) {
  items.forEach(item => {
    const tooltip = item.querySelector('.tooltip-recomendacion');
    item.addEventListener('mouseenter', () => {
      tooltip.style.display = 'block';
      item.style.cursor = 'pointer';
    });
    item.addEventListener('mouseleave', () => {
      tooltip.style.display = 'none';
    });
    item.addEventListener('click', () => {
      const nombre = item.dataset.nombre;
      setBusqueda(nombre);
      console.log('nombre en head', nombre);
    });
  });
}

const style = (() => {
  const s = document.createElement('style');
  s.textContent = `
    .carousel-control-prev { left: 3%; }
    .carousel-control-next { right: 3%; }
    .tooltip-recomendacion {
      position: absolute;
      bottom: 15px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0,0,0,0.75);
      color: white;
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 1.2rem;
      display: none;
      pointer-events: none;
      z-index: 10;
      white-space: nowrap;
    }
  `;
  return s;
})();
