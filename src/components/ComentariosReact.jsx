import React, { useEffect, useState } from 'react';
import './comentarios-react.css';

function ComentariosReact() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Llamada a la API para obtener los usuarios
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Comentarios de Usuarios</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="user-cards">
          {users.map((user) => (
            <div className="user-card" key={user.id}>
              {/* Imagen de usuario (usando pravatar.cc) */}
              <img
                src={`https://i.pravatar.cc/150?img=${user.id}`}
                alt={user.name}
                className="user-avatar"
              />
              <div className="user-info">
                <h4>{user.name}</h4>
                <p>{user.email}</p>
                <p>{user.address.city}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ComentariosReact;
