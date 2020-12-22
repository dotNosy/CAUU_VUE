import http from "../http-common";
import token from "./getToken";

class LoginDataService {
    login(data) {
        return http.post("/auth/login", data);
    }

    logout() {
        return http.get("/auth/logout", token.getUserToken());
    }
}

export default new LoginDataService();