export function BotonVerde() {
  // Botón principal (WhatsApp)
  const boton = document.createElement('button');
  boton.className = 'btn-verde btn-aloja';
  boton.textContent = 'Contáctanos por WhatsApp';
  boton.onclick = () => {
    window.location.href = "https://wa.me/34613959689";
  };
  boton.style.position = 'fixed';
  boton.style.right = '20px';
  boton.style.bottom = '20px';
  boton.style.zIndex = '1000';
  boton.style.backgroundColor = '#28a745';
  boton.style.color = 'white';
  boton.style.padding = '10px 20px';
  boton.style.border = 'none';
  boton.style.borderRadius = '5px';
  boton.style.fontSize = '16px';
  boton.style.cursor = 'pointer';
  boton.style.fontFamily = "'Aloja Extended', sans-serif";
  boton.style.transition = 'transform 0.3s, opacity 0.3s';
  boton.onmouseover = () => boton.style.backgroundColor = '#218838';
  boton.onmouseout = () => boton.style.backgroundColor = '#28a745';

  // Botón pequeño para mostrar/ocultar
  const toggleBtn = document.createElement('button');
  toggleBtn.innerHTML = '<img src="images/whatsapp.png" alt="Mostrar/Ocultar" style="width: 25px; height: 25px;">';
  toggleBtn.title = 'Ocultar botón WhatsApp';
  toggleBtn.style.position = 'fixed';
  toggleBtn.style.right = '280px'; // Posición inicial
  toggleBtn.style.bottom = '25px';
  toggleBtn.style.zIndex = '1001';
  toggleBtn.style.backgroundColor = '#cccccc';
  toggleBtn.style.color = '#333';
  toggleBtn.style.border = 'none';
  toggleBtn.style.borderRadius = '50%';
  toggleBtn.style.width = '32px';
  toggleBtn.style.height = '32px';
  toggleBtn.style.fontSize = '18px';
  toggleBtn.style.cursor = 'pointer';
  toggleBtn.style.fontFamily = "'Aloja Extended', sans-serif";
  toggleBtn.style.display = 'flex';
  toggleBtn.style.alignItems = 'center';
  toggleBtn.style.justifyContent = 'center';
  toggleBtn.style.transition = 'right 0.3s'; // <-- animación para deslizar

  let visible = true;
  boton.style.transform = 'translateX(0)';
  boton.style.opacity = '1';

  toggleBtn.onclick = () => {
    visible = !visible;
    toggleBtn.title = visible ? 'Ocultar botón WhatsApp' : 'Mostrar botón WhatsApp';
    toggleBtn.innerHTML = '<img src="images/whatsapp.png" alt="Mostrar/Ocultar" style="width: 25px; height: 25px;">';
    // Esta línea ahora se animará suavemente
    toggleBtn.style.right = visible ? '285px' : '20px';

    if (visible) {
      boton.style.transform = 'translateX(0)';
      boton.style.opacity = '1';
      boton.style.pointerEvents = 'auto';
    } else {
      boton.style.transform = 'translateX(120%)';
      boton.style.opacity = '0';
      boton.style.pointerEvents = 'none';
    }
  };

  // Añade ambos botones directamente al body
  document.body.appendChild(boton);
  document.body.appendChild(toggleBtn);

  // Devuelve un elemento vacío para mantener la compatibilidad con el sistema de componentes
  return document.createElement('div');
}