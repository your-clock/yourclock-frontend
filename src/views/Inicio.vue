<template>
    <div>
        <b-navbar toggleable="md" style="background-color:#C0C0C0">
            <b-container>
                <b-navbar-toggle target="nav-collapse">
                </b-navbar-toggle>
                <b-navbar-brand href="#/inicio">
                    <img id=logo alt="Vue logo" src="@/assets/logo_clock.png" width="55px">
                    Your Clock
                </b-navbar-brand>
                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav class="ml-auto">
                        <b-nav-item :to="{name: 'inicio'}">Inicio</b-nav-item>
                <b-nav-item-dropdown right>
                <template v-slot:button-content>
                    <em>Cuenta</em>
                </template>
                <b-dropdown-item id=btn-settings href="#/Settings">Configuracion</b-dropdown-item>
                <b-dropdown-item-button id=btn-logout @click="salir">Salir</b-dropdown-item-button>
                </b-nav-item-dropdown>
                    </b-navbar-nav>
                </b-collapse>
            </b-container>
        </b-navbar>
        <div class="mt-5 text-center">
            <b-container fluid>
                <h1>Bienvenid@ {{userInfo.nombre}}</h1>
            </b-container>
            <br><br>
            <b-col>
                <br>
                temperatura ambiente: {{datos.temperatura_amb}}
                <br>
                temperatura local: {{datos.temperatura_local}}
                <br>
            </b-col>
            <b-col>
                <div>
                    <br>
                    Select a time: <input type="time" v-model="alarm" class="form-control">
                    <br>
                    <br>
                    <b-button @click="alarma" variant="outline-success">Enviar alarma</b-button>
                </div>
            </b-col>
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
		font-family: courier, courier new, serif;
		text-align: center;
		font-weight: 450;
		font-size: 40px;
		line-height: 1.3em;
	}
</style>