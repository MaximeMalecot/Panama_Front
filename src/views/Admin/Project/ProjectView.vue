<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import projectService from '@/services/project.service';
import Btn from '../../../components/common/Btn.vue';
import Input from "@/components/common/InputField.vue";
import { PROJECT_STATUS } from "@/constants/status.js";
import SearchFilters from '@/views/Dashboard/client-offer/SearchFilters.vue';
import FilterItem from '@/components/common/FilterItem.vue';

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const project = ref({});
const loading = ref(true);
const propositions = computed(() => project.value.propositions ? project.value.propositions : []);

onMounted(async () => {
    const res = await projectService.getAdminProject(id);
    if(res){
        project.value = res;
        loading.value = false;
    }
});

const removeFilter = (payload) => {
    const id = payload["@id"];
    const tags = project.value.filters;
    const newTags = tags.filter((t) => t["@id"] !== id);
    project.value.filters = newTags;
};

const addFilter = (tagToAdd) => {
    if (project.filters && project.filters.length > 0 && project.filters.find((t) => t["@id"] === tagToAdd["@id"])) return;
    const tags = project.value.filters.length > 0 ? project.value.filters : [];
    project.value.filters = [...tags, tagToAdd];
};

const updateProject = async (id, data) => {
    loading.value = true;
    const res = await projectService.updateProject(id, data);
    if(res){
        project.value = res;
    }
    loading.value = false;
}

const updateProjectWrapper = () => {
    let { name, description, filters } = project.value;
    filters = filters.map((f) => f["@id"]);
    const toSend = { name, description, filters}
    updateProject(project.value.id, toSend);
};

const deleteProject = async (id) => {
    const res = await projectService.deleteProject(id);
    if(res){
        router.push({ name: 'admin-projects' });
    }
}

</script>

<template>
    <div class="container">
        <section v-if="loading || !project.id">Loading...</section>
        <template v-else>
            <div class="subContainer">
                <template v-if="project.status === PROJECT_STATUS.ACTIVE">
                    <!-- patch : name, description, filters -->
                    <h3>Project {{ project.id }}</h3> 
                    <Input type="text" v-model="project.name"/>
                    <div>
                        <textarea v-model="project.description">{{ project.description }}</textarea>
                        <p>status : {{ project.status }}</p>
                        <p>minPrice : {{ project.minPrice }}</p>
                        <p>maxPrice : {{ project.maxPrice }}</p>
                        <p>project duration : {{ project.length }}</p>
                        <p>createdAt : {{ project.createdAt }}</p>
                        <p>updatedAt : {{ project.updatedAt }}</p>
                    </div>
                    <div v-if="project.filters && (project?.filters).length > 0" class="filters_items">
                        <FilterItem
                            v-for="(tag, index) in project.filters"
                            :key="index"
                            :data="tag"
                            :id="index"
                            :onClick="removeFilter"
                        />
                    </div>
                    <SearchFilters :addFilter="addFilter" />
                    <Btn @click="updateProjectWrapper">Update</Btn>
                </template>
                <template v-else>
                    <h3>Project {{ project.name }}</h3> 
                    <div>
                        <p>{{ project.description }}</p>
                        <p>status : {{ project.status }}</p>
                        <p>minPrice : {{ project.minPrice }}</p>
                        <p>maxPrice : {{ project.maxPrice }}</p>
                        <p>project duration : {{ project.length }}</p>
                        <p>createdAt : {{ project.createdAt }}</p>
                        <p>updatedAt : {{ project.updatedAt }}</p>
                    </div>
                    <div v-if="project.filters && (project?.filters).length > 0" class="filters_items">
                        <FilterItem
                            v-for="(tag, index) in project.filters"
                            :key="index"
                            :data="tag"
                            :id="index"
                        />
                    </div>
                    <Btn v-if="project.status === PROJECT_STATUS.ACTIVE || project.status === PROJECT_STATUS.CREATED" :outline="true" type="button" @click="deleteProject(project.id)">Supprimer</Btn>
                </template>
            </div>
            <hr style="width: 100%;"/>
            <div class="subContainer" v-if="propositions">
                <h3>Propositions</h3>
                <div class="proposition" v-for="proposition in propositions" :key="proposition.id">
                    <p>Proposition by : {{ proposition.freelancer.name }} {{ proposition.freelancer.surname }}</p>
                    <p>{{ proposition.status }} on {{ proposition.updatedAt }}</p>
                </div>
            </div>
        </template>
    </div>
</template>
<style scoped>
.container {
    margin: auto;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    justify-content: space-between;
    gap: 1rem;
}
.subContainer{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

</style>