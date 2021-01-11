import LoginDataService from "./Services/LoginDataService";

class User {
    constructor (){
        this.user = JSON.parse(sessionStorage.getItem('user'));
    }

    getToken() {
    
        const config = {
            headers: { Authorization: `Bearer ${this.user.token}` }
        };

        return config;
    }

    getUser() {
        return this.user;
    }

    revokeToken() {
        LoginDataService.logout()
            .then(() => {
                //Delete sesion
                sessionStorage.removeItem('user');
            })
            .catch(e => {
                console.log(e);
            });
    }
}

export default new User();