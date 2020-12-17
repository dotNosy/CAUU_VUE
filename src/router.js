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
            path: "/si",
            name: "si",
            component: () => import("./components/si")
        },
        {
            path: "/prueba",
            name: "prueba",
            component: () => import("./components/Plantilla")
        }
    ]
});
