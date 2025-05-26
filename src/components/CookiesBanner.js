export function CookiesBanner() {
  function injectCookiesStyles() {
    if (document.getElementById('cookies-styles')) return;
    const style = document.createElement('style');
    style.id = 'cookies-styles';
    style.textContent = `
      /* --- Botón flotante de cookies --- */
      .cookies-btn-flotante {
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: #222;
        color: #fff;
        border: none;
        padding: 12px 20px;
        border-radius: 8px;
        cursor: pointer;
        z-index: 1100;
        opacity: 0.7;
        transition: filter 0.2s, transform 0.2s, opacity 0.2s;
      }
      .cookies-btn-flotante:hover {
        opacity: 1;
        filter: brightness(2);
        transform: scale(1.13);
      }

      /* --- Overlay para bloquear la página --- */
      .cookies-overlay {
        position: fixed;
        top: 0; left: 0;
        width: 100vw; height: 100vh;
        background: rgba(0,0,0,0.35);
        z-index: 999;
        pointer-events: auto;
        user-select: none;
      }

      /* --- Banner de cookies central --- */
      .cookies-banner {
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
        z-index: 1001;
      }
      .cookies-banner-text {
        text-align: center;
      }
      .cookies-banner-inner {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 11px;
        border-radius: 10px;
      }
      .cookies-banner-img {
        width: 150px;
        height: 150px;
      }
      .cookies-banner-btns {
        display: flex;
        gap: 12px;
        justify-content: center;
      }
      /* --- Botones del banner --- */
      .cookies-btn-info,
      .cookies-btn-aceptar,
      .cookies-btn-rechazar {
        background: #222;
        opacity: 0.7;
        color: #fff;
        border: none;
        padding: 8px 24px;
        border-radius: 4px;
        cursor: pointer;
        transition: background 0.2s, opacity 0.2s, filter 0.2s, transform 0.2s;
      }
      .cookies-btn-info:hover {
        opacity: 1;
        background: #0af;
        filter: brightness(1.3);
        transform: scale(1.13);
      }
      .cookies-btn-aceptar:hover {
        opacity: 1;
        background: #27ae60;
        filter: brightness(1.3);
        transform: scale(1.13);
      }
      .cookies-btn-rechazar:hover {
        opacity: 1;
        background: #c0392b;
        filter: brightness(1.3);
        transform: scale(1.13);
      }
    `;
    document.head.appendChild(style);
  }

  // --- Utilidades para cookies ---
  function setCookie(name, value, days) {
    const expires = days
      ? "; expires=" + new Date(Date.now() + days * 864e5).toUTCString()
      : "";
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
  }
  function getCookie(name) {
    return document.cookie.split('; ').find(row => row.startsWith(name + '='))?.split('=')[1];
  }
  function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  // --- Botón flotante para gestionar cookies ---
  function crearBotonFlotante() {
    if (document.getElementById('btn-flotante-cookies')) return;
    const btnFlotante = document.createElement('button');
    btnFlotante.id = 'btn-flotante-cookies';
    btnFlotante.textContent = "Gestionar Cookies";
    btnFlotante.className = "cookies-btn-flotante";
    btnFlotante.onclick = mostrarBanner;
    document.body.appendChild(btnFlotante);
  }
  function eliminarBotonFlotante() {
    const btn = document.getElementById('btn-flotante-cookies');
    if (btn) btn.remove();
  }

  // --- Banner de cookies (el frame central) ---
  function mostrarBanner() {
    if (document.getElementById('cookies-banner')) return;
    eliminarBotonFlotante();

    // --- Elimina overlays anteriores si existen ---
    const oldOverlay = document.getElementById('cookies-overlay');
    if (oldOverlay) oldOverlay.remove();

    // Overlay para bloquear la página
    const overlay = document.createElement('div');
    overlay.id = 'cookies-overlay';
    overlay.className = 'cookies-overlay';
    overlay.onclick = (e) => e.stopPropagation();
    overlay.onwheel = (e) => e.preventDefault();
    document.body.appendChild(overlay);

    // Banner de cookies
    const banner = document.createElement('div');
    banner.id = 'cookies-banner';
    banner.className = 'cookies-banner';

    banner.innerHTML = `
      <span class="cookies-banner-text">
        Este sitio utiliza cookies para mejorar tu experiencia y darnos información para hacer su estancia en nuestra web más reconfortante.<br>
      </span>
      <div class="cookies-banner-inner">
        <img src="/images/Cookies.png" alt="Cookies" class="cookies-banner-img"/>
        <button id="mas-informacion" class="cookies-btn-info">Más información</button>
        <div class="cookies-banner-btns">
          <button id="aceptar-cookies" class="cookies-btn-aceptar">Aceptar</button>
          <button id="rechazar-cookies" class="cookies-btn-rechazar">Rechazar</button>
        </div>
      </div>
    `;
    document.body.appendChild(banner);

    // Bloquear scroll de fondo mientras el banner está activo
    document.body.style.overflow = 'hidden';

    // --- Botón aceptar cookies ---
    document.getElementById('aceptar-cookies').onclick = () => {
      setCookie("session_id", Math.random().toString(36).slice(2), 7);
      setCookie("cart_item", "[]", 7);
      setCookie("user_logged", "false", 7);
      setCookie("cookie_content", "accepted", 365);
      banner.remove();
      overlay.remove();
      document.body.style.overflow = '';
      crearBotonFlotante();
    };

    // --- Botón rechazar cookies ---
    document.getElementById('rechazar-cookies').onclick = () => {
      deleteCookie("session_id");
      deleteCookie("cart_item");
      deleteCookie("user_logged");
      deleteCookie("cookie_content");
      banner.remove();
      overlay.remove();
      document.body.style.overflow = '';
      crearBotonFlotante();
    };

    // --- Botón más información ---
    document.getElementById('mas-informacion').onclick = () => {
      window.open('/Política-Cookies.html', '_blank');
    };
  }

  // --- Lógica de inicio: mostrar banner o botón flotante ---
  injectCookiesStyles(); // Inserta los estilos solo una vez
  if (!getCookie("cookie_content")) {
    mostrarBanner();
  } else {
    crearBotonFlotante();
  }
}