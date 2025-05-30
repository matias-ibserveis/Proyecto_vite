export function SobreNosotras() {
    const section = document.createElement('section');
    section.className = 'sobre-nosotras';

    section.innerHTML = `
        <p class="sobre-nosotras-texto">
            Somos Lura, una tienda de productos ecológicos y locales gestionada con pasión para una alimentación saludable. </br>¡Gracias por confiar en nosotras!
        </p>
        <div class="carrusel-marquee">
          <div class="carrusel-marquee-inner" id="marqueeInner">
            <!-- Las imágenes se generarán aquí -->
          </div>
        </div>
    `;

    const images = [
        "public/imagenes/infinito1.jpg",
        "public/imagenes/infinito2.jpg",
        "public/imagenes/infinito3.jpg",
        "public/imagenes/infinito4.jpg",
        "public/imagenes/infinito5.jpg",
        "public/imagenes/infinito6.jpg"
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

    // Animación: fade-in al montar
    setTimeout(() => {
        const texto = section.querySelector('.sobre-nosotras-texto');
        if (texto) texto.classList.add('visible');
    }, 200);



    // Estilos
    const style = document.createElement("style");
    style.innerHTML = `
    .sobre-nosotras {
        text-align: left;
        margin-bottom: 2rem;
    }

    .sobre-nosotras-texto {
            font-family: "Hanken Grotesk", sans-serif;
            font-weight: 400;
            font-size: 1rem;
            color: #303030;
            max-width: 98%;
            margin: 0 auto;
            line-height: 1.6;
            padding: 0.5rem;
            border-radius: 10px;
            background: fixed;
            margin-bottom: 20px;
            background-color: var(--terciary-color);
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s cubic-bezier(.4, 2, .6, 1);
        }

    .sobre-nosotras-texto.visible {
            opacity: 1;
            transform: translateY(0);
        }

    .sobre-nosotras img {
            width: 200px;
            height: 200px;
            border-radius: 10 %;
            margin-bottom: 20px;
        }

        @media(max-width: 600px) {
            .sobre-nosotras-texto {
                        font-size: 0.90rem;
                        padding: 0.5rem;
                        max-width: 98%;
                    }
                }

  `;
    document.head.appendChild(style);



    return section;
}