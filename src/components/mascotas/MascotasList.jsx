import { useEffect, useState } from "react";
import mascotasApi from "../../api/api";

function MascotasList(){

    const [mascotasList, setMascotasList] = useState([]);

    const fetchMascotas = async () => {
        try{
            const response = await mascotasApi.get()
        }catch (error){
            console.log(error)
        }
    }

    useEffect(() => {
        
    },[])

    return(
        <>
            <h2>Lista de las mascotas</h2>
        </>
    )
}

export default MascotasList;