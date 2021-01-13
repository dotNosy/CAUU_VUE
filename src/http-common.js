import Axios from "axios";

export default Axios.create({
    baseURL: "http://10.20.30.215:8000/api",
    headers: {
        "Content-type" : "application/json"
    }
})