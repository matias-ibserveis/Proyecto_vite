export function CookiesBanner() {
  const banner = document.createElement('div');
  banner.id = 'cookies-banner';
  banner.style.position = 'fixed';
  banner.style.top = '70%';
  banner.style.left = '50%';
  banner.style.transform = 'translate(-50%, -50%)';
  banner.style.width = '400px';
  banner.style.background = 'rgba(255, 255, 255, 0.70)';
  banner.style.color = '#fff';
  banner.style.padding = '15px';
  banner.style.display = 'flex';
  banner.style.flexDirection = 'column';
  banner.style.justifyContent = 'center';
  banner.style.alignItems = 'center';
  banner.style.gap = '16px';
  banner.style.borderRadius = '12px';
  banner.style.boxShadow = '0 4px 16px rgb(0, 0, 0)';
  banner.style.zIndex = '1000';

  banner.innerHTML = `
    <span style="text-align:center;">
      Este sitio utiliza cookies para mejorar tu experiencia y darnos información para hacer su estancia en nuestra web más recorfontante.<br>
      <img src="/images/cookies.png" alt="Cookies" style="max-width:155px;"><br>
      <a id="mas-informacion" href="/CookiesHtmlInfo.html" style="color:#0af;text-decoration:underline;transition:color 0.2s;">Más información</a>
      <br>
    </span>
    <div style="display:flex;gap:12px;">
      <button id="aceptar-cookies" style="background:#222;opacity:0.7;color:#fff;border:none;padding:8px 24px;border-radius:4px;cursor:pointer;transition:background 0.2s,opacity 0.2s;">
        Aceptar
      </button>
      <button id="rechazar-cookies" style="background:#222;opacity:0.7;color:#fff;border:none;padding:8px 24px;border-radius:4px;cursor:pointer;transition:background 0.2s,opacity 0.2s;">
        Rechazar
      </button>
    </div>
  `;

  document.body.appendChild(banner);

  // Efecto hover para Botón "aceptar"
  const btnAceptar = document.getElementById('aceptar-cookies');
  btnAceptar.onmouseenter = () => {
    btnAceptar.style.opacity = '1';
    btnAceptar.style.background = '#27ae60';
  };
  btnAceptar.onmouseleave = () => {
    btnAceptar.style.opacity = '0.7';
    btnAceptar.style.background = '#222';
  };
  btnAceptar.onclick = () => {
    banner.remove();
  };

  // Efecto hover para Botón "rechazar"
  const btnRechazar = document.getElementById('rechazar-cookies');
  btnRechazar.onmouseenter = () => {
    btnRechazar.style.opacity = '1';
    btnRechazar.style.background = '#c0392b';
  };
  btnRechazar.onmouseleave = () => {
    btnRechazar.style.opacity = '0.7';
    btnRechazar.style.background = '#222';
  };
  btnRechazar.onclick = () => {
    banner.remove();
  };

  // Efecto hover para enlace "Más información"
  const enlaceInfo = document.getElementById('mas-informacion');
  enlaceInfo.onmouseenter = () => {
    enlaceInfo.style.color = '#2980b9';
    enlaceInfo.style.textDecoration = 'underline';
  };
  enlaceInfo.onmouseleave = () => {
    enlaceInfo.style.color = '#0af';
    enlaceInfo.style.textDecoration = 'underline';
  };
}