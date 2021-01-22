<template>
    <section>
            <h4>Mujeres en las ciencias sociales</h4>
            <b-col></b-col>
            <b-col>
                <div id="mujerFullPageLoading"><b-spinner class="my-5" style="width: 5rem; height: 5rem;" variant="primary" label="Loading..."></b-spinner></div>
                <div
                    v-for="(mujer, key) in miDesbloqueadas" :key="key"
                    class="my-3" 
                    >
                    <b-card
                        :style="{ 
                            backgroundImage: 'url(' + require('@/assets/Cartas/single/'+ ambitos[mujer.ambito_id -1].nombre.toLowerCase() +'.png') + ')',
                            color:'white',
                            backgroundSize: 'cover'
                        }"
                        :title= mujer.nombre
                        img-src="https://picsum.photos/600/300/?image=25"
                        img-alt="Image"
                        img-top
                        tag="article"
                        style="max-width: 30rem;"
                        class="mb-2"
                    >
                        <h2>{{ambitos[mujer.ambito_id -1].nombre}}</h2>
                        <b-card-text>
                            {{mujer.lore_es}}
                        </b-card-text>

                        <b-button @click="mostrarDatosCarta(mujer.id)" variant="primary">View</b-button>
                    </b-card>
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
                    <h3>{{mujerDetail.mujer.ambito_id}}</h3>
                    <h4>{{mujerDetail.mujer.zona_geografica}}</h4>
                </div>
                <div class="d-block text-center my-4">
                    <div id="mujerDetailLoading"><b-spinner class="my-5" style="width: 5rem; height: 5rem;" variant="danger" type="grow" label="Loading..."></b-spinner></div>
                    <div v-for="(dato, key) in mujerDetail.datos" :key="key">
                        <h2>{{dato.dato}}</h2>
                    </div>
                </div>
            </b-modal>

    </section>
</template>

<script>
    import InfoDataService from "../Services/InfoDataService";
    import $ from "jquery";

    export default {
        name: 'obtener-juego',
        data() {
            return {
                ambitos: null,
                idBuscar: null,
                miDesbloqueadas: null,
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
                        scope.ambitos = response.data.ambitos;
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

                this.mujerDetail.mujer = null
                this.mujerDetail.datos = null
            }
        },
        mounted() {
            this.cargarCartas();
        }
    }
</script>
