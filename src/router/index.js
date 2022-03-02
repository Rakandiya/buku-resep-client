import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/auth/Login.vue'; 
import Register from '../views/auth/Register.vue';
import NotFoundVue from '../views/NotFound.vue';
import EditRecipe from '../views/recipes/EditRecipe.vue';
import FavoriteRecipes from '../views/recipes/FavoriteRecipes.vue';
import MyRecipes from '../views/recipes/MyRecipes.vue';
import RecipesList from '../views/recipes/RecipesList.vue';
import TambahRecipe from '../views/recipes/tambahRecipe.vue';
import DetailRecipe from '../views/recipes/DetailRecipe.vue';
import UnauthorizedVue from '../views/Unauthorized.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/recipes-list',
      name: 'recipesList',
      component: RecipesList
    },
    {
      path: '/recipe/:id',
      name: 'detailRecipe',
      component: DetailRecipe,
      props: true
    },
    {
      path: '/my-recipes',
      name: 'myRecipes',
      component: MyRecipes
    },
    {
      path: '/favorite-recipes',
      name: 'favoriteRecipes',
      component: FavoriteRecipes
    },
    {
      path: '/tambah-recipe',
      name: 'tambahRecipe',
      component: TambahRecipe
    },
    {
      path: '/edit-recipe/:id',
      name: 'editRecipe',
      component: EditRecipe,
      props: true
    },
    {path: '/unauthorized', name: 'unauthorized', component: UnauthorizedVue},
    {path: '/:notFound(.*)', name: 'notFound', component: NotFoundVue},
  ]
})

export default router
