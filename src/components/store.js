// store.js
let busqueda = "";

export function setBusqueda(valor) {
  busqueda = valor;
  document.dispatchEvent(new Event("busquedaCambiada"));
  console.log("busqueda en store", busqueda)
}

export function getBusqueda() {
  return busqueda;
}
