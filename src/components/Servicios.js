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
            <h1 class="titulo">Servicios</h1>
            <h2 class="subtitulo-servicios">Degustaciones</h2>
            <p class="servicios-texto"> Ofrecemos una experiencia única de degustación de cafes e infusiones, donde podrás explorar una variedad de sabores y aromas.</p>
        </div>

        <div class="carousel-background">
            <div class="carousel-servicios-wrapper">
                <button class="btn-servicios" id="prevBtn">←</button>
                <div class="carousel-servicios">
                    <div class="imagen-servicios" id="x1"><img src="images/reseña1.jpg" alt="Imagen 1"></div>
                    <div class="imagen-servicios" id="x2"><img src="images/reseña1.jpg" alt="Imagen 2"></div>
                    <div class="imagen-servicios" id="x3"><img src="images/reseña1.jpg" alt="Imagen 3"></div>
                </div>
                <button class="btn-servicios" id="nextBtn">→</button>
            </div>
        </div>

        <div class="container">
        <h1 class="subtitulo-servicios">Trato cercano</h1>
        <p class="servicios-texto"> Nuestro equipo está comprometido a brindarte un trato cercano y personalizado, asegurando que cada visita sea especial.</p>
        <img src="images/reseña1.jpg" alt="Imagen 4" id="x4">
        </div>
    `;

    const style = document.createElement('style');
    style.textContent = `

        .subtitulo-servicios {
            color:rgb(255, 255, 255);
            background: var(--secondary-color);
            text-align: center;
            border-radius: 10px;
            margin: 0 auto 1.5rem auto;
            padding: 0.4em 1em 0.2em 1em;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            font-size: 1.5rem;
            font-family: 'Aloja Extended', sans-serif !important;
            font-weight: 500;
            letter-spacing: 0.5px;
            display: table;
            max-width: 100%;
            box-sizing: border-box;
            word-break: break-word;
            }
        
        .servicios-texto {
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
        }

        .carousel-background {
            background: var(--main-color);
            padding: 40px 0;
        }

        .carousel-servicios-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            width: 100%;
            max-width: 100%;
            margin: 0 auto;
        }

        .carousel-servicios {
            position: relative;
            width: 100%;
            height: 200px;
        }

        .imagen-servicios {
            position: absolute;
            top: 0;
            width: 160px;
            opacity: 0.3;
            transition: all 0.5s ease;
        }

        .imagen-servicios img {
            width: 100%;
            display: block;
        }

        .imagen-servicios.active {
            opacity: 1;
            transform: translateX(-50%) scale(1.4);
            left: 50%;
            z-index: 3;
        }

        .imagen-servicios.left-item,
        .imagen-servicios.right-item {
            z-index: 1;
            transform: translateX(-50%) scale(1);
        }

        .btn-servicios {
            background: var(--terciary-color);
            border: none;
            font-size: 32px;
            color: white;
            cursor: pointer;
            padding: 10px;
            z-index: 5;
        }

        @media (max-width: 600px) {
            .imagen-servicios {
                width: 120px;
            }
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

    return section;
}