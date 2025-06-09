export function Contacto() {
    const contacto = document.createElement("section");
    contacto.className = "container py-5"; // <-- sin anim-down aquí
    contacto.id = "contacto";
    contacto.innerHTML = `  
        <hr class="divider anim-down" />
        <div class="row anim-down">
            <div class="col-12 text-center anim-down">
                <h2 class="titulo anim-down">Contáctanos</h2>  
                <div class="botones-flex justify-content-center align-items-center anim-down">
                    <button class="btn btn-primary botones-con-enlaces anim-down" id="btn-whatsapp">
                        <img src="images/whatsapp.png" alt="WhatsApp" class="whatsapp-icon">
                        <p>Cóntactanos para cualquier consulta por WhatsApp</p>
                    </button>
                    <button class="btn btn-primary botones-con-enlaces-instagram anim-down" id="btn-instagram">
                        <img src="images/instagram.png" alt="Nuestro Instagram" class="instagram-icon">
                        <p>Entérate de todas las novedades en nuestro Instagram</p>
                    </button>
                </div>
            </div>
        </div>
    `;

    // Añade el CSS para juntar los botones solo si no existe ya
    if (!document.getElementById('contacto-botones-css')) {
        const style = document.createElement('style');
        style.id = 'contacto-botones-css';
        style.textContent = `
            .botones-flex {
                gap: 10px !important;
            }
            .botones-con-enlaces,
            .botones-con-enlaces-instagram {
                margin: 0 !important;
                margin-bottom: 50px !important;
            }
            .anim-down {
                opacity: 0;
                transform: translateY(60px);
                transition: opacity 0.8s, transform 0.8s cubic-bezier(.4,2,.6,1);
            }
            .anim-visible {
                opacity: 1 !important;
                transform: translateX(0) translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Animaciones por scroll
    setTimeout(() => {
        const animElements = contacto.querySelectorAll('.anim-down');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('anim-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        // Fuerza la animación si ya está en pantalla
        animElements.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight) {
                el.classList.add('anim-visible');
                observer.unobserve(el);
            } else {
                observer.observe(el);
            }
        });
    }, 0);

    return contacto;
}