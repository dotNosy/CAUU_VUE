<template>
    <section>
        <b-row cols="2">
                <b-card cols  v-for="(carta, key) in cartas" :key="key"
                    no-body 
                    class="overflow-hidden">
                        <b-row no-gutters>
                            <b-col 
                                md="6" 
                                class="text-center"
                                :style="{
                                    backgroundImage: 'url(' + require('@/assets/Cartas/single/'+ ambitos[carta.mujer.ambito_id -1].nombre.trim().toLowerCase() +'.png') + ')',
                                    color:'white',
                                    backgroundSize: 'cover',
                                    width: '100%', }">

                                    <br><br>
                                    <b-avatar src="https://placekitten.com/300/300" size="14rem"></b-avatar>
                                    <div style="background: rgba(0, 0, 0, 0.25); " class="my-4 py-2">
                                        <h1>{{carta.mujer.nombre}}</h1>
                                        <h2>{{ambitos[carta.mujer.ambito_id -1].nombre}}</h2>
                                        <b-card-text>
                                            {{carta.mujer.zona_geografica}}
                                        </b-card-text>
                                    </div>                                    
                            </b-col>

                            <b-col md="6">
                                <b-tabs card>
                                <b-tab title="Datos" active>
                                    <b-list-group v-for="(dato, key) in carta.datos" :key="key">
                                        <b-list-group-item>{{dato.dato}}</b-list-group-item>
                                    </b-list-group>
                                </b-tab>
                            </b-tabs>
                        </b-col>
                    </b-row>
                </b-card>
        </b-row>
    </section>
</template>

<script>
    import InfoDataService from "../Services/InfoDataService";
    
    export default {
        name: 'obtener-juego',
        data() {
            return {
                nomArchivo: '',
                cartas: null,
                ambitos: null,
            }
        },
        methods: {
            imprimir() {
                console.log("Cuando esten todas las cartas cargadas imprimimos");

                this.nomArchivo = document.title;

                window.print();
            }
        },
        mounted() {
                InfoDataService.imprimirMujeres()
                .then(response => {
                    console.log(response.data);

                    this.ambitos = response.data.ambitos;
                    this.cartas = response.data.datos;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        updated() {
            this.imprimir();
        }
    }
</script>

<style>
* {
    -webkit-print-color-adjust: exact !important;   /* Chrome, Safari */
    color-adjust: exact !important;                 /*Firefox*/
}

@page { size: landscape; }

</style>