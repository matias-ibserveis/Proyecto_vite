import { Navbar } from '../components/navbar.js';
import { productos_crear_cesta } from '../modules/crearCestaLogig.js';


const appContenedor = document.getElementById('app')
console.log("crear_cesta.js cargado correctamente");

document.getElementById('navbar').appendChild(Navbar());

(async () => {
  await productos_crear_cesta(appContenedor);
})();
