export function NuestraHistoria() {
  const section = document.createElement('section');
  section.className = 'nuestra-historia';
  section.innerHTML = `
    <h2 class="titulo">Nuestra historia</h2>
    <div class="historia-flex-controlada">
      <!-- Fila superior: tres tarjetas -->
      <div class="historia-row">
        <div class="historia-card hist-bloque hist-bloque-1">
          <div class="hist-card-year">2015</div>
          <h3 class="hist-card-title">Nuestra idea</h3>
          <p class="hist-card-text">Empezamos con una idea pequeña y muchas ganas.</p>
        </div>
        <div class="historia-card hist-bloque hist-bloque-2">
          <div class="hist-card-year">2016</div>
          <h3 class="hist-card-title">La apertura</h3>
          <p class="hist-card-text">Abrimos nuestras puertas al público con gran entusiasmo.</p>
        </div>
        <div class="historia-card hist-bloque hist-bloque-3">
          <div class="hist-card-year">2018</div>
          <h3 class="hist-card-title">Crecimiento</h3>
          <p class="hist-card-text">Expandimos nuestro equipo y servicios para llegar a más clientes.</p>
        </div>
      </div>
      <!-- Fila inferior: dos tarjetas -->
      <div class="historia-row">
        <div class="historia-card hist-bloque hist-bloque-4">
          <div class="hist-card-year">20xx</div>
          <h3 class="hist-card-title">Cestas Semanales</h3>
          <p class="hist-card-text">Placeholder.Placeholder.Placeholder.</p>
        </div>
        <div class="historia-card hist-bloque hist-bloque-5">
          <div class="hist-card-year">2024</div>
          <h3 class="hist-card-title">Nuestra web</h3>
          <p class="hist-card-text">Placeholder.Placeholder.Placeholder.</p>
        </div>
      </div>
    </div>
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
    gap: 20px;
    margin-bottom: 20px;
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
    width: 300px; /* Ancho fijo para uniformidad */
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
  }

  .hist-card-title {
    color: var(--secondary-color);
    margin: 10px 0;
    font-size: 1.4rem;
    font-weight: 600;
  }

  .hist-card-text {
    color: #555;
    line-height: 1.6;
  }

  .hist-bloque.mostrar {
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    .hist-card-title {
      font-size: 1.2rem;
    }
    .hist-card-text {
      font-size: 0.95rem;
    }

    .historia-row {
      flex-direction: column;
      align-items: center;
    }

    .historia-card {
      width: 100%; /* En pantallas pequeñas, ocupa todo el ancho */
      max-width: 300px;
    }
  }
  `;

  document.head.appendChild(style);
  return section;
}