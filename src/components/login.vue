<template>
    <div class="modal-body row">
        <!-- <div class="container login-container col-md-6">
            <img src="../assets/logoDF.png" alt="logo" class="" style="width:86%; border-radius: 50%;">
        </div> -->
        <!-- <div class="container login-container col-md-3">
        </div> -->
        <div class="container login-container col-md-4">
            <div class="row">
                <div class="col-md-12 login-form-1 formulario form" style="background-color:;">
                    <br><h3>Login</h3><br>
                        <div class="form-group">
                            <input id="email" class="form-control" type="email" placeholder="Email *" v-model="user.email"/><br>
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" id="password" placeholder="Pasahitza *" v-model="user.password"/><br>
                        </div>
                        <div class="form-group">
                            <button value="SARTU" @click="login">SARTU</button><br>
                        </div>
                        <div class="form-group">
                            <a href="#" class="ForgetPwd">Ez daukazu konturik? Klik emen egin.</a><br>
                        </div>
                        <div class="form-group">
                            <a href="#" class="ForgetPwd">Ahaztu duzu pasahitza?</a><br>
                        </div>
                </div>
            </div>
        </div>
        <!-- <div class="container login-container col-md-3">
        </div> -->
    </div>
</template>



<script>
  import LoginDataService from "../Services/LoginDataService";

  export default {
    name: "login",
    data () {
      return {
        user: {
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
                this.$router.push('juego');
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

.formulario{
    /* width: 49%; */
    /* background-color: #6A737C; */
    /* margin: 1% 1%; */
    background-color: #e0d1e9
}
.form{
    border-color: black;
    border-width: 2px;
    border-style: double;
}

</style>