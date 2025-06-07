// Importar componentes
import { Navbar } from './components/navbar.js';
import { SobreNosotras } from './components/sobrenosotras.js';
import { NuestraFilosofia } from './components/nuestrafilosofia.js';
import { CarouselProductos } from './components/header.js';
import { Productos } from './components/productos.js';
import { NuestraHistoria } from './components/nuestrahistoria.js';
import { DondeOcurre } from './components/dondeocurre.js';
import { Comentarios } from './components/comentarios.js';
import { BotonVerde } from './components/botonwhatsapp.js';
import { Contacto} from './components/contacto.js';
import { EmpanadaBanner } from './components/EmpanadaBanner.js';
import { Footer } from './components/Footer.js';
import { Info_Cestas } from './components/Info_Cestas.js';
import { ListaCesta } from './components/verListasCestas.js';
import { tituloCestas } from './components/tituloCestas.js';
import { direccion } from './components/direccion.js';


(async () => {
  // Navbar
  app.append(Navbar());

  // Apartado Sobre Nosotras
  app.append(SobreNosotras());
  
  // Carrusel de productos destacados (Header)
  const productosPortada = await CarouselProductos();
  app.append(productosPortada);

  // Sección de productos
  const productos = await Productos();
  app.append(productos);

  
  app.append(tituloCestas());
    
  // Listas Cestas
  const cesta1 = await ListaCesta(1);
  app.append(cesta1);

    const cesta2 = await ListaCesta(2);
  app.append(cesta2);

    // Apartado Nuestra Filosofía
  app.append(NuestraFilosofia());

  // Carrusel de reseñas (Comentarios)
  //app.append(Comentarios());

    // Nuestra Historia
   // app.append(NuestraHistoria());
  
    // Sección Donde ocurre la magia
    app.append(DondeOcurre());

      // Sección Dirección
      //app.append(direccion());

  // Sección de contacto
  app.append(Contacto());

  // Botón flotante de WhatsApp
  app.append(BotonVerde());

  //EmpanadaBanner(); // <-- Añade esta línea
})();




