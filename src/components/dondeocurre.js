export function DondeOcurre() {
    const dondeOcurre = document.createElement("section");
    dondeOcurre.className = "container py-5";
    dondeOcurre.id = "dondeocurre";
    dondeOcurre.innerHTML = `  
        <div class="row">
            <div class="col-12 text-center">
                <h2 class="titulo margins">¿Dónde ocurre la magia?</h2>  
                <p class="descripcion">Explora nuestras secciones para descubrir más.</p>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-4 section-container">
                <h1 class="section-title titulo margins">Sección Productos</h1>
                <button class="btn btn-primary DO-secciones show-btn" type="button" data-target="columna1">
                    Ver más +
                </button>
                <div class="section-content" id="columna1">
                    <div class="content-inner">
                        <h1 class="titulo">Sección Productos</h1>
                        <p>Este es el contenido expandido de la primera columna. Aquí puedes añadir más detalles sobre los productos.</p>
                        <button class="btn btn-secondary hide-btn">Ocultar info extra</button>
                    </div>
                </div>
            </div>
            <div class="col-4 section-container">
                <h1 class="section-title titulo margins">Sección Bar</h1>
                <button class="btn btn-primary DO-secciones show-btn" type="button" data-target="columna2">
                    Ver más +
                </button>
                <div class="section-content" id="columna2">
                    <div class="content-inner">
                        <h1 class="titulo margins">Sección Bar</h1>
                        <p>Este es el contenido expandido de la segunda columna. Aquí puedes añadir más detalles sobre el bar.</p>
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
            max-height: 80%;
            overflow-y: auto;
            width: calc(100% - 40px);
            height: calc(100% - 40px);
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
    dondeOcurre.addEventListener('click', (event) => {
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

    return dondeOcurre;
}