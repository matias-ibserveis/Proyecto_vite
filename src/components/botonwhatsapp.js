export function BotonVerde() {
  const boton = document.createElement('button');
  boton.className = 'btn-verde btn-aloja anim-right';
  boton.title = 'Chatea por WhatsApp';
  boton.style.position = 'fixed';
  boton.style.right = '20px';
  boton.style.bottom = '20px';
  boton.style.zIndex = '1000';
  boton.style.backgroundColor = 'rgba(0, 128, 0, 0.8)'; // Verde con opacidad
  boton.style.color = 'white';
  boton.style.padding = '10px 10px';
  boton.style.border = 'none';
  boton.style.borderRadius = '50%';
  boton.style.fontSize = '0';
  boton.style.cursor = 'pointer';
  boton.style.display = 'flex';
  boton.style.alignItems = 'center';
  boton.style.justifyContent = 'center';
  boton.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
  boton.innerHTML = `<img src="images/whatsapp.png" alt="WhatsApp" style="width:40px; height:40px;">`;

  boton.onclick = () => window.open("https://wa.me/34613959689", "_blank");

  document.body.appendChild(boton);

  // Animación desde la derecha
  setTimeout(() => {
    boton.classList.add('anim-visible');
  }, 100);

  // Asegura que el CSS de animación esté presente
  if (!document.getElementById('botonwhatsapp-anim-css')) {
    const style = document.createElement('style');
    style.id = 'botonwhatsapp-anim-css';
    style.textContent = `
      .anim-right {
        opacity: 0;
        transform: translateX(60px);
        transition: opacity 0.8s, transform 0.8s cubic-bezier(.4,2,.6,1);
      }
      .anim-visible {
        opacity: 1 !important;
        transform: translateX(0) translateY(0) !important;
      }
    `;
    document.head.appendChild(style);
  }

  return document.createElement('div');
}