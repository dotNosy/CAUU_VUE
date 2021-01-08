<template>
    <div>

        <b-row>
            <b-col>
                <b-link variant="Link" to="Perfil">Volver</b-link>
            </b-col>
            <b-col>{{titulo}}</b-col>
            <b-col></b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-button variant="dark" size="lg" pill>Nivel 1</b-button>
                <b-button v-b-popover.hover.righttop="nivel1" title="Nivel 1" variant="light" pill ><b-icon icon="info-circle-fill" scale="2" variant="info" id="1"></b-icon></b-button>

            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-button variant="dark" size="lg" pill>Nivel 2</b-button>
                <b-button v-b-popover.hover.righttop="nivel2" title="Nivel 2" variant="light" pill ><b-icon icon="info-circle-fill" scale="2" variant="info" id="2"></b-icon></b-button>

            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-button variant="dark" size="lg" pill >Nivel 3</b-button>
                <b-button v-b-popover.hover.righttop="nivel3" title="Nivel 3" variant="light" pill ><b-icon icon="info-circle-fill" scale="2" variant="info" id="3"></b-icon></b-button>
            </b-col>
        </b-row>

        


    </div>
</template>

<script>

    export default {
        data() {
            return {
                titulo: "Seleccione nivel y ámbitos para jugar, después pulse comenzar",
                nivel1: "Fácil",
                nivel2: "Normal",
                nivel3: "A3",
            }
        }
        
    }
</script>
