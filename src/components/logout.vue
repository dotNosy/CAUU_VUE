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