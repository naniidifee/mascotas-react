import axios from "axios";

const mascotasApi = axios.create(
    {
        baseURL:"https://mascotas.pythonanywhere.com/api/",
    }
);

export default mascotasApi;