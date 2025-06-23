export function Talleres() {
  const section = document.createElement('section');
  section.className = 'talleres';
  section.id = "talleres";

  section.innerHTML = `
  <div class="ficha-galeria">
    <h2 class="titulo">Talleres</h2>
    <div class="galeria-container">
      <div class="galeria-izquierda">
        <img id="galeria-imagen" src="" alt="Imagen" />
        <div class="botones">
          <button id="btn-prev">Anterior</button>
          <button id="btn-next">Siguiente</button>
        </div>
      </div>
      <div class="galeria-derecha">
        <h3>Actividades en nuestros talleres</h3>
        </br>
        <p id="talleres"></p>
      </div>
    </div>

    </div>
  `;

  const images = [
    "/images/Foto_Talleres2_resultado.webp",
    "/images/Foto_Talleres3_resultado.webp",
    "/images/Foto_Talleres4_resultado.webp",
    "/images/Foto_Talleres5_resultado.webp",
    "/images/Foto_Talleres6_resultado.webp"
  ];

  const textos = [
    "Talleres prácticos y accesibles para aprender a llevar una alimentación más saludable y consciente. Compartimos recetas, ideas para el día a día y conocimientos sobre productos ecológicos, siempre en un ambiente cercano y participativo. ¡Te esperamos para cuidarte desde dentro!",
    "Fomentamos la creatividad con talleres de manualidades sostenibles. Usamos materiales reciclados y naturales para crear objetos útiles y decorativos, fomentando el respeto por el medio ambiente y el disfrute en grupo. ¡Ideal para todas las edades!"
  ];

  let index = 0;
  const imgEl = section.querySelector('#galeria-imagen');
  const txtEl = section.querySelector('#talleres');

  function actualizarContenido() {
    imgEl.src = images[index];
    txtEl.textContent = textos[Math.floor(index / 2)];
  }

  section.querySelector('#btn-next').addEventListener('click', () => {
    index = (index + 1) % images.length;
    actualizarContenido();
  });

  section.querySelector('#btn-prev').addEventListener('click', () => {
    index = (index - 1 + images.length) % images.length;
    actualizarContenido();
  });


  actualizarContenido();



  if (!document.getElementById('galeria-botones-style')) {
    const style = document.createElement("style");
    style.id = 'galeria-botones-style';
    style.textContent = `
      .ficha-galeria {
        background-color: #d1ab7275;
        border-radius: 16px;
        padding: 1rem;
        margin: 4rem 1rem 8rem 1rem;
        max-width: 96%;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      .galeria-container {
        display: flex;
        gap: 24px;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
      }

      .galeria-izquierda {
        flex: 1;
        text-align: center;
      }

      .galeria-izquierda img {
        width: 100%;
        max-width: 400px;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      }

      .botones {
        margin-top: 12px;
        display: flex;
        gap: 12px;
        justify-content: center;
      }

      .botones button {
        padding: 10px 16px;
        font-size: 1rem;
        cursor: pointer;
        border: none;
        border-radius: 6px;
        background: #333;
        color: white;
        transition: background 0.2s ease;
      }

      .botones button:hover {
        background: #555;
      }

      .galeria-derecha {
        flex: 1;
        font-size: 1.2rem;
        padding: 12px;
        line-height: 1.6;
      }

      @media (max-width: 768px) {
        .galeria-container {
          flex-direction: column;
        }
      }
    `;
    document.head.appendChild(style);
  }

  return section;
}
