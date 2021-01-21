<template>
<header>
<meta name="viewport" content="width=device-width, initial-scale=1">
<nav class="navbar navbar-expand-sm" style="background-color: #2d2c2f">
    <a href="./home" class="logo">
    <img src="../assets/logoDF.png" alt="logo" class="imglogo">
</a>
    <ul class="navbar-nav mr-auto">
    <li class="nav-item link0">
        <button type="button" class="btn" id="btn"><a class="nav-link text-light" href="./">Inicio</a></button>
    </li>
    <li class="nav-item link1">
        <button v-show="perfil" type="button" class="btn" id="btn"><a class="nav-link text-light" href="./Perfil">Perfil</a></button>
    </li>
    <li class="nav-item">
        <button v-show="juego" type="button" class="btn" id="btn"><a class="nav-link text-light" href="./SelectNivel">Jugar</a></button>
    </li>
    <li class="nav-item">
        <button v-show="coleccion" type="button" class="btn" id="btn"><a class="nav-link text-light" href="./Coleccion">Colección</a></button>
    </li>
        <li class="nav-item">
        <button v-show="obtener" type="button" class="btn" id="btn"><a class="nav-link text-light" href="./ObtenerJuego">Obtener</a></button>
    </li>
    </ul>
    <!-- TO-DO Boton notificaciones -->
    <ul class="navbar-nav ml-auto">
    <li class="nav-item">
        <!-- <b-button variant="light" class="btn" pill > -->
                <b-icon icon="bell-fill" class="rounded-circle p-2" variant="light" font-scale="2.5" id="icono"></b-icon>
        <!-- </b-button> -->
    </li>
    <li class="nav-item">
        <button @click="logout()" type="button" class="btn" id="btn"><a class="nav-link text-light" href="./Login">{{ login }}</a></button>
    </li>
    </ul>
</nav>
</header>
</template>
<script>
    import User from "../User";

    export default {
        
        name: 'my-header',
        data(){
            return {
                laRuta: "",
                login: "",
            }
        },
        methods: {
            checkUserLogued () {
                const user = User.getUser();

                    if (user == null || user.token == '') {
                        this.laRuta = "/login";
                        this.login = "Login";
                    } else {
                            this.laRuta = "/logout";
                            this.login = "Logout"
                    }
            },
            logout () {
                const user = User.getUser();

                if (user.token !== '') {
                    User.revokeToken();
                }
                this.$router.push({name: 'login'}) 
            },
        }
        ,
        mounted () {
            this.checkUserLogued();
        },
        watch: {
            laRuta() {
                this.checkUserLogued();
            },
            login() {
                
            }
        },
        computed: {
            perfil(){
                return this.$route.name != 'perfil';
            },     
            juego(){
                return this.$route.name != 'juego';
            },
            coleccion(){
                return this.$route.name != 'coleccion';
            },
            obtener(){
                return this.$route.name != 'obtener';
            },
        }
    };

</script>
<style>
.imglogo{
    width:100%;
    border-radius: 50%;
}
li{
    margin-left: 1%;
    margin-right: 1%;
    list-style: none;
    display: inline;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: 1.3em;
    padding-left: 2%;
    padding-right: 2%;
    
}
ul{
    display: inline;
}
@media (min-width: 576px) {
    .link1{
    margin-left: 8%;
    }
    .link0{
        display: none;
    }
}
@media (max-width: 576px) {
    ul{
        width: 100%;
    }
    .logo{
        display: none;
    }
    #btn{
        width: 100%;
        padding: 2%;
        margin: 0.5%;
        border-color: black;
    }
    #icono{
        display: none;
    }
}
</style>