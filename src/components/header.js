export async function Header() {
    const header = document.createElement("header");
    header.className = "carousel slide";
    header.id = "headerCarousel";
    header.setAttribute("data-bs-ride", "carousel");

    try {
        //const res = await fetch('http://localhost:3000/productos_portada');
        const res = await fetch('https://proyectorailway-production-9739.up.railway.app/productos_portada');
        const productos = await res.json();
        console.log("productos portada", JSON.stringify(productos, null, 2));

        const items = productos.slice(0, 4).map((producto, index) => {
            const imageId = producto.imagen1.split('/d/')[1]?.split('/')[0];
            const imageUrl = `https://drive.google.com/thumbnail?id=${imageId}&sz=w800-h600`;
            const activeClass = index === 0 ? 'active' : '';

            return `
                <div class="carousel-item ${activeClass}">
                <img src="${imageUrl}" class="carousel-img" alt="Producto ${index + 1}">
                </div>
                 `;
        }).join('');

        header.innerHTML = `
            <div style="display:flex; max-width:1320px; margin:2rem ; align-items:center;">
                <button class="carousel-btn" data-bs-target="#headerCarousel" data-bs-slide="prev"> < </button>
                <div style="flex:0 0 900px; overflow:hidden;">
                <div class="carousel-inner">
                    ${items}
                </div>
                </div>
                <button class="carousel-btn" data-bs-target="#headerCarousel" data-bs-slide="next"> > </button>
            </div>
            <style>
                .carousel-img {
                width: 100%;
                height: 50vh;
                object-fit: cover;
                border: 3px solid green;
                }
                .carousel-btn {
                width: 200px;
                background: white;
                color:green;
                border:none;
                font-size: 4rem;
                cursor: pointer;
                height: 100%;
                }
            </style>
            `;

    } catch (error) {
        console.error('Error cargando los productos:', error);
    }

    return header;
}
