// iaModal.js

let preguntaExtraCount = 0;
let productoActivo = null;

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
        <div id="spinnerIA" style="display:none; margin-top:1rem; align-self:center;">
          <div style="
            width: 2rem; height: 2rem; border: 6px solid #ccc; border-top: 3px solid #007bff;
            border-radius: 50%; animation: spin 1s linear infinite;
          "></div>
        </div>
        <hr>
        <h5 id="titulo">Haz una pregunta a chatGPT:</h5>
        <textarea id="preguntaExtra" class="form-control" rows="3" maxlength="300" placeholder=" ..."></textarea>
        <button id="enviarPreguntaIA" class="btn btn-primary mt-2">Preguntar</button>
        <div id="respuestaExtra" class="mt-3 text-primary" style="line-height: 1.5;"></div>
      </div>
    `;
    document.body.appendChild(modal);

    const aviso = document.createElement("div");
    aviso.id = "iaAviso";
    aviso.style = `
        display: none;
        position: fixed;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%);
        background-color: #f0f0f0;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 1100;
        font-size: 0.95rem;
        color: #333;
      `;
    aviso.textContent = "Esperando la respuesta de chatGPT  😊";
    document.body.appendChild(aviso);


    // Añadir animación al head una sola vez
    if (!document.getElementById("spinnerStyle")) {
      const style = document.createElement("style");
      style.id = "spinnerStyle";
      style.textContent = `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
    }

    modal.querySelector("#cerrarIA").addEventListener("click", () => {
      modal.style.display = "none";
      preguntaExtraCount = 0;
      modal.querySelector("#respuestaExtra").textContent = "";
      modal.querySelector("#preguntaExtra").value = "";
      modal.querySelector("#preguntaExtra").style.display = "block";
      modal.querySelector("#enviarPreguntaIA").style.display = "inline-block";
    });

    // Evento de la pregunta adicional
    modal.querySelector("#enviarPreguntaIA").addEventListener("click", async () => {
      if (preguntaExtraCount >= 1) return;

      const pregunta = modal.querySelector("#preguntaExtra").value.trim();
      if (!pregunta) return;

      const btn = modal.querySelector("#enviarPreguntaIA");
      const aviso = document.getElementById("iaAviso");
      const spinner = modal.querySelector("#spinnerIA");

      btn.disabled = true;
      btn.textContent = "Preguntando...";
      spinner.style.display = "block";
      aviso.style.display = "none";

      let esperando = true;
      const timeoutId = setTimeout(() => {
        if (esperando) aviso.style.display = "block";
      }, 3000); 

      try {
        const resp = await fetch('https://proyectorailway-production-9739.up.railway.app/api/chat', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            descripcion: pregunta,
            esPrimeraPregunta: false
          })
        });

        esperando = false;
        clearTimeout(timeoutId);
        aviso.style.display = "none";
        spinner.style.display = "none";

        const data = await resp.json();

        modal.querySelector("#titulo").textContent = "Respuesta";

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
        esperando = false;
        clearTimeout(timeoutId);
        aviso.style.display = "none";
        spinner.style.display = "none";
        modal.querySelector("#respuestaExtra").textContent = "❌ Error al contactar con la IA";
        console.error(err);
      } finally {
        btn.disabled = false;
        btn.textContent = "Preguntar";
        spinner.style.display = "none";
      }
    });

  }
}
export async function mostrarRespuestaIA(producto) {
  productoActivo = producto;
  const modal = document.querySelector("#iaModal");
  const iaTexto = modal.querySelector("#iaTexto");
  const spinner = modal.querySelector("#spinnerIA");
  const aviso = document.getElementById("iaAviso");

  // Limpiar estado anterior
  iaTexto.textContent = "⏳ Consultando a la IA...";
  spinner.style.display = "block";
  aviso.style.display = "none";
  modal.querySelector("#respuestaExtra").textContent = "";
  modal.querySelector("#preguntaExtra").value = "";
  modal.querySelector("#preguntaExtra").style.display = "block";
  modal.querySelector("#enviarPreguntaIA").style.display = "inline-block";
  modal.querySelector("#titulo").textContent = "Haz una pregunta a chatGPT:";
  preguntaExtraCount = 0;

  modal.style.display = "flex";

  let esperandoMensaje = true;

  const timeoutId = setTimeout(() => {
    if (esperandoMensaje) {
      aviso.style.display = "block";
    }
  }, 3000);

  try {
    const res = await fetch('https://proyectorailway-production-9739.up.railway.app/api/chat', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        descripcion: producto.descripcion,
        esPrimeraPregunta: true
      })
    });

    esperandoMensaje = false;
    clearTimeout(timeoutId);
    aviso.style.display = "none";
    spinner.style.display = "none"; // ✅ Asegúrate de ocultarlo aquí

    if (!res.ok) {
      throw new Error("Respuesta no válida del servidor");
    }

    const data = await res.json();

    iaTexto.innerHTML = `${data.respuesta
      .split("\n")
      .filter(p => p.trim() !== "")
      .map(p => `<p style="margin-top: 1rem;">${p.trim()}</p>`)
      .join("")}`;
  } catch (error) {
    esperandoMensaje = false;
    clearTimeout(timeoutId);
    aviso.style.display = "none";
    spinner.style.display = "none"; //  También en el catch
    iaTexto.textContent = " No se puede obtener respuesta de la IA";
    console.error(error);
  }
}
