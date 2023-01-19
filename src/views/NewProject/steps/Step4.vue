<script setup>
import TagItem from '../FilterItem.vue';

const props = defineProps({
    formData: Object
});
</script>

<template>
    <div class="step_4">
        <div class="header">
            <h3>Résumé du projet</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit obcaecati accusamus vero fugiat, animi
                facere
                odio, sequi dignissimos earum, dicta incidunt nostrum deserunt atque mollitia! Quia neque consequuntur
                accusantium rem?</p>
        </div>
        <div class="content">
            <div class="summary">
                <h3>{{ formData.title || "Pas de titre" }}</h3>
                <p>{{ formData.description || "Pas de description" }}</p>
                <div class="filters" v-if="formData.filters.length > 0">
                    <TagItem v-for="(tag, index) in formData.filters" :key="index" :data="tag" :id="index"
                        :onClick="() => null" />
                </div>
                <div v-else><p style="font-style: italic">Aucun filtre séléctionné</p></div>
                <div v-if="formData.price_range.minPrice > 0">
                    <p>Budget compris entre: <b>{{ formData.price_range.minPrice }}€</b> et <b>{{ formData.price_range.maxPrice }}€</b></p>
                </div>
                <div v-else><p style="font-style: italic">Aucun budget spécifié</p></div>
                <div v-if="formData.duration.value > 0">
                    <p>Durée: <b>{{ formData.duration.value }} {{ formData.duration.unit }}</b></p>
                </div>
                <div v-else><p style="font-style: italic">Aucune durée spécifiée</p></div>
            </div>
            <div class="fees">
                <h4>Coût du projet: 40$</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit obcaecati accusamus vero fugiat, animi
                    facere
                    odio, sequi dignissimos earum, dicta incidunt nostrum deserunt atque mollitia! Quia neque
                    consequuntur
                    accusantium rem?</p>
            </div>
        </div>

        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
.step_4 {
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


    p,
    h3,
    h4 {
        margin: 0;
        padding: 0;
    }

    .content {
        display: flex;
        flex-direction: column;

        .summary {
            //border: 1px solid var(--border);
            //border-radius: var(--radius-1);
            padding: 10px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            border-top: 1px solid var(--border);
            border-bottom: 1px solid var(--border);

            .filters {
                display: flex;
                flex-direction: row;
                gap: 10px;
                align-items: center;
            }
        }

        .fees {
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding: 10px;
            border-radius: var(--radius-1);
            border-bottom: 1px solid var(--border);
        }
    }
}
</style>