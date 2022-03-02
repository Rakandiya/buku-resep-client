<template>
    <div class="container">
        <h5 class="title">Buku Resep 79</h5>
        <img src="../../assets/img/logo1.png" class="logo">
        <h1>{{ Message }}</h1>
        <Alert v-if="showAlert" :success="success">
            {{ message }}
        </Alert>
        <div class="card">
            <div class="card-header">Login</div>
            <div class="card-body">
                <form @submit.prevent="login">
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input type="text" class="form-control" name="username" id="username" placeholder="Username" autocomplete="off" v-model.trim="username">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" class="form-control" name="password" id="password" placeholder="password" v-model.trim="password">
                    </div>
                    <button class="button">Login</button>
                </form>
            </div>
            <div class="card-footer">
                <div class="register">Belum Punya Akun? <router-link to="register">Daftar Disini</router-link></div>
                <a class="about" href="#">About</a>
                <a class="contact" href="#">Contact</a>
            </div>
        </div>
    </div>
</template>

<script>
import Alert from "../../components/ui/alert.vue";
export default {
    data() {
        return {
            username: "",
            password: "",
            invalidInput: false,
            message: null,
            showAlert: false,
            success: true
        };
    },
    methods: {
        async login() {
            this.invalidInput = false;
            this.showAlert = false;

            if(this.username == '' && this.password == '') {
                this.success = false;
                this.showAlert = true;
                this.message = "Isi Username dan Password.";
                return;
            }else if(this.username == '') {
                this.success = false;
                this.showAlert = true;
                this.message = "Isi Username.";
                return;
            }else if(this.password == ''){
                this.success = false;
                this.showAlert = true;
                this.message = "Isi Password.";
                console.log(this.success);
                return;
            }
            const response = await fetch("http://127.0.0.1:8000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    username: this.username,
                    password: this.password
                })
            });
            const responseData = await response.json();
            if (response.status !== 200) {
                this.message = "Username atau Password Salah!";
                this.invalidInput = true;
                this.success = false;
                this.showAlert = true;
                return;
            }
            else {
                // console.log(responseData.user);
                localStorage.setItem('userId', responseData.user.id);
                this.$store.dispatch('setToken', {token: responseData.access_token});
                this.$store.dispatch('setUser', {user: responseData.user});
                this.$router.push({name: 'recipesList', replace:true});
            }
            this.username = "";
            this.password = "";
            this.message = null;
            this.success = true;
        },
    },
    created() {
        if(this.$route.params.message) {
            this.message = this.$route.params.message;
            this.success = true;
            this.showAlert = true;
        }

        if(this.$store.getters.getToken) {
            this.$router.push({name: 'recipesList'});
        }
    },
    components: { Alert }
}
</script>

<style scoped>
@import '../../assets/css/auth/login.css';
</style>