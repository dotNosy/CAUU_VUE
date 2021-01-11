<template>
    <div>

        <b-row>
            <b-col>
                <b-link variant="Link" to="Perfil">Volver</b-link>
            </b-col>
            <b-col>{{titulo}}</b-col>
            <b-col></b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-button variant="dark" size="lg" pill>Nivel 1</b-button>
                <b-button v-b-popover.hover.righttop="nivel1" title="Nivel 1" variant="light" pill ><b-icon icon="info-circle-fill" scale="2" variant="info" id="1"></b-icon></b-button>

            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-button variant="dark" size="lg" pill>Nivel 2</b-button>
                <b-button v-b-popover.hover.righttop="nivel2" title="Nivel 2" variant="light" pill ><b-icon icon="info-circle-fill" scale="2" variant="info" id="2"></b-icon></b-button>

            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-button variant="dark" size="lg" pill >Nivel 3</b-button>
                <b-button v-b-popover.hover.righttop="nivel3" title="Nivel 3" variant="light" pill ><b-icon icon="info-circle-fill" scale="2" variant="info" id="3"></b-icon></b-button>
            </b-col>
        </b-row>

        <!-- Checkboxes -->
        <div v-for="(ambito, index) in ambitoLista" v-bind:key="ambito.id">
            <input type="checkbox" v-model='ambito[index]'> {{ ambito.nombre }}
            
        </div>  

        


    </div>
</template>

<script>

import InfoDataService from "../Services/InfoDataService"

    export default {
        data() {
            return {
                titulo: "Seleccione nivel y ámbitos para jugar, después pulse comenzar",
                nivel1: "Fácil",
                nivel2: "Normal",
                nivel3: "A3",
                ambitoLista: [],
                ambitos: []
            }
        },
        mounted () {
            let th = this;
            this.ambitos = InfoDataService.ambitos().then(response => {
                console.log(response.data);

                th.ambitoLista = response.data.ambitos;

            }
            ).catch(e => {
                console.log(e);
                }
            );
            console.log(this.ambitos);
        }
        
    }
</script>
