import http from "../http-common";
import User from "../User";

class GameDataService {
    //* Load data for game
        loadMujeresForGame () {
            return http.get("auth/data/gameMujeres", User.getToken());
        }

        editProfile(data) {
            return http.post("auth/processData/EditProfile", data, User.getToken());
        }

        gameScore(data) {
            return http.post("auth/data/gameScore", data, User.getToken());
        }

        getGameScore() {
            return http.get("auth/data/gameScore", User.getToken());
        }

        
    //* Update data user

}

export default new GameDataService();
