<template>

    <section>
        <div id="iconos">
            <ul style="list-style-type:none">
                <li><img src="../assets/ambitos/antropologia.png" alt="antropologia"></li>
                <li><img src="../assets/ambitos/derecho.png" alt="derecho"></li>
                <li><img src="../assets/ambitos/economia.png" alt="economia"></li>
                <li><img src="../assets/ambitos/filosofia.png" alt="filosofia"></li>
                <li><img src="../assets/ambitos/geografia.png" alt="geografia"></li>
                <li><img src="../assets/ambitos/historia.png" alt="historia"></li>
                <li><img src="../assets/ambitos/pedagogia.png" alt="pedagogia"></li>
                <li><img src="../assets/ambitos/psicologia.png" alt="psicologia"></li>
                <li><img src="../assets/ambitos/sociologia.png" alt="sociologia"></li>

                <li><img id="SegundaTandaIconos" src="../assets/ambitos/antropologia.png" alt="antropologia"></li>
                <li><img src="../assets/ambitos/derecho.png" alt="derecho"></li>
                <li><img src="../assets/ambitos/economia.png" alt="economia"></li>
                <li><img src="../assets/ambitos/filosofia.png" alt="filosofia"></li>
                <li><img src="../assets/ambitos/geografia.png" alt="geografia"></li>
                <li><img src="../assets/ambitos/historia.png" alt="historia"></li>
                <li><img src="../assets/ambitos/pedagogia.png" alt="pedagogia"></li>
                <li><img src="../assets/ambitos/psicologia.png" alt="psicologia"></li>
                <li><img src="../assets/ambitos/sociologia.png" alt="sociologia"></li>
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

    body{
        margin-right:50px;
    }
    img{
        width: 50%;
        height: 50%;
        display:block;
        overflow: hidden;
        transition: width 2s, height 2s, transform 2s;
    
    } 
    ul{
        padding:0;
        margin:0;
    }
    li{
        padding:0;
        margin:0;
    }
    img:hover {
        transform:scale(2,2);
        margin-top: 6%;
        margin-bottom: 6%;
    }
    #iconos {
        /* position: fixed;        */
        padding-left: 4.5%;   

        float: right;
        width: 15%;
        /* background: red; */
        margin-right: -3%;


    }

</style>