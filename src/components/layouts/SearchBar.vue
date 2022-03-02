<template>
    <section class="searchbar">
        <div class="container">
            <div class="container-search">
                <router-link :to="{name: 'tambahRecipe'}" class="button-tambah"><font-awesome-icon icon="plus" /> Tambah Resep</router-link>
                <form @submit.prevent="searchHandle" class="form-inline">
                    <div class="input-group">
                        <span class="icon-search"><font-awesome-icon icon="magnifying-glass" /></span>
                        <input type="text" class="form-control" placeholder="Cari Resep..." v-model.trim="search">
                        <div class="input-group-append">
                            <button class="btn btn-search">Search</button>
                        </div>
                    </div>
                    
                    <div class="dropdown-filter">
                        <button type="button" class="btn filter" @click="dropdownHandle">Filter <span class="icon-filter"><font-awesome-icon icon="filter" /></span></button>
                        <div class="dropdown-content" v-if="showDropdown">
                            <div class="form-check">
                                <input type="checkbox" name="recipename" id="recipename" value="recipename" class="form-check-input" v-model="recipename" :true-value="true" :false-value="false">
                                <label class="form-check-label" for="recipename">Nama Resep</label>
                            </div>
                            <div class="form-check">
                                <input type="checkbox" name="categoryname" id="categoryname" value="categoryname" class="form-check-input" v-model="categoryname" :true-value="true" :false-value="false">
                                <label class="form-check-label" for="categoryname">Kategori</label>
                            </div>
                            <div class="form-check">
                                <input type="checkbox" name="time" id="time" value="time" class="form-check-input" v-model="time" :true-value="true" :false-value="false">
                                <label class="form-check-label" for="time">Waktu</label>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    emits: ['search'],
    data() {
        return {
            showDropdown: false,
            search: '',
            recipename: false,
            categoryname: false,
            time: false,
        }
    },
    methods: {
        dropdownHandle() {
            this.showDropdown = !this.showDropdown;
        },
        searchHandle() {
            // console.log(this.search);
            // console.log(this.recipename);
            // console.log(this.categoryname);
            // console.log(this.time);
            const searchData = {
                searchValue: this.search,
                recipename: this.recipename,
                categoryname: this.categoryname,
                time: this.time,
            }
            this.$emit('search', searchData);
            this.showDropdown = false;
            this.search = '';
            this.recipename = false;
            this.categoryname = false;
            this.time = false;
        }
    }
}
</script>

<style scoped>
@import '../../assets/css/layouts/searchBar.css';
</style>