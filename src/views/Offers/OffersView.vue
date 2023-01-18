<script setup>
import OffersFilter from '@/views/Offers/OffersFilter.vue';
import OfferCard from '@/components/OfferCard.vue';
</script>

<template>
    <main class="offers">
        <section class="filters">
            <OffersFilter></OffersFilter>
        </section>
        <section class="header">
            <h2>413 offres disponibles</h2>
        </section>
        <section class="results">
            <div class="results__list">
                <OfferCard></OfferCard>
                <OfferCard></OfferCard>
                <OfferCard></OfferCard>
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
}
</style>