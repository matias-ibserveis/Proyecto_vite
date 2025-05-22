import { Navbar } from './components/navbar.js';
import { Header } from './components/header.js';
import { Productos } from './components/productos.js';
import { Comentarios } from './components/comentarios.js';
import { Contacto} from './components/contacto.js';

const contenedor = document.createElement('div');
contenedor.style.maxWidth = '1360px';
contenedor.style.margin = '0 auto'; // centrar horizontalmente
contenedor.style.padding = '0 1rem'; // opcional: algo de espacio lateral

(async () => {
  contenedor.append(Navbar());
  const productosPortada = await Header();
  contenedor.append(productosPortada);

  const productos = await Productos();
  contenedor.append(productos);

  contenedor.append(Comentarios());
  contenedor.append(Contacto());

  app.append(contenedor); // Añadir el contenedor al DOM al final
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


