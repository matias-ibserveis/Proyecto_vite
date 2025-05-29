export function SobreNosotras() {
    const section = document.createElement('section');
    section.className = 'sobre-nosotras';

    section.innerHTML = `
        <h2 class="sobre-nosotras-titulo">Sobre nosotras</h2>
        <p class="sobre-nosotras-texto">
            Somos Lura, una tienda de productos ecológicos y locales gestionada por mujeres apasionadas por la alimentación saludable y el comercio de proximidad. ¡Gracias por confiar en nosotras!
        </p>
        <div class="carrusel-marquee">
          <div class="carrusel-marquee-inner">
            <img src="images/infinito1.jpg" alt="1" />
            <img src="images/infinito2.jpg" alt="2" />
            <img src="images/infinito3.jpg" alt="3" />
            <img src="images/infinito4.jpg" alt="4" />
            <img src="images/infinito5.jpg" alt="5" />
            <img src="images/infinito6.jpg" alt="6" />
            <!-- Repite las imágenes para que el bucle sea perfecto -->
            <img src="images/infinito1.jpg" alt="1" />
            <img src="images/infinito2.jpg" alt="2" />
            <img src="images/infinito3.jpg" alt="3" />
            <img src="images/infinito4.jpg" alt="4" />
            <img src="images/infinito5.jpg" alt="5" />
            <img src="images/infinito6.jpg" alt="6" />
            <!-- Repite las imágenes para que el bucle sea perfecto -->
            <img src="images/infinito1.jpg" alt="1" />
            <img src="images/infinito2.jpg" alt="2" />
            <img src="images/infinito3.jpg" alt="3" />
            <img src="images/infinito4.jpg" alt="4" />
            <img src="images/infinito5.jpg" alt="5" />
            <img src="images/infinito6.jpg" alt="6" />
            <!-- Repite las imágenes para que el bucle sea perfecto -->
            <img src="images/infinito1.jpg" alt="1" />
            <img src="images/infinito2.jpg" alt="2" />
            <img src="images/infinito3.jpg" alt="3" />
            <img src="images/infinito4.jpg" alt="4" />
            <img src="images/infinito5.jpg" alt="5" />
            <img src="images/infinito6.jpg" alt="6" />
           <!-- Repite las imágenes para que el bucle sea perfecto -->
            <img src="images/infinito1.jpg" alt="1" />
            <img src="images/infinito2.jpg" alt="2" />
            <img src="images/infinito3.jpg" alt="3" />
            <img src="images/infinito4.jpg" alt="4" />
            <img src="images/infinito5.jpg" alt="5" />
            <img src="images/infinito6.jpg" alt="6" />
          </div>
        </div>
    `;

    // Animación: fade-in al montar
    setTimeout(() => {
        const texto = section.querySelector('.sobre-nosotras-texto');
        if (texto) texto.classList.add('visible');
    }, 200);

    return section;
}