<template>
  <div class="formulario modal-body row">
    <div class="col-md-6">
    <!-- <img src="../assets/logoDF.png" alt="logo" class="logologin"> -->
    </div>
    <div class="container login-container col-md-6">
            <div class="row">
                <div class="col-md-6 login-form-1 form" style="background-color: ;">
                    <br><h3>Login</h3><br>
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Email *" value="email" /><br>
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" placeholder="Pasahitza *" value="pasahiza" /><br>
                        </div>
                        <div class="form-group">
                            <button>Sartu</button><br>
                        </div>
                        <div class="form-group">
                            <a href="#" class="ForgetPwd">Ez daukazu konturik? Klik emen egin.</a><br>
                        </div>
                        <div class="form-group">
                            <a href="#" class="ForgetPwd">Ahaztu duzu pasahitza?</a><br>
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
name: "login"
}
</script>

<style>
.formulario{
    /* width: 49%; */
    /* background-color: #6A737C; */
    /* margin: 1% 1%; */
    background-color: #e0d1e9;
}
</style>