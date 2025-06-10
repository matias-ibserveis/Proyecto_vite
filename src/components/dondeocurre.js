export function DondeOcurre() {
    const dondeOcurre = document.createElement("section");
    dondeOcurre.className = "container py-5";
    dondeOcurre.id = "dondeocurre";
    dondeOcurre.innerHTML = `  
        <div class="row anim-down">
            <div class="col-12 text-center anim-down">
                <h2 class="lugar-titulo-encabezado anim-down">¿Dónde ocurre la magia?</h2>  
                <div class="video-container anim-down">
                    <iframe
                        id="luraVideo"
                        width="1387"
                        height="780"
                        src="https://www.youtube.com/embed/G-Wt3EwPg3E?enablejsapi=1&mute=1"
                        title="Estancia Lura Mallorca"
                        frameborder="0"
                        allow="autoplay; encrypted-media"
                        allowfullscreen
                        enablejsapi=1
                    ></iframe>
                </div>
            </div>
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
                <div class="lugar-text-container anim-down">
                    <h3 class="lugar-titulo anim-down">Otro título</h3>
                    <p class="lugar-texto anim-down">
                        Aquí va el texto descriptivo de la segunda sección, ahora el texto está a la izquierda y la foto a la derecha.
                    </p>
                </div>
                <div class="lugar-img-container anim-down">
                    <img src="/images/reseña1.jpg" alt="Foto del lugar" class="lugar-img anim-down" />
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
    max-width: 1400px;
    pointer-events: none;
}

.anim-down {
    opacity: 0;
    transform: translateY(60px);
    transition: opacity 0.8s, transform 0.8s cubic-bezier(.4,2,.6,1);
}
.anim-visible {
    opacity: 1 !important;
    transform: translateX(0) translateY(0) !important;
}

.lugar-frame-collapsed {
    opacity: 0;
    max-height: 0;
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    pointer-events: none;
    border: none !important;
    background: transparent !important;
    transition: max-height 0.7s cubic-bezier(.4,2,.6,1), opacity 0.5s, padding 0.5s, border 0.3s, background 0.3s;
}



// 
@media (max-width: 900px) {
    .lugar-toggle-btn {
        position: relative;
        z-index: 20; /* sube el botón por encima del video */
        margin-top: 24px;
        margin-bottom: 24px;
    }
    .video-container {
        position: relative;
        z-index: 1;
        max-width: 95vw;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 16px;
    }
    .video-container iframe {
        width: 100%;
        max-width: 95vw;
        height: 200px;
        position: relative;
        z-index: 10;
    }
}
@media (max-width: 700px) {
    .video-container iframe {
        height: 180px;
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

    return dondeOcurre;
}