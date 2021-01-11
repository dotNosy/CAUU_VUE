import http from "../http-common";
import token from "./getToken";

class InfoDataService {
    ambitos() {
        return http.get("auth/data/Ambitos",  token.getUserToken());
    }
}

export default new InfoDataService();
