export function Footer() {
  
  const frame = document.createElement('div');
  frame.className = 'final_legal';
  frame.style.cssText = `
  text-align:center;
  color:#d1ab72;
  font-size:0.95em;
  box-shadow:0 0 32px 0 #ccc;
  max-width:900px;
  width:100%;
  background:#d1ab72;
  padding: 1em 0 0 0;
  border-radius: 18px;
  margin: 3rem auto 2rem auto;
  overflow: hidden;
  box-sizing: border-box;
`;

  if (!document.getElementById('footer-legal-style')) {
    const style = document.createElement('style');
    style.id = 'footer-legal-style';
    style.textContent = `
      .footer-legal-trigger {
        display: block;
        margin: 0.7em auto;
        background: rgba(0,0,0,0.7);
        border-radius: 10px;
        padding: 1em 0.9em;
        color: #fff !important;
        text-decoration: none;
        font-size: 1.25em;
        cursor: pointer;
        width: 270px;
        transition: filter 0.2s, transform 0.2s, background 0.2s;
        border: none;
        font-family: inherit;
        box-shadow: 0 4px 16px 0 #0003;
        font-weight: bold;
        letter-spacing: 0.5px;
        margin-top: 1em;
      }
      .footer-legal-trigger:hover {
        filter: brightness(1.3);
        transform: scale(1.08);
        background: rgba(0,0,0,0.85);
      }
      .footer-legal-links-bg {
        display: none;
        background: rgba(0,0,0,0.35);
        border-radius: 14px;
        max-width: 720px;
        margin: 1.5em auto 0 auto;
        padding: 1.2em 0.5em 1em 0.5em;
        box-shadow: 0 4px 32px #0003;
        transition: background 0.2s;
      }
      .footer-legal-links {
        display: none;
        grid-template-columns: repeat(3, 1fr);
        gap: 0.7em 1.2em;
        justify-items: center;
        margin: 0 auto;
        max-width: 700px;
        animation: fadeIn 0.3s;
      }
      .footer-legal-links-bg.show {
        display: block;
      }
      .footer-legal-links.show {
        display: grid;
      }
      .footer-legal-links a {
        background: rgba(0,0,0,0.4);
        border-radius: 6px;
        padding: 0.6em 0.9em;
        color: #fff !important;
        text-decoration: none;
        display: inline-block;
        transition: filter 0.2s, transform 0.2s, background 0.2s;
        margin: 0.2em 0;
        text-align: center;
        box-shadow: 0 2px 8px 0 #0002;
        font-weight: bold;
        font-size: 1em;
      }
      .footer-legal-links a:hover {
        filter: brightness(1.4);
        transform: scale(1.13);
        background: rgba(0,0,0,0.6);
      }
      .footer-cookies-row {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1.5em;
        margin: 2em 0 0 0;
      }
      .footer-cookies-img {
        width: 38px;
        height: 38px;
        object-fit: contain;
        border-radius: 8px;
        box-shadow: 0 2px 8px #0002;
        background: #fff3;
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px);}
        to { opacity: 1; transform: translateY(0);}
      }
      @media (max-width: 700px) {
        .final_legal {
          width: 100% !important;
          left: 0 !important;
          transform: none !important;
        }
        .footer-legal-links-bg {
          max-width: 98vw;
          padding: 1em 0.2em 1em 0.2em;
          border-radius: 10px;
        }
        .footer-legal-links,
        .footer-legal-links.show {
          grid-template-columns: 1fr !important;
          max-width: 98vw;
        }
        .footer-legal-links a {
          width: 60vw;
          min-width: 140px;
          max-width: 350px;
          margin-left: auto;
          margin-right: auto;
          box-sizing: border-box;
          font-size: 1em;
        }
        .footer-legal-trigger {
          width: 70vw;
          min-width: 0;
          font-size: 1.1em;
          box-sizing: border-box;
        }
        .footer-cookies-row {
          gap: 0.7em;
          margin-top: 1.2em;
        }
        .footer-cookies-img {
          width: 28px;
          height: 28px;
        }
      }
    `;
    document.head.appendChild(style);
  }

// --- Mathias a la izquierda, igual que España a la derecha ---
const bloqueMathias = `
  <a href="https://creativecommons.org/licenses/by-nd/4.0/" target="_blank" rel="noopener" style="flex: 1 1 0; display: flex; align-items: center; justify-content: center; height: 100px; background: rgb(243, 243, 243); text-decoration: none;">
    <img 
      src="images/CCLicense.png" 
      alt="Licencia Creative Commons" 
      style="width: 100%; height: 100%; object-fit: contain; display: block; background: transparent;"
    />
  </a>
`;

const bloqueEspana = `
  <a href="https://www.lamoncloa.gob.es/Paginas/index.aspx" target="_blank" rel="noopener" style="flex: 1 1 0; display: flex; align-items: center; justify-content: center; height: 100px; background: #ffcf2b; text-decoration: none;">
    <img 
      src="images/Logo_Gobierno_España.png" 
      alt="Logo Gobierno España" 
      style="width: 100%; height: 100%; object-fit: contain; display: block; background: transparent;"
    />
  </a>
`;

// --- Contenedor de ambos, CON fondo marrón ---
const atribucionesMathiasHTML = `
  <div style="
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: center;
    min-height: 60px;
    box-sizing: border-box;
    border-radius: 0 0 16px 16px;
    overflow: hidden;
  ">
    ${bloqueMathias}
    ${bloqueEspana}
  </div>
`;


  frame.innerHTML = `
    <button class="footer-legal-trigger">Información Legal</button>
    <div class="footer-legal-links-bg">
      <div class="footer-legal-links" id="footer-legal-links">
        <a href="/Avisos-Legales.html">Avisos Legales</a>
        <a href="/Política-Cookies.html">Política Cookies</a>
        <a href="/Política-Reembolsos.html">Política-Reembolso</a>
        <a href="/Privacidad.html">Privacidad</a>
        <a href="/Términos-Condiciones.html">Términos y Condiciones</a>
        <a href="/Accesibilidad.html">Accesibilidad</a>
      </div>
    </div>
    <div style="display:flex; justify-content:center; align-items:center; gap:3em; margin-top:2em;">
      <a href="https://www.instagram.com/lura.mallorca/?hl=es" target="_blank" rel="noopener" title="Instagram" style="display:inline-block;">
        <div style="
          background: rgba(255, 255, 255, 0.15);
          padding: 12px;
          border-radius: 18px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          transition: transform 0.2s, box-shadow 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
        "
        onmouseenter="this.style.transform='scale(1.1)'; this.style.boxShadow='0 6px 18px rgba(0,0,0,0.4)'"
        onmouseleave="this.style.transform='scale(1)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.3)'"
        >
          <img
            src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg"
            alt="Instagram"
            style="width: 36px; height: 36px; filter: invert(1) brightness(0.9);"
          />
        </div>
      </a>
    </div>
    <div class="footer-cookies-row">
      <button id="btn-footer-empanadas" class="footer-legal-trigger" style="margin-top:0; margin-bottom:1em;">
        Gestionar Cookies
      </button>
    </div>
  <div id="atribuciones-mathias-footer"></div>
`;

setTimeout(() => {
  const trigger = frame.querySelector('.footer-legal-trigger');
  const links = frame.querySelector('#footer-legal-links');
  const bg = frame.querySelector('.footer-legal-links-bg');
  // Solo el primer trigger abre/cierra legales
  if (trigger) {
    trigger.onclick = () => {
      links.classList.toggle('show');
      bg.classList.toggle('show');
    };
  }
  // Botón cookies: asigna el evento cuando la función esté disponible
  const btnEmpanadas = frame.querySelector('#btn-footer-empanadas');
  function asignarEmpanadas() {
    if (btnEmpanadas && window.mostrarBannerEmpanadas) {
      btnEmpanadas.onclick = window.mostrarBannerEmpanadas;
    } else if (btnEmpanadas) {
      setTimeout(asignarEmpanadas, 100);
    }
  }
  asignarEmpanadas();

  // Insertar atribuciones Mathias
  const atribDiv = frame.querySelector('#atribuciones-mathias-footer');
  if (atribDiv) {
    atribDiv.innerHTML = atribucionesMathiasHTML;
  }
}, 0);

return frame;
}