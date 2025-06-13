import { NuestraHistoria } from "./nuestrahistoria.js";
import { Talleres } from "./Talleres.js";

export function MasCosas() {
    const mascosas = document.createElement("section");
    mascosas.className = "container py-5";
    mascosas.id = "mascosas";
    mascosas.innerHTML = `  
        <div class="row">
            <div class="col-12 text-center">
                <h2 class="titulo margins">Mas cosas</h2>  
                <p class="descripcion">Explora nuestras secciones para descubrir más.</p>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-4 section-container">
                <h1 class="section-title titulo margins">Video</h1>
                <button class="btn btn-primary DO-secciones show-btn" type="button" data-target="columna1">
                    Ver más +
                </button>
                <div class="section-content" id="columna1">
                    <div class="content-inner">
                        <h1 class="titulo">Video</h1>
                        <iframe
                            id="luraVideo"
                            width="100%"
                            height="540"
                            src="https://www.youtube.com/embed/G-Wt3EwPg3E?enablejsapi=1&mute=1&loop=1&playlist=G-Wt3EwPg3E"
                            title="Estancia Lura Mallorca"
                            frameborder="0"
                            allow="autoplay; encrypted-media"
                            allowfullscreen
                            enablejsapi=1
                        ></iframe>
                        <button class="btn btn-secondary hide-btn">Ocultar info extra</button>
                    </div>
                </div>
            </div>
            <div class="col-4 section-container">
                <h1 class="section-title titulo margins">Historia</h1>
                <button class="btn btn-primary DO-secciones show-btn" type="button" data-target="columna2">
                    Ver más +
                </button>
                <div class="section-content" id="columna2">
                    <div class="content-inner">
                        <h1 class="titulo margins">Nuestra Historia</h1>
                        <button class="btn btn-secondary hide-btn">Ocultar info extra</button>
                    </div>
                </div>
            </div>
            <div class="col-4 section-container">
                <h1 class="section-title titulo margins">Sección Talleres</h1>
                <button class="btn btn-primary DO-secciones show-btn" type="button" data-target="columna3">
                    Ver más +
                </button>
                <div class="section-content" id="columna3">
                    <div class="content-inner">
                        <h1 class="titulo margins">Sección Talleres</h1>
                        <p>Este es el contenido expandido de la tercera columna. Aquí puedes añadir más detalles sobre los talleres.</p>
                        <button class="btn btn-secondary hide-btn">Ocultar info extra</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    const style = document.createElement('style');

    // Insertar modulo historia
    const columna2ContentInner = mascosas.querySelector('#columna2 .content-inner');
    const historiaSection = NuestraHistoria();
    columna2ContentInner.insertBefore(historiaSection, columna2ContentInner.querySelector('.hide-btn'));

    // Insertar modulo talleres
    const columna3ContentInner = mascosas.querySelector('#columna3 .content-inner');
    const talleresSection = Talleres();
    columna3ContentInner.insertBefore(talleresSection, columna3ContentInner.querySelector('.hide-btn'));


    style.innerHTML = `
        .dondeocurreportada img {
            height: 2.5rem;
            width: 2.5rem;
            margin-bottom: 20px;
        }

        .DO-secciones {
            background-color: var(--terciary-color) !important;
            font-family: "Aloha Sans", sans-serif;
            font-weight: 600;
            margin-bottom: 10px;
            width: 100%;
            shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .DO-secciones:hover {
            background-color: var(--secondary-color) !important;
            color: #fff !important;
        }

        .section-container {
            border: 1px solid #ccc;
            min-height: 100px;
            position: relative;
            overflow: hidden;
            padding: 10px;
            box-sizing: border-box;
        }

        .section-title {
            padding: 10px;
            margin: 0;
        }

        .section-content {
            visibility: hidden;
            width: 100vw;
            height: 100vh;
            position: fixed;
            top: 0;
            left: 0;
            transform: translateX(100%);
            z-index: 1000;
            background-color: #fff;
            transition: transform 0.5s ease-in-out, visibility 0s linear 0.5s;
        }

        .section-content.active {
            visibility: visible;
            transform: translateX(0);
            transition: transform 0.5s ease-in-out, visibility 0s linear 0s;
        }

        .section-content.exiting {
            transform: translateX(-100%);
            visibility: hidden;
            transition: transform 0.5s ease-in-out, visibility 0s linear 0.5s;
        }

        .section-container .show-btn {
            display: block;
        }

        .section-container .section-title {
            display: block;
        }

    .content-inner {
        padding: 20px;
        background-color: #f8f9fa;
        border-radius: 8px;
        margin: 20px;
        width: calc(100% - 40px);
        margin-top: 4.5rem;
        height: auto; /* esto adapta la altura al contenido */
        max-height: 90vh; /* por si acaso, limitamos en pantallas pequeñas */
        overflow-y: auto; /* solo aparece scroll si es necesario */
    }

        .hide-btn {
            background-color: #dc3545;
            border: none;
            margin-top: 10px;
            cursor: pointer;
        }

        .hide-btn:hover {
            background-color: #c82333;
        }

        .margins {
            margin-bottom: 20px;
            margin-top: 20px;
        }

        /* Responsive para móviles */
        @media (max-width: 768px) {
            .row.mt-3 {
                display: flex;
                flex-direction: column;
                gap: 20px;
            }

            .section-container {
                width: 100% !important;
                margin: 0 auto;
            }
        }
    `;
    document.head.appendChild(style);

    // JavaScript to handle slide-in and slide-out
    mascosas.addEventListener('click', (event) => {
        if (event.target.classList.contains('show-btn')) {
            const targetId = event.target.getAttribute('data-target');
            const content = document.getElementById(targetId);
            content.classList.remove('exiting');
            // Force reflow and delay to ensure transition triggers
            content.offsetHeight;
            setTimeout(() => content.classList.add('active'), 0);
        }
        if (event.target.classList.contains('hide-btn')) {
            const sectionContainer = event.target.closest('.section-content');
            sectionContainer.classList.remove('active');
            // Force reflow and delay to ensure transition triggers
            sectionContainer.offsetHeight;
            setTimeout(() => sectionContainer.classList.add('exiting'), 0);
        }
    });

    return mascosas;
}