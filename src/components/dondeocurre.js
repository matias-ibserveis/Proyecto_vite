export function DondeOcurre() {
    const dondeOcurre = document.createElement("section");
    dondeOcurre.className = "container py-5";
    dondeOcurre.id = "dondeocurre";
    dondeOcurre.innerHTML = `  
        <div class="row">
            <div class="col-12 text-center">
                <h2 class="titulo">¿Dónde ocurre la magia?</h2>  
                <p class="descripcion">Placeholder.</p>
                <button class="btn btn-primary DO-secciones" type="button">
                    ¡Descubre donde ocurre la magia!
                </button>
            </div>
        </div>
        <!-- Sección con tres columnas -->
        <div class="row mt-3">
            <div class="col-4">
                <h5>Contenido 1</h5>
                <p>Este es el contenido de la primera columna.</p>
            </div>
            <div class="col-4">
                <h5>Contenido 2</h5>
                <p>Este es el contenido de la segunda columna.</p>
            </div>
            <div class="col-4">
                <h5>Contenido 3</h5>
                <p>Este es el contenido de la tercera columna.</p>
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
            background-color: var(--primary-color);
            font-family: "Aloha Sans", sans-serif;
            font-weight: 600;
        }

        /* Añadimos un borde para depurar visualmente */
        .col-4 {
            border: 1px solid #ccc;
            min-height: 100px;
        }
    `;
    document.head.appendChild(style);
    return dondeOcurre;
}