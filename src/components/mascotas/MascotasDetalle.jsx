import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import mascotasApi from '../../api/api';

const MascotaDetalle = () => {
  const { id } = useParams();
  const [mascota, setMascota] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerDetalle = async () => {
      try {
        const respuesta = await mascotasApi.get(`mascotas/${id}/`);
        setMascota(respuesta.data);
      } catch (err) {
        console.error('Error al obtener el detalle:', err);
        setError('No se pudo cargar la información de la mascota.');
      } finally {
        setCargando(false);
      }
    };

    obtenerDetalle();
  }, [id]);

  if (cargando) return <p>Cargando detalle...</p>;
  if (error) return <p>{error}</p>;
  if (!mascota) return <p>Mascota no encontrada.</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <Link to="/" style={{ display: 'inline-block', marginBottom: '20px' }}>
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