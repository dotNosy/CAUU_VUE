class Juego {
    constructor (){
        this.nivel = null;
        this.ambitos = [];
    }

    setNivel(nivel) {
        this.nivel = nivel;
    }

    setAmbito(ambito) {
        this.ambito = ambito;
    }

    getNivel() {
        return this.nivel;
    }

    getAmbito() {
        return this.ambito;
    }
}

export default new Juego();