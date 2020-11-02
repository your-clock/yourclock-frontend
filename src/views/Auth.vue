<template>
    <div class="text-center">
        <b-overlay :show="loading" rounded="sm">
            <img alt="Vue logo" src="../assets/logo.png" width="350px">
            <h1>
                Ingrese
            </h1>
            <br>
            <div v-if="state == 305 || state == 306 || state == 307">
                <b-alert show dismissible variant="warning">
                    {{mensaje}}
                </b-alert>
            </div>
            <div v-else-if="state == 308 || state == 400 || state == 401">
                <b-alert show dismissible variant="danger">
                    {{mensaje}}
                </b-alert>
            </div>
            <br>
            Correo: <b-form-input :disabled="loading" type="email" v-model="userEmail" :state="comprobarEmail" size="sm" placeholder="Escriba su correo electronico"></b-form-input>
            <br>
            Contraseña: <b-form-input :disabled="loading" type="password" v-model="userPassword" :state="comprobarPassword" size="sm" placeholder="Escriba su contraseña"></b-form-input>
            <br>
            <div id=forgotPassword>
                <b-link :disabled="loading" href="#/ForgotPassword">Olvide mi contraseña</b-link>
            </div>
            <br>
            <div id=loginGoogle>
                <b-link :disabled="loading" @click="google">Ingresa con Google</b-link>
            </div>
            <br>
            <div id=ingresar>
                <b-button :disabled="comprobarBtnEnviar" @click="enviar" variant="outline-success">Ingrese</b-button>
            </div>
            <br>
            <br>
        </b-overlay>
    </div>
</template>

<script>
import io from "socket.io-client"

export default{
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
            return this.userEmail.length >= 6 ? true : false
        },
        comprobarPassword(){
            return this.userPassword.length >= 8 ? true : false
        },
        comprobarBtnEnviar(){
            return this.comprobarPassword == true && this.comprobarEmail == true ? false : true
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
}
</script>