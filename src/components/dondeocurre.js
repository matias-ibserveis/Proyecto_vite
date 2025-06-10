export function DondeOcurre() {
    const dondeOcurre = document.createElement("section");
    dondeOcurre.className = "container py-5";
    dondeOcurre.id = "dondeocurre";
    dondeOcurre.innerHTML = `  
        <div class="row">
            <div class="col-12 text-center">
                <h2 class="lugar-titulo-encabezado">¿Dónde ocurre la magia?</h2>  
                <div class="video-container">
                    <iframe width="1387" height="780" src="https://www.youtube.com/embed/G-Wt3EwPg3E" title="Estancia Lura Mallorca" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
                <button id="toggleLuraBtn" class="lugar-toggle-btn">Ver zonas de LURA</button>
            </div>
        </div>
        <section class="lugar-frame lugar-frame-collapsed">
            <h2 class="lugar-titulo-encabezado2">Zonas de LURA</h2>  
            <div class="lugar-row">
                <div class="lugar-img-container">
                    <img src="/images/reseña1.jpg" alt="Foto del lugar" class="lugar-img" />
                </div>
                <div class="lugar-text-container">
                    <h3 class="lugar-titulo">Título de la sección</h3>
                    <p class="lugar-texto">
                        Aquí va el texto descriptivo del lugar, puedes poner lo que quieras sobre la foto de la izquierda.
                    </p>
                </div>
            </div>
            <div class="lugar-row">
                <div class="lugar-text-container">
                    <h3 class="lugar-titulo">Otro título</h3>
                    <p class="lugar-texto">
                        Aquí va el texto descriptivo de la segunda sección, ahora el texto está a la izquierda y la foto a la derecha.
                    </p>
                </div>
                <div class="lugar-img-container">
                    <img src="/images/reseña1.jpg" alt="Foto del lugar" class="lugar-img" />
                </div>
            </div>
            <div class="lugar-row">
                <div class="lugar-img-container">
                    <img src="/images/reseña1.jpg" alt="Foto del lugar" class="lugar-img" />
                </div>
                <div class="lugar-text-container">
                    <h3 class="lugar-titulo">Título de la sección</h3>
                    <p class="lugar-texto">
                        Aquí va el texto descriptivo del lugar, puedes poner lo que quieras sobre la foto de la izquierda.
                    </p>
                </div>
            </div>
        </section>
        <hr class="divider anim-down" />
    `;

    const style = document.createElement('style');
    style.innerHTML = `
.lugar-toggle-btn {
    margin-top: 10px;
    font-size: 1.3rem;
    padding: 20px 40px;
    padding-bottom: 20px;
    border-radius: 8px;
    font-weight: 700;
    text-decoration: none;
    color: #fff !important;
    background-color: #b25415 !important;
    display: inline-block;
    transition: transform 0.2s cubic-bezier(.4,2,.6,1);
    font-family: 'Aloja Extended', sans-serif;
    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
}
.lugar-toggle-btn:hover {
    background: var(--secondary-color);
}
.lugar-frame {
    max-width: 1100px;
    margin: 40px auto;
    padding: 2rem 1rem;
    background-color: var(--terciary-color);
    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
    border-radius: 25px;
    border: 6px solid var(--main-color);
    overflow: hidden;
    transition: max-height 0.7s cubic-bezier(.4,2,.6,1), opacity 0.5s, padding 0.5s;
    opacity: 1;
    max-height: 2000px;
    padding: 5rem 1rem;
}
.lugar-frame-collapsed {
    opacity: 0;
    max-height: 0;
    padding-top: 0;
    padding-bottom: 0;
    pointer-events: none;
    transition: max-height 0.7s cubic-bezier(.4,2,.6,1), opacity 0.5s, padding 0.5s;
}
.lugar-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4rem;
    margin-bottom: 10rem;
    margin-top: 4rem;
}
.lugar-img-container {
    flex: 1 1 350px;
    display: flex;
    justify-content: center;
}
.lugar-img {
    width: 100%;
    width: 600px;
    height: 400px;
    border-radius: 18px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
    border: 3px solid var(--main-color);
    object-fit: cover;
}
.lugar-text-container {
    flex: 1 1 350px;
}
.lugar-titulo {
    font-family: 'Aloja Extended', sans-serif;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color:rgb(255, 255, 255);
    background-attachment: fixed;
    background-color: var(--main-color) !important;
    display: inline-block;
    border-radius: 10px;
    padding: 15px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
}
.lugar-titulo-encabezado {
    font-family: 'Aloja Extended', sans-serif;
    font-size: 32px;
    margin-bottom: 1rem;
    color:rgb(255, 255, 255);
    background-attachment: fixed;
    background-color: var(--main-color) !important;
    display: inline-block;
    border-radius: 10px;
    padding: 15px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
}
.lugar-titulo-encabezado2 {
    font-family: 'Aloja Extended', sans-serif;
    font-size: 40px;
    margin-bottom: 0.5rem;
    color:rgb(255, 255, 255);
    background-attachment: fixed;
    background-color: var(--main-color) !important;
    display: inline-block;
    border-radius: 10px;
    padding: 15px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
}
.lugar-texto {
    font-family: "Hanken Grotesk", sans-serif;
    font-size: 1.1rem;
    color: #333;
    line-height: 1.7;
    background-color: rgba(0, 0, 0, 0.06);
    border-radius: 15px;
    padding: 20px;
}
.video-container {
    margin: 2rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 1400px;
    border: 9px solid var(--main-color);
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
}
.video-container iframe {
    width: 100%;
    max-width: 1500px;
    height: 750px;
}

.lugar-toggle-btn:active,
.lugar-toggle-btn.lugar-btn-activo {
    background-color: #8a3e0e !important;
    filter: brightness(0.85);
}
// 
@media (max-width: 900px) {
    .lugar-row {
        flex-direction: column;
        gap: 1.5rem;
        text-align: center;
    }
    .lugar-img-container, .lugar-text-container {
        max-width: 100%;
    }
    .lugar-img {
        width: 100%;
        height: auto;
        max-width: 350px;
    }
    .lugar-frame {
        padding: 2rem 0.5rem;
    }
}
@media (max-width: 700px) {
    .video-container iframe {
        height: 220px;
    }
}
    `;
    document.head.appendChild(style);

    // Animación y lógica del botón
setTimeout(() => {
    const btn = document.getElementById('toggleLuraBtn');
    const frame = dondeOcurre.querySelector('.lugar-frame');
    let abierto = false;
    btn.addEventListener('click', () => {
        abierto = !abierto;
        if (abierto) {
            frame.classList.remove('lugar-frame-collapsed');
            btn.textContent = "Ocultar zonas de LURA";
            btn.classList.add('lugar-btn-activo');
        } else {
            frame.classList.add('lugar-frame-collapsed');
            btn.textContent = "Ver zonas de LURA";
            btn.classList.remove('lugar-btn-activo');
        }
    });
}, 0);

    return dondeOcurre;
}