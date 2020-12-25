<template>
    <div>
        <b-navbar toggleable="md" style="backgroundColor:#C0C0C0">
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
            <br>
            <div>
                <b-button id="btnDeleteAccount" @click="eliminar" variant="outline-danger">Eliminar cuenta</b-button>
            </div>
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