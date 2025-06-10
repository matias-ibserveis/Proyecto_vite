export function NuestraFilosofia() {
    const section = document.createElement('section');
    section.className = 'nuestra-filosofia';
    section.id = 'nuestra-filosofia';

    section.innerHTML = `
        <h2 class="filosofia-titulo anim-up">¿Cúal es nuestra Filosofía?</h2>
        <div class="info-container anim-right">
            <div class="info-text">
                <p class="info-texto">
                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br><br>
                    xxxxxxxxxxxxxx<br><br>
                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br><br>
                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br><br>
                    xxxxxxxxxxxxxxxxxxxxxxxxx<br>
                    xxxxxxxxxxxx
                </p>
            </div>
            <div class="info-image">
                <img src="/images/reseña1.jpg" alt="Foto" class="info-img" />
            </div>
        </div>
        <br><br><br><br><br><br>
        <div class="info-container anim-left">
            <div class="info-image">
                <img src="/images/reseña1.jpg" alt="Foto" class="info-img" />
            </div>
            <div class="info-text">
                <p class="info-texto">
                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br><br>
                    xxxxxxxxxxxxxx<br><br>
                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br><br>
                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br><br>
                    xxxxxxxxxxxxxxxxxxxxxxxxx<br>
                    xxxxxxxxxxxx
                </p>
            </div>
        </div>
    `;

    // Animaciones por scroll
    const animElements = section.querySelectorAll('.anim-up, .anim-left, .anim-right');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('mostrar', 'anim-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    animElements.forEach(el => observer.observe(el));

    // Estilos
    const style = document.createElement("style");
    style.innerHTML = `
.nuestra-filosofia {
    padding: 2rem;
    background-color: var(--terciary-color);
    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
    border-radius: 25px;
    max-width: 1300px;      /* Limita el ancho en desktop */
    margin: 40px auto;     /* Centra el bloque */
    width: 100%;           /* Ocupa todo el ancho disponible */
    border: 6px solid var(--main-color);
}
.filosofia-titulo {
    position: relative;
    top: -180px;
    font-family: 'Aloja Extended', sans-serif;
    font-size: 2rem;
    font-weight: 700;
    color: white;
    border: none;
    margin-top: 60px;
    margin-bottom: 5px;
    background-attachment: fixed;
    background-color: var(--main-color) !important;
    display: inline-block;
    border-radius: 10px;
    padding: 15px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
}
.info-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
}
.info-text {
    flex: 1;
    max-width: 50%;
}
.info-texto {
    font-family: "Hanken Grotesk", sans-serif;
    font-size: 1.2rem;
    line-height: 1.8;
    color: #555;
    word-break: break-all;  
    overflow-wrap: break-word;
    background-color: rgba(0, 0, 0, 0.06);
    border-radius: 15px;
    padding: 20px;
}
.info-image {
    flex: 1;
    max-width: 45%;
    margin-bottom: 20px;
}
.info-img {
    width: 100%;
    height: auto;
    border-radius: 15px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
    object-fit: cover;
    border: 3px solid var(--main-color);
}
.mostrar {
    opacity: 1;
    transform: translateX(0) translateY(0);
}
@media (max-width: 768px) {
    .info-container {
        flex-direction: column;
        align-items: center;
    }
    .info-text, .info-image {
        max-width: 100%;
        word-break: break-all;
        overflow-wrap: break-word;
    }
    .bloque.titulo {
        font-size: 2rem;
        text-align: center;
    }
    .info-texto {
        font-size: 1rem;
    }
}
.anim-up {
    opacity: 0;
    transform: translateY(-60px);
    transition: opacity 0.8s, transform 0.8s cubic-bezier(.4,2,.6,1);
}
.anim-left {
    opacity: 0;
    transform: translateX(-60px);
    transition: opacity 0.8s, transform 0.8s cubic-bezier(.4,2,.6,1);
}
.anim-right {
    opacity: 0;
    transform: translateX(60px);
    transition: opacity 0.8s, transform 0.8s cubic-bezier(.4,2,.6,1);
}
.anim-visible {
    opacity: 1 !important;
    transform: translateX(0) translateY(0) !important;
}
    `;
    document.head.appendChild(style);

    return section;
}