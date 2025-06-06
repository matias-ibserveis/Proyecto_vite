export function direccion() {
    const direccion = document.createElement("section");
    direccion.className = "container py-5";
    direccion.id = "direccion";
    direccion.innerHTML = `
        <div class="row">
            <div class="col-12 text-center">
                <h2 class="titulo slide-from-left">¿Dónde estamos?</h2>
                <h2 class="text-direccion slide-from-left" style="animation-delay: 0.2s">¡Visítanos en nuestra dirección física!</h2>
                <h5 class="text-direccion slide-from-left" style="animation-delay: 0.4s">La dirección de nuestro local es:</h5>
                <p class="text-direccion slide-from-left" style="animation-delay: 0.6s">Carrer Carles I, 6, Nord, 07003 Palma, Illes Balears</p>
                <img class="mapa slide-from-right" src="images/mapa.webp" alt="Mapa de ubicación" class="img-fluid">
                <button class="btn btn-primary boton-maps slide-from-right" id="btn-maps" style="animation-delay: 0.2s">
                    <img src="images/maps.webp" alt="Google Maps" class="maps-icon">
                    <p> Google Maps</p>
                </button>
                <h5 class="text-direccion slide-from-left" style="animation-delay: 0.8s">Nuestro horario de atención es:</h5>
                <p class="text-direccion slide-from-left" style="animation-delay: 1s">Lunes a Viernes: 9:30 AM - 19:00 PM</p>
                <p class="text-direccion slide-from-left" style="animation-delay: 1.2s">Sábados: 10:00 AM - 13:30 PM</p>
                <p class="text-direccion slide-from-left" style="animation-delay: 1.4s">Domingos: Cerrado</p>
            </div>
        </div>
    `;

    const style = document.createElement('style'); 
    style.innerHTML = `
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
        }

        .mapa {
            border-radius: 10px;
            margin-top: 20px;
            margin-bottom: 20px;
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
        }

        .slide-from-left.visible,
        .slide-from-right.visible {
            opacity: 1;
            transform: translateX(0);
        }

        .boton-maps {
            display: flex;
            font-family: "Aloja-Extended", sans-serif;
            align-items: center;
            justify-content: center;
            padding: 10px 20px;
            background-color: var(--main-color);
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            max-width: 200px;
            max-height: 50px;
            margin: 10px auto 20px; /* Center button and add spacing */
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: background-color 0.3s ease, transform 0.3s ease;
            font-size: 1.1rem;
        }

        .boton-maps:hover {
            background-color: var(--secondary-color);
            box-shadow: 0 6px 8px -var(--terciary-color);
        }
        
        .boton-maps p {
            margin: 0;
            font-size: 1,5rem;
            font-weight: 500;
        }

        .maps-icon {
            max-height: 30px; /* Ensure icon fits well within button */
        }
    `;

    document.head.appendChild(style);

    // Add IntersectionObserver to trigger animations on scroll
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const elements = entry.target.querySelectorAll('.slide-from-left, .slide-from-right');
                elements.forEach(el => el.classList.add('visible'));
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the section is visible
    });

    // Observe the section after it's added to the DOM
    setTimeout(() => {
        const section = document.getElementById('direccion');
        if (section) {
            observer.observe(section);
        }
    }, 0);

    return direccion;
}