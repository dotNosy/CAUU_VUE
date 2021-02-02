import http from "../http-common";
import User from "../User";

class LoginDataService {
    login(data) {
        return http.post("/auth/login", data);
    }

    logout() {
        return http.get("/auth/logout", User.getToken());
    }
}

export default new LoginDataService();