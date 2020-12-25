<template>

    <button :disabled="state" v-on:click="$emit('on-click')">{{name}}</button>

</template>

<script>

export default {
    name: 'btn-clock',
    props: {
        name: {
            type: String,
            require: true,
        },
        state: {
            type: Boolean,
            default: true
        }
    } 
}

</script>

<style scoped>

    button.sm{
        height: 30px;
        font-size: 13px;
    }
    button.md{
        height: 35px;
        font-size: 16px;
    }
    button.lg{
        height: 40px;
        font-size: 18px;

    }
    
    button{
        width: 100%;
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        background-color: white;
        color: black;
        border: 1px solid black;
        border-radius: 5px;
        font-size: 16px;
        transition: all 0.3s ease;
    }
    button:hover{
        background-color: black;
        color: white;
        border: 1px solid white;
    }
    button:disabled{
        background-color: white;
        color: gray;
        border: 1px solid grey;
    }
    button:active{
        background-color: black;
        color: white;
        border: 1px solid white;
    }
    button:focus{
        background-color: grey;
        color: black;
        border: 1px solid grey;
    }

</style>