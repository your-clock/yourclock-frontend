<template>
    <div>
        <div class="mt-5 text-center">
        </div>
    </div>
</template>

<script>
import io from "socket.io-client"

export default {
    name: 'Inicio',
    data(){
        return{
            alarm: "",
            socket: {},
            URL: "",
            token: localStorage.token,
            datos: {
                temperatura_amb: 0,
                temperatura_local: 0
            },
            userInfo:{
                nombre: Buffer.from(localStorage.nombre, 'base64').toString('ascii'),
                correo: Buffer.from(localStorage.correo, 'base64').toString('ascii')
            }
        }
    },
    methods:{
        alarma(){
            this.axios.post('/alarma',{
                time: this.alarm
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log("ERROR: "+error);
            });
        },
        salir(){
            let vue=this
            console.log("Has salido")
            localStorage.token = null
            sessionStorage.clear();
            localStorage.clear();
            vue.$router.push('/auth')
		}
    },
    created() {
        let vue = this;
        if(process.env.VUE_APP_NODE_ENV === "production"){
            vue.URL = process.env.VUE_APP_HOST_PROD;
        }else if(process.env.NODE_ENV === "development"){
            vue.URL = process.env.VUE_APP_HOST_DEV;
        }
        this.socket = io(vue.URL);
        console.log("Connected socket to: "+vue.URL);
    },
    async mounted(){
        let vue = this
        await vue.socket.on('datos', data => {
            vue.datos = data;
            console.log(data)
        })
    }
}
</script>

<style scoped>
	h1 {
		font-family: Courier;
		text-align: center;
		font-weight: 450;
		font-size: 40px;
		line-height: 1.3em;
	}
</style>