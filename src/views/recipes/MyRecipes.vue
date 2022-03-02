<template>
<SearchBar @search="searchHandle" />
<section class="content">
        <div class="container">
            <h1 class="title">Daftar Resep Masakan Saya</h1>
            <AlertClose v-if="showAlert">
                {{ message }}
            </AlertClose>
            <h1 v-if="!recipes || recipes.length === 0" class="notFound">No Recipes Found.</h1>
            <div class="content-list" v-else>
                <div class="content-item">
                    <Card
                        v-for="recipe in pageOfItems"
                        :key="recipe.id" 
                        :recipeid="recipe.id" 
                        :category-name="recipe.categoryname" 
                        :recipe-name="recipe.recipename" 
                        :image-url="recipe.imageurl" 
                        :time="recipe.time"
                        :is-favorite="recipe.isFavorite"
                        :user-id="recipe.userId"
                        @message="getMessage"
                        @recipe-data="loadRecipesMethod" />
                </div>
            </div>
            <jw-paginate :items="recipes" @changePage="onChangePage" :disableDefaultStyles="true"></jw-paginate>
        </div>
    </section>
</template>

<script>
import Card from "../../components/ui/Card.vue";
import AlertClose from "../../components/ui/AlertClose.vue";
import SearchBar from "../../components/layouts/SearchBar.vue";
import JwPaginate from "../../components/layouts/JwPaginate.vue";
export default {
    components: { Card, AlertClose, SearchBar, JwPaginate },
    data() {
        return {
            recipes: [],
            error: '',
            message: '',
            showAlert: false,
            delete: false,
            pageOfItems: [],
            searchValue: '',
            recipename: false,
            categoryname: false,
            time: false,
            userid: localStorage.getItem('userId')

        }
    },
    methods: {
        getMessage(message) {
            this.showAlert = true;
            this.message = message;
            this.delete = true;
        },
        loadRecipesMethod(recipeId) {
            // this.loadRecipes;
            if(this.delete) {
                this.recipes = this.recipes.filter((recipe) => recipe.id !== recipeId);
            }
        },
        onChangePage(pageOfItems) {
            // update page of items
            this.pageOfItems = pageOfItems;
        },
        searchHandle(val) {
            this.searchValue = val.searchValue;
            this.recipename = val.recipename;
            this.categoryname = val.categoryname;
            this.time = val.time;
            this.$forceUpdate();
            this.loadRecipes;
            console.log(this.recipes);
        },
    },
    computed: {
        loadRecipes() {
            if(this.$store.getters.getToken !== '') {
                fetch(`http://127.0.0.1:8000/api/recipes/my-recipes?userid=${this.userid}&search=${this.searchValue}&recipename=${this.recipename}&categoryname=${this.categoryname}&time=${this.time}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": "Bearer " + this.$store.getters.getToken
                    },
                }).then((response) => {
                    if(response.ok) {
                        return response.json();
                    }else {
                        const error = new Error(response.message || 'Failed to fetch!');
                        throw error;
                    }
                }).then((data) => {
                    const recipes = [];
                        for(const key in data.data) {
                            const recipe = {
                                id: data.data[key].id,
                                categoryname: data.data[key].categoryname,
                                recipename: data.data[key].recipename,
                                imageurl: data.data[key].imageurl,
                                time: data.data[key].time,
                                isFavorite: data.data[key].isFavorite,
                                userId: data.data[key].userid
                            };
                            recipes.push(recipe);
                        }
                        this.recipes = recipes;
                        console.log(data);
                        return recipes;
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
        this.loadRecipes;
        this.getMessage;
        this.searchHandle;
        if(this.$route.params.message) {
            this.showAlert = true;
            this.message = this.$route.params.message;
        }
    },
}
</script>

<style scoped>
@import '../../assets/css/recipes/myRecipes.css';
</style>