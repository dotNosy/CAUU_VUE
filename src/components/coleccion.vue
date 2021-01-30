<template>
    <div>
        <b-row>
            <h1>La colección de {{user.email}}</h1>
        </b-row>
        <!--fila general-->
        <b-row>
          <!--filas de cartas-->
          <b-row>
            <div>
              <img src="{{/*url de la foto supongo*/}}" alt="carta">
              <p>{{/*nombre de la mujer*/}}</p>
              /*
              *Cualquier otro apartado de la carta iría aqui.
              *Y lo del reverso no se como se va a hacer exactamente.
              */
            </div>
          </b-row>
        </b-row>
    </div>
</template>
<script>

  import Cards from "../Cards.js";

  export default {
    name: 'Coleccion',
    data() {
      return{
        user: ''
      }
    },
    mounted(){
      this.cards = Cards.getCards();
    }

  }

</script>