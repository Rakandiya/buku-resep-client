<template>
    <section class="content">
        <div class="container-content">
            <div class="row">
                <div class="col-1">
                    <router-link class="back" :to="{name: 'recipesList'}"><font-awesome-icon icon="angle-left" /></router-link>
                </div>
                <div class="col-11">
                    <h1 class="title">Resep Masakan {{ selectedRecipe.recipename }}</h1>
                </div>
            </div>
            <img class="image" :src="selectedRecipe.imageurl">
            <table class="table">
                <tr class="theader">
                    <td>Kategori</td>
                    <td>Waktu Masak</td>
                    <td>Kesulitan</td>
                    <td rowspan="2" class="favorit">
                        <button @click="handleFavorite" class="btn"><font-awesome-icon :icon="iconFavorite" />Favorite</button>
                    </td>
                </tr>
                <tr class="tbody">
                    <td>{{ selectedRecipe.categoryname }}</td>
                    <td>{{ selectedRecipe.time }} Menit</td>
                    <td>{{ selectedRecipe.name }}</td>
                </tr>
            </table>
            <div class="subtitle">Bahan-Bahan</div>
            <hr>
            <div class="bahan-bahan">
                <ul>
                    <li v-for="ingredient in ingredients" :key="ingredient">{{ ingredient }}</li>
                </ul>
            </div>
            <div class="subtitle">Cara Masak</div>
            <hr>
            <div class="cara-masak">
                <ol>
                    <li v-for="howto in howtocookMethod" :key="howto">{{ howto }}</li>
                </ol>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    props: ['id'],
    emits: ['loadRecipes', 'removeFavorite'],
    data() {
        return {
            selectedRecipe: [],
            error: null,
            isFavoriteValue: this.isFavorite,
            iconFavorite: this.isFavorite == 1 ? ['fas', 'star'] : ['far', 'star'],
            ingredients: [],
            howtocook: [],
        }
    },
    computed: {
        loadRecipe() {
            if(this.$store.getters.getToken !== '') {
                fetch("http://127.0.0.1:8000/api/recipes/" + this.id, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + this.$store.getters.getToken
                },
                }).then((response) => {
                    if(response.ok) {
                        return response.json();
                    }else{
                        const error = new Error(response.message || 'Failed to fetch!');
                        throw error;
                    }
                }).then((data) => {
                    this.selectedRecipe = data.data[0];
                    this.ingredients = this.selectedRecipe.ingredients.split("\n");
                    this.howtocook = this.selectedRecipe.howtocook.split("\n");
                    console.log(this.selectedRecipe);
                }).catch(error => {
                    this.error = error.message;
                    if (error.response.status === 401) {
                        this.$router.push({name: 'unauthorized'});
                    }
                    if (error.response.status === 404) {
                        this.$router.push({name: 'notFound'});
                    }
                });
            }else{
                this.$router.push({name: 'unauthorized'});
            }
        },
        howtocookMethod() {
            const howtocook = [];
            for(const key in this.howtocook) {
                howtocook.push(this.howtocook[key].replace(/[0-9]./g, ''))
            }
            return howtocook;
        }
    },
    methods: {
        handleFavorite() {
            if(this.isFavoriteValue == 1) {
                this.$swal({
                    // title: 'Apakah Anda Yakin?',
                    text: "Apakah anda yakin akan menghapus resep " + this.selectedRecipe.recipename + " dari daftar Favorit resep anda?",
                    icon: 'warning',
                    showCancelButton: true,
                    // cancelButtonColor: 'white',
                    confirmButtonColor: 'danger',
                    confirmButtonText: 'Ya',
                    cancelButtonText: 'Tidak',
                    reverseButtons: true,
                    showCloseButton: true,
                    // setelah membuat swal kita ambil hasil nya yaitu dengan then dengan parameter result
                    }).then((result) => {
                    if (result.value) {
                        this.isFavoriteValue = 0;
                        this.sendRecipeFavorite();
                        this.iconFavorite = ['far', 'star'];
                        this.$emit('loadRecipes');
                        this.$emit('removeFavorite');
                    }
                });
            }else{
                this.isFavoriteValue = 1;
                this.sendRecipeFavorite();
                this.iconFavorite = ['fas', 'star'];
            }
            // this.iconFavorite = this.isFavorite == 1 ? ['fas', 'star'] : ['far', 'star'];
            
        },
        async sendRecipeFavorite() {
            if(this.$store.getters.getToken !== '') {
                const response = await fetch("http://127.0.0.1:8000/api/favorites/add-to-favorites", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": "Bearer " + this.$store.getters.getToken
                    },
                    body: JSON.stringify({
                        _method: "PUT",
                        recipeid: this.selectedRecipe.id,
                        isFavorite: this.isFavoriteValue
                        })
                    }
                );

                const responseData = await response.json();
                if (response.status === 401) {
                        this.$router.push({name: 'unauthorized'});
                    }
                if (response.status === 404) {
                    this.$router.push({name: 'notFound'});
                }
            // this.isFavoriteValue = this.isFavorite;
            }else{
                this.$router.push({name: 'login'});
            }
        }
    },
    mounted() {
        this.loadRecipe;
    }
}
</script>

<style scoped>
@import '../../assets/css/recipes/detailRecipe.css';
</style>