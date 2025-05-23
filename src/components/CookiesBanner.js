export function CookiesBanner() {
  // Función para crear el botón flotante
  function crearBotonFlotante() {
    if (document.getElementById('btn-flotante-cookies')) return;
    const btnFlotante = document.createElement('button');
    btnFlotante.id = 'btn-flotante-cookies';
    btnFlotante.textContent = "Gestionar Cookies";
    btnFlotante.setAttribute(
      "style",
      "position:fixed;bottom:24px;right:24px;background:#222;color:#fff;border:none;padding:12px 20px;border-radius:8px;cursor:pointer;z-index:1100;opacity:0.7;transition:filter 0.2s,transform 0.2s;"
    );
    btnFlotante.setAttribute(
      "onmouseenter",
      "this.style.opacity='1';this.style.filter='brightness(2)';this.style.transform='scale(1.13)'"
    );
    btnFlotante.setAttribute(
      "onmouseleave",
      "this.style.opacity='0.7';this.style.filter='brightness(1)';this.style.transform='scale(1)'"
    );
    btnFlotante.onclick = mostrarBanner;
    document.body.appendChild(btnFlotante);
  }

  // Función para eliminar el botón flotante
  function eliminarBotonFlotante() {
    const btn = document.getElementById('btn-flotante-cookies');
    if (btn) btn.remove();
  }

  // Función para crear cookies
  function setCookie(name, value, days) {
    const expires = days
      ? "; expires=" + new Date(Date.now() + days * 864e5).toUTCString()
      : "";
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
  }

  // Función para leer cookies
  function getCookie(name) {
    return document.cookie.split('; ').find(row => row.startsWith(name + '='))?.split('=')[1];
  }

  // Función para borrar cookies
  function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  // Función para mostrar el banner
  function mostrarBanner() {
    if (document.getElementById('cookies-banner')) return;
    eliminarBotonFlotante();

    // Overlay para bloquear la página
    const overlay = document.createElement('div');
    overlay.id = 'cookies-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.background = 'rgba(0,0,0,0.35)';
    overlay.style.zIndex = '999';
    overlay.style.pointerEvents = 'auto';
    overlay.style.userSelect = 'none';
    overlay.onclick = (e) => e.stopPropagation();
    overlay.onwheel = (e) => e.preventDefault();
    document.body.appendChild(overlay);

    // Banner de cookies
    const banner = document.createElement('div');
    banner.id = 'cookies-banner';
    banner.style.position = 'fixed';
    banner.style.top = '50%';
    banner.style.left = '50%';
    banner.style.transform = 'translate(-50%, -50%)';
    banner.style.width = '400px';
    banner.style.background = 'rgba(0, 0, 0, 0.5)';
    banner.style.color = '#fff';
    banner.style.padding = '15px';
    banner.style.display = 'flex';
    banner.style.flexDirection = 'column';
    banner.style.justifyContent = 'center';
    banner.style.alignItems = 'center';
    banner.style.gap = '16px';
    banner.style.borderRadius = '12px';
    banner.style.boxShadow = '0 4px 16px rgb(0, 0, 0)';
    banner.style.zIndex = '1001';

    banner.innerHTML = `
      <span style="text-align:center;">
        Este sitio utiliza cookies para mejorar tu experiencia y darnos información para hacer su estancia en nuestra web más recorfontante.<br>
      </span>
      <div class="cookies-banner-inner" style="display:flex;flex-direction:column;align-items:center;gap:11px;">
        <img src="public/images/Cookies.png" alt="Cookies" style="width: 150px; height: 150px;"/>
        <button id="mas-informacion"
          style="background:#222;opacity:0.7;color:#fff;border:none;padding:8px 24px;border-radius:4px;cursor:pointer;transition:background 0.2s,opacity 0.2s;transition:filter 0.2s,transform 0.2s;"
          onmouseenter="this.style.opacity='1';this.style.background='#0af';this.style.filter='brightness(1.3)';this.style.transform='scale(1.13)'"
          onmouseleave="this.style.opacity='0.7';this.style.background='#222';this.style.filter='brightness(1)';this.style.transform='scale(1)'"
        >Más información</button>
        <div style="display:flex;gap:12px;justify-content:center;">
          <button id="aceptar-cookies"
            style="background:#222;opacity:0.7;color:#fff;border:none;padding:8px 24px;border-radius:4px;cursor:pointer;transition:background 0.2s,opacity 0.2s;transition:filter 0.2s,transform 0.2s;"
            onmouseenter="this.style.opacity='1';this.style.background='#27ae60';this.style.filter='brightness(1.3)';this.style.transform='scale(1.13)'"
            onmouseleave="this.style.opacity='0.7';this.style.background='#222';this.style.filter='brightness(1)';this.style.transform='scale(1)'"
          >Aceptar</button>
          <button id="rechazar-cookies"
            style="background:#222;opacity:0.7;color:#fff;border:none;padding:8px 24px;border-radius:4px;cursor:pointer;transition:background 0.2s,opacity 0.2s;transition:filter 0.2s,transform 0.2s;"
            onmouseenter="this.style.opacity='1';this.style.background='#c0392b';this.style.filter='brightness(1.3)';this.style.transform='scale(1.13)'"
            onmouseleave="this.style.opacity='0.7';this.style.background='#222';this.style.filter='brightness(1)';this.style.transform='scale(1)'"
          >Rechazar</button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);

    // Bloquear scroll de fondo mientras el banner está activo
    document.body.style.overflow = 'hidden';

    // Botón aceptar
    const btnAceptar = document.getElementById('aceptar-cookies');
    btnAceptar.onclick = () => {
      setCookie("session_id", Math.random().toString(36).slice(2), 7);
      setCookie("cart_item", "[]", 7);
      setCookie("user_logged", "false", 7);
      setCookie("cookie_content", "accepted", 365);
      banner.remove();
      overlay.remove();
      document.body.style.overflow = '';
      crearBotonFlotante();
    };

    // Botón rechazar
    const btnRechazar = document.getElementById('rechazar-cookies');
    btnRechazar.onclick = () => {
      deleteCookie("session_id");
      deleteCookie("cart_item");
      deleteCookie("user_logged");
      deleteCookie("cookie_content");
      banner.remove();
      overlay.remove();
      document.body.style.overflow = '';
      crearBotonFlotante();
    };

    // Botón más información
    const btnInfo = document.getElementById('mas-informacion');
    btnInfo.onclick = () => {
      window.open('/Política-Cookies.html', '_blank');
    };
  }

  // Mostrar banner solo si no existe cookie_content
  if (!getCookie("cookie_content")) {
    mostrarBanner();
  } else {
    crearBotonFlotante();
  }
}