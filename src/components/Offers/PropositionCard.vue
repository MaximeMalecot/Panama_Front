<script setup>
import Tag from "@/components/common/Tag.vue";
import { TECHNOS } from "@/constants/technos";
import { computed, onMounted } from "vue";
import { PROPOSITION_STATUS } from "@/constants/status.js";

const props = defineProps({
    data: {
        type: Object,
        required: true,
    },
    type: {
        type: String,
        validator: (value) => ["project", "offer"].includes(value),
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
    return '#d9d9d9';
});

const labelsAssociations = {
    [PROPOSITION_STATUS.AWAITING]: {
        label: "En attente",
        color: "var(--warning)"
    },
    [PROPOSITION_STATUS.ACCEPTED]: {
        label: "Acceptée",
        color: "var(--success)"
    },
    [PROPOSITION_STATUS.REFUSED]: {
        label: "Refusée",
        color: "var(--error)"
    }
}

const labelToShow = computed(()=>{
    if(!props?.data.status) return "";
    if (labelsAssociations[props.data.status] === undefined) return "";
    return labelsAssociations[props.data.status];
})

</script>

<template>
    <article class="card" v-if="data?.id">
        <Tag
            class="card__status-tag"
            :color="labelToShow.color"
            >{{labelToShow.label}}</Tag
        >
        <div
            class="card__thumbnail"
            :style="{ background: backgroundColor }"
        ></div>
        <div class="card__content">
            <p class="card__content__title">{{ data.name }}</p>
            <div class="card__content__technos">
                <Tag
                    v-for="techno in data.filters"
                    :color="'gray'"
                    >{{ techno.name }}</Tag
                >
            </div>
            <div class="card__content__footer">
                <span class="card__content__footer__price">
                    {{ data.minPrice }} - {{ data.maxPrice }} €</span>
                <span class="card__content__footer__time"
                    >{{ data['length'] }} mois</span
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
