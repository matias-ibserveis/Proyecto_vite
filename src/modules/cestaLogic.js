
export async function renderCesta(container) {
  const urlParams = new URLSearchParams(window.location.search);
  const nuevoId = urlParams.get("id");

  if (nuevoId) {
    const cesta = JSON.parse(localStorage.getItem("cesta") || "{}");
    if (!cesta[nuevoId]) {
      try {
        const res = await fetch(`https://proyectorailway-production-9739.up.railway.app/api/producto/${nuevoId}`);
        const producto = await res.json();
        cesta[nuevoId] = {
          titulo: producto.titulo,
          cantidad: 1,
          unidad_medido: producto.unidad_medido,
          precio: producto.precio,
          origen: 'manual'
        };
        localStorage.setItem("cesta", JSON.stringify(cesta));
      } catch (err) {
        console.error("Error al añadir producto por ID en URL:", err);
      }
    }
  }

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

  container.innerHTML = '';
  container.appendChild(tabla);

  // Botón volver
  const prevY = sessionStorage.getItem('prevScrollY');
  const prevURL = sessionStorage.getItem('prevURL');

  const botonesDiv = document.createElement('div');
  botonesDiv.style.display = 'flex'; botonesDiv.style.justifyContent = 'space-between';
  botonesDiv.style.width = '90%'; botonesDiv.style.margin = '6rem 2rem 0 2rem'; // top right bottom left
  botonesDiv.style.gap = '1rem'; // opcional: espacio entre botones

  // Botón Volver
  //if (prevURL && prevY !== null) {
    const volverBtn = document.createElement('button');
    volverBtn.textContent = 'Volver';
    volverBtn.className = 'btn btn-outline-primary mb-3';
    volverBtn.addEventListener('click', () => {
      window.location.href = prevURL;
    });
    botonesDiv.appendChild(volverBtn);
  //}

  // Añadir al contenedor principal
  container.appendChild(botonesDiv);


  inicializarCestaSiNecesario().then(mostrarCesta);
}

async function inicializarCestaSiNecesario() {
  const cesta = localStorage.getItem('cesta');
  const params = new URLSearchParams(window.location.search);

  if (!cesta || cesta === '{}' && !params.has('id')) {
    try {
      const res = await fetch('https://proyectorailway-production-9739.up.railway.app/listados/cesta/1');
      const productos = await res.json();
      const cestaInicial = {};
      productos.forEach(p => {
        cestaInicial[p.id] = {
          titulo: p.titulo,
          cantidad: 1,
          unidad_medido: p.unidad_medido,
          precio: p.precio
        };
      });

      localStorage.setItem('cesta', JSON.stringify(cestaInicial));
    } catch (err) {
      console.error('Error cargando productos:', err);
    }
  }
}



function mostrarCesta() {
  const cuerpo = document.getElementById('cesta-body');
  const totalGeneralEl = document.getElementById('total-general');
  cuerpo.innerHTML = '';
  let total = 0;

  const cesta = JSON.parse(localStorage.getItem('cesta') || '{}');
  const ids = Object.keys(cesta);

  if (ids.length === 0) {
    cuerpo.innerHTML = `<tr><td colspan="5" class="text-center">Tu cesta está vacía</td></tr>`;
    totalGeneralEl.textContent = '0 €';
    return;
  }

  ids.forEach(id => {
    const { titulo, cantidad, unidad_medido, precio, origen } = cesta[id];
    const totalItem = cantidad * precio;
    total += totalItem;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${titulo}</td>
      <td>
          <button class="btn btn-sm btn-outline-secondary" data-id="${id}" data-action="restar">–</button>
          <span class="mx-2" id="cantidad-${id}">${cantidad}</span>
          <button class="btn btn-sm btn-outline-secondary" data-id="${id}" data-action="sumar">+</button>
      </td>
      <td>${unidad_medido}</td>
      <td>${precio.toFixed(2)} €</td>
      <td id="total-${id}">${totalItem.toFixed(2)} €</td>
    `;

    cuerpo.appendChild(tr);
  });

  totalGeneralEl.textContent = `${total.toFixed(2)} €`;


  cuerpo.querySelectorAll('button[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const action = btn.dataset.action;
      const cesta = JSON.parse(localStorage.getItem('cesta') || '{}');
      if (!cesta[id]) return;

      action === 'sumar'
        ? cesta[id].cantidad += 1
        : (
          cesta[id].cantidad > 1 || cesta[id].origen === 'manual'
            ? cesta[id].cantidad -= 1
            : null,
          cesta[id].cantidad <= 0 && delete cesta[id]
        );


      localStorage.setItem('cesta', JSON.stringify(cesta));
      mostrarCesta();
    });
  });
}
