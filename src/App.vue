<template>
  <div id="app">
        <my-header  v-if="isHomePage"></my-header>
        <!-- <my-arriba></my-arriba> -->
        <section>
            <router-view />
        </section>
        <!-- <my-abajo></my-abajo> -->
        <my-footer  v-if="isHomePage"></my-footer>
  </div>
</template>

<script>
    import Header from './components/Header'
    import Footer from './components/Footer'
    // import Abajo from './components/Abajo'
    // import Arriba from './components/Arriba'

    // Orientacion fijada en vertical para todo navegador en el que se abra
    // TO-DO TEST EN REAL   
    // const orientation = "portrait";

    // ScreenOrientation.lock(orientation); //Android
    // screen.mozLockOrientation(orientation); //Mozzila
    // Screen.orientation.lock(orientation); // Chrome, Edge, Firefox, Internet Explorer, Opera, Android Chrome/Firefox and Samsung internet
    // window.screen.lockOrientation(orientation); //
    // screen.msLockOrientation(orientation); //
    // var locOrientation = screen.lockOrientation || screen.mozLockOrientation || screen.msLockOrientation || screen.orientation.lock;
    // locOrientation('portrait');
    
    var myScreenOrientation = window.screen.orientation;
    myScreenOrientation.lock("portrait");

    export default {
      name: 'App',
      components:{
      'my-header': Header,
      'my-footer': Footer,
      // 'my-arriba': Arriba,
      // 'my-abajo': Abajo
      },
      computed: {
        isHomePage () {
            return this.$route.name != 'home';
        }
      }
    }
</script>