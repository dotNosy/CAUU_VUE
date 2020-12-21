import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            alias: "/home",
            name: "home",
            component: () => import("./components/HelloWorld")
        },
        {
            path: "/login",
            name: "login",
            component: () => import("./components/login")
        },
        {
            path: "/perfil",
            name: "perfil",
            component: () => import("./components/Perfil")
        },
        {
            path: "/selectNivel",
            name: "selectNivel",
            component: () => import("./components/SelectNivel")
        }
        ,
        {
            path: "/juego",
            name: "juego",
            component: () => import("./components/Juego")
        },
        // Si no coincide con nada
        { path: '*', redirect: '/' }
    ]
});
