import Vue from 'vue'
import App from './App.vue'
import Router from "./router"
import './css/style.css'

import { BootstrapVue, BootstrapVueIcons, ProgressPlugin, FormPlugin, FormCheckboxPlugin, VBPopoverPlugin, BNavbar, NavbarPlugin} from 'bootstrap-vue';
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(ProgressPlugin);
Vue.use(FormPlugin);
Vue.use(VBPopoverPlugin);
Vue.use(FormCheckboxPlugin);
Vue.component('b-navbar', BNavbar);
Vue.use(NavbarPlugin)

import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);

import CircularCountDownTimer from "vue-circular-count-down-timer";
Vue.use(CircularCountDownTimer);

import VueIntro from 'vue-introjs';
Vue.use(VueIntro);
import 'intro.js/introjs.css';

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import "jquery";

import VueSweetalert2 from 'vue-sweetalert2';
Vue.use(VueSweetalert2);

Vue.config.productionTip = false

new Vue({
  router:Router,
  render: h => h(App),
}).$mount('#app')
