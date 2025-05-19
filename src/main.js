import { Navbar } from './components/navbar.js';
import { Header } from './components/header.js';
import { Productos } from './components/productos.js';
import { Comentarios } from './components/comentarios.js';
import { Contacto} from './components/contacto.js';
import { CookiesBanner } from './components/CookiesBanner.js';

(async () => {
  const app = document.getElementById('app');
  app.append(Navbar());
  const productosPortada = await Header();
  app.append(productosPortada)
  const productos = await Productos();
  app.append(productos);
  app.append(Comentarios());
  app.append(Contacto());

  CookiesBanner(); // <-- Añade esta línea
})();


