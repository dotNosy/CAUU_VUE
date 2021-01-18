<template>
<div>
<input type="radio" id="trigger1" name="slider">
<label for="trigger1"></label>
<div class="slide bg1"></div>

<input type="radio" id="trigger2" name="slider" checked autofocus>
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
<a href="http://localhost:8080/registro"><b-button variant="dark" id="btn" style="width:20em;height:4em;opacity:1;font-size:1.3em;font-weight:bold;border-radius:2%;top:1em;right:1em;position:fixed;" >REGISTRARSE</b-button></a>
<article style="position:fixed;bottom:8em;left:1em;right:1em;font-size:1.8em;text-align:left;font-weight:bold;color:white;background-color:#533B67;opacity:0.94;">desayunos no se que poner pero registrate por favor te lo suplico si te registras te doy dinero y esto tiene que ocupar dos lineas asi que voy a escribir un poco mas para poder ver como quedaria al reescalarlo</article>
</div>
</template>

<style>
#btn{
    background-color: #4e3757;
    border-color:#4e3757;
    color: white;
}

#btn:hover{
    background-color: #918897;
    border-color: #918897;
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
  transition-duration: .4s;
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
</style>

