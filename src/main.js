import { Navbar } from './components/navbar.js';
import { Header } from './components/header.js';
import { Productos } from './components/productos.js';
import { Comentarios } from './components/comentarios.js';

/* const app = document.getElementById("app");
app.append(Navbar(), Header(), Productos());
*/

(async () => {
  app.append(Navbar(), Header());
  const productos = await Productos();
  app.append(productos);
  app.append(Comentarios());
})();


