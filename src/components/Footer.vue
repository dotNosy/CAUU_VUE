<template>
    <footer class="text-center text-lg-start justify-content-center mt-auto flex-fill"  style="background-color: #2d2c2f">
    <!-- Copyright -->
    <div class="divfooter text-center p-3" id="footer">
    © 2020 Copyright:
    <a class="text-light" href="./home">Desayunos Feministas</a>
    </div>
</footer>
</template>

<script>
    export default {
        
    }
</script>

<style>
    .divfooter{
        color: white;
}
@media (min-width: 1800px) {
    footer {
    position: absolute;;
    bottom:0;
    width:100%;
}
}
@media (max-width: 1800px) {
    footer {
    position: relative;
    bottom:0;
    width:100%;
}
}
</style>