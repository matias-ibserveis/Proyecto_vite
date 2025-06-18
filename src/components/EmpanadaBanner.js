export function EmpanadaBanner() {
  if (!getEmpanada("empanada_content")) {
    mostrarBanner();
  }
}

// --- Utilidades para empanadas ---
function setEmpanada(name, value, days) {
  const expires = days
    ? "; expires=" + new Date(Date.now() + days * 864e5).toUTCString()
    : "";
  document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}
function getEmpanada(name) {
  return document.cookie.split('; ').find(row => row.startsWith(name + '='))?.split('=')[1];
}
function deleteEmpanada(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function injectEmpanadasStyles() {
  if (document.getElementById('empanadas-styles')) return;
  const style = document.createElement('style');
  style.id = 'empanadas-styles';
  style.textContent = `
    .empanadas-btn-flotante {
      background: #222;
      color: #fff;
      border: none;
      padding: 12px 20px;
      border-radius: 8px;
      cursor: pointer;
      z-index: 1100;
      opacity: 0.7;
      transition: filter 0.2s, transform 0.2s, opacity 0.2s;
      position: static;
      margin: 1.5em auto 0 auto;
      display: block;
    }
    .empanadas-btn-flotante:hover {
      opacity: 1;
      filter: brightness(2);
      transform: scale(1.13);
    }
    .empanadas-overlay {
      position: fixed;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      background: rgba(0,0,0,0.35);
      z-index: 2000;
      pointer-events: auto;
      user-select: none;
    }

    .empanadas-banner {
      position: fixed;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: 400px;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      padding: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 16px;
      border-radius: 12px;
      box-shadow: 0 4px 16px rgb(0, 0, 0);
      z-index: 2001;
    }
    .empanadas-banner-text {
      text-align: center;
    }
    .empanadas-banner-inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 11px;
      border-radius: 10px;
    }
    .empanadas-banner-img {
      width: 150px;
      height: 150px;
    }
    .empanadas-banner-btns {
      display: flex;
      gap: 12px;
      justify-content: center;
    }
    .empanadas-btn-info,
    .empanadas-btn-aceptar,
    .empanadas-btn-rechazar {
      background: #222;
      opacity: 1;
      color: #fff;
      border: none;
      padding: 8px 24px;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.2s, opacity 0.2s, filter 0.2s, transform 0.2s;
    }
    .empanadas-btn-info:hover {
      opacity: 1;
      background: #0af;
      filter: brightness(1.3);
      transform: scale(1.13);
    }
    .empanadas-btn-aceptar:hover {
      opacity: 1;
      background: #27ae60;
      filter: brightness(1.3);
      transform: scale(1.13);
    }
    .empanadas-btn-rechazar:hover {
      opacity: 1;
      background: #c0392b;
      filter: brightness(1.3);
      transform: scale(1.13);
    }

    /* SOLO MOVIL */
@media (max-width: 600px) {
  .empanadas-banner {
    width: 96vw;
    min-width: unset;
    max-width: 99vw;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 10px 2vw;
    font-size: 1rem;
    border-radius: 10px;
  }
      .empanadas-banner-img {
        width: 80px;
        height: 80px;
      }
      .empanadas-banner-inner {
        gap: 6px;
      }
      .empanadas-banner-btns {
        flex-direction: column;
        gap: 8px;
        width: 100%;
      }
      .empanadas-btn-info,
      .empanadas-btn-aceptar,
      .empanadas-btn-rechazar {
        width: 100%;
        font-size: 1rem;
        padding: 10px 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// --- Banner de empanadas (el frame central) ---
function mostrarBanner() {
  if (document.getElementById('empanadas-banner')) return;

  // Elimina overlays anteriores si existen
  const oldOverlay = document.getElementById('empanadas-overlay');
  if (oldOverlay) oldOverlay.remove();

  // Overlay para bloquear la página
  const overlay = document.createElement('div');
  overlay.id = 'empanadas-overlay';
  overlay.className = 'empanadas-overlay';
  overlay.onclick = (e) => e.stopPropagation();
  overlay.onwheel = (e) => e.preventDefault();
  document.body.appendChild(overlay);

  // Banner de empanadas
  const banner = document.createElement('div');
  banner.id = 'empanadas-banner';
  banner.className = 'empanadas-banner';

  banner.innerHTML = `
    <span class="empanadas-banner-text">
      Este sitio utiliza empanadas para mejorar tu experiencia y darnos información para hacer su estancia en nuestra web más reconfortante.<br>
    </span>
    <div class="empanadas-banner-inner">
      <img src="/images/Empanada.png" alt="Empanadas" class="empanadas-banner-img"/>
      <button id="mas-informacion" class="empanadas-btn-info">Más información</button>
      <div class="empanadas-banner-btns">
        <button id="aceptar-empanadas" class="empanadas-btn-aceptar">Aceptar</button>
        <button id="rechazar-empanadas" class="empanadas-btn-rechazar">Rechazar</button>
      </div>
<div style="margin-top:20px; margin-bottom:2px; font-weight:bold; font-size:1.1em;">(  Traduir a / Translate to  )</div>
<div class="empanadas-banner-translate-btns">
  <button id="empanada-catala-btn" class="empanadas-btn-info" style="padding:6px 12px;">
    <img src="/images/catala.webp" alt="Català" title="Català" style="height:24px;vertical-align:middle;margin-b">
  </button>
  <button id="empanada-english-btn" class="empanadas-btn-info" style="padding:6px 12px;">
    <img src="/images/inglesa.png" alt="English" title="English" style="height:24px;vertical-align:middle;">
  </button>
</div>
<div id="google_translate_element" style="visibility:hidden;height:0;margin-top:8px;"></div>
    </div>
  `;
  document.body.appendChild(banner);

  // Bloquear scroll de fondo mientras el banner está activo
  document.body.style.overflow = 'hidden';

  // --- Botón aceptar empanadas ---
  document.getElementById('aceptar-empanadas').onclick = () => {
    setEmpanada("session_id", Math.random().toString(36).slice(2), 7);
    setEmpanada("cart_item", "[]", 7);
    setEmpanada("user_logged", "false", 7);
    setEmpanada("empanada_content", "accepted", 365);
    banner.remove();
    overlay.remove();
    document.body.style.overflow = '';
  };

  // --- Botón rechazar empanadas ---
  document.getElementById('rechazar-empanadas').onclick = () => {
    deleteEmpanada("session_id");
    deleteEmpanada("cart_item");
    deleteEmpanada("user_logged");
    deleteEmpanada("empanada_content");
    banner.remove();
    overlay.remove();
    document.body.style.overflow = '';
  };

  // --- Botón más información ---
  document.getElementById('mas-informacion').onclick = () => {
    window.open('/Política-Cookies.html', '_blank');
  };
}

// --- Lógica de inicio: mostrar banner si no hay cookie ---
injectEmpanadasStyles();
if (!getEmpanada("empanada_content")) {
  mostrarBanner();
}

// Expón la función globalmente para el footer SIEMPRE
window.mostrarBannerEmpanadas = mostrarBanner;

 // Cargar Google Translate si aún no está cargado
  if (!document.querySelector('#google-translate-script')) {
    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(script);
  }

  window.googleTranslateElementInit = function () {
    new google.translate.TranslateElement({
      pageLanguage: 'es',
      includedLanguages: 'en,ca',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
  };

function mostrarTraductorYTraducir(lang) {
  const translateEl = document.getElementById('google_translate_element');
  translateEl.style.visibility = 'visible';
  translateEl.style.height = 'auto';

  function intentarTraducir() {
    const select = translateEl.querySelector('select.goog-te-combo');
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event('change'));
    } else {
      setTimeout(intentarTraducir, 200);
    }
  }
  intentarTraducir();
}

document.getElementById('empanada-catala-btn').onclick = () => mostrarTraductorYTraducir('ca');
document.getElementById('empanada-english-btn').onclick = () => mostrarTraductorYTraducir('en');