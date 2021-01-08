<template>
<div class="container login-container col-md-3">
    <div class="row">
        <div class="col-md-12 login-form-1 formulario form" style="background-color:;">
        <br>
        <form action="">
            <h3>Recuperar contraseña</h3><br><br>
            <input id="email" class="form-control" type="email" placeholder="Email *"><br>
            <p><button class="btn btn-primary">Recuperar contraseña</button></p>
        </form>
        </div>
    </div>
</div>
</template>

<style scoped>

.formulario{
    margin: 1% 1%;
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