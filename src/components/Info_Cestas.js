export function Info_Cestas() {
    const section = document.createElement('section');
    section.className = 'Info-Cestas';
    section.id = "Info-Cestas";

    section.innerHTML = `
    <h2 class="info-cestas-titulo">¿Qué son las Cestas?</h2>
    <div class="carrusel-marquee">
      <div class="carrusel-marquee-inner" id="marqueeInner">
        <!-- Las imágenes se generarán aquí -->
      </div>
    </div>
    <div>
      <p class="info-cestas-texto">
        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      </p>
    </div>

    <h2 class="info-cestas-titulo2">Cesta Semanal</h2>
    <div class="info-cestas-foto-container">
      <img src="/imagenes/infinito1.jpg" alt="Cesta Semanal" class="info-cestas-foto" />
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
            <td>Ingrediente 1</td>
            <td>Cantidad 1</td>
            <td>Unidad de Masa 1</td>
          </tr>
          <tr>
            <td>Ingrediente 2</td>
            <td>Cantidad 2</td>
            <td>Unidad de Masa 2</td>
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
            <img src="/imagenes/tienda.png" alt="En Tienda" class="info-cestas-recoge-img" />
            <div>
                <p class="info-cestas-texto">
                xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                </p>
            </div>

        </div>
        <div class="info-cestas-recoge-item">
            <h2 class="info-cestas-titulo2">En Colegio</h2>
            <img src="/imagenes/colegio.png" alt="En Colegios" class="info-cestas-recoge-img" />
        <div>
            <p class="info-cestas-texto">
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
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

    // Generar 4 copias para garantizar continuidad
    const imageBlock = images.map(img =>
        `<img src="${img}" alt="${img.split('/').pop().split('.')[0]}" />`
    ).join('');

    marqueeInner.innerHTML = imageBlock + imageBlock + imageBlock + imageBlock;

    // Asegurar que el ancho sea suficiente
    setTimeout(() => {
        const containerWidth = marqueeInner.scrollWidth / 2;
        marqueeInner.style.width = `${containerWidth * 2}px`;
    }, 100);

    // Animación: fade-in al montar para título y texto
    setTimeout(() => {
        const textos = section.querySelectorAll('.info-cestas-texto');
        const titulos = section.querySelectorAll('.info-cestas-titulo');
        textos.forEach(t => t.classList.add('visible'));
        titulos.forEach(t => t.classList.add('visible'));
    }, 200);

    // Estilos
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
        .info-cestas-titulo {
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

        .info-cestas-titulo2 {
            font-family: 'Aloja Extended', sans-serif;
            font-size: 2rem;
            font-weight: 700;
            color: white;
            border: none;
            margin-top: 60px;
            background-attachment: fixed;
            background-color: var(--main-color) !important;
            display: inline-block;
            border-radius: 10px;
            padding: 15px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.4);
            
        }


        .info-cestas-titulo3 {
            font-family: 'Aloja Extended', sans-serif;
            font-size: 2rem;
            font-weight: 700;
            color: white;
            border: none;
            margin-top: 200px;
            margin-bottom: -40px;
            background-attachment: fixed;
            background-color: var(--main-color) !important;
            display: inline-block;
            border-radius: 10px;
            padding: 40px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.4);
        }

        .info-cestas-texto {
            position: relative;
            top: -5px; /* Sube el texto 20px */
            font-family: "Hanken Grotesk", sans-serif;
            font-weight: 400;
            font-size: 18px;
            color: #303030;
            max-width: 800px;
            margin: 0 auto;
            line-height: 1.6;
            padding-bottom: 5px;
            border-radius: 10px;
            background: fixed;
            margin-bottom: 20px;
            background-color: var(--terciary-color); 
            box-shadow: 0 2px 8px rgba(0,0,0,0.4);
        }
        .info-cestas-lista-container {
            display: flex;
            justify-content: center;
            margin-bottom: 32px;   /* Separación inferior opcional */

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

        .info-cestas-lista tr {
            height: 48px;
            
        }
        .info-cestas-lista td {
            border: 1px solid hsla(36, 32.10%, 41.00%, 0.49);
            padding: 10px 12px; /* Más padding para más separación */
            font-size: 1rem;
            
        }

        .info-cestas-boton {
            margin-top: -10px;
            font-size: 1.3rem;
            padding: 20px 40px;
            padding-bottom: 20px;
            border-radius: 8px;
            font-weight: 700;
            text-decoration: none;    /* Quita el subrayado */
            color: #fff !important;   /* Letras blancas */
            background-color: #b25415 !important; /* Fondo */
            display: inline-block;
            transition: transform 0.2s cubic-bezier(.4,2,.6,1);
            font-family: 'Aloja Extended', sans-serif;
            box-shadow: 0 2px 8px rgba(0,0,0,0.4);
        }
        .info-cestas-boton:hover {
            transform: scale(1.08); /* <--- Efecto zoom al pasar el mouse */
        }

        @media (max-width: 600px) {
            .info-cestas-titulo {
                font-size: 27px;
                padding: 10px;
            }
            
            .info-cestas-texto {
                font-size: 16px;
                padding: 10px;
                max-width: 90vw;
            }
            .info-cestas-boton {
                width: 90vw;
                font-size: 1rem;
            }
        }


        .info-cestas img {
            width: 200px;
            height: 200px;
            border-radius: 10%;
            margin-bottom: 20px;
            
        }

        .info-cestas-foto {	
            border-radius: 10%;
            border: 10px solid var(--main-color);
            margin-top: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.4);
        }


        .carrusel-marquee {
            overflow: hidden;
            width: 100%;
            height: 300px;
            background: var(--terciary-color);
            padding: 0;
            position: relative;
            padding-bottom: -40px; /* Quita el padding inferior */
            border : 5px solid var(--main-color);
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
            0%   { transform: translateX(-50%); }
            100% { transform: translateX(0); }
        }
        @media (max-width: 900px) {
            .carrusel-marquee-inner img {
                height: 150px;
                width: 150px;
            }
            .carrusel-marquee {
                min-height: 200px;
                max-height: 200px;
            }
        }



            .info-cestas-recoge-container {
                display: flex;
                justify-content: center;
                gap: 200px; /* Más separación entre las fotos */
                margin: 32px 0 40px 0;
                align-items: flex-start;
            }
            .info-cestas-recoge-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                
            }
            .info-cestas-recoge-label {
                font-weight: 700;
                font-size: 1.2rem;
                text-align: center;
                margin-bottom: 16px; /* Espacio entre el label y la foto */
                margin-top: 9px;
            }
            .info-cestas-recoge-img {
                width: 500px;   /* Más grande */
                height: 500px;  /* Más grande */
                border-radius: 30px;
                border: 10px solid var(--main-color);
                background: #f6f6f6;
                object-fit: cover;
                margin-bottom: 15px; /* Quita el margen inferior */
                box-shadow: 0 2px 8px rgba(0,0,0,0.4);
                
            }
    `;
    document.head.appendChild(style);

    return section;
}