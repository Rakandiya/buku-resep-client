<template>
    <section class="content">
        <div class="container">
            <h1 class="title">Buat Resep Masakan Baru</h1>
            <div class="alert">
                <Alert v-if="showAlert" :success="false">
                    {{ error }}
                </Alert>
            </div>
            <form @submit.prevent="saveData">
                <div class="row">
                    <div class="col-6">
                        <div class="form-group">
                            <label for="recipename">Nama Resep Masakan</label>
                            <input type="text" name="recipename" id="recipename" class="form-control" autocomplete="off" v-model.trim="recipename" placeholder="Nama Resep Masakan">
                            <p v-if="errorInput.recipeName.error" class="invalid-message">{{ errorInput.recipeName.message }}</p>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="form-group">
                            <label for="categoryid">Kategori Masakan</label>
                            <select name="categoryid" id="categoryid" class="form-control" v-model="categoryid">
                                <option value="">-- Kategori Masakan --</option>
                                <option value="1">Breakfast</option>
                                <option value="2">Lunch</option>
                                <option value="3">Dinner</option>
                            </select>
                            <p v-if="errorInput.categoryid.error" class="invalid-message">{{ errorInput.categoryid.message }}</p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <div class="form-group">
                            <label for="imageurl">Gambar Masakan</label>
                            <input type="text" name="imageurl" id="imageurl" class="form-control" autocomplete="off" v-model.trim="imageurl" placeholder="URL Gambar Masakan">
                            <p v-if="errorInput.imageurl.error" class="invalid-message">{{ errorInput.imageurl.message }}</p>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="form-group">
                            <label for="time">Waktu Masak (Menit)</label>
                            <input type="number" name="time" id="time" class="form-control" autocomplete="off" v-model.trim="time" placeholder="Waktu Masak">
                            <p v-if="errorInput.time.error" class="invalid-message">{{ errorInput.time.message }}</p>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="form-group">
                            <label for="levelid">Tingkat Kesulitan</label>
                            <select name="levelid" id="levelid" class="form-control" v-model="levelid">
                                <option value="">-- Tingkat Kesulitan --</option>
                                <option value="1">Mudah</option>
                                <option value="2">Sedang</option>
                                <option value="3">Sulit</option>
                            </select>
                            <p v-if="errorInput.levelid.error" class="invalid-message">{{ errorInput.levelid.message }}</p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <div class="form-group">
                            <label for="ingredients">Bahan - Bahan</label>
                            <textarea name="ingredients" id="ingredients" rows="12" v-model.trim="ingredients" placeholder="Bahan - Bahan"></textarea>
                            <p v-if="errorInput.ingredients.error" class="invalid-message">{{ errorInput.ingredients.message }}</p>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="form-group">
                            <label for="howtocook">Cara Masak</label>
                            <textarea name="howtocook" id="howtocook" rows="12" v-model.trim="howtocook" placeholder="Cara Masak"></textarea>
                            <p v-if="errorInput.howtocook.error" class="invalid-message">{{ errorInput.howtocook.message }}</p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="button-footer col-4 offset-8">
                        <router-link :to="{name: 'recipesList'}" class="btn batal">Batal</router-link>
                        <button class="btn submit">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
import Alert from "../../components/ui/alert.vue";
export default {
    components: {Alert},
    data() {
        return {
            recipename: '',
            categoryid: '',
            imageurl: '',
            time: '',
            levelid: '',
            ingredients: '',
            howtocook: '',
            errorInput: {
                recipeName: {error: false, message: 'Isi Nama Resep.'},
                categoryid: {error: false, message: 'Pilih Kategori.'},
                imageurl: {error: false, message: 'Isi URL Image.'},
                time: {error: false, message: 'Isi Waktu.'},
                levelid: {error: false, message: 'Pilih Level Kesulitan.'},
                ingredients: {error: false, message: 'Isi Bahan-bahan.'},
                howtocook: {error: false, message: 'Isi Cara Masak.'},
            },
            error: null,
            showAlert: false,
        }
    },
    methods: {
        async saveData() {
            if(this.$store.getters.getToken !== '') {
                this.showAlert = false;
                this.errorInput.recipeName.error = false;
                this.errorInput.categoryid.error = false;
                this.errorInput.imageurl.error = false;
                this.errorInput.time.error = false;
                this.errorInput.levelid.error = false;
                this.errorInput.ingredients.error = false;
                this.errorInput.howtocook.error = false;

                if(this.recipename == '' || this.categoryid == '' || this.imageurl == '' || this.time == '' || this.levelid == '' || this.ingredients == '' || this.howtocook == '') {
                    this.error = "Data belum terisi dengan benar";
                    this.showAlert = true;
                    if(this.recipename == '') {
                        this.errorInput.recipeName.error = true;
                    }
                    if(this.categoryid == '') {
                        this.errorInput.categoryid.error = true;
                    }
                    if(this.imageurl == '') {
                        this.errorInput.imageurl.error = true;
                    }
                    if(this.time == '') {
                        this.errorInput.time.error = true;
                    }
                    if(this.levelid == '') {
                        this.errorInput.levelid.error = true;
                    }
                    if(this.ingredients == '') {
                        this.errorInput.ingredients.error = true;
                    }
                    if(this.howtocook == '') {
                        this.errorInput.howtocook.error = true;
                    }
                    return;
                }

                const response = await fetch("http://127.0.0.1:8000/api/recipes/store", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": "Bearer " + this.$store.getters.getToken
                    },
                    body: JSON.stringify({
                        categoryid: this.categoryid,
                        levelid: this.levelid,
                        recipename: this.recipename,
                        imageurl: this.imageurl,
                        ingredients: this.ingredients,
                        howtocook: this.howtocook,
                        time: this.time,
                    })
                });
                const responseData = await response.json();
                if (response.status === 401) {
                        this.$router.push({name: 'unauthorized'});
                    }
                if (response.status === 404) {
                    this.$router.push({name: 'notFound'});
                }
                if (!response.ok) {
                    this.error = "Data Belum Terisi Dengan Benar!";
                    this.showAlert = true;
                    if(responseData.imageurl) {
                        this.errorInput.imageurl.error = true;
                        this.errorInput.imageurl.message = 'Yang dimasukkan bukan URL untuk gambar.';
                    } 
                    return;
                }
                else {
                    this.$router.push({name: 'myRecipes', replace:true, params: {message: "Resep Masakan Berhasil Dibuat."}});
                }

                this.categoryid = '';
                this.levelid = '';
                this.recipename = '';
                this.imageurl = '';
                this.ingredients = '';
                this.howtocook = '';
                this.time = '';
                this.error = null;
            }else{
                this.$router.push({name: 'login'});
            }
        }
    },
}
</script>

<style scoped>
@import '../../assets/css/recipes/tambahRecipe.css';
</style>