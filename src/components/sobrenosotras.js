export function SobreNosotras() {
    const section = document.createElement('section');
    section.className = 'sobre-nosotras';
    section.id ="sobre-nosotras"

    section.innerHTML = `
    <h2 class="sobre-nosotras-titulo">Sobre Nosotras</h2>
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

    // Animación: fade-in al montar
    setTimeout(() => {
        const texto = section.querySelector('.sobre-nosotras-texto');
        if (texto) texto.classList.add('visible');
    }, 200);



    // Estilos
    const style = document.createElement("style");
    style.innerHTML = `
        .sobre-nosotras-titulo {
        font-family: 'Aloja Extended', sans-serif;
        font-size: 2rem;
        font-weight: 700;
        color: white;
        border: none;
        margin-top: 60px;
        margin-bottom: 20px;
        background-attachment: fixed;
        background-color: var(--main-color) !important;
        display: inline-block;
        border-radius: 10px;
        padding: 15px;
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
        .sobre-nosotras-titulo {
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

        .sobre-nosotras img {
        width: 200px;
        height: 200px;
        border-radius: 10%;
        margin-bottom: 20px;
        }

        .carrusel-marquee {
        overflow: hidden;
        width: 100%;
        height: 340xpx;
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
            transform: translateX(-50%); /* Usamos porcentaje fijo */
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