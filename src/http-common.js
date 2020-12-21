import Axios from "axios";

export default Axios.create({
    baseURL: "http://10.20.30.219:8000/api",
    headers: {
        "Content-type" : "application/json"
    }
})