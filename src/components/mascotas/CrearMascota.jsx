import { useState } from "react";
import mascotasApi from "../../api/api";

function CrearMascota() {
    
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

    const manejarCambio = (e) => {
        const { name, value } = e.target;

        setMascota({
            ...mascota,
            [name]: value
        });
    };

    const manejarImagen = (e) => {
        setMascota({
            ...mascota,
            imagen: e.target.files[0]
        });
    };

    const guardarMascota = async (e) => {
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
        
        if (mascota.imagen) {
            formData.append("imagen", mascota.imagen);
        }
            
        try {
            
            const respuesta = await mascotasApi.post("mascotas/", formData, 
                {headers: {"Content-Type": "multipart/form-data"}
            }
        );

        console.log("Mascota registrada:", respuesta.data);
        alert("Mascota registrada exitosamente");
        
    } catch (error) {
        console.error("Error al registrar mascota:", error);

        if (error.response) {

            if (error.response.status === 400) {
                alert("Datos invalidos");
            }

            else if (error.response.status === 404) {
                alert("No se encontro el recurso");
            }
            else {
                alert("Error del servidor");
            }

            console.log(error.response.data);
        } else {
            alert("No se pudo conectar");

        }

    }
};

    return (
        <div>
            <h2>Registrar nueva mascota</h2>
            <form onSubmit={guardarMascota} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '500px'}}>
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
                    <option value="pequeño">Pequeño</option>
                    <option value="mediano">Mediano</option>
                    <option value="grande">Grande</option>
                    <option value="desconocido">Desconocido</option>
                </select>

                <label>Descripcion:</label>
                <textarea name="descripcion" value={mascota.descripcion} onChange={manejarCambio}/>

                <label>Estado:</label>
                <select name="estado" value={mascota.estado} onChange={manejarCambio}>
                    <option value="">---------</option>
                    <option value="perdida">Perdida</option>
                    <option value="encontrada">Encontrada</option>
                    <option value="adoptada">En adopcion</option>
                    <option value="en_adopcion">Adoptada</option>
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

                <button type="submit">Guardar mascota</button>
            </form>
        </div>
    );
}

export default CrearMascota;
