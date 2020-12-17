import http from "../http-common";

class DataService {
    get() {
        return http.get("/test");
    }
}

export default new DataService();
