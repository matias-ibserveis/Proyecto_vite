export function SobreNosotras() {
    const section = document.createElement('section');
    section.className = 'sobre-nosotras';
    section.id = "sobre-nosotras";

    section.innerHTML = `
        <h2 class="titulo">Sobre Nosotras</h2>
        <div class="sobre-nosotras-content">
            <div class="image-container">
                <img class="sobre-nosotras-img" src="/images/SobreNosotras1.webp" id="sobrenosotrasfoto1" alt="Sobre Nosotras 1">
                <img class="sobre-nosotras-img-2" src="/images/SobreNosotras2.webp" id="sobrenosotrasfoto2" alt="Sobre Nosotras 2">
            </div>
            <p class="sobre-nosotras-texto">
                Lura significa tierra, somos una tienda de productos ecológicos/locales que nace del amor y la preocupación por conservarla.
            </p>
            <p class="sobre-nosotras-texto">
                Somos Alicia y Victoria apasionadas de la salud, la nutrición, la agricultura y la sostenibilidad.
            </p>
        </div>
        <div class="carrusel-marquee">
            <div class="carrusel-marquee-inner" id="marqueeInner">
                <!-- Las imágenes se generarán aquí -->
            </div>
        </div>
    `;

    const images = [
        "/imagenes/infinito1.jpg",
        "/imagenes/infinito2.jpg",
        "/imagenes/infinito3.jpg",
        "/imagenes/infinito4.jpg",
        "/imagenes/infinito5.jpg",
        "/imagenes/infinito6.jpg"
    ];

    const marqueeInner = section.querySelector('#marqueeInner');

    // Generar 4 copias para garantizar continuidad
    const imageBlock = images.map(img =>
        `<img src="${img}" alt="${img.split('/').pop().split('.')[0]}" />`
    ).join('');

    marqueeInner.innerHTML = imageBlock + imageBlock + imageBlock + imageBlock;

    // Asegurar que el ancho sea suficiente
    setTimeout(() => {
        const containerWidth = marqueeInner.scrollWidth / 2;
        marqueeInner.style.width = `${containerWidth * 2}px`;
    }, 100);

    // Animación: fade-in al montar para todos los párrafos
    setTimeout(() => {
        const textos = section.querySelectorAll('.sobre-nosotras-texto');
        textos.forEach(texto => {
            if (texto) texto.classList.add('visible');
        });
    }, 200);

    // Aplicar animación a las imágenes después de un pequeño retraso
    setTimeout(() => {
        const img1 = section.querySelector('.sobre-nosotras-img');
        const img2 = section.querySelector('.sobre-nosotras-img-2');
        if (img1) img1.classList.add('visible');
        if (img2) img2.classList.add('visible');
    }, 100);

    // Estilos
    const style = document.createElement("style");
    style.innerHTML = `
        .sobre-nosotras-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
        }

        .image-container {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-bottom: 20px;
        }

        .sobre-nosotras-img {
            width: 33%;
            height: 33%;
            border-radius: 10%;
            opacity: 0;
            transform: translateX(100%);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .sobre-nosotras-img-2 {
            width: 33%;
            height: 33%;
            border-radius: 10%;
            opacity: 0;
            transform: translateX(-100%);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .sobre-nosotras-img.visible {
            opacity: 1;
            transform: translateX(0);
        }

        .sobre-nosotras-img-2.visible {
            opacity: 1;
            transform: translateX(0);
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
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s cubic-bezier(.4,2,.6,1);
        }

        @media (max-width: 600px) {
            .titulo {
                font-size: 27px;
                padding: 10px;
            }
            
            .sobre-nosotras-texto {
                font-size: 16px;
                padding: 10px;
                max-width: 90vw;
            }
        }

        .sobre-nosotras-texto.visible {
            opacity: 1;
            transform: translateY(0);
        }

        .carrusel-marquee {
            overflow: hidden;
            width: 100%;
            height: 340px;
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

        /* Animación mejorada para loop perfecto */
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
            
            /* Ajuste para móviles */
            @keyframes marquee {
                100% {
                    transform: translateX(-50%);
                }
            }
        }
    `;
    document.head.appendChild(style);

    return section;
}