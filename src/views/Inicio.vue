<template>
    <div>
        <div class="mt-5 text-center">
            <br>
            temperatura ambiente: {{datos.temp_amb}}
            <br>
            temperatura local: {{datos.temp_local}}
            <br>
        </div>
    </div>
</template>

<script>
import { io } from "socket.io-client";

export default {
    name: 'Inicio',
    data(){
        return{
            alarm: "",
            socket: {},
            token: localStorage.token,
            datos: {
                temp_amb: 0,
                temp_local: 0
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
        this.socket = io(process.env.VUE_APP_HOST, {
            transports: ["polling", "websocket"]
        });
        this.socket.emit("setDevice", "114");
    },
    async mounted(){
        let vue = this
        this.socket.on("connect", () => {
            console.log("socket connected");
        });
        this.socket.on("datos", (data) => {
            vue.datos = data;
            console.log(`Datos obtenidos por socket: ${data}`)
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