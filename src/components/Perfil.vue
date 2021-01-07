<template>
    <div>

        <b-row>
            <h1>Hola {{user.email}}</h1>
        </b-row>
        <b-row>
            <b-col>
                <router-link to="SelectNivel"><b-button variant="dark" size="lg" pill>Jugar</b-button></router-link>
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
                <b-link variant="Link">Cerrar sesion</b-link>
            </b-col>
        </b-row>


    </div>
</template>

<script>
    import User from  "../User";

    export default {
        name: 'Perfil',
        data() {
            return {
                user: ''
            }
        },
        mounted() {
            this.user = User.getUser();
        }
    }
</script>
