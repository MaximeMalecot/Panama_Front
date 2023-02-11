<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import projectService from '@/services/project.service';
import Btn from '../../../components/common/Btn.vue';

const route = useRoute();
const id = route.params.id;

const project = ref({});
const propositions = computed(() => project.value.propositions ? project.value.propositions : []);

onMounted(async () => {
    const res = await projectService.getAdminProject(id);
    if(res){
        console.log(res);
        project.value = res;
    }
});


</script>

<template>
    <div class="container">
        <div class="header">
            <h3>Project {{ project.name }}</h3>
            <div>
                <p>{{ project.description }}</p>
                <p>status : {{ project.status }}</p>
                <p>minPrice : {{ project.minPrice }}</p>
                <p>maxPrice : {{ project.maxPrice }}</p>
                <p>project duration : {{ project.length }}</p>
                <p>createdAt : {{ project.createdAt }}</p>
                <p>updatedAt : {{ project.updatedAt }}</p>
                <Btn :type="'link'" :to="{ name: 'admin-project-edit', params: { id: id } }">Modifier</Btn>
            </div>
        </div>
        <div class="propositions" v-if="propositions">
            <h3>Propositions</h3>
            <div class="proposition" v-for="proposition in propositions" :key="proposition.id">
                <p>Proposition by : {{ proposition.freelancer.name }} {{ proposition.freelancer.surname }}</p>
                <p>{{ proposition.status }} on {{ proposition.updatedAt }}</p>
            </div>
        </div>
    </div>
</template>