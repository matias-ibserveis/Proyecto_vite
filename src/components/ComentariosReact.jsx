import React from 'react';
import './comentarios-react.css'; // Importamos nuestro CSS personalizado

const comentarios = [
  {
    usuario: 'Ana',
    texto: 'Excelente atención y servicio.',
    avatar: 'https://i.pravatar.cc/100?img=1'
  },
  {
    usuario: 'Luis',
    texto: 'Buenos precios y productos actualizados.',
    avatar: 'https://i.pravatar.cc/100?img=2'
  },
  {
    usuario: 'Marta',
    texto: 'Recibí mi pedido en solo 2 días. ¡Genial!',
    avatar: 'https://i.pravatar.cc/100?img=3'
  }
];

export function ComentariosReact() {
  return (
    <div className="container mt-4">
      <h4 className="mb-3">Últimos comentarios</h4>
      <div className="comentarios-grid">
        {comentarios.map((comentario, index) => (
          <div key={index} className="card comentario-card">
            <div className="card-body d-flex align-items-center">
              <img src={comentario.avatar} alt={comentario.usuario} className="avatar-img me-3" />
              <div>
                <h6 className="card-title mb-1">{comentario.usuario}</h6>
                <p className="card-text small">{comentario.texto}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ComentariosReact; // Exportar como default