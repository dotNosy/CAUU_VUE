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

            <b-modal size="lg"
                id="mujer_detail"  
                hide-footer 
                @show="mujerModalShow">
                <div 
                    >
                    <b-card
                        no-body 
                        class="overflow-hidden"
                        >
                        <b-row no-gutters>
                        <b-col 
                            md="6" 
                            class="text-center"
                            :style="{ 
                                backgroundImage: 'url(' + require('@/assets/Cartas/single/'+ mujerDetail.mujer.ambito.trim().toLowerCase() +'_borde.png') + ')',
                                color:'white',
                                backgroundSize: 'cover',
                                width: '100%',}"
                        >
                                <br><br>
                                <b-avatar src="https://placekitten.com/300/300" size="14rem"></b-avatar>
                                <div style="background: rgba(0, 0, 0, 0.25); " class="my-4 py-2">
                                    <h1>{{mujerDetail.mujer.nombre}}</h1>
                                    <h2>{{mujerDetail.mujer.ambito}}</h2>
                                    <b-card-text>
                                        {{mujerDetail.mujer.zona_geografica}}
                                    </b-card-text>
                                </div>                                    
                        </b-col>
                        <b-col md="6">
                            <b-tabs card>
                            <b-tab title="Datos" active>
                                <b-list-group v-for="(dato, key) in mujerDetail.datos" :key="key">
                                    <b-list-group-item>{{dato.dato}}</b-list-group-item>
                                </b-list-group>
                            </b-tab>
                            <b-tab title="Lore Es">
                                <b-card-text>{{mujerDetail.mujer.lore_es}}</b-card-text>
                            </b-tab>
                            <b-tab title="Lore Eus">
                                <b-card-text>{{mujerDetail.mujer.lore_eus}}</b-card-text>
                            </b-tab>
                            <b-tab title="Lore En">
                                <b-card-text>{{mujerDetail.mujer.lore_en}}</b-card-text>
                            </b-tab>
                            </b-tabs>
                        </b-col>
                        </b-row>
                    </b-card>
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
            cargarCartas() {
                $("#mujerFullPageLoading").fadeIn("slow");

                let scope = this;
                InfoDataService.coleccion()
                    .then((response) => {
                        $("#mujerFullPageLoading").fadeOut("fast");

                        scope.misCartasDesbloqueadas = response.data.cartas;
                        scope.ambitos = response.data.ambitos;

                        console.log(scope.ambitos);
                    })
                    .catch((e) => {
                        console.log(e);
                    });
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
            },

            mostrarDatosCarta(id) {
                this.idBuscar = id;
                this.$bvModal.show('mujer_detail');
            },

            mujerModalShow() {
                for (let i = 0; i < this.misCartasDesbloqueadas.length; i++) {
                    const carta = this.misCartasDesbloqueadas[i];
                    console.log(this.misCartasDesbloqueadas[i]);

                    if (carta.mujer.id == this.idBuscar) {
                        this.mujerDetail.mujer = carta.mujer;
                        this.mujerDetail.datos = carta.datos;
                        this.mujerDetail.mujer.ambito = this.ambitos[carta.mujer.ambito_id -1].nombre;
                    }
                }

                console.log(this.mujerDetail.mujer);
            },
            sugerirMujer() {
                console.log("btn sugerir");
            }
        },
        created() {
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
    color: black;
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