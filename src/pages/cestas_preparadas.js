// lógica y renderizado de la cesta
renderCesta(document.getElementById('app'));

export async function renderCesta(container) {
  const urlParams = new URLSearchParams(window.location.search);
  const numeroCesta = urlParams.get("numero_cesta");

  if (!numeroCesta) {
    alert("Falta numero cesta en la URL");
    return;
  }

  let productos = [];
  try {
    const res = await fetch(`https://proyectorailway-production-9739.up.railway.app/listados/cesta/${numeroCesta}`);
    productos = await res.json();
  } catch (err) {
    console.error('Error al cargar la cesta:', err);
    container.innerHTML = '<p>Error al cargar la cesta.</p>';
    return;
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

  const reservarBtn = document.createElement('button');
  reservarBtn.textContent = 'Reservar';
  reservarBtn.className = 'btn btn-primary mb-3';
  botonesDiv.appendChild(reservarBtn);

  const aCestaGeneralBtn = document.createElement('button');
  aCestaGeneralBtn.textContent = 'Añadir a MI cesta';
  aCestaGeneralBtn.className = 'btn btn-secondary mb-3';
  botonesDiv.appendChild(aCestaGeneralBtn);

  container.appendChild(botonesDiv);

  mostrarCesta(productos);
}

function safeNumber(value) {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const num = parseFloat(value.replace(',', '.'));
    return isNaN(num) ? 0 : num;
  }
  return 0;
}

function mostrarCesta(productos) {
  const container = document.getElementById('contenedor-cesta');
  const totalGeneralEl = document.getElementById('total-general');
  if (!container || !totalGeneralEl) return;

  container.innerHTML = '';
  let total = 0;

  if (!productos || productos.length === 0) {
    container.innerHTML = `<div class="empty-msg">más cesta próximamente ...</div>`;
    totalGeneralEl.textContent = '0 €';
    return;
  }

  productos.forEach(p => {
    const { id, titulo, cantidad, unidad_medido, precio, imagenes } = p;
    const cantidadNum = safeNumber(cantidad);
    const precioNum = safeNumber(precio);
    const totalItem = cantidadNum * precioNum;
    total += totalItem;

    const imageId = imagenes?.[0]?.split('/d/')[1]?.split('/')[0] || '1j5enJj_lx-tKrlw9veE2DAkJZ9ORrsZu';
    const imageUrl = `https://drive.google.com/thumbnail?id=${imageId}&sz=w800-h600`;

    const card = document.createElement('div');
    card.className = 'producto-card';
    card.innerHTML = `
      <img src="${imageUrl}" alt="${titulo}" class="producto-img">
      <div class="producto-info">
        <h5>${titulo}</h5>
        <p class="precio-unidad">${precioNum.toFixed(2).replace('.', ',')} € / ${unidad_medido}</p>
        <p><strong>Total:</strong> ${totalItem.toFixed(2).replace('.', ',')} €</p>
        <p><strong>Cantidad:</strong> ${cantidadNum}</p>
      </div>
    `;
    container.appendChild(card);
  });

  totalGeneralEl.textContent = `${total.toFixed(2).replace('.', ',')} €`;


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

      @media (max-width: 600px) {

        #contenedor-cesta {
          padding: 0.5rem;
        }

        .producto-card {
          flex-direction: row;
          align-items: flex-start;
          padding: 0.75rem;
          gap: 0.75rem;
        }

        .producto-img {
          width: 70px;
          height: 70px;
          flex-shrink: 0;
          border-radius: 8px;
        }

        .producto-info {
          flex: 1;
        }

        .producto-info h5 {
          font-size: 1.1rem;
        }

        .precio-unidad,
        .producto-info p {
          font-size: 1.1rem;
        }

        .cantidad-controls {
          justify-content: space-between;
          width: 100%;
          margin-top: 1rem;
        }

        .cantidad-controls button {
          font-size: 1.1rem;
          padding: 0.6rem 1.2rem;
        }

        .total-general-container {
          font-size: 1.4rem;
          padding: 1rem 0.5rem;
        }

        .btn {
          font-size: 1rem !important;
          padding: 0.75rem 1.25rem !important;
        }
      }
  `;

  document.head.appendChild(style);

}
