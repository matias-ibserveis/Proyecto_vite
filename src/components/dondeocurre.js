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
                        <h1 class="titulo">Nuestros Productos</h1>
                        <p>En esta sección se encuentran todos nuestro productos, la gran mayoria locales o ecológicos con una gran calidad.</p>
                        <img class="" src="">
                        <button class="btn btn-secondary hide-btn">Ocultar info extra</button>
                    </div>
                </div>
            </div>
            <div class="col-4 section-container">
                <h1 class="section-title titulo margins">Sección Degustaciones</h1>
                <button class="btn btn-primary DO-secciones show-btn" type="button" data-target="columna2">
                    Ver más +
                </button>
                <div class="section-content" id="columna2">
                    <div class="content-inner">
                        <h1 class="titulo margins">Degustaciones</h1>
                        <p>En esta sección de nuestro local puedes disfrutar de una gran variedad de zumos, cafés, infusiones y batidos, además de algunos postres y panes.</p>
                        <img class="" src="">
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
                        <h1 class="titulo margins">Zona de Talleres</h1>
                        <p>En esta sección de nuestro local se llevan a cabo la mayoría de los talleres que hemos tenido hasta ahora y cuenta con un amplio espacio ideal para su realización.</p>
                        <img class="" src="">
                        <button class="btn btn-secondary hide-btn">Ocultar info extra</button>
                    </div>
                </div>
            </div>
            <div class = "row">
                <div class="col-12 margin-top">
                    <p class="">⬇¡Puedes ver nuestro local entero tocando en el boton de abajo!⬇</p>  
                </div>
                <div class="col-12 text-align">          
                    <button class="videoBtn" id="videoBtn">Ver video</button>
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
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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

        .margin-top {
            margin-top: 20px;
            margin-bottom: 0px !important;
        }

        @media (max-width: 768px) {
            .col-4 {
                width: 100%;
                margin-bottom: 20px;
            }
        }

        .videoBtn {
        margin-top: 10px;
        font-size: 1.3rem;
        padding: 20px 40px;
        max-height: 80px;
        max-width: 200px;
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

    .videoBtn:hover {
        background: var(--terciary-color) !important;
        transform: scale(1.08);
    }

    `;
    document.head.appendChild(style);

    // JavaScript to handle slide-in and slide-out

    dondeOcurre.addEventListener('click', (event) => {
        if (event.target.classList.contains('show-btn')) {
            const targetId = event.target.getAttribute('data-target');
            const content = document.getElementById(targetId);

            // Cierra todos los demás
            const allContents = dondeOcurre.querySelectorAll('.section-content');
            allContents.forEach(c => {
                if (c !== content) c.classList.remove('active', 'exiting');
            });

            content.classList.remove('exiting');
            content.offsetHeight;
            setTimeout(() => content.classList.add('active'), 0);
        }

        if (event.target.classList.contains('hide-btn')) {
            const sectionContainer = event.target.closest('.section-content');
            sectionContainer.classList.remove('active');
            sectionContainer.offsetHeight;
            sectionContainer.classList.add('exiting');

            // Elimina la clase después de la animación
            setTimeout(() => {
                sectionContainer.classList.remove('exiting');
            }, 500);
        }
    });

            // boton.js
    const videoBtn = dondeOcurre.querySelector('#videoBtn');
    if (videoBtn) {
        videoBtn.onclick = () => {
            const seccionDestino = document.getElementById('mascosas');
            if (seccionDestino) {
                seccionDestino.scrollIntoView({ behavior: 'smooth' });
            } else {
                console.error('El elemento con id="mascosas" no se encuentra en el DOM');
            }
        };
    } else {
        console.error('El elemento con id="videoBtn" no se encuentra en el DOM');
    }

    return dondeOcurre;
}