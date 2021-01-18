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
            <b-col style="padding-left: 50px">
                <b-row>
                    <label for="nomUsuario">Nombre:</label>
                    <b-form-input id="nomUsuario" v-model="name"></b-form-input>
                        <div class="error" v-if="!$v.name.required">Campo obligatorio</div>
                        <div class="error" v-if="!$v.name.minLength">Minimo {{$v.name.$params.minLength.min}} caracteres</div>
                </b-row>
                <b-row>
                    <label for="emailUsuario">Email:</label>
                    <b-form-input id="emailUsuario" v-model="email"></b-form-input>
                        <div class="error" v-if="!$v.email.required">Campo obligatorio</div>
                        <div class="error" v-if="!$v.email.minLength">Minimo {{$v.email.$params.minLength.min}} caracteres</div>
                        <div class="error" v-if="!$v.email.email">Formato de email incorrecto</div>
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
                <b-row>
                    <b-button type="button" @click="editProfile()" variant="primary" class="bottom">Actualizar mis datos</b-button>
                </b-row>

            </b-col>
            <b-col>
                <b-row>
                    <h2>Tu posición en el ranking</h2>
                </b-row>
                <b-row>
                    {{ miPosicion }}
                </b-row>
                <b-row>
                    <!-- TO-DO mostrar con un template las ultimas 5 posiciones -->
                </b-row>

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
                    minLength: minLength(8),
                },
                password2: {
                    minLength: minLength(8),
                    sameAs: sameAs('password1')
                }
        }
        
    }
</script>
