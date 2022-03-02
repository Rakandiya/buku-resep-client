<template>
    <h1>401. Unauthorized. Back To <router-link :to="loginLink" class="link">&nbsp;Login</router-link></h1>
</template>

<script>
export default {
    computed: {
        loginLink() {
            localStorage.removeItem('userId');
            this.$store.dispatch('removeToken');
            this.$store.dispatch('removeUser');
            return {name: 'login'};
        }
    }
}
</script>

<style scoped>
h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 600px;
}
.link {
    text-decoration: none;
    color: #f49881;
}
</style>