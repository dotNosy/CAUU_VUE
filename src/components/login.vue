<template>
  <div class="formulario">
      <div class="titulo">
        <h3>Login Form</h3>
      </div>
      <div class="input">
        <label for="email">email</label>
        <input id="email" type="email" v-model="user.email"/>
      </div>
      <div class="input">
        <label for="password">Contraseña</label>
        <input type="password" id="password" v-model="user.password"/>
      </div>
      <div>
        <button value="SARTU" @click="login">SARTU</button>
        <a href="#">Pasahitza ahaztu duzu?</a>
      </div>
  </div>

</template>

<script>
  import LoginDataService from "../Services/LoginDataService";

  export default {
    name: "login",
    data () {
      return {
        user: {
          id: null,
          email: "",
          password: "",
        },
        submitted: false
      }
    },
    methods: {
      login() {
        let data = {
            email: this.user.email,
            password: this.user.password
        };

        LoginDataService.login(data)
          .then(response => {
            //Persistis sesion
            const user = {
              token : response.data.access_token,
              email : data.email,
              rol : response.data.rol
            }
            sessionStorage.setItem('user', JSON.stringify(user));
            //Redirigir segun rol
            
            switch (user.rol) {
              case 'admin':
                this.$router.push('admin');
              break;
            
              default:
                break;
            }
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }
    }
  }
</script>

<style scoped>

</style>