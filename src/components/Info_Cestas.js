export function Info_Cestas() {
    const section = document.createElement('section');
    section.className = 'Info-Cestas';
    section.id = "Info-Cestas";

    section.innerHTML = `
    <hr class="divider anim-down" />
    <h2 class="info-cestas-titulo anim-up">¿Qué son las Cestas?</h2>
    <div class="carrusel-marquee anim-up">
      <div class="carrusel-marquee-inner" id="marqueeInner">
        <!-- Las imágenes se generarán aquí -->
      </div>
    </div>
    <div>
      <p class="info-cestas-texto anim-up">
        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      </p>
    </div>

    <h2 class="info-cestas-titulo2 anim-down">Cesta Semanal</h2>
    <div class="info-cestas-foto-container anim-down">
      <img src="/imagenes/infinito1.jpg" alt="Cesta Semanal" class="info-cestas-foto" />
    </div>

    <div class="info-cestas-lista-container anim-down">
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
    <div class="anim-down">
      <a href="/cesta.html" class="info-cestas-boton">¡Quiero mi Cesta!</a>
    </div>

    <h2 class="info-cestas-titulo3 anim-down">¿Dónde se debe de recoger?</h2>
    <div class="info-cestas-foto-container anim-down">
      <img src="images/Contactanos_Foto_resultado.webp" alt="Info_recogida" class="info-cestas-foto2" />
    </div>
    <div class="anim-down">
      <a href="https://api.whatsapp.com/send/?phone=34613959689&text&type=phone_number&app_absent=0" class="info-cestas-boton">¡Quiero inscribir mi Colegio en el Plan!</a>
    </div>
    <hr class="divider anim-down" />
`;

    const images = [
        "/images/Cesta1_resultado.webp",
        "/images/Cesta2_resultado.webp",
        "/images/Cesta3_resultado.webp",
        "/images/Cesta4_resultado.webp",
        "/images/Cesta5_resultado.webp",
        "/images/Cesta6_resultado.webp",
        "/images/Cesta7_resultado.webp",
        "/images/Cesta8_resultado.webp",
        "/images/Cesta9_resultado.webp",
        "/images/Cesta10_resultado.webp",
        "/images/Cesta11_resultado.webp",
        "/images/Cesta12_resultado.webp",
        "/images/Cesta13_resultado.webp",
        "/images/Cesta14_resultado.webp",
        "/images/Cesta15_resultado.webp",
        "/images/Cesta16_resultado.webp",
        "/images/Cesta17_resultado.webp",
        "/images/Cesta18_resultado.webp",
        "/images/Cesta19_resultado.webp",
        "/images/Cesta20_resultado.webp",
        "/images/Cesta21_resultado.webp",
    ];

    const marqueeInner = section.querySelector('#marqueeInner');
    const imageBlock = images.map(img =>
        `<img src="${img}" alt="${img.split('/').pop().split('.')[0]}" />`
    ).join('');
    marqueeInner.innerHTML = imageBlock + imageBlock + imageBlock + imageBlock;

    // Asegurar que el ancho sea suficiente
    setTimeout(() => {
        const containerWidth = marqueeInner.scrollWidth / 2;
        marqueeInner.style.width = `${containerWidth * 2}px`;
    }, 100);

    // Animaciones por scroll
    const animElements = section.querySelectorAll('.anim-up, .anim-down');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    animElements.forEach(el => observer.observe(el));

    // Estilos
    const style = document.createElement("style");
    style.innerHTML = `
.info-cestas-titulo,
.info-cestas-texto {
    opacity: 0;
    transform: translateY(-30px);
    transition: opacity 0.8s ease, transform 0.8s cubic-bezier(.4,2,.6,1);
    word-break: break-all;   
    overflow-wrap: break-word; 
}
.info-cestas-titulo.visible,
.info-cestas-texto.visible {
    opacity: 1;
    transform: translateY(0);
}
.anim-up {
    opacity: 0;
    transform: translateY(-60px);
    transition: opacity 0.8s, transform 0.8s cubic-bezier(.4,2,.6,1);
}
.anim-down {
    opacity: 0;
    transform: translateY(60px);
    transition: opacity 0.8s, transform 0.8s cubic-bezier(.4,2,.6,1);
}
.anim-up.visible,
.anim-down.visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
}
.info-cestas-titulo {
    font-family: 'Aloja Extended', sans-serif;
    font-size: 2rem;
    font-weight: 700;
    color: white;
    border: none;
    margin-bottom: 30px;
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
    margin-top: 200px;
    margin-bottom: 10px;
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
    margin-bottom: 0;
    background-attachment: fixed;
    background-color: var(--main-color) !important;
    display: inline-block;
    border-radius: 10px;
    padding: 40px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
}
.info-cestas-texto {
    position: relative;
    top: 18px;
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
    margin-bottom: 35px;
    background-color: var(--terciary-color); 
    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
}
.info-cestas-lista-container {
    display: flex;
    justify-content: center;
    margin-bottom: 32px;
}

.info-cestas-foto {	
    border-radius: 10%;
    border: 10px solid var(--main-color);
    margin-top: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
    width: 100%;
    max-width: 1200px;      /* Limita el ancho en desktop */
    height: auto;
    display: block;
    margin-left: auto;
    margin-right: auto;
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
    padding: 10px 12px;
    font-size: 1rem;
}
.info-cestas-boton {
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
.info-cestas-boton:hover {
    transform: scale(1.08);
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
        word-break: break-all;
        overflow-wrap: break-word;
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
    width: 100%;
}
.info-cestas-foto2 {	
    border-radius: 10%;
    border: 10px solid var(--main-color);
    margin-top: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
    width: 70%;
}


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
    background: rgba(0, 0, 0, 0.8);
    padding: 12px;
    display: block;
    margin: auto;
    
}


/* --- Carrusel CESTAS (SOBREESCRIBE lo anterior) --- */
.carrusel-marquee {
    overflow: hidden;
    width: 100%;
    height: 300px;
    background: var(--terciary-color);
    padding: 0;
    position: relative;
    padding-bottom: -40px;
    border : 5px solid var(--main-color);
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
}
.carrusel-marquee-inner {
    display: flex;
    gap: 5px;
    height: 100%;
    animation: marquee-cestas 90s linear infinite;
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
    border: 3px solid var(--main-color);
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
        max-height: 160px;
    }
}
/* --- Recoge imágenes --- */
.info-cestas-recoge-container {
    display: flex;
    justify-content: center;
    gap: 200px;
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
    margin-bottom: 16px;
    margin-top: 9px;
}
.info-cestas-recoge-img {
    width: 500px;
    height: 500px;
    border-radius: 30px;
    border: 10px solid var(--main-color);
    background: #f6f6f6;
    object-fit: cover;
    margin-bottom: 15px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
}
    `;
    document.head.appendChild(style);

    const lightbox = document.createElement('div');
lightbox.id = 'lightbox-cesta';
lightbox.className = 'lightbox-servicio';
lightbox.innerHTML = `<img id="lightbox-img-cesta" src="" alt="Imagen ampliada">`;
document.body.appendChild(lightbox);

const cestaSemanalImg = section.querySelector('.info-cestas-foto');
const lightboxImg = document.getElementById('lightbox-img-cesta');

if (cestaSemanalImg) {
    cestaSemanalImg.style.cursor = 'zoom-in';
    cestaSemanalImg.addEventListener('click', () => {
        lightboxImg.src = cestaSemanalImg.src;
        lightbox.classList.add('active');
    });
}

lightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
    lightboxImg.src = '';
});
    return section;
}