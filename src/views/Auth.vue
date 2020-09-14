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
                <b-button :disabled="loading" @click="enviar" variant="outline-success">Ingrese</b-button>
            </div>
            <br>
            <br>
        </b-overlay>
    </div>
</template>

<script>

export default{
    name: 'auth',
    data(){
        return{
            state: "",
            userEmail: "",
            userPassword: "",
            loading: false,
            mensaje: ""
        }
    },
    computed:{
        comprobarEmail(){
            return this.userEmail.length > 0 ? true : false
        },
        comprobarPassword(){
            return this.userPassword.length > 0 ? true : false
        }
    },  
    methods:{
        enviar(){
            let vue=this
            vue.loading = true
            console.log("enviado")
            this.axios.post('/auth',{
                mail: this.userEmail,
                pass: this.userPassword
            })
            .then(function (response) {
                vue.state = response.data.code
                vue.mensaje = response.data.msg
                if(response.data.code.length > 5 ){
                    console.log("token recibido")
                    localStorage.token = response.data.code
                    vue.$router.push('/inicio')
                }else{
                    vue.loading = false
                }
            })
            .catch(function (error) {
                console.log("ERROR: "+error);
                vue.$router.push('/error')
            });
        },
        google(){
            let vue = this
            vue.loading = true
            this.axios.get('/auth/google',{
                headers: {
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                }
            })
            .then(function(response){
                console.log(response.data)
                vue.state = response.data
                if(response.data == 300){
                    alert("Mensaje enviado exitosamente, verifique su correo para cambiar su contraseña")
                    vue.$router.push('/')
                }
            })
            .catch(function(error){
                console.log("ERROR: "+error)
                vue.$router.push('/error')
            });
        }
    }
}
</script>