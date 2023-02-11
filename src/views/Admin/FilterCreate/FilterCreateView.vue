<script setup>
// DOIT ALLER CHERCHER LES FILTRES ET METTER UN COMPOSANT FILTERS
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import FiltersService from '@/services/filters.service.js'
import Btn from '@/components/common/Btn.vue'
import Input from '@/components/common/InputField.vue'

const router = useRouter();
const filter = ref({
    name: '',
    type: ''
})

const createFilter = async () => {
    const res = await FiltersService.createFilter(filter.value)
    if(res){
        router.push({ name: 'admin-filters' });
    }
}
</script>

<template>
    <div class="container">
        <label>Name : </label>
        <Input type="text" v-model="filter.name" />
        <label>Type : </label>
        <Input type="text" v-model="filter.type" />
        <Btn type="button" @click="createFilter">Create</Btn>
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
</style>