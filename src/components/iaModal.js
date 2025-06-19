// iaModal.js

let preguntaExtraCount = 0;
let productoActivo = null;

// --- INYECTA CSS DE ANIMACIÓN SOLO UNA VEZ ---
if (!document.getElementById('ia-popup-anim-style')) {
  const style = document.createElement('style');
  style.id = 'ia-popup-anim-style';
  style.textContent = `
.ia-popup {
  animation: suaveIn 0.7s cubic-bezier(.4,0,.2,1) both;
}
@keyframes suaveIn {
  0%   { opacity: 0; transform: translateY(-40px) scale(0.85);}
  100% { opacity: 1; transform: translateY(0) scale(1);}
}
.ia-popup-out {
  animation: suaveOut 0.5s cubic-bezier(.4,0,.2,1) both;
}
@keyframes suaveOut {
  0%   { opacity: 1; transform: translateY(0) scale(1);}
  100% { opacity: 0; transform: translateY(40px) scale(0.85);}
}
`;
  document.head.appendChild(style);
}

export function crearModalIA() {
  let modal = document.querySelector("#iaModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "iaModal";
    modal.style = `
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      background-color: rgba(0,0,0,0.5); display: none; align-items: center; justify-content: center; z-index: 1000;
    `;
    modal.innerHTML = `
        <div id="iaContent" style="
          background: white; padding: 1rem; border-radius: 8px; max-width: 600px;
           width: 90%; max-height: 90vh; overflow-y: auto; display: flex; flex-direction: column;
        ">
        <button id="cerrarIA" style="float:right; font-size:1.2rem;">✖️</button>
        <div id="iaTexto" style="margin-top: 1.5rem;"></div>

        <hr>
        <h5 id="titulo">Haz pregunta a la IA:</h5>
        <textarea id="preguntaExtra" class="form-control" rows="3" maxlength="300" placeholder=" ..."></textarea>
        <button id="enviarPreguntaIA" class="btn btn-primary mt-2">Preguntar</button>
        <div id="respuestaExtra" class="mt-3 text-primary" style="line-height: 1.5;"></div>
      </div>
    `;
    document.body.appendChild(modal);

    // Cerrar con animación
    modal.querySelector("#cerrarIA").addEventListener("click", () => {
      const iaContent = modal.querySelector("#iaContent");
      iaContent.classList.remove('ia-popup');
      iaContent.classList.add('ia-popup-out');
      setTimeout(() => {
        modal.style.display = "none";
        iaContent.classList.remove('ia-popup-out');
        preguntaExtraCount = 0;
        modal.querySelector("#respuestaExtra").textContent = "";
        modal.querySelector("#preguntaExtra").value = "";
        modal.querySelector("#preguntaExtra").style.display = "block";
        modal.querySelector("#enviarPreguntaIA").style.display = "inline-block";
      }, 500); // Debe coincidir con la duración de boingOut
    });

    // Evento de la pregunta adicional
    modal.querySelector("#enviarPreguntaIA").addEventListener("click", async () => {
      if (preguntaExtraCount >= 1) return;

      const pregunta = modal.querySelector("#preguntaExtra").value.trim();
      if (!pregunta) return;

      const btn = modal.querySelector("#enviarPreguntaIA");
      btn.disabled = true;
      btn.textContent = "Preguntando...";

      try {
        const resp = await fetch('https://proyectorailway-production-9739.up.railway.app/api/chat', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            descripcion: pregunta,
            esPrimeraPregunta: false
          })
        });
        const data = await resp.json();

        modal.querySelector("#titulo").textContent = "Respuesta"

        const parrafos = data.respuesta
          .split("\n")
          .filter(p => p.trim() !== "")
          .map(p => `<p style="margin-top: 1rem;">${p.trim()}</p>`)
          .join("");
        modal.querySelector("#respuestaExtra").innerHTML = `${parrafos}`;

        modal.querySelector("#preguntaExtra").value = "";
        preguntaExtraCount++;

        if (preguntaExtraCount >= 1) {
          modal.querySelector("#preguntaExtra").style.display = "none";
          modal.querySelector("#enviarPreguntaIA").style.display = "none";
        }

      } catch (err) {
        modal.querySelector("#respuestaExtra").textContent = "❌ Error al contactar con la IA";
        console.error(err);
      } finally {
        btn.disabled = false;
        btn.textContent = "Preguntar";
      }
    });
  }
}

export async function mostrarRespuestaIA(producto) {
  productoActivo = producto;
  const modal = document.querySelector("#iaModal");
  const iaContent = modal.querySelector("#iaContent");
  const iaTexto = modal.querySelector("#iaTexto");

  iaTexto.textContent = "⏳ Consultando a la IA...";

  try {
    const res = await fetch('https://proyectorailway-production-9739.up.railway.app/api/chat', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        descripcion: producto.descripcion,
        esPrimeraPregunta: true
      })
    });
    const data = await res.json();
    iaTexto.innerHTML = `${data.respuesta
      .split("\n")
      .filter(p => p.trim() !== "")
      .map(p => `<p style="margin-top: 1rem;">${p.trim()}</p>`)
      .join("")}`;
  } catch (error) {
    iaTexto.textContent = "❌ Error al obtener respuesta de la IA";
    console.error(error);
  }

  // Animación de entrada tipo "boing"
  iaContent.classList.remove('ia-popup-out');
  iaContent.classList.add('ia-popup');
  modal.style.display = "flex";
}