import Vue from 'vue'
import App from './App.vue'
import Router from "./router"

import { BootstrapVue, BootstrapVueIcons, ProgressPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(ProgressPlugin);


import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

Vue.config.productionTip = false

new Vue({
  router:Router,
  render: h => h(App),
}).$mount('#app')
