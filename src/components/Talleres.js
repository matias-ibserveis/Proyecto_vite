export function Talleres() {
  const section = document.createElement('section');
  section.className = 'talleres';
  section.id = "talleres";

  section.innerHTML = `
    <h2 class="talleres-titulo anim-up">Talleres</h2>
    <div class="talleres-carrusel-container anim-right">
      <div class="talleres-carrusel-marquee" id="talleresCarruselArriba">
        <div class="talleres-carrusel-marquee-inner" id="talleresMarqueeInnerArriba"></div>
      </div>
    </div>
    <div class="talleres-texto-frame anim-up">
      <p class="talleres-texto">
        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
        xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      </p>
    </div>

    <div class="talleres-fotos-horizontal anim-up">
      <div class="talleres-foto-frame">
        <img src="/images/Foto2_Talleres1_resultado.webp" alt="Taller horizontal 1" />
      </div>
      <div class="talleres-foto-frame">
        <img src="/images/Foto2_Talleres2_resultado.webp" alt="Taller horizontal 2" />
      </div>
    </div>
    
      <div class="talleres-texto-frame anim-up">
      <p class="talleres-texto">
        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
        xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      </p>
    </div>

    <hr class="divider anim-down" />
  `;

  // Imágenes para los dos carruseles
  const imagesArriba = [
    "/images/Foto_Talleres1_resultado.webp",
    "/images/Foto_Talleres2_resultado.webp",
    "/images/Foto_Talleres3_resultado.webp",
    "/images/Foto_Talleres4_resultado.webp",
    "/images/Foto_Talleres5_resultado.webp",
    "/images/Foto_Talleres6_resultado.webp"
  ];


  // Carrusel de arriba
  const marqueeInnerArriba = section.querySelector('#talleresMarqueeInnerArriba');
  const imageBlockArriba = imagesArriba.map(img =>
    `<img src="${img}" alt="${img.split('/').pop().split('.')[0]}" />`
  ).join('');
  marqueeInnerArriba.innerHTML = imageBlockArriba + imageBlockArriba + imageBlockArriba + imageBlockArriba;

  const imgsArriba = marqueeInnerArriba.querySelectorAll('img');
  let loadedArriba = 0;
  imgsArriba.forEach(img => {
    img.onload = img.onerror = () => {
      loadedArriba++;
      if (loadedArriba === imgsArriba.length) {
        const containerWidth = marqueeInnerArriba.scrollWidth / 2;
        marqueeInnerArriba.style.width = `${containerWidth * 2}px`;
      }
    };
  });



  // Animaciones por scroll
  const animElements = section.querySelectorAll('.anim-up, .anim-left, .anim-right, .anim-down');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('anim-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  animElements.forEach(el => observer.observe(el));

  // Estilos solo para este bloque
  if (!document.getElementById('talleres-style')) {
    const style = document.createElement("style");
    style.id = 'talleres-style';
    style.innerHTML = `
      .talleres {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .talleres-titulo {
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
        padding: 15px 40px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.4);
        text-align: center;
      }
      .talleres-carrusel-container {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-bottom: 24px;
      }
      .talleres-carrusel-marquee {
        overflow: hidden;
        width: 1360px;
        height: 300px;
        background: var(--terciary-color);
        padding: 0;
        position: relative;
        border: 5px solid var(--main-color);
        border-radius: 10px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.4);
      }
      .talleres-carrusel-marquee-inner {
        display: flex;
        gap: 5px;
        height: 100%;
        animation: talleres-marquee 60s linear infinite;
        will-change: transform;
        backface-visibility: hidden;
      }
      .talleres-carrusel-marquee-inner img {
        height: 100%;
        width: auto;
        object-fit: cover;
        display: block;
        flex-shrink: 0;
        border-radius: 10%;
      }
      @keyframes talleres-marquee {
        0%   { transform: translateX(-50%); }
        100% { transform: translateX(0); }
      }
      .talleres-texto-frame {
        display: flex;
        justify-content: center;
        width: 100%;
        margin: 32px 0;
      }
      .talleres-texto {
        font-family: "Hanken Grotesk", sans-serif;
        font-weight: 400;
        font-size: 18px;
        color: #303030;
        max-width: 700px;
        margin: 0 auto;
        line-height: 1.6;
        padding: 18px 24px;
        border-radius: 10px;
        background: var(--terciary-color);
        box-shadow: 0 2px 8px rgba(0,0,0,0.13);
        text-align: center;
        margin-bottom: 40px;
        word-break: break-all;    
        overflow-wrap: break-word;
      }

.talleres-fotos-horizontal {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  gap: 32px;
  margin: 32px 0 40px 0;
}
.talleres-foto-frame {
  background: var(--main-color);
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.45);
  padding: 8px;
  width: 700px;
  min-width: 220px;
  display: flex;
  justify-content: center;
}
.talleres-foto-frame img {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  object-fit: cover;
  display: block;
}


      /* Animaciones */
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
      .anim-down {
        opacity: 0;
        transform: translateY(60px);
        transition: opacity 0.8s, transform 0.8s cubic-bezier(.4,2,.6,1);
      }
      .anim-visible {
        opacity: 1 !important;
        transform: translateX(0) translateY(0) !important;
      }
      
          @media (max-width: 900px) {
        .talleres-carrusel-marquee {
          min-height: 120px;
          max-height: 120px;
          height: 120px;
          padding: 0;
        }
        .talleres-carrusel-marquee-inner img {
          height: 90px;
          width: 90px;
        }
      

  .talleres-fotos-horizontal {
    gap: 8px !important;
    width: 100vw !important;
    max-width: 100vw !important;
    margin: 16px 0 24px 0;
    padding: 0 !important; 

    
  }
  .talleres-foto-frame {
    width: 48vw !important;
    max-width: 48vw !important;
    min-width: 0;
    padding: 0 !important;
    margin: 0 !important;
    border: 5px solid var(--main-color); !important;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.45);
  }
}


      @media (max-width: 700px) {
        .talleres-titulo {
          font-size: 1.3rem;
          padding: 10px 10vw;
        }
        .talleres-texto {
          font-size: 16px;
          padding: 12px 6vw;
          max-width: 95vw;
          word-break: break-all;    
          overflow-wrap: break-word; 
        }
        .talleres-carrusel-marquee {
          min-height: 130px;
          max-height: 120px;
          height: 70px;
          padding: 0;
        }
        .talleres-carrusel-marquee-inner img {
          height: 120px;
          width: 120px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  return section;
}