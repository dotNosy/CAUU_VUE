<template>
    <div>

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
    export default {
        name: 'Perfil'
    }
</script>
