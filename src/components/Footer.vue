<template>
    <footer class="text-center text-lg-start justify-content-center mt-auto flex-fill"  style="background-color: #2d2c2f">
    <!-- Copyright -->
    <div class="divfooter text-center p-3" id="footer">
    © 2020 Copyright:
    <a class="text-light" href="https://desayunosfeministascantabria.wordpress.com">Desayunos Feministas</a>
    </div>
</footer>
</template>

<style>
    .divfooter{
        color: white;
    }
    footer {
    position: absolute;
    bottom:0;
    width:100%;
    }
@media (min-width: 576px) {
    footer {
    position: absolute;
    }
}
@media (max-width: 576px) {
    footer {
    position: relative;
    }
}
@media (max-width: 1800px) {
    footer {
    position: absolute;
    bottom:0;
    width:100%;
}
}
</style>