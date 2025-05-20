// src/modules/cestaLogic.js
export function renderCesta(container) {
  const tabla = document.createElement('table');
  tabla.className = 'table table-bordered';
  tabla.innerHTML = `<thead>
    <tr>
      <th>Producto</th>
      <th>Cantidad</th>
      <th>Unidad</th>
      <th>Precio</th>
      <th>Total</th>
    </tr>
  </thead>
  <tbody id="cesta-body"></tbody>
  <tfoot>
    <tr><td colspan="4" class="text-end">Total general:</td><td id="total-general">0 €</td></tr>
  </tfoot>`;

  container.appendChild(tabla);

  mostrarCesta();
}

function mostrarCesta() {
  const cuerpo = document.getElementById('cesta-body');
  const totalGeneralEl = document.getElementById('total-general');
  cuerpo.innerHTML = '';
  let total = 0;

  const cesta = JSON.parse(localStorage.getItem('cesta') || '{}');

  Object.entries(cesta).forEach(([id, datos]) => {
    const { titulo, cantidad, unidad_medido, precio } = datos;
    const totalItem = cantidad * precio;
    total += totalItem;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${titulo}</td>
      <td>${cantidad}</td>
      <td>${unidad_medido}</td>
      <td>${precio.toFixed(2)} €</td>
      <td>${totalItem.toFixed(2)} €</td>
    `;
    cuerpo.appendChild(tr);
  });

  totalGeneralEl.textContent = `${total.toFixed(2)} €`;
}
