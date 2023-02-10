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
    <main class="filters">
        <div v-for="filter in filters" :key="filter.id">
            <h1>{{ filter.name }}</h1>
            <p>{{ filter.type }}</p>
            <Btn :type="link" :to="{ name: 'admin-filter-edit', params: { id: filter.id } }">Modifier</Btn>
            <Btn :outline="true" type="button" @click="deleteFilter(filter.id)">Supprimer</Btn>
        </div>
    </main>
</template>