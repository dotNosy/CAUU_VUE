<template>
<header>
<meta name="viewport" content="width=device-width, initial-scale=1">

<div>
    <b-navbar toggleable="lg"  style="background-color: #2d2c2f">
        <b-navbar-brand href="./">
            <img src="../assets/logoDF.png" alt="logo" class="imglogo">
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
            <b-button type="button" class="nav-item nav-link text-light btn" id="btnSelectnivel" style="padding:1em;" href="./SelectNivel">Jugar</b-button>
            <b-button type="button" class="nav-item nav-link text-light btn" id="btnColeccion" style="padding:1em;" href="./Coleccion">Colección</b-button>
            <b-button type="button" class="nav-item nav-link text-light btn" id="btnPerfil" style="padding:1em;" href="./Perfil">Perfil</b-button>
            <b-button type="button" class="nav-item nav-link text-light btn" id="btnObtenerJuego" style="padding:1em;" href="./ObtenerJuego">Obtener</b-button>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
            <b-icon icon="bell-fill" class="rounded-circle p-2" variant="light" font-scale="3" id="icono"></b-icon>
            <button @click="logout()" type="button" class="btnLog" id="btn">{{ login }} <div id="logoutLoading"><b-spinner class="my-1" style="width: 2rem; height: 2rem;" variant="danger" label="Cargando..."></b-spinner></div></button>
        </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</div>

</header>
</template>
<script>
    import User from "../User";
    import $ from "jquery";

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
                        this.login = "Login";
                    } 
                    else {
                        this.login = "Logout"
                    }
            },
            logout () {
                const user = User.getUser();

                if (user !== null && user.token !== '') {
                    this.login = "";
                    $("#logoutLoading").fadeIn("slow");
                    User.revokeToken();
                } else {
                    this.$router.push({name: 'login'});
                }
            },
        },
        mounted () {
            $("#logoutLoading").hide();
            this.checkUserLogued();
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
    border-radius: 50%;
}
    @media (max-width: 992px) {
        
        .logo, #icono{
            display: none;
        }
        .btn{
            width: 100%;
            padding: 2%;
            margin: 0.5%;
            border-color: black;
        }
    }
</style>