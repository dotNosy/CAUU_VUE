<template>

    <section>

        <b-row>
            <h4>Mujeres en las ciencias sociales</h4>
        </b-row>
        <b-row>
            <b-col></b-col>
            <b-col>
                <div id="mujerFullPageLoading"><b-spinner class="my-5" style="width: 5rem; height: 5rem;" variant="primary" label="Loading..."></b-spinner></div>
                <div class="my-3" v-for="(mujer, key) in miDesbloqueadas" :key="key">
                    <h2>{{mujer.nombre}}</h2>
                    <h3>{{mujer.lore_es}}</h3>
                    <h4>{{mujer.zona_geografica}}</h4>
                    <button type="button" @click="mostrarDatosCarta(mujer.id)" ref="btnShow"> Ver detalles </button>
                </div>
            </b-col>
            <b-col>
                <b-button type="button" @click="sugerirMujer()" variant="secondary" class="bottom">Sugerir mujer</b-button>
            </b-col>

            <b-modal 
                id="mujer_detail"  
                hide-footer 
                @show="mujerModalShow"
                @hidden="freeModal">
                <div class="d-block text-center ">
                    <h1>{{mujerDetail.mujer.nombre}}</h1>
                    <h2>{{mujerDetail.mujer.lore_es}}</h2>
                    <h3>{{mujerDetail.mujer.ambito}}</h3>
                    <h4>{{mujerDetail.mujer.zona_geografica}}</h4>
                </div>
                <div class="d-block text-center my-4">
                    <div id="mujerDetailLoading"><b-spinner class="my-5" style="width: 5rem; height: 5rem;" variant="danger" type="grow" label="Loading..."></b-spinner></div>
                    <div v-for="(dato, key) in mujerDetail.datos" :key="key">
                        <h2>{{dato.dato}}</h2>
                    </div>
                </div>
            </b-modal>

        </b-row>
    </section>

</template>

<script>
    import InfoDataService from "../Services/InfoDataService";
    import $ from "jquery";

    export default {
        name: 'obtener-juego',
        data() {
            return {
                idBuscar: null,
                miDesbloqueadas: '',
                totalMujeres: '',
                mujerDetail: {
                    mujer: {
                        id:'',
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
                    datos: {

                    }
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
                $("#mujerFullPageLoading").fadeIn("slow");

                let scope = this;
                InfoDataService.coleccion()
                    .then((response) => {
                        $("#mujerFullPageLoading").fadeOut("fast");
                        scope.miDesbloqueadas = response.data.mujeres;
                        console.log(response.data);
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            },
            mujerModalShow() {
                $("#mujerDetailLoading").fadeIn("slow");

                for (let i = 0; i < this.miDesbloqueadas.length; i++) {
                    const mujer = this.miDesbloqueadas[i];

                    if (mujer.id == this.idBuscar) {
                        this.mujerDetail.mujer = mujer;
                    }
                }

                const scope = this;
                const data = {id: this.mujerDetail.mujer.id}

                InfoDataService.coleccionMujerDatos(data)
                    .then((response) => {
                        $("#mujerDetailLoading").fadeOut("fast");

                        scope.mujerDetail.datos = response.data.datos;
                        console.log(response.data);
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            },
            freeModal() {
                $("#mujerDetailLoading").fadeOut("slow");
            }
        },
        mounted() {
            this.cargarCartas();
        }
    }
</script>

<style>

</style>