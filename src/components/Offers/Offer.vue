<script setup>
import Tag from '@/components/common/Tag.vue';
import Btn from '@/components/common/Btn.vue';
import { TECHNOS } from '@/constants/technos';

defineProps({
    data: {
        type: Object,
        required: true,
    }
})
</script>

<template>
    <div class="offer">
        <section class="offer__header">
            <h1 class="offer__header__title">{{ data.name }}</h1>
            <div class="offer__header__tags">
                <Tag v-for="techno in data.filters" :color="TECHNOS[techno].color">{{ TECHNOS[techno].name }}</Tag>
            </div>
            <div class="offer__header__info">
                <template v-if="data.minPrice && data.maxPrice">
                    <span>{{data.minPrice}}€ - {{data.maxPrice}}€</span>
                </template>
                <span>|</span>
                <span>{{ data.length }} mois</span>
            </div>
        </section>
        <section class="offer__content">
            <h2 class="offer__content__title">Description du projet</h2>
            <p>{{ data.description }}</p>
        </section>
    </div>
</template>

<style lang="scss" scoped>
.offer {
    &__header {
        margin-bottom: 2rem;
        &__title {
            font-size: 2rem;
            margin-bottom: 1rem;
            margin-top: 0;
        }
        &__tags {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: .5rem;
            margin-bottom: 1rem;
        }
        &__info {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 1rem;
        }
    }
    &__content {
        &__title {
            font-weight: 600;
        }
    }
}
</style>