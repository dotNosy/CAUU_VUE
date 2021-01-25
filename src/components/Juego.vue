<template>

    <div class="juego">
        <b-row class="full">
            <h3>Mujeres en las ciencias sociales</h3>
            <hr>
        </b-row>
        <b-row class="full">
            <b-link variant="Link" to="SelectNivel">Volver</b-link>
        </b-row>
        <b-row class="full">
            <!-- Cards of the game -->
            <b-col>
                <b-row>
                    <b-col class="kutxa" v-on:click="sumarPuntuacion()">1</b-col>
                    <b-col class="kutxa" v-on:click="sumarPuntuacion()">2</b-col>
                    <b-col class="kutxa">3</b-col>
                    <b-col class="kutxa">4</b-col>
                </b-row>
                <b-row>
                    <b-col class="kutxa">5</b-col>
                    <b-col class="kutxa">6</b-col>
                    <b-col class="kutxa">7</b-col>
                    <b-col class="kutxa">8</b-col>
                </b-row>               
                <b-row>
                    <b-col class="kutxa">9</b-col>
                    <b-col class="kutxa">10</b-col>
                    <b-col class="kutxa">11</b-col>
                    <b-col class="kutxa">12</b-col>
                </b-row>                
                <b-row>
                    <b-col class="kutxa">13</b-col>
                    <b-col class="kutxa">14</b-col>
                    <b-col class="kutxa">15</b-col>
                    <b-col class="kutxa">16</b-col>
                </b-row>
            </b-col>

            <!-- Facts + Alerts -->
            <b-col>
                <b-row>DATO</b-row>
                <b-row>{{prueba}}</b-row>
                <b-row>{{bonus}}</b-row>

                <!-- Notificacion -->
                <b-row hidden>Mujer descubierta</b-row>
                <b-row hidden>Dato descubierto</b-row>
            </b-col>

            <!-- Return + Punctuation + Highscore + Begin -->
            <b-col class="full">

                <p class="h1 mb-2"><b-icon icon="exclamation-circle-fill" variant="danger" @click="$bvModal.show('report-error')" class="exclamation" style="cursor: hand;"></b-icon></p>
                <h6>Tu puntuación</h6>
                <h6>{{ puntos }}</h6>
                <b-button v-show="!easyNormalGame"  v-bind:class="[btnEmpezarClass]" variant="dark" id="btnEmpezar" size="lg" pill @click="startTimer">Empezar!</b-button>
            </b-col>
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
                    <b-button type="submit" variant="primary" id="btn" @click="mandarError()">{{send}}</b-button>
                </b-form>
                
            </div>
        </b-modal>

    </div>

</template>

<script>
// import func from '../../vue-temp/vue-editor-bridge';
import Juego from "../Juego"

    export default {
        data() {
            return {
                btnEmpezarClass : '',
                timer: null,
                easyNormalGame: false,
                timerMobile: true,
                puntos: 0,
                onRow: 0,
                bonus: '',

                prueba: 1,

                value: 100,
                max: 100,
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
            startTimer() {
                this.btnEmpezarClass = 'disabled outline-dark';
                this.finished = false;

                this.timerMobile = false;

                let global = this;

                global.timer = setInterval(function() {
                    if (global.value > 0) {
                        global.value -= .1;

                        if (global.value >= 100) {
                            clearInterval(global.timer);
                        }  else if (global.value < 0) {
                            document.getElementById('btnEmpezar').innerText = "Empezar";
                            global.btnEmpezarClass = '';
                            global.value = 100;
                            alert("se acabo!");
                            clearInterval(global.timer);
                        }
                    }
                }, 100);
            
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

                if (this.prueba === 1) {

                    if (this.onRow == 0) {
                        this.puntos +=10;
                        this.onRow += 1;
                        
                    } else if (this.onRow == 1) {
                        this.puntos +=20;
                        this.onRow += 1;
                        this.bonus = ("BONUS x " + this.onRow);
                        
                    } else if (this.onRow == 2) {
                        this.puntos +=30;
                        this.onRow += 1;
                        this.bonus = ("BONUS x " + this.onRow );

                        
                    } else if (this.onRow >= 3) {
                        this.puntos +=35;
                        this.onRow += 1;
                        this.bonus = ("BONUS x " + this.onRow );

                    }
                } else {
                    console.log("No has acertado");
                }

                // console.log(this.puntos);

            },
            mandarError() {
                let checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
                if(checkboxes.length == 0) {
                    alert("Por favor seleccione al menos una categoría de error");
                }
                else{
                    alert('Processing');
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

            //
            this.$root.$on('bv::modal::show', (bvEvent, modalId) => {
                if (modalId === "report-error") {
                    clearInterval(this.timer);

                    let btn = document.getElementById('btnEmpezar');
                    
                    btn.innerText = "continuar";
                    this.btnEmpezarClass = '';
                }
            })
        },
    }

</script>



<style>
/* * {margin-left: 5px;} */
    .exclamation:hover {
        transform:scale(1.2,1.2);
    }
    #otrostext{
        display: none;
    }
    #categoriatext{
        resize: none;
    }

    .full{
        /* background-color:red ; */
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