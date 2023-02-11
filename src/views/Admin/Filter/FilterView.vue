<script setup>
// DOIT ALLER CHERCHER LES FILTRES ET METTER UN COMPOSANT FILTERS
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import FiltersService from '@/services/filters.service.js'
import Btn from '@/components/common/Btn.vue'
import Input from '@/components/common/InputField.vue'

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const filter = ref({})
const loading = ref(true);

onMounted(async () => {
    const res = await FiltersService.getFilter(id)
    if(res){
        filter.value = res
    }
    loading.value = false
})

const updateFilter = async (id, payload) => {
    loading.value = true
    const res = await FiltersService.updateFilter(id, payload)
    if(res){
        filter.value = res
    }
    loading.value = false
}

const updateFilterWrapper = () => {
    let { name, type } = filter.value;
    updateFilter(filter.value.id, { name, type });
}

const deleteFilter = async () => {
    const res = await FiltersService.deleteFilter(filter.value.id);
    if(res){
        router.push({ name: 'admin-filters' });
    }
}
</script>

<template>
    <template v-if="loading">Loading...</template>
    <div v-else class="container">
        <label>Name : </label>
        <Input type="text" v-model="filter.name" />
        <label>Type : </label>
        <Input type="text" v-model="filter.type" />
        <div class="actions">
            <Btn type="button" @click="updateFilterWrapper">Modify</Btn>
            <Btn type="button" @click="deleteFilter">Delete</Btn>
        </div>
    </div>
</template>

<style scoped>
.container {
    margin: auto;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
}
.actions{
    display: flex;
    flex-direction: row;
    gap: 1rem;
}
</style>