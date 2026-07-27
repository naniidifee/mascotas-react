import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import mascotasApi from '../../api/api';

const MascotaDetalle = () => {
  const { id } = useParams();
  const [mascota, setMascota] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [autor, setAutor] = useState("");
  const [contenido, setContenido] = useState("");

  useEffect(() => {
    const obtenerDetalle = async () => {
      try {
        const respuesta = await mascotasApi.get(`mascotas/${id}/`);
        setMascota(respuesta.data);
        } catch (error) {
        if (error.response?.status === 400) {
        setError("Los datos enviados no son válidos.");
        } else if (error.response?.status === 404) {
        setError("La mascota no fue encontrada.");
        } else {
        setError("Ocurrió un error inesperado. Intenta nuevamente.");
        }
        const cargarComentarios = async () => {

      try {

        const respuesta = await mascotasApi.get("comentarios/");

        const comentariosMascota = respuesta.data.filter(
            comentario => comentario.mascota === Number(id)
        );

        setComentarios(comentariosMascota);

      } catch (error) {

        if (error.response?.status === 404) {
            alert("No se encontraron comentarios.");
        } else {
            alert("Error al cargar comentarios.");
        }

        console.log(error.response?.data);
    }
};
        console.error(error.response?.data);
      }finally {
        
        setCargando(false);
      }
    };

    obtenerDetalle();
    cargarComentarios();

    const agregarComentario = async (e) => {
      const eliminarComentario = async (comentarioId) => {

    try {

        await mascotasApi.delete(`comentarios/${comentarioId}/`);

        cargarComentarios();

    } catch (error) {

        if (error.response?.status === 404) {
            alert("Comentario no encontrado.");
        } else {
            alert("Error al eliminar comentario.");
        }

        console.log(error.response?.data);
    }
};

    e.preventDefault();

    try {

        await mascotasApi.post("comentarios/", {
            mascota: Number(id),
            autor,
            contenido
        });

        setAutor("");
        setContenido("");

        cargarComentarios();

    } catch (error) {

        if (error.response?.status === 400) {
            alert("Datos inválidos.");
        } else if (error.response?.status === 404) {
            alert("Mascota no encontrada.");
        } else {
            alert("Error al agregar comentario.");
        }

        console.log(error.response?.data);
    }
};
  }, [id]);

  if (cargando) return <p>Cargando detalle...</p>;
  if (error) return <p>{error}</p>;
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
      
      {/* componente de comentarios aqui abajo*/}
    </div>
  );
};

export default MascotaDetalle;