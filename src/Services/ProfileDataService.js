import http from "../http-common";

class ProfileDataService {
    editProfile(data) {
        return http.post("/processData/EditProfile", data);
    }

}

export default new ProfileDataService();