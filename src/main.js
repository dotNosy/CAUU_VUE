import Vue from 'vue'
import App from './App.vue'
import Router from "./router"

import { BootstrapVue, BootstrapVueIcons, ProgressPlugin, FormPlugin, FormCheckboxPlugin, VBPopoverPlugin } from 'bootstrap-vue';
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(ProgressPlugin);
Vue.use(FormPlugin);
Vue.use(VBPopoverPlugin);
Vue.use(FormCheckboxPlugin);

import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);

import VueIntro from 'vue-introjs';
Vue.use(VueIntro);
import 'intro.js/introjs.css';

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

Vue.config.productionTip = false

new Vue({
  router:Router,
  render: h => h(App),
}).$mount('#app')
