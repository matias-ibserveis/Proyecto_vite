export function Contacto() {
    const contacto = document.createElement("section");
    contacto.className = "container py-5";
    contacto.id = "contacto";
    contacto.innerHTML = `  
    <hr class="divider anim-down" />
    <div class="row anim-down">
        <div class="col-12 text-center anim-down">
            <h2 class="titulo anim-down">Encuentranos en...</h2>  
        <div class="botones-bg anim-down">
            <div class="botones-flex justify-content-center align-items-center mb-3">
                <a href="https://wa.me/34613959689" ... class="btn btn-primary botones-con-enlaces btn-whatsapp anim-down" id="btn-whatsapp">
                    <img src="images/whatsapp.png" alt="WhatsApp" class="whatsapp-icon">
                </a>
                <a href="https://www.instagram.com/lura.mallorca/?hl=es"  class="btn btn-primary botones-con-enlaces btn-instagram anim-down" id="btn-instagram">
                    <img src="images/instagram.png" alt="Nuestro Instagram" class="instagram-icon">
                </a>
                <a href="https://maps.app.goo.gl/jHEEXXBr36aYcxNo6"  class="btn btn-primary botones-con-enlaces btn-maps anim-down btn-maps-mobile" id="btn-maps">
                    <img src="images/maps.webp" alt="Google Maps">
                </a>
            </div>
        </div>
        </div>
    </div>
    `;

    // Añade el CSS para los botones solo si no existe ya
    if (!document.getElementById('contacto-botones-css')) {
        const style = document.createElement('style');
        style.id = 'contacto-botones-css';
        style.textContent = `
        .botones-bg {
            background: var(--main-color);
            border-radius: 18px;
            box-shadow: 0 2px 16px rgba(0,0,0,0.4);
            display: inline-block;
            padding: 27px 27px 10px 27px;
            margin: 0 auto 32px auto;
            margin-bottom: -170px !important;
        }
        .botones-flex {
            gap: 40px !important;
        }
        .botones-con-enlaces {
            margin: 0 !important;
            margin-bottom: 0 !important;
            width: 90px !important;
            height: 90px !important;
            border-radius: 16px !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            padding: 0 !important;
            border: none !important;
            box-shadow: 0 2px 8px rgba(0,0,0,0.10) !important;
            transition: filter 0.2s, transform 0.2s, box-shadow 0.2s;
            text-decoration: none !important;
            background: #fff0;
        }
        .btn-whatsapp {
            background: #25d366 !important;
        }
        .btn-instagram {
            background: #e1306c !important;
        }
        .btn-maps {
            background:rgb(255, 255, 255) !important;
        }
        .botones-con-enlaces img {
            width: 65px !important;
            height: 65px !important;
            object-fit: contain !important;
            border-radius: 8px !important;
        }

        .maps-icon {
            width: 65px !important;
            height: 65px !important;
            object-fit: contain !important;
            border-radius: 8px !important;
        }
        .botones-con-enlaces:hover {
            filter: brightness(0.92) !important;
            transform: scale(1.13) !important;
            box-shadow: 0 6px 18px rgba(0,0,0,0.4) !important;
            z-index: 2;
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


@media (max-width: 600px) {
    .botones-flex {
        flex-direction: row !important;
        flex-wrap: nowrap !important;
        gap: 18px !important;
        justify-content: center !important;
        align-items: center !important;
    }
    .botones-bg {
        margin-bottom: -120px !important;
        width: 100% !important;
    }
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