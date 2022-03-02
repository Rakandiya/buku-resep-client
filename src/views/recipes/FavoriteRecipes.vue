<template>
<SearchBar @search="searchHandle" />
<section class="content">
        <div class="container">
            <h1 class="title">Daftar Resep Masakan Favorit</h1>
            <h1 v-if="!recipes || recipes.length === 0" class="notFound">No Recipes Found.</h1>
            <div class="content-list" v-else>
                <div class="content-item">
                    <Card
                        v-for="recipe in pageOfItems"
                        :key="recipe.id" 
                        :recipeid="recipe.recipeid" 
                        :category-name="recipe.categoryname" 
                        :recipe-name="recipe.recipename" 
                        :image-url="recipe.imageurl" 
                        :time="recipe.time"
                        :is-favorite="recipe.isFavorite"
                        :user-id="recipe.userId"
                        @load-recipes="loadRecipesMethod"
                        @remove-favorite="setRemove" />
                </div>
            </div>
            <jw-paginate :items="recipes" @changePage="onChangePage" :disableDefaultStyles="true"></jw-paginate>
        </div>
    </section>
</template>

<script>
import Card from "../../components/ui/Card.vue";
import SearchBar from "../../components/layouts/SearchBar.vue";
import JwPaginate from "../../components/layouts/JwPaginate.vue";
export default {
    components: { Card, SearchBar, JwPaginate },
    methods: {
        loadRecipesMethod() {
            if(this.$store.getters.getToken !== '') {
                fetch("http://127.0.0.1:8000/api/favorites", {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": "Bearer " + this.$store.getters.getToken
                    },
                })
                .then((response) => {
                    if(response.ok) {
                        return response.json();
                    }else {
                        const error = new Error(response.message || 'Failed to fetch!');
                        throw error;
                    }
                })
                .then((data) => {
                    const recipes = [];
                        for(const key in data.data) {
                            const recipe = {
                                id: data.data[key].id,
                                recipeid: data.data[key].recipeid,
                                categoryname: data.data[key].categoryname,
                                recipename: data.data[key].recipename,
                                imageurl: data.data[key].imageurl,
                                time: data.data[key].time,
                                isFavorite: data.data[key].isFavorite,
                                userId: data.data[key].userid
                            };
                            recipes.push(recipe);
                        }
                        this.$store.dispatch('setFavoriteRecipes', {favoriteRecipes: recipes});
                        this.recipes = recipes;
                        console.log(recipes);
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
            // this.recipes = this.recipes.filter((recipe) => recipe.recipeid !== recipeId);
        },
        setRemove() {
            this.remove = true;
        },
        onChangePage(pageOfItems) {
            console.log(pageOfItems);
            // update page of items
            this.pageOfItems = pageOfItems;
        },
        searchHandle(val) {
            this.searchValue = val.searchValue;
            this.recipename = val.recipename;
            this.categoryname = val.categoryname;
            this.time = val.time;
            // this.$forceUpdate();
            this.loadRecipes;
        },
    },
    computed: {
        loadRecipes() {
            if(this.$store.getters.getToken !== '') {
                fetch(`http://127.0.0.1:8000/api/favorites?search=${this.searchValue}&recipename=${this.recipename}&categoryname=${this.categoryname}&time=${this.time}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": "Bearer " + this.$store.getters.getToken
                    },
                })
                .then((response) => {
                    if(response.ok) {
                        return response.json();
                    }else {
                        const error = new Error(response.message || 'Failed to fetch!');
                        throw error;
                    }
                })
                .then((data) => {
                    const recipes = [];
                        for(const key in data.data) {
                            const recipe = {
                                id: data.data[key].id,
                                recipeid: data.data[key].recipeid,
                                categoryname: data.data[key].categoryname,
                                recipename: data.data[key].recipename,
                                imageurl: data.data[key].imageurl,
                                time: data.data[key].time,
                                isFavorite: data.data[key].isFavorite,
                                userId: data.data[key].userid
                            };
                            recipes.push(recipe);
                        }
                        this.$store.dispatch('setFavoriteRecipes', {favoriteRecipes: recipes});
                        this.recipes = recipes;
                        console.log(recipes);
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
    },
    mounted() {
        this.setRemove;
        this.loadRecipesMethod;
        this.loadRecipes;
    },
    data() {
        return {
            recipes: [],
            error: '',
            remove: false,
            pageOfItems: [],
            searchValue: '',
            recipename: false,
            categoryname: false,
            time: false,
        }
    },
}
</script>

<style scoped>
@import '../../assets/css/recipes/favoriteRecipes.css';
</style>