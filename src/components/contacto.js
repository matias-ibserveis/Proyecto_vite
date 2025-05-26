export function Contacto() {
    const contacto = document.createElement("section");
    contacto.className = "container py-5";
    contacto.id = "contacto";
    contacto.innerHTML = `  
        <div class="row justify-content-center">
            <div class="col-12 text-center">
                <h2 class="titulo">Contáctanos</h2>  
                <div class="botones-flex justify-content-center align-items-center">
                    <button class="btn btn-primary botones-con-enlaces" id="btn-whatsapp">
                        <img src="images/whatsapp.png" alt="WhatsApp" class="whatsapp-icon">
                        <p>Cóntactanos para cualquier consulta por WhatsApp</p>
                    </button>
                    <button class="btn btn-primary botones-con-enlaces-instagram" id="btn-instagram">
                        <img src="images/instagram.png" alt="Nuestro Instagram" class="instagram-icon">
                        <p>Entérate de todas las novedades en nuestro Instagram</p>
                    </button>
                </div>
            </div>
        </div>
    `;

    contacto.querySelector('#btn-whatsapp').onclick = () => {
        window.location.href = "https://wa.me/34600123456";
    };
    contacto.querySelector('#btn-instagram').onclick = () => {
        window.location.href = "https://www.instagram.com/lura.mallorca/?hl=es";
    };

    return contacto;
}