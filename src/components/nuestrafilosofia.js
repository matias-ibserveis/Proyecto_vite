export function NuestraFilosofia() {
    const section = document.createElement('section');
    section.className = 'nuestra-filosofia';
    section.id = 'nuestra-filosofia';

    section.innerHTML = `
        <h2 class="bloque titulo titulo">Nuestra filosofía</h2>
        <p class="bloque">En Lura, creemos en la importancia de una alimentación saludable y sostenible.</p>
        <p class="bloque derecha">Nuestra filosofía se basa en el respeto por el medio ambiente, la salud de las personas y el apoyo a la economía local.</p>
        <p class="bloque">Trabajamos con productores locales que comparten nuestros valores, ofreciendo productos frescos y de calidad.</p>
    `;

    // Animación de scroll reveal
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('mostrar');
            }
        });
    }, {
        threshold: 0.3
    });

    // Buscar todos los bloques dentro de la sección
    const bloques = section.querySelectorAll('.bloque');
    bloques.forEach(bloque => observer.observe(bloque));


    // Estilos
    const style = document.createElement("style");
    style.innerHTML = `
    .bloque {
        opacity: 0;
        transform: translateX(-100px);
        transition: all 1s ease;
        background: var(--main-color);
        padding: 2rem;
        margin: 25px auto;
        max-width: 600px;
        border-radius: 12px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        font-family: "Hanken Grotesk", sans-serif;
        font-size: 18px;
    }

    .bloque.derecha {
        transform: translateX(100px);
        background: var(--terciary-color);
        margin: 25px auto;
    }

    .bloque.titulo {
        font-family: "Aloha Extended", sans-serif;
        font-size: 2rem;
        background: var(--main-color);
        text-align: center;
        border-radius: 10px;
        margin: 0 auto 1.5rem auto;
        padding: 0.5em 2em 0.3em 2em;
        opacity: 0;
        transform: translateY(-100px);
        transition: all 1s ease;
    }

    .bloque.mostrar {
        opacity: 1;
        transform: translateX(0) translateY(0);
    }

    @media(max-width: 600px) {
      .bloque,
      .bloque.derecha {
            margin-left: auto;
            margin-right: auto;
            max-width: 80 %;
            padding: 1rem;
            font-size: 16px;
        }

      .bloque.titulo {
            max-width: 85 %;
            font-size: 1.5rem;
            padding: 0.5em 1em;
        }
    }

    `;
    document.head.appendChild(style);

    return section;
}
