<script setup>
import { ref, onMounted } from 'vue'
import projectService from '../../../services/project.service';

const projects = ref([]);

onMounted(async () => {
    const res = await projectService.getAdminProjects();
    if(res){
        projects.value = res['hydra:member'];
    }
    console.log(projects.value)
});

</script>

<template>
    <div class="container" v-for="project in projects" :key="project.id">
        <div class="content">
            <h3>{{ project.name }}</h3>
            <p>{{ project.minPrice }}</p>
            <p>{{ project.maxPrice }}</p>
            <p>{{ project.status }}</p>
            <p>{{ project.length }}</p>
        </div>
        <div class="actions">
            <RouterLink :to="{ name: 'admin-project', params: { id: project.id } }">See specific</RouterLink>
            <RouterLink :to="{ name: 'admin-project-edit', params: { id: project.id } }">Edit</RouterLink>
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
.content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1rem;
}
</style>