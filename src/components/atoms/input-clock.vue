<template>

    <input v-bind:value="value" v-on:input="$emit('input', $event.target.value)" :type="type" :placeholder="placeholder" :disabled="disabled" :success="state">

</template>

<script>

export default {
    name: 'input-clock',
    props: {
        type: {
            type: String,
            default: 'text'
        },
        placeholder: {
            type: String,
            default: ''
        },
        state: {
            type: String,
            default: 'null'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        value: {
            
        }
    }
}

</script>

<style scoped>

    input.sm{
        height: 25px;
        font-size: 11px;
    }
    input.md{
        height: 30px;
        font-size: 14px;
    }
    input.lg{
        height: 35px;
        font-size: 17px;
    }
    input{
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        width: 100%;
        height: 30px;
        font-size: 14px;
        padding-left: 10px;
        border: 1px solid black;
        border-radius: 5px;
    }
    input[success="null"]:disabled{
        border: 1px solid rgb(0, 0, 0);
        background-color: rgb(0, 0, 0);
    }
    input:disabled::-webkit-input-placeholder { 
        color: white; 
    } 
    input[success="true"]{
        border: 1.5px solid rgb(0, 115, 0);
        background-color: #e8f0fe;
    }
    input[success="false"]{
        border: 1.5px solid rgb(185, 0, 0);
        background-color: #FFEAEA;
    }
    input[success="null"]{
        border: 1px solid black;
        background-color: #EEEEEE;
    }
    input[success="true"]:focus{
        box-shadow: 0 0 0 2px rgba(0, 115, 0, 0.4);
        background-color: white;
        outline: none;
    }
    input[success="false"]:focus{
        box-shadow: 0 0 0 2px rgba(185, 0, 0, 0.4);
        background-color: white;
        outline: none;
    }
    input[success="null"]:focus{
        box-shadow: 0 0 0 1.5px rgba(0, 0, 0, 0.4);
        background-color: white;
        outline: none;
    }
    input[success="null"]:focus::-webkit-input-placeholder{
        color: transparent;
    }
    input[success="true"]:hover{
        box-shadow: 0 0 0 2px rgba(0, 115, 0, 0.4);
        outline: none;
    }
    input[success="false"]:hover{
        box-shadow: 0 0 0 2px rgba(185, 0, 0, 0.4);
        outline: none;
    }
    input[success="null"]:hover{
        box-shadow: 0 0 0 1.5px rgba(0, 0, 0, 0.4);
        outline: none;
    }

</style>