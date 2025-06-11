// Importar componentes
import { Navbar } from './components/navbar.js';
import { SobreNosotras } from './components/sobrenosotras.js';
import { NuestraFilosofia } from './components/nuestrafilosofia.js';
import { Header } from './components/header.js';
import { Productos } from './components/productos.js';
import { NuestraHistoria } from './components/nuestrahistoria.js';
import { DondeOcurre } from './components/dondeocurre.js';
import { Comentarios } from './components/comentarios.js';
import { direccion } from './components/direccion.js';
import { BotonVerde } from './components/botonwhatsapp.js';
import { Contacto} from './components/contacto.js';
import { EmpanadaBanner } from './components/EmpanadaBanner.js';
import { Servicios } from './components/Servicios.js';
import { Footer } from './components/Footer.js';


(async () => {
  // Navbar
    app.append(Navbar());

  // Apartado Sobre Nosotras
    app.append(SobreNosotras());
  
  // Carrusel de productos destacados (Header)
    const productosPortada = await Header();
    app.append(productosPortada);

  // Sección de productos
    const productos = await Productos();
    app.append(productos);

  // Apartado Nuestra Filosofía
    app.append(NuestraFilosofia());

  // Carrusel de reseñas (Comentarios)
    //app.append(Comentarios());

  // Nuestra Historia
    // app.append(NuestraHistoria());
  
  // Sección Donde ocurre la magia
    app.append(DondeOcurre());

  // Servivios
    app.append(Servicios());

  // Sección de dirección
    app.append(direccion());

  // Sección de contacto
    app.append(Contacto());

  // Botón flotante de WhatsApp
    app.append(BotonVerde());

  // Empanadas
    EmpanadaBanner(); // <-- Añade esta línea
})();




