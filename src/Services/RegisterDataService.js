import http from "../http-common";

class RegisterDataService {
    register(data) {
        return http.post("/auth/register", data);
    }

    createUser(username) {
        return http.get(`/perfil/${username}`);
    }
}

export default new RegisterDataService();