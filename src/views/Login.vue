<template>
    <div class="mt-5 text-center">
        <b-img 
            center 
            src="https://zero1.sg/img/accountlogin-icon.png" 
            alt="Center image"
            width="175px"
        ></b-img>
        <br>
        <h1>
            Registrese
        </h1>
        <br>
        <div v-if="state == 305">
            <b-alert show dismissible variant="warning">
                {{mensaje}}
            </b-alert>
        </div>
        <div v-else-if="state == 304">
            <b-alert show dismissible variant="warning">
                {{mensaje}}
            </b-alert>
        </div>
        <div v-else-if="state == 400">
            <b-alert show dismissible variant="danger">
                {{mensaje}}
            </b-alert>
        </div>
        <div v-else-if="state == 402">
            <b-alert show dismissible variant="danger">
                {{mensaje}}
            </b-alert>
        </div>
        <br>
        Primer nombre: <b-form-input type="text" v-model="userName1" :state="comprobarName1" size="sm" placeholder="Escriba su nombre completo"></b-form-input>
        <br>
        Segundo nombre: <b-form-input type="text" v-model="userName2" :state="comprobarName2" size="sm" placeholder="Escriba su nombre completo"></b-form-input>
        <br>
        <br>
        Primer apellido: <b-form-input type="text" v-model="userLastName1" :state="comprobarLastName1" size="sm" placeholder="Escriba su nombre completo"></b-form-input>
        <br>
        <br>
        Segundo apellido: <b-form-input type="text" v-model="userLastName2" :state="comprobarLastName2" size="sm" placeholder="Escriba su nombre completo"></b-form-input>
        <br>
        Correo: <b-form-input type="email" v-model="userEmail" :state="comprobarEmail" size="sm" placeholder="Escriba su correo electronico"></b-form-input>
        <br>
        Contraseña: <b-form-input type="password" v-model="userPassword" :state="comprobarPassword" size="sm" placeholder="Escriba su contraseña"></b-form-input>
        <br>
        Ciudad: <b-form-input type="text" v-model="userCity" :state="comprobarCity" size="sm" placeholder="Escriba su ciudad actual"></b-form-input>
        <br>
        <div>
            <b-button @click="enviar" variant="outline-success">Registrarse</b-button>
        </div>
        <br>
        <br>
    </div>
</template>

<script>

import router from 'vue-router'

export default{
    name: 'Login',
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
            token: "",
            mensaje: ""
        }
    },
    computed:{
        comprobarName1(){
            return this.userName1.length > 1 ? true : false
        },
        comprobarName2(){
            return this.userName2.length > 1 ? true : false
        },
        comprobarLastName1(){
            return this.userLastName1.length > 1 ? true : false
        },
        comprobarLastName2(){
            return this.userLastName2.length > 1 ? true : false
        },
        comprobarEmail(){
            return this.userEmail.length > 8 ? true : false
        },
        comprobarPassword(){
            return this.userPassword.length > 0 ? true : false
        },
        comprobarCity(){
            return this.userCity.length > 1 ? true : false
        }
    },  
    methods:{
        enviar(){
            let vue=this
            console.log("enviado")
            this.axios.post('/login', {
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
                }
            }).catch(function (error) {
                console.log("ERROR: "+error);
                vue.$router.push('/error')
            });
        }
    }
}
</script>