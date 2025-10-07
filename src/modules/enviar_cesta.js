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

export async function enviarCestaAlBackend(numeroCesta, urlFoto = "") {
  const productos = await prepararCestaParaBackend(numeroCesta);
  
  const datosAEnviar = {
    numero_cesta: numeroCesta,
    foto: urlFoto,
    productos
  };
  
  // LOGS DETALLADOS PARA VER QUÉ SE ENVÍA
  console.log('=== DATOS A ENVIAR ===');
  console.log('numero_cesta:', numeroCesta);
  console.log('foto:', urlFoto);
  console.log('productos:', productos);
  console.log('Estructura completa:', JSON.stringify(datosAEnviar, null, 2));
  
  try {
    const respuesta = await fetch('https://api-proyecto-lura-enviar-cesta-production.up.railway.app/api/cestas_productos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datosAEnviar)
    });

    console.log('=== RESPUESTA DEL SERVIDOR ===');
    console.log('Status de respuesta:', respuesta.status);
    
    if (respuesta.ok) {
      const resultado = await respuesta.json();
      console.log('Respuesta exitosa del servidor:', resultado);
      alert(`¡Éxito! ${resultado.mensaje}`);
      
      localStorage.removeItem('nuevaCesta');
      
      return resultado;
    } else {
      const errorText = await respuesta.text();
      console.error('Error del servidor:', errorText);
      alert('Error del servidor: ' + errorText);
      throw new Error(`HTTP ${respuesta.status}: ${errorText}`);
    }
    
  } catch (error) {
    console.error('=== ERROR COMPLETO ===');
    console.error('Error:', error);
    alert('Error: ' + error.message);
    throw error;
  }
}