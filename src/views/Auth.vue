<template>
    <!-- <b-overlay :show="loading" rounded="sm"> -->
    <div>
        <div class="box-alerts">
            <div v-if="state == 305 || state == 306 || state == 307">
                <alertClock class="lg warning" :msg="mensaje"/>
            </div>
            <div v-else-if="state == 308 || state == 400 || state == 401">
                <alertClock class="lg danger" :msg="mensaje"/>
            </div>
        </div>
        <div class="box-complete">
            <div class="box-auth">
                <div class="box-head">
                    <img class="auth_user" src="../assets/auth.jpg">
                    <titleClock id="title" v-bind:title="'Ingrese'"/>
                </div>
                <div class="box-inputs">
                    <div class="box-input-email">
                        <p>Correo:</p>
                        <inputClock class="md input-email" :disabled="loading" type="email" placeholder="Escriba su correo electronico" v-bind:success="comprobarEmail" v-model="userEmail"/>
                    </div>
                    <div class="box-input-password">
                        <p>Contraseña:</p>
                        <inputClock class="md input-auth" :disabled="loading" type="password" placeholder="Escriba su contraseña" v-bind:success="comprobarPassword" v-model="userPassword"/>
                    </div>
                    <div class="box-button">
                        <btnClock class="md" v-bind:name="'Ingresar'" v-bind:state="comprobarBtnEnviar" v-on:on-click="enviar"/>
                    </div>
                    <div class="box-link">
                        <p :disabled="loading" href="#/ForgotPassword">Olvide mi contraseña</p>
                        <p :disabled="loading" href="#/Login">No tengo una cuenta</p>
                    </div>
                    <div class="box-accounts">
                        <p class="text-account">O ingrese con:</p>
                        <div class="box-logos">
                            <logoGoogle class="google_logo"/>
                            <logoFacebook class="facebook_logo"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- </b-overlay> -->
</template>

<script>
import io from "socket.io-client"
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'auth',
    data(){
        return{
            state: "",
            userEmail: "",
            userPassword: "",
            loading: false,
            mensaje: "",
            socket: {}
        }
    },
    computed:{
        comprobarEmail(){
            return this.userEmail.length == 0 ? 'null' : this.userEmail.length >= 6 ? 'true' : 'false'
        },
        comprobarPassword(){
            return this.userPassword.length == 0 ? 'null' : this.userPassword.length >= 8 ? 'true' : 'false'
        },
        comprobarBtnEnviar(){
            return this.comprobarPassword == 'true' && this.comprobarEmail == 'true' ? false : true
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
                vue.mensaje = response.data.msg
                if(response.data.code == 300 ){
                    console.log("usuario autenticado")
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
                        vue.mensaje = response.data.msg
                        if(response.data.code == 300){
                            console.log("token recibido")
                            localStorage.setItem("token", response.data.token)
                            vue.$router.push('/inicio')
                        }else{
                            vue.loading = false
                        }
                    }).catch(function(error){
                        console.log("ERROR: "+error);
                        vue.$router.push('/error')
                    })
                }else{
                    vue.loading = false
                }
            }).catch(function (error) {
                console.log("ERROR: "+error);
                vue.$router.push('/error')
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
        }
    }
});
</script>

<style scoped>
#title{
    color: black;
}
@media only screen and (max-width: 400px) {
    /* For mobile phones: */
    .auth_user{
        width: 150px; height: 150px;
    }
    .text-account{
        padding-bottom: 10px;
    }
    .facebook_logo{
        width: 40px; height: 45px; margin-left: 13px; box-shadow: 0px 0px 5px black;
    } 
    .google_logo{
        width: 40px; height: 45px; box-shadow: 0px 0px 5px black;
    }
    .box-login {
        display: flex;
        flex-direction: column;
        background: transparent;
    }
    .box-head{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .box-inputs{
        display: flex;
        flex-direction: column;
        padding: 20px 0px;
    }
    [class|="box-input"]{
        display: flex;
        flex-direction: column;
        padding: 10px 0px 5px 0px;
        align-self: stretch;
    }
    .box-link{
        padding: 15px 0px 15px 0px;
        display: flex;
        flex-direction: column;
        align-self: flex-end;
    }
    .box-button{
        padding-top: 25px;
    }
    .box-complete{
        background-color: white;
        display: flex;
        align-items: center;
        height: 100vh;
        justify-content: center;
    }
    .box-accounts{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    p{
        color: black;
        width: 275px;
        margin-bottom: 0rem;
        padding-right: 11px;
    }
}

@media only screen and (min-width: 400px) {
    /* For tablets: */
    .auth_user{
        width: 200px; height: 200px;
    }
    .facebook_logo{
        width: 45px; height: 50px; margin-left: 13px; box-shadow: 0px 0px 5px black;
    } 
    .google_logo{
        width: 45px; height: 50px; box-shadow: 0px 0px 5px black;
    }
    .box-auth {
        display: flex;
        flex-direction: column;
        background: transparent;
    }
    .box-head{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .box-inputs{
        display: flex;
        flex-direction: column;
        padding: 20px 0px;
    }
    [class|="box-input"]{
        display: flex;
        flex-direction: column;
        padding: 10px 0px 5px 0px;
        align-self: stretch;
    }
    .box-button{
        padding-top: 25px;
    }
    .box-complete{
        background-color: white;
        display: flex;
        align-items: center;
        height: 100vh;
        justify-content: center;
    }
    .box-link{
        padding: 15px 0px 25px 0px;
        display: flex;
        flex-direction: column;
        align-self: flex-end;
    }
    .box-accounts{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    p{
        color: black;
        width: 275px;
        margin-bottom: 0rem;
        padding-right: 11px;
    }
}
@media only screen and (min-width: 810px) {
    /* For desktop: */
    .auth_user{
        width: 200px; height: 200px;
    }
    .facebook_logo{
        width: 45px; height: 50px; margin-left: 15px; box-shadow: 0px 0px 3px white;
    } 
    .google_logo{
        width: 45px; height: 50px; box-shadow: 0px 0px 3px white;
    }
    .box-auth {
        display: flex;
        flex-direction: row;
        background: transparent;
    }
    .box-head{
        align-self: center;
        padding-right: 30px;
    }
    .box-inputs{
        background: black;
        box-shadow: 0px 0px 17px black;
        display: flex;
        flex-direction: column;
        padding: 20px 30px;
    }
    [class|="box-input"]{
        display: flex;
        flex-direction: row;
        padding: 6px 0px 5px 0px;
        align-self: stretch;
    }
    .box-button{
        padding-top: 10px;
    }
    .box-complete{
        background-color: white;
        display: flex;
        align-items: center;
        height: 100vh;
        justify-content: center;
    }
    .box-link{
        padding: 15px 0px 25px 0px;
        display: flex;
        flex-direction: column;
        align-self: flex-end;
    }
    .box-accounts{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    p{
        color: white;
        width: 150px;
        margin-bottom: 0rem;
        padding-right: 11px;
    }
}
</style>