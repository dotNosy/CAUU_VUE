<template>
<header>
<meta name="viewport" content="width=device-width, initial-scale=1">
<nav class="navbar navbar-expand-sm" style="background-color: #2d2c2f">
    <a href="./home" class="logo">
    <img src="../assets/logoDF.png" alt="logo" class="imglogo">
</a>
    <ul class="navbar-nav">
    <li class="nav-item link0">
        <button type="button" class="btn" id="btn"><a class="nav-link text-light" href="./">Inicio</a></button>
    </li>
    <li class="nav-item link1">
        <button type="button" class="btn" id="btn"><a class="nav-link text-light" href="./Perfil">Perfil</a></button>
    </li>
    <li class="nav-item">
        <button type="button" class="btn" id="btn"><a class="nav-link text-light" href="./SelectNivel">Jugar</a></button>
    </li>
    <li class="nav-item">
        <button type="button" class="btn" id="btn"><a class="nav-link text-light" href="./Coleccion">Colección</a></button>
    </li>
    
    <!-- TO-DO Boton notificaciones -->
    <li class="nav-item">
        <!-- <b-button variant="light" class="btn" pill > -->
                <b-icon icon="bell-fill" class="rounded-circle p-2" variant="light"  font-scale="2.5">></b-icon>
        <!-- </b-button> -->
    </li>
    <li class="nav-item">
        <button @click="logout()" type="button" class="btn botonlogin" id="btn">{{ login }}</button>
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
                        this.login = "LOGIN";
                    } else {
                            this.laRuta = "/logout";
                            this.login = "LOGOUT"
                    }
            },
            logout () {
                const user = User.getUser();

                if (user.token !== '') {
                    User.revokeToken();
                }
                this.$router.push({name: 'login'}) 
            }
        }
        ,
        mounted () {
            this.checkUserLogued();
        },
        watch: {
            laRuta() {
                // console.log(value);
                this.checkUserLogued();
            },
            login() {
                // console.log(value);
            }
        }
    };

</script>
<style>
/* .logo{
    width: 4%;
} */
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

#btn{
    background-color: #4e3757;
    border-color:#4e3757;
    color:red;
}

#btn:hover{
    background-color: #918897;
    border-color: #918897;
}
@media (min-width: 576px) {
    .botonlogin{
        position: absolute;
        right: 0;
        margin-right:1%;
    }
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
}
</style>