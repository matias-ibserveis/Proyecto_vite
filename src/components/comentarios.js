export function Comentarios() {
  // Crear contenedor principal
  const container = document.createElement("section");
  container.className = "comentarios";
  container.innerHTML = `<h2>Comentarios de Usuarios</h2><p>Cargando...</p>`;

  // Función para cargar usuarios
  async function cargarUsuarios() {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const users = await response.json();

      const cards = document.createElement("div");
      cards.className = "user-cards";

      users.forEach((user) => {
        const card = document.createElement("div");
        card.className = "user-card";

        card.innerHTML = `
          <img src="https://i.pravatar.cc/150?img=${user.id}" alt="${user.name}" class="user-avatar" />
          <div class="user-info">
            <h4>${user.name}</h4>
            <p>${user.email}</p>
            <p>${user.address.city}</p>
          </div>
        `;

        cards.appendChild(card);
      });

      container.querySelector("p").remove();
      container.appendChild(cards);
    } catch (error) {
      container.querySelector("p").textContent = "Error al cargar comentarios.";
      console.error("Error al obtener usuarios:", error);
    }
  }

  cargarUsuarios();



  // CSS al final del documento
  if (!document.getElementById("comentarios-css")) {
    const style = document.createElement("style");
    style.id = "comentarios-css";
    document.body.appendChild(style);
    
    style.textContent = `
.comentarios {
  padding: 2rem;
  background: #f9f9f9;
}

.user-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.user-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  padding: 1rem;
  width: 250px;
  text-align: center;
  transition: transform 0.2s;
}

.user-card:hover {
  transform: scale(1.03);
}

.user-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.5rem;
}

.user-info h4 {
  margin: 0.5rem 0 0.2rem;
}

.user-info p {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
}
    `;
  }

  return container;
}
