<template>
    <div class="div1">
        <div class="div2">
            <inputClock class="md input-name1" type="text" placeholder="Escriba su primer nombre" v-bind:success="comprobarName1" v-model="userName1"/>
            <btnClock class="md" v-bind:name="'Registrarme'" v-bind:size="'lg'" v-bind:state="comprobarBtnEnviar" v-on:on-click="enviar"/>
        </div>
    </div>
</template>

<script>

import router from 'vue-router'
import alertClock from '@/components/atoms/alert-clock.vue';
import titleClock from '@/components/atoms/title-clock.vue';
import btnClock from '@/components/atoms/btn-clock.vue';
import inputClock from '@/components/atoms/input-clock.vue';

export default {
    name: 'Login',
    components: {
        titleClock, 
        btnClock,
        inputClock,
        alertClock
    }
}
</script>

<style lang="css" scoped>


    .div1{
        display: flex;
        align-items: center;
        height: 100vh;
        background-color: red;
        justify-content: center;
    }
    .div2{
        height: 100px;
        padding: 10px;
        background-color: yellow;
        box-shadow: 0px 0px 17px black;
    }
</style>