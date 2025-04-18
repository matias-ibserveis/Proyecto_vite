import { FormularioProducto } from "././components/formularioProducto.js";

document.addEventListener("DOMContentLoaded", async () => {
  const contenedor = document.querySelector("#app");
  contenedor.appendChild(await FormularioProducto());
});
