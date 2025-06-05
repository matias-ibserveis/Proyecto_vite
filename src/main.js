// Importar componentes
import { Navbar } from './components/navbar.js';
import { NuestraFilosofia } from './components/nuestrafilosofia.js';
import { SobreNosotras } from './components/sobrenosotras.js';
import { Header } from './components/header.js';
import { Productos } from './components/productos.js';
import { NuestraHistoria } from './components/nuestrahistoria.js';
import { DondeOcurre } from './components/dondeocurre.js';
import { direccion } from './components/direccion.js';
import { Comentarios } from './components/comentarios.js';
import { BotonVerde } from './components/botonwhatsapp.js';
import { Contacto} from './components/contacto.js';
import { EmpanadaBanner } from './components/EmpanadaBanner.js';
import { Footer } from './components/Footer.js';

(async () => {
  // Navbar
  app.append(Navbar());

  // Nuestra Filosofía
  app.append(NuestraFilosofia());
  
  // Apartado Sobre Nosotras
  app.append(SobreNosotras());

  // Carrusel de productos destacados (Header)
  const productosPortada = await Header();
  app.append(productosPortada);

  // Sección de productos
  const productos = await Productos();
  app.append(productos);

  // Nuestra Historia
  app.append(NuestraHistoria());

  // Sección Donde ocurre la magia
  app.append(DondeOcurre());

  // Sección Dirección
  app.append(direccion());

  // Carrusel de reseñas (Comentarios)
  app.append(Comentarios());

  // Sección de contacto
  app.append(Contacto());

  // Botón flotante de WhatsApp
  app.append(BotonVerde());

  EmpanadaBanner(); // <-- Añade esta línea
})();