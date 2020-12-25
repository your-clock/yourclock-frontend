<template>
    <h1 class="title-1">{{title}}</h1>
</template>

<script>
export default {
    name: 'title-clock',
    props: {
        title: {
            type: String,
            require: true,
        }
    }  
}
</script>

<style scoped>
    .title-1{
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        color:white;
        font-size: 30px;
        margin-bottom: 0rem;
    }
</style>