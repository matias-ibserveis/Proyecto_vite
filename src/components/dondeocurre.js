export function DondeOcurre() {
    const dondeOcurre = document.createElement("section");
    dondeOcurre.className = "container py-5";
    dondeOcurre.id = "dondeocurre";
    dondeOcurre.innerHTML = `  
        <h2 class="lugar-titulo3 anim-down">Donde Ocurre la Magia...</h2>
        <div class="video-container anim-down">
<iframe
    id="luraVideo"
    width="100%"
    height="540"
    src="https://www.youtube.com/embed/G-Wt3EwPg3E?enablejsapi=1&mute=1&autoplay=1&loop=1&playlist=G-Wt3EwPg3E"
    title="Estancia Lura Mallorca"
    frameborder="0"
    allow="autoplay; encrypted-media"
    allowfullscreen
    enablejsapi=1
></iframe>
        </div>
        
        <div class="row">
            <div class="col-12 text-center">
                <button id="toggleLuraBtn" class="lugar-toggle-btn anim-down">Ver zonas de LURA</button>
            </div>
        </div>

        <section class="lugar-frame lugar-frame-collapsed anim-down">
            <h2 class="lugar-titulo-encabezado2 anim-down">Zonas de LURA</h2>  
<div class="lugar-row anim-down">
    <div class="lugar-img-container anim-down">
        <img src="/images/reseña1.jpg" alt="Foto del lugar" class="lugar-img anim-down" />
    </div>
    <div class="lugar-text-container anim-down">
        <h3 class="lugar-titulo anim-down">Título de la sección</h3>
        <p class="lugar-texto anim-down">
            Aquí va el texto descriptivo del lugar, puedes poner lo que quieras sobre la foto de la izquierda.
        </p>
    </div>
</div>


<div class="lugar-row anim-down">
    <div class="lugar-img-container anim-down">
        <img src="/images/reseña1.jpg" alt="Foto del lugar" class="lugar-img anim-down" />
    </div>
    <div class="lugar-text-container anim-down">
        <h3 class="lugar-titulo anim-down">Título de la sección</h3>
        <p class="lugar-texto anim-down">
            Aquí va el texto descriptivo del lugar, puedes poner lo que quieras sobre la foto de la izquierda.
        </p>
    </div>
</div>


<div class="lugar-row anim-down">
    <div class="lugar-img-container anim-down">
        <img src="/images/reseña1.jpg" alt="Foto del lugar" class="lugar-img anim-down" />
    </div>
    <div class="lugar-text-container anim-down">
        <h3 class="lugar-titulo anim-down">Título de la sección</h3>
        <p class="lugar-texto anim-down">
            Aquí va el texto descriptivo del lugar, puedes poner lo que quieras sobre la foto de la izquierda.
        </p>
    </div>
</div>

        </section>
        <hr class="divider anim-down" />
    `;

    const style = document.createElement('style');
    style.innerHTML = `
.lugar-titulo3 {
    font-family: 'Aloja Extended', sans-serif;
    font-size: 2rem;
    font-weight: 700;
    color: white;
    border: none;
    margin-bottom: 0;
    background-attachment: fixed;
    background-color: var(--main-color) !important;
    display: inline-block;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
}
.lugar-titulo-encabezado {
    font-family: 'Aloja Extended', sans-serif;
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    color: #fff;
    background-color: var(--main-color) !important;
    display: inline-block;
    border-radius: 10px;
    padding: 18px 32px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
    text-align: center;
}
.video-container {
    margin: 2rem auto;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 2500px;
    border: 9px solid var(--main-color);
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
    background: var(--main-color);
}
.video-container iframe {
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 12px;
    border: none;
    display: block;
    max-width: 100%;
    height: auto;
    min-height: 735px;
}
.lugar-toggle-btn {
    margin-top: 10px;
    font-size: 1.3rem;
    padding: 20px 40px;
    border-radius: 8px;
    font-weight: 700;
    text-decoration: none;
    color: #fff !important;
    background-color: #b25415 !important;
    display: inline-block;
    transition: 
        transform 0.18s cubic-bezier(.4,2,.6,1),
        background 0.2s,
        filter 0.2s;
    font-family: 'Aloja Extended', sans-serif;
    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
    border: none;
    cursor: pointer;
    will-change: transform;
}
.lugar-toggle-btn:hover {
    background: #8a3e0e !important;
    transform: scale(1.08);
}
.lugar-toggle-btn:active,
.lugar-toggle-btn.lugar-btn-activo {
    background-color: #6a2800 !important;
    filter: brightness(0.85);
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
    max-height: 2650px;
    padding: 5rem 1rem;
}
.lugar-frame-collapsed {
    opacity: 0;
    max-height: 0;
    padding-top: 0;
    padding-bottom: 0;
    pointer-events: none;
    border: none !important;
    background: transparent !important;
    transition: max-height 0.7s cubic-bezier(.4,2,.6,1), opacity 0.5s, padding 0.5s, border 0.3s, background 0.3s;
}
.lugar-row {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    margin-bottom: 3rem;
    margin-top: 2rem;
}
.lugar-img-container {
    flex: 1 1 350px;
    display: flex;
    justify-content: center;
}
.lugar-img {
    width: 100%;
    max-width: 600px;
    height: 400px;
    border-radius: 18px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
    border: 3px solid var(--main-color);
    object-fit: cover;
    cursor: zoom-in;
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
.lugar-titulo-encabezado2 {
    font-family: 'Aloja Extended', sans-serif;
    font-size: 3.0rem;
    margin-bottom: 0.5rem;
    color: rgb(255, 255, 255);
    background-attachment: fixed;
    background-color: var(--main-color) !important;
    display: inline-block;
    border-radius: 10px;
    padding: 22px 40px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
    text-align: center;
}
.lugar-texto {
    font-family: "Hanken Grotesk", sans-serif;
    font-size: 1.1rem;
    color: #333;
    line-height: 1.7;
    background-color: rgba(0, 0, 0, 0.06);
    border-radius: 15px;
    padding: 20px;
    margin-bottom: 8rem;
}

/* Lightbox */
.lightbox-servicio {
    display: none;
    position: fixed;
    z-index: 9999;
    left: 0; top: 0;
    width: 100vw; height: 100vh;
    background: rgba(0,0,0,0.7);
    align-items: center;
    justify-content: center;
}
.lightbox-servicio.active {
    display: flex;
}
.lightbox-servicio img {
    max-width: 80vw;
    max-height: 80vh;
    width: auto;
    height: auto;
    border-radius: 18px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
    background: #fff;
    padding: 12px;
    display: block;
    margin: auto;
    border: none !important;
}

/* Responsive */
@media (max-width: 768px) {
    .lugar-titulo-encabezado {
        font-size: 1.5rem;
        padding: 12px 10px;
    }
    .video-container {
        max-width: 100%;
        padding: 0;
        border-width: 5px;
    }
    .video-container iframe {
        width: 100%;
        height: auto;
        aspect-ratio: 16 / 9;
        min-height: unset;
        max-height: 60vw;
        display: block;
        border-radius: 8px;
        pointer-events: none;
        background: #000;
    }
    .lugar-row {
        flex-direction: column !important;
        gap: 2rem;
        margin-bottom: 3rem;
        margin-top: 2rem;
        align-items: center;
    }
    .lugar-img-container,
    .lugar-text-container {
        max-width: 100%;
        flex: unset;
    }
    .lugar-img {
        width: 90vw;
        max-width: 350px;
        height: auto;
        min-width: 0;
        min-height: 0;
        margin-bottom: 1rem;
    }
    .lugar-titulo {
        font-size: 1.2rem;
        text-align: center;
        padding: 10px;
    }
    .lugar-texto {
        font-size: 1rem;
        padding: 1rem;
        text-align: center;
    }
}
.anim-down {
    opacity: 0;
    transform: translateY(60px);
    transition: opacity 0.8s, transform 0.8s cubic-bezier(.4,2,.6,1);
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
.video-container iframe {
    height: 220px;
    border-radius: 8px;
    pointer-events: none;
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

    // Animaciones por scroll (como en contacto.js)
    setTimeout(() => {
        const animElements = dondeOcurre.querySelectorAll('.anim-down');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('anim-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        animElements.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight) {
                el.classList.add('anim-visible');
                observer.unobserve(el);
            } else {
                observer.observe(el);
            }
        });
    }, 0);

    // Autoplay al hacer scroll
    setTimeout(() => {
        const video = document.getElementById('luraVideo');
        if (!video) return;
        let played = false;
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !played) {
                    video.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                    played = true;
                }
            });
        }, { threshold: 0.5 });
        observer.observe(video);
    }, 0);

// Lightbox para imágenes de .lugar-img
const lightbox = document.createElement('div');
lightbox.className = 'lightbox-servicio';
lightbox.innerHTML = `<img id="lightbox-img-lugar" src="" alt="Imagen ampliada">`;
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector('img');
dondeOcurre.querySelectorAll('.lugar-img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
    });
});
lightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
    lightboxImg.src = '';
});

    return dondeOcurre;
}