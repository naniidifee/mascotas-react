import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import mascotasApi from '../../api/api';

const MascotaDetalle = () => {
  const { id } = useParams();
  const [mascota, setMascota] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  
  // Estados para los comentarios
  const [comentarios, setComentarios] = useState([]);
  const [autor, setAutor] = useState("");
  const [contenido, setContenido] = useState("");

  // Función para obtener el detalle de la mascota y sus comentarios
  const obtenerDetalle = async () => {
    try {
      const respuesta = await mascotasApi.get(`mascotas/${id}/`);
      setMascota(respuesta.data);
      if (respuesta.data.comentarios) {
        setComentarios(respuesta.data.comentarios);
      }
    } catch (error) {
      if (error.response?.status === 400) {
        setError("Los datos enviados no son válidos (Error 400).");
      } else if (error.response?.status === 404) {
        setError("La mascota no fue encontrada (Error 404).");
      } else {
        setError("Ocurrió un error inesperado al conectar con el servidor.");
      }
      console.error("Error mascota:", error.response?.data);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerDetalle();
  }, [id]);

  // Función para agregar comentario con manejo de errores 400 y 404
  const agregarComentario = async (e) => {
    e.preventDefault();
    try {
      await mascotasApi.post(`mascotas/${id}/comentar/`, {
        autor,
        contenido
      });
      setAutor("");
      setContenido("");
      obtenerDetalle(); // Refrescamos el detalle para ver el nuevo comentario
    } catch (error) {
      if (error.response?.status === 400) {
        alert("Datos inválidos o campos requeridos faltantes (Error 400).");
      } else if (error.response?.status === 404) {
        alert("Mascota no encontrada para comentar (Error 404).");
      } else {
        alert("Error al agregar comentario.");
      }
      console.log("Error comentario:", error.response?.data);
    }
  };

  // Función para eliminar comentario con manejo de error 404
  const eliminarComentario = async (comentarioId) => {
    try {
      await mascotasApi.delete(`comentarios/${comentarioId}/`);
      obtenerDetalle(); // Refrescamos el detalle para quitar el comentario eliminado
    } catch (error) {
      if (error.response?.status === 404) {
        alert("Comentario no encontrado (Error 404).");
      } else {
        alert("Error al eliminar comentario.");
      }
      console.log("Error eliminar:", error.response?.data);
    }
  };

  if (cargando) return <p>Cargando detalle...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!mascota) return <p>Mascota no encontrada.</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <Link to="/mascotas/" style={{ display: 'inline-block', marginBottom: '20px' }}>
        ← Volver al listado
      </Link>
      
      {mascota.imagen && (
        <img 
          src={mascota.imagen} 
          alt={mascota.nombre} 
          style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px' }} 
        />
      )}

      <h2 style={{ textTransform: 'capitalize' }}>{mascota.nombre}</h2>
      <p><strong>Tipo:</strong> {mascota.tipo_animal}</p>
      <p><strong>Estado:</strong> {mascota.estado}</p>
      <p><strong>Raza:</strong> {mascota.raza}</p>
      <p><strong>Edad:</strong> {mascota.edad} años</p>
      <p><strong>Tamaño:</strong> {mascota.tamano}</p>
      <p><strong>Descripción:</strong> {mascota.descripcion}</p>

      <hr style={{ margin: '30px 0' }} />

      {/* SECCIÓN DE COMENTARIOS */}
      <h3>Comentarios asociados</h3>
      {comentarios && comentarios.length > 0 ? (
        <ul style={{ paddingLeft: '20px' }}>
          {comentarios.map((comentario) => (
            <li key={comentario.id} style={{ marginBottom: '10px' }}>
              <p><strong>{comentario.autor}:</strong> {comentario.contenido}</p>
              <button 
                onClick={() => eliminarComentario(comentario.id)}
                style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '4px 8px', cursor: 'pointer', borderRadius: '4px' }}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Esta mascota no tiene comentarios asociados aún.</p>
      )}

      {/* FORMULARIO PARA AGREGAR COMENTARIO */}
      <form onSubmit={agregarComentario} style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h4>Agregar un comentario</h4>
        <input 
          type="text" 
          placeholder="Tu nombre (Autor)" 
          value={autor} 
          onChange={(e) => setAutor(e.target.value)} 
          required 
          style={{ padding: '8px' }}
        />
        <textarea 
          placeholder="Escribe tu comentario..." 
          value={contenido} 
          onChange={(e) => setContenido(e.target.value)} 
          required 
          style={{ padding: '8px', minHeight: '60px' }}
        />
        <button 
          type="submit" 
          style={{ padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
        >
          Enviar Comentario
        </button>
      </form>
    </div>
  );
};

export default MascotaDetalle;