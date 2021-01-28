import http from "../http-common";
import User from "../User";

class GameErrorDataService {
    editProfile(data) {
        return http.post("auth/processData/SendEmail", data, User.getToken());
    }
}

export default new GameErrorDataService();