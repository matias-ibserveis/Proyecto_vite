// src/pages/cesta.js
import { Navbar } from '../components/navbar.js';
import { renderCesta } from '../modules/cestaLogic.js';

document.getElementById('navbar').appendChild(Navbar());
renderCesta(document.getElementById('app'));
