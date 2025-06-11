export function Servicios() {
    const section = document.createElement('section');
    section.className = 'Servicios';
    section.id = 'Servicios';
    section.style.textAlign = 'center';
    section.style.padding = '40px 0';
    section.style.position = 'relative';
    section.style.minHeight = '300px';

    section.innerHTML = `
<div class="container">
    <h1 class="servicios-titulo anim-up">Servicios</h1>
    <p class="servicios-texto anim-up">
        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
        xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    </p>
    <h2 class="subtitulo-servicios anim-down">Degustaciones</h2>
    <div class="servicios-fotos-horizontales anim-down">
        <img src="images/foto3.jpg" alt="Foto horizontal 3" class="servicio-foto-horizontal">
    </div>
</div>

        <div class="carousel-background">
            <div class="carousel-servicios-wrapper">
                <button class="btn-servicios" id="prevBtn"><</button>
                <div class="carousel-servicios">
                    <div class="imagen-servicios" id="x1"><img src="images/reseña1.jpg" alt="Imagen 1"></div>
                    <div class="imagen-servicios" id="x2"><img src="images/reseña1.jpg" alt="Imagen 2"></div>
                    <div class="imagen-servicios" id="x3"><img src="images/reseña1.jpg" alt="Imagen 3"></div>
                </div>
                <button class="btn-servicios" id="nextBtn">></button>
            </div>
        </div>
<div class="servicios-fotos-horizontales anim-down">
    <img src="images/foto1.jpg" alt="Foto horizontal 1" class="servicio-foto-horizontal">
</div>

    <div class="container">
    <h1 class="subtitulo-servicios anim-down">Trato cercano</h1>
    <p class="servicios-texto anim-up"> Nuestro equipo está comprometido a brindarte un trato cercano y personalizado, asegurando que cada visita sea especial.</p>
    </div>
<div class="servicio-foto-vertical-slot anim-down">
    <img src="images/vertical.jpg" alt="Foto vertical" class="servicio-foto-vertical">
</div>

<div id="lightbox-servicio" class="lightbox-servicio">
  <img id="lightbox-img-servicio" src="" alt="Imagen ampliada">
</div>
    <hr class="divider anim-down" />
    `;

    const style = document.createElement('style');
    style.textContent = `

    .container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

    .servicios-titulo {
        font-family: 'Aloja Extended', sans-serif;
        font-size: 3rem;
        font-weight: 700;
        color: white;
        border: none;
        margin-bottom: 30px;
        background-attachment: fixed;
        background-color: var(--main-color) !important;
        display: inline-block;
        border-radius: 10px;
        padding: 15px 40px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.4);
        text-align: center;
      }
        .subtitulo-servicios {
            color:rgb(255, 255, 255);
            background: var(--secondary-color);
            text-align: center;
            border-radius: 10px;
            margin: 0 auto 1.5rem auto;
            padding: 0.5em 1em 0.5em 1em;
            box-shadow: 0 2px 8px rgba(0,0,0,0.4);
            font-size: 1.5rem;
            font-family: 'Aloja Extended', sans-serif !important;
            font-weight: 500;
            letter-spacing: 0.5px;
            display: table;
            max-width: 100%;
            box-sizing: border-box;
            word-break: break-word;
            margin-top: 80px;
            margin-bottom: -15px;
            }
        
      .servicios-texto {
        font-family: "Hanken Grotesk", sans-serif;
        font-weight: 400;
        font-size: 18px;
        color: #303030;
        max-width: 700px;
        margin: 0 auto;
        line-height: 1.6;
        padding: 18px 24px;
        border-radius: 10px;
        background: var(--terciary-color);
        box-shadow: 0 2px 8px rgba(0,0,0,0.4);
        text-align: center;
        margin-bottom: 40px;
        margin-top: 30px;
        word-break: break-all;    
        overflow-wrap: break-word;
      }

        .carousel-background {
            background: var(--main-color);
            padding: 60px 0;
        }

.carousel-servicios-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    min-height: 420px; /* más alto */

}

.carousel-servicios {
    position: relative;
    width: 100%;
    height: 340px; /* más alto */
    
}

.carousel-background {
    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
    border-radius: 40px;
}

.imagen-servicios {
    position: absolute;
    top: 50%;
    left: -9999px;
    width: 330px; /* más ancho */
    height: 330px; /* más alto */
    opacity: 0.3;
    transition: all 0.5s ease;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid var(--secondary-color);
}

.imagen-servicios img {
    width: 100%;
    height: 260px; /* más alto */
    object-fit: cover;
    border-radius: 50%;
    display: block;
}

.imagen-servicios.active {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.4);
    left: 50%;
    z-index: 3;
}

.imagen-servicios.left-item,
.imagen-servicios.right-item {
    z-index: 1;
    transform: translate(-50%, -50%) scale(1);
}

.btn-servicios {
    background: var(--terciary-color);
    border: 3px solid #fff;
    font-size: 48px;
    color: rgba(146, 113, 52, 0.26); /* más transparente */
    opacity: 0.5; /* medio transparente */
    cursor: pointer;
    padding: 0;
    z-index: 5;
    height: 80px;
    width: 80px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    transition: background 0.2s, border 0.2s, opacity 0.2s;
    outline: none;
    line-height: 1;
    text-align: center;
    position: relative;
}
.btn-servicios:hover {
    opacity: 1;
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
    border-radius: 18px; /* menos redondeado, o pon 0 si quieres cuadrada */
    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
    background: #fff;
    padding: 12px;
    display: block;
    margin: auto;
}



.servicios-fotos-horizontales {
    display: flex;
    gap: 2vw;
    justify-content: center;
    margin: 32px 0;
}
.servicio-foto-horizontal {
    width: 45vw;
    max-width: 500px;
    height: 220px;
    object-fit: cover;
    border-radius: 18px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
    background: #eee;
    border: 4px solid var(--main-color);
}

.servicio-foto-vertical-slot {
    display: flex;
    justify-content: center;
    margin: 24px 0 0 0;
}
.servicio-foto-vertical {
    width: 180px;
    height: 320px;
    object-fit: cover;
    border-radius: 18px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
    background: #eee;
    border: 4px solid var(--main-color);
    margin-top: -30px;
}
@media (max-width: 600px) {
    .servicio-foto-vertical {
        width: 90vw;
        height: 220px;
        max-width: 320px;
    }
}
@media (max-width: 900px) {
    .servicio-foto-horizontal {
        width: 90vw;
        max-width: 100%;
        height: 160px;
    }
    .servicios-fotos-horizontales {
        flex-direction: column;
        gap: 18px;
        align-items: center;
    }
}

        @media (max-width: 600px) {
            .imagen-servicios {
                width: 120px;
            }
        }

    /* Animaciones */
    .anim-up {
        opacity: 0;
        transform: translateY(-60px);
        transition: opacity 0.8s, transform 0.8s cubic-bezier(.4,2,.6,1);
    }
    .anim-down {
        opacity: 0;
        transform: translateY(60px);
        transition: opacity 0.8s, transform 0.8s cubic-bezier(.4,2,.6,1);
    }
    .anim-visible {
        opacity: 1 !important;
        transform: translateX(0) translateY(0) !important;
    }
    `;

    section.appendChild(style);

    // Carousel logic
    let currentIndex = 1;
    const slides = section.querySelectorAll('.imagen-servicios');
    const totalSlides = slides.length;

    function updateCarousel() {
        const spacing = 250;

        slides.forEach((item, index) => {
            item.classList.remove('active', 'left-item', 'right-item');
            item.style.left = '-9999px';
        });

        const leftIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        const rightIndex = (currentIndex + 1) % totalSlides;

        slides[currentIndex].classList.add('active');
        slides[currentIndex].style.left = '50%';

        slides[leftIndex].classList.add('left-item');
        slides[leftIndex].style.left = `calc(50% - ${spacing}px)`;

        slides[rightIndex].classList.add('right-item');
        slides[rightIndex].style.left = `calc(50% + ${spacing}px)`;
    }

    function moveLeft() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalSlides - 1;
        updateCarousel();
    }

    function moveRight() {
        currentIndex = (currentIndex < totalSlides - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    }

    section.querySelector('#prevBtn').addEventListener('click', moveLeft);
    section.querySelector('#nextBtn').addEventListener('click', moveRight);

    updateCarousel();

    // Autoplay cada 3 segundos
    let carouselInterval = setInterval(moveRight, 3000);

    // Pausa autoplay al pasar el mouse (opcional)
    section.querySelector('.carousel-background').addEventListener('mouseenter', () => {
        clearInterval(carouselInterval);
    });
    section.querySelector('.carousel-background').addEventListener('mouseleave', () => {
        carouselInterval = setInterval(moveRight, 3000);
    });

    // Animaciones por scroll
    const animElements = section.querySelectorAll('.anim-up, .anim-down');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('anim-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    animElements.forEach(el => observer.observe(el));

    const lightbox = section.querySelector('#lightbox-servicio');
const lightboxImg = section.querySelector('#lightbox-img-servicio');

// Carrusel: ampliar imagen al hacer click
section.querySelectorAll('.imagen-servicios img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
    });
});

// Fotos horizontales: ampliar imagen al hacer click
section.querySelectorAll('.servicio-foto-horizontal').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
    });
});

lightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
    lightboxImg.src = '';
});

    return section;
}