export function direccion() {
    const direccion = document.createElement("section");
    direccion.className = "container py-5";
    direccion.id = "direccion";
direccion.innerHTML = `
    <div class="row">
        <div class="col-12">
            <div class="direccion-bg text-center">
                <h2 class="slide-from-left titulo-direccion text-decoration-underline" style="animation-delay: 0.2s">¡Visítanos en nuestra dirección física!</h2>
                <h5 class="text-direccion slide-from-left" style="animation-delay: 0.4s">La dirección de nuestro local es:</h5>
                <p class="text-direccion slide-from-left" style="animation-delay: 0.6s">Carrer Carles I, 6, Nord, 07003 Palma, Illes Balears</p>
                <a href="https://maps.app.goo.gl/jHEEXXBr36aYcxNo6" target="_blank" rel="noopener">
                    <img class="mapa slide-from-right img-fluid" src="images/mapa.webp" alt="Mapa de ubicación">
                <h2 class="slide-from-left titulo-direccion text-decoration-underline" style="animation-delay: 0.2s">¡Nuestro Horario Habitual es...!</h2>
                <p class="text-direccion slide-from-left horario-texto" style="animation-delay: 1s">Lunes a Viernes: 9:30 AM - 19:00 PM</p>
                <p class="text-direccion slide-from-left horario-texto" style="animation-delay: 1.2s">Sábados: 10:00 AM - 13:30 PM</p>
                <br>
                <p class="text-direccion slide-from-left horario-texto" style="animation-delay: 1.4s">Domingos: Cerrado</p>
            </div>
        </div>
    </div>
`;

    const style = document.createElement('style'); 
    style.innerHTML = `
        .direccion-bg {
            background: var(--main-color);
            border-radius: 18px;
            box-shadow: 0 2px 16px rgba(0,0,0,0.4);
            padding: 32px 18px 24px 18px;
            margin: 0 auto 32px auto;
            max-width: 700px;
        }
        .extra-padding {
            padding-left: 20px !important;
            padding-right: 20px !important;
        }
        .section-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1rem;
            text-align: center;
            width: 100%;
            box-sizing: border-box;
            background-color: var(--main-color);
            color: white;
            padding: 10px;
            border-radius: 10px;
            font-family: Arial, sans-serif;
            text-transform: uppercase;
        }
        .text-direccion {
            font-family: "Hanken Grotesk", sans-serif;
            color: rgb(255, 255, 255);
            font-size: 1.5rem;
        }
        
        /* Animation styles */
        .slide-from-left {
            opacity: 0;
            transform: translateX(-50px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .slide-from-right {
            opacity: 0;
            transform: translateX(50px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
            border-radius: 10px;
            margin-top: 20px;
            margin-bottom: 70px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.4);
            border: 4px solid var(--secondary-color);
        }
        .slide-from-left.visible,
        .slide-from-right.visible {
            opacity: 1;
            transform: translateX(0);
        }

        .titulo-direccion {
            font-family: 'Aloja Extended', sans-serif !important;
            font-weight: 700;
            font-size: 2.5rem;
            margin-bottom: 30px;
            color: #fff !important;
            text-decoration: none !important;
            background: linear-gradient(to right, var(--secondary-color) 100%, var(--secondary-color) 100%) no-repeat bottom center;
            background-size: 70% 2.5px;
            padding-bottom: 5px;
        }
        .titulo-direccion.text-decoration-underline {
            text-decoration: none !important;
        }
        .horario-texto {
            margin-top: 10px !important;
            margin-bottom: 5px !important;
        }

        p { 
           background: rgba(0,0,0,0.10);
            border-radius: 8px;
            padding: 4px 12px;
            display: inline-block;
            font-size: 1.1rem;
}
    `;

    document.head.appendChild(style);

    // Animación scroll
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    setTimeout(() => {
        direccion.querySelectorAll('.slide-from-left, .slide-from-right').forEach(el => {
            observer.observe(el);
        });
    }, 0);

    return direccion;
}