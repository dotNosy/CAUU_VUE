<template>
    <section>

    </section>
</template>

<script>
    
    export default {
        name: 'obtener-juego',
        data() {
            return {
                nomArchivo: ''
            }
        },
        methods: {
            imprimir() {
                console.log("Cuando esten todas las cartas cargadas imprimimos");

                this.nomArchivo = document.title;
                document.title = "mujeresCienSoc";
                window.print();
                document.title = this.nomArchivo;

            }
        },
        mounted() {
                console.log("Cargamos las cartas");
                // TO-DO Cargar las cartas cuando se abre la pagina
                this.imprimir();
        }
    }
</script>