<script setup>
import FilterItem from "@/components/common/FilterItem.vue";
import SearchFilters from "./SearchFilters.vue";
import Input from "@/components/common/InputField.vue";
import Btn from "@/components/common/Btn.vue";
import { watch, ref } from "vue";

const props = defineProps({
    project: {
        type: Object,
        required: true,
    },
    updateProject: {
        type: Function,
        required: true,
    }
});

const removeFilter = (payload) => {
    const id = payload["@id"];
    const tags = props.project.value.filters;
    const newTags = tags.filter((t) => t["@id"] !== id);
    props.project.value.filters = newTags;
};

const addFilter = (tagToAdd) => {
    if (props.project.value.filters.find((t) => t["@id"] === tagToAdd["@id"])) return;
    const tags = props.project.value.filters;
    props.project.value.filters = [...tags, tagToAdd];
};

const updateProjectWrapper = () => {
    console.log(props.project);
    let { name, description, filters } = props.project;
    filters = filters.map((f) => f["@id"]);
    const toSend = { name, description, filters}
    props.updateProject(props.project.id, toSend);
};

</script>

<template>
    <section class="offer_content">
        <h2>Informations concernant l'offre</h2>
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
        <Btn @click="updateProjectWrapper">Update</Btn>
    </section>
</template>

<style lang="scss" scoped>

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
</style>