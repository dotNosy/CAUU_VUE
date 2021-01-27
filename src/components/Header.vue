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
            <b-button type="button" class="nav-item nav-link text-light btn" id="btnSelectnivel" style="padding:1em;" href="./SelectNivel" @click="getPerfil(),getColeccion(),getObtener()">Jugar</b-button>
            <b-button type="button" class="nav-item nav-link text-light btn" id="btnColeccion" style="padding:1em;" href="./Coleccion" :disabled='coleccion' @click="getPerfil(),getColeccion(),getObtener()">Colección</b-button>
            <b-button type="button" class="nav-item nav-link text-light btn" id="btnPerfil" style="padding:1em;" href="./Perfil" :disabled='perfil' @click="getPerfil(),getColeccion(),getObtener()">Perfil</b-button>
            <b-button type="button" class="nav-item nav-link text-light btn" id="btnObtenerJuego" style="padding:1em;" href="./ObtenerJuego" :disabled='obtener' @click="getPerfil(),getColeccion(),getObtener()">Obtener</b-button>
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
                perfil:false,
                coleccion:false,
                obtener:false,
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
            getPerfil(){
                setTimeout(() => {
                        if(this.$route.name==="perfil"){
                    this.perfil=true;
                }
                else{
                    this.perfil=false;
                }}, 200)
            },
            getColeccion(){
                setTimeout(() => {
                        if(this.$route.name==="coleccion"){
                    this.coleccion=true;
                }
                else{
                    this.coleccion=false;
                }}, 200)
            },
            getObtener(){
                setTimeout(() => {
                        if(this.$route.name==="obtenerJuego"){
                    this.obtener=true;
                    console.log("true");
                }
                else{
                    this.obtener=false;
                    console.log("false");
                }}, 200)
            },
        },
        mounted () {
            $("#logoutLoading").hide();
            this.checkUserLogued();
            this.perfil=null;
            this.coleccion=null;
            this.obtener=null;
            this.getPerfil();
            this.getColeccion();
            this.getObtener();
        },
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