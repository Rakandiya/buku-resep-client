import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            token: localStorage.getItem('token') || '',
            user: null,
            favoriteRecipes: [] 
        }
    },
    mutations: {
        setToken(state, payload) {
            localStorage.setItem('token', payload.token);
            state.token = payload.token;
        },
        setUser(state, payload) {
            // localStorage.setItem('userId', payload.user.id);
            state.user = payload.user;
        },
        removeToken(state) {
            localStorage.removeItem('token');
            state.token = '';
        },
        removeUser(state) {
            // localStorage.removeItem('userId');
            state.user = null;
        },
        setFavoriteRecipes(state, payload) {
            state.favoriteRecipes = payload.favoriteRecipes;
        }
    },
    actions: {
        setToken(context, payload) {
            context.commit('setToken', payload);
        },
        setUser(context, payload) {
            context.commit('setUser', payload);
        },
        removeToken(context) {
            context.commit('removeToken');
        },
        removeUser(context) {
            context.commit('removeUser');
        },
        setFavoriteRecipes(context, payload) {
            context.commit('setFavoriteRecipes', payload);
        }
    },
    getters: {
        getToken(state) {
            return state.token;
        },
        getUser(state) {
            return state.user;
        },
        getFavoriteRecipes(state) {
            return state.favoriteRecipes;
        }
    },
});

export default store;