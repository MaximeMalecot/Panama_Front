<script setup>
// DOIT ALLER CHERCHER LES FILTRES ET METTER UN COMPOSANT FILTERS
import { ref, onMounted } from 'vue'
import FiltersService from '@/services/filters.service.js'
import Btn from '@/components/common/Btn.vue'

const filters = ref([])

onMounted(async () => {
    const res = await FiltersService.getFilters()
    if(res){
        filters.value = res['hydra:member']
    }
})
const deleteFilter = async (id) => {
    const res = await FiltersService.deleteFilter(id)
    if(res){
        filters.value = filters.value.filter(filter => filter.id !== id)
    }
}
</script>

<template>
    <div class="filters" v-for="filter in filters" :key="filter.id">
        <div class="filter__content">
            <h3>{{ filter.name }}</h3>
            <p>{{ filter.type }}</p>
        </div>
        <div class="filter__btn">
            <Btn :type="link" :to="{ name: 'admin-filter-edit', params: { id: filter.id } }">Modifier</Btn>
            <Btn :outline="true" type="button" @click="deleteFilter(filter.id)">Supprimer</Btn>
        </div>
    </div>
</template>

<style scoped>
.filters {
    margin: auto;
    width: 50%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
}
.filter__btn {
    margin-left: auto;
    display: flex;
    flex-direction: row;
    gap: 1rem;
}
</style>