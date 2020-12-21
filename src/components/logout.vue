<template>
  <div></div>
</template>

<script>
  import LoginDataService from "../Services/LoginDataService";

  export default {
    mounted() {
      this.logout();
    },
    methods: {
      logout() {
          
        LoginDataService.logout()
          .then(response => {
            //Delete sesion
            sessionStorage.removeItem('user');
            console.log(response.data);
            this.$router.push('home');
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