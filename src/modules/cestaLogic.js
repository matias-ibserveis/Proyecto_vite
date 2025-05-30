export async function renderCesta(container) {
  const urlParams = new URLSearchParams(window.location.search);
  const nuevoId = urlParams.get("id");

  let cesta = await inicializarCestaSiNecesario();

  if (nuevoId) {
    if (cesta[nuevoId]) {
      cesta[nuevoId].cantidad += 1;
    } else {
      try {
        const res = await fetch(`https://proyectorailway-production-9739.up.railway.app/api/producto/${nuevoId}`);
        const producto = await res.json();
        cesta[nuevoId] = {
          titulo: producto.titulo,
          cantidad: 1,
          unidad_medido: producto.unidad_medido,
          precio: producto.precio,
          origen: 'manual',
          imagen1: producto.imagen1
        };
      } catch (err) {
        console.error("Error al añadir producto por ID en URL:", err);
      }
    }
    localStorage.setItem("cesta", JSON.stringify(cesta));
  }

  const tabla = document.createElement('table');
  tabla.className = 'table table-bordered';
  tabla.innerHTML = `<thead>
    <tr>
      <th>Productos en la cesta</th>
    </tr>
  </thead>
    <tbody id="cesta-body"></tbody>
  <div id="contenedor-cesta"></div>
  <div class="total-general-container">
    <strong>Total:</strong> <span id="total-general">0 €</span>
  </div>
  `;

  container.innerHTML = '';
  container.appendChild(tabla);

  

  const botonesDiv = document.createElement('div');
  botonesDiv.style.display = 'flex';
  botonesDiv.style.justifyContent = 'space-between';
  botonesDiv.style.width = '90%';
  botonesDiv.style.margin = '6rem 2rem 0 2rem';
  botonesDiv.style.gap = '1rem';

  // Botón Volver
  const prevY = sessionStorage.getItem('prevScrollY');
  const prevURL = sessionStorage.getItem('prevURL');

  if (prevURL && prevY !== null) {
    const volverBtn = document.createElement('button');
    volverBtn.textContent = 'Volver';
    volverBtn.className = 'btn btn-outline-primary mb-3';
    volverBtn.addEventListener('click', () => {
      window.location.href = prevURL;
    });
    botonesDiv.appendChild(volverBtn);
  }

  // Botón Vaciar Cesta
  const vaciarBtn = document.createElement('button');
  vaciarBtn.textContent = 'Vaciar cesta';
  vaciarBtn.className = 'btn btn-danger mb-3';
  vaciarBtn.addEventListener('click', () => {
    localStorage.removeItem('cesta');
    location.reload();
  });
  botonesDiv.appendChild(vaciarBtn);

  container.appendChild(botonesDiv);

  await mostrarCesta();
}



async function inicializarCestaSiNecesario() {
  const cestaRaw = localStorage.getItem('cesta');
  if (!cestaRaw || cestaRaw === '{}' || Object.keys(JSON.parse(cestaRaw)).length === 0) {
    try {
      const res = await fetch('https://proyectorailway-production-9739.up.railway.app/listados/cesta/1');
      const productos = await res.json();
      const cestaInicial = {};
      productos.forEach(p => {
        cestaInicial[p.id] = {
          titulo: p.titulo,
          cantidad: 1,
          unidad_medido: p.unidad_medido,
          precio: p.precio,
          imagen1: p.imagenes[0]
        };
      });
      localStorage.setItem('cesta', JSON.stringify(cestaInicial));
      console.log("cesta inicial", JSON.stringify(cestaInicial))
      return cestaInicial; // <-- RETORNA UN OBJETO SIEMPRE
    } catch (err) {
      console.error('Error cargando productos:', err);
      return {}; // <-- Asegura retorno válido
    }
  }

  try {
    return JSON.parse(cestaRaw);
  } catch {
    return {}; // <-- fallback si JSON.parse falla
  }
}

function mostrarCesta() {
  const container = document.getElementById('contenedor-cesta');
  const totalGeneralEl = document.getElementById('total-general');
  if (!container || !totalGeneralEl) return;

  container.innerHTML = '';
  let total = 0;

  const cesta = JSON.parse(localStorage.getItem('cesta') || '{}');
  const ids = Object.keys(cesta);
  console.log("cesta", cesta)

  if (ids.length === 0) {
    container.innerHTML = `<div class="empty-msg">Tu cesta está vacía</div>`;
    totalGeneralEl.textContent = '0 €';
    return;
  }

  ids.forEach(id => {
    const { titulo, cantidad, unidad_medido, precio, origen, imagen1 } = cesta[id];
    console.log("cesta[id]", cesta[id])
    const totalItem = cantidad * precio;
    total += totalItem;

    const imageId = imagen1 ? imagen1.split('/d/')[1]?.split('/')[0] : '1j5enJj_lx-tKrlw9veE2DAkJZ9ORrsZu'
    const imageUrl = `https://drive.google.com/thumbnail?id=${imageId}&sz=w800-h600`;

    const card = document.createElement('div');
    card.className = 'producto-card';

    card.innerHTML = `
      <img src="${imageUrl  || 'https://drive.google.com/file/d/1j5enJj_lx-tKrlw9veE2DAkJZ9ORrsZu/view'}" alt="${titulo}" class="producto-img">
      <div class="producto-info">
        <h5>${titulo}</h5>
        <p class="precio-unidad">${precio.toFixed(2).replace('.', ',')} € / ${unidad_medido}</p>
        <p><strong>Total:</strong> <span id="total-${id}">${totalItem.toFixed(2).replace('.', ',')} €</span></p>
        <div class="cantidad-controls">
          <button data-id="${id}" data-action="restar">–</button>
          <span id="cantidad-${id}">${cantidad}</span>
          <button data-id="${id}" data-action="sumar">+</button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  totalGeneralEl.textContent = `${total.toFixed(2).replace('.', ',')} €`;

  container.querySelectorAll('button[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const action = btn.dataset.action;
      const cesta = JSON.parse(localStorage.getItem('cesta') || '{}');
      if (!cesta[id]) return;

      if (action === 'sumar') {
        cesta[id].cantidad += 1;
      } else {
        if (cesta[id].cantidad > 1 || cesta[id].origen === 'manual') {
          cesta[id].cantidad -= 1;
        }
        if (cesta[id].cantidad <= 0) delete cesta[id];
      }

      localStorage.setItem('cesta', JSON.stringify(cesta));
      mostrarCesta();
    });
  });



      // Estilos
    const style = document.createElement("style");
    style.innerHTML = `
          #contenedor-cesta {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
      }

      .producto-card {
        display: flex;
        gap: 1rem;
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        padding: 1rem;
        align-items: center;
      }

      .producto-img {
        width: 80px;
        height: 80px;
        object-fit: cover;
        border-radius: 8px;
        background: #eee;
      }

      .producto-info {
        flex: 1;
      }

      .producto-info h5 {
        margin: 0 0 0.25rem;
        font-size: 1rem;
      }

      .precio-unidad {
        color: #555;
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
      }

      .cantidad-controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-top: 0.5rem;
      }

      .cantidad-controls button {
        background: #eee;
        border: none;
        padding: 0.3rem 0.7rem;
        border-radius: 6px;
        cursor: pointer;
        font-size: 1rem;
      }

      .cantidad-controls button:hover {
        background: #ccc;
      }

      .total-general-container {
        text-align: end;
        font-size: 1.1rem;
        padding: 1rem;
        border-top: 1px solid #ddd;
        margin-top: 1rem;
      }

      .empty-msg {
        text-align: center;
        color: #666;
        padding: 2rem;
        font-style: italic;
      }
    
  `;
    document.head.appendChild(style);
}
