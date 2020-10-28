<template>
    <div class="mt-5 text-center">
        <h1>hola</h1>
        <div>
            <b-button id="btnDeleteAccount" @click="eliminar" variant="outline-danger">Eliminar cuenta</b-button>
        </div>
    </div>
</template>

<script>

export default{
    name: 'settings',
    data(){
        return{

        }
    }, 
    methods:{
        eliminar(){
            let vue = this
            console.log("Eliminar cuenta");
            this.axios.post('/user/deleteaccount',{
                mail: localStorage.correo
            })
            .then(function (response) {
                console.log(response.data)
                if(response.data.code == 311){
                    sessionStorage.clear();
                    localStorage.clear();
                    alert(response.data.msg)
                    vue.$router.push('/')
                }else{
                    console.log(response.data.msg);
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