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
<!-- <a href="http://localhost:8080/Login"><b-button variant="dark" id="btn" style="width:20em;height:4em;opacity:1;font-size:1.3em;font-weight:bold;border-radius:2%;top:1em;right:1em;position:fixed;" >ENTRAR</b-button></a>
<article>Doctrina y movimiento social que pide para la mujer el reconocimiento de unas capacidades y unos derechos que tradicionalmente han estado reservados para los hombres.</article> -->
</div>
</template>

<style>
/* article{
  position:fixed;
  bottom:8em;
  left:1em;
  right:1em;
  font-size:1.8em;
  text-align:justify;
  font-weight:bold;
  color:white;
  background-color:#533B67;
  opacity:0.94;
} */
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
@media (max-width: 576px) {
  article{
    text-align:left;
  }
}
</style>

<script>
const $ = require('jquery')
window.$ = $



  var index=1;
  setInterval( function sisoy(){
    var trigger="trigger";
    var f=trigger+index;
    if(index<9){
    $('#'+f).prop("checked", true);
    $('#'+f).focus();
    index=index+1;
    console.log(index);
    }
    else{
      index=1;
    }
  }, 3000);

</script>