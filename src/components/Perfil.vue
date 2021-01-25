<template>
    <div>
        <b-row>
            <b-col></b-col>
            <b-col><h1>Hola {{user.nombre}}</h1></b-col>
            <b-col></b-col>

            <!-- <div data-title="Farewell!" 
                data-intro="And this is the last step!"
                v-intro="'Edit Project\'s Name Here'"
                v-intro-position="'bottom'"
            >AAAAAAAAAA</div> -->
        </b-row>

            <b-col style="padding-left: 50px">
                <b-row>
                    <h2>Tus datos</h2>
                </b-row>
                <!-- <b-row>
                    <label for="nomUsuario">Nombre:</label>
                    <b-form-input id="nomUsuario" v-model="name" style="width: 30em; padding:1em; margin-bottom:1em"></b-form-input>
                        <div class="error" v-if="!$v.name.required">Campo obligatorio</div>
                        <div class="error" v-if="!$v.name.minLength">Minimo {{$v.name.$params.minLength.min}} caracteres</div>
                </b-row> -->
                <b-row>
                    <b-form-group id="input-group-2" label="Nombre:*" label-for="nomUsuario" style="text-align:left">
                        <b-form-input
                            id="nomUsuario"
                            v-model="name"
                            style="width: 30em; padding:1em;"
                        ></b-form-input>
                    </b-form-group>
                    <div class="error" v-if="!$v.name.required">Campo obligatorio</div>
                    <div class="error" v-if="!$v.name.minLength">Minimo {{$v.name.$params.minLength.min}} caracteres</div>
                </b-row>
                <!-- <b-row>
                    <label for="emailUsuario">Email:</label>
                    <b-form-input id="emailUsuario" v-model="email" style="width: 30em; padding:1em;"></b-form-input>
                        <div class="error" v-if="!$v.email.required">Campo obligatorio</div>
                        <div class="error" v-if="!$v.email.minLength">Minimo {{$v.email.$params.minLength.min}} caracteres</div>
                        <div class="error" v-if="!$v.email.email">Formato de email incorrecto</div>
                </b-row> -->
                <b-row>
                    <b-form-group id="input-group-2" label="Email:*" label-for="nomUsuario" style="text-align:left">
                        <b-form-input id="emailUsuario" v-model="email" style="width: 30em;"></b-form-input>
                    </b-form-group>
                        <div class="error" v-if="!$v.email.required">Campo obligatorio</div>
                        <div class="error" v-if="!$v.email.minLength">Minimo {{$v.email.$params.minLength.min}} caracteres</div>
                        <div class="error" v-if="!$v.email.email">Formato de email incorrecto</div>
                </b-row>

                <b-row>
                    <!-- Contraseña -->
                    <label for="password1">Contraseña:*</label>
                        <b-form-group id="input-group-5">
                            <b-form-input 
                                type="password" 
                                id="password1" 
                                v-model="$v.password1.$model"
                                aria-describedby="password-help-block"
                                placeholder="Introduce una contraseña"
                                style="width: 30em; padding:1em;"
                                
                            ></b-form-input>

                            <b-form-text id="password-help-block">
                                Tu contraseña debe de tener 8-30 carácteres, letras y números.
                                También debe contener una mayúscula y una minúscula por lo menos.
                            </b-form-text>

                            <div class="error" v-if="!$v.password1.required" style="text-align:left">Campo obligatorio</div>
                            <div class="error" v-if="!$v.password1.minLength" style="text-align:left">Minimo {{$v.password1.$params.minLength.min}} caracteres</div>
                        </b-form-group>
                </b-row>
                <!-- <b-row> -->
<!--                   
                    <label for="password2">Confirmar contraseña:</label>
                        <b-form-group id="input-group-6">
                            <b-form-input 
                                type="password" 
                                id="password2" 
                                v-model="$v.password2.$model"
                                aria-describedby="password-help-block"
                                placeholder="Repite la contraseña"
                                style="width: 30em; padding:1em;"
                            ></b-form-input>

                            <div class="error" v-if="!$v.password2.sameAs">Las contraseñas no coinciden.</div>
                        </b-form-group>
                </b-row> -->
                <!--  -->
                <b-row>
                    <!-- Confirmacion contraseña -->
                    <b-form-group id="input-group-6" label="Confimar contraseña:*" label-for="nomUsuario" style="text-align:left">
                        <b-form-input 
                                type="password" 
                                id="password2" 
                                v-model="$v.password2.$model"
                                aria-describedby="password-help-block"
                                placeholder="Repite la contraseña"
                                style="width: 30em; padding:1em;"
                            ></b-form-input>
                    </b-form-group>
                        <div class="error" v-if="!$v.password2.sameAs" style="text-align:left">Las contraseñas no coinciden.</div>
                </b-row>
                <!--  -->
                    <b-button type="button" @click="editProfile()" variant="primary" class="bottom">Actualizar mis datos</b-button>


            </b-col>
<!-- SEPARADOR -->
<div class="vl"></div>
<!-- SEPARADOR -->
            <b-col>

                    <h2>Tu posición en el ranking</h2>

                    {{ miPosicion }}

                    <!-- TO-DO mostrar con un template las ultimas 5 posiciones -->


                <!-- <b-link variant="Link">Cerrar sesion</b-link> -->
                <!-- <div v-intro="'The content of tooltip'">AAAAA</div>
                <div v-intro="'The content of tooltip'" v-intro-step="2">BBB</div>
                <div v-intro="'The content of tooltip'" v-intro-tooltip-class="'red-bg'">cccccc</div>
                <div v-hint="'The content of tooltip'" v-intro-position="'top'">DDDDDD</div> -->
            </b-col>



    </div>
</template>

<script>
    import User from  "../User";
    import ProfileDataService from "../Services/ProfileDataService"
    import { required, minLength, email, sameAs} from 'vuelidate/lib/validators';

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
                        // console.log(this.name);
                        // console.log(this.email);
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
        height: 500px;
        margin-left: 1em;
        margin-right: 2em;
    }

    @media (max-width: 576px) {
        .vl {
            display: none;
        }
    }

</style>
