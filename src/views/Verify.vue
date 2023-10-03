<template>
  <div id="verify">
    <overlayClock :show="loading" :msg="'Cargando...'"/>
    <div class="box-logo">
      <img class="logo-yc-verify" src="../assets/logo_yc.png">
    </div>
    <div class="box-messages">
      <titleClock id="message" class="lg black" v-bind:title="message"/>
      <textBtnClock id="btnToAuth" class="lg black" :disabled="false" v-bind:name="'Intenta ingresar a tu cuenta :)'" :target="'_self'" :href="'#/auth'"/>
    </div>
  </div>
</template>

<script>

export default {
    name: 'Verify',
    data(){
        return{
            state: "",
            message: "",
            loading: false
        }
    },
    created(){
        let vue = this;
        vue.loading = true;
        this.axios.post('/user/verify',{
            mail: vue.$route.params.email
        })
        .then(function (response) {
            vue.state = response.data.code
            vue.message = response.data.msg
            vue.loading = false;
        })
        .catch(function (error) {
            if( error.response.status >= 500 || error.response.data.code === 302){
              console.log("ERROR in verify: "+error);
              vue.$router.push('/error')
            }else{
              vue.loading = false
              vue.state = error.response.data.code
              vue.message = error.response.data.msg
            }
        });
    }
}
</script>

<style>

body, html {
  margin: 0;
  padding: 0;
}

@media only screen and (min-width: 1025px) {
  /* For desktop: */
  .logo-yc-verify {
    margin-left: auto;
    margin-right: auto;
    width: 350px;
    padding-top: 24px;
    padding-bottom: 24px;
  }

  .box-messages {
    background-color: black;
    padding-top: 66px;
    padding-bottom: 66px;
    margin-left: 15%;
    margin-right: 15%;
  }

  #message {
    margin-bottom: 170px;
  }
}

@media only screen and (max-width: 700px) {
  /* For mobile phones: */
  .logo-yc-verify {
    margin-left: auto;
    margin-right: auto;
    width: 200px;
    padding-top: 8px;
    padding-bottom: 24px;
  }

  .box-messages {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: black;
    min-height: 100vh;
  }

  #message {
    padding-top: 60px;
    padding-bottom: 20px;
  }

  #btnToAuth {
    padding-bottom: 60px;
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
  }
}

@media only screen and (max-width: 1025px) and (min-width: 700px) {
  /* For tablets: */
  .logo-yc-verify {
    margin-left: auto;
    margin-right: auto;
    width: 280px;
    padding-top: 8px;
    padding-bottom: 32px;
  }

  .box-messages {
    background-color: black;
    padding-top: 40px;
    padding-bottom: 40px;
    margin-left: 10%;
    margin-right: 10%;
  }

  #message {
    margin-bottom: 120px;
  }
}

</style>