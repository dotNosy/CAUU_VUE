<template>
    <div>

        <b-row>
            <b-col>
                <b-link variant="Link" to="Perfil">Volver</b-link>
            </b-col>
            <b-col><h5>{{titulo}}</h5></b-col>
            <b-col></b-col>
        </b-row>

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
                    variant="light" 
                    pill >
                    <b-icon 
                        icon="info-circle-fill" 
                        scale="2" 
                        variant="info" 
                        :id=key></b-icon>
                </b-button>
                
            </label>
            {{ nivel_id }}
        </div>

        <!-- Checkboxes -->

        <b-form-group>
            <template #label>
                <b-form-checkbox
                    v-model="allSelected"
                    :indeterminate="indeterminate"
                    aria-describedby="ambitos"
                    aria-controls="ambitos"
                    @change="selectAll"
                >
                    {{ allSelected ? 'Deseleccionar' : 'Seleccionar' }}
                    All Selected: <strong>{{ allSelected }}</strong><br>
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
                >
                </b-form-checkbox-group>
                Seleccionados: {{ selected }}
            </template>
        
        </b-form-group>
            
        <b-button variant="dark" size="lg" pill @click="comprobarSeleccion()">Ir al juego</b-button>
    </div>
</template>

<script>
import InfoDataService from "../Services/InfoDataService"
import Juego from "../Juego"

    export default {
        data() {
            return {
                titulo: "Seleccione nivel y ámbitos para jugar, después pulse comenzar",
                niveles: [
                    {nombre: "Nivel 1", dificultad: "Fácil"},
                    {nombre: "Nivel 2", dificultad: "Normal"},
                    {nombre: "Nivel 3", dificultad: "Difícil"},
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

            InfoDataService.ambitos()
                .then(response => {
                    let array = response.data.ambitos;

                    array.forEach(element=>{
                        th.ambitoLista.push(element.nombre);
                    });
                })
                .catch(e => {
                    console.log(e);
                });
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