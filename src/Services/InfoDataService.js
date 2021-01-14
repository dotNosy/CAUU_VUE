import http from "../http-common";
import User from "../User";

class InfoDataService {
    ambitos() {
        return http.get("auth/data/Ambitos", User.getToken());
    }
}

export default new InfoDataService();
