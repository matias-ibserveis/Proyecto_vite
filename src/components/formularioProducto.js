export function FormularioProducto() {
  const formSection = document.createElement("section");
  formSection.className = "container py-5";

  formSection.innerHTML = `
    <h2 class="text-center">Sube un nuevo producto</h2>
    <form id="productoForm">
      <div class="mb-3">
        <label>Título:</label>
        <input type="text" name="titulo" class="form-control" required />
      </div>
      <div class="mb-3">
        <label>Descripción:</label>
        <textarea name="descripcion" class="form-control" rows="4" required></textarea>
      </div>
      <div class="mb-3">
        <label>Proveedor:</label>
        <input type="text" name="proveedor" class="form-control" required />
      </div>
      <div class="mb-3">
        <label>Precio (€):</label>
        <input type="number" name="precio" step="0.01" class="form-control" required />
      </div>
      <div class="mb-3">
        <label>Imágenes (1 a 6, máx. 900kb cada una):</label>
        <input type="file" id="imagenes" class="form-control" accept="image/*" multiple required />
      </div>
      <button type="submit" class="btn btn-primary">Subir Producto</button>
    </form>
    <div id="estado" class="mt-3"></div>
  `;

  const form = formSection.querySelector("#productoForm");
  const estado = formSection.querySelector("#estado");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const imagenesInput = form.querySelector("#imagenes");
    const archivos = [...imagenesInput.files];

    if (archivos.length < 1 || archivos.length > 6) {
      estado.innerHTML = `<p class="text-danger">Debes subir entre 1 y 6 imágenes.</p>`;
      return;
    }

    
    const imagenesURLs = [];

    /*
    try {
      for (const archivo of archivos) {
        if (archivo.size > 900 * 1024) {
          throw new Error("Una de las imágenes supera los 900KB");
        }

        const formData = new FormData();
        formData.append("file", archivo);

        const res = await fetch("https://uploadthing.com/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        imagenesURLs.push(data.url); // Asegúrate que 'url' es el campo correcto devuelto
      }
    } catch (err) {
      console.error(err);
      estado.innerHTML = `<p class="text-danger">Error al subir imágenes: ${err.message}</p>`;
      return;
    }

    */
    const formData = new FormData(form);

    const producto = {
      id: Math.floor(Date.now() / 1000),
      titulo: formData.get("titulo"),
      descripcion: formData.get("descripcion"),
      proveedor: formData.get("proveedor"),
      precio: parseFloat(formData.get("precio")),
      imagen1: imagenesURLs[0] || "no imagen",
      imagen2: imagenesURLs[1] || "no imagen",
      imagen3: imagenesURLs[2] || "no imagen",
      imagen4: imagenesURLs[3] || "no imagen",
      imagen5: imagenesURLs[4] || "no imagen",
      imagen6: imagenesURLs[5] || "no imagen",
      fecha: new Date().toLocaleDateString("es-ES"),
    };

    try {
      const resp = await fetch("http://localhost:3000/api/subir", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto),
      });

      const data = await resp.json();
      console.log("Respuesta del servidor:", data);

      if (!resp.ok) throw new Error("No se pudo crear el producto");
      estado.innerHTML = `<p class="text-success">Producto subido correctamente.</p>`;
      form.reset();
    } catch (err) {
      console.error(err);
      estado.innerHTML = `<p class="text-danger">Error al enviar el producto: ${err.message}</p>`;
    }
  });

  return formSection;
}
