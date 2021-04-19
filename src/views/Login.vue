<template>
    <div id="login">
        <overlayClock :show="loading" :msg="'Cargando...'"/>
        <div class="box-alerts">
            <div v-if="state == 305 || state == 304">
                <alertClock class="lg warning" :msg="mensaje"/>
            </div>
            <div v-else-if="state == 400 || state == 402">
                <alertClock class="lg danger" :msg="mensaje"/>
            </div>
        </div>
        <div class="box-complete">
            <div class="box-login">
                <div class="box-head">
                    <img class="new_user" src="../assets/login.jpg">
                    <titleClock id="title" v-bind:title="'Registrese'"/>
                </div>
                <div class="box-inputs">
                    <div class="box-input-name1">
                        <p>Primer nombre:</p>
                        <inputClock class="md input-name1" :disabled="loading" type="text" placeholder="Escriba su primer nombre" v-bind:success="comprobarName1" v-model="userName1"/>
                    </div>
                    <div class="box-input-name2">
                        <p>Segundo nombre:</p>
                        <inputClock class="md input-name2" :disabled="loading" type="text" placeholder="Escriba su segundo nombre (opcional)" v-bind:success="comprobarName2" v-model="userName2" />
                    </div>
                    <div class="box-input-lastname1">
                        <p>Primer apellido:</p>
                        <inputClock class="md input-lastname1" :disabled="loading" type="text" placeholder="Escriba su primer apellido" v-bind:success="comprobarLastName1" v-model="userLastName1" />
                    </div>
                    <div class="box-input-lastname2">
                        <p>Segundo apellido:</p>
                        <inputClock class="md input-lastname2" :disabled="loading" type="text" placeholder="Escriba su segundo apellido (opcional)" v-bind:success="comprobarLastName2" v-model="userLastName2" />
                    </div>
                    <div class="box-input-email">
                        <p>Correo:</p>
                        <inputClock class="md input-email" :disabled="loading" type="email" placeholder="Escriba su correo electronico" v-bind:success="comprobarEmail" v-model="userEmail" />
                    </div>
                    <div class="box-input-password">  
                        <p>Contraseña:</p>
                        <inputClock class="md input-password" :disabled="loading" type="password" placeholder="Escriba una contraseña minimo de 8 caracteres" v-bind:success="comprobarPassword" v-model="userPassword" />
                    </div>
                    <div class="box-input-city"> 
                        <p>Ciudad:</p>
                        <inputClock class="md input-city" :disabled="loading" type="text" placeholder="Escriba su ciudad actual" v-bind:success="comprobarCity" v-model="userCity" />
                    </div>
                    <div v-if="seenWarning == true">
                        <p class="text-error-email">Por favor digite un correo valido para continuar.</p>
                    </div>
                    <div class="box-button">
                        <btnClock class="md" v-bind:name="'Registrarme'" v-bind:state="comprobarBtnEnviar" v-on:on-click="enviar"/>
                    </div>
                    <div class="box-link">
                        <textBtnClock :disabled="loading" v-bind:href="'#/Auth'" v-bind:name="'Ya tengo una cuenta'"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import router from 'vue-router'

export default{
    name: 'Login',
    metaInfo() {
        return {
            meta: [{
                name: 'viewport',
                content: "width=device-width, initial-scale=1.0",
            }]
        }
    },
    data(){
        return{
            userName1: "",
            userName2: "",
            userLastName1: "",
            userLastName2: "",
            userEmail: "",
            userPassword: "",
            userCity: "",
            state: "",
            loading: false,
            mensaje: "",
            seenWarning: false
        }
    },
    computed:{
        comprobarName1(){
            return this.userName1.length == 0 ? 'null' : this.userName1.length >= 1 ? 'true' : 'false'
        },
        comprobarName2(){
            return this.userName2.length == 0 ? 'null' : this.userName2.length >= 1 ? 'true' : 'null'
        },
        comprobarLastName1(){
            return this.userLastName1.length == 0 ? 'null' : this.userLastName1.length >= 1 ? 'true' : 'false'
        },
        comprobarLastName2(){
            return this.userLastName2.length == 0 ? 'null' : this.userLastName2.length >= 1 ? 'true' : 'null'
        },
        comprobarEmail(){
            return this.userEmail.length == 0 ? 'null' : this.userEmail.length >= 6 ? 'true' : 'false'
        },
        comprobarPassword(){
            return this.userPassword.length == 0 ? 'null' : this.userPassword.length >= 8 ? 'true' : 'false'
        },
        comprobarCity(){
            return this.userCity.length == 0 ? 'null' : this.userCity.length >= 1 ? 'true' : 'false'
        },
        comprobarBtnEnviar(){
            return this.comprobarName1 == 'true' && this.comprobarLastName1  == 'true' && this.comprobarEmail == 'true'  && this.comprobarPassword == 'true' && this.comprobarCity == 'true' ? false : true
        }
    },
    methods:{
        enviar(){
            let vue = this;
            vue.loading = true;
            vue.state = 0
            vue.seenWarning = false
            console.log("enviado")
            this.axios.post('/user/login', {
                mail: this.userEmail,
                pass: this.userPassword,
                name1: this.userName1,
                name2: this.userName2,
                lastName1: this.userLastName1,
                lastName2: this.userLastName2,
                city: this.userCity
            }).then(function (response) {
                console.log(response.data)
                vue.state = response.data.code
                vue.mensaje = response.data.msg
                if(response.data.code == 300){
                    alert(vue.mensaje)
                    vue.$router.push('/')
                }else{
                    vue.loading = false;
                }
            }).catch(function (error) {
                if(error.response.status >= 400 && error.response.status < 500){
                    if(error.response.data.code == 305){
                        console.log(error.response.data.code)
                        vue.seenWarning = true
                        vue.comprobarEmail = false
                    }
                    vue.loading = false;
                    console.log(error.response.data);
                }else{
                    vue.$router.push('/error');
                }
            });
        }
    }
}
</script>

<style scoped>

	.text-error-email {
		font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        color: #dc3545;
		font-weight: 450;
		font-size: 15px;
        margin-top: 10px;
	}

    @media only screen and (max-width: 400px) {
        /* For mobile phones: */
        img{
            width: 150px; height: 150px;
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
        .box-button{
            padding-top: 25px;
        }
        .box-complete{
            background-color: black;
            display: flex;
            align-items: center;
            height: 100vh;
            justify-content: center;
        }
        p{
            color: white;
            width: 275px;
            margin-bottom: 0rem;
            padding-right: 11px;
        }
    }

    @media only screen and (min-width: 400px) {
        /* For tablets: */
        img{
            width: 200px; height: 200px;
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
        .box-button{
            padding-top: 25px;
        }
        .box-complete{
            background-color: black;
            display: flex;
            align-items: center;
            height: 100vh;
            justify-content: center;
        }
        p{
            color: white;
            width: 275px;
            margin-bottom: 0rem;
            padding-right: 11px;
        }
    }
    @media only screen and (min-width: 810px) {
        /* For desktop: */
        img{
            width: 200px; height: 250px;
        }
        .box-login {
            display: flex;
            flex-direction: row;
            background: transparent;
        }
        .box-head{
            align-self: center;
            padding-right: 20px;
        }
        .box-inputs{
            background: white;
            box-shadow: 0px 0px 17px white;
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
            background-color: black;
            display: flex;
            align-items: center;
            height: 100vh;
            justify-content: center;
        }
        .box-link{
            padding-top: 15px;
        }
        p{
            color: black;
            width: 275px;
            margin-bottom: 0rem;
            padding-right: 11px;
        }
    }
</style>