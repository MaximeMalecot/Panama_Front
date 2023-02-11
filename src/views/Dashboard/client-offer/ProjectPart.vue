<script setup>
import FilterItem from "@/components/common/FilterItem.vue";
import SearchFilters from "./SearchFilters.vue";
import Input from "@/components/common/InputField.vue";
import Btn from "@/components/common/Btn.vue";
import { watch, ref } from "vue";
import { PROJECT_STATUS } from "@/constants/status.js";

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
    const tags = props.project.filters;
    const newTags = tags.filter((t) => t["@id"] !== id);
    props.project.filters = newTags;
};

const addFilter = (tagToAdd) => {
    if (props.project.filters.find((t) => t["@id"] === tagToAdd["@id"])) return;
    const tags = props.project.filters;
    props.project.filters = [...tags, tagToAdd];
};

const updateProjectWrapper = () => {
    let { name, description, filters } = props.project;
    filters = filters.map((f) => f["@id"]);
    const toSend = { name, description, filters}
    props.updateProject(props.project.id, toSend);
};

</script>

<template>
    <section class="offer_content">
        <h2>Informations concernant l'offre</h2>
        <div v-if="project.status === PROJECT_STATUS.ACTIVE" class="offer_edit_form">
            <Input
                type="text"
                placeholder="Titre du projet"
                v-model="project.name"
            />
            <textarea v-model="project.description">{{ project.description }}</textarea>
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
        </div>
        <div v-else>
            <p>{{ project.name }}</p>
            <p>{{ project.description }}</p>
            <div class="filters">
                <div v-if="(project?.filters).length > 0" class="filters_items">
                    <FilterItem
                        v-for="(tag, index) in project.filters"
                        :key="index"
                        :data="tag"
                        :id="index"
                        @click="null"
                    />
                </div>
                <p v-else>No filter</p>
            </div>
        </div>
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

        .offer_edit_form{
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
    }
</style>