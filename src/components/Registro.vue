<template>
    <div>

        <b-row>
            <h1>Registro</h1>
        </b-row>

        <b-row>aa</b-row>

        <b-col>
            
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <!-- Nombre -->
            <b-form-group id="input-group-1" label="Nombre:" label-for="input-1">
                <b-form-input
                id="input-1"
                v-model="form.name"
                placeholder="Introduce nombre"
                required
                ></b-form-input>
            </b-form-group>

            <!-- Apellido -->
            <b-form-group id="input-group-2" label="Apellido:" label-for="input-2">
                <b-form-input
                id="input-2"
                v-model="form.surname"
                placeholder="Introduce apellido"
                required
                ></b-form-input>
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
                v-model="form.email"
                type="email"
                placeholder="Introduce tu email"
                required
                ></b-form-input>
            </b-form-group>

            <b-col>
                <hr class="mt-2 mb-3"/>
            </b-col> 

            <!-- Usuario -->
            <b-form-group id="input-group-4" label="Usuario:" label-for="input-4">
                <b-form-input
                id="input-4"
                v-model="form.username"
                placeholder="Introduce nombre usuario"
                required
                ></b-form-input>
            </b-form-group>

            <!-- Contraseña -->
            <b-form-group id="input-group-5" label="Contraseña:" label-for="input-5">
                <b-form-input 
                type="password" 
                id="password1" 
                v-model="form.password1"
                aria-describedby="password-help-block"
                placeholder="Introduce una contraseña"
                ></b-form-input>
                <b-form-text id="password-help-block">
                Your password must be 8-20 characters long, contain letters and numbers, and must not
                contain spaces, special characters, or emoji.
                </b-form-text>
            </b-form-group>

            <!-- Confirmacion contraseña -->
            <b-form-group id="input-group-6" label="Contraseña:" label-for="input-6">
                <b-form-input 
                type="password" 
                id="password2" 
                v-model="form.password2"
                aria-describedby="password-help-block"
                placeholder="Repite la contraseña"
                ></b-form-input>
            </b-form-group>

        <!-- Iniciar sesion -->
        <b-row>
            <b-link variant="Link">Ya tengo cuenta, iniciar sesión</b-link>
        </b-row>

            <!-- Botones y registros -->
            <b-button type="submit" variant="primary">Registrarme</b-button>
            <b-button type="reset" variant="danger">Limpiar</b-button>
            </b-form>

        </b-col>

    </div>
</template>

<script>
    export default {
        name: 'Registro',
        data() {
            return {
                form: {
                name: '',
                surname: '',
                email: '',
                username: '',
                password1: '',
                password2: '',
                },
                show: true
            }
            },
            methods: {
            onSubmit(event) {
                event.preventDefault()
                alert(JSON.stringify(this.form))
            },
            onReset(event) {
                event.preventDefault()
                // Reset our form values
                this.form.name = ''
                this.form.surname = ''
                this.form.email = ''
                this.form.username = ''
                this.form.password1 = ''
                this.form.password2 = ''

                // Trick to reset/clear native browser form validation state
                this.show = false
                this.$nextTick(() => {
                this.show = true
                })
            }
            }
    }
</script>
