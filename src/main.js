// Importar componentes
import { Navbar } from './components/navbar.js';
import { SobreNosotras } from './components/sobrenosotras.js';
import { NuestraFilosofia } from './components/nuestrafilosofia.js';
import { Info_Cestas } from './components/Info_Cestas.js';
import { Talleres } from './components/Talleres.js';
import { tituloCestas } from './components/tituloCestas.js';
import { ListaCesta } from './components/verListasCestas.js';
import { DondeOcurre } from './components/dondeocurre.js';
import { EmpanadaBanner } from './components/EmpanadaBanner.js'; // Talleres
import { Comentarios } from './components/comentarios.js';
import { Contacto } from './components/contacto.js';
import { BotonVerde } from './components/botonwhatsapp.js';
import { Footer } from './components/Footer.js';

// Otros módulos no mencionados en la lista principal
import { CarouselProductos } from './components/header.js';
import { Productos } from './components/productos.js';
import { NuestraHistoria } from './components/nuestrahistoria.js';
import { direccion } from './components/direccion.js';

(async () => {
  // Navbar
  app.append(Navbar());

  app.append(EmpanadaBanner());

  // Sobre Nosotras
  app.append(SobreNosotras());

  // Nuestra Filosofía
  app.append(NuestraFilosofia());

    // Info Cestas
app.append(Info_Cestas());

  // Cestas Semanales
  // app.append(tituloCestas());
  // const cesta1 = await ListaCesta(1);
  // app.append(cesta1);
  // const cesta2 = await ListaCesta(2);
  // app.append(cesta2);

  // Zona de trabajo
  app.append(DondeOcurre());

  // Talleres
  app.append(Talleres());

  // Reseñas
  app.append(Comentarios());

  // Contacto
  app.append(Contacto());

  // Footer
  app.append(Footer());

  // --- Módulos no mencionados, agregados comentados al final ---
  // Carrusel de productos destacados (Header)
  // const productosPortada = await CarouselProductos();
  // app.append(productosPortada);

  // Sección de productos
  // const productos = await Productos();
  // app.append(productos);

  // Nuestra Historia
  // app.append(NuestraHistoria());

  // Info Cestas
  // app.append(Info_Cestas());

  // Sección Dirección
  // app.append(direccion());

  // Botón flotante de WhatsApp
  // app.append(BotonVerde());
window.addEventListener('load', () => {
  window.scrollTo(0, 0);
});
})();