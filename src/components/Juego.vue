<template>

    <div>
        <b-row>
            <h3>Mujeres en las ciencias sociales</h3>
            <hr>
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
                <b-link variant="Link" to="SelectNivel">Volver</b-link>
                <h6>Tu puntuacion</h6>
                <h6>{{ puntos }}</h6>
                <b-button variant="dark" size="lg" pill @click="startTimer">Empezar!</b-button>
            </b-col>
        </b-row>

        <b-row>
            <!-- Temporizador -->
            <b-progress :value="value" :max="max" show-progress animated class="w-50 mb-2" variant="purple"></b-progress>
        </b-row>


    </div>

</template>

<script>
    export default {
        data() {
            return {
                timer: 0,
                value: 100,
                max: 100
            }
        },
        methods: {
            startTimer() {
                var vm = this;
                var timer = setInterval(function() {
                    vm.value -= .1;
                    if (vm.value >= 100) {
                        clearInterval(timer)                        ;
                    }
                }, 100);
            }
        }
    }
</script>

<style>
* {margin-left: 5px;}
.bg-purple {background-color: purple;}

</style>