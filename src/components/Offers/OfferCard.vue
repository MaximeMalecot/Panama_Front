<script setup>
import Tag from '@/components/common/Tag.vue';
import { TECHNOS } from '@/constants/technos';

defineProps({
    offerData: {
        type: Object,
        required: true,
    },
    status: {
        type: String,
        validator: (value) => ['inprogress', 'issued'].includes(value),
    },
    type: {
        type: String,
        validator: (value) => ['project', 'offer'].includes(value),
    },
    editable: {
        type: Boolean,
        default: false,
    },
})

function displayPriceRange(price) {
    const prices = [1000, 2000, 5000, 10000, 20000];
    if (price > prices[prices.length - 1]) {
        return `> ${prices[prices.length - 1]}`;
    }
    if (price < prices[0]) {
        return `< ${prices[0]}`;
    }
    const index = prices.findIndex((p) => price < p);
    return `${prices[index - 1]} - ${prices[index]}`;
}

</script>

<template>
    <article class="card">
        <Tag v-if="status === 'inprogress'" class="card__status-tag" color="var(--warning)">In progress</Tag>
        <Tag v-if="status === 'issued'" class="card__status-tag" color="var(--success)">Issued</Tag>
        <div class="card__thumbnail" :style="{ background: TECHNOS[offerData.tags[0]].color }"></div>
        <div class="card__content">
            <p class="card__content__title">{{ offerData.title }}</p>
            <div class="card__content__technos">
                <Tag v-for="techno in offerData.tags" :color="TECHNOS[techno].color">{{ TECHNOS[techno].name }}</Tag>
            </div>
            <div class="card__content__footer">
                <span class="card__content__footer__price"> {{ displayPriceRange(offerData.price) }} €</span>
                <span class="card__content__footer__time">{{ offerData.time }} mois</span>
            </div>
        </div>

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
        left: .5rem;
        top: .5rem;
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
            gap: .5rem;
            margin-bottom: 1rem;
        }

        &__footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }

}
</style>