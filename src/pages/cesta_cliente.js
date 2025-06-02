// src/pages/cesta.js
import { Navbar } from '../components/navbar.js';
import { renderCesta } from '../modules/cesta_cliente_logic.js';

document.getElementById('navbar').appendChild(Navbar());
renderCesta(document.getElementById('app'));
