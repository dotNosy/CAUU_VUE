<template>
    <div>
        <h3>*panic*</h3>
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
</script>

<style>
    *{
        box-sizing:border-box;
        margin:0;
    }
</style>