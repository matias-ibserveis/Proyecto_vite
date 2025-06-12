// Importar componentes
import { Navbar } from './components/navbar.js';
import { SobreNosotras } from './components/sobrenosotras.js';
import { NuestraFilosofia } from './components/nuestrafilosofia.js';
import { NuestraHistoria } from './components/nuestrahistoria.js';
import { Info_Cestas } from './components/Info_Cestas.js';
import { Talleres } from './components/Talleres.js';
import { DondeOcurre } from './components/dondeocurre.js';
import { EmpanadaBanner } from './components/EmpanadaBanner.js';
import { Comentarios } from './components/comentarios.js';
import { Contacto } from './components/contacto.js';
import { direccion } from './components/direccion.js';
import { BotonVerde } from './components/botonwhatsapp.js';
import { Footer } from './components/Footer.js';
import { Servicios } from './components/servicios.js';



  window.scrollTo(0, 0);
(async () => {
  app.append(Navbar());
  app.append(EmpanadaBanner());
  app.append(SobreNosotras());
  app.append(NuestraHistoria());
  app.append(NuestraFilosofia());
  app.append(Info_Cestas());
  app.append(Servicios());
  app.append(DondeOcurre());
  app.append(Talleres());
  app.append(Comentarios());
  app.append(Contacto());
  app.append(direccion());
  app.append(Footer());
  app.append(BotonVerde());

  //app.append(NuestraHistoria());

  window.addEventListener('load', () => {
    window.scrollTo(0, 0);
  });
})();