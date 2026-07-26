import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import mascotasApi from "../../api/api";

function EditarMascota() {

    const { id } = useParams();

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
        } catch(error){
            console.error("Error al actualizar:", error.response?.data);
            alert(JSON.stringify(error.response?.data));
        }
    };
    return (
        <div>
            <form onSubmit={actualizarMascota} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '500px'}}>
                <label>Nombre:</label>
                <input type="text" name="nombre" value={mascota.nombre} onChange={manejarCambio}/>

                <label>Descripción:</label>
                <textarea name="descripcion" value={mascota.descripcion} onChange={manejarCambio}/>
                
                <label>Estado:</label>
                <select name="estado" value={mascota.estado} onChange={manejarCambio}>
                    <option value="perdida">Perdida</option>
                    <option value="encontrada">Encontrada</option>
                    <option value="adoptada">Adoptada</option>
                    <option value="en_adopcion">En adopcion</option>
                </select>
                
                <button type="submit">
                    Guardar cambios
                </button>
            </form>

            <h2>Editar mascota</h2>

            <p>Nombre actual: {mascota.nombre}</p>
            <p>Estado actual: {mascota.estado}</p>

        </div>
    );
}

export default EditarMascota;
