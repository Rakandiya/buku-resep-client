<template>
    <div class="container">
        <h5 class="title">Buku Resep 79</h5>
        <img src="../../assets/img/logo1.png" class="logo">

        <Alert v-if="showAlert" :success="false">
            {{ error }}
        </Alert>

        <div class="card" :class="{cardChange: invalidInput}">
            <div class="card-header">Register</div>
            <div class="card-body" :class="{cardBody: invalidInput}">
                <form @submit.prevent="register">
                    <div class="form-group">
                        <label for="username">Username <span class="star">*</span></label>
                        <input type="text" class="form-control" name="username" id="username" placeholder="Username" autocomplete="off" v-model="username">
                        <p v-if="errorInput.username != null" class="invalid-message">{{ errorInput.username[0] }}</p>
                    </div>
                    <div class="form-group">
                        <label for="name">Nama Lengkap <span class="star">*</span></label>
                        <input type="text" class="form-control" name="name" id="name" placeholder="Nama Lengkap" autocomplete="off" v-model="nama" >
                        <p v-if="errorInput.name != null" class="invalid-message">{{ errorInput.name[0] }}</p>
                    </div>
                    <div class="form-group">
                        <label for="password">Kata Sandi <span class="star">*</span></label>
                        <input type="password" class="form-control" name="password" id="password" placeholder="Kata Sandi" v-model="password" >
                        <p v-if="errorInput.password != null" class="invalid-message">{{ errorInput.password[0] }}</p>
                    </div>
                    <div class="form-group">
                        <label for="password_confirmation">Konfirmasi Kata Sandi <span class="star">*</span></label>
                        <input type="password" class="form-control" name="password_confirmation" id="password_confirmation" placeholder="Konfirmasi Kata Sandi" v-model="password_confirmation">
                    </div>
                    <button class="button">Daftar</button>
                </form>
            </div>
            <div class="card-footer">
                <router-link to="/" class="register">Batal, Kembali Ke Halaman Login.</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import Alert from "../../components/ui/alert.vue";
export default {
    emits: ["success-register"],
    data() {
        return {
            username: "",
            nama: "",
            password: "",
            password_confirmation: "",
            invalidInput: false,
            error: null,
            errorInput: {
                username: null,
                name: null,
                password: null,
                password_confirmation: null
            },
            showAlert: false,
            success: true,
        };
    },
    methods: {
        async register() {
            this.invalidInput = false;
            this.success = false;
            const response = await fetch("http://127.0.0.1:8000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    username: this.username,
                    name: this.nama,
                    password: this.password,
                    password_confirmation: this.password_confirmation,
                })
            });
            const responseData = await response.json();
            if (!response.ok) {
                this.error = "Data Belum Terisi Dengan Benar!";
                this.errorInput = responseData.errors;
                this.invalidInput = true;
                this.showAlert = true;
                this.success = false;
                return;
            }
            else {
                this.$router.push({name: 'login', replace:true, params: {message: "Registrasi Berhasil."}});
            }
            this.username = "";
            this.name = "";
            this.password = "";
            this.password_confirmation = "";
            this.error = null;
            this.errorInput = null;
        }
    },
    components: { Alert }
}
</script>


<style scoped>
@import '../../assets/css/auth/register.css';
</style>