import { Navbar } from './components/navbar.js';
import { Header } from './components/header.js';
import { Productos } from './components/productos.js';
import { Comentarios } from './components/comentarios.js';
import { Contacto } from './components/contacto.js';
import { Footer } from './components/Footer.js';
import { CookiesBanner } from './components/CookiesBanner.js'; // <-- IMPORTA

const contenedor = document.createElement('div');
contenedor.style.maxWidth = '1360px';
contenedor.style.margin = '0 auto';
contenedor.style.padding = '0 1rem';

(async () => {
  contenedor.append(Navbar());
  const productosPortada = await Header();
  contenedor.append(productosPortada);

  const productos = await Productos();
  contenedor.append(productos);

  contenedor.append(Comentarios());
  contenedor.append(Contacto());

  app.append(contenedor);

  // Añade el Footer al final del body
  document.body.appendChild(Footer());

  // Ejecuta el CookiesBanner
  CookiesBanner();
})();




/*
(async () => {
  app.append(Navbar());
  const productosPortada = await Header();
  app.append(productosPortada)
  const productos = await Productos();
  app.append(productos);
  app.append(Comentarios());
  app.append(Contacto())
})();
*/


