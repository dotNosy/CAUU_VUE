<template>
<form>
    <div class="modal-body">
        <div class="container login-container col-md-3">
            <div class="row">
                <div class="col-md-12 login-form-1 formulario form">
                    <br><h3>Iniciar Sesión</h3><br>
                        <div class="form-group">
                            <input id="email" class="form-control" type="email" placeholder="Email *" v-model="user.email"/><br>
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" id="password" placeholder="Contraseña *" v-model="user.password"/><br>
                        </div>
                        <div class="form-group">
                            <button type="button" value="SARTU" class="btn btn-primary" @click="login">ENTRAR</button><br>
                        </div>
                        <!-- Cargando -->
                        <div id="iniciandoSesionLoading"><b-spinner class="my-1" style="width: 2rem; height: 2rem;" variant="primary" label="Cargando..."></b-spinner></div>
                        <div class="form-group">
                            <a href="./registro" class="ForgetPwd">¿No tienes cuenta? Registrate</a><br>
                        </div>
                        <div class="form-group">
                            <a href="./passrec" class="ForgetPwd">¿Has olvidado tu contraseña?</a><br>
                        </div>
                </div>
            </div>
        </div>
    </div>
</form>
</template>

<script>
    import LoginDataService from "../Services/LoginDataService";
    import User from "../User";
    import $ from "jquery";

    export default {
        name: "login",
        data () {
        return {
            user: {
                email: null,
                password: null,
            }
        }
        },
        methods: {
            login() {

                let data = {
                    email: this.user.email,
                    password: this.user.password
                };

                $("#iniciandoSesionLoading").fadeIn("slow");

                LoginDataService.login(data)
                    .then(response => {
                        sessionStorage.setItem('user', JSON.stringify(response.data));

                        if (User.getUser().token !== "") {
                            this.$router.push({name: 'selectNivel'});
                        }  
                    })
                    .catch(e => {
                        alert("Usuario o contraseña incorrecto")
                        console.log(e);
                    });
            }
        },
        mounted() {

            // if (User.getUser() !== null) {
            //     this.$router.push({name: 'selectNivel'});
            // }

            $("#iniciandoSesionLoading").hide();
        }
    }
</script>
