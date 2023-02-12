<script setup>
import Tag from "@/components/common/Tag.vue";
import { TECHNOS } from "@/constants/technos";
import { computed, onMounted } from "vue";
import { PROJECT_STATUS } from "@/constants/status.js";

const props = defineProps({
    offerData: {
        type: Object,
        required: true,
    },
    status: {
        type: String,
        validator: (value) => ["inprogress", "issued"].includes(value),
    },
    type: {
        type: String,
        validator: (value) => ["project", "offer"].includes(value),
    },
    editable: {
        type: Boolean,
        default: false,
    },
    hasLink: {
        type: Boolean,
        default: false,
    },
    customLinkText: {
        type: String,
        default: "Voir le projet",
    },
});

const backgroundColor = computed(() => {
    if (!props?.offerData || !props.offerData?.filters.length === 0)
        return "#d9d9d9";
    //return TECHNOS[props.offerData.filters[0]].color;
    return "#d9d9d9";
});

const labelsAssociations = {
    [PROJECT_STATUS.CREATED]: { label: "Crée", color: "var(--warning)" },
    [PROJECT_STATUS.IN_PROGRESS]: { label: "En cours", color: "#d9d9d9" },
    [PROJECT_STATUS.ENDED]: { label: "Terminé", color: "gray" },
    [PROJECT_STATUS.CANCELED]: { label: "Annulé", color: "var(--error)" },
    [PROJECT_STATUS.ACTIVE]: { label: "Actif", color: "var(--success)" },
};

const labelToShow = computed(() => {
    console.log( props.offerData );
    if (!props?.offerData) return "";
    console.log("STILL HERE")
    if (labelsAssociations[props.offerData.status] === undefined) return "";
    return labelsAssociations[props.offerData.status];
});
</script>

<template>
    <article class="card">
        <Tag
            class="card__status-tag"
            :color="labelToShow.color"
            >{{ labelToShow.label }}</Tag
        >
        <div
            class="card__thumbnail"
            :style="{ background: backgroundColor }"
        ></div>
        <div class="card__content">
            <p class="card__content__title">{{ offerData.name }}</p>
            <div class="card__content__technos">
                <Tag v-for="techno in offerData.filters" :color="'gray'">{{
                    techno.name
                }}</Tag>
            </div>
            <div class="card__content__footer">
                <span class="card__content__footer__price">
                    {{ offerData.minPrice }} - {{ offerData.maxPrice }} €</span
                >
                <span class="card__content__footer__time"
                    >{{ offerData.length }} mois</span
                >
            </div>
        </div>
        <div v-if="hasLink" class="card__link">{{ customLinkText }}</div>
    </article>
</template>

<style lang="scss" scoped>
.card {
    position: relative;
    display: inline-block;
    border: 1px solid var(--border);
    border-radius: var(--radius-1);
    width: 400px;
    cursor: pointer;

    &__status-tag {
        position: absolute;
        left: 0.5rem;
        top: 0.5rem;
    }

    &__thumbnail {
        background: #4287f5;
        height: 80px;
        width: 100%;
        border-top-right-radius: var(--radius-1);
        border-top-left-radius: var(--radius-1);
    }

    &__content {
        padding: 1rem;

        &__title {
            margin: 0 0 1rem 0;
            font-size: 1.2rem;
            font-weight: 600;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        &__technos {
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            gap: 0.5rem;
            margin-bottom: 1rem;
        }

        &__footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }

    &__link {
        border-top: 1px solid var(--border);
        text-align: center;
        padding: 0.5rem 0;
        background: var(--background);
    }
}
</style>
