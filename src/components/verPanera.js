export async function verLaPanera() {
  const id = 1;
  const container = document.createElement('section');

  try {
    const res = await fetch(`https://proyectorailway-production-9739.up.railway.app/api/producto/${id}`);
    if (!res.ok) throw new Error('Error en la respuesta del servidor');
    const p = await res.json();

    const imageId = p.imagen1.split('/d/')[1]?.split('/')[0];
    const imageUrl = `https://drive.google.com/thumbnail?id=${imageId}&sz=w800-h600`;

    container.className = "panera";
    container.innerHTML = `
      <img src="${imageUrl}" alt="${p.titulo}">
      <h1>${p.titulo}</h1>
      <p>${p.descripcion.replace(/-/g, '<br> - ')}</p>
      <p class="precio_solo">Precio: ${p.precio} €</p>
      <button class="btn btn-success mt-3" id="anadirCestaBtn">Añadir a compra </button>
    `;

    const anadirBtn = container.querySelector('#anadirCestaBtn');
    anadirBtn.addEventListener('click', () => {
      guardarScrollY()
      window.location.href = `/cesta_cliente.html`;
    });

  } catch (err) {
    container.className = "panera";
    container.innerHTML = `<p>No he podido cargar el producto.</p>`;
    console.error(err);
  }

    function guardarScrollY() {
    sessionStorage.setItem("prevScrollY", window.scrollY);
    sessionStorage.setItem("prevURL", window.location.href);
  }

  const style = document.createElement("style");
  style.innerHTML = `
   
      .panera {
        max-width: 800px;
        width: 100%;
        text-align: left;
        margin: 0 auto; /* <- Centra la sección si el padre lo permite */
        background: white;
        padding: 1rem;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
      }

      .panera p {
      width: 100%; /* <- Fuerza a que el <p> ocupe todo el ancho del contenedor */
      word-wrap: break-word;
    }

    .panera img {
      width: 100%;
      max-height: 400px;
      object-fit: cover;
      border-radius: 10px;
      margin-bottom: 1rem;
    }

    .panera h1 {
      font-size: 1.4rem;
      margin-bottom: 0.5rem;
    }




    .precio_solo {
      font-weight: bold;
      color: #2e7d32;
      font-size: 1.2rem;
    }

    .volver_solo {
      display: inline-block;
      margin-top: 2rem;
      text-decoration: none;
      color: #0077cc;
    }

    .volver_solo:hover {
      text-decoration: underline;
    }
  `;
  document.head.appendChild(style);

  return container;
}
