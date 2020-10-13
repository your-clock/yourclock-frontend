<template>
    <div class="mt-5 text-center">
        <h1>hola</h1>
        <div>
            <b-button @click="eliminar" variant="outline-danger">Eliminar cuenta</b-button>
        </div>
    </div>
</template>

<script>

import router from 'vue-router'

export default {
    methods:{
        eliminar(){
            let vue=this
            console.log("Eliminar cuenta");
            this.axios.delete('/deleteaccount',{
                mail: Buffer.from(sessionStorage.correo, 'base64').toString('ascii')
            })
            .then(function (response) {
                console.log(response.data)
                if(response.data.code == 311){
                    sessionStorage.clear();
                    localStorage.token = null;
                    alert(response.data.msg)
                    vue.$router.push('/')
                }else{
                    console.log(msg);
                }
            })
            .catch(function (error) {
                console.log("ERROR: "+error);
                vue.$router.push('/error')
            });
        }
    }
}
</script>