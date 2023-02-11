<script setup>
import FilterItem from "@/components/common/FilterItem.vue";
import { onMounted, reactive, ref, watch } from "vue";
import FilterService from '@/services/filters.service.js';
import Input from '@/components/common/InputField.vue';

const props = defineProps({
    addFilter: {
        type: Function,
        required: true,
    },
});
const searchTagInput = ref("");
const tagsSuggestions = ref([]);

const searchFilters = async () => {
    if (searchTagInput.value === "") {
        tagsSuggestions.value = [];
        return;
    }
    const res = await FilterService.search(searchTagInput.value);
    if( res ){
        tagsSuggestions.value = res["hydra:member"];
    }
}

const addFilterWrapper = (tag) => {
    props.addFilter(tag);
    searchTagInput.value = "";
}

watch(searchTagInput, searchFilters);

</script>

<template>
    <div class="search_tags">
        <Input
            type="text"
            placeholder="Rechercher un tag"
            v-model="searchTagInput"
        />
        <div class="suggestions">
            <FilterItem
                v-for="(tag, index) in tagsSuggestions"
                :key="index"
                :data="tag"
                :id="index"
                :onClick="() => addFilterWrapper(tag)"
            />
        </div>
    </div>
</template>
