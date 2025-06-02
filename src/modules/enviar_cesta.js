async function prepararCestaParaBackend(numeroCesta) {
  const cesta = JSON.parse(localStorage.getItem('cesta') || '{}');
  return Object.entries(cesta).map(([id_producto, producto]) => ({
    numero_cesta: numeroCesta,
    id_producto: parseInt(id_producto, 10),
    cantidad_producto: producto.cantidad ? Number(producto.cantidad) : 0
  }));
}

export async function enviarCestaAlBackend(numeroCesta) {
  const filasParaBackend = prepararCestaParaBackend(numeroCesta);

  try {
    const respuesta = await fetch('/api/guardar-cesta', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ filas: filasParaBackend })
    });

    if (!respuesta.ok) throw new Error(`HTTP error! status: ${respuesta.status}`);

    const datos = await respuesta.json();
    console.log('Cesta guardada:', datos);
    return datos;
  } catch (error) {
    console.error('Error enviando cesta:', error);
    throw error;
  }
}
