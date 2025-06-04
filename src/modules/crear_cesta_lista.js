import { enviarCestaAlBackend } from "./enviar_cesta";

export function renderizaListaCesta(appContenedor) {
  const ul = appContenedor.querySelector("#lista-cesta");
  const cesta = JSON.parse(localStorage.getItem("nuevaCesta") || "{}");
  console.log("nuevacesta en lista", localStorage.getItem('nuevaCesta'))

  ul.innerHTML = "";

  if (Object.keys(cesta).length === 0) {
    ul.innerHTML = `<li class="list-group-item text-muted">La cesta está vacía</li>`;
    return;
  }

  let total = 0;

  Object.entries(cesta).forEach(([id, producto]) => {
    const subtotal = producto.precio * producto.cantidad;
    total += subtotal;

    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-start flex-column";

    li.innerHTML = `
      <div class="w-100 d-flex justify-content-between">
        <div>
          <strong>${producto.titulo}</strong><br>
          <small>${producto.unidad_medido}</small>
        </div>
        <span class="badge bg-primary">${subtotal.toFixed(2)} €</span>
      </div>

      <div class="mt-2 d-flex justify-content-between w-100">
        <div>
          <button class="btn btn-sm btn-outline-secondary me-1 restar">-</button>
          <span>${producto.cantidad}</span>
          <button class="btn btn-sm btn-outline-secondary ms-1 sumar">+</button>
        </div>
        <button class="btn btn-sm eliminar">eliminar</button>
      </div>
    `;

    li.querySelector(".sumar").onclick = () => {
      cesta[id].cantidad++;
      localStorage.setItem("nuevaCesta", JSON.stringify(cesta));
      renderizaListaCesta(appContenedor);
    };

    li.querySelector(".restar").onclick = () => {
      cesta[id].cantidad--;
      if (cesta[id].cantidad <= 0) delete cesta[id];
      localStorage.setItem("nuevaCesta", JSON.stringify(cesta));
      renderizaListaCesta(appContenedor);
    };

    li.querySelector(".eliminar").onclick = () => {
      delete cesta[id];
      localStorage.setItem("nuevaCesta", JSON.stringify(cesta));
      renderizaListaCesta(appContenedor);
    };

    ul.appendChild(li);
  });

  // Total
  const totalLi = document.createElement("li");
  totalLi.className = "list-group-item d-flex justify-content-between fw-bold";
  totalLi.innerHTML = `
    <span>Total:</span>
    <span>${total.toFixed(2)} €</span>
  `;
  ul.appendChild(totalLi);

  // Botones para enviar y vaciar cesta
  const accionesLi = document.createElement("li");
  accionesLi.className = "list-group-item d-flex justify-content-between";

  // Botón Enviar 
  const btnEnviar = document.createElement("button");
  btnEnviar.className = "btn btn-sm btn-outline-success";
  btnEnviar.textContent = "Enviar cesta";
  btnEnviar.onclick = async () => {
    //const numeroCestaActual = localStorage.getItem("nuevaCesta") || "";
    const numeroCesta = prompt("Introduce el número de cesta a guardar:", 1);
    if (!numeroCesta) return;

    try {
      await enviarCestaAlBackend(numeroCesta);
      alert("Cesta enviada correctamente");
    } catch (error) {
      alert("Error al enviar la cesta");
    }
  };


  // Botón Vaciar 
  const btnVaciar = document.createElement("button");
  btnVaciar.className = "btn btn-sm btn-outline-danger";
  btnVaciar.textContent = "Vaciar cesta";
  btnVaciar.onclick = () => {
    if (confirm("¿Estás seguro de que quieres vaciar la cesta?")) {
      localStorage.removeItem("nuevaCesta");
      renderizaListaCesta(appContenedor);
    }
  };

  // Añadir ambos botones al li
  accionesLi.appendChild(btnEnviar);
  accionesLi.appendChild(btnVaciar);

  // Añadir al ul
  ul.appendChild(accionesLi);

}
