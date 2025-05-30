// Importar componentes
import { Navbar } from './components/navbar.js';
import { SobreNosotras } from './components/sobrenosotras.js';
import { NuestraFilosofia } from './components/nuestrafilosofia.js';
import { Header } from './components/header.js';
import { Productos } from './components/productos.js';
import { Comentarios } from './components/comentarios.js';
import { BotonVerde } from './components/botonwhatsapp.js';
import { Contacto } from './components/contacto.js';

// Seleccionamos el elemento app donde montamos todo
const app = document.getElementById('app');

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
  app.append(Comentarios());

  // Sección de contacto
  app.append(Contacto());

  // Botón flotante de WhatsApp
  app.append(BotonVerde());
})();