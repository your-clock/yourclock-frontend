<template>
    <div class="mt-5 text-center">
        <div v-if="state == 305">
            <b-alert show dismissible variant="warning">
                Llene todos los campos para completar el registro
            </b-alert>
        </div>
        <div v-else-if="state == 400">
            <b-alert show dismissible variant="danger">
                Error, compruebe su conexion e intentelo de nuevo
            </b-alert>
        </div>
        <br>
    </div>
</template>

<script>

export default {
    name: 'Verify',
    data(){
        return{
            state: ""
        }
    },
    created(){
        let vue = this;
        this.axios.post('/user/verify',{
            mail: vue.$route.params.email
        })
        .then(function (response) {
            console.log(response.data)
            vue.state = response.data
            if(response.data == 310){
                alert("Verificacion realizada correctamente, acceda a su cuenta")
                vue.$router.push('/')
            }else if(response.data == 309){
                alert("Esta cuenta ya ha sido verificada, acceda a su cuenta")
                vue.$router.push('/')
            }
        })
        .catch(function (error) {
            console.log("ERROR: "+error);
            vue.$router.push('/error')
        });
    }
}
</script>