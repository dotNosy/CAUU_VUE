import http from "../http-common";

class DataService {
    getAll() {
        return http.get("/home");
    }

    get(id) {
        return http.get(`/blog/${id}`);
    }

    create(data) {
        return http.post("/blog/add", data);
    }

    update(id, data) {
        return http.put(`/blog/update/${id}`, data);
    }

    delete(id) {
        return http.delete(`/blog/delete/${id}`);
    }
}

export default new DataService();
