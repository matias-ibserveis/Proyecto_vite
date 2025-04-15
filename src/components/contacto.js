export function Contacto() {
    const contacto = document.createElement("section");
    contacto.className = "container py-5";
    contacto.id = "contacto";
    contacto.innerHTML = `
        <h2 class="text-center">Contáctanos</h2>
        <form>
            <div class="mb-3">
                <label for="name" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="name" placeholder="Tu nombre">
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Correo Electrónico</label>
                <input type="email" class="form-control" id="email" placeholder="nombre@ejemplo.com">
            </div>
            <div class="mb-3">
                <label for="message" class="form-label">Mensaje</label>
                <textarea class="form-control" id="message" rows="3" placeholder="Tu mensaje"></textarea>
            </div>
            <button type="submit" class="btn btn-success">Enviar Mensaje</button>
        </form>
    `;
    return contacto;
}
