import http from "../http-common";
import User from "../User";

class InfoDataService {
    ambitos() {
        return http.get("auth/data/Ambitos", User.getToken());
    }

    coleccion () {
        return http.get("auth/data/Coleccion", User.getToken());
    }

    coleccionMujerDatos (data) {
        return http.get("auth/data/Coleccion/mujer", User.getToken(data));
    }

    imprimirMujeres () {
        return http.get("auth/data/imprimirJuego", User.getToken());
    }
}

export default new InfoDataService();
