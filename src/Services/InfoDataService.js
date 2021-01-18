import http from "../http-common";
import User from "../User";

class InfoDataService {
    ambitos() {
        return http.get("auth/data/Ambitos", User.getToken());
    }

    coleccion () {
        return http.get("auth/data/Coleccion", User.getToken());
    }

    coleccionMujerDatos (id) {
        return http.get("auth/data/Coleccion/mujer", id,User.getToken());
    }
}

export default new InfoDataService();
