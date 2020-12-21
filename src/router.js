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
            component: () => import("./components/Home")
        },
        {
            path: "/blog/:id",
            name: "blog-detail",
            component: () => import("./components/Blog")
        },
        {
            path: "/blog/add",
            name: "add-blog",
            component: () => import("./components/AddBlog")
        },
        {
            path: "/login",
            name: "login",
            component: () => import("./components/Login")
        }
    ]
});
