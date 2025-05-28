// Importar componentes
import { Navbar } from './components/navbar.js';
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

  // Carrusel de productos destacados (Header)
  const productosPortada = await Header();
  app.append(productosPortada);

  // Sección de productos
  const productos = await Productos();
  app.append(productos);

  // Carrusel de reseñas (Comentarios)
  app.append(Comentarios());

  // Sección de contacto
  app.append(Contacto());

  // Botón flotante de WhatsApp
  app.append(BotonVerde());
})();