export function SobreNosotras2() {
    const section = document.createElement('section');
    section.className = 'somos_nosotras';
    section.id = "somos_nosotras";

    section.innerHTML = `
        <h2 class="titulo">Sobre Nosotras</h2>
        <div class="somos_nosotras-content">
            <div class="image-container">
                <img class="somos_nosotras-img" src="/images/SobreNosotras1.webp" id="somos_nosotras_foto1" alt="Sobre Nosotras 1">
                <img class="somos_nosotras-img-2" src="/images/SobreNosotras2.webp" id="somos_nosotras_foto2" alt="Sobre Nosotras 2">
            </div>
            <p class="somos_nosotras-texto">
                Lura significa tierra, somos una tienda de productos ecológicos/locales que nace del amor y la preocupación por conservarla.
            </p>
            <p class="somos_nosotras-texto">
                Somos Alicia y Victoria apasionadas de la salud, la nutrición, la agricultura y la sostenibilidad.
            </p>
        </div>
    `;

    // Animación: fade-in al montar para todos los párrafos
    setTimeout(() => {
        const textos = section.querySelectorAll('.somos_nosotras-texto');
        textos.forEach(texto => {
            if (texto) texto.classList.add('visible');
        });
    }, 200);

    // Aplicar animación a las imágenes después de un pequeño retraso
    setTimeout(() => {
        const img1 = section.querySelector('.somos_nosotras-img');
        const img2 = section.querySelector('.somos_nosotras-img-2');
        if (img1) img1.classList.add('visible');
        if (img2) img2.classList.add('visible');
    }, 100);

    // Estilos
    const style = document.createElement("style");
    style.innerHTML = `
        .somos_nosotras-content {
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
            flex-wrap: wrap;
            width: 100%;
        }

        .somos_nosotras-img,
        .somos_nosotras-img-2 {
            flex: 1 1 45%;
            max-width: 45%;
            height: 700px;
            object-fit: cover;
            border-radius: 1%;
            opacity: 0;
            transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .somos_nosotras-img {
            transform: translateX(100%);
        }

        .somos_nosotras-img-2 {
            transform: translateX(-100%);
        }

        .somos_nosotras-img.visible,
        .somos_nosotras-img-2.visible {
            opacity: 1;
            transform: translateX(0);
        }

        .somos_nosotras-texto {
            font-family: "Hanken Grotesk", sans-serif;
            font-weight: 400;
            font-size: 18px;
            color: #303030;
            max-width: 800px;
            margin: 0 auto 20px auto;
            line-height: 1.6;
            padding: 10px;
            border-radius: 10px;
            background-color: var(--terciary-color);
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s cubic-bezier(.4,2,.6,1);
        }

        .somos_nosotras-texto.visible {
            opacity: 1;
            transform: translateY(0);
        }

        @media (max-width: 600px) {
            .titulo {
                font-size: 27px;
                padding: 10px;
            }

            .somos_nosotras-texto {
                font-size: 16px;
                max-width: 90vw;
            }

            .somos_nosotras-img,
            .somos_nosotras-img-2 {
                flex: 1 1 90%;
                max-width: 90%;
                height: 600px;
            }
        }
    `;
    document.head.appendChild(style);

    return section;
}
