<script setup>
import { useOffersStore } from '@/stores/offers'
import OffersFilter from '@/views/Offers/OffersFilter.vue';
import OfferCard from '@/components/OfferCard.vue';

const OffersStore = useOffersStore();
OffersStore.getOffers();
</script>

<template>
    <main class="offers">
        <section class="filters">
            <OffersFilter></OffersFilter>
        </section>
        <section class="header">
            <h2>{{ OffersStore.count }} offres disponibles</h2>
        </section>
        <section class="results">
            <div class="results__list">
                <OfferCard v-for="offer in OffersStore.offers" :offerData="offer"></OfferCard>
            </div>
            <div class="results__pagination">
                1 2 3 4 5
            </div>
        </section>
    </main>
</template>

<style lang="scss" scope>
.offers {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr;
    grid-column-gap: 16px;
    grid-row-gap: 0px;
    grid-template-areas:
        '. header'
        'filters results';
    padding: 1rem;
}

.filters {
    grid-area: filters;
}

.header {
    grid-area: header;
}

.results {
    grid-area: results;
    &__list {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        gap: 1rem;
    }
}
</style>