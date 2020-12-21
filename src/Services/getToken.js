class GetToken {
    getUserToken() {
        const user = sessionStorage.getItem('user');

        const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };

        return config;
    }
}

export default new GetToken();