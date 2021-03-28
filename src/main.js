import { createApp } from 'vue';
import App from './App.vue'
import router from './router'
import store from './store'
import VueMeta from 'vue-meta'
import axios from 'axios'
import VueAxios from 'vue-axios'
import components from '@your-clock/yourclock-webcomponents-lib'
require('dotenv').config();

// Agregamos la URL base de nuestra API
if(process.env.NODE_ENV === "production"){
  axios.defaults.baseURL = process.env.VUE_APP_HOST_PROD+'/api';
}else if(process.env.NODE_ENV === "development"){
  axios.defaults.baseURL = process.env.VUE_APP_HOST_DEV+'/api';
}

console.log(axios.defaults.baseURL)
console.log(process.env.NODE_ENV)

const app = createApp(App)

app.use(VueAxios, axios)
app.use(router)
app.use(store)
app.use(components)

app.mount('#app')
