<script setup>
// DOIT ALLER CHERCHER LES FILTRES ET METTER UN COMPOSANT FILTERS
import { ref, onMounted } from 'vue'
import FiltersService from '@/services/filters.service.js'
import Btn from '@/components/common/Btn.vue'

const filters = ref([])
const loading = ref(true)

onMounted(async () => {
    const res = await FiltersService.getFilters()
    if(res){
        filters.value = res['hydra:member']
    }
    loading.value = false
})
const deleteFilter = async (id) => {
    loading.value = true
    const res = await FiltersService.deleteFilter(id)
    if(res){
        filters.value = filters.value.filter(filter => filter.id !== id)
    }
    loading.value = false
}
</script>

<template>
    <section v-if="loading" class="container">Loading...</section>
    <div v-else class="container" v-for="filter in filters" :key="filter.id">
        <div class="content">
            <h3>{{ filter.name }}</h3>
            <p>{{ filter.type }}</p>
        </div>
        <div class="actions">
            <Btn :type="'link'" :to="{ name: 'admin-filter', params: { id: filter.id } }">See or edit</Btn>
            <Btn :outline="true" type="button" @click="deleteFilter(filter.id)">Supprimer</Btn>
        </div>
    </div>
</template>

<style scoped>
.container {
    margin: auto;
    width: 50%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
}
.actions {
    margin-left: auto;
    display: flex;
    flex-direction: row;
    gap: 1rem;
}
</style>