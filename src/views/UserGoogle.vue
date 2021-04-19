<template>
    <div class="mt-5 text-center">
        <!-- <b-overlay :show="true" rounded="sm">
        </b-overlay> -->
    </div>
</template>

<script>
export default {
    created(){
        if(!this.$route.params.value || !this.$route.params.user || !this.$route.params.name){
            this.$router.push('/error')
        }else{
            let vue = this;
            localStorage.id = vue.$route.params.value
            localStorage.nombre = vue.$route.params.name
            localStorage.correo = vue.$route.params.user
            vue.axios.post('/token/createtoken',{
                tokenData: {
                    nombre: localStorage.getItem("nombre"),
                    correo: localStorage.getItem("correo"),
                    id: localStorage.getItem("id")
                }
            }).then(function(response){
                if(response.data.code == 300){
                    console.log("token recibido")
                    localStorage.setItem("uuid", response.data.uuid)
                    vue.$router.push('/inicio')
                }else{
                    vue.$router.push('/error')
                }
            }).catch(function(error){
                console.log("ERROR: "+error);
                vue.$router.push('/error')
            })
        }
    }
}
</script>