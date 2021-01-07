<template>
    <div class="modal-body row">
    <div class="container login-container col-md-3">
    <div>
                    <div class="row">
                <div class="col-md-12 login-form-1 formulario form" style="background-color:;">

        <b-row>
            <h3 class="titulo">Register</h3>
        </b-row>

        <b-col>
            
            <b-form @reset="onReset" v-if="show">
            <!-- Nombre -->
            <b-form-group id="input-group-1" label="Nombre:" label-for="input-1">
                <b-form-input
                id="input-1"
                v-model="register.name"
                placeholder="Introduce nombre"
                @keypress="isOnlyChar($event)"
                :state="register.name.length > 1 && register.name.length < 26"
                :status="this.$v.register.name.$error ? 'error' : null"
                @blur="this.$v.register.name.$touch()"
                ></b-form-input>
                <b-form-invalid-feedback :state="validation">
                    Tu nombre debe tener entre 2 y 25 carácteres.
                </b-form-invalid-feedback>
                <b-form-valid-feedback :state="validation">
                </b-form-valid-feedback>
            </b-form-group>

            <!-- Apellido -->
            <b-form-group id="input-group-2" label="Apellido:" label-for="input-2">
                <b-form-input
                id="input-2"
                v-model="register.surname"
                placeholder="Introduce apellido"
                @keypress="isOnlyChar($event)"
                :state="register.surname.length > 1 && register.surname.length < 26"
                ></b-form-input>
                <b-form-invalid-feedback :state="validation">
                    Tu apellido debe tener entre 2 y 25 carácteres.
                </b-form-invalid-feedback>
                <b-form-valid-feedback :state="validation">
                </b-form-valid-feedback>
            </b-form-group>

            <!-- Email -->
            <b-form-group
                id="input-group-3"
                label="Email:"
                label-for="input-3"
                description="Nunca compartiremos tu email con nadie."
            >
                <b-form-input
                id="input-3"
                v-model="register.email"
                type="email"
                placeholder="Introduce tu email"
                ></b-form-input>
            </b-form-group>

            <b-col>
                <hr class="mt-2 mb-3"/>
            </b-col> 

            <!-- Usuario -->
            <b-form-group id="input-group-4" label="Usuario:" label-for="input-4">
                <b-form-input
                id="input-4"
                v-model="register.username"
                placeholder="Introduce nombre usuario"
                @keypress="isNumberAndChar($event)"
                :state="register.username.length > 1 && register.username.length < 26"
                ></b-form-input>
                <b-form-invalid-feedback :state="validation">
                    Tu usuario debe tener entre 2 y 25 carácteres.
                </b-form-invalid-feedback>
                <b-form-valid-feedback :state="validation">
                </b-form-valid-feedback>
            </b-form-group>

            <!-- Contraseña -->
            <b-form-group id="input-group-5" label="Contraseña:" label-for="input-5">
                <!-- <b-form-input 
                type="password" 
                id="password1" 
                v-model="register.password1"
                aria-describedby="password-help-block"
                placeholder="Introduce una contraseña"
                @keypress="isPassValid($event)"
                :state="register.password1.length > 8 && register.password1.length < 30"
                ></b-form-input>
                <b-form-invalid-feedback :state="validation">
                </b-form-invalid-feedback>
                <b-form-valid-feedback :state="validation">
                </b-form-valid-feedback>
                <b-form-text id="password-help-block">
                    Tu contraseña debe de tener 8-30 carácteres, letras y números. 
                    También debe contener una mayúscula y una minúscula por lo menos.
                </b-form-text> -->
                <b-form-input 
                type="password" 
                id="password1" 
                v-model="register.password1"
                aria-describedby="password-help-block"
                placeholder="Introduce una contraseña"
                @keypress="isPassValid($event)"
                :state="register.password1.length > 7 && register.password1.length < 31"
                ></b-form-input>
                <b-form-invalid-feedback :state="validation">
                </b-form-invalid-feedback>
                <b-form-valid-feedback :state="validation">
                </b-form-valid-feedback>
                <b-form-text id="password-help-block">
                    Tu contraseña debe de tener 8-30 carácteres, letras y números. 
                    También debe contener una mayúscula y una minúscula por lo menos.
                </b-form-text>
            </b-form-group>

            <!-- Confirmacion contraseña -->
            <b-form-group id="input-group-6" label="Contraseña:" label-for="input-6">
                <b-form-input 
                type="password" 
                id="password2" 
                v-model="register.password2"
                aria-describedby="password-help-block"
                placeholder="Repite la contraseña"
                ></b-form-input>
            </b-form-group>

        <!-- Iniciar sesion -->
        <b-row>
            <b-link variant="Link" href=".\login">Ya tengo cuenta, iniciar sesión</b-link>
        </b-row>

            <!-- Botones y registros -->
            <b-button @click="createUser()" variant="primary">Registrarme</b-button>
            <b-button type="reset" variant="danger">Limpiar</b-button>
            </b-form>

        </b-col>
    </div>
    </div>
    </div>
    </div>
    </div>
</template>
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

<script>
    import RegisterDataService from "../Services/RegisterDataService";
    import { required } from 'vuelidate/lib/validators';
    import { validationMixin } from 'vuelidate';
    // import 'vue-form-wizard/dist/vue-form-wizard.min.css';

    export default {
        name: 'Registro',
        mixins: [validationMixin],
        data() {
            return {
                register: {
                    name: '',
                    surname: '',
                    email: '',
                    username: '',
                    password1: '',
                    password2: '',
                },
                show: true,
            }
            },
            validations: {
                register: {
                    name: {
                        required
                    },
                    email: { 
                        required
                    }
                }
            },
            methods: {
                createUser() {
                    var data = {
                        name: this.register.name,
                        surname: this.register.surname,
                        email: this.register.email,
                        username: this.register.username,
                        password: this.register.password1,
                    };

                    RegisterDataService.register(data)
                        .then(Response => {
                            this.$router.push("perfil");
                            console.log(Response.data);
                            this.submitted = true;
                        })
                        .catch(e=> {
                            console.log(e);
                        })
                    console.log(data);
                },
                isNumberAndChar (event) {
                    if (!/^[A-Za-z0-9]+$/.test(event.key) || event.key === '.') return event.preventDefault();
                },
                // isEmailValid(event) {
                //     if (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/.test(event.key) || event.key === '.') {
                //         console.log(event);
                //         return event;
                //     }
                // },
                isOnlyChar(event) {
                    if (!/^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/.test(event.key) || event.key === '.') return event.preventDefault();
                },
                isPassValid(event) {
                    if (!/^(?=.*[a-z])+(?=.*[A-Z])+(?=.*[0-9])+(?=.{8,30})$/.test(event.key) || event.key === '.') return event.preventDefault();
                },
                onReset(event) {
                    event.preventDefault()
                    // Reset our form values
                    this.register.name = ''
                    this.register.surname = ''
                    this.register.email = ''
                    this.register.username = ''
                    this.register.password1 = ''
                    this.register.password2 = ''

                    // Trick to reset/clear native browser form validation state
                    this.show = false
                    this.$nextTick(() => {
                    this.show = true
                    })
                }
            }
    }
</script>
