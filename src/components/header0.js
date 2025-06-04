import { setBusqueda } from "./store.js";

export async function Header() {
    const header = document.createElement("header");
    header.className = "carousel slide";
    header.id = "headerCarousel";
    header.setAttribute("data-bs-ride", "carousel");

    try {
        const res = await fetch('https://proyectorailway-production-9739.up.railway.app/productos_portada');
        const productos = await res.json();

        const items = productos.slice(0, 4).map((producto, index) => {
            const imageId = producto.imagen1.split('/d/')[1]?.split('/')[0];
            const imageUrl = `https://drive.google.com/thumbnail?id=${imageId}&sz=w800-h600`;
            const activeClass = index === 0 ? 'active' : '';

            const primeraPalabraDesc = producto.descripcion.split(' ')[0] || '';

            return `
                <div class="carousel-item ${activeClass}" data-nombre="${primeraPalabraDesc}">
                    <img src="${imageUrl}" 
                         class="d-block w-100" 
                         alt="Producto ${index + 1}"
                         style="cursor: pointer;"
                    >
                    <div class="tooltip-recomendacion">Recomendación: ${primeraPalabraDesc}</div>
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
                    cursor: pointer;
                }
                .carousel-control-prev {
                    left: 3%;
                }
                .carousel-control-next {
                    right: 3%;
                }
                .carousel-item {
                    position: relative;
                }
                .tooltip-recomendacion {
                    position: absolute;
                    bottom: 15px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: rgba(0,0,0,0.75);
                    color: white;
                    padding: 8px 16px;
                    border-radius: 8px;
                    font-size: 1.2rem;
                    display: none;
                    pointer-events: none;
                    z-index: 10;
                    white-space: nowrap;
                }
            </style>
        `;
    } catch (error) {
        console.error('Error cargando los productos:', error);
    }

    // Mostrar tooltip al pasar el mouse, ocultar al salir
    setTimeout(() => {
        header.querySelectorAll('.carousel-item').forEach(item => {
            const tooltip = item.querySelector('.tooltip-recomendacion');
            item.addEventListener('mouseenter', () => {
                tooltip.style.display = 'block';
                item.style.cursor = 'pointer';
            });
            item.addEventListener('mouseleave', () => {
                tooltip.style.display = 'none';
            });

            // Click para lanzar setBusqueda
            item.addEventListener('click', () => {
                const nombre = item.dataset.nombre;
                setBusqueda(nombre);
                console.log("nombre en head", nombre);
            });
        });
    }, 0);

    return header;
}
