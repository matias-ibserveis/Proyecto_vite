async function prepararCestaParaBackend(numeroCesta) {
  const cesta = JSON.parse(localStorage.getItem('nuevaCesta') || '{}');
  console.log("Cesta preparada:", cesta);
  
  const productos = Object.entries(cesta).map(([id_producto, producto]) => ({
    numero_cesta: numeroCesta,
    id_producto: parseInt(id_producto, 10),
    cantidad_producto: producto.cantidad ? Number(producto.cantidad) : 0,
    unidad_medida: producto.unidad_medido || 'kg' // Incluir la unidad de medida seleccionada
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
      
      // TEST FINAL: Solo agregar a backend la funcionalidad más tarde
      console.log('🔍 Cesta enviada exitosamente a base de datos');
      console.log('📝 TODO: Implementar envío a Google Sheets desde backend');
      
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

// Función SÚPER SIMPLE para test
async function enviarCestaAGoogleSheets(productos) {
  console.log('=== TEST SIMPLE GOOGLE SHEETS ===');
  
  try {
    const cesta = JSON.parse(localStorage.getItem('nuevaCesta') || '{}');
    console.log('Cesta disponible:', cesta);
    console.log('Productos a procesar:', productos);
    
    if (productos.length > 0 && Object.keys(cesta).length > 0) {
      const primerProducto = productos[0];
      const infoPrimerProducto = cesta[primerProducto.id_producto];
      
      if (infoPrimerProducto) {
        console.log('Enviando primer producto como test:', infoPrimerProducto.titulo);
        
        // Test simple: solo crear una fila nueva con formato del checkout
        const filaTest = {
          'Nombre': 'TEST_CESTA',
          'Lugar': 'AUTO', 
          'U': infoPrimerProducto.titulo,
          'V': primerProducto.cantidad_producto,
          'W': primerProducto.unidad_medida
        };
        
        console.log('Fila test:', filaTest);
        
        const response = await fetch('https://sheetdb.io/api/v1/dgiqizat7s3wq', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: [filaTest] })
        });
        
        console.log('Response status:', response.status);
        
        if (response.ok) {
          const result = await response.json();
          console.log('✅ SUCCESS:', result);
        } else {
          const error = await response.text();
          console.log('❌ ERROR:', error);
        }
      }
    }
    
  } catch (error) {
    console.error('❌ Error en test simple:', error);
  }
}