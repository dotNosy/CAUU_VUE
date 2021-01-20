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