const app = document.getElementById('app');
// Importar componentes
import { Navbar } from './components/navbar.js';
import { SobreNosotras } from './components/sobrenosotras.js';
import { NuestraFilosofia } from './components/nuestrafilosofia.js';
import { Header } from './components/header.js';
import { Productos } from './components/productos.js';
import { Comentarios } from './components/comentarios.js';
import { BotonVerde } from './components/botonwhatsapp.js';
import { Contacto } from './components/contacto.js';
import { EmpanadaBanner } from './components/EmpanadaBanner.js';
import { Footer } from './components/Footer.js';
import { Info_Cestas } from './components/Info_Cestas.js';
import { Zona_de_Trabajo } from './components/Zona_de_Trabajo.js';
import { Talleres } from './components/Talleres.js';
import { Servicios } from './components/Servicios.js';

(async () => {
  // Navbar
  app.append(Navbar());

  // Apartado Sobre Nosotras
  app.append(SobreNosotras());

  // Apartado Nuestra Filosofía
  app.append(NuestraFilosofia());

  // Apartado Cestas
  app.append(Info_Cestas());
  
  // Apartado Servicios
  app.append(Servicios());

  // Apartado Zona de Trabajo
  app.append(Zona_de_Trabajo());

  // Apartado Talleres
  app.append(Talleres());

  // Carrusel de reseñas (Comentarios)
  app.append(Comentarios());

  // Sección de contacto
  app.append(Contacto());

  // Botón flotante de WhatsApp
  app.append(BotonVerde());

  EmpanadaBanner();

  app.append(Footer());

  
  // Carrusel de productos destacados (Header)
  //const productosPortada = await Header();
  //app.append(productosPortada);

  // Sección de productos
  //const productos = await Productos();
  //app.append(productos);
})();




