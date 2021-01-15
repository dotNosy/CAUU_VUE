import http from "../http-common";
import User from "../User";

class ProfileDataService {
    editProfile(data) {
        return http.post("auth/processData/EditProfile", data, User.getToken());
    }
}

export default new ProfileDataService();