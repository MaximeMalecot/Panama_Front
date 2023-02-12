<script setup>
import { useRouter } from 'vue-router';
import OfferCard from '@/components/Offers/OfferCard.vue';
import NoResults from '@/components/NoResults.vue';
import { storeToRefs } from 'pinia';
import useFreelancerProjects from "@/hooks/use-freelancer-projects";
import { onMounted, watch, ref } from 'vue';
import { PROJECT_STATUS } from '@/constants/status.js';

const router = useRouter();
const FreelancerProjectsStore = useFreelancerProjects();
const { projects: offers, loading } = storeToRefs(FreelancerProjectsStore);
const selectedStatus = ref(null);

const STATUS = [
    {
        label: 'Tous',
        value: null
    },
    {
        label: 'En cours',
        value: PROJECT_STATUS.IN_PROGRESS
    },
    {
        label: 'Terminés',
        value: PROJECT_STATUS.ENDED
    }
];

onMounted(()=>{
    FreelancerProjectsStore.fetchAllProjects([PROJECT_STATUS.IN_PROGRESS, PROJECT_STATUS.ENDED]);
    console.log(offers.value)
});

watch(selectedStatus, (value) => {
    if(value === null) {
        FreelancerProjectsStore.fetchAllProjects([PROJECT_STATUS.IN_PROGRESS, PROJECT_STATUS.ENDED]);
        return;
    }else{
        FreelancerProjectsStore.fetchAllProjects([value]);
    }
});
</script>

<template>
    <main class="projects">
        <h1 class="projets__title">Projets</h1>
        <p>Vous retrouverez ici tous les projets qui vous sont assignés. Vous pourrez voir vos projets en cours ainsi
            que ceux que vous avez terminé.</p>
        <select v-model="selectedStatus" name="status" id="status">
            <option v-for="status in STATUS" :value="status.value">{{status.label}}</option>
        </select>

        <h2 class="projets__subtitle">Projets</h2>
        <div v-if="loading" class="projets__list">
            <p>Loading...</p>
        </div>
        <div v-else-if="offers.length > 0" class="projets__list">
            <OfferCard v-for="offer in offers" :offerData="offer" status="inprogress" hasLink
                @click="router.push({ name: 'dashboard-project', params: { id: offer.id } })"></OfferCard>
        </div>
        <div v-else class="projets__no-results">
            <NoResults>Vous ne vous êtes positionné sur aucune offre dernièrement.</NoResults>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.projects {
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