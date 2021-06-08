<template>
    <div class="mt-5 text-center">
        <h1>
            Cambie su contraseña
        </h1>
        <br>
        <div v-if="state == 305">
            <alertClock class="lg warning" :msg="'Llene todos los campos para completar el registro'"/>
        </div>
        <div v-else-if="state == 400">
            <alertClock class="lg warning" :msg="'Error, compruebe su conexion e intentelo de nuevo'"/>
        </div>
        <br>
        Nueva contraseña:
        <inputClock class="md" type="password" placeholder="Escriba su contraseña" v-bind:success="comprobarPassword" v-model="userPassword" />
        <br>
        Repita la contraseña: 
        <inputClock class="md" type="password" placeholder="Escriba de nuevo su contraseña" v-bind:success="comprobarPasswordVerification" v-model="userPasswordVerification" />
        <br>
        <div>
            <btnClock class="md" v-bind:name="'Cambiar'" v-on:on-click="enviar"/>
        </div>
    </div>
</template>

<script>

import router from 'vue-router'

export default {
    name: "recoverypassword",
    data(){
        return{
            userPassword: "",
            userPasswordVerification: "",
            state: ""
        }
    },
    computed:{
        comprobarPassword(){
            return this.userPassword.length > 0 ? true : false
        },
        comprobarPasswordVerification(){
            return this.userPasswordVerification.length > 0 ? true : false
        }
    },
    methods:{
        enviar(){
            let vue = this
            if(this.userPassword != this.userPasswordVerification){
                alert("Las contraseñas indicadas no coinciden, verifique e intentelo de nuevo")
            }else{
                this.axios.post('/user/recoverypassword',{
                    id: vue.$route.params.id,
                    pass: this.userPassword
                })
                .then(function(response){
                    vue.state = response.data.code
                    if(response.data.code == 310){
                        alert("Contraseña reestablecida exitosamente, ingrese de nuevo")
                        localStorage.token = null
                        vue.$router.push('/auth')
                    }
                })
                .catch(function (error) {
                    console.log("ERROR: "+error);
                    vue.$router.push('/error')
                });
            }
        }
    }
}
</script>