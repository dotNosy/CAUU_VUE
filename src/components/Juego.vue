<template>

    <div class="juego">
        <b-row class="full">
            <h3>Mujeres en las ciencias sociales</h3>
            <hr>
        </b-row>
        <!-- <b-row class="full">
            <b-link variant="Link" to="SelectNivel">Volver</b-link>
        </b-row> -->
        <b-row class="full">
            <!-- Facts + Alerts -->
            <b-col>
                <b-row>{{this.currentDato}}</b-row>

                <!-- Notificacion -->
                <b-row hidden>Mujer descubierta</b-row>
                <b-row hidden>Dato descubierto</b-row>
            </b-col>

            <!-- Return + Punctuation + Highscore + Begin -->
            <b-col class="full">

                <p class="h1 mb-2"><b-icon icon="exclamation-circle-fill" variant="danger" @click="$bvModal.show('report-error')" class="exclamation" style="cursor: hand;"></b-icon></p>
                <h6>Tu puntuación</h6>
                <h6>{{ puntos }}</h6>
                <b-button v-bind:class="[btnEmpezarClass]" variant="dark" id="btnEmpezar" size="lg" pill @click="jugar()">Empezar</b-button>
                <!-- <b-button variant="dark" id="btnEmpezar" size="lg" pill @click="showModalPartidaFin">Fin juego</b-button> -->
            </b-col>
        </b-row>
        
            <!-- Cards of the game -->
            <b-row cols="3">
                <div v-for="(mujer, key) in cardsDeck" :key="key" class="my-3" style="maxWidth:24rem;">
                    <b-col >
                        <b-card
                            @click="comprobarDato(mujer.id)"
                            :id="mujer.id"
                            :ref="'card' + mujer.id"
                            tag="article"
                            class="mb-2"
                            :style="{ 
                                backgroundImage: 'url(' + require('@/assets/Cartas/single/derecho.png') + ')',
                                color:'white',
                                backgroundSize: 'cover',
                                width: '100%',
                                transform: 'scale(0.7)'
                            }"
                        >
                        <div class="front">
                            <br><br>
                            <b-avatar src="https://placekitten.com/300/300" size="10rem"></b-avatar>
                            <div style="background: rgba(0, 0, 0, 0.6); " class="my-4 py-2">
                                <h1>{{mujer.nombre}}</h1>
                            </div>                            
                        </div>
                        </b-card>
                    </b-col>
                </div>
            </b-row>

        <b-row class="full"> 

            <!-- Temporizador -->
            <b-progress id="temporizador" v-show="!easyNormalGame" :value="value" :max="max" show-progress animated class="w-50 mb-2" variant="purple"></b-progress>
            <circular-count-down-timer
                :initial-value="100"
                :steps=".1"
                :stroke-width="8"
                :seconds-stroke-color="'#4e3757'"
                :underneath-stroke-color="'lightgrey'"
                :size="200"
                :padding="45"
                :paused= timerMobile
                :second-label="''"
                id="countdown"
                @finish="finished"
                v-show="!easyNormalGame"
            ></circular-count-down-timer>

        </b-row>

        <!-- INI Modal fin del juego -->
        <b-modal id="modal-fin-juego" ref="finJuego" title="¡Partida finalizada!" centered hide-footer>
            <p class="my-4 text-center">La partida ha finalizado.</p>
            <p class="my-4 text-center"><strong>Puntuación obtenida: {{puntos}}</strong></p>
            <p class="my-4 text-center"><strong>Mujeres desbloqueadas en esta partida: {{mujeresDesbloqueadas}}</strong></p>
            <p class="my-4 text-center">
                <strong>
                    <b-icon icon="arrow-down"></b-icon>
                    ¡Descúbrelas en tu colección!
                    <b-icon icon="arrow-down"></b-icon>
                </strong>
            </p>
            <b-link variant="Link" to="Coleccion">
                <b-button variant="info" class="mt-3" block>Ver colección</b-button>
            </b-link>
            
        </b-modal>
        <!-- FIN Modal fin del juego -->

        <!-- Formulario de reportar error -->
        <b-modal id="report-error"  hide-footer >
            <template #modal-title>{{ titulo }}</template>
            <div class="d-block text-center ">
                <b-form v-on:submit.prevent class="formscss">
                    <b-form-group v-slot="{ ariaDescribedby }">
                    <b-form-checkbox-group v-model="selected" :options="options" :aria-describedby="ariaDescribedby" name="flavour-1a">
                    <p class="my-4"> {{ explanationWhere }}</p>
                        <b-row>
                            <b-col><b-form-checkbox name="check" value="cartas" v-model="reasonsChecked">Cartas</b-form-checkbox></b-col>
                            <b-col><b-form-checkbox name="check" value="juego" v-model="reasonsChecked">Juego</b-form-checkbox></b-col>
                        </b-row>
                        <b-row>
                            <b-col><b-form-checkbox name="check" value="puntuacion" v-model="reasonsChecked">Puntuacion</b-form-checkbox></b-col>
                            <b-col><b-form-checkbox name="check" value="otros" id="otros" v-model="reasonsChecked" v-on:change="otros()">Otros</b-form-checkbox></b-col>
                        </b-row>
                        <b-row>
                            <b-form-textarea id="otrostext" placeholder="Inserte la categoría del problema" rows="2" max-rows="6"></b-form-textarea>
                        </b-row>
                        <b-row>
                            <!-- <b-col><b-form-input v-show="otrosSelected == true" v-model="reasonsChecked" v-on:change="otrosSeleccionado()"></b-form-input></b-col> -->
                        </b-row>
                    </b-form-checkbox-group>
                    </b-form-group>

                    <p> {{ explanationReason }}</p>
                        <b-form-textarea
                            id="textarea"
                            v-model="reason"
                            placeholder="Escriba aquí"
                            rows="3"
                            max-rows="6"
                            required
                        ></b-form-textarea>
                        <br>
                        <b-row>
                            <b-col>
                            <b-form-file id="file-small" size="sm"  placeholder="Inserte una captura del problema" drop-placeholder="Drop file here..." accept=".jpg, .png, .gif, video/mp4, video/x-m4v, video/*"></b-form-file>
                            </b-col>
                        </b-row>
                    <br>
                        <b-row>
                            <b-form-textarea id="categoriatext" placeholder="Su problema será revisado por nuestros técnicos en un plazo de 24-48 horas" rows="2" cols="50" max-rows="2" readonly></b-form-textarea>
                        </b-row>
                        <br>
                    <b-button type="submit" variant="primary" id="btn" @click="sendEmail()">{{send}}</b-button>
                </b-form>
                
            </div>
        </b-modal>

    </div>

</template>

<script>
// import func from '../../vue-temp/vue-editor-bridge';
import Juego from "../Juego"
import G_error from "../Services/GameErrorDataService"
import GameDataService from "../Services/GameDataService";

import $ from 'jquery'

    export default {
        data() {
            return {
                btnEmpezarClass : '',
                timer: null,
                easyNormalGame: false,
                timerMobile: true,
                // Juego
                cardsDeck: {},
                mujeres: null,
                mujeresEnPantalla: [],
                datos: null,
                currentDato: {
                    idMujer: null,
                    dato: null,
                },
                alreadyAskedDatos : [],
                puntos: 0,
                onRow: 0,
                bonus: '',
                mujeresDesbloqueadas: 0,
                //Validar si es valido y si es pc o movil
                validDeviceDimensions:this.enoughDimensionsToPlay(),
                isSmall: this.playWithFour(),
                //valores bonus
                bonus1:0,
                bonu2:0,
                bonus3:0,
                bonus4:0,
                // si aciertas
                acierta: 1,
                // valores timer
                value: 100,
                max: 100,
                // Modal mandar datos
                titulo: 'Bienvenido al reporte de errores',
                explanationWhere: 'Por favor, indique dónde ha encontrado el error*:',
                explanationReason: 'Por favor, indique el motivo del error*:',
                reason: '',
                send: "Enviar",
                otrosSelected: false,
                reasonsChecked: {},
            }
        },
        methods: {   
            jugar() {
                // Iniciamos el juego
                // Si es el nivel 3 --> iniciar el temporizador
                if (!this.easyNormalGame) {
                    this.startTimer()
                } else {
                    // Cargamos las mujeres por rondas

                }
                //Al acabar el juego --> Mostramos las estadisticas al terminar el juego
                this.showModalPartidaFin();
                // Guardamos la partida del usuario y sus mujeres desbloqueadas

            },         
            showModalPartidaFin() {
                this.$refs['finJuego'].show();
                // $("#modal-fin-juego").show();
            },
            startTimer() {
                this.btnEmpezarClass = 'disabled outline-dark';
                this.finished = false;
                // let modalFinPartida = this.$refs.finJuego.$el;

                this.timerMobile = false;

                let global = this;
                this.bonus = 0;
                this.puntos = 0;

                global.timer = setInterval(function() {
                    if (global.value > 0) {
                        global.value -= .1;

                        if (global.value >= 100) {
                            // this.showModalPartidaFin();
                            clearInterval(global.timer);
                        }  else if (global.value < 0) {
                            document.getElementById('btnEmpezar').innerText = "Empezar";
                            global.btnEmpezarClass = '';
                            global.value = 100;
                            console.log("se acabo!");
                            // this.showModalPartidaFin();
                            clearInterval(global.timer);
                            this.showModalPartidaFin();
                        }
                        // this.showModalPartidaFin();

                    }

                // this.showModalPartidaFin();

                }, 100);
                
                // this.showModalPartidaFin();

            
            },
            finished: () => {
                this.$refs.countdown.updateTime(100);
                this.timerMobile = false;
                console.log("patata");

            },
            otrosSeleccionado() {
                if (this.otrosSelected) {
                    this.otrosSelected = false;
                } else {
                    this.otrosSelected = true;
                }
            },
            otros() {
                var checkBox = document.getElementById("otros");
                var text = document.getElementById("otrostext");

                if (checkBox.checked == true){
                    text.style.display = "block";
                } else {
                    text.style.display = "none";
                }
            },
            sumarPuntuacion() {

                if (!this.isSmall) {
                    this.bonus1 = 10;
                    this.bonus2 = 20;
                    this.bonus3 = 30;
                    this.bonus4 = 35;
                } else {
                    this.bonus1 = 5;
                    this.bonus2 = 10;
                    this.bonus3 = 15;
                    this.bonus4 = 20;
                }

                if (this.acierta === 1) {

                    if (this.onRow == 0) {
                        this.puntos +=this.bonus1;
                        this.onRow += 1;                        
                    } else if (this.onRow == 1) {
                        this.puntos +=this.bonus2;
                        this.onRow += 1;
                        this.bonus = ("BONUS x " + this.onRow);                        
                    } else if (this.onRow == 2) {
                        this.puntos +=this.bonus3;
                        this.onRow += 1;
                        this.bonus = ("BONUS x " + this.onRow );                        
                    } else if (this.onRow >= 3) {
                        this.puntos +=this.bonus4;
                        this.onRow += 1;
                        this.bonus = ("BONUS x " + this.onRow );
                    }
                } else {
                    this.onRow = 0;
                    console.log("No has acertado");
                }
            },
            sendEmail() {
                let checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
                if(checkboxes.length == 0) {
                    this.$swal({  
                            type: 'warning',
                            icon: 'warning',  
                            title: '¡Vaya!',  
                            text: 'Parece que no has rellenado los datos necesarios, vuelve a intentarlo',
                        });  
                }
                else{

                    let data = {
                        who: this.user,
                        subject: this.checkboxes,
                        explanation: this.reason,
                        // No tenemos puesto las imagenes
                        photos: this.images,
                    };

                    //Log sending data
                    console.log(data);

                    G_error.sendEmail(data)
                        .then(() => {
                            console.log(data);
                        })
                        .catch(e=> {
                            console.log(e);
                        })

                    alert('Processing');

                }
            },
            enoughDimensionsToPlay() {
                let maxWidth = $('html').css('max-width');
                if (maxWidth == '600px') {
                    return false;
                } else {
                    return true;
                }
            },
            playWithFour() {
                let maxWidth = $('html').css('max-width');
                if (maxWidth == '600px') {
                    return true;
                } else {
                    return false;
                }
            },
            selectDato() {
                let index = Math.floor(Math.random() * this.datos.length);

                while (this.alreadyAskedDatos.includes(index) || !this.mujeresEnPantalla.includes(this.datos[index].id)) {
                    index = Math.floor(Math.random() * this.datos.length);
                } 

                this.alreadyAskedDatos.push(index);

                this.currentDato = this.datos[index];
                
                console.log("preguntados:" + this.alreadyAskedDatos);
            },
            comprobarDato(idMujer) {
                if (idMujer === this.currentDato.id) {
                    alert("CORRECTO BOLUDO");
                    this.sumarPuntuacion();
                    this.selectDato();
                } else {
                    alert("INCOOOOOOOOORRECTO PAI");
                }
            }
        },
        mounted() {
            //CHECK IF DATA EXIST
            if ((Juego.getNivel() == null || Juego.getAmbito() == null) || (Juego.getAmbito().length <= 0) || (Juego.getNivel() < 0 || Juego.getNivel() > 2)) {
                    this.$router.push({name: 'selectNivel'});
            }  
            
            if (Juego.getNivel() != 2) {
                this.easyNormalGame = true;
            }

            if (!this.enoughDimensionsToPlay()) {
                alert("Tu dispositivo es demasiado pequeño para poder jugar :(");
                this.$router.push({name: 'selectNivel'});
            }
            

            //Validacion ok, start loading game

            GameDataService.loadMujeresForGame()
                .then((response) => {
                    this.mujeres = response.data.mujeres;
                    this.datos = response.data.datos;

                    if (this.mujeres !== null && this.mujeres.length > 0) {
                        this.cardsDeck = this.mujeres.slice(0, 12);

                        for (let i = 0; i < this.cardsDeck.length; i++) {
                            const carta = this.cardsDeck[i];

                            this.mujeresEnPantalla.push(carta.id);    
                        }

                        //DATA IS LOADED, DO STUFF HERE
                        this.selectDato();
                    }
                })
                .catch((error) => {
                    console.log(error);
                });


            // Error modal
            this.$root.$on('bv::modal::show', (bvEvent, modalId) => {
                if (modalId === "report-error") {
                    clearInterval(this.timer);

                    let btn = document.getElementById('btnEmpezar');
                    
                    btn.innerText = "continuar";
                    this.btnEmpezarClass = '';
                }
            })
        }
    }

</script>

<style>
.exclamation:hover {
    transform:scale(1.2,1.2);
}
#otrostext{
    display: none;
}
#categoriatext{
    resize: none;
}
body{
background-color: aliceblue;
}
.full{
    max-width: 100%;
    padding-left:1%;
}
.kutxa {
    background-color: salmon;
    color: black;
    width: 50px;
    height: 50px;
    padding: 5%;
    margin: 2%;
}
body{
    background-color: whitesmoke;
}
@media (max-width: 600px) {
    #temporizador {
        visibility: hidden;
    }
    #countdown {
        visibility: visible;
    }
}
@media (min-width: 600px) {
    #countdown {
        visibility: hidden;
    }
}
</style>
<style lang="sass">
$color: #4e3757
$bg: #2d2c2f

#btn
    background-color: $color
    border-color: $color

.custom-checkbox .custom-control-input:checked~.custom-control-label::before
    background-color: $color

.bg-purple
    background-color: $color

</style>