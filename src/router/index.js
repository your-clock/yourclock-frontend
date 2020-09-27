import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '@/views/Auth.vue'
import Inicio from '@/views/Inicio.vue'
import Login from '@/views/Login.vue'
import Verify from '@/views/Verify.vue'
import Settings from '@/views/Settings.vue'
import ForgotPassword from '@/views/ForgotPassword.vue'
import Home from '@/views/Home.vue'
import Errors from '@/views/Error.vue'
import RecoveryPassword from '@/views/RecoveryPassword.vue'
import UserGoogle from '@/views/UserGoogle.vue'
import VueAxios from 'vue-axios'
import axios from 'axios'

Vue.use(VueAxios, axios)
Vue.use(VueRouter)

const router = new VueRouter({
  //mode: 'history',
  //base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/auth'
    },
    {
      path: '/',
      redirect: '/auth'
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        autentificado: false
      }
    },
    {
      path: '/auth',
      name: 'auth', 
      component: Auth,
      meta: {
        autentificado: false
      }
    },
    {
      path: '/inicio',
      name: 'inicio',
      component: Inicio,
      meta: {
        autentificado: true
      }
    },
    {
      path: '/verify',
      name: 'verify', 
      component: Verify,
      meta: {
        autentificado: false
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
      meta: {
        autentificado: true
      }
    },
    {
      path: '/forgotpassword',
      name: 'forgotpassword',
      component: ForgotPassword,
      meta: {
        autentificado: false
      }
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        autentificado: false
      }
    },
    {
      path: '/recoverypassword/:id',
      name: 'recoverypassword',
      component: RecoveryPassword,
      meta: {
        autentificado: false
      }
    },
    {
      path: '/error',
      name: 'error',
      component: Errors,
      meta: {
        autentificado: false
      }
    },
    {
      path: '/usergoogle/:value/:user/:name',
      name: 'usergoogle', 
      component: UserGoogle,
      meta: {
        autentificado: false
      }
    }
  ]
})

router.beforeEach((to, from, next)=> {

  console.log(to)
  let autorizacion = to.matched.some(record => record.meta.autentificado)
  axios.post('/verifytoken',{
      token: localStorage.token
  })
  .then(function (response) {
    if(autorizacion && response.data == 0){                   // si necesita autorizacion y no tiene un token valido
      alert("Lo sentimos, debe registrarse para continuar")
      next('auth')
    }else if(autorizacion && response.data == 1){             // si necesita autorizacion y tiene un token valido
      axios.post('updatetoken',{
        token: localStorage.token
      })
      .then(function(response){
        if(response.data.code == 300){
          localStorage.token = response.data.token
          next()
        }else{
          console.log(response.data.msg);
          next('error')
        }
      })
      .catch(function(error){
        console.log("ERROR: "+error);
        next('error')
      })
    }else if(!autorizacion && response.data == 1){            // si no necesita autorizacion y tiene un token valido
      axios.post('updatetoken',{
        token: localStorage.token
      })
      .then(function(response){
        if(response.data.code == 300){
          localStorage.token = response.data.token
          next()
        }else{
          console.log(response.data.msg);
          next('error')
        }
      })
      .catch(function(error){
        console.log("ERROR: "+error);
        next('error')
      })
    }else if(!autorizacion && response.data == 0){            // si no necesita autorizacion y no tiene un token valido
      next()
    }
  })
  .catch(function (error) {
      console.log("ERROR: "+error);
      next('error')
  });
})

export default router