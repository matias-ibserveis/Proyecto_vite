export async function ListaCesta(idCesta) {
  // Convierte valor a número seguro, manejando strings con coma
  function safeNumber(value) {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      const num = parseFloat(value.replace(',', '.'));
      return isNaN(num) ? 0 : num;
    }
    return 0;
  }

  // Guarda scroll y redirige a la página de la cesta
  function irACestaConProducto(id) {
    sessionStorage.setItem("prevScrollY", window.scrollY);
    sessionStorage.setItem("prevURL", window.location.href);
    window.location.href = `/cesta_cliente.html?id=${id}`;
  }

  // Carga la cesta desde la API y transforma los datos en un objeto
  async function inicializarCesta(id) {
    try {
      const res = await fetch(`https://proyectorailway-production-9739.up.railway.app/listados/cesta/${id}`);
      const productos = await res.json();
      const cesta = {};
      productos.forEach(p => {
        cesta[p.id] = {
          titulo: p.titulo,
          cantidad: p.cantidad,
          unidad_medido: p.unidad_medido,
          precio: p.precio,
          imagen1: p.imagenes[0]
        };
      });
      return cesta;
    } catch (err) {
      console.error('No he podido cargar productos:', err);
      return {};
    }
  }

  const cesta = await inicializarCesta(idCesta);

  // Crear contenedor principal
  const contenedor = document.createElement('div');
  contenedor.id = 'contenedor-cesta';

  if (Object.keys(cesta).length === 0) {
    contenedor.innerHTML = `<div class="empty-msg">más cestas proximamente ....</div>`;
  } else {
    contenedor.innerHTML = `<h3>Cesta número ${idCesta}</h3>`;


    // Añadir productos a la vista
    for (const id in cesta) {
      const { titulo, cantidad, unidad_medido, precio, imagen1 } = cesta[id];
      const imageId = imagen1?.split('/d/')[1]?.split('/')[0] || '1j5enJj_lx-tKrlw9veE2DAkJZ9ORrsZu';
      const imageUrl = `https://drive.google.com/thumbnail?id=${imageId}&sz=w800-h600`;

      const card = document.createElement('div');
      card.className = 'producto-card';
      card.innerHTML = `
        <img src="${imageUrl}" alt="${titulo}" class="producto-img">
        <div class="producto-info">
          <h5>${titulo}</h5>
          <p class="precio-unidad">${safeNumber(precio).toFixed(2).replace('.', ',')} € / ${unidad_medido}</p>
          <p><strong>Cantidad:</strong> ${cantidad}</p>
        </div>
      `;
      contenedor.appendChild(card);
    }

    // Botón para ver cesta en la web
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.justifyContent = 'flex-end';

    const enlace = document.createElement('a');
    enlace.href = '#';
    enlace.textContent = `Reserva cesta ${idCesta} `;
    enlace.style.color = '#0077cc';
    enlace.style.textDecoration = 'underline';

    enlace.addEventListener('click', (e) => {
      e.preventDefault();
      irACestaConProducto(idCesta);
    });

    wrapper.appendChild(enlace);
    contenedor.appendChild(wrapper);
  }

  // Estilos CSS en línea
  const style = document.createElement('style');
  style.textContent = `
    #contenedor-cesta {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      padding: 1rem;
    }
    .producto-card {
      display: flex;
      gap: 0.75rem;
      border: 1px solid #ccc;
      border-radius: 6px;
      padding: 0.75rem;
      background: #f9f9f9;
      align-items: center;
    }
    .producto-img {
      width: 70px;
      height: 70px;
      object-fit: cover;
      border-radius: 4px;
    }
    .producto-info {
      flex: 1;
      font-size: 0.9rem;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .producto-info h5 {
      margin: 0 0 2px 0;
      font-size: 1rem;
    }
    .producto-info p {
      margin: 0;
    }
    .empty-msg {
      text-align: center;
    }
  `;
  document.head.appendChild(style);

  return contenedor;
}
