<template>
    <div id="login">
      <overlayClock :show="loading" :msg="'Cargando...'"/>
      <div class="box-alerts">
        <div v-if="state === 302 || state === 303 || state === 304 || state === 301">
          <alertClock class="lg warning" :msg="mensaje" title="Alerta"/>
        </div>
        <div v-else-if="state === 308 || state === 400 || state === 401">
          <alertClock class="lg danger" :msg="mensaje" title="Error"/>
        </div>
      </div>
      <div class="box-container-login">
        <div class="box-left-login">
          <div class="box-logo-login">
            <img class="logo-yc-login" src="../assets/logo_yc.png">
          </div>
        </div>
        <div class="box-right-login">
          <div class="box-login">
            <formLoginClock
                :hrefAccount="'#/auth'"
                :targetAccount="'_self'"
                :nameHrefAccount="'Ya tengo una cuenta :)'"
                :titleForm="'Registrate'"
                :placeholderEmail="'Ingresa tu correo electronico'"
                :placeholderPwd="'Ingresa una contraseña segura'"
                :placeholderUserName="'Ingresa tu nombre completo'"
                :titleSelectCity="'Seleciona tu ciudad'"
                :minEmail="1"
                :maxEmail="4"
                :minPwd="2"
                :maxPwd="6"
                :minUserName="1"
                :maxUserName="3"
                v-on:click-btn="enviar"
                v-model:userPassword="userPassword"
                v-model:userEmail="userEmail"
                v-model:userName="userName"
                v-model:userCity="userCity"
            />
          </div>
        </div>
      </div>
    </div>
</template>

<script>

export default{
    name: 'Login',
    data(){
        return{
            userName: "",
            userEmail: "",
            userPassword: "",
            userCity: "",
            state: "",
            loading: false,
            mensaje: "",
            seenWarning: false
        }
    },
    methods:{
        enviar(){
            let vue = this;
            vue.loading = true;
            vue.state = 0;
            vue.seenWarning = false;
            console.log("enviado")
            this.axios.post('/user/login', {
                mail: this.userEmail,
                pass: this.userPassword,
                name: this.userName,
                city: this.userCity
            }).then(function (response) {
                console.log(response.data)
                vue.state = response.data.code
                vue.mensaje = response.data.msg
                if(response.data.code === 300){
                    alert(vue.mensaje)
                    vue.$router.push('/')
                }else{
                    vue.loading = false;
                }
            }).catch(function (error) {
                if(error.response.status >= 400 && error.response.status < 500){
                    if(error.response.data.code === 305){
                        console.log(error.response.data.code)
                        vue.seenWarning = true
                        vue.comprobarEmail = false
                    }
                    vue.loading = false;
                    console.log(error.response.data);
                }else{
                    vue.$router.push('/error');
                }
            });
        }
    }
}
</script>

<style scoped>

@import "../../node_modules/@your-clock/yourclock-webcomponents-lib/src/lib-components/fonts.css";

body, html {
  margin: 0;
  padding: 0;
}

@media only screen and (min-width: 1025px) {
  /* For desktop: */
  .box-container-login{
    display: flex;
    flex-direction: row;
    height: 100vh;
  }

  .box-left-login{
    display: flex;
    width: 50%;
    flex: 1;
    justify-content: center;
    align-items: center;
  }

  .box-right-login{
    display: flex;
    width: 50%;
    flex: 1;
    background-image: url("../assets/fondo.jpeg");
    background-repeat: no-repeat;
    background-position: center;
    background-color: black;
    justify-content: center;
    align-items: center;
  }

  .logo-yc-login{
    margin-left: auto;
    margin-right: auto;
    width: 400px;
  }
}

@media only screen and (max-width: 700px) {
  /* For mobile phones: */
  .box-container-login{
    display: flex;
    flex-direction: column-reverse;
  }

  .box-left-login{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 8px;
    height: 30vh;
  }

  .box-right-login{
    display: flex;
    padding: 80px 0;
    background-image: url("../assets/fondo.jpeg");
    background-repeat: no-repeat;
    background-position: center;
    background-color: black;
    justify-content: center;
    align-items: center;
  }

  .logo-yc-login{
    margin-left: auto;
    margin-right: auto;
    padding-top: 8px;
    width: 175px;
  }
}

@media only screen and (max-width: 1025px) and (min-width: 700px) {
  /* For tablets: */
  .box-container-login{
    display: flex;
    flex-direction: column-reverse;
  }

  .box-left-login{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30vh;
  }

  .box-right-login{
    display: flex;
    padding: 100px 0;
    background-image: url("../assets/fondo.jpeg");
    background-repeat: no-repeat;
    background-position: center;
    background-color: black;
    justify-content: center;
    align-items: center;
  }

  .logo-yc-login{
    margin-left: auto;
    margin-right: auto;
    width: 200px;
    padding-bottom: 16px;
    padding-top: 16px;
  }
}
</style>