
import { setBusqueda } from "./store.js";

export async function Header() {
    const header = document.createElement("header");
    header.className = "carousel slide";
    header.id = "headerCarousel";
    header.setAttribute("data-bs-ride", "carousel");

    try {
        //const res = await fetch('http://localhost:3000/productos_portada');
        const res = await fetch('https://proyectorailway-production-9739.up.railway.app/productos_portada');
        const productos = await res.json();
        //console.log("productos portada", JSON.stringify(productos, null, 2));

        const items = productos.slice(0, 4).map((producto, index) => {
            const imageId = producto.imagen1.split('/d/')[1]?.split('/')[0];
            const imageUrl = `https://drive.google.com/thumbnail?id=${imageId}&sz=w800-h600`;
            const activeClass = index === 0 ? 'active' : '';
            return `
        <div class="carousel-item ${activeClass}" data-nombre="${producto.descripcion.split(' ')[0]}">
            <img src="${imageUrl}" class="d-block w-100" alt="Producto ${index + 1}">
        </div>
    `;
        }).join('');



        header.innerHTML = `
                <div class="carousel-inner">
                    ${items}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#headerCarousel" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#headerCarousel" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
                <style>
                    .carousel-inner img {
                        height: 50vh;
                        object-fit: cover;
                        width: 100%;
                        border-radius: 10px;
                    }
                    .carousel-control-prev {
                        left: 3%;
                    }
                    .carousel-control-next {
                        right: 3%;
                    }
                </style>
            `;
    } catch (error) {
        console.error('Error cargando los productos:', error);
    }


    setTimeout(() => {
        header.querySelectorAll('.carousel-item').forEach(item => {
            item.addEventListener('click', () => {
                const nombre = item.dataset.nombre;
                setBusqueda(nombre); // 🔄 lanza el evento
                console.log("nombre en head", nombre)
            });
        });
    }, 0);


    return header;
}