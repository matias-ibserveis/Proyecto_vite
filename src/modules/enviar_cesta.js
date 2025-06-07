async function prepararCestaParaBackend(numeroCesta) {
  const cesta = JSON.parse(localStorage.getItem('nuevaCesta') || '{}');
  console.log("cesta preparada", cesta)
  return Object.entries(cesta).map(([id_producto, producto]) => ({
    numero_cesta: numeroCesta,
    id_producto: parseInt(id_producto, 10),
    cantidad_producto: producto.cantidad ? Number(producto.cantidad) : 0
  }));
}


export async function enviarCestaAlBackend(numeroCesta) {
  const productos = await prepararCestaParaBackend(numeroCesta); // <- nombre coherente
  
  try {
    const respuesta = await fetch('https://proyectorailway-production-9739.up.railway.app/api/crear_cesta', {  
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        numero_cesta: numeroCesta,
        productos // <- debe coincidir con backend
      })
    });

    //if (!respuesta.ok) throw new Error(`HTTP error! status: ${respuesta.status}`);

    const datos = await respuesta.json();
    //console.log('Cesta guardada:', datos);
    return datos;
  } catch (error) {
    console.error('No se ha podido enviar cesta:', error);
    throw error;
  }
}

