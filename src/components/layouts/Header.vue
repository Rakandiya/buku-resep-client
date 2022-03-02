<template>
    <header class="topbar">
        <div class="container">
            <div class="container-topbar">
                <img src="../../assets/img/logo1.png" alt="Logo" class="logo">
                <p class="title">Buku Resep 79</p>
                <nav class="navbar">
                    <ul class="menu">
                        <li><router-link :to="{name: 'recipesList'}" :class="{active: checkNavRecipesList}">Daftar Resep Masakan</router-link></li>
                        <li><router-link :to="{name: 'myRecipes'}" :class="{active: checkNavMyRecipes}">Resep Saya</router-link></li>
                        <li><router-link :to="{name: 'favoriteRecipes'}" :class="{active: checkNavFavoriteRecipes}">Resep Favorit</router-link></li>
                    </ul>
                </nav>
                <div class="dropdown" @click="showDropdown">
                    <img src="../../assets/img/icon-profile1.png" alt="Icon Profile" class="icon-profile">
                    <div class="dropdown-content" v-if="dropdown">
                        <button class="btn" @click="logout"><font-awesome-icon icon="right-from-bracket" /> Logout</button>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    data() {
        return {
            dropdown: false
        }
    },
    computed: {
        checkNavRecipesList() {
            if(this.$route.name == 'recipesList' || this.$route.name == 'detailRecipe') {
                return true;
            }
        },
        checkNavMyRecipes() {
            if(this.$route.name == 'myRecipes' || this.$route.name == 'tambahRecipe' || this.$route.name == "editRecipe") {
                return true;
            }
        },
        checkNavFavoriteRecipes() {
            if(this.$route.name == 'favoriteRecipes') {
                return true;
            }
        }
    },
    methods: {
        showDropdown() {
            this.dropdown = !this.dropdown;
        },
        logout() {
            fetch("http://127.0.0.1:8000/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + this.$store.getters.getToken
                },
            });
            localStorage.removeItem('userId');
            this.$store.dispatch('removeToken');
            this.$store.dispatch('removeUser');
            this.$router.push({name: 'login', replace: true});
        }
    }
}
</script>

<style scoped>
@import '../../assets/css/layouts/header.css';
.active {
  text-decoration: none;
  color: #01bfbf;
}
</style>