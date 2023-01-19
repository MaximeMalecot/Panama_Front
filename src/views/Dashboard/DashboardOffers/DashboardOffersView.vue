<script setup>
import { useOffersStore } from '@/stores/offers'
import { useRouter } from 'vue-router';
import OfferCard from '@/components/Offers/OfferCard.vue';
import NoResults from '@/components/NoResults.vue';

const router = useRouter();
const OffersStore = useOffersStore();
OffersStore.getOffers();
</script>

<template>
    <main class="offers">
        <h1 class="offers__title">Offres</h1>
        <p>Vous retrouverez ici toutes les offres que vous avez posté.</p>
        <h2 class="offers__subtitle">Offres en cours</h2>
        <div v-if="OffersStore.offers.length > 1" class="offers__list">
            <OfferCard v-for="offer in OffersStore.offers" :offerData="offer" status="inprogress" hasLink
                customLinkText="Voir l'offre" @click="router.push({ name: 'offer', params: { id: 1 } })"></OfferCard>
        </div>
        <div v-else class="offers__no-results">
            <NoResults>Vous ne vous êtes positionné sur aucune offre dernièrement.</NoResults>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.offers {
    &__title {
        font-size: 2rem;
        margin: 0;
    }

    &__subtitle {
        font-size: 1.5rem;
        margin: 2rem 0 1rem 0;
        font-weight: 600;
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