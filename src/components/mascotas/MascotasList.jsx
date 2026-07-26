import { useEffect, useState } from "react";
import mascotasApi from "../../api/api";
import { Link } from 'react-router-dom';

function MascotasList() {
    const [mascotasList, setMascotasList] = useState([]);

    const fetchMascotas = async () => {

        try {
            // Vamos a Agregar a la ruta 'mascotas/' al get()
            const response = await mascotasApi.get('mascotas/');
            
            // Luego seguimos con la respuesra de la API por si da error :C
            setMascotasList(response.data);
        } catch (error) {
            console.log("Error al cargar mascotas:", error);
        }
    };

    const eliminarMascota = async (id) => {

        const confirmar = confirm("¿Esta segura de eliminar esta mascota?");

        if (!confirmar) {
            return;
        }

        try {
            await mascotasApi.delete(`mascotas/${id}/`);
            alert("Mascota eliminada correctamente");
            fetchMascotas();

        } catch (error) {
            console.error("Error al eliminar mascota:", error);

            if (error.response) {

                if (error.response.status === 404) {
                    alert("Mascota no encontrada");
                }

                else {
                    alert("Error del servidor");
                }
            } else {
                alert("No se puso conectar");
            }
        }
    };

    useEffect(() => {
         // Continuamos con una función para que busque los datos al cargar la página
        fetchMascotas();
    }, []);
    
    return(
        // recorremos el arreglo mascotasList para mostrar cada mascota y le ponemos algo de css para k se vea pretty
        <>
            <h2>Lista de las mascotas</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
                {mascotasList.map((mascota) => (
                    <div key={mascota.id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
                        
                        
                        {mascota.imagen && (
                            <img 
                                src={mascota.imagen} 
                                alt={`Foto de ${mascota.nombre}`} 
                                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' }} 
                            />
                        )}
                        
                        
                        <h3 style={{ textTransform: 'capitalize' }}>{mascota.nombre}</h3>
                        <p><strong>Tipo:</strong> {mascota.tipo_animal}</p>
                        <p><strong>Estado:</strong> {mascota.estado}</p>
                        <p><strong>Raza:</strong> {mascota.raza}</p>
                        
                        <Link to={`/mascotas/${mascota.id}`} style={{ display: 'inline-block', marginTop: '10px' }}>
                            Ver Detalle
                        </Link>

                        <Link to={`/mascotas/${mascota.id}/editar`} style={{ display: 'inline-block', marginTop: '10px', marginLeft: '10px' }}>
                            Editar
                        </Link>

                        <button onClick={() => eliminarMascota(mascota.id)} style={{marginTop: '10px', marginLeft: '10px'}}>
                            Eliminar
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}

export default MascotasList;
