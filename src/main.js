import { Navbar } from './components/navbar.js';
import { Header } from './components/header.js';
import { Productos } from './components/productos.js';
import { Comentarios } from './components/comentarios.js';
import { Contacto} from './components/contacto.js';


(async () => {
  app.append(Navbar(), Header());
  const productos = await Productos();
  app.append(productos);
  app.append(Comentarios());
  app.append(Contacto())
})();


