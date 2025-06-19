export function Info_Cestas() {
    const section = document.createElement('section');
    section.className = 'Info-Cestas';
    section.id = "Info-Cestas";

    section.innerHTML = `
    <h2 class="info-cestas-titulo">¿Qué son las Cestas?</h2>
    <div class="carrusel-marquee">
      <div class="carrusel-marquee-inner" id="marqueeInner"></div>
    </div>
    <div>
      <p class="info-cestas-texto extra-padding-ic">
        Cada semana ofrecemos cestas con productos frescos de temporada, ideales para familias o colegios, seleccionados por su calidad, origen responsable y técnicas de cultivo sostenibles.
        <br><br>
        Las cestas incluyen productos ecológicos, locales y algunos de la península, cuidando también el bienestar de los trabajadores.
        <br><br>
        Su valor es de 25€, recomendadas para 3 o 4 personas.
        <br><br>
        Los viernes se publica en WhatsApp una foto con el contenido y procedencia de la cesta.
        <br>Se puede pedir hasta el lunes a las 18:00h y recoger el martes desde las 12:00h.
      </p>
    </div>

    <h2 class="info-cestas-titulo2">Cesta Semanal</h2>
    <div class="info-cestas-foto-container">
      <img src="/images/Cesta2_resultado.webp" alt="Cesta Semanal" class="info-cestas-foto" />
    </div>

    <div class="info-cestas-lista-container">
      <table class="info-cestas-lista">
        <tbody>
          <tr>
            <td>Ingredientes</td>
            <td>Cantidad</td>
            <td>Unidad de Masa</td>
          </tr>
          <tr>
            <td>Fresas Sa Pobla</td>
            <td>400</td>
            <td>gramos</td>
          </tr>
          <tr>
            <td>Cerezas Aragó</td>
            <td>400</td>
            <td>gramos</td>
          </tr>
          <tr>
            <td>Nectarina Catalunya</td>
            <td>4</td>
            <td>unidades</td>
          </tr>
          <tr>
            <td>Sandía eco Catalunya</td>
            <td>1/4</td>
            <td>unidades</td>
          </tr>
          <tr>
            <td>Paraguayo Catalunya</td>
            <td>4</td>
            <td>unidades</td>
          </tr>
          <tr>
            <td>Melocoton Petra</td>
            <td>4</td>
            <td>unidades</td>
          </tr>
          <tr>
            <td>Tomate Inca</td>
            <td>4</td>
            <td>unidades</td>
          </tr>
          <tr>
            <td>Peras San Juan Selva</td>
            <td>12</td>
            <td>unidades</td>
          </tr>
          <tr>
            <td>Calabacín Inca</td>
            <td>2</td>
            <td>unidades</td>
          </tr>
          <tr>
            <td>Pepino Inca</td>
            <td>1</td>
            <td>unidad</td>
          </tr>
          <tr>
            <td>Sofrito Inca</td>
            <td>1</td>
            <td>unidad</td>
          </tr>
          <tr>
            <td>Melón Marina Manacor</td>
            <td>1</td>
            <td>unidad</td>
          </tr>
          <tr>
          <td>Lletuga Muro</td>
          <td>1</td>
          <td>unidad</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <a href="#" class="info-cestas-boton">¡Quiero mi Cesta!</a>
    </div>

    <h2 class="info-cestas-titulo3">¿Dónde se debe de recoger?</h2>
    <div class="info-cestas-recoge-container">
      <div class="info-cestas-recoge-item">
        <h2 class="info-cestas-titulo2">En Tienda</h2>
        <img src="/images/cestatienda.webp" alt="En Tienda" class="info-cestas-recoge-img" />
        <div>
          <p class="info-cestas-texto">
            Las cestas se pueden recoger en nuestra tienda, cada martes a partir de las 12:00h.
            <br><br>
            Además, en la tienda, encontrarás una amplia variedad de productos ecológicos/locales, ideales para complementar tu cesta.
          </p>
        </div>
      </div>
      <div class="info-cestas-recoge-item">
        <h2 class="info-cestas-titulo2">En Colegio</h2>
        <img src="/images/eg.webp" alt="En Colegios" class="info-cestas-recoge-img" />
        <div>
          <p class="info-cestas-texto">
            Las cestas se repartirán una vez a la semana en el recinto de la escuela y estarán compuestas de frutas y verduras de temporada.
            <br><br>
            Hemos iniciado este plan para fomentar el consumo de frutas y verduras locales/ecológicas de temporada con la mejor calidad de una forma sencilla.
          </p>
        </div>
      </div>
    </div>
    <div>
      <a href="https://api.whatsapp.com/send/?phone=34613959689&text&type=phone_number&app_absent=0" class="info-cestas-boton">¡Quiero inscribir mi Colegio en el Plan!</a>
    </div>
  `;

    const images = [
        "/imagenes/infinito1.jpg",
        "/imagenes/infinito2.jpg",
        "/imagenes/infinito3.jpg",
        "/imagenes/infinito4.jpg",
        "/imagenes/infinito5.jpg",
        "/imagenes/infinito6.jpg"
    ];

    const marqueeInner = section.querySelector('#marqueeInner');
    const imageBlock = images.map(img =>
        `<img src="${img}" alt="${img.split('/').pop().split('.')[0]}" />`
    ).join('');

    marqueeInner.innerHTML = imageBlock + imageBlock + imageBlock + imageBlock;

    setTimeout(() => {
        const containerWidth = marqueeInner.scrollWidth / 2;
        marqueeInner.style.width = `${containerWidth * 2}px`;
    }, 100);

    setTimeout(() => {
        const textos = section.querySelectorAll('.info-cestas-texto');
        const titulos = section.querySelectorAll('.info-cestas-titulo');
        textos.forEach(t => t.classList.add('visible'));
        titulos.forEach(t => t.classList.add('visible'));
    }, 200);

    const style = document.createElement("style");
    style.innerHTML = `

        .info-cestas-titulo,
        .info-cestas-texto {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s cubic-bezier(.4,2,.6,1);
        }
        .info-cestas-titulo.visible,
        .info-cestas-texto.visible {
            opacity: 1;
            transform: translateY(0);
        }
        .info-cestas-titulo,
        .info-cestas-titulo2,
        .info-cestas-titulo3 {
            font-family: 'Aloja Extended', sans-serif;
            font-size: 2rem;
            font-weight: 700;
            color: white;
            border: none;
            background-color: var(--main-color) !important;
            display: inline-block;
            border-radius: 10px;
            padding: 15px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.4);
        }

        .info-cestas-titulo { margin-top: 60px; margin-bottom: 5px; }
        .info-cestas-titulo2 { margin-top: 60px; }
        .info-cestas-titulo3 { margin-top: 200px; margin-bottom: -40px; padding: 40px; }

        .info-cestas-texto {
            font-family: "Hanken Grotesk", sans-serif;
            font-weight: 400;
            font-size: 18px;
            color: #303030;
            max-width: 800px;
            margin: 0 auto 20px auto;
            line-height: 1.6;
            border-radius: 10px;
            background-color: var(--terciary-color); 
            box-shadow: 0 2px 8px rgba(0,0,0,0.4);
            padding: 15px;
        }

        .info-cestas-lista-container {
            display: flex;
            justify-content: center;
            margin-bottom: 32px;
            padding: 0 10px;
        }

        .info-cestas-lista {
            width: 100%;
            max-width: 600px;
            border-collapse: collapse;
            background: var(--main-color);
            border-radius: 0 0 15px 15px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.4);
        }

        .info-cestas-lista th,
        .info-cestas-lista td {
            border: 1px solid hsla(36, 32.10%, 41.00%, 0.49);
            padding: 10px 12px;
            font-size: 1rem;
            text-align: left;
        }

        .info-cestas-lista th {
            background: var(--main-color);
            color: white;
            font-weight: 700;
        }

        .info-cestas-boton {
            font-size: 1.3rem;
            padding: 20px 40px;
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
        .info-cestas-boton:hover {
            transform: scale(1.08);
        }

        .carrusel-marquee {
            overflow: hidden;
            width: 100%;
            height: 300px;
            background: var(--terciary-color);
            border: 5px solid var(--main-color);
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.4);
        }

        .carrusel-marquee-inner {
            display: flex;
            gap: 5px;
            height: 100%;
            animation: marquee-cestas 60s linear infinite;
            will-change: transform;
            backface-visibility: hidden;
        }

        .carrusel-marquee-inner img {
            height: 100%;
            width: auto;
            object-fit: cover;
            display: block;
            flex-shrink: 0;
            border-radius: 10%;
        }

        @keyframes marquee-cestas {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
        }

        .info-cestas-recoge-container {
            display: flex;
            justify-content: center;
            gap: 200px;
            margin: 32px 0 40px 0;
            align-items: flex-start;
        }

        .info-cestas-recoge-item {
            display: 500px;
            flex-direction: column;
            align-items: center;
        }

        .info-cestas-recoge-img {
            width: 500px;
            height: 500px;
            border-radius: 30px;
            border: 10px solid var(--main-color);
            object-fit: cover;
            box-shadow: 0 2px 8px rgba(0,0,0,0.4);
        }

        .info-cestas-foto {
            border-radius: 10%;
            border: 10px solid var(--main-color);
            margin-top: 10px;
            width: 720px; /* Increased width for larger image */
            max-width: 75%;
            height: auto;
            box-shadow: 0 2px 8px rgba(0,0,0,0.4);
    }

        @media (max-width: 600px) {
            .info-cestas-titulo,
            .info-cestas-titulo2,
            .info-cestas-titulo3 {
                font-size: 22px;
                padding: 12px;
            }

            .info-cestas-texto {
                font-size: 15px;
                padding: 12px;
                max-width: 95vw;
                line-height: 1.5;
            }

            .info-cestas-boton {
                width: 90vw;
                font-size: 1rem;
                padding: 15px 20px;
                display: block;
                text-align: center;
                margin: 20px auto 0;
            }

            .info-cestas-recoge-container {
                flex-direction: column;
                gap: 40px;
                align-items: center;
            }

            .info-cestas-recoge-img {
                width: 90vw;
                height: auto;
                max-height: 300px;
            }

            .carrusel-marquee {
                min-height: 150px;
                max-height: 150px;
            }

            .carrusel-marquee-inner {
                height: 100px;
                width: 100px !important;
            }

            .info-cestas-foto {
                width: 90vw;
                max-width: 100%;
                height: auto;
                border-width: 5px;
            }

            /* Tabla responsive para pantallas pequeñas */
            .info-cestas-lista-container {
                padding: 0;
            }

            .info-cestas-lista {
                width: 100%;
                font-size: 14px;
            }

            .info-cestas-lista thead {
                display: none; /* Oculta los encabezados en móviles */
            }

            .info-cestas-lista tr {
                display: flex;
                flex-direction: column;
                margin-bottom: 10px;
                border: 1px solid hsla(36, 32.1%, 41%, 0.5);
                border-radius: 5px;
                background-color: var(--background-color);
            }

            .info-cestas-lista td {
                display: 100%;
                flex;
                padding: 8px;
                text-align: left;
                border: none;
                border-bottom: 1px solid hsla(36, 32.1%, 41%, 0.5);
            }

            /* Agrega etiquetas personalizadas antes de cada celda en móviles */
            .info-cestas-lista td:before {
                content: attr(data-label));
                font-weight: bold;
                color: white;
                margin-right: 8px;
            }

            .info-cestas-lista td:last-child {
                border-bottom: none;
            }
        }
    `;
    document.head.appendChild(style);

    return section;
}