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
                            <button type="button" value="SARTU" class="btn btn-primary" @click="login">SARTU</button><br>
                        </div>
                        <div class="form-group">
                            <a href="./registro" class="ForgetPwd">¿No tienes cuenta? Haz click aquí.</a><br>
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
                const user = {
                    token : response.data.access_token,
                    email : data.email,
                    rol : response.data.rol
                }

                sessionStorage.setItem('user', JSON.stringify(user));
                console.log(response.data);
                this.$router.push('juego');
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
    background-color: #e0d1e9
}
.form{
    border-color: black;
    border-width: 2px;
    border-style: double;
}
input:invalid {
    border: 2px solid red;
}
input:valid {
    border: 2px solid black;
}
</style>