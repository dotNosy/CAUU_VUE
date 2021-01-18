<template>

    <section>

        <b-row>
            <h4>Mujeres en las ciencias sociales</h4>
        </b-row>
        <b-row>
            <b-col></b-col>
            <b-col>
                <div v-for="(mujer, key) in miDesbloqueadas" :key="key">
                    <h2>{{mujer.nombre}}</h2>
                    <h3>{{mujer.lore_es}}</h3>
                    <h4>{{mujer.zona_geografica}}</h4>
                    <button type="button" @click="mostrarDatosCarta(mujer.id)" ref="btnShow"> Ver detalles </button>
                </div>
            </b-col>
            <b-col>
                <b-button type="button" @click="sugerirMujer()" variant="secondary" class="bottom">Sugerir mujer</b-button>
            </b-col>

            <b-modal id="mujer_detail"  hide-footer >
                <div class="d-block text-center ">
                    <h1>{{mujerDetail.mujer.nombre}}</h1>
                </div>
            </b-modal>

        </b-row>
    </section>

</template>

<script>
    import InfoDataService from "../Services/InfoDataService";

    export default {
        name: 'obtener-juego',
        data() {
            return {
                idBuscar: null,
                miDesbloqueadas: '',
                totalMujeres: '',
                mujerDetail: {
                    mujer: {
                        nombre:'',
                        apellido:'',
                        lore_es:'',
                        lore_en:'',
                        lore_eus:'',
                        zona_geografica:'',
                        ambito:'',
                        continente:'',
                        fecha_nacimiento:'',
                        fecha_muerte:'',
                        foto:''
                    },
                    datos: null
                }
            }
        },
        methods: {
            mostrarDatosCarta(id) {
                this.idBuscar = id;
                this.$bvModal.show('mujer_detail');
            },
            sugerirMujer() {
                console.log("btn sugerir");
            },
            cargarCartas() {
                let scope = this;
                InfoDataService.coleccion()
                    .then((response) => {
                        scope.miDesbloqueadas = response.data.mujeres;
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            }
        },
        mounted() {
            this.cargarCartas();

            //Load data to modal
            this.$root.$on('bv::modal::show', (bvEvent, modalId) => {
                if (modalId === "mujer_detail") {

                    const scope = this;
                    InfoDataService.coleccionMujerDatos(scope.idBuscar)
                        .then((response) => {
                            scope.mujerDetail.mujer = response.data.mujer;
                            scope.mujerDetail.datos = response.data.datos;
                        })
                        .catch((e) => {
                            console.log(e);
                        });
                }
            })
        }
    }
</script>

<style>

</style>