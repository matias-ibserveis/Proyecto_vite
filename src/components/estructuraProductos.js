// estructuraProductos.js

export function crearEstructuraHTML(buscarProductosCallback, mostrarTodosCallback) {
  const seccion = document.createElement("section");
  seccion.className = "container py-2";
  seccion.id = "productos";
  seccion.innerHTML = `
    <h2 class="titulo">Productos de LURA</h2>
<div class="busqueda-bar">
  <input type="text" id="busquedaInput" placeholder="¿Que se te Antoja?">
  <button id="buscarBtn">Buscar</button>
</div>
    <div class="row" id="productos-lista"></div>
    <div id="paginacion" class="text-center my-3"></div>
  `;

  const buscarBtn = seccion.querySelector("#buscarBtn");

  buscarBtn.addEventListener("click", buscarProductosCallback);

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
}
#buscarBtn:hover {
  background: #a67c3c;
  color: #fff;
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
