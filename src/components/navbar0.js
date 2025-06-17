export function Navbar() {
  const nav = document.createElement("nav");
  nav.className = "navbar navbar-expand-lg navbar-custom";

  nav.innerHTML = `
    <div id="google_translate_element"></div>
    <div class="container-fluid">
      <a class="navbar-brand" href="#">LUŔA</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#myNavbar" aria-controls="myNavbar" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="myNavbar">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item active"><a class="nav-link" href="#inicio">Inicio</a></li>
          <li class="nav-item"><a class="nav-link" href="#productos">Productos</a></li>
          <li class="nav-item"><a class="nav-link" href="#listas_cestas">Cestas</a></li>
          <li class="nav-item"><a class="nav-link" href="#nuestra-filosofia">Nuestra filosofia</a></li>
          <li class="nav-item"><a class="nav-link" href="#contacto">Más Información</a></li>
          <li class="nav-item"><a class="nav-link" href="Avisos-Legales.html">Aviso Legal</a></li>
          <li class="nav-item">
            <a class="nav-link" href="/cesta_cliente.html">
              <img src="imagenes/carrito.png" alt="Carrito" style="height: 24px;">
            </a>
          </li>
        </ul>
        <div class="d-flex">
          <img src="imagenes/catala.webp" id="catalaBtn" alt="Català" title="Català" style="height: 24px; cursor: pointer; margin-right: 8px;">
          <img src="imagenes/inglesa.png" id="englishBtn" alt="English" title="English" style="height: 24px; cursor: pointer;">
        </div>
      </div>
    </div>
  `;

  const style = document.createElement("style");
  style.innerHTML = `
    .navbar-custom {
      background-color: #d1ab72;
      border: none;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      border-radius: 10px;
      padding: 10px 20px;
      font-size: 15px;
      font-family: 'Aloja Extended', sans-serif;
      margin-bottom: 5px;
    }

    .navbar-custom .navbar-brand {
      color: white !important;
      font-size: 25px;
    }

    .navbar-custom .navbar-nav .nav-link {
      color: #6d5839 !important;
      font-size: 18px;
      transition: background 0.2s, color 0.2s;
    }

    .navbar-custom .navbar-nav .nav-link:hover,
    .navbar-custom .navbar-nav .nav-link.active {
      color: #000000 !important;
      background-color: #ffffff !important;
    }

    #google_translate_element {
      visibility: hidden;
      height: 0;
      width: 100%;
      text-align: right;
      transition: visibility 0.3s ease;
    }

    .goog-te-banner-frame.skiptranslate {
      display: none !important;
    }

    body {
      top: 0px !important;
    }
  `;
  document.head.appendChild(style);

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

  // Mostrar traductor al pulsar los iconos y cambiar idioma
  nav.addEventListener('click', e => {
    const translateEl = document.querySelector('#google_translate_element');

    if (e.target.id === 'catalaBtn') {
      translateEl.style.visibility = 'visible';
      translateEl.style.height = 'auto';
      setTimeout(() => {
        const select = document.querySelector('select.goog-te-combo');
        if (select) {
          select.value = 'ca';
          select.dispatchEvent(new Event('change'));
        }
      }, 500);
    }

    if (e.target.id === 'englishBtn') {
      translateEl.style.visibility = 'visible';
      translateEl.style.height = 'auto';
      setTimeout(() => {
        const select = document.querySelector('select.goog-te-combo');
        if (select) {
          select.value = 'en';
          select.dispatchEvent(new Event('change'));
        }
      }, 500);
    }
  });

  return nav;
}
