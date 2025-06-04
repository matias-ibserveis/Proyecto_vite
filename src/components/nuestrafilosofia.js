export function NuestraFilosofia() {
    const section = document.createElement('section');
    section.className = 'nuestra-filosofia';

    section.innerHTML = `
        <h2 class="titulo">Nuestra filosofía</h2>
        <div class="row">
            <div class="col-text">
                <p class="bloque bloque-1">En Lura, creemos en la importancia de una alimentación saludable y sostenible.</p>
                <p class="bloque derecha bloque-2">Nuestra filosofía se basa en el respeto por el medio ambiente, la salud de las personas y el apoyo a la economía local.</p>
                <p class="bloque bloque-3">Trabajamos con productores locales que comparten nuestros valores, ofreciendo productos frescos y de calidad.</p>
            </div>
            <div class="col-img">
                <div class="imagen-container">
                    <img class="imagen" src="images/carousel1.jpeg" alt="Nuestra Filosofía">
                </div>
            </div>
        </div>    
    `;

    // Animación de scroll reveal
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('mostrar');
            }
        });
    }, {
        threshold: 0.2
    });

    // Buscar todos los bloques dentro de la sección
    const titulo = section.querySelector('.titulo');
    const bloque1 = section.querySelector('.bloque-1');
    const bloque2 = section.querySelector('.bloque-2');
    const bloque3 = section.querySelector('.bloque-3');
    const imagen = section.querySelector('.imagen');
    
    if (titulo) observer.observe(titulo);
    if (bloque1) observer.observe(bloque1);
    if (bloque2) observer.observe(bloque2);
    if (bloque3) observer.observe(bloque3);
    if (imagen) observer.observe(imagen);

    // Estilos con animaciones mejoradas
    const style = document.createElement("style");
    style.innerHTML = `
    .nuestra-filosofia {
        padding: 3rem 1rem;
        max-width: 1200px;
        margin: 0 auto;
    }
    
    .bloque {
        opacity: 0;
        transition: all 0.8s ease;
        background: var(--main-color);
        padding: 1.8rem;
        margin: 1.5rem 0;
        max-width: 100%;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        font-family: "Hanken Grotesk", sans-serif;
        font-size: 18px;
        line-height: 1.6;
        position: relative;
        overflow: hidden;
    }
    
    /* Animaciones específicas para cada bloque */
    .bloque-1 {
        transform: translateX(-100px);
    }
    
    .bloque-2 {
        transform: translateX(100px);
        background: var(--terciary-color);
        margin-left: auto;
        transition-delay: 0.2s;
    }
    
    .bloque-3 {
        transform: translateX(-100px);
        transition-delay: 0.4s;
    }
    
    .bloque.titulo {
        font-family: "Aloha Extended", sans-serif;
        font-size: 2.2rem;
        background: var(--main-color);
        text-align: center;
        border-radius: 10px;
        margin: 0 auto 2rem auto;
        padding: 0.8rem 2rem;
        opacity: 0;
        transform: translateY(-30px);
        transition: all 0.8s ease;
        max-width: 80%;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
    
    .row {
        display: flex;
        align-items: center;
        gap: 2rem;
    }
    
    .col-text {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    
    .col-img {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
    
    .imagen-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
    
    .imagen {
        width: 100%;
        max-width: 495px;
        height: auto;
        border-radius: 12px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        opacity: 0;
        transform: translateY(50px) scale(0.95);
        transition: all 1s ease;
        object-fit: cover;
        max-height: 500px;
    }
    
    /* Estados de animación */
    .bloque.mostrar,
    .imagen.mostrar {
        opacity: 1;
        transform: translateX(0) translateY(0) scale(1);
    }
    
    /* Efectos suaves */
    .bloque::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 5px;
        height: 100%;
        background: rgba(0, 0, 0, 0.05);
    }
    
    .bloque:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
    }
    
    .bloque.titulo:hover {
        transform: translateY(0);
    }
    
    .imagen-container {
        border-radius: 12px;
        overflow: hidden;
        position: relative;
    }
    
    .imagen-container::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom right, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.03) 100%);
        z-index: 1;
    }
    
    @media(max-width: 992px) {
        .row {
            flex-direction: column;
        }
        
        .col-img {
            width: 100%;
            margin-top: 1.5rem;
            justify-content: center;
        }
        
        .imagen {
            max-width: 100%;
            max-height: 400px;
        }
    }
    
    @media(max-width: 768px) {
        .bloque.titulo {
            font-size: 1.8rem;
            max-width: 90%;
            padding: 0.6rem 1.5rem;
        }
        
        .bloque {
            padding: 1.4rem;
            font-size: 17px;
        }
    }
    
    @media(max-width: 576px) {
        .nuestra-filosofia {
            padding: 1.5rem 1rem;
        }
        
        .bloque.titulo {
            font-size: 1.6rem;
        }
        
        .bloque {
            padding: 1.2rem;
            font-size: 16px;
            margin: 1.2rem 0;
        }
    }
    `;
    document.head.appendChild(style);

    return section;
}