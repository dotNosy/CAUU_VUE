<template>

    <section>
        <div id="iconos">
            <ul style="list-style-type:none">
                <li><img src="../assets/ambitos/antropologia.png" alt="antropologia" class="animacion"></li>
                <li><img src="../assets/ambitos/derecho.png" alt="derecho" class="animacion"></li>
                <li><img src="../assets/ambitos/economia.png" alt="economia" class="animacion"></li>
                <li><img src="../assets/ambitos/filosofia.png" alt="filosofia" class="animacion"></li>
                <li><img src="../assets/ambitos/geografia.png" alt="geografia" class="animacion"></li>
                <li><img src="../assets/ambitos/historia.png" alt="historia" class="animacion"></li>
                <li><img src="../assets/ambitos/pedagogia.png" alt="pedagogia" class="animacion"></li>
                <li><img src="../assets/ambitos/psicologia.png" alt="psicologia" class="animacion"></li>
                <li><img src="../assets/ambitos/sociologia.png" alt="sociologia" class="animacion"></li>

                <li><img id="SegundaTandaIconos" src="../assets/ambitos/antropologia.png" alt="antropologia" class="animacion"></li>
                <li><img src="../assets/ambitos/derecho.png" alt="derecho" class="animacion"></li>
                <li><img src="../assets/ambitos/economia.png" alt="economia" class="animacion"></li>
                <li><img src="../assets/ambitos/filosofia.png" alt="filosofia" class="animacion"></li>
                <li><img src="../assets/ambitos/geografia.png" alt="geografia" class="animacion"></li>
                <li><img src="../assets/ambitos/historia.png" alt="historia" class="animacion"></li>
                <li><img src="../assets/ambitos/pedagogia.png" alt="pedagogia" class="animacion"></li>
                <li><img src="../assets/ambitos/psicologia.png" alt="psicologia" class="animacion"></li>
                <li><img src="../assets/ambitos/sociologia.png" alt="sociologia" class="animacion"></li>
            </ul>
        </div>
    </section>

</template>

<script>
    export default {
        name: 'my-abajo',
        data() {
            return {
            icono: '',
            margenVueltaDos: '',
            pararmover: '',
            desplazar: '',
            }
        },
        mounted() {
            // Lista de iconos
            this.icono=document.getElementById("iconos");
            // A que margenTop está la SegundaTandaIconos
            this.margenVueltaDos=document.getElementById("SegundaTandaIconos").offsetTop;

            this.icono.marginTop = (this.margenVueltaDos * -1) + "px";

            // Hacemos que vayan subiendo los iconos
            this.pararmover=setInterval(this.movimientoIconos,10);

            this.desplazar=0;
        },
        methods: {

            movimientoIconos() { 
                
                // Cuanto subir los iconos
                this.desplazar+=.5; 

                // Añade el desplazamiento
                this.icono.style.marginTop =  ((this.margenVueltaDos * -1) + this.desplazar) + "px"; 
                
                // Cuando lo desplazado sea lo mismo del margen de la segunda tanda, reinicia todo

                if (this.desplazar > this.margenVueltaDos){
                    this.desplazar = 0;
                }
            
            }

        }
    }
</script>

<style>

    /* body{
        margin-right:50px;
    } */
    .animacion{
        /* width: 100%;
        height: 100%; */
        display:block;
        overflow: hidden;
        transition: width 4s, height 4s, transform 4s;
    } 
    /* ul{
        padding:0;
        margin:0;
    }
    li{
        padding:0;
        margin:0;
    } */
    .animacion:hover {
        transform:scale(2,2);
        margin-top: 6%;
        margin-bottom: 6%;
    }
    #iconos {
        /* position: fixed;        */
        /* padding-left: 4.5%;    */
        float: right;
        width: 10%;
        background-color: red;
        /* background: red; */
        /* margin-right: -3%; */
    }

    @media (max-width: 576px) {
    #iconos{
        display:none;
    }
    body{
        overflow-y:auto;
    }
}
</style>