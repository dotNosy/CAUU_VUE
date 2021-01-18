<template>

    <section>

        <b-row>
            <h4>Mujeres en las ciencias sociales</h4>
        </b-row>
        <b-row>
            <b-col></b-col>
            <b-col>
                {{miDesbloqueadas}}/{{totalMujeres}}
            </b-col>
            <b-col>
                <b-button type="button" @click="sugerirMujer()" variant="secondary" class="bottom">Sugerir mujer</b-button>
            </b-col>
        </b-row>
        <b-row>
            <!-- TO-DO Mostrar cartas de las mujeres con un template
                    -> Al clickar coge su id y muestra sus datos
                    -> ? Se puede pasar entre ellas modo carousel en modal ?
                    -> Si estan bloqueadas mostrar el candado y ? una opacidad gris ?
            -->
        </b-row>

    </section>

</template>

<script>
    import InfoDataService from "../Services/InfoDataService";

    export default {
        name: 'obtener-juego',
        data() {
            return {
                miDesbloqueadas: '',
                totalMujeres: ''
            }
        },
        methods: {
            mostrarDatosCarta() {
                console.log("Cuando clickamos sobre una carta recogemos el id y mostramos los datos de esa carta");
            },
            sugerirMujer() {
                console.log("btn sugerir");
            },
            cargarCartas() {
                InfoDataService.coleccion()
                    .then((response) => {
                        console.log("Peticion coleccion ok");
                        console.log(response.data);
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            }
        },
        mounted() {
            this.cargarCartas();
        }
    }
</script>

<style>

</style>