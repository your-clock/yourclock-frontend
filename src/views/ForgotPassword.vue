<template>
    <div class="mt-5 text-center">
        <br>
        <h1>
            ¿Olvido o desea cambiar su contraseña?
        </h1>
        <br>
        <a1>
            Escriba su correo electronico, le enviaremos un mensaje para reestablecerla.
        </a1>
        <br>
        <br>
        <div v-if='state == 400'>

        </div>
        <div v-else-if='state == 402'>

        </div>
        <div v-else-if='state == 307'>

        </div>
        <div v-else-if="state == 305">

        </div>
        <br>
        Correo: 
        <inputClock class="md" type="email" placeholder="Escriba su correo electronico" v-bind:success="comprobarEmail" v-model="userEmail" />
        <br>
        <div>
            <btnClock class="md" v-bind:name="'Enviar'" v-on:on-click="enviar"/>
        </div>
        <br>
        <br>
    </div>
</template>

<script>

import router from 'vue-router'

export default {
    name: 'forgotpassword',
    data(){
        return{
            userEmail: "",
            state: ""
        }
    },
    computed:{
        comprobarEmail(){
            return this.userEmail.length > 0 ? true : false
        }
    },
    methods:{
        enviar(){
            let vue = this
            console.log("enviado")
            this.axios.post('/user/forgotpassword',{
                mail: this.userEmail
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