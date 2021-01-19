import LoginDataService from "./Services/LoginDataService";

class User {
    constructor (){
        this.user = JSON.parse(sessionStorage.getItem('user'));
        
    }

    getToken(data = null) {
        this.getUser();

        const config = {
            headers: { Authorization: `Bearer ${this.user.access_token}` },
            params: data
        };

        return config;
    }

    getUser() {
        this.user = JSON.parse(sessionStorage.getItem('user'));
        return this.user;
    }

    getId() {
        this.getUser();
        return this.user.id 
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
    
    setDatosUser(nombre, email) {
        this.user.nombre = nombre;
        this.user.email = email;

        sessionStorage.setItem('user', JSON.stringify(this.user));
    }
}

export default new User();