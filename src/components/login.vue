<template>
  <div class="formulario">
    <form>
      <div class="titulo">
        <h3>Login Form</h3>
      </div>
      <div class="input">
        <label for="email">email</label>
        <input id="email" type="email"/>
      </div>
      <div class="input">
        <label for="password">Contraseña</label>
        <input type="password" id="password"/>
      </div>
      <div>
        <input type="submit" value="SARTU">
        <a href="#">Pasahitza ahaztu duzu?</a>
      </div>
    </form>
  </div>

</template>

<script>
export default {
name: "login"
}
</script>

<style scoped>

</style>