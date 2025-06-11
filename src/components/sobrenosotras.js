export function SobreNosotras() {
    const section = document.createElement('section');
    section.className = 'sobre-nosotras';
    section.id = "sobre-nosotras";

    section.innerHTML = `
    <h2 class="sobre-nosotras-titulo anim-up">Sobre Nosotras</h2>
    <div class="info-nosotras-foto-container anim-up">
        <img src="/images/reseña1.jpg" alt="Cesta Semanal" class="info-nosotras-foto" />
    </div>
    <p class="sobre-nosotras-texto anim-up">
        Somos Lura, una tienda de productos ecológicos y locales gestionada con pasión para una alimentación saludable. </br>¡Gracias por confiar en nosotras!
    </p>
    <div class="nosotras-carrusel-marquee anim-up">
        <div class="nosotras-carrusel-marquee-inner" id="nosotrasMarqueeInner">
        <!-- Las imágenes se generarán aquí -->
        </div>
    </div>
    <hr class="divider anim-up" />
    `;

    // Carrusel imágenes
    const images = [
        "/imagenes/infinito1.jpg",
        "/imagenes/infinito2.jpg",
        "/imagenes/infinito3.jpg",
        "/imagenes/infinito4.jpg",
        "/imagenes/infinito5.jpg",
        "/imagenes/infinito6.jpg"
    ];
    const marqueeInner = section.querySelector('#nosotrasMarqueeInner');
    const imageBlock = images.map(img =>
        `<img src="${img}" alt="${img.split('/').pop().split('.')[0]}" />`
    ).join('');
    marqueeInner.innerHTML = imageBlock + imageBlock + imageBlock + imageBlock;

    // Espera a que todas las imágenes carguen antes de calcular el ancho
    const imgs = marqueeInner.querySelectorAll('img');
    let loaded = 0;
    imgs.forEach(img => {
        img.onload = img.onerror = () => {
            loaded++;
            if (loaded === imgs.length) {
                const containerWidth = marqueeInner.scrollWidth / 2;
                marqueeInner.style.width = `${containerWidth * 2}px`;
            }
        };
    });

    // Animaciones por scroll (IntersectionObserver)
    const animElements = section.querySelectorAll('.anim-up, .anim-left, .anim-right, .anim-down');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('anim-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    animElements.forEach(el => observer.observe(el));

    // Estilos
    const style = document.createElement("style");
    style.innerHTML = `
.sobre-nosotras-titulo {
    font-family: 'Aloja Extended', sans-serif;
    font-size: 2rem;
    font-weight: 700;
    color: white;
    border: none;
    margin-top: 100px;
    margin-bottom: 40px;
    background-attachment: fixed;
    background-color: var(--main-color) !important;
    display: inline-block;
    border-radius: 10px;
    padding: 15px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
}
.sobre-nosotras-texto {
    font-family: "Hanken Grotesk", sans-serif;
    font-weight: 400;
    font-size: 18px;
    color: #303030;
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.6;
    padding-top: 5px;
    padding-bottom: 5px;
    border-radius: 10px;
    background: fixed;
    margin-bottom: 20px;
    background-color: var(--terciary-color);
    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
}
.info-nosotras-foto {	
    border-radius: 10%;
    border: 10px solid var(--main-color);
    margin-top: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
    width: 70%;
}
.sobre-nosotras img {
    width: 200px;
    height: 200px;
    border-radius: 10%;
    margin-bottom: 20px;
}
.nosotras-carrusel-container {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
}
.nosotras-carrusel-marquee {
    overflow: hidden;
    width: 100%;
    max-width: 1360px;
    height: 300px;
    background: var(--terciary-color);
    padding: 0;
    position: relative;
    border: 5px solid var(--main-color);
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
    margin: 0 auto 24px auto;
    display: flex;
    justify-content: center;
}
.nosotras-carrusel-marquee-inner {
    display: flex;
    gap: 5px;
    height: 100%;
    animation: nosotras-marquee 60s linear infinite;
    will-change: transform;
    backface-visibility: hidden;
}
.nosotras-carrusel-marquee-inner img {
    height: 100%;
    width: auto;
    object-fit: cover;
    display: block;
    flex-shrink: 0;
    border-radius: 10%;
}
@keyframes nosotras-marquee {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
}

.lightbox-servicio {
    display: none;
    position: fixed;
    z-index: 9999;
    left: 0; top: 0;
    width: 100vw; height: 100vh;
    background: rgba(0,0,0,0.7);
    align-items: center;
    justify-content: center;
}
.lightbox-servicio.active {
    display: flex;
}
.lightbox-servicio img {
    max-width: 80vw;
    max-height: 80vh;
    width: auto;
    height: auto;
    border-radius: 18px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
    background: #fff;
    padding: 12px;
    display: block;
    margin: auto;
}
@media (max-width: 900px) {
    .nosotras-carrusel-marquee {
        min-height: 120px;
        max-height: 120px;
        height: 120px;
        padding: 0;
    }
    .nosotras-carrusel-marquee-inner img {
        height: 90px;
        width: 90px;
    }
}
@media (max-width: 600px) {
    .sobre-nosotras-titulo {
        font-size: 27px;
        padding: 10px;
    }
    .sobre-nosotras-texto {
        font-size: 16px;
        padding: 10px;
        max-width: 90vw;
    }
    .nosotras-carrusel-marquee {
        min-height: 130px;
        max-height: 120px;
        height: 70px;
        padding: 0;
    }
    .nosotras-carrusel-marquee-inner img {
        height: 120px;
        width: 120px;
    }
}
/* Animaciones scroll */
.anim-up {
  opacity: 0;
  transform: translateY(-60px);
  transition: opacity 0.8s, transform 0.8s cubic-bezier(.4,2,.6,1);
}
.anim-visible {
  opacity: 1 !important;
  transform: translateX(0) translateY(0) !important;
}
    `;
    document.head.appendChild(style);


    const lightbox = document.createElement('div');
lightbox.id = 'lightbox-nosotras';
lightbox.className = 'lightbox-servicio';
lightbox.innerHTML = `<img id="lightbox-img-nosotras" src="" alt="Imagen ampliada">`;
document.body.appendChild(lightbox);

const fotoPrincipal = section.querySelector('.info-nosotras-foto');
const lightboxImg = document.getElementById('lightbox-img-nosotras');

if (fotoPrincipal) {
    fotoPrincipal.style.cursor = 'zoom-in';
    fotoPrincipal.addEventListener('click', () => {
        lightboxImg.src = fotoPrincipal.src;
        lightbox.classList.add('active');
    });
}

lightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
    lightboxImg.src = '';
});

    return section;
}