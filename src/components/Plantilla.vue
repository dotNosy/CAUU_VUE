<template>
    <div>
        <!-- <h3>*panic*</h3> -->
        <my-header></my-header>
        <section></section> 
        <my-arriba></my-arriba>
        <my-footer></my-footer>
    </div>

</template>

<script>
    import Header from './Header'
    import Footer from './Footer'
    import Arriba from './Arriba'
    
    export default {
        name: 'App',
        components:{
        'my-header': Header,
        'my-footer': Footer,
        'my-arriba': Arriba
        }
    }

    // Orientacion fijada en vertical para todo navegador en el que se abra
    // TO-DO TEST EN REAL   
    const orientation = "portrait";

    ScreenOrientation.lock(orientation); //Android
    screen.mozLockOrientation(orientation); //Mozzila
    Screen.orientation.lock(orientation); // Chrome, Edge, Firefox, Internet Explorer, Opera, Android Chrome/Firefox and Samsung internet
    // window.screen.lockOrientation(orientation); //
    // screen.msLockOrientation(orientation); //


</script>

<style>
    *{
        box-sizing:border-box;
        margin:0;
    }
</style>