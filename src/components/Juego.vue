<template>

    <div class="juego">
        <b-row>
            <h3>Mujeres en las ciencias sociales</h3>
            <hr>
        </b-row>
        <b-row>
            <b-link variant="Link" to="SelectNivel">Volver</b-link>
        </b-row>
        <b-row>
            <!-- Cards of the game -->
            <b-col>
                <b-row>
                    <b-col>1</b-col>
                    <b-col>2</b-col>
                    <b-col>3</b-col>
                    <b-col>4</b-col>
                </b-row>
                <b-row>
                    <b-col>5</b-col>
                    <b-col>6</b-col>
                    <b-col>7</b-col>
                    <b-col>8</b-col>
                </b-row>               
                <b-row>
                    <b-col>9</b-col>
                    <b-col>10</b-col>
                    <b-col>11</b-col>
                    <b-col>12</b-col>
                </b-row>                
                <b-row>
                    <b-col>13</b-col>
                    <b-col>14</b-col>
                    <b-col>15</b-col>
                    <b-col>16</b-col>
                </b-row>
            </b-col>

            <!-- Facts + Alerts -->
            <b-col>
                <b-row>DATO</b-row>
                <b-row>Mujer descubierta</b-row>
                <b-row>Dato descubierto</b-row>
            </b-col>

            <!-- Return + Punctuation + Highscore + Begin -->
            <b-col>

                <p class="h1 mb-2"><b-icon icon="exclamation-circle-fill" variant="danger" @click="$bvModal.show('report-error')" class="exclamation" style="cursor: hand;"></b-icon></p>
                <h6>Tu puntuación</h6>
                <h6>{{ puntos }}</h6>
                <b-button v-bind:class="[btnEmpezarClass]" variant="dark" id="btnEmpezar" size="lg" pill @click="startTimer">Empezar!</b-button>
            </b-col>
        </b-row>

        <b-row>
            <!-- Temporizador -->
            <b-progress :value="value" :max="max" show-progress animated class="w-50 mb-2" variant="purple"></b-progress>
        </b-row>

        <!-- Formulario de reportar error -->
        <b-modal id="report-error"  hide-footer>
            <template #modal-title>{{ titulo }}</template>
            <div class="d-block text-center">
                <b-form>

                    <p class="my-4"> {{ explanationWhere }}</p>
                        <b-row>
                            <b-col><b-form-checkbox name="check" value="cartas" v-model="reasonsChecked">Cartas</b-form-checkbox></b-col>
                            <b-col><b-form-checkbox name="check" value="juego" v-model="reasonsChecked">Juego</b-form-checkbox></b-col>
                        </b-row>
                        <b-row>
                            <b-col><b-form-checkbox name="check" value="puntuacion" v-model="reasonsChecked">Puntuacion</b-form-checkbox></b-col>
                            <b-col><b-form-checkbox name="check" value="otros" id="otros" v-model="reasonsChecked" v-on:change="otros()">Otros, por favor, indique</b-form-checkbox></b-col>
                        </b-row>
                        <b-row>
                            <b-form-textarea id="otrostext" v-model="text" placeholder="Inserte el título del problema" rows="2" max-rows="6"></b-form-textarea>
                        </b-row>
                        <b-row>
                            <b-col><b-form-input v-show="otrosSelected == true" v-model="reasonsChecked" v-on:change="otrosSeleccionado()"></b-form-input></b-col>
                        </b-row>

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

                    <b-button @click="mandarError()" variant="dark">{{send}}</b-button>
                </b-form>


                
            </div>
        </b-modal>

    </div>

</template>

<script>
// import func from '../../vue-temp/vue-editor-bridge';

    export default {
        data() {
            return {
                btnEmpezarClass : '',
                timer: null,
                puntos: 0,
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

                let global = this;

                global.timer = setInterval(function() {
                    if (global.value > 0) {
                        global.value -= .1;
                        
                        console.log(global.value);

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
            mandarError() {
                console.log("aaaa");
                alert('Processing');
            }
        },
        mounted() {
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
/* * {margin-left: 5px;} */
    .bg-purple {
    background-color: purple;
    }
    .exclamation:hover {
        transform:scale(1.2,1.2);
    }
    #otrostext{
        display: none;
    }
</style>