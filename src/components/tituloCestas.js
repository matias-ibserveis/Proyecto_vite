export function tituloCestas() {
  const titulolistascestas = document.createElement("div");

  titulolistascestas.innerHTML = `
    <div class="container-fluid">
    <h2 id="listas_cestas" class="titulo">Cesta preparada</h2>
    <div><p>Cesta ya preparada, con productos de temporada que te van a gustar 😊</p></div>
    </div>
  `;

  return titulolistascestas;
}