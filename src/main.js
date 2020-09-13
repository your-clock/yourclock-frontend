import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
require('dotenv').config();

Vue.use(BootstrapVue)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueAxios, axios)

// Agregamos la URL base de nuestra API
if(process.env.NODE_ENV === "production"){
  axios.defaults.baseURL = process.env.VUE_APP_HOST_PROD+'/api';
}else if(process.env.NODE_ENV === "development"){
  axios.defaults.baseURL = process.env.VUE_APP_HOST_DEV+'/api';
}

console.log(axios.defaults.baseURL)
console.log(process.env.NODE_ENV)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
