<script setup>
import useClientProjects from "../../../hooks/use-client-projects";
import { onMounted, reactive, watch } from "vue";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";
import FilterItem from "@/components/common/FilterItem.vue";
import SearchFilters from "./SearchFilters.vue";
import Input from '@/components/common/InputField.vue';
import Btn from "../../../components/common/Btn.vue";

const router = useRouter();
const route = useRoute();
const ProjectStore = useClientProjects();
const { project, loading } = storeToRefs(ProjectStore);

onMounted(async () => {
    if (!route.params.id) {
        router.push({ name: "dashboard-offers" });
    }
    const res = await ProjectStore.fetchProject(route.params.id);
    if (!res) {
        router.push({ name: "dashboard-offers" });
    }
});

// watch(() => {
//     Object.assign(localProject, project)
// });

const removeFilter = (payload) => {
    const id = payload["@id"];
    const tags = project.value.filters;
    const newTags = tags.filter((t) => t["@id"] !== id);
    console.log(newTags);
    project.value.filters = newTags;
};

const addFilter = (tagToAdd) => {
    if (project.value.filters.find((t) => t["@id"] === tagToAdd["@id"])) return;
    const tags = project.value.filters;
    project.value.filters = [...tags, tagToAdd];
};
</script>

<template>
    <div class="client_offer">
        <section class="offer__header">
            <RouterLink
                :to="{ name: 'dashboard-offers' }"
                class="offer__header__link"
                >⬅️ revenir aux projets
            </RouterLink>
        </section>
        <section v-if="loading || !project.id">Loading...</section>
        <section v-else class="offer_content">
            <Input
                type="text"
                placeholder="Titre du projet"
                v-model="project.name"
            />
            <textarea>{{ project.description }}</textarea>
            <div class="filters">
                <div v-if="(project?.filters).length > 0" class="filters_items">
                    <FilterItem
                        v-for="(tag, index) in project.filters"
                        :key="index"
                        :data="tag"
                        :id="index"
                        :onClick="removeFilter"
                    />
                </div>
                <p v-else>No filter</p>
                <SearchFilters :addFilter="addFilter" />
            </div>
            <Btn @click="ProjectStore.updateProject(project)">Update</Btn>
        </section>
    </div>
</template>

<style lang="scss" scoped>
.client_offer {
    display: flex;
    flex-direction: column;

    .offer_content {
        display: flex;
        flex-direction: column;
        padding-bottom: 1rem;
        margin-bottom: 1rem;
        border-bottom: 1px solid #a9a9a9;
        gap: 10px;
        
        .filters {
            display: flex;
            flex-direction: column;

            .filters_items {
                display: flex;
                flex-wrap: wrap;
                gap: 1rem;
                .filter_item {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem;
                    border: 1px solid #000;
                    border-radius: 5px;
                }
            }
        }
    }
}
</style>
