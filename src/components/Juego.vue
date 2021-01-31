<template>

    <div class="juego">
        <b-row class="full">
            <h3>Mujeres en las ciencias sociales</h3>
            <hr>
        </b-row>

        <b-row class="full mb-5">
                 <b-col class="full"> 
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
                v-show="!easyNormalGame"
            ></circular-count-down-timer>
        </b-col>

            <!-- Return + Punctuation + Highscore + Begin -->
            <b-col class="full">
                <p class="h1 mb-2"><b-icon icon="exclamation-circle-fill" variant="danger" @click="$bvModal.show('report-error')" class="exclamation" style="cursor: hand;"></b-icon></p>
                <h6>Tu puntuación</h6>
                <h6>{{ puntos }}</h6>
                <b-button :variant="btnEmpezarClass" id="btnEmpezar" size="lg" pill @click="jugar()">Empezar</b-button>
            </b-col>
        </b-row>
            
            <!-- LOADING -->
            <b-row style=""  class="full"><b-col cols="12">
                <div id="loading" class="text-center"><b-spinner class="my-1" style="width: 15rem; height: 15rem;" variant="danger" label="Cargando..."></b-spinner></div>
            </b-col></b-row>

            <!-- DATO -->
            <b-row class="full mt-5" id="dato" style="display:none;">
                <b-col>
                    <b-alert show variant="warning" style="color:black"><h2>{{this.currentDato}}</h2></b-alert>
                </b-col>
            </b-row>

            <!-- Cards of the game -->
            <b-row cols="3">
                <div v-for="(mujer, key) in cardsDeck" :key="key" 
                    class="my-3" style="maxWidth:24rem;"  
                    @click="clickCarta(mujer.id)"
                    @mouseenter="cartaHoverEnter(mujer.id)"
                    @mouseleave="cartaHoverLeave(mujer.id)">
                    <b-col >
                        <b-card
                            :id="mujer.id"
                            :ref="'card' + mujer.id"
                            tag="article"
                            class="mb-2"
                            :style="{ 
                                backgroundImage: 'url(' + require('@/assets/Cartas/single/'+ mujer.ambito.trim().toLowerCase() +'_borde.png') + ')',
                                color:'white',
                                backgroundSize: 'cover',
                                width: '100%',
                                transform: 'scale(0.7)',
                                cursor:'pointer'
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

        <!-- INI Modal fin del juego -->
        <b-modal id="modal-fin-juego" ref="finJuego" title="¡Partida finalizada!" centered hide-footer>
            <p class="my-4 text-center">La partida ha finalizado.</p>
            <p class="my-4 text-center"><strong>Puntuación obtenida: {{puntos}}</strong></p>
            <p class="my-4 text-center"><strong>Mujeres desbloqueadas en esta partida: {{ mujeresDesbloqueadas.length }} </strong></p>
            <p class="my-4 text-center"><strong>Datos desbloqueados en esta partida: {{ datosDesbloqueados.length }} </strong></p>
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

            <b-link variant="Link" to="selectNivel">
                <b-button variant="info" class="mt-3" block>Jugar de nuevo</b-button>
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
import anime from 'animejs';

import $ from 'jquery'

    export default {
        data() {
            return {
                helperThis: this,
                //Timer
                    timer: null,
                    timerMobile: true,
                    value: 100,
                    max: 100,
                // Juego
                    btnEmpezarClass : 'dark disabled',
                    easyNormalGame: false,
                    start: false,
                    coleccion: null,
                    datosColeccion: null,
                    mujeresDesbloqueadas: [],
                    datosDesbloqueados: [],
                //Cartas
                    //Total cartas partida
                    mujeres: null,
                    //Cartas en pantalla (9)
                    cardsDeck: {},
                    cartasCorrectas: 0,
                    vueltasDeck: 1,
                    //IDs de las cartas en pantalla
                    mujeresEnPantalla: [],
                //Datos cartas
                    datos: null,
                    currentDato: {
                        idDato: null,
                        idMujer: null,
                        dato: null,
                    },
                    alreadyAskedDatos : [],
                //valores bonus
                    bonus1:0,
                    bonu2:0,
                    bonus3:0,
                    bonus4:0,
                // si aciertas
                    acierta: 1,
                    puntos: 0,
                    onRow: 0,
                    bonus: '',

                //Validar si es valido y si es pc o movil
                validDeviceDimensions:this.enoughDimensionsToPlay(),
                isSmall: this.playWithFour(),
               
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
            jugar() {
                if (this.start) {
                    return false;
                }

                // Si es el nivel 3 --> iniciar el temporizador
                if (!this.easyNormalGame) {
                    this.startTimer()
                }

                this.selectDato();

                $("#dato").fadeIn("Slow");

                this.start = true;
            },
            startTimer() {
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
                            clearInterval(global.timer);
                        }  else if (global.value < 0) {
                            global.value = 0;
                            clearInterval(global.timer);

                            let gameInfo = {
                                    level: Juego.getNivel(),
                                    score: global.puntos
                                }

                            let data = {
                                gameInfo: gameInfo,
                                mujeresDesbloqueadas: global.mujeresDesbloqueadas,
                                datosDesbloqueados: global.datosDesbloqueados,
                            }

                            GameDataService.gameScore(data)
                                .then(() => {
                                    global.$bvModal.show('modal-fin-juego');
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        }
                    }

                }, 100);
            },
            selectDato() {
                //Coger una posicion aleatoria del array de datos
                let index = Math.floor(Math.random() * this.datos.length);

                //Si la posicion ya ha salido o el dato no es de una mujer que esta en pantalla --> tirar otra vez
                while (this.alreadyAskedDatos.includes(index) || !this.mujeresEnPantalla.includes(this.datos[index].id)) {
                    index = Math.floor(Math.random() * this.datos.length);
                } 

                //Apuntar el dato que ha salido
                this.alreadyAskedDatos.push(index);

                //Preguntar el dato en pantalla
                this.currentDato = this.datos[index];
            },
            comprobarDato(idMujer) {
                if (idMujer === this.currentDato.id) {
                    //* Animacion DATO OK   
                    let card = 'card'+idMujer;
                    anime({
                        targets: this.$refs[card][0],
                        rotateZ: ['0', '360'],
                        duration: 600,
                        easing:'easeInOutQuad'
                    });

                    //Comprobar si la mujer estaba en la coleccion
                        let isInColeccion = false;
                        for (let i = 0; i < this.coleccion.length; i++) {
                            const cartaCol = this.coleccion[i];

                            if (cartaCol.id == idMujer) {
                                isInColeccion = true;
                                break;
                            }
                        }

                        if (!isInColeccion) {
                            this.mujeresDesbloqueadas.push(idMujer);
                        }

                    //Comprobar si el dato estaba en la collecion
                        isInColeccion = false;
                        for (let i = 0; i < this.datosColeccion.length; i++) {
                            const datoCol = this.datosColeccion[i];
                            
                            if (datoCol.id == this.currentDato.idDato ) {
                                isInColeccion = true;
                                break;
                            }
                        }

                        this.datosDesbloqueados.push(this.currentDato.idDato);


                    this.sumarPuntuacion();

                    $('#' + idMujer).fadeOut("slow");

                    //* Quitar de los datos en pantalla
                    let copiaMujeresEnPantalla = [];
                    for (let i = 0; i < this.mujeresEnPantalla.length; i++) {
                        const element = this.mujeresEnPantalla[i];
                        copiaMujeresEnPantalla.push(element);
                    }

                    this.mujeresEnPantalla.splice(0)
                    
                    for (let i = 0; i < copiaMujeresEnPantalla.length; i++) {
                        const muujer = copiaMujeresEnPantalla[i];

                        if (idMujer !== muujer) {
                            this.mujeresEnPantalla.push(muujer);
                        }
                    }

                    this.comprobarMano();
                } 
                else {
                    //* Animacion DATA KO
                    let card = 'card'+idMujer;
                    anime({
                        targets: this.$refs[card][0],
                        translateX: ['-.40rem', '.40rem'],
                        duration: 50,    
                        direction: 'alternate',
                        loop: 10,
                        easing: 'easeOutBack',
                    });
                }
            },
            comprobarMano () {
                this.cartasCorrectas++;

                if (this.cartasCorrectas === 9 || this.cartasCorrectas === 18 || this.cartasCorrectas === 27 || this.cartasCorrectas === 36) {
                    //* Mano completa sacar otros 9
                    let cartasPorMano = 9 * this.vueltasDeck;
                    let mujeresSiguienteVuelta 
                    const ambitos = Juego.getAmbito();

                    if (cartasPorMano + 9 <= this.mujeres.length) {
                        mujeresSiguienteVuelta = this.mujeres.slice(cartasPorMano + 1, cartasPorMano + 9);
                    }
                    else{
                        if (cartasPorMano == this.mujeres.length) {
                            mujeresSiguienteVuelta = this.mujeres[cartasPorMano];
                        }
                        else {
                            mujeresSiguienteVuelta = this.mujeres.slice(cartasPorMano, this.mujeres.length);
                            console.log('no da para mas mujeres');
                        }
                    }

                    for (let i = 0; i < mujeresSiguienteVuelta.length; i++) {
                        const mujer = mujeresSiguienteVuelta[i];

                        this.cardsDeck.push(mujer);
                    }

                    this.mujeresEnPantalla = [];
                    for (let i = 0; i < mujeresSiguienteVuelta.length; i++) {
                            const carta = mujeresSiguienteVuelta[i];
                            carta.ambito = ambitos[carta.ambito_id -1];
                            this.mujeresEnPantalla.push(carta.id);  
                    }

                    this.vueltasDeck++;

                    console.log("siguiente mano");
                }
                //* ERES BUENISIMO HAS GANADO CRACK
                else if (this.cartasCorrectas === 45) {
                    console.log("crack");
                    this.start = false;
                    
                    let gameInfo = {
                        level: Juego.getNivel(),
                        score: this.puntos
                    }

                    let data = {
                        gameInfo: gameInfo,
                        mujeresDesbloqueadas: this.mujeresDesbloqueadas,
                        datosDesbloqueados: this.datosDesbloqueados,
                    }

                    GameDataService.gameScore(data)
                    .then(() => {
                        this.$bvModal.show('modal-fin-juego');
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                }
                //* NO QUEDAN MAS MUJERES
                else if (this.cartasCorrectas >= this.mujeres.length) {
                    this.start = false;
                    console.log('No quedan mas mujeres');

                    let gameInfo = {
                        level: Juego.getNivel(),
                        score: this.puntos
                    }

                    let data = {
                        gameInfo: gameInfo,
                        mujeresDesbloqueadas: this.mujeresDesbloqueadas,
                        datosDesbloqueados: this.datosDesbloqueados,
                    }

                    GameDataService.gameScore(data)
                    .then(() => {
                        this.$bvModal.show('modal-fin-juego');
                    })
                    .catch((error) => {
                        console.log(error);
                    });                    
                }
                
                if (this.cartasCorrectas <= this.mujeres.length && this.mujeresEnPantalla.length > 0) {
                    this.selectDato();
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
            clickCarta(idMujer) {
                if (this.start) {
                    this.comprobarDato(idMujer);
                }
            },
            //Animaciones carta
            cartaHoverEnter(id) {
                if (this.start) {
                    let element = 'card'+id;

                    anime.remove(this.$refs[element][0]);
                    anime({
                        targets: this.$refs[element][0],
                        scale: 1,
                        duration: 1000,
                        elasticity: 400
                    });
                } 
            },
            cartaHoverLeave(id) {
                if (this.start) {
                    let element = 'card'+id;

                    anime.remove(this.$refs[element][0]);
                    anime({
                        targets: this.$refs[element][0],
                        scale: 0.7,
                        duration: 400,
                        elasticity: 300
                    });
                }
            },


            //* MODAL ERROR REPORT

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
                    this.coleccion = response.data.coleccion;
                    this.datosColeccion = response.data.datos_coleccion;

                    if (this.mujeres !== null && this.mujeres.length > 0) {
                        this.cardsDeck = this.mujeres.slice(0, 9);
                        const ambitos = Juego.getAmbito();

                        for (let i = 0; i < this.cardsDeck.length; i++) {
                            const carta = this.cardsDeck[i];
                            carta.ambito = ambitos[carta.ambito_id -1];
                            this.mujeresEnPantalla.push(carta.id);    
                        }

                        //DATA IS LOADED, DO STUFF
                        $('#loading').fadeOut("fast");
                        this.btnEmpezarClass = 'success'
  
                        $("#btnEmpezar").removeAttr("disabled");
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