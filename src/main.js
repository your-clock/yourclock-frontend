import { createApp } from 'vue';
import App from './App.vue'
import router from './router'
import store from './store'
import { createMetaManager } from 'vue-meta'
import axios from 'axios'
import VueAxios from 'vue-axios'
import webcomponents from '@your-clock/yourclock-webcomponents-lib'
require('dotenv').config();

// Agregamos la URL base de nuestra API
axios.defaults.baseURL = process.env.VUE_APP_HOST+'/api';

console.log(axios.defaults.baseURL)
console.log(process.env.NODE_ENV)

const app = createApp(App)

app.use(VueAxios, axios)
app.use(router)
app.use(store)
app.use(createMetaManager())
app.use(webcomponents)

app.mount('#app')
