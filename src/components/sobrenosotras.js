export function SobreNosotras() {
    const section = document.createElement('section');
    section.className = 'sobre-nosotras';

    section.innerHTML = `
        <h2 class="sobre-nosotras-titulo">Sobre nosotras</h2>
        <p class="sobre-nosotras-texto">
            Somos Lura, una tienda de productos ecológicos y locales gestionada por mujeres apasionadas por la alimentación saludable y el comercio de proximidad. ¡Gracias por confiar en nosotras!
        </p>
        <div class="carrusel-marquee">
          <div class="carrusel-marquee-inner" id="marqueeInner">
            <!-- Las imágenes se generarán aquí -->
          </div>
        </div>
    `;

    const images = [
        "images/infinito1.jpg",
        "images/infinito2.jpg",
        "images/infinito3.jpg",
        "images/infinito4.jpg",
        "images/infinito5.jpg",
        "images/infinito6.jpg"
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

    return section;
}