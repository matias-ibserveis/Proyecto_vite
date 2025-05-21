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

  container.innerHTML = ''; // Limpiar si ya había algo
  container.appendChild(tabla);

  // Botón volver
  const volverBtn = document.createElement('button');
  volverBtn.textContent = '⬅ Volver';
  volverBtn.className = 'btn btn-outline-primary mb-3';
  volverBtn.onclick = () => {
    const ref = document.referrer;
    if (ref) {
      window.location.href = ref;
    } else {
      window.history.back();
    }
  };
  container.append(volverBtn);

  //Botón borrar cesta
   const borrarBtn = document.createElement('button');
  borrarBtn.textContent = '⬅ Vaciar cesta';
  borrarBtn.className = 'btn btn-outline-primary mb-3';
  borrarBtn.onclick = () => { 
    localStorage.clear();
    location.reload();
  };
  container.append(borrarBtn);


  inicializarCestaSiNecesario().then(mostrarCesta);
}

async function inicializarCestaSiNecesario() {
  const cesta = localStorage.getItem('cesta');
  if (!cesta || cesta === '{}') {
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
        ${origen === 'manual' ? `
          <button class="btn btn-sm btn-outline-secondary" data-id="${id}" data-action="restar">–</button>
          <span class="mx-2" id="cantidad-${id}">${cantidad}</span>
          <button class="btn btn-sm btn-outline-secondary" data-id="${id}" data-action="sumar">+</button>
        ` : `
          <span>${cantidad}</span>
        `}
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

      if (action === 'sumar') {
        cesta[id].cantidad += 1;
      } else if (action === 'restar') {
        cesta[id].cantidad -= 1;
        if (cesta[id].cantidad <= 0) {
          delete cesta[id];
        }
      }

      localStorage.setItem('cesta', JSON.stringify(cesta));
      mostrarCesta();
    });
  });
}
