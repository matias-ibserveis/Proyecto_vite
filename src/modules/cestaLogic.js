// src/modules/cestaLogic.js

// Initialize the cart from localStorage or API
export async function initializeCesta() {
  const cestaRaw = localStorage.getItem('cesta');
  if (!cestaRaw || cestaRaw === '{}' || Object.keys(JSON.parse(cestaRaw)).length === 0) {
    try {
      const res = await fetch('https://proyectorailway-production-9739.up.railway.app/listados/cesta/1');
      if (!res.ok) throw new Error('Failed to fetch initial cart');
      const productos = await res.json();
      const cestaInicial = {};
      productos.forEach(p => {
        cestaInicial[p.id] = {
          id: p.id,
          titulo: p.titulo,
          cantidad: 1,
          unidad_medido: p.unidad_medido,
          precio: p.precio,
          origen: p.origen || 'api'
        };
      });
      localStorage.setItem('cesta', JSON.stringify(cestaInicial));
      return cestaInicial;
    } catch (err) {
      console.error('Error loading initial cart:', err);
      return {};
    }
  }

  try {
    return JSON.parse(cestaRaw);
  } catch {
    console.error('Error parsing cart from localStorage');
    return {};
  }
}

// Render the cart UI
export async function renderCesta(container) {
  const urlParams = new URLSearchParams(window.location.search);
  const nuevoId = urlParams.get('id');

  let cesta = await initializeCesta();

  // Add product from URL if provided
  if (nuevoId && !cesta[nuevoId]) {
    try {
      const res = await fetch(`https://proyectorailway-production-9739.up.railway.app/api/producto/${nuevoId}`);
      if (!res.ok) throw new Error('Failed to fetch product');
      const producto = await res.json();
      cesta[nuevoId] = {
        id: nuevoId,
        titulo: producto.titulo,
        cantidad: 1,
        unidad_medido: producto.unidad_medido,
        precio: producto.precio,
        origen: 'manual'
      };
      localStorage.setItem('cesta', JSON.stringify(cesta));
    } catch (err) {
      console.error('Error adding product from URL:', err);
    }
  }

  // Create table
  const tabla = document.createElement('table');
  tabla.className = 'table table-bordered';
  tabla.innerHTML = `
    <thead>
      <tr>
        <th>Producto</th>
        <th>Cantidad</th>
        <th>Unidad</th>
        <th>Precio</th>
        <th>Total</th>
        <th></th>
      </tr>
    </thead>
    <tbody id="cesta-body"></tbody>
    <tfoot>
      <tr><td colspan="5" class="text-end">Total general:</td><td id="total-general">0 €</td></tr>
    </tfoot>
  `;

  container.innerHTML = '';
  container.appendChild(tabla);

  // Create buttons container
  const botonesDiv = document.createElement('div');
  botonesDiv.className = 'cart-buttons';

  // Back button
  const prevURL = sessionStorage.getItem('prevURL');
  const prevY = sessionStorage.getItem('prevScrollY');
  if (prevURL && prevY !== null) {
    const volverBtn = document.createElement('button');
    volverBtn.textContent = 'Volver';
    volverBtn.className = 'btn-aloja';
    volverBtn.addEventListener('click', () => {
      window.location.href = prevURL;
      setTimeout(() => window.scrollTo(0, parseInt(prevY)), 0);
    });
    botonesDiv.appendChild(volverBtn);
  }

  container.appendChild(botonesDiv);

  await mostrarCesta();
}

// Update cart display
export async function mostrarCesta() {
  const cuerpo = document.getElementById('cesta-body');
  const totalGeneralEl = document.getElementById('total-general');
  cuerpo.innerHTML = '';
  let total = 0;

  let cesta;
  try {
    cesta = JSON.parse(localStorage.getItem('cesta') || '{}');
  } catch {
    console.error('Error parsing cart');
    cesta = {};
  }

  const ids = Object.keys(cesta);
  if (ids.length === 0) {
    cuerpo.innerHTML = `<tr><td colspan="6" class="text-center">Tu cesta está vacía</td></tr>`;
    totalGeneralEl.textContent = '0 €';
    return;
  }

  ids.forEach(id => {
    const { titulo, cantidad, unidad_medido, precio } = cesta[id];
    const totalItem = cantidad * precio;
    total += totalItem;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${titulo}</td>
      <td>
        <button class="remove-btn" data-id="${id}" data-action="restar">–</button>
        <span class="mx-2" id="cantidad-${id}">${cantidad}</span>
        <button class="add-btn" data-id="${id}" data-action="sumar">+</button>
      </td>
      <td>${unidad_medido}</td>
      <td>${precio.toFixed(2)} €</td>
      <td id="total-${id}">${totalItem.toFixed(2)} €</td>
      <td><button class="remove-btn delete-btn" data-id="${id}" data-action="eliminar">✕</button></td>
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
        if (cesta[id].cantidad > 1) {
          cesta[id].cantidad -= 1;
        } else {
          delete cesta[id];
        }
      } else if (action === 'eliminar') {
        delete cesta[id];
      }

      localStorage.setItem('cesta', JSON.stringify(cesta));
      mostrarCesta();
    });
  });
}