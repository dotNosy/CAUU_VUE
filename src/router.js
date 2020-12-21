import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
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
            path: "/logout",
            name: "logout",
            component: () => import("./components/logout")
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
        {
            path: "/admin",
            name: "admin",
            meta: {rol: 'admin'},
            component: () => import("./components/adminPanel")
        },
        // Si no coincide con nada
        { path: '*', redirect: '/' }
    ]
});


export default router

router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const authorize = to.meta;
    const user = sessionStorage.getItem('user');

    if (authorize.rol) {
        
        if (!user) {
            // not logged in so redirect to login page with the return url
            return next({ path: '/login'});
        }

        // check if route is restricted by role
        if (authorize.length && !authorize.rol.includes(user.rol)) {
            // role not authorised so redirect to home page
            return next({ path: '/' });
        }
    }

    next();
})