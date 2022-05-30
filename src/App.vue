<template>
  <div id="app">
    <metainfo>
      <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>
    <router-view/>
  </div>
</template>

<script>

import { useMeta } from 'vue-meta'

export default {
  name: 'app',
  setup () {
    useMeta({
      title: 'Your clock ⏲',
      description: 'The Description',
      htmlAttrs: { lang: 'es', amp: true }
    })
  },
  data(){
    return{

    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
