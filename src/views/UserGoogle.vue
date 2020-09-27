<template>
    <div class="mt-5 text-center">
        <h1>Aqui estara una pantalla de recarga para google :D</h1>
    </div>
</template>

<script>
export default {
    created(){
        if(!this.$route.params.value || !this.$route.params.user || !this.$route.params.name){
            this.$router.push('/error')
        }else{
            localStorage.token = this.$route.params.value
            sessionStorage.nombre = this.$route.params.name
            sessionStorage.correo = this.$route.params.user
            this.$router.push('/inicio')
        }
    }
}
</script>