export function Navbar() {
  const nav = document.createElement("nav");
  nav.className = "navbar navbar-custom fixed-top";
  if (!document.getElementById('navbar-style')) {
  const style = document.createElement('style');
  style.id = 'navbar-style';
  style.textContent = `
    .navbar-custom,
    .navbar-custom *,
    .final_legal,
    .final_legal * {
      font-family: 'Aloja Extended', sans-serif !important;
    }
    .navbar-custom {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      z-index: 1050;
      background-color: #d1ab72;
      border: none;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      min-height: 84px;
      font-size: 15px;
      font-family: 'Aloja Extended', sans-serif;
      letter-spacing: normal;
      margin-bottom: 5px;
      overflow: visible;
    }
    .navbar-custom .container-fluid {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 18px;
    }
    .navbar-custom .navbar-brand {
      color: rgb(161, 107, 107) !important;
      font-family: 'Aloja Extended', sans-serif !important;
      font-size: 25px;
      background: transparent;
      position: relative;
      display: flex;
      align-items: center;
      margin-left: 0 !important;
      padding-left: 0 !important;
      z-index: 1;
    }
    .navbar-custom .navbar-brand img {
      height: 80px;
      width: auto;
      position: static;
      margin-right: 10px;
      vertical-align: middle;
    }
    .navbar-links {
      display: none;
      flex: 1 1 auto;
      align-items: center;
      height: 100%;
    }
    .navbar-links.show {
      display: flex !important;
      flex-direction: row;
      align-items: center;
      height: 100%;
    }
    .navbar-links ul {
      display: flex;
      flex-direction: row;
      gap: 18px;
      margin-bottom: 0;
      padding-left: 0;
      list-style: none;
    }
    .navbar-custom .navbar-nav {
      margin-left: 40px;
    }
    .navbar-custom .navbar-nav .nav-item {
      margin-right: 22px;
      border-radius: 18px;
      padding: 0;
      transition: background 0.2s;
    }
    .navbar-custom .navbar-nav .nav-item:last-child {
      margin-right: 0;
    }
    .navbar-custom .navbar-nav .nav-link {
      color: #ffffff !important;
      font-family: 'Aloja Extended', sans-serif;
      padding-left: -10px !important;
      font-size: 22px;
      border-radius: 18px;
      background: rgba(0,0,0,0.04);
      padding: 6px 10px;
      display: block;
      transition: background 0.2s, color 0.2s, filter 0.2s, transform 0.2s;
    }
    .navbar-custom .navbar-nav .nav-link:hover,
    .navbar-custom .navbar-nav .nav-link.active {
      color:#d1ab72 !important;
      background: rgba(0,0,0,0.5);
      filter: brightness(1.3);
      transform: scale(1.08);
    }
    .navbar-custom .navbar-nav .nav-link.nav-link-cestas {
      color: hsl(24, 79%, 39%) !important;
      font-weight: bold;
      border-radius: 18px;
      background: rgba(0,0,0,0.05);
    }
    .navbar-custom .navbar-nav .nav-link.nav-link-cestas:hover,
    .navbar-custom .navbar-nav .nav-link.nav-link-cestas.active {
      color: #ffc31f !important;
      background: rgba(0,0,0,0.5) !important;
    }
    .navbar-custom .navbar-nav .nav-link.active {
      color: #443723 !important;
      background-color: #fff !important;
    }
    .navbar-custom .navbar-toggler {
      margin-left: auto;
      margin-right: 30px;
      z-index: 2;
      position: relative;
      background-color: #d1ab72;
      transition: background 0.2s;
      border: none;
      width: 48px !important;
      height: 48px !important;
      min-width: 48px !important;
      min-height: 48px !important;
      aspect-ratio: 1 / 1 !important;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      padding: 0 !important;
    }
    .navbar-custom .navbar-toggler,
    .navbar-custom .navbar-toggler:hover,
    .navbar-custom .navbar-toggler:focus {
      border: none !important;
      outline: none !important;
      box-shadow: none !important;
    }
    .navbar-custom .navbar-toggler .navbar-toggler-icon {
      background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(0,0,0,0.7)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
    }
    .navbar-custom .navbar-toggler.active {
      background-color: #6d5839 !important;
    }
    .navbar-custom .navbar-toggler.active .navbar-toggler-icon {
      background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='white' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
    }
    .navbar-custom::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 140px;
      height: 100%;
      background: rgba(255, 255, 255, 0.87);
      border-radius: 0 1em 2em 0;
      z-index: 0;
    }
    @keyframes fadeInMenuLink {
      from { opacity: 0; transform: translateY(-10px);}
      to { opacity: 1; transform: translateY(0);}
    }
    @keyframes fadeOutMenuLink {
      from { opacity: 1; transform: translateY(0);}
      to { opacity: 0; transform: translateY(-10px);}
    }
    @media (min-width: 992px) {
      .navbar-links:not(.show):not(.hiding) .nav-item { opacity: 1; animation: none;}
      .navbar-links.show .nav-item { opacity: 0; animation: fadeInMenuLink 0.5s forwards;}
      .navbar-links.show .nav-item:nth-child(1) { animation-delay: 0.05s; }
      .navbar-links.show .nav-item:nth-child(2) { animation-delay: 0.12s; }
      .navbar-links.show .nav-item:nth-child(3) { animation-delay: 0.19s; }
      .navbar-links.show .nav-item:nth-child(4) { animation-delay: 0.26s; }
      .navbar-links.show .nav-item:nth-child(5) { animation-delay: 0.33s; }
      .navbar-links.show .nav-item:nth-child(6) { animation-delay: 0.40s; }
      .navbar-links.show .nav-item:nth-child(7) { animation-delay: 0.47s; }
      .navbar-links.show .nav-item:nth-child(8) { animation-delay: 0.54s; }
      .navbar-links.hiding .nav-item { opacity: 1; animation: fadeOutMenuLink 0.4s forwards;}
      .navbar-links.hiding .nav-item:nth-child(1) { animation-delay: 0.05s; }
      .navbar-links.hiding .nav-item:nth-child(2) { animation-delay: 0.12s; }
      .navbar-links.hiding .nav-item:nth-child(3) { animation-delay: 0.19s; }
      .navbar-links.hiding .nav-item:nth-child(4) { animation-delay: 0.26s; }
      .navbar-links.hiding .nav-item:nth-child(5) { animation-delay: 0.33s; }
      .navbar-links.hiding .nav-item:nth-child(6) { animation-delay: 0.40s; }
      .navbar-links.hiding .nav-item:nth-child(7) { animation-delay: 0.47s; }
      .navbar-links.hiding .nav-item:nth-child(8) { animation-delay: 0.54s; }
    }
    @media (max-width: 1600px) {
      .navbar-links {
        position: absolute !important;
        top: 99%;
        left: 140px;
        width: calc(100vw - 140px) !important;
        height: auto !important;
        background: #d1ab72 !important;
        border-radius: 0 0 0px 16px;
        box-shadow: 0 4px 16px #0002;
        flex-direction: column;
        align-items: center;
        padding-top: 1em;
        padding-bottom: 0.5em;
        height: auto;
        overflow: hidden;
        transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s;
        max-height: 0;
        opacity: 0;
        pointer-events: none;
      }
      .navbar-links.show {
        max-height: 900px;
        opacity: 1;
        pointer-events: auto;
        overflow: visible;
        transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s 0.1s;
      }
      .navbar-links ul {
        flex-direction: column !important;
        gap: 0.7em;
        width: 100%;
        align-items: center;
      }
      .navbar-links .nav-item:not(:last-child) {
        width: 100%;
        margin: 0;
        display: flex;
        justify-content: center;
      }
      .navbar-links .nav-item:last-child {
        width: 100%;
        margin: 0;
        display: block;
        text-align: center;
      }
      .navbar-links .nav-link {
        width: 100%;
        margin: 0 auto;
        text-align: center;
        border-radius: 16px 0px 0px 16px !important;
        padding: 1em 0.5em;
        border-bottom: 2px solid #e0c28f;
        background: none;
        display: block;
      }
      @keyframes slideInRight {
        from { opacity: 0; transform: translateX(60px);}
        to { opacity: 1; transform: translateX(0);}
      }
      .navbar-links.show .nav-item { opacity: 0; animation: slideInRight 0.5s forwards;}
      .navbar-links.show .nav-item:nth-child(1) { animation-delay: 0.10s; }
      .navbar-links.show .nav-item:nth-child(2) { animation-delay: 0.18s; }
      .navbar-links.show .nav-item:nth-child(3) { animation-delay: 0.26s; }
      .navbar-links.show .nav-item:nth-child(4) { animation-delay: 0.34s; }
      .navbar-links.show .nav-item:nth-child(5) { animation-delay: 0.42s; }
      .navbar-links.show .nav-item:nth-child(6) { animation-delay: 0.50s; }
      .navbar-links.show .nav-item:nth-child(7) { animation-delay: 0.58s; }
      .navbar-links.show .nav-item:nth-child(8) { animation-delay: 0.66s; }
    }
    .navbar-lang {
      background: #fff;
      border: none;
      border-radius: 50%;
      width: 44px;
      height: 44px;
      margin-left: 10px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5em;
      box-shadow: 0 2px 8px #0001;
      transition: background 0.2s;
    }
    .navbar-lang:hover {
      background: #f0f0f0;
    }
    .navbar-lang-menu {
      min-width: 120px;
      padding: 8px 0;
    }
    .navbar-lang-menu .lang-option {
      background: none;
      border: none;
      width: 100%;
      text-align: left;
      padding: 8px 18px;
      font-size: 1em;
      cursor: pointer;
      transition: background 0.2s;
    }
    .navbar-lang-menu .lang-option:hover {
      background: #eee;
    }
  `;
  document.head.appendChild(style);
}

nav.innerHTML = `
  <div class="container-fluid">
    <a class="navbar-brand" href="/" style="display: flex; align-items: center; gap: 10px;">
      <img src="/images/Lura_Icon.png" alt="LURA Logo">
    </a>
    <div class="navbar-links" style="display: none;">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item"><a class="nav-link" href="/#sobre-nosotras">Sobre Nosotras</a></li>
        <li class="nav-item"><a class="nav-link" href="/#nuestra-filosofia">Nuestra Filosofía</a></li>
        <li class="nav-item"><a class="nav-link nav-link-cestas" href="/#Info-Cestas">Cestas Semanales</a></li>
        <li class="nav-item"><a class="nav-link" href="/#Servicios">Servicios</a></li>
        <li class="nav-item"><a class="nav-link" href="/#Zona_de_Trabajo">Zona de Trabajo</a></li>
        <li class="nav-item"><a class="nav-link" href="/#talleres">Talleres</a></li>
        <li class="nav-item"><a class="nav-link" href="/#reseñas">Reseñas</a></li>
        <li class="nav-item"><a class="nav-link" href="/#contacto">Contacto</a></li>
      </ul>
    </div>
    <button class="navbar-toggler" type="button" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  </div>
`;

  const toggler = nav.querySelector('.navbar-toggler');
  const links = nav.querySelector('.navbar-links');

  let animating = false;

  toggler.addEventListener('click', function () {
    if (animating) return;

    const isDesktop = window.innerWidth >= 1201;

    if (links.classList.contains('show')) {
      links.classList.remove('show');
      links.classList.add('hiding');
      links.style.display = isDesktop ? 'flex' : '';
      animating = true;
      setTimeout(() => {
        links.classList.remove('hiding');
        links.style.display = 'none';
        animating = false;
      }, 1100);
    } else {
      links.style.display = isDesktop ? 'flex' : '';
      void links.offsetWidth;
      links.classList.add('show');
    }
    this.classList.toggle('active');
  });

  // Cerrar menú al hacer click fuera
  document.addEventListener('click', function (e) {
    const isDesktop = window.innerWidth >= 1201;
    if (
      links.classList.contains('show') &&
      !links.contains(e.target) &&
      !toggler.contains(e.target)
    ) {
      // Cierra igual que desde el botón
      links.classList.remove('show');
      links.classList.add('hiding');
      links.style.display = isDesktop ? 'flex' : '';
      toggler.classList.remove('active');
      setTimeout(() => {
        links.classList.remove('hiding');
        links.style.display = 'none';
      }, 1100);
    }
  });

const NAVBAR_OFFSETS = {
  'sobre-nosotras': 130,
  'nuestra-filosofia': 270,
  'Info-Cestas': 1,
  'Servicios': 130,
  'Zona_de_Trabajo': 130,
  'talleres': 130,
  'reseñas': 200,
  'contacto': 0 
};

nav.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href && href.includes('#')) {
      let hash = href.split('#')[1];
      // Normaliza el hash para que coincida con las claves del objeto
      hash = hash.replace(/ /g, '_'); // reemplaza espacios por guiones bajos
      // Si tus claves están en minúsculas, descomenta la siguiente línea:
      // hash = hash.toLowerCase();

      const target = document.getElementById(hash);

      // Lógica especial para "contacto"
      if (hash === 'contacto') {
        e.preventDefault();
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        if (links.classList.contains('show')) toggler.click();
        return;
      }
      // Lógica especial para "sobre-nosotras"
      if (hash === 'sobre-nosotras' && target) {
        e.preventDefault();
        const y = target.getBoundingClientRect().top + window.pageYOffset - (NAVBAR_OFFSETS[hash] || 0);
        window.scrollTo({ top: y, behavior: 'smooth' });
        if (links.classList.contains('show')) toggler.click();
        return;
      }

      if (target) {
        e.preventDefault();
        // Offset configurable por sección
        const offset = NAVBAR_OFFSETS[hash] !== undefined ? NAVBAR_OFFSETS[hash] : 130;
        const y = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        if (links.classList.contains('show')) {
          toggler.click();
        }
      }
    }
  });
});
return nav;
}