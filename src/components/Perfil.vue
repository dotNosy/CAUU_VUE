<template>
    <div style="width:100%;">
            
            <b-col><h1>Hola {{user.nombre}}</h1></b-col>
            <div class="divdatos">

                    <h2>Tus datos</h2>
                    <div style="padding-left:5%;">

                    <b-form-group id="input-group-2" label="Nombre:*" label-for="nomUsuario" style="text-align:left">
                        <b-form-input
                            id="nomUsuario"
                            v-model="name"
                            style="width: 94%; padding:1em;"
                        ></b-form-input>
                    </b-form-group>
                    <div class="error" v-if="!$v.name.required">Campo obligatorio</div>
                    <div class="error" v-if="!$v.name.minLength">Minimo {{$v.name.$params.minLength.min}} caracteres</div>

                    <b-form-group id="input-group-2" label="Email:*" label-for="nomUsuario" style="text-align:left">
                        <b-form-input id="emailUsuario" v-model="email" style="width: 94%;"></b-form-input>
                    </b-form-group>
                        <div class="error" v-if="!$v.email.required">Campo obligatorio</div>
                        <div class="error" v-if="!$v.email.minLength">Minimo {{$v.email.$params.minLength.min}} caracteres</div>
                        <div class="error" v-if="!$v.email.email">Formato de email incorrecto</div>

                    <!-- Contraseña -->
                        <b-form-group id="input-group-5" label="Contraseña:*" label-for="nomUsuario" style="text-align:left">
                            <b-form-input 
                                type="password" 
                                id="password1" 
                                v-model="$v.password1.$model"
                                aria-describedby="password-help-block"
                                placeholder="Introduce una contraseña"
                                style="width: 94%; padding:1em;"
                                v-b-popover.focus="'Tu contraseña debe tener 8-30 carácteres, letras y números. También debe contener una mayúscula y una minúscula por lo menos.'"
                            ></b-form-input>
                            <div class="error" v-if="!$v.password1.required" style="text-align:left">Campo obligatorio</div>
                            <div class="error" v-if="!$v.password1.minLength" style="text-align:left">Minimo {{$v.password1.$params.minLength.min}} caracteres</div>
                        </b-form-group>

                    <!-- Confirmacion contraseña -->
                    <b-form-group id="input-group-6" label="Confimar contraseña:*" label-for="nomUsuario" style="text-align:left">
                        <b-form-input 
                                type="password" 
                                id="password2" 
                                v-model="$v.password2.$model"
                                aria-describedby="password-help-block"
                                placeholder="Repite la contraseña"
                                style="width: 94%; padding:1em;"
                            ></b-form-input>
                    </b-form-group>
                        <div class="error" v-if="!$v.password2.sameAs" style="text-align:left">Las contraseñas no coinciden.</div>
                    <b-button type="button" @click="editProfile()" variant="primary" class="bottom btn btnactualizar" style="float:left;">Actualizar mis datos</b-button>
                    </div>
                    </div>
                    

<!-- SEPARADOR -->
<div class="vl" style="width:0.2%;float:left;"></div>
<!-- SEPARADOR -->
                <div class="divranking">
                    <div style="height:35%;">
                    <h2>Highscore</h2>
                    </div>
                    <div><h1>35000</h1></div>
                    {{ miPosicion }}
                    <h3>TOP 2: <h2>27000</h2></h3>
                    <h3>TOP 3: <h2>12000</h2></h3>
                    <!-- TO-DO mostrar con un template las ultimas 5 posiciones -->
                </div>
                </div>



</template>

<script>
    import User from  "../User";
    import ProfileDataService from "../Services/ProfileDataService"
    import { required, minLength, maxLength, email, sameAs} from 'vuelidate/lib/validators';

        // import introJs from "intro.js";
        // import "intro.js/introjs.css";

    export default {
        name: 'Perfil',
        data() {
            return {
                user: User.getUser(),
                name: '',
                email: '',
                password1: '',
                password2: '',
                miPosicion: ''
            }
        },
        mounted() {

            // this.$intro().start();
            // this.$intro().showHints();

            // const introJS = require("intro.js");
            // introJs.start();
            // introJs.showHints();

            // this.$nextTick(() =>{
            //     introJS = require("intro.js");
            //     introJs().start();
            // }
            // )

            this.name = this.user.nombre;
            this.email = this.user.email;
        },
        methods: {
            editProfile() {
                let data = {
                    id: this.user.id,
                    name: this.name,
                    email: this.email,
                    password: this.password1,
                };

                //Log sending data
                console.log(data);

                if (this.$v.name.$invalid 
                        || this.$v.email.$invalid
                        || this.$v.password1.$invalid
                        || this.$v.password2.$invalid    
                    )
                    {
                        alert("DATOS o FORMATO incorrectos!!");
                        return false;
                    }
                
                ProfileDataService.editProfile(data)
                    .then(() => {
                        console.log(data);
                        User.setDatosUser(this.name, this.email);
                    })
                    .catch(e=>{
                        console.log(e);
                    })


            }
        },
        validations: {
                name: {
                    required,
                    minLength: minLength(4),
                },
                email: { 
                    required,
                    minLength: minLength(4),
                    email,
                },
                password1: {
                    required,
                    minLength: minLength(8),
                    maxLength: maxLength(30),
                    goodPassword:(password1) => { 
                        return password1.length >= 8 &&
                        password1.length <=30 &&
                        /[a-z]/.test(password1) &&
                        /[A-Z]/.test(password1) &&
                        /[0-9]/.test(password1)
                    }
                },
                password2: {
                    minLength: minLength(8),
                    sameAs: sameAs('password1')
                }
        }
        
    }
</script>
<style>
.vl {
    border-left: 4px solid #4E3757;
    height: 33rem;
    margin-left: 0.1em;
    margin-right: 0.1em;
}
.divdatos{
    width:48.5%;
    padding-top:2%;
    padding-bottom: 2%;
    background-color:#E6D9EB;
    float:left;
    margin-left: 0.3rem;
    margin-right: 0.3rem;
    border: solid #846790;
    border-radius: 2%;
}
.divranking{
    width:49%;
    float:right;
}
.btnactualizar{
    width:15rem;
}
@media (max-width: 992px){
    .vl {
        display: none;
    }
}
@media (max-width: 768px){
    .btnactualizar{
        width:94%;
    }
    .divdatos{
        width:98%;
    }
    .divranking{
        float: none;
        text-align: center;
        width: 90%;
    }
}
</style>
