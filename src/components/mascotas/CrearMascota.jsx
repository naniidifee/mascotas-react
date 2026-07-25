import { useState } from "react";

function CrearMascota() {
    
    const [mascota, setMascota] = useState({
        nombre: "",
        tipo: "",
        raza: "",
        edad: "",
        tamano: "",
        descripcion: "",
        estado: "",
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

    return (
        <div>
            <h2>Registrar nueva mascota</h2>
            <form>
                <label>Nombre:</label>
                <input type="text" name="nombre" value={mascota.nombre} onChange={manejarCambio}/>

                <label>Tipo:</label>
                <input type="text" name="tipo" value={mascota.tipo} onChange={manejarCambio}/>

                <label>Raza:</label>
                <input type="text" name="raza" value={mascota.raza} onChange={manejarCambio}/>

                <label>Edad:</label>
                <input type="text" name="edad" value={mascota.edad} onChange={manejarCambio}/>

                <label>Tamaño:</label>
                <input type="text" name="tamaño" value={mascota.tamano} onChange={manejarCambio}/>

                <label>Descripcion:</label>
                <input name="descripcion" value={mascota.descripcion} onChange={manejarCambio}/>

                <label>Estado:</label>
                <input type="text" name="estado" value={mascota.estado} onChange={manejarCambio}/>

                <label>Imagen:</label>
                <input type="file" onChange={manejarImagen}/>

                <button type="button">Guardar mascota</button>
            </form>
        </div>
    );
}

export default CrearMascota;
