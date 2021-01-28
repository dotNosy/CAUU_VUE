import http from "../http-common";
import User from "../User";

class InfoDataService {
    //* Load data for game
        loadMujeresForGame () {
            return http.get("auth/data/gameMujeres", User.getToken());
        }

        editProfile(data) {
            return http.post("auth/processData/EditProfile", data, User.getToken());
        }

        
    //* Update data user

}

export default new InfoDataService();
