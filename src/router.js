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
            path: "/prueba",
            name: "prueba",
            component: () => import("./components/Plantilla")
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
        },
        {
            path: "/juego",
            name: "juego",
            component: () => import("./components/Juego")
        },
        {
<<<<<<< Updated upstream
            path: "/Registro",
            name: "registro",
            component: () => import("./components/Registro")
        }
=======
            path: "/passrec",
            name: "passrec",
            component: () => import("./components/passrec")
        },
        {
            path: "/admin",
            name: "admin",
            meta: {rol: 'admin'},
            component: () => import("./components/adminPanel")
        },
        // Si no coincide con nada
        { path: '*', redirect: '/' }
>>>>>>> Stashed changes
    ]
});
