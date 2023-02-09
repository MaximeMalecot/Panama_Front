<script setup>
import { useRouter } from 'vue-router';
import OfferCard from '@/components/Offers/OfferCard.vue';
import NoResults from '@/components/NoResults.vue';
import { storeToRefs } from 'pinia';
import useFreelancerProjects from "@/hooks/use-freelancer-projects";
import { onMounted } from 'vue';

const router = useRouter();
const FreelancerProjectsStore = useFreelancerProjects();
const { projects: offers } = storeToRefs(FreelancerProjectsStore);

onMounted(()=>{
    FreelancerProjectsStore.fetchAllProjects();
});

</script>

<template>
    <main class="projets">
        <h1 class="projets__title">Projets</h1>
        <p>Vous retrouverez ici tous les projets qui vous sont assignés. Vous pourrez voir vos projets en cours ainsi
            que ceux que vous avez terminé.</p>
        <h2 class="projets__subtitle">Projets en cours</h2>
        <div v-if="offers.length > 1" class="projets__list">
            <OfferCard v-for="offer in offers" :offerData="offer" status="inprogress" hasLink
                @click="router.push({ name: 'dashboard-project', params: { id: 1 } })"></OfferCard>
        </div>
        <div v-else class="projets__no-results">
            <NoResults>Vous ne vous êtes positionné sur aucune offre dernièrement.</NoResults>
        </div>
        <h2 class="projets__subtitle">Projets terminés</h2>
        <div v-if="offers.length > 1" class="projets__list">
            <OfferCard v-for="offer in offers" :offerData="offer" status="issued" hasLink
                @click="router.push({ name: 'dashboard-project', params: { id: 1 } })"></OfferCard>
        </div>
        <div v-else class="projets__no-results">
            <NoResults>Vous ne vous êtes positionné sur aucune offre dernièrement.</NoResults>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.projets {
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