<template>
  <Header v-if="!checkPages"/>
  <main>
    <RouterView />
  </main>
</template>

<script>
import Header from "./components/layouts/Header.vue"
export default {
    computed: {
        checkPages() {
          if (this.$route.name == "login" || this.$route.name == "register" || this.$route.name == "notFound" || this.$route.name == "unauthorized") {
            return true;
          }
        },
    },
    created() {
      if(localStorage.getItem('token') === "") {
        this.$router.push({name: 'unauthorized', replace: true});
      }else if(localStorage.getItem('token')){
        this.$router.push({name: 'recipesList', replace: true});
      }
    },
    components: { Header }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html {
  font-family: "Roboto", sans-serif;
}
body {
  background-color: #f0f9f9;
}
</style>
