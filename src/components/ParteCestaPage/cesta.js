import { CestaNavbar } from '../CestaNavbar.js';
import { CartComponent } from './cartComponent.js';

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    navbar.appendChild(CestaNavbar());
  }

  const cart = document.getElementById('cart');
  if (cart) {
    cart.appendChild(CartComponent());
  }
});