<script setup>
import { ref, onMounted } from 'vue'
import Btn from '@/components/common/Btn.vue';
import projectService from '@/services/project.service';

const projects = ref([]);

onMounted(async () => {
    const res = await projectService.getAdminProjects();
    if(res){
        projects.value = res['hydra:member'];
    }
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
            <Btn :type="'link'" :to="{ name: 'admin-project', params: { id: project.id } }">See specific</Btn>
            <Btn :type="'link'" :to="{ name: 'admin-project-edit', params: { id: project.id } }">Edit</Btn>
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
.actions {
    margin-left: auto;
    display: flex;
    flex-direction: row;
    gap: 1rem;
}
</style>