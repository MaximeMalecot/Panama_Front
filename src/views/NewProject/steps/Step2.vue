<script setup>
import { ref, watch, onMounted } from "vue";
import TagItem from '../FilterItem.vue';
import Btn from '@/components/common/Btn.vue';
import Input from '@/components/common/InputField.vue';
import FilterService from '@/services/filters.service.js';

const props = defineProps({
    formData: Object
});
const searchTagInput = ref("");
const tagsSuggestions = ref([]);

const removeFilter = ({ id }) => {
    const tags = props.formData.filters;
    const newTags = tags.filter(t => t.id !== id);
    props.formData.filters = newTags;
}

const addFilter = (tagToAdd) => {
    if (props.formData.filters.find(t => t.id === tagToAdd.id)) return;
    const tags = props.formData.filters;
    props.formData.filters = [...tags, tagToAdd];
    searchTagInput.value = "";
}

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

watch(searchTagInput, searchFilters);

</script>

<template>
    <div class="step_2">
        <div class="header">
            <h3>Filtres</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit obcaecati accusamus vero fugiat, animi
                facere
                odio, sequi dignissimos earum, dicta incidunt nostrum deserunt atque mollitia! Quia neque consequuntur
                accusantium rem?</p>
        </div>
        <div class="content">
            <div class="tags">
                <TagItem v-if="formData.filters.length > 0" v-for="(tag, index) in formData.filters" :key="index" :data="tag" :id="index"
                    :onClick="removeFilter" />
                <span v-else>Vous n'avez pas encore selectionné de filtre</span>
            </div>
            <div class="search_tags">
                <Input type="text" placeholder="Rechercher un tag" v-model="searchTagInput" />
                <div class="suggestions">
                    <TagItem v-for="(tag, index) in tagsSuggestions" :key="index" :data="tag" :id="index"
                        :onClick="addFilter" />
                </div>
            </div>
        </div>
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
.step_2 {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: fit-content;
    gap: 10px;

    .header {
        h3 {
            margin: 0;
            padding: 0;
        }
    }

    .content{
        display: flex;
        flex-direction: column;
        
        .tags {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 20px;
        }
    
        .search_tags {
            display: flex;
            flex-direction: column;
            gap: 5px;
            margin-top: 20px;
    
            .suggestions {
                display: flex;
                flex-direction: row;
                align-items: center;
                gap: 20px;
            }
        }
    }
    
}
</style>