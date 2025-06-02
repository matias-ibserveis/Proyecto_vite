export function Atribuciones_Mathias() {
  const div = document.createElement("div");
  div.style.display = "flex";
  div.style.flexDirection = "column";
  div.style.alignItems = "center";
  div.style.justifyContent = "center";
  div.style.background = "rgba(209, 171, 114, 1)"; // #d1ab72 en rgba
  div.style.color = "#fff";
  div.style.textAlign = "center";
  div.style.width = "100%";

  div.innerHTML = `
    <div style="
      width: 100vw;
      max-width: 100%;
      background: rgba(0,0,0,0.45);
      margin-left: calc(-50vw + 50%);
      margin-right: calc(-50vw + 50%);
      padding: 0;
    ">
      <h1 style="margin: 0; font-size: 0.9em;">
        <b>2025 FempoMatias. Todos los derechos reservados.</b>
      </h1>
      <a href="https://creativecommons.org/licenses/by-nd/4.0/" target="_blank" rel="noopener noreferrer" style="display:block; margin:0;">
        <img 
          src="images/CCLicense.png" 
          alt="Licencia Creative Commons" 
          style="width: 100%; display: block; margin: 0;"
        />
      </a>
      <h1 style="margin: 0; font-size: 0.9em;">
        <b>2025 FempoMatias. Todos los derechos reservados.</b>
      </h1>
    </div>
  `;
  return div;
}