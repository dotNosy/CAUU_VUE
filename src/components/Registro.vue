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
                                    class="form-control" 
                                    :class="{'is-invalid': $v.name.$error}" 
                                    @blur="$v.name.$touch()"
                                ></b-form-input>
                                <span v-if="!$v.name.error" class="invalid-feedback" role="alert">
                                    <strong class="error" v-if="!$v.name.required">Campo obligatorio</strong>
                                    <strong class="error" v-if="!$v.name.minLength">Mínimo {{$v.name.$params.minLength.min}} carácteres</strong>
                                    <strong class="error" v-if="!$v.name.invalid"><br>Este campo no es válido</strong>
                                </span>
                            </b-form-group>

                            <!-- Apellido -->
                            <b-form-group id="input-group-2" label="Apellido:" label-for="input-2">
                                <b-form-input
                                id="input-2"
                                v-model="$v.surname.$model"
                                placeholder="Introduce apellido"
                                class="form-control" 
                                :class="{'is-invalid': $v.surname.$error}" 
                                @blur="$v.surname.$touch()"
                                ></b-form-input>
                                <span v-if="!$v.surname.error" class="invalid-feedback" role="alert">
                                    <strong class="error" v-if="!$v.surname.required">Campo obligatorio</strong>
                                    <strong class="error" v-if="!$v.surname.minLength">Mínimo {{$v.surname.$params.minLength.min}} carácteres</strong>
                                    <strong class="error" v-if="!$v.surname.invalid"><br>Este campo no es válido</strong>
                                </span>
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
                                class="form-control"
                                :class="{'is-invalid': $v.email.$error}" 
                                @blur="$v.email.$touch()"
                                ></b-form-input>

                                <span v-if="!$v.email.error" class="invalid-feedback" role="alert">
                                    <strong class="error" v-if="!$v.email.required">Campo obligatorio</strong>
                                    <strong class="error" v-if="!$v.email.email">Formato de email incorrecto</strong>
                                    <strong class="error" v-if="!$v.email.minLength"><br>Mínimo {{$v.email.$params.minLength.min}} carácteres</strong>
                                    <strong class="error" v-if="!$v.name.invalid"><br>Este campo no es válido</strong>
                                </span>

                            </b-form-group>

                            <!-- Usuario -->
                            <b-form-group id="input-group-4" label="Usuario:" label-for="input-4">
                                <b-form-input
                                id="input-4"
                                v-model="$v.username.$model"
                                placeholder="Introduce nombre usuario"
                                class="form-control" 
                                :class="{'is-invalid': $v.username.$error}" 
                                @blur="$v.username.$touch()"
                                ></b-form-input>

                                <span v-if="!$v.username.error" class="invalid-feedback" role="alert">
                                    <strong class="error" v-if="!$v.username.required">Campo obligatorio</strong>
                                    <strong class="error" v-if="!$v.username.minLength">Minimo {{$v.username.$params.minLength.min}} caracteres</strong>
                                    <strong class="error" v-if="!$v.username.invalid"><br>Este campo no es válido</strong>
                                </span>

                            </b-form-group>

                            <!-- Contraseña -->
                            <b-form-group id="input-group-5" label="Contraseña:" label-for="input-5">
                                <b-form-input 
                                type="password" 
                                id="password1" 
                                v-model="$v.password1.$model"
                                aria-describedby="password-help-block"
                                placeholder="Introduce una contraseña"
                                v-b-popover.focus="'Tu contraseña debe tener 8-30 carácteres, letras y números. También debe contener una mayúscula y una minúscula por lo menos.'"
                                class="form-control"
                                :class="{'is-invalid': $v.password1.$error}" 
                                @blur="$v.email.$touch()"
                                ></b-form-input>

                                <b-form-text id="password-help-block">
                                    Tu contraseña debe de tener 8-30 carácteres, letras y números. 
                                    También debe contener una mayúscula y una minúscula por lo menos.
                                </b-form-text>

                                <span v-if="!$v.password1.error" class="invalid-feedback" role="alert">
                                    <strong class="error" v-if="!$v.password1.required">Campo obligatorio</strong>
                                    <strong class="error" v-if="!$v.password1.maxLength">Máximo {{$v.password1.$params.maxLength.max}} carácteres</strong>
                                    <strong class="error" v-if="!$v.password1.minLength"><br>Mínimo {{$v.password1.$params.minLength.min}} carácteres</strong>
                                    <strong class="error" v-if="!$v.password1.goodPassword"><br>La contraseña no cumple los parámetros establecidos</strong>
                                    <strong class="error" v-if="!$v.password1.invalid"><br>Este campo no es válido</strong>
                                </span>

                            </b-form-group>

                            <!-- Confirmacion contraseña -->
                            <b-form-group id="input-group-6" label="Confirmar contraseña:" label-for="input-6">
                                <b-form-input 
                                type="password" 
                                id="password2" 
                                v-model="$v.password2.$model"
                                aria-describedby="password-help-block"
                                placeholder="Repite la contraseña"
                                class="form-control"
                                :class="{'is-invalid': $v.password2.$error}" 
                                @blur="$v.password2.$touch()"
                                ></b-form-input>

                                <span v-if="!$v.password2.error" class="invalid-feedback" role="alert">
                                    <strong class="error" v-if="!$v.password2.required">Campo obligatorio</strong>
                                    <strong class="error" v-if="!$v.password2.minLength">Mínimo {{$v.password2.$params.minLength.min}} carácteres</strong>
                                    <strong class="error" v-if="!$v.password2.sameAs"><br>Las contraseñas no coinciden</strong>
                                    <strong class="error" v-if="!$v.password2.invalid"><br>Este campo no es válido</strong>
                                </span>

                                <!-- <div class="error" v-if="!$v.password2.sameAs">Las contraseñas no coinciden.</div>
                                <div class="error" v-if="!$v.password2.invalid">Este campo no es válido</div> -->

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
</style>

<script>
    import RegisterDataService from "../Services/RegisterDataService";
    import { required, minLength, maxLength, email, sameAs} from 'vuelidate/lib/validators';
    // Vue.use(window.vuelidate.default)

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
                surname: {
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
                    required,
                    minLength: minLength(8),
                    sameAs: sameAs('password1')
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
                    .then(() => {
                        this.$router.push("login");
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