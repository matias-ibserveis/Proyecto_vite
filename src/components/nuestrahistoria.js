export function NuestraHistoria() {
  const section = document.createElement('section');
  section.className = 'nuestra-historia';
  section.id = 'nuestra-historia';
section.innerHTML = `
<div class="historia-grid">
  <div class="historia-card hist-bloque hist-bloque-1">
    <div class="hist-card-year">2015</div>
    <h3 class="hist-card-title">Nuestra idea</h3>
    <p class="hist-card-text">Empezamos con una idea pequeña y <br>mucho optimismo...</p>
    <img class="hist-card-img" src="/images/historia1.jpg" alt="Historia 2015" />
    <button class="hist-card-btn">...</button>
  </div>
  <div class="historia-card hist-bloque hist-bloque-2">
    <div class="hist-card-year">2016</div>
    <h3 class="hist-card-title">La apertura</h3>
    <p class="hist-card-text">Abrimos nuestras puertas al público con<br> gran entusiasmo...</p>
    <img class="hist-card-img" src="/images/historia2.jpg" alt="Historia 2016" />
    <button class="hist-card-btn">...</button>
  </div>
  <div class="historia-card hist-bloque hist-bloque-3">
    <div class="hist-card-year">2018</div>
    <h3 class="hist-card-title">Crecimiento</h3>
    <p class="hist-card-text">Expandimos nuestro equipo y servicios para llegar a más clientes.</p>
    <img class="hist-card-img" src="/images/historia3.jpg" alt="Historia 2018" />
    <button class="hist-card-btn">...</button>
  </div>
  <div class="historia-card hist-bloque hist-bloque-4">
    <div class="hist-card-year">20xx</div>
    <h3 class="hist-card-title">Cestas Semanales</h3>
    <p class="hist-card-text">xxxxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxx<br>xxxx.</p>
    <img class="hist-card-img" src="/images/historia4.jpg" alt="Historia Cestas" />
    <button class="hist-card-btn">...</button>
  </div>
  <div class="historia-card hist-bloque hist-bloque-5">
    <div class="hist-card-year">2024</div>
    <h3 class="hist-card-title">Nuestra web</h3>
    <p class="hist-card-text">xxxxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxx<br>xxxx</p>
    <img class="hist-card-img" src="/images/historia5.jpg" alt="Historia Web" />
    <button class="hist-card-btn">...</button>
  </div>
</div>
        <hr class="divider anim-down" />
`;

  // Observador para animaciones al hacer scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('mostrar');
    });
  }, { threshold: 0.2 });

  section.querySelectorAll('.hist-bloque').forEach(el => observer.observe(el));

  // Estilos insertados desde JS
  const style = document.createElement("style");
  style.innerHTML = `
  .nuestra-historia {
    padding: 2rem 1rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .historia-flex-controlada {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .historia-row {
    display: flex;
    justify-content: center;
    margin: 30px 0;

  }

  .historia-card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    border: 1px solid rgba(209, 171, 114, 0.2);
    box-shadow: 0 4px 8px var(--terciary-color);
    opacity: 0;
    transform: translateY(40px);
    transition: all 0.6s ease;
    width: 350px; /* Ancho fijo para uniformidad */
    
  }

  .hist-bloque-2 { transition-delay: 0.1s; }
  .hist-bloque-3 { transition-delay: 0.2s; }
  .hist-bloque-4 { transition-delay: 0.3s; }
  .hist-bloque-5 { transition-delay: 0.4s; }

  .historia-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px var(--secondary-color);
    border-color: var(--main-color);
  }

  .hist-card-year {
    background: var(--main-color);
    color: white;
    display: inline-block;
    padding: 5px 15px;
    border-radius: 20px;
    margin-bottom: 15px;
    font-weight: bold;
    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
  }
.hist-card-title {
  color: var(--secondary-color);
  margin: 10px 0;
  padding: 10px;
  font-size: 1.4rem;
  font-weight: 600;
  text-align: center; /* Centrado */
  background: rgba(0, 0, 0, 0.03);
  border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.hist-card-img {
  display: block;
  margin: 9px auto 0 auto;
  margin-top: 30px;
  width: 240px;
  height: 240px;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.4);
  background: #eee;
}

  .hist-card-text {
    color: #555;
    margin-top: 10px;
    line-height: 1.6;
    font-size: 1.3rem;
        box-shadow: 0 2px 8px rgba(0,0,0,0.4);
  }

  .hist-bloque.mostrar {
    opacity: 1;
    transform: translateY(0);
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
  background: #fff;
  padding: 12px;
  display: block;
  margin: auto;
  border: none !important;
}

.hist-card-btn {
  display: block;
  margin: 22px auto 0 auto;
  padding: 0.6em 1.4em;
  font-size: 1rem;
  background: var(--main-color);
  color: #222;
  border: none;
  border-radius: 50px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.4);
  cursor: pointer;
  transition: transform 0.18s cubic-bezier(.4,2,.6,1), box-shadow 0.18s;
  font-family: 'Aloja Extended', sans-serif;
  font-weight: 700;
  letter-spacing: 2px;
}
.hist-card-btn:hover {
  transform: scale(1.18);
  box-shadow: 0 4px 16px rgba(0,0,0,0.4);
}

.hist-info-lightbox-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 90vw;
  max-height: 90vh;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.4);
  padding: 32px 18px;
}
#hist-info-img {
  display: block;
  margin: 0 auto 24px auto;
  height: auto;
  max-height: 70vh;
  width: auto;
  max-width: 350px;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.18);
  background: #eee;
}
#hist-info-text {
  font-size: 1.2rem;
  color: #333;
  text-align: center;
  max-width: 400px;
}

/* MÓVIL: 1 columna */
.historia-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}
.historia-card {
  width: 95vw;
  max-width: 350px;
}

/* TABLET: 2 columnas, última fila centrada si es impar */
@media (min-width: 768px) and (max-width: 1200px) {
  .historia-grid {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 32px;
  }
  .historia-card {
    flex: 0 1 calc(50% - 32px);
    max-width: 350px;
    min-width: 260px;
  }
  /* Centra la última card si hay número impar */
  .historia-card:nth-last-child(1):nth-child(odd) {
    margin-left: 25%;
    margin-right: 25%;
  }
}

/* PC: 3 columnas, última fila centrada si hay 2 */
@media (min-width: 1201px) {
  .historia-grid {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 40px;
    max-width: 1200px;
    margin: 0 auto;
  }
  .historia-card {
    flex: 0 1 calc(33.333% - 40px);
    max-width: 350px;
    min-width: 260px;
    
  }
  /* Centra las 2 últimas si hay 2 en la última fila */
  .historia-card:nth-last-child(2):nth-child(odd),
  .historia-card:nth-last-child(1):nth-child(even) {
    margin-left: calc(16.666% + 20px);
    margin-right: calc(16.666% + 20px);
  }
}
  `;

  // Lightbox para imágenes de la historia
const lightbox = document.createElement('div');
lightbox.className = 'lightbox-servicio';
lightbox.innerHTML = `<img id="lightbox-img-historia" src="" alt="Imagen ampliada">`;
document.body.appendChild(lightbox);

const lightboxImg = document.getElementById('lightbox-img-historia');
section.querySelectorAll('.hist-card-img').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightbox.classList.add('active');
  });
});
lightbox.addEventListener('click', () => {
  lightbox.classList.remove('active');
  lightboxImg.src = '';
});

  document.head.appendChild(style);

const infoLightbox = document.createElement('div');
infoLightbox.className = 'lightbox-servicio';
infoLightbox.innerHTML = `
  <div class="hist-info-lightbox-content">
    <img id="hist-info-img" src="" alt="Detalle historia" />
    <div id="hist-info-text"></div>
  </div>
`;
document.body.appendChild(infoLightbox);

const infoImg = infoLightbox.querySelector('#hist-info-img');
const infoText = infoLightbox.querySelector('#hist-info-text');

// Ejemplo de datos para cada card (puedes personalizar)
const infoData = [
  {
    img: '/images/vertical1.jpg', 
  },
  {
    img: '/images/vertical2.jpg',
  },
  {
    img: '/images/vertical3.jpg',
  },
  {
    img: '/images/vertical4.jpg',
  },
  {
    img: '/images/vertical5.jpg',
  }
];

// Asigna evento a cada botón
section.querySelectorAll('.hist-card-btn').forEach((btn, i) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    infoImg.src = infoData[i].img;
    infoText.textContent = infoData[i].text;
    infoLightbox.classList.add('active');
  });
});
infoLightbox.addEventListener('click', () => {
  infoLightbox.classList.remove('active');
  infoImg.src = '';
  infoText.textContent = '';
});

  return section;
}