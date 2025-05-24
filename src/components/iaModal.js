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

        <hr>
        <h5 id="titulo">Haz pregunta a la IA:</h5>
        <textarea id="preguntaExtra" class="form-control" rows="3" maxlength="300" placeholder=" ..."></textarea>
        <button id="enviarPreguntaIA" class="btn btn-primary mt-2">Preguntar</button>
        <div id="respuestaExtra" class="mt-3 text-primary" style="line-height: 1.5;"></div>
      </div>
    `;
    document.body.appendChild(modal);

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
      btn.disabled = true;
      btn.textContent = "Preguntando...";

      try {
        const resp = await fetch('https://proyectorailway-production-9739.up.railway.app/api/chat', {
        //const resp = await fetch("http://localhost:3000/api/chat", {
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
  const iaTexto = modal.querySelector("#iaTexto");

  iaTexto.textContent = "⏳ Consultando a la IA...";

  try {
    const res = await fetch('https://proyectorailway-production-9739.up.railway.app/api/chat', {
    //const res = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        descripcion: producto.descripcion,
        esPrimeraPregunta: true
      })
    });
    //console.log("res", res)
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

  document.querySelector("#iaModal").style.display = "flex";
}
