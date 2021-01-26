<template>
    <section>
        <b-row>
            <b-col><h4>Mujeres en las ciencias sociales</h4></b-col>
            <b-col>
                <div id="mujerFullPageLoading"><b-spinner class="my-5" style="width: 5rem; height: 5rem;" variant="primary" label="Loading..."></b-spinner></div>
                <div
                    v-for="(carta, key) in misCartasDesbloqueadas" :key="key"
                    class="my-3" 
                    >
                    <b-card
                        :id="carta.mujer.id"
                        :ref="'card' + carta.mujer.id"
                        tag="article"
                        style="max-width: 25rem;"
                        class="mb-2"
                        :style="{ 
                            backgroundImage: 'url(' + require('@/assets/Cartas/single/'+ ambitos[carta.mujer.ambito_id -1].nombre.trim().toLowerCase() +'_borde.png') + ')',
                            color:'white',
                            backgroundSize: 'cover',
                            width: '100%',
                        }"
                    >
                        <div  @click="rotateCard(carta.mujer.id)" 
                            style="background-color: white; 
                                    border-radius:50px;
                                    width:3rem;height:3rem;float:right;">
                            <img src="../assets/keyboard.png" style="width:2rem;height:2rem;margin-top:0.5rem;">
                        </div>

                        <div class="front">
                            <br><br>
                            <b-avatar src="https://placekitten.com/300/300" size="14rem"></b-avatar>
                            <div style="background: rgba(0, 0, 0, 0.25); " class="my-4 py-2">
                                <h1>{{carta.mujer.nombre}}</h1>
                                <h2>{{ambitos[carta.mujer.ambito_id -1].nombre}}</h2>
                                <b-card-text>
                                    {{carta.mujer.zona_geografica}}
                                </b-card-text>
                            </div>                            
                        </div>

                        <div class="back hide" style="margin-top: 4rem;">
                            <div style="background: rgba(0, 0, 0, 0.25); " class="my-4 py-2">
                                <h1>DATOS MUJER</h1>
                                <h2>{{ambitos[carta.mujer.ambito_id -1].nombre}}</h2>
                                <b-card-text v-for="(dato, key) in carta.datos" :key="key">
                                    {{dato.dato}}
                                </b-card-text>
                                <b-button class="my-3" @click="mostrarDatosCarta(carta.mujer.id)" variant="primary">View</b-button>
                            </div>
                        </div>
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

        </b-row>
    </section>
</template>

<script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/2.2.0/anime.js">
</script>

<script>
    import InfoDataService from "../Services/InfoDataService";
    import $ from "jquery";
    import anime from 'animejs';

    export default {
        name: 'obtener-juego',
        data() {
            return {
                ambitos: null,
                idBuscar: null,
                misCartasDesbloqueadas: null,
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
                },
                playing: false,
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

                        scope.misCartasDesbloqueadas = response.data.cartas;
                        scope.ambitos = response.data.ambitos;

                        console.log(scope.misCartasDesbloqueadas);
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            },
            mujerModalShow() {
                $("#mujerDetailLoading").fadeIn("slow");

                for (let i = 0; i < this.misCartasDesbloqueadas.length; i++) {
                    const mujer = this.misCartasDesbloqueadas[i];

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

                this.mujerDetail.datos = null
            },
            rotateCard(id) {
                let element = 'card'+id;

                anime({
                    targets: this.$refs[element][0],
                    scale: [{value: 1}, {value: 1.4}, {value: 1, delay: 250}],
                    rotateY: {value: '+=180', delay: 200},
                    easing: 'easeInOutSine',
                    duration: 400,
                    complete: function(anim){
                        $('#'+id+" .front").toggle();
                        $('#'+id+" .back").toggle();
                    }
                });
            }
        },
        mounted() {
            this.cargarCartas();
        }
    }
</script>

<style>
.card {
    position: relative;
    transform-style: preserve-3d;
    perspective: 1400px;
}

.back {
    top: 0;
    left: 0;

    transform: rotateY(180deg);

    color: #2196f3;
    background: #fff;
}

.back .front {
    display: flex;
    backface-visibility: hidden;
}

.hide {
    display: none;
}
</style>