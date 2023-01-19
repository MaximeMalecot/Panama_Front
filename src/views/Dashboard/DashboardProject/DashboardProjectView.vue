<script setup>
import { reactive } from 'vue';
import Offer from '@/components/Offers/Offer.vue';

const data = reactive({
    "title": "Conception d'un site avec Shopify",
    "tags": ["python", "htmlcss"],
    "time": 1,
    "price": 800,
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
});
</script>

<template>
    <main class="offer">
        <section class="offer__header">
            <RouterLink :to="{ name: 'dashboard-projects' }" class="offer__header__link">⬅️ revenir aux projets
            </RouterLink>
        </section>
        <section class="offer__content">
            <Offer :data="data" />
        </section>
    </main>
</template>

<style lang="scss" scoped>
.offer {
    &__header {
        padding-bottom: 2rem;

        &__link {
            color: var(--text-gray);
            text-decoration: none;
        }
    }

    &__content {
        margin-bottom: 3rem;
    }
}
</style>