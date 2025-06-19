export function crearEstructuraHTML(buscarProductosCallback, mostrarTodosCallback) {
  const seccion = document.createElement("section");
  seccion.className = "container py-2";
  seccion.id = "productos";
  seccion.innerHTML = `
  <div class="titulo-busqueda-wrapper anim-titulo-arriba" style="margin-top: 120px;">
    <h3 class="titulo_arriba_buscar my-4">Productos en LURA</h3>
  </div>
    <div class="search-form-wrapper anim-busqueda-arriba">
      <form class="search-form" role="search" onsubmit="return false;">
        <input id="busquedaInput" class="form-control category-search" type="search" placeholder="¿Que se te Antoja?" aria-label="Search">
      </form>
    </div>
    <div class="busqueda-brtn anim-btn-arriba">
      <button id="buscarBtn" class="btn search-btn" type="button">Buscar</button>
    </div>
    <div class="row anim-lista-arriba" id="productos-lista"></div>
    <div id="paginacion" class="text-center my-3 anim-paginacion-arriba"></div>
  `;

  const buscarBtn = seccion.querySelector("#buscarBtn");
  if (buscarBtn) buscarBtn.addEventListener("click", buscarProductosCallback);

  // Inyecta animaciones solo una vez
  if (!document.getElementById('animaciones-productos-style')) {
    const animStyle = document.createElement('style');
    animStyle.id = 'animaciones-productos-style';
    animStyle.textContent = `
/* Título más lento */
.anim-titulo-arriba {
  animation: slideDownFadeInTitulo 1.8s ease;
}
@keyframes slideDownFadeInTitulo {
  from { opacity: 0; transform: translateY(-40px);}
  to   { opacity: 1; transform: translateY(0);}
}

/* Barra de búsqueda más lenta */
.anim-busqueda-arriba {
  animation: slideDownFadeInBusqueda 1s ease;
}
@keyframes slideDownFadeInBusqueda {
  from { opacity: 0; transform: translateY(-40px);}
  to   { opacity: 1; transform: translateY(0);}
}

/* Botón velocidad original */
.anim-btn-arriba {
  animation: slideDownFadeInBtn 0.7s ease;
}
@keyframes slideDownFadeInBtn {
  from { opacity: 0; transform: translateY(-40px);}
  to   { opacity: 1; transform: translateY(0);}
}

/* Lista de productos y paginación más lento */
.anim-lista-arriba {
  animation: slideDownFadeInLista 1s ease;
}
@keyframes slideDownFadeInLista {
  from { opacity: 0; transform: translateY(-40px);}
  to   { opacity: 1; transform: translateY(0);}
}
.anim-paginacion-arriba {
  animation: slideDownFadeInPaginacion 1s ease;
}
@keyframes slideDownFadeInPaginacion {
  from { opacity: 0; transform: translateY(-40px);}
  to   { opacity: 1; transform: translateY(0);}
}

/* Cards de productos (entrada y salida) */
.aparecer-desde-abajo {
  animation: slideUpFadeIn 1s ease;
}
@keyframes slideUpFadeIn {
  from { opacity: 0; transform: translateY(40px);}
  to   { opacity: 1; transform: translateY(0);}
}
.salida-hacia-abajo {
  animation: slideDownFadeOut 0.5s ease;
}
@keyframes slideDownFadeOut {
  from { opacity: 1; transform: translateY(0);}
  to   { opacity: 0; transform: translateY(60px);}
}
    `;
    document.head.appendChild(animStyle);
  }

  return seccion;
}

export function aplicarEstilos() {
  const style = document.createElement("style");
  style.innerHTML = `

.card-img-top {
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}
.card-body {
  padding: .5rem;
  text-align:left;
}
.card-title {
  font-size: 1.2rem;
  font-weight: bold;
}
.card-text {
  font-size: 1rem;
  color: #6c757d;
}
.btn-success {
  width: 100%;
  font-size: 1.1rem;
  margin-right: 1rem;
}
.ver_mas {
  color: blue; 
  text-decoration: underline;
  cursor: pointer;
  font-size: 1.1rem; 
  font-weight: 500;
  font-family: inherit;
}
.container {
  max-width: 1280px;
  width: 100%;
  padding-left: 8px;
  padding-right: 8px;
}

/* --- Estilos de título y barra de búsqueda --- */
    .titulo {
      margin-top: 180px;
  color: white;
  font-family: 'Aloja Extended', 'Arial', sans-serif;
  background-color: rgba(192, 101, 15, 0.466);
  padding: 20px;
  border-radius: 30px;
  font-size: 3rem;
  text-align: center;
  margin-bottom: 40px;
}

.busqueda-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0 auto 2em auto;
  gap: 0.5em;
}

#busquedaInput {
  border: 1px solid #a67c3c;
  border-radius: 6px;
  padding: 0.4em 1em;
  font-size: 1.1rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s;
  background: #fff;
  color: #7a5a2c;
  width: 100%;
  max-width: 400px;
  min-width: 0;
  text-align: center;
  box-sizing: border-box;
}
#busquedaInput:focus {
  border-color: #a67c3c;
}

#buscarBtn {
  background: #7a5a2c;
  color: #fff;
  border: 1px solid #7a5a2c;
  border-radius: 6px;
  padding: 0.4em 1.2em;
  font-size: 1.1rem;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  display: block;
  margin: 0.7em auto 0 auto;
  margin-top: -1em;
  margin-bottom: 3em;
}
#buscarBtn:hover {
  background: #a67c3c;
  color: #fff;
}

.titulo_arriba_buscar {
  margin-top: 500px;
  color: white;
  font-family: 'Aloja Extended', 'Arial', sans-serif;
  background-color: rgba(192, 101, 15, 0.466);
  padding: 20px;
  border-radius: 30px;
  font-size: 3rem;
  text-align: center;
  margin-bottom: 40px;
}

/* --- Responsive para móvil --- */
@media (max-width: 600px) {
  #busquedaInput {
    max-width: 98vw;
    font-size: 1rem;
  }
  .container {
    max-width: 100vw;
    padding-left: 2vw;
    padding-right: 2vw;
  }
  .titulo {
    font-size: 2rem;
    padding: 0.5em 1em;
  }
}
  `;
  document.head.appendChild(style);
}