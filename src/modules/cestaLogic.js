// src/modules/cestaLogic.js

export async function initializeCesta() {
  const cesta = localStorage.getItem('cesta');
  if (!cesta || cesta === '{}') {
    try {
      const res = await fetch('https://proyectorailway-production-9739.up.railway.app/listados/cesta/1');
      const productos = await res.json();

      const cestaInicial = {};
      productos.forEach(p => {
        cestaInicial[p.id] = {
          titulo: p.titulo,
          cantidad: 1,
          unidad_medido: p.unidad_medido,
          precio: p.precio,
          origen: p.origen || 'api'
        };
      });

      localStorage.setItem('cesta', JSON.stringify(cestaInicial));
    } catch (err) {
      console.error('Error cargando productos:', err);
    }
  }
}