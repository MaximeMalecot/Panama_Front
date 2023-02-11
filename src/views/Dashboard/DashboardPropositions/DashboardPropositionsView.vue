<script setup>
import { onMounted, computed } from 'vue';
import { useOffersStore } from '@/stores/offers'
import { useRouter } from 'vue-router';
import OfferCard from '@/components/Offers/OfferCard.vue';
import NoResults from '@/components/NoResults.vue';
import { useAuthStore } from '../../../stores/auth';
import PropositionService from '@/services/proposition.service';
import useFreelancerPropositions from "@/hooks/use-freelancer-propositions";
import { storeToRefs } from 'pinia';

const router = useRouter();
const PropositionStore = useFreelancerPropositions();
const { propositions } = storeToRefs(PropositionStore);
const offers = computed(() => (propositions.value).map( p => p.project));

onMounted(() => {
    PropositionStore.fetchAllPropositions();
});

</script>

<template>
    <main class="propositions">
        <h1 class="propositions__title">Propositions ({{ offers.length }})</h1>
        <p>Vous retrouverez ici toutes les propositions que vous avez faite. C'est à dire toutes les offres sur
            lesquelles vous vous êtes positionné.</p>
        <h2 class="propositions__subtitle">Propositions en cours</h2>
        <div v-if="offers.length > 0" class="propositions__list">
            <OfferCard v-for="offer in offers" :offerData="offer" status="inprogress"></OfferCard>
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