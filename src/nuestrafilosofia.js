export function NuestraFilosofia() {
    const section = document.createElement('section');
    section.className = 'nuestra-filosofia';

    section.innerHTML = `
        <h2 class="bloque titulo titulo">Nuestra filosofía</h2>
        <p class="bloque">En Lura, creemos en la importancia de una alimentación saludable y sostenible.</p>
        <p class="bloque derecha">Nuestra filosofía se basa en el respeto por el medio ambiente, la salud de las personas y el apoyo a la economía local.</p>
        <p class="bloque">Trabajamos con productores locales que comparten nuestros valores, ofreciendo productos frescos y de calidad.</p>
    `;

    // Animación de scroll reveal
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('mostrar');
            }
        });
    }, {
        threshold: 0.3
    });

    // Buscar todos los bloques dentro de la sección
    const bloques = section.querySelectorAll('.bloque');
    bloques.forEach(bloque => observer.observe(bloque));

    return section;
}
