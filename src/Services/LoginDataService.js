import http from "../http-common";

class LoginDataService {
    login(data) {
        return http.post("/auth/login", data);
    }

    logout() {
        return http.get("/auth/logout");
    }
}

export default new LoginDataService();