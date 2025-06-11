export function BotonVerde() {
  const boton = document.createElement('button');
  boton.className = 'boton-whatsapp btn-verde btn-aloja anim-right';
  boton.title = 'Chatea por WhatsApp';
  boton.style.position = 'fixed';
  boton.style.right = '20px';
  boton.style.bottom = '20px';
  boton.style.zIndex = '1000';
  boton.style.background = '#28a745';
  boton.style.color = 'white';
  boton.style.width = '50px';
  boton.style.height = '50px';
  boton.style.minWidth = '50px';
  boton.style.minHeight = '50px';
  boton.style.border = 'none';
  boton.style.borderRadius = '50%';
  boton.style.fontSize = '0';
  boton.style.cursor = 'pointer';
  boton.style.display = 'flex';
  boton.style.alignItems = 'center';
  boton.style.justifyContent = 'center';
  boton.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
  boton.innerHTML = `<img src="images/whatsapp.png" alt="WhatsApp" style="width:40px; height:40px; object-fit:contain; display:block;">`;

  boton.onclick = () => window.open("https://wa.me/34613959689", "_blank");

  document.body.appendChild(boton);

  if (!document.getElementById('botonwhatsapp-anim-css')) {
    const style = document.createElement('style');
    style.id = 'botonwhatsapp-anim-css';
    style.textContent = `
      .boton-whatsapp,
      .btn-verde.btn-aloja {
        position: fixed !important;
        right: 20px !important;
        bottom: 20px !important;
        z-index: 1000 !important;
        width: 50px !important;
        height: 50px !important;
        min-width: 50px !important;
        min-height: 50px !important;
        border-radius: 50% !important;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        display: flex !important;
        align-items: center;
        justify-content: center;
        background: #28a745 !important;
        cursor: pointer;
        padding: 0 !important;
        border: none !important;
        font-size: 0 !important;
        transition: box-shadow 0.2s, background 0.2s;
      }
      .boton-whatsapp img,
      .btn-verde.btn-aloja img {
        width: 40px !important;
        height: 40px !important;
        object-fit: contain;
        display: block;
      }
      .boton-whatsapp:hover,
      .btn-verde.btn-aloja:hover {
        background: #218838 !important;
        box-shadow: 0 6px 18px #21883855;
      }
      .anim-right {
        opacity: 0;
        transform: translateX(60px);
        transition: opacity 0.8s, transform 0.8s cubic-bezier(.4,2,.6,1);
      }
      .anim-visible {
        opacity: 1 !important;
        transform: translateX(0) translateY(0) !important;
      }
      @media (max-width: 1200px) and (min-width: 601px) {
        .boton-whatsapp,
        .btn-verde.btn-aloja {
          width: 70px !important;
          height: 70px !important;
          min-width: 70px !important;
          min-height: 70px !important;
          right: 20px !important;
          bottom: 20px !important;
        }
        .boton-whatsapp img,
        .btn-verde.btn-aloja img {
          width: 56px !important;
          height: 56px !important;
        }
      }
      @media (max-width: 600px) {
        .boton-whatsapp,
        .btn-verde.btn-aloja {
          width: 48px !important;
          height: 48px !important;
          min-width: 48px !important;
          min-height: 48px !important;
          right: 16px !important;
          bottom: 16px !important;
        }
        .boton-whatsapp img,
        .btn-verde.btn-aloja img {
          width: 36px !important;
          height: 36px !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  setTimeout(() => {
    boton.classList.add('anim-visible');
  }, 100);

  return document.createElement('div');
}