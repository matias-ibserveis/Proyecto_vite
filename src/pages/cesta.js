// src/pages/cesta.js
import { Navbar } from '../components/navbar.js';
import { CartComponent } from '../components/cartComponent.js';
import { initializeCesta } from '../modules/cestaLogic.js';

document.getElementById('navbar').appendChild(Navbar());

// Initialize cart data, then render the cart
initializeCesta().then(() => {
  document.getElementById('cart').appendChild(CartComponent());
});