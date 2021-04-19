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
    </div>
</template>

<script>

import alertClock from '@/components/atoms/alert-clock.vue';
import titleClock from '@/components/atoms/title-clock.vue';
import btnClock from '@/components/atoms/btn-clock.vue';
import inputClock from '@/components/atoms/input-clock.vue';

export default {
    name: 'forgotpassword',
    components: {
        titleClock, 
        btnClock,
        inputClock,
        alertClock
    },
    data(){
        return{
            userEmail: "",
            mensaje: "",
            state: ""
        }
    },
    computed:{
        comprobarEmail(){
            if(this.userEmail.length == 0){
                return 'null'
            }
            return this.userEmail.length >= 6 ? 'true' : 'false'
        },
        comprobarBtnEnviar(){
            return this.comprobarEmail == 'true' ? false : true
        }
    },
    methods:{
        enviar(){
            let vue = this
            vue.state = 0
            console.log("enviado")
            this.axios.post('/user/forgotpassword',{
                mail: this.userEmail
            })
            .then(function(response){
                console.log(response)
                if(response.data.code == 300){
                    alert(response.data.msg)
                    vue.$router.push('/')
                }
            })
            .catch(function(error){
                if(error.response.status >= 400 && error.response.status < 500){
                    vue.state = error.response.data.code
                    vue.mensaje = error.response.data.msg
                }else{
                    console.log("ERROR: "+error)
                    vue.$router.push('/error')
                }
            });
        }
    }
}
</script>