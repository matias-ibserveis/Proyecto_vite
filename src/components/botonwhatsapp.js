export function BotonVerde() {
  // Colores
  const PRIMARY_COLOR = '#28a745';
  const SECONDARY_COLOR = '#218838';

  // Botón principal (WhatsApp)
  const boton = document.createElement('button');
  boton.className = 'btn-verde btn-aloja';
  boton.textContent = 'WhatsApp';
  boton.onclick = () => window.location.href = "https://wa.me/34613959689";
  Object.assign(boton.style, {
    position: 'fixed',
    right: '20px',
    bottom: '20px',
    zIndex: '1000',
    backgroundColor: PRIMARY_COLOR,
    color: 'white',
    padding: '20px 20px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    fontFamily: "'Aloja Extended', sans-serif",
    transition: 'transform 0.3s, opacity 0.3s'
  });
  boton.addEventListener('mouseover', () => boton.style.backgroundColor = SECONDARY_COLOR);
  boton.addEventListener('mouseout',  () => boton.style.backgroundColor = PRIMARY_COLOR);

  // Botón pequeño (toggle)
  const toggleBtn = document.createElement('button');
  toggleBtn.innerHTML = '<img src="images/whatsapp.png" alt="Mostrar/Ocultar" style="width:25px; height:25px;">';
  toggleBtn.title = 'Ocultar botón WhatsApp';
  toggleBtn.className = 'toggle-boton';
  Object.assign(toggleBtn.style, {
    position: 'fixed',
    zIndex: '1001',
    backgroundColor: PRIMARY_COLOR, // color primario
    border: 'none',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.3s ease'
  });

  // Animación de color al pulsar (cambia a secundario y vuelve solo a primario)
  toggleBtn.addEventListener('pointerdown', () => {
    toggleBtn.style.backgroundColor = SECONDARY_COLOR;
    setTimeout(() => {
      toggleBtn.style.backgroundColor = PRIMARY_COLOR;
    }, 150);
  });

  let visible = true;

  function ajustarBotoncito() {
    const isMobile = window.innerWidth <= 600;
    const botonWidth = boton.offsetWidth || 120;
    const gap = 10;

    boton.style.right = '20px';
    boton.style.bottom = '20px';

    if (isMobile) {
      toggleBtn.style.left = '20px';
      toggleBtn.style.bottom = '20px';
      toggleBtn.style.right = '';
    } else {
      toggleBtn.style.right = visible ? `${20 + botonWidth + gap}px` : '20px';
      toggleBtn.style.bottom = '25px';
      toggleBtn.style.left = '';
    }

    if (visible) {
      boton.style.transform = 'translateX(0)';
      boton.style.opacity = '1';
    } else {
      boton.style.transform = 'translateX(120%)';
      boton.style.opacity = '0';
    }
  }

  setTimeout(ajustarBotoncito, 0);
  window.addEventListener('resize', ajustarBotoncito);
  window.addEventListener('orientationchange', ajustarBotoncito);

  toggleBtn.onclick = () => {
    visible = !visible;
    toggleBtn.title = visible
      ? 'Ocultar botón WhatsApp'
      : 'Mostrar botón WhatsApp';
    ajustarBotoncito();
  };

  document.body.appendChild(boton);
  document.body.appendChild(toggleBtn);

  return document.createElement('div');
}