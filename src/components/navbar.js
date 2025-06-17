export function Navbar() {
  const nav = document.createElement("nav");
  nav.className = "navbar navbar-expand-lg navbar-custom";

  nav.innerHTML = `
    <div class="container-fluid d-flex justify-content-between align-items-center">
      <a class="navbar-brand" href="#">LUŔA</a>
      
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#myNavbar" aria-controls="myNavbar" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="myNavbar" style="flex-grow:1;">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-start">
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

        <div class="d-flex align-items-center gap-3" style="min-width: 180px;">
          <div id="flags" class="d-flex align-items-center gap-2">
            <img src="imagenes/catala.webp" id="catalaBtn" alt="Català" title="Català" style="height: 24px; cursor: pointer;">
            <img src="imagenes/inglesa.png" id="englishBtn" alt="English" title="English" style="height: 24px; cursor: pointer;">
          </div>
          <div id="google_translate_element" style="min-width: 160px;"></div>
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
      border-radius: 10px 10px 10px 10px;
      padding: 10px 20px;
      font-size: 15px;
      font-family: 'Aloja Extended', sans-serif;
      letter-spacing: normal;
      margin-bottom: 5px;
    }

    .navbar-custom .navbar-brand {
      color: white !important;
      font-family: 'Aloja Extended', sans-serif !important;
      font-size: 25px;
    }

    .navbar-custom .navbar-nav .nav-link {
      color: #6d5839 !important;
      font-family: 'Aloja Extended', sans-serif;
      font-size: 18px;
      transition: background 0.2s, color 0.2s;
    }

    .navbar-custom .navbar-nav .nav-link:hover,
    .navbar-custom .navbar-nav .nav-link.active {
      color: #000000 !important;
      background-color: #ffffff !important;
    }

    .navbar-custom .navbar-toggler {
      border-color: #ffffff;
      background-color: #d1ab72;
    }
    .navbar-custom .navbar-toggler-icon {
      background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(0,0,0,0.7)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
    }

    .navbar-custom .navbar-nav .nav-link.active {
      color: #443723 !important;
      background-color: #fff !important;
    }

    /* Google Translate container */
    #google_translate_element {
      background: white;
      padding: 5px 10px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      visibility: hidden;
      height: 0;
      overflow: hidden;
      transition: visibility 0.3s, height 0.3s;
      font-size: 14px;
    }

    /* Selector idioma */
    #google_translate_element select.goog-te-combo {
      width: 100%;
      padding: 4px;
      font-size: 14px;
      border-radius: 4px;
      border: 1px solid #ccc;
    }

  `;
  document.head.appendChild(style);

  // Traductor oculto inicialmente
  const translateDiv = nav.querySelector('#google_translate_element');

  // Cargar traductor (solo 1 vez)
  let googleTranslateLoaded = false;
  window.googleTranslateElementInit = function () {
    new google.translate.TranslateElement({
      pageLanguage: 'es',
      includedLanguages: 'en,ca',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
  };

  function loadGoogleTranslateScript() {
    if (!googleTranslateLoaded) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(script);
      googleTranslateLoaded = true;
    }
  }

  // Mostrar traductor y seleccionar idioma
  function showTranslator(lang) {
    translateDiv.style.visibility = 'visible';
    translateDiv.style.height = 'auto';
    loadGoogleTranslateScript();

    // Esperar a que el selector cargue y cambiar idioma
    setTimeout(() => {
      const select = translateDiv.querySelector('select.goog-te-combo');
      if (select) {
        select.value = lang;
        select.dispatchEvent(new Event('change'));
      }
    }, 700);

    // Ocultar después de 5 segundos
    setTimeout(() => {
      translateDiv.style.visibility = 'hidden';
      translateDiv.style.height = '0';
    }, 5700);
  }

  // Eventos click en las banderas
  nav.addEventListener('click', e => {
    if (e.target.id === 'catalaBtn') {
      showTranslator('ca');
    }
    if (e.target.id === 'englishBtn') {
      showTranslator('en');
    }
  });

  return nav;
}
