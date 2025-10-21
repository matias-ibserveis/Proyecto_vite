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
      
      // OBTENER CESTA ANTES DE BORRARLA
      const cestaData = JSON.parse(localStorage.getItem('nuevaCesta') || '{}');
      console.log('🔵 CestaData completa:', cestaData);
      
      // ENVIAR A GOOGLE SHEETS - CON BORRADO PREVIO
      console.log('🔵 ENVIANDO A GOOGLE SHEETS - DATOS BACKEND:', productos);
      
      // PASO 1: BORRAR TODO EL CONTENIDO DEL SHEET
      console.log('🗑️ PASO 1: Borrando contenido anterior del Sheet...');
      
      try {
        const borrarResponse = await fetch('https://sheetdb.io/api/v1/n80v3j1ti9x4g/all', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        });
        
        console.log('🗑️ Estado del borrado:', borrarResponse.status);
        
        if (borrarResponse.ok) {
          console.log('✅ Contenido anterior borrado exitosamente');
          
          // PASO 2: AGREGAR LOS NUEVOS PRODUCTOS
          console.log('📝 PASO 2: Agregando nuevos productos...');
          
          // Preparar todas las filas para enviar de una vez
          const filasParaEnviar = [];
          
          productos.forEach((producto, i) => {
            console.log(`🔍 Procesando producto ${i+1} ID ${producto.id_producto}`);
            const infoProducto = cestaData[producto.id_producto];
            
            if (infoProducto) {
              const fila = {
                'Productos': infoProducto.titulo,
                'Cantidad': producto.cantidad_producto, 
                'Unidad Medida': producto.unidad_medida
              };
              
              filasParaEnviar.push(fila);
              console.log(`✅ Producto ${i+1} preparado:`, fila);
            } else {
              console.log(`🔴 ERROR: No se encontró producto ID ${producto.id_producto}`);
            }
          });
          
          // Enviar todas las filas de una vez
          if (filasParaEnviar.length > 0) {
            console.log('📤 Enviando todas las filas:', filasParaEnviar);
            
            const enviarResponse = await fetch('https://sheetdb.io/api/v1/n80v3j1ti9x4g', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ data: filasParaEnviar })
            });
            
            console.log('📡 Estado del envío:', enviarResponse.status);
            
            if (enviarResponse.ok) {
              const resultado = await enviarResponse.json();
              console.log('🎉 ¡Todos los productos enviados exitosamente!', resultado);
              alert(`🎉 ¡${filasParaEnviar.length} productos enviados a Google Sheets!`);
            } else {
              const errorText = await enviarResponse.text();
              console.error('❌ Error al enviar productos:', errorText);
              alert('❌ Error al enviar productos al Sheet');
            }
          } else {
            console.log('⚠️ No hay productos válidos para enviar');
          }
          
        } else {
          console.error('❌ Error al borrar contenido anterior');
          alert('❌ Error al borrar contenido anterior del Sheet');
        }
        
      } catch (error) {
        console.error('❌ Error en operación con Google Sheets:', error);
        alert('❌ Error en la operación con Google Sheets: ' + error.message);
      }
      
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