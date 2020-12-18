<template>
    <div>

        <b-row>
            <b-col>
                <b-link variant="Link" to="Perfil">Volver</b-link>
            </b-col>
            <b-col></b-col>
            <b-col></b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-button variant="dark" size="lg" pill>Nivel 1</b-button>
                <b-icon icon="info-circle-fill" scale="2" variant="info"  @click="$bvModal.show('modal-info')" id="1"></b-icon>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-button variant="dark" size="lg" pill>Nivel 2</b-button>
                <b-icon icon="info-circle-fill" scale="2" variant="info" @click="$bvModal.show('modal-info')" id="2"></b-icon>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-button variant="dark" size="lg" pill>Nivel 3</b-button>
                <b-icon icon="info-circle-fill" scale="2" variant="info" @click="$bvModal.show('modal-info')" id="3"></b-icon>
            </b-col>
        </b-row>

        
        <!-- TO-DO: Controlar por Vue qué info button se ha seleccionado y mostrar la info correspondiente de ese nivel -->
        <b-modal id="modal-info" hide-footer>
            <template #modal-title>{{ titulo }}</template>
            <div class="d-block text-center">
                <h3> {{ explanation }}</h3>
            </div>
        </b-modal>



    </div>
</template>

<script>
    export default {
        el: '#modal-info',
        data() {
            return {
                titulo: 'AAAAA',
                explanation: 'lorem ipsum blablabla'
            }
        },
        name: 'ElegirNivel',
        methods: {
            explanationModal() {
                
            }
        }
        
    }
</script>
