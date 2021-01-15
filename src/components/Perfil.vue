<template>
    <div>

        <b-row>
            <h1>Hola {{user.email}}</h1>
            <!-- <div data-title="Farewell!" 
                data-intro="And this is the last step!"
                v-intro="'Edit Project\'s Name Here'"
                v-intro-position="'bottom'"
            >AAAAAAAAAA</div> -->
        </b-row>
        <!-- <b-row>
            <b-col>
                <router-link to="SelectNivel"><b-button variant="dark" size="lg" pill data-intro="This is your message">Jugar</b-button></router-link>
            </b-col>
            <b-col>
                <b-button variant="dark" size="lg" pill>Mi colección</b-button>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-button variant="dark" size="lg" pill>Obtener juego</b-button>
            </b-col>
            <b-col>
                <b-button variant="dark" size="lg" pill>Mis datos</b-button>
            </b-col>
        </b-row> -->
        <b-row>
            <b-col>
                <b-row>
                    <label for="nomUsuario">Nombre:</label>
                    <b-form-input id="nomUsuario" v-model="text" placeholder="{{ user.name }}"></b-form-input>
                </b-row>
                <b-row>
                    <label for="emailUsuario">Nombre:</label>
                    <b-form-input id="emailUsuario" v-model="text" placeholder="{{ user.email }}"></b-form-input>
                </b-row>
                <b-row>
                    <!-- Contraseña -->
                        <b-form-group id="input-group-5" label="Contraseña:" label-for="input-5">
                            <b-form-input 
                            type="password" 
                            id="password1" 
                            v-model="$v.password1.$model"
                            aria-describedby="password-help-block"
                            placeholder="Introduce una contraseña"
                        ></b-form-input>

                            <b-form-text id="password-help-block">
                                Tu contraseña debe de tener 8-30 carácteres, letras y números. 
                                También debe contener una mayúscula y una minúscula por lo menos.
                            </b-form-text>

                            <div class="error" v-if="!$v.password1.required">Campo obligatorio</div>
                            <div class="error" v-if="!$v.password1.minLength">Minimo {{$v.password1.$params.minLength.min}} caracteres</div>
                        </b-form-group>
                </b-row>
                <b-row>
                    <!-- Confirmacion contraseña -->
                        <b-form-group id="input-group-6" label="Confirmar contraseña:" label-for="input-6">
                            <b-form-input 
                            type="password" 
                            id="password2" 
                            v-model="$v.password2.$model"
                            aria-describedby="password-help-block"
                            placeholder="Repite la contraseña"
                            ></b-form-input>

                            <div class="error" v-if="!$v.password2.sameAs">Las contraseñas no coinciden.</div>
                        </b-form-group>
                </b-row>


            </b-col>
            <b-col>
                <h2>Nombre {{ user.name }}</h2>
                <h2>{{ user.email }}</h2>
                <h2>Tu posición en el ranking</h2>

                <!-- <b-link variant="Link">Cerrar sesion</b-link> -->
                <!-- <div v-intro="'The content of tooltip'">AAAAA</div>
                <div v-intro="'The content of tooltip'" v-intro-step="2">BBB</div>
                <div v-intro="'The content of tooltip'" v-intro-tooltip-class="'red-bg'">cccccc</div>
                <div v-hint="'The content of tooltip'" v-intro-position="'top'">DDDDDD</div> -->
            </b-col>
        </b-row>


    </div>
</template>

<script>
    import User from  "../User";
    import ProfileDataService from "../Services/ProfileDataService"

        // import introJs from "intro.js";
        // import "intro.js/introjs.css";

    export default {
        name: 'Perfil',
        data() {
            return {
                user: User.getUser(),
                name: '',
                surname: '',
                email: '',
                username: '',
                password1: '',
                password2: '',
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


        },
        methods: {
            editProfile() {

                console.log("aaaaaa");

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
                    required,
                    minLength: minLength(8),
                    sameAs: sameAs('password1')
                },
                surname: {

                }
        }
        
    }
</script>
