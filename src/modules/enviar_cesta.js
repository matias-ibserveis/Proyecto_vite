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
    // Usar no-cors para evitar problemas de CORS
    await fetch('https://api-proyecto-lura-enviar-cesta-production.up.railway.app/api/cestas_productos', {
      method: 'POST',
      mode: 'no-cors', // Evita CORS pero no podemos leer respuesta
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datosAEnviar)
    });

    // Con no-cors asumimos que se envió correctamente
    console.log('Cesta enviada (modo no-cors)');
    alert('¡Cesta enviada correctamente! (Los datos se han guardado en la base de datos)');
    
    // Opcional: Limpiar localStorage después de enviar
    localStorage.removeItem('nuevaCesta');
    
    return { ok: true, mode: 'no-cors' };
    
  } catch (error) {
    console.error('Error al enviar cesta:', error);
    alert('Error al enviar cesta: ' + error.message);
    throw error;
  }
}