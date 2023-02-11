<script setup>
import { ref, onMounted } from 'vue'
import Btn from '@/components/common/Btn.vue';
import projectService from '@/services/project.service';
import {PROJECT_STATUS} from '@/constants/status.js';

const projects = ref([]);
const loading = ref(true);

onMounted(async () => {
    const res = await projectService.getAdminProjects();
    if(res){
        projects.value = res['hydra:member'];
    }
    loading.value = false;
});

const deleteProject = async (id) => {
    loading.value = true;
    const res = await projectService.deleteProject(id);
    if(res){
        projects.value = projects.value.filter(project => project.id !== id);
    }
    loading.value = false;
}

</script>

<template>
    <section v-if="loading" class="container">Loading...</section>
    <div v-else class="container" v-for="project in projects" :key="project.id">
        <div class="content">
            <h3>{{ project.name }}</h3>
            <p>{{ project.minPrice }}</p>
            <p>{{ project.maxPrice }}</p>
            <p>{{ project.status }}</p>
            <p>{{ project.length }}</p>
        </div>
        <div class="actions">
            <Btn :type="'link'" :to="{ name: 'admin-project', params: { id: project.id } }">See or edit</Btn>
            <Btn v-if="project.status === PROJECT_STATUS.ACTIVE || project.status === PROJECT_STATUS.CREATED" :outline="true" type="button" @click="deleteProject(project.id)">Supprimer</Btn>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
}
.content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1rem;
}
.actions {
    margin-left: auto;
    display: flex;
    flex-direction: row;
    gap: 1rem;
}
</style>