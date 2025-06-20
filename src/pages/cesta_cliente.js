// Inicia la renderización de la cesta
renderCesta(document.getElementById('app'));

// Función principal para mostrar la cesta de productos
export async function renderCesta(container) {
  const urlParams = new URLSearchParams(window.location.search);
  const nuevoId = urlParams.get("id");

  let cesta;
  try {
    cesta = JSON.parse(localStorage.getItem("cesta"));
  } catch { cesta = null; }

  // Si la cesta está vacía, añade por defecto el producto id=1
  if (!cesta || Object.keys(cesta).length === 0) {
    cesta = {};
    try {
      const res = await fetch(`https://proyectorailway-production-9739.up.railway.app/api/producto/1`);
      const primero = await res.json();
      cesta["1"] = {
        titulo: primero.titulo,
        cantidad: 1,
        unidad_medido: primero.unidad_medido,
        precio: primero.precio,
        origen: 'manual',
        imagen1: primero.imagen1
      };
    } catch (err) {
      console.error("No he podido añadir producto id=1 Panera. ", err);
    }
  }

  localStorage.setItem("cesta", JSON.stringify(cesta));

  // Si hay un ID nuevo en la URL, lo añade a la cesta
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

  // Crea la tabla y contenedor principal
  const tabla = document.createElement('table');
  tabla.className = 'table table-bordered';
  tabla.innerHTML = `<thead><tr><th>Productos en la cesta</th></tr></thead>
  <tbody id="cesta-body"></tbody>
  <div id="contenedor-cesta"></div>
   <div class="total-general-container">
    <strong>Total:</strong> <span id="total-general">0 €</span>
    <div style="margin-top:-1rem;">
      <textarea id="comentario-pedido" placeholder="añadir comentario ..."  maxlength="200" style="font-size: 0.9rem; width:80%; max-width:500px; height:60px; display:block; margin-left:1rem"></textarea>
    </div>
  </div>`;

  container.innerHTML = '';
  container.appendChild(tabla);

  const prevY = sessionStorage.getItem('prevScrollY');
  let prevURL = sessionStorage.getItem('prevURL');
  prevURL === null ? prevURL = "/" : false;

  // Botones de navegación y reinicio
  const botonesDiv = document.createElement('div');
  botonesDiv.className = 'd-flex justify-content-between gap-3 my-2 px-4';

  if (prevURL || prevY !== null) {
    const volverBtn = document.createElement('button');
    volverBtn.textContent = 'Volver';
    volverBtn.className = 'btn btn-outline-primary mb-3';
    volverBtn.addEventListener('click', () => {
      window.location.href = prevURL;
    });
    botonesDiv.appendChild(volverBtn);
  }

  crearBotonReserva(botonesDiv);
  crearBotonReiniciar(botonesDiv);

  container.appendChild(botonesDiv);

  await mostrarCesta();
}


// Botón REINICIA = BORRAR localstorgae
function crearBotonReiniciar(container) {
  const btnReiniciar = document.createElement('button');
  btnReiniciar.innerHTML = 'vaciar';
  btnReiniciar.className = 'btn btn-danger mb-3';

  btnReiniciar.addEventListener('click', () => {
    if (confirm('¿Estás seguro de que quieres vaciar de productos?')) {
      localStorage.removeItem('cesta');
      window.location.href = `/cesta_cliente.html`;
    }
  });
  container.appendChild(btnReiniciar);
}


// Botón que permite enviar los productos al backend para reservar
function crearBotonReserva(container) {
  const btnReserva = document.createElement('button');
  btnReserva.textContent = 'Reservar';
  btnReserva.className = 'btn btn-success mb-3';

  btnReserva.addEventListener('click', async () => {
    let nom = localStorage.getItem('usuari_nom');
    let correo = localStorage.getItem('usuari_correo');

    if (!nom || !correo) {
      nom = prompt("Introduce tu nombre:");
      correo = prompt("Introduce tu correo electrónico:");

      if (!nom || !correo) {
        alert("Nombre y correo obligatorios para reservar.");
        return;
      }

      localStorage.setItem('usuari_nom', nom);
      localStorage.setItem('usuari_correo', correo);
    }

    const cesta = JSON.parse(localStorage.getItem("cesta") || '{}');
    const productos = Object.entries(cesta).map(([id, item]) => ({
      producto_id: id,
      cantidad: item.cantidad,
      titulo: item.titulo,
      precio: item.precio
    }));

    let comentario = document.getElementById('comentario-pedido')?.value || '';
    comentario = comentario
      .replace(/[<>&'"]/g, c => ({
        '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&#39;', '"': '&quot;'
      }[c]))  // Escapa HTML básico
      .trim();


    const datosPedido = {
      usuario: { nombre: nom, correo: correo },
      productos,
      comentario
    };

    if (confirm('¿Estás seguro de hacer la reserva?')) {
      try {
        //const res = await fetch('http://localhost:3000/api/pedido', {
        const res = await fetch('https://proyectorailway-production-9739.up.railway.app/api/pedido', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(datosPedido)
        });

        if (!res.ok) throw new Error("Error al enviar el pedido");

        alert("Pedido enviado con éxito");
        localStorage.removeItem('cesta');
        window.location.href = `/`;

      } catch (err) {
        console.error("Error al reservar:", err);
        alert("Error al enviar el pedido.");
      }
    }


  });

  container.appendChild(btnReserva);
}

// Convierte un valor a número de forma segura
function safeNumber(value) {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const num = parseFloat(value.replace(',', '.'));
    return isNaN(num) ? 0 : num;
  }
  return 0;
}

// Muestra el contenido de la cesta en forma de tarjetas
function mostrarCesta() {
  const container = document.getElementById('contenedor-cesta');
  const totalGeneralEl = document.getElementById('total-general');
  if (!container || !totalGeneralEl) return;

  container.innerHTML = '';
  let total = 0;
  const cesta = JSON.parse(localStorage.getItem('cesta') || '{}');
  const ids = Object.keys(cesta);

  if (ids.length === 0) {
    container.innerHTML = `<div class="empty-msg">más cesta próximamente ...</div>`;
    totalGeneralEl.textContent = '0 €';
    return;
  }

  ids.forEach(id => {
    const { titulo, cantidad, unidad_medido, precio, imagen1 } = cesta[id];
    const cantidadNum = safeNumber(cantidad);
    const precioNum = safeNumber(precio);
    const totalItem = cantidadNum * precioNum;
    total += totalItem;

    const imageId = imagen1 ? imagen1.split('/d/')[1]?.split('/')[0] : '1j5enJj_lx-tKrlw9veE2DAkJZ9ORrsZu';
    const imageUrl = `https://drive.google.com/thumbnail?id=${imageId}&sz=w800-h600`;

    const card = document.createElement('div');
    card.className = 'producto-card';
    card.innerHTML = `
      <img src="${imageUrl}" alt="${titulo}" class="producto-img">
      <div class="producto-info">
        <h5>${titulo}</h5>
        <p class="precio-unidad">${precioNum.toFixed(2).replace('.', ',')} € / ${unidad_medido}</p>
        <p><strong>Total:</strong> <span id="total-${id}">${totalItem.toFixed(2).replace('.', ',')} €</span></p>
        <div class="cantidad-controls">
          <button data-id="${id}" data-action="restar">–</button>
          <span id="cantidad-${id}">${cantidadNum}</span>
          <button data-id="${id}" data-action="sumar">+</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  totalGeneralEl.textContent = `${total.toFixed(2).replace('.', ',')} €`;

  // Eventos para + y - en cada producto
  container.querySelectorAll('button[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const action = btn.dataset.action;
      const cesta = JSON.parse(localStorage.getItem('cesta') || '{}');
      if (!cesta[id]) return;

      const cantidadNum = safeNumber(cesta[id].cantidad);

      if (action === 'sumar') {
        cesta[id].cantidad = cantidadNum + 1;
      } else {
        cesta[id].cantidad = cantidadNum - 1;
        if (cesta[id].cantidad <= 0) {
          if (id !== "1") delete cesta[id];
          else cesta[id].cantidad = 1;
        }
      }

      localStorage.setItem('cesta', JSON.stringify(cesta));
      mostrarCesta();
    });
  });

  // Estilos para tarjetas de productos
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
        padding: 0.5rem;
        border-top: 1px solid #ddd;
        margin: 0.5rem 0 0.5rem 9;
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
