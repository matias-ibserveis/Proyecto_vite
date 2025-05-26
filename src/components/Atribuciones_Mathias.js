export function Atribuciones_Mathias() {
  const div = document.createElement("div");
  div.style.display = "flex";
  div.style.flexDirection = "column";
  div.style.alignItems = "center";
  div.style.justifyContent = "center";
  div.style.background = "#f7f7f7";
  div.style.color = "#1aa12c";
  div.style.borderRadius = "18px";
  div.style.boxShadow = "0 0 32px 0 #ccc";
  div.style.textAlign = "center";
  div.style.padding = "20px";

  div.innerHTML = `
    <h1 style="margin-bottom: 0.7em; font-size: 0.9em;"><b>2025 FempoMatias. Todos los derechos reservados.</b></h1>
    <a href="https://creativecommons.org/licenses/by-nd/4.0/" target="_blank" rel="noopener noreferrer" style="margin-bottom: 1em;">
      <img src="images/CCLicense.png" alt="Licencia Creative Commons" style="border: 2px solid #cccccc83; border-radius: 8px; padding: 2px;" />
    </a>
  `;
  return div;
}