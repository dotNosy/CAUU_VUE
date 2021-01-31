<template>
    <div style="
            border: 2px solid #4E3757;
            height: 100%;
            width: 50%;
            margin-left: auto;
            margin-right: auto;
            margin-top: 4em;">

        <b-row> 
            <br>
            <br>
        </b-row>

        <b-row>
            <b-col>
                <p class="h3">{{titulo}}</p>
                <p class="h3">{{subtitulo}}</p>
            </b-col>
        </b-row>

        <br><br>

        <!-- Niveles -->
        <div class="btn-group btn-group-toggle" data-toggle="buttons">
            <label class="btn btn-outline-secondary" :class="nivel_id === Number(key) ? 'active': ''" v-for="(n, key) in niveles" :key="key">
                <input type="radio"
                    class="btn-group-toggle"
                    name="nivel_id"
                    :id="'level_' + key"
                    :value="key"
                    v-model.number="nivel_id">
                {{ n.nombre }}
                <b-button 
                    v-b-popover.hover.top="n.dificultad" 
                    :title="n.nombre" 
                    variant="link" 
                    pill 
                    >
                    <b-icon 
                        icon="info-circle-fill" 
                        scale="2" 
                        variant="info" 
                        :id=key></b-icon>
                </b-button>
                
            </label>
        </div>

        <!-- Checkboxes -->
        <div class="divSelect">
            <b-form-group>
                <template #label>
                    <b-form-checkbox
                        v-model="allSelected"
                        :indeterminate="indeterminate"
                        aria-describedby="ambitos"
                        aria-controls="ambitos"
                        @change="selectAll"
                    >
                        {{ allSelected ? 'Deseleccionar' : 'Seleccionar todos' }}
                    </b-form-checkbox>
                </template>

                <template v-slot="{ ariaDescribedby }" >
                    <b-form-checkbox-group
                        id="ambitos"
                        v-model="selected"
                        stacked
                        :options="ambitoLista"
                        :aria-describedby="ariaDescribedby"
                        name="ambitos"
                        aria-label="Ambitos individuales" 
                        style="text-align:left; 
                        "   
                    >
                    </b-form-checkbox-group>
                </template>
            </b-form-group>
            <b-button variant="dark" class="btnJuego mt-2 mb-5" size="lg" pill @click="comprobarSeleccion()">Ir al juego</b-button>
        </div>
        <!-- Cargando -->
        <div id="ambitosLoading"><b-spinner class="my-1" style="width: 2rem; height: 2rem;" variant="primary" label="Cargando ambitos..."></b-spinner></div>
        <br>
        <br>
    </div>
</template>

<script>
import InfoDataService from "../Services/InfoDataService"
import Juego from "../Juego"
import $ from "jquery";

    export default {
        data() {
            return {
                titulo: "Seleccione nivel y ámbitos para jugar, ",
                subtitulo: "después pulse 'Ir al juego'",
                niveles: [
                    {nombre: "Nivel 1", dificultad: "Fácil: Juegas 10 rondas con los datos más fáciles de las mujeres."},
                    {nombre: "Nivel 2", dificultad: "Normal: Juegas 10 rondas con todos los datos de las mujeres."},
                    {nombre: "Nivel 3", dificultad: "Difícil: Anota la máxima puntuación disponible jugando contra el temporizador con todos los datos de las mujeres"},
                ],
                nivel_id: null,
                ambitoLista: [],
                selected: [],
                allSelected: false,
                indeterminate: false
            }
        },
        methods: {
            selectAll(checked) {

                this.selected = checked ? this.ambitoLista.slice() : []

            },

            comprobarSeleccion() {
                if (this.nivel_id === null) {
                    alert("Debes seleccionar un nivel");
                    return false;
                } 
                else if (this.nivel_id != 0 && this.nivel_id != 1 && this.nivel_id != 2 ) {
                    alert("El nivel que has seleccionado no está contemplado en nuestro juego, seleccione otro, por favor");
                    return false;
                }
                else if (this.selected.length < 1) {
                    alert("Debes seleccionar un ámbito por lo menos");
                    return false;
                } 
                else {
                    Juego.setNivel(this.nivel_id);
                    Juego.setAmbito(this.selected);
                    this.$router.push({name: 'juego'});
                }
            }
        },
        mounted () {
            let th = this;

            $("#ambitosLoading").fadeIn("slow");

            let ambitosCache = localStorage.getItem('ambitos');

            if (ambitosCache === null) {
                InfoDataService.ambitos()
                .then(response => {
                    let array = response.data.ambitos;

                    array.forEach(element=>{
                        th.ambitoLista.push(element.nombre);
                    });

                    localStorage.setItem('ambitos', th.ambitoLista);

                    $("#ambitosLoading").hide();

                })
                .catch(e => {
                    console.log(e);
                });
            } else {

                console.log(ambitosCache);
                let ambitos = ambitosCache.split(',');

                for (let i = 0; i < ambitos.length; i++) {
                    const element = ambitos[i];
                    this.ambitoLista.push(element);
                }

                    $("#ambitosLoading").hide();
            }
        },
        watch: {
            selected(newValue) {
                console.log(newValue);

                if (newValue.length === 0) {
                    this.indeterminate = false
                    this.allSelected = false
                } 
                else if (newValue.length === this.ambitoLista.length) {
                    this.indeterminate = false
                    this.allSelected = true
                } 
                else {
                    this.indeterminate = true
                    this.allSelected = false
                }
            }
        }
    }
</script>
<style>
body{
    background-color:#BA9AC8;
    overflow: auto;
}
.divSelect{
    margin-top: 1em;
    margin-left: auto;
    margin-right: auto;
    text-align:left; 
    margin-left: 42%;
}
@media (max-width: 992px) {
    body{
        padding-bottom: 20%;
    }
    .btnJuego{
        width: 70%;
    }
    .divSelect{
        margin-left: 3rem;
    }
}
@media (max-width: 576px) {
    .btnJuego{
        width: 80%;
    }
    .divSelect{
        margin-left: 1rem;
    }
}
</style>