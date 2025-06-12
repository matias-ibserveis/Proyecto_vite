export function CartHeader() {
  const wrapper = document.createElement('div');
  wrapper.className = 'cart-header-wrapper';

  wrapper.innerHTML = `
    <h1 class="titulo">Your cart</h1>
    <a href="/cesta.html" class="continue-shopping">Continue shopping</a>
  `;

  return wrapper;
}