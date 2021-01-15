import LoginDataService from "./Services/LoginDataService";

class User {
    constructor (){
        this.user = JSON.parse(sessionStorage.getItem('user'));
        
    }

    getToken() {
        this.getUser();

        const config = {
            headers: { Authorization: `Bearer ${this.user.token}` }
        };

        return config;
    }

    getUser() {
        this.user = JSON.parse(sessionStorage.getItem('user'));
        return this.user;
    }

    getEmail() {
        this.getUser();
        return this.user.email;
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