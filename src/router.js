import Vue from 'vue';
import Router from 'vue-router';
import User from './User';

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
            component: () => import("./components/login"),
            meta: { rule: 'doLogin'}
        },
        {
            path: "/perfil",
            name: "perfil",
            component: () => import("./components/Perfil"),
            meta: { rule: 'logued'} 
        },
        {
            path: "/selectNivel",
            name: "selectNivel",
            component: () => import("./components/SelectNivel"),
            meta: { rule: 'logued'} 
        },
        {
            path: "/juego",
            name: "juego",
            component: () => import("./components/Juego"),
            meta: { rule: 'logued'} 
        },
        {
            path: "/Registro",
            name: "registro",
            component: () => import("./components/Registro")
        },
        {
            path: "/passrec",
            name: "passrec",
            component: () => import("./components/passrec")
        },
        {
            path: "/Coleccion",
            name: "coleccion",
            component: () => import("./components/Coleccion"),
            meta: { rule: 'logued'} 
        },
        {
            path: "/ObtenerJuego",
            name: "obtenerJuego",
            component: () => import("./components/ObtenerJuego"),
            meta: { rule: 'logued'} 
        },
        // Si no coincide con nada
        { path: '*', redirect: '/' }
    ]
});


export default router

const DEFAULT_TITLE = 'Mujeres en las ciencias sociales';
router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const authorize = to.meta;
    const user = User.getUser();

        if (authorize.rule == 'doLogin' && user !== null) {
            console.log('already logued, coming from ' + from.name);
            // not logged in so redirect to login page with the return url
            return next({ name: 'selectNivel'});
        }

        if (authorize.rule == 'logued' && (user == null || user.token == '')) {
            console.log('rule logued');
            // not logged in so redirect to login page with the return url
            return next({ path: '/login'});
        }

        // check if route is restricted by role
        if (authorize.length && !authorize.rol.includes(user.rol)) {
            console.log('Rol admin');
            // role not authorised so redirect to home page
            return next({ path: '/' });
        }

    next();
})

router.afterEach((to) => {
    // Use next tick to handle router history correctly
    // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
    
    Vue.nextTick(() => {
        document.title = to.meta.title || DEFAULT_TITLE;
    });
});