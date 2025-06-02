import { Navbar } from './components/navbar.js';
import { Header } from './components/header.js';
import { Comentarios } from './components/comentarios.js';
import { BotonVerde } from './components/botonwhatsapp.js';
import { Contacto} from './components/contacto.js';
import { EmpanadaBanner } from './components/EmpanadaBanner.js';
import { Footer } from './components/Footer.js';

(async () => {
  app.append(Navbar());
  const productosPortada = await Header();
  app.append(productosPortada);
  app.append(Comentarios());
  app.append(Contacto());
  app.append(Footer());
  app.append(BotonVerde());
  EmpanadaBanner();
})();