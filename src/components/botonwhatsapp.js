export function BotonVerde() {
  // Botón principal (WhatsApp)
  const boton = document.createElement('button');
  boton.className = 'btn-verde btn-aloja';
  boton.textContent = 'Contáctanos por WhatsApp';
  boton.onclick = () => window.location.href = "https://wa.me/34613959689";
  Object.assign(boton.style, {
    position:   'fixed',
    right:      '20px',
    bottom:     '20px',   // posición vertical del botón principal
    zIndex:     '1000',
    backgroundColor: '#28a745',
    color:      'white',
    padding:    '10px 20px',
    border:     'none',
    borderRadius: '5px',
    fontSize:   '16px',
    cursor:     'pointer',
    fontFamily: "'Aloja Extended', sans-serif",
    transition: 'transform 0.3s, opacity 0.3s'
  });
  boton.addEventListener('mouseover', () => boton.style.backgroundColor = '#218838');
  boton.addEventListener('mouseout',  () => boton.style.backgroundColor = '#28a745');

  // Botón pequeño (toggle)
  const toggleBtn = document.createElement('button');
  toggleBtn.innerHTML = '<img src="images/whatsapp.png" alt="Mostrar/Ocultar" style="width:25px; height:25px;">';
  toggleBtn.title = 'Ocultar botón WhatsApp';
  Object.assign(toggleBtn.style, {
    position:        'fixed',
    zIndex:          '1001',
    backgroundColor: '#cccccc',
    border:          'none',
    borderRadius:    '50%',
    width:           '32px',
    height:          '32px',
    cursor:          'pointer',
    display:         'flex',
    alignItems:      'center',
    justifyContent:  'center',
    transition:      'right 0.3s, transform 0.3s, opacity 0.3s'
  });

  let visible = true;
  boton.style.transform = 'translateX(0)';
  boton.style.opacity   = '1';

  function ajustarBotoncito() {
    const isMobile    = window.innerWidth <= 600;
    const botonWidth  = boton.offsetWidth || 120;
    const toggleWidth = toggleBtn.offsetWidth || 32;
    const gap         = 10;  // separación en px

    if (isMobile) {
      // --- Móvil ---
      // Mantener el botón principal en la esquina
      boton.style.right  = '20px';
      boton.style.bottom = '20px';

      // Centrar el toggle horizontalmente sobre el botón principal
      // Calculamos un right que sea:
      //   right = 20px (margen) + (ancho principal - ancho toggle)/2
      const centeredRight = 20 + (botonWidth - toggleWidth) / 2;
      toggleBtn.style.right  = `${centeredRight}px`;

      // Posición vertical del toggle
      toggleBtn.style.bottom = '25px'
      toggleBtn.style.left = "30px";

    } else {
      // --- Escritorio ---
      boton.style.right  = '20px';
      boton.style.bottom = '20px';

      toggleBtn.style.right  = visible
        ? `${20 + botonWidth + gap}px`
        : '20px';
      toggleBtn.style.bottom = '25px';
    }

    // Mostrar u ocultar animado del botón principal
    if (visible) {
      boton.style.transform = 'translateX(0)';
      boton.style.opacity   = '1';
    } else {
      boton.style.transform = 'translateX(120%)';
      boton.style.opacity   = '0';
    }
  }

  // Inicializar y escuchar cambios de tamaño/orientación
  setTimeout(ajustarBotoncito, 0);
  window.addEventListener('resize', ajustarBotoncito);
  window.addEventListener('orientationchange', ajustarBotoncito);

  // Toggle on/off
  toggleBtn.onclick = () => {
    visible = !visible;
    toggleBtn.title = visible
      ? 'Ocultar botón WhatsApp'
      : 'Mostrar botón WhatsApp';
    ajustarBotoncito();
  };

  // Añadir ambos botones al DOM
  document.body.appendChild(boton);
  document.body.appendChild(toggleBtn);

  return document.createElement('div');
}