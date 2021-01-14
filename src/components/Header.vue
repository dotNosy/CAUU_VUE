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
        <button type="button" class="btn" id="btn"><a class="nav-link text-light" href="#">Link1</a></button>
    </li>
    <li class="nav-item">
        <button type="button" class="btn" id="btn"><a class="nav-link text-light" href="#">Link2</a></button>
    </li>
    <li class="nav-item">
        <button type="button" class="btn" id="btn"><a class="nav-link text-light" href="#">Link3</a></button>
    </li>
    <li class="nav-item">
        <button @click="checkUserLogued()" type="button" class="btn botonlogin" id="btn"><a v-bind:href="laRuta" class="nav-link text-light">{{ login }}</a></button>
    </li>
    </ul>
</nav>
</header>
</template>
<script>

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
            const user = sessionStorage.getItem("user");
                if (!user) {
                    this.laRuta = "/login";
                    this.login = "LOGIN";
                } else {
                        this.laRuta = "/logout";
                        this.login = "LOGOUT"
                }
        }
    }
    ,
    mounted () {
        this.checkUserLogued();
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