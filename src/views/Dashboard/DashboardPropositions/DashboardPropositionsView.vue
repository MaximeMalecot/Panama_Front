<script setup>
import { useOffersStore } from '@/stores/offers'
import OfferCard from '@/components/Offers/OfferCard.vue';
import NoResults from '@/components/NoResults.vue';
const OffersStore = useOffersStore();
OffersStore.getOffers();
</script>

<template>
    <main class="propositions">
        <h1 class="propositions__title">Propositions</h1>
        <p>Vous retrouverez ici toutes les propositions que vous avez faite. C'est à dire toutes les offres sur
            lesquelles vous vous êtes positionné.</p>
        <h2 class="propositions__subtitle">Propositions en cours</h2>
        <div v-if="OffersStore.offers.length > 1" class="propositions__list">
            <OfferCard v-for="offer in OffersStore.offers" :offerData="offer" status="inprogress"></OfferCard>
        </div>
        <div v-else class="propositions__no-results">
            <NoResults>Vous ne vous êtes positionné sur aucune offre dernièrement.</NoResults>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.propositions {
    &__title {
        font-size: 2rem;
        margin: 0;
    }

    &__subtitle {
        font-size: 1.5rem;
        margin: 2rem 0 1rem 0;
    }

    &__list {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        gap: 1rem;
    }
    &__no-results {
        display: flex;
        justify-content: center;
        padding: 1rem;
    }
}
</style>