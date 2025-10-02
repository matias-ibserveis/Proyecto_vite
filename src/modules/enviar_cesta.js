async function prepararCestaParaBackend(numeroCesta) {
  const cesta = JSON.parse(localStorage.getItem('nuevaCesta') || '{}');
  console.log("Cesta preparada:", cesta);
  
  const productos = Object.entries(cesta).map(([id_producto, producto]) => ({
    numero_cesta: numeroCesta,
    id_producto: parseInt(id_producto, 10),
    cantidad_producto: producto.cantidad ? Number(producto.cantidad) : 0
  }));
  
  console.log("Productos preparados para enviar:", productos);
  return productos;
}

export async function enviarCestaAlBackend(numeroCesta) {
  const productos = await prepararCestaParaBackend(numeroCesta);
  
  const datosAEnviar = {
    numero_cesta: numeroCesta,
    productos
  };
  
  console.log('Datos a enviar al backend:', datosAEnviar);
  
  try {
    const respuesta = await fetch('https://api-proyecto-lura-enviar-cesta-production.up.railway.app/api/crear_cesta', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datosAEnviar)
    });

    console.log('Status de respuesta:', respuesta.status);

    if (!respuesta.ok) {
      const errorText = await respuesta.text();
      console.error('Error del servidor:', errorText);
      throw new Error(`HTTP error! status: ${respuesta.status} - ${errorText}`);
    }

    const datos = await respuesta.json();
    console.log('Cesta guardada exitosamente:', datos);
    return datos;
    
  } catch (error) {
    console.error('Error completo al enviar cesta:', error);
    throw error;
  }
}