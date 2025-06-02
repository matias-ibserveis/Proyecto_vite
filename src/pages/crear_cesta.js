import { Navbar } from '../components/navbar.js';
import { productos_crear_cesta } from '../modules/crear_cesta_logic.js';


const appContenedor = document.getElementById('app')
//console.log("crear_cesta_logic.js cargado correctamente");

document.getElementById('navbar').appendChild(Navbar());

(async () => {
  await productos_crear_cesta(appContenedor);
})();
