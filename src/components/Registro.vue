<template>
    <div class="modal-body container-fluid">
        <div class="container login-container col-md-4">
            <div>
                <div class="col-md-12 login-form-1 formulario form" style="background-color:;">
                    <h3>Registro</h3>
                    <b-col>    
                        <b-form @reset="onReset" v-if="show">
                            <!-- Nombre -->
                            <b-form-group  id="input-group-1" label="Nombre:" label-for="input-1" :class="{ 'form-group--error': $v.name.$error }">
                                <b-form-input
                                    id="input-1"
                                    v-model="$v.name.$model"
                                    placeholder="Introduce nombre"
                                ></b-form-input>

                                <div class="error" v-if="!$v.name.required">Campo obligatorio</div>
                                <div class="error" v-if="!$v.name.minLength">Minimo {{$v.name.$params.minLength.min}} caracteres</div>
                            </b-form-group>

                            <!-- Apellido -->
                            <b-form-group id="input-group-2" label="Apellido:" label-for="input-2">
                                <b-form-input
                                id="input-2"
                                v-model="$v.surname.$model"
                                placeholder="Introduce apellido"
                                ></b-form-input>
                            </b-form-group>

                            <!-- Email -->
                            <b-form-group
                                id="input-group-3"
                                label="Email:"
                                label-for="input-3">
                                <b-form-input
                                id="input-3"
                                v-model="$v.email.$model"
                                type="email"
                                placeholder="Introduce tu email"
                                ></b-form-input>

                                <div class="error" v-if="!$v.email.required">Campo obligatorio</div>
                                <div class="error" v-if="!$v.email.minLength">Minimo {{$v.email.$params.minLength.min}} caracteres</div>
                                <div class="error" v-if="!$v.email.email">Formato de email incorrecto</div>
                            </b-form-group>

                            <!-- Usuario -->
                            <b-form-group id="input-group-4" label="Usuario:" label-for="input-4">
                                <b-form-input
                                id="input-4"
                                v-model="$v.username.$model"
                                placeholder="Introduce nombre usuario"
                                ></b-form-input>

                                <div class="error" v-if="!$v.username.required">Campo obligatorio</div>
                                <div class="error" v-if="!$v.username.minLength">Minimo {{$v.username.$params.minLength.min}} caracteres</div>
                            </b-form-group>

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

                            <!-- Iniciar sesion -->
                            <b-row>
                                <b-link variant="Link" href=".\login">Ya tengo cuenta, iniciar sesión</b-link>
                            </b-row>
                            
                            <!-- Botones y registros -->
                            <b-button type="button" @click="createUser()" variant="primary" class="bottom">Registrarme</b-button>
                            <b-button type="reset" variant="danger" class="bottom">Limpiar</b-button>
                        </b-form>
                    </b-col>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .error {
        color : red;
        margin-top: 2%;
        margin-bottom: 1rem;
    }
    .bottom{
        margin-bottom: 4%;
    }
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

<script>
    import RegisterDataService from "../Services/RegisterDataService";
    import { required, minLength, email, sameAs} from 'vuelidate/lib/validators';
    // import 'vue-form-wizard/dist/vue-form-wizard.min.css';

    export default {
        name: 'Registro',
        data() {
            return {
                name: '',
                surname: '',
                email: '',
                username: '',
                password1: '',
                password2: '',

                show: true,
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
                username: {
                    required,
                    minLength: minLength(4),
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
        },
        methods: {
            createUser() {

                let data = {
                    name: this.name,
                    surname: this.surname,
                    email: this.email,
                    username: this.username,
                    password: this.password1,
                };

                //Log sending data
                console.log(data);

                if (this.$v.name.$invalid 
                        || this.$v.surname.$invalid
                        || this.$v.email.$invalid
                        || this.$v.username.$invalid
                        || this.$v.password1.$invalid
                        || this.$v.password2.$invalid    
                    )
                    {
                        alert("DATOS o FORMATO incorrectos!!");
                        return false;
                    }

                RegisterDataService.register(data)
                    .then(Response => {
                        this.$router.push("perfil");
                        console.log(Response.data);
                        this.submitted = true;
                    })
                    .catch(e=> {
                        console.log(e);
                    })
            },
            onReset(event) {
                event.preventDefault()
                // Reset our form values
                this.name = ''
                this.surname = ''
                this.email = ''
                this.username = ''
                this.password1 = ''
                this.password2 = ''

                // Trick to reset/clear native browser form validation state
                this.show = false
                this.$nextTick(() => {
                    this.show = true
                })
            }
        },
        mounted () {

        }
    }
</script>