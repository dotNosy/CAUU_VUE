<template>
<div>
<input type="radio" id="trigger1" name="slider" checked autofocus>
<label for="trigger1"></label>
<div class="slide bg1"></div>

<input type="radio" id="trigger2" name="slider">
<label for="trigger2"></label>
<div class="slide bg2"></div>

<input type="radio" id="trigger3" name="slider">
<label for="trigger3"></label>
<div class="slide bg3"></div>

<input type="radio" id="trigger4" name="slider">
<label for="trigger4"></label>
<div class="slide bg4"></div>

<input type="radio" id="trigger5" name="slider">
<label for="trigger5"></label>
<div class="slide bg5"></div>

<input type="radio" id="trigger6" name="slider">
<label for="trigger6"></label>
<div class="slide bg6"></div>

<input type="radio" id="trigger7" name="slider">
<label for="trigger7"></label>
<div class="slide bg7"></div>

<input type="radio" id="trigger8" name="slider">
<label for="trigger8"></label>
<div class="slide bg8"></div>
<div class="inicio">
  <img src="../assets/logoDF2.png" alt="logo" class="imglogo" id="logoDF">
  <a href="./Login" ><b-button variant="dark" id="btnHome1" class="boton" >ENTRAR</b-button></a><br>
  <a href="./Registro"><b-button variant="dark" id="btnHome2" class="boton" >REGISTRARSE</b-button></a><br>
</div>
</div>

</template>

<style>
.boton{
  width:100%;
  height:6em;
  border-radius:2%;
  font-size:1em;
  font-weight: bold;
  margin-bottom: 1%;
}
.inicio{
    position: absolute;
    top:2em;
    left: 0em;
    right: 0em;
    font-size:1.8em;
    text-align:center;
    font-weight:bold;
    background-color:whitesmoke;
    opacity:0.94;
    width: 27rem;
    height: 33rem;
    margin: auto;
}
.btn {
  margin-top: 1em;
  width: 25rem;
  height: 7rem;
}
#logoDF {
  width: 7em;
  height: 7em;
  margin-top: .5em;
  border-width: 5px;
  border-style: solid;
  border-color: #4E3757;
}
body, html {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  overflow: hidden;
}
input {
  position: absolute;  
  opacity: 0;
  margin-top: 95vh;
  cursor: pointer;
}
label {
  display: inline-block;
  width: 12px;
  height: 12px;
  border: solid 2px black;
  border-radius: 999px;
  background-color: transparent;
  margin: 95vh 6px 0 6px;
  z-index: 2;
  cursor: pointer;
  transition-duration: .4s;
}
input:checked + label{
  background-color: white;
}
input:focus + label{
  box-shadow: 0 0 0 2px teal, 0 0 18px white;
}
.slide {
  position: absolute;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  transform: translateX(-100%);
  transition-duration: .8s;
  opacity: 1;
}
input:checked ~ .slide {
  transform: translateX(100%);
}
input:checked + label + .slide {
  transform: translateX(0);
  opacity: 1;
}
.bg1{
  background-image: url(../assets/portada/1.jpg);
}
.bg2{
  background-image: url(../assets/portada/2.jpg);
}
.bg3{
  background-image: url(../assets/portada/3.jpg);
}
.bg4{
  background-image: url(../assets/portada/4.jpg);
}
.bg5{
  background-image: url(../assets/portada/5.jpg);
}
.bg6{
  background-image: url(../assets/portada/6.jpg);
}
.bg7{
  background-image: url(../assets/portada/7.jpg);
}
.bg8{
  background-image: url(../assets/portada/8.jpg);
}
.boton{
  font-size:0.6em;
  font-weight: bold;
}
</style>

<script>
const $ = require('jquery')
window.$ = $

  var index=1;
  setInterval( function slider(){
    var trigger="trigger";
    var id=trigger+index;
    if(index<9){
    $('#'+id).prop("checked", true);
    $('#'+id).focus();
    index=index+1;
    console.log(index);
    }
    else{
      index=1;
    }
  }, 3000);
</script>