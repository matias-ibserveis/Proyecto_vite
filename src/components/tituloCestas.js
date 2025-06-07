export function tituloCestas() {
  const titulolistascestas = document.createElement("div");

  titulolistascestas.innerHTML = `
    <div class="container-fluid">
    <h2 id="listas_cestas" class="titulo">Cestas preparadas</h2>
    <div><p>Tenemos cestas ya preparadas, con los productos de temporada que te van a gustar 😊</p></div>
    </div>
  `;

  return titulolistascestas;
}