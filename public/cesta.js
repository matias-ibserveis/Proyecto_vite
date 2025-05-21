// src/pages/cesta.js
import { Navbar } from '../src/components/navbar.js';
import { renderCesta } from '../src/modules/cestaLogic.js';

document.getElementById('navbar').appendChild(Navbar());
renderCesta(document.getElementById('app'));
