export function CartHeader() {
  const wrapper = document.createElement('div');
  wrapper.className = 'cart-header-wrapper';
  wrapper.innerHTML = `
    <h1 class="titulo">Vuestra Cesta</h1>
    <a href="/producto.html" class="frame-foto-link">
      <div class="frame-foto">
        <img src="https://cdn-icons-png.flaticon.com/512/93/93634.png" alt="Volver a productos" class="frame-foto-img">
      </div>
    </a>
  `;

  // Añadir el CSS solo una vez
  if (!document.getElementById('cart-header-style')) {
    const style = document.createElement('style');
    style.id = 'cart-header-style';
    style.textContent = `
      .frame-foto-link {
        display: inline-block;
        text-decoration: none;
      }
      .frame-foto {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        border: 2px solid #d2ab74;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        transition: box-shadow 0.2s;
      }
      .frame-foto:hover {
        box-shadow: 0 2px 8px rgba(210, 171, 116, 0.2);
      }
      .frame-foto-img {
        width: 36px;
        height: 36px;
        object-fit: contain;
        display: block;
      }
    `;
    document.head.appendChild(style);
  }

  return wrapper;
}