class User {
    constructor (){
        this.user = JSON.parse(sessionStorage.getItem('user'));
    }

    getUserToken() {
    
        const config = {
            headers: { Authorization: `Bearer ${this.user.token}` }
        };

        return config;
    }

    getUser() {
        return this.user;
    }
}

export default new User();