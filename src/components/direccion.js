export function direccion() {
    const direccion = document.createElement("section");
    direccion.className = "container py-5";
    direccion.id = "direccion";
    direccion.innerHTML = `
        <div class="row">
            <div class="col-12 text-center">
                <h2 class="titulo">¿Dónde estamos?</h2>
                <p class="descripcion">Visítanos en nuestra dirección física.</p>
            </div>
            <div class="col-4">
                <h1 class="titulo section-title extra-padding">Dirección</h1>
                <h4 class="text-direccion">La dirección de nuestro local es:</h4>
                <p>-</p>
                <h3 class="text-direccion">Carrer Carles I, 6, Nord, 07003 Palma, Illes Balears</h3>
            </div>
            <div class="col-4">
                <h1 class="titulo section-title extra-padding">Ubicación</h1>
                <img src="images/mapa.webp" alt="Mapa de ubicación" class="img-fluid">
            </div>
            <div class="col-4">
                <h1 class="titulo section-title extra-padding">Horario</h1>
                <h4 class="text-direccion">Nuestro horario de atención es:</h4>
                <p>-</p>
                <h4 class="text-direccion">Lunes a Viernes: 9:30 AM - 19:00 PM</h4>
                <h4 class="text-direccion">Sábados: 10:00 AM - 13:30 PM</h4>
                <h4 class="text-direccion">Domingos: Cerrado</h4>
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
            font-size: 1.5rem; /* Consistent font size */
            font-weight: 600; /* Consistent weight */
            margin-bottom: 1rem; /* Consistent spacing below */
            text-align: center; /* Center text within the background box */
            width: 100%; /* Full width of the column */
            box-sizing: border-box; /* Ensure padding doesn't affect width */
            background-color: --var(-main-color); /* Background color to match the image */
            color: white; /* Text color to match the image */
            padding: 10px; /* Inner padding for the background box */
            border-radius: 10px; /* Rounded corners to match the image */
            font-family: Arial, sans-serif; /* Font to approximate the image */
            text-transform: uppercase; /* Match the uppercase text in the image */
        }

        .text-direccion {
            font-family: "Hanken Grotesk", sans-serif;
    `;

    document.head.appendChild(style);
    return direccion;
}