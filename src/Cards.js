class Cards {
    constructor (){
        //hay que revisar para que la key sea la misma que en laravel (supongo)
        this.cards = JSON.parse(sessionStorage.getItem('cards'));
    }

    getCardsToken() {

        const config = {
            headers: { Authorization: `Bearer ${this.cards.token}` }
        };

        return config;
    }

    getCards() {
        return this.cards;
    }
}

export default new Cards();