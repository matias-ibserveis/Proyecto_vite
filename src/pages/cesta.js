import { CestaNavbar } from '../components/CestaNavbar.js';
import { CartComponent } from '../components/cartComponent.js';

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