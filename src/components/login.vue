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

                LoginDataService.login(data)
                    .then(response => {
                        sessionStorage.setItem('user', JSON.stringify(response.data));

                        if (User.getUser().token !== "") {
                            this.$router.push({name: 'selectNivel'});
                        }  
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        }
    }
</script>
