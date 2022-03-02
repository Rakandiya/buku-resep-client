<template>
    <div class="card">
        <img :src="imageUrl" class="card-img-top" alt="...">
        <span v-if="showBtnMenuDelete" class="btn-delete" @click="clickBtnDelete">
            <font-awesome-icon icon="ellipsis" />
        </span>
        <div v-if="showBtnMenuDelete && showBtnDelete" class="dropdown-content">
            <button id="show-modal" @click="showModal"><font-awesome-icon icon="trash" />&nbsp;Hapus</button>
        </div>
        <div class="card-body">
            <h6 class="card-subtitle mb-2 text-muted">{{ categoryName }}</h6>
            <h6 class="card-title">{{ recipeName }}</h6>
            <p class="card-text">
                <font-awesome-icon :icon="['far', 'clock']" /><span class="waktu">&nbsp;{{ time }} menit</span>
                <button @click="handleFavorite" class="favorit"><font-awesome-icon :icon="iconFavorite" />Favorite</button>
            </p>
            <router-link :to="detailLink" class="card-link">Lihat Detail Resep</router-link>
            </div>
    </div>
</template>

<script>
export default {
    props: ['recipeid', 'imageUrl', 'recipeName', 'categoryName', 'time', 'isFavorite', 'userId'],
    emits: ['message', 'loadRecipes'],
    data() {
        return {
            showBtnMenuDelete: false,
            showBtnDelete: false,
            showModalDelete: false,
            isFavoriteValue: this.isFavorite,
            // userLogin: this.$store.getters.getUser.id,
            userLogin: localStorage.getItem('userId'),
            iconFavorite: this.isFavorite == 1 ? ['fas', 'star'] : ['far', 'star']
        }
    },
    computed: {
        detailLink() {
            if(this.$route.name == 'recipesList' || (this.$route.name == 'favoriteRecipes' &&  this.userId != this.userLogin )) {
                return '/recipe/' + this.recipeid;
            }else if(this.$route.name == 'myRecipes' || (this.$route.name == 'favoriteRecipes' &&  this.userId == this.userLogin )) {
                this.showBtnMenuDelete = true;
                return '/edit-recipe/' + this.recipeid;
            }
        }
    },
    methods: {
        clickBtnDelete() {
            this.showBtnDelete = !this.showBtnDelete;
        },
        showModal() {
            this.$swal({
                // title: 'Apakah Anda Yakin?',
                text: "Apakah anda yakin akan menghapus resep " + this.recipeName,
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
                    fetch("http://127.0.0.1:8000/api/recipes/delete/" + this.recipeid, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": "Bearer " + this.$store.getters.getToken
                    },
                    body: JSON.stringify({
                        _method: "DELETE"
                        })
                    });
                    this.$emit('message', "Resep berhasil dihapus.");
                    this.$emit('recipe-data', this.recipeid);
                }
            });
        },
        handleFavorite() {
            if(this.$store.getters.getToken !== '') {
                if(this.isFavoriteValue == 1) {
                    this.$swal({
                        // title: 'Apakah Anda Yakin?',
                        text: "Apakah anda yakin akan menghapus resep " + this.recipeName + " dari daftar Favorit resep anda?",
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
            }else{
                this.$router.push({name: 'login'});
            }
            // this.iconFavorite = this.isFavorite == 1 ? ['fas', 'star'] : ['far', 'star'];
            
        },
        async sendRecipeFavorite() {
            const response = await fetch("http://127.0.0.1:8000/api/favorites/add-to-favorites", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + this.$store.getters.getToken
                },
                body: JSON.stringify({
                    _method: "PUT",
                    recipeid: this.recipeid,
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
        }

    },
}
</script>

<style scoped>
@import '../../assets/css/ui/card.css';

.btn-delete {
    margin-top: -175px;
    margin-bottom: 145px;
    color: white;
    font-size: 25px;
    margin-left: 190px;
    cursor: pointer;
}

.dropdown-content {
  position: absolute;
  background-color: #fff;
  min-width: 80px;
  z-index: 1;
  box-shadow: 1px 2px 2px #e4ecec;
  border: 1px solid white;
  border-radius: 0.2rem;
  margin-left: 130px;
  margin-top: 25px;
}

.dropdown-content button {
    color: red;
    padding: 5px 7px;
    text-decoration: none;
    display: block;
    font-size: 14px;
    text-align: center;
    background-color: white;
    width: 100%;
    border: 0px;
    cursor: pointer;
}

button.swal2-cancel {
    background-color: white !important;
    color: #01bfbf !important;
    border: 1px solid #01bfbf !important;
}

.swal2-confirm {
    background-color: #01bfbf !important;
    color: white !important;
}
</style>