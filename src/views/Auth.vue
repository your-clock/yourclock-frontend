<template>
    <div id="auth">
        <overlayClock :show="loading" :msg="'Cargando...'"/>
        <div class="box-alerts">
            <div v-if="state === 301 || state === 303">
                <alertClock class="lg warning" :msg="message" title="Alerta"/>
            </div>
            <div v-else-if="state === 302 || state === 304">
                <alertClock class="lg danger" :msg="message" title="Error"/>
            </div>
        </div>
        <div class="box-container">
          <div class="box-left">
            <div class="box-logo">
              <img class="logo-yc" src="../assets/logo_yc.png">
            </div>
            <div class="box-auth">
              <formAuthClock
                  :hrefAccount="'/login'"
                  :hrefPwd="'/forgotpassword'"
                  :nameHrefPwd="'Olvide mi contraseña :c'"
                  :nameHrefAccount="'No tengo una cuenta :/'"
                  :titleForm="'Ingrese ahora'"
                  :titleAccounts="'O ingrese con:'"
                  :subtitle1="'Correo'"
                  :subtitle2="'Contraseña'"
                  :placeholderEmail="'Ingrese su correo electronico'"
                  :placeholderPwd="'Ingrese su contraseña'"
                  :minEmail="1"
                  :maxEmail="4"
                  :minPwd="2"
                  :maxPwd="6"
                  v-on:click-btn="enviar"
                  v-on:click-google="google"
                  v-on:click-facebook="google"
                  v-model:userPassword="userPassword"
                  v-model:userEmail="userEmail"
              />
            </div>
          </div>
          <div class="box-right">
            {{getHour}}
          </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'auth',
    data(){
        return{
            state: "",
            userEmail: "",
            userPassword: "",
            loading: false,
            message: "",
            socket: {},
            hour: "00",
            minute: "00"
        }
    },
    created() {
      const self = this;
      setInterval(function (){
        self.updateTime();
      }, 1000)
    },
    computed:{
        getHour(){
          return `${this.hour} : ${this.minute}`
        }
    },  
    methods:{
        enviar(){
            let vue = this
            vue.loading = true
            vue.comprobarBtnEnviar = true
            console.log("enviado")
            vue.axios.post('/user/auth',{
                mail: this.userEmail,
                pass: this.userPassword
            }).then(function (response) {
                vue.state = response.data.code
                vue.message = response.data.msg
                if(response.data.code === 300 ){
                    localStorage.setItem("nombre", response.data.infoClient.nombre)
                    localStorage.setItem("correo", response.data.infoClient.correo)
                    localStorage.setItem("id", response.data.infoClient.id)
                    vue.axios.post('/token/createtoken',{
                        tokenData: {
                            nombre: localStorage.getItem("nombre"),
                            correo: localStorage.getItem("correo"),
                            id: localStorage.getItem("id")
                        }
                    }).then(function(response){
                        vue.state = response.data.code
                        vue.message = response.data.msg
                        if(response.data.code === 300){
                            console.log("token recibido")
                            localStorage.setItem("token", response.data.token)
                            vue.$router.push('/inicio')
                        }else{
                            vue.loading = false
                        }
                    }).catch(function(error){
                        console.log("ERROR in token: "+error);
                        vue.$router.push('/error')
                    })
                }else{
                    vue.loading = false
                }
            }).catch(function (error) {
                if(error.response.status >= 500){
                  console.log("ERROR in auth: "+error);
                  vue.$router.push('/error')
                }else{
                  vue.loading = false
                  vue.state = error.response.data.code
                  vue.message = error.response.data.msg
                }
            });
        },
        google(){
            let vue = this
            vue.loading = true
            this.axios.get('/user/auth/google')
            .then(function(response){
                console.log(response.data)
                window.location = response.data
            })
            .catch(function(error){
                vue.loading = false
                console.log("ERROR: "+error)
                vue.$router.push('/error')
            });
        },
        updateTime(){
          const date = new Date(Date.now());
          this.hour = date.getHours();
          this.minute = date.getMinutes();
          if (this.hour < 10) this.hour = "0" + this.hour.toString();
          if (this.minute < 10) this.minute = "0" + this.minute.toString();
        }
    }
};

</script>

<style>

@import "../../node_modules/@your-clock/yourclock-webcomponents-lib/src/lib-components/fonts.css";

body, html {
  margin: 0;
  padding: 0;
}

@media only screen and (min-width: 1025px) {
  /* For desktop: */
  .box-container{
    display: flex;
    flex-direction: row;
    height: 100vh;
  }

  .box-left{
    width: 50%;
    flex: 1;
  }

  .box-right{
    display: flex;
    font-family: font-clock-normal, serif;
    font-size: 150px;
    color: white;
    width: 50%;
    flex: 1;
    background-image: url("../assets/fondo.jpeg");
    background-repeat: no-repeat;
    background-position: center;
    background-color: black;
    justify-content: center;
    align-items: center;
  }

  .logo-yc{
    margin-left: auto;
    margin-right: auto;
    width: 170px;
    padding-top: 8px;
    padding-bottom: 24px;
  }
}

@media only screen and (max-width: 700px) {
  /* For mobile phones: */
  .box-container{
    display: flex;
    flex-direction: column;
  }

  .box-left{
  }

  .box-right{
    display: flex;
    font-family: font-clock-normal, serif;
    font-size: 70px;
    color: white;
    padding: 100px 0px;
    margin-top: 25px;
    background-image: url("../assets/fondo.jpeg");
    background-repeat: no-repeat;
    background-position: center;
    background-color: black;
    justify-content: center;
    align-items: center;
  }

  .logo-yc{
    margin-left: auto;
    margin-right: auto;
    width: 125px;
    padding-bottom: 8px;
    padding-top: 8px;
  }
}

@media only screen and (max-width: 1025px) and (min-width: 700px) {
  /* For tablets: */
  .box-container{
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  .box-left{
  }

  .box-right{
    display: flex;
    font-family: font-clock-normal, serif;
    font-size: 100px;
    color: white;
    margin-top: 25px;
    padding: 100px 0px;
    background-image: url("../assets/fondo.jpeg");
    background-repeat: no-repeat;
    background-position: center;
    background-color: black;
    justify-content: center;
    align-items: center;
  }

  .logo-yc{
    margin-left: auto;
    margin-right: auto;
    width: 200px;
    padding-bottom: 16px;
    padding-top: 16px;
  }
}

</style>
