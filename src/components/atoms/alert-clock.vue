<template>
    <div class="alert">
        <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
        <strong>¡Atencion!</strong>
        <span> {{msg}}</span>
    </div>
</template>

<script>
export default {
    name: 'alert-clock',
    props: {
        msg: {
            type: String,
            require: true
        },
        state: {
            type: Boolean,
            default: true
        }
    }
}
</script>

<style scoped>

.alert{
    margin-bottom: 0px;
}
.lg{
    font-size: 15px;
    padding: 5px;
    padding: 14px;
}

.sm{
    margin-left: auto;
    margin-right: auto;
    font-size: 13px;
    padding: 10px;
}

.danger.alert {
    padding: 12px;
    background-color: rgb(160, 0, 0);
    color: white;
}

.warning.alert {
    padding: 12px;
    background-color: #C0C000;
    color: black;
}

.closebtn {
    margin-left: 15px;
    color: white;
    font-weight: bold;
    float: right;
    font-size: 22px;
    line-height: 15px;
    cursor: pointer;
    transition: 0.3s;
}

.closebtn:hover {
    color: black;
}

</style>