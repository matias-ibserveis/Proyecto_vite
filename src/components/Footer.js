export function Footer() {
  const frame = document.createElement('div');
  frame.className = 'final_legal';
  frame.style = `
    text-align:center;
    color:#d1ab72;
    font-size:0.95em;
    box-shadow:0 0 32px 0 #ccc;
    width:100%;
    position:relative;
    left:50%;
    transform:translateX(-50%);
    background:#d1ab72;
    padding: 1em 0;
    border-radius: 18px;
    margin-top: 2em;
    
  `;
  frame.innerHTML = `
    <div>
      <a href="/Avisos-Legales.html"
         style="margin:0 1em; background:#00000023; border-radius:6px; padding:0.4em 0.9em; color:#fff; text-decoration:none; display:inline-block; transition:filter 0.2s, transform 0.2s;"
         onmouseenter="this.style.filter='brightness(2)'; this.style.transform='scale(1.13)'"
         onmouseleave="this.style.filter='brightness(1)'; this.style.transform='scale(1)'"
      >Avisos Legales</a>
      <a href="/Política-Cookies.html"
         style="margin:0 1em; background:#00000023; border-radius:6px; padding:0.4em 0.9em; color:#fff; text-decoration:none; display:inline-block; transition:filter 0.2s, transform 0.2s;"
         onmouseenter="this.style.filter='brightness(2)'; this.style.transform='scale(1.13)'"
         onmouseleave="this.style.filter='brightness(1)'; this.style.transform='scale(1)'"
      >Política Cookies</a>
      <a href="/Política-Reembolsos.html"
         style="margin:0 1em; background:#00000023; border-radius:6px; padding:0.4em 0.9em; color:#fff; text-decoration:none; display:inline-block; transition:filter 0.2s, transform 0.2s;"
         onmouseenter="this.style.filter='brightness(2)'; this.style.transform='scale(1.13)'"
         onmouseleave="this.style.filter='brightness(1)'; this.style.transform='scale(1)'"
      >Política-Reembolso</a>
      <a href="/Privacidad.html"
         style="margin:0 1em; background:#00000023; border-radius:6px; padding:0.4em 0.9em; color:#fff; text-decoration:none; display:inline-block; transition:filter 0.2s, transform 0.2s;"
         onmouseenter="this.style.filter='brightness(2)'; this.style.transform='scale(1.13)'"
         onmouseleave="this.style.filter='brightness(1)'; this.style.transform='scale(1)'"
      >Privacidad</a>
      <a href="/Términos-Condiciones.html"
         style="margin:0 1em; background:#00000023; border-radius:6px; padding:0.4em 0.9em; color:#fff; text-decoration:none; display:inline-block; transition:filter 0.2s, transform 0.2s;"
         onmouseenter="this.style.filter='brightness(2)'; this.style.transform='scale(1.13)'"
         onmouseleave="this.style.filter='brightness(1)'; this.style.transform='scale(1)'"
      >Términos y Condiciones</a>
    </div>
    <div style="display:flex; justify-content:center; align-items:center; gap:3em; margin-top:2em;">
      <a href="https://www.instagram.com/lura.mallorca/?hl=es" target="_blank" rel="noopener" title="Instagram" style="display:inline-block;">
        <img
          src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg"
          alt="Instagram"
          style="width:54px; height:54px; filter:invert(1) brightness(0.9); transition:filter 0.2s, transform 0.2s;"
          onmouseenter="this.style.filter='invert(1) brightness(2)'; this.style.transform='scale(1.13)'"
          onmouseleave="this.style.filter='invert(1) brightness(0.9)'; this.style.transform='scale(1)'"
        />
      </a>
    </div>
  `;
  return frame;
}