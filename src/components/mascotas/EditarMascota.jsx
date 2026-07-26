import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import mascotasApi from "../../api/api";
import { useNavigate } from "react-router-dom";

function EditarMascota() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [mascota, setMascota] = useState({
        nombre: "",
        tipo_animal: "",
        raza: "",
        edad: "",
        tamano: "",
        descripcion: "",
        estado: "",
        sexo: "",
        imagen: null
    });

    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cargarMascota = async () => {

            try {
                const respuesta = await mascotasApi.get(`mascotas/${id}/`);

                setMascota(respuesta.data);

            } catch (error) {
                console.error("Error al cargar mascota: ", error);
            } finally {
                setCargando(false);
            }
        };

        cargarMascota();
    }, [id]);

    const manejarCambio = (e) => {
        const {name, value} = e.target;
        setMascota({...mascota, [name]: value});
    };

    const manejarImagen = (e) => {
        setMascota({...mascota, imagen: e.target.files[0]

        });
    };

    const actualizarMascota = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("nombre", mascota.nombre);
        formData.append("tipo_animal", mascota.tipo_animal);
        formData.append("raza", mascota.raza);
        formData.append("edad", mascota.edad);
        formData.append("tamano", mascota.tamano);
        formData.append("descripcion", mascota.descripcion);
        formData.append("estado", mascota.estado);
        formData.append("sexo", mascota.sexo);

        if(mascota.imagen instanceof File){
            formData.append("imagen", mascota.imagen);
        }

        try{
            const respuesta = await mascotasApi.patch(`mascotas/${id}/`,formData
            );
            
            console.log("Mascota actualizada:", respuesta.data);
            alert("Mascota actualizada correctamente");
            navigate("/mascotas/");

        } catch(error){
            console.error("Error al actualizar mascota:", error);

            if (error.response) {
                if (error.response.status === 400) {
                    alert("Datos invalidos");
                }

                else if (error.response.status === 404) {
                    alert("Mascota no encontrada");
                }

                else {
                    alert("Error del servidor");
                }
            } else {
                alert("No se pudo conectar con el servidor");
            }
        }
    };
    return (
        <div>
            <h2>Editar Mascota</h2>
            <form onSubmit={actualizarMascota} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '500px'}}>
                <label>Nombre:</label>
                <input type="text" name="nombre" value={mascota.nombre} onChange={manejarCambio}/>

                <label>Tipo animal:</label>
                <select name="tipo_animal" value={mascota.tipo_animal} onChange={manejarCambio}>
                    <option value="">---------</option>
                    <option value="perro">Perro</option>
                    <option value="gato">Gato</option>
                    <option value="ave">Ave</option>
                    <option value="roedor">Roedor</option>
                    <option value="reptil">Reptil</option>
                    <option value="otro">Otro</option>
                </select>

                <label>Raza:</label>
                <input type="text" name="raza" value={mascota.raza} onChange={manejarCambio}/>

                <label>Edad:</label>
                <input type="number" name="edad" min="0" value={mascota.edad} onChange={manejarCambio}/>

                <label>Tamaño:</label>
                <select name="tamano" value={mascota.tamano} onChange={manejarCambio}>
                    <option value="">---------</option>
                    <option value="pequeno">Pequeño</option>
                    <option value="mediano">Mediano</option>
                    <option value="grande">Grande</option>
                    <option value="desconocido">Desconocido</option>
                </select>

                <label>Descripción:</label>
                <textarea name="descripcion" value={mascota.descripcion} onChange={manejarCambio}/>
                
                <label>Estado:</label>
                <select name="estado" value={mascota.estado} onChange={manejarCambio}>
                    <option value="perdida">Perdida</option>
                    <option value="encontrada">Encontrada</option>
                    <option value="adoptada">Adoptada</option>
                    <option value="en_adopcion">En adopcion</option>
                </select>

                <label>Sexo:</label>
                <select name="sexo" value={mascota.sexo} onChange={manejarCambio}>
                    <option value="">---------</option>
                    <option value="macho">Macho</option>
                    <option value="hembra">Hembra</option>
                    <option value="desconocido">Desconocido</option>
                </select>

                <label>Imagen:</label>
                <input type="file" onChange={manejarImagen}/>
                
                <button type="submit">
                    Guardar cambios
                </button>
            </form>
            
        </div>
    );
}

export default EditarMascota;
