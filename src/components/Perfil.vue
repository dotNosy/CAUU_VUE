<template>
    <div>

        <b-row>
            <h1>Hola {{user.email}}</h1>
            <div data-title="Farewell!" 
                data-intro="And this is the last step!"
                v-intro="'Edit Project\'s Name Here'"
                v-intro-position="'bottom'"
            >AAAAAAAAAA</div>
        </b-row>
        <b-row>
            <b-col>
                <router-link to="SelectNivel"><b-button variant="dark" size="lg" pill data-intro="This is your message">Jugar</b-button></router-link>
            </b-col>
            <b-col>
                <b-button variant="dark" size="lg" pill>Mi colección</b-button>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-button variant="dark" size="lg" pill>Obtener juego</b-button>
            </b-col>
            <b-col>
                <b-button variant="dark" size="lg" pill>Mis datos</b-button>
            </b-col>
        </b-row>
        <b-row>
            <b-col></b-col>
            <b-col>
                <!-- <b-link variant="Link">Cerrar sesion</b-link> -->
                <div v-intro="'The content of tooltip'">AAAAA</div>
                <div v-intro="'The content of tooltip'" v-intro-step="2">BBB</div>
                <div v-intro="'The content of tooltip'" v-intro-tooltip-class="'red-bg'">cccccc</div>
                <div v-hint="'The content of tooltip'" v-intro-position="'top'">DDDDDD</div>
            </b-col>
        </b-row>


    </div>
</template>

<script>
    import User from  "../User";

        import introJs from "intro.js";
        import "intro.js/introjs.css";

    export default {
        name: 'Perfil',
        data() {
            return {
                user: ''
            }
        },
        mounted() {
            this.user = User.getUser();

            // this.$intro().start();
            // this.$intro().showHints();

            // const introJS = require("intro.js");
            introJs.start();
            introJs.showHints();

            // this.$nextTick(() =>{
            //     introJS = require("intro.js");
            //     introJs().start();
            // }
            // )


        }
    }
</script>
