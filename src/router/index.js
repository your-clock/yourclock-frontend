import { createRouter, createWebHashHistory } from 'vue-router'
import axios from 'axios'
import Home from '../views/Home.vue'
import Auth from '../views/Auth.vue'
import Inicio from '../views/Inicio.vue'
import Login from '../views/Login.vue'
import Verify from '../views/Verify.vue'
import Settings from '../views/Settings.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import Errors from '../views/Error.vue'
import RecoveryPassword from '../views/RecoveryPassword.vue'
import UserGoogle from '../views/UserGoogle.vue'

const routes = [
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
    path: '/verify/:email',
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

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next)=> {

  console.log(to)
  if(localStorage.getItem('token') === undefined){
    localStorage.setItem('token', null)
  }

  const autorizacion = to.matched.some(record => record.meta.autentificado);

  if(autorizacion){
    axios.post('/token/verifytoken',{
      token: localStorage.token
    })
    .then(function(response){
      const verificacion = response.data;
      if(verificacion){
        next()
      }else{
        alert("Lo sentimos, debe registrarse para continuar")
        next('auth')
      }
    })
    .catch(function(error){
      console.log("ERROR: "+error);
      next('error')
    })
  }else{
    next()
  }

})

export default router
